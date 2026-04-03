export const HOUR_HEIGHT = 64; // px per hour
export const START_HOUR   = 6; // grid starts at 06:00
export const GRID_HOURS   = 16; // 06:00 → 22:00
export const GRID_HEIGHT  = GRID_HOURS * HOUR_HEIGHT; // 1024 px

/** Top offset (px) and height (px) for a class card given its start time and duration. */
export function getClassPosition(
  startTime: string,
  duration: number,
): { top: number; height: number } {
  const [h, m] = startTime.split(":").map(Number);
  const minutesFromStart = (h - START_HOUR) * 60 + m;
  const top    = (minutesFromStart / 60) * HOUR_HEIGHT;
  const height = Math.max((duration / 60) * HOUR_HEIGHT, 24); // 24 px minimum
  return { top, height };
}

// ─── Overlap layout ───────────────────────────────────────────────────────────

export interface PositionedClass<T> {
  gymClass: T;
  column: number;       // 0-indexed lane within its overlap cluster
  totalColumns: number; // number of lanes in the cluster
}

function parseMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function doOverlap<T extends { startTime: string; duration: number }>(a: T, b: T): boolean {
  const aStart = parseMinutes(a.startTime);
  const bStart = parseMinutes(b.startTime);
  return aStart < bStart + b.duration && aStart + a.duration > bStart;
}

/**
 * Assign each class a column index and total-column count so that
 * overlapping classes appear side-by-side instead of stacked.
 *
 * Uses union-find to group transitively overlapping classes into clusters,
 * then greedily assigns each class to the lowest available lane.
 */
export function positionClasses<T extends { startTime: string; duration: number }>(classes: T[]): PositionedClass<T>[] {
  if (classes.length === 0) return [];

  const n = classes.length;

  // Union-Find
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(i: number): number {
    if (parent[i] !== i) parent[i] = find(parent[i]);
    return parent[i];
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (doOverlap(classes[i], classes[j])) parent[find(i)] = find(j);
    }
  }

  // Group by cluster root
  const clusters = new Map<number, number[]>();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    const g = clusters.get(root) ?? [];
    g.push(i);
    clusters.set(root, g);
  }

  const result: PositionedClass<T>[] = new Array(n);

  for (const indices of clusters.values()) {
    // Sort within cluster by start time
    indices.sort((a, b) => parseMinutes(classes[a].startTime) - parseMinutes(classes[b].startTime));

    const lanes: number[][] = []; // lanes[col] = class indices occupying that lane

    for (const idx of indices) {
      let col = 0;
      while (lanes[col]?.some((existing) => doOverlap(classes[idx], classes[existing]))) col++;
      if (!lanes[col]) lanes[col] = [];
      lanes[col].push(idx);
      result[idx] = { gymClass: classes[idx], column: col, totalColumns: 0 };
    }

    const total = lanes.length;
    for (const idx of indices) result[idx].totalColumns = total;
  }

  return result;
}

/** Convert a Y pixel offset within the grid to the nearest 15-min "HH:MM" string. */
export function yToTime(y: number): string {
  const minutesFromStart = (y / HOUR_HEIGHT) * 60;
  const totalMinutes     = START_HOUR * 60 + minutesFromStart;
  const snapped  = Math.round(totalMinutes / 15) * 15;
  const clamped  = Math.min(Math.max(snapped, START_HOUR * 60), 21 * 60);
  const hours = Math.floor(clamped / 60);
  const mins  = clamped % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
