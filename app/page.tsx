import LandingPage from '@/components/ui/landing-page';
import BookingBanner from '@/components/ui/BookingBanner';
import FloatingWork from '@/components/sections/FloatingWork';
import About from '@/components/sections/About';
import Philosophy from '@/components/sections/Philosophy';
import Services from '@/components/sections/Services';
import Artists from '@/components/sections/Artists';
import Gallery from '@/components/sections/Gallery';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Booking from '@/components/sections/Booking';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import MarqueeBand from '@/components/ui/MarqueeBand';

export default function HomePage() {
  return (
    <main id="top">
      <BookingBanner />
      <LandingPage />
      <FloatingWork />
      <About />
      <MarqueeBand items={['Premium', 'Valencia', 'Arte con Alma', 'Silla', 'Custom Tattoo', 'Realismo', 'Fine Line', 'Cover Up']} speed={0.8} />
      <Philosophy />
      <Services />
      <MarqueeBand items={['6+ Años', '1K+ Tatuajes', '5.0 Rating', 'Higiene Certificada', 'Arte Exclusivo', 'Primera Consulta Gratis']} speed={0.7} direction="right" />
      <Artists />
      <Gallery />
      <Process />
      <MarqueeBand items={['Consulta Gratuita', 'Diseño Exclusivo', 'Revisión Incluida', 'Arte Garantizado', 'WhatsApp 24h', 'Proceso Transparente']} speed={0.9} />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
