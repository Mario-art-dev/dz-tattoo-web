import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | D.Z Tattoo Studio',
  description: 'Política de privacidad y protección de datos de D.Z Tattoo Studio.',
  robots: { index: false, follow: false },
};

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-[#111111] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <Link href="/" className="text-[#8B0000] text-xs tracking-[0.3em] uppercase hover:text-[#E8E2D9] transition-colors">
            ← Volver al inicio
          </Link>
        </div>

        <h1 className="text-4xl font-black uppercase mb-4 text-[#E8E2D9]">Política de Privacidad</h1>
        <div className="h-px bg-[#8B0000] w-24 mb-12" />

        <div className="space-y-8 text-[#B0A89E] text-sm leading-relaxed">
          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">1. Responsable del tratamiento</h2>
            <ul className="space-y-2 list-none">
              <li><strong className="text-[#E8E2D9]">Responsable:</strong> D.Z Tattoo Studio</li>
              <li><strong className="text-[#E8E2D9]">Dirección:</strong> Av. Luis Vives 12, 46460 Silla (Valencia)</li>
              <li><strong className="text-[#E8E2D9]">Contacto:</strong> info@dztattoo.es / +34 722 20 10 72</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">2. Datos que recogemos</h2>
            <p className="mb-3">Recogemos datos personales en dos contextos:</p>
            <p className="text-[#E8E2D9] text-xs uppercase tracking-wider mb-2">a) Formulario de reserva</p>
            <ul className="mt-1 mb-4 space-y-1 list-disc list-inside">
              <li>Nombre completo</li>
              <li>Número de teléfono</li>
              <li>Correo electrónico</li>
              <li>Información sobre el servicio solicitado</li>
              <li>Preferencias de fecha y hora</li>
            </ul>
            <p className="text-[#E8E2D9] text-xs uppercase tracking-wider mb-2">b) Creación de cuenta de usuario</p>
            <ul className="mt-1 space-y-1 list-disc list-inside">
              <li>Nombre o alias</li>
              <li>Correo electrónico</li>
              <li>Identificador de proveedor de autenticación (Google u otros)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">3. Finalidad del tratamiento</h2>
            <p>Los datos recogidos se utilizan exclusivamente para:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Gestionar y confirmar reservas de cita</li>
              <li>Contactarte para resolver dudas sobre tu tatuaje o servicio</li>
              <li>Enviarte información relevante sobre tu cita</li>
              <li>Permitirte acceder a tu cuenta y consultar el historial de tus reservas</li>
            </ul>
            <p className="mt-3">No utilizamos tus datos para publicidad ni los cedemos a terceros.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">4. Base legal del tratamiento</h2>
            <p>El tratamiento de tus datos se basa en tu consentimiento expreso (art. 6.1.a RGPD), otorgado al rellenar el formulario de reserva o al crear una cuenta de usuario en nuestra plataforma.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">5. Plazo de conservación</h2>
            <p>Conservamos tus datos durante el tiempo necesario para la gestión de tu cita y durante el periodo legalmente requerido. Los datos de cuenta se conservan mientras la cuenta esté activa. Puedes solicitar la eliminación en cualquier momento.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">6. Destinatarios y encargados del tratamiento</h2>
            <p className="mb-3">Para el funcionamiento de la plataforma utilizamos los siguientes servicios de terceros, todos bajo los términos del RGPD:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-[#E8E2D9]">Firebase Firestore</strong> (Google LLC) — almacenamiento de reservas</li>
              <li><strong className="text-[#E8E2D9]">Firebase Authentication</strong> (Google LLC) — gestión de cuentas y login</li>
              <li><strong className="text-[#E8E2D9]">Vercel Inc.</strong> — alojamiento del sitio web</li>
            </ul>
            <p className="mt-3">No cedemos datos a terceros salvo obligación legal.</p>
          </section>

          <section>
            <h2 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-4 text-base">7. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un correo a info@dztattoo.es:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li><strong className="text-[#E8E2D9]">Acceso:</strong> conocer qué datos tenemos sobre ti</li>
              <li><strong className="text-[#E8E2D9]">Rectificación:</strong> corregir datos inexactos</li>
              <li><strong className="text-[#E8E2D9]">Supresión:</strong> eliminar tu cuenta y datos (derecho al olvido)</li>
              <li><strong className="text-[#E8E2D9]">Portabilidad:</strong> recibir tus datos en formato estructurado</li>
              <li><strong className="text-[#E8E2D9]">Limitación y oposición</strong> al tratamiento</li>
            </ul>
            <p className="mt-3">También tienes derecho a presentar una reclamación ante la <strong className="text-[#E8E2D9]">Agencia Española de Protección de Datos (AEPD)</strong>.</p>
          </section>

          <p className="pt-4 border-t border-[#1a1a1a]"><strong className="text-[#E8E2D9]">Última actualización:</strong> Junio 2026</p>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-[#1a1a1a] pt-8">
          <Link href="/aviso-legal" className="text-[#8B0000] text-xs tracking-widest uppercase hover:underline">Aviso Legal</Link>
          <Link href="/cookies" className="text-[#8B0000] text-xs tracking-widest uppercase hover:underline">Política de Cookies</Link>
        </div>
      </div>
    </main>
  );
}
