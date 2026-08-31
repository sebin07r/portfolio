import Image from 'next/image';
import { person, photo } from '@/data/profile';

/**
 * Hero portrait.
 *
 * The photo is a transparent cutout, so instead of framing it in a box the
 * subject stands directly on the page over a circular halo: a soft cyan glow,
 * a thin gradient ring, and two pulsing synapse nodes that tie the portrait
 * into the neuron-network background. A drop shadow keeps the cutout from
 * looking pasted on.
 *
 * If `photo.available` is false in data/profile.ts this falls back to the
 * initials monogram. It never renders a stock or placeholder face.
 */
export default function ProfilePhoto() {
  if (!photo.available) {
    return (
      <div className="mx-auto w-fit lg:mx-0">
        <div className="rounded-full bg-gradient-to-br from-accent-400 via-violetish-400 to-accent-400/20 p-[2px] shadow-glow">
          <div className="rounded-full bg-night-900 p-1.5">
            <div
              role="img"
              aria-label={person.name}
              className="grid h-56 w-56 place-items-center rounded-full bg-night-800 text-5xl font-bold text-accent-400 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
            >
              {person.initials}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-[18rem] sm:w-[22rem] lg:w-[26rem] lg:mx-0">
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[6%] -z-10 aspect-square rounded-full bg-accent-500/20 blur-3xl"
      />

      {/* Halo ring the portrait stands in front of */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[6%] top-[8%] -z-10 aspect-square rounded-full border border-accent-400/30 bg-gradient-to-br from-accent-500/10 via-violetish-500/10 to-transparent"
      />

      <Image
        src={photo.path}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority
        sizes="(max-width: 640px) 288px, (max-width: 1024px) 352px, 416px"
        className="relative h-auto w-full drop-shadow-[0_18px_36px_rgba(2,6,23,0.7)]"
      />

      {/* Synapse nodes echoing the background network */}
      <span
        aria-hidden="true"
        className="absolute right-[2%] top-[18%] h-3 w-3 animate-pulse-dot rounded-full bg-accent-400"
      />
      <span
        aria-hidden="true"
        className="absolute left-[1%] top-[55%] h-2.5 w-2.5 animate-pulse-dot rounded-full bg-violetish-400 [animation-delay:1.3s]"
      />
    </div>
  );
}
