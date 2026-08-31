import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { contact, navItems, person } from '@/data/profile';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night-950/50">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr]">
          <div>
            <p className="flex items-center gap-2 text-base font-bold text-slate-50">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-lg border border-accent-400/40 bg-accent-500/10 text-xs font-bold text-accent-400"
              >
                {person.initials}
              </span>
              {person.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">{person.shortRole}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-accent-400"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {contact.email}
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-accent-400"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {contact.phone}
              </a>
            </div>

            {contact.github || contact.linkedin ? (
              <div className="mt-4 flex gap-3">
                {contact.github ? (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-accent-400"
                  >
                    <Github aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">GitHub profile (opens in a new tab)</span>
                  </a>
                ) : null}
                {contact.linkedin ? (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-accent-400"
                  >
                    <Linkedin aria-hidden="true" className="h-4 w-4" />
                    <span className="sr-only">LinkedIn profile (opens in a new tab)</span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          &copy; {year} {person.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
