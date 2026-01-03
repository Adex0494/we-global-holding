import type { LucideIcon } from 'lucide-react';

// Division types
export interface Division {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  icon: LucideIcon;
  list?: string[];
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
  type?: 'text' | 'email' | 'password' | 'date' | 'tel';
  autoComplete?: string;
  error?: string;
  required?: boolean;
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

// Section content types (for about page data)
export interface SectionContent {
  title: string;
  paragraphs?: string[];
  list?: string[];
}
