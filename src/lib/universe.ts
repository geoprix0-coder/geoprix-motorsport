import type { Championship } from "./types";
import { initialChampionships } from "./seed";

export const UNIVERSE_CHAMPIONSHIPS_KEY = "geoprix-universe-championships-v1";

// F4 está temporariamente fora da pirâmide ativa. Removemos também os dados
// específicos desses campeonatos antigos, sem tocar nos demais grids e temporadas.
const EXCLUDED_CHAMPIONSHIP_IDS = [
  "formula-4-brazil-2026",
  "formula-4-italy-2026",
  "formula-4-british-2026",
  "formula-4-spanish-2026",
  "formula-4-french-2026",
  "formula-4-us-2026",
];

function cleanupExcludedChampionshipData(): void {
  if (typeof window === "undefined") return;
  for (const id of EXCLUDED_CHAMPIONSHIP_IDS) {
    const exactKeys = [
      "geoprix-teams-" + id + "-v1",
      "geoprix-calendar-" + id,
      "geoprix-calendar-history-" + id,
      "geoprix-season-history-" + id,
      "geoprix-development-reports-" + id,
      "geoprix-regulations-" + id,
      "geoprix-season-" + id,
      "geoprix-driver-contracts-" + id + "-v1",
      "geoprix-market-history-" + id + "-v1",
    ];
    for (const key of exactKeys) localStorage.removeItem(key);
    const processedPrefix = "geoprix-market-processed-" + id + "-";
    const obsoleteKeys: string[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(processedPrefix)) obsoleteKeys.push(key);
    }
    for (const key of obsoleteKeys) localStorage.removeItem(key);
  }
}

export function readUniverseChampionships(): Championship[] {
  if (typeof window === "undefined") return initialChampionships;
  try {
    cleanupExcludedChampionshipData();
    const raw = localStorage.getItem(UNIVERSE_CHAMPIONSHIPS_KEY);
    const saved = raw ? JSON.parse(raw) : [];
    const excluded = new Set(EXCLUDED_CHAMPIONSHIP_IDS);
    const byId = new Map<string, Championship>();
    for (const championship of initialChampionships) byId.set(championship.id, championship);
    if (Array.isArray(saved)) {
      for (const championship of saved) {
        if (
          championship &&
          typeof championship.id === "string" &&
          typeof championship.name === "string" &&
          !excluded.has(championship.id)
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
