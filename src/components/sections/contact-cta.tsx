"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollReveal } from "@/lib/utils";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-10 items-start">
          {/* Left: Heading + Button */}
          <motion.div className="space-y-8 flex flex-col items-end" {...scrollReveal}>
            <h2 className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold text-teal-700 uppercase leading-[0.85] tracking-tighter text-end">
              Have An
              <br />
              Idea?
            </h2>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-teal-700/40 text-teal-800 px-6 py-3 rounded-full text-[0.65rem] font-medium uppercase tracking-[0.15em] hover:bg-teal-700 hover:text-cream-50 hover:border-teal-700 transition-all duration-300 group hover:scale-105 active:scale-95 transition-transform"
            >
              Send Me A Request
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          {/* Right: Description + Tell me */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-[0.65rem] text-teal-800/70 leading-relaxed max-w-xs uppercase tracking-wider">
              I understand that you might be busy, but any assistance you could provide would be greatly appreciated.
            </p>
            <h3 className="font-display text-[2rem] md:text-[3.5rem] lg:text-[5rem] font-bold text-teal-700 uppercase leading-[0.85] tracking-tighter">
              Tell Me
              <br />
              About It
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
