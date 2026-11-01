"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {Trophy,ArrowUpRight,Plus,Save} from "lucide-react";
import {initialTeams,initialFormula2Teams} from "@/lib/seed";
import {readUniverseChampionships,saveUniverseChampionship} from "@/lib/universe";
import type {Championship} from "@/lib/types";
const basePath=process.env.NODE_ENV==="production"?"/geoprix-motorsport":"";
export default function ChampionshipsPage(){
 const [championships,setChampionships]=useState<Championship[]>([]);
 const [showForm,setShowForm]=useState(false);
 const [name,setName]=useState("");
 const [category,setCategory]=useState("");
 const [season,setSeason]=useState(2026);
 const [notice,setNotice]=useState("");
 useEffect(()=>{setChampionships(readUniverseChampionships())},[]);
 function addChampionship(){
  const cleanName=name.trim(),cleanCategory=category.trim();
  if(!cleanName||!cleanCategory){setNotice("Informe o nome e a categoria/organização do campeonato.");return}
  if(championships.some(c=>c.name.toLocaleLowerCase("pt-BR")===cleanName.toLocaleLowerCase("pt-BR"))){setNotice("Já existe um campeonato com esse nome.");return}
  const id=cleanName.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+"-"+season;
  if(championships.some(c=>c.id===id)){setNotice("Já existe um cadastro com esse identificador. Verifique o nome e a temporada.");return}
  const next=saveUniverseChampionship({id,name:cleanName,category:cleanCategory,season,status:"active"});
  setChampionships(next);setName("");setCategory("");setSeason(2026);setShowForm(false);setNotice("Campeonato cadastrado. Ele já está disponível no filtro da aba Pilotos neste navegador.");
 }
 return <main className="manager-shell"><header className="manager-top"><a className="back-link" href={basePath+"/"}>← Visão geral</a><span className="eyebrow">UNIVERSO MOTORSPORT</span></header><div className="manager-content"><div className="manager-heading"><div><span className="eyebrow">WORKSPACE</span><h1>Campeonatos</h1><p>Todos os campeonatos cadastrados no universo.</p></div><button className="action-button" onClick={()=>{setShowForm(v=>!v);setNotice("")}}><Plus size={16}/> Adicionar campeonato</button></div>{notice&&<p className="notice">{notice}</p>}{showForm&&<section className="editor-card"><div className="editor-heading"><div><span className="eyebrow">NOVO REGISTRO</span><h2>Cadastrar campeonato</h2></div><button className="quiet-button" onClick={()=>setShowForm(false)}>Cancelar</button></div><div className="form-grid"><label>Nome do campeonato<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: FORMULA 3"/></label><label>Categoria / organização<input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Ex.: FIA Formula 3 Championship"/></label><label>Temporada inicial<input type="number" min="1900" max="2200" value={season} onChange={e=>setSeason(Number(e.target.value))}/></label></div><div className="editor-actions"><small>O campeonato será registrado no universo e aparecerá no filtro global de pilotos.</small><button className="action-button" onClick={addChampionship}><Save size={16}/> Salvar campeonato</button></div></section>}<section className="championship-list">{championships.map(c=>{const teams=c.id==="formula-2-2026"?initialFormula2Teams:c.id==="formula-1-2026"?initialTeams:[];const driverCount=teams.reduce((n,t)=>n+t.drivers.length,0);const isBuiltIn=c.id==="formula-1-2026"||c.id==="formula-2-2026";return isBuiltIn?<Link className="championship-list-card" key={c.id} href={basePath+"/championships/"+c.id+"/teams/"}><span className="championship-list-icon"><Trophy size={20}/></span><div><span className="eyebrow">{c.category} · {c.season}</span><h2>{c.name}</h2><p>{isBuiltIn?`${teams.length} equipes cadastradas · ${driverCount} pilotos`:"Novo campeonato · cadastro criado no universo"}</p></div><ArrowUpRight size={18}/></Link>:<article className="championship-list-card" key={c.id}><span className="championship-list-icon"><Trophy size={20}/></span><div><span className="eyebrow">{c.category} · {c.season}</span><h2>{c.name}</h2><p>Novo campeonato · cadastro criado no universo</p></div><span className="eyebrow">NOVO</span></article>})}</section><p className="storage-note">Os novos campeonatos e seus dados de registro ficam salvos no armazenamento local deste navegador. Eles aparecem automaticamente no filtro global da aba Pilotos.</p></div></main>;
}
