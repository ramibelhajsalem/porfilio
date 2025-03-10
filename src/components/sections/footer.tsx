"use client";

import { motion } from "framer-motion";
import { siteConfig, footerLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-cream-50 text-teal-800 pt-12 md:pt-16 pb-8 overflow-hidden rounded-2xl">
      {/* Decorative wave lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 500"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 250 Q200 150 400 220 Q600 300 800 200 Q1000 100 1200 220"
            stroke="currentColor"
            strokeWidth="45"
            className="text-cream-300"
            strokeLinecap="round"
          />
          <path
            d="M0 320 Q200 220 400 300 Q600 380 800 280 Q1000 180 1200 300"
            stroke="currentColor"
            strokeWidth="35"
            className="text-cream-300 opacity-60"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Email */}
          <div>
            <p className="text-[0.6rem] text-teal-800/50 uppercase tracking-[0.15em] mb-3">
              Email me for quick conversation
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm md:text-lg font-bold text-teal-800 hover:text-teal-600 transition-colors uppercase tracking-wide"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[0.6rem] text-teal-800/50 uppercase tracking-[0.15em] mb-3 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-teal-800/70 hover:text-teal-700 transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-[0.6rem] text-teal-800/50 uppercase tracking-[0.15em] mb-3 font-medium">
              Address
            </h4>
            <div className="text-xs text-teal-800/70 space-y-1 uppercase tracking-wider">
              <p>{footerLinks.address.street}</p>
              <p>{footerLinks.address.city}</p>
              <p>{footerLinks.address.country}</p>
            </div>
          </div>

          {/* Follow */}
          <div>
            <h4 className="text-[0.6rem] text-teal-800/50 uppercase tracking-[0.15em] mb-3 font-medium">
              Follow
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs text-teal-800/70 hover:text-teal-700 transition-colors uppercase tracking-wider"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-teal-800/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[0.6rem] text-teal-800/40 uppercase tracking-[0.15em]">
            &copy;{new Date().getFullYear()} Albert | All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
