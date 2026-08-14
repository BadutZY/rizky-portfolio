import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";
import PixelCursor from "@/components/common/PixelCursor";
import ErrorBoundary from "@/ErrorBoundary";

export function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pixel-panel max-w-md p-10 text-center">
        <h1 className="pixel-title text-foreground" style={{ fontSize: 40 }}>
          {t("notFound.title")}
        </h1>
        <h2 className="pixel-label mt-6 text-foreground">{t("notFound.subtitle")}</h2>
        <p className="body-text mt-4 text-muted-foreground">{t("notFound.description")}</p>
        <div className="mt-8">
          <Link to="/" className="pixel-btn">
            {t("notFound.continue")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const [booting, setBooting] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Custom cursor pixel-art (desktop only, ikut tema light/dark) */}
        <PixelCursor />
        {booting && <LoadingScreen onDone={() => setBooting(false)} />}
        <ThemeToggle />
        <LanguageToggle />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default RootComponent;
