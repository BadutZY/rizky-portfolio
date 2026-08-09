import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePixelWipe, PixelWipeOverlay } from "@/lib/pixelWipe";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = "badutzy-theme";

// Color used for the whole transition when leaving this theme. Reused by
// the language toggle too, so both wipes always match the active theme.
export const WIPE_COLOR: Record<Theme, string> = {
  dark: "oklch(0.97 0 0)",
  light: "oklch(0.18 0 0)",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Baca localStorage langsung saat inisialisasi state (bukan lewat useEffect
  // terpisah), supaya tidak ada race condition antara efek "baca" dan efek
  // "tulis" yang bisa menimpa tema tersimpan dengan nilai default saat mount.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "dark";
  });
  const { phase, grid, wipeColor, cells, trigger } = usePixelWipe();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    trigger(WIPE_COLOR[theme], () => {
      setTheme((t) => (t === "dark" ? "light" : "dark"));
    });
  }, [theme, trigger]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <PixelWipeOverlay phase={phase} grid={grid} wipeColor={wipeColor} cells={cells} />
    </ThemeContext.Provider>
  );
}
