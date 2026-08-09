import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b-4 border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="pixel-tag pixel-tag-secondary anim-pop inline-block">{kicker}</span>
        <h1
          className="pixel-title anim-in mt-6 text-foreground"
          style={{ fontSize: "clamp(22px, 6vw, 40px)", ["--delay" as string]: "60ms" }}
        >
          {title}
        </h1>
        <p
          className="anim-in body-text mt-6 max-w-2xl text-muted-foreground"
          style={{ ["--delay" as string]: "120ms" }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionTitle({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="pixel-tag pixel-tag-primary">{index}</span>
        <div className="pixel-rule-accent flex-1" />
      </div>
      <h2
        className="pixel-title mt-5 text-foreground"
        style={{ fontSize: "clamp(16px, 4.2vw, 26px)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="body-text mt-4 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
