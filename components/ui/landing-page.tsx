'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Globe = dynamic(() => import('@/components/ui/globe'), {
  ssr: false,
  loading: () => null,
});

// --- Types ---
interface Section {
  id: string;
  badge: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  align?: 'left' | 'center' | 'right';
  meta?: string;
  features?: { title: string; description: string }[];
  actions?: { label: string; variant: 'primary' | 'secondary'; href?: string }[];
}

interface GlobePosition {
  top: string;
  left: string;
  scale: number;
}

const parsePercent = (s: string) => parseFloat(s.replace('%', ''));

// Globe positions per section (machine floats around)
const GLOBE_POSITIONS: GlobePosition[] = [
  { top: '50%', left: '72%', scale: 1.3 },
  { top: '30%', left: '65%', scale: 1.1 },
  { top: '55%', left: '25%', scale: 1.4 },
  { top: '45%', left: '68%', scale: 1.2 },
];

const DZ_SECTIONS: Section[] = [
  {
    id: 'hero',
    badge: 'D.Z Tattoo Studio',
    number: '00',
    title: 'Tatuajes que\ncuentan tu historia',
    subtitle: 'Arte con alma',
    description:
      'Estudio de tatuajes premium en Silla, Valencia. Cada pieza nace de una conversación profunda. Realismo, Fine Line, Microblading y Micropigmentación realizados con precisión y pasión.',
    align: 'left',
    meta: 'Silla · Valencia · Est. 2018',
    actions: [
      { label: 'Reservar cita', variant: 'primary', href: '#booking' },
      { label: 'Ver galería', variant: 'secondary', href: '#gallery' },
    ],
  },
  {
    id: 'services',
    badge: 'Servicios',
    number: '01',
    title: 'Todo lo que\ntu piel merece',
    description:
      'Desde el realismo fotográfico hasta el fine line más delicado. Cobertura completa de servicios de arte corporal y micropigmentación con los mejores materiales del mercado.',
    align: 'left',
    meta: '8 especialidades',
    features: [
      { title: 'Custom Tattoos & Realismo', description: 'Diseños exclusivos y fotorrealismo de alto detalle' },
      { title: 'Fine Line & Cover Ups', description: 'Líneas ultra-finas y transformación de tatuajes anteriores' },
      { title: 'Microblading & Micropigmentación', description: 'Cejas, labios y eyeliner semipermanente de precisión' },
      { title: 'Láser & Tooth Gems', description: 'Eliminación láser certificada y joyería dental premium' },
    ],
  },
  {
    id: 'philosophy',
    badge: 'Filosofía',
    number: '02',
    title: 'No hacemos\ntatuajes. Hacemos arte.',
    description:
      'Cada visita es el inicio de una transformación. Trabajamos con los protocolos de higiene más estrictos, materiales de primer nivel y una atención personal que marca la diferencia.',
    align: 'right',
    meta: '6+ años · 1000+ piezas',
    actions: [
      { label: 'Nuestro proceso', variant: 'secondary', href: '#process' },
    ],
  },
  {
    id: 'cta',
    badge: 'Reserva',
    number: '03',
    title: 'Tu transformación\nempieza aquí',
    subtitle: 'Primera consulta gratuita',
    description:
      'Cuéntanos tu idea. Nuestros artistas crearán un boceto único diseñado específicamente para ti. Sin compromiso, sin coste. Tu historia merece ser contada en la piel.',
    align: 'center',
    meta: '→ Respuesta en menos de 24h',
    actions: [
      { label: 'Solicitar consulta gratuita', variant: 'primary', href: '#booking' },
      { label: 'WhatsApp: +34 722 20 10 72', variant: 'secondary', href: 'https://wa.me/34722201072' },
    ],
  },
];

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globeTransform, setGlobeTransform] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const positions = useMemo(
    () => GLOBE_POSITIONS.map((p) => ({ top: parsePercent(p.top), left: parsePercent(p.left), scale: p.scale })),
    []
  );

  const updateScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(Math.min(Math.max(scrollTop / docH, 0), 1));

    const vcenter = window.innerHeight / 2;
    let best = 0;
    let min = Infinity;
    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const rect = ref.getBoundingClientRect();
      const d = Math.abs(rect.top + rect.height / 2 - vcenter);
      if (d < min) { min = d; best = i; }
    });

    const pos = positions[best];
    setGlobeTransform(
      `translate3d(${pos.left}vw,${pos.top}vh,0) translate3d(-50%,-50%,0) scale3d(${pos.scale},${pos.scale},1)`
    );
    setActiveSection(best);
  }, [positions]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => { updateScroll(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateScroll]);

  useEffect(() => {
    const p = positions[0];
    setGlobeTransform(`translate3d(${p.left}vw,${p.top}vh,0) translate3d(-50%,-50%,0) scale3d(${p.scale},${p.scale},1)`);
  }, [positions]);

  const handleNavClick = (href: string | undefined, e: React.MouseEvent) => {
    if (!href) return;
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden bg-[#050505] text-[#E8E2D9]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-px bg-[#111] z-50">
        <div
          className="h-full bg-[#8B0000] will-change-transform"
          style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: 'left center', transition: 'transform 0.1s ease-out' }}
        />
      </div>

      {/* Side navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5">
        {DZ_SECTIONS.map((s, i) => (
          <div key={s.id} className="relative group flex items-center justify-end gap-3">
            {/* Label */}
            <span className={cn(
              'text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap',
              activeSection === i ? 'text-[#E8E2D9] opacity-100' : 'text-[#555] opacity-0 group-hover:opacity-100'
            )}>
              {s.badge}
            </span>
            {/* Dot */}
            <button
              onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className={cn(
                'w-1.5 h-1.5 rounded-full border transition-all duration-300',
                activeSection === i ? 'bg-[#8B0000] border-[#8B0000] scale-150' : 'bg-transparent border-[#444] hover:border-[#8B0000]'
              )}
              aria-label={s.badge}
            />
          </div>
        ))}
        {/* Vertical connector */}
        <div className="absolute right-[2px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8B0000]/20 to-transparent -z-10" />
      </div>

      {/* Floating 3D Tattoo Machine */}
      <div
        className="fixed z-10 pointer-events-none will-change-transform"
        style={{
          transform: globeTransform,
          transition: 'transform 1.6s cubic-bezier(0.23,1,0.32,1)',
        }}
        aria-hidden="true"
      >
        <Globe />
      </div>

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }}
      />

      {/* Sections */}
      {DZ_SECTIONS.map((section, index) => (
        <section
          key={section.id}
          id={index === 0 ? 'hero' : section.id}
          ref={(el) => { sectionRefs.current[index] = el as HTMLDivElement | null; }}
          className={cn(
            'relative min-h-screen flex flex-col justify-center z-20',
            'px-6 sm:px-10 lg:px-16 py-24',
            section.align === 'center' && 'items-center text-center',
            section.align === 'right' && 'items-end',
          )}
        >
          <div className={cn(
            'max-w-xl',
            section.align === 'center' && 'mx-auto',
            section.align === 'right' && 'mr-0',
          )}>
            {/* Number + badge row */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#8B0000]/40 text-xs font-mono tracking-[0.3em]">{section.number}</span>
              <div className="h-px flex-1 bg-[#8B0000]/20 max-w-[40px]" />
              <span className="text-[#8B0000] text-[10px] font-mono tracking-[0.4em] uppercase">{section.badge}</span>
            </div>

            {/* Title */}
            <h1 className={cn(
              'font-black leading-[0.95] tracking-tight mb-6 uppercase',
              index === 0 ? 'text-5xl sm:text-6xl lg:text-7xl' : 'text-4xl sm:text-5xl lg:text-6xl'
            )}>
              {section.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 0 ? line : <span className="text-gradient">{line}</span>}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {section.subtitle && (
              <p className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase mb-6">
                — {section.subtitle}
              </p>
            )}

            {/* Description */}
            <p className="text-[#B0A89E] leading-relaxed text-sm sm:text-base mb-8 max-w-md">
              {section.description}
            </p>

            {/* Meta */}
            {section.meta && (
              <p className="text-[#555] text-[10px] font-mono tracking-[0.3em] uppercase mb-8">
                {section.meta}
              </p>
            )}

            {/* Features */}
            {section.features && (
              <div className="grid grid-cols-1 gap-px bg-[#111] border border-[#111] mb-8">
                {section.features.map((f, fi) => (
                  <div key={fi} className="bg-[#050505] p-5 hover:bg-[#0a0000] transition-colors duration-300 group">
                    <div className="flex items-start gap-4">
                      <span className="text-[#8B0000]/40 text-xs font-mono mt-0.5 flex-shrink-0">
                        {String(fi + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-[#E8E2D9] text-sm font-bold mb-1 group-hover:text-[#E8E2D9] uppercase tracking-wide">
                          {f.title}
                        </p>
                        <p className="text-[#B0A89E] text-xs leading-relaxed">{f.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            {section.actions && (
              <div className={cn('flex flex-col sm:flex-row gap-3', section.align === 'center' && 'justify-center')}>
                {section.actions.map((action, ai) => (
                  <a
                    key={ai}
                    href={action.href ?? '#'}
                    onClick={(e) => handleNavClick(action.href, e)}
                    target={action.href?.startsWith('http') ? '_blank' : undefined}
                    rel={action.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300',
                      action.variant === 'primary'
                        ? 'btn-cta'
                        : 'btn-outline-round',
                    )}
                  >
                    {action.label}
                    {action.variant === 'primary' && <ArrowRight size={14} />}
                  </a>
                ))}
              </div>
            )}

            {/* Hero WhatsApp floating CTA */}
            {index === 0 && (
              <div className="mt-16 flex items-center gap-6 border-t border-[#111] pt-6">
                <a
                  href="https://wa.me/34722201072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#B0A89E] text-xs tracking-widest uppercase hover:text-[#E8E2D9] transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
                <span className="text-[#333] text-xs">·</span>
                <a href="tel:+34722201072" className="text-[#B0A89E] text-xs tracking-widest uppercase hover:text-[#E8E2D9] transition-colors font-mono">
                  +34 722 20 10 72
                </a>
                <span className="text-[#333] text-xs">·</span>
                <a
                  href="https://www.instagram.com/d.z.tattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B0A89E] text-xs tracking-widest uppercase hover:text-[#E8E2D9] transition-colors"
                >
                  @d.z.tattoo
                </a>
              </div>
            )}
          </div>

          {/* Section bottom rule */}
          <div className="absolute bottom-0 left-6 right-6 h-px bg-[#111]" />
        </section>
      ))}
    </div>
  );
}
