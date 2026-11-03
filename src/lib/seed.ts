import type { Championship, Team } from "./types";

// Estrutura inicial do universo: somente os nomes dos campeonatos são exibidos.
// Equipes, pilotos, calendários e regulamentos serão cadastrados posteriormente.
const championshipNames: Array<{ id: string; name: string; category: string }> = [
  { id: "world-formula-2026", name: "World Formula", category: "World Formula" },
  { id: "formula-2-2026", name: "Formula 2", category: "Formula 2" },
  { id: "formula-3-2026", name: "Formula 3", category: "Formula 3" },
  { id: "european-formula-regional-2026", name: "European Formula Regional", category: "Formula Regional" },
  { id: "americas-formula-regional-2026", name: "Americas Formula Regional", category: "Formula Regional" },
  { id: "asia-pacific-formula-regional-2026", name: "Asia-Pacific Formula Regional", category: "Formula Regional" },
  { id: "formula-4-france-2026", name: "Formula 4 France", category: "Formula 4" },
  { id: "formula-4-united-kingdom-2026", name: "Formula 4 United Kingdom", category: "Formula 4" },
  { id: "formula-4-italy-2026", name: "Formula 4 Italy", category: "Formula 4" },
  { id: "formula-4-spain-2026", name: "Formula 4 Spain", category: "Formula 4" },
  { id: "formula-4-germany-2026", name: "Formula 4 Germany", category: "Formula 4" },
  { id: "formula-4-united-states-2026", name: "Formula 4 United States", category: "Formula 4" },
  { id: "formula-4-mexico-2026", name: "Formula 4 Mexico", category: "Formula 4" },
  { id: "formula-4-japan-2026", name: "Formula 4 Japan", category: "Formula 4" },
  { id: "formula-4-mongolia-2026", name: "Formula 4 Mongolia", category: "Formula 4" },
  { id: "formula-4-china-2026", name: "Formula 4 China", category: "Formula 4" },
  { id: "formula-4-indonesia-2026", name: "Formula 4 Indonesia", category: "Formula 4" },
  { id: "formula-4-australia-2026", name: "Formula 4 Australia", category: "Formula 4" },
  { id: "formula-4-new-zealand-2026", name: "Formula 4 New Zealand", category: "Formula 4" },
  { id: "formula-4-brazil-2026", name: "Formula 4 Brazil", category: "Formula 4" },
];

export const initialChampionships: Championship[] = championshipNames.map(({ id, name, category }) => ({
  id,
  name,
  category,
  season: 2026,
  status: "planning",
}));

export const initialTeams: Team[] = [];
