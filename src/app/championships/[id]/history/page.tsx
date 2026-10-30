"use client";
import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import {History,Trophy} from "lucide-react";

type DriverStanding={id:string;name:string;teamName:string;points:number;wins:number;podiums:number;position:number};
type TeamStanding={id:string;name:string;points:number;wins:number;position:number};
type LegacyRound={results:{driverId:string;driverName:string;teamId:string;teamName:string;status:string;position:number|null;points:number}[]};
type ArchivedSeason={season:number;completedAt:string;driverStandings?:DriverStanding[];teamStandings?:TeamStanding[];rounds?:LegacyRound[]};

function getLegacyStandings(rounds:LegacyRound[]=[]){
 const drivers=new Map<string,Omit<DriverStanding,"position">>();
 const teams=new Map<string,Omit<TeamStanding,"position">>();
 for(const round of rounds){
  for(const result of round.results||[]){
   const driver=drivers.get(result.driverId)||{id:result.driverId,name:result.driverName,teamName:result.teamName,points:0,wins:0,podiums:0};
   driver.points+=Number(result.points)||0;
   if(result.status==="finished"&&result.position===1)driver.wins++;
   if(result.status==="finished"&&result.position!==null&&result.position<=3)driver.podiums++;
   drivers.set(result.driverId,driver);
   const team=teams.get(result.teamId)||{id:result.teamId,name:result.teamName,points:0,wins:0};
   team.points+=Number(result.points)||0;
   if(result.status==="finished"&&result.position===1)team.wins++;
   teams.set(result.teamId,team);
  }
 }
 return {
  driverStandings:[...drivers.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins||b.podiums-a.podiums).map((item,index)=>({...item,position:index+1})),
  teamStandings:[...teams.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins).map((item,index)=>({...item,position:index+1}))
 };
}

export default function ChampionshipHistoryPage(){
 const {id}=useParams<{id:string}>();
 const [seasons,setSeasons]=useState<ArchivedSeason[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{
   const raw=localStorage.getItem("geoprix-season-history-"+id);
   const parsed=raw?JSON.parse(raw):[];
   if(Array.isArray(parsed))setSeasons(parsed.sort((a:ArchivedSeason,b:ArchivedSeason)=>b.season-a.season));
  }catch{setSeasons([])}
  setLoaded(true);
 },[id]);
 return <main className="manager-shell"><div className="manager-content">
  <div className="manager-heading"><div><span className="eyebrow">MEMÓRIA ESPORTIVA</span><h1>Histórico</h1><p>Classificação final de pilotos e equipes das temporadas anteriores.</p></div></div>
  {!loaded?<p>Carregando histórico...</p>:seasons.length===0?<section className="team-list"><div className="empty-state"><History size={28}/><b>Nenhuma temporada anterior cadastrada</b><span>Quando você finalizar uma temporada pelo Calendário, sua classificação final aparecerá aqui.</span></div></section>:seasons.map(season=>{
   const legacy=season.driverStandings&&season.teamStandings?null:getLegacyStandings(season.rounds||[]);
   const drivers=season.driverStandings||legacy?.driverStandings||[];
   const teams=season.teamStandings||legacy?.teamStandings||[];
   return <section className="team-list" key={season.season}>
    <div className="list-heading"><div><span className="eyebrow">TEMPORADA ENCERRADA</span><h2>Temporada {season.season}</h2></div><span>{new Date(season.completedAt).toLocaleDateString("pt-BR")}</span></div>
    <section className="development-group">
     <div className="development-group-heading"><h3><Trophy size={17}/> Campeonato de pilotos</h3><span>{drivers.length} pilotos</span></div>
     {drivers.length===0?<p className="storage-note">Nenhuma classificação de pilotos disponível.</p>:drivers.map(driver=><article className="standing-row" key={driver.id}><b className="standing-position">{driver.position}</b><div className="standing-name"><b>{driver.name}</b><small>{driver.teamName}</small></div><span className="standing-detail">{driver.wins} vitórias · {driver.podiums} pódios</span><strong>{driver.points} pts</strong></article>)}
    </section>
    <section className="development-group">
     <div className="development-group-heading"><h3><Trophy size={17}/> Campeonato de construtores</h3><span>{teams.length} equipes</span></div>
     {teams.length===0?<p className="storage-note">Nenhuma classificação de equipes disponível.</p>:teams.map(team=><article className="standing-row" key={team.id}><b className="standing-position">{team.position}</b><div className="standing-name"><b>{team.name}</b></div><span className="standing-detail">{team.wins} vitórias</span><strong>{team.points} pts</strong></article>)}
    </section>
   </section>;
  })}
  <p className="storage-note">O histórico exibe somente as classificações finais das temporadas encerradas. Os dados são armazenados localmente neste navegador.</p>
 </div></main>;
}
