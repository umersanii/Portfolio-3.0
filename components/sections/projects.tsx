"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { Chip } from "@/components/ui/chip";
import { MdButton } from "@/components/ui/md-button";
import { TECH_ICONS } from "@/lib/tech-icons";

const FILTERS: Array<"All" | ProjectCategory> = ["All", "Web", "Mobile", "Robotics"];
const INITIAL_SHOW = 6;

const CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  Web:      "border-t-[var(--primary)]",
  Mobile:   "border-t-[var(--secondary)]",
  Robotics: "border-t-[var(--tertiary)]",
};

const CATEGORY_LABEL_COLOR: Record<ProjectCategory, string> = {
  Web:      "text-[var(--primary)]",
  Mobile:   "text-[var(--secondary)]",
  Robotics: "text-[var(--tertiary)]",
};

const CATEGORY_GRADIENT: Record<ProjectCategory, string> = {
  Web:      "from-[var(--primary-container)] to-[var(--surface-container-high)]",
  Mobile:   "from-[var(--secondary-container)] to-[var(--surface-container-high)]",
  Robotics: "from-[var(--tertiary-container)] to-[var(--surface-container-high)]",
};

// Returns a short label for professional/client project types, or null for personal/hobby
function projectTypeLabel(subtitle: string): string | null {
  if (/client project/i.test(subtitle)) return "Client";
  if (/final year/i.test(subtitle))     return "FYP";
  if (/freelance/i.test(subtitle))      return "Freelance";
  return null;
}

function TechTag({ tag }: { tag: string }) {
  const Icon = TECH_ICONS[tag];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium rounded border border-[var(--outline-variant)] text-[var(--on-surface-variant)] bg-[var(--surface)]">
      {Icon && <Icon className="w-2.5 h-2.5 shrink-0" />}
      {tag}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primaryLink = project.live ?? project.github;
  const typeLabel = projectTypeLabel(project.subtitle);
  // Show project-type badge if available, else fall back to category
  const topBadge = typeLabel ?? project.category;
  const topBadgeColor = typeLabel ? "text-[var(--on-surface-variant)]" : CATEGORY_LABEL_COLOR[project.category];
  // Trim subtitle to first descriptor only (before " · ")
  const shortSubtitle = project.subtitle.split(" · ")[0];

  function handleClick() {
    if (primaryLink) window.open(primaryLink, "_blank", "noopener,noreferrer");
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: "easeOut" as const }}
      onClick={handleClick}
      className={`
        group relative flex flex-col h-full cursor-pointer
        rounded-[4px] overflow-hidden
        border border-[var(--outline-variant)] border-t-2
        ${CATEGORY_ACCENT[project.category]}
        bg-[var(--surface-container)]
        hover:bg-[var(--surface-container-high)]
        hover:border-[var(--outline)]
        hover:border-t-2
        transition-colors duration-200
      `}
    >
      {/* Project image / placeholder */}
      <div className="relative w-full aspect-video overflow-hidden bg-[var(--surface-container-high)] shrink-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_GRADIENT[project.category]}`} />
        )}
        {/* Single top-left badge */}
        <span className={`absolute top-2 left-2 text-[9px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[var(--surface)]/80 backdrop-blur-sm ${topBadgeColor}`}>
          {topBadge}
        </span>
        <span className="absolute top-2 right-2 text-[9px] font-mono text-[var(--on-surface-variant)] opacity-50 select-none px-1 bg-[var(--surface)]/60 rounded">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-5 pt-3 pb-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight text-[var(--on-surface)] leading-snug">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--on-surface-variant)] mt-0.5 font-mono">{shortSubtitle}</p>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 text-xs text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors px-1.5 py-0.5 rounded"
            >
              GH ↗
            </a>
          )}
        </div>

        <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack tags with icons */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TechTag key={tag} tag={tag} />
          ))}
        </div>

        {primaryLink && (
          <p className="text-[10px] font-mono text-[var(--on-surface-variant)] opacity-40 mt-auto">
            click to open ↗
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hasMore = filtered.length > INITIAL_SHOW && !showAll;

  return (
    <section id="projects" className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
      <SectionHeader
        label="Work"
        title="Projects"
        description="Things I've built — hardware, software, and everything in between."
      />

      {/* Filter chips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            variant="filter"
            active={activeFilter === f}
            onClick={() => { setActiveFilter(f); setShowAll(false); }}
          />
        ))}
        <span className="ml-2 text-xs font-mono text-[var(--on-surface-variant)] self-center opacity-60">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeFilter}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--outline-variant)]"
        >
          {visible.map((p, i) => (
            <div key={p.id} className="bg-[var(--surface)] h-full">
              <ProjectCard project={p} index={i} />
            </div>
          ))}

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-sm text-[var(--on-surface-variant)] py-16"
            >
              No projects in this category yet.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-8"
        >
          <MdButton variant="tonal" onClick={() => setShowAll(true)}>
            Show all {filtered.length} projects
          </MdButton>
        </motion.div>
      )}
      {showAll && filtered.length > INITIAL_SHOW && (
        <div className="flex justify-center mt-8">
          <MdButton variant="text" onClick={() => setShowAll(false)}>
            Show less ↑
          </MdButton>
        </div>
      )}
    </section>
  );
}
