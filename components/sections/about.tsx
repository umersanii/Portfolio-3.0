"use client";

import { motion } from "framer-motion";
import { about } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

interface AboutCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  index: number;
  accent?: "primary" | "secondary" | "tertiary";
}

function AboutCard({ icon, title, children, index, accent = "primary" }: AboutCardProps) {
  const iconBg = {
    primary:   "bg-[var(--primary-container)]   text-[var(--on-primary-container)]",
    secondary: "bg-[var(--secondary-container)] text-[var(--on-secondary-container)]",
    tertiary:  "bg-[var(--tertiary-container)]  text-[var(--on-tertiary-container)]",
  }[accent];

  return (
    <motion.div
      variants={CARD_VARIANTS}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-[var(--surface-container)] rounded-[20px] p-6 flex flex-col gap-4 border border-[var(--outline-variant)] hover:border-[var(--primary)] hover:bg-[var(--surface-container-high)] transition-colors duration-300"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-sm font-semibold tracking-wide text-[var(--on-surface-variant)] uppercase">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
      <SectionHeader label="About" title="A Bit More Context" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 — The story */}
        <AboutCard icon="↗" title={about.story.title} index={0} accent="primary">
          <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
            {about.story.body}
          </p>
        </AboutCard>

        {/* Card 2 — Numbers */}
        <AboutCard icon="⚡" title={about.numbers.title} index={1} accent="secondary">
          <div className="flex flex-col gap-3">
            {about.numbers.stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--primary)]">{s.value}</span>
                <span className="text-xs text-[var(--on-surface-variant)]">{s.label}</span>
              </div>
            ))}
            <p className="text-xs text-[var(--on-surface-variant)] mt-1 italic">
              {about.numbers.footnote}
            </p>
          </div>
        </AboutCard>

        {/* Card 3 — Seeking */}
        <AboutCard icon="📍" title={about.seeking.title} index={2} accent="tertiary">
          <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
            {about.seeking.body}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
            Open to internships &amp; part-time
          </span>
        </AboutCard>
      </div>
    </section>
  );
}
