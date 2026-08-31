import { skillCategories, skillsInPractice } from '@/data/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section">
      <SectionHeading
        id="skills-heading"
        eyebrow="Skills in Practice"
        title="Skills in practice"
        description="Not a wall of badges - each technology is listed with the work that actually used it."
      />

      <ul className="grid gap-4 md:grid-cols-2">
        {skillsInPractice.map((skill, index) => (
          <li key={skill.name} className="h-full">
            {/* h-full on the wrapper keeps every card in a row the same height */}
            <Reveal delay={Math.min(index, 6) * 0.04} className="h-full">
              <div className="glass-card glass-card-hover h-full p-5">
                <h3 className="text-sm font-semibold text-accent-400">{skill.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{skill.proof}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {skillCategories.map((category) => (
          <div key={category.title} className="glass-card p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              {category.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
