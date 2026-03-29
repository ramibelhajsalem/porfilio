import AboutPage from "@/components/sections/about-page";
import { portfolio } from "@/content/portfolio";

export default async function About() {
  return (
    <AboutPage
      profile={portfolio.profile}
      resume={portfolio.resume}
      content={portfolio.pages.about}
    />
  );
}
