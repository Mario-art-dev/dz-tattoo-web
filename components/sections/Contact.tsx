'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Av. Luis Vives 12, 46460 Silla, Valencia',
    href: 'https://maps.google.com/?q=Av.+Luis+Vives+12,+46460+Silla,+Valencia',
    external: true,
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+34 722 20 10 72',
    href: 'tel:+34722201072',
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+34 722 20 10 72',
    href: 'https://wa.me/34722201072',
    external: true,
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@d.z.tattoo',
    href: 'https://www.instagram.com/d.z.tattoo',
    external: true,
  },
];

const hours = [
  { day: 'Lunes', time: '10:00 — 14:00 / 16:00 — 20:00' },
  { day: 'Martes', time: '10:00 — 14:00 / 16:00 — 20:00' },
  { day: 'Miércoles', time: '10:00 — 14:00 / 16:00 — 20:00' },
  { day: 'Jueves', time: '10:00 — 14:00 / 16:00 — 20:00' },
  { day: 'Viernes', time: '10:00 — 14:00 / 16:00 — 20:00' },
  { day: 'Sábado', time: 'Con cita previa' },
  { day: 'Domingo', time: 'Cerrado' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-[#050505]"
      aria-label="Contacto"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 contact-reveal">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Contacto</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            Ven a visitarnos<br />
            <span className="text-gradient">en Silla, Valencia</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div className="space-y-12">
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 contact-reveal">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group border border-[#1a1a1a] hover:border-[#8B0000]/40 bg-[#080808] p-6 transition-all duration-300 block"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <item.icon size={20} className="text-[#8B0000] mb-3" />
                  <p className="text-[#B0A89E] text-[10px] tracking-widest uppercase mb-1">{item.label}</p>
                  <p className="text-[#E8E2D9] text-sm group-hover:text-[#8B0000] transition-colors">{item.value}</p>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="contact-reveal">
              <div className="flex items-center gap-3 mb-6">
                <Clock size={16} className="text-[#8B0000]" />
                <span className="text-[#B0A89E] text-xs tracking-[0.3em] uppercase">Horario</span>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className={`flex justify-between items-center py-2 border-b border-[#1a1a1a] ${
                      h.time === 'Cerrado' ? 'opacity-40' : ''
                    }`}
                  >
                    <span className="text-[#E8E2D9] text-sm font-medium">{h.day}</span>
                    <span className={`text-sm font-mono ${h.time === 'Cerrado' ? 'text-[#555]' : 'text-[#8B0000]'}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="contact-reveal">
            <div className="relative w-full h-80 lg:h-full min-h-[400px] border border-[#1a1a1a] overflow-hidden bg-[#0a0a0a]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.4!2d-0.4141!3d39.3612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604e5b6c5a8a5b%3A0x0!2sAv.+Luis+Vives+12%2C+46460+Silla%2C+Valencia!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación D.Z Tattoo Studio"
              />
            </div>
            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=Av.+Luis+Vives+12,+46460+Silla,+Valencia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase w-full sm:w-auto justify-center sm:justify-start"
              >
                <MapPin size={14} />
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
