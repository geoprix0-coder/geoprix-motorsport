"use client";

export function generateStaticParams() { return [{ id: "__empty__" }]; }

import { useEffect, useState } from "react";
import { CalendarDays, Plus, Save, Trash2, Pencil, Flag, Trophy, ClipboardList } from "lucide-react";
import type { Circuit, Team } from "@/lib/types";
import { initialChampionships } from "@/lib/seed";
import { initialTeamsForChampionship, mergeInitialTeams, teamStorageKey } from "@/lib/championship-data";
import { registerF3Debuts, removeF1DriversFromF2 } from "@/lib/career-hierarchy";
import { replaceF3SeedVacancy } from "@/lib/free-agents";
type ResultStatus="finished"|"retired"|"disqualified"|"dns";
type DriverResult={id:string;driverId:string;driverName:string;teamId:string;teamName:string;status:ResultStatus;qualifyingStatus?:ResultStatus;qualifyingPosition:number|null;position:number|null;points:number};
type ResultSlot={driverId:string;status:ResultStatus};
type Round={id:string;round:number;circuitId:string;circuitName:string;layout:string;status:"scheduled"|"completed";results:DriverResult[]};
type Regulation={positionPoints:number[];bonusRules:{id:string;name:string;points:number;enabled:boolean}[]};
type CircuitContract={id:string;circuitId:string;category:string;startSeason:number;endSeason:number;status:"active"|"negotiation"|"terminated"};
const defaultPoints=[25,18,15,12,10,8,6,4,2,1,...Array(20).fill(0)];
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
 const [championshipId,setChampionshipId]=useState(""),[rounds,setRounds]=useState<Round[]>([]),[circuits,setCircuits]=useState<Circuit[]>([]),[teams,setTeams]=useState<Team[]>([]),[showForm,setShowForm]=useState(false),[editing,setEditing]=useState<string|null>(null),[resultRound,setResultRound]=useState<string|null>(null),[draftResults,setDraftResults]=useState<DriverResult[]>([]),[qualifyingSlots,setQualifyingSlots]=useState<ResultSlot[]>([]),[raceSlots,setRaceSlots]=useState<ResultSlot[]>([]),[contracts,setContracts]=useState<CircuitContract[]>([]),[positionPoints,setPositionPoints]=useState<number[]>(defaultPoints),[ready,setReady]=useState(false),[notice,setNotice]=useState("");
 const [round,setRound]=useState(1),[circuitId,setCircuitId]=useState(""),[layout,setLayout]=useState(""),[seasonNumber,setSeasonNumber]=useState(2026);
 useEffect(()=>{params.then(({id})=>setChampionshipId(id))},[params]);
 useEffect(()=>{if(!championshipId)return;try{const baseSeason=initialChampionships.find(c=>c.id===championshipId)?.season||2026;const storedSeason=localStorage.getItem("geoprix-season-"+championshipId);setSeasonNumber(storedSeason?Math.max(baseSeason,Number(storedSeason)||baseSeason):baseSeason);const saved=localStorage.getItem("geoprix-calendar-"+championshipId);if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))setRounds(parsed.map((r:any)=>({...r,results:Array.isArray(r.results)?r.results:[]})))}const rawCircuits=localStorage.getItem("geoprix-circuits-v1");if(rawCircuits){const parsed=JSON.parse(rawCircuits);if(Array.isArray(parsed))setCircuits(parsed.map((c:any)=>({...c,grade:Number(c.grade)||1,status:c.status||"active",layouts:Array.isArray(c.layouts)?c.layouts:["Principal"]})).filter((c:Circuit)=>c.status==="active"))}const rawContracts=localStorage.getItem("geoprix-circuit-contracts-v1");if(rawContracts){const parsedContracts=JSON.parse(rawContracts);if(Array.isArray(parsedContracts))setContracts(parsedContracts)}const rawRegulation=localStorage.getItem("geoprix-regulations-"+championshipId);if(rawRegulation){const parsedRegulation=JSON.parse(rawRegulation) as Partial<Regulation>;setPositionPoints(Array.isArray(parsedRegulation.positionPoints)&&parsedRegulation.positionPoints.length>0?[...parsedRegulation.positionPoints.map(value=>Math.max(0,Number(value)||0)),...Array(Math.max(0,30-parsedRegulation.positionPoints.length)).fill(0)]:defaultPoints)}else{setPositionPoints(defaultPoints)}const teamKey=teamStorageKey(championshipId);const rawTeams=localStorage.getItem(teamKey);if(rawTeams){const parsed=JSON.parse(rawTeams);const loaded=mergeInitialTeams(championshipId,Array.isArray(parsed)?parsed:[]);if(championshipId==="formula-2-2026"){const f1Raw=localStorage.getItem(teamStorageKey("formula-1-2026"));const f1=f1Raw?JSON.parse(f1Raw) as Team[]:[];const eligible=removeF1DriversFromF2(loaded,f1);setTeams(eligible);localStorage.setItem(teamKey,JSON.stringify(eligible))}else setTeams(loaded)}else{const fallback=initialTeamsForChampionship(championshipId);if(championshipId==="formula-3-2026"){const f3=replaceF3SeedVacancy(fallback,baseSeason);registerF3Debuts(f3.flatMap(team=>team.drivers),baseSeason);setTeams(f3)}else setTeams(fallback)}}catch{}setReady(true)},[championshipId]);
 useEffect(()=>{if(ready&&championshipId){localStorage.setItem("geoprix-calendar-"+championshipId,JSON.stringify(rounds));window.dispatchEvent(new Event("geoprix-calendar-updated"));}},[rounds,ready,championshipId]);
 const championship=initialChampionships.find(c=>c.id===championshipId);
 const normalizeCategory=(value:string)=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");
 const championshipCategoryKeys=[normalizeCategory(championship?.name||""),normalizeCategory(championship?.category||"")].filter(Boolean);
 const contractedCircuits=circuits.filter(circuit=>String(circuit.status).toLowerCase()==="active"&&contracts.some(contract=>{
  const linkedCircuit=circuits.find(item=>String(item.id)===String(contract.circuitId));
  const sameCircuit=String(contract.circuitId)===String(circuit.id)||(linkedCircuit&&normalizeCategory(linkedCircuit.name)===normalizeCategory(circuit.name));
  return sameCircuit&&String(contract.status).toLowerCase()==="active"&&Number(contract.startSeason)<=seasonNumber&&Number(contract.endSeason)>=seasonNumber&&championshipCategoryKeys.includes(normalizeCategory(contract.category));
 }));

 function reset(){setShowForm(false);setEditing(null);setRound(rounds.length+1);setCircuitId("");setLayout("");setNotice("")}
 function openNew(){setEditing(null);setRound(rounds.length+1);setCircuitId(contractedCircuits[0]?.id||"");setLayout(contractedCircuits[0]?.layouts?.[0]||"");setShowForm(true);setNotice("")}
 function openEdit(item:Round){setEditing(item.id);setRound(item.round);setCircuitId(item.circuitId);setLayout(item.layout);setShowForm(true);setNotice("")}
 function save(){const circuit=contractedCircuits.find(c=>c.id===circuitId);if(!circuit){setNotice("Este circuito não possui contrato vigente com esta categoria na temporada selecionada. Cadastre ou renove o contrato em Circuitos → Contratos.");return}if(round<1||!Number.isInteger(round)){setNotice("Informe um número de etapa válido.");return}if(rounds.some(r=>r.id!==editing&&r.round===round)){setNotice("Já existe uma etapa com esse número.");return}
 const previous=rounds.find(r=>r.id===editing);const item:Round={id:editing||crypto.randomUUID(),round,circuitId,circuitName:circuit.name,layout,status:previous?.status||"scheduled",results:previous?.results||[]};setRounds(old=>(editing?old.map(r=>r.id===editing?item:r):[...old,item]).sort((a,b)=>a.round-b.round));reset();setNotice("Etapa salva no calendário deste campeonato.")}
 function makeSlots(results:DriverResult[],session:"qualifying"|"race"):ResultSlot[]{const sorted=[...results].sort((a,b)=>{const ap=session==="qualifying"?a.qualifyingPosition:a.position;const bp=session==="qualifying"?b.qualifyingPosition:b.position;return (ap??Number.MAX_SAFE_INTEGER)-(bp??Number.MAX_SAFE_INTEGER)});return sorted.map(r=>({driverId:r.driverId,status:session==="qualifying"?(r.qualifyingStatus||"finished"):r.status}))}
 function openResults(item:Round){const source=item.results.length?item.results.map(r=>({...r,qualifyingPosition:r.qualifyingPosition??null})):teams.flatMap(t=>t.drivers.map(d=>({id:crypto.randomUUID(),driverId:d.id,driverName:d.name,teamId:t.id,teamName:t.name,status:"finished" as ResultStatus,qualifyingStatus:"finished" as ResultStatus,qualifyingPosition:null,position:null,points:0})));setResultRound(item.id);setDraftResults(source);setQualifyingSlots(item.results.length?makeSlots(source,"qualifying"):source.map(()=>({driverId:"",status:"finished" as ResultStatus})));setRaceSlots(item.results.length?makeSlots(source,"race"):source.map(()=>({driverId:"",status:"finished" as ResultStatus})));setNotice("")}
 function pointsForResult(result:DriverResult){return result.status==="finished"&&result.position&&result.position>=1&&result.position<=positionPoints.length?positionPoints[result.position-1]:0}
 function slotPosition(slots:ResultSlot[],index:number){return slots.slice(0,index+1).filter(slot=>slot.status==="finished").length}
 function updateSlot(session:"qualifying"|"race",index:number,patch:Partial<ResultSlot>){const setter=session==="qualifying"?setQualifyingSlots:setRaceSlots;setter(old=>{if(patch.driverId){const otherIndex=old.findIndex((slot,i)=>i!==index&&slot.driverId===patch.driverId);if(otherIndex>=0){const previous=old[index].driverId;return old.map((slot,i)=>i===index?{...slot,...patch}:i===otherIndex?{...slot,driverId:previous}:slot)}}return old.map((slot,i)=>i===index?{...slot,...patch}:slot)})}
 function saveResults(){const current=rounds.find(r=>r.id===resultRound);if(!current)return;const expected=draftResults.map(r=>r.driverId);for(const [label,slots] of [["classificação",qualifyingSlots],["corrida",raceSlots]] as const){const selected=slots.map(slot=>slot.driverId);if(slots.length!==draftResults.length||selected.some(id=>!id)||new Set(selected).size!==expected.length||expected.some(id=>!selected.includes(id))){setNotice(`Selecione cada piloto exatamente uma vez na ${label}.`);return}}
  const qualifyingByDriver=new Map<string,{position:number|null;status:ResultStatus}>();let qPosition=0;for(const slot of qualifyingSlots){if(slot.status==="finished"){qPosition++;qualifyingByDriver.set(slot.driverId,{position:qPosition,status:slot.status})}else qualifyingByDriver.set(slot.driverId,{position:null,status:slot.status})}
  const raceByDriver=new Map<string,{position:number|null;status:ResultStatus}>();let racePosition=0;for(const slot of raceSlots){if(slot.status==="finished"){racePosition++;raceByDriver.set(slot.driverId,{position:racePosition,status:slot.status})}else raceByDriver.set(slot.driverId,{position:null,status:slot.status})}
  const calculatedResults=draftResults.map(r=>{const qualifying=qualifyingByDriver.get(r.driverId)!;const race=raceByDriver.get(r.driverId)!;const result={...r,qualifyingPosition:qualifying.position,qualifyingStatus:qualifying.status,status:race.status,position:race.position,points:0};return {...result,points:pointsForResult(result)}});const completedRound:Round={...current,results:calculatedResults,status:"completed"};const nextRounds=rounds.map(r=>r.id===resultRound?completedRound:r);setRounds(nextRounds);try{const report=buildDevelopmentReport(championshipId,nextRounds,completedRound,false,seasonNumber);const key="geoprix-development-reports-"+championshipId;const saved=localStorage.getItem(key);const reports=saved?JSON.parse(saved) as DevelopmentReport[]:[];localStorage.setItem(key,JSON.stringify([...reports.filter(x=>x.season===seasonNumber&&x.roundId!==completedRound.id),report].sort((a,b)=>a.round-b.round)));}catch{setNotice("Resultados salvos, mas não foi possível gerar o relatório de desenvolvimento.");setResultRound(null);return}setResultRound(null);setNotice("Resultados salvos e relatório de desenvolvimento gerado.");}
 return <main className="manager-shell"><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">TEMPORADA {seasonNumber}</span><h1>Calendário</h1><p>Organize as etapas e registre os resultados de cada corrida.</p></div><div className="calendar-heading-actions"><button className="action-button" onClick={openNew}><Plus size={16}/> Adicionar etapa</button></div></div>
 <section className="manager-stats"><div><CalendarDays/><b>{rounds.length}</b><small>Etapas no calendário</small></div><div><Flag/><b>{new Set(rounds.map(r=>r.circuitId)).size}</b><small>Circuitos utilizados</small></div><div><Trophy/><b>{rounds.filter(r=>r.status==="completed").length}</b><small>Resultados lançados</small></div></section>
 {rounds.length>0&&rounds.some(r=>r.status!=="completed")&&<p className="storage-note">Registre os resultados de todas as etapas. O encerramento global será liberado na aba Visão geral quando todos os campeonatos estiverem concluídos.</p>}{notice&&<p className="notice">{notice}</p>}
 {showForm&&<section className="editor-card"><div className="editor-heading"><div><span className="eyebrow">ETAPA DO CAMPEONATO</span><h2>{editing?"Editar etapa":"Adicionar etapa ao calendário"}</h2></div><button className="quiet-button" onClick={reset}>Cancelar</button></div>
 <div className="form-grid"><label>Número da etapa<input type="number" min="1" step="1" value={round} onChange={e=>setRound(Number(e.target.value))}/></label><label className="wide">Circuito<select value={circuitId} onChange={e=>{setCircuitId(e.target.value);const c=circuits.find(x=>x.id===e.target.value);setLayout(c?.layouts?.[0]||"")}}><option value="">Selecione um circuito</option>{contractedCircuits.map(c=><option key={c.id} value={c.id}>{c.name} — {c.country}</option>)}</select></label><label className="wide">Configuração / layout<select value={layout} onChange={e=>setLayout(e.target.value)}><option value="">Selecione um layout</option>{(circuits.find(c=>c.id===circuitId)?.layouts||[]).map(l=><option key={l} value={l}>{l}</option>)}</select></label></div>
 {contractedCircuits.length===0&&<p className="storage-note">Nenhum circuito possui contrato vigente com {championship?.name||"esta categoria"} na temporada {seasonNumber}. Cadastre ou renove contratos em Circuitos → Contratos.</p>}
 <div className="editor-actions"><small>As etapas serão organizadas pelo número da rodada.</small><button className="action-button" onClick={save}><Save size={16}/> Salvar etapa</button></div></section>}
  {resultRound&&<section className="editor-card"><div className="editor-heading"><div><span className="eyebrow">REGISTRO DE RESULTADOS</span><h2>Resultados — Etapa {rounds.find(r=>r.id===resultRound)?.round}</h2></div><button className="quiet-button" onClick={()=>setResultRound(null)}>Fechar</button></div><p className="storage-note">Em cada sessão, selecione os pilotos na ordem em que terminaram. Marque “Abandono (DNF)” quando o piloto não concluir; ele será registrado sem posição e não receberá pontos naquela sessão.</p>
  {draftResults.length===0?<div className="empty-state"><ClipboardList/><b>Nenhum piloto encontrado</b><span>Cadastre equipes e pilotos na aba Equipes e Pilotos antes de lançar resultados.</span></div>:<div className="result-editor">
   {(["qualifying","race"] as const).map(session=>{const slots=session==="qualifying"?qualifyingSlots:raceSlots;const title=session==="qualifying"?"Classificação":"Corrida";return <section className="result-session" key={session}><div className="result-session-heading"><div><b>{title}</b><small>{slots.filter(slot=>slot.status==="finished").length} finalizados · {slots.filter(slot=>slot.status!=="finished").length} não concluíram</small></div></div>
    {slots.map((slot,index)=>{const selected=slot.driverId;const driver=draftResults.find(r=>r.driverId===selected);const position=slotPosition(slots,index);const availableStatuses:ResultStatus[]=["finished","retired",...(slot.status==="disqualified"?["disqualified" as ResultStatus]:[]),...(slot.status==="dns"?["dns" as ResultStatus]:[])];const preview=driver?pointsForResult({...driver,status:slot.status,position:slot.status==="finished"?position:null}):0;return <div className="result-slot-row" key={session+"-"+index}><div className={"result-slot-position "+(slot.status==="finished"?"":"is-retired")}>{slot.status==="finished"?position+"º":statusLabels[slot.status]}</div><label className="result-slot-driver"><span>Piloto</span><select value={selected} onChange={e=>updateSlot(session,index,{driverId:e.target.value})}><option value="">Selecionar piloto</option>{draftResults.map(candidate=><option key={candidate.driverId} value={candidate.driverId}>{candidate.driverName} — {candidate.teamName}</option>)}</select></label><label className="result-slot-status"><span>Observação</span><select value={slot.status} onChange={e=>updateSlot(session,index,{status:e.target.value as ResultStatus})}><option value="finished">Finalizou</option><option value="retired">Abandono (DNF)</option>{availableStatuses.includes("disqualified")&&<option value="disqualified">Desclassificado (DSQ)</option>}{availableStatuses.includes("dns")&&<option value="dns">Não largou (DNS)</option>}</select></label>{session==="race"&&<div className="result-points-preview"><small>Pontos</small><b>{preview}</b></div>}</div>})}
   </section>})}
  </div>}
  <div className="editor-actions"><small>As posições e a pontuação são calculadas automaticamente pela ordem dos pilotos que finalizaram cada sessão.</small><button className="action-button" onClick={saveResults}><Save size={16}/> Salvar resultados</button></div></section>}
 <section className="team-list"><div className="list-heading"><h2>Etapas da temporada</h2><span>{rounds.length} etapas</span></div>{!ready?<p>Carregando...</p>:rounds.length===0?<div className="empty-state"><CalendarDays size={28}/><b>Calendário ainda não cadastrado</b><span>Use “Adicionar etapa” para montar o calendário deste campeonato.</span></div>:rounds.map(r=><article className="circuit-row" key={r.id}><div className="circuit-symbol"><b>{r.round}</b></div><div className="circuit-info"><b>{r.circuitName}</b><small>{r.layout||"Configuração não definida"} · {r.results?.length||0} pilotos com resultado</small></div><button className="quiet-button" onClick={()=>openResults(r)}><ClipboardList size={13}/>{r.status==="completed"?"Editar resultados":"Adicionar resultados"}</button><button className="quiet-button" onClick={()=>openEdit(r)}><Pencil size={13}/> Editar</button><button className="icon-button" aria-label="Excluir etapa" onClick={()=>{if(confirm("Excluir esta etapa do calendário?"))setRounds(old=>old.filter(x=>x.id!==r.id))}}><Trash2 size={15}/></button></article>)}</section>
 <p className="storage-note">O calendário e os resultados são salvos localmente neste navegador e separados por campeonato.</p></div></main>;
}