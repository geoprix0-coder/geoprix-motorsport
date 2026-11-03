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


const asiaPacificFormulaRegionalFoundingTeams: Team[] = [
  { id: "apfr-sakura-performance", name: "Sakura Performance", country: "Japão", base: "Suzuka, Japão", drivers: [] },
  { id: "apfr-dragon-motorsport", name: "Dragon Motorsport", country: "China", base: "Xangai, China", drivers: [] },
  { id: "apfr-pacific-apex-racing", name: "Pacific Apex Racing", country: "Austrália", base: "Melbourne, Austrália", drivers: [] },
  { id: "apfr-lion-city-motorsport", name: "Lion City Motorsport", country: "Singapura", base: "Singapura", drivers: [] },
  { id: "apfr-seoul-racing-works", name: "Seoul Racing Works", country: "Coreia do Sul", base: "Seul, Coreia do Sul", drivers: [] },
  { id: "apfr-straits-motorsport", name: "Straits Motorsport", country: "Malásia", base: "Kuala Lumpur, Malásia", drivers: [] },
  { id: "apfr-garuda-racing", name: "Garuda Racing", country: "Indonésia", base: "Jacarta, Indonésia", drivers: [] },
  { id: "apfr-himalayan-motorsport", name: "Himalayan Motorsport", country: "Índia", base: "Bangalore, Índia", drivers: [] },
  { id: "apfr-kiwi-grand-prix", name: "Kiwi Grand Prix", country: "Nova Zelândia", base: "Auckland, Nova Zelândia", drivers: [] },
  { id: "apfr-gulf-falcon-racing", name: "Gulf Falcon Racing", country: "Emirados Árabes Unidos", base: "Dubai, Emirados Árabes Unidos", drivers: [] },
];

const formula4FranceFoundingTeams: Team[] = [
  { id: "f4fr-ecurie-lumiere", name: "Écurie Lumière", country: "França", base: "Paris, França", drivers: [] },
  { id: "f4fr-provence-motorsport", name: "Provence Motorsport", country: "França", base: "Marselha, França", drivers: [] },
  { id: "f4fr-alpine-racing-france", name: "Alpine Racing France", country: "França", base: "Grenoble, França", drivers: [] },
  { id: "f4fr-atlantic-competition", name: "Atlantic Competition", country: "França", base: "Nantes, França", drivers: [] },
  { id: "f4fr-lyon-grand-prix", name: "Lyon Grand Prix", country: "França", base: "Lyon, França", drivers: [] },
  { id: "f4fr-cote-azur-racing", name: "Côte d’Azur Racing", country: "França", base: "Nice, França", drivers: [] },
];

const formula4UnitedKingdomFoundingTeams: Team[] = [
  { id: "f4uk-britannia-racing", name: "Britannia Racing", country: "Reino Unido", base: "Silverstone, Inglaterra", drivers: [] },
  { id: "f4uk-crown-motorsport", name: "Crown Motorsport", country: "Reino Unido", base: "Birmingham, Inglaterra", drivers: [] },
  { id: "f4uk-northstar-racing", name: "Northstar Racing", country: "Reino Unido", base: "Manchester, Inglaterra", drivers: [] },
  { id: "f4uk-highland-motorsport", name: "Highland Motorsport", country: "Reino Unido", base: "Glasgow, Escócia", drivers: [] },
  { id: "f4uk-emerald-racing", name: "Emerald Racing", country: "Reino Unido", base: "Belfast, Irlanda do Norte", drivers: [] },
  { id: "f4uk-apex-british-competition", name: "Apex British Competition", country: "Reino Unido", base: "Oxford, Inglaterra", drivers: [] },
];

const formula4ItalyFoundingTeams: Team[] = [
  { id: "f4it-scuderia-torino", name: "Scuderia Torino", country: "Itália", base: "Turim, Piemonte", drivers: [] },
  { id: "f4it-modena-corse", name: "Modena Corse", country: "Itália", base: "Modena, Emilia-Romagna", drivers: [] },
  { id: "f4it-lombardia-motorsport", name: "Lombardia Motorsport", country: "Itália", base: "Milão, Lombardia", drivers: [] },
  { id: "f4it-toscana-racing", name: "Toscana Racing", country: "Itália", base: "Florença, Toscana", drivers: [] },
  { id: "f4it-adriatica-competition", name: "Adriatica Competition", country: "Itália", base: "Rimini, Emilia-Romagna", drivers: [] },
  { id: "f4it-sicilia-motorsport", name: "Sicilia Motorsport", country: "Itália", base: "Palermo, Sicília", drivers: [] },
];

