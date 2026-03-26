"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "./navbar";
import BackgroundWaves from "@/components/backgorundWaves";
import type { HeroSectionContent } from "@/lib/supabase/types";

const DEFAULT: HeroSectionContent = {
  greeting: "Hi there, I'm Albert 👋",
  name: "Albert",
  title_word1: "Front",
  title_word2: "End",
  title_word3: "Developer",
  bio: "I am a creative front-end developer with a strong focus on motion and interaction.",
  photo_url: "/images/user1.png",
  photo_alt: "Albert - Front-End Developer",
};

export default function Hero({ content = DEFAULT }: { content?: HeroSectionContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax speeds
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const endY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const developerY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const codeY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bioY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Fade on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.7, 0.15]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.9, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream-50 min-h-screen rounded-2xl"
    >
      {/* Navbar */}
      <div className="relative z-50 px-4 md:px-8 pt-5">
        <Navbar />
      </div>

      {/* Background Waves */}
      <BackgroundWaves />

      {/* Main content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-20">
        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">

          {/* Top greeting */}
          <motion.div
            className="lg:col-span-12 text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ opacity: textOpacity }}
          >
            <h1 className="inline-flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-teal-800 tracking-[-1px] font-display uppercase">
              {content.greeting}
            </h1>
          </motion.div>

          {/* LEFT TEXT: FRONT */}
          <motion.div
            className="lg:col-span-4 text-center lg:text-left"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y: frontY, opacity: textOpacity }}
          >
            <span
              className="font-display text-teal-700 text-[15vw] sm:text-[12vw] lg:text-[10vw] leading-[0.85] font-bold tracking-[-6px] uppercase"
              style={{ textShadow: "2px 5px 0px rgba(0,0,0,0.2)" }}
            >
              {content.title_word1}
            </span>
          </motion.div>

          {/* CENTER: Photo + glass code icon */}
          <motion.div
            className="lg:col-span-4 flex flex-col items-center relative"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            style={{ y: photoY, opacity: photoOpacity }}
          >
            <div className="relative">
              <div className="w-64 sm:w-72 md:w-80 lg:w-96 aspect-[620/720] relative rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white/60">
                <Image
                  src={content.photo_url || "/images/user1.png"}
                  alt={content.photo_alt || "Profile photo"}
                  fill
                  priority
                  className="object-cover object-top"
                />
                {/* Glass reflection overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </div>

              {/* Glass code icon */}
              <motion.div
                className="absolute -bottom-6 -right-6 lg:-right-8 bg-white/25 backdrop-blur-[12px] border border-white/40 shadow-[0_8px_32px_-6px_rgba(15,92,63,0.3)] text-teal-700 text-5xl md:text-7xl px-5 py-3 md:px-6 md:py-4 rounded-3xl flex items-center gap-1 -rotate-[8deg] font-light font-mono"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ y: codeY }}
              >
                &lt;/&gt;
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT TEXT: END */}
          <motion.div
            className="lg:col-span-4 text-center lg:text-right"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y: endY, opacity: textOpacity }}
          >
            <span
              className="font-display text-teal-700 text-[15vw] sm:text-[12vw] lg:text-[10vw] leading-[0.85] font-bold tracking-[-6px] uppercase"
              style={{ textShadow: "2px 5px 0px rgba(0,0,0,0.2)" }}
            >
              {content.title_word2}
            </span>
          </motion.div>

          {/* BOTTOM TEXT: DEVELOPER */}
          <motion.div
            className="lg:col-span-12 -mt-4 lg:-mt-12 text-center"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ y: developerY, opacity: textOpacity }}
          >
            <span
              className="inline-block font-display text-teal-700 text-[13vw] sm:text-[10vw] lg:text-[9vw] leading-none font-bold tracking-[-4px] uppercase"
              style={{ textShadow: "2px 5px 0px rgba(0,0,0,0.2)" }}
            >
              {content.title_word3}
            </span>
          </motion.div>

          {/* Bio text */}
          <motion.p
            className="lg:col-span-5 lg:col-start-8 text-teal-800 max-w-xs mx-auto lg:mx-0 text-base md:text-lg leading-tight font-medium uppercase"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ y: bioY, opacity: textOpacity }}
          >
            {content.bio}
          </motion.p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream-50 to-transparent z-30 pointer-events-none" />
    </section>
  );
}
