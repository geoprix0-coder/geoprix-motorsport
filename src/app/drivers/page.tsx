import { Users } from "lucide-react";
import Link from "next/link";
import { initialTeams } from "@/lib/seed";
const basePath=process.env.NODE_ENV==="production"?"/geoprix-motorsport":"";
export default function DriversPage(){
 const drivers=initialTeams.flatMap(t=>t.drivers.map(d=>({...d,team:t.name})));
 return <main className="manager-shell"><header className="manager-top"><a className="back-link" href={basePath+"/"}>← Visão geral</a><span className="eyebrow">UNIVERSO MOTORSPORT</span></header><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">CADASTRO GLOBAL</span><h1>Pilotos</h1><p>Lista geral de pilotos cadastrados no universo.</p></div></div><section className="team-list"><div className="list-heading"><h2>Pilotos cadastrados</h2><span>{drivers.length} pilotos</span></div>{drivers.map(d=><Link className="team-row driver-global-row driver-profile-link" href={basePath+"/drivers/"+d.id+"/"} key={d.id}><div><b>{d.name}</b><small>{d.nationality}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team}</small><span className="driver-open">Ver ficha →</span></Link>)}</section><p className="storage-note">Selecione um piloto para consultar sua ficha individual e seus números de carreira no universo.</p></div></main>;
}