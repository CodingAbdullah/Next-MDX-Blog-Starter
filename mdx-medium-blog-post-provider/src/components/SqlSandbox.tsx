'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Download, Loader2, Play, RotateCcw, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import type { QueryExecResult } from 'sql.js';
import type { SqlWorkerRequest, SqlWorkerResponse } from '@/utils/types/SqlWorkerType';

export interface SqlSandboxProps {
  initialCode: string;
}

export default function SqlSandbox({ initialCode }: SqlSandboxProps): React.JSX.Element {
  const [code, setCode] = useState<string>(initialCode);
  const [results, setResults] = useState<QueryExecResult[]>([]);
  const [message, setMessage] = useState<{ kind: 'info' | 'error'; text: string } | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'running'>('loading');
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    let active = true;
    const worker = new Worker('/workers/sql-worker.js');
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<SqlWorkerResponse>): void => {
      if (!active) return;
      const response = event.data;
      switch (response.type) {
        case 'ready':
          setStatus('ready');
          break;
        case 'done':
          setResults(response.results);
          setMessage(
            response.results.length > 0
              ? null
              : { kind: 'info', text: `Query executed successfully. ${response.rowsModified} row(s) affected.` },
          );
          setStatus('ready');
          break;
        case 'error':
          setResults([]);
          setMessage({ kind: 'error', text: response.message });
          setStatus('ready');
          break;
      }
    };

    const initRequest: SqlWorkerRequest = { type: 'init' };
    worker.postMessage(initRequest);

    return () => {
      active = false;
      worker.onmessage = null;
      worker.terminate();
      if (workerRef.current === worker) {
        workerRef.current = null;
      }
    };
  }, []);

  const handleRun = (): void => {
    if (status !== 'ready' || !workerRef.current) return;
    setStatus('running');
    setResults([]);
    setMessage(null);
    const runRequest: SqlWorkerRequest = { type: 'run', sql: code };
    workerRef.current.postMessage(runRequest);
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Code copied to clipboard!');
    } 
    catch {
      toast.error('Failed to copy code. Please try again.');
    }
  };

  const handleDownload = (): void => {
    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'query.sql';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Code downloaded!');
    } 
    catch {
      toast.error('Failed to download code. Please try again.');
    }
  };

  const handleReset = (): void => {
    setCode(initialCode);
    setResults([]);
    setMessage(null);
    toast.success('Code reset to original!');
  };

  const isBusy = status !== 'ready';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor panel */}
      <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
        <div className="flex items-center justify-between px-3 py-2 bg-[#071407] border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-t bg-[#050d05] border border-b-0 border-green-500/25">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-xs text-green-300 code-font">query.sql</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleRun}
              disabled={isBusy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded code-font transition-colors"
            >
              {status === 'running' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3 fill-white" />}
              Run
            </button>
            <div className="w-px h-4 bg-green-500/20 mx-0.5" />
            <button type="button" onClick={handleCopy} title="Copy" className="p-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors">
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={handleDownload} title="Download" className="p-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors">
              <Download className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={handleReset} title="Reset" className="p-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full bg-[#050d05] text-green-200 code-font text-[13px] leading-relaxed p-4 outline-none resize-none"
          style={{ minHeight: 'clamp(260px, 50vw, 430px)' }}
        />
      </div>

      {/* Results panel */}
      <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#071407] border-b border-green-500/20">
          <Terminal className="h-3.5 w-3.5 text-green-500" />
          <span className="text-xs font-semibold text-green-400 code-font tracking-wide">Results</span>
        </div>
        <div className="flex-1 bg-[#050d05] p-4 code-font text-[13px] overflow-auto space-y-4" style={{ minHeight: 'clamp(260px, 50vw, 430px)' }}>
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-green-500/70">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading SQL runtime (sql.js)…
            </div>
          )}
          {status !== 'loading' && results.length === 0 && !message && (
            <div className="text-green-500/50">Press Run to execute this query.</div>
          )}
          {message && (
            <div className={message.kind === 'error' ? 'text-red-400 whitespace-pre-wrap break-words' : 'text-green-300'}>
              {message.text}
            </div>
          )}
          {results.map((result, index) => (
            <div key={index} className="overflow-x-auto border border-green-500/15 rounded">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-500/10">
                    {result.columns.map(column => (
                      <th key={column} className="px-3 py-1.5 text-green-300 font-semibold border-b border-green-500/20 whitespace-nowrap">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.values.map((row, rowIndex) => (
                    <tr key={rowIndex} className="odd:bg-green-500/5">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-3 py-1.5 text-green-200 border-b border-green-500/10 whitespace-nowrap">
                          {cell === null ? <span className="text-green-500/40 italic">NULL</span> : String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
