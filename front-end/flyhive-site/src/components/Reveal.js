import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// One shared reveal. Content is in the DOM and readable from the first frame;
// motion only moves it the last few pixels.
export const Reveal = ({ children, delay = 0, y = 26, className, onMount = false }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  // onMount is for anything in the first screen: it resolves on load rather than
  // waiting for a scroll observer, so the hero can never sit invisible.
  const motionProps = onMount
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10% 0px -10% 0px' },
      };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...motionProps}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Counts a number up when its section comes into view.
export const Counter = ({ to, suffix = '', prefix = '', className }) => {
  const reduce = useReducedMotion();
  const [val, setVal] = React.useState(reduce ? to : 0);
  const ref = React.useRef(null);
  const done = React.useRef(false);

  React.useEffect(() => {
    if (reduce || done.current) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const dur = 1100;
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};
