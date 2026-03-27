"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  CheckCircle,
  Copy,
  Send,
} from "lucide-react";
import Link from "next/link";
import { portfolio } from "@/content/portfolio";

const profile = portfolio.profile;
const contactPage = portfolio.pages.contact;

function RotatingBadge({ words }: { words: string[] }) {
  const text = `${words.join(" • ")} • `;

  return (
    <div className="relative h-32 w-32 md:h-40 md:w-40">
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id="circlePath"
              d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="fill-cream-300/60 font-display text-[1.1rem] uppercase tracking-[0.35em]">
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-lime md:h-16 md:w-16"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpRight className="h-5 w-5 text-teal-900 md:h-6 md:w-6" />
        </motion.div>
      </div>
    </div>
  );
}

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
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const baseClass =
    "w-full border-b border-cream-500/30 bg-transparent pt-7 pb-3 text-sm text-cream-100 outline-none transition-colors duration-300 placeholder-transparent md:text-base";

  return (
    <div className="group relative">
      <motion.label
        htmlFor={name}
        className="pointer-events-none absolute left-0 origin-left text-[0.6rem] font-medium uppercase tracking-[0.12em] text-cream-400/70 md:text-[0.65rem]"
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
          onChange={(event) => onChange(event.target.value)}
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
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      )}

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-lime"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

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
      className={`cursor-pointer rounded-full border px-5 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
        selected
          ? "border-lime bg-lime text-teal-900"
          : "border-cream-500/25 bg-transparent text-cream-300/65 hover:border-cream-400/40 hover:text-cream-200"
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {label}
    </motion.button>
  );
}

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

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((event.clientX - cx) * 0.25);
    y.set((event.clientY - cy) * 0.25);
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
      className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-lime px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-teal-900 disabled:pointer-events-none disabled:opacity-40 md:px-10 md:py-5 md:text-sm"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 origin-center scale-0 rounded-full bg-teal-700 transition-transform duration-500 ease-out group-hover:scale-100" />
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-lime">
        {children}
      </span>
    </motion.button>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.contact.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex cursor-pointer items-center gap-2 text-cream-300/60 transition-colors duration-300 hover:text-lime"
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
            <Check className="h-3.5 w-3.5" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Copy className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="text-[0.6rem] font-medium uppercase tracking-[0.15em]">
        {copied ? contactPage.copiedEmailLabel : contactPage.copyEmailLabel}
      </span>
    </button>
  );
}

function LiveClock({ timezone, location }: { timezone: string; location: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone,
          hour12: false,
        })
      );
    };
    update();
    const id = window.setInterval(update, 10000);
    return () => window.clearInterval(id);
  }, [timezone]);

  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
      <span className="text-[0.6rem] uppercase tracking-[0.15em] text-cream-300/40">
        {location} {time}
      </span>
    </div>
  );
}

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
  const [isPending, setIsPending] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const socials = useMemo(() => profile.socials.filter((item) => item.isActive), []);

  const updateField =
    (field: keyof typeof form) =>
    (value: string) =>
      setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);

    const subject = `${contactPage.form.subjectPrefix}: ${
      form.projectType || form.name || "New inquiry"
    }`;

    const lines = [
      `${contactPage.form.nameLabel}: ${form.name || "-"}`,
      `${contactPage.form.emailLabel}: ${form.email || "-"}`,
      `${contactPage.form.companyLabel}: ${form.company || "-"}`,
      `${contactPage.form.projectTypeLabel}: ${form.projectType || "-"}`,
      `${contactPage.form.budgetLabel}: ${budget || "-"}`,
      "",
      `${contactPage.form.messageLabel}:`,
      form.message || "-",
    ];

    window.location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: "",
    });
    setBudget(null);
    window.setTimeout(() => {
      setSubmitted(false);
      setIsPending(false);
    }, 2500);
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden rounded-2xl bg-teal-900"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,229,221,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(233,229,221,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

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
                {contactPage.backToHomeLabel}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LiveClock
                timezone={profile.contact.location.timezone}
                location={profile.contact.location.label}
              />
            </motion.div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden border-y border-cream-500/[0.06] py-4 md:mt-16">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className="flex items-center gap-8 font-display text-xs uppercase tracking-[0.3em] text-cream-300/15 md:text-sm"
              >
                {contactPage.marqueeItems.map((item) => (
                  <span key={`${index}-${item}`} className="flex items-center gap-8">
                    <span>{item}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-lime/30" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="overflow-hidden">
              <motion.p
                className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-lime md:mb-6 md:text-xs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {contactPage.eyebrow}
              </motion.p>

              <h1 className="font-display text-[2.8rem] font-bold uppercase leading-[0.82] tracking-tighter text-cream-50 sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem]">
                {contactPage.headingLine1}
                <br />
                <span className="text-lime">{contactPage.headingLine2}</span>
              </h1>
            </div>

            <motion.div
              className="hidden shrink-0 lg:block lg:pb-2"
              initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <RotatingBadge words={contactPage.rotatingBadgeWords} />
            </motion.div>
          </div>

          <motion.p
            className="mt-8 max-w-md text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-cream-400/50 md:mt-10 md:text-xs"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {contactPage.description}
          </motion.p>
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            className="mt-16 h-px w-full bg-cream-500/10 md:mt-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ originX: 0 }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
            <motion.div
              className="space-y-10 lg:col-span-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="space-y-3">
                <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-cream-400/40">
                  {contactPage.emailLabel}
                </p>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="block text-base font-bold tracking-wide text-cream-100 transition-colors duration-300 hover:text-lime md:text-lg"
                >
                  {profile.contact.email}
                </a>
                <CopyEmail />
              </div>

              <div className="space-y-3">
                <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-cream-400/40">
                  {contactPage.locationLabel}
                </p>
                <p className="text-sm font-medium tracking-wide text-cream-200/80">
                  {profile.contact.location.label}
                </p>
                <p className="text-[0.55rem] uppercase tracking-[0.15em] text-cream-400/40">
                  {profile.contact.location.detail}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-cream-400/40">
                  {contactPage.followLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {socials.map((social, index) => (
                    <motion.a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-cream-500/10 px-4 py-2.5 text-[0.55rem] uppercase tracking-[0.15em] text-cream-300/40 transition-all duration-300 hover:border-lime/30 hover:bg-lime/[0.04] hover:text-lime"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.07 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      {social.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-lime/10 bg-lime/[0.03] px-4 py-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
                </span>
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.15em] text-lime/80">
                  {contactPage.availabilityText}
                </span>
              </div>

              <motion.div
                className="flex justify-center pt-4 lg:hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <RotatingBadge words={contactPage.rotatingBadgeWords} />
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl border border-cream-500/[0.12] bg-cream-50/[0.015] p-6 md:p-10 lg:p-12">
                <div className="absolute top-0 right-0 h-20 w-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 h-12 w-[1px] bg-gradient-to-b from-lime/40 to-transparent" />
                  <div className="absolute top-0 right-0 h-[1px] w-12 bg-gradient-to-l from-lime/40 to-transparent" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-cream-400/65">
                      {contactPage.projectDetailsLabel}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                      <span className="text-[0.55rem] uppercase tracking-[0.15em] text-lime/60">
                        {contactPage.secureFormLabel}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
                    <AnimatedInput
                      label={contactPage.form.nameLabel}
                      name="name"
                      value={form.name}
                      onChange={updateField("name")}
                    />
                    <AnimatedInput
                      label={contactPage.form.emailLabel}
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField("email")}
                    />
                  </div>

                  <AnimatedInput
                    label={contactPage.form.companyLabel}
                    name="company"
                    value={form.company}
                    onChange={updateField("company")}
                  />
                  <AnimatedInput
                    label={contactPage.form.projectTypeLabel}
                    name="projectType"
                    value={form.projectType}
                    onChange={updateField("projectType")}
                  />
                  <AnimatedInput
                    label={contactPage.form.messageLabel}
                    name="message"
                    isTextarea
                    value={form.message}
                    onChange={updateField("message")}
                  />

                  <div>
                    <p className="mb-4 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-cream-400/70">
                      {contactPage.form.budgetLabel}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {contactPage.form.budgetOptions.map((option) => (
                        <BudgetPill
                          key={option}
                          label={option}
                          selected={budget === option}
                          onClick={() =>
                            setBudget((current) => (current === option ? null : option))
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 pt-4 sm:flex-row sm:items-center">
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          className="flex items-center gap-3 text-lime"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium uppercase tracking-[0.15em]">
                            {contactPage.form.successMessage}
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <MagneticButton type="submit" disabled={isPending}>
                            <span>
                              {isPending ? contactPage.form.sendingLabel : contactPage.form.submitLabel}
                            </span>
                            <Send className="h-4 w-4" />
                          </MagneticButton>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="max-w-[220px] text-[0.5rem] uppercase tracking-[0.15em] text-cream-400/45">
                      {contactPage.responseTimeText}
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="pointer-events-none select-none font-display text-[3rem] font-bold uppercase leading-[0.82] tracking-tighter text-cream-500/[0.06] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]">
              {contactPage.closingLabel}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
