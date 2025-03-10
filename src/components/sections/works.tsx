"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/constants";
import { scrollReveal } from "@/lib/utils";
import Link from "next/link";

/* ── Card dimensions ── */
const CARD_W = 380;
const CARD_GAP = 24;

/* ── Stagger variants ── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Works() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Drag physics ── */
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 40 });

  /* ── Max drag extent ── */
  const maxDrag = -(projects.length * (CARD_W + CARD_GAP) - CARD_W);

  /* ── Navigate carousel ── */
  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setActiveIndex(clamped);
    x.set(-clamped * (CARD_W + CARD_GAP));
  };

  return (
    <section id="works" className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.h2
              className="font-display text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold text-teal-700 uppercase leading-none tracking-tighter"
              {...scrollReveal}
            >
              Works
            </motion.h2>
            <motion.p
              className="mt-4 text-sm md:text-base text-teal-800/50 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              During his professional experiences, Albert had the opportunity to
              work on a wide variety of projects.
            </motion.p>
          </div>

          {/* Navigation arrows */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full border border-teal-700/20 flex items-center justify-center text-teal-700 hover:bg-teal-700 hover:text-cream-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-teal-700 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              className="w-12 h-12 rounded-full border border-teal-700/20 flex items-center justify-center text-teal-700 hover:bg-teal-700 hover:text-cream-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-teal-700 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="ml-3 text-xs font-medium text-teal-700/40 tabular-nums tracking-wider">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </motion.div>
        </div>

        {/* ── Carousel ── */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={carouselRef}>
          <motion.div
            className="flex"
            style={{ x: springX, gap: CARD_GAP }}
            drag="x"
            dragConstraints={{ left: maxDrag, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              const offset = info.offset.x;
              const velocity = info.velocity.x;
              if (offset < -80 || velocity < -400) {
                scrollTo(activeIndex + 1);
              } else if (offset > 80 || velocity > 400) {
                scrollTo(activeIndex - 1);
              } else {
                scrollTo(activeIndex);
              }
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </div>

        {/* ── Progress dots ── */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="group p-1"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "w-8 bg-teal-700"
                    : "w-1.5 bg-teal-700/20 group-hover:bg-teal-700/40"
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── View All button ── */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/works" className="border border-teal-800/30 text-teal-800 px-8 py-3 rounded-full text-xs font-medium uppercase tracking-[0.15em] hover:bg-teal-700 hover:text-cream-50 hover:border-teal-700 transition-all duration-300 inline-flex items-center gap-2 hover:gap-3">
            View All Projects <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Project Card ── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  /* Parallax tilt on hover */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - centerY) / rect.height) * -8);
    rotateY.set(((e.clientX - centerX) / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="shrink-0 group"
      style={{ width: CARD_W, perspective: 800 }}
      variants={cardVariants}
    >
      <motion.div
        className="relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden h-[520px] flex flex-col shadow-[0_4px_24px_-4px_rgba(15,77,62,0.08)] hover:shadow-[0_20px_60px_-12px_rgba(15,77,62,0.18)] transition-shadow duration-500"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image area */}
        <div className="relative h-[280px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="400px"
          />

          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-medium text-white uppercase tracking-wider">
            {project.category}
          </div>

          {/* Year badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-teal-700/80 backdrop-blur-md rounded-full text-[10px] font-medium text-white tabular-nums">
            {project.year}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 p-6">
          {/* Accent bar — expands on hover */}
          <motion.div
            className="h-[3px] bg-teal-700 rounded-full mb-5"
            animate={{ width: hovered ? 80 : 48 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <h3 className="font-display text-xl font-semibold text-teal-800 leading-tight mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-teal-800/50 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View link */}
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-teal-700 cursor-pointer"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            VIEW PROJECT
            <motion.span
              animate={{ x: hovered ? 4 : 0, y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
