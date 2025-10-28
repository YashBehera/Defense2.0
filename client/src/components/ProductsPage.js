import React,{ useState, useEffect, useCallback, useMemo, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import kamikazeTacticalImg from '../img/1.png';
import trainingDroneImg from '../img/2.png';
import vtol from '../img/3.png';
import cruiseKamikaze from '../img/4.png';
import fixedWingKamikaze from '../img/5.png';
import { debounce } from 'lodash'; // Ensure lodash is installed or use a custom debounce

// Custom hooks
const useDocumentMeta = ({ title, description }) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title;

        const metaDescription = document.querySelector('meta[name="description"]');
        const previousDescription = metaDescription?.getAttribute('content');

        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description;
            document.head.appendChild(meta);
        }

        return () => {
            document.title = previousTitle;
            if (metaDescription && previousDescription) {
                metaDescription.setAttribute('content', previousDescription);
            }
        };
    }, [title, description]);
};

// Add lightweight helpers to detect reduced-motion and mobile to avoid expensive animations on small devices
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mq.matches);
    handleChange();
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);
  return prefersReducedMotion;
};

const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
};

// Enhanced Icons with animations
const CheckIcon = () => (
    <motion.svg
        className="w-5 h-5 text-red-600 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </motion.svg>
);

// Progress bar component
const ProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 1000,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-50 origin-left"
            style={{ scaleX }}
        />
    );
};

// Toast notification component
const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 ${type === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white'}`}
        >
            {type === 'success' ? <CheckIcon /> : null}
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 hover:opacity-80">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </motion.div>
    );
};

