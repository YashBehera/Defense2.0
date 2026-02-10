import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import AirTaxi1 from '../assets/AirTaxi1.jpeg';

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    const heroRef = useRef(null);

    // Hero content - single constant slide
    const heroContent = {
        headline: 'Redefining',
        subline: 'Air Travel',
        ctaLink: '#reserve',
    };

    // Check for mobile and reduced motion preferences
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const checkReducedMotion = () => {
            setIsReducedMotion(
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
            );
        };

        checkMobile();
        checkReducedMotion();

        window.addEventListener('resize', checkMobile);

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', checkReducedMotion);

        return () => {
            window.removeEventListener('resize', checkMobile);
            motionQuery.removeEventListener('change', checkReducedMotion);
        };
    }, []);

    // Initial load animation
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Scroll progress tracking for parallax effect
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
            if (heroRef.current) {
                heroRef.current.style.setProperty('--scroll-progress', progress);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={heroRef}
            className={`hero-archer ${isLoaded ? 'hero-archer--loaded' : ''} ${isMobile ? 'hero-archer--mobile' : ''} ${isReducedMotion ? 'hero-archer--reduced-motion' : ''}`}
            style={{ '--scroll-progress': 0 }}
            aria-label="Hero section"
        >
            {/* Full Background Image */}
            <div className="hero-archer__media">
                <div
                    className="hero-archer__background-image"
                    style={{ backgroundImage: `url(${AirTaxi1})` }}
                    role="img"
                    aria-label="Air Taxi aircraft"
                />
            </div>
            <div className="hero-archer__overlay hero-archer__overlay--gradient"></div>

            {/* Skip to content link for accessibility */}
            <a href="#main-content" className="hero-archer__skip-link">
                Skip to main content
            </a>

            {/* Main Content */}
            <div className="hero-archer__container">
                <div className="hero-archer__content">
                    {/* Static Headline */}
                    <div className="hero-archer__headline-group hero-archer__headline-group--active">
                        <h1 className="hero-archer__title">
                            <span className="hero-archer__title-line">
                                <span className="hero-archer__title-text">{heroContent.headline}</span>
                            </span>
                            <span className="hero-archer__title-line">
                                <span className="hero-archer__title-text hero-archer__title-text--outline">
                                    {heroContent.subline}
                                </span>
                            </span>
                        </h1>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="hero-archer__bottom-bar">
                <div className="hero-archer__bottom-container">
                    {/* Quick Stats */}
                    <div className="hero-archer__stats" role="list" aria-label="Aircraft specifications">
                        <div className="hero-archer__stat-divider" aria-hidden="true"></div>
                        <div className="hero-archer__stat" role="listitem">
                            <span className="hero-archer__stat-value">100%</span>
                            <span className="hero-archer__stat-label">electric</span>
                        </div>
                    </div>


                </div>
            </div>

            {/* Corner Frames (Desktop only) */}
            {!isMobile && (
                <>
                    <div className="hero-archer__frame hero-archer__frame--tl" aria-hidden="true"></div>
                    <div className="hero-archer__frame hero-archer__frame--tr" aria-hidden="true"></div>
                    <div className="hero-archer__frame hero-archer__frame--bl" aria-hidden="true"></div>
                    <div className="hero-archer__frame hero-archer__frame--br" aria-hidden="true"></div>
                </>
            )}

            {/* Scroll Indicator */}
            <div className="hero-archer__scroll-indicator" aria-hidden="true">
                <span className="hero-archer__scroll-text">Scroll</span>
                <div className="hero-archer__scroll-line">
                    <div className="hero-archer__scroll-dot"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;