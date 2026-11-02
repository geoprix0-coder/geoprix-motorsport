"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRightLeft,CalendarClock,Flag,Handshake,Users} from "lucide-react";
import {readUniverseChampionships} from "@/lib/universe";
import {initialTeamsForChampionship,mergeInitialTeams,teamStorageKey} from "@/lib/championship-data";
import {removeF1DriversFromF2} from "@/lib/career-hierarchy";
import {initializeDriverContracts,getContractEndLabel,type MarketContract,type MarketEvent} from "@/lib/market";
import {getRetiredDrivers} from "@/lib/retirement";
import type {Team,Championship} from "@/lib/types";

type CategoryData={championship:Championship;teams:Team[];contracts:MarketContract[];events:MarketEvent[];season:number};
function readEvents(championshipId:string):MarketEvent[]{
 const key=championshipId==="formula-1-2026"?"geoprix-market-history-v1":`geoprix-market-history-${championshipId}-v1`;
 try{const parsed=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(parsed)?parsed:[]}catch{return []}
}
export default function MarketPage(){
 const [categories,setCategories]=useState<CategoryData[]>([]);
 const [selectedCategory,setSelectedCategory]=useState("all");
 const [selectedYear,setSelectedYear]=useState("all");
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  try{
   const championships=readUniverseChampionships();
   const f1Defaults=initialTeamsForChampionship("formula-1-2026");
   const f1Raw=localStorage.getItem(teamStorageKey("formula-1-2026"));
   let f1Teams:Team[]=f1Defaults;
   try { const f1Stored=f1Raw?JSON.parse(f1Raw):f1Defaults; f1Teams=mergeInitialTeams("formula-1-2026",Array.isArray(f1Stored)?f1Stored:f1Defaults); } catch { f1Teams=f1Defaults; }
   const next:CategoryData[]=championships.map(championship=>{
    const defaults=initialTeamsForChampionship(championship.id);
    const raw=localStorage.getItem(teamStorageKey(championship.id));
    let teams:Team[]=[];
    try { const parsed=raw?JSON.parse(raw):defaults; teams=defaults.length?mergeInitialTeams(championship.id,Array.isArray(parsed)?parsed:defaults):(Array.isArray(parsed)?parsed:[]); } catch { teams=defaults; }
    if(championship.id==="formula-2-2026")teams=removeF1DriversFromF2(teams,f1Teams);
    const season=Number(localStorage.getItem("geoprix-season-"+championship.id))||championship.season||2026;
    const contracts=initializeDriverContracts(teams,season,championship.id);
    return {championship,teams,contracts,events:readEvents(championship.id),season};
   });
   setCategories(next);
   if(selectedCategory!=="all"&&!next.some(item=>item.championship.id===selectedCategory))setSelectedCategory("all");
  }catch{setCategories([])}
  setReady(true);
 },[]);
 const visibleCategories=useMemo(()=>selectedCategory==="all"?categories:categories.filter(item=>item.championship.id===selectedCategory),[categories,selectedCategory]);
 const allContracts=useMemo(()=>{
  const rows=visibleCategories.flatMap(item=>item.contracts.map(contract=>{
   const team=item.teams.find(t=>t.id===contract.teamId);
   const driver=item.teams.flatMap(t=>t.drivers).find(d=>d.id===contract.driverId);
   const archived=getRetiredDrivers().find(d=>d.driverId===contract.driverId);
   const effectiveStatus=archived?"retired":contract.status==="active"&&contract.endSeason<item.season?"expired":contract.status;
   return {...contract,championshipId:item.championship.id,championshipName:item.championship.name,teamName:team?.name||archived?.lastTeam||"Equipe não encontrada",driverName:driver?.name||archived?.driverName||contract.driverName||contract.driverId,effectiveStatus};
  }));
  for(const retired of getRetiredDrivers()){
   const category=visibleCategories.find(item=>item.championship.name===retired.championshipName);
   if(!category||rows.some(row=>row.driverId===retired.driverId&&row.championshipId===category.championship.id))continue;
   rows.push({driverId:retired.driverId,teamId:"retired",startSeason:retired.retirementSeason,endSeason:retired.retirementSeason,status:"retired" as const,championshipId:category.championship.id,championshipName:category.championship.name,teamName:retired.lastTeam,driverName:retired.driverName,effectiveStatus:"retired"});
  }
  return rows.sort((a,b)=>a.championshipName.localeCompare(b.championshipName)||a.driverName.localeCompare(b.driverName));
 },[visibleCategories]);
 const allEvents=useMemo(()=>visibleCategories.flatMap(item=>item.events.map(event=>({...event,championshipName:item.championship.name}))).sort((a,b)=>b.season-a.season||b.createdAt.localeCompare(a.createdAt)),[visibleCategories]);
 const years=useMemo(()=>Array.from(new Set(allEvents.map(event=>event.season))).sort((a,b)=>b-a),[allEvents]);
 const filteredEvents=useMemo(()=>selectedYear==="all"?allEvents:allEvents.filter(event=>String(event.season)===selectedYear),[allEvents,selectedYear]);
 const driverCount=visibleCategories.reduce((n,item)=>n+item.teams.reduce((m,team)=>m+team.drivers.length,0),0);
 const activeContracts=allContracts.filter(contract=>contract.effectiveStatus==="active").length;
 const transfers=filteredEvents.filter(event=>event.type==="transfer").length;
 const promotions=filteredEvents.filter(event=>event.type==="promotion").length;
 const signings=filteredEvents.filter(event=>event.type==="signing").length;
 const releases=filteredEvents.filter(event=>event.type==="release").length;
 return <main className="manager-shell"><header className="manager-top"><Link href="/drivers/" className="back-link"><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">MERCADO GLOBAL · GEOPRIX</span></header><div className="manager-content">
 <div className="manager-heading"><div><span className="eyebrow">JANELA DE TRANSFERÊNCIAS</span><h1>Mercado de pilotos</h1><p>Negociações, contratos e movimentações de todas as categorias do universo.</p></div><span className="tag green">AUTOMÁTICO</span></div>
 <section className="manager-stats"><div><Users/><b>{driverCount}</b><small>Pilotos nas categorias</small></div><div><Handshake/><b>{activeContracts}</b><small>Contratos ativos</small></div><div><ArrowRightLeft/><b>{transfers}</b><small>Transferências</small></div><div><CalendarClock/><b>{promotions}</b><small>Promoções F2 → F1</small></div><div><Flag/><b>{signings+releases}</b><small>Contratações e dispensas</small></div></section>
 <section className="team-list"><div className="list-heading"><h2>Movimentações</h2><span>{filteredEvents.length} de {allEvents.length} registros</span></div>
 <div className="driver-category-filter" style={{padding:"0 18px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><label htmlFor="market-year-filter" style={{fontWeight:700}}>FILTRAR POR ANO</label><select id="market-year-filter" aria-label="Selecionar ano das movimentações" value={selectedYear} onChange={e=>setSelectedYear(e.target.value)} style={{minWidth:180,padding:"11px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"inherit",fontWeight:600}}><option value="all">Todos os anos</option>{years.map(year=><option key={year} value={String(year)}>{year}</option>)}</select></div>
 {!ready?<div className="empty-state">Carregando mercado...</div>:filteredEvents.length===0?<div className="empty-state"><Handshake size={28}/><b>O mercado ainda não abriu</b><span>As movimentações serão registradas ao fim das temporadas de cada categoria.</span></div>:filteredEvents.map(e=><article className="market-event-row" key={e.championshipName+"-"+e.id}><div className="market-event-icon">{e.type==="transfer"||e.type==="promotion"?<ArrowRightLeft size={18}/>:<Handshake size={18}/>}</div><div className="market-event-main"><b>{e.driverName}</b><small>{e.type==="transfer"?"Transferência":e.type==="promotion"?"Promoção F2 → F1":e.type==="signing"?"Contratação de agente livre":e.type==="release"?"Dispensa / não renovação":"Renovação"} · {e.championshipName} · Temporada {e.season}</small><p>{e.fromTeamName} <ArrowRightLeft size={12}/> {e.toTeamName}</p><small>{e.reason}</small></div><div className="market-event-contract"><b>{e.contractEnd}</b><small>Fim do contrato</small></div></article>)}</section>
 <section className="team-list"><div className="list-heading"><h2>Contratos</h2><span>{allContracts.length} registros · {activeContracts} ativos</span></div><div className="driver-category-filter" style={{padding:"0 18px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}><label htmlFor="contract-category-filter" style={{fontWeight:700}}>FILTRAR POR CATEGORIA</label><select id="contract-category-filter" aria-label="Selecionar categoria de contratos" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)} style={{minWidth:240,padding:"11px 14px",borderRadius:8,border:"1px solid var(--border)",background:"var(--surface)",color:"inherit",fontWeight:600}}><option value="all">Todas as categorias</option>{categories.map(item=><option key={item.championship.id} value={item.championship.id}>{item.championship.name}</option>)}</select></div>
 {!ready?<div className="empty-state">Carregando contratos...</div>:allContracts.length===0?<div className="empty-state">Nenhum contrato registrado nesta seleção.</div>:allContracts.map(contract=><article className="market-contract-row" key={contract.championshipId+"-"+contract.driverId}><div><b>{contract.driverName}</b><small>{contract.teamName} · {contract.championshipName}</small></div><span>{contract.effectiveStatus==="retired"?"Aposentado":contract.effectiveStatus==="released"?"Dispensado · sem contrato":contract.effectiveStatus==="expired"?"Contrato encerrado":`Até o fim de ${getContractEndLabel(contract)}`}</span></article>)}</section>
 <p className="storage-note">Os contratos são carregados separadamente por categoria. Use o filtro para consultar uma categoria específica ou mantenha “Todas as categorias” para visualizar o universo completo, incluindo contratos encerrados e vínculos de pilotos aposentados.</p>
 </div></main>;
}
