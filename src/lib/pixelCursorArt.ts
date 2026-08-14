/**
 * Pixel-art definitions untuk custom cursor.
 *
 * Setiap cursor didefinisikan sebagai "grid" string:
 *   "X" = pixel isi (fill)
 *   "." = kosong
 *
 * Outline (garis tepi) TIDAK ditulis manual — dihitung otomatis oleh
 * `withOutline()`, jadi setiap bentuk selalu punya kontur 1px yang bikin
 * cursor tetap kebaca di background terang maupun gelap.
 */

export type PixelGrid = string[];

export type PixelCell = { x: number; y: number; kind: "fill" | "outline" };

/** Hitung sel isi + sel outline (8 arah) dari sebuah grid. */
export function toCells(grid: PixelGrid): {
  cells: PixelCell[];
  width: number;
  height: number;
} {
  const height = grid.length;
  const width = Math.max(...grid.map((r) => r.length));
  const filled = new Set<string>();

  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "X") filled.add(`${x},${y}`);
    }
  });

  const cells: PixelCell[] = [];
  const outline = new Set<string>();

  for (const key of filled) {
    const parts = key.split(",");
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    cells.push({ x, y, kind: "fill" });
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue;
        const nx = x + dx;
        const ny = y + dy;
        const nk = `${nx},${ny}`;
        if (!filled.has(nk)) outline.add(nk);
      }
    }
  }

  for (const key of outline) {
    const parts = key.split(",");
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    cells.push({ x, y, kind: "outline" });
  }

  return { cells, width: width + 1, height: height + 1 };
}

/** Panah standar (idle). Hotspot: ujung kiri-atas. */
export const ARROW: PixelGrid = [
  "X.........",
  "XX........",
  "XXX.......",
  "XXXX......",
  "XXXXX.....",
  "XXXXXX....",
  "XXXXXXX...",
  "XXXXXXXX..",
  "XXXXXXXXX.",
  "XXXXXXXXXX",
  "XXXXXXX...",
  "XX.XXXX...",
  "X...XXXX..",
  "....XXXX..",
  ".....XXXX.",
  ".....XXX..",
];

/** Tangan menunjuk (hover elemen yang bisa diklik). Hotspot: ujung jari. */
export const HAND: PixelGrid = [
  "..XX.......",
  "..X.X......",
  "..X.X......",
  "..X.X......",
  "..X.XX.....",
  "..X.XXXX...",
  "..X.X.X.XX.",
  ".XX.X.X.X.X",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  ".XXXXXXXXXX",
  ".XXXXXXXXX.",
  "..XXXXXXXX.",
  "..XXXXXXX..",
  "..XXXXXXX..",
];

/** Tangan menekan (saat klik). Jari ditekuk sedikit. */
export const HAND_PRESS: PixelGrid = [
  "...........",
  "...........",
  "...........",
  "..XX.......",
  "..X.XX.....",
  "..X.XXXX...",
  "..X.X.X.XX.",
  ".XX.X.X.X.X",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  ".XXXXXXXXXX",
  ".XXXXXXXXX.",
  "..XXXXXXXX.",
  "..XXXXXXX..",
  "..XXXXXXX..",
];

/** I-beam untuk teks. Hotspot: tengah. */
export const TEXT_BEAM: PixelGrid = [
  "XXXXXXX",
  "XXXXXXX",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "...X...",
  "XXXXXXX",
  "XXXXXXX",
];

/** Frame animasi hourglass (pasir turun). Hotspot: tengah. */
export const HOURGLASS: PixelGrid[] = [
  [
    "XXXXXXXXX",
    "XXXXXXXXX",
    ".XXXXXXX.",
    "..XXXXX..",
    "...XXX...",
    "....X....",
    "...X.X...",
    "..X...X..",
    ".X.....X.",
    "XXXXXXXXX",
    "XXXXXXXXX",
  ],
  [
    "XXXXXXXXX",
    "XXXXXXXXX",
    ".XXXXXXX.",
    "..XXXXX..",
    "...X.X...",
    "....X....",
    "...X.X...",
    "..X.X.X..",
    ".X.XXX.X.",
    "XXXXXXXXX",
    "XXXXXXXXX",
  ],
  [
    "XXXXXXXXX",
    "XXXXXXXXX",
    ".XXXXXXX.",
    "..X...X..",
    "...X.X...",
    "....X....",
    "...X.X...",
    "..XXXXX..",
    ".XXXXXXX.",
    "XXXXXXXXX",
    "XXXXXXXXX",
  ],
  [
    "XXXXXXXXX",
    "XXXXXXXXX",
    ".X.....X.",
    "..X...X..",
    "...X.X...",
    "....X....",
    "...XXX...",
    "..XXXXX..",
    ".XXXXXXX.",
    "XXXXXXXXX",
    "XXXXXXXXX",
  ],
];

/** Percikan (sparks) yang muncul saat klik — mengikuti gaya referensi. */
export const SPARKS: PixelGrid = [
  "X...X...X",
  ".X..X..X.",
  "..X.X.X..",
  ".........",
  "X.X...X.X",
];