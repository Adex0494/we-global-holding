'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard, Button, Textarea } from '@/components/ui';
import { ROUTES } from '@/lib/constants';

interface Props {
  requestId: string;
  isPending: boolean;
  existingNotes: string | null;
}

export default function AdminRequestActions({
  requestId,
  isPending,
  existingNotes,
}: Props) {
  const router = useRouter();
  const [adminNotes, setAdminNotes] = useState(existingNotes || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDecision = async (decision: 'APPROVED' | 'DENIED') => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/admin/business-access-request/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decision,
          adminNotes: adminNotes.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to process request');
        return;
      }

      setSuccess(`Request has been ${decision.toLowerCase()}.`);

      // Refresh the page to show updated status
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPending) {
    return (
      <GlassCard enableHover={false}>
        <div className="text-center py-4">
          <p className="text-neutral-600">
            This request has already been reviewed.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard enableHover={false}>
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">
        Review Decision
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <Textarea
          label="Admin Notes (optional)"
          value={adminNotes}
          onChange={setAdminNotes}
          placeholder="Add any notes about this decision..."
          rows={3}
        />

        <div className="flex gap-4 pt-2">
          <Button
            onClick={() => handleDecision('APPROVED')}
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            Approve Request
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleDecision('DENIED')}
            isLoading={isLoading}
            disabled={isLoading}
            className="border-red-200 text-red-700 hover:bg-red-50"
          >
            Deny Request
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
