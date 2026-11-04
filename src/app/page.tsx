import Contact from "@/components/sections/Contact";
import Approach from "@/components/sections/home/Approach";
import Hero from "@/components/sections/home/Hero";
import SelectedWork from "@/components/sections/home/SelectedWork";
import ThinkingForwards from "@/components/sections/home/ThinkingForwards";

// Figma: WIP > Home - Refined - Personal Review (373:16853)
export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Approach />
      <ThinkingForwards />
      <Contact />
    </>
  );
}
