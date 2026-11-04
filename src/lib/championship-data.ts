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
  { id: "efr-alpine-star-racing", name: "Alpine Star Racing", country: "França", base: "Magny-Cours, França", drivers: [
    { id: "efr-001", name: "Matteo Rinaldi", number: 1, nationality: "Itália", age: 17, attributes: { racePace: 48, qualifying: 47, overtaking: 44, defending: 43, consistency: 46 } },
    { id: "efr-002", name: "Lukas Hartmann", number: 2, nationality: "Alemanha", age: 16, attributes: { racePace: 43, qualifying: 45, overtaking: 41, defending: 42, consistency: 44 } },
    { id: "efr-003", name: "Hugo Delacroix", number: 3, nationality: "França", age: 18, attributes: { racePace: 45, qualifying: 43, overtaking: 46, defending: 42, consistency: 41 } }
  ] },
  { id: "efr-britannia-motorsport", name: "Britannia Motorsport", country: "Reino Unido", base: "Silverstone, Inglaterra", drivers: [
    { id: "efr-004", name: "Oliver Whitmore", number: 4, nationality: "Reino Unido", age: 17, attributes: { racePace: 47, qualifying: 48, overtaking: 43, defending: 42, consistency: 45 } },
    { id: "efr-005", name: "Callum Fraser", number: 5, nationality: "Reino Unido", age: 16, attributes: { racePace: 42, qualifying: 44, overtaking: 45, defending: 43, consistency: 41 } },
    { id: "efr-006", name: "Arthur Moreau", number: 6, nationality: "França", age: 18, attributes: { racePace: 44, qualifying: 42, overtaking: 43, defending: 46, consistency: 45 } }
  ] },
  { id: "efr-scuderia-bellini", name: "Scuderia Bellini", country: "Itália", base: "Parma, Itália", drivers: [
    { id: "efr-007", name: "Lorenzo Conti", number: 7, nationality: "Itália", age: 16, attributes: { racePace: 48, qualifying: 49, overtaking: 44, defending: 43, consistency: 45 } },
    { id: "efr-008", name: "Nicolás Álvarez", number: 8, nationality: "Espanha", age: 17, attributes: { racePace: 44, qualifying: 45, overtaking: 47, defending: 42, consistency: 40 } },
    { id: "efr-009", name: "Emil Novak", number: 9, nationality: "Tchéquia", age: 15, attributes: { racePace: 40, qualifying: 42, overtaking: 41, defending: 39, consistency: 43 } }
  ] },
  { id: "efr-rhein-motorsport", name: "Rhein Motorsport", country: "Alemanha", base: "Colônia, Alemanha", drivers: [
    { id: "efr-010", name: "Felix Schneider", number: 10, nationality: "Alemanha", age: 18, attributes: { racePace: 45, qualifying: 43, overtaking: 42, defending: 47, consistency: 46 } },
    { id: "efr-011", name: "Théo Lambert", number: 11, nationality: "Bélgica", age: 16, attributes: { racePace: 43, qualifying: 46, overtaking: 44, defending: 41, consistency: 42 } },
    { id: "efr-012", name: "Mikkel Sørensen", number: 12, nationality: "Dinamarca", age: 17, attributes: { racePace: 44, qualifying: 41, overtaking: 43, defending: 42, consistency: 45 } }
  ] },
  { id: "efr-iberia-racing-team", name: "Iberia Racing Team", country: "Espanha", base: "Madri, Espanha", drivers: [
    { id: "efr-013", name: "Alejandro Martín", number: 13, nationality: "Espanha", age: 17, attributes: { racePace: 46, qualifying: 44, overtaking: 45, defending: 43, consistency: 44 } },
    { id: "efr-014", name: "Duarte Carvalho", number: 14, nationality: "Portugal", age: 16, attributes: { racePace: 42, qualifying: 43, overtaking: 44, defending: 45, consistency: 42 } },
    { id: "efr-015", name: "Tiago Ferreira", number: 15, nationality: "Portugal", age: 18, attributes: { racePace: 45, qualifying: 42, overtaking: 47, defending: 41, consistency: 40 } }
  ] },
  { id: "efr-lowlands-motorsport", name: "Lowlands Motorsport", country: "Países Baixos", base: "Zandvoort, Países Baixos", drivers: [
    { id: "efr-016", name: "Daan Verhoeven", number: 16, nationality: "Países Baixos", age: 16, attributes: { racePace: 44, qualifying: 47, overtaking: 42, defending: 41, consistency: 43 } },
    { id: "efr-017", name: "Victor Janssen", number: 17, nationality: "Bélgica", age: 18, attributes: { racePace: 43, qualifying: 42, overtaking: 44, defending: 46, consistency: 45 } },
    { id: "efr-018", name: "Elias de Vries", number: 18, nationality: "Países Baixos", age: 17, attributes: { racePace: 41, qualifying: 43, overtaking: 42, defending: 40, consistency: 44 } }
  ] },
  { id: "efr-nordic-racing", name: "Nordic Racing", country: "Suécia", base: "Malmö, Suécia", drivers: [
    { id: "efr-019", name: "Erik Lindström", number: 19, nationality: "Suécia", age: 17, attributes: { racePace: 45, qualifying: 44, overtaking: 43, defending: 42, consistency: 47 } },    { id: "efr-020", name: "Aksel Johansen", number: 20, nationality: "Noruega", age: 16, attributes: { racePace: 43, qualifying: 45, overtaking: 44, defending: 41, consistency: 42 } },    { id: "efr-021", name: "Oskar Laine", number: 21, nationality: "Finlândia", age: 19, attributes: { racePace: 47, qualifying: 46, overtaking: 45, defending: 44, consistency: 43 } }
  ] },
  { id: "efr-helvetic-motorsport", name: "Helvetic Motorsport", country: "Suíça", base: "Hinwil, Suíça", drivers: [
    { id: "efr-022", name: "Noah Keller", number: 22, nationality: "Suíça", age: 16, attributes: { racePace: 46, qualifying: 45, overtaking: 43, defending: 44, consistency: 47 } },
    { id: "efr-023", name: "Adrien Favre", number: 23, nationality: "França", age: 17, attributes: { racePace: 44, qualifying: 47, overtaking: 42, defending: 41, consistency: 43 } },
    { id: "efr-024", name: "Milan Petrovic", number: 24, nationality: "Sérvia", age: 18, attributes: { racePace: 42, qualifying: 40, overtaking: 45, defending: 46, consistency: 41 } }
  ] },
  { id: "efr-balkan-performance", name: "Balkan Performance", country: "Croácia", base: "Zagreb, Croácia", drivers: [
    { id: "efr-025", name: "Luka Marković", number: 25, nationality: "Croácia", age: 17, attributes: { racePace: 45, qualifying: 43, overtaking: 47, defending: 44, consistency: 42 } },
    { id: "efr-026", name: "Stefan Dimitrov", number: 26, nationality: "Bulgária", age: 16, attributes: { racePace: 41, qualifying: 42, overtaking: 43, defending: 40, consistency: 44 } },
    { id: "efr-027", name: "Andrei Popescu", number: 27, nationality: "Romênia", age: 18, attributes: { racePace: 43, qualifying: 41, overtaking: 42, defending: 45, consistency: 43 } }
  ] },
  { id: "efr-atlantic-motorsport", name: "Atlantic Motorsport", country: "Portugal", base: "Lisboa, Portugal", drivers: [
    { id: "efr-028", name: "Gabriel Costa", number: 28, nationality: "Portugal", age: 17, attributes: { racePace: 46, qualifying: 44, overtaking: 48, defending: 43, consistency: 42 } },
    { id: "efr-029", name: "Eoin Gallagher", number: 29, nationality: "Irlanda", age: 16, attributes: { racePace: 42, qualifying: 43, overtaking: 44, defending: 41, consistency: 46 } },
    { id: "efr-030", name: "Rafael Costa", number: 30, nationality: "Brasil", age: 18, attributes: { racePace: 44, qualifying: 46, overtaking: 43, defending: 42, consistency: 44 } }
  ] },
];


