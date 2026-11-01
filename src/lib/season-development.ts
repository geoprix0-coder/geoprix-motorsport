import type { Team } from "./types";

export type TeamDevelopment = {
  developmentCapacity:number;
  investment:number;
  technicalEfficiency:number;
  technicalStability:number;
};
export type DriverAttributes = {
  racePace:number;
  qualifying:number;
  overtaking:number;
  defending:number;
  consistency:number;
};
export const TEAM_DEVELOPMENT_LABELS:Record<keyof TeamDevelopment,string>={
  developmentCapacity:"Capacidade de desenvolvimento",
  investment:"Investimento",
  technicalEfficiency:"Eficiência técnica",
  technicalStability:"Estabilidade técnica"
};
export const DRIVER_ATTRIBUTE_LABELS:Record<keyof DriverAttributes,string>={
  racePace:"Race Pace",qualifying:"Qualifying",overtaking:"Overtaking",defending:"Defending",consistency:"Consistency"
};
const clamp=(n:number)=>Math.max(0,Math.min(100,Math.round(n)));
const hash=(s:string)=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0;};
const seeded=(key:string,min:number,max:number)=>min+(hash(key)%(max-min+1));
export function ensureDevelopmentData(teams:Team[],season:number):Team[]{
 return teams.map(team=>({...team,
  development:team.development||{
   developmentCapacity:seeded(team.id+"-capacity",48,78),
   investment:seeded(team.id+"-investment",42,82),
   technicalEfficiency:seeded(team.id+"-efficiency",45,80),
   technicalStability:seeded(team.id+"-stability",48,82)
  },
  drivers:team.drivers.map(driver=>({...driver,
   age:typeof driver.age==="number"?driver.age:seeded(driver.id+"-age-"+season,20,35),
   attributes:driver.attributes||{racePace:50,qualifying:50,overtaking:50,defending:50,consistency:50}
  }))
 }));
}
function ageBand(age:number){
 if(age<=23)return "young";
 if(age<=27)return "developing";
 if(age<=32)return "prime";
 if(age<=36)return "veteran";
 return "experienced";
}
function randomDelta(key:string,span:number){return (hash(key)%(span*2+1))-span;}
export function advanceSeasonDevelopment(input:Team[],season:number,standings:{id:string;position:number;points:number}[],driverStandings:{id:string;position:number;points:number}[]=[]){
 const teams=ensureDevelopmentData(input,season);
 const rank=new Map(standings.map(x=>[x.id,x.position]));
 const next=teams.map(team=>{
  const old=team.development!;
  const position=rank.get(team.id)||teams.length;
  const relative=teams.length>1?(teams.length+1-2*position)/(teams.length-1):0;
  const nextDevelopment={...old};
  (Object.keys(old) as (keyof TeamDevelopment)[]).forEach(key=>{
   const base=key==="investment"?randomDelta(team.id+season+key,3):randomDelta(team.id+season+key,4);
   const competitiveInfluence=key==="investment"?relative*1.2:relative*.35;
   nextDevelopment[key]=clamp(old[key]+base+competitiveInfluence);
  });
  const technicalScore=(nextDevelopment.developmentCapacity*.28+nextDevelopment.investment*.22+nextDevelopment.technicalEfficiency*.32+nextDevelopment.technicalStability*.18)/100;
  const nextTeam={...team,development:nextDevelopment,
   drivers:team.drivers.map(driver=>{
    const age=Number(driver.age)||25;
    const band=ageBand(age);
    const attributes={...(driver.attributes||{racePace:50,qualifying:50,overtaking:50,defending:50,consistency:50})};
    const driverRank=driverStandings.find(x=>x.id===driver.id)?.position;
    const performance=driverRank&&driverStandings.length?Math.max(-1,Math.min(1,.5-driverRank/driverStandings.length)):0;
    (Object.keys(attributes) as (keyof DriverAttributes)[]).forEach(attribute=>{
     const span=band==="young"?3:band==="developing"?2:band==="prime"?1:band==="veteran"?2:3;
     const ageBias=band==="young"?0.45:band==="developing"?0.2:band==="prime"?0:band==="veteran"?-0.25:-0.45;
     const delta=randomDelta(driver.id+season+attribute,span)+(performance*.7)+(technicalScore-.5)*.4+ageBias;
     attributes[attribute]=clamp(attributes[attribute]+Math.round(delta));
    });
    return {...driver,age:age+1,attributes};
   })
  };
  // Power and Downforce are independent technical outcomes; results are a secondary influence only.
  const car=team.carAttributes||{power:50,downforce:50};
  const technicalMomentum=(technicalScore-.5)*5;
  const performanceInfluence=relative*.7;
  return {...nextTeam,carAttributes:{
   power:clamp(car.power+randomDelta(team.id+season+"power",3)+technicalMomentum+performanceInfluence),
   downforce:clamp(car.downforce+randomDelta(team.id+season+"downforce",3)+technicalMomentum+performanceInfluence)
  }};
 });
 return next;
}
