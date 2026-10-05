'use client';

import { Contrast } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import {
    CONTRAST_ATTRIBUTE,
    CONTRAST_HIGH,
    CONTRAST_NORMAL,
    CONTRAST_STORAGE_KEY,
} from '@/utils/constants';

// <html data-contrast> is the source of truth; ContrastScript sets it before hydration
function subscribe(onStoreChange: () => void): () => void {
    const observer = new MutationObserver(onStoreChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [CONTRAST_ATTRIBUTE],
    });

    return () => observer.disconnect();
}

function getSnapshot(): boolean {
    return document.documentElement.getAttribute(CONTRAST_ATTRIBUTE) === CONTRAST_HIGH;
}

function getServerSnapshot(): boolean {
    return false;
}

function setHighContrast(enabled: boolean): void {
    if (enabled) {
        document.documentElement.setAttribute(CONTRAST_ATTRIBUTE, CONTRAST_HIGH);
    }
    else {
        document.documentElement.removeAttribute(CONTRAST_ATTRIBUTE);
    }

    try {
        localStorage.setItem(CONTRAST_STORAGE_KEY, enabled ? CONTRAST_HIGH : CONTRAST_NORMAL);
    }
    catch {
        // Storage unavailable (private mode, blocked site data) — the choice still applies for this page view
    }
}

// Contrast Toggle custom component
export default function ContrastToggle(): React.JSX.Element {
    const isHighContrast = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return (
        <button
            type="button"
            onClick={() => setHighContrast(!isHighContrast)}
            className="fixed top-4 right-16 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:border-green-500/50 hover:text-green-700 dark:hover:text-green-400 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:hover:text-background transition-all duration-200"
            aria-label="High contrast mode"
            aria-pressed={isHighContrast}
            title={isHighContrast ? 'Turn off high contrast' : 'Turn on high contrast'}
        >
            <Contrast className="h-4 w-4" aria-hidden />
        </button>
    );
}
