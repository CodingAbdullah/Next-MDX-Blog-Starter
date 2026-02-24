'use client';

import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackConsole,
  useSandpack,
  type SandpackTheme,
} from '@codesandbox/sandpack-react';
import { Copy, Download, Play, RotateCcw, Terminal } from 'lucide-react';
import { toast } from 'sonner';

const matrixTheme: SandpackTheme = {
  colors: {
    surface1: '#050d05',
    surface2: '#071407',
    surface3: '#0d200d',
    clickable: '#4ade80',
    base: '#86efac',
    disabled: '#163a16',
    hover: '#22c55e',
    accent: '#22c55e',
    error: '#f87171',
    errorSurface: '#200505',
  },
  syntax: {
    plain: '#86efac',
    comment: { color: '#2d6b2d', fontStyle: 'italic' },
    keyword: '#4ade80',
    tag: '#22c55e',
    punctuation: '#4a8a4a',
    definition: '#a7f3d0',
    string: '#86efac',
    static: '#16a34a',
    property: '#a3e635',
  },
  font: {
    body: "'JetBrains Mono', monospace",
    mono: "'JetBrains Mono', monospace",
    size: '13px',
    lineHeight: '1.6',
  },
};

function EditorToolbar({ mainFile, template }: { mainFile: string; template: 'vanilla' | 'vanilla-ts' }): JSX.Element {
  const { sandpack, dispatch } = useSandpack();
  const isTS = template === 'vanilla-ts';

  const handleCopy = (): void => {
    navigator.clipboard.writeText(sandpack.files[mainFile]?.code ?? '');
    toast.success('Code copied to clipboard!');
  };

  const handleDownload = (): void => {
    const code = sandpack.files[mainFile]?.code ?? '';
    const ext = isTS ? 'ts' : 'js';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sandbox.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#071407] border-b border-green-500/20">
      {/* File tab */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-t bg-[#050d05] border border-b-0 border-green-500/25">
          <span className={`w-2 h-2 rounded-full ${isTS ? 'bg-blue-400' : 'bg-yellow-400'}`} />
          <span className="text-xs text-green-300 code-font">{isTS ? 'index.ts' : 'index.js'}</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => dispatch({ type: 'refresh' })}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xs font-bold rounded code-font transition-colors"
        >
          <Play className="h-3 w-3 fill-white" />
          Run
        </button>
        <div className="w-px h-4 bg-green-500/20 mx-0.5" />
        <button onClick={handleCopy} title="Copy" className="p-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors">
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleDownload} title="Download" className="p-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors">
          <Download className="h-3.5 w-3.5" />
        </button>
        <button onClick={() => { sandpack.resetFile(mainFile); toast.success('Reset!'); }} title="Reset" className="p-1.5 text-green-500 hover:text-green-300 hover:bg-green-500/10 rounded transition-colors">
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export interface SandpackEditorProps {
  initialCode: string;
  template: 'vanilla' | 'vanilla-ts';
}

export default function SandpackEditor({ initialCode, template }: SandpackEditorProps): JSX.Element {
  const mainFile = template === 'vanilla-ts' ? '/index.ts' : '/index.js';

  return (
    <SandpackProvider
      template={template}
      files={{ [mainFile]: initialCode }}
      theme={matrixTheme}
      options={{ recompileDelay: 500 }}
    >
      {/* SandpackPreview must be mounted for the iframe to initialise.
          SandpackConsole only receives events from that iframe. */}
      <div style={{ display: 'none' }}>
        <SandpackPreview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor panel — no glass-card to avoid hover translate animation */}
        <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
          <EditorToolbar mainFile={mainFile} template={template} />
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            style={{ minHeight: '430px' }}
          />
        </div>

        {/* Console panel */}
        <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#071407] border-b border-green-500/20">
            <Terminal className="h-3.5 w-3.5 text-green-500" />
            <span className="text-xs font-semibold text-green-400 code-font tracking-wide">Console</span>
          </div>
          <SandpackConsole
            showHeader={false}
            resetOnPreviewRestart
            style={{ minHeight: '430px' }}
          />
        </div>
      </div>
    </SandpackProvider>
  );
}
