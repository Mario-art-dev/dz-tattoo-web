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
    <div className={`overflow-hidden border-y border-[#1e1e1e] py-4 ${className}`}>
      <div ref={trackRef} className="flex whitespace-nowrap w-[200%]">
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0 inline-flex items-center">
            <span
              className="text-transparent text-4xl sm:text-[3.5rem] font-black uppercase tracking-widest select-none"
              style={{ WebkitTextStroke: '1px rgba(232,226,217,0.15)' } as React.CSSProperties}
            >
              {item}
            </span>
            <span className="text-[#C41E1E]/30 mx-10 text-sm select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
