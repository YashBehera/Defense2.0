import React, { useState, useEffect, useRef, lazy, Suspense, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import * as THREE from 'three';

// Image imports
import kamikazeTacticalImg from '../img/1.png';
import trainingDroneImg from '../img/2.png';
import vtol from '../img/3.png';
import cruiseKamikaze from '../img/4.png';
import fixedWingKamikaze from '../img/5.png';

// Constants
const CONSTANTS = {
    TOAST_DURATION: 3000,
    IMAGE_LOAD_TIMEOUT: 10000,
    CONTACT_EMAIL: 'krishchandhok149@gmail.com',
    CONTACT_PHONE: '+91 9920887455',
    COMPANY_NAME: 'HIVE+ INDUSTRIES'
};

// Animation variants
const animations = {
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    },
    fadeInLeft: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 }
    },
    slideInFromLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 }
    }
};

// Custom hooks
const useImageLoader = (src) => {
    const [state, setState] = useState({
        loading: true,
        error: false
    });

    useEffect(() => {
        if (!src) {
            setState({ loading: false, error: true });
            return;
        }

        const img = new Image();
        const timeoutId = setTimeout(() => {
            setState({ loading: false, error: true });
        }, CONSTANTS.IMAGE_LOAD_TIMEOUT);

        const handleLoad = () => {
            clearTimeout(timeoutId);
            setState({ loading: false, error: false });
        };

        const handleError = () => {
            clearTimeout(timeoutId);
            setState({ loading: false, error: true });
        };

        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
        img.src = src;

        return () => {
            clearTimeout(timeoutId);
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', handleError);
        };
    }, [src]);

    return state;
};

// 3D Model Component
const GLTFModel = ({ url, desiredSize = 5 }) => {
    const groupRef = React.useRef();
    const { scene } = useGLTF(url);

    useEffect(() => {
        if (!scene || !groupRef.current) return;

        // Reset scene transform so computations are consistent
        scene.position.set(0, 0, 0);
        scene.rotation.set(0, 0, 0);
        scene.scale.set(1, 1, 1);

        // Compute bounding box of the raw scene
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Defensive defaults
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = desiredSize / maxDim;

        // Apply scale to the wrapper group and translate it so model center is at origin
        groupRef.current.scale.setScalar(scale);
        groupRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

        // Ensure meshes cast/receive shadows and materials update
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.side = THREE.DoubleSide;
                    child.material.needsUpdate = true;
                }
            }
        });
    }, [scene, desiredSize]);

    return (
        <group ref={groupRef}>
            {scene && <primitive object={scene} />}
        </group>
    );
};

GLTFModel.propTypes = {
    url: PropTypes.string.isRequired,
    desiredSize: PropTypes.number
};

const useToast = () => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type, id: Date.now() });
        setTimeout(() => setToast(null), CONSTANTS.TOAST_DURATION);
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    return { toast, showToast, hideToast };
};

// Enhanced Progress Bar Component
const ProgressBar = React.memo(() => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-red-700 z-50 origin-left shadow-sm"
                style={{ scaleX }}
                role="progressbar"
                aria-label="Page scroll progress"
            />
        </>
    );
});

ProgressBar.displayName = 'ProgressBar';

