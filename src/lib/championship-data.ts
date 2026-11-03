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
  { id: "f4fr-ecurie-lumiere", name: "Écurie Lumière", country: "França", base: "Paris, França", drivers: [
    { id: "fr-001", name: "Hugo Delacroix", number: 1, nationality: "França", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 55, defending: 54, consistency: 56 } },
    { id: "fr-002", name: "Matteo Ricci", number: 7, nationality: "Itália", age: 16, attributes: { racePace: 56, qualifying: 59, overtaking: 53, defending: 52, consistency: 54 } },
    { id: "fr-003", name: "Liam O'Connor", number: 18, nationality: "Irlanda", age: 17, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 53, consistency: 52 } },
    { id: "fr-004", name: "Adam Kowalski", number: 24, nationality: "Polônia", age: 16, attributes: { racePace: 53, qualifying: 52, overtaking: 54, defending: 56, consistency: 55 } }
  ] },
  { id: "f4fr-provence-motorsport", name: "Provence Motorsport", country: "França", base: "Marselha, França", drivers: [
    { id: "fr-005", name: "Noah Martin", number: 12, nationality: "França", age: 16, attributes: { racePace: 57, qualifying: 55, overtaking: 56, defending: 54, consistency: 57 } },
    { id: "fr-006", name: "Tiago Almeida", number: 21, nationality: "Portugal", age: 17, attributes: { racePace: 55, qualifying: 54, overtaking: 58, defending: 55, consistency: 53 } },
    { id: "fr-007", name: "Emil Johansson", number: 31, nationality: "Suécia", age: 16, attributes: { racePace: 52, qualifying: 56, overtaking: 53, defending: 55, consistency: 57 } },
    { id: "fr-008", name: "Lucas Weber", number: 44, nationality: "Alemanha", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 57, consistency: 55 } }
  ] },
  { id: "f4fr-alpine-racing-france", name: "Alpine Racing France", country: "França", base: "Grenoble, França", drivers: [
    { id: "fr-009", name: "Gabriel Moreau", number: 5, nationality: "França", age: 17, attributes: { racePace: 60, qualifying: 61, overtaking: 57, defending: 55, consistency: 58 } },
    { id: "fr-010", name: "Enzo Bianchi", number: 16, nationality: "Itália", age: 16, attributes: { racePace: 55, qualifying: 58, overtaking: 54, defending: 52, consistency: 53 } },
    { id: "fr-011", name: "Oliver Smith", number: 27, nationality: "Reino Unido", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 56, consistency: 54 } },
    { id: "fr-012", name: "Mateusz Nowak", number: 38, nationality: "Polônia", age: 18, attributes: { racePace: 58, qualifying: 54, overtaking: 57, defending: 59, consistency: 56 } }
  ] },
  { id: "f4fr-atlantic-competition", name: "Atlantic Competition", country: "França", base: "Nantes, França", drivers: [
    { id: "fr-013", name: "Arthur Bernard", number: 9, nationality: "França", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 57, consistency: 56 } },
    { id: "fr-014", name: "Rafael Costa", number: 22, nationality: "Brasil", age: 17, attributes: { racePace: 57, qualifying: 54, overtaking: 59, defending: 53, consistency: 52 } },
    { id: "fr-015", name: "Santiago Ruiz", number: 33, nationality: "Espanha", age: 16, attributes: { racePace: 55, qualifying: 58, overtaking: 56, defending: 54, consistency: 55 } },
    { id: "fr-016", name: "Finn van Dijk", number: 46, nationality: "Países Baixos", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 55, defending: 58, consistency: 57 } }
  ] },
  { id: "f4fr-lyon-grand-prix", name: "Lyon Grand Prix", country: "França", base: "Lyon, França", drivers: [
    { id: "fr-017", name: "Louis Garnier", number: 3, nationality: "França", age: 18, attributes: { racePace: 61, qualifying: 59, overtaking: 58, defending: 57, consistency: 60 } },
    { id: "fr-018", name: "Kai Nakamura", number: 14, nationality: "Japão", age: 16, attributes: { racePace: 56, qualifying: 60, overtaking: 55, defending: 54, consistency: 56 } },
    { id: "fr-019", name: "Theo Campbell", number: 29, nationality: "Austrália", age: 17, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 56, consistency: 53 } },
    { id: "fr-020", name: "Andrei Popescu", number: 52, nationality: "Romênia", age: 16, attributes: { racePace: 53, qualifying: 54, overtaking: 56, defending: 55, consistency: 54 } }
  ] },
  { id: "f4fr-cote-azur-racing", name: "Côte d’Azur Racing", country: "França", base: "Nice, França", drivers: [
    { id: "fr-021", name: "Maxime Laurent", number: 11, nationality: "França", age: 17, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 58, consistency: 59 } },
    { id: "fr-022", name: "Diego Fernández", number: 19, nationality: "Argentina", age: 16, attributes: { racePace: 55, qualifying: 54, overtaking: 58, defending: 55, consistency: 54 } },
    { id: "fr-023", name: "Sebastian Müller", number: 41, nationality: "Suíça", age: 18, attributes: { racePace: 57, qualifying: 56, overtaking: 54, defending: 59, consistency: 58 } },
    { id: "fr-024", name: "Milan Petrović", number: 63, nationality: "Sérvia", age: 17, attributes: { racePace: 54, qualifying: 53, overtaking: 57, defending: 58, consistency: 55 } }
  ] },
];

