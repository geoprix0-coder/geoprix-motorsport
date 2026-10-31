"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowLeft,Flag,Trophy,Medal,Activity,UserRound,Shield } from "lucide-react";
import type { Driver,Team } from "@/lib/types";

type SavedResult={driverId:string;driverName:string;teamId:string;teamName:string;status:string;position:number|null;points?:number};
type SavedRound={status:string;results:SavedResult[]};
type Stats={races:number;wins:number;podiums:number;points:number;best:number|null};
const emptyStats:Stats={races:0,wins:0,podiums:0,points:0,best:null};
const basePath=process.env.NODE_ENV==="production"?"/geoprix-motorsport":"";

export default function DriverProfile({driver,team}:{driver:Driver;team:Team}){
 const [stats,setStats]=useState<Stats>(emptyStats);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  const totals:Stats={...emptyStats};
  try{
   for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(!key||!key.startsWith("geoprix-calendar-"))continue;
    const raw=localStorage.getItem(key);
    if(!raw)continue;
    const rounds=JSON.parse(raw) as SavedRound[];
    if(!Array.isArray(rounds))continue;
    for(const round of rounds){
     if(round.status!=="completed"||!Array.isArray(round.results))continue;
     const result=round.results.find(item=>item.driverId===driver.id);
     if(!result)continue;
     if(result.status==="finished"&&result.position!==null){
      totals.races++;
      totals.points+=Number(result.points||0);
      totals.best=totals.best===null?result.position:Math.min(totals.best,result.position);
      if(result.position===1)totals.wins++;
      if(result.position<=3)totals.podiums++;
     }
    }
   }
  }catch{/* Mantém as estatísticas parciais caso algum registro local esteja inválido. */}
  setStats(totals);setLoaded(true);
 },[driver.id]);
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href={basePath+"/drivers/"}><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">PERFIL DO ATLETA</span></header><div className="manager-content">
  <section className="driver-hero"><div className="driver-number">#{driver.number}</div><div className="driver-identity"><span className="eyebrow">FICHA DO PILOTO · TEMPORADA 2026</span><h1>{driver.name}</h1><p><Flag size={14}/>{driver.nationality}<span className="driver-dot">·</span><Shield size={14}/>{team.name}</p></div></section>
  <div className="driver-profile-grid">
   <section className="team-list driver-info-card"><div className="list-heading"><h2><UserRound size={17}/> Informações pessoais</h2></div><dl className="driver-details"><div><dt>Nome completo</dt><dd>{driver.name}</dd></div><div><dt>Número</dt><dd>#{driver.number}</dd></div><div><dt>Nacionalidade</dt><dd>{driver.nationality}</dd></div><div><dt>Equipe atual</dt><dd>{team.name}</dd></div><div><dt>Base da equipe</dt><dd>{team.base}</dd></div><div><dt>Categoria</dt><dd>FORMULA 1</dd></div></dl></section>
   <section className="team-list driver-info-card"><div className="list-heading"><h2><Activity size={17}/> Estatísticas de carreira</h2><span>Dados registrados</span></div>{!loaded?<p className="storage-note">Carregando estatísticas...</p>:<div className="driver-stat-grid"><div><b>{stats.races}</b><small>Corridas concluídas</small></div><div><b>{stats.wins}</b><small>Vitórias</small></div><div><b>{stats.podiums}</b><small>Pódios</small></div><div><b>{stats.points}</b><small>Pontos</small></div></div>}<p className="driver-best"><Medal size={15}/> Melhor resultado <b>{stats.best===null?"—":stats.best+"º lugar"}</b></p></section>
  </div>
  <section className="team-list driver-history-card"><div className="list-heading"><h2><Trophy size={17}/> Histórico esportivo</h2><span>Universo GEOPRIX</span></div><div className="driver-history-empty"><b>Histórico de temporadas</b><p>Os resultados e classificações finais das temporadas serão apresentados aqui conforme forem registrados no sistema.</p></div></section>
  <p className="storage-note">As estatísticas são calculadas a partir das corridas concluídas salvas neste navegador. Dados pessoais e histórico ainda não cadastrados não são presumidos.</p>
 </div></main>;
}