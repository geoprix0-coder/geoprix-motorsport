import { notFound } from "next/navigation";
import type { Team } from "@/lib/types";
import DriverProfile from "./profile";

// Perfis não são pré-gerados: o universo começa sem pilotos cadastrados.
const allInitialTeams: Team[] = [];

export function generateStaticParams(){
 return [];
}
export default async function DriverPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const team=allInitialTeams.find(item=>item.drivers.some(driver=>driver.id===id));
 const driver=team?.drivers.find(item=>item.id===id);
 if(!driver||!team)notFound();
 const championshipId="";
 return <DriverProfile driver={driver} team={team} championshipId={championshipId}/>;
}