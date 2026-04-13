"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      className="mb-12"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--primary)] mb-2 block">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--on-surface)] mb-3 relative inline-block">
        {title}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.2, 0, 0, 1] }}
          style={{ originX: 0 }}
          className="absolute -bottom-1 left-0 h-0.5 w-full bg-[var(--primary)] rounded-full block"
        />
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--on-surface-variant)] max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
