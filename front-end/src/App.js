import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Contact from './pages/Contact';

const NAV_H = 76; // the fixed nav, so an anchor never lands under it

/* One Lenis instance for the whole app, shared so anchor links and route
   changes can drive it instead of fighting it. */
function Smooth({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    window.__lenis = lenis;

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
      lenis.scrollTo(el, { offset: -NAV_H });
    };
    document.addEventListener('click', jump);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', jump);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // a new page starts at the top; a hash goes to its section once it exists
  useEffect(() => {
    const go = () => {
      const el = hash ? document.querySelector(hash) : null;
      if (el) {
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -NAV_H });
        else el.scrollIntoView();
        return;
      }
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };
    const id = setTimeout(go, hash ? 90 : 0);
    return () => clearTimeout(id);
  }, [pathname, hash]);

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Smooth>
        <a className="skip" href="#main">Skip to main content</a>
        <Nav />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Smooth>
    </BrowserRouter>
  );
}
