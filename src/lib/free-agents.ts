import type { Driver, Team } from "./types";
import { initialTeamsForChampionship, mergeInitialTeams, teamStorageKey } from "./championship-data";
import { initializeDriverContracts, type MarketEvent, type MarketContract } from "./market";
import { getRetiredDrivers } from "./retirement";
import { getCareerStatus, registerF3Debuts } from "./career-hierarchy";

export const FREE_AGENTS_KEY = "geoprix-free-agents-v1";
export const FREE_AGENTS_MINIMUM = 10;

type NameSet = { first: string[]; last: string[]; weight: number };
const nameSets: Record<string, NameSet> = {
  "Brasil": { weight: 9, first: ["João","Pedro","Gabriel","Lucas","Felipe","Matheus","Enzo","Rafael","Bruno","Caio","Arthur","Davi"], last: ["Silva","Oliveira","Costa","Souza","Pereira","Almeida","Ribeiro","Carvalho","Ferreira","Santos","Barbosa","Nascimento"] },
  "Reino Unido": { weight: 8, first: ["Oliver","Jack","Harry","George","Arthur","Thomas","William","James","Theo","Edward","Freddie","Charlie"], last: ["Smith","Jones","Taylor","Brown","Wilson","Davies","Evans","Wright","Clarke","Bennett","Walker","Hughes"] },
  "Itália": { weight: 7, first: ["Luca","Matteo","Lorenzo","Andrea","Marco","Alessandro","Francesco","Riccardo","Tommaso","Giovanni","Federico","Niccolò"], last: ["Rossi","Bianchi","Ferrari","Romano","Ricci","Marino","Greco","Conti","Esposito","Gallo","Costa","Moretti"] },
  "França": { weight: 7, first: ["Théo","Jules","Lucas","Hugo","Enzo","Arthur","Louis","Gabriel","Nathan","Mathis","Raphaël","Noah"], last: ["Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau","Simon","Laurent"] },
  "Alemanha": { weight: 6, first: ["Leon","Paul","Felix","Jonas","Finn","Elias","Max","Moritz","Tim","Luca","Ben","Anton"], last: ["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Hoffmann","Schäfer","Koch","Richter"] },
  "Espanha": { weight: 6, first: ["Alejandro","Carlos","Javier","Daniel","Hugo","Pablo","Álvaro","Marcos","Sergio","Diego","Adrián","Mario"], last: ["García","Rodríguez","González","Fernández","López","Martínez","Sánchez","Pérez","Gómez","Ruiz","Díaz","Moreno"] },
  "Japão": { weight: 5, first: ["Haruto","Yuto","Sota","Ren","Kaito","Takumi","Riku","Yuki","Daiki","Shun","Minato","Itsuki"], last: ["Sato","Suzuki","Takahashi","Tanaka","Watanabe","Ito","Yamamoto","Nakamura","Kobayashi","Kato","Yoshida","Yamada"] },
  "Países Baixos": { weight: 4, first: ["Daan","Sem","Lucas","Finn","Bram","Milan","Thijs","Lars","Mees","Jens","Stijn","Niels"], last: ["de Vries","Jansen","van den Berg","Bakker","Visser","Smit","de Jong","Bos","Vos","van Dijk","Mulder","de Boer"] },
  "Austrália": { weight: 4, first: ["Jack","Cooper","Thomas","Lachlan","Noah","William","James","Oliver","Charlie","Henry","Mason","Ethan"], last: ["Smith","Brown","Wilson","Taylor","Anderson","Walker","Thompson","White","Harris","Martin","Ryan","Campbell"] },
  "Argentina": { weight: 4, first: ["Mateo","Bautista","Santiago","Thiago","Joaquín","Benjamín","Tomás","Lautaro","Felipe","Franco","Valentino","Dante"], last: ["González","Rodríguez","Gómez","Fernández","López","Martínez","Pérez","Sánchez","Romero","Díaz","Álvarez","Torres"] },
  "Estados Unidos": { weight: 4, first: ["Ethan","Mason","Logan","Caleb","Owen","Carter","Wyatt","Grayson","Jackson","Luke","Hudson","Levi"], last: ["Johnson","Miller","Davis","Wilson","Anderson","Thomas","Moore","Martin","Thompson","White","Clark","Lewis"] },
  "México": { weight: 3, first: ["Santiago","Emiliano","Mateo","Diego","Sebastián","Leonardo","Gael","Nicolás","Daniel","Andrés","Iker","Pablo"], last: ["Hernández","García","Martínez","López","González","Pérez","Rodríguez","Sánchez","Ramírez","Cruz","Flores","Reyes"] },
  "Nova Zelândia": { weight: 3, first: ["Liam","Finn","Jack","Oliver","Mason","Noah","Leo","Theo","Arlo","Max","Ethan","Blake"], last: ["Wilson","Taylor","Brown","Anderson","Thompson","Clark","Walker","Robinson","Harris","Mitchell","Campbell","Young"] },
  "Finlândia": { weight: 3, first: ["Eetu","Elias","Onni","Leo","Väinö","Aaro","Emil","Toivo","Oliver","Niilo","Jooa","Lauri"], last: ["Korhonen","Virtanen","Mäkinen","Nieminen","Mäkelä","Hämäläinen","Laine","Heikkinen","Koskinen","Järvinen","Lehtonen","Aalto"] },
  "Portugal": { weight: 2, first: ["João","Francisco","Afonso","Duarte","Martim","Miguel","Tomás","Tiago","Rodrigo","Guilherme","Diogo","Rafael"], last: ["Silva","Santos","Ferreira","Pereira","Costa","Oliveira","Rodrigues","Martins","Sousa","Fernandes","Gomes","Lopes"] },
  "Dinamarca": { weight: 2, first: ["William","Noah","Oscar","Lucas","Carl","Emil","Victor","Magnus","Frederik","Alfred","Elias","Malthe"], last: ["Nielsen","Jensen","Hansen","Pedersen","Andersen","Christensen","Larsen","Sørensen","Rasmussen","Jørgensen","Petersen","Madsen"] },
  "Suécia": { weight: 2, first: ["William","Hugo","Oscar","Elias","Leo","Alexander","Theo","Axel","Ludvig","Oliver","Viggo","Albin"], last: ["Andersson","Johansson","Karlsson","Nilsson","Eriksson","Larsson","Olsson","Persson","Svensson","Gustafsson","Pettersson","Jonsson"] },
  "Bélgica": { weight: 2, first: ["Louis","Arthur","Jules","Lucas","Noah","Mathis","Milan","Victor","Thomas","Leon","Nathan","Mats"], last: ["Peeters","Janssens","Maes","Jacobs","Mertens","Willems","Claes","Goossens","Wouters","De Smet","Dubois","Lambert"] },
  "Canadá": { weight: 2, first: ["Liam","Noah","Ethan","Lucas","Benjamin","Jack","Owen","Logan","William","Thomas","Nathan","Jacob"], last: ["Smith","Brown","Tremblay","Martin","Roy","Wilson","MacDonald","Gagnon","Johnson","Taylor","Côté","Bouchard"] },
  "China": { weight: 2, first: ["Wei","Jun","Hao","Ming","Chen","Lei","Yifan","Zhen","Kai","Tao","Bo","Jian"], last: ["Wang","Li","Zhang","Liu","Chen","Yang","Huang","Zhao","Wu","Zhou","Xu","Sun"] },
  "África do Sul": { weight: 1, first: ["Liam","Ethan","Noah","Joshua","Daniel","Luke","Caleb","Matthew","James","Benjamin","Aiden","Ruan"], last: ["van der Merwe","Botha","van Wyk","Nel","Coetzee","du Plessis","Smit","Venter","Pretorius","Jacobs","Meyer","Fourie"] },
  "Coreia do Sul": { weight: 1, first: ["Min-jun","Seo-jun","Do-yun","Ji-ho","Ha-jun","Jun-seo","Si-woo","Yu-jun","Ji-hu","Eun-woo"], last: ["Kim","Lee","Park","Choi","Jung","Kang","Cho","Yoon","Jang","Lim"] },
  "Índia": { weight: 1, first: ["Aarav","Arjun","Vihaan","Aditya","Reyansh","Ishaan","Kabir","Rohan","Dev","Shaurya"], last: ["Sharma","Patel","Singh","Kumar","Mehta","Shah","Gupta","Reddy","Nair","Iyer"] },
  "Suíça": { weight: 1, first: ["Luca","Noah","Leon","Elias","Matteo","Julian","Finn","Nico","Tim","David"], last: ["Müller","Meier","Schmid","Keller","Weber","Schneider","Fischer","Baumann","Gerber","Frei"] },
  "Polônia": { weight: 1, first: ["Jakub","Kacper","Antoni","Szymon","Jan","Filip","Aleksander","Mateusz","Wojciech","Piotr"], last: ["Nowak","Kowalski","Wiśniewski","Wójcik","Kamiński","Lewandowski","Zieliński","Szymański","Woźniak","Dąbrowski"] }
};

