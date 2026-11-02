"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRightLeft,Flag} from "lucide-react";
import {initialChampionships} from "@/lib/seed";
import {readUniverseChampionships} from "@/lib/universe";
import {initialTeamsForChampionship,mergeInitialTeams,teamStorageKey} from "@/lib/championship-data";
import {initializeDriverContracts,type MarketContract} from "@/lib/market";
import type {Team,Championship,Driver} from "@/lib/types";
import {removeF1DriversFromF2} from "@/lib/career-hierarchy";
import {getRetiredDrivers,type RetiredDriver} from "@/lib/retirement";
import {ensureFreeAgentPool} from "@/lib/free-agents";

type DriverRow=Driver&{team:string;championshipId:string};
export default function DriversPage(){
 const [championships,setChampionships]=useState<Championship[]>(initialChampionships);
 const [teamsByCategory,setTeamsByCategory]=useState<Record<string,Team[]>>({});
 const [contractsByCategory,setContractsByCategory]=useState<Record<string,MarketContract[]>>({});
 const [selectedCategory,setSelectedCategory]=useState("all");
 const [retiredDrivers,setRetiredDrivers]=useState<RetiredDriver[]>([]);
 const [freeAgents,setFreeAgents]=useState<Driver[]>([]);

 useEffect(()=>{
  const load=()=>{
   const registered=readUniverseChampionships();
   setRetiredDrivers(getRetiredDrivers().slice().reverse());
   setChampionships(registered);
   const nextTeams:Record<string,Team[]>={},nextContracts:Record<string,MarketContract[]>={};
   for(const championship of registered){
    try{
     const key=teamStorageKey(championship.id);
     const raw=localStorage.getItem(key);
     const defaults=championship.id==="formula-1-2026"||championship.id==="formula-2-2026"||championship.id==="formula-3-2026"?initialTeamsForChampionship(championship.id):[];
     const stored=raw?JSON.parse(raw):defaults;
     let teams=defaults.length?mergeInitialTeams(championship.id,Array.isArray(stored)?stored as Team[]:defaults):(Array.isArray(stored)?stored as Team[]:[]);
     if(championship.id==="formula-2-2026"){
      const f1Raw=localStorage.getItem(teamStorageKey("formula-1-2026"));
      const f1=f1Raw?JSON.parse(f1Raw) as Team[]:[];
      teams=removeF1DriversFromF2(teams,f1);
     }
     nextTeams[championship.id]=teams;
     const season=Number(localStorage.getItem("geoprix-season-"+championship.id))||championship.season||2026;
     nextContracts[championship.id]=initializeDriverContracts(teams,season,championship.id);
    }catch{nextTeams[championship.id]=[];nextContracts[championship.id]=[]}
   }
   setTeamsByCategory(nextTeams);
   setContractsByCategory(nextContracts);
   setFreeAgents(ensureFreeAgentPool(10));
   if(selectedCategory!=="all"&&!registered.some(c=>c.id===selectedCategory))setSelectedCategory("all");
  };
  load();
  window.addEventListener("geoprix-championships-updated",load);
  window.addEventListener("geoprix-rosters-updated",load);
  window.addEventListener("geoprix-free-agents-updated",load);
  window.addEventListener("storage",load);
  return()=>{
   window.removeEventListener("geoprix-championships-updated",load);
   window.removeEventListener("geoprix-rosters-updated",load);
   window.removeEventListener("geoprix-free-agents-updated",load);
   window.removeEventListener("storage",load);
  };
 },[]);

 const drivers=useMemo(()=>{
  return championships.flatMap(championship=>{
   if(selectedCategory!=="all"&&selectedCategory!==championship.id)return [];
   const teams=teamsByCategory[championship.id]||[];
   const contracts=contractsByCategory[championship.id]||[];
   const season=Number(typeof window!=="undefined"?localStorage.getItem("geoprix-season-"+championship.id):null)||championship.season||2026;
   const active=new Set(contracts.filter(c=>c.status==="active"&&c.endSeason>=season).map(c=>c.driverId));
   return teams.flatMap(team=>team.drivers.filter(driver=>active.has(driver.id)).map(driver=>({...driver,team:team.name,championshipId:championship.id})));
  });
 },[championships,teamsByCategory,contractsByCategory,selectedCategory]);


 return <main className="manager-shell">
  <header className="manager-top"><Link className="back-link" href="/">← Visão geral</Link><span className="eyebrow">UNIVERSO MOTORSPORT</span></header>
  <div className="manager-content">
   <div className="manager-heading"><div><span className="eyebrow">CADASTRO GLOBAL</span><h1>Pilotos</h1><p>Consulte pilotos contratados, agentes livres e atletas aposentados de todas as categorias.</p></div><Link className="action-button" href="/market/"><ArrowRightLeft size={16}/> Mercado de pilotos</Link></div>

   <section className="team-list">
    <div className="retirement-notice" style={{padding:"16px 18px",borderBottom:"1px solid var(--border)"}}>
     <div className="list-heading"><h2>Pilotos aposentados</h2><span>{retiredDrivers.length} registros</span></div>
     {retiredDrivers.length===0?<div className="empty-state">Nenhum piloto se aposentou até o momento.</div>:retiredDrivers.map(item=><div key={item.driverId+"-"+item.retirementSeason} style={{padding:"8px 0"}}><b>{item.driverName}</b><small style={{display:"block"}}>Aposentou-se ao fim de {item.retirementSeason}, aos {item.age} anos · {item.championshipName}</small></div>)}
    </div>

    <div style={{padding:"18px",borderBottom:"1px solid var(--border)"}}>
     <div className="list-heading"><h2><Flag size={17}/> Agentes livres</h2><span>{freeAgents.length} disponíveis · mínimo 10</span></div>
     <p className="storage-note" style={{margin:"4px 0 14px"}}>Novos talentos fictícios são gerados automaticamente para manter um banco de pelo menos 10 pilotos. As contratações acontecem sem intervenção do usuário, somente para preencher vagas na Formula 3 e respeitando o limite de 3 pilotos por equipe. Pilotos que já estrearam na F2 ficam fora deste banco.</p>
     
     {freeAgents.length===0?<div className="empty-state">Não foi possível gerar agentes livres. Verifique o armazenamento do navegador.</div>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:10}}>
      {freeAgents.map(driver=><article key={driver.id} style={{border:"1px solid var(--border)",borderRadius:9,padding:13,background:"var(--surface)"}}>
       <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"flex-start"}}>
        <div><b>{driver.name}</b><small style={{display:"block",color:"var(--muted)",marginTop:4}}>{driver.nationality} · {driver.age} anos</small></div>
        <strong style={{fontFamily:"monospace",fontSize:14}}>#{driver.number}</strong>
       </div>
       <div style={{display:"flex",flexWrap:"wrap",gap:6,margin:"12px 0",fontSize:9,color:"var(--muted)"}}>
        <span>Race Pace 60</span><span>Qualifying 60</span><span>Overtaking 60</span><span>Defending 60</span><span>Consistency 60</span>
       </div>
       <small style={{display:"block",color:"var(--muted)"}}>Disponível para contratação automática quando surgir uma vaga na F2</small>
      </article>)}
     </div>}
    </div>

    <div className="list-heading"><h2>Pilotos contratados</h2><span>{drivers.length} pilotos</span></div>
    <div className="driver-category-filter" style={{padding:"0 18px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
     <label htmlFor="driver-category-filter" style={{fontWeight:700}}>FILTRAR POR CATEGORIA</label>
     <select id="driver-category-filter" aria-label="Selecionar categoria de pilotos" value={selectedCategory} onChange={event=>setSelectedCategory(event.target.value)} style={{minWidth:240,padding:"11px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"inherit",fontWeight:600}}>
      <option value="all">Todas as categorias</option>{championships.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
     </select>
    </div>
    {drivers.map(d=>d.id.startsWith("free-")?<article className="team-row driver-global-row" key={d.championshipId+"-"+d.id}><div><b>{d.name}</b><small>{d.nationality}{typeof d.age==="number"?" · "+d.age+" anos":""}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team} · {championships.find(c=>c.id===d.championshipId)?.name}</small><span className="driver-open">Piloto gerado pelo GEOPRIX</span></article>:<Link className="team-row driver-global-row driver-profile-link" href={"/drivers/"+d.id+"/"} key={d.championshipId+"-"+d.id}><div><b>{d.name}</b><small>{d.nationality}{typeof d.age==="number"?" · "+d.age+" anos":""}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team} · {championships.find(c=>c.id===d.championshipId)?.name}</small><span className="driver-open">Ver ficha →</span></Link>)}
    {drivers.length===0&&<div className="empty-state"><b>Nenhum piloto com contrato ativo nesta seleção</b><span>Cadastre equipes e pilotos no campeonato ou selecione outra categoria.</span></div>}
   </section>
   <p className="storage-note">A lista considera somente pilotos com contrato ativo e vigente na categoria selecionada. Os agentes livres permanecem disponíveis até serem contratados; o estoque é reposto automaticamente após contratações e encerramentos de temporada.</p>
  </div>
 </main>;
}
