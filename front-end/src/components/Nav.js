import React from 'react';
import logo from '../assets/logo-dark.png';

const Nav = () => {
  const [stuck, setStuck] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${stuck ? ' stuck' : ''}`}>
      <div className="wrap inner">
        <a className="brand" href="#top" aria-label="FlyHive">
          <img src={logo} alt="FlyHive" />
        </a>
        <a className="cta" href="#waitlist">Join the waitlist</a>
      </div>
    </nav>
  );
};

export default Nav;
