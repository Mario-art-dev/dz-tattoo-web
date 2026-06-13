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
    <div className={`overflow-hidden border-y border-[#2a2a2a] py-5 ${className}`}>
      <div ref={trackRef} className="flex whitespace-nowrap w-[200%]">
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0 inline-flex items-center">
            <span
              className="text-transparent text-5xl sm:text-[4.5rem] font-black uppercase tracking-tighter select-none"
              style={{ WebkitTextStroke: '1px rgba(232,226,217,0.38)' } as React.CSSProperties}
            >
              {item}
            </span>
            <span className="text-[#C41E1E]/70 mx-8 text-2xl select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
