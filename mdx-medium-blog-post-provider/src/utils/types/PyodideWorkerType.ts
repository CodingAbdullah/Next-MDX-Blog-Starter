// Messages sent from the main thread to the Pyodide web worker
export type PyodideWorkerRequest =
    | { type: 'init' }
    | { type: 'run'; code: string };

// Messages sent from the Pyodide web worker back to the main thread
export type PyodideWorkerResponse =
    | { type: 'ready' }
    | { type: 'stdout'; data: string }
    | { type: 'stderr'; data: string }
    | { type: 'done'; result: string | null }
    | { type: 'error'; message: string };
