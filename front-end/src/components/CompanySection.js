import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './CompanySection.css';

// Motion variants
const fadeInUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } }
};

const viewportOptions = { once: true, margin: "-100px" };

const CompanySection = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.title = 'हमारी कंपनी | Our Company | Hive+ India';
  }, []);

  const motionConfig = {
    initial: "initial",
    whileInView: "animate",
    viewport: viewportOptions,
    variants: fadeInUpVariants,
  };

  const teamMembers = [
    {
      name: "Rajiv Sharma",
      nameHindi: "राजीव शर्मा",
      role: "CEO & Co-Founder",
      background: "Ex-Joby Aviation",
      image: "/team/rajiv.jpg",
      linkedin: "#"
    },
    {
      name: "Priya Menon",
      nameHindi: "प्रिया मेनन",
      role: "CTO",
      background: "Ex-Tesla Autopilot",
      image: "/team/priya.jpg",
      linkedin: "#"
    },
    {
      name: "Arjun Kapoor",
      nameHindi: "अर्जुन कपूर",
      role: "Head of Engineering",
      background: "Ex-Lilium",
      image: "/team/arjun.jpg",
      linkedin: "#"
    },
    {
      name: "Kavitha Nair",
      nameHindi: "कविता नायर",
      role: "VP of Operations",
      background: "Ex-Volocopter",
      image: "/team/kavitha.jpg",
      linkedin: "#"
    },
    {
      name: "Vikram Desai",
      nameHindi: "विक्रम देसाई",
      role: "Chief Safety Officer",
      background: "Ex-EHang",
      image: "/team/vikram.jpg",
      linkedin: "#"
    },
    {
      name: "Ananya Rao",
      nameHindi: "अनन्या राव",
      role: "Head of Product",
      background: "Ex-Archer Aviation",
      image: "/team/ananya.jpg",
      linkedin: "#"
    }
  ];

  const inspirations = [
    {
      company: "Sarla Aviation",
      country: "भारत",
      countryEn: "India",
      contribution: "स्वदेशी दृष्टि और नियामक विशेषज्ञता",
      contributionEn: "Indigenous vision & regulatory expertise",
      flag: "🇮🇳"
    },
    {
      company: "Archer Aviation",
      country: "अमेरिका",
      countryEn: "USA",
      contribution: "नवाचार और विनिर्माण उत्कृष्टता",
      contributionEn: "Innovation & manufacturing excellence",
      flag: "🇺🇸"
    },
    {
      company: "EHang",
      country: "चीन",
      countryEn: "China",
      contribution: "स्वायत्तता और शहरी संचालन",
      contributionEn: "Autonomy & urban operations",
      flag: "🇨🇳"
    },
    {
      company: "Aridge",
      country: "वैश्विक",
      countryEn: "Global",
      contribution: "गतिशीलता की स्वतंत्रता",
      contributionEn: "Freedom of mobility ethos",
      flag: "🌍"
    }
  ];

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      titleHindi: "सुरक्षा सर्वोपरि",
      title: "Safety First",
      descHindi: "हर निर्णय सुरक्षा से शुरू होता है। कोई समझौता नहीं।",
      description: "Every decision starts with safety. No compromises, ever."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      titleHindi: "समय ही जीवन है",
      title: "Time is Life",
      descHindi: "हम लाखों भारतीयों को हर दिन घंटे वापस दे रहे हैं।",
      description: "We're returning hours to millions of Indians every day."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      titleHindi: "मेड इन इंडिया",
      title: "Made in India",
      descHindi: "भारत की अनूठी चुनौतियों के लिए स्वदेशी तकनीक।",
      description: "Indigenous technology for India's unique challenges."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      titleHindi: "सबके लिए",
      title: "For Everyone",
      descHindi: "हवाई यात्रा विलासिता नहीं, अधिकार होना चाहिए।",
      description: "Air mobility shouldn't be a luxury. It's a right."
    }
  ];

  const milestones = [
    { year: "2023", titleHindi: "स्थापना", title: "Founded", descHindi: "गुरुग्राम में hive+ की स्थापना", description: "Hive+ established in Gurugram" },
    { year: "2024", titleHindi: "सीड राउंड", title: "Seed Round", descHindi: "₹50 करोड़ की फंडिंग", description: "₹50Cr funding secured" },
    { year: "2024", titleHindi: "पहली उड़ान", title: "First Flight", descHindi: "सफल प्रोटोटाइप परीक्षण", description: "Successful prototype test" },
    { year: "2025", titleHindi: "DGCA अनुमोदन", title: "DGCA Approval", descHindi: "टाइप प्रमाणन प्रगति पर", description: "Type certification in progress" },
    { year: "2026", titleHindi: "व्यावसायिक लॉन्च", title: "Commercial Launch", descHindi: "मुंबई और बेंगलुरु", description: "Mumbai & Bangalore" }
  ];

  const launchCities = [
    { name: "मुंबई", nameEn: "Mumbai", state: "महाराष्ट्र" },
    { name: "बेंगलुरु", nameEn: "Bangalore", state: "कर्नाटक" },
    { name: "दिल्ली NCR", nameEn: "Delhi NCR", state: "दिल्ली" },
    { name: "हैदराबाद", nameEn: "Hyderabad", state: "तेलंगाना" },
    { name: "चेन्नई", nameEn: "Chennai", state: "तमिलनाडु" },
    { name: "पुणे", nameEn: "Pune", state: "महाराष्ट्र" }
  ];

  return (
    <div className="company-section">
      {/* Progress Bar – Tricolor */}
      <motion.div
        className="company-section__progress"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="company-section__hero">
        <div className="company-section__hero-bg">
          <div className="company-section__hero-grid" />
          {/* Tricolor Gradient Orbs */}
          <div className="company-section__hero-orb company-section__hero-orb--saffron" />
          <div className="company-section__hero-orb company-section__hero-orb--green" />
        </div>

        <div className="company-section__container">
          <motion.div
            {...motionConfig}
            className="company-section__hero-content"
          >
            {/* Ashoka Chakra Badge */}
            <motion.div
              variants={fadeInUpVariants}
              className="company-section__badge company-section__badge--tricolor"
            >
              <span className="company-section__ashoka-chakra">☸</span>
              <span>हमारी कंपनी • OUR COMPANY</span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              className="company-section__title"
            >
              भारत का आकाश,
              <br />
              <span className="company-section__title-gradient">
                भारत का सपना
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="company-section__title-english"
            >
              India's Sky, India's Dream
            </motion.p>

            <motion.p
              variants={fadeInUpVariants}
              className="company-section__subtitle"
            >
              वैश्विक विमानन अग्रणियों की विशेषज्ञता को गहरी भारतीय जड़ों के साथ मिलाकर। 
              हम सिर्फ उड़ने वाली कारें नहीं बना रहे — हम भारत की गतिशीलता को पुनर्परिभाषित कर रहे हैं।
            </motion.p>

            <motion.p
              variants={fadeInUpVariants}
              className="company-section__subtitle-english"
            >
              Blending expertise from global aviation pioneers with deep Indian roots. 
              We're not just building flying cars — we're reimagining how India moves.
            </motion.p>

            {/* Quote Card */}
            <motion.div
              variants={fadeInUpVariants}
              className="company-section__quote company-section__quote--tricolor"
            >
              <div className="company-section__quote-tricolor-bar" />
              <div className="company-section__quote-content">
                <div className="company-section__quote-mark">"</div>
                <blockquote>
                  यह कभी किसी व्यक्ति के बारे में नहीं था; यह हमेशा एक राष्ट्र के बारे में था।
                </blockquote>
                <p className="company-section__quote-english">
                  "It was never about a person; it was always about a nation."
                </p>
                <cite>— श्री नरेंद्र मोदी जी से प्रेरित</cite>
              </div>
            </motion.div>

            {/* Government Initiatives */}
            <motion.div
              variants={fadeInUpVariants}
              className="company-section__initiatives"
            >
              <div className="company-section__initiative">
                <span className="company-section__initiative-icon">🇮🇳</span>
                <span>Make in India</span>
              </div>
              <div className="company-section__initiative">
                <span className="company-section__initiative-icon">💪</span>
                <span>आत्मनिर्भर भारत</span>
              </div>
              <div className="company-section__initiative">
                <span className="company-section__initiative-icon">🚀</span>
                <span>Startup India</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="company-section__mission">
        <div className="company-section__container">
          <motion.div
            {...motionConfig}
            className="company-section__mission-content"
          >
            <div className="company-section__mission-text">
              <div className="company-section__section-header">
                <span className="company-section__section-label">हमारा मिशन</span>
                <h2 className="company-section__section-title">Our Mission</h2>
              </div>
              <p className="company-section__mission-statement">
                हर भारतीय को <strong>उड़ने की स्वतंत्रता</strong> देना — सुरक्षित, किफायती, और टिकाऊ। 
                हम 90 मिनट की यात्रा को 15 मिनट की उड़ान में बदल रहे हैं, 
                लोगों को वह एक चीज़ वापस दे रहे हैं जो पैसे से नहीं खरीदी जा सकती: <em>समय</em>।
              </p>
              <p className="company-section__mission-statement-english">
                To give every Indian the <strong>freedom to fly</strong> — safely, affordably, 
                and sustainably. We're turning 90-minute commutes into 15-minute flights, 
                giving people back the one thing money can't buy: <em>time</em>.
              </p>
            </div>
            <div className="company-section__mission-stats">
              <div className="company-section__stat company-section__stat--saffron">
                <span className="company-section__stat-value">500+</span>
                <span className="company-section__stat-label-hindi">घंटे बचाए/वर्ष</span>
                <span className="company-section__stat-label">Hours saved per user/year</span>
              </div>
              <div className="company-section__stat company-section__stat--white">
                <span className="company-section__stat-value">6</span>
                <span className="company-section__stat-label-hindi">शहर 2027 तक</span>
                <span className="company-section__stat-label">Cities by 2027</span>
              </div>
              <div className="company-section__stat company-section__stat--green">
                <span className="company-section__stat-value">₹50Cr</span>
                <span className="company-section__stat-label-hindi">सीड फंडिंग</span>
                <span className="company-section__stat-label">Seed funding</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Atmanirbhar Section */}
      <section className="company-section__atmanirbhar">
        <div className="company-section__container">
          <motion.div
            {...motionConfig}
            className="company-section__atmanirbhar-content"
          >
            <div className="company-section__atmanirbhar-badge">
              <span>🇮🇳</span>
              <span>आत्मनिर्भर भारत अभियान</span>
            </div>
            <h2 className="company-section__atmanirbhar-title">
              स्वदेशी तकनीक,
              <br />
              <span>वैश्विक मानक</span>
            </h2>
            <p className="company-section__atmanirbhar-subtitle">
              Indigenous Technology, Global Standards
            </p>
            <div className="company-section__atmanirbhar-stats">
              <div className="company-section__atmanirbhar-stat">
                <span className="company-section__atmanirbhar-stat-value">95%</span>
                <span className="company-section__atmanirbhar-stat-label">स्वदेशी पुर्जे<br/>Indigenous Components</span>
              </div>
              <div className="company-section__atmanirbhar-stat">
                <span className="company-section__atmanirbhar-stat-value">100%</span>
                <span className="company-section__atmanirbhar-stat-label">भारतीय डिज़ाइन<br/>Indian Design</span>
              </div>
              <div className="company-section__atmanirbhar-stat">
                <span className="company-section__atmanirbhar-stat-value">1000+</span>
                <span className="company-section__atmanirbhar-stat-label">भारतीय नौकरियां<br/>Indian Jobs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="company-section__values">
        <div className="company-section__container">
          <motion.div {...motionConfig}>
            <div className="company-section__section-header company-section__section-header--center">
              <span className="company-section__section-label">हमारे मूल्य</span>
              <h2 className="company-section__section-title">What Drives Us</h2>
            </div>
            <p className="company-section__section-subtitle">
              हमारे मूल मूल्य इंजीनियरिंग से लेकर संचालन तक हर निर्णय को आकार देते हैं।
            </p>
            <p className="company-section__section-subtitle-english">
              Our core values shape every decision, from engineering to operations.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company-section__values-grid"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="company-section__value-card"
              >
                <div className="company-section__value-icon">
                  {value.icon}
                </div>
                <h3 className="company-section__value-title-hindi">{value.titleHindi}</h3>
                <h4 className="company-section__value-title">{value.title}</h4>
                <p className="company-section__value-desc-hindi">{value.descHindi}</p>
                <p className="company-section__value-desc">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Inspirations Section */}
      <section className="company-section__inspirations">
        <div className="company-section__container">
          <motion.div {...motionConfig}>
            <div className="company-section__section-header company-section__section-header--center">
              <span className="company-section__section-label">हमारी प्रेरणा</span>
              <h2 className="company-section__section-title">Standing on Giants' Shoulders</h2>
            </div>
            <p className="company-section__section-subtitle">
              हम वैश्विक विमानन में सर्वश्रेष्ठ से सीखते हैं, जबकि भारत की अनूठी जरूरतों के लिए निर्माण करते हैं।
            </p>
            <p className="company-section__section-subtitle-english">
              We learn from the best in global aviation while building for India's unique needs.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company-section__inspirations-grid"
          >
            {inspirations.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className={`company-section__inspiration-card ${item.countryEn === 'India' ? 'company-section__inspiration-card--india' : ''}`}
              >
                <span className="company-section__inspiration-flag">{item.flag}</span>
                <h4 className="company-section__inspiration-company">{item.company}</h4>
                <span className="company-section__inspiration-country">
                  {item.country} • {item.countryEn}
                </span>
                <p className="company-section__inspiration-contribution-hindi">{item.contribution}</p>
                <p className="company-section__inspiration-contribution">{item.contributionEn}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="company-section__team">
        <div className="company-section__container">
          <motion.div {...motionConfig}>
            <div className="company-section__section-header company-section__section-header--center">
              <span className="company-section__section-label">हमारी टीम</span>
              <h2 className="company-section__section-title">विश्व स्तरीय टीम</h2>
              <p className="company-section__section-title-english">World-Class Team</p>
            </div>
            <p className="company-section__section-subtitle">
              Lilium, Joby, Tesla, Volocopter, और EHang के विशेषज्ञ — भारत के लिए एकजुट।
            </p>
            <p className="company-section__section-subtitle-english">
              Expats from Lilium, Joby, Tesla, Volocopter, and EHang — united to build for Bharat.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company-section__team-grid"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="company-section__team-card"
              >
                <div className="company-section__team-avatar">
                  <div className="company-section__team-avatar-placeholder">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h4 className="company-section__team-name-hindi">{member.nameHindi}</h4>
                <h5 className="company-section__team-name">{member.name}</h5>
                <span className="company-section__team-role">{member.role}</span>
                <span className="company-section__team-background">{member.background}</span>
                <a href={member.linkedin} className="company-section__team-linkedin" aria-label={`${member.name}'s LinkedIn`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            {...motionConfig}
            className="company-section__team-cta"
          >
            <p>क्या आप क्रांति में शामिल होना चाहते हैं?</p>
            <p className="company-section__team-cta-english">Want to join the revolution?</p>
            <a href="/careers" className="company-section__btn company-section__btn--primary">
              खुली पोजीशन देखें • View Open Positions
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Launch Cities Section */}
      <section className="company-section__cities">
        <div className="company-section__container">
          <motion.div {...motionConfig}>
            <div className="company-section__section-header company-section__section-header--center">
              <span className="company-section__section-label">हमारे शहर</span>
              <h2 className="company-section__section-title">लॉन्च शहर</h2>
              <p className="company-section__section-title-english">Launch Cities</p>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company-section__cities-grid"
          >
            {launchCities.map((city, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="company-section__city-card"
              >
                <div className="company-section__city-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h4 className="company-section__city-name-hindi">{city.name}</h4>
                <h5 className="company-section__city-name">{city.nameEn}</h5>
                <span className="company-section__city-state">{city.state}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            {...motionConfig}
            className="company-section__cities-map"
          >
            <div className="company-section__india-map">
              <span className="company-section__map-label">🇮🇳 भारत का नक्शा</span>
              {/* Placeholder for India map */}
              <div className="company-section__map-placeholder">
                <span>Interactive Map Coming Soon</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="company-section__timeline">
        <div className="company-section__container">
          <motion.div {...motionConfig}>
            <div className="company-section__section-header company-section__section-header--center">
              <span className="company-section__section-label">हमारी यात्रा</span>
              <h2 className="company-section__section-title">Our Journey</h2>
            </div>
            <p className="company-section__section-subtitle">
              विचार से भारत के आकाश तक — यहां बताया गया है कि हम वहां कैसे पहुंच रहे हैं।
            </p>
            <p className="company-section__section-subtitle-english">
              From idea to India's skies — here's how we're getting there.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
            className="company-section__timeline-track"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className={`company-section__milestone ${index <= 2 ? 'company-section__milestone--completed' : ''}`}
              >
                <div className="company-section__milestone-dot">
                  {index <= 2 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="company-section__milestone-content">
                  <span className="company-section__milestone-year">{milestone.year}</span>
                  <h4 className="company-section__milestone-title-hindi">{milestone.titleHindi}</h4>
                  <h5 className="company-section__milestone-title">{milestone.title}</h5>
                  <p className="company-section__milestone-desc-hindi">{milestone.descHindi}</p>
                  <p className="company-section__milestone-desc">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="company-section__investors">
        <div className="company-section__container">
          <motion.div
            {...motionConfig}
            className="company-section__investors-card"
          >
            <div className="company-section__investors-content">
              <span className="company-section__investors-label">हमारे निवेशक</span>
              <h2 className="company-section__investors-title">
                दूरदर्शी निवेशकों का साथ
              </h2>
              <p className="company-section__investors-title-english">Backed by Visionaries</p>
              <p className="company-section__investors-text">
                हमारे निवेशक भारत के शहरी हवाई गतिशीलता भविष्य में विश्वास करते हैं। 
                हमें भारत और विश्व स्तर पर अग्रणी VCs और रणनीतिक भागीदारों का समर्थन प्राप्त है।
              </p>
              <div className="company-section__investors-logos">
                <div className="company-section__investor-logo">Sequoia India</div>
                <div className="company-section__investor-logo">Accel</div>
                <div className="company-section__investor-logo">Peak XV</div>
                <div className="company-section__investor-logo">Tata Group</div>
              </div>
            </div>
            <a href="/investors" className="company-section__btn company-section__btn--outline-light">
              निवेशक संबंध • Investor Relations
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="company-section__cta">
        <div className="company-section__container">
          <motion.div
            {...motionConfig}
            className="company-section__cta-content"
          >
            {/* Tricolor Border */}
            <div className="company-section__cta-tricolor" />
            
            <span className="company-section__cta-label">जुड़ें हमसे</span>
            <h2 className="company-section__cta-title">
              भविष्य को आकार देने के लिए तैयार हैं?
            </h2>
            <p className="company-section__cta-title-english">Ready to Shape the Future?</p>
            <p className="company-section__cta-text">
              चाहे आप इंजीनियर हों, निवेशक हों, या भविष्य के यात्री — हम आपसे सुनना चाहते हैं।
            </p>
            <p className="company-section__cta-text-english">
              Whether you're an engineer, investor, or future passenger — we'd love to hear from you.
            </p>
            <div className="company-section__cta-buttons">
              <a href="/contact" className="company-section__btn company-section__btn--primary">
                संपर्क करें • Get in Touch
              </a>
              <a href="/careers" className="company-section__btn company-section__btn--outline">
                टीम में शामिल हों • Join Our Team
              </a>
            </div>

            {/* Made in India Badge */}
            <div className="company-section__made-in-india">
              <div className="company-section__made-in-india-content">
                <svg viewBox="0 0 24 24" fill="currentColor" className="company-section__heart-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>भारत में निर्मित • Made with ❤️ in India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CompanySection;