const americasFormulaRegionalFoundingTeams: Team[] = [
  { id: "afr-pacific-racing", name: "Pacific Racing", country: Estados Unidos, base: Los Angeles, Estados Unidos, drivers: [
    { id: "afr-001", name: "Ethan Walker", number: 1, nationality: "Estados Unidos", age: 17, attributes: { racePace: 48, qualifying: 47, overtaking: 44, defending: 43, consistency: 46 } },
    { id: "afr-002", name: "Lucas Bennett", number: 2, nationality: "Canadá", age: 16, attributes: { racePace: 43, qualifying: 45, overtaking: 41, defending: 42, consistency: 44 } },
    { id: "afr-003", name: "Diego Ramírez", number: 3, nationality: "México", age: 18, attributes: { racePace: 45, qualifying: 43, overtaking: 46, defending: 42, consistency: 41 } }
  ] },
  { id: "afr-northstar-motorsport", name: "Northstar Motorsport", country: Canadá, base: Toronto, Canadá, drivers: [
    { id: "afr-004", name: "Liam Thompson", number: 4, nationality: "Canadá", age: 17, attributes: { racePace: 47, qualifying: 48, overtaking: 43, defending: 42, consistency: 45 } },
    { id: "afr-005", name: "Noah Campbell", number: 5, nationality: "Canadá", age: 16, attributes: { racePace: 42, qualifying: 44, overtaking: 45, defending: 43, consistency: 41 } },
    { id: "afr-006", name: "Santiago Herrera", number: 6, nationality: "Colômbia", age: 18, attributes: { racePace: 44, qualifying: 42, overtaking: 43, defending: 46, consistency: 45 } }
  ] },
  { id: "afr-azteca-racing", name: "Azteca Racing", country: México, base: Cidade do México, México, drivers: [
    { id: "afr-007", name: "Emiliano Vargas", number: 7, nationality: "México", age: 17, attributes: { racePace: 46, qualifying: 44, overtaking: 45, defending: 43, consistency: 44 } },
    { id: "afr-008", name: "Santiago Ortega", number: 8, nationality: "México", age: 16, attributes: { racePace: 42, qualifying: 43, overtaking: 44, defending: 45, consistency: 42 } },
    { id: "afr-009", name: "Gabriel Castillo", number: 9, nationality: "Guatemala", age: 18, attributes: { racePace: 40, qualifying: 42, overtaking: 41, defending: 39, consistency: 43 } }
  ] },
  { id: "afr-caribbean-motorsport", name: "Caribbean Motorsport", country: República Dominicana, base: Santo Domingo, República Dominicana, drivers: [
    { id: "afr-010", name: "Alejandro Batista", number: 10, nationality: "República Dominicana", age: 17, attributes: { racePace: 45, qualifying: 43, overtaking: 47, defending: 44, consistency: 42 } },
    { id: "afr-011", name: "Javier Morales", number: 11, nationality: "Porto Rico", age: 16, attributes: { racePace: 42, qualifying: 46, overtaking: 43, defending: 41, consistency: 44 } },
    { id: "afr-012", name: "Daniel Campbell", number: 12, nationality: "Jamaica", age: 18, attributes: { racePace: 43, qualifying: 41, overtaking: 45, defending: 46, consistency: 42 } }
  ] },
  { id: "afr-istmo-racing", name: "Istmo Racing", country: Panamá, base: Cidade do Panamá, Panamá, drivers: [
    { id: "afr-013", name: "Sebastián González", number: 13, nationality: "Panamá", age: 17, attributes: { racePace: 46, qualifying: 44, overtaking: 45, defending: 43, consistency: 44 } },
    { id: "afr-014", name: "Andrés Solís", number: 14, nationality: "Costa Rica", age: 16, attributes: { racePace: 42, qualifying: 43, overtaking: 44, defending: 41, consistency: 45 } },
    { id: "afr-015", name: "Mateo Fuentes", number: 15, nationality: "Guatemala", age: 18, attributes: { racePace: 44, qualifying: 42, overtaking: 43, defending: 46, consistency: 41 } }
  ] },
  { id: "afr-andean-motorsport", name: "Andean Motorsport", country: Colômbia, base: Bogotá, Colômbia, drivers: [
    { id: "afr-016", name: "Nicolás Restrepo", number: 16, nationality: "Colômbia", age: 17, attributes: { racePace: 47, qualifying: 45, overtaking: 46, defending: 43, consistency: 44 } },
    { id: "afr-017", name: "Joaquín Salazar", number: 17, nationality: "Peru", age: 16, attributes: { racePace: 43, qualifying: 44, overtaking: 45, defending: 42, consistency: 43 } },
    { id: "afr-018", name: "Martín Cárdenas", number: 18, nationality: "Equador", age: 18, attributes: { racePace: 44, qualifying: 42, overtaking: 41, defending: 46, consistency: 45 } }
  ] },
  { id: "afr-condor-grand-prix", name: "Condor Grand Prix", country: Argentina, base: Buenos Aires, Argentina, drivers: [
    { id: "afr-019", name: "Franco Bianchi", number: 19, nationality: "Argentina", age: 17, attributes: { racePace: 48, qualifying: 46, overtaking: 47, defending: 44, consistency: 43 } },
    { id: "afr-020", name: "Tomás Benítez", number: 20, nationality: "Paraguai", age: 16, attributes: { racePace: 42, qualifying: 43, overtaking: 46, defending: 41, consistency: 44 } },
    { id: "afr-021", name: "Santiago Méndez", number: 21, nationality: "Uruguai", age: 19, attributes: { racePace: 45, qualifying: 44, overtaking: 43, defending: 46, consistency: 47 } }
  ] },
  { id: "afr-vertice-motorsport", name: "Vértice Motorsport", country: Brasil, base: São Paulo, Brasil, drivers: [
    { id: "afr-022", name: "Pedro Almeida", number: 22, nationality: "Brasil", age: 17, attributes: { racePace: 47, qualifying: 48, overtaking: 45, defending: 43, consistency: 44 } },
    { id: "afr-023", name: "Enzo Oliveira", number: 23, nationality: "Brasil", age: 16, attributes: { racePace: 44, qualifying: 46, overtaking: 43, defending: 42, consistency: 45 } },
    { id: "afr-024", name: "Lucas Ferreira", number: 24, nationality: "Brasil", age: 18, attributes: { racePace: 46, qualifying: 43, overtaking: 48, defending: 44, consistency: 41 } }
  ] },
  { id: "afr-pacific-andes-racing", name: "Pacific Andes Racing", country: Chile, base: Santiago, Chile, drivers: [
    { id: "afr-025", name: "Vicente Fuentes", number: 25, nationality: "Chile", age: 17, attributes: { racePace: 46, qualifying: 45, overtaking: 44, defending: 43, consistency: 46 } },
    { id: "afr-026", name: "Benjamín Rojas", number: 26, nationality: "Chile", age: 16, attributes: { racePace: 43, qualifying: 47, overtaking: 42, defending: 41, consistency: 44 } },
    { id: "afr-027", name: "Diego Quispe", number: 27, nationality: "Bolívia", age: 18, attributes: { racePace: 41, qualifying: 42, overtaking: 45, defending: 44, consistency: 43 } }
  ] },
  { id: "afr-pampa-motorsport", name: "Pampa Motorsport", country: Uruguai, base: Montevidéu, Uruguai, drivers: [
    { id: "afr-028", name: "Mateo Rodríguez", number: 28, nationality: "Uruguai", age: 17, attributes: { racePace: 45, qualifying: 44, overtaking: 46, defending: 43, consistency: 45 } },
    { id: "afr-029", name: "Bruno Sosa", number: 29, nationality: "Argentina", age: 16, attributes: { racePace: 42, qualifying: 43, overtaking: 44, defending: 41, consistency: 42 } },
    { id: "afr-030", name: "Thiago Nascimento", number: 30, nationality: "Brasil", age: 18, attributes: { racePace: 44, qualifying: 46, overtaking: 43, defending: 42, consistency: 44 } }
  ] }
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
    { id: "fr-008", name: "Lucas Weber", number: 44, nationality: "Alemanha", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 57, consistency: 55 } }  ] },
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
    { id: "fr-021", name: "Maxime Laurent", number: 11, nationality: "França", age: 17, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 58, consistency: 59 } },    { id: "fr-022", name: "Diego Fernández", number: 19, nationality: "Argentina", age: 16, attributes: { racePace: 55, qualifying: 54, overtaking: 58, defending: 55, consistency: 54 } },
    { id: "fr-023", name: "Sebastian Müller", number: 41, nationality: "Suíça", age: 18, attributes: { racePace: 57, qualifying: 56, overtaking: 54, defending: 59, consistency: 58 } },    { id: "fr-024", name: "Milan Petrović", number: 63, nationality: "Sérvia", age: 17, attributes: { racePace: 54, qualifying: 53, overtaking: 57, defending: 58, consistency: 55 } }
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
    { id: "it-022", name: "Samuel Costa", number: 24, nationality: "Itália", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 58, defending: 54, consistency: 55 } },    { id: "it-023", name: "Miguel Torres", number: 36, nationality: "Portugal", age: 17, attributes: { racePace: 57, qualifying: 55, overtaking: 56, defending: 57, consistency: 58 } },
    { id: "it-024", name: "Arvid Lindström", number: 53, nationality: "Finlândia", age: 15, attributes: { racePace: 54, qualifying: 53, overtaking: 55, defending: 56, consistency: 54 } }  ] }
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
    { id: "us-001", name: "Mason Carter", number: 4, nationality: "Estados Unidos", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 56, defending: 55, consistency: 57 } },    { id: "us-002", name: "Diego Herrera", number: 12, nationality: "México", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 54, consistency: 56 } },
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
    { id: "us-011", name: "Oliver Bennett", number: 31, nationality: "Reino Unido", age: 18, attributes: { racePace: 55, qualifying: 54, overtaking: 57, defending: 56, consistency: 58 } },    { id: "us-012", name: "Noah Williams", number: 46, nationality: "Estados Unidos", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 56, defending: 59, consistency: 55 } }
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
  { id: "f4mx-azteca-motorsport", name: "Azteca Motorsport", country: "México", base: "Cidade do México", drivers: [
    { id: "mx-001", name: "Santiago Hernández", number: 4, nationality: "México", age: 17, attributes: { racePace: 52, qualifying: 53, overtaking: 54, defending: 52, consistency: 55 } },
    { id: "mx-002", name: "Emiliano Torres", number: 12, nationality: "México", age: 16, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 61 } },
    { id: "mx-003", name: "Gabriel Costa", number: 23, nationality: "Brasil", age: 17, attributes: { racePace: 56, qualifying: 54, overtaking: 60, defending: 60, consistency: 60 } },
    { id: "mx-004", name: "Daniel Miller", number: 35, nationality: "Estados Unidos", age: 16, attributes: { racePace: 53, qualifying: 59, overtaking: 55, defending: 55, consistency: 59 } }
  ] },
  { id: "f4mx-jalisco-racing", name: "Jalisco Racing", country: "México", base: "Guadalajara, Jalisco", drivers: [
    { id: "mx-005", name: "Sebastián Ramírez", number: 6, nationality: "México", age: 18, attributes: { racePace: 60, qualifying: 55, overtaking: 58, defending: 59, consistency: 58 } },
    { id: "mx-006", name: "Diego Castillo", number: 15, nationality: "México", age: 16, attributes: { racePace: 57, qualifying: 60, overtaking: 61, defending: 54, consistency: 57 } },
    { id: "mx-007", name: "Tomás Rojas", number: 28, nationality: "Colômbia", age: 17, attributes: { racePace: 54, qualifying: 56, overtaking: 56, defending: 58, consistency: 56 } },
    { id: "mx-008", name: "Nicolás Silva", number: 42, nationality: "Chile", age: 16, attributes: { racePace: 61, qualifying: 61, overtaking: 59, defending: 53, consistency: 55 } }
  ] },
  { id: "f4mx-monterrey-competition", name: "Monterrey Competition", country: "México", base: "Monterrey, Nuevo León", drivers: [
    { id: "mx-009", name: "Alejandro Mendoza", number: 7, nationality: "México", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 54, defending: 57, consistency: 61 } },
    { id: "mx-010", name: "Rodrigo Salinas", number: 17, nationality: "México", age: 15, attributes: { racePace: 55, qualifying: 53, overtaking: 57, defending: 52, consistency: 60 } },
    { id: "mx-011", name: "Thiago Almeida", number: 31, nationality: "Brasil", age: 18, attributes: { racePace: 52, qualifying: 58, overtaking: 60, defending: 56, consistency: 59 } },
    { id: "mx-012", name: "Lucas Martin", number: 46, nationality: "França", age: 17, attributes: { racePace: 59, qualifying: 54, overtaking: 55, defending: 60, consistency: 58 } }
  ] },
  { id: "f4mx-puebla-motorsport", name: "Puebla Motorsport", country: "México", base: "Puebla, Puebla", drivers: [
    { id: "mx-013", name: "Andrés Navarro", number: 9, nationality: "México", age: 16, attributes: { racePace: 56, qualifying: 59, overtaking: 58, defending: 55, consistency: 57 } },
    { id: "mx-014", name: "Mauricio Flores", number: 19, nationality: "México", age: 17, attributes: { racePace: 53, qualifying: 55, overtaking: 61, defending: 59, consistency: 56 } },
    { id: "mx-015", name: "Joaquín Benítez", number: 33, nationality: "Argentina", age: 16, attributes: { racePace: 60, qualifying: 60, overtaking: 56, defending: 54, consistency: 55 } },
    { id: "mx-016", name: "Ethan Wilson", number: 51, nationality: "Estados Unidos", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 59, defending: 58, consistency: 61 } }
  ] },
  { id: "f4mx-yucatan-racing", name: "Yucatán Racing", country: "México", base: "Mérida, Yucatán", drivers: [
    { id: "mx-017", name: "Leonardo Cruz", number: 11, nationality: "México", age: 18, attributes: { racePace: 54, qualifying: 61, overtaking: 54, defending: 53, consistency: 60 } },
    { id: "mx-018", name: "Fernando Aguilar", number: 21, nationality: "México", age: 16, attributes: { racePace: 61, qualifying: 57, overtaking: 57, defending: 57, consistency: 59 } },
    { id: "mx-019", name: "Mateo Vargas", number: 37, nationality: "Costa Rica", age: 17, attributes: { racePace: 58, qualifying: 53, overtaking: 60, defending: 52, consistency: 58 } },
    { id: "mx-020", name: "Oliver Campbell", number: 54, nationality: "Canadá", age: 16, attributes: { racePace: 55, qualifying: 58, overtaking: 55, defending: 56, consistency: 57 } }
  ] },
  { id: "f4mx-bajio-grand-prix", name: "Bajío Grand Prix", country: "México", base: "León, Guanajuato", drivers: [
    { id: "mx-021", name: "Ricardo Valdez", number: 13, nationality: "México", age: 17, attributes: { racePace: 52, qualifying: 54, overtaking: 58, defending: 60, consistency: 56 } },
    { id: "mx-022", name: "Esteban Paredes", number: 25, nationality: "México", age: 15, attributes: { racePace: 59, qualifying: 59, overtaking: 61, defending: 55, consistency: 55 } },
    { id: "mx-023", name: "Javier Cárdenas", number: 39, nationality: "México", age: 16, attributes: { racePace: 56, qualifying: 55, overtaking: 56, defending: 59, consistency: 61 } },
    { id: "mx-024", name: "Kenji Mori", number: 63, nationality: "Japão", age: 17, attributes: { racePace: 53, qualifying: 60, overtaking: 59, defending: 54, consistency: 60 } }
  ] }
];

