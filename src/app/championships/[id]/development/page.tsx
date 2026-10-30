"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TrendingUp, TrendingDown, ClipboardList } from "lucide-react";

type Recommendation={subjectType:"driver"|"team";subjectId:string;subjectName:string;attribute:string;direction:"increase"|"decrease";reason:string};
type Report={id:string;roundId:string;round:number;circuitName:string;createdAt:string;kind?:"race"|"season-end";season?:number;recommendations:Recommendation[];notes:string[]};

export default function DevelopmentReportsPage(){
 const {id}=useParams<{id:string}>();
 const [reports,setReports]=useState<Report[]>([]);
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{
  try{
   const raw=localStorage.getItem("geoprix-development-reports-"+id);
   const parsed=raw?JSON.parse(raw):[];
   if(Array.isArray(parsed))setReports(parsed.map((report:Report)=>({...report,kind:report.kind||"race",recommendations:report.kind==="season-end"?report.recommendations:report.recommendations.filter(item=>item.subjectType==="team")})).sort((a:Report,b:Report)=>b.round-a.round));
  }catch{setReports([])}
  setLoaded(true);
 },[id]);
 return <main className="manager-shell"><div className="manager-content">
  <div className="manager-heading"><div><span className="eyebrow">GESTÃO DO CAMPEONATO</span><h1>Relatório de Desenvolvimento</h1><p>Análises e sugestões de evolução geradas após cada corrida registrada.</p></div></div>
  <section className="manager-stats">
   <div><ClipboardList/><b>{reports.length}</b><small>Relatórios gerados</small></div>
   <div><TrendingUp/><b>{reports.reduce((n,r)=>n+r.recommendations.filter(x=>x.direction==="increase").length,0)}</b><small>Sugestões de aumento</small></div>
   <div><TrendingDown/><b>{reports.reduce((n,r)=>n+r.recommendations.filter(x=>x.direction==="decrease").length,0)}</b><small>Sugestões de redução</small></div>
  </section>
  {!loaded?<p>Carregando relatórios...</p>:reports.length===0?<section className="team-list"><div className="empty-state"><ClipboardList size={28}/><b>Nenhum relatório disponível</b><span>Assim que você salvar os resultados de uma corrida na aba Calendário, o relatório desta etapa aparecerá aqui.</span></div></section>:reports.map(report=><section className="team-list" key={report.id}>
   <div className="list-heading"><div><span className="eyebrow">RELATÓRIO DE DESENVOLVIMENTO</span><h2>{report.kind==="season-end"?"Encerramento da temporada "+(report.season||""):"Etapa "+report.round+" — "+report.circuitName}</h2></div><span>{new Date(report.createdAt).toLocaleDateString("pt-BR")}</span></div>
   <div className="development-groups">
    {(["driver","team"] as const).map(type=>{
     const items=report.recommendations.filter(item=>item.subjectType===type);
     return <section className="development-group" key={type}>
      <div className="development-group-heading"><h3>{type==="driver"?"Desenvolvimento dos Pilotos":"Desenvolvimento das Equipes"}</h3><span>{items.length} {items.length===1?"recomendação":"recomendações"}</span></div>
      {items.length===0?<div className="empty-state"><b>Nenhuma recomendação para {type==="driver"?"os pilotos":"as equipes"}</b><span>{type==="driver"&&report.kind!=="season-end"?"As recomendações para os pilotos são geradas somente quando a temporada é finalizada.":"Os resultados disponíveis ainda não indicaram uma alteração suficientemente consistente."}</span></div>:items.map((item,i)=><article className="development-recommendation" key={item.subjectType+"-"+item.subjectId+"-"+item.attribute+"-"+i}>
       <div className="standing-name"><b>{item.subjectName}</b><small>{type==="driver"?"Piloto":"Equipe"} · {item.attribute}</small></div>
       <strong className={item.direction==="increase"?"recommendation-up":"recommendation-down"}>{item.direction==="increase"?"Aumentar":"Diminuir"}</strong>
       <p className="storage-note">{item.reason}</p>
      </article>)}
     </section>;
    })}
   </div>
   <div className="storage-note"><b>Observações da análise</b>{report.notes.map((note,i)=><p key={i}>• {note}</p>)}</div>
  </section>)}
  <p className="storage-note">Os relatórios ficam salvos neste navegador e separados por campeonato. As sugestões não alteram os atributos no Geoprix: a aplicação continua sendo manual.</p>
 </div></main>;
}
