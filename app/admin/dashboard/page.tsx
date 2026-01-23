import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { GlassCard } from '@/components/ui';
import { ROUTES } from '@/lib/constants';

async function getStats() {
  const [pending, approved, denied] = await Promise.all([
    prisma.businessAccessRequest.count({ where: { status: 'PENDING' } }),
    prisma.businessAccessRequest.count({ where: { status: 'APPROVED' } }),
    prisma.businessAccessRequest.count({ where: { status: 'DENIED' } }),
  ]);

  return { pending, approved, denied };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <main className="min-h-screen pt-24 px-4 pb-12" role="main">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href={`${ROUTES.ADMIN_REQUESTS}?status=PENDING`}>
            <GlassCard enableHover className="text-center">
              <p className="text-4xl font-bold text-amber-600 mb-2">
                {stats.pending}
              </p>
              <p className="text-neutral-700 font-medium">Pending Requests</p>
            </GlassCard>
          </Link>

          <Link href={`${ROUTES.ADMIN_REQUESTS}?status=APPROVED`}>
            <GlassCard enableHover className="text-center">
              <p className="text-4xl font-bold text-green-600 mb-2">
                {stats.approved}
              </p>
              <p className="text-neutral-700 font-medium">Approved Requests</p>
            </GlassCard>
          </Link>

          <Link href={`${ROUTES.ADMIN_REQUESTS}?status=DENIED`}>
            <GlassCard enableHover className="text-center">
              <p className="text-4xl font-bold text-red-600 mb-2">
                {stats.denied}
              </p>
              <p className="text-neutral-700 font-medium">Denied Requests</p>
            </GlassCard>
          </Link>
        </div>

        <GlassCard enableHover={false}>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${ROUTES.ADMIN_REQUESTS}?status=PENDING`}
              className="inline-flex items-center px-4 py-2 bg-neutral-900 text-white rounded-xl font-medium hover:shadow-md hover:-translate-y-[1px] transition-all duration-200"
            >
              Review Pending Requests
            </Link>
            <Link
              href={ROUTES.ADMIN_REQUESTS}
              className="inline-flex items-center px-4 py-2 bg-white/30 text-black border border-white/40 rounded-xl font-medium hover:bg-white/50 transition-all duration-200"
            >
              View All Requests
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
