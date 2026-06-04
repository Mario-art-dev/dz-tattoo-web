'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: '01', code: 'CONSULT', title: 'Consulta inicial', desc: 'Cuéntanos tu idea. Presencial o por WhatsApp. Primera consulta completamente gratuita.', meta: '30 min · Gratis' },
  { n: '02', code: 'DESIGN', title: 'Diseño personalizado', desc: 'Creamos un boceto exclusivo para ti. Lo revisamos juntos hasta capturar tu visión exacta.', meta: '24–48h' },
  { n: '03', code: 'PREP', title: 'Preparación', desc: 'Te enviamos instrucciones completas: hidratación, alimentación, ropa recomendada.', meta: 'Previo a la cita' },
  { n: '04', code: 'SESSION', title: 'La sesión', desc: 'Ambiente impecable, música, comodidad total. Trabajamos con material nuevo y esterilizado.', meta: 'Variable' },
  { n: '05', code: 'CARE', title: 'Cuidados post-tattoo', desc: 'Instrucciones detalladas y seguimiento de cicatrización durante 4 semanas.', meta: '4 semanas' },
  { n: '06', code: 'REVIEW', title: 'Revisión gratuita', desc: 'A las 6–8 semanas revisamos el resultado. Retoques incluidos sin coste adicional.', meta: '6–8 semanas' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proc-eyebrow', { opacity: 0, x: -20 }, {
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
      gsap.fromTo('.process-item', { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-grid', start: 'top 84%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.process-line', { scaleY: 0, transformOrigin: 'top' }, {
        scaleY: 1, duration: 1.5, ease: 'none',
        scrollTrigger: { trigger: '.process-grid', start: 'top 75%', end: 'bottom 80%', scrub: 0.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#080808] border-t border-[#0f0f0f]" aria-label="Proceso">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20 lg:mb-24 border-b border-[#111] pb-8">
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

        {/* Two-column grid for steps */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-[#111] border border-[#111]">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={cn(
                'process-item opacity-0 bg-[#080808] p-7 group hover:bg-[#0a0000] transition-colors duration-300',
                'flex flex-col gap-4'
              )}
            >
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-[#8B0000]/30 group-hover:border-[#8B0000]/60 flex items-center justify-center transition-colors">
                    <span className="text-[#8B0000] text-[10px] font-mono">{s.n}</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#555] group-hover:text-[#666] transition-colors uppercase">
                    {s.code}
                  </span>
                </div>
                <span className="text-[#8B0000] text-[10px] font-mono tracking-wider border border-[#8B0000]/20 px-2.5 py-1">
                  {s.meta}
                </span>
              </div>

              <div>
                <h3 className="text-[#E8E2D9] font-black text-base uppercase tracking-wide mb-2">{s.title}</h3>
                <p className="text-[#B0A89E] text-sm leading-relaxed">{s.desc}</p>
              </div>

              {/* Bottom accent */}
              <div className="h-px bg-[#8B0000]/0 group-hover:bg-[#8B0000]/20 transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#111]">
          <p className="sec-meta text-[#555] text-xs font-mono">Proceso claro · Sin sorpresas · Arte garantizado</p>
          <a
            href="#booking-form"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking-form')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary-round inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase"
          >
            Comenzar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
