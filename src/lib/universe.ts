import type { Championship } from "./types";
import { initialChampionships } from "./seed";

export const UNIVERSE_CHAMPIONSHIPS_KEY = "geoprix-universe-championships-v1";
const EMPTY_UNIVERSE_MIGRATION_KEY = "geoprix-full-reset-v4";
const INITIAL_CHAMPIONSHIPS_SEED_KEY = "geoprix-initial-championships-seed-v1";

/** Zera os dados antigos uma única vez após a nova versão ser carregada. */
export function clearSportingUniverseData(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(EMPTY_UNIVERSE_MIGRATION_KEY) === "true") return;
  localStorage.clear();
  sessionStorage.clear();
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
    const parsed = raw ? JSON.parse(raw) : [];
    const saved = Array.isArray(parsed)
      ? parsed.filter((item): item is Championship =>
          !!item && typeof item.id === "string" && typeof item.name === "string"
        )
      : [];

    // Insere os 20 campeonatos iniciais uma única vez, sem apagar registros existentes.
    if (localStorage.getItem(INITIAL_CHAMPIONSHIPS_SEED_KEY) !== "true") {
      const existingIds = new Set(saved.map(item => item.id));
      const existingNames = new Set(saved.map(item => item.name.toLocaleLowerCase("pt-BR")));
      const missing = initialChampionships.filter(item =>
        !existingIds.has(item.id) && !existingNames.has(item.name.toLocaleLowerCase("pt-BR"))
      );
      const seeded = [...saved, ...missing];
      localStorage.setItem(UNIVERSE_CHAMPIONSHIPS_KEY, JSON.stringify(seeded));
      localStorage.setItem(INITIAL_CHAMPIONSHIPS_SEED_KEY, "true");
      return seeded;
    }

    return saved;
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