const formula4JapanFoundingTeams: Team[] = [
  { id: "f4jp-sakura-racing", name: "Sakura Racing", country: "Japão", base: "Suzuka, Mie", drivers: [    { id: "jp-001", name: "Haruto Tanaka", number: 4, nationality: "Japão", age: 17, attributes: { racePace: 52, qualifying: 53, overtaking: 54, defending: 52, consistency: 55 } },
    { id: "jp-002", name: "Ren Sato", number: 12, nationality: "Japão", age: 16, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 61 } },
    { id: "jp-003", name: "Lucas Oliveira", number: 23, nationality: "Brasil", age: 17, attributes: { racePace: 56, qualifying: 54, overtaking: 60, defending: 60, consistency: 60 } },
    { id: "jp-004", name: "Daniel Müller", number: 35, nationality: "Alemanha", age: 16, attributes: { racePace: 53, qualifying: 59, overtaking: 55, defending: 55, consistency: 59 } }
  ] },  { id: "f4jp-tokyo-motorsport", name: "Tokyo Motorsport", country: "Japão", base: "Tóquio", drivers: [
    { id: "jp-005", name: "Yuto Nakamura", number: 6, nationality: "Japão", age: 18, attributes: { racePace: 60, qualifying: 55, overtaking: 58, defending: 59, consistency: 58 } },
    { id: "jp-006", name: "Kaito Yamamoto", number: 15, nationality: "Japão", age: 16, attributes: { racePace: 57, qualifying: 60, overtaking: 61, defending: 54, consistency: 57 } },
    { id: "jp-007", name: "Mateo González", number: 28, nationality: "México", age: 17, attributes: { racePace: 54, qualifying: 56, overtaking: 56, defending: 58, consistency: 56 } },
    { id: "jp-008", name: "Oliver Evans", number: 42, nationality: "Reino Unido", age: 17, attributes: { racePace: 61, qualifying: 61, overtaking: 59, defending: 53, consistency: 55 } }
  ] },
  { id: "f4jp-osaka-performance", name: "Osaka Performance", country: "Japão", base: "Osaka", drivers: [
    { id: "jp-009", name: "Riku Kobayashi", number: 7, nationality: "Japão", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 54, defending: 57, consistency: 61 } },
    { id: "jp-010", name: "Sota Fujimoto", number: 17, nationality: "Japão", age: 15, attributes: { racePace: 55, qualifying: 53, overtaking: 57, defending: 52, consistency: 60 } },
    { id: "jp-011", name: "Rafael Mendes", number: 31, nationality: "Portugal", age: 18, attributes: { racePace: 52, qualifying: 58, overtaking: 60, defending: 56, consistency: 59 } },
    { id: "jp-012", name: "Min-seok Lee", number: 46, nationality: "Coreia do Sul", age: 16, attributes: { racePace: 59, qualifying: 54, overtaking: 55, defending: 60, consistency: 58 } }
  ] },
  { id: "f4jp-fuji-grand-prix", name: "Fuji Grand Prix", country: "Japão", base: "Gotemba, Shizuoka", drivers: [
    { id: "jp-013", name: "Takumi Watanabe", number: 9, nationality: "Japão", age: 16, attributes: { racePace: 56, qualifying: 59, overtaking: 58, defending: 55, consistency: 57 } },
    { id: "jp-014", name: "Daiki Suzuki", number: 19, nationality: "Japão", age: 17, attributes: { racePace: 53, qualifying: 55, overtaking: 61, defending: 59, consistency: 56 } },
    { id: "jp-015", name: "Matteo Ricci", number: 33, nationality: "Itália", age: 17, attributes: { racePace: 60, qualifying: 60, overtaking: 56, defending: 54, consistency: 55 } },
    { id: "jp-016", name: "Ethan Miller", number: 51, nationality: "Estados Unidos", age: 16, attributes: { racePace: 57, qualifying: 56, overtaking: 59, defending: 58, consistency: 61 } }
  ] },
  { id: "f4jp-hokkaido-racing", name: "Hokkaido Racing", country: "Japão", base: "Sapporo, Hokkaido", drivers: [
    { id: "jp-017", name: "Shun Matsuda", number: 11, nationality: "Japão", age: 18, attributes: { racePace: 54, qualifying: 61, overtaking: 54, defending: 53, consistency: 60 } },
    { id: "jp-018", name: "Akira Ito", number: 21, nationality: "Japão", age: 16, attributes: { racePace: 61, qualifying: 57, overtaking: 57, defending: 57, consistency: 59 } },
    { id: "jp-019", name: "Chen Wei", number: 37, nationality: "China", age: 17, attributes: { racePace: 58, qualifying: 53, overtaking: 60, defending: 52, consistency: 58 } },
    { id: "jp-020", name: "Noah Wilson", number: 54, nationality: "Austrália", age: 16, attributes: { racePace: 55, qualifying: 58, overtaking: 55, defending: 56, consistency: 57 } }
  ] },
  { id: "f4jp-kyushu-motorsport", name: "Kyushu Motorsport", country: "Japão", base: "Fukuoka, Kyushu", drivers: [
    { id: "jp-021", name: "Tsubasa Mori", number: 13, nationality: "Japão", age: 17, attributes: { racePace: 52, qualifying: 54, overtaking: 58, defending: 60, consistency: 56 } },
    { id: "jp-022", name: "Kenta Hayashi", number: 25, nationality: "Japão", age: 15, attributes: { racePace: 59, qualifying: 59, overtaking: 61, defending: 55, consistency: 55 } },
    { id: "jp-023", name: "Hiroto Kato", number: 39, nationality: "Japão", age: 16, attributes: { racePace: 56, qualifying: 55, overtaking: 56, defending: 59, consistency: 61 } },
    { id: "jp-024", name: "Alejandro Torres", number: 63, nationality: "Espanha", age: 17, attributes: { racePace: 53, qualifying: 60, overtaking: 59, defending: 54, consistency: 60 } }
  ] }
];
const formula4MongoliaFoundingTeams: Team[] = [
  { id: "f4mn-ulaanbaatar-motorsport", name: "Ulaanbaatar Motorsport", country: "Mongólia", base: "Ulaanbaatar", drivers: [
    { id: "mn-001", name: "Temuulen Batbayar", number: 4, nationality: "Mongólia", age: 17, attributes: { racePace: 52, qualifying: 53, overtaking: 54, defending: 52, consistency: 55 } },
    { id: "mn-002", name: "Anar Erdenebat", number: 12, nationality: "Mongólia", age: 16, attributes: { racePace: 53, qualifying: 56, overtaking: 59, defending: 56, consistency: 57 } },
    { id: "mn-003", name: "Caio Ribeiro", number: 23, nationality: "Brasil", age: 17, attributes: { racePace: 54, qualifying: 59, overtaking: 56, defending: 60, consistency: 59 } },
    { id: "mn-004", name: "Bruno Azevedo", number: 35, nationality: "Brasil", age: 16, attributes: { racePace: 55, qualifying: 53, overtaking: 61, defending: 55, consistency: 61 } }
  ] },
  { id: "f4mn-steppe-racing", name: "Steppe Racing", country: "Mongólia", base: "Darkhan", drivers: [
    { id: "mn-005", name: "Bilguun Ganbold", number: 6, nationality: "Mongólia", age: 18, attributes: { racePace: 56, qualifying: 56, overtaking: 58, defending: 59, consistency: 56 } },
    { id: "mn-006", name: "Munkh-Orgil Batsaikhan", number: 15, nationality: "Mongólia", age: 16, attributes: { racePace: 57, qualifying: 59, overtaking: 55, defending: 54, consistency: 58 } },
    { id: "mn-007", name: "Santiago Luna", number: 28, nationality: "México", age: 17, attributes: { racePace: 58, qualifying: 53, overtaking: 60, defending: 58, consistency: 60 } },
    { id: "mn-008", name: "Emiliano Vargas", number: 42, nationality: "México", age: 16, attributes: { racePace: 59, qualifying: 56, overtaking: 57, defending: 53, consistency: 55 } }
  ] },
  { id: "f4mn-gobi-grand-prix", name: "Gobi Grand Prix", country: "Mongólia", base: "Dalanzadgad", drivers: [
    { id: "mn-009", name: "Khuslen Tserendorj", number: 7, nationality: "Mongólia", age: 17, attributes: { racePace: 60, qualifying: 59, overtaking: 54, defending: 57, consistency: 57 } },
    { id: "mn-010", name: "Enkhjin Bold", number: 17, nationality: "Mongólia", age: 15, attributes: { racePace: 61, qualifying: 53, overtaking: 59, defending: 52, consistency: 59 } },
    { id: "mn-011", name: "Park Ji-ho", number: 31, nationality: "Coreia do Sul", age: 18, attributes: { racePace: 52, qualifying: 56, overtaking: 56, defending: 56, consistency: 61 } },
    { id: "mn-012", name: "Kim Seo-jun", number: 46, nationality: "Coreia do Sul", age: 16, attributes: { racePace: 53, qualifying: 59, overtaking: 61, defending: 60, consistency: 56 } }
  ] },
  { id: "f4mn-khentii-competition", name: "Khentii Competition", country: "Mongólia", base: "Öndörkhaan", drivers: [
    { id: "mn-013", name: "Sukhbat Naranbaatar", number: 9, nationality: "Mongólia", age: 16, attributes: { racePace: 54, qualifying: 53, overtaking: 58, defending: 55, consistency: 58 } },
    { id: "mn-014", name: "Tuvshinbayar Dorj", number: 19, nationality: "Mongólia", age: 17, attributes: { racePace: 55, qualifying: 56, overtaking: 55, defending: 59, consistency: 60 } },
    { id: "mn-015", name: "Alessandro Vitale", number: 33, nationality: "Itália", age: 17, attributes: { racePace: 56, qualifying: 59, overtaking: 60, defending: 54, consistency: 55 } },
    { id: "mn-016", name: "Lorenzo Moretti", number: 51, nationality: "Itália", age: 16, attributes: { racePace: 57, qualifying: 53, overtaking: 57, defending: 58, consistency: 57 } }
  ] },
  { id: "f4mn-orkhon-motorsport", name: "Orkhon Motorsport", country: "Mongólia", base: "Erdenet", drivers: [
    { id: "mn-017", name: "Bat-Erdene Munkhbayar", number: 11, nationality: "Mongólia", age: 18, attributes: { racePace: 58, qualifying: 56, overtaking: 54, defending: 53, consistency: 59 } },
    { id: "mn-018", name: "Nomin-Erdene Enkh", number: 21, nationality: "Mongólia", age: 16, attributes: { racePace: 59, qualifying: 59, overtaking: 59, defending: 57, consistency: 61 } },
    { id: "mn-019", name: "Austin Brooks", number: 37, nationality: "Estados Unidos", age: 17, attributes: { racePace: 60, qualifying: 53, overtaking: 56, defending: 52, consistency: 56 } },
    { id: "mn-020", name: "Zhang Haoran", number: 54, nationality: "China", age: 16, attributes: { racePace: 61, qualifying: 56, overtaking: 61, defending: 56, consistency: 58 } }
  ] },
  { id: "f4mn-altai-racing", name: "Altai Racing", country: "Mongólia", base: "Khovd", drivers: [
    { id: "mn-021", name: "Ganzorig Purev", number: 13, nationality: "Mongólia", age: 17, attributes: { racePace: 52, qualifying: 59, overtaking: 58, defending: 60, consistency: 60 } },
    { id: "mn-022", name: "Erdenebat Otgon", number: 25, nationality: "Mongólia", age: 15, attributes: { racePace: 53, qualifying: 53, overtaking: 55, defending: 55, consistency: 55 } },
    { id: "mn-023", name: "Munkhjin Amar", number: 39, nationality: "Mongólia", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 60, defending: 59, consistency: 57 } },
    { id: "mn-024", name: "Lachlan Fraser", number: 63, nationality: "Austrália", age: 17, attributes: { racePace: 55, qualifying: 59, overtaking: 57, defending: 54, consistency: 59 } }
  ] }
];

