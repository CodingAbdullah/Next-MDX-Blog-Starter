import type { QueryExecResult } from 'sql.js';

// Messages sent from the main thread to the sql.js web worker
export type SqlWorkerRequest =
    | { type: 'init' }
    | { type: 'run'; sql: string };

// Messages sent from the sql.js web worker back to the main thread
export type SqlWorkerResponse =
    | { type: 'ready' }
    | { type: 'done'; results: QueryExecResult[]; rowsModified: number }
    | { type: 'error'; message: string };
