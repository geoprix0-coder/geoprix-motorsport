"use client";
import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import {History,Trophy,CalendarDays} from "lucide-react";

type ArchivedRecommendation={subjectType:"driver"|"team";subjectName:string;attribute:string;direction:"increase"|"decrease";reason:string};
type ArchivedSeason={season:number;completedAt:string;rounds:{id:string;round:number;circuitName:string;status:string}[];reports:{kind?:string;recommendations:ArchivedRecommendation[]}[]};

export default function ChampionshipHistoryPage(){
 const {id}=useParams<{id:string}>();
 const [seasons,setSeasons]=useState<ArchivedSeason[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{const raw=localStorage.getItem("geoprix-season-history-"+id);const parsed=raw?JSON.parse(raw):[];if(Array.isArray(parsed))setSeasons(parsed.sort((a:ArchivedSeason,b:ArchivedSeason)=>b.season-a.season));}
  catch{setSeasons([])}
  setLoaded(true);
 },[id]);
 return <main className="manager-shell"><div className="manager-content">
  <div className="manager-heading"><div><span className="eyebrow">MEMÓRIA ESPORTIVA</span><h1>Histórico</h1><p>Temporadas anteriores deste campeonato e seus relatórios de encerramento.</p></div></div>
  {!loaded?<p>Carregando histórico...</p>:seasons.length===0?<section className="team-list"><div className="empty-state"><History size={28}/><b>Nenhuma temporada anterior cadastrada</b><span>Quando você finalizar a temporada atual pelo Calendário, ela será arquivada aqui.</span></div></section>:seasons.map(season=>{
   const finalReport=season.reports?.find(r=>r.kind==="season-end");
   const recommendations=finalReport?.recommendations||[];
   return <section className="team-list" key={season.season}>
    <div className="list-heading"><div><span className="eyebrow">TEMPORADA ENCERRADA</span><h2>Temporada {season.season}</h2></div><span>{new Date(season.completedAt).toLocaleDateString("pt-BR")}</span></div>
    <div className="manager-stats"><div><CalendarDays/><b>{season.rounds?.length||0}</b><small>Etapas arquivadas</small></div><div><Trophy/><b>{recommendations.length}</b><small>Recomendações finais</small></div></div>
    <div className="storage-note"><b>Calendário arquivado</b>{(season.rounds||[]).map(round=><p key={round.id}>Etapa {round.round} — {round.circuitName}</p>)}</div>
    <div className="development-groups">
     {(["driver","team"] as const).map(type=>{
      const items=recommendations.filter(item=>item.subjectType===type);
      return <section className="development-group" key={type}>
       <div className="development-group-heading"><h3>{type==="driver"?"Recomendações para pilotos":"Recomendações para equipes"}</h3><span>{items.length}</span></div>
       {items.length===0?<p className="storage-note">Nenhuma recomendação registrada.</p>:items.map((item,i)=><article className="development-recommendation" key={type+"-"+i}>
        <div className="standing-name"><b>{item.subjectName}</b><small>{item.attribute}</small></div>
        <strong className={item.direction==="increase"?"recommendation-up":"recommendation-down"}>{item.direction==="increase"?"Aumentar":"Diminuir"}</strong>
        <p className="storage-note">{item.reason}</p>
       </article>)}
      </section>;
     })}
    </div>
   </section>;
  })}
  <p className="storage-note">O histórico é armazenado localmente neste navegador. Os dados arquivados não são apagados quando uma nova temporada começa.</p>
 </div></main>;
}
