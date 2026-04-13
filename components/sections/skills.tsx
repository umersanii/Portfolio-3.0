"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { TECH_ICONS, TECH_DESCRIPTIONS } from "@/lib/tech-icons";

const COLOR_MAP = {
  primary: {
    iconBg: "bg-[var(--primary-container)] text-[var(--on-primary-container)]",
    label:  "text-[var(--primary)]",
    badge:  "bg-[var(--primary-container)] text-[var(--primary)]",
    ring:   "ring-[var(--primary)]/60",
    dot:    "bg-[var(--primary)]",
  },
  secondary: {
    iconBg: "bg-[var(--secondary-container)] text-[var(--on-secondary-container)]",
    label:  "text-[var(--secondary)]",
    badge:  "bg-[var(--secondary-container)] text-[var(--secondary)]",
    ring:   "ring-[var(--secondary)]/60",
    dot:    "bg-[var(--secondary)]",
  },
  tertiary: {
    iconBg: "bg-[var(--tertiary-container)] text-[var(--on-tertiary-container)]",
    label:  "text-[var(--tertiary)]",
    badge:  "bg-[var(--tertiary-container)] text-[var(--tertiary)]",
    ring:   "ring-[var(--tertiary)]/60",
    dot:    "bg-[var(--tertiary)]",
  },
  neutral: {
    iconBg: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    label:  "text-amber-700 dark:text-amber-400",
    badge:  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    ring:   "ring-amber-400/60",
    dot:    "bg-amber-500",
  },
};


// Build flat list of all skills with their group metadata
const allSkills = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({
    skill,
    groupId:    group.id,
    groupLabel: group.label,
    groupIcon:  group.icon,
    color:      group.color as keyof typeof COLOR_MAP,
  }))
);

type HoveredSkill = (typeof allSkills)[number] | null;

function SkillIcon({
  entry,
  hovered,
  onHover,
}: {
  entry: (typeof allSkills)[number];
  hovered: HoveredSkill;
  onHover: (s: HoveredSkill) => void;
}) {
  const Icon   = TECH_ICONS[entry.skill];
  const colors = COLOR_MAP[entry.color];

  const isThis     = hovered?.skill === entry.skill && hovered?.groupId === entry.groupId;
  const anyHovered = hovered !== null;

  const scale   = isThis ? 1.45 : anyHovered ? 0.82 : 1;
  const opacity = !anyHovered ? 1 : isThis ? 1 : 0.45;

  return (
    <motion.div
      animate={{ scale, opacity }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      onHoverStart={() => onHover(entry)}
      onHoverEnd={() => onHover(null)}
      className={`
        shrink-0 rounded-2xl flex items-center justify-center cursor-pointer
        ${colors.iconBg}
        ${isThis ? `ring-2 ${colors.ring}` : ""}
      `}
      style={{
        width:  "52px",
        height: "52px",
      }}
    >
      {Icon ? (
        <Icon className="w-[22px] h-[22px]" />
      ) : (
        <span className="text-[10px] font-bold leading-none text-center px-1">
          {entry.skill.slice(0, 3)}
        </span>
      )}
    </motion.div>
  );
}

export function Skills() {
  const [hovered, setHovered] = useState<HoveredSkill>(null);

  const hoveredIcon   = hovered ? TECH_ICONS[hovered.skill]   : null;
  const hoveredDesc   = hovered ? TECH_DESCRIPTIONS[hovered.skill] : null;
  const hoveredColors = hovered ? COLOR_MAP[hovered.color] : null;

  return (
    <section id="skills" className="bg-[var(--surface-container-low)] py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader
          label="Skills"
          title="What I Work With"
          description="Grouped by domain — not a meaningless progress-bar in sight."
        />

        {/* Legend */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
          {skillGroups.map((g) => {
            const c = COLOR_MAP[g.color as keyof typeof COLOR_MAP];
            return (
              <div key={g.id} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                <span className="text-xs text-[var(--on-surface-variant)]">{g.label}</span>
              </div>
            );
          })}
        </div>

        {/* Single linear row — horizontally scrollable, all icons at same height */}
        <div
          className="overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-nowrap items-center gap-3 py-3" style={{ width: "max-content" }}>
            {allSkills.map((entry) => (
              <SkillIcon
                key={`${entry.groupId}-${entry.skill}`}
                entry={entry}
                hovered={hovered}
                onHover={setHovered}
              />
            ))}
          </div>
        </div>

        {/* Center info panel */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-sm min-h-[96px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key={hovered.skill}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-4 bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-2xl px-5 py-4 shadow-sm w-full"
                >
                  {/* Big icon */}
                  {hoveredIcon && (
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${hoveredColors!.iconBg}`}>
                      {(() => {
                        const HovIcon = hoveredIcon;
                        return <HovIcon className="w-7 h-7" />;
                      })()}
                    </div>
                  )}

                  <div className="min-w-0">
                    {/* Category badge */}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full mb-1 ${hoveredColors!.badge}`}>
                      <span>{hovered.groupIcon}</span>
                      {hovered.groupLabel}
                    </span>

                    {/* Skill name */}
                    <div className={`text-base font-semibold leading-tight ${hoveredColors!.label}`}>
                      {hovered.skill}
                    </div>

                    {/* Description */}
                    {hoveredDesc && (
                      <div className="text-xs text-[var(--on-surface-variant)] mt-0.5">
                        {hoveredDesc}
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-[var(--on-surface-variant)] text-center"
                >
                  hover a skill to explore
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
