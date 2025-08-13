import React from "react";
import { motion } from "framer-motion";
import { hero_1 } from "../assets";
import Typewriter from "typewriter-effect";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Hero = () => {
  return (
    <section className="relative flex flex-row items-center justify-between overflow-hidden w-full h-screen mx-auto">
      {/* Top Section */}
        <div className={` inset-0  w-fit sm:px-16 px-6 flex flex-row items-start gap-5`}>
          <div className="flex flex-col justify-center items-center mt-[40px]">
            <div className="w-5 h-5 rounded-full bg-[var(--orange)]" />
            <div className="w-1 sm:h-120 h-80 violet-gradient" />
          </div>

          <div className="pt-[50px]">
            <h1 className={`font-black lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 !font-rubikPuddles !text-[var(--text)]`}>
              Hi, I'm <span className="text-[var(--orange)]">Amr</span>
            </h1>
            <p className={` font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-[var(--text)]`}>
              I am
              <Typewriter
                options={{
                  strings: [ " a fullStack software developer ", " working as a freelancer " , "a web frontEnd specialized " ],
                  autoStart: true,
                  loop: true,
                  loopCount: Infinity,
                  deleteSpeed: "natural",
                  pauseFor: 1000,
                }}
              />
            </p>
            {/* Animated Active Element */}
              <div className=" px-3 mt-1 text-[var(--orange)] gap-3 font-black w-fit flex justify-center items-center">
                Open<span className="hidden ml-[-9px] md:flex ">to work</span>
                <DotLottieReact
                  src="/Animation/Animation - 1747322867917.lottie"
                  loop
                  autoplay
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            {/* Animated Active Element */}
          </div>
        </div>
      {/* Top Section */}
      {/* SVG Element */}
        <div className="  hidden lg:flex lg:mr-[2%] xl:mr-[15%] lg:w-[400px] lg:h-[400px] ">
          <img className="" src={hero_1} alt="hero" />
        </div>
      {/* SVG Element */}
      {/* Animated Button for about */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      {/* Animated Button for about */}
    </section>
  );
};

