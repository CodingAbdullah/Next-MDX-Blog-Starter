'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';

// Themed Toaster component
export default function ThemedToaster(): React.JSX.Element {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Toaster
            theme={mounted && resolvedTheme === 'light' ? 'light' : 'dark'}
            position="bottom-right"
            richColors
        />
    );
}
