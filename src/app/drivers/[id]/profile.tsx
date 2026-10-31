"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft,Flag,Trophy,Medal,Activity,UserRound,Shield,ChevronDown,ChevronUp,CalendarDays,FlagTriangleRight } from "lucide-react";
import type { Driver,Team } from "@/lib/types";
import { initialChampionships } from "@/lib/seed";
import { getDriverCareerRecord,type DriverSeasonRecord } from "@/lib/driver-record";
import {initializeDriverContracts,getContractEndLabel,type MarketContract} from "@/lib/market";

type Stats={races:number;wins:number;podiums:number;points:number;best:number|null};
const emptyStats:Stats={races:0,wins:0,podiums:0,points:0,best:null};
const statusText:Record<string,string>={finished:"Finalizou",finalizou:"Finalizou",retired:"Abandonou (DNF)",disqualified:"Desclassificado (DSQ)",dns:"Não largou (DNS)"};
const championshipName=(id:string)=>initialChampionships.find(item=>item.id===id)?.name||id;

function SeasonCard({item,expanded,onToggle,current=false}:{item:DriverSeasonRecord;expanded:boolean;onToggle:()=>void;current?:boolean}){
 return <article className="driver-season-card">
  <button type="button" className="driver-season-toggle" onClick={onToggle} aria-expanded={expanded}>
   <span className="driver-season-year"><b>{item.season}</b><small>{championshipName(item.championshipId)}{current?" · Temporada atual":""}</small></span>
   <span className="driver-season-team">{item.teamName||"Equipe não identificada"}</span>
   <span className="driver-season-position">{item.position?item.position+"º":"Em andamento"}</span>
   <span className="driver-season-points"><b>{item.points}</b><small>pontos</small></span>
   <span className="driver-season-record"><b>{item.wins}</b><small>vitórias</small></span>
   <span className="driver-season-record"><b>{item.podiums}</b><small>pódios</small></span>
   {expanded?<ChevronUp size={17}/>:<ChevronDown size={17}/>}
  </button>
  {expanded&&<div className="driver-season-details">
   <div className="driver-season-metrics">
    <span><b>{item.races}</b><small>Corridas concluídas</small></span>
    <span><b>{item.bestPosition?item.bestPosition+"º":"—"}</b><small>Melhor chegada</small></span>
    <span><b>{item.wins}</b><small>Vitórias</small></span>
    <span><b>{item.podiums}</b><small>Pódios</small></span>
   </div>
   <div className="driver-race-list">
    <div className="driver-race-head"><span>Etapa / circuito</span><span>Situação</span><span>Chegada</span><span>Pontos</span></div>
    {item.raceResults.length===0?<p className="driver-race-empty">Os resultados individuais desta temporada não estão disponíveis. A classificação final foi preservada, mas não há dados por etapa para exibir.</p>:item.raceResults.map((race,index)=><div className="driver-race-row" key={item.season+"-"+race.round+"-"+index}>
     <span><b>Etapa {race.round}</b><small>{race.circuitName}</small></span>
     <span>{statusText[race.status.toLowerCase()]||race.status}</span>
     <strong>{race.position?race.position+"º":"—"}</strong>
     <b>{race.points}</b>
    </div>)}
   </div>
  </div>}
 </article>;
}

