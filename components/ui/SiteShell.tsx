'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import PageIntro from './PageIntro';
import ScrollProgress from './ScrollProgress';
import CursorFollower from './CursorFollower';
import ScrollReveal from './ScrollReveal';
import CookieBanner from './CookieBanner';
import AuthModal from './AuthModal';

export default function SiteShell() {
  const pathname = usePathname();
  if (pathname?.startsWith('/panel')) return null;
  return (
    <>
      <PageIntro />
      <ScrollProgress />
      <CursorFollower />
      <Navigation />
      <ScrollReveal />
      <CookieBanner />
      <AuthModal />
      <div className="fixed bottom-0 left-0 right-0 z-[9990] pointer-events-none select-none flex items-center justify-center py-1.5 bg-[#050505]/80 backdrop-blur-sm border-t border-[#1a1a1a]">
        <p className="text-[#444] text-[9px] font-mono tracking-[0.25em] uppercase">
          Prototipo privado para D.Z Tattoo Studio &nbsp;·&nbsp; © 2026 Todos los derechos reservados
        </p>
      </div>
    </>
  );
}
