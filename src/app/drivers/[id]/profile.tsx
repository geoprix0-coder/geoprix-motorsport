"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft,Flag,Trophy,Medal,Activity,UserRound,Shield } from "lucide-react";
import type { Driver,Team } from "@/lib/types";
import { initialChampionships } from "@/lib/seed";
import {initializeDriverContracts,getContractEndLabel,type MarketContract} from "@/lib/market";

type SavedResult={driverId:string;driverName:string;teamId:string;teamName:string;status:string;position:number|null;points?:number};
type SavedRound={status:string;results:SavedResult[]};
type Stats={races:number|null;wins:number;podiums:number;points:number;best:number|null};
type SeasonHistoryItem={championshipId:string;championshipName:string;season:number;position:number;teamName:string;points:number;wins:number;podiums:number};
const emptyStats:Stats={races:0,wins:0,podiums:0,points:0,best:null};

export default function DriverProfile({driver,team}:{driver:Driver;team:Team}){
 const [stats,setStats]=useState<Stats>(emptyStats);
 const [currentTeam,setCurrentTeam]=useState<Team>(team);
 const [contract,setContract]=useState<MarketContract|null>(null);
 const [seasonHistory,setSeasonHistory]=useState<SeasonHistoryItem[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{const raw=localStorage.getItem("geoprix-teams-v1");const saved=raw?JSON.parse(raw) as Team[]:[team];const found=saved.find(t=>t.drivers.some(d=>d.id===driver.id));if(found)setCurrentTeam(found);const contracts=initializeDriverContracts(saved);setContract(contracts.find(item=>item.driverId===driver.id)||null)}catch{}
  const savedHistory:SeasonHistoryItem[]=[];
  try{
   for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(!key||!key.startsWith("geoprix-season-history-"))continue;
    const championshipId=key.slice("geoprix-season-history-".length);
    const raw=localStorage.getItem(key);if(!raw)continue;
    const seasons=JSON.parse(raw) as {season:number;driverStandings?:{id:string;name:string;teamName:string;position:number;points:number;wins:number;podiums:number}[]}[];
    if(!Array.isArray(seasons))continue;
    const championship=initialChampionships.find(item=>item.id===championshipId);
    for(const season of seasons){
     const standing=season.driverStandings?.find(item=>item.id===driver.id);
     if(!standing)continue;
     savedHistory.push({championshipId,championshipName:championship?.name||"Campeonato",season:season.season,position:standing.position,teamName:standing.teamName,points:standing.points,wins:standing.wins,podiums:standing.podiums});
    }
   }
   savedHistory.sort((a,b)=>b.season-a.season||a.championshipName.localeCompare(b.championshipName));
  }catch{/* Mantém o histórico disponível caso algum campeonato tenha dados inválidos. */}
  setSeasonHistory(savedHistory);
  const totals:Stats={...emptyStats};
  let raceCount=0;
  let racesRecoverable=true;
  try{
   const keys=Array.from({length:localStorage.length},(_,i)=>localStorage.key(i)).filter((key):key is string=>!!key);
   const archivedSeasons=new Set<string>();
   for(const key of keys.filter(key=>key.startsWith("geoprix-calendar-history-"))){
    const raw=localStorage.getItem(key);if(!raw)continue;
    const archives=JSON.parse(raw) as {season:number;rounds:SavedRound[]}[];
    if(!Array.isArray(archives))continue;
    for(const archive of archives){
     archivedSeasons.add(key.replace("geoprix-calendar-history-","")+":"+archive.season);
     for(const round of archive.rounds||[]){
      if(round.status!=="completed"||!Array.isArray(round.results))continue;
      const result=round.results.find(item=>item.driverId===driver.id);
      if(!result||result.status!=="finished"||result.position===null)continue;
      raceCount++;totals.points+=Number(result.points||0);
      totals.best=totals.best===null?result.position:Math.min(totals.best,result.position);
      if(result.position===1)totals.wins++;if(result.position<=3)totals.podiums++;
     }
    }
   }
   for(const key of keys.filter(key=>key.startsWith("geoprix-calendar-")&&!key.startsWith("geoprix-calendar-history-"))){
    const raw=localStorage.getItem(key);if(!raw)continue;
    const rounds=JSON.parse(raw) as SavedRound[];if(!Array.isArray(rounds))continue;
    for(const round of rounds){
     if(round.status!=="completed"||!Array.isArray(round.results))continue;
     const result=round.results.find(item=>item.driverId===driver.id);
     if(!result||result.status!=="finished"||result.position===null)continue;
     raceCount++;totals.points+=Number(result.points||0);
     totals.best=totals.best===null?result.position:Math.min(totals.best,result.position);
     if(result.position===1)totals.wins++;if(result.position<=3)totals.podiums++;
    }
   }
   // Temporadas finalizadas antes do arquivamento: recupera pontos, vitórias e pódios
   // da classificação histórica, sem inventar o número de largadas ou o melhor resultado.
   for(const key of keys.filter(key=>key.startsWith("geoprix-season-history-"))){
    const championshipId=key.replace("geoprix-season-history-","");
    const raw=localStorage.getItem(key);if(!raw)continue;
    const history=JSON.parse(raw) as {season:number;driverStandings:{id:string;points:number;wins:number;podiums:number;races?:number;bestPosition?:number|null}[]}[];
    if(!Array.isArray(history))continue;
    for(const season of history){
     if(archivedSeasons.has(championshipId+":"+season.season))continue;
     const standing=season.driverStandings?.find(item=>item.id===driver.id);if(!standing)continue;
     totals.points+=Number(standing.points)||0;
     totals.wins+=Number(standing.wins)||0;
     totals.podiums+=Number(standing.podiums)||0;
     if(typeof standing.races==="number")raceCount+=standing.races;else racesRecoverable=false;
     if(typeof standing.bestPosition==="number")totals.best=totals.best===null?standing.bestPosition:Math.min(totals.best,standing.bestPosition);
     else if(Number(standing.wins)>0)totals.best=totals.best===null?1:Math.min(totals.best,1);
    }
   }
  }catch{/* Mantém as estatísticas parciais caso algum registro local esteja inválido. */}
  totals.races=racesRecoverable?raceCount:null;
  setStats(totals);setLoaded(true);
 },[driver.id]);
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/drivers/"><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">PERFIL DO ATLETA</span></header><div className="manager-content">
  <section className="driver-hero"><div className="driver-number">#{driver.number}</div><div className="driver-identity"><span className="eyebrow">FICHA DO PILOTO · TEMPORADA 2026</span><h1>{driver.name}</h1><p><Flag size={14}/>{driver.nationality}<span className="driver-dot">·</span><Shield size={14}/>{currentTeam.name}</p></div></section>
  <div className="driver-profile-grid">
   <section className="team-list driver-info-card"><div className="list-heading"><h2><UserRound size={17}/> Informações pessoais</h2></div><dl className="driver-details"><div><dt>Nome completo</dt><dd>{driver.name}</dd></div><div><dt>Número</dt><dd>#{driver.number}</dd></div><div><dt>Nacionalidade</dt><dd>{driver.nationality}</dd></div><div><dt>Equipe atual</dt><dd>{currentTeam.name}</dd></div><div><dt>Término do contrato</dt><dd>{contract?getContractEndLabel(contract):"Não registrado"}</dd></div><div><dt>Base da equipe</dt><dd>{currentTeam.base}</dd></div><div><dt>Categoria</dt><dd>FORMULA 1</dd></div></dl></section>
   <section className="team-list driver-info-card"><div className="list-heading"><h2><Activity size={17}/> Estatísticas de carreira</h2><span>Dados registrados</span></div>{!loaded?<p className="storage-note">Carregando estatísticas...</p>:<div className="driver-stat-grid"><div><b>{stats.races===null?"—":stats.races}</b><small>Corridas concluídas</small></div><div><b>{stats.wins}</b><small>Vitórias</small></div><div><b>{stats.podiums}</b><small>Pódios</small></div><div><b>{stats.points}</b><small>Pontos</small></div></div>}<p className="driver-best"><Medal size={15}/> Melhor resultado <b>{stats.best===null?"—":stats.best+"º lugar"}</b></p></section>
  </div>
  <section className="team-list driver-history-card"><div className="list-heading"><h2><Trophy size={17}/> Histórico esportivo</h2><span>Universo GEOPRIX</span></div>{seasonHistory.length===0?<div className="driver-history-empty"><b>Histórico de temporadas</b><p>As classificações finais das temporadas encerradas aparecerão aqui.</p></div>:<div className="driver-season-history"><div className="driver-season-history-head"><span>Temporada / campeonato</span><span>Equipe</span><span>Posição</span><span>Pontos</span><span>Vitórias</span><span>Pódios</span></div>{seasonHistory.map((item,index)=><article className="driver-season-history-row" key={item.championshipId+"-"+item.season+"-"+index}><div><b>{item.season}</b><small>{item.championshipName}</small></div><span>{item.teamName}</span><strong>{item.position}º</strong><span>{item.points}</span><span>{item.wins}</span><span>{item.podiums}</span></article>)}</div>}</section>
  <p className="storage-note">As estatísticas são calculadas a partir das corridas concluídas salvas neste navegador. Dados pessoais e histórico ainda não cadastrados não são presumidos.</p>
 </div></main>;
}