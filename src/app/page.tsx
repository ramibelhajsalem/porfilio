"use client";

import { motion } from "framer-motion";
import { scrollReveal, staggerContainer, animationVariants } from "@/lib/utils";

export default function Home() {
  return (
    <main className="w-full bg-gradient-to-b from-cream-50 via-white to-cream-100">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi there, I'm Albert
          </motion.h1>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-cream-100">Frontend</span>
              <br />
              <span className="text-cream-200">Developer</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-cream-100 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I am a creative frontend developer with expertise in building beautiful, interactive web experiences. Passionate about clean code and user-centered design.
          </motion.p>

          <motion.button
            className="bg-cream-100 text-teal-800 px-8 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </section>

      {/* Works Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div {...scrollReveal} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
            Works
          </h2>
          <p className="text-lg text-teal-600">
            Some of my recent projects and client work
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-6"
              variants={animationVariants.slideUp}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gradient-to-br from-teal-200 to-teal-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-teal-700 font-bold text-2xl">
                  Project {item}
                </span>
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-2">
                Amazing Project {item}
              </h3>
              <p className="text-teal-600 mb-4">
                A beautiful web application built with Next.js and modern web
                technologies.
              </p>
              <button className="text-teal-700 font-semibold hover:text-teal-900 transition-colors">
                View More →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-teal-800 text-white">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          {...scrollReveal}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-cream-100 mb-8">
            Have a project in mind? I'd love to hear from you.
          </p>
          <motion.button
            className="bg-cream-100 text-teal-800 px-8 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
