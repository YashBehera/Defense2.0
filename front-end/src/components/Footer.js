import React from 'react';
import logo from '../assets/logo-dark.png';

const Footer = () => (
  <footer className="footer">
    <div className="wrap inner">
      <div>
        <img className="flogo" src={logo} alt="FlyHive" />
        <div className="co">FlyHive Technologies Pvt Ltd</div>
        <div className="meta">
          Recognised by the Ministry of Commerce and Industry under aeronautics,
          aerospace and defence. DPIIT certificate DIPP262989.
          <br />
          &copy; {new Date().getFullYear()}
        </div>
      </div>
      <div className="links">
        <a href="mailto:info@flyhivetechnologies.com">info@flyhivetechnologies.com</a>
        <a href="https://www.linkedin.com/company/flyhive-technologies-pvt-ltd/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.instagram.com/flyhive_technologies/" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </div>
  </footer>
);

export default Footer;
