'use client';

import { useMemo, useState } from 'react';
import { moreProjects, projectFilters } from '@/data/profile';
import ProjectLinks from './ProjectLinks';
import SectionHeading from './SectionHeading';

export default function MoreProjects() {
  const [filter, setFilter] = useState<string>('All');

  const visible = useMemo(
    () => (filter === 'All' ? moreProjects : moreProjects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  return (
    <section id="more-projects" aria-labelledby="more-heading" className="section">
      <SectionHeading
        id="more-heading"
        eyebrow="More Projects"
        title="More projects"
        description="Computer vision, deep learning, and data work. Filter by area to narrow the list."
      />

      {/* Filters */}
      <div role="group" aria-label="Filter projects by area" className="mb-8 flex flex-wrap gap-2">
        {projectFilters.map((option) => {
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={isActive}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-accent-400/60 bg-accent-500/15 text-accent-400'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        {filter === 'All' ? '' : ` in ${filter}`}.
      </p>

      {visible.length === 0 ? (
        <p className="glass-card p-6 text-sm text-slate-400">
          No projects in this area yet. Choose another filter to see more.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.id} className="h-full">
              {/* flex column + mt-auto on the links keeps every card's buttons aligned */}
              <article
                id={`project-${project.id}`}
                className="glass-card glass-card-hover flex h-full scroll-mt-28 flex-col p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
                </div>

                {project.status ? (
                  <p className="mt-2 inline-flex w-fit rounded-full border border-violetish-400/30 bg-violetish-500/10 px-2.5 py-0.5 text-[11px] font-medium text-violetish-400">
                    {project.status}
                  </p>
                ) : null}

                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent-400/80">
                  {project.tagline}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

                <ul aria-label={`Tech stack for ${project.title}`} className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip px-2.5 py-0.5 text-[11px]">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <ProjectLinks project={project} size="compact" />
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
