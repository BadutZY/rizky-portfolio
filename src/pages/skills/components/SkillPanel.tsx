import { useEffect, useRef, useState } from "react";
import { PixelCode, PixelCpu, PixelGamepad } from "@/components/common/PixelIcon";
import { skillCategories, techDescriptions } from "@/data/skills";
import { codeByKey, resolveTechLogo } from "./skillCodeSnippets";
import { AnimatedPercent } from "./AnimatedPercent";
import { TechTag } from "./TechTag";
import { useLanguage } from "@/lib/i18n";

const icons = [PixelCode, PixelCpu, PixelGamepad];

// Durasi ini harus selaras dengan durasi transition di CSS .pixel-collapse
const COLLAPSE_ANIM_MS = 220;

export function SkillPanel() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [openTag, setOpenTag] = useState<string | null>(null);
  // displayTag = tag yang kontennya sedang dirender (dilepas sedikit belakangan
  // dari openTag supaya animasi slide-up saat menutup sempat jalan)
  const [displayTag, setDisplayTag] = useState<string | null>(null);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [tabKey, setTabKey] = useState(0);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRafRef = useRef<number | null>(null);

  const clearPendingAnim = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (openRafRef.current) {
      cancelAnimationFrame(openRafRef.current);
      openRafRef.current = null;
    }
  };

  // Klik pada TechTag:
  // - tag sama diklik lagi -> tutup dengan animasi slide up
  // - belum ada yang terbuka -> langsung buka
  // - tag lain sedang terbuka -> tutup dulu (slide up), baru buka tag baru
  const handleTagToggle = (tag: string) => {
    clearPendingAnim();

    if (openTag === tag) {
      setOpenTag(null);
      setCollapseOpen(false);
      closeTimeoutRef.current = setTimeout(() => {
        setDisplayTag(null);
      }, COLLAPSE_ANIM_MS);
      return;
    }

    if (openTag === null) {
      setOpenTag(tag);
      setDisplayTag(tag);
      openRafRef.current = requestAnimationFrame(() => setCollapseOpen(true));
      return;
    }

    setOpenTag(tag);
    setCollapseOpen(false);
    closeTimeoutRef.current = setTimeout(() => {
      setDisplayTag(tag);
      openRafRef.current = requestAnimationFrame(() => setCollapseOpen(true));
    }, COLLAPSE_ANIM_MS);
  };

  useEffect(() => clearPendingAnim, []);

  const active = skillCategories[activeTab]!;
  const Icon = icons[activeTab % icons.length]!;
  const codeLines = codeByKey[active.key]?.() ?? [];
  const displayInfo = displayTag ? techDescriptions[displayTag] : null;

  useEffect(() => {
    setVisibleLines(0);
    const total = codeLines.length;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= total) clearInterval(interval);
    }, 110);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey, activeTab]);

  return (
    <div className="pixel-card overflow-visible">
      {/* Tabs */}
      <div className="flex items-center overflow-x-auto border-b-4 border-border bg-muted/50">
        {skillCategories.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => {
              clearPendingAnim();
              setActiveTab(i);
              setOpenTag(null);
              setDisplayTag(null);
              setCollapseOpen(false);
              setTabKey((k) => k + 1);
            }}
            className="flex shrink-0 items-center gap-2 border-r-4 border-border px-3 py-3 sm:px-5"
            style={{
              background: activeTab === i ? "var(--card)" : "transparent",
              borderBottom:
                activeTab === i ? "3px solid var(--secondary)" : "3px solid transparent",
            }}
          >
            {(() => {
              const TabIcon = icons[i % icons.length]!;
              return (
                <TabIcon
                  size={13}
                  className={activeTab === i ? "text-secondary" : "text-muted-foreground"}
                />
              );
            })()}
            <span
              className="pixel-label"
              style={{
                fontSize: 9,
                color: activeTab === i ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              {s.file}
            </span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2">
        {/* Code panel */}
        <div className="relative min-h-[260px] border-b-4 border-border p-5 font-mono text-xs sm:text-sm md:min-h-[340px] md:border-b-0 md:border-r-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 shrink-0 border-2 border-border bg-destructive" />
            <span className="h-3 w-3 shrink-0 border-2 border-border bg-secondary" />
            <span className="h-3 w-3 shrink-0 border-2 border-border bg-accent" />
            <span className="pixel-label ml-2 text-muted-foreground" style={{ fontSize: 8 }}>
              {active.file}
            </span>
          </div>
          <div>
            {codeLines.map((line, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="flex gap-3 leading-7"
                style={{ opacity: i < visibleLines ? 1 : 0 }}
              >
                <span
                  className="w-5 shrink-0 select-none text-right text-muted-foreground/40"
                  style={{ fontSize: 10 }}
                >
                  {i + 1}
                </span>
                <div style={{ paddingLeft: `${(line.indent || 0) * 18}px` }}>{line.content}</div>
              </div>
            ))}
            {visibleLines >= codeLines.length && (
              <div className="flex gap-3 leading-7">
                <span
                  className="w-5 shrink-0 select-none text-right text-muted-foreground/40"
                  style={{ fontSize: 10 }}
                >
                  {codeLines.length + 1}
                </span>
                <span className="anim-blink inline-block h-4 w-2 bg-secondary" />
              </div>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center border-4 border-border bg-muted">
                <Icon size={18} className="text-secondary" />
              </div>
              <div>
                <h3 className="pixel-label text-foreground" style={{ fontSize: 12 }}>
                  {t(`skill.categories.${active.key}.title`)}
                </h3>
                <p className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                  {active.file}
                </p>
              </div>
            </div>
            <p className="body-text mb-5 text-muted-foreground">
              {t(`skill.categories.${active.key}.description`)}
            </p>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
                  {t("skill.panel.proficiency")}
                </span>
                <AnimatedPercent target={active.progress} animKey={tabKey} />
              </div>
              <div className="pixel-meter" key={`meter-${tabKey}`}>
                <i style={{ width: `${active.progress}%` }} />
              </div>
            </div>
          </div>

          <div>
            <span
              className="pixel-label mb-2 block text-muted-foreground/70"
              style={{ fontSize: 8 }}
            >
              {t("skill.panel.techStack")}
            </span>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <TechTag
                  key={tag}
                  name={tag}
                  isOpen={openTag === tag}
                  onToggle={() => handleTagToggle(tag)}
                />
              ))}
            </div>
            <div className="pixel-collapse mt-3" data-open={collapseOpen}>
              <div className="pixel-inset p-3">
                {displayInfo && displayTag && (
                  <>
                    <div className="mb-1.5 flex items-center gap-2">
                      <img
                        src={resolveTechLogo(displayInfo.logo)}
                        alt={displayTag}
                        className="h-4 w-4"
                      />
                      <span className="pixel-label text-foreground" style={{ fontSize: 9 }}>
                        {displayTag}
                      </span>
                    </div>
                    <p className="body-text text-muted-foreground" style={{ fontSize: "0.95rem" }}>
                      {t(`skill.tech.${displayTag}`)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t-4 border-border bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-4">
          <span
            className="pixel-label flex items-center gap-1.5 text-muted-foreground"
            style={{ fontSize: 8 }}
          >
            <span className="h-1.5 w-1.5 bg-secondary" />
            Ready
          </span>
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            Ln {codeLines.length}, Col 1
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            UTF-8
          </span>
          <span className="pixel-label text-muted-foreground" style={{ fontSize: 8 }}>
            {active.file.split(".").pop()?.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
