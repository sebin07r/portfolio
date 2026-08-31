import { BookOpen, ExternalLink } from 'lucide-react';
import { publications } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Publications() {
  return (
    <section id="publications" aria-labelledby="publications-heading" className="section">
      <SectionHeading id="publications-heading" eyebrow="Publications" title="Published research" />

      <ul className="space-y-4">
        {publications.map((publication) => (
          <li key={publication.url}>
            <Reveal>
              <article className="glass-card glass-card-hover overflow-hidden p-5 sm:p-7">
                {/* Accent edge to mark this as a highlighted card */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent-400/60 to-transparent"
                />
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-400">
                  <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
                  Peer-reviewed publication
                </p>
                <h3 className="text-lg font-semibold leading-snug sm:text-xl">{publication.title}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  {publication.journal}, {publication.year}
                </p>
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-5"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  <span>
                    {publication.cta}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
