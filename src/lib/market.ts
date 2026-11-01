import type { Team } from "./types";

export type MarketContract={driverId:string;teamId:string;startSeason:number;endSeason:number;endLabel?:string;status:"active"|"expired"};
const initialContractYears:Record<string,{year:number;label:string}>={
 "lando norris":{year:2030,label:"2030"},"oscar piastri":{year:2028,label:"2028"},
 "george russell":{year:2027,label:"2027"},"kimi antonelli":{year:2026,label:"2026"},
 "max verstappen":{year:2030,label:"2030"},"isack hadjar":{year:2027,label:"2027"},
 "charles leclerc":{year:2030,label:"2030+"},"lewis hamilton":{year:2027,label:"2027"},
 "alexander albon":{year:2027,label:"2027"},"carlos sainz":{year:2028,label:"2028"},
 "liam lawson":{year:2026,label:"2026"},"arvid lindblad":{year:2026,label:"2026"},
 "fernando alonso":{year:2027,label:"2027"},"lance stroll":{year:2027,label:"2027"},
 "esteban ocon":{year:2026,label:"2026"},"oliver bearman":{year:2026,label:"2026"},
 "nico hülkenberg":{year:2027,label:"2027"},"gabriel bortoleto":{year:2027,label:"2027"},
 "pierre gasly":{year:2028,label:"2028"},"franco colapinto":{year:2027,label:"2027"},
 "valtteri bottas":{year:2027,label:"2027"},"sergio pérez":{year:2029,label:"2029"}
};
function marketStorageKey(kind:"contracts"|"events",championshipId:string){
 if(championshipId==="formula-1-2026")return kind==="contracts"?"geoprix-driver-contracts-v1":"geoprix-market-history-v1";
 return kind==="contracts"?"geoprix-driver-contracts-"+championshipId+"-v1":"geoprix-market-history-"+championshipId+"-v1";
}
export function initializeDriverContracts(teams:Team[],season=2026,championshipId="formula-1-2026"){
 const key=marketStorageKey("contracts",championshipId);
 const stored:MarketContract[]=JSON.parse(localStorage.getItem(key)||"[]");
 const byId=new Map(stored.map(c=>[c.driverId,c]));
 for(const team of teams)for(const driver of team.drivers){
  if(byId.has(driver.id))continue;
  const initial=initialContractYears[driver.name.trim().toLocaleLowerCase("pt-BR")];
  const contract:MarketContract=initial
   ?{driverId:driver.id,teamId:team.id,startSeason:season,endSeason:initial.year,endLabel:initial.label,status:"active"}
   :{driverId:driver.id,teamId:team.id,startSeason:season,endSeason:season+1,status:"active"};
  stored.push(contract);byId.set(driver.id,contract);
 }
 localStorage.setItem(key,JSON.stringify(stored));
 return stored;
}
export function getContractEndLabel(contract:MarketContract){return contract.endLabel||String(contract.endSeason);}

