import { notFound } from "next/navigation";
import { initialTeams, initialFormula2Teams, initialFormula3Teams } from "@/lib/seed";
const allInitialTeams=[...initialTeams,...initialFormula2Teams,...initialFormula3Teams];
import DriverProfile from "./profile";

export function generateStaticParams(){
 return allInitialTeams.flatMap(team=>team.drivers.map(driver=>({id:driver.id})));
}
export default async function DriverPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const team=allInitialTeams.find(item=>item.drivers.some(driver=>driver.id===id));
 const driver=team?.drivers.find(item=>item.id===id);
 if(!driver||!team)notFound();
 const championshipId=id.startsWith("f3-")?"formula-3-2026":id.startsWith("f2-")?"formula-2-2026":"formula-1-2026";
 return <DriverProfile driver={driver} team={team} championshipId={championshipId}/>;
}