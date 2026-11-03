import type { Team } from "./types";

export function teamStorageKey(championshipId: string): string {
  return championshipId === "formula-1-2026"
    ? "geoprix-teams-v1"
    : "geoprix-teams-" + championshipId + "-v1";
}

// Nenhuma categoria recebe equipes ou pilotos pré-cadastrados.
export function initialTeamsForChampionship(_championshipId: string): Team[] {
  return [];
}

/** Mantido por compatibilidade; não há mais elencos iniciais para mesclar. */
export function mergeInitialTeams(_championshipId: string, savedTeams: Team[]): Team[] {
  return [...savedTeams];
}
