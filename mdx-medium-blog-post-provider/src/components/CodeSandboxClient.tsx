'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';
import CodeSandboxFeaturesSection from '@/components/CodeSandboxFeaturesSection';
import SandpackEditor from '@/components/SandpackEditor';
import PyodideSandbox from '@/components/PyodideSandbox';
import SqlSandbox from '@/components/SqlSandbox';
import {
    JS_DEFAULT, TS_DEFAULT, JS_EXAMPLES, TS_EXAMPLES,
    HTML_DEFAULT_FILES, HTML_EXAMPLES,
    PYTHON_DEFAULT, PYTHON_EXAMPLES,
    SQL_DEFAULT, SQL_EXAMPLES,
} from '@/utils/constants';

type Runtime = 'javascript' | 'typescript' | 'html' | 'python' | 'sql';

const RUNTIME_LABELS: Record<Runtime, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    html: 'HTML/CSS',
    python: 'Python',
    sql: 'SQL',
};

const RUNTIME_ORDER: Runtime[] = ['javascript', 'typescript', 'html', 'python', 'sql'];

interface ExampleButtonData {
    key: string;
    name: string;
    onSelect: () => void;
}

// Client boundary for the Code Sandbox page — owns all interactive state
export default function CodeSandboxClient(): React.JSX.Element {
    const [runtime, setRuntime] = useState<Runtime>('javascript');
    const [resetKey, setResetKey] = useState<number>(0);

    const [jsCode, setJsCode] = useState<string>(JS_DEFAULT);
    const [tsCode, setTsCode] = useState<string>(TS_DEFAULT);
    const [htmlFiles, setHtmlFiles] = useState<Record<string, string>>(HTML_DEFAULT_FILES);
    const [pythonCode, setPythonCode] = useState<string>(PYTHON_DEFAULT);
    const [sqlCode, setSqlCode] = useState<string>(SQL_DEFAULT);

    const handleSetRuntime = (next: Runtime): void => {
        if (next === runtime) return;
        setRuntime(next);
        setResetKey(k => k + 1);
    };

    const exampleButtons: ExampleButtonData[] = runtime === 'html'
        ? Object.entries(HTML_EXAMPLES).map(([key, ex]) => ({
            key,
            name: ex.name,
            onSelect: (): void => {
                setHtmlFiles(ex.files);
                setResetKey(k => k + 1);
                toast.success(`${ex.name} loaded`);
            },
        }))
        : Object.entries(
            runtime === 'typescript' ? TS_EXAMPLES
                : runtime === 'python' ? PYTHON_EXAMPLES
                    : runtime === 'sql' ? SQL_EXAMPLES
                        : JS_EXAMPLES,
        ).map(([key, ex]) => ({
            key,
            name: ex.name,
            onSelect: (): void => {
                if (runtime === 'typescript') setTsCode(ex.code);
                else if (runtime === 'python') setPythonCode(ex.code);
                else if (runtime === 'sql') setSqlCode(ex.code);
                else setJsCode(ex.code);
                setResetKey(k => k + 1);
                toast.success(`${ex.name} loaded`);
            },
        }));

    return (
        <main className="flex-grow px-3 sm:px-4">
            <div className="max-w-6xl mx-auto py-4 sm:py-6 md:py-8">

                {/* Hero */}
                <section className="py-4 sm:py-6 md:py-8 mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 matrix-glow text-green-700 dark:text-green-300">
                        Code Sandbox
                    </h1>
                    <p className="text-lg sm:text-xl text-green-700/80 dark:text-green-200/80 mb-4 code-font">
                        Interactive JavaScript, TypeScript, HTML/CSS, Python & SQL execution environment
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium code-font">
                            In-Browser Execution • No Server Required • Isolated Sandbox
                        </span>
                    </div>

                    {/* Runtime selector */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-sm text-green-700/70 dark:text-green-200/70 code-font">Runtime:</span>
                        {RUNTIME_ORDER.map(option => (
                            <Button
                                key={option}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetRuntime(option)}
                                className={`glass-card border-green-500/30 ${runtime === option ? 'bg-green-600/10 text-green-800 border-green-400/50 dark:bg-green-500/20 dark:text-green-100' : 'text-green-700 dark:text-green-200'} hover:text-green-800 hover:bg-green-100 dark:hover:text-green-100 dark:hover:bg-green-500/10`}
                            >
                                {RUNTIME_LABELS[option]}
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Quick Examples */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4 matrix-glow text-center text-green-700 dark:text-green-300">Quick Examples</h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {exampleButtons.map(btn => (
                            <Button
                                key={btn.key}
                                variant="outline"
                                size="sm"
                                onClick={btn.onSelect}
                                className="glass-card border-green-500/30 text-green-700 hover:text-green-800 hover:bg-green-100 dark:text-green-200 dark:hover:text-green-100 dark:hover:bg-green-500/10"
                            >
                                {btn.name}
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Editor */}
                <div className="mb-12">
                    {runtime === 'python' ? (
                        <PyodideSandbox key={resetKey} initialCode={pythonCode} />
                    ) : runtime === 'sql' ? (
                        <SqlSandbox key={resetKey} initialCode={sqlCode} />
                    ) : (
                        <SandpackEditor
                            key={resetKey}
                            files={
                                runtime === 'html' ? htmlFiles
                                    : runtime === 'typescript' ? { '/index.ts': tsCode }
                                        : { '/index.js': jsCode }
                            }
                            template={runtime === 'html' ? 'static' : runtime === 'typescript' ? 'vanilla-ts' : 'vanilla'}
                        />
                    )}
                </div>

                <CodeSandboxFeaturesSection />
            </div>
        </main>
    );
}
