import type { Team, Driver } from "./types";
import { teamStorageKey } from "./championship-data";
import { getRetiredDrivers } from "./retirement";

export type DriverCareerStatus={driverId:string;driverName:string;firstF1Season:number;promotedAt:string};
const CAREER_KEY="geoprix-driver-career-status-v1";
const read=(key:string):Team[]=>{try{const value=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(value)?value:[]}catch{return []}};
export function getCareerStatus():DriverCareerStatus[]{try{const value=JSON.parse(localStorage.getItem(CAREER_KEY)||"[]");return Array.isArray(value)?value:[]}catch{return []}}
export function registerF1Debuts(drivers:Driver[],season=2026){
 const status=getCareerStatus();const known=new Set(status.map(x=>x.driverId));
 for(const driver of drivers){if(!known.has(driver.id)){status.push({driverId:driver.id,driverName:driver.name,firstF1Season:season,promotedAt:new Date().toISOString()});known.add(driver.id)}}
 localStorage.setItem(CAREER_KEY,JSON.stringify(status));
}
export function removeF1DriversFromF2(f2Teams:Team[],f1Teams:Team[]):Team[]{
 const f1Ids=new Set(f1Teams.flatMap(t=>t.drivers.map(d=>d.id)));
 const retiredIds=new Set([...getCareerStatus().map(x=>x.driverId),...getRetiredDrivers().map(x=>x.driverId)]);
 return f2Teams.map(team=>({...team,drivers:team.drivers.filter(d=>!f1Ids.has(d.id)&&!retiredIds.has(d.id))}));
}
export function validateChampionshipRoster(championshipId:string,teams:Team[],season=2026):{ok:boolean;teams:Team[];message:string}{
 const retiredIds=new Set(getRetiredDrivers().map(x=>x.driverId));
 if(teams.some(team=>team.drivers.some(driver=>retiredIds.has(driver.id))))return {ok:false,teams,message:"Este piloto já se aposentou e não pode voltar a competir."};
 const f1Teams=read(teamStorageKey("formula-1-2026"));
 const f2Teams=read(teamStorageKey("formula-2-2026"));
 if(championshipId==="formula-2-2026"){
  const forbidden=new Set([...f1Teams.flatMap(t=>t.drivers.map(d=>d.id)),...getCareerStatus().map(x=>x.driverId)]);
  if(teams.some(t=>t.drivers.some(d=>forbidden.has(d.id))))return {ok:false,teams,message:"Este piloto já estreou na Formula 1 e não pode competir na Formula 2."};
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
 }
 return {ok:true,teams,message:""};
}