const formula4SpainFoundingTeams: Team[] = [
  { id: "f4es-iberia-motorsport", name: "Iberia Motorsport", country: "Espanha", base: "Madri, Comunidade de Madri", drivers: [] },
  { id: "f4es-barcelona-racing-team", name: "Barcelona Racing Team", country: "Espanha", base: "Barcelona, Catalunha", drivers: [] },
  { id: "f4es-valencia-corse", name: "Valencia Corse", country: "Espanha", base: "Valência, Comunidade Valenciana", drivers: [] },
  { id: "f4es-andalucia-motorsport", name: "Andalucía Motorsport", country: "Espanha", base: "Sevilha, Andaluzia", drivers: [] },
  { id: "f4es-euskadi-racing", name: "Euskadi Racing", country: "Espanha", base: "Bilbao, País Basco", drivers: [] },
  { id: "f4es-galicia-competition", name: "Galicia Competition", country: "Espanha", base: "Vigo, Galícia", drivers: [] },
];

const formula4GermanyFoundingTeams: Team[] = [
  { id: "f4de-rhein-motorsport", name: "Rhein Motorsport", country: "Alemanha", base: "Colônia, Renânia do Norte-Vestfália", drivers: [] },
  { id: "f4de-bavaria-racing", name: "Bavaria Racing", country: "Alemanha", base: "Munique, Baviera", drivers: [] },
  { id: "f4de-berlin-motorsport", name: "Berlin Motorsport", country: "Alemanha", base: "Berlim", drivers: [] },
  { id: "f4de-sachsen-competition", name: "Sachsen Competition", country: "Alemanha", base: "Leipzig, Saxônia", drivers: [] },
  { id: "f4de-baden-wurttemberg-racing", name: "Baden-Württemberg Racing", country: "Alemanha", base: "Stuttgart, Baden-Württemberg", drivers: [] },
  { id: "f4de-hanseatic-motorsport", name: "Hanseatic Motorsport", country: "Alemanha", base: "Hamburgo", drivers: [] },
];

const formula4UnitedStatesFoundingTeams: Team[] = [
  { id: "f4us-pacific-coast-racing", name: "Pacific Coast Racing", country: "Estados Unidos", base: "Los Angeles, Califórnia", drivers: [] },
  { id: "f4us-lone-star-motorsport", name: "Lone Star Motorsport", country: "Estados Unidos", base: "Austin, Texas", drivers: [] },
  { id: "f4us-atlantic-performance", name: "Atlantic Performance", country: "Estados Unidos", base: "Miami, Flórida", drivers: [] },
  { id: "f4us-great-lakes-racing", name: "Great Lakes Racing", country: "Estados Unidos", base: "Detroit, Michigan", drivers: [] },
  { id: "f4us-northeast-competition", name: "Northeast Competition", country: "Estados Unidos", base: "Boston, Massachusetts", drivers: [] },
  { id: "f4us-mountain-west-motorsport", name: "Mountain West Motorsport", country: "Estados Unidos", base: "Denver, Colorado", drivers: [] },
];

const formula4MexicoFoundingTeams: Team[] = [
  { id: "f4mx-azteca-motorsport", name: "Azteca Motorsport", country: "México", base: "Cidade do México", drivers: [] },
  { id: "f4mx-jalisco-racing", name: "Jalisco Racing", country: "México", base: "Guadalajara, Jalisco", drivers: [] },
  { id: "f4mx-monterrey-competition", name: "Monterrey Competition", country: "México", base: "Monterrey, Nuevo León", drivers: [] },
  { id: "f4mx-puebla-motorsport", name: "Puebla Motorsport", country: "México", base: "Puebla, Puebla", drivers: [] },
  { id: "f4mx-yucatan-racing", name: "Yucatán Racing", country: "México", base: "Mérida, Yucatán", drivers: [] },
  { id: "f4mx-bajio-grand-prix", name: "Bajío Grand Prix", country: "México", base: "León, Guanajuato", drivers: [] },
];

