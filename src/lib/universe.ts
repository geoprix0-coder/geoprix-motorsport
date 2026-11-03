import type { Championship } from "./types";
import { initialChampionships } from "./seed";

export const UNIVERSE_CHAMPIONSHIPS_KEY = "geoprix-universe-championships-v1";
const EMPTY_UNIVERSE_MIGRATION_KEY = "geoprix-empty-universe-migration-v1";
const CIRCUITS_KEY = "geoprix-circuits-v1";

/**
 * Remove os registros esportivos antigos uma única vez, preservando o cadastro
 * de circuitos. Assim, a migração não apaga os autódromos já cadastrados.
 */
export function clearSportingUniverseData(): void {
  if (typeof window === "undefined") return;
  const keysToRemove: string[] = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (
      key &&
      key.startsWith("geoprix-") &&
      key !== CIRCUITS_KEY &&
      key !== EMPTY_UNIVERSE_MIGRATION_KEY
    ) {
      keysToRemove.push(key);
    }
  }
  for (const key of keysToRemove) localStorage.removeItem(key);
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
    const byId = new Map<string, Championship>();
    for (const championship of initialChampionships) byId.set(championship.id, championship);
    if (Array.isArray(saved)) {
      for (const championship of saved) {
        if (
          championship &&
          typeof championship.id === "string" &&
          typeof championship.name === "string"
        ) {
          byId.set(championship.id, championship as Championship);
        }
      }
    }
    const result = [...byId.values()];
    localStorage.setItem(UNIVERSE_CHAMPIONSHIPS_KEY, JSON.stringify(result));
    return result;
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
