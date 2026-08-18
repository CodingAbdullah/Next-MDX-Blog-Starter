// sql.js execution worker.
//
// Served as a static asset from /public and loaded via a plain URL string,
// kept outside Next.js's module graph for the same reason as pyodide-worker.js —
// bundling sql.js's UMD wrapper through webpack/Turbopack is unreliable, and
// its wasm binary must be fetched separately (via locateFile) regardless.
const SQLJS_VERSION = '1.14.2';
importScripts(`https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/sql-wasm.js`);

let sqlJsPromise = null;

function getSqlJs() {
    if (!sqlJsPromise) {
        sqlJsPromise = initSqlJs({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/sql.js@${SQLJS_VERSION}/dist/${file}`,
        });
    }
    return sqlJsPromise;
}

function runQuery(SQL, sql) {
    let db = null;

    try {
        db = new SQL.Database();
        const results = db.exec(sql);
        const rowsModified = db.getRowsModified();
        return { type: 'done', results, rowsModified };
    } 
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown SQL execution error';
        return { type: 'error', message };
    } 
    finally {
        if (db) db.close();
    }
}

self.onmessage = async (event) => {
    const request = event.data;

    try {
        const SQL = await getSqlJs();

        if (request.type === 'init') {
            self.postMessage({ type: 'ready' });
            return;
        }

        self.postMessage(runQuery(SQL, request.sql));
    } 
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load the SQL runtime';
        self.postMessage({ type: 'error', message });
    }
};
