import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './CompanySection.css';

// Motion variants
const fadeInUpVariants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};



const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const viewportOptions = { once: true, margin: "-50px" };

const CompanySection = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.title = 'Company | Hive+ - Building the Future of Urban Air Mobility';
  }, []);

  const motionConfig = {
    initial: "initial",
    whileInView: "animate",
    viewport: viewportOptions,
    variants: fadeInUpVariants,
  };



  const visionPoints = [
    "India's first human-carrying electric flying vehicle (eVTOL)",
    "Safe, stable vertical flight using electric propulsion",
    "Future air taxi network with SkyStations",
    "Short-distance urban travel — faster, cleaner, efficient"
  ];











  return (
    <div className="company">
      {/* Progress Bar */}
      <motion.div
        className="company__progress"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="company__hero">
        <div className="company__hero-bg">
          <div className="company__grid-pattern" />
          <div className="company__hero-shapes">
            <div className="company__shape company__shape--square" />
            <div className="company__shape company__shape--rect" />
            <div className="company__shape company__shape--circle" />
            <div className="company__shape company__shape--dot-1" />
            <div className="company__shape company__shape--dot-2" />
          </div>
        </div>

        <div className="company__container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="company__hero-content"
          >

            <motion.p
              variants={fadeInUpVariants}
              className="company__hero-eyebrow"
            >
              Urban Air Mobility
            </motion.p>

            <motion.h1
              variants={fadeInUpVariants}
              className="company__hero-title"
            >
              We're not building
              <br />
              an aircraft.
              <br />
              <span className="company__hero-title--accent">
                We're building a new
                <br />
                mode of transportation.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="company__hero-subtitle"
            >
              India's first human-carrying electric vertical takeoff and landing vehicle.
              Transforming 90-minute commutes into 15-minute flights.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="company__hero-cta"
            >
              <a href="#vision" className="company__btn company__btn--primary">
                <span>Explore Our Vision</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="company__vision">
        <div className="company__container">
          <div className="company__vision-layout">
            <motion.div
              {...motionConfig}
              className="company__vision-header"
            >
              <span className="company__label">01 — Vision</span>
              <h2 className="company__title">
                Building the future
                <br />
                of city mobility
              </h2>
            </motion.div>

            <motion.div
              {...motionConfig}
              className="company__vision-content"
            >
              <p className="company__vision-lead">
                We are developing India's first human-carrying electric flying vehicle (eVTOL).
                Our prototypes will prove safe, stable vertical flight using electric propulsion.
              </p>

              <div className="company__vision-points">
                {visionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUpVariants}
                    className="company__vision-point"
                  >
                    <span className="company__vision-point-icon">→</span>
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>

              <div className="company__quote-block">
                <div className="company__quote-mark">"</div>
                <blockquote>
                  This will lay the foundation for a future air taxi network —
                  SkyStations making short-distance urban travel faster, cleaner,
                  and more efficient.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="company__vision-deco">
          <div className="company__deco-line" />
          <div className="company__deco-circle" />
        </div>
      </section>


    </div>
  );
};

export default CompanySection;