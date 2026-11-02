"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRightLeft, CheckCircle2, LockKeyhole, Users } from "lucide-react";
import { readUniverseChampionships } from "@/lib/universe";
import { initialTeamsForChampionship, mergeInitialTeams, teamStorageKey } from "@/lib/championship-data";
import {
  closeExtraordinaryWindow,
  getExtraordinaryCandidates,
  getExtraordinaryWindow,
  openExtraordinaryWindow,
  signExtraordinaryDriver,
  type ExtraordinaryCandidate,
  type ExtraordinaryWindow
} from "@/lib/extraordinary-market";
import type { Championship, Team } from "@/lib/types";

type CategoryRoster = { championship: Championship; teams: Team[]; season: number };

function readTeams(championshipId: string): Team[] {
  const defaults = initialTeamsForChampionship(championshipId);
  try {
    const parsed = JSON.parse(localStorage.getItem(teamStorageKey(championshipId)) || "null");
    const saved = Array.isArray(parsed) ? parsed as Team[] : defaults;
    return defaults.length ? mergeInitialTeams(championshipId, saved) : saved;
  } catch {
    return defaults;
  }
}
function capacity(championshipId: string) {
  return championshipId === "formula-3-2026" || championshipId === "formula-regional-europe-2026" ? 3 : 2;
}
function filled(team: Team) {
  return (team.drivers || []).filter(driver => driver.name.trim()).length;
}