const formula4ChinaFoundingTeams: Team[] = [
  { id: "f4cn-dragon-motorsport", name: "Dragon Motorsport", country: "China", base: "Xangai", drivers: [
    { id: "cn-001", name: "Zhang Wei", number: 3, nationality: "China", age: 17, attributes: { racePace: 56, qualifying: 58, overtaking: 55, defending: 54, consistency: 57 } },
    { id: "cn-002", name: "Li Jun", number: 12, nationality: "China", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 57, defending: 55, consistency: 56 } },
    { id: "cn-003", name: "Vihaan Kapoor", number: 23, nationality: "Índia", age: 17, attributes: { racePace: 57, qualifying: 55, overtaking: 58, defending: 54, consistency: 55 } },    { id: "cn-004", name: "Akash Patel", number: 35, nationality: "Índia", age: 16, attributes: { racePace: 53, qualifying: 57, overtaking: 56, defending: 55, consistency: 54 } }
  ] },
  { id: "f4cn-beijing-racing", name: "Beijing Racing", country: "China", base: "Pequim", drivers: [
    { id: "cn-005", name: "Wang Haoyu", number: 5, nationality: "China", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 57, consistency: 58 } },
    { id: "cn-006", name: "Chen Rui", number: 15, nationality: "China", age: 16, attributes: { racePace: 55, qualifying: 57, overtaking: 54, defending: 56, consistency: 55 } },
    { id: "cn-007", name: "Nguyễn Minh", number: 27, nationality: "Vietnã", age: 17, attributes: { racePace: 56, qualifying: 54, overtaking: 58, defending: 55, consistency: 56 } },    { id: "cn-008", name: "Trần Đức", number: 39, nationality: "Vietnã", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 53, consistency: 55 } }
  ] },
  { id: "f4cn-pearl-river-competition", name: "Pearl River Competition", country: "China", base: "Guangzhou, Guangdong", drivers: [
    { id: "cn-009", name: "Liu Zihan", number: 7, nationality: "China", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 59, defending: 56, consistency: 57 } },
    { id: "cn-010", name: "Huang Yuchen", number: 17, nationality: "China", age: 15, attributes: { racePace: 53, qualifying: 55, overtaking: 56, defending: 54, consistency: 55 } },
    { id: "cn-011", name: "Muhammad Faris", number: 31, nationality: "Malásia", age: 18, attributes: { racePace: 57, qualifying: 56, overtaking: 55, defending: 58, consistency: 56 } },
    { id: "cn-012", name: "Amir Hakim", number: 46, nationality: "Malásia", age: 16, attributes: { racePace: 55, qualifying: 54, overtaking: 57, defending: 56, consistency: 54 } }
  ] },
  { id: "f4cn-chengdu-motorsport", name: "Chengdu Motorsport", country: "China", base: "Chengdu, Sichuan", drivers: [
    { id: "cn-013", name: "Zhou Yifan", number: 9, nationality: "China", age: 16, attributes: { racePace: 56, qualifying: 57, overtaking: 55, defending: 56, consistency: 58 } },
    { id: "cn-014", name: "Xu Kai", number: 19, nationality: "China", age: 17, attributes: { racePace: 58, qualifying: 55, overtaking: 57, defending: 54, consistency: 56 } },
    { id: "cn-015", name: "Batsaikhan Enkh", number: 33, nationality: "Mongólia", age: 17, attributes: { racePace: 54, qualifying: 56, overtaking: 58, defending: 55, consistency: 57 } },
    { id: "cn-016", name: "Temuujin Bold", number: 51, nationality: "Mongólia", age: 16, attributes: { racePace: 55, qualifying: 54, overtaking: 56, defending: 57, consistency: 55 } }
  ] },
  { id: "f4cn-zhejiang-grand-prix", name: "Zhejiang Grand Prix", country: "China", base: "Hangzhou, Zhejiang", drivers: [
    { id: "cn-017", name: "Sun Yichen", number: 11, nationality: "China", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 57, defending: 58, consistency: 59 } },
    { id: "cn-018", name: "Zhao Ming", number: 21, nationality: "China", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 55, consistency: 56 } },
    { id: "cn-019", name: "Ethan Clarke", number: 37, nationality: "Austrália", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "cn-020", name: "Jack Thompson", number: 54, nationality: "Austrália", age: 16, attributes: { racePace: 54, qualifying: 57, overtaking: 55, defending: 56, consistency: 55 } }
  ] },
  { id: "f4cn-wuhan-racing", name: "Wuhan Racing", country: "China", base: "Wuhan, Hubei", drivers: [
    { id: "cn-021", name: "Wu Zeyu", number: 13, nationality: "China", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 57, consistency: 58 } },
    { id: "cn-022", name: "Lin Haoran", number: 25, nationality: "China", age: 15, attributes: { racePace: 53, qualifying: 55, overtaking: 56, defending: 54, consistency: 55 } },
    { id: "cn-023", name: "Rafael Almeida", number: 39, nationality: "Brasil", age: 16, attributes: { racePace: 56, qualifying: 55, overtaking: 58, defending: 56, consistency: 57 } },
    { id: "cn-024", name: "Gabriel Santos", number: 63, nationality: "Brasil", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 56, defending: 58, consistency: 56 } }
  ] }
];

