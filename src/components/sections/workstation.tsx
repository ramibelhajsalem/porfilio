"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { scrollReveal } from "@/lib/utils";
import type { WorkstationSectionContent } from "@/lib/supabase/types";

const DEFAULT: WorkstationSectionContent = {
  heading: "Workstation",
  description: "Where ideas come to life",
  images: [
    { url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&h=350&fit=crop", alt: "Workspace with tablet and phone" },
    { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop", alt: "Person coding on laptop" },
    { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=350&fit=crop", alt: "Multiple screens setup" },
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=350&fit=crop", alt: "Watch and phone on desk" },
  ],
};

export default function Workstation({ content = DEFAULT }: { content?: WorkstationSectionContent }) {
  const images = content.images?.length >= 4 ? content.images : DEFAULT.images;
  return (
    <section className="relative bg-cream-50 py-16 md:py-24 overflow-hidden my-10 rounded-2xl">
      {/* Decorative wave lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 400 Q200 280 400 360 Q600 440 800 320 Q1000 200 1200 340"
            stroke="currentColor"
            strokeWidth="55"
            className="text-cream-300"
            strokeLinecap="round"
          />
          <path
            d="M0 480 Q200 380 400 440 Q600 520 800 400 Q1000 300 1200 420"
            stroke="currentColor"
            strokeWidth="40"
            className="text-cream-300 opacity-60"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Row: Text + Images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left text */}
          <motion.div
            className="md:col-span-3 pt-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.6rem] text-teal-800/60 leading-relaxed uppercase tracking-[0.12em]">
              Gears are mechanical devices used to transmit power.
            </p>
          </motion.div>

          {/* First image */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src={images[0].url}
                alt={images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </motion.div>

          {/* Middle text */}
          <motion.div
            className="md:col-span-3 pt-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.6rem] text-teal-800/60 leading-relaxed uppercase tracking-[0.12em]">
              Gears are fascinating mechanical components that have been used for centuries to enable complex machinery and systems.
            </p>
          </motion.div>

          {/* Second image */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src={images[1].url}
                alt={images[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Large WORKSTATION text — overlapping */}
        <motion.div
          className="relative -mt-6 md:-mt-14 mb-0 md:-mb-10 z-10"
          style={{ textShadow: "2px 10px 0px rgba(0,0,0,0.2)" }}
          {...scrollReveal}
        >
          <h2 className="font-display text-[3rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-bold uppercase leading-none text-center tracking-tighter text-teal-700 select-none">
            Workstation
          </h2>
        </motion.div>

        {/* Bottom Row: Images + Favourite Gears */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Third image */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src={images[2].url}
                alt={images[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Favourite Gears text */}
          <motion.div
            className="md:col-span-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-[2px] bg-teal-700/40 mb-4" />
            <h3 className="font-display text-sm md:text-base font-bold uppercase mb-3 text-teal-800 tracking-wider">
              Favourite Gears
            </h3>
            <p className="text-[0.6rem] text-teal-800/60 leading-relaxed uppercase tracking-[0.12em] max-w-xs">
              Gears help convert the low rotational speed of the blades to high-speed rotation for electricity generation.
            </p>
          </motion.div>

          {/* Fourth image */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
              <Image
                src={images[3].url}
                alt={images[3].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