const formula4JapanFoundingTeams: Team[] = [
  { id: "f4jp-sakura-racing", name: "Sakura Racing", country: "Japão", base: "Suzuka, Mie", drivers: [] },
  { id: "f4jp-tokyo-motorsport", name: "Tokyo Motorsport", country: "Japão", base: "Tóquio", drivers: [] },
  { id: "f4jp-osaka-performance", name: "Osaka Performance", country: "Japão", base: "Osaka", drivers: [] },
  { id: "f4jp-fuji-grand-prix", name: "Fuji Grand Prix", country: "Japão", base: "Gotemba, Shizuoka", drivers: [] },
  { id: "f4jp-hokkaido-racing", name: "Hokkaido Racing", country: "Japão", base: "Sapporo, Hokkaido", drivers: [] },
  { id: "f4jp-kyushu-motorsport", name: "Kyushu Motorsport", country: "Japão", base: "Fukuoka, Kyushu", drivers: [] },
];

const formula4MongoliaFoundingTeams: Team[] = [
  { id: "f4mn-ulaanbaatar-motorsport", name: "Ulaanbaatar Motorsport", country: "Mongólia", base: "Ulaanbaatar", drivers: [] },
  { id: "f4mn-steppe-racing", name: "Steppe Racing", country: "Mongólia", base: "Darkhan", drivers: [] },
  { id: "f4mn-gobi-grand-prix", name: "Gobi Grand Prix", country: "Mongólia", base: "Dalanzadgad", drivers: [] },
  { id: "f4mn-khentii-competition", name: "Khentii Competition", country: "Mongólia", base: "Öndörkhaan", drivers: [] },
  { id: "f4mn-orkhon-motorsport", name: "Orkhon Motorsport", country: "Mongólia", base: "Erdenet", drivers: [] },
  { id: "f4mn-altai-racing", name: "Altai Racing", country: "Mongólia", base: "Khovd", drivers: [] },
];

const formula4ChinaFoundingTeams: Team[] = [
  { id: "f4cn-dragon-motorsport", name: "Dragon Motorsport", country: "China", base: "Xangai", drivers: [] },
  { id: "f4cn-beijing-racing", name: "Beijing Racing", country: "China", base: "Pequim", drivers: [] },
  { id: "f4cn-pearl-river-competition", name: "Pearl River Competition", country: "China", base: "Guangzhou, Guangdong", drivers: [] },
  { id: "f4cn-chengdu-motorsport", name: "Chengdu Motorsport", country: "China", base: "Chengdu, Sichuan", drivers: [] },
  { id: "f4cn-zhejiang-grand-prix", name: "Zhejiang Grand Prix", country: "China", base: "Hangzhou, Zhejiang", drivers: [] },
  { id: "f4cn-wuhan-racing", name: "Wuhan Racing", country: "China", base: "Wuhan, Hubei", drivers: [] },
];

// Equipes fundadoras são inseridas sem apagar cadastros feitos pelo usuário.
export function initialTeamsForChampionship(championshipId: string): Team[] {
  if (championshipId === "world-formula-2026") return worldFormulaFoundingTeams;
  if (championshipId === "formula-2-2026") return formula2FoundingTeams;
  if (championshipId === "formula-3-2026") return formula3FoundingTeams;
  if (championshipId === "european-formula-regional-2026") return europeanFormulaRegionalFoundingTeams;
  if (championshipId === "americas-formula-regional-2026") return americasFormulaRegionalFoundingTeams;
  if (championshipId === "asia-pacific-formula-regional-2026") return asiaPacificFormulaRegionalFoundingTeams;
  if (championshipId === "formula-4-france-2026") return formula4FranceFoundingTeams;
  if (championshipId === "formula-4-italy-2026") return formula4ItalyFoundingTeams;
  if (championshipId === "formula-4-spain-2026") return formula4SpainFoundingTeams;
  if (championshipId === "formula-4-germany-2026") return formula4GermanyFoundingTeams;
  if (championshipId === "formula-4-united-states-2026") return formula4UnitedStatesFoundingTeams;
  if (championshipId === "formula-4-mexico-2026") return formula4MexicoFoundingTeams;
  if (championshipId === "formula-4-japan-2026") return formula4JapanFoundingTeams;
  if (championshipId === "formula-4-mongolia-2026") return formula4MongoliaFoundingTeams;
  if (championshipId === "formula-4-china-2026") return formula4ChinaFoundingTeams;
  if (championshipId === "formula-4-united-kingdom-2026") return formula4UnitedKingdomFoundingTeams;
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
