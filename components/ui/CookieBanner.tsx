'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('dz-cookies-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('dz-cookies-accepted', 'all');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('dz-cookies-accepted', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Política de cookies"
      aria-live="polite"
      className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-6 lg:left-auto lg:right-6 lg:max-w-md z-50 bg-[#0d0d0d] border border-[#1a1a1a] p-6 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-[#E8E2D9] text-sm font-bold uppercase tracking-wider">Cookies</p>
        <button
          onClick={decline}
          className="text-[#555] hover:text-[#E8E2D9] transition-colors flex-shrink-0"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>
      </div>

      <p className="text-[#B0A89E] text-xs leading-relaxed mb-6">
        Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y personalizar el contenido.
        Puedes aceptar todas las cookies o solo las esenciales.{' '}
        <Link href="/cookies" className="text-[#8B0000] hover:underline">
          Más información
        </Link>
      </p>

      <div className="flex gap-3">
        <button
          onClick={decline}
          className="btn-outline flex-1 px-4 py-2.5 text-xs tracking-wider uppercase"
        >
          Solo esenciales
        </button>
        <button
          onClick={accept}
          className="btn-primary flex-1 px-4 py-2.5 text-xs tracking-wider uppercase"
        >
          Aceptar todo
        </button>
      </div>
    </div>
  );
}
