"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Route, Trash2, Gauge } from "lucide-react";
import type { Circuit } from "../lib/national-rules";
import { CIRCUITS_STORAGE_KEY } from "../lib/national-rules";
import { NATIONAL_COUNTRIES } from "../lib/national-championships";

export default function CircuitsPage() {
  const [items, setItems] = useState<Circuit[]>([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [length, setLength] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem(CIRCUITS_STORAGE_KEY); if (raw) setItems(JSON.parse(raw)); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(CIRCUITS_STORAGE_KEY, JSON.stringify(items)); }, [items, ready]);
  const countries = NATIONAL_COUNTRIES;
  const filteredItems = useMemo(() => selectedCountry === "all" ? items : items.filter(c => c.country.trim() === selectedCountry), [items, selectedCountry]);
  function addCircuit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const km = Number(length.replace(",", "."));
    if (!name.trim() || !country.trim() || !Number.isFinite(km) || km <= 0) return;
    setItems(current => [...current, { id: crypto.randomUUID(), name: name.trim(), country: country.trim(), lengthKm: km }]);
    setName(""); setCountry(""); setLength("");
  }
  return <main className="nr-shell"><header className="nr-topbar"><Link href="/" className="nr-back"><ArrowLeft size={16}/> Visão geral</Link><span className="nr-brand"><Gauge size={17}/> GEOPRIX <i>· CIRCUITOS</i></span></header><div className="nr-content"><div className="nr-eyebrow">CADASTRO · INFRAESTRUTURA ESPORTIVA</div><h1>Cadastro de <em>circuitos</em></h1><p className="nr-intro">Registre o nome, o país e a extensão real de cada autódromo. A quilometragem será usada automaticamente no calendário nacional.</p>
  <section className="nr-calculator"><div className="nr-section-head"><span className="nr-icon"><Plus size={18}/></span><div><small>NOVO CIRCUITO</small><h2>Adicionar autódromo</h2></div></div><form className="nr-controls" onSubmit={addCircuit}><label>Nome do circuito<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Autódromo..." required/></label><label>País<select value={country} onChange={e=>setCountry(e.target.value)} required><option value="">Selecione o país</option>{countries.map(c=><option key={c} value={c}>{c}</option>)}</select></label><label>Extensão (km)<input type="number" min="0.001" step="0.001" value={length} onChange={e=>setLength(e.target.value)} placeholder="Ex.: 4.309" required/></label><button className="nr-submit" type="submit">Adicionar circuito</button></form></section>
  <section className="nr-distance"><div className="nr-section-head"><span className="nr-icon"><Route size={18}/></span><div><small>BASE DE CIRCUITOS</small><h2>Autódromos cadastrados</h2></div></div>{items.length===0?<p className="nr-intro">Nenhum circuito cadastrado ainda.</p>:<><div className="nr-controls" style={{gridTemplateColumns:"minmax(220px, 360px)",margin:"0 0 14px"}}><label>Filtrar por país<select value={selectedCountry} onChange={e=>setSelectedCountry(e.target.value)}><option value="all">Todos os países ({items.length})</option>{countries.map(c=><option key={c} value={c}>{c} ({items.filter(item=>item.country.trim()===c).length})</option>)}</select></label></div><div className="nr-circuit-list">{filteredItems.length===0?<p className="nr-intro">Nenhum autódromo encontrado para este país.</p>:filteredItems.map(c=><article key={c.id} className="nr-circuit-row"><div><b>{c.name}</b><small>{c.country}</small></div><strong>{c.lengthKm.toLocaleString("pt-BR",{maximumFractionDigits:3})} km</strong><button type="button" aria-label={"Excluir "+c.name} onClick={()=>setItems(current=>current.filter(x=>x.id!==c.id))}><Trash2 size={16}/></button></article>)}</div><p className="nr-intro" style={{margin:"12px 0 0"}}>Exibindo {filteredItems.length} de {items.length} autódromos.</p></>}</section><footer className="nr-footer">OS CIRCUITOS CADASTRADOS FICAM SALVOS NESTE NAVEGADOR</footer></div></main>;
}
