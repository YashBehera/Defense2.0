import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Header.css';

const Header = ({ 
  sections = [], 
  activeSection = '', 
  onNavClick = () => {}, 
  ctaText = "Get Started",
  onCtaClick = () => {}
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Handle scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((sectionId) => {
    onNavClick(sectionId);
    setIsMobileMenuOpen(false);
  }, [onNavClick]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Logo Component
  const Logo = ({ className = '' }) => (
    <div className={`nav__logo ${className}`}>
      <span className="nav__logo-text">
        <span className="nav__logo-hi">hi</span>
        <span className="nav__logo-ve">ve</span>
        <span className="nav__logo-plus">+</span>
      </span>
    </div>
  );

  return (
    <>
      <header 
        ref={headerRef}
        className={`nav ${isScrolled ? 'nav--scrolled' : ''} ${isMobileMenuOpen ? 'nav--open' : ''}`}
      >
        <div className="nav__wrapper">
          {/* Logo */}
          <a 
            href="/" 
            className="nav__brand"
            aria-label="Hive Plus - Home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <Logo />
          </a>

          {/* Center Navigation */}
          <nav className="nav__menu" aria-label="Main navigation">
            <ul className="nav__list">
              {sections.map((section) => (
                <li key={section.id} className="nav__item">
                  <button
                    className={`nav__link ${activeSection === section.id ? 'nav__link--active' : ''}`}
                    onClick={() => handleNavClick(section.id)}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    {section.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="nav__actions">
            <button className="nav__search" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>

            <button className="nav__cta" onClick={onCtaClick}>
              {ctaText}
            </button>

            {/* Mobile Toggle */}
            <button 
              className={`nav__toggle ${isMobileMenuOpen ? 'nav__toggle--active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="nav__toggle-box">
                <span className="nav__toggle-line"></span>
                <span className="nav__toggle-line"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="nav__progress">
          <div className="nav__progress-bar"></div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div 
        className={`nav-overlay ${isMobileMenuOpen ? 'nav-overlay--visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <aside 
        id="mobile-menu"
        className={`nav-mobile ${isMobileMenuOpen ? 'nav-mobile--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <div className="nav-mobile__container">
          {/* Mobile Header */}
          <div className="nav-mobile__header">
            <Logo className="nav__logo--mobile" />
            <button 
              className="nav-mobile__close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="nav-mobile__nav">
            <ul className="nav-mobile__list">
              {sections.map((section, index) => (
                <li 
                  key={section.id} 
                  className="nav-mobile__item"
                  style={{ '--delay': `${index * 0.05}s` }}
                >
                  <button
                    className={`nav-mobile__link ${activeSection === section.id ? 'nav-mobile__link--active' : ''}`}
                    onClick={() => handleNavClick(section.id)}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    <span className="nav-mobile__link-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="nav-mobile__link-text">{section.name}</span>
                    <span className="nav-mobile__link-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Footer */}
          <div className="nav-mobile__footer">
            <button className="nav-mobile__cta" onClick={() => {
              onCtaClick();
              setIsMobileMenuOpen(false);
            }}>
              <span>{ctaText}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <div className="nav-mobile__info">
              <div className="nav-mobile__contact">
                <span className="nav-mobile__label">Contact</span>
                <a href="mailto:hello@hiveplus.in" className="nav-mobile__value">hello@hiveplus.in</a>
              </div>
              <div className="nav-mobile__social">
                <a href="#" className="nav-mobile__social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="nav-mobile__social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </a>
                <a href="#" className="nav-mobile__social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;