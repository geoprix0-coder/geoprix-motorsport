import type { Team } from "./types";
import { initialFormula2Teams } from "./formula2-2026";
import { initialFormula3Teams } from "./formula3-2026";
import { initialFormulaRegionalEuropeTeams } from "./formula-regional-europe-2026";
import { initialFormulaRegionalAmericasTeams } from "./formula-regional-americas-2026";
import { initialTeams } from "./seed";

export function teamStorageKey(championshipId: string): string {
  return championshipId === "formula-1-2026"
    ? "geoprix-teams-v1"
    : "geoprix-teams-" + championshipId + "-v1";
}

export function initialTeamsForChampionship(championshipId: string): Team[] {
  if (championshipId === "formula-1-2026") return initialTeams;
  if (championshipId === "formula-2-2026") return initialFormula2Teams;
  if (championshipId === "formula-3-2026") return initialFormula3Teams;
  if (championshipId === "formula-regional-europe-2026") return initialFormulaRegionalEuropeTeams;
  if (championshipId === "formula-regional-americas-2026") return initialFormulaRegionalAmericasTeams;
  return [];
}

/** Add any missing seeded teams to an existing local roster without overwriting user edits. */
export function mergeInitialTeams(championshipId: string, savedTeams: Team[]): Team[] {
  const merged = [...savedTeams];
  const existingIds = new Set(savedTeams.map(team => team.id));
  for (const team of initialTeamsForChampionship(championshipId)) {
    if (!existingIds.has(team.id)) merged.push(team);
  }
  return merged;
}
