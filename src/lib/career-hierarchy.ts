import type { Team, Driver } from "./types";
import { initialTeamsForChampionship, teamStorageKey } from "./championship-data";
import { getRetiredDrivers } from "./retirement";

export type DriverCareerStatus={driverId:string;driverName:string;firstF1Season?:number;firstF2Season?:number;firstF3Season?:number;promotedAt:string};
const CAREER_KEY="geoprix-driver-career-status-v1";
const read=(key:string):Team[]=>{try{const raw=localStorage.getItem(key);if(!raw){const id=key==="geoprix-teams-v1"?"formula-1-2026":key.replace("geoprix-teams-","").replace(/-v1$/,"");return initialTeamsForChampionship(id);}const value=JSON.parse(raw);return Array.isArray(value)?value:[]}catch{return []}};
export function getCareerStatus():DriverCareerStatus[]{try{const value=JSON.parse(localStorage.getItem(CAREER_KEY)||"[]");return Array.isArray(value)?value:[]}catch{return []}}
function registerDebuts(drivers:Driver[],season:number,category:"f1"|"f2"|"f3"){
 const status=getCareerStatus();
 for(const driver of drivers){
  const existing=status.find(x=>x.driverId===driver.id);
  if(existing){if(category==="f1"&&!existing.firstF1Season)existing.firstF1Season=season;if(category==="f2"&&!existing.firstF2Season)existing.firstF2Season=season;if(category==="f3"&&!existing.firstF3Season)existing.firstF3Season=season;existing.driverName=driver.name;}
  else status.push({driverId:driver.id,driverName:driver.name,...(category==="f1"?{firstF1Season:season}:{firstF2Season:season}),promotedAt:new Date().toISOString()});
 }
 localStorage.setItem(CAREER_KEY,JSON.stringify(status));
}
export function registerF1Debuts(drivers:Driver[],season=2026){registerDebuts(drivers,season,"f1")}
export function registerF2Debuts(drivers:Driver[],season=2026){registerDebuts(drivers,season,"f2")}
export function registerF3Debuts(drivers:Driver[],season=2026){registerDebuts(drivers,season,"f3")}
export function removeF1DriversFromF2(f2Teams:Team[],f1Teams:Team[]):Team[]{
 const f1Ids=new Set(f1Teams.flatMap(t=>t.drivers.map(d=>d.id)));
 const retiredIds=new Set([...getCareerStatus().filter(x=>x.firstF1Season).map(x=>x.driverId),...getRetiredDrivers().map(x=>x.driverId)]);
 return f2Teams.map(team=>({...team,drivers:team.drivers.filter(d=>!f1Ids.has(d.id)&&!retiredIds.has(d.id))}));
}
export function validateChampionshipRoster(championshipId:string,teams:Team[],season=2026):{ok:boolean;teams:Team[];message:string}{
 const retiredIds=new Set(getRetiredDrivers().map(x=>x.driverId));
 if(teams.some(team=>team.drivers.some(driver=>retiredIds.has(driver.id))))return {ok:false,teams,message:"Este piloto já se aposentou e não pode voltar a competir."};
 const f1Teams=read(teamStorageKey("formula-1-2026"));
 const f2Teams=read(teamStorageKey("formula-2-2026"));
 const f3Teams=read(teamStorageKey("formula-3-2026"));
 if(championshipId==="formula-3-2026"){
  if(teams.some(team=>team.drivers.length>3))return {ok:false,teams,message:"Cada equipe da Formula 3 pode ter no máximo 3 pilotos."};
  const debutedF2=new Set([...f2Teams.flatMap(t=>t.drivers.map(d=>d.id)),...getCareerStatus().filter(x=>x.firstF2Season).map(x=>x.driverId)]);
  if(teams.some(t=>t.drivers.some(d=>debutedF2.has(d.id))))return {ok:false,teams,message:"Este piloto já estreou na Formula 2 e não pode competir na Formula 3."};
  const f1Ids=new Set(f1Teams.flatMap(t=>t.drivers.map(d=>d.id)));
  if(teams.some(t=>t.drivers.some(d=>f1Ids.has(d.id))))return {ok:false,teams,message:"Pilotos vinculados à Formula 1 não podem competir na Formula 3."};
  return {ok:true,teams,message:""};
 }
 if(championshipId==="formula-2-2026"){
  if(teams.some(team=>team.drivers.length>2))return {ok:false,teams,message:"Cada equipe da Formula 2 pode ter no máximo 2 pilotos contratados."};
  const forbidden=new Set([...f1Teams.flatMap(t=>t.drivers.map(d=>d.id)),...getCareerStatus().filter(x=>x.firstF1Season).map(x=>x.driverId)]);
  if(teams.some(t=>t.drivers.some(d=>forbidden.has(d.id))))return {ok:false,teams,message:"Este piloto já estreou na Formula 1 e não pode competir na Formula 2."};
  const f3Ids=new Set([...f3Teams.flatMap(t=>t.drivers.map(d=>d.id)),...getCareerStatus().filter(x=>x.firstF3Season).map(x=>x.driverId)]);
  if(teams.some(t=>t.drivers.some(d=>f3Ids.has(d.id))))registerF2Debuts(teams.flatMap(t=>t.drivers.filter(d=>f3Ids.has(d.id))),season);
  return {ok:true,teams:removeF1DriversFromF2(teams,f1Teams),message:""};
 }
 if(championshipId==="formula-1-2026"){
  const f2ById=new Map(f2Teams.flatMap(t=>t.drivers.map(d=>[d.id,d] as const)));
  const promoted=teams.flatMap(t=>t.drivers).filter(d=>f2ById.has(d.id));
  if(promoted.length){
   registerF1Debuts(promoted,season);
   const remaining=removeF1DriversFromF2(f2Teams,teams);
   localStorage.setItem(teamStorageKey("formula-2-2026"),JSON.stringify(remaining));
  }
  const f3Ids=new Set([...f3Teams.flatMap(t=>t.drivers.map(d=>d.id)),...getCareerStatus().filter(x=>x.firstF3Season&&!x.firstF2Season).map(x=>x.driverId)]);
  if(teams.some(t=>t.drivers.some(d=>f3Ids.has(d.id))))return {ok:false,teams,message:"Equipes de Formula 1 não podem contratar diretamente pilotos da Formula 3. O piloto precisa estrear na Formula 2 primeiro."};
 }
 return {ok:true,teams,message:""};
}
