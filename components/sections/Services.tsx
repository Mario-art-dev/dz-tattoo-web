'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: 'Custom Tattoos', tag: 'CUSTOM', desc: 'Diseños exclusivos creados desde cero para ti. Ninguna copia, solo arte original.', detail: 'Consulta · Boceto · Sesión · Revisión' },
  { id: '02', title: 'Realismo', tag: 'REALISM', desc: 'Fotorrealismo en piel. Retratos, naturaleza, animales con detalle de alta resolución.', detail: 'B&N · Color · Retrato · Naturaleza' },
  { id: '03', title: 'Fine Line', tag: 'FINE LINE', desc: 'Líneas ultra finas, minimalismo con máximo impacto visual. Elegancia en su forma más pura.', detail: 'Minimalista · Botánico · Geométrico · Lettering' },
  { id: '04', title: 'Cover Ups', tag: 'COVER', desc: 'Transformamos cualquier tatuaje anterior en una nueva obra de arte. Evaluación gratuita.', detail: 'Evaluación · Diseño · Transformación' },
  { id: '05', title: 'Eliminación Láser', tag: 'LASER', desc: 'Tecnología láser de última generación. Sesiones progresivas y seguimiento personalizado.', detail: 'Q-Switch · Progresivo · Sin cicatrices' },
  { id: '06', title: 'Tooth Gems', tag: 'GEMS', desc: 'Joyería dental con cristales Swarovski premium. Aplicación sin daño al esmalte.', detail: 'Swarovski · Sin daño · Reversible' },
  { id: '07', title: 'Microblading', tag: 'MICRO', desc: 'Cejas pelo a pelo con resultado natural y duradero hasta 2 años. Forma perfecta.', detail: 'Pelo a pelo · Natural · 2 años duración' },
  { id: '08', title: 'Micropigmentación', tag: 'PIGMENT', desc: 'Labios, eyeliner y cejas semipermanentes. Maquillaje perfecto al despertar cada día.', detail: 'Labios · Eyeliner · Cejas · Semipermanente' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getStep = () => {
    const card = trackRef.current?.querySelector<HTMLElement>('.svc-card');
    return card ? card.offsetWidth + 16 : 0;
  };

  const getMaxOffset = () => {
    if (!trackRef.current || !wrapperRef.current) return 0;
    const cards = trackRef.current.querySelectorAll<HTMLElement>('.svc-card');
    if (!cards.length) return 0;
    const totalW = cards[0].offsetWidth * cards.length + 16 * (cards.length - 1);
    return Math.max(0, totalW - wrapperRef.current.clientWidth);
  };

  const snapTo = (targetX: number) => {
    if (!trackRef.current) return;
    const maxOffset = getMaxOffset();
    const clamped = Math.max(-maxOffset, Math.min(0, targetX));
    setCanPrev(clamped < -2);
    setCanNext(clamped > -(maxOffset - 2));
    gsap.to(trackRef.current, { x: clamped, duration: 0.65, ease: 'power3.inOut' });
  };

  const slide = (dir: -1 | 1) => {
    const currentX = (gsap.getProperty(trackRef.current!, 'x') as number) || 0;
    snapTo(currentX - dir * getStep());
  };

  const touchStartX = useRef(0);
  const baseX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    gsap.killTweensOf(trackRef.current);
    touchStartX.current = e.touches[0].clientX;
    baseX.current = (gsap.getProperty(trackRef.current!, 'x') as number) || 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    const maxOffset = getMaxOffset();
    const rawX = baseX.current + delta;
    const newX = rawX > 0 ? rawX * 0.15 : rawX < -maxOffset ? -maxOffset + (rawX + maxOffset) * 0.15 : rawX;
    gsap.set(trackRef.current, { x: newX });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      snapTo(baseX.current - (delta > 0 ? -1 : 1) * getStep());
    } else {
      snapTo(baseX.current);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (!trackRef.current) return;
      const x = (gsap.getProperty(trackRef.current, 'x') as number) || 0;
      const maxOffset = getMaxOffset();
      setCanPrev(x < -2);
      setCanNext(x > -(maxOffset - 2));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-eyebrow', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('h2', { clipPath: 'inset(0 0 0 100%)' }, {
        clipPath: 'inset(0 0 0 0%)', duration: 1.8, ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.sec-meta', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.svc-slider-wrap', { opacity: 0 }, {
        opacity: 1, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 88%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.svc-nav-btn', { opacity: 0 }, {
        opacity: 1, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 88%', toggleActions: 'play none none reset' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#080808] border-t border-[#0f0f0f]" aria-label="Servicios">
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-[#111] pb-8">
          <div>
            <div className="svc-eyebrow flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">01 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Servicios</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Todo lo que<br />
              <span className="text-gradient">tu piel merece</span>
            </h2>
          </div>
          <div className="font-mono text-right text-[#555] text-xs sec-meta">
            <p className="text-[#E8E2D9] text-2xl font-black mb-1">08</p>
            <p className="tracking-widest uppercase">Especialidades</p>
          </div>
        </div>

        {/* Overflow clip wrapper */}
        <div ref={wrapperRef} className="svc-slider-wrap overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          {/* Sliding track */}
          <div ref={trackRef} className="flex gap-4" style={{ willChange: 'transform' }}>
            {services.map((s) => (
              <div
                key={s.id}
                className="svc-card flex-shrink-0 w-[82vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-[#0a0a0a] border border-[#111] p-8 flex flex-col gap-5 group hover:bg-[#0f0808] hover:border-[#8B0000]/20 transition-colors duration-400 relative overflow-hidden"
              >
                <span className="absolute right-4 top-2 text-[4.5rem] font-black text-[#8B0000]/[0.07] leading-none select-none pointer-events-none">{s.id}</span>

                <div>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-[#8B0000] border border-[#8B0000]/25 px-2.5 py-1">{s.tag}</span>
                </div>

                <div className="flex-1 min-h-[7rem]">
                  <h3 className="text-[#E8E2D9] text-xl font-black uppercase tracking-wide mb-3 leading-tight">{s.title}</h3>
                  <p className="text-[#B0A89E] text-sm leading-relaxed">{s.desc}</p>
                </div>

                <div className="border-t border-[#161616] pt-4">
                  <p className="text-[#444] text-[10px] font-mono leading-relaxed tracking-wider">{s.detail}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000]/0 group-hover:bg-[#8B0000]/35 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow controls */}
        <div className="mt-5 flex gap-2">
          <button onClick={() => slide(-1)} disabled={!canPrev} aria-label="Anterior"
            className="svc-nav-btn w-10 h-10 border border-[#1f1f1f] flex items-center justify-center text-[#555] hover:text-[#E8E2D9] hover:border-[#444] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => slide(1)} disabled={!canNext} aria-label="Siguiente"
            className="svc-nav-btn w-10 h-10 border border-[#1f1f1f] flex items-center justify-center text-[#555] hover:text-[#E8E2D9] hover:border-[#444] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
