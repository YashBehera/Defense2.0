// Terms.js
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { fadeInUpVariants, viewportOptions } from './motionVariants';
import { Link } from 'react-router-dom';

const Terms = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.title = 'Terms of Service | Hive+ India Defense Solutions';
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-white to-green-600 z-50 origin-left"
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
              <span className="text-sm font-bold text-orange-700">भारत</span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Terms of Service
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-green-600 bg-clip-text text-transparent">
                आत्मनिर्भर भारत के लिए
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              These Terms govern your use of Hive+ India’s indigenous drone systems, AI software, and services — built under <strong>Make in India</strong> for national security and enterprise autonomy.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="mt-8 text-sm text-gray-500"
            >
              Effective Date: <span className="font-medium">28 October 2025</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="prose prose-lg prose-gray max-w-none space-y-16">

            {/* 1. Acceptance */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using any Hive+ India website, product, software, or service (the <strong>"Service"</strong>), you agree to be bound by these Terms of Service ("Terms").
              </p>
              <p className="mt-4 text-gray-600">
                These Terms form a <strong>legally binding agreement</strong> between you and <strong>Hive+ India Private Limited</strong>, a company incorporated under the Companies Act, 2013, with CIN: <code>U29309DL2022PTC400001</code>.
              </p>
            </motion.div>

            {/* 2. Eligibility */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">2. Eligibility</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  You must be <strong>18 years or older</strong> and capable of entering into contracts under the Indian Contract Act, 1872.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  For organizational use, you must have <strong>due authority</strong> to bind your entity.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  You must comply with <strong>DGFT SCOMET regulations</strong> and other Indian export laws.
                </li>
              </ul>
            </motion.div>

            {/* 3. License Grant */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">3. License Grant</h2>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-8 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-orange-700">
                  Limited Indigenous Technology License
                </h3>
                <p className="mb-4">
                  Subject to compliance with these Terms and your purchase order, Hive+ India grants you:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">Check</span>
                    <strong>Non-exclusive, non-transferable</strong> license to use the Service
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">Check</span>
                    For <strong>internal defense, security, or enterprise operations in India</strong>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-green-600">Check</span>
                    In alignment with <strong>DPP 2020, Make in India, and Atmanirbhar Bharat</strong>
                  </li>
                </ul>
                <p className="mt-6 text-sm opacity-90">
                  Reverse engineering, decompiling, or modifying any Hive+ hardware/software is strictly prohibited.
                </p>
              </div>
            </motion.div>

            {/* 4. Prohibited Uses */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">4. Prohibited Uses</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Use in violation of Indian laws or international treaties",
                  "Export without DGFT SCOMET license",
                  "Integration with non-approved foreign systems",
                  "Use against Indian state or armed forces",
                  "Unauthorized data sharing with foreign entities",
                  "Commercial resale without prior written consent",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUpVariants}
                    className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-5"
                  >
                    <span className="text-red-600 mt-0.5">No Entry</span>
                    <p className="text-sm text-red-900">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 5. Export Controls */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">5. Export Controls & SCOMET</h2>
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-orange-300 rounded-xl p-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">India Flag</span> SCOMET Controlled Technology
                </h3>
                <p className="text-gray-700 mb-4">
                  Hive+ products are listed under <strong>SCOMET Category 6</strong> (Munitions List) and require <strong>DGFT export license</strong> for any transfer outside India.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• You must obtain <strong>SCOMET authorization</strong> before export</li>
                  <li>• You certify you are not on any <strong>denied entity list</strong></li>
                  <li>• Re-export to third countries is prohibited without approval</li>
                  <li>• Violation may lead to <strong>termination and legal action</strong></li>
                </ul>
              </div>
            </motion.div>

            {/* 6. Intellectual Property */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">6. Intellectual Property</h2>
              <p className="text-gray-600">
                All Hive+ technology is protected under the <strong>Indian Patents Act, 1970</strong>, <strong>Copyright Act, 1957</strong>, and <strong>Designs Act, 2000</strong>.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  You receive no ownership — only a <strong>limited license</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  Hive+ retains all IP rights, including <strong>DRDO co-developed tech</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  You may not remove <strong>"Made in India"</strong> or proprietary markings
                </li>
              </ul>
            </motion.div>

            {/* 7. Data & Privacy */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">7. Data Ownership & DPDP Act</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-green-600">Check</span> Your Data
                  </h4>
                  <p className="text-sm text-gray-700">
                    You own your mission data, flight logs, and sensor feeds.
                  </p>
                </div>
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-blue-600">Shield</span> DPDP Act 2023
                  </h4>
                  <p className="text-sm text-gray-700">
                    We process data as per the <strong>Digital Personal Data Protection Act, 2023</strong>.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 8. Warranties */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">8. Warranties & Disclaimers</h2>
              <p className="text-gray-600 mb-4">
                The Service is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis.
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• No warranty against electronic warfare, jamming, or cyber attacks</li>
                <li>• You assume full risk for operational use</li>
                <li>• Commercial warranties per your <strong>GST invoice and contract</strong></li>
              </ul>
            </motion.div>

            {/* 9. Limitation of Liability */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">9. Limitation of Liability</h2>
              <p className="text-gray-600 font-medium">
                To the extent permitted by law, Hive+ India shall not be liable for:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 font-medium">
                <li>• Indirect, consequential, or punitive damages</li>
                <li>• Loss of life, injury, or national security breach</li>
                <li>• Liability exceeding fees paid in the last 12 months</li>
              </ul>
            </motion.div>

            {/* 10. Termination */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">10. Termination</h2>
              <p className="text-gray-600">
                We may suspend or terminate access immediately if you:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Breach these Terms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Violate SCOMET or national security laws
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  Engage in unauthorized foreign transfer
                </li>
              </ul>
            </motion.div>

            {/* 11. Governing Law */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">11. Governing Law & Jurisdiction</h2>
              <p className="text-gray-600">
                These Terms are governed by the <strong>laws of India</strong>.
              </p>
              <p className="mt-2 text-gray-600">
                Any disputes shall be subject to the <strong>exclusive jurisdiction of courts in New Delhi, India</strong>.
              </p>
            </motion.div>

            {/* 12. Government Contracts */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">12. Government & DPSU Contracts</h2>
              <p className="text-gray-600 text-sm">
                For contracts under <strong>DPP 2020</strong>, <strong>GeM</strong>, or with MoD/DPSUs, additional terms in your <strong>Purchase Order</strong> or <strong>Contract</strong> shall prevail.
              </p>
            </motion.div>

            {/* 13. Changes */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">13. Amendments</h2>
              <p className="text-gray-600">
                We may update these Terms. Continued use after notification constitutes acceptance. Material changes require 30-day notice.
              </p>
            </motion.div>

            {/* 14. Contact */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">14. Contact Us</h2>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 sm:p-8 border border-orange-200">
                <h3 className="font-bold text-lg mb-4 text-orange-700">Legal & Compliance Office</h3>
                <p className="text-gray-700 mb-2">
                  Email: <a href="mailto:legal@hiveplus.in" className="text-orange-600 hover:underline font-medium">legal@hiveplus.in</a>
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

      {/* CTA Footer */}
      <section className="bg-gradient-to-t from-orange-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h3
            {...motionConfig}
            className="text-2xl sm:text-3xl font-bold mb-4 text-orange-700"
          >
            Need Legal or DPP Compliance Support?
          </motion.h3>
          <motion.p
            {...motionConfig}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Our team assists with GeM registration, SCOMET licensing, DPP compliance, and contract drafting.
          </motion.p>
          <motion.div
            {...motionConfig}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-bold hover:from-orange-700 hover:to-amber-700 transition shadow-lg"
            >
              Contact Legal Team
            </Link>
            <a
              href="mailto:legal@hiveplus.in"
              className="px-8 py-4 border-2 border-orange-300 text-orange-700 rounded-lg font-bold hover:border-orange-400 transition"
            >
              Email Legal
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;