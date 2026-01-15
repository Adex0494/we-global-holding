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
import { API_ROUTES, VALIDATION, SITE_NAME, ROUTES } from "@/lib/constants";
import type { BusinessAccessFormState, CompanyType } from "@/types";

interface ApiError {
  error?: string;
  message?: string;
  fields?: string[];
}

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

  const [form, setForm] = useState<BusinessAccessFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const wordCount = useMemo(
    () => countWords(form.interestExplanation),
    [form.interestExplanation],
  );

  const validationErrors = useMemo(() => {
    const errors: Partial<Record<keyof BusinessAccessFormState, string>> = {};

    if (
      form.legalCompanyName.trim().length < VALIDATION.MIN_COMPANY_NAME_LENGTH
    ) {
      errors.legalCompanyName = "Company name is required";
    }
    if (!form.incorporationCountry.trim()) {
      errors.incorporationCountry = "Country is required";
    }
    if (!form.registrationNumber.trim()) {
      errors.registrationNumber = "Registration number is required";
    }
    if (!form.companyType) {
      errors.companyType = "Company type is required";
    }
    if (!form.businessAddress.trim()) {
      errors.businessAddress = "Business address is required";
    }
    if (!form.corporateEmail.includes("@")) {
      errors.corporateEmail = "Valid email is required";
    }
    if (!form.industry.trim()) {
      errors.industry = "Industry is required";
    }
    if (!form.description.trim()) {
      errors.description = "Company description is required";
    }
    if (form.representativeName.trim().length < VALIDATION.MIN_NAME_LENGTH) {
      errors.representativeName = "Representative name is required";
    }
    if (!form.representativePosition.trim()) {
      errors.representativePosition = "Position is required";
    }
    if (!form.interestExplanation.trim()) {
      errors.interestExplanation = "Interest explanation is required";
    } else if (wordCount > VALIDATION.MAX_INTEREST_WORDS) {
      errors.interestExplanation = `Maximum ${VALIDATION.MAX_INTEREST_WORDS} words allowed`;
    }

    // Optional URL validations
    if (form.website && !isValidUrl(form.website)) {
      errors.website = "URL must start with http:// or https://";
    }
    if (form.socialLink && !isValidUrl(form.socialLink)) {
      errors.socialLink = "URL must start with http:// or https://";
    }

    return errors;
  }, [form, wordCount]);

  const canSubmit = useMemo(() => {
    return Object.keys(validationErrors).length === 0;
  }, [validationErrors]);

  function update<K extends keyof BusinessAccessFormState>(
    key: K,
    value: BusinessAccessFormState[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setServerError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(API_ROUTES.BUSINESS_ACCESS_REQUEST, {
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
        let msg = "Submission failed. Please try again.";
        try {
          const data = (await res.json()) as ApiError;
          msg = data.error || data.message || msg;
        } catch {
          // ignore JSON parse errors
        }
        setServerError(msg);
        return;
      }

      setSuccessMsg(
        "Your request has been submitted successfully. Redirecting to dashboard...",
      );
      setTimeout(() => {
        router.replace(ROUTES.DASHBOARD);
      }, 2000);
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
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
                Business Access Verification Request
              </h1>
              <p className="mt-2 text-sm md:text-base text-neutral-700">
                Complete this form to request business access to the {SITE_NAME}{" "}
                ecosystem.
              </p>
            </header>

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Section 1: Company Information */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Legal Company Name"
                    value={form.legalCompanyName}
                    onChange={(v) => update("legalCompanyName", v)}
                    placeholder="e.g. Acme Corporation LLC"
                    required
                    error={
                      form.legalCompanyName && validationErrors.legalCompanyName
                        ? validationErrors.legalCompanyName
                        : undefined
                    }
                  />
                  <Input
                    label="Country of Incorporation"
                    value={form.incorporationCountry}
                    onChange={(v) => update("incorporationCountry", v)}
                    placeholder="e.g. United States"
                    required
                    error={
                      form.incorporationCountry &&
                      validationErrors.incorporationCountry
                        ? validationErrors.incorporationCountry
                        : undefined
                    }
                  />
                  <Input
                    label="State/Province"
                    value={form.incorporationState}
                    onChange={(v) => update("incorporationState", v)}
                    placeholder="e.g. Delaware"
                  />
                  <Input
                    label="Registration Number"
                    value={form.registrationNumber}
                    onChange={(v) => update("registrationNumber", v)}
                    placeholder="e.g. 12345678"
                    required
                    error={
                      form.registrationNumber &&
                      validationErrors.registrationNumber
                        ? validationErrors.registrationNumber
                        : undefined
                    }
                  />
                  <Select
                    label="Company Type"
                    value={form.companyType}
                    onChange={(v) =>
                      update("companyType", v as CompanyType | "")
                    }
                    options={COMPANY_TYPE_OPTIONS}
                    placeholder="Select company type"
                    required
                    error={
                      form.companyType && validationErrors.companyType
                        ? validationErrors.companyType
                        : undefined
                    }
                  />
                  <Input
                    label="Business Address"
                    value={form.businessAddress}
                    onChange={(v) => update("businessAddress", v)}
                    placeholder="e.g. 123 Main St, Suite 100"
                    required
                    error={
                      form.businessAddress && validationErrors.businessAddress
                        ? validationErrors.businessAddress
                        : undefined
                    }
                  />
                  <Input
                    label="Website"
                    value={form.website}
                    onChange={(v) => update("website", v)}
                    placeholder="https://example.com"
                    type="url"
                    error={
                      form.website && validationErrors.website
                        ? validationErrors.website
                        : undefined
                    }
                  />
                  <Input
                    label="Corporate Email"
                    value={form.corporateEmail}
                    onChange={(v) => update("corporateEmail", v)}
                    placeholder="contact@company.com"
                    type="email"
                    required
                    error={
                      form.corporateEmail && validationErrors.corporateEmail
                        ? validationErrors.corporateEmail
                        : undefined
                    }
                  />
                  <Input
                    label="Industry"
                    value={form.industry}
                    onChange={(v) => update("industry", v)}
                    placeholder="e.g. Financial Services"
                    required
                    error={
                      form.industry && validationErrors.industry
                        ? validationErrors.industry
                        : undefined
                    }
                  />
                  <Input
                    label="Social Link"
                    value={form.socialLink}
                    onChange={(v) => update("socialLink", v)}
                    placeholder="https://linkedin.com/company/..."
                    type="url"
                    error={
                      form.socialLink && validationErrors.socialLink
                        ? validationErrors.socialLink
                        : undefined
                    }
                  />
                </div>
                <div className="mt-4">
                  <Textarea
                    label="Company Description"
                    value={form.description}
                    onChange={(v) => update("description", v)}
                    placeholder="Briefly describe your company, its mission, and core business activities..."
                    rows={3}
                    required
                    error={
                      form.description && validationErrors.description
                        ? validationErrors.description
                        : undefined
                    }
                  />
                </div>
              </section>

              {/* Section 2: Authorized Representative */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Authorized Representative
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Representative Name"
                    value={form.representativeName}
                    onChange={(v) => update("representativeName", v)}
                    placeholder="e.g. John Smith"
                    required
                    error={
                      form.representativeName &&
                      validationErrors.representativeName
                        ? validationErrors.representativeName
                        : undefined
                    }
                  />
                  <Input
                    label="Position/Title"
                    value={form.representativePosition}
                    onChange={(v) => update("representativePosition", v)}
                    placeholder="e.g. Chief Executive Officer"
                    required
                    error={
                      form.representativePosition &&
                      validationErrors.representativePosition
                        ? validationErrors.representativePosition
                        : undefined
                    }
                  />
                </div>
              </section>

              {/* Section 3: Interest */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Interest
                </h2>
                <div>
                  <Textarea
                    label="Briefly explain your interest in accessing the WE Global Holding Inc. ecosystem"
                    value={form.interestExplanation}
                    onChange={(v) => update("interestExplanation", v)}
                    placeholder="Describe why your company is interested in joining our ecosystem, what value you hope to bring, and how you envision our collaboration..."
                    rows={4}
                    required
                    error={
                      form.interestExplanation &&
                      validationErrors.interestExplanation
                        ? validationErrors.interestExplanation
                        : undefined
                    }
                  />
                  <p
                    className={`mt-1 text-xs text-right ${
                      wordCount > VALIDATION.MAX_INTEREST_WORDS
                        ? "text-red-600"
                        : "text-neutral-500"
                    }`}
                  >
                    {wordCount} / {VALIDATION.MAX_INTEREST_WORDS} words
                  </p>
                </div>
              </section>

              {/* Section 4: Optional Documents (Deferred) */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Supporting Documents
                </h2>
                <FileUpload disabled />
                <p className="mt-2 text-xs text-neutral-500">
                  Examples: Certificate of good standing, business license, or
                  other relevant documentation.
                </p>
              </section>

              {/* Legal Disclaimer */}
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  <strong>Disclaimer:</strong> WE Global Holding Inc. performs
                  an internal review solely for access, reputation, and
                  transparency purposes within the ecosystem. We do not act as a
                  broker, agent, intermediary, or legal authority. This review
                  does not constitute governmental certification.
                </p>
              </div>

              {/* Error/Success Messages */}
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting}
                className="w-full"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
