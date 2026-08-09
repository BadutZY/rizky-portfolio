import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import LoadingScreen from "@/components/layout/LoadingScreen";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";

function NotFoundComponent() {
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useLanguage();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pixel-panel max-w-md p-10 text-center">
        <h1 className="pixel-label text-foreground" style={{ fontSize: 14 }}>
          {t("error.title")}
        </h1>
        <p className="body-text mt-4 text-muted-foreground">{t("error.description")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="pixel-btn"
          >
            {t("error.retry")}
          </button>
          <a href="/" className="pixel-btn pixel-btn-ghost">
            {t("error.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [booting, setBooting] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          {booting && <LoadingScreen onDone={() => setBooting(false)} />}
          <ThemeToggle />
          <LanguageToggle />
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
