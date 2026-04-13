"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { TECH_ICONS } from "@/lib/tech-icons";

const COLOR_MAP = {
  primary: {
    icon: "bg-[var(--primary-container)] text-[var(--on-primary-container)]",
    title: "text-[var(--primary)]",
    chip: "border-[var(--primary)]/30 text-[var(--primary)]",
    iconColor: "text-[var(--primary)]",
  },
  secondary: {
    icon: "bg-[var(--secondary-container)] text-[var(--on-secondary-container)]",
    title: "text-[var(--secondary)]",
    chip: "border-[var(--secondary)]/30 text-[var(--secondary)]",
    iconColor: "text-[var(--secondary)]",
  },
  tertiary: {
    icon: "bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)]",
    title: "text-[var(--tertiary)]",
    chip: "border-[var(--tertiary)]/30 text-[var(--tertiary)]",
    iconColor: "text-[var(--tertiary)]",
  },
};

function SkillChip({ skill, colorKey }: { skill: string; colorKey: keyof typeof COLOR_MAP }) {
  const Icon = TECH_ICONS[skill];
  const colors = COLOR_MAP[colorKey];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:border-[var(--outline)] transition-colors`}>
      {Icon && <Icon className={`w-3 h-3 shrink-0 ${colors.iconColor}`} />}
      {skill}
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="bg-[var(--surface-container-low)] py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader
          label="Skills"
          title="What I Work With"
          description="Grouped by domain — not a meaningless progress-bar in sight."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skillGroups.map((group, i) => {
            const colors = COLOR_MAP[group.color];
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-[var(--surface-container)] rounded-[20px] p-6 border border-[var(--outline-variant)] hover:border-[var(--outline)] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${colors.icon}`}>
                    {group.icon}
                  </span>
                  <h3 className={`text-sm font-semibold ${colors.title}`}>{group.label}</h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
                      }}
                    >
                      <SkillChip skill={skill} colorKey={group.color} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
