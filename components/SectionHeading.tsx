import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  /** Ties the section's <h2> to its landmark via aria-labelledby. */
  id: string;
}

export default function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      <p className="section-eyebrow">
        <span aria-hidden="true" className="h-px w-6 bg-accent-400/60" />
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p> : null}
    </div>
  );
}
