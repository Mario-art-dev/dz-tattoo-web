import Hero from '@/components/sections/Hero';
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

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <About />
      <Philosophy />
      <Services />
      <Artists />
      <Gallery />
      <Process />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
