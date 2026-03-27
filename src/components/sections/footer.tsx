"use client";

import { motion } from "framer-motion";
import type {
  FooterContent,
  NavLink,
  SocialLink,
} from "@/content/portfolio.types";

export default function Footer({
  email,
  copyrightName,
  footer,
  quickLinks,
  socialLinks,
}: {
  email: string;
  copyrightName: string;
  footer: FooterContent;
  quickLinks: NavLink[];
  socialLinks: SocialLink[];
}) {
  return (
    <footer className="relative overflow-hidden rounded-2xl bg-cream-50 pt-12 pb-8 text-teal-800 md:pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg
          className="absolute inset-0 h-full w-full"
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="mb-3 text-[0.6rem] uppercase tracking-[0.15em] text-teal-800/50">
              {footer.emailLabel}
            </p>
            <a
              href={`mailto:${email}`}
              className="text-sm font-bold uppercase tracking-wide text-teal-800 transition-colors hover:text-teal-600 md:text-lg"
            >
              {email}
            </a>
          </div>

          <div>
            <h4 className="mb-3 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-teal-800/50">
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-wider text-teal-800/70 transition-colors hover:text-teal-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-teal-800/50">
              {footer.addressTitle}
            </h4>
            <div className="space-y-1 text-xs uppercase tracking-wider text-teal-800/70">
              <p>{footer.address.street}</p>
              <p>{footer.address.city}</p>
              <p>{footer.address.country}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-teal-800/50">
              {footer.followTitle}
            </h4>
            <ul className="space-y-1.5">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-wider text-teal-800/70 transition-colors hover:text-teal-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 border-t border-teal-800/10 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[0.6rem] uppercase tracking-[0.15em] text-teal-800/40">
            &copy;{new Date().getFullYear()} {copyrightName} | All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
