import React from 'react';
import logo from '../assets/logo-light.png';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <img src={logo} alt="FlyHive Technologies" />
          <div className="foot-links">
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
          <span>DPIIT DIPP262989</span>
        </div>
      </div>
    </footer>
  );
}
