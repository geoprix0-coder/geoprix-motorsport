import type { Team } from "./types";
import { teamStorageKey } from "./championship-data";
import { registerF1Debuts } from "./career-hierarchy";

export type MarketContract={driverId:string;driverName?:string;teamId:string;startSeason:number;endSeason:number;endLabel?:string;status:"active"|"expired"|"retired"|"released"};
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
 const retiredIds=new Set<string>((JSON.parse(localStorage.getItem("geoprix-retired-drivers-v1")||"[]") as {driverId:string}[]).map(item=>item.driverId));
 const byId=new Map(stored.map(c=>[c.driverId,c]));
 for(const team of teams)for(const driver of team.drivers){
  if(retiredIds.has(driver.id)){
   const existing=byId.get(driver.id);
   if(existing)existing.status="retired";
   else{const contract:MarketContract={driverId:driver.id,teamId:team.id,startSeason:season,endSeason:season,status:"retired"};stored.push(contract);byId.set(driver.id,contract)}
   continue;
  }
  if(byId.has(driver.id)){const existing=byId.get(driver.id)!;if(!existing.driverName)existing.driverName=driver.name;continue;}
  const initial=initialContractYears[driver.name.trim().toLocaleLowerCase("pt-BR")];
  const contract:MarketContract=initial
   ?{driverId:driver.id,driverName:driver.name,teamId:team.id,startSeason:season,endSeason:initial.year,endLabel:initial.label,status:"active"}
   :{driverId:driver.id,driverName:driver.name,teamId:team.id,startSeason:season,endSeason:season+1,status:"active"};
  stored.push(contract);byId.set(driver.id,contract);
 }
 localStorage.setItem(key,JSON.stringify(stored));
 return stored;
}
export function getContractEndLabel(contract:MarketContract){return contract.endLabel||String(contract.endSeason);}

