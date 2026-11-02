import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav';
import Footer from './components/Footer';
import {
  Hero,
  Problem,
  Gap,
  HowItWorks,
  Craft,
  Network,
  Company,
  Close,
  Waitlist,
} from './components/Sections';

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const jump = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -10 });
    };
    document.addEventListener('click', jump);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', jump);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#problem">Skip to main content</a>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Gap />
        <HowItWorks />
        <Waitlist />
        <Craft />
        <Network />
        <Company />
        <Close />
      </main>
      <Footer />
    </>
  );
}