const formula4UnitedKingdomFoundingTeams: Team[] = [
  { id: "f4uk-britannia-racing", name: "Britannia Racing", country: "Reino Unido", base: "Silverstone, Inglaterra", drivers: [
    { id: "uk-001", name: "Oliver Bennett", number: 2, nationality: "Reino Unido", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 55, defending: 54, consistency: 56 } },
    { id: "uk-002", name: "Jack Harrison", number: 8, nationality: "Reino Unido", age: 16, attributes: { racePace: 56, qualifying: 59, overtaking: 53, defending: 52, consistency: 54 } },
    { id: "uk-003", name: "Luca Ferrari", number: 17, nationality: "Itália", age: 17, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 53, consistency: 52 } },
    { id: "uk-004", name: "Daniel Svensson", number: 26, nationality: "Suécia", age: 16, attributes: { racePace: 53, qualifying: 52, overtaking: 54, defending: 56, consistency: 55 } }
  ] },
  { id: "f4uk-crown-motorsport", name: "Crown Motorsport", country: "Reino Unido", base: "Birmingham, Inglaterra", drivers: [
    { id: "uk-005", name: "Harry Collins", number: 4, nationality: "Reino Unido", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 57, consistency: 55 } },
    { id: "uk-006", name: "Ethan Brooks", number: 13, nationality: "Reino Unido", age: 16, attributes: { racePace: 55, qualifying: 54, overtaking: 58, defending: 55, consistency: 53 } },
    { id: "uk-007", name: "Nicolás Herrera", number: 23, nationality: "Espanha", age: 17, attributes: { racePace: 52, qualifying: 56, overtaking: 53, defending: 55, consistency: 57 } },
    { id: "uk-008", name: "Tomáš Novák", number: 32, nationality: "República Tcheca", age: 16, attributes: { racePace: 58, qualifying: 58, overtaking: 56, defending: 57, consistency: 55 } }
  ] },
  { id: "f4uk-northstar-racing", name: "Northstar Racing", country: "Reino Unido", base: "Manchester, Inglaterra", drivers: [
    { id: "uk-009", name: "William Foster", number: 6, nationality: "Reino Unido", age: 17, attributes: { racePace: 60, qualifying: 61, overtaking: 57, defending: 55, consistency: 58 } },
    { id: "uk-010", name: "Archie Mitchell", number: 15, nationality: "Reino Unido", age: 15, attributes: { racePace: 55, qualifying: 58, overtaking: 54, defending: 52, consistency: 53 } },
    { id: "uk-011", name: "Rafael Mendes", number: 28, nationality: "Portugal", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 56, consistency: 54 } },
    { id: "uk-012", name: "Felix Schneider", number: 37, nationality: "Alemanha", age: 18, attributes: { racePace: 58, qualifying: 54, overtaking: 57, defending: 59, consistency: 56 } }
  ] },
  { id: "f4uk-highland-motorsport", name: "Highland Motorsport", country: "Reino Unido", base: "Glasgow, Escócia", drivers: [
    { id: "uk-013", name: "Finlay MacLeod", number: 10, nationality: "Reino Unido", age: 17, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 57, consistency: 56 } },
    { id: "uk-014", name: "Callum Fraser", number: 20, nationality: "Reino Unido", age: 16, attributes: { racePace: 57, qualifying: 54, overtaking: 59, defending: 53, consistency: 52 } },
    { id: "uk-015", name: "Antoine Lefèvre", number: 34, nationality: "França", age: 16, attributes: { racePace: 55, qualifying: 58, overtaking: 56, defending: 54, consistency: 55 } },
    { id: "uk-016", name: "Kenji Watanabe", number: 43, nationality: "Japão", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 55, defending: 58, consistency: 57 } }
  ] },
  { id: "f4uk-emerald-racing", name: "Emerald Racing", country: "Reino Unido", base: "Belfast, Irlanda do Norte", drivers: [
    { id: "uk-017", name: "Cian Murphy", number: 12, nationality: "Irlanda", age: 17, attributes: { racePace: 61, qualifying: 59, overtaking: 58, defending: 57, consistency: 60 } },
    { id: "uk-018", name: "Sean Gallagher", number: 22, nationality: "Irlanda", age: 16, attributes: { racePace: 56, qualifying: 60, overtaking: 55, defending: 54, consistency: 56 } },
    { id: "uk-019", name: "Matteo Conti", number: 39, nationality: "Itália", age: 18, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 56, consistency: 53 } },
    { id: "uk-020", name: "Alexander Petrov", number: 48, nationality: "Bulgária", age: 16, attributes: { racePace: 53, qualifying: 54, overtaking: 56, defending: 55, consistency: 54 } }
  ] },
  { id: "f4uk-apex-british-competition", name: "Apex British Competition", country: "Reino Unido", base: "Oxford, Inglaterra", drivers: [
    { id: "uk-021", name: "George Turner", number: 14, nationality: "Reino Unido", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 58, consistency: 59 } },
    { id: "uk-022", name: "Edward Clarke", number: 25, nationality: "Reino Unido", age: 17, attributes: { racePace: 55, qualifying: 54, overtaking: 58, defending: 55, consistency: 54 } },
    { id: "uk-023", name: "Lucas van den Berg", number: 42, nationality: "Países Baixos", age: 16, attributes: { racePace: 57, qualifying: 56, overtaking: 54, defending: 59, consistency: 58 } },
    { id: "uk-024", name: "Miguel Santos", number: 57, nationality: "Brasil", age: 17, attributes: { racePace: 54, qualifying: 53, overtaking: 57, defending: 58, consistency: 55 } }
  ] },
];

