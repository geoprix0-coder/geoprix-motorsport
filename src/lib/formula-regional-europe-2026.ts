import type { Team } from "./types";

const driver = (id: string, name: string, number: number, nationality: string, age: number) => ({
  id,
  name,
  number,
  nationality,
  age,
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

export const initialFormulaRegionalEuropeTeams: Team[] = [
  team("fre-rodin", "Rodin Motorsport", "Nova Zelândia", "Farnham, Reino Unido", [
    driver("fre-rodin-alex-ninovic", "Alex Ninovic", 2, "Austrália", 19),
    driver("fre-rodin-reza-seewooruthun", "Reza Seewooruthun", 4, "Reino Unido", 19),
    driver("fre-rodin-gabriel-gomez", "Gabriel Gomez", 78, "Brasil", 19),
  ]),
  team("fre-g4", "G4 Racing", "Suíça", "Montmeló, Espanha", [
    driver("fre-g4-saqer-al-maosherji", "Saqer Al-Maosherji", 3, "Kuwait", 18),
    driver("fre-g4-rahim-alibhai", "Rahim Alibhai", 23, "Estados Unidos", 16),
    driver("fre-g4-marcus-saeter", "Marcus Sæter", 67, "Noruega", 17),
  ]),
  team("fre-rpm", "RPM", "Itália", "Cerini di Gropparello, Itália", [
    driver("fre-rpm-miguel-costa", "Miguel Costa", 5, "Brasil", 17),
    driver("fre-rpm-jan-przyrowski", "Jan Przyrowski", 8, "Polônia", 17),
    driver("fre-rpm-giovanni-maschio", "Giovanni Maschio", 99, "Itália", 19),
  ]),
  team("fre-cl", "CL Motorsport", "Itália", "Bedizzole, Itália", [
    driver("fre-cl-enea-frey", "Enea Frey", 6, "Suíça", 17),
    driver("fre-cl-jules-roussel", "Jules Roussel", 24, "França", 19),
    driver("fre-cl-reno-francot", "Reno Francot", 69, "Países Baixos", 18),
  ]),
  team("fre-var", "Van Amersfoort Racing", "Países Baixos", "Zeewolde, Países Baixos", [
    driver("fre-var-andrea-dupe", "Andrea Dupé", 7, "França", 17),
    driver("fre-var-francisco-macedo", "Francisco Macedo", 11, "Portugal", 18),
    driver("fre-var-dion-gowda", "Dion Gowda", 55, "Índia", 18),
  ]),
  team("fre-race", "R-ace GP", "França", "Fontenay-le-Comte, França", [
    driver("fre-race-yuki-sano", "Yuki Sano", 12, "Japão", 19),
    driver("fre-race-rashid-al-dhaheri", "Rashid Al Dhaheri", 71, "Emirados Árabes Unidos", 18),
    driver("fre-race-emanuele-olivieri", "Emanuele Olivieri", 73, "Itália", 17),
  ]),
  team("fre-mp", "MP Motorsport", "Países Baixos", "Westmaas, Países Baixos", [
    driver("fre-mp-alexander-abkhazava", "Alexander Abkhazava", 15, "Cazaquistão", 19),
    driver("fre-mp-zhenrui-chi", "Zhenrui Chi", 28, "China", 17),
    driver("fre-mp-sebastian-wheldon", "Sebastian Wheldon", 98, "Estados Unidos", 17),
  ]),
  team("fre-art", "ART Grand Prix", "França", "Saint-Pierre-du-Perray, França", [
    driver("fre-art-kabir-anurag", "Kabir Anurag", 19, "Singapura", 18),
    driver("fre-art-matteo-giaccardi", "Mattéo Giaccardi", 27, "Mônaco", 19),
    driver("fre-art-alexandre-munoz", "Alexandre Munoz", 95, "França", 16),
  ]),
  team("fre-trident", "Trident Motorsport", "Itália", "Milão, Itália", [
    driver("fre-trident-maksimilian-popov", "Maksimilian Popov", 33, "Rússia", 17),
    driver("fre-trident-andrija-kostic", "Andrija Kostić", 47, "Sérvia", 17),
    driver("fre-trident-kai-daryanani", "Kai Daryanani", 87, "Índia", 21),
  ]),
  team("fre-prema", "Prema Racing", "Itália", "Grisignano di Zocco, Itália", [
    driver("fre-prema-kean-nakamura-berta", "Kean Nakamura-Berta", 51, "Reino Unido", 18),
    driver("fre-prema-tomass-stolcermanis", "Tomass Štolcermanis", 60, "Letônia", 18),
    driver("fre-prema-salim-hanna", "Salim Hanna", 88, "Colômbia", 16),
  ]),
];