// Enhanced Product Card
const ProductCard = ({ product, index, onCompare, isComparing, onShare }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3, margin: '0px 0px -50px 0px' });
  
    // Debounce hover state to prevent rapid toggling
    const debouncedSetIsHovered = useCallback(
      debounce((value) => setIsHovered(value), 100),
      []
    );
  
    const handleDownloadSpecs = async () => {
      const specs = Object.entries(product.specifications)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
  
      const content = `
        HIVE+ INDUSTRIES
        ${product.name}
        Model: ${product.model}
        
        TECHNICAL SPECIFICATIONS
        ${specs}
        
        KEY FEATURES
        ${product.features.map(f => `• ${f}`).join('\n')}
        
        APPLICATIONS
        ${product.applications.map(a => `• ${a}`).join('\n')}
        
        For more information:
        Contact: Krish Chandhok
        Email: krishchandhok149@gmail.com
        Phone: +91 9920887455
      `.trim();
  
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.model}-specifications.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    };
  
    return (
      <>
        <motion.article
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          onHoverStart={() => debouncedSetIsHovered(true)}
          onHoverEnd={() => debouncedSetIsHovered(false)}
          className={`bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-300 relative group flex flex-col ${
            isComparing ? 'ring-4 ring-red-500 ring-opacity-50 shadow-2xl' : 'shadow-lg hover:shadow-2xl'
          }`}
          aria-label={`Product card for ${product.name} ${product.model}`}
          tabIndex={0}
          style={{ willChange: 'transform, opacity, box-shadow' }}
        >
          {/* Simplified gradient border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, rgba(220,38,38,0.1), transparent)',
            }}
          />
  
          {/* In Production Badge */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
            className="absolute top-4 right-4 z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 animate-pulse" />
              <motion.span
                className="relative px-3 py-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-xl flex items-center gap-2 backdrop-blur-md border border-red-400/30"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(220,38,38,0.3)',
                    '0 0 30px rgba(220,38,38,0.5)',
                    '0 0 20px rgba(220,38,38,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="tracking-wider">IN PRODUCTION</span>
              </motion.span>
            </div>
          </motion.div>
  
          {/* Image Section */}
          <div className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
            <motion.div
              className="relative w-full aspect-[2/1] h-[300px] overflow-hidden"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Action buttons */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <motion.button
                  onClick={() => onCompare(product)}
                  className={`p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 shadow-lg ${
                    isComparing
                      ? 'bg-red-500 text-white shadow-red-500/50 ring-2 ring-white/30'
                      : 'bg-white/95 text-gray-800 hover:bg-white hover:shadow-xl'
                  }`}
                  whileHover={{ scale: 1.15, rotate: isComparing ? 0 : 8 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Compare ${product.name}`}
                  title="Compare product"
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={isComparing ? { rotate: [0, -10, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </motion.svg>
                </motion.button>
  
                <motion.button
                  onClick={() => onShare(product)}
                  className="p-2.5 bg-white/95 backdrop-blur-md text-gray-800 rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Share ${product.name}`}
                  title="Share product"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.684C18.114 15.938 18 15.482 18 15c0-.482.114-.938.316-1.342m0 2.684a3 3 0 110-2.684M9.316 8.658a3 3 0 110 2.684"
                    />
                  </svg>
                </motion.button>
              </div>
  
              <motion.img
                src={product.image || '/api/placeholder/1000/500'}
                alt={`${product.name} - ${product.model}`}
                className="w-full h-full object-fill"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0.5 }}
                transition={{ duration: 0.7 }}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = '/fallback-image.jpg';
                  setImageLoaded(true);
                }}
                style={{ willChange: 'opacity, transform' }}
              />
  
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-black/20 pointer-events-none" />
  
              {/* Quick stats overlay on hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-2 pointer-events-none"
              >
                {Object.entries(product.specifications).slice(0, 3).map(([key, value], idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10"
                  >
                    <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-0.5">{key}</p>
                    <p className="text-white text-sm font-bold">{value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
  
          {/* Details Section */}
          <div className="w-full p-6 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 flex flex-col justify-between flex-grow relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
  
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Model:</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-gray-900 to-black text-white text-xs font-mono font-bold rounded-lg shadow-md border border-gray-700/20">
                        {product.model}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-md border border-red-100 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{product.overview}</p>
              </div>
  
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                {Object.entries(product.specifications).slice(0, 2).map(([key, value], idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-white rounded-lg p-3 border border-gray-100 hover:border-gray-300 transition-colors"
                  >
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">{key}</p>
                    <p className="text-gray-900 text-sm font-bold">{value}</p>
                  </motion.div>
                ))}
              </div>
  
              <motion.button
                onClick={() => navigate(`/product/${product.id}`)}
                className="mt-3 w-full text-red-600 hover:text-red-700 text-sm font-bold flex items-center justify-center gap-2 group px-4 py-2.5 rounded-xl hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                aria-label="View full product details"
              >
                <span>VIEW COMPLETE SPECIFICATIONS</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            </div>
  
            <motion.div
              className="mt-6 pt-4 border-t border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setShowContactModal(true)}
                  className="col-span-2 w-full px-4 py-3.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-700 hover:via-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/30 flex items-center justify-center gap-3 group relative overflow-hidden"
                  style={{ backgroundSize: '200% 100%' }}
                  whileHover={{
                    scale: 1.02,
                    backgroundPosition: '100% 0',
                  }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Get a quote for this product"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="relative text-sm tracking-wider font-extrabold">REQUEST QUOTE</span>
                  <motion.svg
                    className="w-5 h-5 relative"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
  
                <motion.button
                  onClick={handleDownloadSpecs}
                  className="relative px-3 py-3 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden shadow-md hover:shadow-xl"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Download product specifications"
                >
                  <AnimatePresence>
                    {copiedToClipboard && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        className="absolute inset-0 bg-green-500 text-white flex items-center justify-center font-bold rounded-xl"
                      >
                        <motion.svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </motion.svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.svg
                    className="w-5 h-5 group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </motion.svg>
                  <span className="text-xs tracking-wider font-extrabold">SPECS</span>
                </motion.button>
  
                <motion.a
                  href={`tel:+919920887455`}
                  className="px-3 py-3 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-xl"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Call for more information"
                >
                  <motion.svg
                    className="w-5 h-5"
                    animate={{ rotate: [0, -15, 15, -15, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </motion.svg>
                  <span className="text-xs tracking-wider font-extrabold">CALL</span>
                </motion.a>
              </div>
  
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500"
              >
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <span className="font-semibold">Quick Response</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
  
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.1), transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.article>
  
        {showContactModal && (
          <React.Suspense
            fallback={
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
                <motion.div
                  className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            }
          >
            <ContactModal product={product} onClose={() => setShowContactModal(false)} />
          </React.Suspense>
        )}
      </>
    );
  };


ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onCompare: PropTypes.func.isRequired,
    isComparing: PropTypes.bool.isRequired,
    onShare: PropTypes.func.isRequired
};

// Hero Section with Parallax and 3D Effects
const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -30]); // less aggressive on mobile
    const y2 = useTransform(scrollY, [0, 300], [0, -60]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.98]);

    const prefersReducedMotion = usePrefersReducedMotion();
    const isMobile = useIsMobile();

    const orbCount = (!isMobile && !prefersReducedMotion) ? 8 : 0; // limit on desktop only

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Background: use lightweight static pattern on mobile / reduced-motion */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {!isMobile && !prefersReducedMotion ? (
                    <motion.div className="absolute inset-0" style={{ y: y2 }}>
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 0 100 L 100 100 L 100 0 Z' fill='none' stroke='%23000000' stroke-width='0.5'/%3E%3Cpath d='M 50 0 L 50 100 M 0 50 L 100 50' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E")`,
                        }} />

                        {/* Reduced number of orbs and simpler animations (GPU transform only) */}
                        {Array.from({ length: orbCount }).map((_, i) => {
                            const size = 120 + (i * 30);
                            const left = 5 + (i * 12) % 90;
                            const top = 8 + (i * 9) % 85;
                            const delay = i * 0.6;
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full mix-blend-multiply filter"
                                    style={{
                                        background: i % 3 === 0
                                            ? 'radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, transparent 70%)'
                                            : i % 3 === 1
                                                ? 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, transparent 70%)'
                                                : 'radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 70%)',
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        left: `${left}%`,
                                        top: `${top}%`,
                                        willChange: 'transform, opacity',
                                        transform: 'translateZ(0)'
                                    }}
                                    animate={{
                                        x: [0, (i % 2 === 0 ? -30 : 30), 0],
                                        y: [0, (i % 2 === 0 ? -20 : 20), 0],
                                        opacity: [0.35, 0.65, 0.35],
                                        scale: [1, 1.08, 1]
                                    }}
                                    transition={{
                                        duration: 18 + i,
                                        repeat: Infinity,
                                        repeatType: 'mirror',
                                        ease: "easeInOut",
                                        delay
                                    }}
                                />
                            );
                        })}
                    </motion.div>
                ) : (
                    // static lightweight background for mobile / reduced-motion devices
                    <div className="absolute inset-0 opacity-[0.03] bg-white bg-repeat" />
                )}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-5xl mx-auto py-12"
                style={{ y: y1, opacity, scale }}
            >
                {/* Logo / heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        type: "spring",
                        stiffness: 120,
                        damping: 16
                    }}
                    className="mb-8 relative"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                        <motion.span className="text-black inline-block" initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                            hi
                        </motion.span>
                        <motion.span className="text-red-600 inline-block" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
                            ve+
                        </motion.span>
                    </h1>

                    {/* Underline decoration (non-layout changing) */}
                    <motion.div
                        className="h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-4 w-3/5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        style={{ transformOrigin: 'left' }}
                    />
                </motion.div>

                {/* Tagline */}
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="space-y-3 mb-8">
                    <p className="text-lg sm:text-2xl md:text-3xl text-gray-900 max-w-3xl mx-auto font-bold tracking-tight">
                        ADVANCED TACTICAL DRONE SYSTEMS
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium">
                        Precision-engineered for modern defense • Field-tested • Mission-ready
                    </p>
                </motion.div>

                {/* CTA Buttons (keep animations subtle on mobile) */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <motion.button
                        className="px-6 sm:px-8 py-3 bg-black text-white font-bold rounded-lg shadow-lg inline-flex items-center gap-3"
                        whileHover={!prefersReducedMotion && !isMobile ? { scale: 1.04, y: -2 } : {}}
                        whileTap={!prefersReducedMotion ? { scale: 0.97 } : {}}
                        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="relative z-10 tracking-wider">EXPLORE PRODUCTS</span>
                    </motion.button>

                    <motion.a
                        href="/contact"
                        className="px-6 sm:px-8 py-3 bg-white text-black font-bold rounded-lg border-2 border-black inline-flex items-center gap-3"
                        whileHover={!prefersReducedMotion && !isMobile ? { scale: 1.04, y: -2 } : {}}
                    >
                        <span>CONTACT NOW</span>
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};

