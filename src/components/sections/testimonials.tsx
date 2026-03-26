"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Testimonial } from "@/lib/supabase/types";
import { scrollReveal, staggerContainer, animationVariants } from "@/lib/utils";

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=250&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=250&fit=crop&crop=faces",
];

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section id="testimonials" className="bg-cream-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <motion.h2
          className="font-display text-[2rem] md:text-[3.5rem] lg:text-[5rem] font-bold text-teal-700 uppercase leading-[0.85] text-center mb-14 md:mb-20 tracking-tighter"
          {...scrollReveal}
        >
          What People Says About Me
        </motion.h2>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="flex gap-4 md:gap-6"
              variants={animationVariants.slideUp}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-16 h-20 md:w-24 md:h-28 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={testimonial.avatar_url ?? fallbackAvatars[index % fallbackAvatars.length]}
                    alt={testimonial.client_name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-xs md:text-sm text-teal-800 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div>
                  <h4 className="font-display text-sm md:text-base font-bold text-teal-700 uppercase">
                    {testimonial.client_name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-teal-600 uppercase tracking-wider">
                    {testimonial.client_role}
                    {testimonial.client_company ? ` · ${testimonial.client_company}` : ""}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
