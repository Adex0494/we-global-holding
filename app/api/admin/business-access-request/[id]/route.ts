import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { isValidUUID, sanitizeString } from '@/lib/validation';

// Admin user IDs from environment variable (comma-separated)
// In production, this should be a proper role system in the database
const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || '').split(',').filter(Boolean);

/**
 * Checks if a user ID is an admin
 */
function isAdmin(userId: string): boolean {
  return ADMIN_USER_IDS.includes(userId);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Admin authorization check
    if (!isAdmin(session.userId)) {
      return NextResponse.json(
        { ok: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Validate UUID format
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid request ID format' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { decision, adminNotes } = body;

    // Validate decision
    if (decision !== 'APPROVED' && decision !== 'DENIED') {
      return NextResponse.json(
        { ok: false, error: 'Invalid decision. Must be APPROVED or DENIED' },
        { status: 400 }
      );
    }

    // Find the request
    const request = await prisma.businessAccessRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return NextResponse.json(
        { ok: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    // Check if already processed
    if (request.status !== 'PENDING') {
      return NextResponse.json(
        { ok: false, error: 'Request already processed' },
        { status: 409 }
      );
    }

    // Sanitize admin notes
    const sanitizedNotes = adminNotes ? sanitizeString(adminNotes) : null;

    // Update request and user atomically
    const [updatedRequest] = await prisma.$transaction([
      prisma.businessAccessRequest.update({
        where: { id },
        data: {
          status: decision,
          reviewedBy: session.userId,
          reviewedAt: new Date(),
          adminNotes: sanitizedNotes,
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
