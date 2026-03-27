"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import portfolio from "@/content/portfolio";

const worksPageContent = portfolio.worksPage;

/* ─── Gradient backgrounds matching portfolio.html ─── */
const gradientBgs = [
  "bg-gradient-to-br from-[#2d7a4f] to-[#1a5c3a]",
  "bg-gradient-to-br from-[#333] to-[#111]",
  "bg-gradient-to-br from-[#7a4f2d] to-[#5c3a1a]",
  "bg-gradient-to-br from-[#2d4f7a] to-[#1a3a5c]",
  "bg-gradient-to-br from-[#4f7a2d] to-[#3a5c1a]",
  "bg-gradient-to-br from-[#7a2d4f] to-[#5c1a3a]",
];

/* ═══════════════════════════════════════
   HERO SECTION (portfolio.html style)
═══════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative"
    >
      {/* LEFT */}
      <div className="flex flex-col justify-center px-8 md:px-[60px] py-20 lg:py-0 relative z-[2] bg-cream-50">
        {/* Back to home */}
        <motion.div
          className="absolute top-8 left-8 md:left-[60px]"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-teal-800/20 text-teal-800 font-mono text-[10px] tracking-[1.5px] uppercase hover:bg-teal-700 hover:text-lime hover:border-teal-700 transition-all"
          >
            <ArrowUpLeft className="w-3.5 h-3.5" />
            {worksPageContent.hero.backToHomeLabel}
          </Link>
        </motion.div>

        {/* Tag */}
        <motion.div
          className="flex items-center gap-2.5 mb-7"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-8 h-[1.5px] bg-lime" />
          <span className="font-mono text-[11px] tracking-[3px] uppercase text-teal-700">
            {worksPageContent.hero.roleLabel}
          </span>
        </motion.div>

        {/* Big heading */}
        <motion.h1
          className="font-display text-[clamp(4.5rem,8vw,6.875rem)] leading-[0.92] tracking-[-1px] text-teal-800"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {worksPageContent.hero.headingLine1}
          <br />
          <em className="text-teal-700 not-italic">{worksPageContent.hero.headingLine2}</em>
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_var(--color-teal-700)]">
            {worksPageContent.hero.headingLine3}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-8 max-w-[320px] text-[15px] leading-[1.7] text-[#444]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {worksPageContent.hero.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href={worksPageContent.hero.primaryCtaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-700 text-lime font-mono text-[12px] tracking-[1.5px] uppercase hover:bg-teal-800 transition-colors"
          >
            {worksPageContent.hero.primaryCtaLabel} →
          </a>
          <a
            href={worksPageContent.hero.secondaryCtaHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 border-[1.5px] border-teal-800 text-teal-800 font-mono text-[12px] tracking-[1.5px] uppercase hover:bg-teal-800 hover:text-cream-50 transition-all"
          >
            {worksPageContent.hero.secondaryCtaLabel}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-8 md:left-[60px] flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="w-10 h-px bg-teal-800/40 animate-scroll-hint" />
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-teal-800/40">
            {worksPageContent.hero.scrollHintLabel}
          </span>
        </motion.div>
      </div>

      {/* RIGHT — Green panel */}
      <div className="relative bg-teal-700 overflow-hidden min-h-[50vh] lg:min-h-0">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative </> watermark */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15"
          viewBox="0 0 500 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-display)"
            fontSize="200"
            fill="#b8f02a"
            opacity="0.3"
          >
            &lt;/&gt;
          </text>
        </svg>

        {/* FRONT END DEV text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-[3]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="font-display text-[clamp(2.5rem,6vw,5rem)] text-lime tracking-[4px] text-center leading-[1.2] p-5">
            {worksPageContent.hero.panelLine1}
            <br />
            {worksPageContent.hero.panelLine2}
            <br />
            {worksPageContent.hero.panelLine3}
          </div>
        </motion.div>

        {/* "Open to work" badge */}
        <motion.div
          className="absolute bottom-10 right-10 bg-lime text-teal-800 font-display text-[13px] tracking-[2px] px-4 py-3 z-[3] rotate-[3deg]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {worksPageContent.hero.availabilityBadge}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ABOUT SECTION (portfolio.html style)
═══════════════════════════════════════ */
function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stats = worksPageContent.about.stats;

  return (
    <section
      ref={ref}
      id="about"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]"
    >
      {/* LEFT — Green panel with image placeholder */}
      <div className="relative bg-teal-700 px-8 md:px-[60px] py-20 overflow-hidden">
        {/* Big "AB" watermark */}
        <div className="absolute -bottom-5 -right-2.5 font-display text-[180px] leading-none text-white/[0.04] pointer-events-none select-none">
          AB
        </div>

        {/* Image placeholder */}
        <motion.div
          className="w-[280px] h-[340px] bg-white/[0.08] border border-white/[0.12] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* "ALBERT" label at bottom */}
          <span className="absolute bottom-4 left-4 font-display text-[14px] tracking-[3px] text-white/40">
            {worksPageContent.about.imageLabel}
          </span>
        </motion.div>
      </div>

      {/* RIGHT — About text + stats */}
      <div className="flex flex-col justify-center px-8 md:px-[60px] py-20 bg-cream-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="font-mono text-[11px] tracking-[3px] uppercase text-teal-700 mb-4">
            {worksPageContent.about.eyebrow}
          </div>

          <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1] text-teal-800 mb-7">
            {worksPageContent.about.headingLine1}
            <br />
            {worksPageContent.about.headingLine2}
            <br />
            <em className="text-teal-700 not-italic">{worksPageContent.about.headingLine3}</em>
          </h2>

          <p className="text-[15px] leading-[1.75] text-[#555] max-w-[440px]">
            {worksPageContent.about.description}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="mt-12 grid grid-cols-2 gap-7"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-[3.25rem] leading-none text-teal-700">
                {stat.num}
              </div>
              <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-teal-800/40 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MARQUEE BAR
═══════════════════════════════════════ */
function MarqueeBar() {
  const skills = worksPageContent.marqueeSkills;

  return (
    <div className="bg-teal-700 overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...skills, ...skills].map((skill, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 font-display text-[1.35rem] tracking-[2px] text-lime uppercase"
          >
            {skill}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   STICKY LEFT: PROJECT DISPLAY
═══════════════════════════════════════ */
function ProjectDisplay({ activeIndex }: { activeIndex: number }) {
  const projects = portfolio.projects
  const project = projects[activeIndex];
  const padNum = String(activeIndex + 1).padStart(2, "0");

  return (
    <div className="relative w-full max-w-[480px]">
      {/* Screen */}
      <div className="w-full aspect-[3/2] rounded-[4px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2),0_0_0_1px_rgba(0,0,0,0.06)] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={cn(
              "w-full h-full flex items-center justify-center scanlines relative",
              gradientBgs[activeIndex % gradientBgs.length]
            )}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span
              className="font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-[4px] z-[2] relative"
              style={{ color: project.accent || "rgba(184,240,42,0.8)" }}
            >
              {project.label || project.title.split(" ")[0].toUpperCase()}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Floating tag */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tag-${activeIndex}`}
            className="absolute -top-4 -right-4 bg-lime text-[#111] font-mono text-[10px] tracking-[1px] uppercase px-3.5 py-2 z-[2]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            {project.category}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Big number watermark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`num-${activeIndex}`}
          className="absolute -bottom-6 left-0 font-display text-[96px] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-teal-800)] opacity-[0.08] pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          exit={{ opacity: 0 }}
        >
          {padNum}
        </motion.div>
      </AnimatePresence>

      {/* Title + year */}
      <div className="mt-7 flex justify-between items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${activeIndex}`}
            className="font-display text-[2rem] tracking-[2px] text-teal-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {project.title}
          </motion.div>
        </AnimatePresence>
        <span className="font-mono text-[11px] text-teal-800/40">
          {project.year}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SCROLL-TRIGGERED PROJECT LIST (RIGHT)
   Uses IntersectionObserver like portfolio.html
   rootMargin: '-40% 0px -40% 0px'
═══════════════════════════════════════ */
function ProjectList({
  activeIndex,
  onScrollActivate,
}: {
  activeIndex: number;
  onScrollActivate: (i: number) => void;
}) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projects = portfolio.projects
  /* IntersectionObserver — fires when an item enters the middle 20% of viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) onScrollActivate(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onScrollActivate]);

  return (
    <div className="flex flex-col">
      {projects.map((project, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={project.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            data-index={i}
            className={cn(
              "py-10 border-b border-black/[0.08] relative cursor-pointer transition-all duration-300",
              i === 0 && "border-t border-black/[0.08]",
              isActive && "pl-5"
            )}
            onClick={() => onScrollActivate(i)}
          >
            {/* Active dot */}
            <div
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lime transition-transform duration-300 origin-center",
                isActive ? "scale-100" : "scale-0"
              )}
            />

            {/* Name + arrow */}
            <div className="flex justify-between items-center mb-2.5">
              <h3
                className={cn(
                  "font-display text-[2.25rem] tracking-[1.5px] transition-colors duration-300",
                  isActive ? "text-teal-700" : "text-teal-800"
                )}
              >
                {project.title}
              </h3>
              <div
                className={cn(
                  "w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-all duration-300 shrink-0 ml-4",
                  isActive
                    ? "bg-teal-700 border-teal-700 text-lime"
                    : "border-black/15 text-teal-800"
                )}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-[1px] uppercase px-2.5 py-1 border border-black/[0.12] text-teal-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description — expand/collapse */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-400 ease-in-out",
                isActive ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
              )}
            >
              <p className="text-sm leading-relaxed text-teal-800/60 max-w-md">
                {project.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════
   SWIPER GALLERY (Dark section)
═══════════════════════════════════════ */
function SwiperSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const projects = portfolio.projects
  /* Responsive cards per view */
  const getCardsPerView = () => (typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const update = () => setCardsPerView(getCardsPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxSlide = Math.max(0, projects.length - cardsPerView);

  const goTo = useCallback(
    (index: number) => setCurrentSlide(Math.max(0, Math.min(index, maxSlide))),
    [maxSlide]
  );

  /* Touch swipe support */
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) goTo(currentSlide + 1);
      else goTo(currentSlide - 1);
    }
  };

  /* Calculate offset: each card = first card element width + gap */
  const [cardOffset, setCardOffset] = useState(0);
  useEffect(() => {
    const calc = () => {
      if (trackRef.current?.firstElementChild) {
        const cardW = (trackRef.current.firstElementChild as HTMLElement).offsetWidth;
        setCardOffset(cardW + 24); // 24px gap
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#111110] overflow-hidden relative"
    >
      {/* Header */}
      <motion.div
        className="px-8 md:px-[60px] pb-12 flex items-end justify-between"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <div>
          <div className="font-mono text-[11px] tracking-[3px] uppercase text-lime/70 mb-3">
            {worksPageContent.gallery.eyebrow}
          </div>
          <h2 className="font-display text-[clamp(3rem,5vw,4.5rem)] text-white leading-[0.9]">
            {worksPageContent.gallery.headingLine1}
            <br />
            <span className="text-lime">{worksPageContent.gallery.headingLine2}</span>
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => goTo(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="w-12 h-12 border-[1.5px] border-white/20 text-white flex items-center justify-center hover:bg-lime hover:text-[#111] hover:border-lime transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20"
          >
            <ArrowLeft className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={() => goTo(currentSlide + 1)}
            disabled={currentSlide >= maxSlide}
            className="w-12 h-12 border-[1.5px] border-white/20 text-white flex items-center justify-center hover:bg-lime hover:text-[#111] hover:border-lime transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-white/20"
          >
            <ArrowRight className="w-[18px] h-[18px]" />
          </button>
        </div>
      </motion.div>

      {/* Track */}
      <div
        className="overflow-hidden px-8 md:px-[60px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            transform: `translateX(-${currentSlide * cardOffset}px)`,
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={cn(
                "shrink-0 aspect-[4/5] relative overflow-hidden bg-[#1a1a18] rounded-[2px] group",
                cardsPerView === 1
                  ? "w-[calc(80%-12px)]"
                  : "w-[calc(33.33%-16px)]"
              )}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {/* Gradient bg + SVG mockup */}
              <div
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.08]",
                  gradientBgs[i % gradientBgs.length]
                )}
              >
                <SwiperCardSVG index={i} />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,92,58,0.95)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-7">
                <div>
                  <span className="font-display text-[1.75rem] text-white tracking-[1px] block mb-1">
                    {project.title}
                  </span>
                  <span className="font-mono text-[10px] text-lime tracking-[2px] uppercase">
                    {project.category} · {project.tags[0]}
                  </span>
                </div>
              </div>

              {/* Number badge */}
              <span className="absolute top-5 right-5 font-display text-[13px] text-white/30 tracking-[2px]">
                {String(i + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 px-8 md:px-[60px] pt-7">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "h-0.5 rounded-[2px] transition-all duration-300",
              currentSlide === i ? "bg-lime flex-[2]" : "bg-white/15 flex-1"
            )}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SVG MOCKUPS (per swiper card)
═══════════════════════════════════════ */
function SwiperCardSVG({ index }: { index: number }) {
  const svgs = [
    <svg key={0} width="70%" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="220" height="140" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="20" y="20" width="120" height="8" rx="2" fill="rgba(184,240,42,0.4)" />
      <rect x="20" y="34" width="80" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="20" y="54" width="200" height="60" rx="4" fill="rgba(255,255,255,0.06)" />
      <text x="120" y="90" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-display)" fontSize="28" fill="rgba(184,240,42,0.6)">3D VIEWER</text>
      <rect x="20" y="126" width="60" height="14" rx="7" fill="rgba(184,240,42,0.5)" />
    </svg>,
    <svg key={1} width="70%" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="220" height="140" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="120" cy="60" r="30" fill="none" stroke="rgba(184,240,42,0.5)" strokeWidth="1.5" />
      <circle cx="120" cy="60" r="15" fill="rgba(184,240,42,0.2)" />
      <rect x="20" y="100" width="200" height="8" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="20" y="114" width="140" height="8" rx="2" fill="rgba(255,255,255,0.05)" />
      <text x="120" y="140" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fill="rgba(184,240,42,0.4)" letterSpacing="3">AIRMA</text>
    </svg>,
    <svg key={2} width="70%" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="220" height="140" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,200,80,0.2)" strokeWidth="1" />
      <rect x="20" y="20" width="50" height="60" rx="3" fill="rgba(255,200,80,0.15)" />
      <rect x="80" y="20" width="50" height="60" rx="3" fill="rgba(255,200,80,0.2)" />
      <rect x="140" y="20" width="50" height="60" rx="3" fill="rgba(255,200,80,0.12)" />
      <rect x="20" y="94" width="170" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="20" y="106" width="100" height="6" rx="2" fill="rgba(255,255,255,0.07)" />
      <rect x="20" y="122" width="70" height="16" rx="8" fill="rgba(255,200,80,0.4)" />
    </svg>,
    <svg key={3} width="70%" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="220" height="140" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(100,180,255,0.2)" strokeWidth="1" />
      <rect x="20" y="20" width="60" height="120" rx="3" fill="rgba(100,180,255,0.1)" stroke="rgba(100,180,255,0.15)" strokeWidth="1" />
      <rect x="92" y="20" width="138" height="55" rx="3" fill="rgba(100,180,255,0.1)" />
      <rect x="92" y="85" width="138" height="55" rx="3" fill="rgba(255,255,255,0.04)" />
      <text x="155" y="50" textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-display)" fontSize="16" fill="rgba(100,180,255,0.6)" letterSpacing="2">CANDIDAT</text>
    </svg>,
    <svg key={4} width="70%" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <circle cx="120" cy="70" r="40" fill="none" stroke="rgba(150,255,100,0.3)" strokeWidth="1" />
      <circle cx="120" cy="70" r="25" fill="none" stroke="rgba(150,255,100,0.2)" strokeWidth="1" />
      <circle cx="120" cy="70" r="8" fill="rgba(150,255,100,0.4)" />
      <line x1="120" y1="30" x2="80" y2="110" stroke="rgba(150,255,100,0.2)" strokeWidth="1" />
      <line x1="120" y1="30" x2="160" y2="110" stroke="rgba(150,255,100,0.2)" strokeWidth="1" />
      <line x1="80" y1="110" x2="160" y2="110" stroke="rgba(150,255,100,0.2)" strokeWidth="1" />
      <text x="120" y="145" textAnchor="middle" fontFamily="var(--font-display)" fontSize="12" fill="rgba(150,255,100,0.5)" letterSpacing="3">MINDMAP AI</text>
    </svg>,
    <svg key={5} width="70%" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="220" height="140" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,150,200,0.2)" strokeWidth="1" />
      <rect x="20" y="20" width="200" height="24" rx="3" fill="rgba(255,150,200,0.1)" />
      <text x="120" y="33" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace" fontSize="9" fill="rgba(255,150,200,0.6)">THINK → ACT → OBSERVE</text>
      <rect x="20" y="54" width="200" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="20" y="66" width="160" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
      <rect x="20" y="78" width="180" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="20" y="104" width="80" height="20" rx="3" fill="rgba(255,150,200,0.2)" />
      <rect x="110" y="104" width="110" height="20" rx="3" fill="rgba(255,255,255,0.06)" />
    </svg>,
  ];
  return svgs[index % svgs.length];
}

