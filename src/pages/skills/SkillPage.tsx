import { PageHeader, PageShell, SectionTitle } from "@/components/layout/PageShell";
import { SkillPanel } from "./components/SkillPanel";
import TechStackGrid from "./components/TechStackGrid";
import GithubActivity from "./components/GithubActivity";
import { useLanguage } from "@/lib/i18n";

export default function SkillPage() {
  const { t } = useLanguage();

  return (
    <PageShell>
      <PageHeader
        kicker={t("skill.kicker")}
        title={t("skill.title")}
        description={t("skill.description")}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <SectionTitle
          index="01"
          title={t("skill.sections.mySkills.title")}
          description={t("skill.sections.mySkills.description")}
        />
        <SkillPanel />
      </section>

      <section className="border-t-4 border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
          <SectionTitle
            index="02"
            title={t("skill.sections.techStack.title")}
            description={t("skill.sections.techStack.description")}
          />
          <TechStackGrid />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-20">
        <SectionTitle
          index="03"
          title={t("skill.sections.githubActivity.title")}
          description={t("skill.sections.githubActivity.description")}
        />
        <GithubActivity />
      </section>
    </PageShell>
  );
}
