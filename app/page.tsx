import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';
import HomeContent from './HomeContent';

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    const redirectUrl = session.role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : ROUTES.ACCOUNT;
    redirect(redirectUrl);
  }

  return <HomeContent />;
}
