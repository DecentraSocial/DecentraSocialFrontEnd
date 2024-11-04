import React from 'react'
import HeroContent from './HeroContent'
import StarsCanvas from '../StarBackground'

const Hero = () => {
    return (
        <div className="flex flex-col h-full w-full">
            <StarsCanvas />
            <video
                autoPlay
                muted
                loop
                className="rotate-180 absolute -top-1/2 opacity-40 h-full w-full left-0 z-[1] object-cover"
            >
                <source src="/blackhole.webm" type="video/webm" />
            </video>
            <HeroContent />
        </div>
    )
}

export default Hero
