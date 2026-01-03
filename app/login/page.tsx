'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GlassCard, Button } from '@/components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-black">
      <GlassCard className="p-10 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/20 backdrop-blur-md outline-none focus:ring-2 focus:ring-black/50 text-black"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/20 backdrop-blur-md outline-none focus:ring-2 focus:ring-black/50 text-black"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm opacity-70">
            Don&apos;t have an account?{' '}
            <Link className="underline hover:opacity-100" href="/register">
              Register
            </Link>
          </p>
        </div>
      </GlassCard>
    </main>
  );
}
