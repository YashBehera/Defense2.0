import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-light.png';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <Link to="/" aria-label="FlyHive Technologies, home">
            <img src={logo} alt="FlyHive Technologies" />
          </Link>
          <div className="foot-links">
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
            <a href="mailto:info@flyhivetechnologies.com">info@flyhivetechnologies.com</a>
            <a
              href="https://www.linkedin.com/company/flyhive-technologies"
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/flyhive.technologies"
              target="_blank"
              rel="noreferrer noopener"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="foot-meta">
          <span>FlyHive Technologies Pvt Ltd</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
