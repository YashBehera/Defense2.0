import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DaljeetImg from '../assets/daljeet.JPG';
import HarmeetImg from '../assets/harmeet.JPG';
import NikhilImg from '../assets/nikhil.JPG';
import KrishImg from '../assets/krish.JPG';

const Team = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const teamMembers = [
        {
            name: "Daljeet Chandhok",
            role: "Founder & Director",
            image: DaljeetImg,
            imagePosition: "object-top", // Shift photo down (show top)
            bio: "25+ years of systems architecture and enterprise transformation leadership. Leads FlyHive's overall strategy, capital structuring, regulatory roadmap, and platform execution alongside global strategic advisors."
        },
        {
            name: "Harmeet Kaur",
            role: "Founder & Director",
            image: HarmeetImg,
            imagePosition: "object-top", // Shift photo down (show top)
            bio: "Expert in Digital Campaign Strategy, PR, and Strategic Marketing. Guides brand positioning, communication architecture, and leads FlyHive's market narrative and ecosystem engagement."
        },
        {
            name: "Nikhil Gupta",
            role: "International Strategic Advisor",
            image: NikhilImg,
            imagePosition: "object-center",
            bio: "Global strategist with strong GCC institutional networks and investor engagement. Advises on capital structuring, cross-border positioning, and long-term expansion strategy."
        },
        {
            name: "Krish Chandhok",
            role: "Founding Technical Architect\n(Designate CTO)",
            image: KrishImg,
            imagePosition: "object-top", // Shift photo down (show top)
            bio: "Aerospace systems research & simulation-driven architecture. Will lead technical division upon legal eligibility."
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
        <div className="team-page pt-20 pb-20 bg-white">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-wide">
                        Leadership & Strategic Advisory
                    </h1>
                </motion.div>

                {/* Team Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {teamMembers.map((member, index) => (
                        <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">

                            {/* Circular Image */}
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-4 border-white shadow-lg">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={`w-full h-full object-cover ${member.imagePosition || 'object-center'} hover:scale-110 transition-transform duration-500`}
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-2xl font-light text-gray-800 mb-2">
                                {member.name}
                            </h3>

                            {/* Role */}
                            <p className="text-gray-500 text-lg mb-6 font-light whitespace-pre-line">
                                {member.role}
                            </p>

                            {/* Bio */}
                            <p className="text-gray-500 text-sm leading-relaxed font-light max-w-xs mx-auto">
                                {member.bio}
                            </p>

                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Team;
