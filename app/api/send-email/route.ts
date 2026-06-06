import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { to, type, data } = await req.json();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: 'No API key' }, { status: 500 });

  const isConfirmation = type === 'booking';
  const subject = isConfirmation ? 'Tu reserva en D.Z Tattoo Studio ✓' : 'Reserva cancelada — D.Z Tattoo Studio';

  const html = isConfirmation ? `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { background: #050505; color: #E8E2D9; font-family: 'Georgia', serif; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
  .logo { text-align: center; margin-bottom: 32px; }
  .logo-text { font-size: 48px; font-weight: 900; letter-spacing: -2px; color: #E8E2D9; }
  .logo-sub { font-size: 10px; letter-spacing: 6px; color: #8B0000; text-transform: uppercase; margin-top: 4px; font-family: monospace; }
  .divider { height: 1px; background: linear-gradient(90deg, transparent, #8B0000, transparent); margin: 24px 0; }
  .badge { background: #0f0808; border: 1px solid #8B0000; color: #8B0000; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; padding: 6px 16px; display: inline-block; margin-bottom: 24px; }
  h1 { font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 8px; }
  .sub { color: #B0A89E; font-size: 14px; margin: 0 0 32px; }
  .card { background: #090909; border: 1px solid #1a1a1a; padding: 24px; margin-bottom: 24px; }
  .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #111; }
  .row:last-child { border-bottom: none; }
  .label { color: #555; font-size: 10px; font-family: monospace; letter-spacing: 2px; text-transform: uppercase; }
  .value { color: #E8E2D9; font-size: 13px; font-weight: bold; }
  .footer { text-align: center; color: #333; font-size: 10px; font-family: monospace; letter-spacing: 2px; margin-top: 40px; }
  .cta { background: #8B0000; color: #E8E2D9; padding: 14px 32px; font-size: 12px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; display: inline-block; margin: 16px 0; }
</style></head>
<body>
<div class="wrap">
  <div class="logo">
    <div class="logo-text">DZ</div>
    <div class="logo-sub">Tattoo Studio · Valencia</div>
  </div>
  <div class="divider"></div>
  <div style="text-align:center; margin-bottom: 32px;">
    <div class="badge">Reserva confirmada</div>
    <h1>¡Todo listo, ${data.nombre}!</h1>
    <p class="sub">Tu cita está reservada. Te esperamos con ganas.</p>
  </div>
  <div class="card">
    <div class="row"><span class="label">Servicio</span><span class="value">${data.servicio}</span></div>
    <div class="row"><span class="label">Fecha</span><span class="value">${data.fecha ? data.fecha.split('-').reverse().join('/') : '—'}</span></div>
    <div class="row"><span class="label">Hora</span><span class="value">${data.hora || '—'}</span></div>
    <div class="row"><span class="label">Teléfono</span><span class="value">${data.telefono}</span></div>
    ${data.idea ? `<div class="row"><span class="label">Idea</span><span class="value">${data.idea}</span></div>` : ''}
  </div>
  <p style="color:#B0A89E; font-size:13px; line-height:1.7;">Si necesitas cambiar o cancelar tu reserva, puedes hacerlo desde nuestra web en la sección de reserva activa.</p>
  <div class="divider"></div>
  <div class="footer">
    D.Z Tattoo Studio · Av. Luis Vives 12, Silla (Valencia)<br>
    +34 722 20 10 72 · info@dztattoo.es · dztattoo.es
  </div>
</div>
</body></html>
` : `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { background: #050505; color: #E8E2D9; font-family: 'Georgia', serif; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
  .logo { text-align: center; margin-bottom: 32px; }
  .logo-text { font-size: 48px; font-weight: 900; letter-spacing: -2px; color: #E8E2D9; }
  .logo-sub { font-size: 10px; letter-spacing: 6px; color: #8B0000; text-transform: uppercase; margin-top: 4px; font-family: monospace; }
  .divider { height: 1px; background: linear-gradient(90deg, transparent, #555, transparent); margin: 24px 0; }
  h1 { font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 8px; text-align: center; }
  .sub { color: #B0A89E; font-size: 14px; margin: 0 0 32px; text-align: center; }
  .footer { text-align: center; color: #333; font-size: 10px; font-family: monospace; letter-spacing: 2px; margin-top: 40px; }
</style></head>
<body>
<div class="wrap">
  <div class="logo">
    <div class="logo-text">DZ</div>
    <div class="logo-sub">Tattoo Studio · Valencia</div>
  </div>
  <div class="divider"></div>
  <div style="text-align:center; margin: 32px 0;">
    <h1>Reserva cancelada</h1>
    <p class="sub">Hola ${data.nombre}, tu reserva ha sido cancelada correctamente.<br>Cuando quieras volver, estaremos aquí.</p>
  </div>
  <div class="divider"></div>
  <div class="footer">
    D.Z Tattoo Studio · Av. Luis Vives 12, Silla (Valencia)<br>
    +34 722 20 10 72 · info@dztattoo.es · dztattoo.es
  </div>
</div>
</body></html>
`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'D.Z Tattoo Studio <reservas@dztattoo.es>', to, subject, html }),
    });
    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Email error:', e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
