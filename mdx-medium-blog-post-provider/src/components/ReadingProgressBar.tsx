'use client';

import { useEffect, useState } from 'react';

// Thin fixed progress bar at the top of the page indicating scroll depth through the article
export default function ReadingProgressBar(): React.JSX.Element {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const updateProgress = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-green-500 transition-all duration-75 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