const formula4ItalyFoundingTeams: Team[] = [
  { id: "f4it-scuderia-torino", name: "Scuderia Torino", country: "Itália", base: "Turim, Piemonte", drivers: [
    { id: "it-001", name: "Alessandro Moretti", number: 3, nationality: "Itália", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "it-002", name: "Lorenzo Conti", number: 8, nationality: "Itália", age: 16, attributes: { racePace: 56, qualifying: 58, overtaking: 57, defending: 54, consistency: 55 } },
    { id: "it-003", name: "Emil Bergström", number: 19, nationality: "Suécia", age: 17, attributes: { racePace: 55, qualifying: 54, overtaking: 56, defending: 58, consistency: 57 } },
    { id: "it-004", name: "Noah Williams", number: 27, nationality: "Reino Unido", age: 16, attributes: { racePace: 57, qualifying: 56, overtaking: 55, defending: 53, consistency: 54 } }
  ] },
  { id: "f4it-modena-corse", name: "Modena Corse", country: "Itália", base: "Modena, Emilia-Romagna", drivers: [
    { id: "it-005", name: "Matteo Rinaldi", number: 5, nationality: "Itália", age: 18, attributes: { racePace: 61, qualifying: 60, overtaking: 58, defending: 57, consistency: 59 } },
    { id: "it-006", name: "Federico Romano", number: 14, nationality: "Itália", age: 16, attributes: { racePace: 55, qualifying: 57, overtaking: 56, defending: 55, consistency: 54 } },
    { id: "it-007", name: "Carlos Mendoza", number: 22, nationality: "Espanha", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 59, defending: 56, consistency: 55 } },
    { id: "it-008", name: "Jan Novotný", number: 31, nationality: "República Tcheca", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 53, defending: 57, consistency: 56 } }
  ] },
  { id: "f4it-lombardia-motorsport", name: "Lombardia Motorsport", country: "Itália", base: "Milão, Lombardia", drivers: [
    { id: "it-009", name: "Andrea Ferrari", number: 6, nationality: "Itália", age: 17, attributes: { racePace: 60, qualifying: 61, overtaking: 58, defending: 56, consistency: 59 } },
    { id: "it-010", name: "Riccardo Galli", number: 16, nationality: "Itália", age: 15, attributes: { racePace: 53, qualifying: 55, overtaking: 54, defending: 52, consistency: 54 } },
    { id: "it-011", name: "Gabriel Dubois", number: 25, nationality: "França", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 55, defending: 58, consistency: 57 } },
    { id: "it-012", name: "Daniel Müller", number: 38, nationality: "Alemanha", age: 18, attributes: { racePace: 58, qualifying: 56, overtaking: 57, defending: 59, consistency: 58 } }
  ] },
  { id: "f4it-toscana-racing", name: "Toscana Racing", country: "Itália", base: "Florença, Toscana", drivers: [
    { id: "it-013", name: "Tommaso Ricci", number: 9, nationality: "Itália", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 54 } },
    { id: "it-014", name: "Edoardo Bianchi", number: 18, nationality: "Itália", age: 17, attributes: { racePace: 59, qualifying: 57, overtaking: 58, defending: 56, consistency: 58 } },
    { id: "it-015", name: "Lucas Pereira", number: 29, nationality: "Brasil", age: 16, attributes: { racePace: 55, qualifying: 54, overtaking: 58, defending: 55, consistency: 56 } },
    { id: "it-016", name: "Oliver Clarke", number: 41, nationality: "Reino Unido", age: 18, attributes: { racePace: 58, qualifying: 59, overtaking: 57, defending: 56, consistency: 57 } }
  ] },
  { id: "f4it-adriatica-competition", name: "Adriatica Competition", country: "Itália", base: "Rimini, Emilia-Romagna", drivers: [
    { id: "it-017", name: "Pietro De Luca", number: 11, nationality: "Itália", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 59, defending: 56, consistency: 55 } },
    { id: "it-018", name: "Marco Esposito", number: 21, nationality: "Itália", age: 16, attributes: { racePace: 56, qualifying: 55, overtaking: 57, defending: 58, consistency: 54 } },
    { id: "it-019", name: "Yuki Tanaka", number: 34, nationality: "Japão", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 55, defending: 57, consistency: 59 } },
    { id: "it-020", name: "Finn Andersen", number: 47, nationality: "Dinamarca", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 54, consistency: 58 } }
  ] },
  { id: "f4it-sicilia-motorsport", name: "Sicilia Motorsport", country: "Itália", base: "Palermo, Sicília", drivers: [
    { id: "it-021", name: "Giovanni Greco", number: 12, nationality: "Itália", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 57, defending: 58, consistency: 60 } },
    { id: "it-022", name: "Samuel Costa", number: 24, nationality: "Itália", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 58, defending: 54, consistency: 55 } },
    { id: "it-023", name: "Miguel Torres", number: 36, nationality: "Portugal", age: 17, attributes: { racePace: 57, qualifying: 55, overtaking: 56, defending: 57, consistency: 58 } },
    { id: "it-024", name: "Arvid Lindström", number: 53, nationality: "Finlândia", age: 15, attributes: { racePace: 54, qualifying: 53, overtaking: 55, defending: 56, consistency: 54 } }
  ] }
];

