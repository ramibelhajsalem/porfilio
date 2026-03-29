"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, GraduationCap, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn, scrollReveal } from "@/lib/utils";
import type {
  ProfileContent,
  ResumeContent,
  AboutPageContent,
} from "@/content/portfolio.types";

interface AboutPageProps {
  profile: ProfileContent;
  resume: ResumeContent;
  content: AboutPageContent;
}

/* ─── Animated language proficiency bar ─── */
function LanguageBar({ level }: { level: string }) {
  const percent = level === "Native" ? 100 : level === "Fluent" ? 85 : 60;
  return (
    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-cream-500/10">
      <motion.div
        className="h-full rounded-full bg-lime"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </div>
  );
}

/* ─── Count-up number animation ─── */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const trailingSuffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, numericPart, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${trailingSuffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, motionVal, numericPart, trailingSuffix]);

  return <span ref={ref}>0{trailingSuffix}</span>;
}

/* ═══════════════════════════════════════════
   MAIN ABOUT PAGE COMPONENT
═══════════════════════════════════════════ */
export default function AboutPage({ profile, resume, content }: AboutPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  /* ─── Experience scroll-activation ─── */
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const expItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleExpActivate = useCallback((i: number) => {
    setActiveExpIndex(i);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-exp-index"));
            if (!isNaN(idx)) handleExpActivate(idx);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
    );
    expItemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [handleExpActivate]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden rounded-2xl bg-teal-900"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,229,221,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(233,229,221,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative circles */}
      <motion.div
        className="pointer-events-none absolute top-32 right-[8%] h-72 w-72 rounded-full border border-cream-200/[0.04]"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-48 left-[5%] h-48 w-48 rounded-full border border-lime/[0.04]"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="pointer-events-none absolute top-[60%] right-[20%] h-24 w-24 rounded-full bg-lime/[0.02]"
        style={{ y: bgY }}
      />

      <div className="relative z-10">
        {/* ─── TOP BAR ─── */}
        <div className="mx-auto max-w-7xl px-6 pt-8 md:px-10 md:pt-10">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-cream-300/15 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[1.5px] text-cream-200 transition-all duration-300 hover:border-lime hover:bg-lime hover:text-teal-900"
              >
                <ArrowUpLeft className="h-3.5 w-3.5" />
                {content.backToHomeLabel}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              <span className="text-[0.6rem] uppercase tracking-[0.15em] text-cream-300/60">
                {profile.availability.statusText}
              </span>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════ HERO ═══════════════ */}
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <motion.p
                className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-lime md:mb-6 md:text-xs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {content.hero.eyebrow}
              </motion.p>

              <h1 className="font-display text-[2.8rem] font-bold uppercase leading-[0.82] tracking-tighter text-cream-50 sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  {content.hero.headingLine1}
                </motion.span>
                <motion.span
                  className="block text-lime"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  {content.hero.headingLine2}
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                >
                  {content.hero.headingLine3}
                </motion.span>
              </h1>

              <motion.p
                className="mt-8 max-w-lg text-[0.65rem] uppercase leading-relaxed tracking-[0.12em] text-cream-300/70 md:mt-10 md:text-xs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {content.hero.description}
              </motion.p>
            </div>

            {/* Profile Photo + </> Badge */}
            <motion.div
              className="relative flex flex-col items-center lg:col-span-4"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.05 }}
            >
              <div className="relative">
                <div className="relative aspect-[620/720] w-52 overflow-hidden rounded-3xl border-[5px] border-cream-100/15 shadow-2xl shadow-lime/5 sm:w-60 md:w-72 lg:w-80">
                  <Image
                    src={profile.identity.avatar.url}
                    alt={profile.identity.avatar.alt}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cream-50/10 to-transparent" />
                </div>

                {/* </> floating badge */}
                <motion.div
                  className="absolute -right-6 -bottom-6 flex items-center gap-1 rounded-3xl border border-cream-100/15 bg-cream-50/10 px-5 py-3 font-mono text-5xl font-light text-lime shadow-[0_8px_32px_-6px_rgba(184,240,42,0.15)] backdrop-blur-[12px] -rotate-[8deg] md:px-6 md:py-4 md:text-7xl lg:-right-8"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  &lt;/&gt;
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 gap-8 border-t border-cream-500/10 pt-10 md:mt-20 md:grid-cols-4 md:gap-12 md:pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {content.hero.stats.map((stat, index) => (
              <div key={index}>
                <span className="font-display text-3xl font-bold text-cream-50 md:text-4xl">
                  <CountUp value={stat.num} />
                </span>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.15em] text-cream-300/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            className="mt-16 h-px w-full bg-cream-500/10 md:mt-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </div>

        {/* ═══════════════ EXPERIENCE ═══════════════ */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <motion.p
            className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-lime md:text-xs"
            {...scrollReveal}
          >
            {content.experience.eyebrow}
          </motion.p>
          <motion.h2
            className="font-display text-[2.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-cream-50 md:text-[4rem]"
            {...scrollReveal}
          >
            {content.experience.heading}
          </motion.h2>

          {/* Active experience counter */}
          <motion.div
            className="mt-6 mb-12 flex items-center gap-4 md:mb-16"
            {...scrollReveal}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeExpIndex}
                className="font-display text-5xl font-bold text-lime md:text-6xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(activeExpIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="text-[0.65rem] uppercase tracking-[0.12em] text-cream-400/40">
              / {String(resume.experience.length).padStart(2, "0")}
            </span>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-cream-500/10 md:left-6" />

            <div className="flex flex-col">
              {resume.experience.map((exp, index) => {
                const isActive = activeExpIndex === index;
                return (
                  <motion.div
                    key={exp.id}
                    ref={(el) => { expItemRefs.current[index] = el; }}
                    data-exp-index={index}
                    className="relative cursor-default rounded-xl border border-transparent py-6 pl-12 pr-4 md:py-8 md:pl-16 md:pr-6"
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      background: isActive ? "rgba(233,229,221,0.03)" : "transparent",
                      borderColor: isActive ? "rgba(233,229,221,0.06)" : "transparent",
                      transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: isActive ? 1 : 0.35, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-[11px] top-8 h-2.5 w-2.5 rounded-full md:left-[19px]"
                      style={{
                        background: isActive ? "#b8f02a" : "rgba(233,229,221,0.15)",
                        boxShadow: isActive ? "0 0 10px rgba(184,240,42,0.35)" : "none",
                        transform: isActive ? "scale(1)" : "scale(0.7)",
                        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />

                    {/* Date pill */}
                    <span
                      className="inline-block rounded-full border px-3 py-1 text-[0.55rem] font-medium uppercase tracking-[0.15em]"
                      style={{
                        borderColor: isActive ? "rgba(184,240,42,0.25)" : "rgba(233,229,221,0.08)",
                        color: isActive ? "rgba(184,240,42,0.75)" : "rgba(233,229,221,0.35)",
                        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {exp.start} — {exp.end}
                    </span>

                    <h3
                      className="mt-3 text-base font-bold tracking-wide md:text-lg"
                      style={{
                        color: isActive ? "rgba(233,229,221,0.95)" : "rgba(233,229,221,0.45)",
                        transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.1em]"
                      style={{
                        color: isActive ? "rgba(184,240,42,0.7)" : "rgba(184,240,42,0.25)",
                        transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {exp.role}
                    </p>

                    <div className="mt-1.5 flex items-center gap-3">
                      <span
                        className="text-[0.55rem] uppercase tracking-[0.12em]"
                        style={{
                          color: isActive ? "rgba(233,229,221,0.4)" : "rgba(233,229,221,0.2)",
                          transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {exp.employmentType}
                      </span>
                      <span className="h-0.5 w-0.5 rounded-full bg-cream-400/20" />
                      <span
                        className="text-[0.55rem] uppercase tracking-[0.12em]"
                        style={{
                          color: isActive ? "rgba(233,229,221,0.4)" : "rgba(233,229,221,0.2)",
                          transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {exp.location}
                      </span>
                    </div>

                    <p
                      className="mt-4 max-w-xl text-[0.6rem] uppercase leading-relaxed tracking-[0.1em]"
                      style={{
                        color: isActive ? "rgba(233,229,221,0.6)" : "rgba(233,229,221,0.25)",
                        transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {exp.summary}
                    </p>

                    {/* Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border px-3 py-1 text-[0.5rem] uppercase tracking-[0.1em] transition-colors duration-300 hover:border-lime/30 hover:text-cream-200"
                          style={{
                            borderColor: isActive ? "rgba(233,229,221,0.1)" : "rgba(233,229,221,0.04)",
                            color: isActive ? "rgba(233,229,221,0.5)" : "rgba(233,229,221,0.2)",
                            transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            className="h-px w-full bg-cream-500/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </div>

        {/* ═══════════════ EDUCATION ═══════════════ */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <motion.p
            className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-lime md:text-xs"
            {...scrollReveal}
          >
            {content.education.eyebrow}
          </motion.p>
          <motion.h2
            className="mb-12 font-display text-[2.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-cream-50 md:mb-16 md:text-[4rem]"
            {...scrollReveal}
          >
            {content.education.heading}
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {resume.education.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            className="h-px w-full bg-cream-500/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </div>

        {/* ═══════════════ SKILLS ═══════════════ */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <motion.p
            className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-lime md:text-xs"
            {...scrollReveal}
          >
            {content.skills.eyebrow}
          </motion.p>
          <motion.h2
            className="mb-12 font-display text-[2.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-cream-50 md:mb-16 md:text-[4rem]"
            {...scrollReveal}
          >
            {content.skills.heading}
          </motion.h2>

          <div className="space-y-10 md:space-y-12">
            {content.skills.categories.map((cat, catIndex) => {
              const skills = resume.skills[cat.key];
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: catIndex * 0.08 }}
                  viewport={{ once: true }}
                >
                  <h3 className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-cream-300/60 md:mb-5 md:text-xs">
                    {cat.label}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-full border border-cream-500/10 px-4 py-2 text-[0.6rem] uppercase tracking-[0.1em] text-cream-200/70 transition-all duration-300 hover:border-lime/30 hover:bg-lime/[0.04] hover:text-cream-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.08 + skillIndex * 0.03,
                        }}
                        viewport={{ once: true }}
                      >
                        {cat.key === "featured" && (
                          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                        )}
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            className="h-px w-full bg-cream-500/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </div>

        {/* ═══════════════ LANGUAGES ═══════════════ */}
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <motion.p
            className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-lime md:text-xs"
            {...scrollReveal}
          >
            {content.languages.eyebrow}
          </motion.p>
          <motion.h2
            className="mb-12 font-display text-[2.5rem] font-bold uppercase leading-[0.85] tracking-tighter text-cream-50 md:mb-16 md:text-[4rem]"
            {...scrollReveal}
          >
            {content.languages.heading}
          </motion.h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
            {resume.languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                className="group rounded-xl border border-cream-500/10 p-6 transition-colors duration-300 hover:border-lime/20 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-display text-lg font-bold tracking-wide text-cream-100 md:text-xl">
                  {lang.name}
                </h3>
                <p className="mt-1 text-[0.6rem] uppercase tracking-[0.15em] text-cream-300/60">
                  {lang.level}
                </p>
                <LanguageBar level={lang.level} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            className="h-px w-full bg-cream-500/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </div>

        {/* ═══════════════ CTA ═══════════════ */}
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-32">
          <motion.h2
            className="mx-auto max-w-3xl font-display text-[2rem] font-bold uppercase leading-[0.85] tracking-tighter text-cream-50 md:text-[3.5rem]"
            {...scrollReveal}
          >
            {content.cta.heading}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-md text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-cream-300/65 md:mt-8 md:text-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {content.cta.description}
          </motion.p>
          <motion.div
            className="mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <Link
              href={content.cta.buttonHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-lime px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-teal-900 md:px-10 md:py-5 md:text-sm"
            >
              <span className="absolute inset-0 origin-center scale-0 rounded-full bg-teal-700 transition-transform duration-500 ease-out group-hover:scale-100" />
              <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-lime">
                {content.cta.buttonLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Education card with smooth scroll-activated glow ─── */
function EducationCard({
  edu,
  index,
}: {
  edu: ResumeContent["education"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-25% 0px -25% 0px" });

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-default overflow-hidden rounded-2xl border p-6 md:p-8"
      style={{
        borderColor: isInView ? "rgba(184,240,42,0.15)" : "rgba(233,229,221,0.06)",
        background: isInView ? "rgba(233,229,221,0.03)" : "transparent",
        opacity: isInView ? 1 : 0.45,
        transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Decorative number */}
      <span
        className="absolute -right-2 -top-4 font-display text-[7rem] font-bold leading-none pointer-events-none"
        style={{
          color: isInView ? "rgba(184,240,42,0.04)" : "rgba(233,229,221,0.015)",
          transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: isInView ? "rgba(184,240,42,0.12)" : "rgba(184,240,42,0.04)",
              transition: "background 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <GraduationCap
              className="h-5 w-5"
              style={{
                color: isInView ? "#b8f02a" : "rgba(184,240,42,0.35)",
                transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
          <span
            className="text-[0.55rem] uppercase tracking-[0.15em]"
            style={{
              color: isInView ? "rgba(233,229,221,0.55)" : "rgba(233,229,221,0.25)",
              transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {edu.start} — {edu.end}
          </span>
        </div>

        <h3
          className="text-base font-bold tracking-wide md:text-lg"
          style={{
            color: isInView ? "rgba(233,229,221,0.95)" : "rgba(233,229,221,0.4)",
            transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {edu.degree}
        </h3>
        <p
          className="mt-2 text-[0.6rem] uppercase tracking-[0.12em]"
          style={{
            color: isInView ? "rgba(233,229,221,0.55)" : "rgba(233,229,221,0.25)",
            transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {edu.school}
        </p>
        <p
          className="mt-1 text-[0.55rem] uppercase tracking-[0.12em]"
          style={{
            color: isInView ? "rgba(233,229,221,0.4)" : "rgba(233,229,221,0.15)",
            transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {edu.location}
        </p>
      </div>
    </motion.div>
  );
}
