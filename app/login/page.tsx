'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 text-black">
      {/* ---- LOGIN CARD ---- */}
      <div className="glass-card p-10 rounded-2xl w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>

        {/* Form */}
        <form className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/20 backdrop-blur-md outline-none focus:ring-2 focus:ring-black/50 text-black"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/20 backdrop-blur-md outline-none focus:ring-2 focus:ring-black/50 text-black"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl bg-black text-white 
              font-medium shadow-lg hover:opacity-90 
              transition-all duration-200
            "
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-sm opacity-70">
            Don&apos;t have an account?{' '}
            <Link className="underline hover:opacity-100" href="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
