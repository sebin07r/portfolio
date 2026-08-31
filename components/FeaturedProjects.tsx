import { CircuitBoard, Target, Wrench } from 'lucide-react';
import { featuredProjects } from '@/data/profile';
import ProjectLinks from './ProjectLinks';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FeaturedProjects() {
  return (
    <section id="featured-projects" aria-labelledby="featured-heading" className="section">
      <SectionHeading
        id="featured-heading"
        eyebrow="Featured Projects"
        title="Featured projects"
        description="Three AI systems built end to end: the problem, how I approached it, and what came out of it."
      />

      <div className="space-y-6">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <article
              id={`project-${project.id}`}
              className="glass-card glass-card-hover scroll-mt-28 p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-400">
                    <CircuitBoard aria-hidden="true" className="h-3.5 w-3.5" />
                    Featured {index + 1} of {featuredProjects.length}
                  </p>
                  <h3 className="text-xl font-semibold sm:text-2xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{project.tagline}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {project.problem ? (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Target aria-hidden="true" className="h-4 w-4 text-accent-400" />
                      The problem
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.problem}</p>
                  </div>
                ) : null}

                {project.approach ? (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Wrench aria-hidden="true" className="h-4 w-4 text-accent-400" />
                      The approach
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.approach}</p>
                  </div>
                ) : null}
              </div>

              {project.results && project.results.length > 0 ? (
                <div className="mt-6 rounded-xl border border-white/10 bg-night-950/40 p-4 sm:p-5">
                  <h4 className="text-sm font-semibold text-slate-200">What it delivered</h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {project.results.map((result) => (
                      <li key={result.slice(0, 28)} className="flex gap-2.5 text-sm text-slate-400">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                        />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <ul aria-label={`Tech stack for ${project.title}`} className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              <ProjectLinks project={project} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
