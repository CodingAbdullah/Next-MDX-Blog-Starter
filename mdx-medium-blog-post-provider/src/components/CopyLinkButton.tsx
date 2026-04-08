'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Client Component — requires navigator.clipboard and window APIs
export default function CopyLinkButton(): React.JSX.Element {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } 
        catch {
            // Clipboard API unavailable — silently ignore
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="border-green-500/40 bg-green-900/20 text-green-300 hover:bg-green-800/40 hover:text-green-200 transition-colors text-xs w-full sm:w-auto"
            aria-label="Copy article link to clipboard"
        >
            {copied ? (
                <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
        </Button>
    );
}
