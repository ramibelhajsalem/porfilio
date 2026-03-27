"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { scrollReveal } from "@/lib/utils";
import type { ContactCTAContent } from "@/content/portfolio.types";

export default function ContactCTA({ content }: { content: ContactCTAContent }) {
  return (
    <section id="contact" className="overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 items-start gap-1 md:grid-cols-2 md:gap-10">
          <motion.div
            className="flex flex-col items-end space-y-8"
            {...scrollReveal}
          >
            <h2 className="text-end font-display text-[2.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-teal-700 md:text-[4rem] lg:text-[5rem]">
              {content.headingLine1}
              <br />
              {content.headingLine2}
            </h2>

            <Link
              href={content.buttonHref}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-teal-700/40 px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-teal-800 transition-all duration-300 hover:scale-105 hover:border-teal-700 hover:bg-teal-700 hover:text-cream-50 active:scale-95"
            >
              {content.buttonLabel}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="max-w-xs text-[0.65rem] uppercase leading-relaxed tracking-wider text-teal-800/70">
              {content.description}
            </p>
            <h3 className="font-display text-[2rem] font-bold uppercase leading-[0.85] tracking-tighter text-teal-700 md:text-[3.5rem] lg:text-[5rem]">
              {content.detailLine1}
              <br />
              {content.detailLine2}
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
