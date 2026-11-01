import type { Team } from "./types";
import type { Round } from "./season-finalization-types";
import { buildDevelopmentReport } from "./season-development-report";
import { advanceSeasonDevelopment, ensureDevelopmentData } from "./season-development";
import { runAutomaticMarket, type MarketEvent } from "./market";
import { teamStorageKey } from "./championship-data";

export type ChampionshipFinalizationResult = {
  championshipId:string;
  season:number;
  nextSeason:number;
  events:MarketEvent[];
  alreadyFinalized?:boolean;
};

export function readChampionshipCalendar(championshipId:string):Round[]{
  try{
    const parsed=JSON.parse(localStorage.getItem("geoprix-calendar-"+championshipId)||"[]");
    return Array.isArray(parsed)?parsed.map((round:any)=>({...round,results:Array.isArray(round.results)?round.results:[]})): [];
  }catch{return [];}
}

export function isChampionshipSeasonComplete(championshipId:string):boolean{
  const rounds=readChampionshipCalendar(championshipId);
  return rounds.length>0&&rounds.every(round=>round.status==="completed"&&round.results.length>0);
}

export function finalizeChampionshipSeason(championshipId:string,seasonNumber:number,rounds:Round[],inputTeams:Team[]):ChampionshipFinalizationResult{
  if(!rounds.length||rounds.some(round=>round.status!=="completed"||!round.results.length)){
    throw new Error("Este campeonato ainda possui corridas sem resultados registrados.");
  }
  const finalRound=[...rounds].sort((a,b)=>a.round-b.round)[rounds.length-1];
  const reportKey="geoprix-development-reports-"+championshipId;
  const savedReports=localStorage.getItem(reportKey);
  const seasonReports=savedReports?JSON.parse(savedReports):[];
  const finalReport=buildDevelopmentReport(championshipId,rounds,finalRound,true,seasonNumber);
  const driverMap=new Map<string,{id:string;name:string;teamName:string;points:number;wins:number;podiums:number;races:number;bestPosition:number|null}>();
  const teamMap=new Map<string,{id:string;name:string;points:number;wins:number}>();
  for(const race of rounds){
    for(const result of race.results){
      const driver=driverMap.get(result.driverId)||{id:result.driverId,name:result.driverName,teamName:result.teamName,points:0,wins:0,podiums:0,races:0,bestPosition:null};
      driver.points+=Number(result.points)||0;
      if(result.status==="finished"&&result.position!==null){driver.races++;driver.bestPosition=driver.bestPosition===null?result.position:Math.min(driver.bestPosition,result.position);}
      if(result.status==="finished"&&result.position===1)driver.wins++;
      if(result.status==="finished"&&result.position!==null&&result.position<=3)driver.podiums++;
      driverMap.set(result.driverId,driver);
      const team=teamMap.get(result.teamId)||{id:result.teamId,name:result.teamName,points:0,wins:0};
      team.points+=Number(result.points)||0;
      if(result.status==="finished"&&result.position===1)team.wins++;
      teamMap.set(result.teamId,team);
    }
  }
  const driverStandings=[...driverMap.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins||b.podiums-a.podiums).map((item,index)=>({...item,position:index+1}));
  const teamStandings=[...teamMap.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins).map((item,index)=>({...item,position:index+1}));
  const archiveKey="geoprix-calendar-history-"+championshipId;
  const savedArchives=localStorage.getItem(archiveKey);
  const archives=savedArchives?JSON.parse(savedArchives):[];
  if(!archives.some((item:any)=>item.season===seasonNumber)){
    archives.push({season:seasonNumber,rounds});
    localStorage.setItem(archiveKey,JSON.stringify(archives));
  }
  const historyKey="geoprix-season-history-"+championshipId;
  const savedHistory=localStorage.getItem(historyKey);
  const history=savedHistory?JSON.parse(savedHistory):[];
  if(!history.some((item:any)=>item.season===seasonNumber)){
    history.push({season:seasonNumber,completedAt:new Date().toISOString(),driverStandings,teamStandings});
    localStorage.setItem(historyKey,JSON.stringify(history));
  }
  const teamKey=teamStorageKey(championshipId);
  const storedTeams=localStorage.getItem(teamKey);
  const marketTeams=ensureDevelopmentData(storedTeams?JSON.parse(storedTeams) as Team[]:inputTeams,seasonNumber);
  const developedTeams=advanceSeasonDevelopment(marketTeams,seasonNumber,teamStandings,driverStandings,championshipId);
  localStorage.setItem(teamKey,JSON.stringify(developedTeams));
  const marketResult=runAutomaticMarket(developedTeams,seasonNumber,driverStandings,teamStandings,championshipId);
  localStorage.setItem(teamKey,JSON.stringify(marketResult.teams));
  const nextSeason=seasonNumber+1;
  localStorage.setItem("geoprix-season-"+championshipId,String(nextSeason));
  localStorage.setItem("geoprix-calendar-"+championshipId,JSON.stringify([]));
  localStorage.setItem(reportKey,JSON.stringify([finalReport]));
  return {championshipId,season:seasonNumber,nextSeason,events:marketResult.events};
}
