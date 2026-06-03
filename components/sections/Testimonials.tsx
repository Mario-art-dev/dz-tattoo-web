'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'María G.', service: 'Realismo', year: '2024', rating: 5, text: 'Una experiencia increíble de principio a fin. Dani entendió exactamente lo que quería y el resultado superó todas mis expectativas. El trato personal es único.' },
  { name: 'Carlos M.', service: 'Custom Tattoo', year: '2024', rating: 5, text: 'Profesionalismo absoluto. El estudio está impecable, materiales de primera y el resultado es una obra de arte. Llevo tres tatuajes aquí y siempre supera las expectativas.' },
  { name: 'Laura S.', service: 'Microblading', year: '2024', rating: 5, text: 'El microblading de Sara es espectacular. Cejas naturales, perfectas y duraderas. Me explicó todo el proceso con paciencia. ¡Volvería sin dudarlo!' },
  { name: 'Antonio L.', service: 'Fine Line', year: '2024', rating: 5, text: 'Fui con miedo porque era mi primer tatuaje y salí completamente enamorado del resultado. Proceso cómodo, ambiente relajado. Totalmente recomendable.' },
  { name: 'Sofía R.', service: 'Cover Up', year: '2023', rating: 5, text: 'Quería tapar un tatuaje antiguo y pensé que sería imposible. El cover up es impresionante, no hay rastro del anterior. Creatividad y técnica al máximo nivel.' },
  { name: 'Pablo F.', service: 'Realismo', year: '2023', rating: 5, text: 'Estudio moderno, artistas excepcionales y un trato muy personal. El realismo es de otro nivel. El mejor estudio de Valencia sin ninguna duda.' },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(false);

  const go = (next: number) => {
    if (anim) return;
    setAnim(true);
    const t = trackRef.current;
    if (t) {
      gsap.to(t, { opacity: 0, y: -8, duration: 0.18, onComplete: () => {
        setIdx(next);
        gsap.fromTo(t, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, onComplete: () => setAnim(false) });
      }});
    }
  };

  const prev = () => go((idx - 1 + reviews.length) % reviews.length);
  const next = () => go((idx + 1) % reviews.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.t-reveal', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [idx]);

  const r = reviews[idx];

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-14 sm:py-24 lg:py-32 bg-[#050505] border-t border-[#0f0f0f]" aria-label="Testimonios">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 border-b border-[#111] pb-8 t-reveal">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#8B0000]/60 text-xs font-mono tracking-[0.3em]">05 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Testimonios</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-tight">
              Lo que dicen<br />
              <span className="text-gradient">nuestros clientes</span>
            </h2>
          </div>
          {/* Google badge */}
          <div className="border border-[#111] px-6 py-4 flex items-center gap-4 bg-[#080808]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#8B0000] text-[#8B0000]" />)}
            </div>
            <div className="h-8 w-px bg-[#1a1a1a]" />
            <div className="font-mono">
              <p className="text-[#E8E2D9] font-black text-lg leading-none">5.0</p>
              <p className="text-[#555] text-[10px] tracking-widest uppercase mt-0.5">Google</p>
            </div>
          </div>
        </div>

        {/* Review display */}
        <div ref={trackRef} className="t-reveal mb-12">
          <div className="border border-[#111] bg-[#080808] p-8 sm:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="fill-[#8B0000] text-[#8B0000]" />)}
            </div>

            <blockquote className="text-[#E8E2D9] text-xl sm:text-2xl font-light leading-relaxed italic mb-8 max-w-3xl">
              &ldquo;{r.text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between border-t border-[#111] pt-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border border-[#8B0000]/30 flex items-center justify-center">
                  <span className="text-[#8B0000] text-xs font-black">{r.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-[#E8E2D9] font-bold text-sm uppercase tracking-wider">{r.name}</p>
                  <p className="text-[#555] text-[10px] font-mono">{r.service} · {r.year}</p>
                </div>
              </div>
              <p className="text-[#333] text-xs font-mono">{idx + 1} / {reviews.length}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="t-reveal flex items-center justify-between">
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`transition-all duration-300 ${i === idx ? 'w-6 h-0.5 bg-[#8B0000]' : 'w-1 h-0.5 bg-[#2a2a2a] hover:bg-[#8B0000]/40'}`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="border border-[#1a1a1a] hover:border-[#8B0000]/50 p-3 text-[#555] hover:text-[#E8E2D9] transition-all" aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="border border-[#1a1a1a] hover:border-[#8B0000]/50 p-3 text-[#555] hover:text-[#E8E2D9] transition-all" aria-label="Siguiente">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
