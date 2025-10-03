import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import StrikerVideo from '../video/CruiseDrone.mp4';
import HomePageVideo from '../video/DroneHomePage.mp4';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const heroVideoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  useEffect(() => {
    const handleScroll = debounce(() => setScrollY(window.scrollY), 50);
    const handleMouseMove = debounce((e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, 50);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      handleScroll.cancel();
      handleMouseMove.cancel();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredProduct = useMemo(
    () => ({
      id: 1,
      name: 'CRUISE KAMIKAZE DRONE',
      tagline: 'Miniature Cruise Missile Platform',
      description:
        'A miniature cruise missile platform designed for long-range, high-speed autonomous strikes. With auto-stabilization and a unique wing-folding dive mechanism, it can fly like a plane and suddenly dive vertically onto a target, delivering devastating precision with minimal detection.',
      video: StrikerVideo,
      specs: [
        { label: 'Max Range', value: '10-15 km', icon: '📡', color: 'from-blue-500 to-cyan-500' },
        { label: 'Flight Type', value: 'Fixed-Wing', icon: '✈️', color: 'from-sky-500 to-blue-500' },
        { label: 'Navigation', value: 'GPS Waypoint', icon: '🎯', color: 'from-purple-500 to-pink-500' },
        { label: 'Launch Method', value: 'Multi-Mode', icon: '🚀', color: 'from-orange-500 to-red-500' },
      ],
      keyFeatures: [
        {
          title: 'Fixed-Wing Design',
          description: 'Long-range autonomous flight capability with efficient aerodynamic design',
          icon: '🛩️',
        },
        {
          title: 'Wing-Folding Dive Mechanism',
          description: 'Unique system enables vertical kamikaze dive for devastating precision strikes',
          icon: '⬇️',
        },
        {
          title: 'Auto-Stabilized Flight',
          description: 'GPS waypoint navigation with autonomous flight control systems',
          icon: '🧭',
        },
        {
          title: 'Versatile Launch System',
          description: 'Launchable via catapult, hand, or rail system for maximum deployment flexibility',
          icon: '🚀',
        },
        {
          title: 'Expendable Mission Design',
          description: 'Lightweight and built for single-use or expendable tactical missions',
          icon: '⚡',
        },
        {
          title: 'Static Target Specialist',
          description: 'Ideal for static target strikes, supply depot neutralization, or armor disruption',
          icon: '🎯',
        },
      ],
      additionalInfo: {
        inspiration: 'Inspired by modern mini cruise drones used in Ukraine conflict',
        useCase: 'Static target strikes, supply depot neutralization, armor disruption',
        deployment: 'Single-use or expendable missions',
        rangeNote: 'Range varies 10-15 km depending on payload',
      },
    }),
    []
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-red-600 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden min-h-screen flex items-center bg-white">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotateZ: [0, 180, 360],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-40 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              rotateZ: [360, 180, 0],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-2 h-2 bg-red-600 rounded-full"
                />
                <span className="text-gray-700 text-sm font-semibold">
                  ADVANCED DEFENSE TECHNOLOGY
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900"
              >
                Future-Ready
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                  className="block bg-gradient-to-r from-gray-900 via-red-600 to-red-700 bg-clip-text text-transparent"
                >
                  Defense Solutions
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Advanced autonomous aerial systems engineered for precision, reliability, and mission success in the most demanding operational environments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#product"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="group px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold shadow-lg relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="flex items-center gap-2 relative z-10">
                    Explore Platform
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold shadow-md"
                >
                  Request Demo
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200"
              >
                {[
                  { value: 500, suffix: '+', label: 'Deployments' },
                  { value: 99.8, suffix: '%', label: 'Success Rate' },
                  { value: 24, suffix: '/7', label: 'Support' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl font-bold text-red-600"
                    />
                    <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="relative"
            >
              <video
                ref={heroVideoRef}
                src={HomePageVideo}
                autoPlay
                muted
                loop
                className="w-full h-full mb-48 "
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section id="product" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 cursor-pointer"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-2 h-2 bg-red-600 rounded-full"
              />
              <span className="text-gray-700 text-sm font-semibold">
                FEATURED PLATFORM
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {featuredProduct.name}
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{featuredProduct.tagline}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <VideoShowcase video={featuredProduct.video} videoRef={videoRef} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.h3
                className="text-3xl font-bold mb-4 text-gray-900"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Precision Meets Performance
              </motion.h3>
              <motion.p
                className="text-gray-600 text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {featuredProduct.description}
              </motion.p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {featuredProduct.specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ y: -8, scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 cursor-pointer relative overflow-hidden group"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${spec.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />
                    <motion.div
                      className="text-3xl mb-3"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {spec.icon}
                    </motion.div>
                    <div className="text-sm text-gray-500 mb-1 font-medium">{spec.label}</div>
                    <motion.div
                      className="text-2xl font-bold text-gray-900"
                      whileHover={{ scale: 1.1 }}
                    >
                      {spec.value}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold shadow-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Get Technical Specs
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border border-gray-200 relative overflow-hidden"
          >
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, #dc2626 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }}
            />
            <motion.h3
              className="text-3xl font-bold mb-12 text-center text-gray-900 relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Advanced Capabilities
            </motion.h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
              >
                {featuredProduct.keyFeatures
                  .slice(activeFeature, activeFeature + 4)
                  .map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                      whileHover={{ y: -10, scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 cursor-pointer relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <motion.div
                        className="text-4xl mb-4 relative z-10"
                        whileHover={{ scale: 1.3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h4 className="text-gray-900 font-bold text-lg mb-2 relative z-10">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-red-200 to-red-400 rounded-full blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotateZ: [0, -5, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full blur-3xl opacity-10"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-2 h-2 bg-red-600 rounded-full"
              />
              <span className="text-gray-700 text-sm font-semibold">INNOVATION</span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Advanced Technology Stack
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leveraging cutting-edge innovations for unmatched performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 cursor-pointer relative overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <motion.div
                  className="text-5xl mb-6 relative z-10"
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {tech.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 relative z-10">
                  {tech.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10">
                  {tech.description}
                </p>
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-2 h-2 bg-red-600 rounded-full"
                />
                <span className="text-gray-700 text-sm font-semibold">MISSION READY</span>
              </motion.div>
              <motion.h2
                className="text-4xl font-bold mb-6 text-gray-900"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Built for Demanding Operations
              </motion.h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our systems deliver consistent, reliable performance in extreme conditions where failure is not an option.
              </p>

              <div className="space-y-4">
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ x: 12, scale: 1.02 }}
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg relative overflow-hidden group"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-gray-900 to-red-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {capability.icon}
                    </motion.div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-lg mb-1 text-gray-900">{capability.title}</h4>
                      <p className="text-gray-600 text-sm">{capability.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <ProfessionalRadar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
        </div>

        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
            rotateZ: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-red-500/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
            rotateZ: [360, 180, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-gray-500/20 to-transparent rounded-full blur-3xl"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Ready to Elevate Your Defense Capabilities?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Connect with our defense specialists for a confidential consultation
            </motion.p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.08, y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="px-10 py-4 bg-red-600 text-white rounded-lg font-bold shadow-lg relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Schedule Demonstration</span>
              </motion.a>
              <motion.a
                href="#download"
                whileHover={{
                  scale: 1.08,
                  y: -4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold shadow-lg"
              >
                Download Brochure
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100 to-transparent rounded-full blur-3xl opacity-10"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.p
              className="text-gray-400 text-sm tracking-wider mb-12 font-semibold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              TRUSTED BY INDIA'S DEFENSE FORCES
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-16">
              {[
                { name: 'INDIAN ARMY', abbr: 'IA', gradient: 'from-green-600 to-green-800' },
                { name: 'INDIAN NAVY', abbr: 'IN', gradient: 'from-blue-600 to-blue-800' },
                { name: 'INDIAN AIR FORCE', abbr: 'IAF', gradient: 'from-sky-600 to-sky-800' },
                { name: 'DRDO', abbr: 'DRDO', gradient: 'from-purple-600 to-purple-800' },
                { name: 'HAL', abbr: 'HAL', gradient: 'from-orange-600 to-orange-800' },
                { name: 'BDL', abbr: 'BDL', gradient: 'from-red-600 to-red-800' },
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.15, y: -10 }}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm shadow-md relative overflow-hidden"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      {partner.abbr}
                    </span>
                  </motion.div>
                  <motion.p
                    className="text-xs text-gray-500 mt-3 text-center font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    {partner.name}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-red-200 to-transparent rounded-full blur-3xl opacity-10"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-2 h-2 bg-red-600 rounded-full"
                />
                <span className="text-gray-700 text-sm font-semibold">GET IN TOUCH</span>
              </motion.div>
              <motion.h2
                className="text-4xl font-bold mb-6 text-gray-900"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Let's Discuss Your Requirements
              </motion.h2>
              <p className="text-gray-600 text-lg mb-8">
                Our team is ready to provide detailed information about our systems.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-start gap-4 cursor-pointer group"
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-gray-900 to-red-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                      />
                      <span className="relative z-10">{contact.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-gray-900">{contact.title}</h4>
                      <p className="text-gray-600">{contact.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <ProfessionalContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// HivePlusLogo Component
const HivePlusLogo = React.memo(({ className }) => {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.span
        className="text-3xl font-bold text-gray-900"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        hi
      </motion.span>
      <motion.span
        className="text-3xl font-bold text-red-600"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        ve
      </motion.span>
      <motion.span
        className="text-3xl font-bold text-red-600"
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        +
      </motion.span>
    </motion.div>
  );
});

HivePlusLogo.propTypes = {
  className: PropTypes.string,
};

// VideoShowcase Component
const VideoShowcase = React.memo(({ video, videoRef }) => {
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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
      className="relative group"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -inset-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur-2xl"
      />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <motion.img
          src="/api/placeholder/800/600"
          alt="Video placeholder"
          className="w-full h-full object-cover rounded-2xl absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: isVideoReady ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.video
          ref={videoRef}
          src={video}
          className="w-full rounded-2xl"
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
      <motion.div
        className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full blur-xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full blur-xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
});

VideoShowcase.propTypes = {
  video: PropTypes.string.isRequired,
  videoRef: PropTypes.object.isRequired,
};

// ProfessionalRadar Component
const ProfessionalRadar = React.memo(() => {
  return (
    <motion.div
      className="aspect-square bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200 relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
    >
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #dc2626 1px, transparent 1px),
            linear-gradient(to bottom, #dc2626 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="w-full h-full bg-white rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="relative w-80 h-80">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1 - i * 0.25, 1 - i * 0.25 + 0.05, 1 - i * 0.25],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="absolute inset-0 border-2 border-red-300 rounded-full"
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-6 bg-red-600 rounded-full shadow-lg"
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="h-full w-1 bg-gradient-to-b from-red-600 via-red-400 to-transparent mx-auto" />
          </motion.div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gray-900 rounded-full shadow-md"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.1 }}
        className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </motion.div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Active</div>
            <div className="text-lg font-bold text-gray-900">6</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.1 }}
        className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md"
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Range</div>
            <div className="text-lg font-bold text-gray-900">50km</div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.15 }}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-xl p-3 shadow-xl border border-gray-100 cursor-pointer"
      >
        <div className="text-center">
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-1 shadow-md"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <span className="text-white text-xs font-bold">AI</span>
          </motion.div>
          <div className="text-xs text-gray-500 font-medium">Active</div>
        </div>
      </motion.div>
    </motion.div>
  );
});

// ProfessionalContactForm Component
const ProfessionalContactForm = React.memo(() => {
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
      className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center z-20"
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
              >
                <motion.svg
                  className="w-10 h-10"
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
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Message Sent!
              </motion.h3>
              <motion.p
                className="text-green-100"
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <motion.input
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            placeholder="John Doe"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <motion.input
            type="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            placeholder="john@example.com"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Organization</label>
          <motion.input
            type="text"
            value={formState.organization}
            onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            placeholder="Your organization"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
          <motion.textarea
            rows="4"
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
            placeholder="Tell us about your requirements..."
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.03, y: -4, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold shadow-lg relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2 relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Sending...
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center gap-2">
              Send Message
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          )}
        </motion.button>
      </form>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full blur-2xl opacity-30"
      />
    </motion.div>
  );
});

// AnimatedCounter Component
const AnimatedCounter = React.memo(({ value, suffix, className }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
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
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
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
};

export default HomePage;