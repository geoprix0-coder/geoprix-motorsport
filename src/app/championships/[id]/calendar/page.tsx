"use client";
import { useEffect, useState } from "react";
import { CalendarDays, Plus, Save, Trash2, Pencil, Flag, Trophy, ClipboardList } from "lucide-react";
import type { Circuit, Team } from "@/lib/types";
import { initialChampionships } from "@/lib/seed";
type ResultStatus="finished"|"retired"|"disqualified"|"dns";
type DriverResult={id:string;driverId:string;driverName:string;teamId:string;teamName:string;status:ResultStatus;qualifyingPosition:number|null;position:number|null;points:number};
type Round={id:string;round:number;circuitId:string;circuitName:string;layout:string;status:"scheduled"|"completed";results:DriverResult[]};
type Regulation={positionPoints:number[];bonusRules:{id:string;name:string;points:number;enabled:boolean}[]};
const defaultPoints=[25,18,15,12,10,8,6,4,2,1,...Array(10).fill(0)];
const statusLabels:Record<ResultStatus,string>={finished:"Finalizou",retired:"Abandonou (DNF)",disqualified:"Desclassificado (DSQ)",dns:"Não largou (DNS)"};

type DevelopmentRecommendation={subjectType:"driver"|"team";subjectId:string;subjectName:string;attribute:string;direction:"increase"|"decrease";points?:number;reason:string};
type DevelopmentReport={id:string;roundId:string;round:number;circuitName:string;createdAt:string;kind?:"race"|"season-end";season?:number;recommendations:DevelopmentRecommendation[];notes:string[]};
function buildDevelopmentReport(championshipId:string,allRounds:Round[],current:Round,seasonEnd=false,seasonNumber=2026):DevelopmentReport{
 const completed=allRounds.map(r=>r.id===current.id?current:r).filter(r=>r.status==="completed").sort((a,b)=>a.round-b.round);
 const recent=seasonEnd?completed:completed.slice(-3);
 const driverIds=[...new Set(recent.flatMap(r=>r.results.map(x=>x.driverId)))];
 const recommendations:DevelopmentRecommendation[]=[];
 if(seasonEnd){
 for(const driverId of driverIds){
  const entries=recent.map(r=>({round:r.round,result:r.results.find(x=>x.driverId===driverId),roundResults:r.results})).filter(x=>x.result);
  const driver=entries[entries.length-1]?.result;
  if(!driver)continue;
  const finished=entries.filter(x=>x.result?.status==="finished"&&x.result.position!==null&&x.result.qualifyingPosition!==null);
  const racePaceGaps=finished.map(entry=>{
   const teammate=entry.roundResults.filter(x=>x.teamId===entry.result!.teamId&&x.driverId!==driverId&&x.status==="finished"&&x.position!==null).sort((a,b)=>a.position!-b.position!)[0];
   return teammate?entry.result!.position!-teammate.position!:null;
  }).filter((x):x is number=>x!==null);
  if(racePaceGaps.length>=3){
   const average=racePaceGaps.reduce((a,b)=>a+b,0)/racePaceGaps.length;
   if(average<=-2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Race Pace",direction:"increase",reason:"Manteve desempenho de corrida consistentemente superior ao companheiro de equipe, terminando em média pelo menos duas posições à frente nas etapas comparáveis."});
   else if(average>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Race Pace",direction:"decrease",reason:"Seu desempenho de corrida ficou consistentemente abaixo do companheiro de equipe, terminando em média pelo menos duas posições atrás nas etapas comparáveis."});
  }
  const qualifyingGaps=entries.map(entry=>{
   const own=entry.result;
   if(own?.qualifyingPosition===null||own?.qualifyingPosition===undefined)return null;
   const teammate=entry.roundResults.filter(x=>x.teamId===own.teamId&&x.driverId!==driverId&&x.qualifyingPosition!==null&&x.qualifyingPosition!==undefined).sort((a,b)=>a.qualifyingPosition!-b.qualifyingPosition!)[0];
   return teammate?own.qualifyingPosition-teammate.qualifyingPosition!:null;
  }).filter((x):x is number=>x!==null);
  if(qualifyingGaps.length>=3){
   const average=qualifyingGaps.reduce((a,b)=>a+b,0)/qualifyingGaps.length;
   if(average<=-2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Qualifying",direction:"increase",reason:"Ficou, em média, pelo menos duas posições à frente do companheiro de equipe nas classificações comparáveis."});
   else if(average>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Qualifying",direction:"decrease",reason:"Ficou, em média, pelo menos duas posições atrás do companheiro de equipe nas classificações comparáveis."});
  }
  if(finished.length>=3){
   const averageGain=finished.reduce((sum,x)=>sum+(x.result!.qualifyingPosition!-x.result!.position!),0)/finished.length;
   if(averageGain>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Overtaking",direction:"increase",reason:"Ganhou em média pelo menos duas posições entre a classificação e a chegada nas corridas concluídas. A diferença é usada como indicador indireto de capacidade de ultrapassagem."});
   else if(averageGain<=-2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Overtaking",direction:"decrease",reason:"Perdeu em média pelo menos duas posições entre a classificação e a chegada nas corridas concluídas. A diferença é um indicador indireto, não uma contagem de ultrapassagens reais."});
   const averageLoss=-averageGain;
   if(averageLoss>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Defending",direction:"decrease",reason:"Perdeu em média pelo menos duas posições entre a classificação e a chegada. A diferença é usada como indicador indireto de defesa de posição."});
   else if(averageLoss<=0)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Defending",direction:"increase",reason:"Em média, manteve ou ganhou posições entre a classificação e a chegada nas corridas concluídas. A diferença é um indicador indireto de defesa de posição."});
  }
  const finishPositions=finished.map(x=>x.result!.position as number);
  const nonFinishes=entries.filter(x=>x.result?.status!=="finished").length;
  if(entries.length>=3){
   if(nonFinishes/entries.length>=0.4){
    recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Consistency",direction:"decrease",reason:"Não concluiu pelo menos 40% das corridas registradas na temporada."});
   }else if(finishPositions.length>=3){
    const spread=Math.max(...finishPositions)-Math.min(...finishPositions);
    if(spread<=3)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Consistency",direction:"increase",reason:"Apresentou resultados regulares durante a temporada, com diferença máxima de três posições entre a melhor e a pior chegada."});
    else if(spread>=8)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Consistency",direction:"decrease",reason:"Apresentou grande oscilação nos resultados da temporada, com diferença de oito ou mais posições entre a melhor e a pior chegada."});
   }
  }
 }
 }
 // Desenvolvimento das equipes: durante a temporada usa a tendência recente;
 // no encerramento combina 60% de aleatoriedade com 40% de desempenho real.
 const teamIds=[...new Set(completed.flatMap(r=>r.results.map(x=>x.teamId)))];
 const teamPerformance=teamIds.map(teamId=>{
  const positions=completed.flatMap(r=>r.results.filter(x=>x.teamId===teamId&&x.status==="finished"&&x.position!==null).map(x=>x.position as number));
  const average=positions.length?positions.reduce((a,b)=>a+b,0)/positions.length:Number.POSITIVE_INFINITY;
  const teamResult=completed.flatMap(r=>r.results).find(x=>x.teamId===teamId);
  return {teamId,average,teamResult};
 }).filter(x=>x.teamResult&&Number.isFinite(x.average)).sort((a,b)=>a.average-b.average);
 for(const teamId of teamIds){
  const teamRounds=recent.map(r=>{
   const own=r.results.filter(x=>x.teamId===teamId&&x.status==="finished"&&x.position!==null);
   const others=r.results.filter(x=>x.teamId!==teamId&&x.status==="finished"&&x.position!==null);
   if(!own.length||!others.length)return null;
   return own.reduce((sum,x)=>sum+(x.position as number),0)/own.length-others.reduce((sum,x)=>sum+(x.position as number),0)/others.length;
  }).filter((x):x is number=>x!==null);
  const teamResult=completed.flatMap(r=>r.results).find(x=>x.teamId===teamId);
  if(!teamResult)continue;
  if(seasonEnd){
   if(teamPerformance.length<2)continue;
   const rank=teamPerformance.findIndex(x=>x.teamId===teamId);
   if(rank<0)continue;
   const performanceScore=10-(20*rank/(teamPerformance.length-1));
   for(const attribute of ["Power","Downforce"]){
    const randomComponent=Math.floor(Math.random()*21)-10;
    let points=Math.round(randomComponent*0.6+performanceScore*0.4);
    if(points===0)points=Math.random()<0.5?-1:1;
    points=Math.max(-10,Math.min(10,points));
    recommendations.push({subjectType:"team",subjectId:teamId,subjectName:teamResult.teamName,attribute,direction:points>0?"increase":"decrease",points:Math.abs(points),reason:`Ajuste de encerramento: ${Math.abs(points)} ponto(s) ${points>0?"para cima":"para baixo"}. O cálculo combina 60% de aleatoriedade e 40% do desempenho relativo da equipe nesta temporada. Isso permite reviravoltas entre temporadas; o resultado não mede diretamente ${attribute}.`});
   }
  }else{
   if(teamRounds.length<2)continue;
   const averageDifference=teamRounds.reduce((a,b)=>a+b,0)/teamRounds.length;
   const direction=averageDifference<=-2?"increase":averageDifference>=2?"decrease":null;
   if(!direction)continue;
   const tendency=direction==="increase"?"ficou, em média, pelo menos duas posições à frente da média das demais equipes":"ficou, em média, pelo menos duas posições atrás da média das demais equipes";
   for(const attribute of ["Power","Downforce"]){
    recommendations.push({subjectType:"team",subjectId:teamId,subjectName:teamResult.teamName,attribute,direction,reason:`Nas últimas etapas comparáveis, os pilotos da equipe ${tendency}. É um sinal geral de competitividade para revisar este atributo, não uma medição direta de ${attribute}.`});
   }
  }
 }
 return {id:crypto.randomUUID(),roundId:seasonEnd?"season-end-"+seasonNumber:current.id,round:current.round,circuitName:seasonEnd?"Encerramento da temporada "+seasonNumber:current.circuitName,createdAt:new Date().toISOString(),kind:seasonEnd?"season-end":"race",season:seasonNumber,recommendations,notes:["A análise utiliza posição de classificação, posição de chegada e situação do piloto. Race Pace compara a regularidade do desempenho de corrida com o companheiro de equipe; Qualifying compara posições de classificação; Overtaking e Defending usam a diferença entre largada e chegada como indicadores indiretos; Consistency avalia a variação dos resultados e a frequência de não conclusão.","As recomendações para pilotos são geradas somente no encerramento da temporada e exigem uma amostra mínima de resultados comparáveis. Quando faltam dados ou corridas suficientes, o atributo não recebe recomendação.","Power e Downforce recebem recomendações durante a temporada com base nas últimas etapas. No encerramento, cada atributo recebe uma variação de 1 a 10 pontos, combinando 60% de aleatoriedade e 40% do desempenho relativo da equipe, permitindo reviravoltas entre temporadas.","A diferença entre posição de classificação e chegada não representa ultrapassagens ou defesas reais: abandonos de outros pilotos, penalidades e outros acontecimentos também podem alterar posições.","As recomendações são sugestões; nenhuma alteração é aplicada automaticamente no Geoprix."]};
}
export default function ChampionshipCalendarPage({params}:{params:Promise<{id:string}>}){
 const [championshipId,setChampionshipId]=useState(""),[rounds,setRounds]=useState<Round[]>([]),[circuits,setCircuits]=useState<Circuit[]>([]),[teams,setTeams]=useState<Team[]>([]),[showForm,setShowForm]=useState(false),[editing,setEditing]=useState<string|null>(null),[resultRound,setResultRound]=useState<string|null>(null),[draftResults,setDraftResults]=useState<DriverResult[]>([]),[positionPoints,setPositionPoints]=useState<number[]>(defaultPoints),[ready,setReady]=useState(false),[notice,setNotice]=useState("");
 const [round,setRound]=useState(1),[circuitId,setCircuitId]=useState(""),[layout,setLayout]=useState(""),[gradeFilter,setGradeFilter]=useState(1),[seasonNumber,setSeasonNumber]=useState(2026);
 useEffect(()=>{params.then(({id})=>setChampionshipId(id))},[params]);
 useEffect(()=>{if(!championshipId)return;try{const baseSeason=initialChampionships.find(c=>c.id===championshipId)?.season||2026;const storedSeason=localStorage.getItem("geoprix-season-"+championshipId);setSeasonNumber(storedSeason?Math.max(baseSeason,Number(storedSeason)||baseSeason):baseSeason);const saved=localStorage.getItem("geoprix-calendar-"+championshipId);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))setRounds(parsed.map((r:any)=>({...r,results:Array.isArray(r.results)?r.results:[]})))}const rawCircuits=localStorage.getItem("geoprix-circuits-v1");if(rawCircuits){const parsed=JSON.parse(rawCircuits);if(Array.isArray(parsed))setCircuits(parsed.filter((c:Circuit)=>c.status==="active"))}const rawRegulation=localStorage.getItem("geoprix-regulations-"+championshipId);if(rawRegulation){const parsedRegulation=JSON.parse(rawRegulation) as Partial<Regulation>;setPositionPoints(Array.isArray(parsedRegulation.positionPoints)&&parsedRegulation.positionPoints.length>0?parsedRegulation.positionPoints.map(value=>Math.max(0,Number(value)||0)):defaultPoints)}else{setPositionPoints(defaultPoints)}const rawTeams=localStorage.getItem("geoprix-teams-v1");if(rawTeams){const parsed=JSON.parse(rawTeams);if(Array.isArray(parsed))setTeams(parsed)}}catch{}setReady(true)},[championshipId]);
 useEffect(()=>{if(ready&&championshipId)localStorage.setItem("geoprix-calendar-"+championshipId,JSON.stringify(rounds))},[rounds,ready,championshipId]);
 function reset(){setShowForm(false);setEditing(null);setRound(rounds.length+1);setCircuitId("");setLayout("");setNotice("")}
 function openNew(){setEditing(null);setRound(rounds.length+1);setGradeFilter(1);const available=circuits.filter(c=>(c.grade||1)===1);setCircuitId(available[0]?.id||"");setLayout(available[0]?.layouts?.[0]||"");setShowForm(true);setNotice("")}
 function openEdit(item:Round){setEditing(item.id);setRound(item.round);const selected=circuits.find(c=>c.id===item.circuitId);setGradeFilter(selected?.grade||1);setCircuitId(item.circuitId);setLayout(item.layout);setShowForm(true);setNotice("")}
 function save(){const circuit=circuits.find(c=>c.id===circuitId);if(!circuit){setNotice("Cadastre primeiro um circuito ativo na aba Circuitos.");return}if(round<1||!Number.isInteger(round)){setNotice("Informe um número de etapa válido.");return}if(rounds.some(r=>r.id!==editing&&r.round===round)){setNotice("Já existe uma etapa com esse número.");return}
 const previous=rounds.find(r=>r.id===editing);const item:Round={id:editing||crypto.randomUUID(),round,circuitId,circuitName:circuit.name,layout,status:previous?.status||"scheduled",results:previous?.results||[]};setRounds(old=>(editing?old.map(r=>r.id===editing?item:r):[...old,item]).sort((a,b)=>a.round-b.round));reset();setNotice("Etapa salva no calendário deste campeonato.")}
 function openResults(item:Round){setResultRound(item.id);setDraftResults(item.results.length?item.results.map(r=>({...r,qualifyingPosition:r.qualifyingPosition??null})):teams.flatMap(t=>t.drivers.map(d=>({id:crypto.randomUUID(),driverId:d.id,driverName:d.name,teamId:t.id,teamName:t.name,status:"finished" as ResultStatus,qualifyingPosition:null,position:null,points:0}))));setNotice("")}
 function updateResult(id:string,patch:Partial<DriverResult>){setDraftResults(old=>old.map(r=>r.id===id?{...r,...patch}:r))}
 function pointsForResult(result:DriverResult){return result.status==="finished"&&result.position&&result.position>=1&&result.position<=positionPoints.length?positionPoints[result.position-1]:0}
 function saveResults(){const current=rounds.find(r=>r.id===resultRound);if(!current)return;if(draftResults.some(r=>!Number.isInteger(r.qualifyingPosition)||!r.qualifyingPosition||r.qualifyingPosition<1||r.qualifyingPosition>draftResults.length)){setNotice(`Informe uma posição de classificação válida entre 1º e ${draftResults.length}º para todos os pilotos.`);return}const qualifyingPositions=draftResults.map(r=>r.qualifyingPosition);if(new Set(qualifyingPositions).size!==qualifyingPositions.length){setNotice("Não pode haver posições de classificação repetidas.");return}if(draftResults.some(r=>r.status==="finished"&&(!r.position||r.position<1||r.position>positionPoints.length))){setNotice(`Informe uma posição válida entre 1º e ${positionPoints.length}º para todos os pilotos que finalizaram.`);return}const positions=draftResults.filter(r=>r.status==="finished").map(r=>r.position);if(new Set(positions).size!==positions.length){setNotice("Não pode haver posições de chegada repetidas.");return}const calculatedResults=draftResults.map(r=>({...r,points:pointsForResult(r)}));const completedRound:Round={...current,results:calculatedResults,status:"completed"};const nextRounds=rounds.map(r=>r.id===resultRound?completedRound:r);setRounds(nextRounds);try{const report=buildDevelopmentReport(championshipId,nextRounds,completedRound,false,seasonNumber);const key="geoprix-development-reports-"+championshipId;const saved=localStorage.getItem(key);const reports=saved?JSON.parse(saved) as DevelopmentReport[]:[];localStorage.setItem(key,JSON.stringify([...reports.filter(x=>x.season===seasonNumber&&x.roundId!==completedRound.id),report].sort((a,b)=>a.round-b.round)));}catch{setNotice("Resultados salvos, mas não foi possível gerar o relatório de desenvolvimento.");setResultRound(null);return}setResultRound(null);setNotice("Resultados salvos e relatório de desenvolvimento gerado.");}
 function finishSeason(){
  if(rounds.length===0){setNotice("Adicione pelo menos uma etapa antes de finalizar a temporada.");return}
  if(rounds.some(r=>r.status!=="completed")){setNotice("Para finalizar a temporada, registre os resultados de todas as etapas do calendário.");return}
  if(!confirm("Finalizar a temporada "+seasonNumber+"? O calendário será arquivado, será gerado o relatório de encerramento e uma nova temporada será iniciada."))return;
  try{
   const finalRound=[...rounds].sort((a,b)=>a.round-b.round)[rounds.length-1];
   const reportKey="geoprix-development-reports-"+championshipId;
   const savedReports=localStorage.getItem(reportKey);
   const seasonReports=savedReports?JSON.parse(savedReports) as DevelopmentReport[]:[];
   const finalReport=buildDevelopmentReport(championshipId,rounds,finalRound,true,seasonNumber);
   const archivedReports=[...seasonReports.filter(r=>r.kind!=="season-end"),finalReport];
   const historyKey="geoprix-season-history-"+championshipId;
   const savedHistory=localStorage.getItem(historyKey);
   const history=savedHistory?JSON.parse(savedHistory) as any[]:[];
   history.push({season:seasonNumber,completedAt:new Date().toISOString(),rounds,reports:archivedReports});
   localStorage.setItem(historyKey,JSON.stringify(history));
   const nextSeason=seasonNumber+1;
   localStorage.setItem("geoprix-season-"+championshipId,String(nextSeason));
   localStorage.setItem("geoprix-calendar-"+championshipId,JSON.stringify([]));
   localStorage.setItem(reportKey,JSON.stringify([finalReport]));
   setRounds([]);setSeasonNumber(nextSeason);
   window.dispatchEvent(new Event("geoprix-season-updated"));
   setNotice("Temporada "+(nextSeason-1)+" finalizada e arquivada. Temporada "+nextSeason+" iniciada; monte o novo calendário.");
  }catch{setNotice("Não foi possível finalizar a temporada. Os dados atuais foram mantidos; tente novamente.")}
 }
 return <main className="manager-shell"><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">TEMPORADA {seasonNumber}</span><h1>Calendário</h1><p>Organize as etapas e registre os resultados de cada corrida.</p></div><div className="calendar-heading-actions"><button className="quiet-button" onClick={finishSeason} title="É necessário registrar todas as etapas antes de encerrar." disabled={rounds.length===0||rounds.some(r=>r.status!=="completed")}>Finalizar temporada</button><button className="action-button" onClick={openNew}><Plus size={16}/> Adicionar etapa</button></div></div>
 <section className="manager-stats"><div><CalendarDays/><b>{rounds.length}</b><small>Etapas no calendário</small></div><div><Flag/><b>{new Set(rounds.map(r=>r.circuitId)).size}</b><small>Circuitos utilizados</small></div><div><Trophy/><b>{rounds.filter(r=>r.status==="completed").length}</b><small>Resultados lançados</small></div></section>
 {rounds.length>0&&rounds.some(r=>r.status!=="completed")&&<p className="storage-note">Para liberar “Finalizar temporada”, registre os resultados de todas as etapas do calendário.</p>}{notice&&<p className="notice">{notice}</p>}
 {showForm&&<section className="editor-card"><div className="editor-heading"><div><span className="eyebrow">ETAPA DO CAMPEONATO</span><h2>{editing?"Editar etapa":"Adicionar etapa ao calendário"}</h2></div><button className="quiet-button" onClick={reset}>Cancelar</button></div>
 <div className="form-grid"><label>Número da etapa<input type="number" min="1" step="1" value={round} onChange={e=>setRound(Number(e.target.value))}/></label><label>Grau do circuito<select value={gradeFilter} onChange={e=>{const grade=Number(e.target.value);setGradeFilter(grade);const available=circuits.filter(c=>(c.grade||1)===grade);setCircuitId(available[0]?.id||"");setLayout(available[0]?.layouts?.[0]||"")}}>{[1,2,3,4,5,6].map(g=><option key={g} value={g}>Grau {g}</option>)}</select></label><label className="wide">Circuito<select value={circuitId} onChange={e=>{setCircuitId(e.target.value);const c=circuits.find(x=>x.id===e.target.value);setLayout(c?.layouts?.[0]||"")}}><option value="">Selecione um circuito</option>{circuits.filter(c=>(c.grade||1)===gradeFilter).map(c=><option key={c.id} value={c.id}>{c.name} — {c.country}</option>)}</select></label><label className="wide">Configuração / layout<select value={layout} onChange={e=>setLayout(e.target.value)}><option value="">Selecione um layout</option>{(circuits.find(c=>c.id===circuitId)?.layouts||[]).map(l=><option key={l} value={l}>{l}</option>)}</select></label></div>
 {circuits.length===0&&<p className="storage-note">Nenhum circuito ativo encontrado. Cadastre um circuito na aba Circuitos antes de adicionar uma etapa.</p>}{circuits.length>0&&!circuits.some(c=>(c.grade||1)===gradeFilter)&&<p className="storage-note">Nenhum circuito ativo cadastrado no Grau {gradeFilter}. Selecione outro grau ou cadastre um circuito nessa categoria.</p>}
 <div className="editor-actions"><small>As etapas serão organizadas pelo número da rodada.</small><button className="action-button" onClick={save}><Save size={16}/> Salvar etapa</button></div></section>}
 {resultRound&&<section className="editor-card"><div className="editor-heading"><div><span className="eyebrow">CLASSIFICAÇÃO DA CORRIDA</span><h2>Resultados — Etapa {rounds.find(r=>r.id===resultRound)?.round}</h2></div><button className="quiet-button" onClick={()=>setResultRound(null)}>Fechar</button></div><p className="storage-note">Informe a posição de classificação e a posição de chegada. A pontuação será calculada automaticamente conforme o regulamento. Para os demais, escolha abandono, desclassificação ou não largou.</p>
 {draftResults.length===0?<div className="empty-state"><ClipboardList/><b>Nenhum piloto encontrado</b><span>Cadastre equipes e pilotos na aba Equipes e Pilotos antes de lançar resultados.</span></div>:<div className="result-editor">{draftResults.map((r,i)=><div className="result-edit-row" key={r.id}><div className="result-driver"><b>{r.driverName}</b><small>{r.teamName}</small></div><label>Situação<select value={r.status} onChange={e=>updateResult(r.id,{status:e.target.value as ResultStatus,position:e.target.value==="finished"?r.position:null})}>{Object.entries(statusLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label><label>Classificação<input type="number" min="1" max={draftResults.length} value={r.qualifyingPosition??""} onChange={e=>updateResult(r.id,{qualifyingPosition:e.target.value===""?null:Number(e.target.value)})}/></label>{r.status==="finished"?<><label>Posição de chegada<input type="number" min="1" value={r.position??""} onChange={e=>updateResult(r.id,{position:e.target.value===""?null:Number(e.target.value)})}/></label><div className="result-points-preview"><small>Pontos calculados</small><b>{pointsForResult(r)}</b></div></>:<div className="result-points-preview"><small>Pontos calculados</small><b>0</b></div>}</div>)}</div>}
 <div className="editor-actions"><small>Os pontos serão atribuídos automaticamente conforme o regulamento salvo.</small><button className="action-button" onClick={saveResults}><Save size={16}/> Salvar resultados</button></div></section>}
 <section className="team-list"><div className="list-heading"><h2>Etapas da temporada</h2><span>{rounds.length} etapas</span></div>{!ready?<p>Carregando...</p>:rounds.length===0?<div className="empty-state"><CalendarDays size={28}/><b>Calendário ainda não cadastrado</b><span>Use “Adicionar etapa” para montar o calendário deste campeonato.</span></div>:rounds.map(r=><article className="circuit-row" key={r.id}><div className="circuit-symbol"><b>{r.round}</b></div><div className="circuit-info"><b>{r.circuitName}</b><small>{r.layout||"Configuração não definida"} · {r.results?.length||0} pilotos com resultado</small></div><button className="quiet-button" onClick={()=>openResults(r)}><ClipboardList size={13}/>{r.status==="completed"?"Editar resultados":"Adicionar resultados"}</button><button className="quiet-button" onClick={()=>openEdit(r)}><Pencil size={13}/> Editar</button><button className="icon-button" aria-label="Excluir etapa" onClick={()=>{if(confirm("Excluir esta etapa do calendário?"))setRounds(old=>old.filter(x=>x.id!==r.id))}}><Trash2 size={15}/></button></article>)}</section>
 <p className="storage-note">O calendário e os resultados são salvos localmente neste navegador e separados por campeonato.</p></div></main>;
}