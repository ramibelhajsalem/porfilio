"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { NavLink, SocialLink } from "@/content/portfolio.types";

export default function Navbar({
  siteName,
  navLinks,
  socialLinks,
}: {
  siteName: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      className="relative z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between px-4 py-4 md:px-5">
        <Link
          href="/"
          className="font-dancing text-[1.9rem] font-bold tracking-tight text-black/85"
        >
          {siteName}
        </Link>

        <div className="hidden items-center rounded-full bg-white px-2 py-2.5 md:flex">
          <ul className="flex items-center gap-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target={link.openNewTab ? "_blank" : undefined}
                  className="block rounded-full px-5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.09em] text-black/85 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden flex-col items-end gap-0.5 md:flex">
          {socialLinks.map((link) => (
            <li key={link.platform}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-black/85 transition-colors hover:text-teal-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="text-teal-700 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-cream-200 bg-cream-50 md:hidden"
          >
            <div className="space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.openNewTab ? "_blank" : undefined}
                  className="block text-lg font-medium uppercase tracking-wider text-teal-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 border-t border-cream-200 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm uppercase text-teal-700"
                  >
                    {link.label}
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
