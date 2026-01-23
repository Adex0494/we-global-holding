import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

/**
 * Legacy dashboard page - redirects to /account
 * The /account page is the unified user dashboard
 */
export default function DashboardPage() {
  redirect(ROUTES.ACCOUNT);
}
