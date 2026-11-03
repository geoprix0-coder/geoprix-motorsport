import type { Team } from "./types";

export function teamStorageKey(championshipId: string): string {
  return championshipId === "formula-1-2026"
    ? "geoprix-teams-v1"
    : "geoprix-teams-" + championshipId + "-v1";
}

const worldFormulaFoundingTeams: Team[] = [
  { id: "wf-apex-grand-prix", name: "Apex Grand Prix", country: "Reino Unido", base: "Oxford, Inglaterra", drivers: [] },
  { id: "wf-scuderia-valdieri", name: "Scuderia Valdieri", country: "Itália", base: "Maranello, Itália", drivers: [] },
  { id: "wf-aurora-motorsport", name: "Aurora Motorsport", country: "Alemanha", base: "Munique, Alemanha", drivers: [] },
  { id: "wf-titan-racing", name: "Titan Racing", country: "Estados Unidos", base: "Charlotte, Carolina do Norte, Estados Unidos", drivers: [] },
  { id: "wf-sakura-grand-prix", name: "Sakura Grand Prix", country: "Japão", base: "Suzuka, Japão", drivers: [] },
  { id: "wf-orion-motorsport", name: "Orion Motorsport", country: "França", base: "Le Mans, França", drivers: [] },
  { id: "wf-vertice-racing", name: "Vértice Racing", country: "Brasil", base: "São Paulo, Brasil", drivers: [] },
  { id: "wf-crown-dragon-racing", name: "Crown Dragon Racing", country: "China", base: "Xangai, China", drivers: [] },
  { id: "wf-southern-cross-motorsport", name: "Southern Cross Motorsport", country: "Austrália", base: "Melbourne, Austrália", drivers: [] },
  { id: "wf-atlas-grand-prix", name: "Atlas Grand Prix", country: "Espanha", base: "Barcelona, Espanha", drivers: [] },
];

// As equipes fundadoras são inseridas sem apagar cadastros feitos pelo usuário.
export function initialTeamsForChampionship(championshipId: string): Team[] {
  return championshipId === "world-formula-2026" ? worldFormulaFoundingTeams : [];
}

export function mergeInitialTeams(championshipId: string, savedTeams: Team[]): Team[] {
  const initial = initialTeamsForChampionship(championshipId);
  const savedIds = new Set(savedTeams.map(team => team.id));
  const savedNames = new Set(savedTeams.map(team => team.name.trim().toLocaleLowerCase("pt-BR")));
  const missing = initial.filter(team =>
    !savedIds.has(team.id) &&
    !savedNames.has(team.name.trim().toLocaleLowerCase("pt-BR"))
  );
  return [...savedTeams, ...missing];
}
