import React, {useEffect,useRef} from 'react';
import './MasterPlanSection.css';

const MasterPlanSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const animatedElements = sectionRef.current?.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );

    animatedElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  const phases = [
    {
      phase: '01',
      title: 'Urban Air Mobility Launch',
      timeline: '2024 — 2026',
      description: 'Establishing initial eVTOL operations in key metropolitan areas with premium airport shuttle services and urban transfers.',
      regions: ['India', 'UAE', 'Southeast Asia'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      phase: '02',
      title: 'Regional Expansion',
      timeline: '2026 — 2029',
      description: 'Scaling operations to include inter-city connectivity, emergency medical services, and cargo logistics across continents.',
      regions: ['Europe', 'Middle East', 'Africa'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      phase: '03',
      title: 'Global Network Integration',
      timeline: '2029 — 2032',
      description: 'Building a comprehensive global air mobility network with autonomous operations and seamless cross-border connectivity.',
      regions: ['Americas', 'Asia-Pacific', 'Global'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      phase: '04',
      title: 'Mass Urban Transport',
      timeline: '2032 — 2035',
      description: 'Achieving affordable, accessible aerial transportation for everyone with fully integrated smart city infrastructure worldwide.',
      regions: ['Worldwide'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const globalReach = [
    {
      region: 'Asia Pacific',
      countries: ['India', 'Singapore', 'Malaysia', 'Indonesia', 'Japan'],
      description: 'Pioneering urban air mobility in the world\'s fastest-growing economies.'
    },
    {
      region: 'Middle East & Africa',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'South Africa', 'Kenya'],
      description: 'Connecting visionary cities building tomorrow\'s infrastructure today.'
    },
    {
      region: 'Europe',
      countries: ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Switzerland'],
      description: 'Integrating sustainable aviation into the world\'s most advanced urban centers.'
    },
    {
      region: 'Americas',
      countries: ['United States', 'Canada', 'Brazil', 'Mexico'],
      description: 'Transforming continental travel across diverse landscapes and cities.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Cities', sublabel: 'Connected by 2030' },
    { number: '25', label: 'Countries', sublabel: 'Across 4 continents' },
    { number: '1M+', label: 'Passengers', sublabel: 'Annual capacity goal' },
    { number: '2035', label: 'Vision', sublabel: 'Mass transit reality' }
  ];

  return (
    <section className="masterplan-section" ref={sectionRef}>
      
      
      {/* Hero Header */}
      <header className="masterplan-hero">
        <div className="hero-content">
          <h1 className="hero-headline">
            The future of flight.
            <br />
            <span className="hero-headline-accent">Mapped out.</span>
          </h1>
          <p className="hero-subheadline">
            A strategic vision to transform urban mobility across the globe — 
            connecting cities, countries, and continents through revolutionary eVTOL technology.
          </p>
        </div>
      </header>

      {/* Vision Statement */}
      <div className="vision-section">
        <div className="vision-container">
          <div className="vision-label">Our Vision</div>
          <h2 className="vision-statement">
            We believe the sky belongs to everyone. Our masterplan is more than a roadmap — 
            it's a commitment to making aerial transportation accessible, sustainable, and global.
          </h2>
        </div>
      </div>

      {/* Phases Section */}
      <div className="phases-section">
        <div className="phases-header">
          <span className="section-eyebrow">Strategic Roadmap</span>
          <h2 className="section-title">Four phases.<br />One destination.</h2>
          <p className="section-description">
            Every great journey begins with a single step. Ours begins with a vision 
            that spans a decade and circles the globe.
          </p>
        </div>

        <div className="phases-grid">
          {phases.map((item, index) => (
            <article className="phase-card" key={index}>
              <div className="phase-card-inner">
                <div className="phase-icon">{item.icon}</div>
                <div className="phase-number">{item.phase}</div>
                <h3 className="phase-title">{item.title}</h3>
                <p className="phase-timeline">{item.timeline}</p>
                <p className="phase-description">{item.description}</p>
                <div className="phase-regions">
                  {item.regions.map((region, idx) => (
                    <span className="region-pill" key={idx}>{region}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Timeline Visual */}
      <div className="timeline-section">
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-markers">
            <div className="timeline-marker">
              <div className="marker-dot active"></div>
              <div className="marker-year">2024</div>
              <div className="marker-label">Launch</div>
            </div>
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-year">2026</div>
              <div className="marker-label">Expand</div>
            </div>
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-year">2029</div>
              <div className="marker-label">Integrate</div>
            </div>
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-year">2032</div>
              <div className="marker-label">Scale</div>
            </div>
            <div className="timeline-marker">
              <div className="marker-dot"></div>
              <div className="marker-year">2035</div>
              <div className="marker-label">Transform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sublabel">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Reach Section */}
      <div className="global-section">
        <div className="global-header">
          <span className="section-eyebrow">Global Reach</span>
          <h2 className="section-title">Everywhere.<br />For everyone.</h2>
          <p className="section-description">
            Our expansion strategy spans four continents, bringing next-generation 
            air mobility to cities and communities around the world.
          </p>
        </div>

        <div className="global-grid">
          {globalReach.map((item, index) => (
            <div className="global-card" key={index}>
              <h3 className="global-region">{item.region}</h3>
              <p className="global-description">{item.description}</p>
              <ul className="global-countries">
                {item.countries.map((country, idx) => (
                  <li key={idx}>{country}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="quote-section">
        <blockquote className="quote-block">
          <p className="quote-text">
            "The sky is not the limit. It's just the beginning."
          </p>
          <footer className="quote-footer">
            <span className="quote-source">Fly Hive Technologies</span>
          </footer>
        </blockquote>
      </div>

      {/* Features List */}
      <div className="features-section">
        <div className="features-header">
          <span className="section-eyebrow">What Sets Us Apart</span>
          <h2 className="section-title">Built for<br />tomorrow.</h2>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h4 className="feature-title">Time Efficiency</h4>
            <p className="feature-description">Reduce travel time by up to 80% compared to ground transportation.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 12L3 7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 12L21 7" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h4 className="feature-title">Zero Emissions</h4>
            <p className="feature-description">100% electric propulsion for sustainable urban air mobility.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="feature-title">Safety First</h4>
            <p className="feature-description">Redundant systems and autonomous capabilities for maximum safety.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 21V9" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h4 className="feature-title">Smart Integration</h4>
            <p className="feature-description">Seamless connectivity with existing transportation networks.</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default MasterPlanSection;