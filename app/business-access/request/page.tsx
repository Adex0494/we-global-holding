"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  GlassCard,
  Button,
  Input,
  Textarea,
  Select,
  FileUpload,
} from "@/components/ui";
import { VALIDATION, ROUTES } from "@/lib/constants";
import { useTranslation, type TranslationKey } from "@/lib/i18n";
import type { BusinessAccessFormState, CompanyType } from "@/types";

interface ApiError {
  ok: boolean;
  errorCode?: string;
  error?: string;
  message?: string;
  fields?: string[];
}

// Map backend error codes to translation keys
const ERROR_CODE_MAP: Record<string, string> = {
  UNAUTHORIZED: 'errorUnauthorized',
  MISSING_FIELDS: 'errorMissingFields',
  PENDING_REQUEST: 'errorPendingRequest',
  INTERNAL_ERROR: 'errorInternalServer',
};

const COMPANY_TYPE_OPTIONS = [
  { value: "LLC", label: "LLC - Limited Liability Company" },
  { value: "CORP", label: "CORP - Corporation" },
  { value: "SRL", label: "SRL - Sociedad de Responsabilidad Limitada" },
  { value: "OTHER", label: "Other" },
];

const INITIAL_FORM_STATE: BusinessAccessFormState = {
  legalCompanyName: "",
  incorporationCountry: "",
  incorporationState: "",
  registrationNumber: "",
  companyType: "",
  businessAddress: "",
  website: "",
  corporateEmail: "",
  industry: "",
  description: "",
  socialLink: "",
  representativeName: "",
  representativePosition: "",
  interestExplanation: "",
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty is valid (optional field)
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function BusinessAccessRequestPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form, setForm] = useState<BusinessAccessFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const wordCount = useMemo(
    () => countWords(form.interestExplanation),
    [form.interestExplanation],
  );

  const validationErrors = useMemo(() => {
    const errors: Partial<Record<keyof BusinessAccessFormState, string>> = {};

    if (
      form.legalCompanyName.trim().length < VALIDATION.MIN_COMPANY_NAME_LENGTH
    ) {
      errors.legalCompanyName = `${t('businessAccessLegalName')} ${t('validationRequired')}`;
    }
    if (!form.incorporationCountry.trim()) {
      errors.incorporationCountry = `${t('businessAccessCountry')} ${t('validationRequired')}`;
    }
    if (!form.registrationNumber.trim()) {
      errors.registrationNumber = `${t('businessAccessRegNumber')} ${t('validationRequired')}`;
    }
    if (!form.companyType) {
      errors.companyType = `${t('businessAccessCompanyType')} ${t('validationRequired')}`;
    }
    if (!form.businessAddress.trim()) {
      errors.businessAddress = `${t('businessAccessAddress')} ${t('validationRequired')}`;
    }
    if (!form.corporateEmail.includes("@")) {
      errors.corporateEmail = t('validationValidEmail');
    }
    if (!form.industry.trim()) {
      errors.industry = `${t('businessAccessIndustry')} ${t('validationRequired')}`;
    }
    if (!form.description.trim()) {
      errors.description = `${t('businessAccessDescription')} ${t('validationRequired')}`;
    }
    if (form.representativeName.trim().length < VALIDATION.MIN_NAME_LENGTH) {
      errors.representativeName = `${t('businessAccessRepName')} ${t('validationRequired')}`;
    }
    if (!form.representativePosition.trim()) {
      errors.representativePosition = `${t('businessAccessPosition')} ${t('validationRequired')}`;
    }
    if (!form.interestExplanation.trim()) {
      errors.interestExplanation = `${t('businessAccessInterest')} ${t('validationRequired')}`;
    } else if (wordCount > VALIDATION.MAX_INTEREST_WORDS) {
      errors.interestExplanation = `${t('validationMaxWords')} ${VALIDATION.MAX_INTEREST_WORDS} ${t('validationWords')}`;
    }

    // Optional URL validations
    if (form.website && !isValidUrl(form.website)) {
      errors.website = t('validationUrlFormat');
    }
    if (form.socialLink && !isValidUrl(form.socialLink)) {
      errors.socialLink = t('validationUrlFormat');
    }

    return errors;
  }, [form, wordCount, t]);

  const canSubmit = useMemo(() => {
    return Object.keys(validationErrors).length === 0;
  }, [validationErrors]);

  function update<K extends keyof BusinessAccessFormState>(
    key: K,
    value: BusinessAccessFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Helper to get error for a field - shows error if field was touched or submit was attempted
  function getFieldError(
    field: keyof BusinessAccessFormState,
    showOnlyAfterInput = false
  ): string | undefined {
    const error = validationErrors[field];
    if (!error) return undefined;

    // For optional URL fields, show error immediately when there's invalid input
    if (showOnlyAfterInput) {
      return form[field] ? error : undefined;
    }

    // For required fields, show error after submit attempt OR if field has been touched and is invalid
    if (hasAttemptedSubmit) {
      return error;
    }

    // Show error if field has some value but is still invalid (user started typing)
    if (form[field]) {
      return error;
    }

    return undefined;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!canSubmit) {
      // Focus the first field with an error
      const firstErrorField = Object.keys(validationErrors)[0] as keyof BusinessAccessFormState;
      const element = document.getElementById(`field-${firstErrorField}`);
      element?.focus();
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setServerError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/business-access-request', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          legalCompanyName: form.legalCompanyName.trim(),
          incorporationCountry: form.incorporationCountry.trim(),
          incorporationState: form.incorporationState.trim() || null,
          registrationNumber: form.registrationNumber.trim(),
          companyType: form.companyType as CompanyType,
          businessAddress: form.businessAddress.trim(),
          website: form.website.trim() || null,
          corporateEmail: form.corporateEmail.trim().toLowerCase(),
          industry: form.industry.trim(),
          description: form.description.trim(),
          socialLink: form.socialLink.trim() || null,
          representativeName: form.representativeName.trim(),
          representativePosition: form.representativePosition.trim(),
          interestExplanation: form.interestExplanation.trim(),
        }),
      });

      if (!res.ok) {
        let msg = t('businessAccessSubmissionFailed');
        try {
          const data = (await res.json()) as ApiError;
          // Try to get translated message from error code
          if (data.errorCode && ERROR_CODE_MAP[data.errorCode]) {
            const translationKey = ERROR_CODE_MAP[data.errorCode] as TranslationKey;
            msg = t(translationKey);
          } else if (data.error || data.message) {
            msg = data.error || data.message || msg;
          }
        } catch {
          // ignore JSON parse errors
        }
        setServerError(msg);
        return;
      }

      setSuccessMsg(t('businessAccessSuccess'));
      setTimeout(() => {
        router.replace(ROUTES.DASHBOARD);
      }, 2000);
    } catch {
      setServerError(t('loginNetworkError'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-start justify-center px-4">
      <div className="w-full max-w-4xl">
        <GlassCard enableHover={false}>
          <div className="p-6 md:p-8">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">
                {t('businessAccessTitle')}
              </h1>
              <p className="mt-2 text-sm md:text-base text-neutral-700">
                {t('businessAccessSubtitle')} {t('siteName')} {t('businessAccessEcosystem')}
              </p>
              <p className="mt-3 text-sm text-neutral-600">
                <span className="text-red-500" aria-hidden="true">*</span>{' '}
                {t('requiredFieldsNote')}
              </p>
            </header>

            <form onSubmit={onSubmit} className="space-y-8" noValidate>
              {/* Section 1: Company Information */}
              <section aria-labelledby="company-info-heading">
                <h2 id="company-info-heading" className="text-lg font-semibold text-neutral-900 mb-4">
                  {t('businessAccessCompanyInfo')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="field-legalCompanyName"
                    label={t('businessAccessLegalName')}
                    value={form.legalCompanyName}
                    onChange={(v) => update("legalCompanyName", v)}
                    placeholder="e.g. Acme Corporation LLC"
                    required
                    error={getFieldError('legalCompanyName')}
                  />
                  <Input
                    id="field-incorporationCountry"
                    label={t('businessAccessCountry')}
                    value={form.incorporationCountry}
                    onChange={(v) => update("incorporationCountry", v)}
                    placeholder="e.g. United States"
                    required
                    error={getFieldError('incorporationCountry')}
                  />
                  <Input
                    id="field-incorporationState"
                    label={t('businessAccessState')}
                    value={form.incorporationState}
                    onChange={(v) => update("incorporationState", v)}
                    placeholder="e.g. Delaware"
                  />
                  <Input
                    id="field-registrationNumber"
                    label={t('businessAccessRegNumber')}
                    value={form.registrationNumber}
                    onChange={(v) => update("registrationNumber", v)}
                    placeholder="e.g. 12345678"
                    required
                    error={getFieldError('registrationNumber')}
                  />
                  <Select
                    id="field-companyType"
                    label={t('businessAccessCompanyType')}
                    value={form.companyType}
                    onChange={(v) =>
                      update("companyType", v as CompanyType | "")
                    }
                    options={COMPANY_TYPE_OPTIONS}
                    placeholder="Select company type"
                    required
                    error={getFieldError('companyType')}
                  />
                  <Input
                    id="field-businessAddress"
                    label={t('businessAccessAddress')}
                    value={form.businessAddress}
                    onChange={(v) => update("businessAddress", v)}
                    placeholder="e.g. 123 Main St, Suite 100"
                    required
                    error={getFieldError('businessAddress')}
                  />
                  <Input
                    id="field-website"
                    label={t('businessAccessWebsite')}
                    value={form.website}
                    onChange={(v) => update("website", v)}
                    placeholder="https://example.com"
                    type="url"
                    error={getFieldError('website', true)}
                  />
                  <Input
                    id="field-corporateEmail"
                    label={t('businessAccessEmail')}
                    value={form.corporateEmail}
                    onChange={(v) => update("corporateEmail", v)}
                    placeholder="contact@company.com"
                    type="email"
                    required
                    error={getFieldError('corporateEmail')}
                  />
                  <Input
                    id="field-industry"
                    label={t('businessAccessIndustry')}
                    value={form.industry}
                    onChange={(v) => update("industry", v)}
                    placeholder="e.g. Financial Services"
                    required
                    error={getFieldError('industry')}
                  />
                  <Input
                    id="field-socialLink"
                    label={t('businessAccessSocialLink')}
                    value={form.socialLink}
                    onChange={(v) => update("socialLink", v)}
                    placeholder="https://linkedin.com/company/..."
                    type="url"
                    error={getFieldError('socialLink', true)}
                  />
                </div>
                <div className="mt-4">
                  <Textarea
                    id="field-description"
                    label={t('businessAccessDescription')}
                    value={form.description}
                    onChange={(v) => update("description", v)}
                    placeholder="Briefly describe your company, its mission, and core business activities..."
                    rows={3}
                    required
                    error={getFieldError('description')}
                  />
                </div>
              </section>

              {/* Section 2: Authorized Representative */}
              <section aria-labelledby="representative-heading">
                <h2 id="representative-heading" className="text-lg font-semibold text-neutral-900 mb-4">
                  {t('businessAccessRepresentative')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="field-representativeName"
                    label={t('businessAccessRepName')}
                    value={form.representativeName}
                    onChange={(v) => update("representativeName", v)}
                    placeholder="e.g. John Smith"
                    required
                    error={getFieldError('representativeName')}
                  />
                  <Input
                    id="field-representativePosition"
                    label={t('businessAccessPosition')}
                    value={form.representativePosition}
                    onChange={(v) => update("representativePosition", v)}
                    placeholder="e.g. Chief Executive Officer"
                    required
                    error={getFieldError('representativePosition')}
                  />
                </div>
              </section>

              {/* Section 3: Interest */}
              <section aria-labelledby="interest-heading">
                <h2 id="interest-heading" className="text-lg font-semibold text-neutral-900 mb-4">
                  {t('businessAccessInterest')}
                </h2>
                <div>
                  <Textarea
                    id="field-interestExplanation"
                    label={t('businessAccessInterestLabel')}
                    value={form.interestExplanation}
                    onChange={(v) => update("interestExplanation", v)}
                    placeholder="Describe why your company is interested in joining our ecosystem, what value you hope to bring, and how you envision our collaboration..."
                    rows={4}
                    required
                    error={getFieldError('interestExplanation')}
                  />
                  <p
                    className={`mt-1 text-xs text-right ${
                      wordCount > VALIDATION.MAX_INTEREST_WORDS
                        ? "text-red-600"
                        : "text-neutral-500"
                    }`}
                    aria-live="polite"
                  >
                    {wordCount} / {VALIDATION.MAX_INTEREST_WORDS} {t('validationWords').split(' ')[0]}
                  </p>
                </div>
              </section>

              {/* Section 4: Optional Documents (Deferred) */}
              <section aria-labelledby="documents-heading">
                <h2 id="documents-heading" className="text-lg font-semibold text-neutral-900 mb-4">
                  {t('businessAccessDocuments')}
                </h2>
                <FileUpload disabled />
                <p className="mt-2 text-xs text-neutral-500">
                  {t('businessAccessDocumentsNote')}
                </p>
              </section>

              {/* Legal Disclaimer */}
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  <strong>{t('businessAccessDisclaimer')}</strong> {t('businessAccessDisclaimerText')}
                </p>
              </div>

              {/* Error/Success Messages */}
              {serverError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {serverError}
                </div>
              )}

              {successMsg && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                >
                  {successMsg}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-full"
              >
                {t('businessAccessSubmit')}
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
