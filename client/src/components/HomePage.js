import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import PropTypes from 'prop-types';
import HomePageVideo from '../video/DroneHomePage3.mp4';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import './smoothAnimations.css';
import { useReducedMotion as useCustomReducedMotion } from './useReducedMotion';
import HomePageVideo2 from '../video/DroneHomePage4.mp4';
import {
  easings,
  transitions,
  fadeInUpVariants,
  fadeInVariants,
  scaleVariants,
  slideInVariants,
  viewportOptions,
} from './motionVariants';

const usePerformanceMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof PerformanceObserver !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 16) { // 60fps threshold
              // keep minimal logging in dev
              // eslint-disable-next-line no-console
              console.warn('Slow frame detected:', entry);
            }
          });
        });

        observer.observe({ entryTypes: ['measure', 'longtask'] });
        return () => observer.disconnect();
      } catch (err) {
        // gracefully ignore if PerformanceObserver isn't available or throws
      }
    }
  }, []);
};

const HomePage = () => {
  usePerformanceMonitor();
  const [scrollY, setScrollY] = useState(0);
  // Removed unused state (mousePosition, isLoading, activeFeature) to keep component lean
  const containerRef = useRef(null);
  const heroVideoRef = useRef(null);
  // Dedicated ref for the hero section DOM node (separate from the video element ref)
  const heroSectionRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  // Reduced motion support
  const prefersReducedMotion = useReducedMotion();
  const customPrefersReducedMotion = useCustomReducedMotion();
  const shouldReduceMotion = prefersReducedMotion || customPrefersReducedMotion;
  // Track initial fullscreen video playback/dismissal. This should reset on full page reload.
  const hasInitialVideoPlayedRef = useRef(false);
  const [showInitialVideo, setShowInitialVideo] = useState(true);
  // Hero becomes visible either when user scrolls past threshold or when the initial video is dismissed/finished
  const heroVisible = scrollY > 200 || !showInitialVideo;

  const handleProduct = () => {
    navigate('/products');
  };

  // When user scrolls past threshold hide the initial video permanently (until a full reload)
  useEffect(() => {
    if (scrollY > 200 && showInitialVideo) {
      setShowInitialVideo(false);
      hasInitialVideoPlayedRef.current = true;
    }
  }, [scrollY, showInitialVideo]);

  // When the initial video is dismissed (ended or scrolled away), ensure the page scrolls
  // so the hero section starts from its top. Skip smooth scrolling when reduced motion is preferred.
  useEffect(() => {
    if (!showInitialVideo && heroSectionRef.current) {
      try {
        const heroTop =
          heroSectionRef.current.getBoundingClientRect().top + window.scrollY;

        const currentY = window.scrollY;

        // detect nav height intelligently
        const navEl = document.querySelector(
          'header, .navbar, #navbar, .fixed-navbar'
        );
        const navHeight = navEl
          ? navEl.getBoundingClientRect().height + 8
          : 12;

        const isMobile = window.innerWidth < 768;
        // add extra offset for mobile Safari’s toolbar
        const mobileOffset = isMobile ? 60 : 0;

        const targetY = Math.max(0, heroTop - (navHeight + mobileOffset));

        // only scroll if not already close
        if (Math.abs(currentY - targetY) > 30) {
          const scrollOptions = { top: targetY };
          if (!shouldReduceMotion) scrollOptions.behavior = 'smooth';
          requestAnimationFrame(() => window.scrollTo(scrollOptions));
        }
      } catch (err) {
        console.warn('Scroll to hero failed:', err);
      }
    }
  }, [showInitialVideo, shouldReduceMotion]);

  // Replace your current scroll effect with this optimized version
  useEffect(() => {
    let animationFrameId;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only update if scroll position changed significantly
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        lastScrollY = currentScrollY;
        setScrollY(currentScrollY);
      }
    };

    const throttledScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Memoized motion configs
  const motionConfig = useMemo(() => ({
    initial: shouldReduceMotion ? false : 'initial',
    animate: 'animate',
    exit: shouldReduceMotion ? false : 'exit',
    transition: shouldReduceMotion ? { duration: 0 } : transitions.default,
  }), [shouldReduceMotion]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-red-600 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Video Section - NO GAP */}
      {showInitialVideo && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen z-10"
          style={{ pointerEvents: 'none' }}
          aria-hidden={true}
          initial={{ opacity: 1 }}
          animate={{ opacity: heroVisible ? 0 : 1 }}
          transition={{ duration: 0.5, ease: easings.smooth }}
        >
          <video
            ref={heroVideoRef}
            src={HomePageVideo}
            autoPlay
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover gpu-accelerated"
            style={{ pointerEvents: 'none' }}
            // play only once on initial load; when it ends hide it until reload
            onEnded={() => {
              setShowInitialVideo(false);
              hasInitialVideoPlayedRef.current = true;
            }}
          // do not loop the initial fullscreen video
          />
        </motion.div>
      )}

      {/* Hero Section - RESPONSIVE */}
      <section ref={heroSectionRef} className="relative min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center py-16 sm:py-20 md:py-24 "
            {...motionConfig}
            variants={fadeInUpVariants}
            custom={heroVisible}
            animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
          >
            {/* Left Column - Text Content */}
            <motion.div
              {...motionConfig}
              variants={fadeInUpVariants}
              animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 30 }}
              transition={{ duration: 0.8, ease: easings.smooth }}
            >
              <motion.h1
                {...motionConfig}
                variants={fadeInUpVariants}
                animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 20 }}
                transition={{ delay: 0.3, duration: 0.6, ease: easings.smooth }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 text-center sm:text-left"
              >
                Future-Ready
                <motion.span
                  {...motionConfig}
                  variants={fadeInUpVariants}
                  animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 20 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: easings.smooth }}
                  className="block bg-gradient-to-r from-gray-900 via-red-600 to-red-700 bg-clip-text text-transparent"
                >
                  Defense Solutions
                </motion.span>
              </motion.h1>

              <motion.p
                {...motionConfig}
                variants={fadeInUpVariants}
                animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 20 }}
                transition={{ delay: 0.6, duration: 0.6, ease: easings.smooth }}
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
              >
                Advanced autonomous aerial systems engineered for precision, reliability, and mission success in the most demanding operational environments.
              </motion.p>

              <motion.div
                {...motionConfig}
                variants={fadeInUpVariants}
                animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 20 }}
                transition={{ delay: 0.7, duration: 0.6, ease: easings.smooth }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <motion.a
                  whileHover={!shouldReduceMotion ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                  transition={transitions.spring}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold shadow-lg relative overflow-hidden text-center gpu-accelerated"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
                    initial={{ x: '-100%' }}
                    whileHover={!shouldReduceMotion ? { x: 0 } : {}}
                    transition={transitions.default}
                  />
                  <span className="flex items-center justify-center gap-2 relative z-10" onClick={handleProduct}>
                    Explore Products
                    {!shouldReduceMotion && (
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: easings.smooth }}
                      >
                        →
                      </motion.span>
                    )}
                    {shouldReduceMotion && <span>→</span>}
                  </span>
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={!shouldReduceMotion ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                  transition={transitions.spring}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold shadow-md text-center gpu-accelerated"
                >
                  Request Demo
                </motion.a>
              </motion.div>

              <motion.div
                {...motionConfig}
                variants={fadeInUpVariants}
                animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 20 }}
                transition={{ delay: 0.8, duration: 0.6, ease: easings.smooth }}
                className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200"
              >
                {[
                  { value: 500, suffix: '+', label: 'Deployments' },
                  { value: 99.8, suffix: '%', label: 'Success Rate' },
                  { value: 24, suffix: '/7', label: 'Support' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                    transition={transitions.spring}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600"
                      shouldReduceMotion={shouldReduceMotion}
                    />
                    <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              {...motionConfig}
              variants={slideInVariants.right}
              animate={{ opacity: heroVisible ? 1 : 0, x: heroVisible ? 0 : 50 }}
              transition={{ duration: 0.8, ease: easings.smooth }}
              className="relative"
            >
              <motion.div
                className="w-full aspect-video object-cover rounded-2xl gpu-accelerated"
                whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
                transition={transitions.spring}
              >
                <motion.video
                  src={HomePageVideo2}
                  className="w-full h-full object-cover rounded-2xl gpu-accelerated"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: heroVisible ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: easings.smooth }}
                  loop
                  playsInline
                  muted
                  autoPlay
                  preload="auto"
                />
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        {/* Decorative elements hidden on small screens to improve performance */}
        {!shouldReduceMotion && (
          <>
            <div className="hidden lg:block absolute top-20 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-200 to-red-400 rounded-full blur-3xl opacity-10" aria-hidden="true" />
            <div className="hidden lg:block absolute bottom-20 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full blur-3xl opacity-10" aria-hidden="true" />
          </>
        )}

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            {...motionConfig}
            variants={fadeInUpVariants}
            whileInView="animate"
            viewport={viewportOptions}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <motion.div
              {...motionConfig}
              variants={scaleVariants}
              whileInView="animate"
              viewport={viewportOptions}
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 cursor-pointer"
            >
              {!shouldReduceMotion && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="w-2 h-2 bg-red-600 rounded-full"
                />
              )}
              {shouldReduceMotion && <div className="w-2 h-2 bg-red-600 rounded-full" />}
              <span className="text-gray-700 text-xs sm:text-sm font-semibold">INNOVATION</span>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 px-4"
              {...motionConfig}
              variants={scaleVariants}
              whileInView="animate"
              viewport={viewportOptions}
            >
              Advanced Technology Stack
            </motion.h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Leveraging cutting-edge innovations for unmatched performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'AI-Powered Autonomy',
                description:
                  'Neural networks enable real-time decision making and intelligent target identification in complex environments.',
                icon: '🤖',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Secure Communications',
                description:
                  'Military-grade quantum-resistant encryption ensures secure, jam-proof data transmission.',
                icon: '🔐',
                color: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Swarm Intelligence',
                description:
                  'Distributed AI enables coordinated multi-unit operations with autonomous decision-making.',
                icon: '🔗',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                {...motionConfig}
                variants={fadeInUpVariants}
                whileInView="animate"
                viewport={viewportOptions}
                transition={{ ...transitions.default, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                whileHover={!shouldReduceMotion ? { y: -12, scale: 1.03 } : {}}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 cursor-pointer relative overflow-hidden group gpu-accelerated"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <motion.div
                  className="text-4xl sm:text-5xl mb-4 sm:mb-6 relative z-10"
                  whileHover={!shouldReduceMotion ? { scale: 1.3 } : {}}
                  transition={transitions.spring}
                >
                  {tech.icon}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 relative z-10">
                  {tech.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed relative z-10">
                  {tech.description}
                </p>
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"
                    whileHover={{ scale: 1.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50/30" />

        {/* Dotted Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* Animated gradient blobs */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: easings.smooth }}
              className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-100/40 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: easings.smooth }}
              className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-gray-100/40 to-transparent rounded-full blur-3xl"
            />
          </>
        )}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            {...motionConfig}
            variants={fadeInUpVariants}
            whileInView="animate"
            viewport={viewportOptions}
            className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto"
          >
            <motion.div
              {...motionConfig}
              variants={scaleVariants}
              whileInView="animate"
              viewport={viewportOptions}
              whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 sm:mb-6 cursor-pointer"
            >
              {!shouldReduceMotion && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: easings.smooth }}
                  className="w-2 h-2 bg-red-600 rounded-full"
                />
              )}
              {shouldReduceMotion && <div className="w-2 h-2 bg-red-600 rounded-full" />}
              <span className="text-gray-700 text-xs sm:text-sm font-semibold">MISSION READY</span>
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900"
              {...motionConfig}
              variants={scaleVariants}
              whileInView="animate"
              viewport={viewportOptions}
            >
              Built for Demanding Operations
            </motion.h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Our systems deliver consistent, reliable performance in extreme conditions where failure is not an option.
            </p>
          </motion.div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'All-Weather Operations',
                description: 'Operational from -40°C to +60°C with IP67 weather resistance',
                icon: '🌡️',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                title: 'Electronic Warfare Resistant',
                description: 'Advanced frequency hopping and anti-jamming countermeasures',
                icon: '📡',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Real-Time Intelligence',
                description: 'Live 4K video feed with AI-powered threat detection',
                icon: '📹',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                title: 'Rapid Deployment',
                description: 'Operational readiness in under 5 minutes',
                icon: '⚡',
                gradient: 'from-yellow-500 to-orange-500',
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                {...motionConfig}
                variants={fadeInUpVariants}
                whileInView="animate"
                viewport={viewportOptions}
                transition={{ ...transitions.default, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                whileHover={!shouldReduceMotion ? { y: -8, scale: 1.02 } : {}}
                className="flex items-start gap-4 sm:gap-5 p-5 sm:p-6 lg:p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl relative overflow-hidden group gpu-accelerated transition-all duration-300"
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-900 to-red-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 relative z-10 shadow-md group-hover:shadow-xl transition-shadow duration-300"
                  whileHover={!shouldReduceMotion ? { scale: 1.1, rotate: 5 } : {}}
                  transition={transitions.spring}
                >
                  {capability.icon}
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 text-gray-900">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Stats */}
          <motion.div
            {...motionConfig}
            variants={fadeInUpVariants}
            whileInView="animate"
            viewport={viewportOptions}
            className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-gray-200 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { value: '50km', label: 'Max Range', icon: '📍' },
                { value: '120min', label: 'Flight Time', icon: '⏱️' },
                { value: '5kg', label: 'Payload Capacity', icon: '📦' },
                { value: '24/7', label: 'Support', icon: '🛟' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  {...motionConfig}
                  variants={scaleVariants}
                  whileInView="animate"
                  viewport={viewportOptions}
                  transition={{ ...transitions.default, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                  whileHover={!shouldReduceMotion ? { scale: 1.05, y: -5 } : {}}
                  className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
          )}
        </div>

        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
                rotateZ: [0, 180, 360],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: easings.smooth }}
              className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                x: [0, -20, 0],
                scale: [1, 1.2, 1],
                rotateZ: [360, 180, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: easings.smooth }}
              className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-gray-500/20 to-transparent rounded-full blur-3xl"
            />
          </>
        )}

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            {...motionConfig}
            variants={fadeInUpVariants}
            whileInView="animate"
            viewport={viewportOptions}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4"
              whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
              transition={transitions.default}
            >
              Ready to Elevate Your Defense Capabilities?
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed px-4"
              {...motionConfig}
              variants={fadeInVariants}
              whileInView="animate"
              viewport={viewportOptions}
            >
              Connect with our defense specialists for a confidential consultation
            </motion.p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
              <motion.a
                href="#contact"
                whileHover={!shouldReduceMotion ? { scale: 1.04, y: -2 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                transition={transitions.default}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-red-600 text-white rounded-lg font-bold shadow-lg relative overflow-hidden group text-center gpu-accelerated"
                aria-label="Schedule Demonstration"
              >
                <span className="relative z-10">Schedule Demonstration</span>
              </motion.a>
              <motion.a
                href="#download"
                whileHover={!shouldReduceMotion ? { scale: 1.04, y: -2 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                transition={transitions.default}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 border-2 border-white text-white rounded-lg font-bold shadow-lg text-center gpu-accelerated"
                aria-label="Download Brochure"
              >
                Download Brochure
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white-50 relative overflow-hidden">
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: easings.smooth }}
            className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-red-200 to-transparent rounded-full blur-3xl opacity-10"
          />
        )}

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <motion.div
              {...motionConfig}
              variants={slideInVariants.left}
              whileInView="animate"
              viewport={viewportOptions}
            >
              <motion.div
                {...motionConfig}
                variants={scaleVariants}
                whileInView="animate"
                viewport={viewportOptions}
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 sm:mb-6 cursor-pointer"
              >
                {!shouldReduceMotion && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: easings.smooth }}
                    className="w-2 h-2 bg-red-600 rounded-full"
                  />
                )}
                {shouldReduceMotion && <div className="w-2 h-2 bg-red-600 rounded-full" />}
                <span className="text-gray-700 text-xs sm:text-sm font-semibold">GET IN TOUCH</span>
              </motion.div>
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900"
                whileHover={!shouldReduceMotion ? { x: 10 } : {}}
                transition={transitions.spring}
              >
                Let's Discuss Your Requirements
              </motion.h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                Our team is ready to provide detailed information about our systems.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    ),
                    title: 'Email',
                    content: 'contact@hiveplus.in',
                    gradient: 'from-blue-500 to-cyan-500',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    ),
                    title: 'Phone',
                    content: '+91 (0) 1234-567890',
                    gradient: 'from-green-500 to-emerald-500',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ),
                    title: 'Location',
                    content: 'Bangalore, Karnataka, India',
                    gradient: 'from-red-500 to-orange-500',
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    {...motionConfig}
                    variants={slideInVariants.left}
                    whileInView="animate"
                    viewport={viewportOptions}
                    transition={{ ...transitions.default, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    whileHover={!shouldReduceMotion ? { x: 10, scale: 1.02 } : {}}
                    className="flex items-start gap-3 sm:gap-4 cursor-pointer group"
                  >
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-900 to-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:shadow-lg gpu-accelerated"
                      whileHover={!shouldReduceMotion ? { scale: 1.1 } : {}}
                      transition={transitions.spring}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                      />
                      <span className="relative z-10">{contact.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg mb-1 text-gray-900">{contact.title}</h4>
                      <p className="text-gray-600 text-sm sm:text-base break-all">{contact.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...motionConfig} variants={slideInVariants.right} whileInView="animate" viewport={viewportOptions} className="mt-6 lg:mt-0">
              <ProfessionalContactForm shouldReduceMotion={shouldReduceMotion} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// VideoShowcase Component
const VideoShowcase = React.memo(({ video, videoRef, shouldReduceMotion }) => {
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
      videoElement.play().catch((error) => {
        console.error('Auto-play failed:', error);
      });
    };

    videoElement.addEventListener('canplay', handleCanPlay);

    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoRef]);

  return (
    <motion.div
      whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
      className="relative group"
    >
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: easings.smooth }}
          className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-xl sm:rounded-2xl blur-xl sm:blur-2xl"
        />
      )}
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
        <motion.img
          src="/api/placeholder/800/600"
          alt="Video placeholder"
          className="w-full h-full object-cover rounded-xl sm:rounded-2xl absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: isVideoReady ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.video
          ref={videoRef}
          src={video}
          className="w-full rounded-xl sm:rounded-2xl gpu-accelerated"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoReady ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          loop
          playsInline
          muted
          autoPlay
          preload="auto"
        />
      </div>
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: easings.smooth }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: easings.smooth }}
          />
        </>
      )}
    </motion.div>
  );
});

