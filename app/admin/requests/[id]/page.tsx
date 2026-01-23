import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { GlassCard } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import { isValidUUID } from '@/lib/validation';
import AdminRequestActions from './AdminRequestActions';

type RequestStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'ARCHIVED';

interface Props {
  params: Promise<{ id: string }>;
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles: Record<RequestStatus, string> = {
    PENDING: 'bg-amber-100 text-amber-800',
    APPROVED: 'bg-green-100 text-green-800',
    DENIED: 'bg-red-100 text-red-800',
    ARCHIVED: 'bg-neutral-100 text-neutral-600',
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="py-3 border-b border-neutral-100 last:border-0">
      <dt className="text-sm font-medium text-neutral-500 mb-1">{label}</dt>
      <dd className="text-neutral-900">{value}</dd>
    </div>
  );
}

async function getRequest(id: string) {
  if (!isValidUUID(id)) {
    return null;
  }

  return prisma.businessAccessRequest.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
        },
      },
    },
  });
}

export default async function AdminRequestDetailPage({ params }: Props) {
  const { id } = await params;
  const request = await getRequest(id);

  if (!request) {
    notFound();
  }

  const isPending = request.status === 'PENDING';

  return (
    <main className="min-h-screen pt-24 px-4 pb-12" role="main">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Request Details
          </h1>
          <Link
            href={ROUTES.ADMIN_REQUESTS}
            className="text-neutral-600 hover:text-neutral-900 text-sm"
          >
            ← Back to Requests
          </Link>
        </div>

        <div className="grid gap-6">
          {/* Status Card */}
          <GlassCard enableHover={false}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500 mb-1">Current Status</p>
                <StatusBadge status={request.status} />
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500 mb-1">Submitted</p>
                <p className="text-neutral-900">{formatDate(request.createdAt)}</p>
              </div>
            </div>
            {request.reviewedAt && (
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <p className="text-sm text-neutral-500">
                  Reviewed on {formatDate(request.reviewedAt)}
                </p>
              </div>
            )}
          </GlassCard>

          {/* User Information */}
          <GlassCard enableHover={false}>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              User Information
            </h2>
            <dl>
              <InfoRow label="Full Name" value={request.user.fullName} />
              <InfoRow label="Email" value={request.user.email} />
            </dl>
          </GlassCard>

          {/* Company Information */}
          <GlassCard enableHover={false}>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Company Information
            </h2>
            <dl>
              <InfoRow label="Legal Company Name" value={request.legalCompanyName} />
              <InfoRow label="Company Type" value={request.companyType} />
              <InfoRow label="Registration Number" value={request.registrationNumber} />
              <InfoRow label="Incorporation Country" value={request.incorporationCountry} />
              <InfoRow label="Incorporation State" value={request.incorporationState} />
              <InfoRow label="Business Address" value={request.businessAddress} />
              <InfoRow label="Industry" value={request.industry} />
              <InfoRow label="Corporate Email" value={request.corporateEmail} />
              <InfoRow label="Website" value={request.website} />
              <InfoRow label="Social Link" value={request.socialLink} />
            </dl>
          </GlassCard>

          {/* Description */}
          <GlassCard enableHover={false}>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Company Description
            </h2>
            <p className="text-neutral-700 whitespace-pre-wrap">
              {request.description}
            </p>
          </GlassCard>

          {/* Representative */}
          <GlassCard enableHover={false}>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Authorized Representative
            </h2>
            <dl>
              <InfoRow label="Name" value={request.representativeName} />
              <InfoRow label="Position" value={request.representativePosition} />
            </dl>
          </GlassCard>

          {/* Interest Explanation */}
          <GlassCard enableHover={false}>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Interest Explanation
            </h2>
            <p className="text-neutral-700 whitespace-pre-wrap">
              {request.interestExplanation}
            </p>
          </GlassCard>

          {/* Admin Notes (if already reviewed) */}
          {request.adminNotes && (
            <GlassCard enableHover={false}>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Admin Notes
              </h2>
              <p className="text-neutral-700 whitespace-pre-wrap">
                {request.adminNotes}
              </p>
            </GlassCard>
          )}

          {/* Actions */}
          <AdminRequestActions
            requestId={request.id}
            isPending={isPending}
            existingNotes={request.adminNotes}
          />
        </div>
      </div>
    </main>
  );
}
