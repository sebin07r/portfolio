import { experience } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section">
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience"
        title="Work experience"
        description="Where I have built and shipped AI and backend work."
      />

      <ol className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
        {experience.map((role, index) => (
          <li key={role.id} className="relative">
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className={`absolute -left-[1.68rem] top-6 h-3 w-3 rounded-full border-2 sm:-left-[2.18rem] ${
                role.current
                  ? 'animate-pulse-dot border-accent-400 bg-accent-400'
                  : 'border-white/25 bg-night-900'
              }`}
            />
            <Reveal delay={index * 0.08}>
              <article className="glass-card glass-card-hover p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">
                    {role.title}
                    {role.subtitle ? (
                      <span className="font-normal text-slate-400"> | {role.subtitle}</span>
                    ) : null}
                  </h3>
                  <p className="text-sm font-medium text-accent-400">{role.period}</p>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                  {role.company}
                  {role.meta ? <span className="text-slate-500"> | {role.meta}</span> : null}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet.slice(0, 30)} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
