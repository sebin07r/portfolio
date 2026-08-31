'use client';

import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, person } from '@/data/profile';
import { useActiveSection } from '@/lib/useActiveSection';
import ResumeButton from './ResumeButton';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-night-950/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2 text-sm font-bold tracking-tight text-slate-50"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg border border-accent-400/40 bg-accent-500/10 text-xs font-bold text-accent-400"
          >
            {person.initials}
          </span>
          <span className="hidden sm:inline">{person.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="ml-auto hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                    isActive ? 'text-accent-400' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-3">
          <ResumeButton variant="compact" className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="btn-secondary min-h-[44px] px-3 py-2 xl:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div id="mobile-menu" className="border-t border-white/10 bg-night-950/95 backdrop-blur-md xl:hidden">
          <ul className="mx-auto grid max-w-6xl gap-1 px-5 py-4 sm:grid-cols-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                    active === item.id ? 'bg-white/5 text-accent-400' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-6xl px-5 pb-4 sm:hidden sm:px-6">
            <ResumeButton variant="secondary" className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