VideoShowcase.propTypes = {
  video: PropTypes.string.isRequired,
  videoRef: PropTypes.object.isRequired,
  shouldReduceMotion: PropTypes.bool.isRequired,
};

// ProfessionalContactForm Component
const ProfessionalContactForm = React.memo(({ shouldReduceMotion }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormState({ name: '', email: '', organization: '', message: '' });
    }, 3000);
  };

  return (
    <motion.div
      className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
      whileHover={!shouldReduceMotion ? { scale: 1.01 } : {}}
      transition={transitions.default}
    >
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: easings.smooth }}
            className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center z-20"
          >
            <div className="text-center text-white px-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
              >
                <motion.svg
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>
              <motion.h3
                className="text-xl sm:text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Message Sent!
              </motion.h3>
              <motion.p
                className="text-green-100 text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We'll contact you shortly.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <motion.div whileHover={!shouldReduceMotion ? { scale: 1.01 } : {}} transition={transitions.default}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <motion.input
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm sm:text-base transition-all duration-300"
            placeholder="John Doe"
            whileFocus={!shouldReduceMotion ? { scale: 1.01 } : {}}
            transition={transitions.default}
          />
        </motion.div>
        <motion.div whileHover={!shouldReduceMotion ? { scale: 1.01 } : {}} transition={transitions.default}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <motion.input
            type="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm sm:text-base transition-all duration-300"
            placeholder="john@example.com"
            whileFocus={!shouldReduceMotion ? { scale: 1.01 } : {}}
            transition={transitions.default}
          />
        </motion.div>
        <motion.div whileHover={!shouldReduceMotion ? { scale: 1.01 } : {}} transition={transitions.default}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
          <motion.input
            type="text"
            value={formState.organization}
            onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm sm:text-base transition-all duration-300"
            placeholder="Your organization"
            whileFocus={!shouldReduceMotion ? { scale: 1.01 } : {}}
            transition={transitions.default}
          />
        </motion.div>
        <motion.div whileHover={!shouldReduceMotion ? { scale: 1.01 } : {}} transition={transitions.default}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
          <motion.textarea
            rows="4"
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none text-sm sm:text-base transition-all duration-300"
            placeholder="Tell us about your requirements..."
            whileFocus={!shouldReduceMotion ? { scale: 1.01 } : {}}
            transition={transitions.default}
          />
        </motion.div>
        <motion.button
          whileHover={!shouldReduceMotion ? { scale: 1.03, y: -4 } : {}}
          whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
          transition={transitions.default}
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold shadow-lg relative overflow-hidden group text-sm sm:text-base gpu-accelerated"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
            initial={{ x: '-100%' }}
            whileHover={!shouldReduceMotion ? { x: 0 } : {}}
            transition={transitions.default}
          />
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2 relative z-10">
              {!shouldReduceMotion && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                />
              )}
              {shouldReduceMotion && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full" />
              )}
              Sending...
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2">
              Send Message
              {!shouldReduceMotion && (
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: easings.smooth }}
                >
                  →
                </motion.span>
              )}
              {shouldReduceMotion && <span>→</span>}
            </span>
          )}
        </motion.button>
      </form>
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: easings.smooth }}
          className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full blur-2xl opacity-30"
        />
      )}
    </motion.div>
  );
});

