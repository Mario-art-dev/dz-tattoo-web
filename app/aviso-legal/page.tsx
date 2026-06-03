import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal | D.Z Tattoo Studio',
  description: 'Aviso legal de D.Z Tattoo Studio, Silla Valencia.',
  robots: { index: false, follow: false },
};

export default function AvisoLegal() {
  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/" className="text-[#8B0000] text-xs tracking-[0.3em] uppercase hover:text-[#E8E2D9] transition-colors">
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-4xl font-black uppercase mb-4 text-[#E8E2D9]">Aviso Legal</h1>
        <div className="h-px bg-[#8B0000] w-24 mb-12" />

        <div className="prose-custom space-y-8 text-[#B0A89E] text-sm leading-relaxed">
          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">1. Datos identificativos del titular</h2>
            <p>En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSICE), se facilitan los siguientes datos:</p>
            <ul className="mt-4 space-y-2 list-none">
              <li><strong className="text-[#E8E2D9]">Denominación social:</strong> D.Z Tattoo Studio</li>
              <li><strong className="text-[#E8E2D9]">Nombre comercial:</strong> D.Z Tattoo / D.Z Studio</li>
              <li><strong className="text-[#E8E2D9]">Domicilio:</strong> Av. Luis Vives 12, 46460 Silla (Valencia)</li>
              <li><strong className="text-[#E8E2D9]">Teléfono:</strong> +34 722 20 10 72</li>
              <li><strong className="text-[#E8E2D9]">Correo electrónico:</strong> info@dztattoo.es</li>
              <li><strong className="text-[#E8E2D9]">Sitio web:</strong> https://dztattoo.es</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">2. Objeto y ámbito de aplicación</h2>
            <p>El presente Aviso Legal regula el acceso y uso del sitio web dztattoo.es, cuya titularidad corresponde a D.Z Tattoo Studio. El acceso al sitio web supone la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">3. Propiedad intelectual e industrial</h2>
            <p>Todos los contenidos del sitio web (textos, fotografías, imágenes, logotipos, diseños, código fuente) son titularidad de D.Z Tattoo Studio o cuenta con licencia de uso, y están protegidos por las leyes de propiedad intelectual e industrial vigentes. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">4. Exclusión de garantías y responsabilidad</h2>
            <p>D.Z Tattoo Studio no se responsabiliza de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar errores u omisiones en los contenidos, la indisponibilidad del portal, o la transmisión de virus o programas maliciosos.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">5. Legislación aplicable y jurisdicción</h2>
            <p>La relación entre D.Z Tattoo Studio y el usuario se regirá por la normativa española vigente. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Valencia, con renuncia a cualquier otro fuero.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">6. Modificaciones</h2>
            <p>D.Z Tattoo Studio se reserva el derecho a modificar el presente Aviso Legal en cualquier momento. Es responsabilidad del usuario revisarlo periódicamente.</p>
            <p className="mt-4"><strong className="text-[#E8E2D9]">Última actualización:</strong> Junio 2025</p>
          </section>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-[#1a1a1a] pt-8">
          <Link href="/privacidad" className="text-[#8B0000] text-xs tracking-widest uppercase hover:underline">Política de Privacidad</Link>
          <Link href="/cookies" className="text-[#8B0000] text-xs tracking-widest uppercase hover:underline">Política de Cookies</Link>
        </div>
      </div>
    </main>
  );
}