export type MarketEvent={id:string;season:number;type:"transfer"|"renewal"|"signing"|"promotion"|"release";driverId:string;driverName:string;fromTeamId:string;fromTeamName:string;toTeamId:string;toTeamName:string;contractEnd:number;reason:string;createdAt:string};
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
 const ageScore=(age:number)=>age<=21?100:age<=25?90:age<=28?75:age<=32?55:age<=36?35:15;
 const attributeScore=(driver:Team["drivers"][number])=>{
  const values=Object.values(driver.attributes||{racePace:60,qualifying:60,overtaking:60,defending:60,consistency:60});
  return values.reduce((sum,value)=>sum+(Number(value)||60),0)/Math.max(1,values.length);
 };
 const candidates=allDrivers.map(x=>{
  const contract=contracts.find(c=>c.driverId===x.driver.id)!;
  const age=Number(x.driver.age)||25;
  const performance=performanceScore(x.driver.id);
  const comparison=teammateScore(x.driver.id,x.team);
  const attributes=attributeScore(x.driver);
  const experience=Math.max(0,season-contract.startSeason);
  const experienceScore=experience>=3?100:experience===2?80:experience===1?60:40;
  const score=performance*.45+comparison*.2+attributes*.2+ageScore(age)*.1+experienceScore*.05;
  return {...x,contract,performance,comparison,attributes,experience,score,age,teamPosition:teamPosition(x.team.id)};
 }).filter(x=>x.contract.endSeason<=season&&x.contract.status==="active");
 const pairGap=(team:Team)=>{
  if(team.drivers.length<2)return 100;
  const values=team.drivers.map(d=>performanceScore(d.id));
  return Math.abs(values[0]-values[1]);
 };
 const transfers:{a:typeof candidates[number];b:typeof candidates[number]}[]=[];
 const usedDrivers=new Set<string>(),usedTeams=new Set<string>();
 for(const candidate of [...candidates].sort((a,b)=>b.score-a.score)){
  if(usedDrivers.has(candidate.driver.id)||usedTeams.has(candidate.team.id))continue;
  const partner=candidates.filter(other=>other.team.id!==candidate.team.id&&!usedDrivers.has(other.driver.id)&&!usedTeams.has(other.team.id)&&Math.abs(other.teamPosition-candidate.teamPosition)>=2&&((candidate.teamPosition<other.teamPosition&&candidate.score<other.score)||(candidate.teamPosition>other.teamPosition&&candidate.score>other.score))).sort((a,b)=>Math.abs(b.teamPosition-candidate.teamPosition)-Math.abs(a.teamPosition-candidate.teamPosition))[0];
  if(!partner)continue;
  const stronger=candidate.teamPosition<partner.teamPosition?candidate:partner;
  const weaker=candidate.teamPosition<partner.teamPosition?partner:candidate;
  const stabilityGap=Math.max(pairGap(stronger.team),pairGap(weaker.team));
  const requiredGain=stabilityGap>=18?7:stabilityGap>=12?10:15;
  if(weaker.score-stronger.score>=requiredGain){
   transfers.push({a:stronger,b:weaker});usedDrivers.add(stronger.driver.id);usedDrivers.add(weaker.driver.id);usedTeams.add(stronger.team.id);usedTeams.add(weaker.team.id);
  }
 }
 const nextTeams=teams.map(t=>({...t,drivers:[...t.drivers]}));
 for(const pair of transfers){
  const aTeam=nextTeams.find(t=>t.id===pair.a.team.id)!;const bTeam=nextTeams.find(t=>t.id===pair.b.team.id)!;
  const ai=aTeam.drivers.findIndex(d=>d.id===pair.a.driver.id),bi=bTeam.drivers.findIndex(d=>d.id===pair.b.driver.id);
  if(ai<0||bi<0)continue;
  aTeam.drivers[ai]=pair.b.driver;bTeam.drivers[bi]=pair.a.driver;
  for(const x of [pair.a,pair.b]){
   const target=x===pair.a?bTeam:aTeam;const contract=contracts.find(c=>c.driverId===x.driver.id)!;
   contract.teamId=target.id;contract.startSeason=season;contract.endSeason=season+1+(hash(x.driver.id+season)%3);contract.endLabel=String(contract.endSeason);contract.status="active";
   events.push({id:crypto.randomUUID(),season,type:"transfer",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:target.id,toTeamName:target.name,contractEnd:contract.endSeason,reason:"Transferência automática: avaliação ponderada das últimas três temporadas (50%/30%/20%), comparação com o companheiro (25%), idade e ganho esportivo relevante justificaram a mudança.",createdAt:new Date().toISOString()});
  }
 }
 for(const x of candidates.filter(x=>!usedDrivers.has(x.driver.id))){
  const contract=contracts.find(c=>c.driverId===x.driver.id)!;
  const shouldRelease=x.score<34&&x.performance<25&&(x.age>=25||x.comparison<25);
  if(shouldRelease){
   const team=nextTeams.find(t=>t.id===x.team.id);
   if(team)team.drivers=team.drivers.filter(driver=>driver.id!==x.driver.id);
   contract.status="released";contract.endSeason=season;contract.endLabel=String(season);
   const isF1=championshipId==="formula-1-2026";
   const destinationId=isF1?"f1-free-agents":"unattached";
   const destinationName=isF1?"Agente livre da F1":"Sem contrato";
   events.push({id:crypto.randomUUID(),season,type:"release",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:destinationId,toTeamName:destinationName,contractEnd:season,reason:isF1?"Dispensa da Formula 1: a equipe optou por não renovar após avaliar resultados, desempenho relativo ao companheiro, idade e perspectiva esportiva. O piloto permanece elegível exclusivamente para outras equipes da F1.":"Contrato não renovado: desempenho esportivo, comparação com o companheiro e perspectiva de carreira indicaram que a equipe deveria buscar outra opção.",createdAt:new Date().toISOString()});
   if(isF1){
    registerF1Debuts([x.driver],season);
    const key="geoprix-f1-free-agents-v1";
    let agents:Team["drivers"]=[];
    try{const parsed=JSON.parse(localStorage.getItem(key)||"[]");agents=Array.isArray(parsed)?parsed:[];}catch{}
    if(!agents.some(driver=>driver.id===x.driver.id))agents.push(x.driver);
    localStorage.setItem(key,JSON.stringify(agents));
   }
   if(championshipId==="formula-2-2026"){
    let freeAgents:Team["drivers"]= [];
    try{const parsed=JSON.parse(localStorage.getItem("geoprix-f2-free-agents-v1")||"[]");freeAgents=Array.isArray(parsed)?parsed:[];}catch{}
    if(!freeAgents.some(driver=>driver.id===x.driver.id)){freeAgents.push(x.driver);localStorage.setItem("geoprix-f2-free-agents-v1",JSON.stringify(freeAgents));}
   }else if(championshipId==="formula-3-2026"){
    let freeAgents:Team["drivers"]=[];try{const parsed=JSON.parse(localStorage.getItem("geoprix-free-agents-v1")||"[]");freeAgents=Array.isArray(parsed)?parsed:[];}catch{}
    if(!freeAgents.some(driver=>driver.id===x.driver.id)){freeAgents.push(x.driver);localStorage.setItem("geoprix-free-agents-v1",JSON.stringify(freeAgents));}
   }
   continue;
  }
  contract.startSeason=season;contract.endSeason=season+1+(hash(x.driver.id+season)%3);contract.endLabel=String(contract.endSeason);contract.status="active";
  events.push({id:crypto.randomUUID(),season,type:"renewal",driverId:x.driver.id,driverName:x.driver.name,fromTeamId:x.team.id,fromTeamName:x.team.name,toTeamId:x.team.id,toTeamName:x.team.name,contractEnd:contract.endSeason,reason:"Renovação automática: avaliação de resultados, desempenho relativo ao companheiro, atributos, idade e experiência indicou que a continuidade era a melhor decisão esportiva.",createdAt:new Date().toISOString()});
 }
 localStorage.setItem(contractKey,JSON.stringify(contracts));localStorage.setItem(eventKey,JSON.stringify(events));localStorage.setItem(processedKey,"true");
 return {teams:nextTeams,events:events.filter(e=>e.season===season),alreadyProcessed:false};
}


