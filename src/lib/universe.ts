import type { Championship } from "./types";
import { initialChampionships } from "./seed";

export const UNIVERSE_CHAMPIONSHIPS_KEY = "geoprix-universe-championships-v1";
const EMPTY_UNIVERSE_MIGRATION_KEY = "geoprix-full-reset-v2";

/**
 * Limpa todos os dados locais do GEOPRIX uma única vez neste navegador.
 * Inclui campeonatos, equipes, pilotos, circuitos, calendários, resultados,
 * contratos, regulamentos, históricos e relatórios.
 */
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
