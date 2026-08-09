import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "./components/Hero";
import { TechMarquee } from "./components/TechMarquee";
import { AboutSummary } from "./components/AboutSummary";
import { SkillSummary } from "./components/SkillSummary";
import { ProjectSummary } from "./components/ProjectSummary";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <TechMarquee />
      <AboutSummary />
      <SkillSummary />
      <ProjectSummary />
    </PageShell>
  );
}
