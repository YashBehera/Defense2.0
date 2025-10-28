// Privacy.js
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { fadeInUpVariants, viewportOptions } from './motionVariants';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.title = 'Privacy Policy | Hive+ Defense Solutions';
  }, []);

  const motionConfig = {
    initial: "initial",
    whileInView: "animate",
    viewport: viewportOptions,
    variants: fadeInUpVariants,
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-700 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            {...motionConfig}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUpVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-red-600 rounded-full" />
              <span className="text-sm font-semibold text-gray-700">PRIVACY POLICY</span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Your Privacy,
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-red-600 to-red-700 bg-clip-text text-transparent">
                Our Priority
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              At Hive+, we respect your privacy and are committed to protecting your data — whether you're a defense partner, enterprise client, or website visitor.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="mt-8 text-sm text-gray-500"
            >
              Last Updated: <span className="font-medium">October 28, 2025</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="prose prose-lg prose-gray max-w-none space-y-16">

            {/* 1. Introduction */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Hive+ ("we," "our," or "us") operates advanced autonomous aerial systems for defense, public safety, and critical infrastructure. This Privacy Policy explains how we collect, use, disclose, and protect your information when you:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Visit our website <Link to="/" className="text-red-600 hover:underline">hiveplus.com</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Use our products or services
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Communicate with us
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Operate Hive+ drones or software platforms
                </li>
              </ul>
              <p className="mt-4 text-gray-600">
                We comply with <strong>GDPR</strong>, <strong>CCPA</strong>, <strong>ITAR</strong>, and other applicable data protection laws.
              </p>
            </motion.div>

            {/* 2. Data We Collect */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">2. Information We Collect</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">A. Information You Provide</h3>
                  <ul className="space-y-2 text-gray-600 ml-6">
                    <li>• Contact details (name, email, phone, organization)</li>
                    <li>• Professional role and clearance level (for defense clients)</li>
                    <li>• Inquiry or support requests</li>
                    <li>• Demo or consultation scheduling</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">B. Automatically Collected Data</h3>
                  <ul className="space-y-2 text-gray-600 ml-6">
                    <li>• IP address, browser type, device info</li>
                    <li>• Pages visited, time spent, referral source</li>
                    <li>• Analytics via cookies and tracking pixels</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">C. Drone & System Data (When in Use)</h3>
                  <ul className="space-y-2 text-gray-600 ml-6">
                    <li>• Flight logs, telemetry, GPS coordinates</li>
                    <li>• Camera feeds (live or recorded)</li>
                    <li>• AI detection events and metadata</li>
                    <li>• System performance and diagnostics</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 3. How We Use Your Data */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">3. How We Use Your Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Service Delivery", desc: "Operate drones, provide support, deliver firmware updates" },
                  { title: "Security & Compliance", desc: "Detect threats, ensure ITAR/export compliance" },
                  { title: "Product Improvement", desc: "Analyze flight data to enhance AI and autonomy" },
                  { title: "Communication", desc: "Respond to inquiries, send security alerts" },
                  { title: "Legal Obligations", desc: "Comply with defense contracts and regulations" },
                  { title: "Marketing (Opt-in)", desc: "Send product updates to consented users" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUpVariants}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 4. Data Sharing */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">4. Data Sharing & Disclosure</h2>
              <p className="text-gray-600 mb-4">
                We <strong>do not sell</strong> your personal data. We share only when necessary:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <strong>Service Providers:</strong> Cloud hosting (AWS GovCloud), analytics, support
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <strong>Defense Partners:</strong> Authorized agencies under NDA and contract
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <strong>Legal Requirements:</strong> Court orders, national security requests
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <strong>Business Transfers:</strong> Mergers, acquisitions (with notice)
                </li>
              </ul>
            </motion.div>

            {/* 5. Drone Data & Security */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">5. Drone Data Security</h2>
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Military-Grade Protection</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">Check</span>
                    End-to-end encryption (AES-256)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">Check</span>
                    Secure boot & firmware signing
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">Check</span>
                    Zero-trust network architecture
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">Check</span>
                    Data residency in US/EU (client-configurable)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-400">Check</span>
                    Regular penetration testing
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 6. Your Rights */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">6. Your Privacy Rights</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-3">CCPA (California Residents)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Right to know</li>
                    <li>• Right to delete</li>
                    <li>• Right to opt-out of sale</li>
                    <li>• Right to non-discrimination</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-3">GDPR (EU/UK Residents)</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Right to access</li>
                    <li>• Right to rectification</li>
                    <li>• Right to erasure</li>
                    <li>• Right to restrict processing</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-gray-600">
                Submit requests to: <a href="mailto:privacy@hiveplus.com" className="text-red-600 hover:underline font-medium">privacy@hiveplus.com</a>
              </p>
            </motion.div>

            {/* 7. Cookies */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">7. Cookies & Tracking</h2>
              <p className="text-gray-600">
                We use essential cookies for functionality and analytics (Google Analytics, Hotjar). Marketing cookies require consent.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold"
              >
                Manage Cookie Preferences
              </motion.button>
            </motion.div>

            {/* 8. Children's Privacy */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">8. Children's Privacy</h2>
              <p className="text-gray-600">
                Our services are not directed to individuals under 18. We do not knowingly collect data from children.
              </p>
            </motion.div>

            {/* 9. Changes */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">9. Policy Updates</h2>
              <p className="text-gray-600">
                We may update this policy. Significant changes will be notified via email or website banner. Continued use constitutes acceptance.
              </p>
            </motion.div>

            {/* 10. Contact */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">10. Contact Us</h2>
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Data Protection Officer</h3>
                <p className="text-gray-600 mb-2">
                  Email: <a href="mailto:privacy@hiveplus.com" className="text-red-600 hover:underline">privacy@hiveplus.com</a>
                </p>
                <p className="text-gray-600 mb-2">
                  Address: Hive+ Secure Facilities, 1280 Defense Way, Austin, TX 78701, USA
                </p>
                <p className="text-gray-600">
                  Phone: <span className="font-mono">+1 (512) 888-9000</span>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-t from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h3
            {...motionConfig}
            className="text-2xl sm:text-3xl font-bold mb-4"
          >
            Questions About Privacy?
          </motion.h3>
          <motion.p
            {...motionConfig}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Our team is ready to provide transparency and support for your data protection needs.
          </motion.p>
          <motion.div
            {...motionConfig}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Contact Privacy Team
            </Link>
            <a
              href="mailto:privacy@hiveplus.com"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              Email DPO
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;