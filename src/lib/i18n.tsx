import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useTheme, WIPE_COLOR } from "@/lib/theme";
import { usePixelWipe, PixelWipeOverlay } from "@/lib/pixelWipe";
import en, { type Dictionary } from "@/i18n/en";
import id from "@/i18n/id";

export type Language = "en" | "id";

const dictionaries: Record<Language, Dictionary> = { en, id };

type Vars = Record<string, string | number>;

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string, vars?: Vars) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  toggleLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

const STORAGE_KEY = "badutzy-language";

function getNested(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function interpolate(str: string, vars?: Vars): string {
  if (!vars) return str;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{{${k}}}`, String(v)), str);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  // Sama seperti ThemeProvider: baca localStorage langsung di initializer
  // state, bukan lewat useEffect terpisah, supaya tidak ada race condition
  // yang bisa menimpa bahasa tersimpan dengan default "en" saat refresh.
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "id" ? stored : "en";
  });
  const { phase, grid, wipeColor, cells, trigger } = usePixelWipe();

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    trigger(WIPE_COLOR[theme], () => {
      setLanguage((l) => (l === "en" ? "id" : "en"));
    });
  }, [theme, trigger]);

  const t = useMemo(() => {
    const dict = dictionaries[language];
    return (key: string, vars?: Vars) => {
      const raw = getNested(dict, key) ?? getNested(en, key);
      if (typeof raw !== "string") return key;
      return interpolate(raw, vars);
    };
  }, [language]);

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <PixelWipeOverlay phase={phase} grid={grid} wipeColor={wipeColor} cells={cells} />
    </LanguageContext.Provider>
  );
}
