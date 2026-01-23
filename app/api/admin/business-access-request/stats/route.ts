import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json(
        { ok: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const [pending, approved, denied] = await Promise.all([
      prisma.businessAccessRequest.count({ where: { status: 'PENDING' } }),
      prisma.businessAccessRequest.count({ where: { status: 'APPROVED' } }),
      prisma.businessAccessRequest.count({ where: { status: 'DENIED' } }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        stats: { pending, approved, denied, total: pending + approved + denied },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
