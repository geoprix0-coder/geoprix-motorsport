"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRightLeft} from "lucide-react";
import {initialTeams} from "@/lib/seed";
import type {Team} from "@/lib/types";
export default function DriversPage(){
 const [teams,setTeams]=useState<Team[]>(initialTeams);
 useEffect(()=>{try{const raw=localStorage.getItem("geoprix-teams-v1");if(raw){const parsed=JSON.parse(raw);if(Array.isArray(parsed)&&parsed.length)setTeams(parsed)}}catch{}},[]);
 const drivers=teams.flatMap(t=>t.drivers.map(d=>({...d,team:t.name})));
 return <main className="manager-shell"><header className="manager-top"><Link className="back-link" href="/">← Visão geral</Link><span className="eyebrow">UNIVERSO MOTORSPORT</span></header><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">CADASTRO GLOBAL</span><h1>Pilotos</h1><p>Lista geral de pilotos cadastrados no universo.</p></div><Link className="action-button" href="/market/"><ArrowRightLeft size={16}/> Mercado de pilotos</Link></div><section className="team-list"><div className="list-heading"><h2>Pilotos cadastrados</h2><span>{drivers.length} pilotos</span></div>{drivers.map(d=><Link className="team-row driver-global-row driver-profile-link" href={"/drivers/"+d.id+"/"} key={d.id}><div><b>{d.name}</b><small>{d.nationality}</small></div><div className="team-drivers"><span>#{d.number}</span></div><small>{d.team}</small><span className="driver-open">Ver ficha →</span></Link>)}</section><p className="storage-note">Selecione um piloto para consultar sua ficha individual e seus números de carreira no universo.</p></div></main>;
}
