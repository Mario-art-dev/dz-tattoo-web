'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.sec-desc').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 91%', toggleActions: 'play none none reset' } }
        );
      });
      gsap.utils.toArray<HTMLElement>('.sec-meta').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reset' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
