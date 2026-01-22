import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GlassCard } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import AccountRequestActions from './AccountRequestActions';

type RequestStatus = 'PENDING' | 'APPROVED' | 'DENIED';
type BusinessStatus = 'NONE' | 'PENDING' | 'APPROVED' | 'DENIED';

interface BusinessAccessRequest {
  id: string;
  legalCompanyName: string;
  incorporationCountry: string;
  incorporationState: string | null;
  registrationNumber: string;
  companyType: string;
  businessAddress: string;
  website: string | null;
  corporateEmail: string;
  industry: string;
  description: string;
  socialLink: string | null;
  representativeName: string;
  representativePosition: string;
  interestExplanation: string;
  status: RequestStatus;
  adminNotes: string | null;
  createdAt: Date;
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles = {
    PENDING: 'bg-amber-100 text-amber-800',
    APPROVED: 'bg-green-100 text-green-800',
    DENIED: 'bg-red-100 text-red-800',
  };

  const labels = {
    PENDING: 'Under Review',
    APPROVED: 'Approved',
    DENIED: 'Denied',
  };

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="py-2 border-b border-neutral-100 last:border-0">
      <dt className="text-sm font-medium text-neutral-500">{label}</dt>
      <dd className="text-neutral-900 mt-0.5">{value}</dd>
    </div>
  );
}

function NoRequestState() {
  return (
    <GlassCard enableHover={false}>
      <div className="text-center py-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">
          Business Access
        </h2>
        <p className="text-neutral-600 mb-6">
          You haven&apos;t requested business access yet. Submit a request to access
          business features and services.
        </p>
        <Link
          href={ROUTES.BUSINESS_ACCESS_REQUEST}
          className="inline-flex items-center px-5 py-3 bg-neutral-900 text-white rounded-2xl font-medium hover:shadow-md hover:-translate-y-[1px] transition-all duration-200"
        >
          Request Business Access
        </Link>
      </div>
    </GlassCard>
  );
}

function RequestDetails({ request }: { request: BusinessAccessRequest }) {
  return (
    <div className="space-y-4">
      {/* Status Header */}
      <GlassCard enableHover={false}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500 mb-1">Request Status</p>
            <StatusBadge status={request.status} />
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500 mb-1">Submitted</p>
            <p className="text-neutral-900">{formatDate(request.createdAt)}</p>
          </div>
        </div>
        {request.status === 'PENDING' && (
          <p className="mt-4 text-sm text-neutral-600">
            Your request is being reviewed. You will be notified once a decision is made.
          </p>
        )}
      </GlassCard>

      {/* Admin Notes (if denied) */}
      {request.status === 'DENIED' && request.adminNotes && (
        <GlassCard enableHover={false}>
          <h3 className="text-sm font-semibold text-neutral-900 mb-2">
            Review Notes
          </h3>
          <p className="text-neutral-700 text-sm">{request.adminNotes}</p>
        </GlassCard>
      )}

      {/* Company Information */}
      <GlassCard enableHover={false}>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Company Information
        </h3>
        <dl className="space-y-0">
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

      {/* Representative */}
      <GlassCard enableHover={false}>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">
          Authorized Representative
        </h3>
        <dl className="space-y-0">
          <InfoRow label="Name" value={request.representativeName} />
          <InfoRow label="Position" value={request.representativePosition} />
        </dl>
      </GlassCard>

      {/* Interest Explanation */}
      <GlassCard enableHover={false}>
        <h3 className="text-sm font-semibold text-neutral-900 mb-2">
          Interest Explanation
        </h3>
        <p className="text-neutral-700 text-sm whitespace-pre-wrap">
          {request.interestExplanation}
        </p>
      </GlassCard>
    </div>
  );
}

function DeniedState({ request }: { request: BusinessAccessRequest }) {
  return (
    <div className="space-y-6">
      <RequestDetails request={request} />
      <GlassCard enableHover={false}>
        <div className="text-center py-4">
          <p className="text-neutral-600 mb-4">
            Your previous request was denied. You may submit a new request with updated
            information.
          </p>
          <Link
            href={ROUTES.BUSINESS_ACCESS_REQUEST}
            className="inline-flex items-center px-5 py-3 bg-neutral-900 text-white rounded-2xl font-medium hover:shadow-md hover:-translate-y-[1px] transition-all duration-200"
          >
            Submit New Request
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

export default async function AccountPage() {
  const session = await getSession();

  if (!session?.userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      fullName: true,
      email: true,
      businessStatus: true,
      businessAccessRequests: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  const latestRequest = user.businessAccessRequests[0] as BusinessAccessRequest | undefined;
  const businessStatus = user.businessStatus as BusinessStatus;

  return (
    <main className="min-h-screen pt-24 px-4 pb-12" role="main">
      <div className="max-w-2xl mx-auto">
        {/* Account Header */}
        <GlassCard enableHover={false} className="mb-6">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-1">
            Account
          </h1>
          <p className="text-neutral-600">
            Welcome, {user.fullName}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            {user.email}
          </p>
        </GlassCard>

        {/* Business Access Section */}
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Business Access
        </h2>

        {/* State: No Request */}
        {businessStatus === 'NONE' && <NoRequestState />}

        {/* State: Pending Request */}
        {businessStatus === 'PENDING' && latestRequest && (
          <div className="space-y-6">
            <RequestDetails request={latestRequest} />
            <AccountRequestActions
              requestId={latestRequest.id}
              request={latestRequest}
            />
          </div>
        )}

        {/* State: Approved Request */}
        {businessStatus === 'APPROVED' && latestRequest && (
          <RequestDetails request={latestRequest} />
        )}

        {/* State: Denied Request */}
        {businessStatus === 'DENIED' && latestRequest && (
          <DeniedState request={latestRequest} />
        )}
      </div>
    </main>
  );
}
