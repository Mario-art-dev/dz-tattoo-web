'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function PageIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: () => setDone(true) });

    tl.fromTo(
        logoRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.75, ease: 'power4.inOut' }
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
        '-=0.15'
      )
      .fromTo(
        tagRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.1'
      )
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        delay: 0.5,
      });
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="text-center select-none">
        <div
          ref={logoRef}
          className="text-[#E8E2D9] text-[8rem] sm:text-[11rem] font-black leading-none tracking-[-0.04em] uppercase"
        >
          DZ
        </div>
        <div
          ref={lineRef}
          className="my-5 mx-auto"
          style={{
            height: '1px',
            width: '180px',
            background: 'linear-gradient(90deg, transparent, #8B0000, #C41E1E, #8B0000, transparent)',
          }}
        />
        <p
          ref={tagRef}
          className="text-[#444] text-[9px] font-mono tracking-[0.55em] uppercase"
        >
          Tattoo Studio · Valencia
        </p>
      </div>
    </div>
  );
}
