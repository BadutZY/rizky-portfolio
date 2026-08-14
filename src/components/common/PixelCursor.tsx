import { useEffect, useMemo, useRef, useState } from "react";

import {
  ARROW,
  HAND,
  HAND_PRESS,
  HOURGLASS,
  SPARKS,
  TEXT_BEAM,
  toCells,
  type PixelGrid,
} from "@/lib/pixelCursorArt";

/**
 * PixelCursor
 * -----------
 * Custom cursor pixel-art yang menggantikan cursor bawaan OS di perangkat
 * berpointer presisi (mouse/trackpad). Semua warnanya diambil dari token tema
 * (`--cursor-fill` / `--cursor-stroke` di styles.css), jadi otomatis ikut
 * berubah saat tema terang/gelap di-toggle.
 *
 * State cursor:
 *   idle    -> panah
 *   pointer -> tangan menunjuk (hover link/tombol/elemen interaktif)
 *   text    -> I-beam (hover teks, input, textarea)
 *   loading -> hourglass yang berputar + pasir jatuh
 *   klik    -> tangan menekan / panah + percikan (sparks)
 */

type Variant = "idle" | "pointer" | "text" | "loading";

/** Ukuran 1 pixel art dalam pixel layar. */
const SCALE = 2;

/** Hotspot (titik klik) tiap varian, dalam koordinat grid. */
const HOTSPOT: Record<Variant, { x: number; y: number }> = {
  idle: { x: 0, y: 0 },
  pointer: { x: 3, y: 0 },
  text: { x: 3, y: 7 },
  loading: { x: 4, y: 5 },
};

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="link"], [role="tab"], [role="menuitem"], summary, select, label[for], input[type="checkbox"], input[type="radio"], input[type="submit"], input[type="button"], input[type="range"], [data-cursor="pointer"], .pixel-btn';

const TEXT_SELECTOR =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="range"]), textarea, [contenteditable="true"], [data-cursor="text"]';

const TEXT_TAGS = new Set([
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "SPAN",
  "LI",
  "BLOCKQUOTE",
  "CODE",
  "PRE",
  "STRONG",
  "EM",
  "SMALL",
  "TD",
  "TH",
  "LABEL",
]);

function PixelShape({ grid }: { grid: PixelGrid }) {
  const { cells, width, height } = useMemo(() => toCells(grid), [grid]);
  return (
    <svg
      width={width * SCALE}
      height={height * SCALE}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      style={{ display: "block", overflow: "visible" }}
    >
      {cells.map((c) => (
        <rect
          key={`${c.kind}-${c.x}-${c.y}`}
          x={c.x}
          y={c.y}
          width={1}
          height={1}
          fill={c.kind === "fill" ? "var(--cursor-fill)" : "var(--cursor-stroke)"}
        />
      ))}
    </svg>
  );
}

/** Cek apakah node punya teks yang bisa diseleksi (bukan cuma wadah kosong). */
function looksLikeText(el: Element | null) {
  if (!el) return false;
  if (el.closest(TEXT_SELECTOR)) return true;
  if (el.closest(INTERACTIVE_SELECTOR)) return false;
  if (!TEXT_TAGS.has(el.tagName)) return false;
  return (el.textContent ?? "").trim().length > 0;
}

export default function PixelCursor() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("idle");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [frame, setFrame] = useState(0);

  /* Aktifkan hanya di perangkat dengan mouse/trackpad (bukan touch). */
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* Sembunyikan cursor OS selama custom cursor aktif. */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("pixel-cursor-on", enabled);
    return () => root.classList.remove("pixel-cursor-on");
  }, [enabled]);

  /* Gerak cursor + deteksi varian. Posisi ditulis langsung ke DOM (bukan
     state) supaya tidak ada lag / re-render tiap pixel. */
  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let x = -100;
    let y = -100;

    const render = () => {
      raf = 0;
      const el = wrapRef.current;
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(render);

      const target = e.target as Element | null;
      const busy =
        document.documentElement.dataset["cursor"] === "loading" ||
        !!target?.closest('[data-cursor="loading"], [aria-busy="true"]');

      if (busy) setVariant("loading");
      else if (target?.closest(INTERACTIVE_SELECTOR)) setVariant("pointer");
      else if (looksLikeText(target)) setVariant("text");
      else setVariant("idle");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onLeave);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  /* Animasi pasir hourglass saat loading. */
  useEffect(() => {
    if (!enabled || variant !== "loading") return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % HOURGLASS.length), 160);
    return () => window.clearInterval(id);
  }, [enabled, variant]);

  if (!enabled) return null;

  const grid: PixelGrid =
    variant === "loading"
      ? (HOURGLASS[frame] ?? HOURGLASS[0]!)
      : variant === "text"
        ? TEXT_BEAM
        : variant === "pointer"
          ? pressed
            ? HAND_PRESS
            : HAND
          : ARROW;

  const hot = HOTSPOT[variant];
  const showSparks = pressed && variant !== "loading" && variant !== "text";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pixel-cursor-root"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className={[
          "pixel-cursor-art",
          variant === "loading" ? "is-spinning" : "",
          pressed ? "is-pressed" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          marginLeft: -hot.x * SCALE,
          marginTop: -hot.y * SCALE,
        }}
      >
        <PixelShape grid={grid} />
        {showSparks && (
          <div className="pixel-cursor-sparks">
            <PixelShape grid={SPARKS} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Helper opsional: paksa cursor jadi "loading" secara global.
 * Contoh: setCursorLoading(true) saat fetch, lalu false setelah selesai.
 */
export function setCursorLoading(active: boolean) {
  if (typeof document === "undefined") return;
  if (active) document.documentElement.dataset["cursor"] = "loading";
  else delete document.documentElement.dataset["cursor"];
}