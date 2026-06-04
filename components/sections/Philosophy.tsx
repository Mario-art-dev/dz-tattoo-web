'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { code: 'ART', n: '01', title: 'Arte personalizado', desc: 'Cada diseño nace de cero — piezas únicas que cuentan tu historia.' },
  { code: 'TEC', n: '02', title: 'Excelencia técnica', desc: '6 años perfeccionando realismo, fine line y micropigmentación. La precisión es nuestra obsesión.' },
  { code: 'HYG', n: '03', title: 'Higiene certificada', desc: 'Material desechable, esterilización certificada. Tu seguridad es innegociable.' },
  { code: 'DUR', n: '04', title: 'Resultados duraderos', desc: 'Tintas de primera calidad para resultados que perduran décadas sin perder intensidad.' },
];

const keywords = ['Arte con alma', 'Realismo', 'Precisión', 'Fine Line', 'Transformación', 'Premium', 'Higiene', 'Creatividad', 'Arte con alma', 'Realismo', 'Precisión', 'Fine Line'];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-eyebrow', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('h2', { opacity: 0, y: 45 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.sec-desc', { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.sec-meta', { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.phil-card', { opacity: 0, y: 35 }, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.phil-grid', start: 'top 82%', toggleActions: 'play reverse play reverse' },
      });
      gsap.to('.marquee-track', {
        xPercent: -50, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#080808] border-t border-[#0f0f0f] overflow-hidden" aria-label="Filosofía">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-[#8B0000]/7 rounded-full blur-[140px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <span className="pointer-events-none select-none absolute right-[-3%] top-1/2 -translate-y-1/2 text-[20rem] font-black text-[#8B0000]/[0.025] leading-none hidden lg:block">02</span>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-[#0f0f0f] py-4 mb-10 sm:mb-16 lg:mb-20">
        <div className="marquee-track flex gap-12 whitespace-nowrap w-[200%]">
          {[...keywords, ...keywords].map((w, i) => (
            <span key={i} className="text-[#111] text-5xl sm:text-7xl font-black uppercase tracking-tight select-none">
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20 lg:mb-24 border-b border-[#111] pb-8">
          <div>
            <div className="phil-eyebrow flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">02 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Filosofía</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              No hacemos tatuajes.<br />
              <span className="text-gradient">Hacemos arte.</span>
            </h2>
          </div>
          <p className="sec-desc text-[#B0A89E] text-sm max-w-xs leading-relaxed">
            Cada visita es el inicio de una transformación. Creemos que el arte corporal es la expresión más íntima del ser humano.
          </p>
        </div>

        {/* Grid */}
        <div className="phil-grid grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#111] border border-[#111]">
          {pillars.map((p, i) => (
            <div key={p.code} className="phil-card opacity-0 bg-[#080808] p-10 sm:p-12 group hover:bg-[#0f0808] transition-colors duration-400">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-[#8B0000] text-[10px] font-mono tracking-[0.3em] border border-[#8B0000]/20 px-2 py-0.5">{p.code}</span>
                </div>
                <span className="text-[#444] text-4xl font-black font-mono group-hover:text-[#555] transition-colors">{p.n}</span>
              </div>
              <h3 className="text-[#E8E2D9] font-black uppercase tracking-wide text-base mb-3">{p.title}</h3>
              <p className="text-[#B0A89E] text-sm leading-relaxed">{p.desc}</p>
              <div className="h-px bg-[#8B0000]/0 group-hover:bg-[#8B0000]/25 transition-all duration-500 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
