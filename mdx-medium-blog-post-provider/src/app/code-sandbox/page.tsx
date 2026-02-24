import type { Metadata } from 'next';
import CodeSandboxClient from '@/components/CodeSandboxClient';

export const metadata: Metadata = {
    title: 'Code Sandbox | Create Next MDX Blog App',
    description: 'Interactive in-browser JavaScript and TypeScript execution environment powered by Sandpack. Write, run, and experiment with code directly in the browser — no server required.',
    keywords: ['code sandbox', 'JavaScript', 'TypeScript', 'Sandpack', 'in-browser execution', 'Next.js', 'interactive'],
    openGraph: {
        title: 'Code Sandbox | Create Next MDX Blog App',
        description: 'Interactive in-browser JavaScript and TypeScript execution environment powered by Sandpack.',
        type: 'website',
    },
};

// Server component — delegates all interactive state to CodeSandboxClient
export default function CodeSandboxPage() {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <CodeSandboxClient />
        </div>
    );
}
