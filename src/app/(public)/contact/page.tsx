"use client";

import { useRef, useState, useEffect, useTransition } from "react";
import { submitContact } from "@/lib/supabase/actions";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowUpLeft,
  Send,
  CheckCircle,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

/* ═══════════════════════════════════════════════════
   ROTATING CIRCULAR TEXT BADGE
═══════════════════════════════════════════════════ */
function RotatingBadge() {
  const text = "GET IN TOUCH \u2022 LET'S TALK \u2022 SAY HELLO \u2022 ";
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="fill-cream-300/60 text-[1.1rem] uppercase tracking-[0.35em] font-display">
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>
      </motion.div>
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-lime flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-teal-900" />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ANIMATED INPUT WITH FLOATING LABEL + UNDERLINE
═══════════════════════════════════════════════════ */
function AnimatedInput({
  label,
  name,
  type = "text",
  isTextarea = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  isTextarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const baseClass =
    "w-full bg-transparent border-b border-cream-500/30 pb-3 pt-7 text-cream-100 text-sm md:text-base outline-none transition-colors duration-300 placeholder-transparent";

  return (
    <div className="relative group">
      {/* Label */}
      <motion.label
        htmlFor={name}
        className="absolute left-0 text-cream-400/70 uppercase tracking-[0.12em] text-[0.6rem] md:text-[0.65rem] pointer-events-none origin-left font-medium"
        animate={{
          y: isActive ? 0 : 22,
          scale: isActive ? 1 : 1.05,
          opacity: isActive ? 1 : 0.55,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.label>

      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          className={`${baseClass} resize-none`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={baseClass}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      )}

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-lime w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BUDGET PILL SELECTOR
═══════════════════════════════════════════════════ */
function BudgetPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      className={`px-5 py-2.5 rounded-full text-[0.6rem] uppercase tracking-[0.12em] font-medium border transition-all duration-300 cursor-pointer ${
        selected
          ? "bg-lime text-teal-900 border-lime"
          : "bg-transparent text-cream-300/65 border-cream-500/25 hover:border-cream-400/40 hover:text-cream-200"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {label}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════
   MAGNETIC BUTTON (follows cursor slightly)
═══════════════════════════════════════════════════ */
function MagneticButton({
  children,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className="relative inline-flex items-center gap-3 bg-lime text-teal-900 px-8 md:px-10 py-4 md:py-5 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.15em] overflow-hidden group disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover fill */}
      <span className="absolute inset-0 bg-teal-700 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
      <span className="relative z-10 flex items-center gap-3 group-hover:text-lime transition-colors duration-300">
        {children}
      </span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════
   COPY-TO-CLIPBOARD EMAIL BUTTON
═══════════════════════════════════════════════════ */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 text-cream-300/60 hover:text-lime transition-colors duration-300 cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-lime"
          >
            <Check className="w-3.5 h-3.5" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="text-[0.6rem] uppercase tracking-[0.15em] font-medium">
        {copied ? "Copied!" : "Copy email"}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   STAGGERED LETTER REVEAL
═══════════════════════════════════════════════════ */
function AnimatedHeading({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={char === " " ? "w-[0.25em]" : ""}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   INTERACTIVE TIME DISPLAY
═══════════════════════════════════════════════════ */
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Amsterdam",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
      <span className="text-cream-300/40 text-[0.6rem] uppercase tracking-[0.15em]">
        Eindhoven {time}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CONTACT PAGE
═══════════════════════════════════════════════════ */
const budgetOptions = ["< $5k", "$5k – $10k", "$10k – $25k", "$25k+"];
const socials = [
  { name: "Twitter", href: siteConfig.social.twitter },
  { name: "LinkedIn", href: siteConfig.social.linkedin },
  { name: "Instagram", href: siteConfig.social.instagram },
  { name: "Facebook", href: siteConfig.social.facebook },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const updateField = (field: string) => (value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitContact({
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        project_type: form.projectType || undefined,
        budget: budget || undefined,
        message: form.message,
      });
      if (result?.error) {
        setSubmitError(result.error);
      } else {
        setSubmitted(true);
        setForm({ name: "", email: "", company: "", projectType: "", message: "" });
        setBudget(null);
        setTimeout(() => setSubmitted(false), 4000);
      }
    });
  };

  return (
    <div ref={sectionRef} className="relative bg-teal-900 rounded-2xl overflow-hidden min-h-screen">
      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,229,221,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(233,229,221,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Decorative floating rings ── */}
      <motion.div
        className="absolute top-32 right-[8%] w-72 h-72 rounded-full border border-cream-200/[0.04] pointer-events-none"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-48 left-[5%] w-48 h-48 rounded-full border border-lime/[0.04] pointer-events-none"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[60%] right-[20%] w-24 h-24 rounded-full bg-lime/[0.02] pointer-events-none"
        style={{ y: bgY }}
      />

      {/* ═══════════ CONTENT ═══════════ */}
      <div className="relative z-10">
        {/* ── HEADER BAR ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 md:pt-10">
          <div className="flex items-center justify-between">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 border border-cream-300/15 text-cream-200 font-mono text-[0.6rem] tracking-[1.5px] uppercase hover:bg-lime hover:text-teal-900 hover:border-lime transition-all duration-300 rounded-full"
              >
                <ArrowUpLeft className="w-3.5 h-3.5" />
                Back to home
              </Link>
            </motion.div>

            {/* Live clock */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LiveClock />
            </motion.div>
          </div>
        </div>

        {/* ── MARQUEE STRIP ── */}
        <div className="overflow-hidden mt-12 md:mt-16 border-y border-cream-500/[0.06] py-4">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="text-cream-300/15 text-xs md:text-sm font-display uppercase tracking-[0.3em] flex items-center gap-8"
              >
                <span>Available for freelance</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime/30" />
                <span>Open to collaboration</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime/30" />
                <span>Let&apos;s build something great</span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime/30" />
              </span>
            ))}
          </div>
        </div>

        {/* ── HERO TYPOGRAPHY ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            {/* Big heading */}
            <div className="overflow-hidden">
              <motion.p
                className="text-lime text-[0.6rem] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-6 font-medium"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Have a project in mind?
              </motion.p>

              <h1 className="font-display text-cream-50 text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold uppercase leading-[0.82] tracking-tighter">
                <AnimatedHeading text="Let's work" delay={0.15} />
                <br />
                <span className="text-lime">
                  <AnimatedHeading text="together." delay={0.4} />
                </span>
              </h1>
            </div>

            {/* Rotating badge — desktop */}
            <motion.div
              className="hidden lg:block shrink-0 mb-2"
              initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <RotatingBadge />
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            className="text-cream-400/50 text-[0.6rem] md:text-xs leading-relaxed max-w-md uppercase tracking-[0.12em] mt-8 md:mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            I&apos;m always excited to take on new challenges and bring creative
            visions to life. Whether it&apos;s a brand-new project or improving an
            existing one — let&apos;s make it happen.
          </motion.p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            className="w-full h-px bg-cream-500/10 mt-16 md:mt-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ originX: 0 }}
          />
        </div>

        {/* ══════════════════════════════════════
           MAIN GRID: INFO + FORM
        ══════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
            {/* ── LEFT COL: Contact info ── */}
            <motion.div
              className="lg:col-span-4 space-y-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Email block */}
              <div className="space-y-3">
                <p className="text-cream-400/40 text-[0.55rem] uppercase tracking-[0.2em] font-medium">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="block text-cream-100 text-base md:text-lg font-bold tracking-wide hover:text-lime transition-colors duration-300"
                >
                  {siteConfig.email}
                </a>
                <CopyEmail />
              </div>

              {/* Location block */}
              <div className="space-y-3">
                <p className="text-cream-400/40 text-[0.55rem] uppercase tracking-[0.2em] font-medium">
                  Based in
                </p>
                <p className="text-cream-200/80 text-sm font-medium tracking-wide">
                  Eindhoven, The Netherlands
                </p>
                <p className="text-cream-400/40 text-[0.55rem] uppercase tracking-[0.15em]">
                  Open to remote worldwide
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <p className="text-cream-400/40 text-[0.55rem] uppercase tracking-[0.2em] font-medium">
                  Follow me
                </p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      className="px-4 py-2.5 rounded-full border border-cream-500/10 text-cream-300/40 text-[0.55rem] uppercase tracking-[0.15em] hover:border-lime/30 hover:text-lime hover:bg-lime/[0.04] transition-all duration-300"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.07 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      {s.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-lime/10 bg-lime/[0.03]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime" />
                </span>
                <span className="text-lime/80 text-[0.6rem] uppercase tracking-[0.15em] font-medium">
                  Available for new projects
                </span>
              </div>

              {/* Rotating badge — mobile */}
              <motion.div
                className="lg:hidden flex justify-center pt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <RotatingBadge />
              </motion.div>
            </motion.div>

            {/* ── RIGHT COL: Contact form ── */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
            >
              {/* Form card with glass border */}
              <div className="relative rounded-2xl border border-cream-500/[0.12] bg-cream-50/[0.015] p-6 md:p-10 lg:p-12">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-lime/40 to-transparent" />
                  <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-lime/40 to-transparent" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  {/* Form top bar */}
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-cream-400/65 text-[0.55rem] uppercase tracking-[0.2em] font-medium">
                      Project details
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                      <span className="text-lime/60 text-[0.55rem] uppercase tracking-[0.15em]">
                        Secure form
                      </span>
                    </div>
                  </div>

                  {/* Two-column row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                    <AnimatedInput
                      label="Your name"
                      name="name"
                      value={form.name}
                      onChange={updateField("name")}
                    />
                    <AnimatedInput
                      label="Email address"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField("email")}
                    />
                  </div>

                  {/* Single fields */}
                  <AnimatedInput
                    label="Company / Organization"
                    name="company"
                    value={form.company}
                    onChange={updateField("company")}
                  />
                  <AnimatedInput
                    label="Project type (e.g. Web App, Branding, Mobile)"
                    name="projectType"
                    value={form.projectType}
                    onChange={updateField("projectType")}
                  />
                  <AnimatedInput
                    label="Tell me about your project"
                    name="message"
                    isTextarea
                    value={form.message}
                    onChange={updateField("message")}
                  />

                  {/* Budget pills */}
                  <div>
                    <p className="text-cream-400/70 text-[0.6rem] uppercase tracking-[0.12em] mb-4 font-medium">
                      Project budget
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {budgetOptions.map((opt) => (
                        <BudgetPill
                          key={opt}
                          label={opt}
                          selected={budget === opt}
                          onClick={() =>
                            setBudget((prev) => (prev === opt ? null : opt))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          className="flex items-center gap-3 text-lime"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm uppercase tracking-[0.15em] font-medium">
                            Message sent! I&apos;ll be in touch soon.
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <MagneticButton type="submit">
                            <span>Send message</span>
                            <Send className="w-4 h-4" />
                          </MagneticButton>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="text-cream-400/45 text-[0.5rem] uppercase tracking-[0.15em] max-w-[200px]">
                      I typically respond within 24 hours
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM: Large decorative text ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-cream-500/[0.06] text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-bold uppercase leading-[0.82] tracking-tighter select-none pointer-events-none">
              Say hello.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
