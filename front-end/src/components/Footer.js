import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {


  const [isHovered, setIsHovered] = useState(null);







  const socialLinks = [
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com/hiveplus',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/hiveplus',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/hiveplus',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@hiveplus',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  const cities = [
    'Mumbai',
    'Bangalore',
    'Delhi NCR',
    'Hyderabad',
    'Chennai',
    'Pune',
  ];

  return (
    <footer className="hive-footer">

      {/* Main Footer */}
      <div className="hive-footer__main">
        <div className="hive-footer__container">
          <div className="hive-footer__grid">
            {/* Brand Column */}
            <div className="hive-footer__brand">
              <a href="/" className="hive-footer__logo" aria-label="hive+ home">
                <span className="hive-footer__logo-text">
                  <span className="hive-footer__logo-hive">hi</span>
                  <span className="hive-footer__logo-plus">ve+</span>
                </span>
              </a>

              <p className="hive-footer__tagline">
                Skip traffic. Take the sky.
              </p>

              <p className="hive-footer__description">
                Urban air mobility platform. Making flying cars a reality for everyday commuters.
              </p>

              {/* Social Links */}
              <div className="hive-footer__social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="hive-footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    onMouseEnter={() => setIsHovered(social.name)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <span className="hive-footer__social-icon">{social.icon}</span>
                    <span className={`hive-footer__social-tooltip ${isHovered === social.name ? 'active' : ''}`}>
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* App Download Badges (Coming Soon) */}
              <div className="hive-footer__app-badges">
                <span className="hive-footer__app-label">Coming Soon</span>
                <div className="hive-footer__app-icons">
                  <div className="hive-footer__app-badge hive-footer__app-badge--disabled">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span>App Store</span>
                  </div>
                  <div className="hive-footer__app-badge hive-footer__app-badge--disabled">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    <span>Play Store</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div className="hive-footer__cities">
        <div className="hive-footer__container">
          <div className="hive-footer__cities-inner">
            <span className="hive-footer__cities-label">Launching in</span>
            <div className="hive-footer__cities-list">
              {cities.map((city, index) => (
                <span key={index} className="hive-footer__city">
                  {city}
                  {index < cities.length - 1 && <span className="hive-footer__city-dot">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Background Decoration */}
      <div className="hive-footer__bg-pattern" aria-hidden="true" />
    </footer>
  );
};

export default Footer;