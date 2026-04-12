"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// ViewCounter — Client Component for SSG pages.
// Fires a POST to the /api/views/[slug] Route Handler on mount,
// which increments the count in Supabase and returns the new value.
export default function ViewCounter({ slug }: { slug: string }): React.JSX.Element | null {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/api/views/${encodeURIComponent(slug)}`, { method: "POST" })
            .then((res) => res.json())
            .then((data: { count?: number }) => {
                if (typeof data.count === "number") {
                    setCount(data.count);
                }
            })
            .catch(() => {
                // Silently fail — view count is non-critical
            });
    }, [slug]);

    if (count === null) return null;

    return (
        <span className="inline-flex items-center gap-1 ml-2">
            • <Eye className="inline h-3 w-3" /> {count.toLocaleString()} views
        </span>
    );
}
