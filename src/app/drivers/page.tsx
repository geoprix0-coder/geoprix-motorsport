"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRightLeft} from "lucide-react";
import {initialChampionships} from "@/lib/seed";
import {initialTeamsForChampionship,teamStorageKey} from "@/lib/championship-data";
import {initializeDriverContracts,type MarketContract} from "@/lib/market";
import type {Team} from "@/lib/types";
import {removeF1DriversFromF2} from "@/lib/career-hierarchy";

type DriverRow={id:string;name:string;number:number;nationality:string;age?:number;team:string;championshipId:string};
export default function DriversPage(){
 const [teamsByCategory,setTeamsByCategory]=useState<Record<string,Team[]>>({});
 const [contractsByCategory,setContractsByCategory]=useState<Record<string,MarketContract[]>>({});
 const [selectedCategory,setSelectedCategory]=useState("all");
 useEffect(()=>{
  const nextTeams:Record<string,Team[]>={},nextContracts:Record<string,MarketContract[]>={};
  for(const championship of initialChampionships){
   try{
    const key=teamStorageKey(championship.id);
    const raw=localStorage.getItem(key);
    const stored=raw?JSON.parse(raw):initialTeamsForChampionship(championship.id);
    let teams=Array.isArray(stored)?stored as Team[]:initialTeamsForChampionship(championship.id);
    if(championship.id==="formula-2-2026"){
     const f1Raw=localStorage.getItem(teamStorageKey("formula-1-2026"));
     const f1=f1Raw?JSON.parse(f1Raw) as Team[]:[];
     teams=removeF1DriversFromF2(teams,f1);
    }
    nextTeams[championship.id]=teams;
    const season=Number(localStorage.getItem("geoprix-season-"+championship.id))||championship.season||2026;
    const contractKey=championship.id==="formula-1-2026"?"geoprix-driver-contracts-v1":`geoprix-driver-contracts-${championship.id}-v1`;
    let contracts:MarketContract[]=JSON.parse(localStorage.getItem(contractKey)||"[]");
    if(!contracts.length)contracts=initializeDriverContracts(teams,season,championship.id);
    nextContracts[championship.id]=contracts;
   }catch{nextTeams[championship.id]=initialTeamsForChampionship(championship.id);nextContracts[championship.id]=[]}
  }
  setTeamsByCategory(nextTeams);setContractsByCategory(nextContracts);
 },[]);
 const drivers=useMemo(()=>{
  return initialChampionships.flatMap(championship=>{
   if(selectedCategory!=="all"&&selectedCategory!==championship.id)return [];
   const teams=teamsByCategory[championship.id]||[];
   const contracts=contractsByCategory[championship.id]||[];
   const season=Number(typeof window!=="undefined"?localStorage.getItem("geoprix-season-"+championship.id):null)||championship.season||2026;
   const active=new Set(contracts.filter(c=>c.status==="active"&&c.endSeason>=season).map(c=>c.driverId));
   return teams.flatMap(team=>team.drivers.filter(driver=>active.has(driver.id)).map(driver=>({...driver,team:team.name,championshipId:championship.id})));
  });
 },[teamsByCategory,contractsByCategory,selectedCategory]);
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/">← Visão geral</Link><span className="eyebrow">UNIVERSO MOTORSPORT</span></header><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">CADASTRO GLOBAL</span><h1>Pilotos</h1><p>Consulte os pilotos com contrato ativo em cada categoria.</p></div><Link className="action-button" href="/market/"><ArrowRightLeft size={16}/> Mercado de pilotos</Link></div><section className="team-list"><div className="list-heading"><h2>Pilotos contratados</h2><span>{drivers.length} pilotos</span></div><div style={{padding:"0 18px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><label htmlFor="driver-category-filter" style={{fontWeight:600}}>Categoria</label><select id="driver-category-filter" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} style={{minWidth:220,padding:"10px 12px",borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"inherit"}}><option value="all">Todas as categorias</option>{initialChampionships.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>{drivers.map(d=><Link className="team-row driver-global-row driver-profile-link" href={"/drivers/"+d.id+"/"} key={d.championshipId+"-"+d.id}><div><b>{d.name}</b><small>{d.nationality}{typeof d.age==="number"?` · ${d.age} anos`:""}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team} · {initialChampionships.find(c=>c.id===d.championshipId)?.name}</small><span className="driver-open">Ver ficha →</span></Link>)}</section><p className="storage-note">A lista considera somente pilotos com contrato ativo e vigente na categoria selecionada.</p></div></main>;
}
