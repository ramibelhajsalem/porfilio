export interface PortfolioContent {
  profile: ProfileContent;
  resume: ResumeContent;
  site: SiteContent;
  pages: PagesContent;
  projects: Project[];
  testimonials: Testimonial[];
  integrations: IntegrationsContent;
  ai: AIContent;
}

export interface ProfileContent {
  identity: ProfileIdentity;
  summary: ProfileSummary;
  contact: ProfileContact;
  availability: ProfileAvailability;
  socials: SocialLink[];
}

export interface ProfileIdentity {
  firstName: string;
  lastName: string;
  displayName: string;
  fullName: string;
  headline: string;
  subtitle: string;
  avatar: {
    url: string;
    alt: string;
  };
}

export interface ProfileSummary {
  short: string;
  long: string;
}

export interface ProfileContact {
  email: string;
  supportEmail: string;
  phone: string;
  website: string;
  location: {
    label: string;
    detail: string;
    city: string;
    country: string;
    timezone: string;
  };
  responseTime: string;
}

export interface ProfileAvailability {
  openToWork: boolean;
  statusText: string;
}

export interface ResumeContent {
  experience: ResumeExperienceItem[];
  education: ResumeEducationItem[];
  skills: ResumeSkills;
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
}

export interface ResumeExperienceItem {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface ResumeEducationItem {
  id: string;
  school: string;
  degree: string;
  start: string;
  end: string;
  location: string;
}

export interface ResumeSkills {
  featured: string[];
  frontend: string[];
  backend: string[];
  mobile: string[];
  tools: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface SiteContent {
  seo: SeoContent;
  theme: ThemeContent;
  navigation: NavigationContent;
  footer: FooterContent;
}

export interface SeoContent {
  title: string;
  description: string;
  author: string;
  url: string;
  locale: string;
  robots: string;
  keywords: string[];
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
  address: {
    street: string;
    city: string;
    country: string;
  };
}

export interface PagesContent {
  home: HomePageContent;
  works: WorksPageContent;
  contact: ContactPageContent;
}

export interface HomePageContent {
  hero: HomeHeroPageContent;
  works: HomeWorksContent;
  about: AboutSectionContent;
  workstation: WorkstationSectionContent;
  testimonials: {
    heading: string;
  };
  contactCta: ContactCTAContent;
}

export interface HomeHeroPageContent {
  greetingPrefix: string;
  titleWords: [string, string, string];
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
  hero: {
    backToHomeLabel: string;
    headingLine1: string;
    headingLine2: string;
    headingLine3: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    scrollHintLabel: string;
    panelLine1: string;
    panelLine2: string;
    panelLine3: string;
    availabilityBadge: string;
  };
  selectedWorks: {
    eyebrow: string;
    heading: string;
  };
  gallery: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
  };
  about: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    headingLine3: string;
    description: string;
    stats: Array<{
      num: string;
      label: string;
    }>;
  };
}

export interface ContactPageContent {
  backToHomeLabel: string;
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
  closingLabel: string;
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
  mainImageUrl?: string;
  images?: ProjectImage[];
  projectUrl: string;
  links?: ProjectLink[];
  tags: string[];
  themes?: string[];
  gradient: string;
  accent: string;
  label: string;
  isFeatured: boolean;
  isHidden: boolean;
  orderIndex: number;
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ProjectLink {
  label: string;
  type: "live" | "github" | "figma" | "template" | "case-study" | "other";
  url: string;
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
