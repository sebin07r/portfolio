import { Download, FileX2 } from 'lucide-react';
import { resume } from '@/data/profile';

interface ResumeButtonProps {
  /** Visual weight. `compact` is used inside the navigation bar. */
  variant?: 'primary' | 'secondary' | 'compact';
  className?: string;
}

/**
 * Download Resume control.
 *
 * The resume path is configured in `data/profile.ts`. Until the PDF is actually
 * added, this renders an explicitly disabled button with an explanatory title
 * rather than a link that would 404.
 */
export default function ResumeButton({ variant = 'secondary', className = '' }: ResumeButtonProps) {
  const label = 'Download Resume';

  if (!resume.available) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Resume PDF has not been added to the site yet"
        className={`${variant === 'compact' ? 'btn-disabled px-3 py-2 text-xs' : 'btn-disabled'} ${className}`}
      >
        <FileX2 aria-hidden="true" className="h-4 w-4" />
        <span>{variant === 'compact' ? 'Resume' : 'Resume coming soon'}</span>
      </button>
    );
  }

  const classes =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'compact'
        ? 'btn-secondary px-3 py-2 text-xs'
        : 'btn-secondary';

  return (
    <a href={resume.path} download className={`${classes} ${className}`}>
      <Download aria-hidden="true" className="h-4 w-4" />
      <span>{variant === 'compact' ? 'Resume' : label}</span>
    </a>
  );
}