const formula4SpainFoundingTeams: Team[] = [
  { id: "f4es-iberia-motorsport", name: "Iberia Motorsport", country: "Espanha", base: "Madri, Comunidade de Madri", drivers: [
    { id: "es-001", name: "Alejandro García", number: 4, nationality: "Espanha", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "es-002", name: "Bruno Ferreira", number: 12, nationality: "Portugal", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 55, consistency: 56 } },
    { id: "es-003", name: "Youssef El Amrani", number: 23, nationality: "Marrocos", age: 17, attributes: { racePace: 55, qualifying: 54, overtaking: 57, defending: 58, consistency: 55 } },
    { id: "es-004", name: "Arjun Mehta", number: 35, nationality: "Índia", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 54, consistency: 57 } }
  ] },
  { id: "f4es-barcelona-racing-team", name: "Barcelona Racing Team", country: "Espanha", base: "Barcelona, Catalunha", drivers: [
    { id: "es-005", name: "Marc Vidal", number: 6, nationality: "Espanha", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 58 } },
    { id: "es-006", name: "Nicolás Restrepo", number: 15, nationality: "Colômbia", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 59, defending: 57, consistency: 56 } },
    { id: "es-007", name: "Théo Marchand", number: 28, nationality: "França", age: 18, attributes: { racePace: 59, qualifying: 60, overtaking: 58, defending: 57, consistency: 58 } },
    { id: "es-008", name: "Daniel Okafor", number: 42, nationality: "África do Sul", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 55, defending: 59, consistency: 57 } }
  ] },
  { id: "f4es-valencia-corse", name: "Valencia Corse", country: "Espanha", base: "Valência, Comunidade Valenciana", drivers: [
    { id: "es-009", name: "Javier Navarro", number: 7, nationality: "Espanha", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "es-010", name: "Mateo Rojas", number: 17, nationality: "Chile", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 58, defending: 54, consistency: 55 } },
    { id: "es-011", name: "Kenji Sato", number: 31, nationality: "Japão", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 55, defending: 58, consistency: 56 } },
    { id: "es-012", name: "Lucas Moreira", number: 46, nationality: "Brasil", age: 16, attributes: { racePace: 57, qualifying: 55, overtaking: 56, defending: 57, consistency: 58 } }
  ] },
  { id: "f4es-andalucia-motorsport", name: "Andalucía Motorsport", country: "Espanha", base: "Sevilha, Andaluzia", drivers: [
    { id: "es-013", name: "Pablo Romero", number: 9, nationality: "Espanha", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 58, defending: 57, consistency: 59 } },
    { id: "es-014", name: "Diego Salazar", number: 19, nationality: "México", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 57, defending: 56, consistency: 55 } },
    { id: "es-015", name: "Omar Benali", number: 33, nationality: "Argélia", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 58, consistency: 57 } },
    { id: "es-016", name: "Nattapong Srisai", number: 51, nationality: "Tailândia", age: 17, attributes: { racePace: 55, qualifying: 57, overtaking: 58, defending: 55, consistency: 56 } }
  ] },
  { id: "f4es-euskadi-racing", name: "Euskadi Racing", country: "Espanha", base: "Bilbao, País Basco", drivers: [
    { id: "es-017", name: "Iker Etxeberria", number: 11, nationality: "Espanha", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 57, consistency: 55 } },
    { id: "es-018", name: "Tomás Silva", number: 21, nationality: "Uruguai", age: 17, attributes: { racePace: 56, qualifying: 54, overtaking: 57, defending: 58, consistency: 56 } },
    { id: "es-019", name: "Elias Haddad", number: 37, nationality: "Líbano", age: 18, attributes: { racePace: 55, qualifying: 56, overtaking: 54, defending: 57, consistency: 58 } },
    { id: "es-020", name: "Min-jun Park", number: 54, nationality: "Coreia do Sul", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 55, consistency: 57 } }
  ] },
  { id: "f4es-galicia-competition", name: "Galicia Competition", country: "Espanha", base: "Vigo, Galícia", drivers: [
    { id: "es-021", name: "Martín Castro", number: 13, nationality: "Espanha", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 59, defending: 56, consistency: 58 } },
    { id: "es-022", name: "Rafael Nascimento", number: 25, nationality: "Brasil", age: 18, attributes: { racePace: 57, qualifying: 56, overtaking: 58, defending: 55, consistency: 57 } },
    { id: "es-023", name: "Aiden Campbell", number: 39, nationality: "Austrália", age: 16, attributes: { racePace: 55, qualifying: 57, overtaking: 56, defending: 58, consistency: 54 } },
    { id: "es-024", name: "Tiago Sousa", number: 63, nationality: "Portugal", age: 15, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 56, consistency: 55 } }
  ] }
];

