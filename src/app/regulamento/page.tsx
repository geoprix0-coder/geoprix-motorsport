"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, CheckCircle2, Flag, Gauge, Info, Route } from "lucide-react";

const categories = {
  "Nacional A": { target: 100, min: 80, max: 120 },
  "Nacional B": { target: 80, min: 64, max: 96 },
  "Nacional C": { target: 60, min: 48, max: 72 },
} as const;

type Category = keyof typeof categories;

export default function NationalRegulationPage() {
  const [category, setCategory] = useState<Category>("Nacional A");
  const [circuitLength, setCircuitLength] = useState("4.2");
  const rules = categories[category];
  const length = Number(circuitLength.replace(",", "."));

  const calculation = useMemo(() => {
    if (!Number.isFinite(length) || length <= 0) return null;
    const firstLapCount = Math.ceil(rules.min / length);
    const lastLapCount = Math.floor(rules.max / length);
    if (firstLapCount > lastLapCount) return { compatible: false as const };
    let best = firstLapCount;
    let bestDistance = best * length;
    for (let laps = firstLapCount + 1; laps <= lastLapCount; laps += 1) {
      const distance = laps * length;
      if (Math.abs(distance - rules.target) < Math.abs(bestDistance - rules.target)) {
        best = laps;
        bestDistance = distance;
      }
    }
    return { compatible: true as const, laps: best, distance: bestDistance };
  }, [length, rules]);

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
          <div className="nr-section-head"><span className="nr-icon"><Route size={18} /></span><div><small>QUILOMETRAGEM OFICIAL</small><h2>Distância por categoria</h2></div></div>
          <div className="nr-table-wrap">
            <table className="nr-table">
              <thead><tr><th>Categoria</th><th>Referência</th><th>Mínimo</th><th>Máximo</th></tr></thead>
              <tbody>
                <tr><td>Nacional A</td><td>100 km</td><td>80 km</td><td>120 km</td></tr>
                <tr><td>Nacional B</td><td>80 km</td><td>64 km</td><td>96 km</td></tr>
                <tr><td>Nacional C</td><td>60 km</td><td>48 km</td><td>72 km</td></tr>
              </tbody>
            </table>
          </div>
          <p className="nr-footnote">O limite mínimo e máximo corresponde a uma variação de até 20% sobre a distância de referência.</p>
        </section>

        <section className="nr-calculator">
          <div className="nr-section-head"><span className="nr-icon"><Calculator size={18} /></span><div><small>FERRAMENTA DE CÁLCULO</small><h2>Calcular voltas do circuito</h2></div></div>
          <p className="nr-calculator-copy">Informe a categoria e a extensão do autódromo. O GEOPRIX seleciona o número inteiro de voltas cuja distância fique dentro dos limites e mais próxima da referência.</p>
          <div className="nr-controls">
            <label>Categoria<select value={category} onChange={(event) => setCategory(event.target.value as Category)}><option>Nacional A</option><option>Nacional B</option><option>Nacional C</option></select></label>
            <label>Extensão do circuito (km)<input type="number" min="0.1" step="0.001" value={circuitLength} onChange={(event) => setCircuitLength(event.target.value)} placeholder="Ex.: 4.2" /></label>
          </div>
          <div className="nr-target-line"><span>Referência: <b>{rules.target} km</b></span><span>Faixa permitida: <b>{rules.min}–{rules.max} km</b></span></div>
          {calculation === null ? (
            <div className="nr-result nr-invalid">Informe uma extensão de circuito válida, maior que zero.</div>
          ) : calculation.compatible ? (
            <div className="nr-result nr-valid">
              <div className="nr-result-title"><CheckCircle2 size={17} /> Circuito compatível</div>
              <div className="nr-result-grid"><div><strong>{calculation.laps}</strong><small>voltas por corrida</small></div><div><strong>{calculation.distance.toLocaleString("pt-BR", { maximumFractionDigits: 3 })} km</strong><small>distância de cada corrida</small></div></div>
              <p>As três corridas da etapa utilizarão {calculation.laps} voltas cada.</p>
            </div>
          ) : (
            <div className="nr-result nr-invalid"><b>Circuito incompatível com esta categoria.</b><p>Não existe uma quantidade inteira de voltas que mantenha a distância entre {rules.min} km e {rules.max} km. O GEOPRIX não deve gerar a etapa com este circuito nesta categoria.</p></div>
          )}
        </section>

        <section className="nr-method">
          <div className="nr-section-head"><span className="nr-icon"><CheckCircle2 size={18} /></span><div><small>MÉTODO OFICIAL</small><h2>Como o cálculo funciona</h2></div></div>
          <ol>
            <li>O sistema consulta a extensão cadastrada do circuito.</li>
            <li>Calcula todas as quantidades inteiras de voltas que respeitam o mínimo e o máximo da categoria.</li>
            <li>Escolhe a quantidade cuja distância total fique mais próxima da quilometragem de referência.</li>
            <li>Aplica o mesmo número de voltas às três corridas da etapa.</li>
            <li>Se nenhuma quantidade inteira respeitar os limites, o circuito é marcado como incompatível com aquela categoria.</li>
          </ol>
          <div className="nr-note"><Info size={15} /><span>O cálculo considera apenas quilometragem e extensão do circuito. Não utiliza tempo de corrida nem velocidade média.</span></div>
        </section>
        <footer className="nr-footer">GEOPRIX · REGULAMENTO NACIONAL · CONFIGURAÇÃO DO UNIVERSO</footer>
      </div>
    </main>
  );
}

