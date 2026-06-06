'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: '01', code: 'CONSULT', title: 'Consulta inicial', desc: 'Cuéntanos tu idea a través del botón de reservar, por WhatsApp o presencialmente. Sin coste ni compromiso.', meta: '30 min · Gratis' },
  { n: '02', code: 'DESIGN', title: 'Diseño personalizado', desc: 'Un boceto exclusivo creado para ti, ajustado hasta capturar exactamente tu visión.', meta: '24–48h' },
  { n: '03', code: 'PREP', title: 'Preparación', desc: 'Instrucciones de hidratación, alimentación y ropa para el día de la sesión.', meta: 'Previo a la cita' },
  { n: '04', code: 'SESSION', title: 'La sesión', desc: 'Ambiente impecable, material nuevo y esterilizado en cada sesión. Comodidad total.', meta: 'Variable' },
  { n: '05', code: 'CARE', title: 'Cuidados post-tattoo', desc: 'Seguimiento personalizado durante las 4 semanas de cicatrización. Siempre disponibles.', meta: '4 semanas' },
  { n: '06', code: 'REVIEW', title: 'Revisión gratuita', desc: 'Revisamos el resultado a las 6–8 semanas. Retoques incluidos sin coste adicional.', meta: '6–8 semanas' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getStep = () => {
    const card = trackRef.current?.querySelector<HTMLElement>('.proc-card');
    return card ? card.offsetWidth + 16 : 0;
  };

  const getMaxOffset = () => {
    if (!trackRef.current || !wrapperRef.current) return 0;
    const cards = trackRef.current.querySelectorAll<HTMLElement>('.proc-card');
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
      gsap.fromTo('.proc-eyebrow', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.35, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('h2', { opacity: 0, skewX: -10, x: -50 }, {
        opacity: 1, skewX: 0, x: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.sec-meta', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.proc-slider-wrap', { opacity: 0 }, {
        opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 88%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.proc-nav-btn', { opacity: 0 }, {
        opacity: 1, duration: 0.32, stagger: 0.06,
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 88%', toggleActions: 'play none none reset' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#080808] border-t border-[#0f0f0f]" aria-label="Proceso">
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B0000]/6 rounded-full blur-[160px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <span className="pointer-events-none select-none absolute left-[-3%] top-1/2 -translate-y-1/2 text-[20rem] font-black text-[#8B0000]/[0.025] leading-none hidden lg:block">04</span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-[#111] pb-8">
          <div>
            <div className="proc-eyebrow flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">04 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Proceso</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Tu experiencia,<br />
              <span className="text-gradient">paso a paso</span>
            </h2>
          </div>
          <p className="sec-meta text-[#555] text-xs font-mono max-w-[220px] leading-relaxed">
            De la idea al resultado final.<br />6 etapas con total transparencia.
          </p>
        </div>

        {/* Overflow clip wrapper */}
        <div ref={wrapperRef} className="proc-slider-wrap overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          {/* Sliding track */}
          <div ref={trackRef} className="flex gap-4" style={{ willChange: 'transform' }}>
            {steps.map((s) => (
              <div
                key={s.n}
                className="proc-card flex-shrink-0 w-[82vw] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-[#0a0a0a] border border-[#111] p-8 flex flex-col gap-6 group hover:bg-[#0f0808] hover:border-[#8B0000]/20 transition-colors duration-400 relative overflow-hidden"
              >
                <span className="absolute right-4 bottom-4 text-[5rem] font-black text-[#8B0000]/[0.06] leading-none select-none pointer-events-none">{s.n}</span>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-[#8B0000]/30 group-hover:border-[#8B0000]/60 flex items-center justify-center flex-shrink-0 transition-colors">
                      <span className="text-[#8B0000] text-[10px] font-mono">{s.n}</span>
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#555] group-hover:text-[#666] transition-colors uppercase">{s.code}</span>
                  </div>
                  <span className="text-[#8B0000] text-[10px] font-mono tracking-wider border border-[#8B0000]/20 px-2.5 py-1 flex-shrink-0">{s.meta}</span>
                </div>

                <div className="flex-1 min-h-[6rem]">
                  <h3 className="text-[#E8E2D9] font-black text-lg uppercase tracking-wide mb-3 leading-tight">{s.title}</h3>
                  <p className="text-[#B0A89E] text-sm leading-relaxed">{s.desc}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000]/0 group-hover:bg-[#8B0000]/35 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Arrow controls */}
        <div className="mt-5 flex gap-2">
          <button onClick={() => slide(-1)} disabled={!canPrev} aria-label="Anterior"
            className="proc-nav-btn w-10 h-10 border border-[#1f1f1f] flex items-center justify-center text-[#555] hover:text-[#E8E2D9] hover:border-[#444] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => slide(1)} disabled={!canNext} aria-label="Siguiente"
            className="proc-nav-btn w-10 h-10 border border-[#1f1f1f] flex items-center justify-center text-[#555] hover:text-[#E8E2D9] hover:border-[#444] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
