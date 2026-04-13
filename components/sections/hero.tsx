"use client";

import { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { MdButton } from "@/components/ui/md-button";

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const ROLES = ["Full-Stack Developer", "Roboticist", "CS Undergraduate", "Software Engineer"];

const BRUSH_RADIUS = 90;
const REVEAL_THRESHOLD = 0.60;
const CHECK_EVERY = 25; // check scratch % every N events
const SAMPLE_STEP = 8;  // sample every Nth pixel

const CONFETTI_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF922B", "#CC5DE8", "#F06595", "#20C997"];

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  isRect: boolean;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 9,
    duration: 1.6 + Math.random() * 2,
    delay: Math.random() * 0.9,
    drift: -50 + Math.random() * 100,
    isRect: Math.random() > 0.5,
  }));
}

function Confetti({ active }: { active: boolean }) {
  const particles = useMemo(() => makeParticles(90), []);
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-8vh", x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            y: "108vh",
            x: `calc(${p.x}vw + ${p.drift}px)`,
            opacity: [1, 1, 0.8, 0],
            rotate: p.isRect ? 540 : 0,
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.isRect ? p.size * 0.5 : p.size,
            backgroundColor: p.color,
            borderRadius: p.isRect ? 2 : "50%",
          }}
        />
      ))}
    </div>
  );
}

