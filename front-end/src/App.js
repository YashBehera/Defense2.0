import React from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Waitlist from './components/Waitlist';
import { Hero, Problem, Gap, HowItWorks, Aircraft, Network, Company, Close } from './components/Sections';

function App() {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Gap />
        <HowItWorks />
        <Waitlist />
        <Aircraft />
        <Network />
        <Company />
        <Close />
      </main>
      <Footer />
    </>
  );
}

export default App;
