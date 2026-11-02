"use client";
import {useCallback,useEffect,useState} from "react";
import {CalendarDays,Lock,CheckCircle2,Flag,Trophy} from "lucide-react";
import {readUniverseChampionships} from "@/lib/universe";
import {initialTeamsForChampionship,mergeInitialTeams,teamStorageKey} from "@/lib/championship-data";
import {finalizeChampionshipSeason,readChampionshipCalendar} from "@/lib/season-finalization";
import {processAutomaticRetirements} from "@/lib/retirement";
import {automaticallyFillF2Vacancies,ensureFreeAgentPool} from "@/lib/free-agents";
import {runAutomaticMarket,promoteF2DriversToF1Vacancies,type MarketEvent} from "@/lib/market";
import type {Championship,Team} from "@/lib/types";

type Status={id:string;name:string;season:number;rounds:number;completed:number;ready:boolean};
function readTeams(championshipId:string):Team[]{
 try{
  const raw=localStorage.getItem(teamStorageKey(championshipId));
  const parsed=raw?JSON.parse(raw):[];
  return mergeInitialTeams(championshipId,Array.isArray(parsed)?parsed:[]);
 }catch{return initialTeamsForChampionship(championshipId);}
}
export default function GlobalSeasonFinalizer(){
 const [statuses,setStatuses]=useState<Status[]>([]);
 const [notice,setNotice]=useState("");
 const [busy,setBusy]=useState(false);
 const refresh=useCallback(()=>{
  const championships:Championship[]=readUniverseChampionships();
  const next=championships.map(championship=>{
   const season=Number(localStorage.getItem("geoprix-season-"+championship.id))||championship.season;
   const rounds=readChampionshipCalendar(championship.id);
   const completed=rounds.filter(round=>round.status==="completed"&&round.results.length>0).length;
   return {id:championship.id,name:championship.name,season,rounds:rounds.length,completed,ready:rounds.length>0&&completed===rounds.length};
  });
  setStatuses(next);
 },[]);
 useEffect(()=>{
  refresh();
  const onUpdate=()=>refresh();
  window.addEventListener("geoprix-calendar-updated",onUpdate);
  window.addEventListener("geoprix-championships-updated",onUpdate);
  window.addEventListener("geoprix-season-updated",onUpdate);
  window.addEventListener("storage",onUpdate);
  return ()=>{window.removeEventListener("geoprix-calendar-updated",onUpdate);window.removeEventListener("geoprix-championships-updated",onUpdate);window.removeEventListener("geoprix-season-updated",onUpdate);window.removeEventListener("storage",onUpdate);};
 },[refresh]);
 const allReady=statuses.length>0&&statuses.every(item=>item.ready);
 function finishAll(){
  refresh();
  const current=readUniverseChampionships().map(championship=>{
   const rounds=readChampionshipCalendar(championship.id);
   const season=Number(localStorage.getItem("geoprix-season-"+championship.id))||championship.season;
   return {championship,rounds,season};
  });
  if(!current.length||current.some(item=>!item.rounds.length||item.rounds.some(round=>round.status!=="completed"||!round.results.length))){
   setNotice("Ainda existem campeonatos com corridas sem resultados. Finalize todas as etapas de todos os campeonatos antes de continuar.");
   return;
  }
  if(!confirm("Finalizar as temporadas de TODOS os "+current.length+" campeonatos? O histórico será arquivado e as próximas temporadas serão iniciadas em conjunto."))return;
  setBusy(true);setNotice("");
  try{
   const results=current.map(item=>finalizeChampionshipSeason(item.championship.id,item.season,item.rounds,readTeams(item.championship.id)));
   const retirementSeasons=[...new Set(current.map(item=>item.season))];
   const retirements=retirementSeasons.flatMap(season=>processAutomaticRetirements(season));
   const allEvents:MarketEvent[]=[];
   for(const result of results){
    let currentTeams:Team[]=[];
    try{const parsed=JSON.parse(localStorage.getItem(teamStorageKey(result.championshipId))||"[]");currentTeams=Array.isArray(parsed)?parsed:[];}catch{}
    const marketResult=runAutomaticMarket(currentTeams,result.season,result.driverStandings,result.teamStandings,result.championshipId);
    localStorage.setItem(teamStorageKey(result.championshipId),JSON.stringify(marketResult.teams));
    allEvents.push(...marketResult.events);
    localStorage.setItem("geoprix-season-"+result.championshipId,String(result.nextSeason));
   }
   const f1Result=results.find(result=>result.championshipId==="formula-1-2026");
   const f2Result=results.find(result=>result.championshipId==="formula-2-2026"); const f3Result=results.find(result=>result.championshipId==="formula-3-2026");
   if(f1Result&&f2Result){
    const promotions=promoteF2DriversToF1Vacancies(f1Result.season,f1Result.teamStandings,f2Result.driverStandings);
    allEvents.push(...promotions.events);
    const recruitment=automaticallyFillF2Vacancies(f2Result.season,f2Result.teamStandings);
    allEvents.push(...recruitment.signings);
   }
   ensureFreeAgentPool(10);
   localStorage.setItem("geoprix-market-last-window",JSON.stringify({seasons:results.map(result=>({championshipId:result.championshipId,season:result.season})),events:allEvents,processedAt:new Date().toISOString()}));
   window.dispatchEvent(new Event("geoprix-season-updated"));
   window.dispatchEvent(new Event("geoprix-rosters-updated"));
   setNotice("Temporadas finalizadas em conjunto. "+results.map(result=>result.championshipId.toUpperCase()+": "+result.season+" → "+result.nextSeason).join(" · ")+". "+allEvents.length+" movimentação(ões) de mercado. "+(retirements.length?"Aposentadorias: "+retirements.map(driver=>driver.driverName+" ("+driver.age+" anos)").join(", "):"Nenhuma aposentadoria automática nesta rodada.")+" Novos calendários liberados.");
   refresh();
  }catch(error){
   setNotice(error instanceof Error?error.message:"Não foi possível finalizar todas as temporadas. Verifique os calendários e tente novamente.");
   refresh();
  }finally{setBusy(false);}
 }
 const pending=statuses.filter(item=>!item.ready).length;
 return <section className="global-season-panel">
  <div className="global-season-heading"><div><span className="eyebrow">ENCERRAMENTO GLOBAL</span><h2>Finalização das temporadas</h2><p>O encerramento só é liberado quando todos os campeonatos tiverem resultados registrados em todas as corridas.</p></div><span className={allReady?"global-season-status ready":"global-season-status"}>{allReady?<><CheckCircle2 size={15}/> TODOS CONCLUÍDOS</>:<><Lock size={15}/> {pending} PENDENTE(S)</>}</span></div>
  <div className="global-season-list">{statuses.map(item=><div className="global-season-row" key={item.id}><div className="global-season-name"><Trophy size={16}/><div><b>{item.name}</b><small>Temporada {item.season}</small></div></div><div className="global-season-progress"><b>{item.completed}/{item.rounds}</b><small>{item.rounds===0?"Calendário não cadastrado":item.ready?"Todas as corridas concluídas":"Corridas com resultados"}</small></div><span className={item.ready?"global-season-check ready":"global-season-check"}>{item.ready?"Concluído":"Pendente"}</span></div>)}</div>
  <div className="global-season-footer"><small><CalendarDays size={14}/> {statuses.filter(item=>item.rounds>0).reduce((sum,item)=>sum+item.completed,0)} de {statuses.reduce((sum,item)=>sum+item.rounds,0)} corridas concluídas no universo</small><button className="action-button" onClick={finishAll} disabled={!allReady||busy}>{busy?"Finalizando...":<><Flag size={16}/> Finalizar todas as temporadas</>}</button></div>
  {notice&&<p className="notice">{notice}</p>}
 </section>;
}
