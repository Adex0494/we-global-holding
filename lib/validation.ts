import { VALIDATION } from './constants';

/**
 * Validation utilities for API routes
 */

// Email regex pattern (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// URL regex pattern (http/https)
const URL_REGEX = /^https?:\/\/.+/i;

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validates UUID v4 format
 */
export function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id);
}

/**
 * Validates URL format (must start with http:// or https://)
 */
export function isValidURL(url: string): boolean {
  return URL_REGEX.test(url);
}

/**
 * Validates password meets minimum length requirement
 */
export function isValidPassword(password: string): boolean {
  return password.length >= VALIDATION.MIN_PASSWORD_LENGTH;
}

/**
 * Validates name meets minimum length requirement
 */
export function isValidName(name: string): boolean {
  return name.trim().length >= VALIDATION.MIN_NAME_LENGTH;
}

/**
 * Validates phone meets minimum length requirement
 */
export function isValidPhone(phone: string): boolean {
  return phone.trim().length >= VALIDATION.MIN_PHONE_LENGTH;
}

/**
 * Validates company name meets minimum length requirement
 */
export function isValidCompanyName(name: string): boolean {
  return name.trim().length >= VALIDATION.MIN_COMPANY_NAME_LENGTH;
}

/**
 * Counts words in a string
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Validates text doesn't exceed max word count
 */
export function isWithinWordLimit(text: string, maxWords: number = VALIDATION.MAX_INTEREST_WORDS): boolean {
  return countWords(text) <= maxWords;
}

/**
 * Validates date string is a valid date and not in the future
 */
export function isValidDateOfBirth(dateString: string): boolean {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }
  // Date should not be in the future
  return date <= new Date();
}

/**
 * Valid company types matching the Prisma enum
 */
export const VALID_COMPANY_TYPES = ['LLC', 'CORP', 'SRL', 'OTHER'] as const;
export type CompanyType = typeof VALID_COMPANY_TYPES[number];

/**
 * Validates company type is a valid enum value
 */
export function isValidCompanyType(type: string): type is CompanyType {
  return VALID_COMPANY_TYPES.includes(type as CompanyType);
}

/**
 * Sanitizes string input by trimming whitespace
 */
export function sanitizeString(value: string | null | undefined): string {
  return (value ?? '').trim();
}

/**
 * Sanitizes email by trimming and lowercasing
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Validation result type
 */
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Creates a validation error
 */
export function createValidationError(field: string, message: string): ValidationError {
  return { field, message };
}
