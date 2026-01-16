import { translations, getTranslation } from '@/lib/i18n/translations';

describe('Translations', () => {
  describe('English translations', () => {
    it('has all required keys', () => {
      expect(translations.en.siteName).toBe('WE Global Holding Inc.');
      expect(translations.en.divisionsPageTitle).toBe('Our Strategic Divisions');
      expect(translations.en.navHome).toBe('Home');
      expect(translations.en.navAbout).toBe('About');
      expect(translations.en.navDivisions).toBe('Divisions');
      expect(translations.en.navLogin).toBe('Login');
    });

    it('has all division names', () => {
      expect(translations.en.divisionVerifiedName).toBe('WE Global Verified');
      expect(translations.en.divisionAutoMatchName).toBe('Auto-Match');
      expect(translations.en.divisionPropertyName).toBe('Property Networking');
      expect(translations.en.divisionLogisticsName).toBe('Global Logistics');
      expect(translations.en.divisionFranchisingName).toBe('Franchising & Business Expansion');
      expect(translations.en.divisionProductsName).toBe('In-House Products & Innovation');
      expect(translations.en.divisionJetLineName).toBe('JetLine');
      expect(translations.en.divisionGovernmentName).toBe('Government & Infrastructure Projects');
      expect(translations.en.divisionTechnologyName).toBe('Technology Division');
    });

    it('has all status labels', () => {
      expect(translations.en.statusPreparationPhase).toBe('Preparation Phase');
      expect(translations.en.statusInvestmentReadiness).toBe('Investment Readiness Stage');
      expect(translations.en.statusUnderDevelopment).toBe('Under Development');
      expect(translations.en.statusConceptToDeployment).toBe('Concept to Deployment Phase');
    });
  });

  describe('Spanish translations', () => {
    it('has all required keys', () => {
      expect(translations.es.siteName).toBe('WE Global Holding Inc.');
      expect(translations.es.divisionsPageTitle).toBe('Nuestras Divisiones Estratégicas');
      expect(translations.es.navHome).toBe('Inicio');
      expect(translations.es.navAbout).toBe('Nosotros');
      expect(translations.es.navDivisions).toBe('Divisiones');
      expect(translations.es.navLogin).toBe('Iniciar Sesión');
    });

    it('has all status labels in Spanish', () => {
      expect(translations.es.statusPreparationPhase).toBe('Fase de Preparación');
      expect(translations.es.statusInvestmentReadiness).toBe('Etapa de Preparación para Inversión');
      expect(translations.es.statusUnderDevelopment).toBe('En Desarrollo');
      expect(translations.es.statusConceptToDeployment).toBe('Fase de Concepto a Implementación');
    });
  });

  describe('getTranslation function', () => {
    it('returns English translation for en locale', () => {
      expect(getTranslation('en', 'siteName')).toBe('WE Global Holding Inc.');
      expect(getTranslation('en', 'navHome')).toBe('Home');
    });

    it('returns Spanish translation for es locale', () => {
      expect(getTranslation('es', 'navHome')).toBe('Inicio');
      expect(getTranslation('es', 'navAbout')).toBe('Nosotros');
    });
  });

  describe('Translation consistency', () => {
    it('has the same keys in both languages', () => {
      const enKeys = Object.keys(translations.en);
      const esKeys = Object.keys(translations.es);

      expect(enKeys.length).toBe(esKeys.length);
      enKeys.forEach((key) => {
        expect(esKeys).toContain(key);
      });
    });

    it('has no empty translations', () => {
      Object.entries(translations.en).forEach(([key, value]) => {
        if (key !== 'loginAccount' && key !== 'businessAccessEcosystem') {
          expect(value).not.toBe('');
        }
      });
    });
  });
});
