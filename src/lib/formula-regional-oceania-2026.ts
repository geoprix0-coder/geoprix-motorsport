import type { Team } from "./types";

const driver = (id: string, name: string, number: number, nationality: string, age = 18) => ({
  id, name, number, nationality, age,
  attributes: { racePace: 40, qualifying: 40, overtaking: 40, defending: 40, consistency: 40 },
});
const team = (id: string, name: string, country: string, base: string, drivers: ReturnType<typeof driver>[]): Team => ({
  id, name, country, base, carAttributes: { power: 30, downforce: 30 }, drivers,
});

export const initialFormulaRegionalOceaniaTeams: Team[] = [
  team("fro-mtec", "mtec Motorsport", "Nova Zelândia", "Hamilton, Nova Zelândia", [
    driver("fro-mtec-zack-scoular", "Zack Scoular", 3, "Nova Zelândia", 19),
    driver("fro-mtec-yuanpu-cui", "Yuanpu Cui", 5, "China", 18),
    driver("fro-mtec-louis-sharp", "Louis Sharp", 11, "Nova Zelândia", 18),
    driver("fro-mtec-ryan-wood", "Ryan Wood", 40, "Nova Zelândia", 22),
  ]),
  team("fro-m2", "M2 Competition", "Nova Zelândia", "Taupō, Nova Zelândia", [
    driver("fro-m2-ugo-ugochukwu", "Ugo Ugochukwu", 4, "Estados Unidos", 18),
    driver("fro-m2-sebastian-manson", "Sebastian Manson", 22, "Nova Zelândia", 20),
    driver("fro-m2-ernesto-rivera", "Ernesto Rivera", 24, "México", 17),
    driver("fro-m2-freddie-slater", "Freddie Slater", 27, "Reino Unido", 17),
  ]),
  team("fro-hitech", "Hitech", "Reino Unido", "Silverstone, Reino Unido", [
    driver("fro-hitech-jin-nakamura", "Jin Nakamura", 12, "Japão", 19),
    driver("fro-hitech-kanato-le", "Kanato Le", 19, "Japão", 19),
    driver("fro-hitech-fionn-mclaughlin", "Fionn McLaughlin", 33, "Irlanda", 18),
    driver("fro-hitech-kalle-rovanpera", "Kalle Rovanperä", 69, "Finlândia", 25),
  ]),
  team("fro-tj-speed", "TJ Speed with HMD Motorsports", "Estados Unidos", "Minnesota, Estados Unidos", [
    driver("fro-tj-speed-trevor-latourette", "Trevor LaTourette", 8, "Estados Unidos", 18),
    driver("fro-tj-speed-james-wharton", "James Wharton", 13, "Austrália", 19),
    driver("fro-tj-speed-ricardo-baptista", "Ricardo Baptista", 41, "Brasil", 18),
  ]),
  team("fro-kiwi", "Kiwi Motorsport", "Nova Zelândia", "Cresson, Texas, Estados Unidos", [
    driver("fro-kiwi-cooper-shipman-slot", "Agente livre (substituição automática)", 14, "—", 18),
    driver("fro-kiwi-yev-an-david", "Yevan David", 21, "Sri Lanka", 19),
  ]),
  team("fro-giles", "Giles Motorsport", "Nova Zelândia", "Taupō, Nova Zelândia", [
    driver("fro-giles-jack-taylor", "Jack Taylor", 50, "Austrália", 19),
    driver("fro-giles-nolan-allaer", "Nolan Allaer", 52, "Estados Unidos", 19),
  ]),
];
