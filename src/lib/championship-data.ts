import { initialFormula2Teams } from "./formula2-2026";
import { initialTeams } from "./seed";

export function teamStorageKey(championshipId: string): string {
  return championshipId === "formula-1-2026"
    ? "geoprix-teams-v1"
    : "geoprix-teams-" + championshipId + "-v1";
}

export function initialTeamsForChampionship(championshipId: string) {
  return championshipId === "formula-2-2026" ? initialFormula2Teams : initialTeams;
}