const formula4GermanyFoundingTeams: Team[] = [
  { id: "f4de-rhein-motorsport", name: "Rhein Motorsport", country: "Alemanha", base: "Colônia, Renânia do Norte-Vestfália", drivers: [
    { id: "de-001", name: "Lukas Schneider", number: 4, nationality: "Alemanha", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "de-002", name: "Elias van der Meer", number: 12, nationality: "Países Baixos", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 54, consistency: 56 } },
    { id: "de-003", name: "Amadou Diallo", number: 23, nationality: "Senegal", age: 17, attributes: { racePace: 55, qualifying: 56, overtaking: 54, defending: 58, consistency: 57 } },
    { id: "de-004", name: "João Carvalho", number: 35, nationality: "Portugal", age: 16, attributes: { racePace: 57, qualifying: 55, overtaking: 56, defending: 57, consistency: 55 } }
  ] },
  { id: "f4de-bavaria-racing", name: "Bavaria Racing", country: "Alemanha", base: "Munique, Baviera", drivers: [
    { id: "de-005", name: "Felix Hartmann", number: 6, nationality: "Alemanha", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 58, defending: 57, consistency: 59 } },
    { id: "de-006", name: "Maximilian Bauer", number: 15, nationality: "Áustria", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 55, defending: 56, consistency: 57 } },
    { id: "de-007", name: "Riku Aalto", number: 28, nationality: "Finlândia", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 55, consistency: 58 } },
    { id: "de-008", name: "Diego Ramírez", number: 42, nationality: "Costa Rica", age: 17, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 54, consistency: 57 } }
  ] },
  { id: "f4de-berlin-motorsport", name: "Berlin Motorsport", country: "Alemanha", base: "Berlim", drivers: [
    { id: "de-009", name: "Jonas Richter", number: 7, nationality: "Alemanha", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 58 } },
    { id: "de-010", name: "Adam Zieliński", number: 17, nationality: "Polônia", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 58, defending: 57, consistency: 56 } },
    { id: "de-011", name: "Zayd Al-Khatib", number: 31, nationality: "Jordânia", age: 18, attributes: { racePace: 55, qualifying: 54, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "de-012", name: "Ethan Brooks", number: 46, nationality: "Estados Unidos", age: 16, attributes: { racePace: 58, qualifying: 57, overtaking: 56, defending: 59, consistency: 55 } }
  ] },
  { id: "f4de-sachsen-competition", name: "Sachsen Competition", country: "Alemanha", base: "Leipzig, Saxônia", drivers: [
    { id: "de-013", name: "Moritz Keller", number: 9, nationality: "Alemanha", age: 17, attributes: { racePace: 59, qualifying: 60, overtaking: 58, defending: 57, consistency: 58 } },
    { id: "de-014", name: "Jakub Dvořák", number: 19, nationality: "República Tcheca", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 58, consistency: 54 } },
    { id: "de-015", name: "Thabo Mokoena", number: 33, nationality: "África do Sul", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 59, defending: 57, consistency: 56 } },
    { id: "de-016", name: "Wei Chen", number: 51, nationality: "China", age: 16, attributes: { racePace: 54, qualifying: 57, overtaking: 55, defending: 56, consistency: 55 } }
  ] },
  { id: "f4de-baden-wurttemberg-racing", name: "Baden-Württemberg Racing", country: "Alemanha", base: "Stuttgart, Baden-Württemberg", drivers: [
    { id: "de-017", name: "Paul Wagner", number: 11, nationality: "Alemanha", age: 18, attributes: { racePace: 60, qualifying: 58, overtaking: 59, defending: 57, consistency: 58 } },
    { id: "de-018", name: "Matteo Greco", number: 21, nationality: "Itália", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 55, defending: 58, consistency: 57 } },
    { id: "de-019", name: "Santiago Álvarez", number: 37, nationality: "Argentina", age: 16, attributes: { racePace: 55, qualifying: 57, overtaking: 56, defending: 54, consistency: 58 } },
    { id: "de-020", name: "Arif Rahman", number: 54, nationality: "Indonésia", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 58, defending: 57, consistency: 56 } }
  ] },
  { id: "f4de-hanseatic-motorsport", name: "Hanseatic Motorsport", country: "Alemanha", base: "Hamburgo", drivers: [
    { id: "de-021", name: "Niklas Fischer", number: 13, nationality: "Alemanha", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "de-022", name: "Emil Sørensen", number: 25, nationality: "Dinamarca", age: 17, attributes: { racePace: 55, qualifying: 56, overtaking: 54, defending: 58, consistency: 56 } },
    { id: "de-023", name: "Kacper Lewandowski", number: 39, nationality: "Polônia", age: 15, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 56, consistency: 55 } },
    { id: "de-024", name: "Min-ho Kim", number: 63, nationality: "Coreia do Sul", age: 18, attributes: { racePace: 58, qualifying: 57, overtaking: 59, defending: 56, consistency: 58 } }
  ] }
];

