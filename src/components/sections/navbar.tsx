"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, socialLinks } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="relative z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="px-4 md:px-5 py-4 flex items-start justify-between">
        {/* Logo */}
        <a href="/" className="text-[1.9rem] font-bold text-black/85 tracking-tight font-dancing">
          Nidhal
        </a>

        {/* Desktop Nav Links - grouped in a bordered container */}
        <div className="hidden md:flex items-center rounded-full px-2 py-2.5 bg-white">
          <ul className="flex items-center gap-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.72rem] font-medium text-black/85 transition-colors uppercase tracking-[0.09em] px-5 py-1.5 rounded-full block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links - Desktop - Vertical Stack */}
        <ul className="hidden md:flex flex-col items-end gap-0.5">
          {socialLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-[0.65rem] font-medium text-black/85 hover:text-teal-700 transition-colors uppercase tracking-[0.14em]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-teal-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-cream-50 border-t border-cream-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-lg font-medium text-teal-800 uppercase tracking-wider"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-cream-200">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-teal-700 uppercase"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
