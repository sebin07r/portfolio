import { GraduationCap } from 'lucide-react';
import { education } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="section">
      <SectionHeading id="education-heading" eyebrow="Education" title="Education" />

      <ul className="space-y-4">
        {education.map((entry) => (
          <li key={entry.degree}>
            <Reveal>
              <article className="glass-card glass-card-hover flex gap-4 p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-400/30 bg-accent-500/10 text-accent-400"
                >
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{entry.degree}</h3>
                  <p className="mt-1 text-sm text-slate-400">{entry.institution}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="chip">{entry.grade}</span>
                    <span className="chip">{entry.period}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
