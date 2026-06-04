'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-eyebrow', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo('h2', { opacity: 0, y: 45 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
      gsap.fromTo('.sec-desc', { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
      });
      gsap.fromTo('.sec-meta', { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
      });
      gsap.fromTo('.svc-row', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-list', start: 'top 84%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#080808] border-t border-[#0f0f0f]" aria-label="Servicios">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20 lg:mb-24 border-b border-[#111] pb-8">
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
          <div className="font-mono text-right text-[#555] text-xs">
            <p className="text-[#E8E2D9] text-2xl font-black mb-1">08</p>
            <p className="sec-meta tracking-widest uppercase">Especialidades</p>
          </div>
        </div>

        {/* Services table */}
        <div className="svc-list border border-[#111]">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[60px_1fr_120px_200px_80px] gap-0 border-b border-[#111] bg-[#0a0a0a]">
            {['#', 'Servicio', 'Código', 'Detalles', ''].map((h) => (
              <div key={h} className="px-4 py-3 text-[10px] font-mono tracking-[0.3em] text-[#444] uppercase border-r border-[#111] last:border-r-0">
                {h}
              </div>
            ))}
          </div>

          {services.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                'svc-row opacity-0 grid grid-cols-1 md:grid-cols-[60px_1fr_120px_200px_80px] gap-0',
                i < services.length - 1 && 'border-b border-[#111]',
                'group cursor-pointer hover:bg-[#0a0000] transition-colors duration-300'
              )}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Number */}
              <div className="hidden md:flex items-center px-4 py-5 border-r border-[#111]">
                <span className="text-[#555] text-xs font-mono">{s.id}</span>
              </div>

              {/* Title + desc */}
              <div className="px-4 md:px-5 py-5 border-r border-[#111] md:border-r-0">
                <p className="text-[#E8E2D9] font-black text-base sm:text-lg uppercase tracking-wide group-hover:text-[#E8E2D9] mb-1">
                  {s.title}
                </p>
                <p className="text-[#B0A89E] text-xs leading-relaxed max-w-md">{s.desc}</p>
              </div>

              {/* Code tag */}
              <div className="hidden md:flex items-center px-4 border-l border-r border-[#111]">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#666] group-hover:text-[#E8E2D9] transition-colors">
                  {s.tag}
                </span>
              </div>

              {/* Detail */}
              <div className="hidden md:flex items-center px-4 border-r border-[#111]">
                <p className="text-[#555] text-[10px] font-mono leading-relaxed">{s.detail}</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center px-4">
                <ArrowRight
                  size={14}
                  className="text-[#8B0000]/0 group-hover:text-[#E8E2D9] transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#111]">
          <p className="sec-meta text-[#555] text-xs font-mono">Primera consulta gratuita · Presencial o WhatsApp</p>
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary-round inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase"
          >
            Reservar consulta <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
