import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

function getBusinessStatusMessage(status: string): string {
  switch (status) {
    case 'NONE':
      return 'No business access requested';
    case 'PENDING':
      return 'Your request is under review';
    case 'APPROVED':
      return 'Business access approved';
    case 'DENIED':
      return 'Business access denied';
    default:
      return 'No business access requested';
  }
}

export default async function AccountPage() {
  const session = await getSession();

  if (!session?.userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { fullName: true, businessStatus: true },
  });

  if (!user) {
    redirect('/login');
  }

  const statusMessage = getBusinessStatusMessage(user.businessStatus);

  return (
    <main className="min-h-screen pt-24 px-4" role="main">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
          Account
        </h1>
        <p className="text-neutral-700 mb-6">
          Welcome, {user.fullName}
        </p>
        <div className="p-4 rounded-xl border border-neutral-200 bg-white/50">
          <p className="text-neutral-900">{statusMessage}</p>
        </div>
      </div>
    </main>
  );
}
