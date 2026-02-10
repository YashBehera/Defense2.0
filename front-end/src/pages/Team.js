import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Team.css';

const Team = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const founders = [
        {
            name: "KRISH CHANDHOK",
            role: "Founder CEO",
            image: "https://via.placeholder.com/400x500",
            bio: "Visionary leader driving the future of urban air mobility."
        }
    ];

    const advisors = [
        {
            name: "Mr. Nikhil Gupta",
            role: "International Strategist & Board Observer",
            image: "https://via.placeholder.com/300x300",
            bio: "Ex. Marwari Catalysts, JITO Angel Network, Kitara Capital & Kotak Mahindra Bank. I am an angel investor, an accelerator, an Alternative Investment Fund Manager, mentor, a wealth manager for close to 3 decades and am currently setting up a CAT II AIF. I serve as a member on several Investment Committees of Incubators, Funds & communities to further work extensively towards nuturing innovation & entrepreneurship. My interests lie in conducting workshops on investments & also have been on several podcasts to narrate the same. I believe in sharing knowledge and hence am a visiting faculty teaching investments and fund raising as a subject to students."
        }
    ];

    const directors = [
        {
            name: "Daljeet Chandhok",
            role: "Director",
            image: "https://via.placeholder.com/300x300",
            bio: "Strategic leadership and operational excellence."
        },
        {
            name: "Harmeet Kaur",
            role: "Director",
            image: "https://via.placeholder.com/300x300",
            bio: "Driving organizational growth and culture."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    return (
        <div className="team-page pt-12 pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Meet the Minds<br />Behind the Mission
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        A diverse team of engineers, aviators, and visionaries united by a single goal:
                        redefining urban mobility.
                    </p>
                </motion.div>

                {/* Founders Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">Founders</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
                    >
                        {founders.map((founder, index) => (
                            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
                                <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-gray-100">
                                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{founder.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{founder.role}</p>
                                <p className="text-gray-500 leading-relaxed">{founder.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Strategic Advisors */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">Strategic Advisors</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
                    >
                        {advisors.map((advisor, index) => (
                            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 overflow-hidden rounded-full mb-6 bg-gray-100">
                                    <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{advisor.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{advisor.role}</p>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-md">{advisor.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Directors */}
                <section>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">Directors</h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    >
                        {directors.map((director, index) => (
                            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 overflow-hidden rounded-full mb-6 bg-gray-100">
                                    <img src={director.image} alt={director.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{director.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{director.role}</p>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-md">{director.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

            </div>
        </div>
    );
};

export default Team;
