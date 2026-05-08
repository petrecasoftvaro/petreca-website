import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import clientRedis from '@/lib/redis';

const RATE_LIMIT = 3;
const RATE_WINDOW = 3600;

export async function POST(req: NextRequest) {
  const { name, email, message, website } = await req.json();

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const key = `contact:rate:${ip}`;
  const count = await clientRedis.incr(key);
  if (count === 1) {
    await clientRedis.expire(key, RATE_WINDOW);
  }
  if (count > RATE_LIMIT) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente mais tarde.' },
      { status: 429 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL as string,
    to: 'leandro@petreca.com',
    subject: `[Blog] Mensagem de ${name}`,
    replyTo: email,
    text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: 'Falha ao enviar mensagem.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