const choose = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];
function chooseNationality(): string {
  const entries = Object.entries(nameSets);
  const total = entries.reduce((sum, [, value]) => sum + value.weight, 0);
  let pick = Math.random() * total;
  for (const [country, value] of entries) {
    pick -= value.weight;
    if (pick < 0) return country;
  }
  return entries[0][0];
}
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();

function readTeams(championshipId: string): Team[] {
  try {
    const raw = localStorage.getItem(teamStorageKey(championshipId));
    const parsed = raw ? JSON.parse(raw) : initialTeamsForChampionship(championshipId);
    return mergeInitialTeams(championshipId, Array.isArray(parsed) ? parsed : []);
  } catch {
    return initialTeamsForChampionship(championshipId);
  }
}

export function readFreeAgents(): Driver[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(FREE_AGENTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ensureFreeAgentPool(minimum = FREE_AGENTS_MINIMUM): Driver[] {
  let f2Contracts:{driverId:string}[]=[];try{const parsed=JSON.parse(localStorage.getItem("geoprix-driver-contracts-formula-2-2026-v1")||"[]");f2Contracts=Array.isArray(parsed)?parsed:[]}catch{}
  const f2DebutIds=new Set([...getCareerStatus().filter(item=>item.firstF2Season||item.firstF1Season).map(item=>item.driverId),...f2Contracts.map(item=>item.driverId),...f2Teams.flatMap(team=>team.drivers.map(driver=>driver.id))]);
  const agents = readFreeAgents().filter(agent=>!f2DebutIds.has(agent.id));
  const f2Teams = readTeams("formula-2-2026");
  const f3Teams = readTeams("formula-3-2026");
  const f1Teams = readTeams("formula-1-2026");
  const existingDrivers = [...f1Teams, ...f2Teams, ...f3Teams].flatMap(team => team.drivers || []);
  let f2FreeAgents:Driver[]=[];try{const parsed=JSON.parse(localStorage.getItem("geoprix-f2-free-agents-v1")||"[]");f2FreeAgents=Array.isArray(parsed)?parsed:[]}catch{}
  const usedNames = new Set([...existingDrivers.map(driver => normalize(driver.name)), ...f2FreeAgents.map(driver=>normalize(driver.name)), ...agents.map(driver => normalize(driver.name)), ...getRetiredDrivers().map(driver => normalize(driver.driverName))]);
  const usedNumbers = new Set([...f2Teams.flatMap(team => team.drivers || []).map(driver => driver.number), ...f3Teams.flatMap(team => team.drivers || []).map(driver => driver.number), ...agents.map(driver => driver.number)]);
  const next = [...agents];

  while (next.length < minimum) {
    const nationality = chooseNationality();
    const names = nameSets[nationality];
    let name = "";
    for (let attempt = 0; attempt < 100; attempt++) {
      const candidate = choose(names.first) + " " + choose(names.last);
      if (!usedNames.has(normalize(candidate))) {
        name = candidate;
        break;
      }
    }
    if (!name) {
      const candidate = choose(names.first) + " " + choose(names.last) + " " + choose(names.last);
      if (usedNames.has(normalize(candidate))) continue;
      name = candidate;
    }
    const availableNumbers = Array.from({ length: 98 }, (_, index) => index + 2).filter(number => !usedNumbers.has(number));
    if (!availableNumbers.length) break;
    const number = choose(availableNumbers);
    const agePool = [16,16,17,17,17,18,18,18,19,19,20,20];
    const baseline = 60;
    const driver: Driver = {
      id: "free-" + crypto.randomUUID(),
      name,
      number,
      nationality,
      age: choose(agePool),
      attributes: { racePace: baseline, qualifying: baseline, overtaking: baseline, defending: baseline, consistency: baseline }
    };
    next.push(driver);
    usedNames.add(normalize(name));
    usedNumbers.add(number);
  }

  localStorage.setItem(FREE_AGENTS_KEY, JSON.stringify(next));
  return next;
}

export function replaceF3SeedVacancy(teams:Team[],season:number):Team[]{
 const vacancy=teams.flatMap(team=>team.drivers.map(driver=>({team,driver}))).find(item=>item.driver.id==="f3-var-yamakoshi-replacement");
 if(!vacancy)return teams;
 const pool=ensureFreeAgentPool(FREE_AGENTS_MINIMUM);const agent=pool[0];if(!agent)return teams;
 const replacement={...agent,id:"f3-var-free-agent-"+agent.id.replace(/[^a-zA-Z0-9-]/g,""),number:13};
 const next=teams.map(team=>team.id===vacancy.team.id?{...team,drivers:team.drivers.map(driver=>driver.id===vacancy.driver.id?replacement:driver)}:team);
 localStorage.setItem(teamStorageKey("formula-3-2026"),JSON.stringify(next));
 localStorage.setItem(FREE_AGENTS_KEY,JSON.stringify(pool.slice(1)));
 initializeDriverContracts(next,season,"formula-3-2026");
 window.dispatchEvent(new Event("geoprix-free-agents-updated"));
 return next;
}

export function hireFreeAgent(driverId: string, teamId: string, season: number): { ok: boolean; message: string } {
  const agents = readFreeAgents();
  const driver = agents.find(item => item.id === driverId);
  if (!driver) return { ok: false, message: "Este agente livre não está mais disponível." };
  const f2Teams = readTeams("formula-3-2026");
  const target = f2Teams.find(team => team.id === teamId);
  if (!target) return { ok: false, message: "Selecione uma equipe válida da Formula 3." };
  if (f2Teams.some(team => team.drivers.some(item => item.id === driver.id))) return { ok: false, message: "Este piloto já está vinculado à Formula 3." };
  const f2Ids=new Set([...readTeams("formula-2-2026").flatMap(team=>team.drivers.map(item=>item.id)),...initialTeamsForChampionship("formula-2-2026").flatMap(team=>team.drivers.map(item=>item.id))]);
  if(f2Ids.has(driver.id)||getCareerStatus().some(item=>item.driverId===driver.id&&(item.firstF2Season||item.firstF1Season)))return {ok:false,message:"Pilotos que já estrearam na Formula 2 não podem retornar à Formula 3."};
  if(target.drivers.length>=3)return {ok:false,message:"Cada equipe da Formula 3 possui exatamente 3 vagas."};
  if (f2Teams.some(team => team.drivers.some(item => item.number === driver.number))) return { ok: false, message: "O número deste piloto já está em uso na Formula 3." };

  const updated = f2Teams.map(team => team.id === teamId ? { ...team, drivers: [...team.drivers, driver] } : team);
  localStorage.setItem(teamStorageKey("formula-3-2026"), JSON.stringify(updated));
  registerF3Debuts([driver],season);
  initializeDriverContracts(updated, season, "formula-3-2026");
  localStorage.setItem(FREE_AGENTS_KEY, JSON.stringify(agents.filter(item => item.id !== driverId)));
  ensureFreeAgentPool(FREE_AGENTS_MINIMUM);
  window.dispatchEvent(new Event("geoprix-rosters-updated"));
  window.dispatchEvent(new Event("geoprix-free-agents-updated"));
  return { ok: true, message: driver.name + " foi contratado por " + target.name + " na Formula 3." };
}


export function automaticallyFillF3Vacancies(season: number, standings: {id:string;name:string;position:number;points:number}[] = []): { teams: Team[]; signings: MarketEvent[] } {
  const championshipId = "formula-3-2026";
  const teams = readTeams(championshipId).map(team => ({ ...team, drivers: [...(team.drivers || [])] }));
  const eventKey = "geoprix-market-history-" + championshipId + "-v1";
  let previousEvents: MarketEvent[] = [];
  try { const parsed = JSON.parse(localStorage.getItem(eventKey) || "[]"); previousEvents = Array.isArray(parsed) ? parsed : []; } catch {}
  const releasedThisWindow = new Set(previousEvents.filter(event => event.season === season && event.type === "release").map(event => event.driverId));
  const allAgents = readFreeAgents();
  let f2Contracts:{driverId:string}[]=[];try{const parsed=JSON.parse(localStorage.getItem("geoprix-driver-contracts-formula-2-2026-v1")||"[]");f2Contracts=Array.isArray(parsed)?parsed:[]}catch{}
  const f2DebutIds=new Set([...getCareerStatus().filter(item=>item.firstF2Season||item.firstF1Season).map(item=>item.driverId),...f2Contracts.map(item=>item.driverId),...readTeams("formula-2-2026").flatMap(team=>team.drivers.map(driver=>driver.id)),...initialTeamsForChampionship("formula-2-2026").flatMap(team=>team.drivers.map(driver=>driver.id))]);
  let agents = allAgents.filter(agent => !releasedThisWindow.has(agent.id)&&!f2DebutIds.has(agent.id)&&!teams.some(team=>team.drivers.some(driver=>driver.id===agent.id)));
  const contracts = initializeDriverContracts(teams, season, championshipId);
  const agentScore = (driver:Driver) => {
    const attributes = Object.values(driver.attributes || {racePace:60,qualifying:60,overtaking:60,defending:60,consistency:60});
    const average = attributes.reduce((sum,value) => sum + (Number(value) || 60),0) / Math.max(1,attributes.length);
    const age = Number(driver.age) || 18;
    const ageFit = age <= 17 ? 100 : age <= 19 ? 90 : age <= 20 ? 75 : 20;
    const contract = contracts.find(item => item.driverId === driver.id);
    const experience = Math.max(0,season - (contract?.startSeason ?? season));
    const experienceFit = experience >= 3 ? 100 : experience === 2 ? 80 : experience === 1 ? 60 : 40;
    return average * 0.65 + ageFit * 0.25 + experienceFit * 0.1;
  };
  agents.sort((a,b) => agentScore(b) - agentScore(a));
  const signings: MarketEvent[] = [];
  const rank = new Map(standings.map(row => [row.id, row.position]));
  const orderedTeams = [...teams].sort((a, b) =>
    (rank.get(b.id) ?? teams.length + 1) - (rank.get(a.id) ?? teams.length + 1) || a.name.localeCompare(b.name)
  );

  for (const team of orderedTeams) {
    while (team.drivers.length < 3 && agents.length > 0) {
      const availableIndex = agents.findIndex(candidate => !teams.some(other => other.drivers.some(existing => existing.number === candidate.number)));
      if (availableIndex < 0) break;
      const driver = agents.splice(availableIndex, 1)[0];
      team.drivers.push(driver);
      signings.push({
        id: crypto.randomUUID(),
        season,
        type: "signing",
        driverId: driver.id,
        driverName: driver.name,
        fromTeamId: "free-agents",
        fromTeamName: "Agente livre",
        toTeamId: team.id,
        toTeamName: team.name,
        contractEnd: season + 1,
        reason: driver.id.startsWith("free-") ? "Contratação automática para preencher uma vaga no grid da Formula 3. O piloto foi selecionado do banco de jovens talentos." : "Retorno automático ao grid da Formula 3, permitido apenas para pilotos sem estreia na Formula 2.",
        createdAt: new Date().toISOString()
      });
    }
  }

  if (signings.length) {
    localStorage.setItem(teamStorageKey(championshipId), JSON.stringify(teams));
    registerF3Debuts(signings.map(event=>teams.flatMap(team=>team.drivers).find(driver=>driver.id===event.driverId)).filter((driver):driver is Driver=>Boolean(driver)),season);
    const contracts: MarketContract[] = initializeDriverContracts(teams, season, championshipId);
    const signedIds = new Set(signings.map(event => event.driverId));
    for (const contract of contracts) {
      if (signedIds.has(contract.driverId)) {
        contract.startSeason = season;
        contract.endSeason = season + 1;
        contract.status = "active";
      }
    }
    localStorage.setItem("geoprix-driver-contracts-" + championshipId + "-v1", JSON.stringify(contracts));
    localStorage.setItem(eventKey, JSON.stringify([...previousEvents, ...signings]));
    localStorage.setItem(FREE_AGENTS_KEY, JSON.stringify(allAgents.filter(agent => !signedIds.has(agent.id))));
    ensureFreeAgentPool(FREE_AGENTS_MINIMUM);
    window.dispatchEvent(new Event("geoprix-rosters-updated"));
    window.dispatchEvent(new Event("geoprix-free-agents-updated"));
  }
  return { teams, signings };
}
