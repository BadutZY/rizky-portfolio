import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t("language.switchTo")}
      title={t("language.switchTo")}
      className="lang-toggle-fixed"
    >
      <span className="pixel-label" aria-hidden="true">
        {language === "en" ? "ID" : "EN"}
      </span>
    </button>
  );
}
