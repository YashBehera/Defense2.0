import React, { useEffect, useState } from 'react';
import logo from '../assets/logo-light.png';

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={solid ? 'nav solid' : 'nav'}>
      <a href="#top" aria-label="FlyHive Technologies">
        <img src={logo} alt="FlyHive" />
      </a>
      <div className="nav-right">
        <a className="btn" href="#waitlist">Join the waitlist</a>
      </div>
    </nav>
  );
}
