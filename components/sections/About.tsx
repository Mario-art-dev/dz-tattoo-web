'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

function AnimatedStat({ value, meta, label }: { value: string; meta: string; label: string }) {
  const numRef = useRef<HTMLParagraphElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current || !wrapRef.current) return;
    const m = value.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (!m) return;
    const target = parseFloat(m[1]);
    const suffix = m[2];
    const dp = m[1].includes('.') ? 1 : 0;

    const ctx = gsap.context(() => {
      const obj = { n: 0 };
      gsap.to(obj, {
        n: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate() {
          if (numRef.current) numRef.current.textContent = obj.n.toFixed(dp) + suffix;
        },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 88%',
          toggleActions: 'play reset play reset',
        },
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={wrapRef} className="about-stat bg-[#050505] p-6 group hover:bg-[#0f0808] transition-colors duration-300">
      <p className="text-[#666] text-[10px] font-mono tracking-[0.3em] uppercase mb-2">{meta}</p>
      <p ref={numRef} className="text-[#E8E2D9] text-3xl font-black mb-1">{value}</p>
      <p className="text-[#555] text-[11px] tracking-wider uppercase">{label}</p>
    </div>
  );
}

const stats = [
  { value: '6+', label: 'Años de experiencia', meta: 'Years' },
  { value: '1K+', label: 'Tatuajes realizados', meta: 'Works' },
  { value: '5.0', label: 'Google Reviews', meta: 'Rating' },
  { value: '100%', label: 'Material desechable', meta: 'Hygiene' },
];

const values = [
  { code: 'ART', label: 'Arte personalizado', desc: 'Diseños únicos desde cero, sin plantillas ni copias.' },
  { code: 'TEC', label: 'Técnica impecable', desc: 'Años de práctica en realismo, fine line y micropigmentación.' },
  { code: 'HYG', label: 'Higiene certificada', desc: 'Protocolo ISO. Material nuevo y esterilizado en cada sesión.' },
  { code: 'EXP', label: 'Experiencia premium', desc: 'Atención personalizada de la primera consulta al resultado final.' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-eyebrow', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('h2', { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut',
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
      gsap.fromTo('.about-stat', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-stats', start: 'top 84%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.about-value', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-values', start: 'top 85%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.about-image', { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut',
        scrollTrigger: { trigger: '.about-image', start: 'top 82%', toggleActions: 'play reverse play reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-32 lg:py-44 bg-[#050505] border-t border-[#0f0f0f]"
      aria-label="Sobre nosotros"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#8B0000]/7 rounded-full blur-[130px] pointer-events-none translate-x-1/3" />
      <span className="pointer-events-none select-none absolute right-[-2%] bottom-0 text-[20rem] font-black text-[#8B0000]/[0.025] leading-none hidden lg:block">DZ</span>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-14 sm:mb-20 lg:mb-28 border-b border-[#111] pb-8">
          <div>
            <div className="about-eyebrow flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">00 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Sobre nosotros</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Arte con alma,<br />
              <span className="text-gradient">precisión sin límites</span>
            </h2>
          </div>
          <p className="sec-desc text-[#B0A89E] text-sm leading-relaxed max-w-xs font-mono">
            D.Z Tattoo Studio<br />
            Silla, Valencia · Est. 2018
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: stats + values */}
          <div className="space-y-12">
            {/* Stats grid */}
            <div className="about-stats grid grid-cols-2 gap-px bg-[#111] border border-[#111]">
              {stats.map((s) => (
                <AnimatedStat key={s.label} value={s.value} meta={s.meta} label={s.label} />
              ))}
            </div>

            {/* Values list */}
            <div className="about-values border border-[#111]">
              {values.map((v, i) => (
                <div key={v.code} className={cn(
                  'about-value flex items-start gap-5 p-5 group hover:bg-[#0f0808] transition-colors duration-300',
                  i < values.length - 1 && 'border-b border-[#111]'
                )}>
                  <span className="text-[#555] text-xs font-mono tracking-[0.2em] flex-shrink-0 mt-0.5">{v.code}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E8E2D9] text-sm font-bold uppercase tracking-wider mb-1 group-hover:text-[#E8E2D9]">{v.label}</p>
                    <p className="text-[#B0A89E] text-xs leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="w-1 h-full bg-[#8B0000]/0 group-hover:bg-[#8B0000]/30 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="about-image relative aspect-[3/4] overflow-hidden border border-[#111]">
              <Image
                src="/images/about-studio.jpg"
                alt="Interior D.Z Tattoo Studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#150000]/60 to-[#050505]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-[#8B0000]/20 p-12">
                  <div className="w-20 h-20 border border-[#8B0000]/40 rotate-45 mx-auto flex items-center justify-center">
                    <span className="text-[#8B0000] font-black text-xl -rotate-45">DZ</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            </div>

            {/* Info label on image */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#111] bg-[#050505]/90 backdrop-blur-sm flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-[#555] text-[10px] font-mono tracking-widest uppercase">Estudio</p>
                <p className="text-[#E8E2D9] text-sm font-bold">Av. Luis Vives 12, Silla</p>
              </div>
              <div className="text-right">
                <p className="text-[#555] text-[10px] font-mono tracking-widest uppercase">Instagram</p>
                <p className="text-[#8B0000] text-sm font-mono">@d.z.tattoo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
