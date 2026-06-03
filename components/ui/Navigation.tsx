'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Artistas', href: '#artists' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Proceso', href: '#process' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(menu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo(menu.querySelectorAll('a'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.1 });
    }
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-glass py-3' : 'py-6'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="D.Z Tattoo Studio">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border border-[#8B0000] rotate-45 transition-transform duration-500 group-hover:rotate-[405deg]" />
              <span className="absolute inset-0 flex items-center justify-center text-[#E8E2D9] font-bold text-sm tracking-widest">DZ</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[#E8E2D9] font-bold text-sm tracking-[0.2em] uppercase leading-none">D.Z Tattoo</p>
              <p className="text-[#8B0000] text-[10px] tracking-[0.3em] uppercase">Studio</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#B0A89E] text-xs tracking-[0.15em] uppercase hover:text-[#E8E2D9] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8B0000] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+34722201072"
              className="hidden sm:flex items-center gap-2 text-[#B0A89E] text-xs tracking-wider hover:text-[#E8E2D9] transition-colors"
              aria-label="Llamar al estudio"
            >
              <Phone size={14} />
              <span className="hidden md:inline">722 20 10 72</span>
            </a>
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="btn-primary px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase rounded-none"
            >
              Reservar
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#E8E2D9] p-1"
              aria-label="Menú"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-[#050505]/98 flex flex-col justify-center px-8"
          role="dialog"
          aria-label="Menú móvil"
        >
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#E8E2D9] text-4xl font-bold tracking-tight hover:text-[#8B0000] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-[#1a1a1a] flex flex-col gap-4">
              <a href="tel:+34722201072" className="text-[#B0A89E] text-sm tracking-widest">
                +34 722 20 10 72
              </a>
              <a href="mailto:info@dztattoo.es" className="text-[#B0A89E] text-sm tracking-widest">
                info@dztattoo.es
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
