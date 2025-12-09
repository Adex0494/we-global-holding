'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="min-h-screen bg-dark-primary text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="John Doe"
          />
        </div>

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
            placeholder="Create a password"
          />
        </div>

        {/* Register Button */}
        <button className="w-full py-2 rounded-lg bg-accent-primary hover:bg-accent-secondary transition font-semibold text-black">
          Create Account
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-4 opacity-75">
          Already have an account?{' '}
          <Link href="/login" className="text-accent-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
