'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full h-[2px] z-[9998] pointer-events-none origin-left"
      style={{
        transform: 'scaleX(0)',
        background: 'linear-gradient(90deg, #8B0000 0%, #C41E1E 50%, #FF3030 100%)',
      }}
      aria-hidden="true"
    />
  );
}
