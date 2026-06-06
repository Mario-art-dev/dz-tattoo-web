import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies | D.Z Tattoo Studio',
  description: 'Información sobre el uso de cookies en dztattoo.es.',
  robots: { index: false, follow: false },
};

export default function Cookies() {
  return (
    <main className="min-h-screen bg-[#111111] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/" className="text-[#8B0000] text-xs tracking-[0.3em] uppercase hover:text-[#E8E2D9] transition-colors">
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-4xl font-black uppercase mb-4 text-[#E8E2D9]">Política de Cookies</h1>
        <div className="h-px bg-[#8B0000] w-24 mb-12" />

        <div className="space-y-8 text-[#B0A89E] text-sm leading-relaxed">
          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia de navegación.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">Cookies que utilizamos</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse mt-4">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-3 pr-4 text-[#E8E2D9] uppercase tracking-wider font-bold">Nombre</th>
                    <th className="text-left py-3 pr-4 text-[#E8E2D9] uppercase tracking-wider font-bold">Tipo</th>
                    <th className="text-left py-3 pr-4 text-[#E8E2D9] uppercase tracking-wider font-bold">Finalidad</th>
                    <th className="text-left py-3 text-[#E8E2D9] uppercase tracking-wider font-bold">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  <tr>
                    <td className="py-3 pr-4 text-[#E8E2D9]">dz-cookies-accepted</td>
                    <td className="py-3 pr-4">Esencial</td>
                    <td className="py-3 pr-4">Guardar tu preferencia de cookies</td>
                    <td className="py-3">1 año</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-[#E8E2D9]">dz_panel_auth</td>
                    <td className="py-3 pr-4">Esencial</td>
                    <td className="py-3 pr-4">Sesión del panel de gestión interno</td>
                    <td className="py-3">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">Cookies esenciales</h2>
            <p>Este sitio web solo utiliza cookies estrictamente necesarias para su funcionamiento. No empleamos cookies de seguimiento, publicidad ni analítica de terceros. Las cookies esenciales no pueden desactivarse ya que son imprescindibles para el correcto funcionamiento del sitio.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">Cómo gestionar las cookies</h2>
            <p>Puedes controlar y/o eliminar las cookies cuando lo desees. Para ello, puedes configurar tu navegador:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Chrome: Configuración → Privacidad y seguridad → Cookies</li>
              <li>Firefox: Opciones → Privacidad y seguridad</li>
              <li>Safari: Preferencias → Privacidad</li>
              <li>Edge: Configuración → Privacidad, búsqueda y servicios</li>
            </ul>
            <p className="mt-3">También puedes gestionar tus preferencias haciendo clic en el banner de cookies al acceder al sitio.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">Más información</h2>
            <p>
              Para más información sobre cómo tratamos tus datos, consulta nuestra{' '}
              <Link href="/privacidad" className="text-[#8B0000] hover:underline">Política de Privacidad</Link>.
              Para cualquier consulta, contáctanos en info@dztattoo.es.
            </p>
          </section>

          <p className="pt-4 border-t border-[#1a1a1a]"><strong className="text-[#E8E2D9]">Última actualización:</strong> Junio 2025</p>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-[#1a1a1a] pt-8">
          <Link href="/aviso-legal" className="text-[#8B0000] text-xs tracking-widest uppercase hover:underline">Aviso Legal</Link>
          <Link href="/privacidad" className="text-[#8B0000] text-xs tracking-widest uppercase hover:underline">Política de Privacidad</Link>
        </div>
      </div>
    </main>
  );
}
