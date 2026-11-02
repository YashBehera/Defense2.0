import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo-light.png';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // off the home page the waitlist lives behind a route change
  const waitlistTo = pathname === '/' ? '#waitlist' : '/#waitlist';

  return (
    <nav className={solid || pathname !== '/' ? 'nav solid' : 'nav'}>
      <Link to="/" aria-label="FlyHive Technologies, home">
        <img src={logo} alt="FlyHive" />
      </Link>
      <div className="nav-right">
        <NavLink className="nav-link" to="/team">Team</NavLink>
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
        {pathname === '/' ? (
          <a className="btn" href={waitlistTo}>Join the waitlist</a>
        ) : (
          <Link className="btn" to={waitlistTo}>Join the waitlist</Link>
        )}
      </div>
    </nav>
  );
}