const formula4UnitedStatesFoundingTeams: Team[] = [
  { id: "f4us-pacific-coast-racing", name: "Pacific Coast Racing", country: "Estados Unidos", base: "Los Angeles, Califórnia", drivers: [
    { id: "us-001", name: "Mason Carter", number: 4, nationality: "Estados Unidos", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "us-002", name: "Diego Herrera", number: 12, nationality: "México", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 54, consistency: 56 } },
    { id: "us-003", name: "Liam O'Connor", number: 23, nationality: "Irlanda", age: 17, attributes: { racePace: 55, qualifying: 56, overtaking: 54, defending: 58, consistency: 57 } },
    { id: "us-004", name: "Ethan Nakamura", number: 35, nationality: "Japão", age: 16, attributes: { racePace: 57, qualifying: 55, overtaking: 56, defending: 57, consistency: 55 } }
  ] },
  { id: "f4us-lone-star-motorsport", name: "Lone Star Motorsport", country: "Estados Unidos", base: "Austin, Texas", drivers: [
    { id: "us-005", name: "Jackson Reed", number: 6, nationality: "Estados Unidos", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 58, defending: 57, consistency: 59 } },
    { id: "us-006", name: "Mateo González", number: 15, nationality: "México", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 55, defending: 56, consistency: 57 } },
    { id: "us-007", name: "Lucas Oliveira", number: 28, nationality: "Brasil", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 55, consistency: 58 } },
    { id: "us-008", name: "Caleb Morgan", number: 42, nationality: "Estados Unidos", age: 17, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 54, consistency: 57 } }
  ] },
  { id: "f4us-atlantic-performance", name: "Atlantic Performance", country: "Estados Unidos", base: "Miami, Flórida", drivers: [
    { id: "us-009", name: "Ethan Brooks", number: 7, nationality: "Estados Unidos", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 58 } },
    { id: "us-010", name: "Nicolás Pereira", number: 17, nationality: "Colômbia", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 58, defending: 57, consistency: 56 } },
    { id: "us-011", name: "Oliver Bennett", number: 31, nationality: "Reino Unido", age: 18, attributes: { racePace: 55, qualifying: 54, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "us-012", name: "Noah Williams", number: 46, nationality: "Estados Unidos", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 56, defending: 59, consistency: 55 } }
  ] },
  { id: "f4us-great-lakes-racing", name: "Great Lakes Racing", country: "Estados Unidos", base: "Detroit, Michigan", drivers: [
    { id: "us-013", name: "Caleb Turner", number: 9, nationality: "Estados Unidos", age: 17, attributes: { racePace: 59, qualifying: 60, overtaking: 58, defending: 57, consistency: 58 } },
    { id: "us-014", name: "Lucas Dubois", number: 19, nationality: "Canadá", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 58, consistency: 54 } },
    { id: "us-015", name: "Matías Fernández", number: 33, nationality: "Argentina", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 59, defending: 57, consistency: 56 } },
    { id: "us-016", name: "Ryan Mitchell", number: 51, nationality: "Estados Unidos", age: 16, attributes: { racePace: 54, qualifying: 57, overtaking: 55, defending: 56, consistency: 55 } }
  ] },
  { id: "f4us-northeast-competition", name: "Northeast Competition", country: "Estados Unidos", base: "Boston, Massachusetts", drivers: [
    { id: "us-017", name: "Noah Parker", number: 11, nationality: "Estados Unidos", age: 18, attributes: { racePace: 60, qualifying: 58, overtaking: 59, defending: 57, consistency: 58 } },
    { id: "us-018", name: "Tiago Costa", number: 21, nationality: "Portugal", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 55, defending: 58, consistency: 57 } },
    { id: "us-019", name: "Felix Weber", number: 37, nationality: "Alemanha", age: 17, attributes: { racePace: 55, qualifying: 57, overtaking: 56, defending: 54, consistency: 58 } },
    { id: "us-020", name: "Logan Scott", number: 54, nationality: "Estados Unidos", age: 16, attributes: { racePace: 56, qualifying: 55, overtaking: 58, defending: 57, consistency: 56 } }
  ] },
  { id: "f4us-mountain-west-motorsport", name: "Mountain West Motorsport", country: "Estados Unidos", base: "Denver, Colorado", drivers: [
    { id: "us-021", name: "Logan Mitchell", number: 13, nationality: "Estados Unidos", age: 16, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "us-022", name: "Daniel Rojas", number: 25, nationality: "México", age: 17, attributes: { racePace: 55, qualifying: 56, overtaking: 54, defending: 58, consistency: 56 } },
    { id: "us-023", name: "Kai Nakamura", number: 39, nationality: "Austrália", age: 18, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 56, consistency: 55 } },
    { id: "us-024", name: "Adrian Cooper", number: 63, nationality: "Estados Unidos", age: 15, attributes: { racePace: 58, qualifying: 57, overtaking: 59, defending: 56, consistency: 58 } }
  ] }
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

