"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";

import {initialChampionships} from "@/lib/seed";
import {readUniverseChampionships} from "@/lib/universe";
import {initialTeamsForChampionship,mergeInitialTeams,teamStorageKey} from "@/lib/championship-data";
import {initializeDriverContracts,type MarketContract} from "@/lib/market";
import type {Team,Championship,Driver} from "@/lib/types";
import {registerF3Debuts,removeF1DriversFromF2} from "@/lib/career-hierarchy";
import {replaceF3SeedVacancy} from "@/lib/free-agents";
import {getRetiredDrivers,type RetiredDriver} from "@/lib/retirement";
import {ensureFreeAgentPool} from "@/lib/free-agents";

type DriverRow=Driver&{team:string;championshipId:string};
export default function DriversPage(){
 const [championships,setChampionships]=useState<Championship[]>(initialChampionships);
 const [teamsByCategory,setTeamsByCategory]=useState<Record<string,Team[]>>({});
 const [contractsByCategory,setContractsByCategory]=useState<Record<string,MarketContract[]>>({});
 const [selectedCategory,setSelectedCategory]=useState("all");

 useEffect(()=>{
  const load=()=>{
   const registered=readUniverseChampionships();
   setChampionships(registered);
   const nextTeams:Record<string,Team[]>={},nextContracts:Record<string,MarketContract[]>={};
   for(const championship of registered){
    try{
     const key=teamStorageKey(championship.id);
     const raw=localStorage.getItem(key);
     const defaults=initialTeamsForChampionship(championship.id);
     const stored=raw?JSON.parse(raw):defaults;
     let teams=defaults.length?mergeInitialTeams(championship.id,Array.isArray(stored)?stored as Team[]:defaults):(Array.isArray(stored)?stored as Team[]:[]);
     if(championship.id==="formula-2-2026"){
      const f1Raw=localStorage.getItem(teamStorageKey("formula-1-2026"));
      const f1=f1Raw?JSON.parse(f1Raw) as Team[]:[];
      teams=removeF1DriversFromF2(teams,f1);
     }
     if(championship.id==="formula-3-2026"){teams=replaceF3SeedVacancy(teams,championship.season||2026);registerF3Debuts(teams.flatMap(team=>team.drivers),championship.season||2026);}
     nextTeams[championship.id]=teams;
     const season=Number(localStorage.getItem("geoprix-season-"+championship.id))||championship.season||2026;
     nextContracts[championship.id]=initializeDriverContracts(teams,season,championship.id);
    }catch{nextTeams[championship.id]=[];nextContracts[championship.id]=[]}
   }
   setTeamsByCategory(nextTeams);
   setContractsByCategory(nextContracts);
   if(selectedCategory!=="all"&&!registered.some(c=>c.id===selectedCategory))setSelectedCategory("all");
  };
  load();
  window.addEventListener("geoprix-championships-updated",load);
  window.addEventListener("geoprix-rosters-updated",load);
  window.addEventListener("storage",load);
  return()=>{
   window.removeEventListener("geoprix-championships-updated",load);
   window.removeEventListener("geoprix-rosters-updated",load);
   window.removeEventListener("storage",load);
  };
 },[]);

 const drivers=useMemo(()=>{
  return championships.flatMap(championship=>{
   if(selectedCategory!=="all"&&selectedCategory!==championship.id)return [];
   const teams=teamsByCategory[championship.id]||[];
   // A central global directory must include every driver registered in a team roster,
   // regardless of current contract status.
   return teams.flatMap(team=>team.drivers.map(driver=>({...driver,team:team.name,championshipId:championship.id})));
  });
 },[championships,teamsByCategory,contractsByCategory,selectedCategory]);


 return <main className="manager-shell">
  <header className="manager-top"><Link className="back-link" href="/">← Visão geral</Link><span className="eyebrow">UNIVERSO MOTORSPORT</span></header>
  <div className="manager-content">
   <div className="manager-heading"><div><span className="eyebrow">CADASTRO GLOBAL</span><h1>Pilotos</h1><p>Consulte todos os pilotos cadastrados nas equipes de todas as categorias.</p></div></div>

   <section className="team-list">
    <div className="list-heading"><h2>Todos os pilotos cadastrados</h2><span>{drivers.length} pilotos</span></div>
    <div className="driver-category-filter" style={{padding:"0 18px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
     <label htmlFor="driver-category-filter" style={{fontWeight:700}}>FILTRAR POR CATEGORIA</label>
     <select id="driver-category-filter" aria-label="Selecionar categoria de pilotos" value={selectedCategory} onChange={event=>setSelectedCategory(event.target.value)} style={{minWidth:240,padding:"11px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"inherit",fontWeight:600}}>
      <option value="all">Todas as categorias</option>{championships.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
     </select>
    </div>
    {drivers.map(d=>d.id.startsWith("free-")?<article className="team-row driver-global-row" key={d.championshipId+"-"+d.id}><div><b>{d.name}</b><small>{d.nationality}{typeof d.age==="number"?" · "+d.age+" anos":""}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team} · {championships.find(c=>c.id===d.championshipId)?.name}</small><span className="driver-open">Piloto gerado pelo GEOPRIX</span></article>:<Link className="team-row driver-global-row driver-profile-link" href={"/drivers/"+d.id+"/"} key={d.championshipId+"-"+d.id}><div><b>{d.name}</b><small>{d.nationality}{typeof d.age==="number"?" · "+d.age+" anos":""}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team} · {championships.find(c=>c.id===d.championshipId)?.name}</small><span className="driver-open">Ver ficha →</span></Link>)}
    {drivers.length===0&&<div className="empty-state"><b>Nenhum piloto cadastrado nesta seleção</b><span>Cadastre equipes e pilotos no campeonato ou selecione outra categoria.</span></div>}
   </section>
   <p className="storage-note">A lista reúne todos os pilotos registrados nos elencos das equipes, independentemente da situação contratual. Use o filtro para consultar uma categoria específica.</p>
  </div>
 </main>;
}
