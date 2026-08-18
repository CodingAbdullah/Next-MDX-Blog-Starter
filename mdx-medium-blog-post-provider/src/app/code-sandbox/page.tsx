import type { Metadata } from 'next';
import CodeSandboxClient from '@/components/CodeSandboxClient';

export const metadata: Metadata = {
    title: 'Code Sandbox | Create Next MDX Blog App',
    description: 'Interactive in-browser JavaScript, TypeScript, HTML/CSS, Python, and SQL execution environment powered by Sandpack, Pyodide, and sql.js. Write, run, and experiment with code directly in the browser — no server required.',
    keywords: ['code sandbox', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Python', 'Pyodide', 'SQL', 'sql.js', 'Sandpack', 'in-browser execution', 'Next.js', 'interactive'],
    openGraph: {
        title: 'Code Sandbox | Create Next MDX Blog App',
        description: 'Interactive in-browser JavaScript, TypeScript, HTML/CSS, Python, and SQL execution environment.',
        type: 'website',
    },
};

// Server component — delegates all interactive state to CodeSandboxClient
export default function CodeSandboxPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <CodeSandboxClient />
        </div>
    );
}
