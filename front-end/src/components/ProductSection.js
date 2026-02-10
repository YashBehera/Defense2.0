import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './ProductSection.css';
import ProductHero from '../assets/VertiPort2.mp4';
import VertiPort from '../assets/Vertiport.jpeg';
import Speed from '../assets/Speed.jpeg';
import Traffic from '../assets/Traffic.jpeg';
import Application from '../assets/Application.jpeg';
import SkyFreedom from '../assets/SkyFreedom.jpeg';
import AppExperience from '../assets/AppExperience.jpeg';
import Time from '../assets/Time.jpeg';


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
    const [isMobile, setIsMobile] = useState(false);


    // Refs
    const sectionRefs = useRef({});
    const videoRef = useRef(null);
    const cursorRef = useRef(null);
    const featureInterval = useRef(null);
    const featurePaused = useRef(false);

    const featuresTrackRef = useRef(null);
    const progressBarRef = useRef(null);

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
                id: 'time-revolution',
                title: '2 Hours → 20 Minutes',
                description: 'Transform your daily commute. What takes 2 hours on congested roads now takes just 20 minutes through the sky. Reclaim your time, every single day.',
                image: Speed, // Your image import
                badge: 'Speed',
                stats: {
                    value: '6x',
                    label: 'Faster'
                }
            },
            {
                id: 'skip-traffic',
                title: 'Rise Above The Chaos',
                description: 'While millions sit stuck in gridlock, you soar above. No honking, no road rage, no wasted hours. The sky is your express lane.',
                image: Traffic, // Your image import
                badge: 'Freedom',
                stats: {
                    value: '0',
                    label: 'Traffic Delays'
                }
            },
            {
                id: 'on-demand',
                title: 'One Tap Away',
                description: 'Book your Hive like you book an Ola. Your personal flying vehicle arrives at your location within minutes. Urban mobility, reimagined.',
                image: Application, // Your image import
                badge: 'Access',
                stats: {
                    value: '5 min',
                    label: 'Avg. Pickup'
                }
            },
            {
                id: 'time-back',
                title: 'Get Your Life Back',
                description: 'India loses ₹1.5 lakh crore annually to traffic. With 90+ minute daily commutes in metros, Hive gives you back 500+ hours every year.',
                image: Time, // Your image import
                badge: 'Impact',
                stats: {
                    value: '500+',
                    label: 'Hours Saved/Year'
                }
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
                id: 'solution',
                subtitle: 'The Revolution',
                title: 'The Sky Was Always \nThe Answer',
                description: 'While roads overflow and metros crowd, an entire dimension remains empty. Hive opens the sky — turning 2-hour commutes into 20-minute flights.',
                alignment: 'right',
                layout: 'stacked',
                stats: [
                    { value: '6', unit: 'x', label: 'Faster' },
                    { value: '20', unit: 'min', label: 'Avg Flight' },
                    { value: '500', unit: '+hrs', label: 'Saved Yearly' }
                ],
                image: SkyFreedom,
                theme: 'dark',  // ← BLACK (2nd)
                accent: 'blue'
            },
            {
                id: 'access',
                subtitle: 'The Experience',
                title: 'Your Flying Car\nOne Tap Away',
                description: 'Book like Ola. Fly like the future. Our app connects you to the nearest Hive in minutes. Step onto a vertiport, step off at your destination. That simple.',
                alignment: 'right',
                layout: 'stacked',
                stats: [
                    { value: '5', unit: 'min', label: 'Avg Pickup' },
                    { value: '50', unit: '+', label: 'Vertiports' },
                    { value: '24', unit: '/7', label: 'Availability' }
                ],
                image: AppExperience,
                theme: 'light',  // ← WHITE (3rd)
                accent: 'cyan'
            }
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
            { year: '2025', title: 'Design Complete', description: 'Finalized aerodynamic design and systems architecture', status: 'completed' },
            { year: '2026', title: 'Prototype Testing', description: 'Ground and flight testing of full-scale prototype', status: 'current' },
            { year: '2027', title: 'DGCA Certification', description: 'Type certification and regulatory approval', status: 'upcoming' },
            { year: 'To be Announced', title: 'Commercial Launch', description: 'First commercial operations begin', status: 'upcoming' },
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
            if (!progressBarRef.current) return;
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxScroll, 1);
            progressBarRef.current.style.transform = `scaleX(${progress})`;
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



    // Feature auto-rotation
    useEffect(() => {
        featureInterval.current = setInterval(() => {
            if (!featurePaused.current) {
                setActiveFeature(prev => (prev + 1) % product.featureCards.length);
            }
        }, 5000);

        return () => clearInterval(featureInterval.current);
    }, [product.featureCards.length]);

    // Scroll-based active card detection for mobile
    useEffect(() => {
        if (!isMobile || !featuresTrackRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        if (!isNaN(index)) {
                            setActiveFeature(index);
                            // Pause auto-rotation when user is interacting via scroll
                            featurePaused.current = true;
                        }
                    }
                });
            },
            {
                root: featuresTrackRef.current,
                threshold: 0.6
            }
        );

        const cards = featuresTrackRef.current.children;
        Array.from(cards).forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [isMobile]);



    // Form handlers


    return (
        <div className="product-page">
            {/* Progress Bar */}
            <div
                ref={progressBarRef}
                className="scroll-progress"
                style={{ transform: 'scaleX(0)' }}
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

                {/* Section Header - UPDATED */}
                <div className="features__header">
                    <div className="features__header-content">
                        <div className="features__label">
                            <span className="features__label-dot" />
                            <span className="features__label-text">The Problem We Solve</span>
                        </div>
                        <h2 id="features-title" className="features__title">
                            Time Is The New <span className="features__title-accent">Currency</span>
                        </h2>
                        <p className="features__subtitle">
                            India loses billions of productive hours daily to traffic.
                            The sky remains unused. Until now.
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
                    <div className="features__track" ref={featuresTrackRef}>
                        {product.featureCards.map((feature, index) => (
                            <article
                                key={feature.id}
                                className={`feature-card ${activeFeature === index ? 'feature-card--active' : ''
                                    } ${index < activeFeature ? 'feature-card--past' : ''}`}
                                style={{ '--index': index }}
                                data-index={index}
                                onClick={() => setActiveFeature(index)}
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
                                                Revolutionary
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

                                            {/* Quick Stats Overlay - UPDATED */}
                                            <div className="feature-card__quick-stats">
                                                <div className="feature-card__quick-stat">
                                                    <span className="feature-card__quick-stat-value">
                                                        {feature.stats?.value || '—'}
                                                    </span>
                                                    <span className="feature-card__quick-stat-label">
                                                        {feature.stats?.label || 'Metric'}
                                                    </span>
                                                </div>
                                                <div className="feature-card__quick-stat">
                                                    <span className="feature-card__quick-stat-value">∞</span>
                                                    <span className="feature-card__quick-stat-label">Possibilities</span>
                                                </div>
                                            </div>

                                            {/* Floating Labels - UPDATED */}
                                            <div className="feature-card__floating-labels">
                                                <span className="feature-card__floating-label">Sky-Native</span>
                                                <span className="feature-card__floating-label">Future-Ready</span>
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

                                        {/* Feature Highlights - UPDATED */}
                                        <div className="feature-card__highlights">
                                            <div className="feature-card__highlight">
                                                <div className="feature-card__highlight-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <path d="M12 6v6l4 2" />
                                                    </svg>
                                                </div>
                                                <span>Time Saved</span>
                                            </div>
                                            <div className="feature-card__highlight">
                                                <div className="feature-card__highlight-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                                    </svg>
                                                </div>
                                                <span>Zero Emissions</span>
                                            </div>
                                            <div className="feature-card__highlight">
                                                <div className="feature-card__highlight-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                                        <line x1="12" y1="18" x2="12" y2="18" />
                                                    </svg>
                                                </div>
                                                <span>App Controlled</span>
                                            </div>
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
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== SHOWCASE SECTIONS ==================== */}
            {product.showcaseSections.map((section, index) => (
                <section
                    key={section.id}
                    ref={el => sectionRefs.current[`showcase-${index}`] = el}
                    className={`
            showcase 
            showcase--${section.theme}
            showcase--layout-${section.layout || 'stacked'}
            ${isVisible[`showcase-${index}`] ? 'showcase--visible' : ''}
        `}
                    aria-labelledby={`showcase-title-${index}`}
                >
                    {/* Minimal Background */}
                    <div className="showcase__backdrop" />

                    {/* Main Content Wrapper */}
                    <div className="showcase__wrapper">

                        {/* Text Content */}
                        <div className="showcase__text-block">
                            {/* Category Label */}
                            <span className="showcase__category">{section.subtitle}</span>

                            {/* Main Title */}
                            <h2 className="showcase__title" id={`showcase-title-${index}`}>
                                {section.title.split('\n').map((line, i) => (
                                    <span key={i} className="showcase__title-row">
                                        <span
                                            className="showcase__title-content"
                                            style={{ '--row': i }}
                                        >
                                            {line}
                                        </span>
                                    </span>
                                ))}
                            </h2>

                            {/* Subtitle / Description */}
                            <p className="showcase__subtitle">{section.description}</p>

                        </div>

                        {/* Product Image */}
                        <figure className="showcase__figure">
                            <div className="showcase__image-wrapper">
                                {isVisible[`showcase-${index}`] && (
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="showcase__image"
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            {/* Optional Caption */}
                            {section.caption && (
                                <figcaption className="showcase__caption">
                                    {section.caption}
                                </figcaption>
                            )}
                        </figure>

                    </div>

                    {/* Bottom Fade (for stacked sections) */}
                    <div className="showcase__fade" />

                    {/* Scroll Prompt - Only on first */}
                    {index === 0 && (
                        <div className="showcase__scroll-prompt">
                            <span className="showcase__scroll-text">Scroll</span>
                            <div className="showcase__scroll-track">
                                <div className="showcase__scroll-thumb" />
                            </div>
                        </div>
                    )}
                </section>
            ))}
        </div>
    );
};

export default ProductSection;
