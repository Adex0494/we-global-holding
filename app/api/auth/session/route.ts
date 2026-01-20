import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ ok: false, session: null }, { status: 200 });
  }

  return NextResponse.json(
    {
      ok: true,
      session: {
        userId: session.userId,
        email: session.email,
        role: session.role,
      },
    },
    { status: 200 }
  );
}
