// Security.js
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { fadeInUpVariants, viewportOptions } from './motionVariants';
import { Link } from 'react-router-dom';

const Security = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.title = 'Security & Compliance | Hive+ India';
  }, []);

  const motionConfig = {
    initial: "initial",
    whileInView: "animate",
    viewport: viewportOptions,
    variants: fadeInUpVariants,
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Progress Bar – Tricolor for India */}
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
              <span className="text-sm font-semibold text-orange-700">SECURITY & COMPLIANCE</span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Security by Design,
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-green-600 bg-clip-text text-transparent">
                Built for Bharat
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              End-to-end protection under <strong>Make in India</strong> — STQC certified, SCOMET compliant, and fully aligned with <strong>DPDP Act 2023</strong>.
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

      {/* Security Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="prose prose-lg prose-gray max-w-none space-y-16">

            {/* 1. Introduction */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">1. Our Security Commitment</h2>
              <p className="text-gray-600 leading-relaxed">
                Hive+ India Private Limited ("we," "our," or "us") designs and manufactures indigenous autonomous drone systems for defense, public safety, and critical infrastructure. This Security Policy outlines our approach to protecting your data and systems.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  100% <strong>Indian IP</strong> and assembly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>STQC certified</strong> security testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  Compliant with <strong>DPP 2020</strong> and <strong>GeM</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>SCOMET Category 6</strong> controlled technology
                </li>
              </ul>
            </motion.div>

            {/* 2. Hardware Security */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">2. Hardware Security</h2>
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Tamper-Proof. Indigenous.</h3>
                <ul className="grid md:grid-cols-2 gap-4 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Secure Boot with Indian CA-signed firmware
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Hardware Root of Trust (Indian SoC)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Anti-tamper sensors (vibration, temperature)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Physical kill-switch for data wipe
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    No foreign backdoors (STQC verified)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Assembled in India (BEL partner)
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 3. Software & Network */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">3. Software & Network Security</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Secure SDLC", desc: "SAST/DAST, OWASP Top 10, Indian EV code signing" },
                  { title: "AI Model Protection", desc: "On-device inference, watermarking, adversarial training" },
                  { title: "Encrypted Comms", desc: "AES-256-GCM over 4G/5G or SATCOM" },
                  { title: "Anti-Jamming", desc: "DRDO-approved ECCM, frequency hopping" },
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

            {/* 4. DPDP Act Compliance */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">4. DPDP Act 2023 Compliance</h2>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                <h3 className="text-xl font-bold mb-4 text-indigo-700">Fully Aligned with India’s Data Law</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    Consent-based processing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    Data minimization & purpose limitation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    Right to erase mission data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    Data Protection Officer appointed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    Annual CERT-In empanelled audit
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 5. Certifications */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">5. Certifications & Compliance</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "STQC Certified",
                  "ISO 27001:2022",
                  "CMMI Level 3",
                  "DPP 2020 Compliant",
                  "SCOMET Category 6",
                  "GeM Registered",
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUpVariants}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-center"
                  >
                    <p className="font-semibold text-gray-900">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 6. Incident Response */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">6. Incident Response</h2>
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h4 className="font-semibold text-lg mb-3 text-red-800">24×7 Security Operations Center (SOC)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Located in Gurugram, India</li>
                  <li>• CERT-In empanelled partner</li>
                  <li>• &lt;15 min MTTD | &lt;1 hour MTTR</li>
                  <li>• Dedicated channel for MoD & CAPF</li>
                </ul>
              </div>
            </motion.div>

            {/* 7. Responsible Disclosure */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">7. Responsible Disclosure</h2>
              <p className="text-gray-600">
                Found a vulnerability? Report it securely:
              </p>
              <motion.a
                href="mailto:security@hiveplus.in"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold"
              >
                security@hiveplus.in
              </motion.a>
              <p className="mt-4 text-sm text-gray-500">
                PGP Key: <code className="bg-gray-100 px-2 py-1 rounded">0xF1A2B3C4</code>
              </p>
            </motion.div>

            {/* 8. Contact */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">8. Contact Our Security Team</h2>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 sm:p-8 border border-orange-200">
                <h3 className="font-semibold text-lg mb-4 text-orange-700">Chief Information Security Officer</h3>
                <p className="text-gray-700 mb-2">
                  Email: <a href="mailto:ciso@hiveplus.in" className="text-orange-600 hover:underline font-medium">ciso@hiveplus.in</a>
                </p>
                <p className="text-gray-700 mb-2">
                  Emergency: <span className="font-mono">+91 124 681 9001</span>
                </p>
                <p className="text-gray-700">
                  Address: Plot 42, Sector 32, Gurugram, Haryana 122001, India
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
            Ready for Indigenous, Secure Autonomy?
          </motion.h3>
          <motion.p
            {...motionConfig}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Request a security audit, penetration test, or compliance consultation.
          </motion.p>
          <motion.div
            {...motionConfig}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition"
            >
              Schedule Security Review
            </Link>
            <a
              href="/downloads/Hive+_Security_Whitepaper.pdf"
              className="px-8 py-4 border-2 border-orange-300 text-orange-700 rounded-lg font-semibold hover:border-orange-400 transition"
            >
              Download Whitepaper
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Security;