/** Promove automaticamente talentos da F2 apenas para vagas reais na F1. */
export function promoteF2DriversToF1Vacancies(season:number,f1Standings:Standing[],f2Standings:Standing[]):{f1Teams:Team[];f2Teams:Team[];events:MarketEvent[]}{
 const readTeams=(id:string):Team[]=>{
  try{const parsed=JSON.parse(localStorage.getItem(teamStorageKey(id))||"[]");return Array.isArray(parsed)?parsed:[];}catch{return [];}
 };
 const f1Teams=readTeams("formula-1-2026").map(team=>({...team,drivers:[...(team.drivers||[])]}));
 const f2Teams=readTeams("formula-2-2026").map(team=>({...team,drivers:[...(team.drivers||[])]}));
 const rank=new Map(f2Standings.map(row=>[row.id,row.position]));
 const rankScore=(position:number,total:number)=>total<=1?100:100*(1-(position-1)/(total-1));
 const f2Contracts:MarketContract[]=initializeDriverContracts(f2Teams,season,"formula-2-2026");
 const candidateScore=(driver:Team["drivers"][number])=>{
  const standing=rank.get(driver.id);
  if(!standing)return 0;
  const attributes=Object.values(driver.attributes||{racePace:60,qualifying:60,overtaking:60,defending:60,consistency:60});
  const attributeAverage=attributes.reduce((sum,value)=>sum+(Number(value)||60),0)/Math.max(1,attributes.length);
  const age=Number(driver.age)||25;
  const ageFit=age<=21?100:age<=25?90:age<=28?75:age<=32?50:25;
  const contract=f2Contracts.find(item=>item.driverId===driver.id);
  const experience=Math.max(0,season-(contract?.startSeason??season));
  const experienceFit=experience>=3?100:experience===2?80:experience===1?60:40;
  return rankScore(standing,f2Standings.length)*.55+attributeAverage*.25+ageFit*.1+experienceFit*.1;
 };
 const f2Candidates=f2Teams.flatMap(team=>team.drivers.map(driver=>({driver,team,score:candidateScore(driver),position:rank.get(driver.id)??999,source:"f2" as const})))
  .filter(item=>item.score>=60);
 let f2FreeAgents:Team["drivers"]=[];try{const parsed=JSON.parse(localStorage.getItem("geoprix-f2-free-agents-v1")||"[]");f2FreeAgents=Array.isArray(parsed)?parsed:[];}catch{}
 const f2FreeCandidates=f2FreeAgents.map(driver=>{const values=Object.values(driver.attributes||{racePace:60,qualifying:60,overtaking:60,defending:60,consistency:60});const average=values.reduce((sum,value)=>sum+(Number(value)||60),0)/Math.max(1,values.length);const age=Number(driver.age)||25;const ageFit=age<=25?90:age<=30?80:age<=34?65:age<=37?45:20;return {driver,team:null as Team|null,score:average*.65+ageFit*.35,position:999,source:"f2-free" as const};}).filter(item=>item.score>=45);
 const f1AgentKey="geoprix-f1-free-agents-v1";
 let f1Agents:Team["drivers"]=[];
 try{const parsed=JSON.parse(localStorage.getItem(f1AgentKey)||"[]");f1Agents=Array.isArray(parsed)?parsed:[];}catch{}
 const f1EventHistory:MarketEvent[]=JSON.parse(localStorage.getItem(marketStorageKey("events","formula-1-2026"))||"[]");
 const recentlyReleasedFromTeam=new Map(f1EventHistory.filter(event=>event.season===season&&event.type==="release").map(event=>[event.driverId,event.fromTeamId]));
 const f1Contracts:MarketContract[]=initializeDriverContracts(f1Teams,season,"formula-1-2026");
 const f1Candidates=f1Agents.map(driver=>{
  const values=Object.values(driver.attributes||{racePace:60,qualifying:60,overtaking:60,defending:60,consistency:60});
  const average=values.reduce((sum,value)=>sum+(Number(value)||60),0)/Math.max(1,values.length);
  const age=Number(driver.age)||30;
  const ageFit=age<=25?90:age<=30?80:age<=34?65:age<=37?45:20;
  const contract=f1Contracts.find(item=>item.driverId===driver.id);
  const experience=Math.max(1,season-(contract?.startSeason??season-2));
  const experienceFit=experience>=5?100:experience>=3?85:65;
  return {driver,team:null as Team|null,score:average*.65+ageFit*.2+experienceFit*.15,position:999,source:"f1-free" as const};
 }).filter(item=>item.score>=45);
 const candidates=[...f2Candidates,...f2FreeCandidates,...f1Candidates].sort((a,b)=>b.score-a.score);
 const f1Rank=new Map(f1Standings.map(row=>[row.id,row.position]));
 const vacancies=f1Teams.filter(team=>team.drivers.length<2).sort((a,b)=>(f1Rank.get(b.id)??f1Teams.length+1)-(f1Rank.get(a.id)??f1Teams.length+1));
 const events:MarketEvent[]=[];
 const promoted:Team["drivers"]= [];
 const signedF1Agents:Team["drivers"]= [];
 const signedF2FreeAgents:Team["drivers"]= [];
 const usedCandidates=new Set<string>();
 for(const target of vacancies){
  while(target.drivers.length<2&&candidates.length){
   const candidate=candidates.find(item=>!usedCandidates.has(item.driver.id)&&!(item.source==="f1-free"&&recentlyReleasedFromTeam.get(item.driver.id)===target.id));
   if(!candidate)break;
   candidates.splice(candidates.indexOf(candidate),1);
   usedCandidates.add(candidate.driver.id);
   if(candidate.source==="f2"){
    const source=f2Teams.find(team=>team.id===candidate.team?.id);
    if(!source||!source.drivers.some(driver=>driver.id===candidate.driver.id))continue;
    source.drivers=source.drivers.filter(driver=>driver.id!==candidate.driver.id);
    target.drivers.push(candidate.driver);
    promoted.push(candidate.driver);
    events.push({id:crypto.randomUUID(),season,type:"promotion",driverId:candidate.driver.id,driverName:candidate.driver.name,fromTeamId:source.id,fromTeamName:source.name,toTeamId:target.id,toTeamName:target.name,contractEnd:season+2,reason:"Promoção automática da Formula 2 para a Formula 1: a equipe tinha uma vaga e o piloto superou as alternativas disponíveis na avaliação de classificação, atributos, idade e experiência.",createdAt:new Date().toISOString()});
   }else if(candidate.source==="f2-free"){
    target.drivers.push(candidate.driver);signedF2FreeAgents.push(candidate.driver);
    events.push({id:crypto.randomUUID(),season,type:"promotion",driverId:candidate.driver.id,driverName:candidate.driver.name,fromTeamId:"f2-free-agents",fromTeamName:"Agente livre da F2",toTeamId:target.id,toTeamName:target.name,contractEnd:season+2,reason:"Contratação de piloto com experiência na F2 por uma equipe da Formula 1.",createdAt:new Date().toISOString()});
   }else{
    target.drivers.push(candidate.driver);
    signedF1Agents.push(candidate.driver);
    events.push({id:crypto.randomUUID(),season,type:"signing",driverId:candidate.driver.id,driverName:candidate.driver.name,fromTeamId:"f1-free-agents",fromTeamName:"Agente livre da F1",toTeamId:target.id,toTeamName:target.name,contractEnd:season+1,reason:"Contratação automática de um agente livre da Formula 1. O piloto foi escolhido entre os disponíveis por sua experiência, atributos e adequação à vaga.",createdAt:new Date().toISOString()});
   }
  }
 }
 if(promoted.length||signedF1Agents.length||signedF2FreeAgents.length){
  localStorage.setItem(teamStorageKey("formula-1-2026"),JSON.stringify(f1Teams));
  localStorage.setItem(teamStorageKey("formula-2-2026"),JSON.stringify(f2Teams));
  if(promoted.length||signedF2FreeAgents.length)registerF1Debuts([...promoted,...signedF2FreeAgents],season);
  if(signedF2FreeAgents.length)localStorage.setItem("geoprix-f2-free-agents-v1",JSON.stringify(f2FreeAgents.filter(driver=>!signedF2FreeAgents.some(signed=>signed.id===driver.id))));
  const nextF1Contracts=initializeDriverContracts(f1Teams,season,"formula-1-2026");
  for(const driver of [...promoted,...signedF1Agents]){
   let contract=nextF1Contracts.find(item=>item.driverId===driver.id);
   if(!contract){contract={driverId:driver.id,driverName:driver.name,teamId:f1Teams.find(team=>team.drivers.some(item=>item.id===driver.id))?.id||"",startSeason:season,endSeason:season+2,status:"active"};nextF1Contracts.push(contract);}
   contract.driverName=driver.name;contract.teamId=f1Teams.find(team=>team.drivers.some(item=>item.id===driver.id))?.id||contract.teamId;contract.startSeason=season;contract.endSeason=season+2;contract.endLabel=String(season+2);contract.status="active";
  }
  localStorage.setItem("geoprix-driver-contracts-v1",JSON.stringify(nextF1Contracts));
  if(signedF1Agents.length)localStorage.setItem(f1AgentKey,JSON.stringify(f1Agents.filter(agent=>!signedF1Agents.some(driver=>driver.id===agent.id))));
  const f2Contracts:MarketContract[]=initializeDriverContracts(f2Teams,season,"formula-2-2026");
  for(const driver of promoted){const contract=f2Contracts.find(item=>item.driverId===driver.id);if(contract){contract.status="expired";contract.endSeason=season;contract.endLabel=String(season);}}
  localStorage.setItem("geoprix-driver-contracts-formula-2-2026-v1",JSON.stringify(f2Contracts));
  const eventKey=marketStorageKey("events","formula-1-2026");
  const history:MarketEvent[]=JSON.parse(localStorage.getItem(eventKey)||"[]");
  localStorage.setItem(eventKey,JSON.stringify([...history,...events]));
  window.dispatchEvent(new Event("geoprix-rosters-updated"));
 }
 return {f1Teams,f2Teams,events};
}

