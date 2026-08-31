'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Back-to-top control. Sits above the assistant button in the bottom-right
 * stack and only appears once the visitor has scrolled a meaningful distance.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      }}
      className="fixed bottom-[6.5rem] right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-night-900/90 text-slate-300 shadow-card backdrop-blur transition-colors hover:border-accent-400/50 hover:text-accent-400 sm:right-6"
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
