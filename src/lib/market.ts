import type { Team } from "./types";

export type MarketContract={driverId:string;teamId:string;startSeason:number;endSeason:number;status:"active"|"expired"};
export type MarketEvent={id:string;season:number;type:"transfer"|"renewal";driverId:string;driverName:string;fromTeamId:string;fromTeamName:string;toTeamId:string;toTeamName:string;contractEnd:number;reason:string;createdAt:string};
type Standing={id:string;name:string;position:number;points:number};
function hash(value:string){let h=0;for(let i=0;i<value.length;i++)h=(h*31+value.charCodeAt(i))>>>0;return h;}
export function runAutomaticMarket(teams:Team[],season:number,driverStandings:Standing[],teamStandings:Standing[]){
 const contractKey="geoprix-driver-contracts-v1",eventKey="geoprix-market-history-v1",processedKey="geoprix-market-processed-"+season;
 if(localStorage.getItem(processedKey))return {teams,events:[] as MarketEvent[],alreadyProcessed:true};
 const contracts:MarketContract[]=JSON.parse(localStorage.getItem(contractKey)||"[]");
 const events:MarketEvent[]=JSON.parse(localStorage.getItem(eventKey)||"[]");
 const driverRank=new Map(driverStandings.map(x=>[x.id,x.position]));
 const teamRank=new Map(teamStandings.map(x=>[x.id,x.position]));
 const allDrivers=teams.flatMap(t=>t.drivers.map(d=>({driver:d,team:t})));
 for(const item of allDrivers){
  if(!contracts.some(c=>c.driverId===item.driver.id)){
   const duration=1+(hash(item.driver.id)%3);
   contracts.push({driverId:item.driver.id,teamId:item.team.id,startSeason:season,endSeason:season+duration-1,status:"active"});
  }
 }
 const expiring=allDrivers.map(x=>({ ...x,contract:contracts.find(c=>c.driverId===x.driver.id)! }))
  .filter(x=>x.contract.endSeason<=season&&x.contract.status==="active");
 const candidates=expiring.map(x=>({...x,rank:driverRank.get(x.driver.id)??9999,teamPosition:teamRank.get(x.team.id)??9999}));
 const transfers:{a:typeof candidates[number];b:typeof candidates[number]}[]=[];
 const used=new Set<string>();
 // Match expiring drivers across teams when a stronger driver is moving to a clearly stronger team.
 for(const candidate of [...candidates].sort((a,b)=>a.rank-b.rank)){
  if(used.has(candidate.driver.id))continue;
  const partner=candidates.filter(other=>other.team.id!==candidate.team.id&&!used.has(other.driver.id)&&
    Math.abs(other.teamPosition-candidate.teamPosition)>=3&&
    ((candidate.teamPosition<other.teamPosition&&candidate.rank<other.rank)||(candidate.teamPosition>other.teamPosition&&candidate.rank>other.rank)))
   .sort((a,b)=>Math.abs(b.teamPosition-candidate.teamPosition)-Math.abs(a.teamPosition-candidate.teamPosition))[0];
  if(!partner)continue;
  const stronger=candidate.teamPosition<partner.teamPosition?candidate:partner;
  const weaker=candidate.teamPosition<partner.teamPosition?partner:candidate;
  // A swap only occurs if the stronger team receives the better-ranked driver.
  if(stronger.rank<weaker.rank){transfers.push({a:stronger,b:weaker});used.add(stronger.driver.id);used.add(weaker.driver.id);}
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
   contract.teamId=target.id;contract.startSeason=season;contract.endSeason=season+1+(hash(x.driver.id+season)%3);contract.status="active";
   events.push({id:crypto.randomUUID(),season,type:"transfer",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:target.id,toTeamName:target.name,contractEnd:contract.endSeason,reason:"Transferência automática: desempenho individual e posição competitiva das equipes favoreceram a mudança.",createdAt:new Date().toISOString()});
  }
 }
 // Drivers whose contracts expire without a transfer receive an automatic renewal.
 for(const x of candidates.filter(x=>!used.has(x.driver.id))){
  const contract=contracts.find(c=>c.driverId===x.driver.id)!;
  contract.startSeason=season;contract.endSeason=season+1+(hash(x.driver.id+season)%3);contract.status="active";
  events.push({id:crypto.randomUUID(),season,type:"renewal",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:x.team.id,toTeamName:x.team.name,contractEnd:contract.endSeason,reason:"Renovação automática: não surgiu uma oportunidade esportiva claramente superior nesta janela.",createdAt:new Date().toISOString()});
 }
 localStorage.setItem(contractKey,JSON.stringify(contracts));
 localStorage.setItem(eventKey,JSON.stringify(events));
 localStorage.setItem(processedKey,"true");
 localStorage.setItem("geoprix-teams-v1",JSON.stringify(nextTeams));
 return {teams:nextTeams,events:events.filter(e=>e.season===season),alreadyProcessed:false};
}
