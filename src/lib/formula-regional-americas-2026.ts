import type { Team } from "./types";

const driver = (id: string, name: string, number: number, nationality: string, age?: number) => ({
  id,
  name,
  number,
  nationality,
  ...(age === undefined ? {} : { age }),
  attributes: { racePace: 40, qualifying: 40, overtaking: 40, defending: 40, consistency: 40 },
});

const team = (id: string, name: string, country: string, base: string, drivers: ReturnType<typeof driver>[]): Team => ({
  id,
  name,
  country,
  base,
  carAttributes: { power: 30, downforce: 30 },
  drivers,
});

export const initialFormulaRegionalAmericasTeams: Team[] = [
  team("fra-toney", "Toney Driver Development", "Estados Unidos", "Estados Unidos", [
    driver("fra-toney-luke-powers", "Luke Powers", 5, "Estados Unidos"),
    driver("fra-toney-christian-bogle", "Christian Bogle", 7, "Estados Unidos", 25),
    driver("fra-toney-brady-golan", "Brady Golan", 40, "Estados Unidos / Israel", 18),
  ]),
  team("fra-crosslink", "Crosslink Motorsports", "Estados Unidos", "Cresson, Texas, Estados Unidos", [
    driver("fra-crosslink-alex-bobadilla", "Alejandro (Alex) Bobadilla", 8, "México"),
    driver("fra-crosslink-barrett-wolfe", "Barrett Wolfe", 13, "Estados Unidos", 22),
    driver("fra-crosslink-aidan-schuh", "Aidan Schuh", 14, "Estados Unidos", 22),
    driver("fra-crosslink-kevin-janzen", "Kevin Janzen", 24, "Canadá", 60),
    driver("fra-crosslink-kekai-haunio", "Kekai Hauanio", 29, "Estados Unidos", 19),
    driver("fra-crosslink-evagoras-papasavvas", "Evagoras Papasavvas", 71, "Chipre / Estados Unidos", 18),
  ]),
  team("fra-kiwi", "Kiwi Motorsport", "Nova Zelândia", "Cresson, Texas, Estados Unidos", [
    driver("fra-kiwi-harbir-dass", "Harbir Dass", 9, "Estados Unidos", 21),
    driver("fra-kiwi-cooper-shipman", "Cooper Shipman", 84, "Estados Unidos", 18),
  ]),
  team("fra-hillenburg", "Hillenburg Motorsports", "Estados Unidos", "Alvin, Texas, Estados Unidos", [
    driver("fra-hillenburg-whitney-strickland", "Whitney Strickland", 21, "Estados Unidos", 57),
    driver("fra-hillenburg-eric-wisniewski", "Eric Wiśniewski", 25, "Estados Unidos", 18),
  ]),
  team("fra-atlantic", "Atlantic Racing Team", "Canadá", "Halifax, Nova Scotia, Canadá", [
    driver("fra-atlantic-jake-pollack", "Jake Pollack", 77, "Estados Unidos", 19),
    driver("fra-atlantic-james-lawley", "James Lawley", 88, "Canadá", 22),
  ]),
  team("fra-mlt", "MLT Motorsports", "Estados Unidos", "Braselton, Georgia, Estados Unidos", [
    driver("fra-mlt-jonathan-cottrill", "Jonathan Cottrill", 75, "Estados Unidos", 18),
  ]),
  team("fra-momentum", "Momentum Motorsports", "Estados Unidos", "Kershaw, Carolina do Sul, Estados Unidos", [
    driver("fra-momentum-anthony-autiello", "Anthony Autiello", 7, "Estados Unidos", 43),
  ]),
];
