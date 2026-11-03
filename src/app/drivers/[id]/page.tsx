import Link from "next/link";
import type { Team } from "@/lib/types";
import DriverProfile from "./profile";

// O exportador estático do GitHub Pages exige ao menos uma rota gerada.
const allInitialTeams: Team[] = [];

export function generateStaticParams(){
 return [{ id: "__empty__" }];
}
export default async function DriverPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 if(id==="__empty__") return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/">← Visão geral</Link><span className="eyebrow">UNIVERSO MOTORSPORT</span></header><div className="manager-content"><div className="empty-state"><b>Nenhum piloto cadastrado</b><span>As fichas individuais aparecerão quando novos pilotos forem criados.</span></div></div></main>;
 const team=allInitialTeams.find(item=>item.drivers.some(driver=>driver.id===id));
 const driver=team?.drivers.find(item=>item.id===id);
 if(!driver||!team) return <main className="manager-shell"><div className="empty-state">Piloto não encontrado.</div></main>;
 return <DriverProfile driver={driver} team={team} championshipId=""/>;
}