import { Hero } from "@/features/hero/Hero";
import { About } from "@/features/about/About";
import { Origins } from "@/features/origins/Origins";
import { Products } from "@/features/products/Products";
import { ContainerPlanner } from "@/features/planner/ContainerPlanner";
import { Certifications } from "@/features/certifications/Certifications";
import { RfqSection } from "@/features/rfq/RfqSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Origins />
      <Products />
      <ContainerPlanner />
      <Certifications />
      <RfqSection />
    </main>
  );
}
