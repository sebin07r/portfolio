import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/data/profile';

interface ProjectLinksProps {
  project: Project;
  size?: 'default' | 'compact';
}

/**
 * GitHub / Live Demo actions for a project card.
 *
 * Only renders links that actually exist in `data/profile.ts`. A project with
 * neither URL renders nothing at all - no placeholder button, and never a `#`
 * link. Add a `github` or `demo` URL to the project and its button appears.
 */
export default function ProjectLinks({ project, size = 'default' }: ProjectLinksProps) {
  if (!project.github && !project.demo) return null;

  const sizing = size === 'compact' ? 'px-3.5 py-2 text-xs' : 'px-4 py-2.5 text-sm';

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-secondary ${sizing}`}
        >
          <Github aria-hidden="true" className="h-4 w-4" />
          <span>
            GitHub<span className="sr-only"> repository for {project.title} (opens in a new tab)</span>
          </span>
        </a>
      ) : null}

      {project.demo ? (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`btn-secondary ${sizing}`}>
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          <span>
            Live Demo<span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </span>
        </a>
      ) : null}
    </div>
  );
}