// Enhanced Category Filter
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, productCounts }) => {
    return (
        <motion.section
            className="bg-white border-y border-gray-200 top-0 z-40 backdrop-blur-xl"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="container mx-auto px-6 py-4">
                <nav className="flex flex-wrap gap-2 justify-center items-center">
                    {categories.map((category, index) => {
                        const isActive = selectedCategory === category.id;
                        const count = productCounts[category.id] || 0;

                        return (
                            <motion.button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={`relative px-6 py-3 font-bold transition-all ${isActive
                                    ? 'text-white'
                                    : 'text-black hover:text-gray-700 bg-gray-100 hover:bg-gray-200'
                                    }`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 bg-red-600"
                                        layoutId="activeCategory"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {category.label.toUpperCase()}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-300'
                                        }`}>
                                        {count}
                                    </span>
                                </span>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>
        </motion.section>
    );
};

// Comparison View Component
const ComparisonView = ({ products, onRemove, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-red-600 shadow-2xl z-50 max-h-[70vh] overflow-y-auto"
        >
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-black">COMPARE PRODUCTS</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border-2 border-black p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-black">{product.name}</h4>
                                <button
                                    onClick={() => onRemove(product.id)}
                                    className="p-1 hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-2">
                                {Object.entries(product.specifications).slice(0, 5).map(([key, value]) => (
                                    <div key={key} className="text-sm">
                                        <span className="text-gray-600">{key}:</span>
                                        <span className="ml-2 font-bold text-black">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Main Products Page Component
const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [compareProducts, setCompareProducts] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [toast, setToast] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Set page meta
    useDocumentMeta({
        title: 'hive+ Industries - Advanced Tactical Drone Systems',
        description: 'Explore hive+ Industries cutting-edge tactical drones including kamikaze drones, VTOL systems, and training platforms for modern defense applications.'
    });

    // Categories
    const categories = useMemo(() => [
        { id: 'all', label: 'All Systems' },
        { id: 'kamikaze', label: 'Kamikaze' },
        { id: 'training', label: 'Training' },
        { id: 'vtol', label: 'VTOL' }
    ], []);

    // Products data
    const products = useMemo(() => [
        {
            id: 1,
            category: 'kamikaze',
            name: 'Kamikaze+ Tactical Drone',
            model: 'KAMIKAZE+ (5-INCH)',
            image: kamikazeTacticalImg,
            overview: 'Used in a similar style as seen in the Ukraine war, the Kamikaze+ is a compact, low-cost, high-impact drone designed for surveillance and precision strikes. Its ability to carry and drop payloads while streaming FPV makes it a reliable tool for modern tactical missions in sensitive or high-risk zones.',
            specifications: {
                'Type': '5-inch Quadcopter',
                'Payload System': 'Servo-based bomb-dropping mechanism',
                'Camera': 'Built-in FPV camera',
                'Flight Time': '15-20 minutes (Li-Ion battery)',
                'Range': '5-10 km depending on payload',
                'Design': 'Fully modular for mission-specific builds',
                'Development': 'In-house developed and field-tested',
                'Control': 'FPV goggles and ground station'
            },
            features: [
                '5-inch quadcopter with servo-based bomb-dropping mechanism',
                'Built-in FPV camera for real-time surveillance',
                'Flight time: 15-20 minutes (Li-Ion battery)',
                'Range: 5-10 km depending on payload',
                'Fully modular design for mission-specific builds',
                'In-house developed and field-tested',
                'Supports FPV goggles and ground station control'
            ],
            applications: [
                'Surveillance operations',
                'Precision strikes',
                'High-risk zone missions',
                'Tactical reconnaissance'
            ]
        },
        {
            id: 2,
            category: 'training',
            name: 'Kamikaze Training Drone',
            model: 'TRAINER KAMIKAZE',
            image: trainingDroneImg,
            overview: 'Designed to help personnel master FPV drone tactics, the Trainer Kamikaze is a safe, stable, and crash-tolerant platform that simulates real kamikaze drone missions. It allows soldiers to train in real-world conditions without risking actual strike units — making it an essential tool in any drone warfare training program.',
            specifications: {
                'Type': 'Crash-resistant quadcopter',
                'Flight Time': '12-15 minutes',
                'Battery': 'Li-Po or Li-Ion',
                'Camera': 'FPV camera with real-time feed',
                'Flight Modes': 'Auto-stabilization and manual',
                'Design': 'Modular and customizable',
                'Frame': 'Same style as combat unit',
                'Package': 'Bundled with support, spare parts & training kits'
            },
            features: [
                'Crash-resistant quadcopter for training',
                'Flight time: 12-15 minutes (Li-Po or Li-Ion battery)',
                'FPV camera with real-time video feed',
                'Supports auto-stabilization and manual flight modes',
                'Modular and customizable – same frame style as combat unit',
                'Ideal for training soldiers in FPV piloting and bomb-dropping',
                'In-house development for easy maintenance and part swaps',
                'Can be bundled with support, spare parts & pilot training kits'
            ],
            applications: [
                'FPV pilot training',
                'Bomb-dropping practice',
                'Combat simulation',
                'Skill development'
            ]
        },
        {
            id: 3,
            category: 'vtol',
            name: 'VTOL Heavy Payload UAV',
            model: 'HIVE+ VTOL',
            image: vtol,
            overview: 'The Hive+ VTOL combines the vertical takeoff of a drone with the range and efficiency of a fixed-wing aircraft, enabling long-range missions without a runway. With over 1 hour of flight time and the ability to carry 4-5 kg payloads, it\'s perfect for surveillance, logistics, or tactical delivery — especially in difficult terrains like mountains or border zones.',
            specifications: {
                'Type': 'Hybrid VTOL',
                'Takeoff': 'Vertical with fixed-wing flight',
                'Payload Capacity': '4-5 kg',
                'Flight Time': '60-75 minutes',
                'Range': '10+ km (configuration dependent)',
                'Payload Bay': 'Modular for cameras/sensors/delivery',
                'Wind Resistance': 'Stable under wind',
                'Operation': 'Swarm or individual with GCS support'
            },
            features: [
                'Hybrid VTOL: Vertical takeoff with fixed-wing flight',
                'Payload capacity: 4-5 kg',
                'Flight time: 60-75 minutes on a single charge',
                'Range: 10+ km depending on configuration',
                'Modular payload bay for cameras, sensors, or delivery kits',
                'Stable under wind, ideal for remote and rough zones',
                'Fully customizable: ISR, mapping, supply drops, or relay missions',
                'Can operate in swarm or individually with GCS support'
            ],
            applications: [
                'Long-range surveillance',
                'Logistics delivery',
                'ISR missions',
                'Mountain/border operations',
                'Mapping & reconnaissance',
                'Supply drops'
            ]
        },
        {
            id: 4,
            category: 'kamikaze',
            name: 'Cruise Kamikaze Drone',
            model: 'CRUISE KAMIKAZE',
            image: cruiseKamikaze,
            overview: 'This drone is a miniature cruise missile platform designed for long-range, high-speed autonomous strikes. With auto-stabilization and a unique wing-folding dive mechanism, it can fly like a plane and suddenly dive vertically onto a target, delivering devastating precision with minimal detection.',
            specifications: {
                'Design': 'Fixed-wing for long-range',
                'Special Feature': 'Wing-folding vertical dive',
                'Range': '10-15 km (payload dependent)',
                'Navigation': 'GPS waypoint with auto-stabilization',
                'Build': 'Lightweight, single-use/expendable',
                'Launch': 'Catapult, hand, or rail system',
                'Mission': 'Static target strikes',
                'Inspiration': 'Ukraine conflict mini cruise drones'
            },
            features: [
                'Fixed-wing design for long-range autonomous flight',
                'Wing-folding system enables vertical kamikaze dive',
                'Range: 10-15 km depending on payload',
                'Auto-stabilized flight with GPS waypoint navigation',
                'Lightweight and built for single-use or expendable missions',
                'Launchable via catapult, hand, or rail system',
                'Ideal for static target strikes, supply depot neutralization, or armor disruption',
                'Inspired by modern mini cruise drones used in Ukraine conflict'
            ],
            applications: [
                'Long-range strikes',
                'Supply depot neutralization',
                'Armor disruption',
                'Static target elimination'
            ]
        },
        {
            id: 5,
            category: 'kamikaze',
            name: 'Fixed-Wing Kamikaze',
            model: 'FIXED-WING KAMIKAZE',
            image: fixedWingKamikaze,
            overview: 'This disposable fixed-wing drone is engineered for direct target engagement. With a lightweight design, long straight-line range, and support for manual or semi-auto control, it\'s built to deliver precise strikes at minimal cost. Ideal for saturating enemy zones with multiple low-cost airborne threats, just like tactics seen in modern asymmetric warfare.',
            specifications: {
                'Design': 'Fixed-wing for long-range flight',
                'Control': 'Manual or semi-auto',
                'Range': '10-15 km (payload dependent)',
                'Navigation': 'GPS waypoint with auto-stabilization',
                'Build': 'Lightweight, single-use/expendable',
                'Launch': 'Catapult, hand, or rail system',
                'Mission': 'Direct target engagement',
                'Cost': 'Low-cost saturation capability'
            },
            features: [
                'Fixed-wing design for long-range autonomous flight',
                'Wing-folding system enables vertical kamikaze dive',
                'Range: 10-15 km depending on payload',
                'Auto-stabilized flight with GPS waypoint navigation',
                'Lightweight and built for single-use or expendable missions',
                'Launchable via catapult, hand, or rail system',
                'Ideal for static target strikes, supply depot neutralization, or armor disruption',
                'Inspired by modern mini cruise drones used in Ukraine conflict'
            ],
            applications: [
                'Saturation attacks',
                'Enemy zone disruption',
                'Low-cost strikes',
                'Asymmetric warfare'
            ]
        }
    ], []);

    // Calculate product counts
    const productCounts = useMemo(() => {
        const counts = { all: products.length };
        categories.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = products.filter(p => p.category === cat.id).length;
            }
        });
        return counts;
    }, [products, categories]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        return selectedCategory === 'all'
            ? products
            : products.filter(p => p.category === selectedCategory);
    }, [selectedCategory, products]);

    // Handlers
    const handleCategoryChange = useCallback((categoryId) => {
        setIsLoading(true);
        setSelectedCategory(categoryId);
        setTimeout(() => setIsLoading(false), 300);
    }, []);

    const handleCompare = useCallback((product) => {
        if (compareProducts.find(p => p.id === product.id)) {
            setCompareProducts(prev => prev.filter(p => p.id !== product.id));
            setToast({ message: 'Product removed from comparison', type: 'success' });
        } else {
            if (compareProducts.length >= 3) {
                setToast({ message: 'Maximum 3 products can be compared', type: 'error' });
                return;
            }
            setCompareProducts(prev => [...prev, product]);
            setToast({ message: 'Product added to comparison', type: 'success' });
        }
    }, [compareProducts]);

    const handleShare = useCallback((product) => {
        setSelectedProduct(product);
        setShowShareModal(true);
    }, []);

    useEffect(() => {
        if (compareProducts.length > 0) {
            setShowComparison(true);
        } else {
            setShowComparison(false);
        }
    }, [compareProducts]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Progress Bar */}
            <ProgressBar />

            {/* Hero Section */}
            <HeroSection />

            {/* Category Filter */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                productCounts={productCounts}
            />

            {/* Products Section */}
            <main id="products" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loader"
                                className="flex justify-center items-center h-64"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="w-20 h-20 border-4 border-gray-200 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className="absolute top-0 w-20 h-20 border-4 border-red-600 rounded-full border-t-transparent"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Section Header */}
                                <motion.div
                                    className="text-center mb-16"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <h2 className="text-4xl font-bold text-black mb-4">
                                        {selectedCategory === 'all' ? 'ALL PRODUCTS' : categories.find(c => c.id === selectedCategory)?.label.toUpperCase() + ' SYSTEMS'}
                                    </h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Cutting-edge tactical drones engineered for modern defense applications.
                                    </p>
                                </motion.div>

                                {filteredProducts.length === 0 ? (
                                    <motion.div
                                        className="text-center py-20"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 text-lg mb-4">No products found in this category.</p>
                                        <motion.button
                                            onClick={() => setSelectedCategory('all')}
                                            className="text-red-600 hover:text-red-700 font-bold inline-flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            VIEW ALL PRODUCTS
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {filteredProducts.map((product, index) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                index={index}
                                                onCompare={handleCompare}
                                                isComparing={compareProducts.some(p => p.id === product.id)}
                                                onShare={handleShare}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Features Section */}
            <section className="py-20 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-black mb-4">WHY CHOOSE hive+</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our commitment to excellence and innovation sets us apart
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🚀',
                                title: 'ADVANCED TECH',
                                description: 'Cutting-edge systems inspired by real combat'
                            },
                            {
                                icon: '🛡️',
                                title: 'FIELD TESTED',
                                description: 'Rigorous testing in real conditions'
                            },
                            {
                                icon: '⚙️',
                                title: 'MODULAR DESIGN',
                                description: 'Mission-specific customization'
                            },
                            {
                                icon: '🤝',
                                title: 'EXPERT SUPPORT',
                                description: '24/7 technical support available'
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-20 h-20 mx-auto mb-4 bg-black text-white rounded-none flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-shadow"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-red-600">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6 text-white">
                            READY TO DEPLOY TACTICAL SOLUTIONS?
                        </h2>
                        <p className="text-white/90 mb-8 text-lg">
                            Contact our team to discuss your requirements and receive a customized solution.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="tel:+919920887455"
                                className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>CALL: +91 9920887455</span>
                            </motion.a>

                            <motion.a
                                href="mailto:krishchandhok149@gmail.com"
                                className="px-8 py-4 bg-black text-white font-bold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>EMAIL INQUIRY</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Floating Action Button */}
            <AnimatePresence>
                {compareProducts.length === 0 && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center z-40"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Scroll to top"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Comparison View */}
            <AnimatePresence>
                {showComparison && (
                    <ComparisonView
                        products={compareProducts}
                        onRemove={(id) => setCompareProducts(prev => prev.filter(p => p.id !== id))}
                        onClose={() => {
                            setCompareProducts([]);
                            setShowComparison(false);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Toast Notifications */}
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>

            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-6 max-w-md w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-black">SHARE PRODUCT</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        name: 'WHATSAPP', icon: '💬', color: 'bg-green-600', action: () => {
                                            window.open(`https://wa.me/?text=Check out ${selectedProduct.name} from hive+ Industries: ${window.location.href}`);
                                        }
                                    },
                                    {
                                        name: 'EMAIL', icon: '📧', color: 'bg-black', action: () => {
                                            window.location.href = `mailto:?subject=Check out ${selectedProduct.name}&body=I found this interesting product from hive+ Industries: ${selectedProduct.name}. Learn more at: ${window.location.href}`;
                                        }
                                    },
                                    {
                                        name: 'COPY LINK', icon: '🔗', color: 'bg-red-600', action: () => {
                                            navigator.clipboard.writeText(window.location.href);
                                            setToast({ message: 'Link copied to clipboard!', type: 'success' });
                                            setShowShareModal(false);
                                        }
                                    }
                                ].map((option, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={option.action}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group"
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className={`w-12 h-12 ${option.color} text-white flex items-center justify-center text-xl`}>
                                            {option.icon}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="font-bold text-black">{option.name}</p>
                                            <p className="text-sm text-gray-600">Share via {option.name.toLowerCase()}</p>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Mock Contact Modal Component
const ContactModal = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in ${product.name}`
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:krishchandhok149@gmail.com?subject=Inquiry about ${product.name}&body=${formData.message}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-2xl font-bold text-black mb-6">GET QUOTE: {product.name}</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-black mb-1">NAME</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border-2 border-black focus:ring-2 focus:ring-red-600 focus:border-red-600"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-black mb-1">EMAIL</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border-2 border-black focus:ring-2 focus:ring-red-600 focus:border-red-600"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-black mb-1">PHONE</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-2 border-2 border-black focus:ring-2 focus:ring-red-600 focus:border-red-600"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-black mb-1">MESSAGE</label>
                        <textarea
                            rows={4}
                            className="w-full px-4 py-2 border-2 border-black focus:ring-2 focus:ring-red-600 focus:border-red-600"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <motion.button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            SEND INQUIRY
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            CANCEL
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ProductsPage;