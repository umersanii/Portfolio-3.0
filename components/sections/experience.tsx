"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences, type Experience } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { Chip } from "@/components/ui/chip";

const TYPE_ICON: Record<Experience["type"], string> = {
  work:      "💼",
  education: "🎓",
  project:   "⚙",
};

const TYPE_LEFT_BORDER: Record<Experience["type"], string> = {
  work:      "border-l-[var(--primary)]",
  education: "border-l-[var(--secondary)]",
  project:   "border-l-[var(--tertiary)]",
};

function ContentCard({ exp }: { exp: Experience }) {
  return (
    <div
      className={`
        w-full rounded-[14px] p-4 border border-[var(--outline-variant)] border-l-4 transition-colors duration-300
        ${TYPE_LEFT_BORDER[exp.type]}
        ${exp.current
          ? "bg-[var(--primary-container)]"
          : "bg-[var(--surface-container)]"}
      `}
    >
      <div className="mb-2">
        <h3 className="text-[13px] font-semibold text-[var(--on-surface)] leading-snug">{exp.title}</h3>
        <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">{exp.org}</p>
      </div>

      <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed mb-3">
        {exp.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {exp.tags.map((tag) => (
          <Chip key={tag} label={tag} variant="assist" />
        ))}
        {exp.current && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
            Active
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Desktop alternating timeline.
 * Layout: [card-or-date | spine | date-or-card]
 *
 * isLeft  → card in LEFT col,  date label in RIGHT col (at node level)
 * isRight → date label in LEFT col (at node level), card in RIGHT col
 */
function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  const dateLabel = (
    <p className="text-[10px] font-mono text-[var(--on-surface-variant)] opacity-60 whitespace-nowrap">
      {exp.period}
    </p>
  );

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_64px_1fr] items-start">

      {/* ── LEFT column ─────────────────────────────── */}
      <div className={`pb-12 flex ${isLeft ? "justify-end pr-0" : "justify-end items-center pr-4 pt-[22px]"}`}>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, delay: index * 0.08 + 0.05, ease: [0.2, 0, 0, 1] }}
            className="w-full max-w-[300px]"
          >
            <ContentCard exp={exp} />
          </motion.div>
        ) : (
          /* date label on the empty (left) side, aligned to node row */
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
          >
            {dateLabel}
          </motion.div>
        )}
      </div>

      {/* ── CENTER spine ────────────────────────────── */}
      <div className="flex flex-col items-center">
        {/* Connector line (left or right) + node */}
        <div className="relative flex items-center w-full pt-5">
          {/* left half-connector — shown when card is on left */}
          <div className={`flex-1 h-px transition-opacity ${isLeft ? "bg-[var(--outline-variant)]" : "opacity-0"}`} />

          {/* node */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08, ease: [0.2, 0, 0, 1] }}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center text-sm z-10 shrink-0 border-2
              ${exp.current
                ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-md border-[var(--primary)]"
                : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]"}
            `}
          >
            {TYPE_ICON[exp.type]}
          </motion.div>

          {/* right half-connector — shown when card is on right */}
          <div className={`flex-1 h-px transition-opacity ${!isLeft ? "bg-[var(--outline-variant)]" : "opacity-0"}`} />
        </div>

        {/* vertical spine segment to next item */}
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.2, ease: [0.2, 0, 0, 1] }}
            style={{ originY: 0 }}
            className="w-px flex-1 min-h-[80px] mt-1 bg-[var(--outline-variant)]"
          />
        )}
      </div>

      {/* ── RIGHT column ────────────────────────────── */}
      <div className={`pb-12 flex ${!isLeft ? "justify-start pl-0" : "justify-start items-center pl-4 pt-[22px]"}`}>
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.45, delay: index * 0.08 + 0.05, ease: [0.2, 0, 0, 1] }}
            className="w-full max-w-[300px]"
          >
            <ContentCard exp={exp} />
          </motion.div>
        ) : (
          /* date label on the empty (right) side, aligned to node row */
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
          >
            {dateLabel}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* Mobile: single left-side spine */
function TimelineItemMobile({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-3">
      <div className="flex flex-col items-center shrink-0 w-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08, ease: [0.2, 0, 0, 1] }}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 shrink-0 border-2
            ${exp.current
              ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-md border-[var(--primary)]"
              : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border-[var(--outline-variant)]"}
          `}
        >
          {TYPE_ICON[exp.type]}
        </motion.div>
        {index < experiences.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.2, ease: [0.2, 0, 0, 1] }}
            style={{ originY: 0 }}
            className="w-px flex-1 mt-2 bg-[var(--outline-variant)]"
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{ duration: 0.4, delay: index * 0.08 + 0.05, ease: [0.2, 0, 0, 1] }}
        className="flex-1 pb-8"
      >
        <p className="text-[10px] font-mono text-[var(--on-surface-variant)] opacity-60 mb-1.5">
          {exp.period}
        </p>
        <ContentCard exp={exp} />
      </motion.div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
      <SectionHeader
        label="Experience"
        title="The Journey"
        description="Thin in years, dense in quality."
      />

      <div className="hidden md:block mt-8">
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.id} exp={exp} index={i} />
        ))}
      </div>

      <div className="flex flex-col gap-0 md:hidden mt-6">
        {experiences.map((exp, i) => (
          <TimelineItemMobile key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
