import type { Round } from "./season-finalization-types";
type DevelopmentRecommendation={subjectType:"driver"|"team";subjectId:string;subjectName:string;attribute:string;direction:"increase"|"decrease";points?:number;reason:string};
type DevelopmentReport={id:string;roundId:string;round:number;circuitName:string;createdAt:string;kind?:"race"|"season-end";season?:number;recommendations:DevelopmentRecommendation[];notes:string[]};
export function buildDevelopmentReport(championshipId:string,allRounds:Round[],current:Round,seasonEnd=false,seasonNumber=2026):DevelopmentReport{
 const completed=allRounds.map(r=>r.id===current.id?current:r).filter(r=>r.status==="completed").sort((a,b)=>a.round-b.round);
 const recent=seasonEnd?completed:completed.slice(-3);
 const driverIds=[...new Set(recent.flatMap(r=>r.results.map(x=>x.driverId)))];
 const recommendations:DevelopmentRecommendation[]=[];
 if(seasonEnd){
 for(const driverId of driverIds){
  const entries=recent.map(r=>({round:r.round,result:r.results.find(x=>x.driverId===driverId),roundResults:r.results})).filter(x=>x.result);
  const driver=entries[entries.length-1]?.result;
  if(!driver)continue;
  const finished=entries.filter(x=>x.result?.status==="finished"&&x.result.position!==null);
  const gridFinished=finished.filter(x=>x.result?.qualifyingPosition!==null&&x.result?.qualifyingPosition!==undefined);
  const racePaceGaps=finished.map(entry=>{
   const teammate=entry.roundResults.filter(x=>x.teamId===entry.result!.teamId&&x.driverId!==driverId&&x.status==="finished"&&x.position!==null).sort((a,b)=>a.position!-b.position!)[0];
   return teammate?entry.result!.position!-teammate.position!:null;
  }).filter((x):x is number=>x!==null);
  if(racePaceGaps.length>=2){
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
  if(qualifyingGaps.length>=2){
   const average=qualifyingGaps.reduce((a,b)=>a+b,0)/qualifyingGaps.length;
   if(average<=-2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Qualifying",direction:"increase",reason:"Ficou, em média, pelo menos duas posições à frente do companheiro de equipe nas classificações comparáveis."});
   else if(average>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Qualifying",direction:"decrease",reason:"Ficou, em média, pelo menos duas posições atrás do companheiro de equipe nas classificações comparáveis."});
  }
  if(gridFinished.length>=2){
   const averageGain=gridFinished.reduce((sum,x)=>sum+(x.result!.qualifyingPosition!-x.result!.position!),0)/gridFinished.length;
   if(averageGain>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Overtaking",direction:"increase",reason:"Ganhou em média pelo menos duas posições entre a classificação e a chegada nas corridas concluídas. A diferença é usada como indicador indireto de capacidade de ultrapassagem."});
   else if(averageGain<=-2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Overtaking",direction:"decrease",reason:"Perdeu em média pelo menos duas posições entre a classificação e a chegada nas corridas concluídas. A diferença é um indicador indireto, não uma contagem de ultrapassagens reais."});
   const averageLoss=-averageGain;
   if(averageLoss>=2)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Defending",direction:"decrease",reason:"Perdeu em média pelo menos duas posições entre a classificação e a chegada. A diferença é usada como indicador indireto de defesa de posição."});
   else if(averageLoss<=0)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Defending",direction:"increase",reason:"Em média, manteve ou ganhou posições entre a classificação e a chegada nas corridas concluídas. A diferença é um indicador indireto de defesa de posição."});
  }
  const finishPositions=finished.map(x=>x.result!.position as number);
  const nonFinishes=entries.filter(x=>x.result?.status!=="finished").length;
  if(entries.length>=2){
   if(nonFinishes/entries.length>=0.4){
    recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Consistency",direction:"decrease",reason:"Não concluiu pelo menos 40% das corridas registradas na temporada."});
   }else if(finishPositions.length>=2){
    const spread=Math.max(...finishPositions)-Math.min(...finishPositions);
    if(spread<=3)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Consistency",direction:"increase",reason:"Apresentou resultados regulares durante a temporada, com diferença máxima de três posições entre a melhor e a pior chegada."});
    else if(spread>=8)recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Consistency",direction:"decrease",reason:"Apresentou grande oscilação nos resultados da temporada, com diferença de oito ou mais posições entre a melhor e a pior chegada."});
   }
  }
   // Garante uma avaliação para cada piloto mesmo quando faltam comparações específicas.
   const hasDriverRecommendation=recommendations.some(item=>item.subjectType==="driver"&&item.subjectId===driverId);
   if(!hasDriverRecommendation){
    const ownAverage=entries.reduce((sum,entry)=>sum+(Number(entry.result?.points)||0),0)/entries.length;
    const fieldEntries=completed.flatMap(round=>round.results.map(result=>({driverId:result.driverId,points:Number(result.points)||0})));
    const fieldAverages=[...new Set(fieldEntries.map(item=>item.driverId))].map(id=>{const rows=fieldEntries.filter(item=>item.driverId===id);return rows.reduce((sum,item)=>sum+item.points,0)/rows.length;});
    const fieldAverage=fieldAverages.length?fieldAverages.reduce((sum,value)=>sum+value,0)/fieldAverages.length:0;
    const direction=ownAverage>=fieldAverage?"increase":"decrease";
    recommendations.push({subjectType:"driver",subjectId:driverId,subjectName:driver.driverName,attribute:"Race Pace",direction,reason:`Avaliação geral de encerramento: média de ${ownAverage.toFixed(1)} ponto(s) por etapa, comparada à média de ${fieldAverage.toFixed(1)} do grid. Como não houve amostra suficiente para recomendações específicas, a pontuação média foi usada como indicador geral de ritmo; isso não isola o desempenho do piloto do equipamento.`});
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
 return {id:crypto.randomUUID(),roundId:seasonEnd?"season-end-"+seasonNumber:current.id,round:current.round,circuitName:seasonEnd?"Encerramento da temporada "+seasonNumber:current.circuitName,createdAt:new Date().toISOString(),kind:seasonEnd?"season-end":"race",season:seasonNumber,recommendations,notes:["A análise utiliza posição de classificação, posição de chegada e situação do piloto. Race Pace compara a regularidade do desempenho de corrida com o companheiro de equipe; Qualifying compara posições de classificação; Overtaking e Defending usam a diferença entre largada e chegada como indicadores indiretos; Consistency avalia a variação dos resultados e a frequência de não conclusão.","As recomendações específicas para pilotos usam comparações com companheiros e posições de classificação/chegada, com amostra mínima de duas etapas comparáveis. Se os dados forem insuficientes para esses critérios, cada piloto recebe uma avaliação geral de Race Pace baseada na média de pontos por etapa em relação ao grid.","Power e Downforce recebem recomendações durante a temporada com base nas últimas etapas. No encerramento, cada atributo recebe uma variação de 1 a 10 pontos, combinando 60% de aleatoriedade e 40% do desempenho relativo da equipe, permitindo reviravoltas entre temporadas.","A diferença entre posição de classificação e chegada não representa ultrapassagens ou defesas reais: abandonos de outros pilotos, penalidades e outros acontecimentos também podem alterar posições.","As recomendações são sugestões; nenhuma alteração é aplicada automaticamente no Geoprix."]};
}
