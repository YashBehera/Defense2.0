import React, { useState, useEffect, useRef, useTransition } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Server Action (runs on server, no separate API route needed)
async function sendContactEmail(formData) {
  'use server'; // This marks it as a Server Action

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const FROM_EMAIL = process.env.FROM_EMAIL;
  const RECIPIENT_EMAILS = process.env.RECIPIENT_EMAILS?.split(',').map(email => email.trim()) || [];

  try {
    if (!RECIPIENT_EMAILS.length) {
      throw new Error('No recipient emails configured');
    }

    const recipients = RECIPIENT_EMAILS.map(email => ({
      email: email,
      name: email.includes('info') ? 'General Info Team' : 
            email.includes('sales') ? 'Sales Team' : 'Support Team'
    }));

    const categoryMap = {
      general: 'General Inquiry',
      sales: 'Sales & Procurement Request',
      technical: 'Technical Support Request',
      partnership: 'Partnership Opportunity',
      careers: 'Career Opportunity'
    };
    
    const subject = `${categoryMap[formData.category] || 'New Contact Form'}: ${formData.subject || 'General Inquiry'}`;

    const htmlEmail = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 2rem; font-weight: 700;">🛡️ New Defense Inquiry</h1>
        </div>
        <div style="background: white; padding: 2rem; border-left: 4px solid #667eea; margin: 0;">
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: #2c3e50; margin: 0 0 1rem 0;">Contact Details</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div><strong>Name:</strong> ${formData.name}</div>
              <div><strong>Organization:</strong> ${formData.organization || 'Not provided'}</div>
              <div><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></div>
              <div><strong>Phone:</strong> ${formData.phone || 'Not provided'}</div>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: #2c3e50; margin: 0 0 1rem 0;">Inquiry Details</h2>
            <p><strong>Category:</strong> ${categoryMap[formData.category] || 'General'}</p>
            <p><strong>Subject:</strong> ${formData.subject || 'General Inquiry'}</p>
          </div>
          <div style="background: white; padding: 1.5rem; border: 1px solid #e9ecef; border-radius: 8px;">
            <h2 style="color: #2c3e50; margin: 0 0 1rem 0;">Message</h2>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 6px; white-space: pre-wrap;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; font-size: 0.85rem; color: #6c757d;">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    `;

    const data = {
      from: FROM_EMAIL,
      to: recipients,
      subject: subject,
      html: htmlEmail,
      text: `New Defense Inquiry\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      tags: [{ name: 'contact-form', value: 'submission' }]
    };

    const result = await resend.emails.send(data);
    return { success: true, message: 'Email sent successfully to all recipients' };

  } catch (error) {
    console.error('Resend Error:', error);
    throw new Error(error.message || 'Failed to send email');
  }
}

const ContactPage = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [mapVisible, setMapVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  // ... (keep all your existing contactInfo, offices, useEffect, etc.)

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.phone && !/^[\+0-9\s\-\(\)]{7,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (formData) => {
    setSubmitStatus(null);
    
    if (!validateForm()) {
      setToast({ type: 'error', message: 'Please fix validation errors and try again.' });
      return;
    }

    try {
      const result = await sendContactEmail(formData);
      
      setSubmitStatus('success');
      setToast({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent to our team. We\'ll respond within 24 hours.' 
      });

      // Reset form
      setFormData({ 
        name: '', 
        organization: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '', 
        category: 'general' 
      });
      setErrors({});

    } catch (err) {
      console.error('Submission Error:', err);
      setSubmitStatus('error');
      setToast({ 
        type: 'error', 
        message: err.message || 'Failed to send message. Please try again.' 
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
      handleSubmit(formData);
    });
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      organization: '', 
      email: '', 
      phone: '', 
      subject: '', 
      message: '', 
      category: 'general' 
    });
    setErrors({});
    setSubmitStatus(null);
  };

  // ... (keep all your existing JSX for hero, contact info, offices, map, etc.)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - keep existing */}
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }} 
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>

                {/* Success/Error Feedback - keep existing */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl font-bold">✓</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800 mb-1">Message Sent Successfully!</h3>
                          <p className="text-green-700 text-sm">Your inquiry has been sent to our defense specialists.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl font-bold">!</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-red-800 mb-1">Failed to Send Message</h3>
                          <p className="text-red-700 text-sm">Please try again or contact us directly.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={onSubmit} className="space-y-6" noValidate>
                  {/* Keep all your existing form fields */}
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <motion.button 
                      whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }} 
                      type="submit" 
                      disabled={isPending}
                      className={`px-6 py-3 rounded font-semibold text-white flex-1 sm:flex-none ${
                        isPending 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                      } transition-colors`}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>

                    <button 
                      type="button" 
                      onClick={resetForm} 
                      disabled={isPending}
                      className="px-4 py-3 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Reset
                    </button>

                    <div className="text-sm text-gray-500 sm:ml-auto">* Required fields</div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Keep existing Contact Info Cards */}
          </div>
        </div>
      </section>

      {/* Keep existing Offices, Map, Emergency CTA, Toast sections */}
    </div>
  );
};

export default ContactPage;