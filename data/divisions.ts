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
import type { Division } from '@/types';

export const divisions: Division[] = [
  {
    id: 'we-global-verified',
    icon: ShieldCheck,
    nameKey: 'divisionVerifiedName',
    descriptionKey: 'divisionVerifiedDesc',
    statusKey: 'statusPreparationPhase',
  },
  {
    id: 'auto-match',
    icon: Car,
    nameKey: 'divisionAutoMatchName',
    descriptionKey: 'divisionAutoMatchDesc',
    statusKey: 'statusInvestmentReadiness',
  },
  {
    id: 'property-networking',
    icon: Building2,
    nameKey: 'divisionPropertyName',
    descriptionKey: 'divisionPropertyDesc',
    statusKey: 'statusInvestmentReadiness',
  },
  {
    id: 'global-logistics',
    icon: Truck,
    nameKey: 'divisionLogisticsName',
    descriptionKey: 'divisionLogisticsDesc',
    statusKey: 'statusPreparationPhase',
  },
  {
    id: 'franchising',
    icon: Store,
    nameKey: 'divisionFranchisingName',
    descriptionKey: 'divisionFranchisingDesc',
    statusKey: 'statusPreparationPhase',
  },
  {
    id: 'in-house-products',
    icon: Package,
    nameKey: 'divisionProductsName',
    descriptionKey: 'divisionProductsDesc',
    statusKey: 'statusUnderDevelopment',
  },
  {
    id: 'jetline',
    icon: Plane,
    nameKey: 'divisionJetLineName',
    descriptionKey: 'divisionJetLineDesc',
    statusKey: 'statusConceptToDeployment',
  },
  {
    id: 'government-infrastructure',
    icon: Landmark,
    nameKey: 'divisionGovernmentName',
    descriptionKey: 'divisionGovernmentDesc',
    statusKey: 'statusPreparationPhase',
  },
  {
    id: 'technology',
    icon: Cpu,
    nameKey: 'divisionTechnologyName',
    descriptionKey: 'divisionTechnologyDesc',
    statusKey: 'statusUnderDevelopment',
  },
];
