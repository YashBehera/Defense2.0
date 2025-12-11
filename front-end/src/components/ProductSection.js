import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './ProductSection.css';
import Panaromic from './Panaromic.png';
import CarbonFiber from './CarbonFibre.jpeg';
import ProductHero from './VertiPort2.mp4';
import VertiPort from './Vertiport.jpeg';

// Custom hook for smooth counter animation
const useCountUp = (end, duration = 2000, start = 0, isActive = false) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (!isActive) return;

        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * (end - start) + start));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, start, isActive]);

    return count;
};

// Debounce utility
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const ProductSection = () => {
    // State management
    const [isVisible, setIsVisible] = useState({});
    const [activeFeature, setActiveFeature] = useState(0);
    const [videoState, setVideoState] = useState({
        loaded: false,
        playing: false,
        error: false
    });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Refs
    const sectionRefs = useRef({});
    const videoRef = useRef(null);
    const cursorRef = useRef(null);
    const featureInterval = useRef(null);
    const featurePaused = useRef(false);
    const rafRef = useRef(null);

    // Continuing ProductSection.jsx from product data...

    // Product data with memoization
    const product = useMemo(() => ({
        name: 'Shunya One',
        tagline: 'Urban Air Mobility',
        heroSubtitle: 'Experience revolutionary electric air travel. Safe, sustainable, and redefining how cities connect.',
        company: 'FlyHive Technologies',
        safetyStats: [
            { label: 'Flight Control', value: 3, unit: 'Redundancy', icon: 'flightControl', description: 'Triple-redundant flight systems' },
            { label: 'Power System', value: 2, unit: 'Redundancy', icon: 'power', description: 'Dual power distribution' },
            { label: 'Battery Management', value: 2, unit: 'Redundancy', icon: 'battery', description: 'Intelligent BMS failsafe' },
            { label: 'Communication', value: 2, unit: 'Redundancy', icon: 'communication', description: 'Multi-band radio systems' },
            { label: 'Navigation', value: 2, unit: 'Redundancy', icon: 'navigation', description: 'GPS + INS backup' },
        ],
        featureCards: [
            {
                id: 'cockpit',
                title: '360° Panoramic View',
                description: 'Made from aerospace-grade polycarbonate with unobstructed visibility for pilots and passengers.',
                image: Panaromic,
                badge: 'Design',
            },
            {
                id: 'carbon',
                title: 'Carbon Fiber Excellence',
                description: 'Main structure and rotors crafted from carbon fiber for optimal strength and minimal weight.',
                image: CarbonFiber,
                badge: 'Material',
            },
            {
                id: 'climate',
                title: 'Climate Control System',
                description: 'Advanced HVAC system ensures comfortable cabin temperature in all weather conditions.',
                image: VertiPort,
                badge: 'Comfort',
            },
        ],
        specs: [
            { label: 'Max Range', value: 300, unit: 'km', icon: 'range' },
            { label: 'Top Speed', value: 100, unit: 'km/h', icon: 'speed' },
            { label: 'Passengers', value: 2, unit: 'seats', icon: 'passengers' },
            { label: 'Charge Time', value: 20, unit: 'min', icon: 'charge' },
        ],
        showcaseSections: [
            {
                id: 'modular',
                title: 'Store an "Aircraft" at Your Vertiport',
                subtitle: 'India\'s First Modular eVTOL Design',
                description: 'One-button operation enables seamless configuration changes between passenger and cargo modes within 10 minutes.',
                image: VertiPort,
                alignment: 'center',
                stats: [
                    { value: '10', unit: 'min', label: 'Config Change' },
                    { value: '2', unit: 'modes', label: 'Operations' },
                ],
            },
            {
                id: 'urban',
                title: 'Redefining City Transport',
                subtitle: 'Skip the traffic, embrace the sky',
                description: 'Designed specifically for India\'s urban environments with whisper-quiet operation and zero emissions.',
                image: Panaromic,
                alignment: 'right',
                stats: [
                    { value: '65', unit: 'dB', label: 'Noise Level' },
                    { value: '0', unit: 'g', label: 'Emissions' },
                ],
            },
        ],
        techHighlights: [
            {
                id: 'hybrid',
                title: 'Hybrid-Electric Powertrain',
                description: 'Combining electric efficiency with extended range capability for intercity travel.',
                icon: 'bolt',
                stats: [
                    { value: '120', unit: 'kWh', label: 'Battery' },
                    { value: '8', unit: 'Motors', label: 'Propulsion' },
                ],
            },
            {
                id: 'autonomous',
                title: 'Autonomous Flight Ready',
                description: 'AI-powered flight control with real-time obstacle detection and emergency protocols.',
                icon: 'cpu',
                stats: [
                    { value: '360°', unit: 'Sensors', label: 'Coverage' },
                    { value: '99.9', unit: '%', label: 'Reliability' },
                ],
            },
        ],
        detailedSpecs: [
            {
                category: 'Performance', specs: [
                    { label: 'Max Range', value: '300', unit: 'km' },
                    { label: 'Top Speed', value: '200', unit: 'km/h' },
                    { label: 'Cruise Speed', value: '150', unit: 'km/h' },
                    { label: 'Max Altitude', value: '3000', unit: 'm' },
                ]
            },
            {
                category: 'Capacity', specs: [
                    { label: 'Passengers', value: '6', unit: 'seats' },
                    { label: 'Cargo Capacity', value: '200', unit: 'kg' },
                    { label: 'MTOW', value: '1800', unit: 'kg' },
                ]
            },
            {
                category: 'Power', specs: [
                    { label: 'Battery', value: '120', unit: 'kWh' },
                    { label: 'Charge Time', value: '30', unit: 'min' },
                    { label: 'Motors', value: '8', unit: 'units' },
                ]
            },
            {
                category: 'Dimensions', specs: [
                    { label: 'Length', value: '8.5', unit: 'm' },
                    { label: 'Wingspan', value: '12.0', unit: 'm' },
                    { label: 'Height', value: '3.2', unit: 'm' },
                ]
            },
        ],
        timeline: [
            { year: '2023', title: 'Design Complete', description: 'Finalized aerodynamic design and systems architecture', status: 'completed' },
            { year: '2024', title: 'Prototype Testing', description: 'Ground and flight testing of full-scale prototype', status: 'current' },
            { year: '2025', title: 'DGCA Certification', description: 'Type certification and regulatory approval', status: 'upcoming' },
            { year: '2026', title: 'Commercial Launch', description: 'First commercial operations begin', status: 'upcoming' },
        ],
        trustBadges: [
            { icon: 'shield', label: 'DGCA Certified', description: 'Meeting all aviation safety standards' },
            { icon: 'heart', label: 'Made in India', description: 'Designed and manufactured locally' },
            { icon: 'clock', label: '2026 Delivery', description: 'On track for commercial launch' },
            { icon: 'leaf', label: 'Zero Emissions', description: 'Fully electric operation' },
        ],
    }), []);

    // Check for mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        const debouncedCheck = debounce(checkMobile, 150);
        window.addEventListener('resize', debouncedCheck);
        return () => window.removeEventListener('resize', debouncedCheck);
    }, []);

    // Scroll progress tracker
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(Math.min(scrolled / maxScroll, 1));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection observer for all sections
    useEffect(() => {
        const observers = new Map();
        const sections = ['hero', 'safety', 'features', 'specs', 'timeline', 'cta'];

        // Add showcase sections
        product.showcaseSections.forEach((_, i) => sections.push(`showcase-${i}`));

        sections.forEach((section) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [section]: true }));
                    }
                },
                { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
            );

            if (sectionRefs.current[section]) {
                observer.observe(sectionRefs.current[section]);
                observers.set(section, observer);
            }
        });

        return () => observers.forEach(observer => observer.disconnect());
    }, [product.showcaseSections]);

    // Video management
    const playVideo = useCallback(async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            video.muted = true;
            video.playbackRate = 0.85; // Slightly slower for cinematic feel
            await video.play();
            setVideoState(prev => ({ ...prev, playing: true }));
        } catch (error) {
            console.warn('Video autoplay prevented:', error);
            setVideoState(prev => ({ ...prev, error: true }));
        }
    }, []);

    const handleVideoLoad = useCallback(() => {
        setVideoState(prev => ({ ...prev, loaded: true }));
        playVideo();
    }, [playVideo]);

    const handleVideoError = useCallback(() => {
        setVideoState(prev => ({ ...prev, error: true, loaded: false }));
    }, []);

    // Play/pause video based on visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && videoState.loaded) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRefs.current.hero) {
            observer.observe(sectionRefs.current.hero);
        }

        return () => observer.disconnect();
    }, [videoState.loaded]);

    // Cursor glow effect (desktop only)
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
                }
                rafRef.current = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isMobile]);

    // Feature auto-rotation
    useEffect(() => {
        featureInterval.current = setInterval(() => {
            if (!featurePaused.current) {
                setActiveFeature(prev => (prev + 1) % product.featureCards.length);
            }
        }, 5000);

        return () => clearInterval(featureInterval.current);
    }, [product.featureCards.length]);

    // Render safety icon
    const renderIcon = useCallback((iconType, className = '') => {
        const icons = {
            flightControl: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
            power: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <rect x="2" y="7" width="16" height="10" rx="2" />
                    <path d="M22 11v2" />
                    <path d="M6 11v2" />
                    <path d="M10 11v2" />
                </svg>
            ),
            battery: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            ),
            communication: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
                    <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
                </svg>
            ),
            navigation: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
            ),
            bolt: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            ),
            cpu: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
                </svg>
            ),
            shield: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            ),
            heart: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            clock: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            ),
            leaf: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M6.5 21.5C4 19 2 15.5 2 12c0-5.5 4.5-10 10-10 3.5 0 7 2 9.5 4.5-2.5 2.5-6 4.5-9.5 4.5-3.5 0-5 1.5-5 5 0 1.5.5 3 1.5 4.5" />
                    <path d="M12 12c-1.5 1.5-2 3.5-2 5.5" />
                </svg>
            ),
            range: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                </svg>
            ),
            speed: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
            passengers: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            charge: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
                    <rect x="1" y="6" width="18" height="12" rx="2" />
                    <path d="M23 10v4" />
                    <path d="M7 10l2 2 4-4" />
                </svg>
            ),
            arrow: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                </svg>
            ),
            play: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
            ),
            download: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            ),
            check: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
                    <path d="M5 12l5 5L20 7" />
                </svg>
            ),
        };
        return icons[iconType] || icons.shield;
    }, []);

    // Form handlers
    const handleNewsletterSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        console.log('Newsletter subscription:', email);
        // Add your newsletter API call here
        e.target.reset();
    }, []);

    const handleReserveClick = useCallback(() => {
        console.log('Reserve button clicked');
        // Add your reservation logic here
    }, []);

    return (
        <div className="product-page">
            {/* Progress Bar */}
            <div
                className="scroll-progress"
                style={{ transform: `scaleX(${scrollProgress})` }}
                aria-hidden="true"
            />

            {/* Cursor Glow */}
            {!isMobile && (
                <div
                    ref={cursorRef}
                    className="cursor-glow"
                    aria-hidden="true"
                />
            )}

            {/* ==================== HERO SECTION ==================== */}
            <section
                ref={el => sectionRefs.current.hero = el}
                className={`hero ${isVisible.hero ? 'hero--visible' : ''}`}
                aria-label="Hero"
            >
                {/* Video Background */}
                <div className="hero__media">
                    <div className={`hero__video-container ${videoState.loaded ? 'hero__video-container--loaded' : ''}`}>
                        <video
                            ref={videoRef}
                            className="hero__video"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            onCanPlayThrough={handleVideoLoad}
                            onError={handleVideoError}
                        >
                            <source src={ProductHero} type="video/mp4" />
                        </video>

                        {/* Loading State */}
                        {!videoState.loaded && !videoState.error && (
                            <div className="hero__loader">
                                <div className="hero__loader-spinner" />
                                <span className="hero__loader-text">Loading Experience</span>
                            </div>
                        )}

                        {/* Error Fallback */}
                        {videoState.error && (
                            <div
                                className="hero__fallback"
                                style={{ backgroundImage: `url(${VertiPort})` }}
                            />
                        )}
                    </div>

                    {/* Cinematic Overlays */}
                    <div className="hero__overlay hero__overlay--gradient" />
                    <div className="hero__overlay hero__overlay--vignette" />
                    <div className="hero__overlay hero__overlay--noise" />
                </div>

                {/* Floating Orbs */}
                <div className="hero__orbs" aria-hidden="true">
                    <div className="hero__orb hero__orb--1" />
                    <div className="hero__orb hero__orb--2" />
                    <div className="hero__orb hero__orb--3" />
                </div>

                {/* Main Content */}
                <div className="hero__wrapper">
                    <div className="hero__content">
                        {/* Eyebrow / Company Badge */}
                        <div className="hero__eyebrow">
                            <div className="hero__eyebrow-line" />
                            <span className="hero__eyebrow-text">{product.company}</span>
                            <div className="hero__eyebrow-line" />
                        </div>

                        {/* Main Headline */}
                        <h1 className="hero__headline">
                            <span className="hero__headline-row">
                                <span className="hero__headline-word hero__headline-word--accent">"</span>
                                <span className="hero__headline-word">Urban</span>
                            </span>
                            <span className="hero__headline-row">
                                <span className="hero__headline-word">Air</span>
                                <span className="hero__headline-word">Mobility</span>
                                <span className="hero__headline-word hero__headline-word--accent">"</span>
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p className="hero__tagline">{product.heroSubtitle}</p>

                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className="hero__stats">
                    {product.specs.map((spec, index) => (
                        <div
                            key={index}
                            className="hero__stat"
                            style={{ '--index': index }}
                        >
                            <div className="hero__stat-icon">
                                {renderIcon(spec.icon)}
                            </div>
                            <div className="hero__stat-content">
                                <span className="hero__stat-value">
                                    <CountUpNumber
                                        end={spec.value}
                                        duration={2000}
                                        isActive={isVisible.hero}
                                    />
                                    <span className="hero__stat-unit">{spec.unit}</span>
                                </span>
                                <span className="hero__stat-label">{spec.label}</span>
                            </div>
                            <div className="hero__stat-bar">
                                <div className="hero__stat-bar-fill" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll CTA */}
                <div className="hero__scroll-cta">
                    <span className="hero__scroll-text">Discover More</span>
                    <div className="hero__scroll-indicator">
                        <div className="hero__scroll-line">
                            <div className="hero__scroll-dot" />
                        </div>
                    </div>
                    <div className="hero__scroll-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="hero__accent hero__accent--tl" aria-hidden="true" />
                <div className="hero__accent hero__accent--br" aria-hidden="true" />
            </section>

            {/* ==================== SAFETY SECTION ==================== */}
            <section
                ref={el => sectionRefs.current.safety = el}
                className={`safety ${isVisible.safety ? 'safety--visible' : ''}`}
                aria-labelledby="safety-title"
            >
                {/* Background Elements */}
                <div className="safety__bg">
                    <div className="safety__bg-gradient" />
                    <div className="safety__bg-grid" />
                    <div className="safety__bg-glow" />
                </div>

                {/* Floating Safety Badge */}
                <div className="safety__floating-badge">
                    <div className="safety__floating-badge-inner">
                        <span className="safety__floating-badge-icon">
                            {renderIcon('shield')}
                        </span>
                        <span className="safety__floating-badge-text">Certified Safe</span>
                    </div>
                </div>

                <div className="safety__container">
                    {/* Left Content */}
                    <div className="safety__left">
                        {/* Section Header */}
                        <div className="safety__header">
                            <div className="safety__label">
                                <span className="safety__label-dot" />
                                <span className="safety__label-text">Safety First</span>
                            </div>
                            <h2 id="safety-title" className="safety__title">
                                <span className="safety__title-line">Redundant</span>
                                <span className="safety__title-line">
                                    <span className="safety__title-highlight">Safety</span> Systems
                                </span>
                            </h2>
                            <p className="safety__description">
                                In case of primary system failure, the backup system seamlessly
                                activates, ensuring multiple layers of protection for every flight.
                            </p>
                        </div>

                        {/* Main Stats Cards */}
                        <div className="safety__cards">
                            {product.safetyStats.slice(0, 3).map((stat, index) => (
                                <div
                                    key={index}
                                    className="safety-card"
                                    style={{ '--index': index }}
                                    tabIndex={0}
                                >
                                    {/* Card Number */}
                                    <span className="safety-card__number">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    {/* Left Section - Icon */}
                                    <div className="safety-card__icon-area">
                                        <div className="safety-card__icon-bg">
                                            <div className="safety-card__icon">
                                                {renderIcon(stat.icon)}
                                            </div>
                                        </div>
                                        <svg className="safety-card__icon-ring" viewBox="0 0 100 100">
                                            <circle
                                                cx="50" cy="50" r="46"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                strokeDasharray="289"
                                                strokeDashoffset="289"
                                                className="safety-card__icon-ring-circle"
                                            />
                                        </svg>
                                    </div>

                                    {/* Middle Section - Content */}
                                    <div className="safety-card__body">
                                        <div className="safety-card__header">
                                            <span className="safety-card__label">{stat.label}</span>
                                            <span className="safety-card__badge">Active</span>
                                        </div>
                                        <p className="safety-card__desc">{stat.description}</p>
                                    </div>

                                    {/* Right Section - Value */}
                                    <div className="safety-card__value-area">
                                        <div className="safety-card__value-container">
                                            <span className="safety-card__value">
                                                {isVisible.safety ? (
                                                    <CountUpNumber
                                                        end={stat.value}
                                                        duration={1500}
                                                        isActive={isVisible.safety}
                                                    />
                                                ) : stat.value}
                                            </span>
                                            <span className="safety-card__value-x">×</span>
                                        </div>
                                        <span className="safety-card__unit">{stat.unit}</span>

                                        {/* Mini Progress */}
                                        <div className="safety-card__meter">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`safety-card__meter-bar ${i < stat.value ? 'safety-card__meter-bar--active' : ''}`}
                                                    style={{ '--bar-index': i }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hover Gradient */}
                                    <div className="safety-card__gradient" />

                                    {/* Bottom Accent Line */}
                                    <div className="safety-card__accent" />
                                </div>
                            ))}
                        </div>

                        {/* Additional Stats Row */}
                        <div className="safety__mini-stats">
                            {product.safetyStats.slice(3).map((stat, index) => (
                                <div
                                    key={index}
                                    className="safety-mini"
                                    style={{ '--index': index + 3 }}
                                    tabIndex={0}
                                >
                                    <div className="safety-mini__icon-wrapper">
                                        <div className="safety-mini__icon">
                                            {renderIcon(stat.icon)}
                                        </div>
                                        <div className="safety-mini__icon-pulse" />
                                    </div>
                                    <div className="safety-mini__content">
                                        <div className="safety-mini__row">
                                            <span className="safety-mini__value">{stat.value}×</span>
                                            <span className="safety-mini__label">{stat.label}</span>
                                        </div>
                                        <div className="safety-mini__bar">
                                            <div
                                                className="safety-mini__bar-fill"
                                                style={{ '--progress': `${(stat.value / 3) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="safety-mini__arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="safety__cta">
                            <button className="safety__cta-btn">
                                <span>View Safety Report</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </button>
                            <span className="safety__cta-note">DGCA Compliant • ISO Certified</span>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="safety__right">
                        <div className="safety__visual">
                            {/* Central Shield */}
                            <div className="safety__shield">
                                <svg viewBox="0 0 200 240" className="safety__shield-svg">
                                    <defs>
                                        <linearGradient id="safetyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#c41e3a" stopOpacity="1" />
                                            <stop offset="50%" stopColor="#e63946" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#c41e3a" stopOpacity="0.6" />
                                        </linearGradient>
                                        <filter id="safetyGlow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="8" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                        <clipPath id="shieldClip">
                                            <path d="M100 15 L175 50 L175 125 C175 170 100 215 100 215 C100 215 25 170 25 125 L25 50 L100 15Z" />
                                        </clipPath>
                                    </defs>

                                    {/* Outer Shield */}
                                    <path
                                        d="M100 10 L180 48 L180 128 C180 178 100 225 100 225 C100 225 20 178 20 128 L20 48 L100 10Z"
                                        className="safety__shield-outer"
                                        stroke="url(#safetyGradient)"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />

                                    {/* Middle Shield */}
                                    <path
                                        d="M100 25 L165 55 L165 120 C165 162 100 202 100 202 C100 202 35 162 35 120 L35 55 L100 25Z"
                                        className="safety__shield-middle"
                                        stroke="url(#safetyGradient)"
                                        strokeWidth="1"
                                        strokeDasharray="6 4"
                                        fill="none"
                                    />

                                    {/* Inner Shield Fill */}
                                    <path
                                        d="M100 40 L150 65 L150 115 C150 148 100 182 100 182 C100 182 50 148 50 115 L50 65 L100 40Z"
                                        className="safety__shield-inner"
                                        fill="rgba(196, 30, 58, 0.08)"
                                        stroke="url(#safetyGradient)"
                                        strokeWidth="0.5"
                                    />

                                    {/* Animated scan line */}
                                    <g clipPath="url(#shieldClip)">
                                        <line
                                            x1="20" y1="0" x2="180" y2="0"
                                            stroke="url(#safetyGradient)"
                                            strokeWidth="2"
                                            className="safety__shield-scan"
                                        />
                                    </g>
                                </svg>

                                {/* Center Icon */}
                                <div className="safety__shield-center">
                                    <div className="safety__shield-center-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 12l2 2 4-4" />
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </div>
                                    <div className="safety__shield-center-pulse" />
                                    <div className="safety__shield-center-pulse safety__shield-center-pulse--delay" />
                                </div>

                                {/* Orbiting Elements */}
                                <div className="safety__shield-orbit safety__shield-orbit--1">
                                    <div className="safety__shield-orbit-dot" />
                                </div>
                                <div className="safety__shield-orbit safety__shield-orbit--2">
                                    <div className="safety__shield-orbit-dot" />
                                </div>
                                <div className="safety__shield-orbit safety__shield-orbit--3">
                                    <div className="safety__shield-orbit-dot" />
                                </div>

                                {/* Floating Labels */}
                                <div className="safety__shield-labels">
                                    <div className="safety__shield-label safety__shield-label--1">
                                        <span className="safety__shield-label-dot" />
                                        <span className="safety__shield-label-text">Flight Control</span>
                                    </div>
                                    <div className="safety__shield-label safety__shield-label--2">
                                        <span className="safety__shield-label-dot" />
                                        <span className="safety__shield-label-text">Power System</span>
                                    </div>
                                    <div className="safety__shield-label safety__shield-label--3">
                                        <span className="safety__shield-label-dot" />
                                        <span className="safety__shield-label-text">Navigation</span>
                                    </div>
                                </div>
                            </div>

                            {/* Background Glow */}
                            <div className="safety__visual-glow" />

                            {/* Connection Lines */}
                            <svg className="safety__visual-lines" viewBox="0 0 400 400">
                                <line x1="200" y1="200" x2="50" y2="80" className="safety__visual-line" />
                                <line x1="200" y1="200" x2="350" y2="100" className="safety__visual-line" />
                                <line x1="200" y1="200" x2="80" y2="320" className="safety__visual-line" />
                                <line x1="200" y1="200" x2="320" y2="300" className="safety__visual-line" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Bottom Marquee */}
                <div className="safety__marquee">
                    <div className="safety__marquee-track">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="safety__marquee-content">
                                <span>Triple Redundancy</span>
                                <span className="safety__marquee-dot" />
                                <span>Fail-Safe Systems</span>
                                <span className="safety__marquee-dot" />
                                <span>Real-Time Monitoring</span>
                                <span className="safety__marquee-dot" />
                                <span>Emergency Protocols</span>
                                <span className="safety__marquee-dot" />
                                <span>DGCA Certified</span>
                                <span className="safety__marquee-dot" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FEATURES SECTION - HORIZONTAL SCROLL ==================== */}
            <section
                ref={el => sectionRefs.current.features = el}
                className={`features ${isVisible.features ? 'features--visible' : ''}`}
                aria-labelledby="features-title"
            >
                {/* Simple Background */}
                <div className="features__bg">
                    <div className="features__bg-gradient" />
                    <div className="features__bg-accent" />
                </div>

                {/* Section Header */}
                <div className="features__header">
                    <div className="features__header-content">
                        <div className="features__label">
                            <span className="features__label-dot" />
                            <span className="features__label-text">Design Excellence</span>
                        </div>
                        <h2 id="features-title" className="features__title">
                            Crafted with <span className="features__title-accent">Precision</span>
                        </h2>
                        <p className="features__subtitle">
                            Every detail meticulously designed. Every component engineered for perfection.
                        </p>
                    </div>

                    {/* Navigation Controls */}
                    <div className="features__controls">
                        <div className="features__progress-info">
                            <span className="features__progress-current">
                                {String(activeFeature + 1).padStart(2, '0')}
                            </span>
                            <div className="features__progress-bar">
                                <div
                                    className="features__progress-fill"
                                    style={{
                                        width: `${((activeFeature + 1) / product.featureCards.length) * 100}%`
                                    }}
                                />
                            </div>
                            <span className="features__progress-total">
                                {String(product.featureCards.length).padStart(2, '0')}
                            </span>
                        </div>
                        <div className="features__nav-buttons">
                            <button
                                className="features__nav-btn"
                                onClick={() => setActiveFeature(prev =>
                                    prev === 0 ? product.featureCards.length - 1 : prev - 1
                                )}
                                aria-label="Previous feature"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                className="features__nav-btn"
                                onClick={() => setActiveFeature(prev =>
                                    prev === product.featureCards.length - 1 ? 0 : prev + 1
                                )}
                                aria-label="Next feature"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Cards */}
                <div
                    className="features__carousel"
                    onMouseEnter={() => featurePaused.current = true}
                    onMouseLeave={() => featurePaused.current = false}
                >
                    <div className="features__track">
                        {product.featureCards.map((feature, index) => (
                            <article
                                key={feature.id}
                                className={`feature-card ${activeFeature === index ? 'feature-card--active' : ''
                                    } ${index < activeFeature ? 'feature-card--past' : ''}`}
                                style={{ '--index': index }}
                                onClick={() => setActiveFeature(index)}
                                onMouseEnter={() => setActiveFeature(index)}
                                tabIndex={0}
                                role="button"
                                aria-pressed={activeFeature === index}
                            >
                                {/* Card Glow Effect */}
                                <div className="feature-card__glow" />

                                {/* Card Inner */}
                                <div className="feature-card__inner">
                                    {/* Header */}
                                    <div className="feature-card__header">
                                        <div className="feature-card__index">
                                            <svg viewBox="0 0 100 100" className="feature-card__index-ring">
                                                <circle
                                                    cx="50" cy="50" r="44"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeDasharray="276"
                                                    strokeDashoffset={276 - (276 * ((index + 1) / product.featureCards.length))}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="feature-card__index-number">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div className="feature-card__meta">
                                            <span className="feature-card__badge">{feature.badge}</span>
                                            <span className="feature-card__status">
                                                <span className="feature-card__status-dot" />
                                                Featured
                                            </span>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="feature-card__image-container">
                                        <div className="feature-card__image-wrapper">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="feature-card__image"
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                decoding="async"
                                            />
                                            <div className="feature-card__image-overlay" />

                                            {/* Quick Stats Overlay */}
                                            <div className="feature-card__quick-stats">
                                                <div className="feature-card__quick-stat">
                                                    <span className="feature-card__quick-stat-value">A+</span>
                                                    <span className="feature-card__quick-stat-label">Grade</span>
                                                </div>
                                                <div className="feature-card__quick-stat">
                                                    <span className="feature-card__quick-stat-value">100%</span>
                                                    <span className="feature-card__quick-stat-label">Quality</span>
                                                </div>
                                            </div>

                                            {/* Floating Labels */}
                                            <div className="feature-card__floating-labels">
                                                <span className="feature-card__floating-label">Premium</span>
                                                <span className="feature-card__floating-label">Certified</span>
                                            </div>
                                        </div>

                                        {/* Reflection Effect */}
                                        <div className="feature-card__reflection">
                                            <img src={feature.image} alt="" aria-hidden="true" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="feature-card__content">
                                        <h3 className="feature-card__title">{feature.title}</h3>
                                        <p className="feature-card__description">{feature.description}</p>

                                        {/* Feature Highlights */}
                                        <div className="feature-card__highlights">
                                            <div className="feature-card__highlight">
                                                <div className="feature-card__highlight-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M9 12l2 2 4-4" />
                                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                                    </svg>
                                                </div>
                                                <span>Verified Quality</span>
                                            </div>
                                            <div className="feature-card__highlight">
                                                <div className="feature-card__highlight-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                    </svg>
                                                </div>
                                                <span>Safety Certified</span>
                                            </div>
                                            <div className="feature-card__highlight">
                                                <div className="feature-card__highlight-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                        <path d="M2 17l10 5 10-5" />
                                                        <path d="M2 12l10 5 10-5" />
                                                    </svg>
                                                </div>
                                                <span>Modular Design</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="feature-card__actions">
                                            <button className="feature-card__cta">
                                                <span className="feature-card__cta-text">Explore</span>
                                                <span className="feature-card__cta-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                                <span className="feature-card__cta-bg" />
                                            </button>
                                            <button className="feature-card__secondary" aria-label="Watch video">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <polygon points="5 3 19 12 5 21 5 3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className="feature-card__progress">
                                        <div
                                            className="feature-card__progress-bar"
                                            style={{
                                                animationPlayState: activeFeature === index && !featurePaused.current
                                                    ? 'running'
                                                    : 'paused'
                                            }}
                                        />
                                    </div>

                                    {/* Corner Decorations */}
                                    <div className="feature-card__corner feature-card__corner--tl" />
                                    <div className="feature-card__corner feature-card__corner--tr" />
                                    <div className="feature-card__corner feature-card__corner--bl" />
                                    <div className="feature-card__corner feature-card__corner--br" />
                                </div>

                                {/* Hover Shine Effect */}
                                <div className="feature-card__shine" />
                            </article>
                        ))}
                    </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="features__thumbnails">
                    <div className="features__thumbnails-track">
                        {product.featureCards.map((feature, index) => (
                            <button
                                key={index}
                                className={`features__thumbnail ${activeFeature === index ? 'features__thumbnail--active' : ''
                                    }`}
                                onClick={() => setActiveFeature(index)}
                                aria-label={`Go to ${feature.title}`}
                            >
                                <div className="features__thumbnail-image">
                                    <img src={feature.image} alt="" />
                                </div>
                                <div className="features__thumbnail-info">
                                    <span className="features__thumbnail-badge">{feature.badge}</span>
                                    <span className="features__thumbnail-title">{feature.title}</span>
                                </div>
                                <div className="features__thumbnail-indicator" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="features__info-bar">
                    <div className="features__info-item">
                        <div className="features__info-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        </div>
                        <div className="features__info-text">
                            <span className="features__info-value">Aerospace Grade</span>
                            <span className="features__info-label">Materials</span>
                        </div>
                    </div>
                    <div className="features__info-divider" />
                    <div className="features__info-item">
                        <div className="features__info-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <div className="features__info-text">
                            <span className="features__info-value">5 Year</span>
                            <span className="features__info-label">Warranty</span>
                        </div>
                    </div>
                    <div className="features__info-divider" />
                    <div className="features__info-item">
                        <div className="features__info-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <div className="features__info-text">
                            <span className="features__info-value">Modular</span>
                            <span className="features__info-label">Design System</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SHOWCASE SECTIONS ==================== */}
            {product.showcaseSections.map((section, index) => (
                <section
                    key={section.id}
                    ref={el => sectionRefs.current[`showcase-${index}`] = el}
                    className={`showcase showcase--${section.alignment} ${isVisible[`showcase-${index}`] ? 'showcase--visible' : ''}`}
                    aria-labelledby={`showcase-title-${index}`}
                >
                    {/* Background */}
                    <div className="showcase__bg">
                        {isVisible[`showcase-${index}`] && (
                            <img
                                src={VertiPort}
                                alt=""
                                className="showcase__bg-image"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                        <div className="showcase__overlay" />
                    </div>

                    <div className="showcase__container">
                        <div className="showcase__content">
                            <span className="showcase__subtitle">{section.subtitle}</span>
                            <h2 id={`showcase-title-${index}`} className="showcase__title">
                                {section.title.split('\n').map((line, i) => (
                                    <span key={i} className="showcase__title-line">{line}</span>
                                ))}
                            </h2>
                            <p className="showcase__description">{section.description}</p>

                            {/* Mini Stats */}
                            {section.stats && (
                                <div className="showcase__stats">
                                    {section.stats.map((stat, i) => (
                                        <div key={i} className="showcase__stat">
                                            <span className="showcase__stat-value">
                                                {stat.value}
                                                <span className="showcase__stat-unit">{stat.unit}</span>
                                            </span>
                                            <span className="showcase__stat-label">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section Index */}
                    <span className="showcase__index">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </section>
            ))}

            {/* ==================== SPECS SECTION ==================== */}
            <section
                ref={el => sectionRefs.current.specs = el}
                className={`specs ${isVisible.specs ? 'specs--visible' : ''}`}
                aria-labelledby="specs-title"
            >
                <div className="specs__bg">
                    <div className="specs__bg-pattern" />
                    <div className="specs__bg-gradient" />
                </div>

                <div className="specs__container">
                    {/* Section Header */}
                    <header className="section-header">
                        <span className="section-header__label">Specifications</span>
                        <h2 id="specs-title" className="section-header__title">
                            Technical Excellence
                        </h2>
                        <p className="section-header__description">
                            Engineering precision meets sustainable innovation
                        </p>
                    </header>

                    {/* Tech Cards */}
                    <div className="specs__highlights">
                        {product.techHighlights.map((tech, index) => (
                            <article
                                key={tech.id}
                                className="tech-card"
                                style={{ '--delay': `${index * 0.15}s` }}
                                tabIndex={0}
                            >
                                <div className="tech-card__header">
                                    <div className="tech-card__icon">
                                        {renderIcon(tech.icon)}
                                    </div>
                                    <div className="tech-card__title-group">
                                        <h3 className="tech-card__title">{tech.title}</h3>
                                        <p className="tech-card__description">{tech.description}</p>
                                    </div>
                                </div>
                                <div className="tech-card__stats">
                                    {tech.stats.map((stat, i) => (
                                        <div key={i} className="tech-card__stat">
                                            <span className="tech-card__stat-value">
                                                {stat.value}
                                                <span className="tech-card__stat-unit">{stat.unit}</span>
                                            </span>
                                            <span className="tech-card__stat-label">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="tech-card__glow" />
                            </article>
                        ))}
                    </div>

                    {/* Detailed Specs */}
                    <div className="specs__detailed">
                        <div className="specs__detailed-header">
                            <h3 className="specs__detailed-title">Full Specifications</h3>
                            <button className="btn btn--outline btn--small">
                                {renderIcon('download', 'btn__icon')}
                                <span>Download PDF</span>
                            </button>
                        </div>

                        <div className="specs__categories">
                            {product.detailedSpecs.map((category, catIndex) => (
                                <div
                                    key={catIndex}
                                    className="specs__category"
                                    style={{ '--delay': `${catIndex * 0.1}s` }}
                                >
                                    <h4 className="specs__category-title">{category.category}</h4>
                                    <div className="specs__category-items">
                                        {category.specs.map((spec, specIndex) => (
                                            <div
                                                key={specIndex}
                                                className="spec-item"
                                                style={{ '--delay': `${(catIndex * 4 + specIndex) * 0.05}s` }}
                                            >
                                                <span className="spec-item__label">{spec.label}</span>
                                                <span className="spec-item__value">
                                                    {spec.value}
                                                    <span className="spec-item__unit">{spec.unit}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== TIMELINE SECTION ==================== */}
            <section
                ref={el => sectionRefs.current.timeline = el}
                className={`timeline ${isVisible.timeline ? 'timeline--visible' : ''}`}
                aria-labelledby="timeline-title"
            >
                <div className="timeline__container">
                    {/* Section Header */}
                    <header className="section-header">
                        <span className="section-header__label">Roadmap</span>
                        <h2 id="timeline-title" className="section-header__title">Our Journey</h2>
                        <p className="section-header__description">
                            From concept to commercial reality
                        </p>
                    </header>

                    {/* Timeline */}
                    <div className="timeline__track">
                        <div className="timeline__line">
                            <div className="timeline__line-progress" />
                        </div>

                        <div className="timeline__items">
                            {product.timeline.map((item, index) => (
                                <article
                                    key={index}
                                    className={`timeline-item timeline-item--${item.status}`}
                                    style={{ '--delay': `${index * 0.15}s` }}
                                >
                                    <div className="timeline-item__marker">
                                        {item.status === 'completed' && renderIcon('check')}
                                        {item.status === 'current' && <div className="timeline-item__pulse" />}
                                    </div>
                                    <div className="timeline-item__content">
                                        <span className="timeline-item__year">{item.year}</span>
                                        <h3 className="timeline-item__title">{item.title}</h3>
                                        <p className="timeline-item__description">{item.description}</p>
                                        <span className="timeline-item__status">
                                            {item.status === 'completed' && 'Completed'}
                                            {item.status === 'current' && 'In Progress'}
                                            {item.status === 'upcoming' && 'Upcoming'}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section
                ref={el => sectionRefs.current.cta = el}
                className={`cta ${isVisible.cta ? 'cta--visible' : ''}`}
                aria-labelledby="cta-title"
            >
                <div className="cta__bg">
                    <div className="cta__bg-gradient" />
                    <div className="cta__bg-pattern" />
                </div>

                <div className="cta__container">
                    <div className="cta__content">
                        <h2 id="cta-title" className="cta__title">
                            Experience the <span className="text-accent">Future</span> of Flight
                        </h2>
                        <p className="cta__description">
                            Be among the first to reserve your seat on the {product.name}
                        </p>

                        <div className="cta__actions">
                            <button
                                className="btn btn--primary btn--large"
                                onClick={handleReserveClick}
                            >
                                <span>Reserve Now</span>
                                {renderIcon('arrow', 'btn__icon')}
                            </button>
                            <button className="btn btn--secondary btn--large">
                                <span>Contact Sales</span>
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="cta__trust">
                            {product.trustBadges.map((badge, index) => (
                                <div key={index} className="trust-badge">
                                    <span className="trust-badge__icon">
                                        {renderIcon(badge.icon)}
                                    </span>
                                    <span className="trust-badge__label">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="cta__newsletter">
                        <div className="newsletter">
                            <div className="newsletter__content">
                                <h3 className="newsletter__title">Stay Updated</h3>
                                <p className="newsletter__description">
                                    Get the latest news on our progress
                                </p>
                            </div>
                            <form
                                className="newsletter__form"
                                onSubmit={handleNewsletterSubmit}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    className="newsletter__input"
                                    placeholder="Enter your email"
                                    aria-label="Email address"
                                    required
                                />
                                <button type="submit" className="newsletter__btn">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Count Up Number Component
const CountUpNumber = ({ end, duration = 2000, isActive }) => {
    const count = useCountUp(end, duration, 0, isActive);
    return <>{count}</>;
};

export default ProductSection;