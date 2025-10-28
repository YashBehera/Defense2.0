import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

const AboutPage = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Leadership data
    const leadership = [
        {
            name: 'Tanishpreet Singh Jassal',
            position: 'Co-founder & Director',
            role: 'Lead UAV Design Engineer',
            image: '/api/placeholder/300/300',
            bio: '7 years of experience in design & flying | Ex–Kalam Labs UAV Engineer',
            linkedin: '#'
        },
        {
            name: 'Krish Singh Chandhok',
            position: 'Co-Founder & Director',
            role: 'UAV & Robotics Engineer',
            image: '/api/placeholder/300/300',
            bio: 'TEDx Speaker | Robotics & AI Expertise | 8+ years in UAV piloting, FPV flight systems, drone engineering, electronics, and intelligent autonomy',
            linkedin: '#'
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-red-600 transform origin-left z-50"
                style={{ scaleX }}
            />
            
            {/* Hero Section */}
            <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-red-50 via-transparent to-transparent opacity-30"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [90, 0, 90],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-gray-100 via-transparent to-transparent opacity-30"
                    />
                </div>

                <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-block mb-6 px-6 py-2 border border-red-600 rounded-full"
                        >
                            <span className="text-sm font-semibold text-gray-700 tracking-wider uppercase">
                                About Hive+
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight "
                        >
                            <span className=" bg-gradient-to-r from-gray-900 via-red-600 to-red-600 bg-clip-text text-transparent">NEXT-GEN</span>
                            <br />
                            <span className="block bg-gradient-to-r from-gray-900 via-red-600 to-red-600 bg-clip-text text-transparent">
                                TACTICAL UAV
                            </span>
                            <span className=" bg-gradient-to-r from-gray-900 via-red-600 to-red-600 bg-clip-text text-transparent">SOLUTIONS</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                        >
                            Pioneering indigenous defense technology for a self-reliant India
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap gap-6 justify-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg font-semibold shadow-lg cursor-pointer"
                            >
                                Learn More
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold cursor-pointer"
                            >
                                View Products
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-3 lg:grid-cols-3 gap-8"
                    >
                        {[
                            { number: '2025', label: 'Founded' },
                            { number: '5+', label: 'Active Projects' },
                            { number: '24/7', label: 'Support Available' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <motion.h3
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
                                    className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"
                                >
                                    {stat.number}
                                </motion.h3>
                                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-12"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '64px' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="h-1 bg-gradient-to-r from-red-600 to-red-500 mb-6"
                                />
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="text-gray-900">OUR</span>
                                    <span className="block text-gray-400">MISSION</span>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To develop and deliver cutting-edge autonomous defense systems that enhance
                                    India's strategic capabilities while maintaining the highest standards of
                                    reliability, innovation, and operational excellence.
                                </p>
                            </div>

                            <div className="relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '64px' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="h-1 bg-gradient-to-r from-red-600 to-red-500 mb-6"
                                />
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    <span className="text-gray-900">OUR</span>
                                    <span className="block text-gray-400">VISION</span>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    To be the leading indigenous defense technology company, making India
                                    self-reliant in critical defense systems and establishing our nation as
                                    a global leader in autonomous military platforms.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-10 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-transparent opacity-50 rounded-bl-full" />

                                <h3 className="text-3xl font-bold mb-8 text-gray-900 relative z-10">Core Values</h3>
                                <div className="space-y-6 relative z-10">
                                    {[
                                        { icon: '🛡️', title: 'National Security First', desc: 'Unwavering commitment to India\'s defense' },
                                        { icon: '🚀', title: 'Innovation', desc: 'Pushing boundaries of technology' },
                                        { icon: '⚡', title: 'Excellence', desc: 'Zero compromise on quality and reliability' },
                                        { icon: '🤝', title: 'Integrity', desc: 'Transparent and ethical business practices' }
                                    ].map((value, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            whileHover={{ x: 10 }}
                                            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <span className="text-3xl">{value.icon}</span>
                                            <div>
                                                <h4 className="text-gray-900 font-bold text-lg mb-1">{value.title}</h4>
                                                <p className="text-gray-600">{value.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '64px' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="h-1 bg-gradient-to-r from-red-600 to-red-500 mb-6 mx-auto"
                        />
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            LEADERSHIP <span className="text-gray-400">TEAM</span>
                        </h2>
                        <p className="text-gray-600 text-lg">Meet the founders driving innovation</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {leadership.map((leader, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="group"
                            >
                                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                    <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                                        <motion.img
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <motion.a
                                            href={leader.linkedin}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileHover={{ scale: 1.1 }}
                                            className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                                        >
                                            <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </motion.a>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                                        <p className="text-red-600 font-semibold text-sm mb-1">{leader.position}</p>
                                        <p className="text-red-700 font-medium text-sm mb-3">{leader.role}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section - FIXED */}
            <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '64px' }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="h-1 bg-gradient-to-r from-red-600 to-red-500 mb-6 mx-auto"
                        />
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            WHY CHOOSE <span className="text-gray-400">HIVE+</span>
                        </h2>
                        <p className="text-gray-600 text-lg">Setting new standards in defense technology</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: 'Indigenous Design',
                                description: '100% Made in India solutions supporting Atmanirbhar Bharat initiative',
                                icon: '🇮🇳'
                            },
                            {
                                title: 'Expert Team',
                                description: 'Led by veterans and scientists with decades of defense experience',
                                icon: '👥'
                            },
                            {
                                title: 'Rapid Innovation',
                                description: 'Agile development process for quick deployment and updates',
                                icon: '⚡'
                            },
                            {
                                title: 'Cost Effective',
                                description: 'Competitive pricing without compromising on quality or capability',
                                icon: '💰'
                            },
                            {
                                title: 'Proven Reliability',
                                description: 'Rigorous testing ensures mission-critical performance',
                                icon: '✓'
                            },
                            {
                                title: 'Full Support',
                                description: '24/7 technical support and maintenance services',
                                icon: '🛠️'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ 
                                    once: true,
                                    margin: "-50px",
                                    amount: 0.3
                                }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className="bg-white border border-gray-200 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;