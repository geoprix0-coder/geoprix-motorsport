import type { NationalCategory } from "./national-rules";

export const NATIONAL_COUNTRIES = [
  "Indonésia","Tuvalu","Austrália","Nova Zelândia","Brasil","Argentina","Chile","EUA","Panamá","Cuba","México","Canadá","Suécia","Rússia","Finlândia","Itália","Polônia","França","Bulgária","Reino Unido","Dinamarca","Grécia","Espanha","Chipre","Alemanha","Suíça","Hungria","Áustria","Holanda","Bélgica","Azerbaijão","Turquia","Portugal","República Tcheca","Ucrânia","Cazaquistão","Japão","Filipinas","Mongólia","Bahrein","Líbano","Tailândia","China","Índia","Coreia do Sul","Emirados Árabes Unidos","Catar","Cingapura","Arábia Saudita","Malásia","Vietnã","Irã","Kuwait","Tunísia","Senegal","África do Sul","Marrocos","Moçambique","Egito","Nigéria","Tanzânia","Angola","Jordânia"
] as const;

export const NATIONAL_CATEGORIES: NationalCategory[] = ["Nacional A","Nacional B","Nacional C"];

export function nationalChampionshipId(country: string, category: NationalCategory) {
  const countrySlug = country.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const letter = category.slice(-1).toLowerCase();
  return `national-${countrySlug}-${letter}-2026`;
}

export function getNationalChampionshipMeta(id: string) {
  const match = id.match(/^national-(.+)-([abc])-2026$/);
  if (!match) return null;
  const countrySlug = match[1];
  const country = NATIONAL_COUNTRIES.find(item =>
    item.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") === countrySlug
  );
  if (!country) return null;
  const category = NATIONAL_CATEGORIES.find(item => item.endsWith(match[2].toUpperCase()));
  if (!category) return null;
  return { country, category, name: `${country} · ${category}` };
}

export function nationalChampionshipStaticParams() {
  return NATIONAL_COUNTRIES.flatMap(country =>
    NATIONAL_CATEGORIES.map(category => ({ id: nationalChampionshipId(country, category) }))
  );
}
