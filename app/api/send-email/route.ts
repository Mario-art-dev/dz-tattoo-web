import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { to, type, data } = await req.json();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ ok: false, error: 'No API key' }, { status: 500 });

  const isConfirmation = type === 'booking';
  const subject = isConfirmation
    ? '¡Reserva confirmada! — D.Z Tattoo Studio'
    : 'Tu reserva ha sido cancelada — D.Z Tattoo Studio';

  const sharedStyles = `
    body { background:#050505; color:#E8E2D9; font-family:'Georgia',serif; margin:0; padding:0; }
    .wrap { max-width:560px; margin:0 auto; padding:40px 24px; }
    .logo-text { font-size:48px; font-weight:900; letter-spacing:-2px; color:#E8E2D9; }
    .logo-sub { font-size:10px; letter-spacing:6px; color:#8B0000; text-transform:uppercase; margin-top:4px; font-family:monospace; }
    .footer { text-align:center; color:#333; font-size:10px; font-family:monospace; letter-spacing:2px; margin-top:48px; line-height:1.8; }
    .row { display:flex; justify-content:space-between; gap:12px; padding:10px 0; border-bottom:1px solid #111; }
    .row:last-child { border-bottom:none; }
    .label { color:#555; font-size:10px; font-family:monospace; letter-spacing:2px; text-transform:uppercase; flex-shrink:0; }
    .value { color:#E8E2D9; font-size:13px; font-weight:bold; text-align:right; }
  `;

  const html = isConfirmation ? `
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  ${sharedStyles}
  .accent-bar { height:3px; background:linear-gradient(90deg,#8B0000,#C41E1E,#8B0000); margin-bottom:32px; }
  .badge { display:inline-flex; align-items:center; gap:8px; background:#071a0f; border:1px solid #1a5a30; color:#3aaa5a; font-size:10px; letter-spacing:4px; text-transform:uppercase; padding:7px 18px; margin-bottom:20px; font-family:monospace; }
  .dot { width:7px; height:7px; border-radius:50%; background:#3aaa5a; display:inline-block; }
  h1 { font-size:30px; font-weight:900; text-transform:uppercase; margin:0 0 6px; }
  .sub { color:#B0A89E; font-size:14px; margin:0 0 32px; line-height:1.6; }
  .card { background:#080808; border:1px solid #1a1a1a; padding:20px 24px; margin-bottom:28px; }
  .note { color:#666; font-size:12px; line-height:1.8; margin-bottom:28px; }
  .cta { display:inline-block; background:#8B0000; color:#E8E2D9; padding:14px 36px; font-size:11px; font-weight:bold; letter-spacing:4px; text-transform:uppercase; text-decoration:none; margin-bottom:8px; }
  .wa { display:inline-block; border:1px solid #1a5a30; color:#3aaa5a; padding:12px 28px; font-size:11px; font-family:monospace; letter-spacing:3px; text-transform:uppercase; text-decoration:none; margin-left:10px; }
</style></head>
<body>
<div class="wrap">
  <div class="accent-bar"></div>
  <div style="text-align:center; margin-bottom:36px;">
    <div class="logo-text">DZ</div>
    <div class="logo-sub">Tattoo Studio · Valencia</div>
  </div>
  <div style="text-align:center; margin-bottom:32px;">
    <div class="badge"><span class="dot"></span> Reserva recibida</div>
    <h1>¡Todo listo, ${data.nombre}!</h1>
    <p class="sub">Tu cita está en nuestro calendario.<br>Te confirmamos en menos de <strong style="color:#E8E2D9">24 horas</strong>.</p>
  </div>
  <div class="card">
    <div class="row"><span class="label">Servicio</span><span class="value">${data.servicio}</span></div>
    <div class="row"><span class="label">Fecha</span><span class="value">${data.fecha ? data.fecha.split('-').reverse().join('/') : '—'}</span></div>
    <div class="row"><span class="label">Hora</span><span class="value">${data.hora || '—'}</span></div>
    <div class="row"><span class="label">Teléfono</span><span class="value">${data.telefono}</span></div>
    ${data.zonaCorporal ? `<div class="row"><span class="label">Zona</span><span class="value">${data.zonaCorporal}</span></div>` : ''}
    ${data.tamano ? `<div class="row"><span class="label">Tamaño</span><span class="value">${data.tamano}</span></div>` : ''}
    ${data.idea ? `<div class="row"><span class="label">Idea</span><span class="value" style="max-width:60%">${data.idea.length > 120 ? data.idea.slice(0,120)+'…' : data.idea}</span></div>` : ''}
  </div>
  <p class="note">¿Necesitas cambiar algo? Cancela tu reserva desde la web o escríbenos directamente por WhatsApp.</p>
  <div style="text-align:center; margin-bottom:32px;">
    <a href="https://wa.me/34722201072" class="wa">WhatsApp +34 722 20 10 72</a>
  </div>
  <div class="footer">
    D.Z Tattoo Studio · Av. Luis Vives 12, Silla (Valencia)<br>
    +34 722 20 10 72 · info@dztattoo.es · dztattoo.es
  </div>
</div>
</body></html>
` : `
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  ${sharedStyles}
  .accent-bar { height:1px; background:linear-gradient(90deg,transparent,#333,transparent); margin-bottom:32px; }
  .icon { font-size:36px; margin-bottom:16px; }
  h1 { font-size:26px; font-weight:900; text-transform:uppercase; margin:0 0 10px; color:#888; }
  .sub { color:#555; font-size:14px; margin:0 0 32px; line-height:1.7; }
  .card { background:#080808; border:1px solid #151515; padding:20px 24px; margin-bottom:28px; }
  .rebook { display:inline-block; border:1px solid #8B0000; color:#8B0000; padding:13px 32px; font-size:11px; font-family:monospace; letter-spacing:3px; text-transform:uppercase; text-decoration:none; }
  .note { color:#444; font-size:12px; line-height:1.8; margin-bottom:28px; }
</style></head>
<body>
<div class="wrap">
  <div style="text-align:center; margin-bottom:36px;">
    <div class="logo-text" style="color:#555">DZ</div>
    <div class="logo-sub">Tattoo Studio · Valencia</div>
  </div>
  <div class="accent-bar"></div>
  <div style="text-align:center; margin-bottom:32px;">
    <div class="icon">✕</div>
    <h1>Reserva cancelada</h1>
    <p class="sub">Hola ${data.nombre}, hemos cancelado tu reserva correctamente.<br>No te preocupes, tu idea sigue aquí cuando quieras.</p>
  </div>
  ${(data.servicio || data.fecha) ? `
  <div class="card">
    <p style="color:#333; font-size:10px; font-family:monospace; letter-spacing:3px; text-transform:uppercase; margin:0 0 12px;">Reserva cancelada</p>
    ${data.servicio ? `<div class="row"><span class="label">Servicio</span><span class="value" style="color:#555">${data.servicio}</span></div>` : ''}
    ${data.fecha ? `<div class="row"><span class="label">Fecha</span><span class="value" style="color:#555">${data.fecha.split('-').reverse().join('/')}</span></div>` : ''}
    ${data.hora ? `<div class="row"><span class="label">Hora</span><span class="value" style="color:#555">${data.hora}</span></div>` : ''}
  </div>` : ''}
  <p class="note">Si cambias de idea o quieres reservar en otra fecha, estaremos encantados de atenderte.</p>
  <div style="text-align:center; margin-bottom:32px;">
    <a href="https://dz-tattoo-web.vercel.app/#booking-form" class="rebook">Volver a reservar</a>
  </div>
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
