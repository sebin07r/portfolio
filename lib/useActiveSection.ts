'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navigation can highlight it.
 *
 * Uses a single IntersectionObserver with a top margin that accounts for the
 * sticky nav, and picks the entry closest to the top of the viewport so that
 * short sections next to tall ones still register.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // The section whose top edge is nearest the top of the viewport wins.
        let bestId = '';
        let bestTop = Number.POSITIVE_INFINITY;
        visible.forEach((top, id) => {
          const distance = Math.abs(top);
          if (distance < bestTop) {
            bestTop = distance;
            bestId = id;
          }
        });

        if (bestId) setActive(bestId);
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
