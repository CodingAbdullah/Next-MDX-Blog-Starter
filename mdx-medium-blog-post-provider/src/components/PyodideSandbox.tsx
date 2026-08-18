'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Download, Loader2, Play, RotateCcw, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import type { PyodideWorkerRequest, PyodideWorkerResponse } from '@/utils/types/PyodideWorkerType';

interface LogEntry {
  id: number;
  kind: 'stdout' | 'stderr' | 'result';
  text: string;
}

export interface PyodideSandboxProps {
  initialCode: string;
}

export default function PyodideSandbox({ initialCode }: PyodideSandboxProps): React.JSX.Element {
  const [code, setCode] = useState<string>(initialCode);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'running'>('loading');
  const workerRef = useRef<Worker | null>(null);
  const logIdRef = useRef<number>(0);

  useEffect(() => {
    let active = true;
    const worker = new Worker('/workers/pyodide-worker.js');
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<PyodideWorkerResponse>): void => {
      if (!active) return;
      const message = event.data;
      switch (message.type) {
        case 'ready':
          setStatus('ready');
          break;
        case 'stdout':
          logIdRef.current += 1;
          setLogs(prev => [...prev, { id: logIdRef.current, kind: 'stdout', text: message.data }]);
          break;
        case 'stderr':
          logIdRef.current += 1;
          setLogs(prev => [...prev, { id: logIdRef.current, kind: 'stderr', text: message.data }]);
          break;
        case 'done':
          if (message.result !== null) {
            logIdRef.current += 1;
            setLogs(prev => [...prev, { id: logIdRef.current, kind: 'result', text: `=> ${message.result}` }]);
          }
          setStatus('ready');
          break;
        case 'error':
          logIdRef.current += 1;
          setLogs(prev => [...prev, { id: logIdRef.current, kind: 'stderr', text: message.message }]);
          setStatus('ready');
          break;
      }
    };

    const initRequest: PyodideWorkerRequest = { type: 'init' };
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
    setLogs([]);
    const runRequest: PyodideWorkerRequest = { type: 'run', code };
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
      a.download = 'main.py';
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
    setLogs([]);
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
              <span className="w-2 h-2 rounded-full bg-blue-300" />
              <span className="text-xs text-green-300 code-font">main.py</span>
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

      {/* Console panel */}
      <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#071407] border-b border-green-500/20">
          <Terminal className="h-3.5 w-3.5 text-green-500" />
          <span className="text-xs font-semibold text-green-400 code-font tracking-wide">Console</span>
        </div>
        <div className="flex-1 bg-[#050d05] p-4 code-font text-[13px] overflow-auto" style={{ minHeight: 'clamp(260px, 50vw, 430px)' }}>
          {status === 'loading' && (
            <div className="flex items-center gap-2 text-green-500/70">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Loading Python runtime (Pyodide)…
            </div>
          )}
          {status !== 'loading' && logs.length === 0 && (
            <div className="text-green-500/50">Press Run to execute this script.</div>
          )}
          {logs.map(log => (
            <div
              key={log.id}
              className={`whitespace-pre-wrap break-words ${log.kind === 'stderr' ? 'text-red-400' : log.kind === 'result' ? 'text-green-300' : 'text-green-200'}`}
            >
              {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