const formula4IndonesiaFoundingTeams: Team[] = [
  { id: "f4id-garuda-motorsport", name: "Garuda Motorsport", country: "Indonésia", base: "Jacarta, Java", drivers: [] },
  { id: "f4id-nusantara-racing", name: "Nusantara Racing", country: "Indonésia", base: "Bandung, Java", drivers: [] },
  { id: "f4id-bali-performance", name: "Bali Performance", country: "Indonésia", base: "Denpasar, Bali", drivers: [] },
  { id: "f4id-surabaya-competition", name: "Surabaya Competition", country: "Indonésia", base: "Surabaya, Java", drivers: [] },
  { id: "f4id-sumatra-grand-prix", name: "Sumatra Grand Prix", country: "Indonésia", base: "Medan, Sumatra", drivers: [] },
  { id: "f4id-sulawesi-motorsport", name: "Sulawesi Motorsport", country: "Indonésia", base: "Makassar, Sulawesi", drivers: [] },
];

const formula4AustraliaFoundingTeams: Team[] = [
  { id: "f4au-southern-cross-racing", name: "Southern Cross Racing", country: "Austrália", base: "Melbourne, Victoria", drivers: [] },
  { id: "f4au-sydney-motorsport", name: "Sydney Motorsport", country: "Austrália", base: "Sydney, Nova Gales do Sul", drivers: [] },
  { id: "f4au-queensland-performance", name: "Queensland Performance", country: "Austrália", base: "Brisbane, Queensland", drivers: [] },
  { id: "f4au-western-australia-racing", name: "Western Australia Racing", country: "Austrália", base: "Perth, Austrália Ocidental", drivers: [] },
  { id: "f4au-adelaide-competition", name: "Adelaide Competition", country: "Austrália", base: "Adelaide, Austrália Meridional", drivers: [] },
  { id: "f4au-tasmania-motorsport", name: "Tasmania Motorsport", country: "Austrália", base: "Hobart, Tasmânia", drivers: [] },
];

