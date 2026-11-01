import type { Team } from "./types";

const driver = (id: string, name: string, number: number, nationality: string, age: number) => ({
  id,
  name,
  number,
  nationality,
  age,
  attributes: { racePace: 60, qualifying: 60, overtaking: 60, defending: 60, consistency: 60 },
});

export const initialFormula2Teams: Team[] = [
  {
    id: "f2-invicta",
    name: "Invicta Racing",
    country: "Reino Unido",
    base: "Sleaford, Reino Unido",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-invicta-rafael-camara", "Rafael Câmara", 1, "Brasil", 20),
      driver("f2-invicta-joshua-durksen", "Joshua Dürksen", 2, "Paraguai", 22),
    ],
  },
  {
    id: "f2-hitech",
    name: "Hitech TGR",
    country: "Reino Unido",
    base: "Silverstone, Reino Unido",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-hitech-ritomo-miyata", "Ritomo Miyata", 3, "Japão", 26),
      driver("f2-hitech-colton-herta", "Colton Herta", 4, "Estados Unidos", 25),
    ],
  },
  {
    id: "f2-campos",
    name: "Campos Racing",
    country: "Espanha",
    base: "Alzira, Espanha",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-campos-noel-leon", "Noel León", 5, "México", 21),
      driver("f2-campos-nikola-tsolov", "Nikola Tsolov", 6, "Bulgária", 19),
    ],
  },
  {
    id: "f2-dams",
    name: "DAMS Lucas Oil",
    country: "França",
    base: "Le Mans, França",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-dams-dino-beganovic", "Dino Beganovic", 7, "Suécia", 22),
      driver("f2-dams-roman-bilinski", "Roman Bilinski", 8, "Polônia", 22),
    ],
  },
  {
    id: "f2-mp",
    name: "MP Motorsport",
    country: "Países Baixos",
    base: "Westmaas, Países Baixos",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-mp-gabriele-mini", "Gabriele Minì", 9, "Itália", 20),
      driver("f2-mp-oliver-goethe", "Oliver Goethe", 10, "Alemanha", 21),
    ],
  },
  {
    id: "f2-prema",
    name: "PREMA Racing",
    country: "Itália",
    base: "Grisignano di Zocco, Itália",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-prema-sebastian-montoya", "Sebastián Montoya", 11, "Colômbia", 20),
      driver("f2-prema-mari-boya", "Mari Boya", 12, "Espanha", 21),
    ],
  },
  {
    id: "f2-rodin",
    name: "Rodin Motorsport",
    country: "Nova Zelândia",
    base: "Farnham, Reino Unido",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-rodin-martinius-stenshorne", "Martinius Stenshorne", 14, "Noruega", 20),
      driver("f2-rodin-alexander-dunne", "Alexander Dunne", 15, "Irlanda", 20),
    ],
  },
  {
    id: "f2-art",
    name: "ART Grand Prix",
    country: "França",
    base: "Villeneuve-la-Guyard, França",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-art-kush-maini", "Kush Maini", 16, "Índia", 25),
      driver("f2-art-tasanapol", "Tasanapol Inthraphuvasak", 17, "Tailândia", 20),
    ],
  },
  {
    id: "f2-aix",
    name: "AIX Racing",
    country: "Emirados Árabes Unidos",
    base: "Dubai, Emirados Árabes Unidos",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-aix-emerson-fittipaldi", "Emerson Fittipaldi Jr.", 20, "Brasil", 19),
      driver("f2-aix-cian-shields", "Cian Shields", 21, "Reino Unido", 20),
    ],
  },
  {
    id: "f2-var",
    name: "Van Amersfoort Racing",
    country: "Países Baixos",
    base: "Zeewolde, Países Baixos",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-var-hiyu-yamakoshi", "Hiyu Yamakoshi", 22, "Japão", 18),
      driver("f2-var-rafael-villagomez", "Rafael Villagómez", 23, "México", 24),
    ],
  },
  {
    id: "f2-trident",
    name: "TRIDENT",
    country: "Itália",
    base: "Ossona, Itália",
    carAttributes: { power: 60, downforce: 60 },
    drivers: [
      driver("f2-trident-laurens-van-hoepen", "Laurens van Hoepen", 24, "Países Baixos", 20),
      driver("f2-trident-john-bennett", "John Bennett", 25, "Reino Unido", 22),
    ],
  },
];
