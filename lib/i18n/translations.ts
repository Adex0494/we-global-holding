export type Locale = 'en' | 'es';

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Site metadata
    siteName: 'WE Global Holding Inc.',
    siteDescription: 'Bridging global innovation, investment & growth.',

    // Navigation
    navHome: 'Home',
    navAbout: 'About',
    navDivisions: 'Divisions',
    navLogin: 'Login',
    navWelcome: 'Welcome',
    navFooterText: 'Premium enterprise access and secure workflows.',

    // Homepage
    homeHeroTagline: 'Empowering global innovation, investment, and growth across industries.',
    homeExploreDivisions: 'Explore Divisions',
    homeDivisionsTitle: 'Our Strategic Divisions',
    homeDivisionsSubtitle: 'WE Global Holding Inc. operates across multiple strategic sectors, connecting verified companies, capital, and opportunities worldwide.',
    homeFooterRights: 'All rights reserved.',

    // Divisions Page Header
    divisionsPageTitle: 'Our Strategic Divisions',
    divisionsPageSubtitle: 'A Scalable Global Ecosystem Designed for Expansion',
    divisionsPageIntro: 'WE Global Holding Inc. is a global holding company structured to operate multiple interconnected divisions across business services, technology, logistics, investments, and global connectivity.\n\nThe divisions presented below represent the full operational scope of the WE ecosystem and are currently in a structured preparation phase as the company advances toward its initial investment round.',

    // Division Names
    divisionVerifiedName: 'WE Global Verified',
    divisionAutoMatchName: 'Auto-Match',
    divisionPropertyName: 'Property Networking',
    divisionLogisticsName: 'Global Logistics',
    divisionFranchisingName: 'Franchising & Business Expansion',
    divisionProductsName: 'In-House Products & Innovation',
    divisionJetLineName: 'JetLine',
    divisionGovernmentName: 'Government & Infrastructure Projects',
    divisionTechnologyName: 'Technology Division',

    // Division Descriptions
    divisionVerifiedDesc: 'A business verification and membership infrastructure designed to establish trust, credibility, and structured access within the WE Global ecosystem.',
    divisionAutoMatchDesc: 'A smart connectivity division focused on matching verified auto dealers with buyers through a centralized digital platform.',
    divisionPropertyDesc: 'A global real estate networking division connecting buyers, sellers, developers, and investors through a structured international platform.',
    divisionLogisticsDesc: 'A logistics and transportation division designed to integrate global partners and streamline freight, mobility, and supply chain solutions.',
    divisionFranchisingDesc: 'A franchising and expansion division built to support scalable brands seeking structured international growth and strategic partnerships.',
    divisionProductsDesc: 'A proprietary innovation division focused on developing exclusive products, technologies, and platforms owned by WE Global Holding Inc.',
    divisionJetLineDesc: 'A private aviation access division designed to structure premium air mobility solutions through strategic partnerships and global networks.',
    divisionGovernmentDesc: 'A strategic division focused on positioning certified companies for participation in large-scale government and infrastructure projects.',
    divisionTechnologyDesc: 'A technology division dedicated to building scalable digital platforms and applications supporting the WE Global ecosystem worldwide.',

    // Division Status Labels
    statusPreparationPhase: 'Preparation Phase',
    statusInvestmentReadiness: 'Investment Readiness Stage',
    statusUnderDevelopment: 'Under Development',
    statusConceptToDeployment: 'Concept to Deployment Phase',

    // Investment Positioning Section
    investmentTitle: 'Investment Positioning',
    investmentText: 'WE Global Holding Inc. is currently finalizing its structural, technological, and operational foundations as it prepares for strategic investment and capital deployment across its divisions.',

    // CTA Section
    ctaText: 'For investment inquiries, strategic partnerships, or institutional discussions, please contact our executive team.',

    // DivisionCard
    learnMore: 'Learn more',

    // Common
    status: 'Status',
    copyright: '©',

    // Login Page
    loginWelcomeBack: 'Welcome back',
    loginSignInTo: 'Sign in to your',
    loginAccount: 'account.',
    loginEmail: 'Email',
    loginEmailPlaceholder: 'you@company.com',
    loginPassword: 'Password',
    loginPasswordPlaceholder: 'Enter your password',
    loginSignIn: 'Sign in',
    loginNoAccount: "Don't have an account?",
    loginCreateOne: 'Create one',
    loginFailed: 'Login failed. Please try again.',
    loginNetworkError: 'Network error. Please check your connection and try again.',

    // Dashboard Page
    dashboardTitle: 'Dashboard',
    dashboardWelcome: 'Welcome to your WE Global Holding account.',
    dashboardBusinessAccessTitle: 'Request Business Access Verification',
    dashboardBusinessAccessDesc: 'Verify your business to unlock premium features and partnership opportunities.',

    // Business Access Request Page
    businessAccessTitle: 'Business Access Verification Request',
    businessAccessSubtitle: 'Complete this form to request business access to the',
    businessAccessEcosystem: 'ecosystem.',
    businessAccessCompanyInfo: 'Company Information',
    businessAccessLegalName: 'Legal Company Name',
    businessAccessCountry: 'Country of Incorporation',
    businessAccessState: 'State/Province',
    businessAccessRegNumber: 'Registration Number',
    businessAccessCompanyType: 'Company Type',
    businessAccessAddress: 'Business Address',
    businessAccessWebsite: 'Website',
    businessAccessEmail: 'Corporate Email',
    businessAccessIndustry: 'Industry',
    businessAccessSocialLink: 'Social Link',
    businessAccessDescription: 'Company Description',
    businessAccessRepresentative: 'Authorized Representative',
    businessAccessRepName: 'Representative Name',
    businessAccessPosition: 'Position/Title',
    businessAccessInterest: 'Interest',
    businessAccessInterestLabel: 'Briefly explain your interest in accessing the WE Global Holding Inc. ecosystem',
    businessAccessDocuments: 'Supporting Documents',
    businessAccessDocumentsNote: 'Examples: Certificate of good standing, business license, or other relevant documentation.',
    businessAccessDisclaimer: 'Disclaimer:',
    businessAccessDisclaimerText: 'WE Global Holding Inc. performs an internal review solely for access, reputation, and transparency purposes within the ecosystem. We do not act as a broker, agent, intermediary, or legal authority. This review does not constitute governmental certification.',
    businessAccessSubmit: 'Submit Request',
    businessAccessSuccess: 'Your request has been submitted successfully. Redirecting to dashboard...',
    businessAccessSubmissionFailed: 'Submission failed. Please try again.',

    // Division Detail Page
    divisionUnderConstruction: 'Page under construction...',
    divisionDivision: 'Division',

    // Form validation
    validationRequired: 'is required',
    validationValidEmail: 'Valid email is required',
    validationUrlFormat: 'URL must start with http:// or https://',
    validationMaxWords: 'Maximum',
    validationWords: 'words allowed',
  },
  es: {
    // Site metadata
    siteName: 'WE Global Holding Inc.',
    siteDescription: 'Conectando innovación global, inversión y crecimiento.',

    // Navigation
    navHome: 'Inicio',
    navAbout: 'Nosotros',
    navDivisions: 'Divisiones',
    navLogin: 'Iniciar Sesión',
    navWelcome: 'Bienvenido',
    navFooterText: 'Acceso empresarial premium y flujos de trabajo seguros.',

    // Homepage
    homeHeroTagline: 'Impulsando innovación global, inversión y crecimiento en todas las industrias.',
    homeExploreDivisions: 'Explorar Divisiones',
    homeDivisionsTitle: 'Nuestras Divisiones Estratégicas',
    homeDivisionsSubtitle: 'WE Global Holding Inc. opera en múltiples sectores estratégicos, conectando empresas verificadas, capital y oportunidades en todo el mundo.',
    homeFooterRights: 'Todos los derechos reservados.',

    // Divisions Page Header
    divisionsPageTitle: 'Nuestras Divisiones Estratégicas',
    divisionsPageSubtitle: 'Un Ecosistema Global Escalable Diseñado para la Expansión',
    divisionsPageIntro: 'WE Global Holding Inc. es una empresa holding global estructurada para operar múltiples divisiones interconectadas en servicios empresariales, tecnología, logística, inversiones y conectividad global.\n\nLas divisiones que se presentan a continuación representan el alcance operativo completo del ecosistema WE y se encuentran actualmente en una fase estructurada de preparación mientras la compañía avanza hacia su primera ronda de inversión.',

    // Division Names
    divisionVerifiedName: 'WE Global Verified',
    divisionAutoMatchName: 'Auto-Match',
    divisionPropertyName: 'Property Networking',
    divisionLogisticsName: 'Global Logistics',
    divisionFranchisingName: 'Franchising & Business Expansion',
    divisionProductsName: 'In-House Products & Innovation',
    divisionJetLineName: 'JetLine',
    divisionGovernmentName: 'Government & Infrastructure Projects',
    divisionTechnologyName: 'Technology Division',

    // Division Descriptions
    divisionVerifiedDesc: 'Una infraestructura de verificación empresarial y membresía diseñada para establecer confianza, credibilidad y acceso estructurado dentro del ecosistema WE Global.',
    divisionAutoMatchDesc: 'Una división de conectividad inteligente enfocada en vincular dealers de autos verificados con compradores mediante una plataforma digital centralizada.',
    divisionPropertyDesc: 'Una división global de networking inmobiliario que conecta compradores, vendedores, desarrolladores e inversionistas a través de una plataforma internacional estructurada.',
    divisionLogisticsDesc: 'Una división de logística y transporte diseñada para integrar socios globales y optimizar soluciones de carga, movilidad y cadena de suministro.',
    divisionFranchisingDesc: 'Una división de franquicias y expansión empresarial creada para apoyar marcas escalables que buscan crecimiento internacional estructurado y alianzas estratégicas.',
    divisionProductsDesc: 'Una división de innovación y productos propios enfocada en desarrollar productos, tecnologías y plataformas exclusivas propiedad de WE Global Holding Inc.',
    divisionJetLineDesc: 'Una división de acceso a aviación privada diseñada para estructurar soluciones premium de movilidad aérea mediante alianzas estratégicas y redes globales.',
    divisionGovernmentDesc: 'Una división estratégica enfocada en posicionar empresas certificadas para participar en proyectos gubernamentales y de infraestructura a gran escala.',
    divisionTechnologyDesc: 'Una división tecnológica dedicada a construir plataformas y aplicaciones digitales escalables que respalden el ecosistema WE Global a nivel mundial.',

    // Division Status Labels
    statusPreparationPhase: 'Fase de Preparación',
    statusInvestmentReadiness: 'Etapa de Preparación para Inversión',
    statusUnderDevelopment: 'En Desarrollo',
    statusConceptToDeployment: 'Fase de Concepto a Implementación',

    // Investment Positioning Section
    investmentTitle: 'Posicionamiento de Inversión',
    investmentText: 'WE Global Holding Inc. se encuentra actualmente finalizando sus bases estructurales, tecnológicas y operativas mientras se prepara para la entrada de inversión estratégica y el despliegue de capital en sus divisiones.',

    // CTA Section
    ctaText: 'Para consultas de inversión, alianzas estratégicas o conversaciones institucionales, por favor contacte a nuestro equipo ejecutivo.',

    // DivisionCard
    learnMore: 'Más información',

    // Common
    status: 'Estado',
    copyright: '©',

    // Login Page
    loginWelcomeBack: 'Bienvenido de nuevo',
    loginSignInTo: 'Inicia sesión en tu cuenta de',
    loginAccount: '',
    loginEmail: 'Correo electrónico',
    loginEmailPlaceholder: 'tu@empresa.com',
    loginPassword: 'Contraseña',
    loginPasswordPlaceholder: 'Ingresa tu contraseña',
    loginSignIn: 'Iniciar sesión',
    loginNoAccount: '¿No tienes una cuenta?',
    loginCreateOne: 'Crea una',
    loginFailed: 'Error al iniciar sesión. Por favor intenta de nuevo.',
    loginNetworkError: 'Error de red. Por favor verifica tu conexión e intenta de nuevo.',

    // Dashboard Page
    dashboardTitle: 'Panel de Control',
    dashboardWelcome: 'Bienvenido a tu cuenta de WE Global Holding.',
    dashboardBusinessAccessTitle: 'Solicitar Verificación de Acceso Empresarial',
    dashboardBusinessAccessDesc: 'Verifica tu empresa para desbloquear funciones premium y oportunidades de asociación.',

    // Business Access Request Page
    businessAccessTitle: 'Solicitud de Verificación de Acceso Empresarial',
    businessAccessSubtitle: 'Complete este formulario para solicitar acceso empresarial al ecosistema de',
    businessAccessEcosystem: '',
    businessAccessCompanyInfo: 'Información de la Empresa',
    businessAccessLegalName: 'Nombre Legal de la Empresa',
    businessAccessCountry: 'País de Incorporación',
    businessAccessState: 'Estado/Provincia',
    businessAccessRegNumber: 'Número de Registro',
    businessAccessCompanyType: 'Tipo de Empresa',
    businessAccessAddress: 'Dirección Comercial',
    businessAccessWebsite: 'Sitio Web',
    businessAccessEmail: 'Correo Corporativo',
    businessAccessIndustry: 'Industria',
    businessAccessSocialLink: 'Enlace Social',
    businessAccessDescription: 'Descripción de la Empresa',
    businessAccessRepresentative: 'Representante Autorizado',
    businessAccessRepName: 'Nombre del Representante',
    businessAccessPosition: 'Cargo/Título',
    businessAccessInterest: 'Interés',
    businessAccessInterestLabel: 'Explique brevemente su interés en acceder al ecosistema de WE Global Holding Inc.',
    businessAccessDocuments: 'Documentos de Soporte',
    businessAccessDocumentsNote: 'Ejemplos: Certificado de buena reputación, licencia comercial u otra documentación relevante.',
    businessAccessDisclaimer: 'Descargo de responsabilidad:',
    businessAccessDisclaimerText: 'WE Global Holding Inc. realiza una revisión interna únicamente con fines de acceso, reputación y transparencia dentro del ecosistema. No actuamos como corredor, agente, intermediario ni autoridad legal. Esta revisión no constituye certificación gubernamental.',
    businessAccessSubmit: 'Enviar Solicitud',
    businessAccessSuccess: 'Su solicitud ha sido enviada exitosamente. Redirigiendo al panel de control...',
    businessAccessSubmissionFailed: 'Error en el envío. Por favor intenta de nuevo.',

    // Division Detail Page
    divisionUnderConstruction: 'Página en construcción...',
    divisionDivision: 'División',

    // Form validation
    validationRequired: 'es requerido',
    validationValidEmail: 'Se requiere un correo electrónico válido',
    validationUrlFormat: 'La URL debe comenzar con http:// o https://',
    validationMaxWords: 'Máximo',
    validationWords: 'palabras permitidas',
  },
} as const;

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}
