import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="section">
      <SectionHeading
        id="certifications-heading"
        eyebrow="Certifications"
        title="Certifications and courses"
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <li key={`${cert.title}-${cert.issuer}`} className="h-full">
            {/* h-full on the wrapper keeps every card in a row the same height */}
            <Reveal delay={Math.min(index, 5) * 0.05} className="h-full">
              <article className="glass-card glass-card-hover flex h-full flex-col p-5">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-accent-400"
                >
                  <Award className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-sm font-semibold leading-snug text-slate-100">{cert.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{cert.issuer}</p>
                <p className="mt-auto pt-3 text-xs text-slate-500">{cert.date}</p>

                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 hover:text-accent-500"
                  >
                    <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                    <span>
                      View certificate
                      <span className="sr-only"> for {cert.title} (opens in a new tab)</span>
                    </span>
                  </a>
                ) : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
