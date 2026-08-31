import { about } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section">
      <SectionHeading id="about-heading" eyebrow="About" title="How I work" />

      <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr] lg:gap-14">
        <div className="space-y-5">
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
              <p className="text-base leading-relaxed text-slate-400">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {about.highlights.map((highlight) => (
              <li key={highlight.label} className="glass-card p-4">
                <p className="text-sm font-semibold text-slate-100">{highlight.label}</p>
                <p className="mt-1 text-sm text-slate-400">{highlight.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
