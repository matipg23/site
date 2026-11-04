import Contact from "@/components/sections/Contact";
import AboutTeaser from "@/components/sections/home/AboutTeaser";
import Hero from "@/components/sections/home/Hero";
import SelectedWork from "@/components/sections/home/SelectedWork";
import ThinkingForwards from "@/components/sections/home/ThinkingForwards";
import WhatIDo from "@/components/sections/home/WhatIDo";

// Figma: latest iterations > HOME > Home - Revised (338:5670)
export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-t border-subtle" />
      <SelectedWork />
      <WhatIDo />
      <ThinkingForwards />
      <AboutTeaser />
      <Contact />
    </>
  );
}
