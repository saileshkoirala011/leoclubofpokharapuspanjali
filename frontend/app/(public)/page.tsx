import Hero         from "@/components/home/Hero";
import Who          from "@/components/home/Who";
import Work         from "@/components/home/Work";
import TeamSection  from "@/components/home/TeamSection";
import Testimonials from "@/components/home/Testimonials";
import FAQ          from "@/components/home/FAQ";
import Leader       from "@/components/home/Leader";

// Navbar & Footer are provided by app/(public)/layout.tsx — no need to import them here
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Who />
      <Work />
      <TeamSection />
      <Leader />
      <Testimonials />
      <FAQ />
    </main>
  );
}
