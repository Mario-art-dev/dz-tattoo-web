'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function MarqueeBand({ items, speed = 1, direction = 'left', className = '' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const anim = gsap.to(track, {
      xPercent: direction === 'left' ? -50 : 50,
      ease: 'none',
      duration: 28 / speed,
      repeat: -1,
    });
    return () => { anim.kill(); };
  }, [direction, speed]);

  return (
    <div className={`overflow-hidden border-y border-[#0f0f0f] py-3.5 ${className}`}>
      <div ref={trackRef} className="flex gap-10 whitespace-nowrap w-[200%]">
        {doubled.map((item, i) => (
          <span key={i} className="text-[#1a1a1a] text-4xl sm:text-6xl font-black uppercase tracking-tight select-none flex-shrink-0">
            {item}
            <span className="text-[#8B0000]/30 mx-5 text-3xl">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
