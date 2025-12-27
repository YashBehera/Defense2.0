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

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { 
      duration: 1, 
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

  const stats = [
    { value: "$150B", label: "Market by 2035", suffix: "" },
    { value: "4+", label: "Hours lost in traffic daily", suffix: "hrs" },
    { value: "15", label: "Minute commute vs 90", suffix: "min" },
    { value: "₹500", label: "Starting price per ride", suffix: "" }
  ];

  const visionPoints = [
    "India's first human-carrying electric flying vehicle (eVTOL)",
    "Safe, stable vertical flight using electric propulsion",
    "Future air taxi network with SkyStations",
    "Short-distance urban travel — faster, cleaner, efficient"
  ];

  const marketPoints = [
    { point: "India loses 4+ hrs/day in metro traffic", highlight: "urgent need" },
    { point: "Tier-1 & Tier-2 cities ideal for early adoption", highlight: "ideal" },
    { point: "eVTOL market = $150B by 2035", highlight: "$150B" },
    { point: "DGCA & MoCA enabling Urban Air Mobility policy", highlight: "enabling" },
    { point: "EV & drone ecosystem ready for scale", highlight: "ready" },
    { point: "Global focus: UAE, Singapore, Saudi Arabia", highlight: "Global" },
    { point: "FlyHive = India's chance to lead", highlight: "lead" }
  ];

  const businessPhases = [
    {
      number: "01",
      title: "Prototype & IP",
      description: "Build and patent the manned eVTOL platform — establish as India's first scalable aerial mobility startup.",
      icon: "◈"
    },
    {
      number: "02",
      title: "B2G & B2B Model",
      description: "Offer prototypes for defense, rescue, and logistics to generate early revenue.",
      icon: "◉"
    },
    {
      number: "03",
      title: "Air Taxi Network",
      description: "Launch FlyHive stations in Tier-1 cities. Booking via SkyApp — ₹500–₹1500 per ride.",
      icon: "◎"
    },
    {
      number: "04",
      title: "Global Expansion",
      description: "License design to foreign operators. Earn through royalties + export partnerships.",
      icon: "◇"
    }
  ];

  const executionPlan = [
    {
      year: "2025",
      title: "Working Prototype",
      milestone: "Year 1",
      items: [
        "Build and test 1-2 passenger eVTOL",
        "Capture demo videos & flight data",
        "Sign MOU with rooftop partners"
      ],
      status: "current"
    },
    {
      year: "2026",
      title: "Certification",
      milestone: "Year 2",
      items: [
        "Begin DGCA certification process",
        "Develop SkyApp platform",
        "Launch first SkyPort setup"
      ],
      status: "upcoming"
    },
    {
      year: "2027",
      title: "Commercial Ops",
      milestone: "Year 3",
      items: [
        "Start paid test routes",
        "Generate first revenue",
        "Strategic partnerships"
      ],
      status: "upcoming"
    }
  ];

  const dgcaSteps = [
    { step: "01", text: "Apply under DGCA AEAC No. 01/2024 for VTOL aircraft" },
    { step: "02", text: "Get \"Permit to Fly – Experimental\" after ground & tethered tests" },
    { step: "03", text: "Partner with IIT/DRDO test corridors for certification support" },
    { step: "04", text: "Begin type certification (CAR 21) after successful test flights" },
    { step: "05", text: "Ensure battery, safety & redundancy compliance per DGCA norms" },
    { step: "06", text: "File for production certificate post-type approval" },
    { step: "07", text: "Align with MoCA UAM Sandbox Policy 2024" }
  ];

  const chartData = [
    { year: '2025', value: 2 },
    { year: '2026', value: 12 },
    { year: '2027', value: 16 },
    { year: '2028', value: 30 },
    { year: '2029', value: 44 },
    { year: '2030', value: 52 }
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
            <motion.div 
              variants={fadeInVariants}
              className="company__logo"
            >
              <span className="company__logo-hive">hi</span>
              <span className="company__logo-plus">ve+</span>
            </motion.div>

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
              <a href="#business" className="company__btn company__btn--ghost">
                <span>Business Model</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="company__stats">
        <div className="company__container">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company__stats-grid"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="company__stat"
              >
                <span className="company__stat-value">{stat.value}</span>
                <span className="company__stat-label">{stat.label}</span>
              </motion.div>
            ))}
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

      {/* Market Section */}
      <section className="company__market">
        <div className="company__container">
          <motion.div {...motionConfig} className="company__market-header">
            <span className="company__label">02 — Market Opportunity</span>
            <h2 className="company__title">
              Why now?
            </h2>
            <p className="company__subtitle">
              The world is entering the era of electric air mobility — 
              and India is perfectly positioned to lead it.
            </p>
          </motion.div>

          <div className="company__market-layout">
            {/* Chart */}
            <motion.div
              {...motionConfig}
              className="company__chart-container"
            >
              <div className="company__chart-header">
                <span className="company__chart-title">eVTOL Market Growth</span>
                <span className="company__chart-unit">Billion USD</span>
              </div>
              <div className="company__chart">
                <div className="company__chart-y-axis">
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>
                <div className="company__chart-bars">
                  {chartData.map((item, index) => (
                    <div key={index} className="company__chart-col">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(item.value / 60) * 100}%` }}
                        viewport={viewportOptions}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="company__chart-bar"
                      >
                        <span className="company__chart-value">{item.value}</span>
                      </motion.div>
                      <span className="company__chart-label">{item.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Points */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              variants={staggerContainer}
              className="company__market-points"
            >
              {marketPoints.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="company__market-point"
                >
                  <span className="company__market-bullet" />
                  <span className="company__market-text">{item.point}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div {...motionConfig} className="company__market-quote">
            <blockquote>
              "FlyHive is not waiting for the future — we're building it now. 
              The sky is open, the technology is ready, and the timing has never been better."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Business Model Section */}
      <section id="business" className="company__business">
        <div className="company__container">
          <motion.div {...motionConfig} className="company__business-header">
            <span className="company__label">03 — Business Model</span>
            <h2 className="company__title company__title--center">
              From prototype to
              <br />
              profitable air mobility
            </h2>
            <p className="company__subtitle">
              FlyHive monetizes every phase of the journey
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company__phases"
          >
            {businessPhases.map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="company__phase"
              >
                <div className="company__phase-header">
                  <span className="company__phase-icon">{phase.icon}</span>
                  <span className="company__phase-number">{phase.number}</span>
                </div>
                <h3 className="company__phase-title">{phase.title}</h3>
                <p className="company__phase-desc">{phase.description}</p>
                <div className="company__phase-line" />
              </motion.div>
            ))}
          </motion.div>

          {/* Revenue Model */}
          <motion.div
            {...motionConfig}
            className="company__revenue"
          >
            <div className="company__revenue-card">
              <div className="company__revenue-header">
                <span className="company__revenue-icon">₹</span>
                <h4>Revenue Streams</h4>
              </div>
              <div className="company__revenue-items">
                <div className="company__revenue-item">
                  <span className="company__revenue-label">Per Ride</span>
                  <span className="company__revenue-value">₹500 – ₹1,500</span>
                </div>
                <div className="company__revenue-item">
                  <span className="company__revenue-label">B2G Contracts</span>
                  <span className="company__revenue-value">Defense & Rescue</span>
                </div>
                <div className="company__revenue-item">
                  <span className="company__revenue-label">Licensing</span>
                  <span className="company__revenue-value">Global Royalties</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Execution Timeline */}
      <section className="company__execution">
        <div className="company__container">
          <motion.div {...motionConfig} className="company__execution-header">
            <span className="company__label">04 — Execution Plan</span>
            <h2 className="company__title company__title--center">
              3-Year Roadmap
            </h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company__timeline"
          >
            <div className="company__timeline-line" />
            
            {executionPlan.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className={`company__timeline-item ${plan.status === 'current' ? 'company__timeline-item--active' : ''}`}
              >
                <div className="company__timeline-marker">
                  <span className="company__timeline-year">{plan.year}</span>
                  <div className="company__timeline-dot" />
                </div>
                <div className="company__timeline-content">
                  <span className="company__timeline-milestone">{plan.milestone}</span>
                  <h3 className="company__timeline-title">{plan.title}</h3>
                  <ul className="company__timeline-list">
                    {plan.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...motionConfig} className="company__execution-quote">
            <blockquote>
              "By Year 3, FlyHive transitions from a prototype to 
              India's first operational eVTOL mobility network."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* DGCA Section */}
      <section className="company__dgca">
        <div className="company__container">
          <div className="company__dgca-layout">
            <motion.div
              {...motionConfig}
              className="company__dgca-header"
            >
              <span className="company__label">05 — Regulatory</span>
              <h2 className="company__title">
                DGCA
                <br />
                Guidelines
              </h2>
              <p className="company__dgca-intro">
                FlyHive is committed to achieving full DGCA compliance 
                and setting new safety benchmarks for Indian eVTOLs.
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              variants={staggerContainer}
              className="company__dgca-steps"
            >
              {dgcaSteps.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="company__dgca-step"
                >
                  <span className="company__dgca-num">{item.step}</span>
                  <span className="company__dgca-text">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div {...motionConfig} className="company__dgca-badge">
            <div className="company__dgca-badge-content">
              <span className="company__dgca-badge-icon">✓</span>
              <div>
                <span className="company__dgca-badge-title">DGCA Issues VTOL</span>
                <span className="company__dgca-badge-subtitle">Aircraft Certification Advisory</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="company__cta">
        <div className="company__container">
          <motion.div
            {...motionConfig}
            className="company__cta-content"
          >
            <div className="company__cta-shapes">
              <div className="company__cta-shape company__cta-shape--1" />
              <div className="company__cta-shape company__cta-shape--2" />
              <div className="company__cta-shape company__cta-shape--3" />
            </div>

            <div className="company__cta-inner">
              <span className="company__label company__label--light">Join the Revolution</span>
              <h2 className="company__cta-title">
                Ready to shape the
                <br />
                future of mobility?
              </h2>
              <p className="company__cta-text">
                Whether you're an investor, partner, or future passenger — 
                we'd love to connect with you.
              </p>
              
              <div className="company__cta-buttons">
                <a href="/contact" className="company__btn company__btn--white">
                  <span>Get in Touch</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="/investors" className="company__btn company__btn--outline-light">
                  <span>Investor Relations</span>
                </a>
              </div>

              <div className="company__cta-logo">
                <span className="company__logo-hive">hive</span>
                <span className="company__logo-plus">+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="company__footer">
        <div className="company__container">
          <motion.p
            {...motionConfig}
            className="company__footer-text"
          >
            Building India's Sky. One Flight at a Time.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default CompanySection;