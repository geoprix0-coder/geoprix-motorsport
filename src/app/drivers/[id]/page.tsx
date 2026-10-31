import { notFound } from "next/navigation";
import { initialTeams } from "@/lib/seed";
import DriverProfile from "./profile";

export function generateStaticParams(){
 return initialTeams.flatMap(team=>team.drivers.map(driver=>({id:driver.id})));
}
export default async function DriverPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const team=initialTeams.find(item=>item.drivers.some(driver=>driver.id===id));
 const driver=team?.drivers.find(item=>item.id===id);
 if(!driver||!team)notFound();
 return <DriverProfile driver={driver} team={team}/>;
}