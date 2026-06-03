'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'María García',
    rating: 5,
    text: 'Una experiencia increíble de principio a fin. Dani entendió exactamente lo que quería y el resultado superó todas mis expectativas. El trato personal es único, te hacen sentir especial desde el primer momento.',
    service: 'Realismo',
    date: '2024',
  },
  {
    name: 'Carlos Martínez',
    rating: 5,
    text: 'Profesionalismo absoluto. El estudio está impecable, los materiales son de primera y el resultado es una obra de arte. Llevo tres tatuajes aquí y siempre supera mis expectativas.',
    service: 'Custom Tattoo',
    date: '2024',
  },
  {
    name: 'Laura Sánchez',
    rating: 5,
    text: 'El microblading de Sara es espectacular. Cejas naturales, perfectas y duraderas. Me explico todo el proceso con mucha paciencia y el resultado es exactamente lo que buscaba. ¡Volvería sin dudarlo!',
    service: 'Microblading',
    date: '2024',
  },
  {
    name: 'Antonio López',
    rating: 5,
    text: 'Fui con miedo porque era mi primer tatuaje y salí completamente enamorado del resultado. El proceso fue muy cómodo, el ambiente relajado y Dani es un auténtico artista. Totalmente recomendable.',
    service: 'Fine Line',
    date: '2024',
  },
  {
    name: 'Sofía Ruiz',
    rating: 5,
    text: 'Quería tapar un tatuaje antiguo y pensé que sería imposible. El resultado del cover up es impresionante, no hay rastro del anterior. Creatividad y técnica al máximo nivel.',
    service: 'Cover Up',
    date: '2023',
  },
  {
    name: 'Pablo Fernández',
    rating: 5,
    text: 'Estudio moderno, artistas excepcionales y un trato muy personal. Me asesoraron sobre el diseño con mucha paciencia y el realismo en el tatuaje es de otro nivel. El mejor estudio de Valencia.',
    service: 'Realismo',
    date: '2023',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const track = trackRef.current;
    if (track) {
      gsap.to(track, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
          setCurrent(index);
          gsap.fromTo(track, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, onComplete: () => setIsAnimating(false) });
        },
      });
    }
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.testimonial-reveal') ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto advance
  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const item = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      aria-label="Opiniones de clientes"
    >
      {/* Background quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[#0a0a0a] text-[25vw] font-black leading-none">"</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 testimonial-reveal">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Testimonios</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            Lo que dicen<br />
            <span className="text-gradient">nuestros clientes</span>
          </h2>
        </div>

        <div ref={trackRef} className="testimonial-reveal">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-[#8B0000] text-[#8B0000]" />
              ))}
            </div>

            <blockquote className="text-[#E8E2D9] text-xl sm:text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto mb-8 italic">
              &ldquo;{item.text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#8B0000]" />
              <div>
                <p className="text-[#E8E2D9] font-bold text-sm uppercase tracking-widest">{item.name}</p>
                <p className="text-[#8B0000] text-xs tracking-widest uppercase">{item.service} · {item.date}</p>
              </div>
              <div className="h-px w-12 bg-[#8B0000]" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12 testimonial-reveal">
          <button
            onClick={prev}
            className="text-[#B0A89E] hover:text-[#E8E2D9] transition-colors border border-[#2a2a2a] hover:border-[#8B0000]/50 p-3"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 ${
                  i === current ? 'w-8 h-1 bg-[#8B0000]' : 'w-1 h-1 bg-[#2a2a2a] hover:bg-[#8B0000]/50'
                }`}
                aria-label={`Ir al testimonio ${i + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-[#B0A89E] hover:text-[#E8E2D9] transition-colors border border-[#2a2a2a] hover:border-[#8B0000]/50 p-3"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Google rating badge */}
        <div className="mt-16 text-center testimonial-reveal">
          <div className="inline-flex items-center gap-4 border border-[#1a1a1a] px-8 py-4 bg-[#080808]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-[#8B0000] text-[#8B0000]" />
              ))}
            </div>
            <div className="h-8 w-px bg-[#2a2a2a]" />
            <div>
              <p className="text-[#E8E2D9] font-black text-lg">5.0</p>
              <p className="text-[#B0A89E] text-[10px] tracking-widest uppercase">Google Reviews</p>
            </div>
            <div className="h-8 w-px bg-[#2a2a2a]" />
            <p className="text-[#B0A89E] text-xs">+50 reseñas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
