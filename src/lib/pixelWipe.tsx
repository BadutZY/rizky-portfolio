import { useCallback, useMemo, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Shared "pixel wipe" transition primitive.
// Used by both the theme toggle (light/dark) and the language toggle
// (EN/ID) so both switches share the exact same chunky pixel-grid wipe
// animation. Keeping the mechanics here means any tweak to the animation
// (timing, cell size, jitter pattern) instantly applies everywhere it's used.
// ─────────────────────────────────────────────────────────────────────────

export const WIPE_CELL = 64;
export const WIPE_SWEEP = 560;

export type WipePhase = "idle" | "in" | "out";

export function usePixelWipe() {
  const [phase, setPhase] = useState<WipePhase>("idle");
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const [wipeColor, setWipeColor] = useState("oklch(0.97 0 0)");

  // Starts the wipe: covers the screen, runs `onCovered` once fully covered
  // (the moment to swap the underlying state — theme or language), then
  // uncovers again. Returns false if a wipe is already in progress.
  const trigger = useCallback(
    (color: string, onCovered: () => void) => {
      if (phase !== "idle") return false;
      const cols = Math.ceil(window.innerWidth / WIPE_CELL);
      const rows = Math.ceil(window.innerHeight / WIPE_CELL);
      setGrid({ cols, rows });
      setWipeColor(color);
      setPhase("in");

      window.setTimeout(() => {
        onCovered();
        setPhase("out");
      }, WIPE_SWEEP);

      window.setTimeout(() => setPhase("idle"), WIPE_SWEEP * 2);
      return true;
    },
    [phase],
  );

  const cells = useMemo(() => {
    const total = grid.cols * grid.rows;
    if (!total) return [];
    return Array.from({ length: total }, (_, i) => {
      const x = i % grid.cols;
      const y = Math.floor(i / grid.cols);
      // single diagonal sweep: top-left -> bottom-right, with chunky jitter
      const jitter = ((x * 7 + y * 13) % 4) * 15;
      return (x + y) * 9 + jitter;
    });
  }, [grid]);

  return { phase, grid, wipeColor, cells, trigger, isAnimating: phase !== "idle" };
}

export function PixelWipeOverlay({
  phase,
  grid,
  wipeColor,
  cells,
}: {
  phase: WipePhase;
  grid: { cols: number; rows: number };
  wipeColor: string;
  cells: number[];
}) {
  if (phase === "idle") return null;
  return (
    <div
      className="pixel-wipe"
      data-phase={phase === "out" ? "out" : "in"}
      aria-hidden="true"
      style={
        {
          "--cols": grid.cols,
          "--cell": `${WIPE_CELL}px`,
          "--wipe-color": wipeColor,
        } as React.CSSProperties
      }
    >
      {cells.map((delay, i) => (
        <span key={i} style={{ "--d": `${delay}ms` } as React.CSSProperties} />
      ))}
    </div>
  );
}
