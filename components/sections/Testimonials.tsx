'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { name: 'María G.', service: 'Realismo', year: '2024', rating: 5, text: 'Una experiencia increíble de principio a fin. Dani entendió exactamente lo que quería y el resultado superó todas mis expectativas. El trato personal es único.' },
  { name: 'Carlos M.', service: 'Custom Tattoo', year: '2024', rating: 5, text: 'Profesionalismo absoluto. El estudio está impecable, materiales de primera y el resultado es una obra de arte. Llevo tres tatuajes aquí y siempre supera las expectativas.' },
  { name: 'Jujialmoto 72', service: 'Tatuaje', year: '2024', rating: 5, text: 'Trato muy personal. Te resuelve cualquier duda que pueda surgir sobre la idea que tengas acerca del tattoo que quieres. Profesional dónde los haya. Te mima y te aconseja cómo si fuese para él. Espectacular local y gran tipo el Dani. Recomendable al 100%.' },
  { name: 'Laura S.', service: 'Microblading', year: '2024', rating: 5, text: 'El microblading de Sara es espectacular. Cejas naturales, perfectas y duraderas. Me explicó todo el proceso con paciencia. ¡Volvería sin dudarlo!' },
  { name: 'Loles Capilla', service: 'Custom Tattoo', year: '2024', rating: 5, text: 'Los diseños personalizados son una pasada, muy profesional, se nota que le gusta y disfruta lo que hace. Recomendable 100%.' },
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
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
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
    <section id="testimonials" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#111111] border-t border-[#1b1b1b]" aria-label="Testimonios">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8B0000]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-16 sm:mb-24 lg:mb-32 border-b border-[#111] pb-8 t-reveal">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">05 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Testimonios</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-tight">
              Lo que dicen<br />
              <span className="text-gradient">nuestros clientes</span>
            </h2>
          </div>
        </div>

        {/* Review display */}
        <div ref={trackRef} className="t-reveal mb-12">
          <div className="border border-[#111] bg-[#141414] p-10 sm:p-16">
            {/* Stars + rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} className="fill-[#8B0000] text-[#8B0000]" />)}
              </div>
              <span className="text-[#E8E2D9] text-sm font-black font-mono">{r.rating}.0</span>
            </div>

            <div className="relative mb-8">
              <span className="absolute -top-6 -left-2 text-[6rem] leading-none text-[#8B0000]/15 font-serif select-none pointer-events-none">&ldquo;</span>
              <blockquote className="text-[#E8E2D9] text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.3] italic max-w-3xl relative z-10">
                &ldquo;{r.text}&rdquo;
              </blockquote>
            </div>

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
          <div className="flex gap-3">
            <button onClick={prev} className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border border-[#1a1a1a] hover:border-[#8B0000]/50 hover:bg-[#8B0000]/10 text-[#555] hover:text-[#E8E2D9] transition-all duration-200 active:scale-95 group" aria-label="Anterior">
              <ChevronLeft size={24} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button onClick={next} className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border border-[#1a1a1a] hover:border-[#8B0000]/50 hover:bg-[#8B0000]/10 text-[#555] hover:text-[#E8E2D9] transition-all duration-200 active:scale-95 group" aria-label="Siguiente">
              <ChevronRight size={24} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
