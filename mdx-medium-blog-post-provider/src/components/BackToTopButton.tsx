'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Smooth-scroll back to the top — pure helper hoisted to module scope so it isn't reallocated each render
const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Floating button that appears after scrolling down and returns the user to the top of the page
export default function BackToTopButton(): React.JSX.Element | null {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-500 text-black shadow-lg hover:bg-green-400 transition-colors duration-200"
      aria-label="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
