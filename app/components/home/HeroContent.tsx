"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiSparkles } from "react-icons/hi2";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion';

const HeroContent = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
        >
            <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
                <motion.div
                    variants={slideInFromTop}
                    className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
                >
                    <HiSparkles className="text-[#b49bff] mr-[10px] h-5 w-5" />
                    <h1 className="Welcome-text text-[13px]">
                        Decentralized Anonymous Social Media Platform
                    </h1>
                </motion.div>

                <motion.div
                    variants={slideInFromLeft(0.5)}
                    className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
                >
                    <span>
                        Unleash your voice,
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            anonymously{" "}
                        </span>
                        and
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                            {" "}
                            securely{" "}
                        </span>
                    </span>
                </motion.div>

                <motion.p
                    variants={slideInFromLeft(0.8)}
                    className="text-lg text-gray-400 my-5 max-w-[600px]"
                >
                    Join the Future of Social Media - Where Privacy Meets Freedom. Start Connecting Anonymously Today!
                </motion.p>
                <motion.a
                    variants={slideInFromLeft(1)}
                    className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
                >
                    Join the Revolution
                </motion.a>
            </div>

            <motion.div
                variants={slideInFromRight(0.8)}
                className="w-1/2 h-1/2 rounded-lg flex justify-center items-center"
            >
                <Image
                    src="/hero.svg"
                    alt="hero image"
                    height={650}
                    width={650}
                />
            </motion.div>
        </motion.div>
    )
}

export default HeroContent
