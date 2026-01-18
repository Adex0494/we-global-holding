import type { LucideIcon } from 'lucide-react';
import type { TranslationKey } from '@/lib/i18n';

// Division types
export interface Division {
  id: string;
  icon: LucideIcon;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  statusKey: TranslationKey;
  image: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Form field types
export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'tel' | 'url';
  autoComplete?: string;
  error?: string;
  required?: boolean;
}

// Textarea field types
export interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

// Select field types
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

// Business Access Request form types
export type CompanyType = 'LLC' | 'CORP' | 'SRL' | 'OTHER';

export interface BusinessAccessFormState {
  legalCompanyName: string;
  incorporationCountry: string;
  incorporationState: string;
  registrationNumber: string;
  companyType: CompanyType | '';
  businessAddress: string;
  website: string;
  corporateEmail: string;
  industry: string;
  description: string;
  socialLink: string;
  representativeName: string;
  representativePosition: string;
  interestExplanation: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types
export interface User {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  createdAt: Date;
}

