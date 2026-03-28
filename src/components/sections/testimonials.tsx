"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Testimonial } from "@/content/portfolio.types";
import { scrollReveal, staggerContainer, animationVariants } from "@/lib/utils";

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=250&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=250&fit=crop&crop=faces",
];

export default function Testimonials({
  heading,
  testimonials,
}: {
  heading: string;
  testimonials: Testimonial[];
}) {
  return (
    <section id="testimonials" className="bg-cream-50 py-16 md:py-24 hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.h2
          className="mb-14 text-center font-display text-[2rem] font-bold uppercase leading-[0.85] tracking-tighter text-teal-700 md:mb-20 md:text-[3.5rem] lg:text-[5rem]"
          {...scrollReveal}
        >
          {heading}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14"
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
              <div className="flex-shrink-0">
                <div className="relative h-20 w-16 overflow-hidden rounded-xl shadow-sm md:h-28 md:w-24">
                  <Image
                    src={testimonial.avatarUrl || fallbackAvatars[index % fallbackAvatars.length]}
                    alt={testimonial.clientName}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs leading-relaxed text-teal-800 md:text-sm">
                  {testimonial.quote}
                </p>
                <div>
                  <h4 className="font-display text-sm font-bold uppercase text-teal-700 md:text-base">
                    {testimonial.clientName}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-teal-600 md:text-xs">
                    {testimonial.clientRole}
                    {testimonial.clientCompany ? ` · ${testimonial.clientCompany}` : ""}
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
