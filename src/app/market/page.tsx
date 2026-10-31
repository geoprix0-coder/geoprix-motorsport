"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRightLeft,CalendarClock,Handshake,Users} from "lucide-react";
import {initialTeams,initialChampionships} from "@/lib/seed";
import type {Team} from "@/lib/types";
import {initializeDriverContracts,getContractEndLabel} from "@/lib/market";
type Contract={driverId:string;teamId:string;startSeason:number;endSeason:number;endLabel?:string;status:string};
type Event={id:string;season:number;type:"transfer"|"renewal";driverId:string;driverName:string;fromTeamId:string;fromTeamName:string;toTeamId:string;toTeamName:string;contractEnd:number;reason:string;createdAt:string};
export default function MarketPage(){
 const [teams,setTeams]=useState<Team[]>(initialTeams),[contracts,setContracts]=useState<Contract[]>([]),[events,setEvents]=useState<Event[]>([]),[season,setSeason]=useState(2026),[ready,setReady]=useState(false);
 useEffect(()=>{const championship=initialChampionships[0];try{const rawTeams=localStorage.getItem("geoprix-teams-v1");if(rawTeams){const parsed=JSON.parse(rawTeams);if(Array.isArray(parsed))setTeams(parsed)}const currentTeams=rawTeams?JSON.parse(rawTeams) as Team[]:initialTeams;const initialized=initializeDriverContracts(currentTeams);setContracts(initialized);const rawEvents=localStorage.getItem("geoprix-market-history-v1");if(rawEvents){const parsed=JSON.parse(rawEvents);if(Array.isArray(parsed))setEvents(parsed)}if(championship){const stored=localStorage.getItem("geoprix-season-"+championship.id);setSeason(stored?Math.max(championship.season,Number(stored)||championship.season):championship.season)}}catch{}setReady(true)},[]);
 const driverCount=teams.reduce((n,t)=>n+t.drivers.length,0);
 const activeContracts=contracts.filter(c=>c.status==="active").length;
 const sorted=[...events].sort((a,b)=>b.season-a.season||b.createdAt.localeCompare(a.createdAt));
 return <main className="manager-shell"><header className="manager-top"><Link href="/drivers/" className="back-link"><ArrowLeft size={15}/> Voltar para Pilotos</Link><span className="eyebrow">MERCADO GLOBAL · GEOPRIX</span></header><div className="manager-content">
 <div className="manager-heading"><div><span className="eyebrow">JANELA DE TRANSFERÊNCIAS</span><h1>Mercado de pilotos</h1><p>Negociações, contratos e movimentações simulados automaticamente pelo universo.</p></div><span className="tag green">AUTOMÁTICO</span></div>
 <section className="manager-stats"><div><Users/><b>{driverCount}</b><small>Pilotos no universo</small></div><div><Handshake/><b>{activeContracts}</b><small>Contratos registrados</small></div><div><ArrowRightLeft/><b>{events.filter(e=>e.type==="transfer").length}</b><small>Transferências realizadas</small></div><div><CalendarClock/><b>{season}</b><small>Temporada atual</small></div></section>
 <section className="team-list"><div className="list-heading"><h2>Últimas movimentações</h2><span>{events.length} registros</span></div>
 {!ready?<div className="empty-state">Carregando mercado...</div>:sorted.length===0?<div className="empty-state"><Handshake size={28}/><b>O mercado ainda não abriu</b><span>Os contratos iniciais serão estabelecidos automaticamente e a primeira janela será processada ao finalizar a temporada {season}.</span></div>:sorted.map(e=><article className="market-event-row" key={e.id}><div className="market-event-icon">{e.type==="transfer"?<ArrowRightLeft size={18}/>:<Handshake size={18}/>}</div><div className="market-event-main"><b>{e.driverName}</b><small>{e.type==="transfer"?"Transferência":"Renovação"} · Temporada {e.season}</small><p>{e.fromTeamName} <ArrowRightLeft size={12}/> {e.toTeamName}</p><small>{e.reason}</small></div><div className="market-event-contract"><b>{e.contractEnd}</b><small>Fim do contrato</small></div></article>)}</section>
 <section className="team-list"><div className="list-heading"><h2>Contratos vigentes</h2><span>{activeContracts} contratos</span></div>{contracts.length===0?<div className="empty-state">Os vínculos serão criados na primeira janela de mercado.</div>:contracts.filter(c=>c.status==="active").sort((a,b)=>a.endSeason-b.endSeason).map(c=>{const team=teams.find(t=>t.id===c.teamId);const driver=teams.flatMap(t=>t.drivers).find(d=>d.id===c.driverId);return <article className="market-contract-row" key={c.driverId}><div><b>{driver?.name||c.driverId}</b><small>{team?.name||"Equipe não encontrada"}</small></div><span>Até o fim de {getContractEndLabel(c)}</span></article>})}</section>
 <p className="storage-note">O mercado é processado uma única vez quando uma temporada é finalizada. O sistema considera classificação individual, posição das equipes e duração dos contratos. Nenhuma transferência é executada antes do encerramento da temporada.</p>
 </div></main>;
}
