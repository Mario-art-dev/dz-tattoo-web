'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// depth = how far the image "floats" — higher moves more (feels closer)
const PIECES = [
  { id: 1, src: '/images/gallery/tattoo-1.jpg',  top: '5%',  left: '1%',  w: 'clamp(110px,20vw,240px)', ar: 1.35, rot: -9,  depth: 36 },
  { id: 2, src: '/images/gallery/tattoo-4.jpg',  top: '2%',  left: '37%', w: 'clamp(130px,22vw,270px)', ar: 1.35, rot:  5,  depth: 18 },
  { id: 3, src: '/images/gallery/tattoo-8.jpg',  top: '4%',  left: '72%', w: 'clamp(100px,17vw,210px)', ar: 1.35, rot:  14, depth: 27 },
  { id: 4, src: '/images/gallery/tattoo-2.jpg',  top: '45%', left: '2%',  w: 'clamp(100px,18vw,225px)', ar: 1.0,  rot: -16, depth: 44 },
  { id: 5, src: '/images/gallery/tattoo-11.jpg', top: '38%', left: '29%', w: 'clamp(150px,24vw,310px)', ar: 1.38, rot: -2,  depth: 13 },
  { id: 6, src: '/images/gallery/tattoo-5.jpg',  top: '41%', left: '68%', w: 'clamp(100px,17vw,200px)', ar: 1.0,  rot:  9,  depth: 33 },
  { id: 7, src: '/images/gallery/tattoo-3.jpg',  top: '70%', left: '14%', w: 'clamp(110px,19vw,230px)', ar: 1.35, rot:  7,  depth: 24 },
  { id: 8, src: '/images/gallery/tattoo-7.jpg',  top: '68%', left: '62%', w: 'clamp(105px,18vw,215px)', ar: 1.35, rot: -13, depth: 40 },
];

export default function FloatingWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const hlRef      = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Build a quickTo pair for every floating card
    const movers = imgRefs.current.map((el) => {
      if (!el) return null;
      return {
        x: gsap.quickTo(el, 'x', { duration: 1.8, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.8, ease: 'power3.out' }),
      };
    });

    // Scroll-triggered entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.82, y: 50 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.1, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none reset' },
        }
      );

      // Text highlight sweep (the "marker" effect)
      if (hlRef.current) {
        gsap.fromTo(
          hlRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)', duration: 0.65, ease: 'power2.inOut',
            scrollTrigger: { trigger: hlRef.current, start: 'top 82%', toggleActions: 'play none none reset' },
          }
        );
      }
    }, section);

    // --- Mouse parallax ---
    const onMouse = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      movers.forEach((m, i) => {
        if (!m) return;
        m.x(nx * PIECES[i].depth);
        m.y(ny * PIECES[i].depth);
      });
    };

    // --- Touch parallax ---
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const t  = e.touches[0];
      const nx = t.clientX / window.innerWidth  - 0.5;
      const ny = t.clientY / window.innerHeight - 0.5;
      movers.forEach((m, i) => {
        if (!m) return;
        m.x(nx * PIECES[i].depth);
        m.y(ny * PIECES[i].depth);
      });
    };
    const onTouchEnd = () => {
      movers.forEach(m => { if (!m) return; m.x(0); m.y(0); });
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    section.addEventListener('touchmove',   onTouch,    { passive: true });
    section.addEventListener('touchend',    onTouchEnd, { passive: true });
    section.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMouse);
      section.removeEventListener('touchmove',   onTouch);
      section.removeEventListener('touchend',    onTouchEnd);
      section.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505]"
      style={{ height: 'clamp(520px, 100vh, 900px)' }}
      aria-label="Arte en movimiento"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B0000]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Centre text — sits behind the cards */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-6 text-center">
        <p className="text-[#333] text-[10px] font-mono tracking-[0.45em] uppercase mb-4">Arte en movimiento</p>
        <h2 className="font-black uppercase leading-none text-[#E8E2D9]/[0.04]" style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}>
          TATTOO
        </h2>
        <p className="mt-6 text-[#555] text-sm font-mono tracking-widest">
          Desliza / mueve el cursor
        </p>
      </div>

      {/* Bottom label with highlight text */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20 pointer-events-none px-6">
        <p className="text-[#E8E2D9] text-lg sm:text-2xl font-black uppercase tracking-tight text-center">
          Arte que{' '}
          <span className="relative inline-block px-1">
            {/* Highlight background — swept by GSAP */}
            <span
              ref={hlRef}
              aria-hidden="true"
              className="absolute inset-y-0 -inset-x-1 bg-[#8B0000] z-0"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            />
            <span className="relative z-10">define</span>
          </span>
          {' '}tu historia
        </p>
      </div>

      {/* Floating cards */}
      {PIECES.map((p, i) => (
        <div
          key={p.id}
          ref={(el) => { imgRefs.current[i] = el; }}
          className="absolute opacity-0 pointer-events-none"
          style={{
            top:       p.top,
            left:      p.left,
            width:     p.w,
            transform: `rotate(${p.rot}deg)`,
            willChange: 'transform',
            zIndex:    Math.round(p.depth / 5) + 1,
          }}
        >
          <div
            className="relative overflow-hidden border border-[#1a1a1a] shadow-2xl shadow-black/70"
            style={{ aspectRatio: `1 / ${p.ar}` }}
          >
            <Image
              src={p.src}
              alt={`Trabajo D.Z Tattoo ${p.id}`}
              fill
              className="object-cover"
              sizes="300px"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      ))}
    </section>
  );
}
