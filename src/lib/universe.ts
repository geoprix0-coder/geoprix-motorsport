import type { Championship } from "./types";
import { initialChampionships } from "./seed";

export const UNIVERSE_CHAMPIONSHIPS_KEY = "geoprix-universe-championships-v1";
const EMPTY_UNIVERSE_MIGRATION_KEY = "geoprix-full-reset-v3";

/** Zera os dados antigos uma única vez após a nova versão ser carregada. */
export function clearSportingUniverseData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(EMPTY_UNIVERSE_MIGRATION_KEY) === "true") return;
  localStorage.clear();
  localStorage.setItem(EMPTY_UNIVERSE_MIGRATION_KEY, "true");
}

function ensureEmptyUniverseMigration(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(EMPTY_UNIVERSE_MIGRATION_KEY) === "true") return;
  clearSportingUniverseData();
}

export function readUniverseChampionships(): Championship[] {
  if (typeof window === "undefined") return initialChampionships;
  try {
    ensureEmptyUniverseMigration();
    const raw = localStorage.getItem(UNIVERSE_CHAMPIONSHIPS_KEY);
    const saved = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(saved)) return [];
    return saved.filter((item): item is Championship =>
      !!item && typeof item.id === "string" && typeof item.name === "string"
    );
  } catch {
    return [];
  }
}

export function saveUniverseChampionship(championship: Championship): Championship[] {
  const current = readUniverseChampionships();
  const next = [...current.filter(item => item.id !== championship.id), championship];
  localStorage.setItem(UNIVERSE_CHAMPIONSHIPS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("geoprix-championships-updated"));
  return next;
}
