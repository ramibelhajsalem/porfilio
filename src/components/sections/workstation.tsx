"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { scrollReveal } from "@/lib/utils";
import type { WorkstationSectionContent } from "@/content/portfolio.types";

const DEFAULT: WorkstationSectionContent = {
  sideLabelLeft: "A setup built for focus, iteration, and visual experimentation.",
  sideLabelRight: "Tools matter when speed and clarity both need to stay high.",
  sectionTitle: "Workstation",
  favoriteGearsTitle: "Favourite Gears",
  favoriteGearsDescription: "A small set of tools I rely on every day for design reviews, coding, prototyping, and shipping polished interfaces.",
  images: [
    { url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&h=350&fit=crop", alt: "Workspace with tablet and phone" },
    { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop", alt: "Person coding on laptop" },
    { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=350&fit=crop", alt: "Multiple screens setup" },
    { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=350&fit=crop", alt: "Watch and phone on desk" },
  ],
};

export default function Workstation({
  content = DEFAULT,
}: {
  content?: WorkstationSectionContent;
}) {
  const images = content.images?.length >= 4 ? content.images : DEFAULT.images;

  return (
    <section className="relative my-10 overflow-hidden rounded-2xl bg-cream-50 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
          <motion.div
            className="pt-2 md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-teal-800/60">
              {content.sideLabelLeft}
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
              <Image
                src={images[0].url}
                alt={images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="pt-2 md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-teal-800/60">
              {content.sideLabelRight}
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
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

        <motion.div
          className="relative z-10 -mt-6 mb-0 md:-mt-14 md:-mb-10"
          style={{ textShadow: "2px 10px 0px rgba(0,0,0,0.2)" }}
          {...scrollReveal}
        >
          <h2 className="select-none text-center font-display text-[3rem] font-bold uppercase leading-none tracking-tighter text-teal-700 md:text-[6rem] lg:text-[8rem] xl:text-[10rem]">
            {content.sectionTitle}
          </h2>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8">
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
              <Image
                src={images[2].url}
                alt={images[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="pt-4 md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 h-[2px] w-12 bg-teal-700/40" />
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-teal-800 md:text-base">
              {content.favoriteGearsTitle}
            </h3>
            <p className="max-w-xs text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-teal-800/60">
              {content.favoriteGearsDescription}
            </p>
          </motion.div>

          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
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
