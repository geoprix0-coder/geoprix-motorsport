"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft,Flag,Trophy,Medal,Activity,UserRound,Shield } from "lucide-react";
import type { Driver,Team } from "@/lib/types";
import {initializeDriverContracts,getContractEndLabel,type MarketContract} from "@/lib/market";

type SavedResult={driverId:string;driverName:string;teamId:string;teamName:string;status:string;position:number|null;points?:number};
type SavedRound={status:string;results:SavedResult[]};
type Stats={races:number;wins:number;podiums:number;points:number;best:number|null};
const emptyStats:Stats={races:0,wins:0,podiums:0,points:0,best:null};

export default function DriverProfile({driver,team}:{driver:Driver;team:Team}){
 const [stats,setStats]=useState<Stats>(emptyStats);
 const [currentTeam,setCurrentTeam]=useState<Team>(team);
 const [contract,setContract]=useState<MarketContract|null>(null);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{const raw=localStorage.getItem("geoprix-teams-v1");const saved=raw?JSON.parse(raw) as Team[]:[team];const found=saved.find(t=>t.drivers.some(d=>d.id===driver.id));if(found)setCurrentTeam(found);const contracts=initializeDriverContracts(saved);setContract(contracts.find(item=>item.driverId===driver.id)||null)}catch{}
  const totals:Stats={...emptyStats};
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
      totals.races++;totals.points+=Number(result.points||0);
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
     totals.races++;totals.points+=Number(result.points||0);
     totals.best=totals.best===null?result.position:Math.min(totals.best,result.position);
     if(result.position===1)totals.wins++;if(result.position<=3)totals.podiums++;
    }
   }
   // Temporadas finalizadas antes do arquivamento: recupera pontos, vitórias e pódios
   // da classificação histórica, sem inventar o número de largadas ou o melhor resultado.
   for(const key of keys.filter(key=>key.startsWith("geoprix-season-history-"))){
    const championshipId=key.replace("geoprix-season-history-","");
    const raw=localStorage.getItem(key);if(!raw)continue;
    const history=JSON.parse(raw) as {season:number;driverStandings:{id:string;points:number;wins:number;podiums:number}[]}[];
    if(!Array.isArray(history))continue;
    for(const season of history){
     if(archivedSeasons.has(championshipId+":"+season.season))continue;
     const standing=season.driverStandings?.find(item=>item.id===driver.id);if(!standing)continue;
     totals.points+=Number(standing.points)||0;
     totals.wins+=Number(standing.wins)||0;
     totals.podiums+=Number(standing.podiums)||0;
    }
   }
  }catch{/* Mantém as estatísticas parciais caso algum registro local esteja inválido. */}
  setStats(totals);setLoaded(true);
 },[driver.id]);
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/drivers/"><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">PERFIL DO ATLETA</span></header><div className="manager-content">
  <section className="driver-hero"><div className="driver-number">#{driver.number}</div><div className="driver-identity"><span className="eyebrow">FICHA DO PILOTO · TEMPORADA 2026</span><h1>{driver.name}</h1><p><Flag size={14}/>{driver.nationality}<span className="driver-dot">·</span><Shield size={14}/>{currentTeam.name}</p></div></section>
  <div className="driver-profile-grid">
   <section className="team-list driver-info-card"><div className="list-heading"><h2><UserRound size={17}/> Informações pessoais</h2></div><dl className="driver-details"><div><dt>Nome completo</dt><dd>{driver.name}</dd></div><div><dt>Número</dt><dd>#{driver.number}</dd></div><div><dt>Nacionalidade</dt><dd>{driver.nationality}</dd></div><div><dt>Equipe atual</dt><dd>{currentTeam.name}</dd></div><div><dt>Término do contrato</dt><dd>{contract?getContractEndLabel(contract):"Não registrado"}</dd></div><div><dt>Base da equipe</dt><dd>{currentTeam.base}</dd></div><div><dt>Categoria</dt><dd>FORMULA 1</dd></div></dl></section>
   <section className="team-list driver-info-card"><div className="list-heading"><h2><Activity size={17}/> Estatísticas de carreira</h2><span>Dados registrados</span></div>{!loaded?<p className="storage-note">Carregando estatísticas...</p>:<div className="driver-stat-grid"><div><b>{stats.races}</b><small>Corridas concluídas</small></div><div><b>{stats.wins}</b><small>Vitórias</small></div><div><b>{stats.podiums}</b><small>Pódios</small></div><div><b>{stats.points}</b><small>Pontos</small></div></div>}<p className="driver-best"><Medal size={15}/> Melhor resultado <b>{stats.best===null?"—":stats.best+"º lugar"}</b></p></section>
  </div>
  <section className="team-list driver-history-card"><div className="list-heading"><h2><Trophy size={17}/> Histórico esportivo</h2><span>Universo GEOPRIX</span></div><div className="driver-history-empty"><b>Histórico de temporadas</b><p>Os resultados e classificações finais das temporadas serão apresentados aqui conforme forem registrados no sistema.</p></div></section>
  <p className="storage-note">As estatísticas são calculadas a partir das corridas concluídas salvas neste navegador. Dados pessoais e histórico ainda não cadastrados não são presumidos.</p>
 </div></main>;
}