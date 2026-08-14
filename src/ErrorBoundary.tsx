import { Component, type ErrorInfo, type ReactNode } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { useLanguage } from "@/lib/i18n";

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="pixel-panel max-w-md p-10 text-center">
        <h1 className="pixel-label text-foreground" style={{ fontSize: 14 }}>
          {t("error.title")}
        </h1>
        <p className="body-text mt-4 text-muted-foreground">{t("error.description")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onRetry} className="pixel-btn">
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

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
    reportLovableError(error, { boundary: "react_error_boundary" });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  override render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
