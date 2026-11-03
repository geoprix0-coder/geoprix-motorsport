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

const europeanFormulaRegionalFoundingTeams: Team[] = [
  { id: "efr-alpine-star-racing", name: "Alpine Star Racing", country: "França", base: "Magny-Cours, França", drivers: [] },
  { id: "efr-britannia-motorsport", name: "Britannia Motorsport", country: "Reino Unido", base: "Silverstone, Inglaterra", drivers: [] },
  { id: "efr-scuderia-bellini", name: "Scuderia Bellini", country: "Itália", base: "Parma, Itália", drivers: [] },
  { id: "efr-rhein-motorsport", name: "Rhein Motorsport", country: "Alemanha", base: "Colônia, Alemanha", drivers: [] },
  { id: "efr-iberia-racing-team", name: "Iberia Racing Team", country: "Espanha", base: "Madri, Espanha", drivers: [] },
  { id: "efr-lowlands-motorsport", name: "Lowlands Motorsport", country: "Países Baixos", base: "Zandvoort, Países Baixos", drivers: [] },
  { id: "efr-nordic-racing", name: "Nordic Racing", country: "Suécia", base: "Malmö, Suécia", drivers: [] },
  { id: "efr-helvetic-motorsport", name: "Helvetic Motorsport", country: "Suíça", base: "Hinwil, Suíça", drivers: [] },
  { id: "efr-balkan-performance", name: "Balkan Performance", country: "Croácia", base: "Zagreb, Croácia", drivers: [] },
  { id: "efr-atlantic-motorsport", name: "Atlantic Motorsport", country: "Portugal", base: "Lisboa, Portugal", drivers: [] },
];


const americasFormulaRegionalFoundingTeams: Team[] = [
  { id: "afr-pacific-racing", name: "Pacific Racing", country: "Estados Unidos", base: "Los Angeles, Estados Unidos", drivers: [] },
  { id: "afr-northstar-motorsport", name: "Northstar Motorsport", country: "Canadá", base: "Toronto, Canadá", drivers: [] },
  { id: "afr-azteca-racing", name: "Azteca Racing", country: "México", base: "Cidade do México, México", drivers: [] },
  { id: "afr-caribbean-motorsport", name: "Caribbean Motorsport", country: "República Dominicana", base: "Santo Domingo, República Dominicana", drivers: [] },
  { id: "afr-istmo-racing", name: "Istmo Racing", country: "Panamá", base: "Cidade do Panamá, Panamá", drivers: [] },
  { id: "afr-andean-motorsport", name: "Andean Motorsport", country: "Colômbia", base: "Bogotá, Colômbia", drivers: [] },
  { id: "afr-condor-grand-prix", name: "Condor Grand Prix", country: "Argentina", base: "Buenos Aires, Argentina", drivers: [] },
  { id: "afr-vertice-motorsport", name: "Vértice Motorsport", country: "Brasil", base: "São Paulo, Brasil", drivers: [] },
  { id: "afr-pacific-andes-racing", name: "Pacific Andes Racing", country: "Chile", base: "Santiago, Chile", drivers: [] },
  { id: "afr-pampa-motorsport", name: "Pampa Motorsport", country: "Uruguai", base: "Montevidéu, Uruguai", drivers: [] },
];

// Equipes fundadoras são inseridas sem apagar cadastros feitos pelo usuário.
export function initialTeamsForChampionship(championshipId: string): Team[] {
  if (championshipId === "world-formula-2026") return worldFormulaFoundingTeams;
  if (championshipId === "formula-2-2026") return formula2FoundingTeams;
  if (championshipId === "formula-3-2026") return formula3FoundingTeams;
  if (championshipId === "european-formula-regional-2026") return europeanFormulaRegionalFoundingTeams;
  if (championshipId === "americas-formula-regional-2026") return americasFormulaRegionalFoundingTeams;
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