const formula4IndonesiaFoundingTeams: Team[] = [
  { id: "f4id-garuda-motorsport", name: "Garuda Motorsport", country: "Indonésia", base: "Jacarta, Java", drivers: [
    { id: "id-001", name: "Rizky Pratama", number: 3, nationality: "Indonésia", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 56 } },
    { id: "id-002", name: "Dimas Saputra", number: 12, nationality: "Indonésia", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 57, defending: 54, consistency: 55 } },
    { id: "id-003", name: "Nattawut Srisai", number: 23, nationality: "Tailândia", age: 17, attributes: { racePace: 56, qualifying: 54, overtaking: 58, defending: 56, consistency: 54 } },
    { id: "id-004", name: "Thanakorn Chaiyaporn", number: 35, nationality: "Tailândia", age: 16, attributes: { racePace: 53, qualifying: 55, overtaking: 54, defending: 56, consistency: 55 } }
  ] },
  { id: "f4id-nusantara-racing", name: "Nusantara Racing", country: "Indonésia", base: "Bandung, Java", drivers: [
    { id: "id-005", name: "Aditya Mahendra", number: 7, nationality: "Indonésia", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "id-006", name: "Fajar Ramadhan", number: 18, nationality: "Indonésia", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 57, consistency: 54 } },
    { id: "id-007", name: "Miguel Reyes", number: 27, nationality: "Filipinas", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 55, consistency: 56 } },
    { id: "id-008", name: "Rafael Santos", number: 42, nationality: "Filipinas", age: 16, attributes: { racePace: 53, qualifying: 54, overtaking: 56, defending: 55, consistency: 57 } }
  ] },
  { id: "f4id-bali-performance", name: "Bali Performance", country: "Indonésia", base: "Denpasar, Bali", drivers: [
    { id: "id-009", name: "Made Wirawan", number: 5, nationality: "Indonésia", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 55, defending: 58, consistency: 56 } },
    { id: "id-010", name: "Putu Arya", number: 16, nationality: "Indonésia", age: 15, attributes: { racePace: 52, qualifying: 54, overtaking: 55, defending: 53, consistency: 54 } },
    { id: "id-011", name: "Ethan Tan", number: 29, nationality: "Singapura", age: 18, attributes: { racePace: 59, qualifying: 57, overtaking: 56, defending: 55, consistency: 58 } },
    { id: "id-012", name: "Daniel Lim", number: 38, nationality: "Singapura", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 57, defending: 54, consistency: 55 } }
  ] },
  { id: "f4id-surabaya-competition", name: "Surabaya Competition", country: "Indonésia", base: "Surabaya, Java", drivers: [
    { id: "id-013", name: "Bagas Wicaksono", number: 9, nationality: "Indonésia", age: 17, attributes: { racePace: 56, qualifying: 58, overtaking: 57, defending: 55, consistency: 56 } },
    { id: "id-014", name: "Arif Setiawan", number: 21, nationality: "Indonésia", age: 16, attributes: { racePace: 53, qualifying: 55, overtaking: 54, defending: 57, consistency: 55 } },    { id: "id-015", name: "Haruto Nakamura", number: 31, nationality: "Japão", age: 17, attributes: { racePace: 58, qualifying: 59, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "id-016", name: "Kaito Fujimoto", number: 44, nationality: "Japão", age: 16, attributes: { racePace: 55, qualifying: 57, overtaking: 58, defending: 54, consistency: 56 } }
  ] },
  { id: "f4id-sumatra-grand-prix", name: "Sumatra Grand Prix", country: "Indonésia", base: "Medan, Sumatra", drivers: [
    { id: "id-017", name: "Muhammad Alif", number: 11, nationality: "Indonésia", age: 18, attributes: { racePace: 60, qualifying: 57, overtaking: 58, defending: 56, consistency: 57 } },
    { id: "id-018", name: "Ilham Fadli", number: 24, nationality: "Indonésia", age: 16, attributes: { racePace: 54, qualifying: 53, overtaking: 56, defending: 55, consistency: 54 } },
    { id: "id-019", name: "Park Min-jae", number: 33, nationality: "Coreia do Sul", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 55, defending: 58, consistency: 56 } },
    { id: "id-020", name: "Kim Seo-jun", number: 47, nationality: "Coreia do Sul", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 55, consistency: 57 } }
  ] },
  { id: "f4id-sulawesi-motorsport", name: "Sulawesi Motorsport", country: "Indonésia", base: "Makassar, Sulawesi", drivers: [
    { id: "id-021", name: "Andi Faturrahman", number: 14, nationality: "Indonésia", age: 17, attributes: { racePace: 57, qualifying: 55, overtaking: 58, defending: 56, consistency: 55 } },
    { id: "id-022", name: "Muhammad Reza", number: 26, nationality: "Indonésia", age: 15, attributes: { racePace: 52, qualifying: 53, overtaking: 54, defending: 55, consistency: 54 } },
    { id: "id-023", name: "Nguyễn Hoàng", number: 36, nationality: "Vietnã", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "id-024", name: "Phạm Quang", number: 49, nationality: "Vietnã", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 57, consistency: 55 } }
  ] }
];

