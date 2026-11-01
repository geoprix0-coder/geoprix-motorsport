"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRightLeft} from "lucide-react";
import {initialChampionships} from "@/lib/seed";
import {readUniverseChampionships} from "@/lib/universe";
import {initialTeamsForChampionship,mergeInitialTeams,teamStorageKey} from "@/lib/championship-data";
import {initializeDriverContracts,type MarketContract} from "@/lib/market";
import type {Team,Championship} from "@/lib/types";
import {removeF1DriversFromF2} from "@/lib/career-hierarchy";
import {getRetirementNotices,type RetiredDriver} from "@/lib/retirement";

type DriverRow={id:string;name:string;number:number;nationality:string;age?:number;team:string;championshipId:string};
export default function DriversPage(){
 const [championships,setChampionships]=useState<Championship[]>(initialChampionships);
 const [teamsByCategory,setTeamsByCategory]=useState<Record<string,Team[]>>({});
 const [contractsByCategory,setContractsByCategory]=useState<Record<string,MarketContract[]>>({});
 const [selectedCategory,setSelectedCategory]=useState("all");
 const [retirementNotices,setRetirementNotices]=useState<RetiredDriver[]>([]);
 useEffect(()=>{
  const load=()=>{
   const registered=readUniverseChampionships();
   setRetirementNotices(getRetirementNotices().slice(-8).reverse());
   setChampionships(registered);
   const nextTeams:Record<string,Team[]>={},nextContracts:Record<string,MarketContract[]>={};
   for(const championship of registered){
    try{
     const key=teamStorageKey(championship.id);
     const raw=localStorage.getItem(key);
     const defaults=championship.id==="formula-1-2026"||championship.id==="formula-2-2026"?initialTeamsForChampionship(championship.id):[];
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
   setTeamsByCategory(nextTeams);setContractsByCategory(nextContracts);
   if(selectedCategory!=="all"&&!registered.some(c=>c.id===selectedCategory))setSelectedCategory("all");
  };
  load();
  window.addEventListener("geoprix-championships-updated",load);
  window.addEventListener("geoprix-rosters-updated",load);
  window.addEventListener("storage",load);
  return()=>{window.removeEventListener("geoprix-championships-updated",load);
  window.removeEventListener("geoprix-rosters-updated",load);window.removeEventListener("storage",load)};
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
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/">← Visão geral</Link><span className="eyebrow">UNIVERSO MOTORSPORT</span></header><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">CADASTRO GLOBAL</span><h1>Pilotos</h1><p>Consulte os pilotos com contrato ativo em cada categoria.</p></div><Link className="action-button" href="/market/"><ArrowRightLeft size={16}/> Mercado de pilotos</Link></div><section className="team-list">{retirementNotices.length>0&&<div className="retirement-notice" style={{padding:"16px 18px",borderBottom:"1px solid var(--border)"}}><div className="list-heading"><h2>Aposentadorias recentes</h2><span>{retirementNotices.length} registros</span></div>{retirementNotices.map(item=><div key={item.driverId+"-"+item.retirementSeason} style={{padding:"8px 0"}}><b>{item.driverName}</b><small style={{display:"block"}}>Aposentou-se ao fim de {item.retirementSeason}, aos {item.age} anos · {item.championshipName}</small></div>)}</div>}<div className="list-heading"><h2>Pilotos contratados</h2><span>{drivers.length} pilotos</span></div><div className="driver-category-filter" style={{padding:"0 18px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><label htmlFor="driver-category-filter" style={{fontWeight:700}}>FILTRAR POR CATEGORIA</label><select id="driver-category-filter" aria-label="Selecionar categoria de pilotos" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} style={{minWidth:240,padding:"11px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"inherit",fontWeight:600}}><option value="all">Todas as categorias</option>{championships.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>{drivers.map(d=><Link className="team-row driver-global-row driver-profile-link" href={"/drivers/"+d.id+"/"} key={d.championshipId+"-"+d.id}><div><b>{d.name}</b><small>{d.nationality}{typeof d.age==="number"?` · ${d.age} anos`:""}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team} · {championships.find(c=>c.id===d.championshipId)?.name}</small><span className="driver-open">Ver ficha →</span></Link>)}{drivers.length===0&&<div className="empty-state"><b>Nenhum piloto com contrato ativo nesta seleção</b><span>Cadastre equipes e pilotos no campeonato ou selecione outra categoria.</span></div>}</section><p className="storage-note">A lista considera somente pilotos com contrato ativo e vigente na categoria selecionada. Novos campeonatos cadastrados no universo são incluídos automaticamente no filtro.</p></div></main>;
}
