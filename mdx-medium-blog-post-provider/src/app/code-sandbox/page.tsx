'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';
import CodeSandboxFeaturesSection from '../../components/CodeSandboxFeaturesSection';
import SandpackEditor from '../../components/SandpackEditor';
import { JS_DEFAULT, TS_DEFAULT, JS_EXAMPLES, TS_EXAMPLES } from '@/utils/constants/SandboxExamples';

type Runtime = 'javascript' | 'typescript';

export default function CodeSandboxPage() {
  const [runtime, setRuntime] = useState<Runtime>('javascript');
  const [sandpackKey, setSandpackKey] = useState<number>(0);
  const [sandpackCode, setSandpackCode] = useState<string>(JS_DEFAULT);

  const handleSetRuntime = (next: Runtime): void => {
    if (next === runtime) return;
    setRuntime(next);
    setSandpackCode(next === 'typescript' ? TS_DEFAULT : JS_DEFAULT);
    setSandpackKey(k => k + 1);
  };

  const loadExample = (name: string, code: string): void => {
    setSandpackCode(code);
    setSandpackKey(k => k + 1);
    toast.success(`${name} loaded`);
  };

  const examples = runtime === 'typescript' ? TS_EXAMPLES : JS_EXAMPLES;
  const template: 'vanilla' | 'vanilla-ts' = runtime === 'typescript' ? 'vanilla-ts' : 'vanilla';

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow px-3 sm:px-4">
        <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8">

          {/* Hero */}
          <section className="py-4 sm:py-6 md:py-8 mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 matrix-glow">
              Code Sandbox
            </h1>
            <p className="text-lg sm:text-xl text-green-200/80 mb-4 code-font">
              Interactive JavaScript & TypeScript execution environment
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-xs sm:text-sm text-green-400 font-medium code-font">
                Sandpack In-Browser Execution • No Server Required • Isolated Sandbox
              </span>
            </div>

            {/* Runtime selector */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm text-green-200/70 code-font">Runtime:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetRuntime('javascript')}
                className={`glass-card border-green-500/30 ${runtime === 'javascript' ? 'bg-green-500/20 text-green-100 border-green-400/50' : 'text-green-200'} hover:text-green-100 hover:bg-green-500/10`}
              >
                JavaScript
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetRuntime('typescript')}
                className={`glass-card border-green-500/30 ${runtime === 'typescript' ? 'bg-green-500/20 text-green-100 border-green-400/50' : 'text-green-200'} hover:text-green-100 hover:bg-green-500/10`}
              >
                TypeScript
              </Button>
            </div>
          </section>

          {/* Quick Examples */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 matrix-glow text-center">Quick Examples</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(examples).map(([key, ex]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => loadExample(ex.name, ex.code)}
                  className="glass-card border-green-500/30 text-green-200 hover:text-green-100 hover:bg-green-500/10"
                >
                  {ex.name}
                </Button>
              ))}
            </div>
          </section>

          {/* Sandpack editor */}
          <div className="mb-12">
            <SandpackEditor
              key={sandpackKey}
              initialCode={sandpackCode}
              template={template}
            />
          </div>

          <CodeSandboxFeaturesSection />
        </div>
      </main>
    </div>
  );
}
