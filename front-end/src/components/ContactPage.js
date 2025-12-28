import { useState, useRef, useEffect } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const form = useRef();
  const sectionRef = useRef(null);

  // Scroll progress handler
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
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

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: 'general'
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send emails');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Headquarters',
      details: [
        'Hive+ Industries',
        'Charkop Sector-9, Near Swami Samarth Mandir',
        'Kandivali West, Mumbai 400067'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5342 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.09501 3.90347 2.12787 3.62476 2.2165 3.36162C2.30513 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Contact Numbers',
      details: [
        'General: +91 9920887455',
        'Sales: +91 9920887455',
        'Support: +91 9920887455'
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Email Address',
      details: [
        'info@flyhivetechnologies.com'
      ]
    }
  ];

  const businessHours = [
    { day: 'Monday — Friday', hours: '9:00 AM — 6:00 PM IST' },
    { day: 'Saturday', hours: '10:00 AM — 4:00 PM IST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return now.toLocaleDateString('en-IN', options);
  };

  return (
    <div className="contact-page" ref={sectionRef}>
      {/* Progress Bar */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        
        <div className="hero-content">
          <span className="hero-eyebrow animate-on-scroll">Contact Us</span>
          <h1 className="hero-title animate-on-scroll">
            Get in <span className="title-accent">touch.</span>
          </h1>
          <p className="hero-subtitle animate-on-scroll">
            Connect with our specialists for consultation and partnership opportunities.
          </p>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="contact-container">
          
          {/* Section Header */}
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">How can we help?</h2>
            <p className="section-description">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="contact-grid">
            
            {/* Contact Form */}
            <div className="form-column">
              <div className="form-card animate-on-scroll">
                
                {submitted ? (
                  <div className="success-message">
                    <div className="success-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="success-title">Message Sent</h3>
                    <p className="success-text">
                      Thank you for reaching out. We've sent a confirmation to your email 
                      and will respond within 24 hours.
                    </p>
                    <button 
                      className="success-button"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={handleSubmit} className="contact-form">
                    
                    {error && (
                      <div className="error-message">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="12" cy="16" r="1" fill="currentColor"/>
                        </svg>
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="form-row">
                      <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${formData.name ? 'has-value' : ''}`}>
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          className="form-input"
                        />
                        <span className="form-highlight" />
                      </div>

                      <div className={`form-group ${focusedField === 'organization' ? 'focused' : ''} ${formData.organization ? 'has-value' : ''}`}>
                        <label htmlFor="organization" className="form-label">Organization</label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          onFocus={() => handleFocus('organization')}
                          onBlur={handleBlur}
                          className="form-input"
                        />
                        <span className="form-highlight" />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'has-value' : ''}`}>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          className="form-input"
                        />
                        <span className="form-highlight" />
                      </div>

                      <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''} ${formData.phone ? 'has-value' : ''}`}>
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus('phone')}
                          onBlur={handleBlur}
                          className="form-input"
                        />
                        <span className="form-highlight" />
                      </div>
                    </div>

                    <div className={`form-group ${focusedField === 'category' ? 'focused' : ''}`}>
                      <label htmlFor="category" className="form-label">Inquiry Type</label>
                      <div className="select-wrapper">
                        <select
                          id="category"
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleChange}
                          onFocus={() => handleFocus('category')}
                          onBlur={handleBlur}
                          className="form-select"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales & Procurement</option>
                          <option value="technical">Technical Support</option>
                          <option value="partnership">Partnership Opportunities</option>
                          <option value="careers">Careers</option>
                        </select>
                        <svg className="select-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="form-highlight" />
                    </div>

                    <div className={`form-group ${focusedField === 'subject' ? 'focused' : ''} ${formData.subject ? 'has-value' : ''}`}>
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        className="form-input"
                      />
                      <span className="form-highlight" />
                    </div>

                    <div className={`form-group ${focusedField === 'message' ? 'focused' : ''} ${formData.message ? 'has-value' : ''}`}>
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        className="form-textarea"
                      />
                      <span className="form-highlight" />
                    </div>

                    <button
                      type="submit"
                      className={`submit-button ${loading ? 'loading' : ''}`}
                      disabled={loading}
                    >
                      <span className="button-text">
                        {loading ? 'Sending...' : 'Send Message'}
                      </span>
                      <span className="button-icon">
                        {loading ? (
                          <svg className="spinner" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                              <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                            </circle>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                    </button>

                    <p className="form-disclaimer">
                      By submitting this form, you agree to our privacy policy. 
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="info-column">
              
              {/* Contact Cards */}
              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="info-card animate-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="info-card-icon">{info.icon}</div>
                    <div className="info-card-content">
                      <h3 className="info-card-title">{info.title}</h3>
                      <div className="info-card-details">
                        {info.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="hours-card animate-on-scroll">
                <div className="hours-header">
                  <div className="hours-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="hours-title">Business Hours</h3>
                </div>
                
                <div className="hours-list">
                  {businessHours.map((item, index) => (
                    <div key={index} className="hours-item">
                      <span className="hours-day">{item.day}</span>
                      <span className={`hours-time ${item.hours === 'Closed' ? 'closed' : ''}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hours-current">
                  <span className="current-label">Current Time</span>
                  <span className="current-time">{getCurrentDateTime()}</span>
                </div>

                <div className="hours-note">
                  <div className="note-indicator" />
                  <span>24/7 Support available for critical operations</span>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="quick-contact animate-on-scroll">
                <p className="quick-text">Prefer email?</p>
                <a href="mailto:info@flyhivetechnologies.com" className="quick-link">
                  info@flyhivetechnologies.com
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container animate-on-scroll">
          <div className="map-placeholder">
            <div className="map-pin">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="map-address">
              Charkop Sector-9, Kandivali West<br />
              Mumbai 400067, India
            </p>
            <a 
              href="https://maps.google.com/?q=Charkop+Sector+9+Kandivali+West+Mumbai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              Open in Maps
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="contact-cta">
        <div className="cta-container animate-on-scroll">
          <h2 className="cta-title">Let's build the future together.</h2>
          <p className="cta-description">
            Partner with Hive+ Technologies for innovative aerospace solutions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;