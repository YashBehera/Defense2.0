import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const ContactPage = () => {
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errors, setErrors] = useState({});
  const [mapVisible, setMapVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  const contactInfo = [
    {
      icon: '📍',
      title: 'Headquarters',
      details: [
        'Bharath Defence Systems Pvt. Ltd.',
        'Defense Tech Park, Sector 5',
        'Bangalore - 560001, Karnataka, India'
      ]
    },
    {
      icon: '📞',
      title: 'Contact Numbers',
      details: [
        'General: +91-80-2345-6789',
        'Sales: +91-80-2345-6790',
        'Support: +91-80-2345-6791'
      ]
    },
    {
      icon: '📧',
      title: 'Email Addresses',
      details: [
        'info@bharathdefence.com',
        'sales@bharathdefence.com',
        'support@bharathdefence.com'
      ]
    }
  ];

  const offices = [
    {
      location: 'R&D Center',
      address: 'IIT Delhi Campus, New Delhi',
      type: 'Research'
    },
    {
      location: 'Production Facility',
      address: 'MIDC, Pune, Maharashtra',
      type: 'Manufacturing'
    },
    {
      location: 'Testing Range',
      address: 'Pokhran, Rajasthan',
      type: 'Testing'
    }
  ];

  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(id);
    }
  }, [toast]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.phone && !/^[\+0-9\s\-\(\)]{7,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ type: 'error', message: 'Please fix validation errors and try again.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission — replace with API call in production
      await new Promise(res => setTimeout(res, 900));

      // open mail client as fallback / integration point
      const subject = `Inquiry: ${formData.subject || 'General Inquiry'}`;
      const body = `${formData.message}\n\nName: ${formData.name}\nOrg: ${formData.organization}\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
      window.location.href = `mailto:info@bharathdefence.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      setSubmitStatus('success');
      setToast({ type: 'success', message: 'Message sent — check your email client to complete the request.' });

      // reset form (keeping category helpful)
      setFormData(prev => ({ ...prev, name: '', organization: '', email: '', phone: '', subject: '', message: '' }));
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setToast({ type: 'error', message: 'Failed to send. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } })
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

        <motion.div
          initial={prefersReducedMotion ? 'enter' : 'initial'}
          animate="enter"
          variants={heroVariants}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">GET IN <span className="text-red-600">TOUCH</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Connect with our defense specialists for consultation — secure channels available on request.</p>

          <div className="mt-6 flex gap-3 justify-center">
            <a href="/products" className="px-5 py-3 bg-black text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition">View Products</a>
            <button onClick={() => setMapVisible(true)} className="px-5 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">Show Map</button>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input name="name" type="text" value={formData.name} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-red-500`} placeholder="John Doe" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                      {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                      <input name="organization" type="text" value={formData.organization} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Company/Agency" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-red-500`} placeholder="john@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                      {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 rounded border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-red-500`} placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                      {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type *</label>
                    <select name="category" value={formData.category} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales & Procurement</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input name="subject" type="text" value={formData.subject} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Brief description" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea name="message" rows={6} value={formData.message} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 resize-vertical" placeholder="Provide detailed information about your requirements..." />
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }} type="submit" disabled={isSubmitting} className={`px-6 py-3 rounded font-semibold text-white ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'}`}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    <button type="button" onClick={() => { setFormData({ name: '', organization: '', email: '', phone: '', subject: '', message: '', category: 'general' }); setErrors({}); }} disabled={isSubmitting} className="px-4 py-3 rounded border border-gray-300">Reset</button>

                    <div className="ml-auto text-sm text-gray-500">* Required fields</div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Contact Info Cards */}
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <motion.div key={info.title} custom={idx} variants={cardVariants} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{info.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((d, i) => (
                          <p key={i} className="text-gray-600 text-sm">{d}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Business Hours</h3>
                  <div className="space-y-2 text-gray-600 text-sm">
                    <div className="flex justify-between"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span className="text-gray-500">Closed</span></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">24/7 Support available for critical defense operations</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-6">OUR FACILITIES</h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
            {offices.map((office, idx) => (
              <motion.div key={office.location} custom={idx} variants={cardVariants} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center"><span className="text-2xl">🏢</span></div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{office.location}</h3>
                <p className="text-gray-600 text-sm mb-2">{office.address}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{office.type}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map (lazy) */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-xl font-semibold mb-4">Location Map</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-72 relative">
            {!mapVisible ? (
              <div className="h-full flex items-center justify-center">
                <button onClick={() => setMapVisible(true)} className="px-6 py-3 bg-black text-white rounded">Load Map</button>
              </div>
            ) : (
              <iframe title="Company locations" src="https://maps.google.com/maps?q=Bangalore&t=&z=11&ie=UTF8&iwloc=&output=embed" className="w-full h-full border-0" loading="lazy" />
            )}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-8 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100 mt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-red-600">24/7 Emergency Support</h4>
            <p className="text-gray-600">For critical defense operations and urgent technical assistance</p>
          </div>
          <a href="tel:+911800123456" className="px-6 py-3 bg-red-600 text-white rounded font-semibold">1800-123-456</a>
        </div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} ref={toastRef} className={`fixed bottom-6 right-6 z-50 max-w-sm w-full rounded-lg p-4 shadow-xl ${toast.type === 'success' ? 'bg-white border border-green-100' : 'bg-white border border-red-100'}`} role="status" aria-live="polite">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {toast.type === 'success' ? '✓' : '!'}
              </div>
              <div className="text-sm text-gray-800">{toast.message}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;