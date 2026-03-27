"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { scrollReveal } from "@/lib/utils";
import type { AboutSectionContent } from "@/content/portfolio.types";

const DEFAULT: AboutSectionContent = {
  headline1: "Passionate",
  headline2: "About Development",
  passionDescription: "I enjoy blending visual polish with practical product thinking.",
  workExperienceTitle: "Work Experience",
  workExperienceText: "I work across portfolio sites, SaaS products, dashboards, and brand-forward experiences.",
  aboutDescription: "I care about clean systems, motion that feels purposeful, and interfaces that leave a strong impression without becoming noisy.",
  inlineImageUrl: "https://images.unsplash.com/photo-1685062428479-e310b7851de5?w=300&h=300",
  inlineImageAlt: "Abstract 3D element",
  gridImage1Url: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=500&fit=crop",
  gridImage1Alt: "Colorful 3D shapes",
  gridImage2Url: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=500&fit=crop",
  gridImage2Alt: "Green glowing cube",
  viewAllLabel: "View All",
  viewAllHref: "/works",
};

export default function About({ content = DEFAULT }: { content?: AboutSectionContent }) {
  return (
    <section id="about" className="overflow-hidden rounded-2xl bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-2 grid grid-cols-12 items-start gap-4 md:gap-6">
          <motion.div
            className="col-span-12 flex items-center gap-4 md:col-span-6"
            {...scrollReveal}
          >
            <h2 className="font-display text-[4.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-teal-700 md:text-[4rem] lg:text-[6.5rem]">
              {content.headline1}
            </h2>
          </motion.div>

          <motion.div
            className="col-span-4 md:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-md">
              <Image
                src={content.inlineImageUrl}
                alt={content.inlineImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="col-span-8 pt-1 md:col-span-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="max-w-[240px] text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-teal-800/60">
              {content.passionDescription}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-2 mb-12 flex w-full justify-end md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-[2.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-teal-700 md:pl-[15%] md:text-[4rem] lg:text-[6.5rem]">
            {content.headline2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 items-start gap-6 md:grid-cols-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] w-full -rotate-3 overflow-hidden rounded-xl shadow-md">
              <Image
                src={content.gridImage1Url}
                alt={content.gridImage1Alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="pt-8 md:pt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-teal-800 md:text-sm">
              {content.workExperienceTitle}
            </h3>
            <div className="mb-4 h-[1.5px] w-10 bg-teal-800/30" />
            <p className="text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-teal-800/60">
              {content.workExperienceText}
            </p>
          </motion.div>

          <motion.div
            className="pt-4 md:pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-md">
              <Image
                src={content.gridImage2Url}
                alt={content.gridImage2Alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>

          <motion.div
            className="pt-4 md:pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-teal-800/60">
              {content.aboutDescription}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={content.viewAllHref}
                className="group inline-flex items-center gap-2 rounded-full border border-teal-800/30 px-5 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-teal-800 transition-all duration-300 hover:border-teal-700 hover:bg-teal-700 hover:text-cream-50"
              >
                {content.viewAllLabel}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
