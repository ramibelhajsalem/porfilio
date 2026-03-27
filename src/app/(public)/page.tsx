import Hero from "@/components/sections/hero";
import Works from "@/components/sections/works";
import About from "@/components/sections/about";
import Workstation from "@/components/sections/workstation";
import { portfolio } from "@/content/portfolio";

export default async function Home() {
  const homePage = portfolio.pages.home;
  const heroContent = {
    greeting: `${homePage.hero.greetingPrefix} ${portfolio.profile.identity.displayName}`,
    titleWords: homePage.hero.titleWords,
    bio: portfolio.profile.summary.short,
    photoUrl: portfolio.profile.identity.avatar.url,
    photoAlt: portfolio.profile.identity.avatar.alt,
  };
  const projects = portfolio.projects
    .filter((project) => !project.isHidden)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <>
      <Hero
        content={heroContent}
        siteName={portfolio.profile.identity.displayName}
        navLinks={portfolio.site.navigation.main.filter((item) => item.isActive)}
        socialLinks={portfolio.profile.socials.filter((item) => item.isActive)}
      />
      <Works projects={projects} content={homePage.works} />
      <About content={homePage.about} />
      <Workstation content={homePage.workstation} />
    </>
  );
}
