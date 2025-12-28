import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * - Scrolls to top on route change (pathname or hash)
 * - Ensures top on initial mount (page reload)
 * - Respects prefers-reduced-motion
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // If there's a hash, scroll to the element; otherwise scroll to top.
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [pathname, hash]);

  // Ensure on full reload we are at top (immediate)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return null;
};

export default ScrollToTop;