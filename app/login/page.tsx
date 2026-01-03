'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { GlassCard, Button, Input } from '@/components/ui';
import { SITE_NAME } from '@/lib/constants';

interface ApiError {
  error?: string;
  message?: string;
}

export default function LoginPage() {
  const router = useRouter();

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
        let msg = 'Login failed. Please try again.';
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
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] mt-5 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <GlassCard className="p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm md:text-base text-neutral-700">
              Sign in to your {SITE_NAME} account.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-5">
            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="you@company.com"
              autoComplete="email"
              type="email"
            />
            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              autoComplete="current-password"
              type="password"
            />

            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <Button
              type="submit"
              disabled={!canSubmit}
              isLoading={isSubmitting}
              className="w-full"
            >
              Sign in
            </Button>

            <p className="text-sm text-neutral-700">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-neutral-900 underline decoration-neutral-400 hover:decoration-neutral-900"
              >
                Create one
              </Link>
            </p>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
