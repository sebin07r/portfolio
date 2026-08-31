import { ArrowDown, Mail, Sparkles } from 'lucide-react';
import { person } from '@/data/profile';
import ProfilePhoto from './ProfilePhoto';
import ResumeButton from './ResumeButton';

/**
 * A small, tasteful synapse trace with a travelling charge, sitting beside the
 * hero heading. The animation is CSS-driven, so the global
 * `prefers-reduced-motion` rule in globals.css stops it outright.
 */
function CircuitPulse() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 60"
      className="h-12 w-44 shrink-0 text-accent-400 sm:w-56"
      fill="none"
    >
      <path
        d="M0 30 H48 L64 14 H120 L136 30 H220"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <path
        d="M0 30 H48 L64 14 H120 L136 30 H220"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="24 96"
        className="animate-trace-line"
      />
      <circle cx="64" cy="14" r="3" fill="currentColor" className="animate-pulse-dot" />
      <circle cx="136" cy="30" r="3" fill="currentColor" className="animate-pulse-dot [animation-delay:1.1s]" />
      <circle cx="48" cy="30" r="2" fill="currentColor" fillOpacity="0.4" />
      <circle cx="120" cy="14" r="2" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative">
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr,auto] lg:gap-14">
          {/* Portrait sits first on mobile, to the right on desktop */}
          <div className="order-1 lg:order-2">
            <ProfilePhoto />
          </div>

          <div className="order-2 lg:order-1">
            {/* Availability */}
            <p className="inline-flex items-center gap-2 rounded-full border border-accent-400/25 bg-accent-500/[0.08] px-3.5 py-1.5 text-xs font-medium text-accent-400">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              {person.availability}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <h1 id="hero-heading" className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {person.name}
              </h1>
              <CircuitPulse />
            </div>

            <p className="mt-4 text-lg font-medium text-gradient sm:text-xl md:text-2xl">{person.role}</p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {person.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#featured-projects" className="btn-primary">
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                View Projects
              </a>
              <a href="#contact" className="btn-secondary">
                <Mail aria-hidden="true" className="h-4 w-4" />
                Contact Me
              </a>
              <ResumeButton variant="secondary" />
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="mt-14 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-accent-400"
        >
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
          Scroll to read more
        </a>
      </div>
    </section>
  );
}