// Equipes fundadoras são inseridas sem apagar cadastros feitos pelo usuário.
const formula4NewZealandFoundingTeams: Team[] = [
  { id: "f4nz-kiwi-motorsport", name: "Kiwi Motorsport", country: "Nova Zelândia", base: "Auckland, Ilha Norte", drivers: [] },
  { id: "f4nz-southern-pacific-racing", name: "Southern Pacific Racing", country: "Nova Zelândia", base: "Christchurch, Ilha Sul", drivers: [] },
  { id: "f4nz-wellington-motorsport", name: "Wellington Motorsport", country: "Nova Zelândia", base: "Wellington, Ilha Norte", drivers: [] },
  { id: "f4nz-waikato-performance", name: "Waikato Performance", country: "Nova Zelândia", base: "Hamilton, Ilha Norte", drivers: [] },
  { id: "f4nz-otago-grand-prix", name: "Otago Grand Prix", country: "Nova Zelândia", base: "Dunedin, Ilha Sul", drivers: [] },
  { id: "f4nz-bay-of-plenty-racing", name: "Bay of Plenty Racing", country: "Nova Zelândia", base: "Tauranga, Ilha Norte", drivers: [] },
];

const formula4BrazilFoundingTeams: Team[] = [
  { id: "f4br-paulista-motorsport", name: "Paulista Motorsport", country: "Brasil", base: "São Paulo, SP", drivers: [] },
  { id: "f4br-minas-racing", name: "Minas Racing", country: "Brasil", base: "Belo Horizonte, MG", drivers: [] },
  { id: "f4br-sul-brasil-competition", name: "Sul Brasil Competition", country: "Brasil", base: "Curitiba, PR", drivers: [] },
  { id: "f4br-cerrado-motorsport", name: "Cerrado Motorsport", country: "Brasil", base: "Goiânia, GO", drivers: [] },
  { id: "f4br-nordeste-racing", name: "Nordeste Racing", country: "Brasil", base: "Recife, PE", drivers: [] },
  { id: "f4br-rio-grand-prix", name: "Rio Grand Prix", country: "Brasil", base: "Rio de Janeiro, RJ", drivers: [] },
];

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
  if (championshipId === "formula-4-indonesia-2026") return formula4IndonesiaFoundingTeams;
  if (championshipId === "formula-4-australia-2026") return formula4AustraliaFoundingTeams;
  if (championshipId === "formula-4-new-zealand-2026") return formula4NewZealandFoundingTeams;
  if (championshipId === "formula-4-brazil-2026") return formula4BrazilFoundingTeams;
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
  const seeded = savedTeams.map(saved => {
    const source = initial.find(team => team.id === saved.id);
    if (!source || saved.drivers.length > 0 || source.drivers.length === 0) return saved;
    return { ...saved, drivers: source.drivers };
  });
  return [...seeded, ...missing];
}
