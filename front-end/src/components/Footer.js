import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: {
      title: 'Aircraft',
      links: [
        { name: 'Midnight', href: '#midnight' },
        { name: 'Technology', href: '#technology' },
        { name: 'Safety', href: '#safety' },
        { name: 'Sustainability', href: '#sustainability' },
        { name: 'Specifications', href: '#specs' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Leadership', href: '#leadership' },
        { name: 'Careers', href: '#careers', badge: 'Hiring' },
        { name: 'Press', href: '#press' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'News & Updates', href: '#news' },
        { name: 'Research', href: '#research' },
        { name: 'FAA Certification', href: '#faa' },
        { name: 'Investor Relations', href: '#investors' },
        { name: 'Partners', href: '#partners' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
        { name: 'Accessibility', href: '#accessibility' },
      ],
    },
  };

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
  ];

  const partnerLogos = [
    { name: 'Sarla Aviation', href: 'https://www.sarla-aviation.com', logo: 'SARLA' },
    { name: 'Archer', href: 'https://archer.com', logo: 'ARCHER' },
    { name: 'EHang', href: 'https://www.ehang.com', logo: 'EHANG' },
    { name: 'Aridge', href: 'https://www.aridge.com', logo: 'ARIDGE' },
  ];

  return (
    <footer className="footer">

      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="footer__container">
          {/* Brand Column */}
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <div className="footer__logo-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="footer__logo-text">SKYWARD</span>
            </a>
            <p className="footer__tagline">
              Freedom to Fly — Urban Air Mobility for All
            </p>
            <p className="footer__description">
              Pioneering the future of transportation with safe, sustainable, 
              and accessible electric vertical takeoff and landing aircraft.
            </p>

            {/* Social Links */}
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  onMouseEnter={() => setIsHovered(social.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <span className="footer__social-icon">{social.icon}</span>
                  <span className={`footer__social-tooltip ${isHovered === social.name ? 'visible' : ''}`}>
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="footer__links">
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key} className="footer__column">
                <h4 className="footer__column-title">{section.title}</h4>
                <ul className="footer__list">
                  {section.links.map((link, index) => (
                    <li key={index} className="footer__item">
                      <a href={link.href} className="footer__link">
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="footer__badge">{link.badge}</span>
                        )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Partners Section */}
        <div className="footer__partners">
          <div className="footer__container">
            <p className="footer__partners-label">Inspired by Industry Leaders</p>
            <div className="footer__partners-grid">
              {partnerLogos.map((partner, index) => (
                <a
                  key={index}
                  href={partner.href}
                  className="footer__partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--index': index }}
                >
                  <span className="footer__partner-logo">{partner.logo}</span>
                  <span className="footer__partner-hover">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
  
        {/* Decorative Elements */}
        <div className="footer__decoration">
          <div className="footer__decoration-grid"></div>
          <div className="footer__decoration-glow footer__decoration-glow--1"></div>
          <div className="footer__decoration-glow footer__decoration-glow--2"></div>
        </div>
      </footer>
    );
  };
  
  export default Footer;