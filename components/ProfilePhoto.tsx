import Image from 'next/image';
import { person, photo } from '@/data/profile';

/**
 * Circular profile portrait with an outlined ring.
 *
 * The outline is a cyan-to-violet gradient ring separated from the photo by a
 * dark inner band, sitting on a soft glow - so the portrait reads as part of
 * the neuron-network theme rather than a pasted-in square. The source image has
 * a white studio background, and the ring is what stops that white disc from
 * floating loose on the dark page.
 *
 * If `photo.available` is false in data/profile.ts, this falls back to the
 * initials monogram. It never renders a stock or placeholder face.
 */
export default function ProfilePhoto() {
  return (
    <div className="relative mx-auto w-fit lg:mx-0">
      {/* Glow behind the portrait */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-110 rounded-full bg-accent-500/20 blur-3xl"
      />

      {/* Gradient outline ring */}
      <div className="rounded-full bg-gradient-to-br from-accent-400 via-violetish-400 to-accent-400/20 p-[2px] shadow-glow">
        {/* Dark inner band, so the ring reads as an outline rather than a border */}
        <div className="rounded-full bg-night-900 p-1.5">
          {photo.available ? (
            <Image
              src={photo.path}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              priority
              sizes="(max-width: 1024px) 208px, 288px"
              className="h-52 w-52 rounded-full object-cover object-top sm:h-60 sm:w-60 lg:h-72 lg:w-72"
            />
          ) : (
            <div
              aria-label={person.name}
              role="img"
              className="grid h-52 w-52 place-items-center rounded-full bg-night-800 text-5xl font-bold text-accent-400 sm:h-60 sm:w-60 lg:h-72 lg:w-72"
            >
              {person.initials}
            </div>
          )}
        </div>
      </div>

      {/* Small synapse nodes tying the portrait to the background network */}
      <span
        aria-hidden="true"
        className="absolute -right-1 top-8 h-3 w-3 animate-pulse-dot rounded-full bg-accent-400"
      />
      <span
        aria-hidden="true"
        className="absolute -left-2 bottom-14 h-2.5 w-2.5 animate-pulse-dot rounded-full bg-violetish-400 [animation-delay:1.3s]"
      />
    </div>
  );
}
