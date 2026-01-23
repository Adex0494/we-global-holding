import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  if (session.role !== 'ADMIN') {
    redirect(ROUTES.ACCOUNT);
  }

  return <>{children}</>;
}
