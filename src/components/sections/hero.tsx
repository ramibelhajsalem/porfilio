"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "./navbar";
import BackgroundWaves from "@/components/backgorundWaves";
import type {
  HomeHeroContent,
  NavLink,
  SocialLink,
} from "@/content/portfolio.types";

const DEFAULT: HomeHeroContent = {
  greeting: "Hi there, I'm Nidhal",
  titleWords: ["Front", "End", "Developer"],
  bio: "I design and build elegant interfaces with motion, structure, and a strong attention to detail.",
  photoUrl: "/images/user1.png",
  photoAlt: "Nidhal profile photo",
};

export default function Hero({
  content = DEFAULT,
  siteName,
  navLinks,
  socialLinks,
}: {
  content?: HomeHeroContent;
  siteName: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const frontY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const endY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const developerY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const codeY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bioY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.7, 0.15]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.9, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden rounded-2xl bg-cream-50"
    >
      <div className="relative z-50 px-4 pt-5 md:px-8">
        <Navbar siteName={siteName} navLinks={navLinks} socialLinks={socialLinks} />
      </div>

      <BackgroundWaves />

      <div className="relative z-20 mx-auto max-w-[1400px] px-4 pt-8 pb-20 md:px-8 md:pt-16">
        <div className="grid grid-cols-1 items-center gap-4 md:gap-8 lg:grid-cols-12">
          <motion.div
            className="text-center lg:col-span-12 lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ opacity: textOpacity }}
          >
            <h1 className="inline-flex items-center gap-3 font-display text-2xl font-semibold uppercase tracking-[-1px] text-teal-800 sm:text-3xl md:text-4xl">
              {content.greeting}
            </h1>
          </motion.div>

          <motion.div
            className="text-center lg:col-span-4 lg:text-left z-30"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y: frontY, opacity: textOpacity }}
          >
            <span
              className="font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-[-12px] text-teal-700 sm:text-[12vw] lg:text-[8vw]"
              style={{ textShadow: "2px 5px 0px rgba(0,0,0,0.2)" }}
            >
              {content.titleWords[0]}
            </span>
          </motion.div>

          <motion.div
            className="relative flex flex-col items-center lg:col-span-4"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.05 }}
            style={{ y: photoY, opacity: photoOpacity }}
          >
            <div className="relative">
              <div className="relative aspect-[620/720] w-64 overflow-hidden rounded-3xl border-[6px] border-white/60 shadow-2xl sm:w-72 md:w-80 lg:w-96">
                <Image
                  src={content.photoUrl || "/images/user1.png"}
                  alt={content.photoAlt || "Profile photo"}
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>

              <motion.div
                className="absolute -right-6 -bottom-6 flex items-center gap-1 rounded-3xl border border-white/40 bg-white/25 px-5 py-3 font-mono text-5xl font-light text-teal-700 shadow-[0_8px_32px_-6px_rgba(15,92,63,0.3)] backdrop-blur-[12px] -rotate-[8deg] md:px-6 md:py-4 md:text-7xl lg:-right-8"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ y: codeY }}
              >
                &lt;/&gt;
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="text-center lg:col-span-4 lg:text-right"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y: endY, opacity: textOpacity }}
          >
            <span
              className="font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-[-12px] text-teal-700 sm:text-[12vw] lg:text-[10vw]"
              style={{ textShadow: "2px 5px 0px rgba(0,0,0,0.2)" }}
            >
              {content.titleWords[1]}
            </span>
          </motion.div>

          <motion.div
            className="text-center lg:col-span-12 lg:-mt-12"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{ y: developerY, opacity: textOpacity }}
          >
            <span
              className="inline-block font-display text-[12vw] font-bold uppercase leading-none tracking-[-4px] text-teal-700 sm:text-[10vw] lg:text-[9vw]"
              style={{ textShadow: "2px 5px 0px rgba(0,0,0,0.2)" }}
            >
              {content.titleWords[2]}
            </span>
          </motion.div>

          <motion.p
            className="mx-auto max-w-xs text-base font-medium uppercase leading-tight text-teal-800 lg:col-span-5 lg:col-start-8 lg:mx-0 md:text-lg"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ y: bioY, opacity: textOpacity }}
          >
            {content.bio}
          </motion.p>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-30 h-40 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  );
}
