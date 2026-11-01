import type { Championship } from "./types";
import { initialChampionships } from "./seed";

export const UNIVERSE_CHAMPIONSHIPS_KEY = "geoprix-universe-championships-v1";

export function readUniverseChampionships(): Championship[] {
  if (typeof window === "undefined") return initialChampionships;
  try {
    const raw = localStorage.getItem(UNIVERSE_CHAMPIONSHIPS_KEY);
    const saved = raw ? JSON.parse(raw) : [];
    const byId = new Map<string, Championship>();
    for (const championship of initialChampionships) byId.set(championship.id, championship);
    if (Array.isArray(saved)) {
      for (const championship of saved) {
        if (championship && typeof championship.id === "string" && typeof championship.name === "string") {
          byId.set(championship.id, championship as Championship);
        }
      }
    }
    return [...byId.values()];
  } catch {
    return initialChampionships;
  }
}

export function saveUniverseChampionship(championship: Championship): Championship[] {
  const current = readUniverseChampionships();
  const next = [...current.filter(item => item.id !== championship.id), championship];
  localStorage.setItem(UNIVERSE_CHAMPIONSHIPS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("geoprix-championships-updated"));
  return next;
}