function RoleCycler() {
  return (
    <motion.div
      className="flex flex-wrap gap-2 mt-3"
      variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
    >
      {ROLES.map((role) => (
        <motion.span
          key={role}
          variants={{
            hidden: { opacity: 0, scale: 0.88 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
          }}
          className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]"
        >
          {role}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doodleCanvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const revealedRef = useRef(false);
  const scratchCountRef = useRef(0);
  const [showConfetti, setShowConfetti] = useState(false);

    // Doodle art layer — draws doodle.jpeg as a cover-fit background
    const drawDoodles = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.10;
      ctx.clearRect(0, 0, w, h);

      const img = new Image();
      img.onload = () => {
        const imgAspect = img.width / img.height;
        const canvasAspect = w / h;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;

        if (imgAspect > canvasAspect) {
          sw = img.height * canvasAspect;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / canvasAspect;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      };
      img.src = "svgart.svg";
    }, []);

  // Scratch layer — solid primary color cover with hint text
  const drawCover = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const style = getComputedStyle(document.documentElement);
    const primary = style.getPropertyValue("--primary").trim();
    const onPrimary = style.getPropertyValue("--on-primary").trim();

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = 0.6;
    ctx.fillStyle = onPrimary;
    ctx.font = `600 13px var(--font-mono, ui-monospace, monospace)`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦  hover to scratch", w / 2, h / 2);

    ctx.globalAlpha = 1;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  }, []);

  // Check scratch % and trigger reveal at REVEAL_THRESHOLD
  const checkReveal = useCallback(() => {
    if (revealedRef.current) return;
    scratchCountRef.current++;
    if (scratchCountRef.current % CHECK_EVERY !== 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;

    let transparent = 0;
    let total = 0;
    // sample alpha channel every SAMPLE_STEP pixels
    for (let i = 3; i < data.length; i += 4 * SAMPLE_STEP) {
      if (data[i] < 128) transparent++;
      total++;
    }

    if (total > 0 && transparent / total >= REVEAL_THRESHOLD) {
      revealedRef.current = true;

      // Fade out the cover canvas
      canvas.style.transition = "opacity 0.5s ease";
      canvas.style.opacity = "0";
      setTimeout(() => {
        const c = canvasRef.current;
        if (c) {
          const cx = c.getContext("2d");
          if (cx) cx.clearRect(0, 0, c.width, c.height);
          c.style.opacity = "1";
          c.style.transition = "";
        }
      }, 550);

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    }
  }, []);

  // Initialize doodle canvas
  useEffect(() => {
    const canvas = doodleCanvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const redraw = () => {
      const { width, height } = section.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      drawDoodles(ctx, width, height);
    };

    redraw();

    const ro = new ResizeObserver(redraw);
    ro.observe(section);

    const mo = new MutationObserver(redraw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => { ro.disconnect(); mo.disconnect(); };
  }, [drawDoodles]);

  // Initialize scratch canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const redraw = () => {
      const { width, height } = section.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      revealedRef.current = false;
      scratchCountRef.current = 0;
      drawCover(ctx, width, height);
    };

    redraw();

    const ro = new ResizeObserver(redraw);
    ro.observe(section);

    const mo = new MutationObserver(redraw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => { ro.disconnect(); mo.disconnect(); };
  }, [drawCover]);

  function scratch(x: number, y: number) {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1;

    const prev = lastPos.current;

    // Draw an elliptical brush stamp oriented along movement direction
    const drawStamp = (cx: number, cy: number, angle: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      // Wide axis perpendicular to movement, narrow axis along movement → flat brush feel
      ctx.ellipse(0, 0, BRUSH_RADIUS, BRUSH_RADIUS * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.restore();
    };

    if (prev) {
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.hypot(dx, dy);
      // Angle perpendicular to movement so the flat side faces the direction of travel
      const angle = Math.atan2(dy, dx) + Math.PI / 2;

      // Stamp along the path so there are no gaps
      const steps = Math.max(1, Math.floor(dist / (BRUSH_RADIUS * 0.4)));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        drawStamp(prev.x + dx * t, prev.y + dy * t, angle);
      }
    } else {
      // Initial touch — angled ellipse at 45° as a visual hint
      drawStamp(x, y, Math.PI / 4);
    }

    lastPos.current = { x, y };
    checkReveal();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  }

  function handleMouseLeave() {
    lastPos.current = null;
  }

  return (
    <>
      <Confetti active={showConfetti} />
      <section
        ref={sectionRef}
        id="hero"
        className="min-h-screen flex items-center pt-16 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* z-0: Doodle art layer — doodle.jpeg revealed by scratching */}
        <canvas
          ref={doodleCanvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
        />

        {/* z-[5]: Scratch canvas — theme-primary overlay, erased as user hovers */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5]"
        />

        {/* z-[10]: Content — always above scratch canvas */}
        <div className="relative z-[10] max-w-5xl mx-auto px-5 sm:px-8 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — text */}
          <motion.div
            variants={STAGGER}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.p variants={FADE_UP} className="text-sm font-semibold tracking-widest uppercase text-[var(--primary)] mb-4">
              Hey, I&apos;m
            </motion.p>

            <motion.h1
              variants={FADE_UP}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--on-surface)] leading-tight tracking-tight"
            >
              Muhammad
              <br />
              <span className="text-[var(--primary)]">Umer</span>
            </motion.h1>

            <RoleCycler />

            <motion.p
              variants={FADE_UP}
              className="mt-6 text-base sm:text-lg text-[var(--on-surface-variant)] leading-relaxed max-w-md whitespace-pre-line"
            >
              {personal.tagline}
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-wrap gap-3 mt-8">
              <MdButton variant="filled" href="#projects" size="lg">
                View Work
              </MdButton>
              <MdButton variant="outlined" href="#contact" size="lg">
                Get in Touch
              </MdButton>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex items-center gap-4 mt-6">
              {[
                { label: "GitHub",   href: personal.github },
                { label: "LinkedIn", href: personal.linkedin },
                { label: "Email",    href: `mailto:${personal.email}` },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="elev-3 rounded-[28px] p-6 w-64 sm:w-72 bg-[var(--surface-container)] flex flex-col items-center gap-4">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full overflow-hidden bg-[var(--primary-container)]">
                  <img
                    src="/profile-img.jpg"
                    alt="Profile photo of Muhammad Umer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <p className="text-base font-semibold text-[var(--on-surface)]">Muhammad Umer</p>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">FAST NUCES · Islamabad</p>
                </div>

                <div className="w-full border-t border-[var(--outline-variant)]" />

                <div className="w-full flex flex-col gap-2 text-xs text-[var(--on-surface-variant)]">
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse block" />
                      Available
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus</span>
                    <span className="text-[var(--on-surface)]">Web · Robotics</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grad</span>
                    <span className="text-[var(--on-surface)]">Jun 2026</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-[var(--tertiary-container)] flex items-center justify-center text-xl shadow-md cursor-default select-none"
                title="Sangi says hi 👋"
              >
                🤖
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 text-[var(--on-surface-variant)]"
        >
          <span className="text-xs tracking-widest uppercase opacity-60">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[var(--on-surface-variant)] to-transparent"
          />
        </motion.div>
      </section>
    </>
  );
}
