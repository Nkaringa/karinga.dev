import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Work />
      <About />
      <Contact />
      {/* Landing page core sections completed */}
    </div>
  );
}
