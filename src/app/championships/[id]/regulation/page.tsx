"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Save, Scale, Trophy, Plus, Trash2 } from "lucide-react";

type BonusRule = { id: string; name: string; points: number; enabled: boolean };
type Regulation = { positionPoints: number[]; bonusRules: BonusRule[] };

const defaultRegulation: Regulation = {
  positionPoints: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, ...Array(10).fill(0)],
  bonusRules: [
    { id: "fastest-lap", name: "Volta mais rápida", points: 0, enabled: false },
    { id: "pole-position", name: "Pole position", points: 0, enabled: false },
    { id: "sprint-winner", name: "Vitória na Sprint", points: 0, enabled: false },
  ],
};

export default function ChampionshipRegulationPage() {
  const params = useParams<{ id: string }>();
  const championshipId = params.id;
  const storageKey = useMemo(() => `geoprix-regulations-${championshipId}`, [championshipId]);
  const [regulation, setRegulation] = useState<Regulation>(defaultRegulation);
  const [saved, setSaved] = useState(false);
  const [newBonusName, setNewBonusName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Regulation>;
        setRegulation({
          positionPoints: Array.from({ length: 20 }, (_, i) => Number(parsed.positionPoints?.[i] ?? defaultRegulation.positionPoints[i])),
          bonusRules: Array.isArray(parsed.bonusRules) ? parsed.bonusRules : defaultRegulation.bonusRules,
        });
      }
    } catch {
      setRegulation(defaultRegulation);
    }
  }, [storageKey]);

  function updatePosition(index: number, value: string) {
    const points = [...regulation.positionPoints];
    points[index] = Math.max(0, Number(value) || 0);
    setRegulation({ ...regulation, positionPoints: points });
    setSaved(false);
  }

  function updateBonus(id: string, changes: Partial<BonusRule>) {
    setRegulation({ ...regulation, bonusRules: regulation.bonusRules.map(rule => rule.id === id ? { ...rule, ...changes } : rule) });
    setSaved(false);
  }

  function addBonus() {
    const name = newBonusName.trim();
    if (!name) return;
    setRegulation({ ...regulation, bonusRules: [...regulation.bonusRules, { id: `bonus-${Date.now()}`, name, points: 1, enabled: true }] });
    setNewBonusName("");
    setSaved(false);
  }

  function saveRegulation() {
    localStorage.setItem(storageKey, JSON.stringify(regulation));
    setSaved(true);
  }

  return (
    <main className="manager-shell">
      <div className="manager-content">
        <div className="manager-heading">
          <div><span className="eyebrow">CONFIGURAÇÕES DO CAMPEONATO</span><h1>Regulamento</h1><p>Defina como os pontos serão distribuídos e quais bonificações estarão em vigor.</p></div>
          <button className="action-button" onClick={saveRegulation}><Save size={15}/>Salvar regulamento</button>
        </div>
        {saved && <div className="notice">Regulamento salvo neste navegador.</div>}
        <section className="editor-card">
          <div className="editor-heading"><div><span className="eyebrow">SISTEMA DE PONTUAÇÃO</span><h2>Pontos por posição</h2></div><Trophy size={20} color="var(--accent)"/></div>
          <p className="storage-note">Informe quantos pontos cada piloto recebe ao terminar em cada posição. Use zero para posições sem pontuação.</p>
          <div className="regulation-points-grid">
            {regulation.positionPoints.map((points, index) => <label className="regulation-point" key={index}><span>{index + 1}º lugar</span><input type="number" min="0" step="1" value={points} onChange={e => updatePosition(index, e.target.value)}/></label>)}
          </div>
        </section>
        <section className="editor-card">
          <div className="editor-heading"><div><span className="eyebrow">PONTUAÇÃO ADICIONAL</span><h2>Bonificações e pontos extras</h2></div><Scale size={20} color="var(--accent)"/></div>
          <p className="storage-note">Ative as bonificações que farão parte do regulamento e defina o valor de cada uma.</p>
          <div className="regulation-bonus-list">
            {regulation.bonusRules.map(rule => <div className="regulation-bonus-row" key={rule.id}>
              <label className="regulation-toggle"><input type="checkbox" checked={rule.enabled} onChange={e => updateBonus(rule.id, { enabled: e.target.checked })}/><span>{rule.name}</span></label>
              <label className="regulation-bonus-points">Pontos extras<input type="number" min="0" step="1" value={rule.points} onChange={e => updateBonus(rule.id, { points: Math.max(0, Number(e.target.value) || 0) })}/></label>
              {!["fastest-lap", "pole-position", "sprint-winner"].includes(rule.id) && <button className="icon-button" aria-label="Excluir bonificação" onClick={() => { setRegulation({ ...regulation, bonusRules: regulation.bonusRules.filter(item => item.id !== rule.id) }); setSaved(false); }}><Trash2 size={16}/></button>}
            </div>)}
          </div>
          <div className="regulation-add-bonus"><input value={newBonusName} onChange={e => setNewBonusName(e.target.value)} placeholder="Nome da nova bonificação"/><button className="quiet-button" onClick={addBonus}><Plus size={14}/>Adicionar bonificação</button></div>
        </section>
        <p className="storage-note">As configurações são salvas separadamente para cada campeonato neste navegador.</p>
      </div>
    </main>
  );
}
