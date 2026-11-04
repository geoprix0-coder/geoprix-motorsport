"use client";
import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import {UserRound,Users} from "lucide-react";
import {initialTeamsForChampionship,mergeInitialTeams,teamStorageKey} from "@/lib/championship-data";
import {getNationalChampionshipMeta} from "@/app/lib/national-championships";

type Driver={id:string;name:string;number:number;nationality:string;age?:number};
type Team={id:string;name:string;drivers:Driver[]};

export default function NationalChampionshipDriversPage(){
 const {id}=useParams<{id:string}>();
 const [teams,setTeams]=useState<Team[]>([]);
 const [loaded,setLoaded]=useState(false);
 const meta=getNationalChampionshipMeta(id);
 useEffect(()=>{
  try{
   const raw=localStorage.getItem(teamStorageKey(id));
   const saved=raw?JSON.parse(raw):initialTeamsForChampionship(id);
   setTeams(mergeInitialTeams(id,Array.isArray(saved)?saved:[]) as Team[]);
  }catch{setTeams(initialTeamsForChampionship(id) as Team[])}
  setLoaded(true);
 },[id]);
 const drivers=teams.flatMap(team=>(team.drivers||[]).filter(driver=>driver.name?.trim()).map(driver=>({...driver,teamName:team.name})));
 return <main className="manager-shell"><div className="manager-content">
  <div className="manager-heading"><div><span className="eyebrow">GRID DO CAMPEONATO</span><h1>Pilotos</h1><p>Todos os pilotos inscritos em {meta?.name||"este campeonato"}.</p></div></div>
  <section className="manager-stats"><div><Users/><b>{teams.length}</b><small>Equipes</small></div><div><UserRound/><b>{drivers.length}</b><small>Pilotos inscritos</small></div></section>
  <section className="team-list"><div className="list-heading"><h2>Pilotos inscritos</h2><span>{drivers.length} pilotos</span></div>
   {!loaded?<p>Carregando pilotos...</p>:drivers.length===0?<div className="empty-state"><UserRound size={28}/><b>Nenhum piloto cadastrado</b><span>Os pilotos aparecerão aqui quando forem registrados nas equipes do campeonato.</span></div>:drivers.map(driver=><article className="standing-row" key={driver.id}><b className="standing-position">#{driver.number}</b><div className="standing-name"><b>{driver.name}</b><small>{driver.teamName}</small></div><span className="standing-detail">{driver.nationality||"Nacionalidade não informada"}</span><strong>{typeof driver.age==="number"?driver.age+" anos":"—"}</strong></article>)}
  </section>
  <p className="storage-note">A lista é sincronizada com os pilotos cadastrados na seção Equipes e salva no armazenamento local deste navegador.</p>
 </div></main>;
}