// Loading Components
const ProductSkeleton = React.memo(() => (
    <div className="min-h-screen bg-white" role="status" aria-label="Loading product details">
        <div className="container mx-auto px-4 py-8 sm:py-12">
            <div className="animate-pulse">
                <div className="h-8 w-32 bg-gray-200 rounded mb-4 mx-auto sm:mx-0" />
                <div className="h-10 w-3/4 bg-gray-200 rounded mb-3 mx-auto sm:mx-0" />
                <div className="h-6 w-1/2 bg-gray-200 rounded mb-8 mx-auto sm:mx-0" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                    <div className="h-[250px] sm:h-[300px] bg-gray-200 rounded-xl" />
                    <div className="space-y-4">
                        {Array.from({ length: 3 }, (_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
));

ProductSkeleton.displayName = 'ProductSkeleton';

// Toast Component
const Toast = React.memo(({ message, type = 'success', onClose }) => (
    <motion.div
        {...animations.fadeInUp}
        className={`fixed bottom-4 right-4 px-5 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 max-w-xs sm:max-w-sm border ${type === 'success'
            ? 'bg-white border-green-200 text-gray-800'
            : 'bg-white border-red-600 text-gray-800'
            }`}
        role="alert"
        aria-live="polite"
    >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${type === 'success' ? 'bg-green-100' : 'bg-red-100'
            }`}>
            {type === 'success' ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            )}
        </div>
        <span className="font-medium text-sm flex-1">{message}</span>
        {onClose && (
            <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        )}
    </motion.div>
));

Toast.displayName = 'Toast';
Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']),
    onClose: PropTypes.func
};

// Feature Card Component
const FeatureCard = React.memo(({ feature, index, isInView }) => (
    <motion.div
        initial={animations.slideInFromLeft.initial}
        animate={isInView ? animations.slideInFromLeft.animate : animations.slideInFromLeft.initial}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative"
    >
        <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-start gap-3 p-4 rounded-lg bg-white hover:bg-red-50/50 transition-all duration-300 border border-gray-200 hover:border-red-300 hover:shadow-md"
        >
            <div className="mt-0.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {feature}
            </span>
        </motion.div>
    </motion.div>
));

FeatureCard.displayName = 'FeatureCard';
FeatureCard.propTypes = {
    feature: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isInView: PropTypes.bool.isRequired
};

// Specification Row Component
const SpecificationRow = React.memo(({ specKey, value, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group"
    >
        <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-0">
            <dt className="text-xs sm:text-sm font-semibold text-gray-600 flex items-center gap-2">
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex-shrink-0"
                />
                {specKey}
            </dt>
            <dd className="text-xs sm:text-sm font-semibold text-gray-900 text-right max-w-[60%] px-4 py-2 rounded-md bg-gray-50 group-hover:bg-red-50 group-hover:text-red-900 transition-all duration-200">
                {value}
            </dd>
        </div>
    </motion.div>
));

SpecificationRow.displayName = 'SpecificationRow';
SpecificationRow.propTypes = {
    specKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

// Application Tag Component
const ApplicationTag = React.memo(({ app, index }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.05, y: -3 }}
        className="inline-block px-4 py-2 bg-white text-gray-700 text-xs sm:text-sm font-semibold rounded-full border-2 border-gray-200 hover:border-red-600 hover:text-red-700 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
        {app}
    </motion.span>
));

ApplicationTag.displayName = 'ApplicationTag';
ApplicationTag.propTypes = {
    app: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

// Contact Modal Component
const ContactModal = React.memo(({ product, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in ${product?.name || 'your products'}`
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const subject = `Inquiry about ${product?.name || 'Product'}`;
            const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
      `.trim());

            window.location.href = `mailto:${CONSTANTS.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;

            setTimeout(() => {
                onSuccess?.();
                setIsSubmitting(false);
            }, 500);

        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSubmitting(false);
        }
    }, [formData, product, onSuccess, validateForm]);

    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto border-t-4 border-red-600"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-900">
                            Request Quote
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{product?.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 ${errors.name ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            disabled={isSubmitting}
                            placeholder="John Doe"
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                            <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 ${errors.email ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={isSubmitting}
                            placeholder="john@example.com"
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                            <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-gray-50 ${errors.phone ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={isSubmitting}
                            placeholder="+91 9999999999"
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                            <p id="phone-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1" role="alert">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-vertical bg-gray-50"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Tell us about your requirements..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        >
                            {isSubmitting && (
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            )}
                            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        >
                            Cancel
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
});

ContactModal.displayName = 'ContactModal';
ContactModal.propTypes = {
    product: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func
};

// Products data
const PRODUCTS_DATA = [
    {
        id: 1,
        category: 'kamikaze',
        name: 'Kamikaze+ Tactical Drone',
        model: 'KAMIKAZE+ (5-INCH)',
        image: kamikazeTacticalImg,
        model3D: '/models/fully_done_glb.glb',
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
        model3D: '/models/fully_done_glb.glb',
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
        model3D: '/models/drone.glb',
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
        model3D: '/models/fully_done_glb.glb',
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
        model3D: '/models/fully_done_glb.glb',
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
];

// Main ProductDetails Component
const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showContactModal, setShowContactModal] = useState(false);
    const { toast, showToast, hideToast } = useToast();

    const featuresRef = useRef(null);
    const specsRef = useRef(null);
    const appsRef = useRef(null);

    const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
    const specsInView = useInView(specsRef, { once: true, amount: 0.2 });
    const appsInView = useInView(appsRef, { once: true, amount: 0.2 });

    const product = useMemo(() => {
        const productId = parseInt(id);
        return PRODUCTS_DATA.find(p => p.id === productId);
    }, [id]);

    const { loading: imageLoading, error: imageError } = useImageLoader(product?.image);

    useEffect(() => {
        if (!product && id) {
            navigate('/products', { replace: true });
        }
    }, [product, id, navigate]);

    useEffect(() => {
        if (!product) return;

        const previousTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const previousDescription = metaDescription?.getAttribute('content');

        document.title = `${product.name} - ${CONSTANTS.COMPANY_NAME} | Advanced Drone Technology`;

        if (metaDescription) {
            metaDescription.setAttribute('content', `${product.overview.substring(0, 160)}...`);
        }

        return () => {
            document.title = previousTitle;
            if (metaDescription && previousDescription) {
                metaDescription.setAttribute('content', previousDescription);
            }
        };
    }, [product]);

    const handleDownloadSpecs = useCallback(async () => {
        if (!product) return;

        try {
            const specs = Object.entries(product.specifications)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');

            const content = `
${CONSTANTS.COMPANY_NAME}
${product.name}
Model: ${product.model}

OVERVIEW
${product.overview}

TECHNICAL SPECIFICATIONS
${specs}

KEY FEATURES
${product.features.map(f => `• ${f}`).join('\n')}

APPLICATIONS
${product.applications.map(a => `• ${a}`).join('\n')}

For more information:
Contact: Krish Chandhok
Email: ${CONSTANTS.CONTACT_EMAIL}
Phone: ${CONSTANTS.CONTACT_PHONE}
      `.trim();

            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${product.model.replace(/[^a-zA-Z0-9]/g, '-')}-specifications.txt`;
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
            showToast('Specifications downloaded successfully!');
        } catch (error) {
            console.error('Download error:', error);
            showToast('Failed to download specifications. Please try again.', 'error');
        }
    }, [product, showToast]);

    const handleContactClick = useCallback(() => {
        setShowContactModal(true);
    }, []);

    const handleContactModalClose = useCallback(() => {
        setShowContactModal(false);
    }, []);

    const handleContactSuccess = useCallback(() => {
        setShowContactModal(false);
        showToast('Your inquiry has been sent successfully! We\'ll get back to you soon.');
    }, [showToast]);

    if (!product) {
        return <ProductSkeleton />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50"
        >
            <ProgressBar />

            <section className="relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />

                <div className="container mx-auto px-4 py-8 sm:py-12 relative">
                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate('/products')}
                        className="mb-6 text-gray-600 hover:text-black font-semibold flex items-center gap-2 group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg px-3 py-2 hover:bg-white border border-transparent hover:border-gray-200"
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Go back to products page"
                    >
                        <svg
                            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="text-sm sm:text-base">Back to Products</span>
                    </motion.button>

                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-10 sm:mb-12"
                        {...animations.fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            {...animations.scaleIn}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs sm:text-sm font-bold mb-4 shadow-md"
                        >
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            {product.category.toUpperCase()}
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent mb-3 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-base sm:text-lg text-gray-600 font-medium">
                            Model: <span className="text-black font-bold">{product.model}</span>
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column - Image / 3D Model and Features */}
                        <motion.div
                            className="space-y-8"
                            {...animations.fadeInLeft}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Main Product Showcase */}
                            <div className="relative group">
                                {/* 3D/Image Container with Enhanced Styling */}
                                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl border border-gray-200 hover:border-red-500 transition-all duration-500 h-[280px] sm:h-[380px] lg:h-[450px]">
                                    {/* Decorative Background Elements */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full blur-2xl" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full blur-2xl" />

                                    {/* Loading Spinner */}
                                    {imageLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-10"
                                        >
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
                                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-red-400 rounded-full animate-spin-slow" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {product.model3D ? (
                                        <div className="w-full h-full relative">
                                            <Canvas
                                                camera={{
                                                    position: [0, 0, 8],
                                                    fov: 45,
                                                    near: 0.1,
                                                    far: 1000
                                                }}
                                                style={{ background: 'transparent' }}
                                            >
                                                {/* Lighting Setup */}
                                                <ambientLight intensity={0.8} />
                                                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                                                <directionalLight position={[-5, -5, -5]} intensity={0.5} />
                                                <spotLight
                                                    position={[0, 10, 0]}
                                                    intensity={0.8}
                                                    angle={0.6}
                                                    penumbra={1}
                                                    castShadow
                                                />
                                                <hemisphereLight
                                                    skyColor="#ffffff"
                                                    groundColor="#444444"
                                                    intensity={0.5}
                                                />

                                                <Suspense fallback={null}>
                                                    {/* Center the model using a group */}
                                                    <group position={[0, 0, 0]}>
                                                        <GLTFModel url={product.model3D} desiredSize={6} />
                                                    </group>
                                                </Suspense>

                                                {/* Centered OrbitControls */}
                                                <OrbitControls
                                                    target={[0, 0, 0]}
                                                    enableZoom={true}
                                                    enablePan={false}
                                                    enableDamping={true}
                                                    dampingFactor={0.05}
                                                    minDistance={4}
                                                    maxDistance={12}
                                                    minPolarAngle={Math.PI / 4}
                                                    maxPolarAngle={Math.PI / 1.5}
                                                    autoRotate={true}
                                                    autoRotateSpeed={3}
                                                    rotateSpeed={0.5}
                                                />
                                            </Canvas>

                                            {/* 3D Model Badge */}
                                            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg z-10">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                3D Interactive View
                                            </div>

                                            {/* Control Instructions */}
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 px-4 py-2 rounded-lg text-xs font-medium shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                    </svg>
                                                    Drag to rotate • Scroll to zoom
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <img
                                                src={imageError ? '/api/placeholder/600/500' : product.image}
                                                alt={`${product.name} - ${product.model}`}
                                                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                                                    }`}
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.src = '/api/placeholder/600/500';
                                                }}
                                            />

                                            {/* Image Overlay on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                <p className="text-white text-sm font-medium">Click to view full details</p>
                                            </div>
                                        </>
                                    )}

                                    {/* Corner Accent */}
                                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-red-600 rounded-tl-3xl opacity-100 transition-all duration-500" />
                                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-red-600 rounded-br-3xl opacity-100 transition-all duration-500" />
                                </div>

                                {/* Enhanced Product Badge */}
                                <motion.div
                                    className="mt-6 -mb-2"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl px-8 py-6 border border-gray-200 shadow-xl hover:shadow-2xl hover:border-red-500 transition-all duration-500 overflow-hidden group/badge">
                                        {/* Animated Background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />

                                        <div className="relative flex items-center justify-between">
                                            <div>
                                                <h2 className="text-gray-900 font-bold text-2xl sm:text-3xl tracking-tight mb-1 flex items-center gap-3">
                                                    {product.model}
                                                    <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                        NEW
                                                    </span>
                                                </h2>
                                                <p className="text-gray-600 text-base sm:text-lg capitalize font-medium flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-red-600 rounded-full" />
                                                    {product.category}
                                                </p>
                                            </div>

                                            {/* Quick Action Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.05, rotate: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Key Features Section */}
                            <div ref={featuresRef}>
                                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 flex items-center">
                                    <motion.span
                                        className="w-1.5 h-7 bg-gradient-to-b from-red-600 to-red-700 mr-3 rounded-full"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                    />
                                    Key Features
                                </h2>
                                <div className="grid gap-3">
                                    {product.features.map((feature, idx) => (
                                        <FeatureCard
                                            key={idx}
                                            feature={feature}
                                            index={idx}
                                            isInView={featuresInView}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Overview, Applications, Specs */}
                        <motion.div
                            className="space-y-8"
                            {...animations.fadeInRight}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Overview Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-red-600 transition-all duration-300"
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 flex items-center">
                                    <motion.span
                                        className="w-1.5 h-7 bg-gradient-to-b from-red-600 to-red-700 mr-3 rounded-full"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    Overview
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                    {product.overview}
                                </p>
                            </motion.div>

                            {/* Applications Section */}
                            <div ref={appsRef} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-red-600 transition-all duration-300">
                                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 flex items-center">
                                    <motion.span
                                        className="w-1.5 h-7 bg-gradient-to-b from-red-600 to-red-700 mr-3 rounded-full"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                    />
                                    Applications
                                </h2>
                                <motion.div
                                    className="flex flex-wrap gap-3"
                                    animate={appsInView ? "visible" : "hidden"}
                                >
                                    {product.applications.map((app, idx) => (
                                        <ApplicationTag key={idx} app={app} index={idx} />
                                    ))}
                                </motion.div>
                            </div>

                            {/* Technical Specifications Section */}
                            <div ref={specsRef}>
                                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 flex items-center">
                                    <motion.span
                                        className="w-1.5 h-7 bg-gradient-to-b from-red-600 to-red-700 mr-3 rounded-full"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                    />
                                    Technical Specifications
                                </h2>
                                <motion.div
                                    className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg hover:border-red-600 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <dl>
                                        {Object.entries(product.specifications).map(([key, value], idx) => (
                                            <SpecificationRow
                                                key={key}
                                                specKey={key}
                                                value={value}
                                                index={idx}
                                            />
                                        ))}
                                    </dl>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.button
                            onClick={handleContactClick}
                            className="relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden group focus:outline-none focus:ring-4 focus:ring-red-500/30"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={`Request quote for ${product.name}`}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="relative flex items-center justify-center gap-3 text-base sm:text-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Request Quote
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={handleDownloadSpecs}
                            className="w-full sm:w-auto px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/30 flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label="Download product specifications"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-base sm:text-lg">Download Specs</span>
                        </motion.button>
                    </motion.div>

                    {/* Customization CTA */}
                    <motion.div
                        className="mt-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-10 text-center border-2 border-gray-200 shadow-lg relative overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {/* Accent corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 opacity-10 rounded-bl-full" />

                        <div className="max-w-3xl mx-auto relative z-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">Need Customization?</h3>
                            <p className="text-gray-700 mb-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                                All our drones can be customized to meet your specific mission requirements.
                                From payload modifications to specialized sensors, we work with you to create the perfect solution.
                            </p>
                            <motion.button
                                onClick={handleContactClick}
                                className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-black/30 shadow-lg hover:shadow-xl text-base sm:text-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Discuss Custom Requirements
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Explore More CTA */}
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">Explore More Solutions</h3>
                        <p className="text-gray-600 mb-6 text-base sm:text-lg max-w-2xl mx-auto">
                            Discover our complete range of advanced drone technologies
                        </p>
                        <motion.button
                            onClick={() => navigate('/products')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-bold rounded-xl hover:from-black hover:to-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-black/30 shadow-lg hover:shadow-2xl text-base sm:text-lg"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Products
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={hideToast}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showContactModal && (
                    <Suspense fallback={
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                            <div className="w-16 h-16 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                        </div>
                    }>
                        <ContactModal
                            product={product}
                            onClose={handleContactModalClose}
                            onSuccess={handleContactSuccess}
                        />
                    </Suspense>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

ProductDetails.propTypes = {};

// Error Boundary
class ProductDetailsErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ProductDetails Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="text-center max-w-md bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.082 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">Something went wrong</h2>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base">
                            We encountered an error while loading the product details. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-colors shadow-md text-sm sm:text-base"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ProductDetailsErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

const ProductDetailsWithErrorBoundary = (props) => (
    <ProductDetailsErrorBoundary>
        <ProductDetails {...props} />
    </ProductDetailsErrorBoundary>
);

export default ProductDetailsWithErrorBoundary;

export {
    ProductDetails,
    ProgressBar,
    ProductSkeleton,
    Toast,
    FeatureCard,
    SpecificationRow,
    ApplicationTag,
    ContactModal,
    CONSTANTS,
    useImageLoader,
    useToast,
    PRODUCTS_DATA
};