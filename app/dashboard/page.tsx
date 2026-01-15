'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/ui';

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] mt-20 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl space-y-6">
        <header>
          <h1 className="text-3xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="mt-2 text-neutral-700">
            Welcome to your WE Global Holding account.
          </p>
        </header>

        <Link href="/business-access/request" className="block group">
          <GlassCard className="cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-black">
                    Request Business Access Verification
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    Verify your business to unlock premium features and partnership
                    opportunities.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 text-white group-hover:scale-105 transition-transform duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </Link>
      </div>
    </main>
  );
}
