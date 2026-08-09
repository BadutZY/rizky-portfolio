import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const LOGO = [
  "0111111110",
  "1000000001",
  "1011001101",
  "1011001101",
  "1000000001",
  "1010000101",
  "1001111001",
  "1000000001",
  "0111111110",
  "0010000100",
];

const TOTAL_BLOCKS = 20;
const CELL = 64;
const SWEEP = 620;

type Phase = "idle" | "in" | "out";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [gone, setGone] = useState(false);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const tick = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + 5)));
    }, 60);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const start = window.setTimeout(() => {
      setGrid({
        cols: Math.ceil(window.innerWidth / CELL),
        rows: Math.ceil(window.innerHeight / CELL),
      });
      setPhase("in");
    }, 240);

    // layar tertutup penuh -> sembunyikan konten loading, lalu buka searah
    const reveal = window.setTimeout(() => setPhase("out"), 240 + SWEEP);
    const finish = window.setTimeout(
      () => {
        setGone(true);
        onDone();
      },
      240 + SWEEP * 2,
    );

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(reveal);
      window.clearTimeout(finish);
    };
  }, [progress, onDone]);

  const cells = useMemo(() => {
    const total = grid.cols * grid.rows;
    if (!total) return [];
    return Array.from({ length: total }, (_, i) => {
      const x = i % grid.cols;
      const y = Math.floor(i / grid.cols);
      const jitter = ((x * 7 + y * 13) % 4) * 15;
      return (x + y) * 10 + jitter;
    });
  }, [grid]);

  if (gone) return null;

  const filled = Math.round((progress / 100) * TOTAL_BLOCKS);
  const covered = phase === "out";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 ${
        covered ? "" : "crt-lines bg-background"
      }`}
      role="status"
      aria-live="polite"
    >
      {!covered && (
        <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
          <div
            className="anim-bob grid gap-[3px]"
            style={{ gridTemplateColumns: "repeat(10, 1fr)" }}
          >
            {LOGO.flatMap((row, y) =>
              row.split("").map((c, x) => (
                <span
                  key={`${x}-${y}`}
                  className={c === "1" ? "anim-pop bg-secondary" : "bg-transparent"}
                  style={
                    {
                      width: 16,
                      height: 16,
                      "--delay": `${(x + y) * 22}ms`,
                    } as React.CSSProperties
                  }
                />
              )),
            )}
          </div>

          <div className="text-center">
            <h1
              className="pixel-title text-foreground"
              style={{ fontSize: "clamp(18px, 6vw, 28px)" }}
            >
              RIZKY
            </h1>
            <p className="pixel-label mt-4 text-muted-foreground" style={{ fontSize: 9 }}>
              {t("loading.subtitle")}
            </p>
          </div>

          <div className="w-full">
            <div className="flex gap-[3px] border-4 border-border bg-muted p-[4px]">
              {Array.from({ length: TOTAL_BLOCKS }, (_, i) => (
                <span
                  key={i}
                  className={i < filled ? "bg-secondary" : "bg-transparent"}
                  style={{ height: 16, flex: 1 }}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="pixel-label text-muted-foreground" style={{ fontSize: 9 }}>
                {t("loading.loading")}
                <span className="anim-blink">_</span>
              </span>
              <span className="pixel-label text-secondary" style={{ fontSize: 9 }}>
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}

      {phase !== "idle" && (
        <div
          className="pixel-wipe"
          data-phase={phase}
          aria-hidden="true"
          style={
            {
              "--cols": grid.cols,
              "--cell": `${CELL}px`,
              "--wipe-color": "var(--foreground)",
              zIndex: 20,
            } as React.CSSProperties
          }
        >
          {cells.map((d, i) => (
            <span key={i} style={{ "--d": `${d}ms` } as React.CSSProperties} />
          ))}
        </div>
      )}
    </div>
  );
}
