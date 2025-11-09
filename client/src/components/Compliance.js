// Compliance.js
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { fadeInUpVariants, viewportOptions } from './motionVariants';
import { Link } from 'react-router-dom';

const Compliance = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.title = 'Compliance | Hive+ India Defense Solutions';
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
              <span className="text-sm font-semibold text-orange-700">COMPLIANCE</span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Full Regulatory Compliance,
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-green-600 bg-clip-text text-transparent">
                Make in India Ready
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Compliant with <strong>DAP 2020</strong>, <strong>GeM</strong>, <strong>SCOMET</strong>, and <strong>FDI Policy</strong> — enabling seamless procurement for MoD, DPSUs, and CAPFs.
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

      {/* Compliance Content */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="prose prose-lg prose-gray max-w-none space-y-16">

            {/* 1. Introduction */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">1. Our Compliance Framework</h2>
              <p className="text-gray-600 leading-relaxed">
                Hive+ India Private Limited adheres to all relevant Indian regulations for defense manufacturing, procurement, and exports — ensuring seamless operations under <strong>Make in India</strong>.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>DAP 2020</strong>: Prioritised <strong>Buy (Indian-IDDM)</strong> category
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>GeM Registered</strong>: GEMC-5116877XXXXXX for direct procurement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>SCOMET Category 6</strong>: Export controls for drones/UAVs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <strong>FDI Compliant</strong>: Up to 74% automatic route
                </li>
              </ul>
            </motion.div>

            {/* 2. DAP 2020 Compliance */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">2. Defence Acquisition Procedure (DAP) 2020</h2>
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Indigenous Content</h3>
                <ul className="grid md:grid-cols-2 gap-4 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Buy (Indian-IDDM) prioritisation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Minimum 50% Indigenous Content (IC)
                  </li>
                  <li className="flex items-start gap-2">
                    <span class="text-green-400 mt-1">•</span>
                    Offsets discharged via MSME partnerships
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    iDEX for innovation funding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    Project Management Unit support
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 3. GeM Compliance */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">3. GeM Vendor Compliance</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Registration", desc: "GEMC-5116877XXXXXX – Verified Seller" },
                  { title: "Transparency", desc: "100% online verification, no human interface" },
                  { title: "EoDB", desc: "Cashless payments via PFMS integration" },
                  { title: "Inclusivity", desc: "MSME preference, women entrepreneurs support" },
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

            {/* 4. SCOMET Export Controls */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">4. SCOMET & Export Compliance</h2>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
                <h3 className="text-xl font-bold mb-4 text-indigo-700">Category 6 – Munitions List</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    GAED for civilian drones (≤25km range, ≤25kg payload)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    3-year license validity with post-reporting
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    No SCOMET for every shipment (IMWG approval)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    Compliance with non-proliferation obligations
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 5. FDI Policy */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">5. FDI Policy Compliance</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                  <h4 className="font-semibold text-lg mb-3 text-blue-700">Automatic Route</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Up to 74% FDI without approval</li>
                    <li>• National security review</li>
                    <li>• Technology access beyond 74%</li>
                  </ul>
                </div>
                <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                  <h4 className="font-semibold text-lg mb-3 text-green-700">Make in India Alignment</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 100% FDI for specific cases</li>
                    <li>• Offset discharge via IOPs</li>
                    <li>• MSME multiplier (1.5x)</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 6. Certifications */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">6. Key Certifications</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "DAP 2020 Compliant",
                  "GeM Registered",
                  "SCOMET Category 6",
                  "FDI Policy Aligned",
                  "Indigenous Content >60%",
                  "Make in India Partner",
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

            {/* 7. Contact */}
            <motion.div {...motionConfig}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">7. Compliance Contact</h2>
              <div className="bg-gradient-to-r from-red-50 to-red-50 rounded-xl p-6 sm:p-8 border border-red-200">
                <h3 className="font-bold text-lg mb-4 text-red-700">Compliance Officer</h3>
                <p className="text-gray-700 mb-2">
                  Email: <a href="mailto:compliance@hiveplus.in" className="text-red-600 hover:underline font-medium">compliance@hiveplus.in</a>
                </p>
                <p className="text-gray-700 mb-2">
                  Address: Plot 42, Sector 32, Gurugram, Haryana 122001, India
                </p>
                <p className="text-gray-700">
                  Phone: <span className="font-mono">+91 124 681 9000</span>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-t from-red-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.h3
            {...motionConfig}
            className="text-2xl sm:text-3xl font-bold mb-4 text-red-700"
          >
            Need Compliance Assistance?
          </motion.h3>
          <motion.p
            {...motionConfig}
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Our team supports GeM bidding, SCOMET licensing, DAP compliance, and FDI approvals.
          </motion.p>
          <motion.div
            {...motionConfig}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition shadow-lg"
            >
              Contact Compliance Team
            </Link>
            <a
              href="mailto:compliance@hiveplus.in"
              className="px-8 py-4 border-2 border-red-300 text-red-700 rounded-lg font-bold hover:border-red-400 transition"
            >
              Email Compliance
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Compliance;