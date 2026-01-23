import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { GlassCard } from '@/components/ui';
import { ROUTES } from '@/lib/constants';

type RequestStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'ARCHIVED';

interface Props {
  searchParams: Promise<{ status?: string }>;
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
      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

async function getRequests(status?: string) {
  // Filter by specific status if provided, otherwise exclude ARCHIVED
  const whereClause =
    status && ['PENDING', 'APPROVED', 'DENIED'].includes(status)
      ? { status: status as RequestStatus }
      : { status: { not: 'ARCHIVED' as const } };

  return prisma.businessAccessRequest.findMany({
    where: whereClause,
    include: {
      user: {
        select: {
          email: true,
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function AdminRequestsPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const requests = await getRequests(status);
  const activeFilter = status || 'ALL';

  return (
    <main className="min-h-screen pt-24 px-4 pb-12" role="main">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Business Access Requests
          </h1>
          <Link
            href={ROUTES.ADMIN_DASHBOARD}
            className="text-neutral-600 hover:text-neutral-900 text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['ALL', 'PENDING', 'APPROVED', 'DENIED'].map((filterStatus) => (
            <Link
              key={filterStatus}
              href={
                filterStatus === 'ALL'
                  ? ROUTES.ADMIN_REQUESTS
                  : `${ROUTES.ADMIN_REQUESTS}?status=${filterStatus}`
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                activeFilter === filterStatus
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white/30 text-neutral-700 hover:bg-white/50 border border-white/40'
              }`}
            >
              {filterStatus}
            </Link>
          ))}
        </div>

        <GlassCard enableHover={false}>
          {requests.length === 0 ? (
            <p className="text-neutral-600 text-center py-8">
              No requests found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      User Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Company Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Submitted
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-neutral-100 last:border-0 hover:bg-white/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-neutral-900">
                        {request.user.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-900">
                        {request.legalCompanyName}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`${ROUTES.ADMIN_REQUESTS}/${request.id}`}
                          className="text-sm font-medium text-neutral-900 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  );
}