/** F2 debuts remain eligible for F2 teams only; they can never re-enter F3. */
export function hireF2FreeAgent(driverId:string,teamId:string,season:number):{ok:boolean;message:string}{
 const key="geoprix-f2-free-agents-v1";let agents:Team["drivers"]=[];try{const parsed=JSON.parse(localStorage.getItem(key)||"[]");agents=Array.isArray(parsed)?parsed:[]}catch{}
 const driver=agents.find(item=>item.id===driverId);if(!driver)return {ok:false,message:"Este agente livre da F2 não está disponível."};
 const teamsKey=teamStorageKey("formula-2-2026");let teams:Team[]=[];try{const parsed=JSON.parse(localStorage.getItem(teamsKey)||"[]");teams=Array.isArray(parsed)?parsed:[]}catch{}
 const target=teams.find(team=>team.id===teamId);if(!target)return {ok:false,message:"Selecione uma equipe válida da F2."};if(target.drivers.length>=2)return {ok:false,message:"A equipe já possui duas vagas ocupadas."};if(teams.some(team=>team.drivers.some(item=>item.id===driver.id)))return {ok:false,message:"O piloto já está contratado na F2."};
 const next=teams.map(team=>team.id===teamId?{...team,drivers:[...team.drivers,driver]}:team);localStorage.setItem(teamsKey,JSON.stringify(next));initializeDriverContracts(next,season,"formula-2-2026");localStorage.setItem(key,JSON.stringify(agents.filter(item=>item.id!==driverId)));window.dispatchEvent(new Event("geoprix-rosters-updated"));return {ok:true,message:driver.name+" foi contratado por "+target.name+" na F2."};
}
