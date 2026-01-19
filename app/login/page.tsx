'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { GlassCard, Button, Input } from '@/components/ui';
import { useTranslation } from '@/lib/i18n';

interface ApiError {
  error?: string;
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.includes('@') && password.length >= 1;
  }, [email, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!res.ok) {
        let msg = t('loginFailed');
        try {
          const data = (await res.json()) as ApiError;
          msg = data.error || data.message || msg;
        } catch {
          // ignore JSON parse errors
        }
        setServerError(msg);
        return;
      }

      // Redirect to dashboard on success
      router.replace('/dashboard');
    } catch {
      setServerError(t('loginNetworkError'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="h-screen pt-16 flex items-center justify-center px-4" role="main">
      <div className="w-full max-w-md">
        <GlassCard enableHover={false}>
          <div className="p-6 md:p-8">
            <header className="mb-6">
              <h1 id="login-heading" className="text-2xl md:text-3xl font-semibold text-neutral-900">
                {t('loginWelcomeBack')}
              </h1>
              <p id="login-description" className="mt-2 text-sm md:text-base text-neutral-700">
                {t('loginSignInTo')} {t('siteName')} {t('loginAccount')}
              </p>
            </header>

            <form
              onSubmit={onSubmit}
              className="space-y-5"
              aria-labelledby="login-heading"
              aria-describedby="login-description"
              noValidate
            >
              <Input
                label={t('loginEmail')}
                value={email}
                onChange={setEmail}
                placeholder={t('loginEmailPlaceholder')}
                autoComplete="email"
                type="email"
                required
              />
              <Input
                label={t('loginPassword')}
                value={password}
                onChange={setPassword}
                placeholder={t('loginPasswordPlaceholder')}
                autoComplete="current-password"
                type="password"
                required
              />

              {serverError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {serverError}
                </div>
              )}

              <Button
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting}
                className="w-full"
              >
                {t('loginSignIn')}
              </Button>

              <p className="text-sm text-neutral-700">
                {t('loginNoAccount')}{' '}
                <Link
                  href="/register"
                  className="font-medium text-neutral-900 underline decoration-neutral-400 hover:decoration-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 rounded"
                >
                  {t('loginCreateOne')}
                </Link>
              </p>
            </form>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
