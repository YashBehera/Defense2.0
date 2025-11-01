import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useRef();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Auto-detect production or local backend
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://your-backend-domain.com" // 🔧 Replace with your actual backend domain
      : "http://localhost:4000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          organization: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          category: "general",
        });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Headquarters",
      details: [
        "Hive+ Industries",
        "Charkop Sector-9, Near Swami Samarth Mandir, Kandivali West, Mumbai 400067",
      ],
    },
    {
      icon: "📞",
      title: "Contact Numbers",
      details: [
        "General: +91 9920887455",
        "Sales: +91 9920887455",
        "Support: +91 9920887455",
      ],
    },
    {
      icon: "📧",
      title: "Email Addresses",
      details: ["info@flyhivetechnologies.com"],
    },
  ];

  const offices = [
    { location: "R&D Center", address: "IIT Delhi Campus, New Delhi", type: "Research" },
    { location: "Production Facility", address: "MIDC, Pune, Maharashtra", type: "Manufacturing" },
    { location: "Testing Range", address: "Pokhran, Rajasthan", type: "Testing" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-red-600 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-4 text-gray-900"
          >
            GET IN <span className="text-red-600">TOUCH</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Connect with our defense specialists for consultation
          </motion.p>
        </div>
      </section>

      {/* Main Section */}
      <section>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2 pb-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white border border-gray-200 rounded-lg p-8"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Send us a Message</h2>

                {submitted ? (
                  <div className="text-center text-green-600 font-medium">
                    ✅ Thank you for your message! We’ve sent a confirmation to your email.
                  </div>
                ) : (
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="text-center text-red-600">{error}</div>}

                    {/* Name & Org */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Company/Agency Name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales & Procurement</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded focus:ring-2 focus:ring-red-500 resize-none"
                        placeholder="Provide detailed information about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full p-3 rounded-md transition-colors ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600"
                      }`}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>

                    <p className="text-xs text-gray-500">
                      * Required fields. We respect your privacy and never share your information.
                    </p>
                  </form>
                )}
                <div className="mt-6 text-center text-gray-600">
                  Or email us directly at{" "}
                  <a
                    href="mailto:info@flyhivetechnologies.com"
                    className="text-red-500 hover:text-red-600"
                  >
                    info@flyhivetechnologies.com
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <span className="text-3xl">{info.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Business Hours</h3>
                  <div className="space-y-2 text-gray-600 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-gray-500">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    24/7 Support available for critical defense operations
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
