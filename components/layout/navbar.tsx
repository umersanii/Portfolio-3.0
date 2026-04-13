"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const THEME_CYCLE: Array<{ key: string; icon: string; label: string }> = [
  { key: "light", icon: "☀", label: "Light"      },
  { key: "dark",  icon: "☾", label: "Dark"       },
  { key: "gold",  icon: "✦", label: "Gold"       },
  { key: "noir",  icon: "◈", label: "Noir (Black & Gold)" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  const currentIndex = THEME_CYCLE.findIndex((t) => t.key === theme) ?? 0;
  const current = THEME_CYCLE[currentIndex] ?? THEME_CYCLE[0];
  const next = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];

  return (
    <button
      onClick={() => setTheme(next.key)}
      aria-label={`Switch to ${next.label} theme`}
      title={`Switch to ${next.label}`}
      className="ripple w-10 h-10 rounded-full flex items-center justify-center text-[var(--on-surface-variant)] hover:bg-[var(--surface-variant)] transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.key}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          className="text-lg leading-none"
        >
          {current.icon}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px 0px 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--surface-container)] shadow-sm backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-sm font-semibold tracking-tight text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors"
          >
            umer<span className="text-[var(--primary)]">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                    isActive
                      ? "text-[var(--on-secondary-container)] bg-[var(--secondary-container)]"
                      : "text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] hover:bg-[var(--surface-variant)]"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile menu trigger */}
            <button
              className="md:hidden ripple w-10 h-10 rounded-full flex items-center justify-center text-[var(--on-surface-variant)] hover:bg-[var(--surface-variant)]"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Open menu"
            >
              <span className="text-lg">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-[var(--surface-container-high)] border-b border-[var(--outline-variant)] px-5 py-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl text-[var(--on-surface)] hover:bg-[var(--surface-variant)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
