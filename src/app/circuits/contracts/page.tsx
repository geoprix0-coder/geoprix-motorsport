"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText, Plus, Save, Pencil, Trash2, RefreshCw, CalendarDays } from "lucide-react";
import type { Circuit } from "@/lib/types";

type ContractStatus = "active" | "negotiation" | "terminated";
type CircuitContract = { id:string; circuitId:string; category:string; startSeason:number; endSeason:number; status:ContractStatus; notes:string; createdAt:string };
type ContractForm = Omit<CircuitContract,"id"|"createdAt">;
const basePath=process.env.NODE_ENV==="production"?"/geoprix-motorsport":"";
const blankForm=():ContractForm=>({circuitId:"",category:"",startSeason:2026,endSeason:2030,status:"active",notes:""});
const statusLabel=(contract:CircuitContract,season:number)=>contract.status==="terminated"?"Encerrado antecipadamente":contract.status==="negotiation"?"Em negociação":season<contract.startSeason?"Futuro":season<=contract.endSeason?"Vigente":"Expirado";
export default function CircuitContractsPage(){
 const [circuits,setCircuits]=useState<Circuit[]>([]);
 const [contracts,setContracts]=useState<CircuitContract[]>([]);
 const [season,setSeason]=useState(2026);
 const [form,setForm]=useState<ContractForm>(blankForm());
 const [editing,setEditing]=useState<string|null>(null);
 const [showForm,setShowForm]=useState(false);
 const [filter,setFilter]=useState("all");
 const [circuitFilter,setCircuitFilter]=useState("");
 const [ready,setReady]=useState(false);
 const [notice,setNotice]=useState("");
 useEffect(()=>{const query=new URLSearchParams(window.location.search);setCircuitFilter(query.get("circuit")||"");try{const rawCircuits=localStorage.getItem("geoprix-circuits-v1");if(rawCircuits)setCircuits(JSON.parse(rawCircuits));const rawContracts=localStorage.getItem("geoprix-circuit-contracts-v1");if(rawContracts)setContracts(JSON.parse(rawContracts));}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("geoprix-circuit-contracts-v1",JSON.stringify(contracts))},[contracts,ready]);
 const ordered=useMemo(()=>[...contracts].sort((a,b)=>b.startSeason-a.startSeason||a.category.localeCompare(b.category)),[contracts]);
 const visible=ordered.filter(c=>(!circuitFilter||c.circuitId===circuitFilter)&&(filter==="all"||statusLabel(c,season)===filter));
 const counts={active:contracts.filter(c=>statusLabel(c,season)==="Vigente").length,soon:contracts.filter(c=>statusLabel(c,season)==="Vigente"&&c.endSeason-season<=1).length,negotiation:contracts.filter(c=>c.status==="negotiation").length,ended:contracts.filter(c=>["Expirado","Encerrado antecipadamente"].includes(statusLabel(c,season))).length};
 const expirationAlerts=contracts.filter(c=>c.status==="active"&&c.endSeason>=season&&c.endSeason<=season+1).sort((a,b)=>a.endSeason-b.endSeason);
 const presenceTimeline=useMemo(()=>{
  const grouped=new Map<string,{circuitId:string;category:string;periods:CircuitContract[]}>();
  contracts.filter(c=>!circuitFilter||c.circuitId===circuitFilter).filter(c=>c.status!=="negotiation").forEach(c=>{
   const key=c.circuitId+"::"+c.category.toLocaleLowerCase();
   const group=grouped.get(key)||{circuitId:c.circuitId,category:c.category,periods:[]};
   group.periods.push(c);grouped.set(key,group);
  });
  return [...grouped.values()].map(g=>({...g,periods:g.periods.sort((a,b)=>a.startSeason-b.startSeason)})).sort((a,b)=>circuitName(a.circuitId).localeCompare(circuitName(b.circuitId))||a.category.localeCompare(b.category));
 },[contracts,circuitFilter,circuits]);

 function openNew(circuitId=""){setEditing(null);setForm({...blankForm(),circuitId});setShowForm(true);setNotice("")}
 function openEdit(c:CircuitContract){setEditing(c.id);setForm({circuitId:c.circuitId,category:c.category,startSeason:c.startSeason,endSeason:c.endSeason,status:c.status,notes:c.notes});setShowForm(true);setNotice("")}
 function save(){if(!form.circuitId||!form.category.trim()||!Number.isInteger(form.startSeason)||!Number.isInteger(form.endSeason)||form.endSeason<form.startSeason){setNotice("Confira o circuito, a categoria e as temporadas do contrato.");return}
 const item:CircuitContract={...form,id:editing||crypto.randomUUID(),createdAt:contracts.find(c=>c.id===editing)?.createdAt||new Date().toISOString()};
 setContracts(old=>editing?old.map(c=>c.id===editing?item:c):[item,...old]);setShowForm(false);setEditing(null);setNotice("Contrato salvo neste navegador.");}
 function renew(c:CircuitContract){setForm({circuitId:c.circuitId,category:c.category,startSeason:c.endSeason+1,endSeason:c.endSeason+5,status:"active",notes:"Renovação do contrato anterior."});setEditing(null);setShowForm(true);setNotice("Defina a nova duração e salve a renovação como um novo contrato.")}
 function circuitName(id:string){return circuits.find(c=>c.id===id)?.name||"Circuito não encontrado"}
 return <main className="manager-shell"><header className="manager-top"><a className="back-link" href={basePath+"/circuits"}><ArrowLeft size={16}/> Circuitos</a><span className="eyebrow">GESTÃO DE CONTRATOS</span></header><div className="manager-content">
 <div className="manager-heading"><div><span className="eyebrow">UNIVERSO MOTORSPORT</span><h1>Contratos de circuitos</h1><p>Controle entradas, permanências, renovações e saídas das categorias.</p></div><button className="action-button" onClick={()=>openNew()}><Plus size={16}/> Novo contrato</button></div>
 <div className="contract-season-bar"><label>Temporada de referência <input type="number" min="1900" max="2200" value={season} onChange={e=>setSeason(Number(e.target.value)||2026)}/></label><span>As situações são calculadas com base nesta temporada.</span></div>
 <section className="manager-stats contract-stats"><div><FileText/><b>{counts.active}</b><small>Contratos vigentes</small></div><div><CalendarDays/><b>{counts.soon}</b><small>Vencem em até 1 temporada</small></div><div><RefreshCw/><b>{counts.negotiation}</b><small>Em negociação</small></div><div><Trash2/><b>{counts.ended}</b><small>Encerrados / expirados</small></div></section>
 <section className="contract-alerts"><div className="list-heading"><h2>Alertas de vencimento</h2><span>{expirationAlerts.length} contratos próximos do fim</span></div>
 {expirationAlerts.length===0?<p className="contract-alert-empty">Nenhum contrato confirmado vence nesta temporada ou na próxima.</p>:expirationAlerts.map(c=><div className="contract-alert-row" key={c.id}><div><b>{circuitName(c.circuitId)}</b><small>{c.category}</small></div><span className={c.endSeason===season?"alert-current":"alert-next"}>{c.endSeason===season?"Vence nesta temporada":"Vence na próxima temporada"} · {c.endSeason}</span><button className="quiet-button" onClick={()=>openEdit(c)}><Pencil size={13}/> Ver contrato</button></div>)}
 </section>
 {notice&&<p className="notice">{notice}</p>}
 {showForm&&<section className="editor-card"><div className="editor-heading"><div><span className="eyebrow">{editing?"EDITAR REGISTRO":"NOVO REGISTRO"}</span><h2>{editing?"Editar contrato":"Cadastrar contrato"}</h2></div><button className="quiet-button" onClick={()=>setShowForm(false)}>Fechar</button></div>
 <div className="form-grid">
 <label>Circuito<select value={form.circuitId} onChange={e=>setForm({...form,circuitId:e.target.value})}><option value="">Selecione um circuito</option>{circuits.map(c=><option key={c.id} value={c.id}>{c.name} — {c.country}</option>)}</select></label>
 <label>Categoria<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option value="">Selecione ou digite abaixo</option><option>FORMULA 1</option><option>Fórmula 2</option><option>Fórmula 3</option><option>Fórmula E</option><option>WEC</option><option>IMSA</option><option>IndyCar</option><option>Outra categoria</option></select><input aria-label="Nome da categoria" placeholder="Ou informe o nome da categoria" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></label>
 <label>Início do contrato<input type="number" min="1900" max="2200" value={form.startSeason} onChange={e=>setForm({...form,startSeason:Number(e.target.value)})}/></label>
 <label>Término do contrato<input type="number" min="1900" max="2200" value={form.endSeason} onChange={e=>setForm({...form,endSeason:Number(e.target.value)})}/></label>
 <label>Situação<select value={form.status} onChange={e=>setForm({...form,status:e.target.value as ContractStatus})}><option value="active">Contrato confirmado</option><option value="negotiation">Em negociação</option><option value="terminated">Encerrado antecipadamente</option></select></label>
 <label className="contract-notes">Observações<textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Cláusulas, detalhes da renovação ou motivo do encerramento"/></label>
 </div><div className="editor-actions"><small>Para renovar, crie um novo contrato com o período seguinte. O anterior permanece no histórico.</small><button className="action-button" onClick={save}><Save size={16}/> Salvar contrato</button></div></section>}
 <section className="team-list"><div className="list-heading"><h2>{circuitFilter?"Histórico do circuito":"Registro de contratos"}</h2><select className="contract-filter" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">Todas as situações</option><option value="Vigente">Vigentes</option><option value="Futuro">Futuros</option><option value="Em negociação">Em negociação</option><option value="Expirado">Expirados</option><option value="Encerrado antecipadamente">Encerrados antecipadamente</option></select></div>
 {!ready?<p>Carregando...</p>:visible.length===0?<div className="empty-state"><FileText size={28}/><b>Nenhum contrato encontrado</b><span>Cadastre o primeiro contrato para acompanhar a presença de um circuito em uma categoria.</span></div>:visible.map(c=>{const status=statusLabel(c,season);return <article className="contract-row" key={c.id}><div className="contract-icon"><FileText size={18}/></div><div className="contract-main"><b>{circuitName(c.circuitId)}</b><small>{c.category}</small><div className="contract-meta"><span>{c.startSeason}–{c.endSeason}</span><span>{c.endSeason-c.startSeason+1} temporadas</span>{c.notes&&<span>{c.notes}</span>}</div></div><span className={"contract-status "+(status==="Vigente"?"is-active":status==="Em negociação"?"is-negotiation":"is-ended")}>{status}</span><div className="contract-actions"><button className="quiet-button" onClick={()=>renew(c)}><RefreshCw size={13}/> Renovar</button><button className="quiet-button" onClick={()=>openEdit(c)}><Pencil size={13}/> Editar</button><button className="icon-button" aria-label="Excluir contrato" onClick={()=>{if(confirm("Excluir este contrato do histórico?"))setContracts(old=>old.filter(x=>x.id!==c.id))}}><Trash2 size={15}/></button></div></article>})}
 </section><section className="team-list contract-timeline"><div className="list-heading"><div><h2>Histórico de presença por categoria</h2><p className="timeline-description">Períodos em que cada circuito esteve vinculado a uma categoria, incluindo contratos encerrados e renovações.</p></div></div>
 {presenceTimeline.length===0?<div className="empty-state"><CalendarDays size={26}/><b>Sem histórico de presença</b><span>Os períodos aparecerão aqui após cadastrar contratos confirmados ou encerrados.</span></div>:presenceTimeline.map(group=><article className="presence-group" key={group.circuitId+"::"+group.category}><div className="presence-heading"><b>{circuitName(group.circuitId)}</b><span>{group.category}</span></div><div className="presence-periods">{group.periods.map(c=><div className="presence-period" key={c.id}><span className="presence-years">{c.startSeason}–{c.endSeason}</span><span>{c.endSeason<season?"Período encerrado":c.startSeason>season?"Período futuro":c.status==="terminated"?"Encerrado antecipadamente":"Presença confirmada"}</span>{c.notes&&<small>{c.notes}</small>}</div>)}</div></article>)}
 </section><p className="storage-note">Os contratos são salvos neste navegador. Cada renovação cria um novo registro e preserva o contrato anterior no histórico. A situação de vigência é calculada pela temporada de referência e pelas datas de início e término.</p>
 </div></main>
}
