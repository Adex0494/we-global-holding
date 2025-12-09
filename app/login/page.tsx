'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="min-h-screen bg-dark-primary text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="Your password"
          />
        </div>

        {/* Login Button */}
        <button className="w-full py-2 rounded-lg bg-accent-primary hover:bg-accent-secondary transition font-semibold text-black">
          Login
        </button>

        {/* Link to Register */}
        <p className="text-center text-sm mt-4 opacity-75">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-accent-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
