'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

const footerLinks = {
  servicios: [
    { label: 'Custom Tattoos', href: '#services' },
    { label: 'Realismo', href: '#services' },
    { label: 'Fine Line', href: '#services' },
    { label: 'Cover Ups', href: '#services' },
    { label: 'Eliminación Láser', href: '#services' },
    { label: 'Microblading', href: '#services' },
    { label: 'Micropigmentación', href: '#services' },
    { label: 'Joyería Dental', href: '#services' },
  ],
  estudio: [
    { label: 'Nosotros', href: '#about' },
    { label: 'Artistas', href: '#artists' },
    { label: 'Proceso', href: '#process' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Testimonios', href: '#testimonials' },
    { label: 'Reservar cita', href: '#booking' },
  ],
  legal: [
    { label: 'Aviso Legal', href: '/aviso-legal' },
    { label: 'Política de Privacidad', href: '/privacidad' },
    { label: 'Política de Cookies', href: '/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#111]" role="contentinfo">
      {/* CTA Banner */}
      <div className="border-b border-[#111] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#8B0000] text-xs tracking-[0.4em] uppercase mb-2">¿Listo para transformarte?</p>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#E8E2D9]">
              Reserva tu cita hoy
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-cta px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase text-center"
            >
              Reservar cita
            </a>
            <a
              href="https://wa.me/34722201072"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/images/logo.png" alt="D.Z Tattoo Studio" fill className="object-cover" sizes="56px" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/logo.svg'; }} />
              </div>
              <div>
                <p className="text-[#E8E2D9] font-bold text-sm tracking-[0.2em] uppercase">D.Z Tattoo</p>
                <p className="text-[#8B0000] text-[10px] font-mono tracking-[0.3em] uppercase">Studio · Valencia</p>
              </div>
            </div>
            <p className="text-[#B0A89E] text-sm leading-relaxed mb-6">
              Arte con alma. Estudio de tatuajes premium en Silla, Valencia. Especialistas en realismo, fine line y micropigmentación.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/d.z.tattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B0A89E] hover:text-[#8B0000] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="tel:+34722201072"
                className="text-[#B0A89E] hover:text-[#8B0000] transition-colors"
                aria-label="Teléfono"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://wa.me/34722201072"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B0A89E] hover:text-[#8B0000] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-[#E8E2D9] text-xs tracking-[0.3em] uppercase font-bold mb-6">Servicios</p>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-[#B0A89E] text-sm hover:text-[#8B0000] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <p className="text-[#E8E2D9] text-xs tracking-[0.3em] uppercase font-bold mb-6">El estudio</p>
            <ul className="space-y-3">
              {footerLinks.estudio.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-[#B0A89E] text-sm hover:text-[#8B0000] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#E8E2D9] text-xs tracking-[0.3em] uppercase font-bold mb-6">Contacto</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <p className="text-[#B0A89E] text-sm leading-relaxed">
                  Av. Luis Vives 12<br />
                  46460 Silla, Valencia
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#8B0000] flex-shrink-0" />
                <a href="tel:+34722201072" className="text-[#B0A89E] text-sm hover:text-[#8B0000] transition-colors">
                  +34 722 20 10 72
                </a>
              </div>
              <div className="flex items-center gap-3">
                <InstagramIcon size={16} className="text-[#8B0000] flex-shrink-0" />
                <a
                  href="https://www.instagram.com/d.z.tattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B0A89E] text-sm hover:text-[#8B0000] transition-colors"
                >
                  @d.z.tattoo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#111] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555] text-xs tracking-widest">
            © {new Date().getFullYear()} D.Z Tattoo Studio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[#555] text-xs tracking-wider hover:text-[#8B0000] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
