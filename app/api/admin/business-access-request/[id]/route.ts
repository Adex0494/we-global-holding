import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { decision, adminNotes } = body;

    if (decision !== 'APPROVED' && decision !== 'DENIED') {
      return NextResponse.json(
        { ok: false, error: 'Invalid decision' },
        { status: 400 }
      );
    }

    const request = await prisma.businessAccessRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return NextResponse.json(
        { ok: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    if (request.status !== 'PENDING') {
      return NextResponse.json(
        { ok: false, error: 'Request already processed' },
        { status: 409 }
      );
    }

    const [updatedRequest] = await prisma.$transaction([
      prisma.businessAccessRequest.update({
        where: { id },
        data: {
          status: decision,
          reviewedAt: new Date(),
          adminNotes: adminNotes || null,
        },
      }),
      prisma.user.update({
        where: { id: request.userId },
        data: {
          accessStatus: decision,
        },
      }),
    ]);

    return NextResponse.json(
      { ok: true, request: updatedRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin decision error:', error);

    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