/* ═══════════════════════════════════════
   WORKS PAGE — MAIN EXPORT
   Full-bleed: -m-4 cancels parent p-4
═══════════════════════════════════════ */
export default function WorksPage() {
  const [activeProject, setActiveProject] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const projects = portfolio.projects
  const handleScrollActivate = useCallback((i: number) => {
    setActiveProject(i);
  }, []);

  return (
    <div className="-mx-4 -mt-4 -mb-4 flex flex-col w-[calc(100%+2rem)]">
      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── MARQUEE ─── */}
      <MarqueeBar />

      {/* ─── WORKS: STICKY SCROLL ─── */}
      <section id="works" className="relative bg-cream-50">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="px-8 md:px-[60px] pt-20 pb-10 flex items-end justify-between"
          initial={{ opacity: 0, y: 32 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div>
            <div className="font-mono text-[11px] tracking-[3px] uppercase text-teal-700 mb-3">
              {worksPageContent.selectedWorks.eyebrow}
            </div>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-teal-800">
              {worksPageContent.selectedWorks.heading}
            </h2>
          </div>
          <div className="font-display text-[5rem] leading-none text-transparent [-webkit-text-stroke:1.5px_var(--color-teal-700)] opacity-[0.18]">
            {String(projects.length).padStart(2, "0")}
          </div>
        </motion.div>

        {/* Sticky 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative">
          {/* LEFT — Sticky project preview */}
          <div className="hidden lg:flex sticky top-[80px] h-[calc(100vh-80px)] items-center justify-center px-[60px] overflow-hidden">
            <ProjectDisplay activeIndex={activeProject} />
          </div>

          {/* RIGHT — Scrollable list (IntersectionObserver triggers) */}
          <div className="px-8 md:px-[60px] lg:pr-[60px] lg:pl-0 pb-[60px]">
            <ProjectList
              activeIndex={activeProject}
              onScrollActivate={handleScrollActivate}
            />
          </div>
        </div>
      </section>

      {/* ─── SWIPER GALLERY ─── */}
      <SwiperSection />

      {/* ─── ABOUT ─── */}
      <AboutSection />
    </div>
  );
}
