import {
  isValidEmail,
  isValidUUID,
  isValidURL,
  isValidPassword,
  isValidName,
  isValidPhone,
  isValidCompanyName,
  countWords,
  isWithinWordLimit,
  isValidDateOfBirth,
  isValidCompanyType,
  sanitizeString,
  sanitizeEmail,
  VALID_COMPANY_TYPES,
} from '@/lib/validation';
import { VALIDATION } from '@/lib/constants';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('accepts valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('missing@domain')).toBe(false);
      expect(isValidEmail('@nodomain.com')).toBe(false);
      expect(isValidEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('isValidUUID', () => {
    it('accepts valid UUID v4', () => {
      expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(isValidUUID('6ba7b810-9dad-41d4-80b4-00c04fd430c8')).toBe(true);
    });

    it('rejects invalid UUIDs', () => {
      expect(isValidUUID('')).toBe(false);
      expect(isValidUUID('not-a-uuid')).toBe(false);
      expect(isValidUUID('550e8400-e29b-11d4-a716-446655440000')).toBe(false); // v1
      expect(isValidUUID('550e8400e29b41d4a716446655440000')).toBe(false); // no dashes
    });
  });

  describe('isValidURL', () => {
    it('accepts valid URLs', () => {
      expect(isValidURL('http://example.com')).toBe(true);
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('https://www.example.com/path?query=1')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidURL('')).toBe(false);
      expect(isValidURL('example.com')).toBe(false);
      expect(isValidURL('ftp://example.com')).toBe(false);
      expect(isValidURL('//example.com')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('accepts passwords meeting minimum length', () => {
      expect(isValidPassword('12345678')).toBe(true);
      expect(isValidPassword('longerpassword123')).toBe(true);
    });

    it('rejects short passwords', () => {
      expect(isValidPassword('')).toBe(false);
      expect(isValidPassword('1234567')).toBe(false);
      expect(isValidPassword('short')).toBe(false);
    });

    it('uses correct minimum length from constants', () => {
      const minLength = VALIDATION.MIN_PASSWORD_LENGTH;
      expect(isValidPassword('a'.repeat(minLength))).toBe(true);
      expect(isValidPassword('a'.repeat(minLength - 1))).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('accepts valid names', () => {
      expect(isValidName('Jo')).toBe(true);
      expect(isValidName('John Doe')).toBe(true);
      expect(isValidName('María García')).toBe(true);
    });

    it('rejects short names', () => {
      expect(isValidName('')).toBe(false);
      expect(isValidName('J')).toBe(false);
      expect(isValidName('   ')).toBe(false); // whitespace only
    });

    it('trims whitespace before validation', () => {
      expect(isValidName('  Jo  ')).toBe(true);
      expect(isValidName('  J  ')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('accepts valid phone numbers', () => {
      expect(isValidPhone('1234567')).toBe(true);
      expect(isValidPhone('+1 809 555 1234')).toBe(true);
    });

    it('rejects short phone numbers', () => {
      expect(isValidPhone('')).toBe(false);
      expect(isValidPhone('123456')).toBe(false);
    });
  });

  describe('isValidCompanyName', () => {
    it('accepts valid company names', () => {
      expect(isValidCompanyName('Co')).toBe(true);
      expect(isValidCompanyName('Acme Corporation LLC')).toBe(true);
    });

    it('rejects short company names', () => {
      expect(isValidCompanyName('')).toBe(false);
      expect(isValidCompanyName('A')).toBe(false);
    });
  });

  describe('countWords', () => {
    it('counts words correctly', () => {
      expect(countWords('')).toBe(0);
      expect(countWords('   ')).toBe(0);
      expect(countWords('hello')).toBe(1);
      expect(countWords('hello world')).toBe(2);
      expect(countWords('  hello   world  ')).toBe(2);
      expect(countWords('one two three four five')).toBe(5);
    });
  });

  describe('isWithinWordLimit', () => {
    it('accepts text within word limit', () => {
      expect(isWithinWordLimit('hello world', 10)).toBe(true);
      expect(isWithinWordLimit('a'.repeat(100), VALIDATION.MAX_INTEREST_WORDS)).toBe(true);
    });

    it('rejects text exceeding word limit', () => {
      const manyWords = Array(VALIDATION.MAX_INTEREST_WORDS + 1).fill('word').join(' ');
      expect(isWithinWordLimit(manyWords)).toBe(false);
    });

    it('uses default max from constants', () => {
      const exactLimit = Array(VALIDATION.MAX_INTEREST_WORDS).fill('word').join(' ');
      expect(isWithinWordLimit(exactLimit)).toBe(true);
    });
  });

  describe('isValidDateOfBirth', () => {
    it('accepts valid past dates', () => {
      expect(isValidDateOfBirth('1990-01-15')).toBe(true);
      expect(isValidDateOfBirth('2000-12-31')).toBe(true);
    });

    it('accepts today', () => {
      const today = new Date().toISOString().split('T')[0];
      expect(isValidDateOfBirth(today)).toBe(true);
    });

    it('rejects future dates', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      expect(isValidDateOfBirth(futureDate.toISOString())).toBe(false);
    });

    it('rejects invalid date strings', () => {
      expect(isValidDateOfBirth('')).toBe(false);
      expect(isValidDateOfBirth('invalid')).toBe(false);
      expect(isValidDateOfBirth('2024-13-45')).toBe(false); // invalid month/day
    });
  });

  describe('isValidCompanyType', () => {
    it('accepts valid company types', () => {
      VALID_COMPANY_TYPES.forEach((type) => {
        expect(isValidCompanyType(type)).toBe(true);
      });
    });

    it('rejects invalid company types', () => {
      expect(isValidCompanyType('')).toBe(false);
      expect(isValidCompanyType('INVALID')).toBe(false);
      expect(isValidCompanyType('llc')).toBe(false); // case sensitive
      expect(isValidCompanyType('Inc')).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('trims whitespace', () => {
      expect(sanitizeString('  hello  ')).toBe('hello');
      expect(sanitizeString('\n\ttest\n\t')).toBe('test');
    });

    it('handles null and undefined', () => {
      expect(sanitizeString(null)).toBe('');
      expect(sanitizeString(undefined)).toBe('');
    });

    it('preserves internal whitespace', () => {
      expect(sanitizeString('  hello world  ')).toBe('hello world');
    });
  });

  describe('sanitizeEmail', () => {
    it('trims and lowercases email', () => {
      expect(sanitizeEmail('  TEST@EXAMPLE.COM  ')).toBe('test@example.com');
      expect(sanitizeEmail('User@Domain.ORG')).toBe('user@domain.org');
    });
  });
});
