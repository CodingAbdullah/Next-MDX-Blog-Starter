// Pyodide execution worker.
//
// Served as a static asset from /public and loaded via a plain URL string
// (not `new URL(..., import.meta.url)`), so it never enters Next.js's module
// graph. The `pyodide` npm package's browser bundle (pyodide.mjs) contains
// Node.js-only conditional imports (node:fs, node:crypto, ...) that both
// Turbopack and webpack fail to handle when statically bundled — Pyodide's
// own docs recommend loading it via a CDN script instead of bundling it.
const PYODIDE_VERSION = 'v0.28.3';
importScripts(`https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/pyodide.js`);

let pyodidePromise = null;

function getPyodide() {
    if (!pyodidePromise) {
        pyodidePromise = loadPyodide({
            indexURL: `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`,
            stdout: (message) => self.postMessage({ type: 'stdout', data: message }),
            stderr: (message) => self.postMessage({ type: 'stderr', data: message }),
        });
    }
    return pyodidePromise;
}

self.onmessage = async (event) => {
    const request = event.data;

    try {
        if (request.type === 'init') {
            await getPyodide();
            self.postMessage({ type: 'ready' });
            return;
        }

        const pyodide = await getPyodide();
        const result = await pyodide.runPythonAsync(request.code);
        const resultText = result === undefined || result === null ? null : String(result);
        self.postMessage({ type: 'done', result: resultText });
    } 
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown Python execution error';
        self.postMessage({ type: 'error', message });
    }
};
