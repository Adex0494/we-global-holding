import {
  ShieldCheck,
  Car,
  Building2,
  Truck,
  Store,
  Package,
  Plane,
  Landmark,
  Cpu,
} from 'lucide-react';
import type { Division, SectionContent } from '@/types';

export const divisions: Division[] = [
  {
    id: 'business-verification',
    title: 'Business Verification',
    subtitle: 'Company Integration',
    description: [
      'The first step to entering the WE ecosystem. We validate and certify the identity, reputation, and operational capacity of each company.',
      'This allows us to represent their brand with confidence, security, and legitimacy to our global network of clients, investors, and strategic partners.',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'auto-match',
    title: 'Auto-Match',
    subtitle: 'Verified Dealer Connections',
    description: [
      'An intelligent system that connects users with trustworthy dealers to find their ideal vehicle.',
      'All companies within Auto-Match are verified by WE Global Holding Inc. to guarantee transparency, credibility, and trust.',
    ],
    icon: Car,
  },
  {
    id: 'real-estate',
    title: 'Property Networking',
    subtitle: 'Closings & Investments',
    description: [
      'WE Global Holding Inc. acts as a strategic facilitator connecting buyers, sellers, and investors.',
      'WE does not act as a broker or legal representative; we serve as a secure bridge that creates opportunities.',
    ],
    icon: Building2,
  },
  {
    id: 'logistics',
    title: 'Global Logistics',
    subtitle: 'Freight & Transportation',
    description: [
      'We connect logistics companies with partner businesses seeking improved operational efficiency.',
      'Our validated network optimizes routes, costs, and cargo flow through reliable partners.',
    ],
    icon: Truck,
  },
  {
    id: 'franchising',
    title: 'Franchising',
    subtitle: 'Commercial Expansion',
    description: [
      'We help high-potential brands connect with investors ready to expand operations.',
      'Companies access structured and accelerated growth through our global network.',
    ],
    icon: Store,
  },
  {
    id: 'products',
    title: 'In-House Products',
    subtitle: 'Exclusive Innovations',
    description: [
      'WE Global Holding Inc. has two innovations scheduled for launch in 2026.',
    ],
    list: ['Tri-Functional Deodorant', 'Instant Portable Bathroom Neutralizer'],
    icon: Package,
  },
  {
    id: 'jet-line',
    title: 'Jet Line',
    subtitle: 'Private Air Travel (Empty Leg)',
    description: [
      'Access private flights at highly accessible prices through empty-leg opportunities.',
      'All aircraft and operators comply with official regulations and strict standards.',
    ],
    icon: Plane,
  },
  {
    id: 'government',
    title: 'Government Contracts',
    subtitle: 'Infrastructure & Public Projects',
    description: [
      'We connect companies with certified contractors and strategic allies.',
      'Access high-value contracts in infrastructure, technology, energy, and government projects.',
    ],
    icon: Landmark,
  },
  {
    id: 'technology',
    title: 'Technology Division',
    subtitle: 'Global-Scale Digital Solutions',
    description: [
      'We develop next-generation digital solutions designed for mass markets.',
      'Five exclusive applications are currently under development, each with global potential.',
    ],
    icon: Cpu,
  },
];

// About page specific content
export const impactSection: SectionContent = {
  title: 'Impact and Growth Potential',
  paragraphs: [
    'Each of the five applications is built on highly monetizable business models, with clear opportunities for international expansion.',
    'Their purpose within the WE ecosystem is to move capital, connect markets, simplify processes, and create new opportunities worldwide.',
  ],
  list: [
    'First-year combined revenue (United States): Over $670 million',
    'Five-year combined revenue (global): Over $5.4 billion annually',
  ],
};

export const commissionsSection: SectionContent = {
  title: 'High and Unlimited Commissions',
  list: [
    'Business connections',
    'Franchises',
    'Exclusive products',
    'Logistics projects',
    'Technological opportunities',
    'Government contracts',
    'Properties and investments',
    'International expansion',
  ],
};

export const ecosystemSection: SectionContent = {
  title: 'Join the WE Global Holding Inc. Ecosystem',
  paragraphs: [
    'WE Global Holding Inc. offers more than a role—we offer a global growth vehicle designed for ambitious entrepreneurs and visionaries.',
    'We do not offer jobs. We offer real opportunities for those who want to build a better life and become part of a global ecosystem.',
  ],
};