export default function DriverProfile({driver,team}:{driver:Driver;team:Team}){
 const [stats,setStats]=useState<Stats>(emptyStats);
 const [currentTeam,setCurrentTeam]=useState<Team>(team);
 const [contract,setContract]=useState<MarketContract|null>(null);
 const [seasonHistory,setSeasonHistory]=useState<DriverSeasonRecord[]>([]);
 const [currentSeasons,setCurrentSeasons]=useState<DriverSeasonRecord[]>([]);
 const [expandedSeason,setExpandedSeason]=useState<string|null>(null);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{
   const raw=localStorage.getItem("geoprix-teams-v1");
   const saved=raw?JSON.parse(raw) as Team[]:[team];
   const found=saved.find(t=>t.drivers.some(d=>d.id===driver.id));
   if(found)setCurrentTeam(found);
   const contracts=initializeDriverContracts(saved);
   setContract(contracts.find(item=>item.driverId===driver.id)||null);
  }catch{}
  try{
   const career=getDriverCareerRecord(driver);
   setStats({races:career.races,wins:career.wins,podiums:career.podiums,points:career.points,best:career.bestPosition});
   setSeasonHistory(career.seasons);
   setCurrentSeasons(career.currentSeasons);
  }catch{
   setStats(emptyStats);setSeasonHistory([]);setCurrentSeasons([]);
  }
  setLoaded(true);
 },[driver.id]);
 const toggleSeason=(key:string)=>setExpandedSeason(old=>old===key?null:key);
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/drivers/"><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">PERFIL DO ATLETA</span></header><div className="manager-content">
  <section className="driver-hero"><div className="driver-number">#{driver.number}</div><div className="driver-identity"><span className="eyebrow">FICHA DO PILOTO · UNIVERSO GEOPRIX</span><h1>{driver.name}</h1><p><Flag size={14}/>{driver.nationality}<span className="driver-dot">·</span><Shield size={14}/>{currentTeam.name}</p></div></section>
  <div className="driver-profile-grid">
   <section className="team-list driver-info-card"><div className="list-heading"><h2><UserRound size={17}/> Informações pessoais</h2></div><dl className="driver-details"><div><dt>Nome completo</dt><dd>{driver.name}</dd></div><div><dt>Número</dt><dd>#{driver.number}</dd></div><div><dt>Nacionalidade</dt><dd>{driver.nationality}</dd></div><div><dt>Equipe atual</dt><dd>{currentTeam.name}</dd></div><div><dt>Término do contrato</dt><dd>{contract?getContractEndLabel(contract):"Não registrado"}</dd></div><div><dt>Base da equipe</dt><dd>{currentTeam.base}</dd></div><div><dt>Categoria</dt><dd>FORMULA 1</dd></div></dl></section>
   <section className="team-list driver-info-card"><div className="list-heading"><h2><Activity size={17}/> Estatísticas de carreira</h2><span>{loaded?"Dados registrados":"Carregando..."}</span></div>{!loaded?<p className="storage-note">Carregando estatísticas...</p>:<div className="driver-stat-grid"><div><b>{stats.races}</b><small>Corridas concluídas</small></div><div><b>{stats.wins}</b><small>Vitórias</small></div><div><b>{stats.podiums}</b><small>Pódios</small></div><div><b>{stats.points}</b><small>Pontos</small></div></div>}<p className="driver-best"><Medal size={15}/> Melhor resultado <b>{stats.best===null?"—":stats.best+"º lugar"}</b></p></section>
  </div>
  <section className="team-list driver-history-card"><div className="list-heading"><h2><Trophy size={17}/> Histórico esportivo</h2><span>{seasonHistory.length} temporadas encerradas</span></div>
   {!loaded?<p className="storage-note">Carregando histórico...</p>:seasonHistory.length===0?<div className="driver-history-empty"><b>Nenhuma temporada encerrada registrada</b><p>Quando uma temporada for finalizada no campeonato, sua classificação e os resultados disponíveis serão exibidos aqui.</p></div>:<>
    <div className="driver-history-legend"><span>Temporada / campeonato</span><span>Equipe</span><span>Posição final</span><span>Pontos</span><span>Vitórias</span><span>Pódios</span><span></span></div>
    <div className="driver-season-list">{seasonHistory.map((item,index)=>{const key=item.championshipId+"-"+item.season+"-"+index;return <SeasonCard key={key} item={item} expanded={expandedSeason===key} onToggle={()=>toggleSeason(key)}/>})}</div>
   </>}
  </section>
  {currentSeasons.length>0&&<section className="team-list driver-history-card driver-current-season"><div className="list-heading"><h2><CalendarDays size={17}/> Temporada em andamento</h2><span>Resultados parciais</span></div><div className="driver-season-list">{currentSeasons.map((item,index)=>{const key="current-"+item.championshipId+"-"+item.season+"-"+index;return <SeasonCard key={key} item={item} current expanded={expandedSeason===key} onToggle={()=>toggleSeason(key)}/>})}</div></section>}
  <p className="storage-note">Os dados são lidos do calendário e dos arquivos de temporadas salvos neste navegador. Resultados antigos que não foram arquivados não podem ser reconstruídos automaticamente.</p>
 </div></main>;
}
