import { useEffect, useRef, useState } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: RevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
            return;
          }
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, revealed };
}
