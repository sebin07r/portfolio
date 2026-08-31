import { ExternalLink, Github, Lock } from 'lucide-react';
import type { Project } from '@/data/profile';

interface ProjectLinksProps {
  project: Project;
  size?: 'default' | 'compact';
}

/**
 * GitHub / Live Demo actions for a project card.
 *
 * When a URL is missing from `data/profile.ts` this renders a disabled
 * "Coming soon" button. It never falls back to a `#` link.
 */
export default function ProjectLinks({ project, size = 'default' }: ProjectLinksProps) {
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
      ) : (
        <button
          type="button"
          disabled
          aria-disabled="true"
          title={`Repository link for ${project.title} has not been published yet`}
          className={`btn-disabled ${sizing}`}
        >
          <Lock aria-hidden="true" className="h-4 w-4" />
          <span>GitHub coming soon</span>
        </button>
      )}

      {project.demo ? (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`btn-secondary ${sizing}`}>
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          <span>
            Live Demo<span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </span>
        </a>
      ) : (
        <button
          type="button"
          disabled
          aria-disabled="true"
          title={`Live demo for ${project.title} is not available yet`}
          className={`btn-disabled ${sizing}`}
        >
          <Lock aria-hidden="true" className="h-4 w-4" />
          <span>Demo coming soon</span>
        </button>
      )}
    </div>
  );
}