const formula4AustraliaFoundingTeams: Team[] = [
  { id: "f4au-southern-cross-racing", name: "Southern Cross Racing", country: "Austrália", base: "Melbourne, Victoria", drivers: [
    { id: "au-001", name: "Oliver Bennett", number: 3, nationality: "Austrália", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "au-002", name: "Jack Wilson", number: 12, nationality: "Austrália", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 54, consistency: 55 } },
    { id: "au-003", name: "Liam McKenzie", number: 23, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 57, qualifying: 55, overtaking: 58, defending: 56, consistency: 56 } },
    { id: "au-004", name: "Aiden Nakamura", number: 35, nationality: "Japão", age: 16, attributes: { racePace: 54, qualifying: 57, overtaking: 56, defending: 55, consistency: 55 } }
  ] },
  { id: "f4au-sydney-motorsport", name: "Sydney Motorsport", country: "Austrália", base: "Sydney, Nova Gales do Sul", drivers: [    { id: "au-005", name: "Thomas Walker", number: 7, nationality: "Austrália", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 58, defending: 57, consistency: 59 } },
    { id: "au-006", name: "Cooper Mitchell", number: 18, nationality: "Austrália", age: 16, attributes: { racePace: 55, qualifying: 57, overtaking: 56, defending: 55, consistency: 54 } },
    { id: "au-007", name: "Ethan Brooks", number: 27, nationality: "Austrália", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 59, defending: 56, consistency: 57 } },
    { id: "au-008", name: "Daniel Tan", number: 42, nationality: "Singapura", age: 17, attributes: { racePace: 56, qualifying: 58, overtaking: 55, defending: 56, consistency: 57 } }
  ] },
  { id: "f4au-queensland-performance", name: "Queensland Performance", country: "Austrália", base: "Brisbane, Queensland", drivers: [
    { id: "au-009", name: "Noah Campbell", number: 5, nationality: "Austrália", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 57, defending: 56, consistency: 58 } },    { id: "au-010", name: "Harrison Clarke", number: 16, nationality: "Austrália", age: 15, attributes: { racePace: 52, qualifying: 54, overtaking: 55, defending: 53, consistency: 54 } },
    { id: "au-011", name: "Blake Anderson", number: 29, nationality: "Austrália", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "au-012", name: "Ryan Lim", number: 38, nationality: "Malásia", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 57, defending: 55, consistency: 55 } }
  ] },
  { id: "f4au-western-australia-racing", name: "Western Australia Racing", country: "Austrália", base: "Perth, Austrália Ocidental", drivers: [
    { id: "au-013", name: "Mason Taylor", number: 9, nationality: "Austrália", age: 18, attributes: { racePace: 60, qualifying: 58, overtaking: 59, defending: 57, consistency: 58 } },
    { id: "au-014", name: "Lachlan Foster", number: 21, nationality: "Austrália", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 57, consistency: 55 } },
    { id: "au-015", name: "Flynn O'Connor", number: 31, nationality: "Austrália", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 58, defending: 55, consistency: 56 } },
    { id: "au-016", name: "Kai Watanabe", number: 44, nationality: "Japão", age: 17, attributes: { racePace: 57, qualifying: 59, overtaking: 56, defending: 54, consistency: 57 } }
  ] },
  { id: "f4au-adelaide-competition", name: "Adelaide Competition", country: "Austrália", base: "Adelaide, Austrália Meridional", drivers: [
    { id: "au-017", name: "Xavier Collins", number: 11, nationality: "Austrália", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 56, defending: 58, consistency: 57 } },
    { id: "au-018", name: "Hudson Reed", number: 24, nationality: "Austrália", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 56, consistency: 55 } },
    { id: "au-019", name: "Finn Sullivan", number: 33, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 59, qualifying: 57, overtaking: 58, defending: 56, consistency: 58 } },
    { id: "au-020", name: "Arjun Nair", number: 47, nationality: "Singapura", age: 16, attributes: { racePace: 54, qualifying: 57, overtaking: 56, defending: 55, consistency: 56 } }
  ] },
  { id: "f4au-tasmania-motorsport", name: "Tasmania Motorsport", country: "Austrália", base: "Hobart, Tasmânia", drivers: [
    { id: "au-021", name: "Charlie Morgan", number: 14, nationality: "Austrália", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 58, consistency: 59 } },
    { id: "au-022", name: "Darcy Evans", number: 26, nationality: "Austrália", age: 15, attributes: { racePace: 52, qualifying: 53, overtaking: 55, defending: 54, consistency: 53 } },
    { id: "au-023", name: "Samuel Price", number: 36, nationality: "Austrália", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 58, defending: 57, consistency: 56 } },
    { id: "au-024", name: "Amir Rahman", number: 49, nationality: "Malásia", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 57, defending: 56, consistency: 55 } }
  ] }
];

