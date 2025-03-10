"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { scrollReveal } from "@/lib/utils";

export default function About() {
  return (
    <section id="about" className="bg-white py-16 md:py-24 overflow-hidden rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ── TOP: PASSIONATE + image + description ── */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-start mb-2">
          {/* PASSIONATE text */}
          <motion.div
            className="col-span-12 md:col-span-6 flex items-center gap-4"
            {...scrollReveal}
          >
            <h2 className=" font-display text-[4.5rem] md:text-[4rem] lg:text-[6.5rem] font-bold text-teal-700 uppercase leading-[0.85] tracking-tighter">
              Passionate
            </h2>
          </motion.div>

          {/* Small inline image */}
          <motion.div
            className="col-span-4 md:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md">
              <Image
                src={`${"https://images.unsplash.com/photo-1685062428479-e310b7851de5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEFuZHJvaWR8ZW58MHx8MHx8fDA%3D"}?w=300&h=300`}
                alt="3D design elements"
                fill
                className=" object-cover"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </div>
          </motion.div>

          {/* Top-right description text */}
          <motion.div
            className="col-span-8 md:col-span-4 pt-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.6rem] text-teal-800/60 leading-relaxed uppercase tracking-[0.12em] max-w-[240px]">
              Innovation and storytelling. Interested about conception and creating interactive experiences.
            </p>
          </motion.div>
        </div>

        {/* ── ABOUT DEVELOPMENT — full width ── */}
        <motion.div
          className="mt-2 mb-12 md:mb-16 w-full flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[6.5rem] font-bold text-teal-700 uppercase leading-[0.85] tracking-tighter md:pl-[15%]">
            About Development
          </h2>
        </motion.div>

        {/* ── BOTTOM: 4-column grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
          {/* Column 1: 3D image (tilted) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md -rotate-3">
              <Image
                src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=500&fit=crop"
                alt="3D colorful shapes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>

          {/* Column 2: Work Experience */}
          <motion.div
            className="pt-8 md:pt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xs md:text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">
              Work Experience
            </h3>
            <div className="w-10 h-[1.5px] bg-teal-800/30 mb-4" />
            <p className="text-[0.6rem] text-teal-800/60 leading-relaxed uppercase tracking-[0.12em]">
              Theo is a student in interactive development at Goblins and is currently doing his apprenticeship
            </p>
          </motion.div>

          {/* Column 3: Center image */}
          <motion.div
            className="pt-4 md:pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=500&fit=crop"
                alt="Green glowing 3D cube"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </motion.div>

          {/* Column 4: Description + View All button */}
          <motion.div
            className="pt-4 md:pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.6rem] text-teal-800/60 leading-relaxed uppercase tracking-[0.12em] mb-6">
              An adept of Scandinavian culture and lifestyle. He draws daily inspiration from their minimalist philosophy and has developed
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 border border-teal-800/30 text-teal-800 px-5 py-2.5 rounded-full text-[0.6rem] font-medium uppercase tracking-[0.15em] hover:bg-teal-700 hover:text-cream-50 hover:border-teal-700 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
