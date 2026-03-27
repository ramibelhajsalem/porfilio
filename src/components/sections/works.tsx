"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { scrollReveal } from "@/lib/utils";
import type { HomeWorksContent, Project } from "@/content/portfolio.types";

const CARD_W = 380;
const CARD_GAP = 24;

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

function getProjectMainImage(project: Project) {
  return project.mainImageUrl || project.images?.[0]?.url || project.imageUrl;
}

export default function Works({
  projects,
  content,
}: {
  projects: Project[];
  content: HomeWorksContent;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 40 });
  const maxDrag = -(projects.length * (CARD_W + CARD_GAP) - CARD_W);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setActiveIndex(clamped);
    x.set(-clamped * (CARD_W + CARD_GAP));
  };

  return (
    <section id="works" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.h2
              className="font-display text-[3rem] font-bold uppercase leading-none tracking-tighter text-teal-700 md:text-[4.5rem] lg:text-[5.5rem]"
              {...scrollReveal}
            >
              {content.title}
            </motion.h2>
            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-teal-800/50 md:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              {content.description}
            </motion.p>
          </div>

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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-700/20 text-teal-700 transition-all duration-300 hover:bg-teal-700 hover:text-cream-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-teal-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-700/20 text-teal-700 transition-all duration-300 hover:bg-teal-700 hover:text-cream-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-teal-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="ml-3 text-xs font-medium tracking-wider text-teal-700/40 tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </motion.div>
        </div>

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
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {projects.map((_, index) => (
            <button key={index} onClick={() => scrollTo(index)} className="group p-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-8 bg-teal-700"
                    : "w-1.5 bg-teal-700/20 group-hover:bg-teal-700/40"
                }`}
              />
            </button>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-2 rounded-full border border-teal-800/30 px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-teal-800 transition-all duration-300 hover:gap-3 hover:border-teal-700 hover:bg-teal-700 hover:text-cream-50"
          >
            {content.viewAllLabel} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set(((event.clientY - centerY) / rect.height) * -8);
    rotateY.set(((event.clientX - centerX) / rect.width) * 8);
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
        className="relative flex h-[520px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(15,77,62,0.08)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-12px_rgba(15,77,62,0.18)]"
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-[280px] overflow-hidden">
          <Image
            src={getProjectMainImage(project)}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute top-4 left-4 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {project.category}
          </div>
          <div className="absolute top-4 right-4 rounded-full bg-teal-700/80 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md tabular-nums">
            {project.year}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <motion.div
            className="mb-5 h-[3px] rounded-full bg-teal-700"
            animate={{ width: hovered ? 80 : 48 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <h3 className="mb-2 font-display text-xl font-semibold leading-tight text-teal-800">
            {project.title}
          </h3>

          <p className="flex-1 text-sm leading-relaxed text-teal-800/50">
            {project.description}
          </p>

          <div className="mt-4 mb-4 flex flex-wrap gap-1.5">
            {(project.themes?.length ? project.themes : project.tags).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-medium text-teal-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link href={project.projectUrl} target="_blank" rel="noreferrer">
            <motion.div
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-teal-700"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              VIEW PROJECT
              <motion.span
                animate={{ x: hovered ? 4 : 0, y: hovered ? -2 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
