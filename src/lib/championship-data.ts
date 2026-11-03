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

const formula3FoundingTeams: Team[] = [
  { id: "f3-sterling-motorsport", name: "Sterling Motorsport", country: "Reino Unido", base: "Birmingham, Inglaterra", drivers: [] },
  { id: "f3-rosso-corse", name: "Rosso Corse", country: "Itália", base: "Turim, Itália", drivers: [] },
  { id: "f3-schwarz-racing", name: "Schwarz Racing", country: "Alemanha", base: "Stuttgart, Alemanha", drivers: [] },
  { id: "f3-etoile-motorsport", name: "Étoile Motorsport", country: "França", base: "Lyon, França", drivers: [] },
  { id: "f3-iberian-falcon", name: "Iberian Falcon", country: "Espanha", base: "Valência, Espanha", drivers: [] },
  { id: "f3-nordic-performance", name: "Nordic Performance", country: "Suécia", base: "Estocolmo, Suécia", drivers: [] },
  { id: "f3-pacific-horizon", name: "Pacific Horizon", country: "Japão", base: "Yokohama, Japão", drivers: [] },
  { id: "f3-condor-racing", name: "Condor Racing", country: "Argentina", base: "Buenos Aires, Argentina", drivers: [] },
  { id: "f3-maple-leaf-motorsport", name: "Maple Leaf Motorsport", country: "Canadá", base: "Montreal, Canadá", drivers: [] },
  { id: "f3-lionheart-racing", name: "Lionheart Racing", country: "África do Sul", base: "Cidade do Cabo, África do Sul", drivers: [] },
];

const formula2FoundingTeams: Team[] = [
  { id: "f2-falcon-motorsport", name: "Falcon Motorsport", country: "Reino Unido", base: "Silverstone, Inglaterra", drivers: [] },
  { id: "f2-prisma-racing", name: "Prisma Racing", country: "Itália", base: "Modena, Itália", drivers: [] },
  { id: "f2-rheinland-motorsport", name: "Rheinland Motorsport", country: "Países Baixos", base: "Eindhoven, Países Baixos", drivers: [] },
  { id: "f2-baltic-racing", name: "Baltic Racing", country: "Suécia", base: "Gotemburgo, Suécia", drivers: [] },
  { id: "f2-iberia-competition", name: "Iberia Competition", country: "Portugal", base: "Porto, Portugal", drivers: [] },
  { id: "f2-caspian-motorsport", name: "Caspian Motorsport", country: "Turquia", base: "Istambul, Turquia", drivers: [] },
  { id: "f2-pacific-racing", name: "Pacific Racing", country: "Coreia do Sul", base: "Seul, Coreia do Sul", drivers: [] },
  { id: "f2-aquila-racing", name: "Aquila Racing", country: "Brasil", base: "São Paulo, Brasil", drivers: [] },
  { id: "f2-andes-grand-prix", name: "Andes Grand Prix", country: "Argentina", base: "Córdoba, Argentina", drivers: [] },
  { id: "f2-kalahari-motorsport", name: "Kalahari Motorsport", country: "África do Sul", base: "Joanesburgo, África do Sul", drivers: [] },
];

// Equipes fundadoras são inseridas sem apagar cadastros feitos pelo usuário.
export function initialTeamsForChampionship(championshipId: string): Team[] {
  if (championshipId === "world-formula-2026") return worldFormulaFoundingTeams;
  if (championshipId === "formula-2-2026") return formula2FoundingTeams;
  if (championshipId === "formula-3-2026") return formula3FoundingTeams;
  return [];
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
