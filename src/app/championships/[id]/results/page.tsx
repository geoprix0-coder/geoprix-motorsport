"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Activity, Trophy } from "lucide-react";

type Standing={id:string;name:string;teamName:string;points:number;wins:number;podiums:number};
type SavedRound={status:string;results:{driverId:string;driverName:string;teamId:string;teamName:string;status:string;position:number|null;points:number}[]};

export default function ChampionshipResultsPage(){
 const {id}=useParams<{id:string}>();
 const [drivers,setDrivers]=useState<Standing[]>([]);
 const [teams,setTeams]=useState<{id:string;name:string;points:number;wins:number}[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{
   const raw=localStorage.getItem("geoprix-calendar-"+id);
   const rounds=raw?JSON.parse(raw) as SavedRound[]:[];
   const rawRegulation=localStorage.getItem("geoprix-regulations-"+id);
   const regulation=rawRegulation?JSON.parse(rawRegulation) as {positionPoints?:number[]}:{};
   const pointsTable=Array.from({length:20},(_,i)=>Number(regulation.positionPoints?.[i]??[25,18,15,12,10,8,6,4,2,1,...Array(10).fill(0)][i]));
   const driverMap=new Map<string,Standing>();
   const teamMap=new Map<string,{id:string;name:string;points:number;wins:number}>();
   for(const round of rounds){
    if(round.status!=="completed")continue;
    const classified=round.results.filter(r=>r.status==="finished"&&r.position!==null);
    for(const result of round.results){
     const d=driverMap.get(result.driverId)||{id:result.driverId,name:result.driverName,teamName:result.teamName,points:0,wins:0,podiums:0};
     const awarded=result.status==="finished"&&result.position&&result.position>=1&&result.position<=20?pointsTable[result.position-1]:0;
     d.points+=awarded;
     if(result.status==="finished"&&result.position===1)d.wins++;
     if(result.status==="finished"&&result.position!==null&&result.position<=3)d.podiums++;
     driverMap.set(result.driverId,d);
     const t=teamMap.get(result.teamId)||{id:result.teamId,name:result.teamName,points:0,wins:0};
     t.points+=awarded;
     if(result.status==="finished"&&result.position===1)t.wins++;
     teamMap.set(result.teamId,t);
    }
   }
   setDrivers([...driverMap.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins));
   setTeams([...teamMap.values()].sort((a,b)=>b.points-a.points||b.wins-a.wins));
  }catch{setDrivers([]);setTeams([])}
  setLoaded(true);
 },[id]);
 return <main className="manager-shell"><div className="manager-content">
  <div className="manager-heading"><div><span className="eyebrow">GESTÃO DO CAMPEONATO</span><h1>Resultados</h1><p>Classificação de pilotos e equipes calculada a partir das etapas concluídas.</p></div></div>
  {!loaded?<p>Carregando classificação...</p>:drivers.length===0?<section className="team-list"><div className="empty-state"><Activity size={28}/><b>Nenhum resultado registrado</b><span>A classificação aparecerá aqui assim que você salvar os resultados de uma etapa.</span></div></section>:<>
   <section className="team-list"><div className="list-heading"><h2><Trophy size={17}/> Campeonato de pilotos</h2><span>{drivers.length} pilotos</span></div>
    {drivers.map((d,i)=><article className="standing-row" key={d.id}><b className="standing-position">{i+1}</b><div className="standing-name"><b>{d.name}</b><small>{d.teamName}</small></div><span className="standing-detail">{d.wins} vitórias · {d.podiums} pódios</span><strong>{d.points} pts</strong></article>)}
   </section>
   <section className="team-list"><div className="list-heading"><h2><Trophy size={17}/> Campeonato de construtores</h2><span>{teams.length} equipes</span></div>
    {teams.map((t,i)=><article className="standing-row" key={t.id}><b className="standing-position">{i+1}</b><div className="standing-name"><b>{t.name}</b></div><span className="standing-detail">{t.wins} vitórias</span><strong>{t.points} pts</strong></article>)}
   </section>
  </>}
  <p className="storage-note">A classificação é recalculada com base nos resultados salvos neste navegador e no regulamento aplicado no momento do registro.</p>
 </div></main>;
}
