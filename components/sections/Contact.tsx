'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { day: 'Lunes — Viernes', time: '10:00 — 20:00', open: true, note: 'Con pausa al mediodía' },
  { day: 'Sábado', time: 'Con cita previa', open: true, note: null },
  { day: 'Domingo', time: 'Cerrado', open: false, note: null },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-card', { opacity: 0, y: 25, scale: 0.98 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-40 bg-[#080808] overflow-hidden" aria-label="Contacto">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B0000]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header — more persuasive */}
        <div className="text-center mb-16 ct-card">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#8B0000]/60 text-xs font-mono tracking-[0.3em]">08 /</span>
            <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Contacto</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] mb-6">
            Tu tatuaje soñado<br />
            <span className="text-gradient">empieza con una llamada</span>
          </h2>
          <p className="text-[#B0A89E] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            No esperes más. Estamos en Silla, Valencia, listos para escuchar tu idea y convertirla en arte que dure toda la vida.
          </p>
        </div>

        {/* MAIN CONTACT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* WhatsApp — highlighted */}
          <a
            href="https://wa.me/34722201072?text=Hola,%20me%20gustaría%20pedir%20información"
            target="_blank" rel="noopener noreferrer"
            className="ct-card group lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d1a10] to-[#050505] border border-[#1a3a20]/60 p-8 hover:border-[#1a8a3a]/50 transition-all duration-400 flex flex-col gap-4"
            aria-label="Contactar por WhatsApp"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1a8a3a]/20 flex items-center justify-center">
              <MessageCircle size={28} className="text-[#22a848]" />
            </div>
            <div>
              <p className="text-[#22a848] text-xs font-mono tracking-[0.3em] uppercase mb-1">Respuesta en &lt; 2h</p>
              <h3 className="text-[#E8E2D9] text-2xl font-black uppercase mb-2">WhatsApp</h3>
              <p className="text-[#B0A89E] text-sm leading-relaxed">La forma más rápida de ponerte en contacto. Escríbenos ahora y te respondemos en el acto.</p>
            </div>
            <div className="btn-whatsapp self-start px-6 py-3 text-sm font-bold tracking-wider uppercase">
              <MessageCircle size={16} />
              +34 722 20 10 72
            </div>
            <div className="absolute top-4 right-4 text-[#1a8a3a]/15 text-7xl font-black select-none">WA</div>
          </a>

          {/* Phone */}
          <a
            href="tel:+34722201072"
            className="ct-card group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] p-7 hover:border-[#8B0000]/40 hover:bg-[#0d0000] transition-all duration-400 flex flex-col gap-4"
            aria-label="Llamar al estudio"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/15 flex items-center justify-center">
              <Phone size={22} className="text-[#C41E1E]" />
            </div>
            <div>
              <p className="text-[#555] text-[10px] font-mono tracking-[0.3em] uppercase mb-1">Teléfono</p>
              <h3 className="text-[#E8E2D9] text-lg font-black uppercase mb-1">Llámanos</h3>
              <p className="text-[#C41E1E] text-sm font-mono font-bold">+34 722 20 10 72</p>
            </div>
            <div className="flex items-center gap-1 text-[#555] text-xs group-hover:text-[#C41E1E] transition-colors">
              <ArrowRight size={12} /> Llamar ahora
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/d.z.tattoo"
            target="_blank" rel="noopener noreferrer"
            className="ct-card group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] p-7 hover:border-[#8B0000]/40 hover:bg-[#0d0000] transition-all duration-400 flex flex-col gap-4"
            aria-label="Instagram"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/15 flex items-center justify-center">
              <InstagramIcon size={22} className="text-[#C41E1E]" />
            </div>
            <div>
              <p className="text-[#555] text-[10px] font-mono tracking-[0.3em] uppercase mb-1">Instagram</p>
              <h3 className="text-[#E8E2D9] text-lg font-black uppercase mb-1">@d.z.tattoo</h3>
              <p className="text-[#B0A89E] text-xs leading-relaxed">Descubre nuestro trabajo y referencias</p>
            </div>
            <div className="flex items-center gap-1 text-[#555] text-xs group-hover:text-[#C41E1E] transition-colors">
              <ArrowRight size={12} /> Ver perfil
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Address + Map */}
          <div className="lg:col-span-2 ct-card rounded-3xl overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a]">
            <div className="relative" style={{ height: '360px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.4!2d-0.4141!3d39.3612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604e5b6c5a8a5b%3A0x0!2sAv.+Luis+Vives+12%2C+46460+Silla%2C+Valencia!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(92%) hue-rotate(180deg) saturate(0.65) brightness(0.72)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación D.Z Tattoo Studio"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border-t border-[#111]">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8B0000]/15 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#C41E1E]" />
                </div>
                <div>
                  <p className="text-[#E8E2D9] font-bold">Av. Luis Vives 12</p>
                  <p className="text-[#B0A89E] text-sm">46460 Silla, Valencia</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Av.+Luis+Vives+12,+46460+Silla,+Valencia"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline-round px-5 py-2.5 text-xs font-bold tracking-wider uppercase flex items-center gap-2"
              >
                <MapPin size={12} /> Cómo llegar
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="ct-card rounded-3xl border border-[#1a1a1a] bg-[#0a0a0a] p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-[#8B0000]/15 flex items-center justify-center">
                <Clock size={18} className="text-[#C41E1E]" />
              </div>
              <div>
                <p className="text-[#E8E2D9] font-bold uppercase tracking-wide text-sm">Horario</p>
                <p className="text-[#555] text-xs">Estudio D.Z Tattoo</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {hours.map((h) => (
                <div key={h.day} className={`flex justify-between items-start gap-4 pb-4 border-b border-[#0f0f0f] last:border-b-0 last:pb-0 ${!h.open ? 'opacity-30' : ''}`}>
                  <div>
                    <p className="text-[#E8E2D9] text-sm font-medium">{h.day}</p>
                    {h.note && <p className="text-[#555] text-[10px] mt-0.5">{h.note}</p>}
                  </div>
                  <span className={`text-xs font-mono font-bold flex-shrink-0 ${h.open && h.time !== 'Cerrado' ? 'text-[#C41E1E]' : 'text-[#444]'}`}>
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-[#111]">
              <p className="text-[#B0A89E] text-sm mb-4">¿Listo para empezar?</p>
              <a
                href="#booking"
                onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary-round w-full py-3.5 text-xs font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2"
              >
                Reservar cita <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