export type MarketEvent={id:string;season:number;type:"transfer"|"renewal";driverId:string;driverName:string;fromTeamId:string;fromTeamName:string;toTeamId:string;toTeamName:string;contractEnd:number;reason:string;createdAt:string};
type Standing={id:string;name:string;position:number;points:number};
function hash(value:string){let h=0;for(let i=0;i<value.length;i++)h=(h*31+value.charCodeAt(i))>>>0;return h;}
export function runAutomaticMarket(teams:Team[],season:number,driverStandings:Standing[],teamStandings:Standing[],championshipId="formula-1-2026"){
 const contractKey=marketStorageKey("contracts",championshipId),eventKey=marketStorageKey("events",championshipId),processedKey="geoprix-market-processed-"+championshipId+"-"+season;
 if(localStorage.getItem(processedKey))return {teams,events:[] as MarketEvent[],alreadyProcessed:true};
 const contracts:MarketContract[]=initializeDriverContracts(teams,season,championshipId);
 const events:MarketEvent[]=JSON.parse(localStorage.getItem(eventKey)||"[]");
 const history=JSON.parse(localStorage.getItem("geoprix-season-history-"+championshipId)||"[]") as {season:number;driverStandings:Standing[]}[];
 const seasonTables=[driverStandings,...[season-1,season-2].map(year=>history.find(x=>x.season===year)?.driverStandings||[])];
 const teamRank=new Map(teamStandings.map(x=>[x.id,x.position]));
 const teamPosition=(id:string)=>teamRank.get(id)??teams.length+1;
 const allDrivers=teams.flatMap(t=>t.drivers.map(d=>({driver:d,team:t})));
 for(const item of allDrivers)if(!contracts.some(c=>c.driverId===item.driver.id)){
  const duration=hash(item.driver.id)%3;
  contracts.push({driverId:item.driver.id,teamId:item.team.id,startSeason:season-1,endSeason:season+duration,status:"active"});
 }
 const rankScore=(table:Standing[],id:string)=>{
  if(!table.length)return 50;
  const row=table.find(x=>x.id===id);
  if(!row)return 50;
  return table.length===1?75:100*(1-(row.position-1)/(table.length-1));
 };
 const performanceScore=(id:string)=>rankScore(seasonTables[0],id)*.5+rankScore(seasonTables[1],id)*.3+rankScore(seasonTables[2],id)*.2;
 const teammateScore=(id:string,team:Team)=>{
  const comparisons=seasonTables.map(table=>{
   if(!table.length)return 50;
   const own=table.find(x=>x.id===id);
   const partner=team.drivers.filter(d=>d.id!==id).map(d=>table.find(x=>x.id===d.id)).filter(Boolean).sort((a,b)=>a!.position-b!.position)[0];
   if(!own||!partner)return 50;
   return own.position<partner.position?75:own.position>partner.position?25:50;
  });
  return comparisons[0]*.5+comparisons[1]*.3+comparisons[2]*.2;
 };
 const ageValue=(age:number)=>age<=23?2:age<=27?1:age<=32?0:age<=36?-1:-2;
 const candidates=allDrivers.map(x=>{
  const contract=contracts.find(c=>c.driverId===x.driver.id)!;
  const age=Number(x.driver.age)||25;
  const performance=performanceScore(x.driver.id);
  const comparison=teammateScore(x.driver.id,x.team);
  const score=performance*.75+comparison*.25+ageValue(age);
  return {...x,contract,performance,comparison,score,teamPosition:teamPosition(x.team.id)};
 }).filter(x=>x.contract.endSeason<=season&&x.contract.status==="active");
 const pairGap=(team:Team)=>{
  if(team.drivers.length<2)return 100;
  const values=team.drivers.map(d=>performanceScore(d.id));
  return Math.abs(values[0]-values[1]);
 };
 const transfers:{a:typeof candidates[number];b:typeof candidates[number]}[]=[];
 const usedDrivers=new Set<string>(),usedTeams=new Set<string>();
 // Teams compare available expiring drivers, but require a meaningful gain to justify disrupting a stable pairing.
 for(const candidate of [...candidates].sort((a,b)=>b.score-a.score)){
  if(usedDrivers.has(candidate.driver.id)||usedTeams.has(candidate.team.id))continue;
  const partner=candidates.filter(other=>other.team.id!==candidate.team.id&&!usedDrivers.has(other.driver.id)&&!usedTeams.has(other.team.id)&&
   Math.abs(other.teamPosition-candidate.teamPosition)>=2&&
   ((candidate.teamPosition<other.teamPosition&&candidate.score>other.score)||(candidate.teamPosition>other.teamPosition&&candidate.score<other.score)))
   .sort((a,b)=>Math.abs(b.teamPosition-candidate.teamPosition)-Math.abs(a.teamPosition-candidate.teamPosition))[0];
  if(!partner)continue;
  const stronger=candidate.teamPosition<partner.teamPosition?candidate:partner;
  const weaker=candidate.teamPosition<partner.teamPosition?partner:candidate;
  const stabilityGap=Math.max(pairGap(stronger.team),pairGap(weaker.team));
  const requiredGain=stabilityGap>=18?7:stabilityGap>=12?10:15;
  if(stronger.score-weaker.score>=requiredGain){
   transfers.push({a:stronger,b:weaker});
   usedDrivers.add(stronger.driver.id);usedDrivers.add(weaker.driver.id);
   usedTeams.add(stronger.team.id);usedTeams.add(weaker.team.id);
  }
 }
 const nextTeams=teams.map(t=>({...t,drivers:[...t.drivers]}));
 for(const pair of transfers){
  const aTeam=nextTeams.find(t=>t.id===pair.a.team.id)!;
  const bTeam=nextTeams.find(t=>t.id===pair.b.team.id)!;
  const ai=aTeam.drivers.findIndex(d=>d.id===pair.a.driver.id),bi=bTeam.drivers.findIndex(d=>d.id===pair.b.driver.id);
  if(ai<0||bi<0)continue;
  aTeam.drivers[ai]=pair.b.driver;bTeam.drivers[bi]=pair.a.driver;
  for(const x of [pair.a,pair.b]){
   const target=x===pair.a?bTeam:aTeam;
   const contract=contracts.find(c=>c.driverId===x.driver.id)!;
   contract.teamId=target.id;contract.startSeason=season;contract.endSeason=season+1+(hash(x.driver.id+season)%3);contract.endLabel=String(contract.endSeason);contract.status="active";
   events.push({id:crypto.randomUUID(),season,type:"transfer",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:target.id,toTeamName:target.name,contractEnd:contract.endSeason,reason:"Transferência automática: avaliação ponderada das últimas três temporadas (50%/30%/20%), comparação com o companheiro (25%), idade e ganho esportivo relevante justificaram a mudança.",createdAt:new Date().toISOString()});
  }
 }
 // Contract renewals preserve stable pairings; a team makes at most one driver change in this window.
 for(const x of candidates.filter(x=>!usedDrivers.has(x.driver.id))){
  const contract=contracts.find(c=>c.driverId===x.driver.id)!;
  contract.startSeason=season;contract.endSeason=season+1+(hash(x.driver.id+season)%3);contract.endLabel=String(contract.endSeason);contract.status="active";
  events.push({id:crypto.randomUUID(),season,type:"renewal",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:x.team.id,toTeamName:x.team.name,contractEnd:contract.endSeason,reason:"Renovação automática: a estabilidade da dupla foi priorizada porque não surgiu uma alternativa com ganho esportivo suficiente.",createdAt:new Date().toISOString()});
 }
 localStorage.setItem(contractKey,JSON.stringify(contracts));
 localStorage.setItem(eventKey,JSON.stringify(events));
 localStorage.setItem(processedKey,"true");

 return {teams:nextTeams,events:events.filter(e=>e.season===season),alreadyProcessed:false};
}
