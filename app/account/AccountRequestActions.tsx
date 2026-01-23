'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard, Button, Input, Textarea, Select } from '@/components/ui';

interface BusinessAccessRequest {
  id: string;
  legalCompanyName: string;
  incorporationCountry: string;
  incorporationState: string | null;
  registrationNumber: string;
  companyType: string;
  businessAddress: string;
  website: string | null;
  corporateEmail: string;
  industry: string;
  description: string;
  socialLink: string | null;
  representativeName: string;
  representativePosition: string;
  interestExplanation: string;
}

interface Props {
  requestId: string;
  request: BusinessAccessRequest;
}

const companyTypeOptions = [
  { value: 'LLC', label: 'LLC' },
  { value: 'CORP', label: 'Corporation' },
  { value: 'SRL', label: 'SRL' },
  { value: 'OTHER', label: 'Other' },
];

export default function AccountRequestActions({ requestId, request }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const [formData, setFormData] = useState({
    legalCompanyName: request.legalCompanyName,
    incorporationCountry: request.incorporationCountry,
    incorporationState: request.incorporationState || '',
    registrationNumber: request.registrationNumber,
    companyType: request.companyType,
    businessAddress: request.businessAddress,
    website: request.website || '',
    corporateEmail: request.corporateEmail,
    industry: request.industry,
    description: request.description,
    socialLink: request.socialLink || '',
    representativeName: request.representativeName,
    representativePosition: request.representativePosition,
    interestExplanation: request.interestExplanation,
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/business-access-request/${requestId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to cancel request');
        return;
      }

      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
      setShowCancelConfirm(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/business-access-request/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          incorporationState: formData.incorporationState || null,
          website: formData.website || null,
          socialLink: formData.socialLink || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && data.errors.length > 0) {
          setError(data.errors.map((e: { message: string }) => e.message).join(', '));
        } else {
          setError(data.error || 'Failed to update request');
        }
        return;
      }

      setIsEditing(false);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel confirmation modal
  if (showCancelConfirm) {
    return (
      <GlassCard enableHover={false}>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Cancel Request?
        </h3>
        <p className="text-neutral-600 mb-6">
          Are you sure you want to cancel your business access request? This action
          cannot be undone, but you can submit a new request afterwards.
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => setShowCancelConfirm(false)}
            disabled={isLoading}
          >
            Keep Request
          </Button>
          <Button
            onClick={handleCancel}
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            Cancel Request
          </Button>
        </div>
      </GlassCard>
    );
  }

  // Edit mode
  if (isEditing) {
    return (
      <GlassCard enableHover={false}>
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">
          Edit Request
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Company Information */}
          <h4 className="text-sm font-semibold text-neutral-700 pt-2">
            Company Information
          </h4>

          <Input
            label="Legal Company Name"
            value={formData.legalCompanyName}
            onChange={(val) => handleFieldChange('legalCompanyName', val)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Incorporation Country"
              value={formData.incorporationCountry}
              onChange={(val) => handleFieldChange('incorporationCountry', val)}
              required
            />
            <Input
              label="Incorporation State"
              value={formData.incorporationState}
              onChange={(val) => handleFieldChange('incorporationState', val)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Registration Number"
              value={formData.registrationNumber}
              onChange={(val) => handleFieldChange('registrationNumber', val)}
              required
            />
            <Select
              label="Company Type"
              value={formData.companyType}
              onChange={(val) => handleFieldChange('companyType', val)}
              options={companyTypeOptions}
              required
            />
          </div>

          <Textarea
            label="Business Address"
            value={formData.businessAddress}
            onChange={(val) => handleFieldChange('businessAddress', val)}
            rows={2}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Industry"
              value={formData.industry}
              onChange={(val) => handleFieldChange('industry', val)}
              required
            />
            <Input
              label="Corporate Email"
              value={formData.corporateEmail}
              onChange={(val) => handleFieldChange('corporateEmail', val)}
              type="email"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Website"
              value={formData.website}
              onChange={(val) => handleFieldChange('website', val)}
              placeholder="https://"
            />
            <Input
              label="Social Link"
              value={formData.socialLink}
              onChange={(val) => handleFieldChange('socialLink', val)}
              placeholder="https://"
            />
          </div>

          <Textarea
            label="Company Description"
            value={formData.description}
            onChange={(val) => handleFieldChange('description', val)}
            rows={3}
            required
          />

          {/* Representative Information */}
          <h4 className="text-sm font-semibold text-neutral-700 pt-4">
            Authorized Representative
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Representative Name"
              value={formData.representativeName}
              onChange={(val) => handleFieldChange('representativeName', val)}
              required
            />
            <Input
              label="Position"
              value={formData.representativePosition}
              onChange={(val) => handleFieldChange('representativePosition', val)}
              required
            />
          </div>

          {/* Interest Explanation */}
          <h4 className="text-sm font-semibold text-neutral-700 pt-4">
            Interest
          </h4>

          <Textarea
            label="Interest Explanation"
            value={formData.interestExplanation}
            onChange={(val) => handleFieldChange('interestExplanation', val)}
            rows={4}
            required
          />

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </GlassCard>
    );
  }

  // Default view - action buttons
  return (
    <GlassCard enableHover={false}>
      <h3 className="text-sm font-semibold text-neutral-900 mb-4">
        Actions
      </h3>
      <p className="text-neutral-600 text-sm mb-4">
        You can edit your request details or cancel the request while it&apos;s pending.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => setIsEditing(true)}>
          Edit Request
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowCancelConfirm(true)}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          Cancel Request
        </Button>
      </div>
    </GlassCard>
  );
}
