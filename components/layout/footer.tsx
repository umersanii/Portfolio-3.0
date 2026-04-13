import { personal } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-[var(--outline-variant)] mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--on-surface-variant)]">
        <span>
          © {new Date().getFullYear()} {personal.name}
        </span>
        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="hover:text-[var(--primary)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
