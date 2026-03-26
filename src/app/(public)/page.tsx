import Hero from "@/components/sections/hero";
import Works from "@/components/sections/works";
import About from "@/components/sections/about";
import Workstation from "@/components/sections/workstation";
import {
  getProjects,
  getHeroContent,
  getAboutContent,
  getWorkstationContent,
} from "@/lib/supabase/queries";

export default async function Home() {
  const [projects, heroContent, aboutContent, workstationContent] =
    await Promise.all([
      getProjects(),
      getHeroContent(),
      getAboutContent(),
      getWorkstationContent(),
    ]);

  return (
    <>
      <Hero content={heroContent} />
      <Works projects={projects} />
      <About content={aboutContent} />
      <Workstation content={workstationContent} />
    </>
  );
}
