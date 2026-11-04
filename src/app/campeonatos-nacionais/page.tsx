"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Globe2, Flag, CheckCircle2, Gauge } from "lucide-react";

const basePath = process.env.NODE_ENV === "production" ? "/geoprix-motorsport" : "";

const countries = [
  "Indonésia",
  "Tuvalu",
  "Austrália",
  "Nova Zelândia",
  "Brasil",
  "Argentina",
  "Chile",
  "EUA",
  "Panamá",
  "Cuba",
  "México",
  "Canadá",
  "Suécia",
  "Rússia",
  "Finlândia",
  "Itália",
  "Polônia",
  "França",
  "Bulgária",
  "Reino Unido",
  "Dinamarca",
  "Grécia",
  "Espanha",
  "Chipre",
  "Alemanha",
  "Suíça",
  "Hungria",
  "Áustria",
  "Holanda",
  "Bélgica",
  "Azerbaijão",
  "Turquia",
  "Portugal",
  "República Tcheca",
  "Ucrânia",
  "Cazaquistão",
  "Japão",
  "Filipinas",
  "Mongólia",
  "Bahrein",
  "Líbano",
  "Tailândia",
  "China",
  "Índia",
  "Coreia do Sul",
  "Emirados Árabes Unidos",
  "Catar",
  "Cingapura",
  "Arábia Saudita",
  "Malásia",
  "Vietnã",
  "Irã",
  "Kuwait",
  "Tunísia",
  "Senegal",
  "África do Sul",
  "Marrocos",
  "Moçambique",
  "Egito",
  "Nigéria",
  "Tanzânia",
  "Angola"
];

const categories = ["Nacional A", "Nacional B", "Nacional C"] as const;
type NationalCategory = (typeof categories)[number];

export default function NationalChampionshipsPage() {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState<NationalCategory | "">("");

  function changeCountry(value: string) {
    setCountry(value);
    setCategory("");
  }

  return (
    <main className="nr-shell">
      <header className="nr-topbar">
        <Link href={basePath + "/"} className="nr-back"><ArrowLeft size={16} /> Visão geral</Link>
        <span className="nr-brand"><Gauge size={17} /> GEOPRIX <i>· CAMPEONATOS NACIONAIS</i></span>
      </header>

      <div className="nr-content">
        <div className="nr-eyebrow">UNIVERSO · COMPETIÇÕES POR PAÍS</div>
        <h1>Campeonatos <em>nacionais</em></h1>
        <p className="nr-intro">Selecione um dos 62 países para visualizar as três categorias nacionais disponíveis.</p>

        <section className="nr-calculator">
          <div className="nr-section-head">
            <span className="nr-icon"><Globe2 size={18} /></span>
            <div><small>1 · SELECIONE O PAÍS</small><h2>Países participantes</h2></div>
          </div>
          <div className="nr-controls nr-country-controls">
            <label>País
              <select value={country} onChange={(event) => changeCountry(event.target.value)}>
                <option value="">Escolha um país</option>
                {countries.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <p className="nr-footnote">62 países cadastrados · Os campeonatos poderão ser configurados individualmente.</p>
        </section>

        {country ? (
          <section className="nr-distance">
            <div className="nr-section-head">
              <span className="nr-icon"><Flag size={18} /></span>
              <div><small>2 · SELECIONE A CATEGORIA</small><h2>{country}</h2></div>
            </div>
            <div className="nr-controls">
              <label>Categoria nacional
                <select value={category} onChange={(event) => setCategory(event.target.value as NationalCategory | "")}>
                  <option value="">Escolha uma categoria</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
            {category ? (
              <div className="nr-result nr-valid">
                <div className="nr-result-title"><CheckCircle2 size={17} /> Campeonato selecionado</div>
                <div className="nr-result-grid">
                  <div><strong>{country}</strong><small>país</small></div>
                  <div><strong>{category}</strong><small>categoria nacional</small></div>
                </div>
                <p>Esta é a seleção do campeonato nacional. A área de gestão específica desta competição poderá ser conectada a esta estrutura na próxima etapa.</p>
              </div>
            ) : (
              <p className="nr-footnote">Escolha uma das três categorias para continuar.</p>
            )}
          </section>
        ) : (
          <section className="nr-distance nr-country-placeholder">
            <div className="nr-section-head">
              <span className="nr-icon"><Trophy size={18} /></span>
              <div><small>ESTRUTURA NACIONAL</small><h2>Três categorias por país</h2></div>
            </div>
            <div className="nr-format-grid">
              <article><b>A</b><span>Nacional A</span></article>
              <article><b>B</b><span>Nacional B</span></article>
              <article><b>C</b><span>Nacional C</span></article>
              <article><b>62</b><span>países na estrutura</span></article>
            </div>
          </section>
        )}

        <footer className="nr-footer">GEOPRIX · 62 PAÍSES · 3 CATEGORIAS NACIONAIS</footer>
      </div>
    </main>
  );
}