ProfessionalContactForm.propTypes = {
  shouldReduceMotion: PropTypes.bool.isRequired,
};

// AnimatedCounter Component
const AnimatedCounter = React.memo(({ value, suffix, className, shouldReduceMotion }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      if (shouldReduceMotion) {
        setCount(value);
        return;
      }

      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start * 10) / 10);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, value, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={!shouldReduceMotion ? { scale: 1.1 } : {}}
      transition={transitions.default}
    >
      {count}
      {suffix}
    </motion.div>
  );
});

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string.isRequired,
  className: PropTypes.string,
  shouldReduceMotion: PropTypes.bool.isRequired,
};

// HivePlusLogo Component
const HivePlusLogo = React.memo(({ className }) => {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={transitions.default}
    >
      <motion.span
        className="text-2xl sm:text-3xl font-bold text-gray-900"
        whileHover={{ scale: 1.1 }}
        transition={transitions.spring}
      >
        hi
      </motion.span>
      <motion.span
        className="text-2xl sm:text-3xl font-bold text-red-600"
        whileHover={{ scale: 1.1 }}
        transition={transitions.spring}
      >
        ve
      </motion.span>
      <motion.span
        className="text-2xl sm:text-3xl font-bold text-red-600"
        whileHover={{ scale: 1.2 }}
        transition={transitions.spring}
      >
        +
      </motion.span>
    </motion.div>
  );
});

HivePlusLogo.propTypes = {
  className: PropTypes.string,
};

export default HomePage;
