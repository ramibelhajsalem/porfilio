export interface PortfolioContent {
  site: SiteContent;
  theme: ThemeContent;
  personalInfo: PersonalInfo;
  navigation: NavigationContent;
  socialLinks: SocialLink[];
  footer: FooterContent;
  homePage: HomePageContent;
  worksPage: WorksPageContent;
  contactPage: ContactPageContent;
  projects: Project[];
  testimonials: Testimonial[];
  integrations: IntegrationsContent;
  ai: AIContent;
}

export interface SiteContent {
  name: string;
  title: string;
  description: string;
  author: string;
  url: string;
  locale: string;
  robots: string;
  keywords: string[];
  email: string;
  supportEmail: string;
  ogImage: string;
  twitterHandle: string;
}

export interface ThemeContent {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  foregroundColor: string;
  mutedColor: string;
}

export interface PersonalInfo {
  firstName: string;
  fullName: string;
  title: string;
  subtitle: string;
  bio: string;
  bioExtended: string;
  avatarUrl: string;
  avatarAlt: string;
  email: string;
  location: string;
  locationDetail: string;
  timezone: string;
  responseTime: string;
  availability: boolean;
}

export interface NavigationContent {
  main: NavLink[];
  footer: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
  openNewTab: boolean;
  isActive: boolean;
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface FooterContent {
  emailLabel: string;
  quickLinksTitle: string;
  addressTitle: string;
  followTitle: string;
  copyrightName: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

export interface HomePageContent {
  hero: HomeHeroContent;
  works: HomeWorksContent;
  about: AboutSectionContent;
  workstation: WorkstationSectionContent;
  testimonials: {
    heading: string;
  };
  contactCta: ContactCTAContent;
}

export interface HomeHeroContent {
  greeting: string;
  titleWords: [string, string, string];
  bio: string;
  photoUrl: string;
  photoAlt: string;
}

export interface HomeWorksContent {
  title: string;
  description: string;
  viewAllLabel: string;
}

export interface AboutSectionContent {
  headline1: string;
  headline2: string;
  passionDescription: string;
  workExperienceTitle: string;
  workExperienceText: string;
  aboutDescription: string;
  inlineImageUrl: string;
  inlineImageAlt: string;
  gridImage1Url: string;
  gridImage1Alt: string;
  gridImage2Url: string;
  gridImage2Alt: string;
  viewAllLabel: string;
  viewAllHref: string;
}

export interface WorkstationSectionContent {
  sideLabelLeft: string;
  sideLabelRight: string;
  sectionTitle: string;
  favoriteGearsTitle: string;
  favoriteGearsDescription: string;
  images: Array<{
    url: string;
    alt: string;
  }>;
}

export interface ContactCTAContent {
  headingLine1: string;
  headingLine2: string;
  detailLine1: string;
  detailLine2: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface WorksPageContent {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  backToHomeLabel: string;
}

export interface ContactPageContent {
  rotatingBadgeWords: string[];
  marqueeItems: string[];
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  emailLabel: string;
  locationLabel: string;
  followLabel: string;
  availabilityText: string;
  projectDetailsLabel: string;
  secureFormLabel: string;
  responseTimeText: string;
  copyEmailLabel: string;
  copiedEmailLabel: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    projectTypeLabel: string;
    messageLabel: string;
    budgetLabel: string;
    budgetOptions: string[];
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    subjectPrefix: string;
  };
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
  gradient: string;
  accent: string;
  label: string;
  isFeatured: boolean;
  isHidden: boolean;
  orderIndex: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatarUrl: string;
  isActive: boolean;
  orderIndex: number;
}

export interface IntegrationsContent {
  googleAnalyticsId: string;
  plausibleDomain: string;
}

export interface AIContent {
  providers: AIProvider[];
  models: AIModel[];
}

export interface AIProvider {
  id: string;
  label: string;
  type: string;
  baseUrl: string;
  apiKeyEnv: string;
  enabled: boolean;
  autoSync: boolean;
}

export interface AIModel {
  id: string;
  providerId: string;
  label: string;
  description: string;
  contextWindow: number | null;
  isFree: boolean | null;
  enabled: boolean;
}
