import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Works from "@/components/sections/works";
import About from "@/components/sections/about";
import Workstation from "@/components/sections/workstation";

export default function Home() {
  return (
    <>
      {/* <div className="relative bg-cream-50 rounded-2xl px-4 md:px-8 pt-5">
        <Navbar />
      </div> */}
      <Hero />
      <Works />
      <About />
      <Workstation />
    </>
  );
}