// Equipes fundadoras são inseridas sem apagar cadastros feitos pelo usuário.
const formula4NewZealandFoundingTeams: Team[] = [
  { id: "f4nz-kiwi-motorsport", name: "Kiwi Motorsport", country: "Nova Zelândia", base: "Auckland, Ilha Norte", drivers: [
    { id: "nz-001", name: "Liam Thompson", number: 3, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "nz-002", name: "Oliver Fraser", number: 12, nationality: "Nova Zelândia", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 57, defending: 55, consistency: 55 } },
    { id: "nz-003", name: "Noah Williams", number: 23, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "nz-004", name: "Arjun Mehta", number: 35, nationality: "Índia", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 55, defending: 56, consistency: 55 } }
  ] },
  { id: "f4nz-southern-pacific-racing", name: "Southern Pacific Racing", country: "Nova Zelândia", base: "Christchurch, Ilha Sul", drivers: [
    { id: "nz-005", name: "Ethan McCarthy", number: 7, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 58, defending: 55, consistency: 56 } },
    { id: "nz-006", name: "Caleb Anderson", number: 18, nationality: "Nova Zelândia", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 57, consistency: 55 } },
    { id: "nz-007", name: "Finn Robertson", number: 27, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 59 } },
    { id: "nz-008", name: "Hiroshi Sato", number: 42, nationality: "Japão", age: 16, attributes: { racePace: 55, qualifying: 58, overtaking: 56, defending: 54, consistency: 56 } }
  ] },
  { id: "f4nz-wellington-motorsport", name: "Wellington Motorsport", country: "Nova Zelândia", base: "Wellington, Ilha Norte", drivers: [
    { id: "nz-009", name: "Jack Harrison", number: 5, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 60, qualifying: 59, overtaking: 57, defending: 58, consistency: 59 } },
    { id: "nz-010", name: "Mason Clarke", number: 16, nationality: "Nova Zelândia", age: 16, attributes: { racePace: 54, qualifying: 56, overtaking: 55, defending: 57, consistency: 55 } },
    { id: "nz-011", name: "Theo Campbell", number: 29, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 57, qualifying: 58, overtaking: 56, defending: 55, consistency: 57 } },
    { id: "nz-012", name: "Chen Yuxuan", number: 38, nationality: "China", age: 17, attributes: { racePace: 56, qualifying: 57, overtaking: 58, defending: 55, consistency: 56 } }
  ] },
  { id: "f4nz-waikato-performance", name: "Waikato Performance", country: "Nova Zelândia", base: "Hamilton, Ilha Norte", drivers: [
    { id: "nz-013", name: "William Bennett", number: 9, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 57, defending: 56, consistency: 58 } },
    { id: "nz-014", name: "Lucas Morgan", number: 21, nationality: "Nova Zelândia", age: 15, attributes: { racePace: 52, qualifying: 54, overtaking: 55, defending: 53, consistency: 54 } },
    { id: "nz-015", name: "Samuel Cooper", number: 31, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 56, defending: 57, consistency: 58 } },
    { id: "nz-016", name: "Min-jun Lee", number: 44, nationality: "Coreia do Sul", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 55, consistency: 56 } }
  ] },
  { id: "f4nz-otago-grand-prix", name: "Otago Grand Prix", country: "Nova Zelândia", base: "Dunedin, Ilha Sul", drivers: [
    { id: "nz-017", name: "Daniel Mitchell", number: 11, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 60, qualifying: 58, overtaking: 57, defending: 57, consistency: 59 } },
    { id: "nz-018", name: "Blake Wilson", number: 24, nationality: "Nova Zelândia", age: 16, attributes: { racePace: 54, qualifying: 55, overtaking: 56, defending: 56, consistency: 55 } },
    { id: "nz-019", name: "Ryan O'Connor", number: 33, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 57, qualifying: 56, overtaking: 58, defending: 55, consistency: 56 } },
    { id: "nz-020", name: "Muhammad Aiman", number: 47, nationality: "Malásia", age: 17, attributes: { racePace: 56, qualifying: 55, overtaking: 57, defending: 56, consistency: 55 } }
  ] },
  { id: "f4nz-bay-of-plenty-racing", name: "Bay of Plenty Racing", country: "Nova Zelândia", base: "Tauranga, Ilha Norte", drivers: [
    { id: "nz-021", name: "Harrison Taylor", number: 14, nationality: "Nova Zelândia", age: 17, attributes: { racePace: 58, qualifying: 57, overtaking: 56, defending: 58, consistency: 57 } },
    { id: "nz-022", name: "Cooper Evans", number: 26, nationality: "Nova Zelândia", age: 15, attributes: { racePace: 52, qualifying: 53, overtaking: 54, defending: 55, consistency: 54 } },
    { id: "nz-023", name: "Alex Sullivan", number: 36, nationality: "Nova Zelândia", age: 18, attributes: { racePace: 59, qualifying: 58, overtaking: 57, defending: 56, consistency: 59 } },
    { id: "nz-024", name: "Gabriel Costa", number: 49, nationality: "Brasil", age: 16, attributes: { racePace: 55, qualifying: 56, overtaking: 57, defending: 55, consistency: 56 } }
  ] }
];

