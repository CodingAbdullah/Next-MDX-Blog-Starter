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

const FILE_DOT_COLORS: Record<string, string> = {
  ts: 'bg-blue-400',
  js: 'bg-yellow-400',
  html: 'bg-orange-400',
  css: 'bg-sky-400',
};

function EditorToolbar(): React.JSX.Element {
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;
  const activeCode = sandpack.files[activeFile]?.code ?? '';
  const extension = activeFile.split('.').pop() ?? 'txt';
  const dotColor = FILE_DOT_COLORS[extension] ?? 'bg-green-400';
  const fileLabel = activeFile.replace(/^\//, '');

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(activeCode);
      toast.success('Code copied to clipboard!');
    } 
    catch {
      toast.error('Failed to copy code. Please try again.');
    }
  };

  const handleDownload = (): void => {
    try {
      const blob = new Blob([activeCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileLabel || 'sandbox.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Code downloaded!');
    } catch {
      toast.error('Failed to download code. Please try again.');
    }
  };

  const handleReset = (): void => {
    try {
      sandpack.resetFile(activeFile);
      toast.success('Code reset to original!');
    } 
    catch {
      toast.error('Failed to reset code. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#071407] border-b border-green-500/20">
      {/* File tab */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-t bg-[#050d05] border border-b-0 border-green-500/25">
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
          <span className="text-xs text-green-300 code-font">{fileLabel}</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => sandpack.runSandpack()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-xs font-bold rounded code-font transition-colors"
        >
          <Play className="h-3 w-3 fill-white" />
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
  );
}

export interface SandpackEditorProps {
  files: Record<string, string>;
  template: 'vanilla' | 'vanilla-ts' | 'static';
}

export default function SandpackEditor({ files, template }: SandpackEditorProps): React.JSX.Element {
  const fileNames = Object.keys(files);
  const activeFile = fileNames[0];
  const isStatic = template === 'static';

  return (
    <SandpackProvider
      template={template}
      files={files}
      theme={matrixTheme}
      options={{ recompileDelay: 500, activeFile }}
    >
      {/* Non-static templates run headless: SandpackPreview must be mounted for the
          iframe to initialise, and SandpackConsole only receives events from that iframe. */}
      {!isStatic && (
        <div style={{ display: 'none' }}>
          <SandpackPreview />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor panel — no glass-card to avoid hover translate animation */}
        <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
          <EditorToolbar />
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            showTabs={fileNames.length > 1}
            style={{ minHeight: 'clamp(260px, 50vw, 430px)' }}
          />
        </div>

        {/* Preview/console panel */}
        <div className="border border-green-500/20 rounded-lg overflow-hidden flex flex-col shadow-[0_4px_20px_-4px_rgba(0,200,0,0.15)]">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#071407] border-b border-green-500/20">
            {isStatic ? <Play className="h-3.5 w-3.5 text-green-500" /> : <Terminal className="h-3.5 w-3.5 text-green-500" />}
            <span className="text-xs font-semibold text-green-400 code-font tracking-wide">
              {isStatic ? 'Preview' : 'Console'}
            </span>
          </div>
          {isStatic ? (
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              style={{ minHeight: 'clamp(260px, 50vw, 430px)' }}
            />
          ) : (
            <SandpackConsole
              showHeader={false}
              resetOnPreviewRestart
              style={{ minHeight: 'clamp(260px, 50vw, 430px)' }}
            />
          )}
        </div>
      </div>
    </SandpackProvider>
  );
}
