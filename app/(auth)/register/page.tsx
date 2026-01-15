'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { GlassCard, Button, Input } from '@/components/ui';
import { API_ROUTES, VALIDATION, SITE_NAME } from '@/lib/constants';

interface FormState {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phone: string;
}

interface ApiError {
  error?: string;
  message?: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim().length >= VALIDATION.MIN_NAME_LENGTH &&
      form.email.includes('@') &&
      form.password.length >= VALIDATION.MIN_PASSWORD_LENGTH &&
      !!form.dateOfBirth &&
      form.phone.trim().length >= VALIDATION.MIN_PHONE_LENGTH
    );
  }, [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setServerError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(API_ROUTES.USERS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          dateOfBirth: form.dateOfBirth,
          phone: form.phone.trim(),
        }),
      });

      if (!res.ok) {
        let msg = 'Registration failed. Please try again.';
        try {
          const data = (await res.json()) as ApiError;
          msg = data.error || data.message || msg;
        } catch {
          // ignore JSON parse errors
        }
        setServerError(msg);
        return;
      }

      setSuccessMsg('Account created. Redirecting…');
      router.replace('/dashboard');
    } catch {
      setServerError(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="h-screen pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <GlassCard enableHover={false}>
          <div className="p-6 md:p-8">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">
                Create your account to get started
              </h1>
              <p className="mt-2 text-sm md:text-base text-neutral-700">
                Access the {SITE_NAME} ecosystem with a premium, verified
                experience.
              </p>
            </header>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full name"
                  value={form.fullName}
                  onChange={(v) => update('fullName', v)}
                  placeholder="e.g. Ariangel Díaz"
                  autoComplete="name"
                />
                <Input
                  label="Email"
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  type="email"
                />
                <Input
                  label="Password"
                  value={form.password}
                  onChange={(v) => update('password', v)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  type="password"
                />
                <Input
                  label="Date of birth"
                  value={form.dateOfBirth}
                  onChange={(v) => update('dateOfBirth', v)}
                  type="date"
                  autoComplete="bday"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Phone number"
                    value={form.phone}
                    onChange={(v) => update('phone', v)}
                    placeholder="+1 (809) 000-0000"
                    autoComplete="tel"
                    type="tel"
                  />
                </div>
              </div>

              {serverError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              {successMsg && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {successMsg}
                </div>
              )}

              <Button
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting}
                className="w-full"
              >
                Create account
              </Button>

              <p className="text-sm text-neutral-700">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-neutral-900 underline decoration-neutral-400 hover:decoration-neutral-900"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
