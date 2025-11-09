// Privacy.js
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { fadeInUpVariants, viewportOptions } from './motionVariants';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.title = 'Privacy Policy | Hive+ India Defense Solutions';
  }, []);

  const motionConfig = {
    initial: "initial",
    whileInView: "animate",
    viewport: viewportOptions,
    variants: fadeInUpVariants,
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Progress Bar – Tricolor */}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-6 border border-orange-200"
            >
              <span className="w-2 h-2 bg-orange-600 rounded-full" />
              <span className="text-sm font-semibold text-orange-700">PRIVACY POLICY</span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Your Data,
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-green-600 bg-clip-text text-transparent">
                भारत की सुरक्षा में
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We protect your mission data under <strong>DPDP Act 2023</strong> — stored in India, encrypted end-to-end, and never shared without consent.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="mt-8 text-sm text-gray-500"
            >
              Last Updated: <span className="font-medium">28 October 2025</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="prose prose-lg prose-gray max-w-none space-y-16">

            {/* 1. Introduction */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Hive+ India Private Limited ("we," "our," or "us") operates indigenous autonomous drone systems for defense, public safety, and enterprise use. This Privacy Policy explains how we collect, use, disclose, and protect your information.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  Visit our website <Link to="/" className="text-orange-600 hover:underline">hiveplus.in</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  Use our drone systems or AI software
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  Communicate with us
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  Operate Hive+ platforms under MoD, CAPF, or enterprise contracts
                </li>
              </ul>
              <p className="mt-4 text-gray-600">
                We comply with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and other Indian laws.
              </p>
            </motion.div>

            {/* 2. Data We Collect */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">2. Information We Collect</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">A. Information You Provide</h3>
                  <ul className="space-y-2 text-gray-600 ml-6">
                    <li>• Name, email, phone, organization</li>
                    <li>• Role, clearance level (for defense clients)</li>
                    <li>• Inquiry or support requests</li>
                    <li>• GeM or contract-related data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">B. Automatically Collected</h3>
                  <ul className="space-y-2 text-gray-600 ml-6">
                    <li>• IP address, browser, device type</li>
                    <li>• Pages visited, time spent, referral source</li>
                    <li>• Analytics via cookies (consent-based)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">C. Mission & Drone Data</h3>
                  <ul className="space-y-2 text-gray-600 ml-6">
                    <li>• Flight logs, GPS coordinates, telemetry</li>
                    <li>• Camera feeds (encrypted, client-owned)</li>
                    <li>• AI detection events and metadata</li>
                    <li>• System diagnostics and performance</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 3. How We Use Your Data */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">3. How We Use Your Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Service Delivery", desc: "Operate drones, provide updates, support" },
                  { title: "Security", desc: "Detect threats, ensure SCOMET compliance" },
                  { title: "Product Improvement", desc: "Enhance AI and autonomy with anonymized data" },
                  { title: "Communication", desc: "Respond to inquiries, send alerts" },
                  { title: "Legal Compliance", desc: "Meet DPDP Act, DPP, and contract obligations" },
                  { title: "Marketing (Opt-in)", desc: "Send updates to consented users" },
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
                We <strong>do not sell</strong> your data. Sharing occurs only when:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>Service Providers:</strong> Indian cloud (Tier-4 DC), analytics, support
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>Defense Partners:</strong> MoD, CAPF, DPSUs under NDA
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>Legal Requirements:</strong> Court orders, national security
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>Business Transfers:</strong> Mergers (with notice)
                </li>
              </ul>
            </motion.div>

            {/* 5. Data Security */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">5. Data Security & Encryption</h2>
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Military-Grade Protection</h3>
                <ul className="grid md:grid-cols-2 gap-4 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    AES-256-GCM end-to-end encryption
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Secure boot & firmware signing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Zero-trust network architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Data residency in India (Noida DC)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Annual STQC penetration testing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    On-device AI processing
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 6. Your Rights under DPDP Act */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">6. Your Rights under DPDP Act 2023</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                  <h4 className="font-semibold text-lg mb-3 text-green-700">Data Principal Rights</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Right to access your data</li>
                    <li>• Right to correction</li>
                    <li>• Right to erasure</li>
                    <li>• Right to nominate</li>
                  </ul>
                </div>
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h4 className="font-semibold text-lg mb-3 text-blue-700">Our Obligations</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Consent-based processing</li>
                    <li>• Data minimization</li>
                    <li>• Breach notification within 72 hours</li>
                    <li>• DPO appointed</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-gray-600">
                Submit requests to: <a href="mailto:privacy@hiveplus.in" className="text-red-600 hover:underline font-medium">privacy@hiveplus.in</a>
              </p>
            </motion.div>

            {/* 7. Cookies */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">7. Cookies & Tracking</h2>
              <p className="text-gray-600">
                We use essential cookies for functionality. Analytics and marketing cookies require your consent.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
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

            {/* 10. Contact – RED THEMED DPO CARD */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">10. Contact Us</h2>
              <div className="bg-gradient-to-r from-red-50 to-red-50 rounded-xl p-6 sm:p-8 border border-red-200">
                <h3 className="font-bold text-lg mb-4 text-red-700">Data Protection Officer</h3>
                <p className="text-gray-700 mb-2">
                  Email: <a href="mailto:infof@flyhiveindustries.com" className="text-red-600 hover:underline font-medium">infof@flyhiveindustries.com</a>
                </p>
                <p className="text-gray-700 mb-2">
                  Address: Hive+ India Pvt. Ltd., Plot 42, Sector 32, Gurugram, Haryana 122001, India
                </p>
                <p className="text-gray-700">
                  Phone: <span className="font-mono">+91 124 681 9000</span> | GSTIN: <code>06AAGCH1234A1Z5</code>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Footer – FULL RED THEME */}
      <section className="bg-gradient-to-t from-red-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h3
            {...motionConfig}
            className="text-2xl sm:text-3xl font-bold mb-4 text-red-700"
          >
            Questions About Data Privacy?
          </motion.h3>
          <motion.p
            {...motionConfig}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Our DPO and team are ready to assist with compliance, erasure, or audit requests.
          </motion.p>
          <motion.div
            {...motionConfig}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition shadow-lg"
            >
              Contact DPO
            </Link>
            <a
              href="mailto:privacy@hiveplus.in"
              className="px-8 py-4 border-2 border-red-300 text-red-700 rounded-lg font-bold hover:border-red-400 transition"
            >
              Email Privacy Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;