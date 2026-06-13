'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Menu, X, Phone, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Studio', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Artistas', href: '#artists' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Proceso', href: '#process' },
  { label: 'Contacto', href: '#contact' },
];

const adminLinks = [
  { label: 'Panel de control', href: '/panel' },
];

export default function Navigation() {
  const { user, openAuth, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(menu.querySelectorAll('.mobile-link'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, delay: 0.1 });
    }
  }, [menuOpen]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) { setMenuOpen(false); return; }
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'bg-[#111111]/95 backdrop-blur-xl border-b border-[#2a2a2a]' : 'bg-transparent'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="D.Z Tattoo Studio">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="D.Z Tattoo Studio Logo"
                fill
                className="object-cover scale-[1.2]"
                sizes="64px"
                priority
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/logo.svg'; }}
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-[#E8E2D9] font-bold text-sm tracking-[0.2em] uppercase leading-none">D.Z Tattoo</p>
              <p className="text-[#B0A89E] text-[10px] font-mono tracking-[0.35em] uppercase mt-0.5">Studio · Valencia</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={e => go(e, l.href)}
                className="text-[#888] text-[11px] font-mono tracking-[0.2em] uppercase hover:text-[#E8E2D9] transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C41E1E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            {/* User/Auth button */}
            {user ? (
              <div className="relative group">
                <button className="w-9 h-9 rounded-full bg-[#C41E1E]/20 border border-[#C41E1E]/40 flex items-center justify-center text-[#C41E1E] text-sm font-black hover:bg-[#C41E1E]/30 transition-colors">
                  {(user.displayName?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
                </button>
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a1a] border border-[#2a2a2a] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-xl shadow-xl">
                  <p className="px-4 py-2 text-[#888] text-[11px] font-mono truncate">{user.displayName ?? user.email}</p>
                  <div className="border-t border-[#2a2a2a] my-1" />
                  <a href="/panel" className="block w-full text-left px-4 py-2.5 text-[#E8E2D9] text-xs font-mono tracking-wider hover:text-[#C41E1E] transition-colors">
                    Panel de control
                  </a>
                  <button onClick={() => signOut()} className="w-full text-left px-4 py-2.5 text-[#E8E2D9] text-xs font-mono tracking-wider hover:text-[#C41E1E] transition-colors">
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={openAuth}
                className="flex items-center gap-2 bg-[#C41E1E] hover:bg-[#D42020] active:scale-[0.97] text-white text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 rounded-full transition-all duration-150 shadow-lg shadow-[#C41E1E]/30">
                <UserCircle size={16} />
                Mi cuenta
              </button>
            )}
            <a
              href="tel:+34722201072"
              className="hidden md:flex items-center gap-1.5 text-[#555] hover:text-[#E8E2D9] text-[10px] font-mono tracking-widest transition-colors"
            >
              <Phone size={12} />
              722 20 10 72
            </a>
            <a
              href="#booking-form"
              onClick={e => go(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#booking-form')}
              className="btn-primary-round px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hidden sm:block"
            >
              Reservar
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#E8E2D9] border border-[#222] rounded-xl p-2 hover:border-[#8B0000]/60 transition-colors"
              aria-label="Menú"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div ref={menuRef} className="fixed inset-0 z-40 bg-[#111111] flex flex-col justify-center px-8 overflow-y-auto">
          <nav className="flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={e => go(e, l.href)}
                className="mobile-link text-[#E8E2D9] text-4xl font-black uppercase hover:text-gradient transition-colors leading-none"
              >
                {l.label}
              </a>
            ))}

            <div className="h-px bg-[#2a2a2a] my-2" />

            {user ? (
              <>
                <a href="/panel" onClick={() => setMenuOpen(false)}
                  className="mobile-link text-[#C41E1E] text-3xl font-black uppercase leading-none hover:text-[#E02020] transition-colors">
                  Panel de control
                </a>
                <button onClick={() => { signOut(); setMenuOpen(false); }}
                  className="mobile-link text-left text-[#888] text-3xl font-black uppercase leading-none hover:text-[#E8E2D9] transition-colors">
                  Cerrar sesión
                </button>
                <p className="text-[#555] text-[11px] font-mono truncate mt-1">{user.displayName ?? user.email}</p>
              </>
            ) : (
              <button onClick={() => { setMenuOpen(false); openAuth(); }}
                className="mobile-link text-left text-[#C41E1E] text-3xl font-black uppercase leading-none hover:text-[#E02020] transition-colors">
                Iniciar sesión
              </button>
            )}
          </nav>

          <div className="mt-10 pt-6 border-t border-[#2a2a2a] space-y-3">
            <a href="tel:+34722201072" className="mobile-link block text-[#777] text-sm font-mono tracking-widest hover:text-[#E8E2D9] transition-colors">+34 722 20 10 72</a>
            <a href="https://www.instagram.com/d.z.tattoo" target="_blank" rel="noopener noreferrer" className="mobile-link block text-[#777] text-sm font-mono tracking-widest hover:text-[#E8E2D9] transition-colors">@d.z.tattoo</a>
            <a href="#booking-form" onClick={e => go(e, '#booking-form')} className="mobile-link btn-primary-round inline-flex mt-4 px-8 py-4 text-sm font-bold tracking-widest uppercase">Reservar cita ahora</a>
          </div>
        </div>
      )}
    </>
  );
}
