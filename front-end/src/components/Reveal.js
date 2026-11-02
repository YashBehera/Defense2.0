import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* A block that lifts into place the first time it is seen.
   onMount skips the observer, for anything already on screen at load. */
export function Reveal({ children, delay = 0, y = 26, onMount = false, className, as = 'div' }) {
  const Tag = motion[as] || motion.div;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (onMount) {
      // a timer, not rAF: rAF never fires while the tab is in the background,
      // which would leave the hero blank until the visitor focused it
      const id = setTimeout(() => setMounted(true), 0);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [onMount]);

  const show = reduced() || (onMount ? mounted : inView);

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced() ? 0 : y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced() ? 0 : y }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* Big type that comes up word by word from behind its own baseline. */
export function Words({ text, className, delay = 0, onMount = false, stagger = 0.045 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (onMount) {
      // a timer, not rAF: rAF never fires while the tab is in the background,
      // which would leave the hero blank until the visitor focused it
      const id = setTimeout(() => setMounted(true), 0);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [onMount]);

  const show = reduced() || (onMount ? mounted : inView);
  const words = String(text).split(' ');

  return (
    <span ref={ref} className={className} style={{ display: 'block' }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: reduced() ? 0 : '108%' }}
            animate={show ? { y: 0 } : { y: reduced() ? 0 : '108%' }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: EASE }}
            dangerouslySetInnerHTML={{ __html: w + (i < words.length - 1 ? '&nbsp;' : '') }}
          />
        </span>
      ))}
    </span>
  );
}

/* A number that runs up to its value once, when it comes into view. */
export function Counter({ to, suffix = '', duration = 1500, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduced()) {
      setVal(to);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || done.current) return;
          done.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(to * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.45 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  const shown = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString('en-US');

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

export default Reveal;