const formula4BrazilFoundingTeams: Team[] = [
  { id: "f4br-paulista-motorsport", name: "Paulista Motorsport", country: "Brasil", base: "São Paulo, SP", drivers: [
    { id: "br-001", name: "Pedro Almeida", number: 1, nationality: "Brasil", age: 17, attributes: {"racePace":58,"qualifying":57,"overtaking":56,"defending":55,"consistency":57} },
    { id: "br-002", name: "Lucas Ferreira", number: 12, nationality: "Brasil", age: 16, attributes: {"racePace":55,"qualifying":58,"overtaking":57,"defending":54,"consistency":56} },    { id: "br-003", name: "Gabriel Monteiro", number: 23, nationality: "Brasil", age: 18, attributes: {"racePace":59,"qualifying":60,"overtaking":58,"defending":57,"consistency":58} },
    { id: "br-004", name: "Santiago Pérez", number: 35, nationality: "Colômbia", age: 17, attributes: {"racePace":54,"qualifying":56,"overtaking":59,"defending":55,"consistency":54} }
  ] },
  { id: "f4br-minas-racing", name: "Minas Racing", country: "Brasil", base: "Belo Horizonte, MG", drivers: [
    { id: "br-005", name: "Rafael Costa", number: 2, nationality: "Brasil", age: 17, attributes: {"racePace":58,"qualifying":57,"overtaking":56,"defending":55,"consistency":57} },
    { id: "br-006", name: "Enzo Martins", number: 14, nationality: "Brasil", age: 16, attributes: {"racePace":55,"qualifying":58,"overtaking":57,"defending":54,"consistency":56} },    { id: "br-007", name: "Felipe Andrade", number: 25, nationality: "Brasil", age: 18, attributes: {"racePace":59,"qualifying":60,"overtaking":58,"defending":57,"consistency":58} },
    { id: "br-008", name: "Mateo González", number: 37, nationality: "Argentina", age: 17, attributes: {"racePace":54,"qualifying":56,"overtaking":59,"defending":55,"consistency":54} }
  ] },
  { id: "f4br-sul-brasil-competition", name: "Sul Brasil Competition", country: "Brasil", base: "Curitiba, PR", drivers: [
    { id: "br-009", name: "João Pedro Silva", number: 4, nationality: "Brasil", age: 17, attributes: {"racePace":58,"qualifying":57,"overtaking":56,"defending":55,"consistency":57} },
    { id: "br-010", name: "Gustavo Ribeiro", number: 16, nationality: "Brasil", age: 16, attributes: {"racePace":55,"qualifying":58,"overtaking":57,"defending":54,"consistency":56} },
    { id: "br-011", name: "Arthur Oliveira", number: 27, nationality: "Brasil", age: 18, attributes: {"racePace":59,"qualifying":60,"overtaking":58,"defending":57,"consistency":58} },
    { id: "br-012", name: "Tomás Rojas", number: 39, nationality: "Chile", age: 16, attributes: {"racePace":54,"qualifying":56,"overtaking":59,"defending":55,"consistency":54} }  ] },
  { id: "f4br-cerrado-motorsport", name: "Cerrado Motorsport", country: "Brasil", base: "Goiânia, GO", drivers: [
    { id: "br-013", name: "Bruno Carvalho", number: 5, nationality: "Brasil", age: 18, attributes: {"racePace":58,"qualifying":57,"overtaking":56,"defending":55,"consistency":57} },
    { id: "br-014", name: "Matheus Nascimento", number: 18, nationality: "Brasil", age: 16, attributes: {"racePace":55,"qualifying":58,"overtaking":57,"defending":54,"consistency":56} },
    { id: "br-015", name: "Davi Barbosa", number: 29, nationality: "Brasil", age: 17, attributes: {"racePace":59,"qualifying":60,"overtaking":58,"defending":57,"consistency":58} },
    { id: "br-016", name: "Nicolás Fernández", number: 41, nationality: "Uruguai", age: 17, attributes: {"racePace":54,"qualifying":56,"overtaking":59,"defending":55,"consistency":54} }
  ] },
  { id: "f4br-nordeste-racing", name: "Nordeste Racing", country: "Brasil", base: "Recife, PE", drivers: [
    { id: "br-017", name: "Miguel Santos", number: 6, nationality: "Brasil", age: 17, attributes: {"racePace":58,"qualifying":57,"overtaking":56,"defending":55,"consistency":57} },
    { id: "br-018", name: "Caio Rodrigues", number: 20, nationality: "Brasil", age: 15, attributes: {"racePace":55,"qualifying":58,"overtaking":57,"defending":54,"consistency":56} },
    { id: "br-019", name: "Leonardo Lima", number: 32, nationality: "Brasil", age: 18, attributes: {"racePace":59,"qualifying":60,"overtaking":58,"defending":57,"consistency":58} },
    { id: "br-020", name: "Thiago Benítez", number: 43, nationality: "Paraguai", age: 16, attributes: {"racePace":54,"qualifying":56,"overtaking":59,"defending":55,"consistency":54} }
  ] },
  { id: "f4br-rio-grand-prix", name: "Rio Grand Prix", country: "Brasil", base: "Rio de Janeiro, RJ", drivers: [
    { id: "br-021", name: "Daniel Souza", number: 8, nationality: "Brasil", age: 18, attributes: {"racePace":58,"qualifying":57,"overtaking":56,"defending":55,"consistency":57} },
    { id: "br-022", name: "Vitor Mendes", number: 22, nationality: "Brasil", age: 16, attributes: {"racePace":55,"qualifying":58,"overtaking":57,"defending":54,"consistency":56} },
    { id: "br-023", name: "Henrique Azevedo", number: 34, nationality: "Brasil", age: 17, attributes: {"racePace":59,"qualifying":60,"overtaking":58,"defending":57,"consistency":58} },
    { id: "br-024", name: "Alex Chen", number: 47, nationality: "China", age: 17, attributes: {"racePace":54,"qualifying":56,"overtaking":59,"defending":55,"consistency":54} }
  ] }
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
    if (!source || source.drivers.length === 0) return saved;
    const savedDriverIds = new Set(saved.drivers.map(driver => driver.id));
    const savedDriverNames = new Set(saved.drivers.map(driver => driver.name.trim().toLocaleLowerCase("pt-BR")));
    const missingDrivers = source.drivers.filter(driver =>
      !savedDriverIds.has(driver.id) &&
      !savedDriverNames.has(driver.name.trim().toLocaleLowerCase("pt-BR"))
    );
    return missingDrivers.length > 0
      ? { ...saved, drivers: [...saved.drivers, ...missingDrivers] }
      : saved;
  });
  return [...seeded, ...missing];
}