export default function ExtraordinaryMarketPanel() {
  const [categories, setCategories] = useState<CategoryRoster[]>([]);
  const [selectedChampionshipId, setSelectedChampionshipId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [activeWindow, setActiveWindow] = useState<ExtraordinaryWindow | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = () => {
    const championships = readUniverseChampionships();
    const next = championships.map(championship => ({
      championship,
      teams: readTeams(championship.id),
      season: Number(localStorage.getItem("geoprix-season-" + championship.id)) || championship.season || 2026
    }));
    setCategories(next);
    setActiveWindow(getExtraordinaryWindow());
    setSelectedChampionshipId(current => current && next.some(item => item.championship.id === current) ? current : next.find(item => item.championship.id === "formula-2-2026")?.championship.id || next[0]?.championship.id || "");
  };

  useEffect(() => {
    refresh();
    setReady(true);
    const onRosterUpdate = () => refresh();
    window.addEventListener("geoprix-rosters-updated", onRosterUpdate);
    window.addEventListener("geoprix-championships-updated", onRosterUpdate);
    window.addEventListener("storage", onRosterUpdate);
    return () => {
      window.removeEventListener("geoprix-rosters-updated", onRosterUpdate);
      window.removeEventListener("geoprix-championships-updated", onRosterUpdate);
      window.removeEventListener("storage", onRosterUpdate);
    };
  }, []);

  const selectedCategory = categories.find(item => item.championship.id === selectedChampionshipId);
  const availableTeams = useMemo(() => (selectedCategory?.teams || []).filter(team => filled(team) < capacity(selectedChampionshipId)), [categories, selectedChampionshipId]);
  const candidates: ExtraordinaryCandidate[] = activeWindow ? getExtraordinaryCandidates(activeWindow.championshipId) : [];
  const targetCategory = activeWindow ? categories.find(item => item.championship.id === activeWindow.championshipId) : undefined;
  const targetTeam = activeWindow ? targetCategory?.teams.find(team => team.id === activeWindow.teamId) : undefined;
  const targetSlots = activeWindow && targetTeam ? Math.max(0, capacity(activeWindow.championshipId) - filled(targetTeam)) : 0;

  function openWindow() {
    setError("");
    setNotice("");
    if (!selectedChampionshipId || !selectedTeamId) {
      setError("Selecione o campeonato e a equipe que receberá os pilotos.");
      return;
    }
    try {
      const opened = openExtraordinaryWindow(selectedChampionshipId, selectedTeamId);
      setActiveWindow(opened);
      setNotice("Janela aberta. Você já pode escolher os pilotos para a equipe.");
      refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível abrir a janela extraordinária.");
    }
  }

  function sign(candidate: ExtraordinaryCandidate) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const updated = signExtraordinaryDriver(candidate.driver.id);
      setActiveWindow(updated);
      setNotice(candidate.driver.name + " foi transferido para " + updated.teamName + ". As reposições das equipes de origem serão feitas ao fechar a janela.");
      refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível concluir a contratação.");
    } finally {
      setBusy(false);
    }
  }

  function closeWindow() {
    if (!activeWindow) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = closeExtraordinaryWindow();
      setActiveWindow(null);
      refresh();
      setNotice(
        "Janela fechada. " + result.filled + " vaga(s) reposta(s) automaticamente." +
        (result.unfilled.length ? " " + result.unfilled.length + " vaga(s) permaneceram abertas por falta de pilotos elegíveis disponíveis." : " Todas as equipes desfalcadas foram recompostas.")
      );
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível fechar a janela extraordinária.");
    } finally {
      setBusy(false);
    }
  }

  return <section className="team-list" style={{ marginBottom: 24 }}>
    <div className="list-heading">
      <h2>Mercado extraordinário</h2>
      <span>{activeWindow ? "Janela aberta" : "Antes do início da temporada"}</span>
    </div>
    <div style={{ padding: "18px", display: "grid", gap: 16 }}>
      <p className="storage-note" style={{ margin: 0 }}>
        Cadastre e salve primeiro a nova equipe em <b>Equipes e Pilotos</b>. Depois, abra a janela aqui para contratar pilotos livres ou transferir pilotos que já tenham contrato. As equipes de origem serão recompostas automaticamente quando você fechar a janela.
      </p>
      {error && <p className="notice" role="alert">{error}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}
      {!ready ? <div className="empty-state">Carregando equipes e campeonatos...</div> : activeWindow ? <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">JANELA EM ANDAMENTO · TEMPORADA {activeWindow.season}</span>
            <h3 style={{ margin: "5px 0" }}>{activeWindow.teamName}</h3>
            <p style={{ margin: 0, color: "var(--muted)" }}>{activeWindow.championshipName} · {targetSlots} vaga(s) restante(s)</p>
          </div>
          <button className="action-button" onClick={closeWindow} disabled={busy}>
            <LockKeyhole size={16} /> {busy ? "Fechando..." : "Fechar janela e repor vagas"}
          </button>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 12 }}>
          <b style={{ display: "flex", alignItems: "center", gap: 8 }}><Users size={16} /> Equipes que aguardam reposição</b>
          {activeWindow.sourceVacancies.length ? <ul style={{ margin: "10px 0 0", paddingLeft: 20 }}>
            {activeWindow.sourceVacancies.map(item => <li key={item.championshipId + item.teamId}>{item.teamName} · {categories.find(category => category.championship.id === item.championshipId)?.championship.name || item.championshipId}</li>)}
          </ul> : <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>Nenhuma equipe perdeu um piloto ainda.</p>}
        </div>
        <div>
          <div className="list-heading" style={{ padding: 0, marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Pilotos elegíveis</h3>
            <span>{candidates.length} disponíveis</span>
          </div>
          {targetSlots === 0 ? <div className="empty-state">A equipe já preencheu todas as vagas. Feche a janela para concluir as reposições.</div> : candidates.length === 0 ? <div className="empty-state">Não há pilotos elegíveis disponíveis para esta equipe.</div> : <div style={{ display: "grid", gap: 8 }}>
            {candidates.map(candidate => <article className="market-contract-row" key={candidate.driver.id}>
              <div>
                <b>{candidate.driver.name}</b>
                <small>{candidate.driver.nationality || "Nacionalidade não informada"} · {candidate.driver.age ?? "—"} anos · {candidate.sourceChampionshipName}</small>
                <small>{candidate.sourceTeamName} · {candidate.sourceKind === "team" ? "Sob contrato" : "Agente livre"}</small>
              </div>
              <button className="quiet-button" onClick={() => sign(candidate)} disabled={busy || targetSlots <= 0}>
                {candidate.sourceKind === "team" ? "Transferir" : "Contratar"}
              </button>
            </article>)}
          </div>}
        </div>
      </> : <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <label style={{ display: "grid", gap: 6, fontWeight: 700 }}>
            Campeonato
            <select value={selectedChampionshipId} onChange={event => { setSelectedChampionshipId(event.target.value); setSelectedTeamId(""); }} style={{ width: "100%", padding: 11, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "inherit" }}>
              {categories.map(item => <option key={item.championship.id} value={item.championship.id}>{item.championship.name}</option>)}
            </select>
          </label>
          <label style={{ display: "grid", gap: 6, fontWeight: 700 }}>
            Equipe que receberá os pilotos
            <select value={selectedTeamId} onChange={event => setSelectedTeamId(event.target.value)} style={{ width: "100%", padding: 11, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", color: "inherit" }}>
              <option value="">Selecione uma equipe</option>
              {(selectedCategory?.teams || []).map(team => {
                const count = filled(team);
                const limit = capacity(selectedChampionshipId);
                return <option key={team.id} value={team.id} disabled={count >= limit}>{team.name || "Equipe sem nome"} · {count}/{limit} pilotos</option>;
              })}
            </select>
          </label>
        </div>
        <p className="storage-note" style={{ margin: 0 }}>
          {availableTeams.length} equipe(s) neste campeonato possuem vaga. A janela só pode ser aberta antes de qualquer corrida concluída da temporada selecionada.
        </p>
        <div>
          <button className="action-button" onClick={openWindow} disabled={busy || !selectedTeamId || availableTeams.length === 0}>
            <ArrowRightLeft size={16} /> Abrir janela extraordinária
          </button>
        </div>
      </>}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "var(--muted)", fontSize: 13 }}>
        <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>As transferências são registradas no histórico. Ao fechar, o sistema contrata automaticamente pilotos livres elegíveis para cada equipe desfalcada; se não houver opção válida, a vaga permanece aberta.</span>
      </div>
    </div>
  </section>;
}
