"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, CheckCircle2, Flag, Gauge, Info, Route } from "lucide-react";
import { NATIONAL_RULES, calculateRaceDistance, type NationalCategory } from "../lib/national-rules";

const categories: NationalCategory[] = ["Nacional A", "Nacional B", "Nacional C"];

export default function NationalRegulationPage() {
  const [category, setCategory] = useState<NationalCategory>("Nacional A");
  const [circuitLength, setCircuitLength] = useState("4.2");
  const rules = NATIONAL_RULES[category];
  const length = Number(circuitLength.replace(",", "."));
  const calculation = useMemo(() => calculateRaceDistance(category, length), [category, length]);

  const incompatibility = !Number.isFinite(length) || length <= 0
    ? "Informe uma extensão de circuito válida, maior que zero."
    : length < rules.minCircuitKm
      ? `A extensão mínima para ${category} é de ${rules.minCircuitKm} km.`
      : `Não existe uma quantidade de voltas entre ${rules.minLaps} e ${rules.maxLaps} que mantenha a corrida entre ${rules.min} e ${rules.max} km.`;

  return (
    <main className="nr-shell">
      <header className="nr-topbar">
        <Link href="/" className="nr-back"><ArrowLeft size={16} /> Visão geral</Link>
        <span className="nr-brand"><Gauge size={17} /> GEOPRIX <i>· REGULAMENTO NACIONAL</i></span>
      </header>
      <div className="nr-content">
        <div className="nr-eyebrow">PIRÂMIDE · MONOPOSTOS · BASE NACIONAL</div>
        <h1>Regulamento <em>esportivo nacional</em></h1>
        <p className="nr-intro">Parâmetros padronizados para os campeonatos Nacional A, Nacional B e Nacional C.</p>

        <section className="nr-format">
          <div className="nr-section-head"><span className="nr-icon"><Flag size={18} /></span><div><small>FORMATO DA TEMPORADA</small><h2>Quatro etapas. Três disputas por etapa.</h2></div></div>
          <div className="nr-format-grid">
            <article><b>4</b><span>etapas por temporada</span></article>
            <article><b>3</b><span>classificações por etapa</span></article>
            <article><b>3</b><span>corridas por etapa</span></article>
            <article><b>12 + 12</b><span>classificações e corridas por temporada</span></article>
          </div>
          <div className="nr-note"><Info size={15} /><span>Cada classificação define o grid da sua respectiva corrida. As três corridas da etapa acontecem no mesmo circuito e têm a mesma quantidade de voltas e a mesma distância.</span></div>
        </section>

        <section className="nr-distance">
          <div className="nr-section-head"><span className="nr-icon"><Route size={18} /></span><div><small>QUILOMETRAGEM OFICIAL</small><h2>Distância e limites por categoria</h2></div></div>
          <div className="nr-table-wrap">
            <table className="nr-table">
              <thead><tr><th>Categoria</th><th>Referência</th><th>Distância permitida</th><th>Pista mínima</th><th>Voltas</th></tr></thead>
              <tbody>
                {categories.map(c => { const r = NATIONAL_RULES[c]; return <tr key={c}><td>{c}</td><td>{r.reference} km</td><td>{r.min}–{r.max} km</td><td>{r.minCircuitKm.toFixed(1)} km</td><td>{r.minLaps}–{r.maxLaps}</td></tr>; })}
              </tbody>
            </table>
          </div>
          <p className="nr-footnote">Para ser compatível, o circuito precisa cumprir a extensão mínima, e a corrida precisa respeitar simultaneamente a faixa de distância e o limite de voltas.</p>
        </section>

        <section className="nr-calculator">
          <div className="nr-section-head"><span className="nr-icon"><Calculator size={18} /></span><div><small>FERRAMENTA DE CÁLCULO</small><h2>Calcular voltas do circuito</h2></div></div>
          <p className="nr-calculator-copy">O GEOPRIX considera a extensão mínima do circuito, o intervalo de 20 a 40 voltas e a distância regulamentar para escolher o número inteiro de voltas mais próximo da referência.</p>
          <div className="nr-controls">
            <label>Categoria<select value={category} onChange={(event) => setCategory(event.target.value as NationalCategory)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
            <label>Extensão do circuito (km)<input type="number" min="0.001" step="0.001" value={circuitLength} onChange={(event) => setCircuitLength(event.target.value)} placeholder="Ex.: 4.2" /></label>
          </div>
          <div className="nr-target-line"><span>Referência: <b>{rules.reference} km</b></span><span>Faixa permitida: <b>{rules.min}–{rules.max} km</b></span><span>Pista mínima: <b>{rules.minCircuitKm} km</b></span><span>Voltas: <b>{rules.minLaps}–{rules.maxLaps}</b></span></div>
          {calculation ? (
            <div className="nr-result nr-valid">
              <div className="nr-result-title"><CheckCircle2 size={17} /> Circuito compatível</div>
              <div className="nr-result-grid"><div><strong>{calculation.laps}</strong><small>voltas por corrida</small></div><div><strong>{calculation.distanceKm.toLocaleString("pt-BR", { maximumFractionDigits: 3 })} km</strong><small>distância de cada corrida</small></div></div>
              <p>As três corridas da etapa utilizarão {calculation.laps} voltas cada.</p>
            </div>
          ) : (
            <div className="nr-result nr-invalid"><b>Circuito incompatível.</b><p>{incompatibility}</p></div>
          )}
        </section>

        <section className="nr-method">
          <div className="nr-section-head"><span className="nr-icon"><CheckCircle2 size={18} /></span><div><small>MÉTODO OFICIAL</small><h2>Como o cálculo funciona</h2></div></div>
          <ol>
            <li>O sistema consulta a extensão cadastrada do circuito.</li>
            <li>Verifica se o circuito atende à extensão mínima da categoria.</li>
            <li>Calcula as quantidades inteiras de voltas entre 20 e 40 que respeitam a faixa de distância permitida.</li>
            <li>Escolhe a quantidade cuja distância total fique mais próxima da quilometragem de referência.</li>
            <li>Aplica o mesmo número de voltas às três corridas da etapa.</li>
            <li>Se nenhum número de voltas respeitar todos os limites, o circuito é marcado como incompatível com aquela categoria.</li>
          </ol>
          <div className="nr-note"><Info size={15} /><span>O cálculo considera apenas quilometragem, extensão do circuito e limites de voltas. Não utiliza tempo de corrida nem velocidade média. A escolha e a repetição dos circuitos no calendário ficam sob seu controle.</span></div>
        </section>
        <footer className="nr-footer">GEOPRIX · REGULAMENTO NACIONAL · CONFIGURAÇÃO DO UNIVERSO</footer>
      </div>
    </main>
  );
}
