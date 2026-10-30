import type { Championship, Team } from "./types";

const driver = (
  id: string,
  name: string,
  number: number,
  nationality: string
) => ({
  id,
  name,
  number,
  nationality,
  racePace: 50,
  qualifying: 50,
  overtaking: 50,
  defending: 50,
  consistency: 50,
});

export const initialChampionships: Championship[] = [
  {
    id: "formula-1-2026",
    name: "FORMULA 1",
    category: "FIA Formula One World Championship",
    season: 2026,
    teamLimit: 11,
    status: "active",
  },
];

export const initialTeams: Team[] = [
  {
    id: "mclaren",
    name: "McLaren",
    country: "Reino Unido",
    base: "Woking, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("mclaren-lando-norris", "Lando Norris", 1, "Reino Unido"),
      driver("mclaren-oscar-piastri", "Oscar Piastri", 81, "Austrália"),
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes-AMG PETRONAS",
    country: "Alemanha",
    base: "Brackley, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("mercedes-george-russell", "George Russell", 63, "Reino Unido"),
      driver("mercedes-kimi-antonelli", "Kimi Antonelli", 12, "Itália"),
    ],
  },
  {
    id: "ferrari",
    name: "Scuderia Ferrari",
    country: "Itália",
    base: "Maranello, Itália",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("ferrari-charles-leclerc", "Charles Leclerc", 16, "Mônaco"),
      driver("ferrari-lewis-hamilton", "Lewis Hamilton", 44, "Reino Unido"),
    ],
  },
  {
    id: "red-bull-racing",
    name: "Oracle Red Bull Racing",
    country: "Áustria",
    base: "Milton Keynes, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("redbull-max-verstappen", "Max Verstappen", 3, "Países Baixos"),
      driver("redbull-isack-hadjar", "Isack Hadjar", 6, "França"),
    ],
  },
  {
    id: "racing-bulls",
    name: "Visa Cash App Racing Bulls",
    country: "Itália",
    base: "Faenza, Itália",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("racingbulls-liam-lawson", "Liam Lawson", 30, "Nova Zelândia"),
      driver("racingbulls-arvid-lindblad", "Arvid Lindblad", 41, "Reino Unido"),
    ],
  },
  {
    id: "alpine",
    name: "BWT Alpine",
    country: "França",
    base: "Enstone, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("alpine-pierre-gasly", "Pierre Gasly", 10, "França"),
      driver("alpine-franco-colapinto", "Franco Colapinto", 43, "Argentina"),
    ],
  },
  {
    id: "haas",
    name: "TGR Haas F1 Team",
    country: "Estados Unidos",
    base: "Kannapolis, Estados Unidos",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("haas-esteban-ocon", "Esteban Ocon", 31, "França"),
      driver("haas-oliver-bearman", "Oliver Bearman", 87, "Reino Unido"),
    ],
  },
  {
    id: "audi",
    name: "Audi Revolut F1 Team",
    country: "Alemanha",
    base: "Hinwil, Suíça",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("audi-nico-hulkenberg", "Nico Hülkenberg", 27, "Alemanha"),
      driver("audi-gabriel-bortoleto", "Gabriel Bortoleto", 5, "Brasil"),
    ],
  },
  {
    id: "williams",
    name: "Atlassian Williams",
    country: "Reino Unido",
    base: "Grove, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("williams-carlos-sainz", "Carlos Sainz", 55, "Espanha"),
      driver("williams-alex-albon", "Alexander Albon", 23, "Tailândia"),
    ],
  },
  {
    id: "aston-martin",
    name: "Aston Martin Aramco",
    country: "Reino Unido",
    base: "Silverstone, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("astonmartin-fernando-alonso", "Fernando Alonso", 14, "Espanha"),
      driver("astonmartin-lance-stroll", "Lance Stroll", 18, "Canadá"),
    ],
  },
  {
    id: "cadillac",
    name: "Cadillac Formula 1 Team",
    country: "Estados Unidos",
    base: "Silverstone, Reino Unido",
    power: 50,
    dowforce: 50,
    drivers: [
      driver("cadillac-sergio-perez", "Sergio Pérez", 11, "México"),
      driver("cadillac-valtteri-bottas", "Valtteri Bottas", 77, "Finlândia"),
    ],
  },
];
