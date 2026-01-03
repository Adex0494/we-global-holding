// Site metadata
export const SITE_NAME = 'WE Global Holding Inc.';
export const SITE_DESCRIPTION = 'Bridging global innovation, investment & growth.';

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  DIVISIONS: '/divisions',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
} as const;

// API endpoints
export const API_ROUTES = {
  USERS: '/api/users',
  BUSINESS_ACCESS_REQUEST: '/api/business-access-request',
} as const;

// Validation
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MIN_PASSWORD_LENGTH: 8,
  MIN_PHONE_LENGTH: 7,
} as const;

// Copyright
export const COPYRIGHT_YEAR = new Date().getFullYear();
