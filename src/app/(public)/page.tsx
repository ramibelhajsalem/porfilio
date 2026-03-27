import Hero from "@/components/sections/hero";
import Works from "@/components/sections/works";
import About from "@/components/sections/about";
import Workstation from "@/components/sections/workstation";
import { portfolio } from "@/content/portfolio";

export default async function Home() {
  const projects = portfolio.projects
    .filter((project) => !project.isHidden)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <>
      <Hero
        content={portfolio.homePage.hero}
        siteName={portfolio.site.name}
        navLinks={portfolio.navigation.main.filter((item) => item.isActive)}
        socialLinks={portfolio.socialLinks.filter((item) => item.isActive)}
      />
      <Works projects={projects} content={portfolio.homePage.works} />
      <About content={portfolio.homePage.about} />
      <Workstation content={portfolio.homePage.workstation} />
    </>
  );
}
