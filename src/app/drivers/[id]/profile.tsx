"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft,Flag,Trophy,Medal,Activity,UserRound,Shield } from "lucide-react";
import type { Driver,Team } from "@/lib/types";
import { initialChampionships } from "@/lib/seed";
import { getDriverCareerRecord } from "@/lib/driver-record";
import {initializeDriverContracts,getContractEndLabel,type MarketContract} from "@/lib/market";

type Stats={races:number;wins:number;podiums:number;points:number;best:number|null};
type SeasonHistoryItem={championshipId:string;championshipName:string;season:number;position:number;teamName:string;points:number;wins:number;podiums:number};
const emptyStats:Stats={races:0,wins:0,podiums:0,points:0,best:null};
const normalizeDriverName=(value:string)=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase().replace(/[^a-z0-9]/g,"");
const matchesDriver=(result:{driverId?:string;driverName?:string},driver:Driver)=>String(result.driverId||"")===String(driver.id)||normalizeDriverName(result.driverName||"")===normalizeDriverName(driver.name);

export default function DriverProfile({driver,team}:{driver:Driver;team:Team}){
 const [stats,setStats]=useState<Stats>(emptyStats);
 const [currentTeam,setCurrentTeam]=useState<Team>(team);
 const [contract,setContract]=useState<MarketContract|null>(null);
 const [seasonHistory,setSeasonHistory]=useState<SeasonHistoryItem[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{const raw=localStorage.getItem("geoprix-teams-v1");const saved=raw?JSON.parse(raw) as Team[]:[team];const found=saved.find(t=>t.drivers.some(d=>d.id===driver.id));if(found)setCurrentTeam(found);const contracts=initializeDriverContracts(saved);setContract(contracts.find(item=>item.driverId===driver.id)||null)}catch{}
  try {
   const career=getDriverCareerRecord(driver);
   setStats({races:career.races,wins:career.wins,podiums:career.podiums,points:career.points,best:career.bestPosition});
   setSeasonHistory(career.seasons.filter(item=>item.position!==null).map(item=>({
    championshipId:item.championshipId,
    championshipName:initialChampionships.find(championship=>championship.id===item.championshipId)?.name||"Campeonato",
    season:item.season,position:item.position??0,teamName:item.teamName,
    points:item.points,wins:item.wins,podiums:item.podiums
   })));
  } catch {
   setStats(emptyStats);setSeasonHistory([]);
  }
  setLoaded(true);
 },[driver.id]);
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/drivers/"><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">PERFIL DO ATLETA</span></header><div className="manager-content">
  <section className="driver-hero"><div className="driver-number">#{driver.number}</div><div className="driver-identity"><span className="eyebrow">FICHA DO PILOTO · TEMPORADA 2026</span><h1>{driver.name}</h1><p><Flag size={14}/>{driver.nationality}<span className="driver-dot">·</span><Shield size={14}/>{currentTeam.name}</p></div></section>
  <div className="driver-profile-grid">
   <section className="team-list driver-info-card"><div className="list-heading"><h2><UserRound size={17}/> Informações pessoais</h2></div><dl className="driver-details"><div><dt>Nome completo</dt><dd>{driver.name}</dd></div><div><dt>Número</dt><dd>#{driver.number}</dd></div><div><dt>Nacionalidade</dt><dd>{driver.nationality}</dd></div><div><dt>Equipe atual</dt><dd>{currentTeam.name}</dd></div><div><dt>Término do contrato</dt><dd>{contract?getContractEndLabel(contract):"Não registrado"}</dd></div><div><dt>Base da equipe</dt><dd>{currentTeam.base}</dd></div><div><dt>Categoria</dt><dd>FORMULA 1</dd></div></dl></section>
   <section className="team-list driver-info-card"><div className="list-heading"><h2><Activity size={17}/> Estatísticas de carreira</h2><span>Dados registrados</span></div>{!loaded?<p className="storage-note">Carregando estatísticas...</p>:<div className="driver-stat-grid"><div><b>{stats.races}</b><small>Corridas concluídas</small></div><div><b>{stats.wins}</b><small>Vitórias</small></div><div><b>{stats.podiums}</b><small>Pódios</small></div><div><b>{stats.points}</b><small>Pontos</small></div></div>}<p className="driver-best"><Medal size={15}/> Melhor resultado <b>{stats.best===null?"—":stats.best+"º lugar"}</b></p></section>
  </div>
  <section className="team-list driver-history-card"><div className="list-heading"><h2><Trophy size={17}/> Histórico esportivo</h2><span>Universo GEOPRIX</span></div>{seasonHistory.length===0?<div className="driver-history-empty"><b>Histórico de temporadas</b><p>As classificações finais das temporadas encerradas aparecerão aqui.</p></div>:<div className="driver-season-history"><div className="driver-season-history-head"><span>Temporada / campeonato</span><span>Equipe</span><span>Posição</span><span>Pontos</span><span>Vitórias</span><span>Pódios</span></div>{seasonHistory.map((item,index)=><article className="driver-season-history-row" key={item.championshipId+"-"+item.season+"-"+index}><div><b>{item.season}</b><small>{item.championshipName}</small></div><span>{item.teamName}</span><strong>{item.position}º</strong><span>{item.points}</span><span>{item.wins}</span><span>{item.podiums}</span></article>)}</div>}</section>
  <p className="storage-note">As estatísticas são calculadas a partir das corridas concluídas salvas neste navegador. Dados pessoais e histórico ainda não cadastrados não são presumidos.</p>
 </div></main>;
}