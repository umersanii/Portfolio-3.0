"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { MdButton } from "@/components/ui/md-button";

const SOCIALS = [
  {
    label: "GitHub",
    handle: "umersanii",
    href: personal.github,
    icon: "⬡",
    description: "See the code",
  },
  {
    label: "LinkedIn",
    handle: "muhammad-umer",
    href: personal.linkedin,
    icon: "in",
    description: "Connect professionally",
  },
  {
    label: "Email",
    handle: "iamumersani@gmail.com",
    href: `mailto:${personal.email}`,
    icon: "@",
    description: "Direct line",
  },
];

type FormState = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Replace with your actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setState("sent");
  };

  return (
    <section id="contact" className="bg-[var(--surface-container-low)] py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <SectionHeader
          label="Contact"
          title="Let's Build Something"
          description="Open to internships, freelance projects, and interesting conversations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Social cards */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--on-surface-variant)] mb-2">Find me on</p>
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="group flex items-center gap-4 p-4 rounded-[16px] bg-[var(--surface-container)] border border-[var(--outline-variant)] hover:border-[var(--primary)] hover:bg-[var(--surface-container-high)] transition-all duration-200 no-underline"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary-container)] text-[var(--on-primary-container)] flex items-center justify-center text-lg font-bold shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--on-surface)]">{s.label}</p>
                  <p className="text-xs text-[var(--on-surface-variant)] truncate">{s.handle}</p>
                </div>
                <span className="text-xs text-[var(--on-surface-variant)] group-hover:text-[var(--primary)] transition-colors shrink-0">
                  {s.description} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          >
            {state === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center gap-4 p-8 rounded-[20px] bg-[var(--surface-container)] border border-[var(--outline-variant)] text-center"
              >
                <span className="text-5xl">✓</span>
                <h3 className="text-lg font-semibold text-[var(--on-surface)]">Message sent!</h3>
                <p className="text-sm text-[var(--on-surface-variant)]">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <MdButton variant="tonal" onClick={() => { setForm({ name: "", email: "", message: "" }); setState("idle"); }}>
                  Send another
                </MdButton>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-6 rounded-[20px] bg-[var(--surface-container)] border border-[var(--outline-variant)]"
              >
                <p className="text-sm font-medium text-[var(--on-surface)]">Or send a message directly</p>

                {/* Name field */}
                <div className="relative">
                  <input
                    required
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-[12px] border border-[var(--outline-variant)] bg-[var(--surface-container-high)] px-4 pt-5 pb-2 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder-transparent"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute left-4 top-3.5 text-xs text-[var(--on-surface-variant)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--primary)] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs"
                  >
                    Name
                  </label>
                </div>

                {/* Email field */}
                <div className="relative">
                  <input
                    required
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-[12px] border border-[var(--outline-variant)] bg-[var(--surface-container-high)] px-4 pt-5 pb-2 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder-transparent"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute left-4 top-3.5 text-xs text-[var(--on-surface-variant)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--primary)] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs"
                  >
                    Email
                  </label>
                </div>

                {/* Message field */}
                <div className="relative">
                  <textarea
                    required
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-[12px] border border-[var(--outline-variant)] bg-[var(--surface-container-high)] px-4 pt-5 pb-2 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder-transparent resize-none"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-4 top-3.5 text-xs text-[var(--on-surface-variant)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[var(--primary)] peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs"
                  >
                    Message
                  </label>
                </div>

                <MdButton
                  variant="fab"
                  disabled={state === "sending"}
                  className="self-end"
                  icon={<span>{state === "sending" ? "⟳" : "→"}</span>}
                >
                  {state === "sending" ? "Sending..." : "Send Message"}
                </MdButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
