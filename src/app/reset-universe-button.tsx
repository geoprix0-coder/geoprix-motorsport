"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { initialChampionships, initialTeams, initialFormula2Teams } from "@/lib/seed";
import { UNIVERSE_CHAMPIONSHIPS_KEY } from "@/lib/universe";
import { teamStorageKey } from "@/lib/championship-data";
import { applyInitialAttributeBaseline, applyFormula2InitialBaseline, ensureDevelopmentData } from "@/lib/season-development";
import { ensureFreeAgentPool } from "@/lib/free-agents";

export default function ResetUniverseButton() {
  const [resetting, setResetting] = useState(false);

  function resetUniverse() {
    const confirmed = window.confirm(
      "ATENÇÃO: todos os dados personalizados serão apagados: equipes e pilotos adicionados, circuitos, contratos, calendários, resultados, regulamentos, relatórios, aposentadorias e temporadas avançadas. O GEOPRIX será reconstruído com as categorias originais FORMULA 1 2026 e FORMULA 2 2026, incluindo suas equipes e pilotos iniciais. Deseja continuar?"
    );
    if (!confirmed) return;

    setResetting(true);
    try {
      // Limpa dados antigos e reconstrói explicitamente os dois campeonatos nativos.
      window.localStorage.clear();
      window.sessionStorage.clear();

      const f1Teams = ensureDevelopmentData(applyInitialAttributeBaseline(initialTeams), 2026);
      const f2Teams = ensureDevelopmentData(applyFormula2InitialBaseline(initialFormula2Teams), 2026);

      window.localStorage.setItem(UNIVERSE_CHAMPIONSHIPS_KEY, JSON.stringify(initialChampionships));
      window.localStorage.setItem(teamStorageKey("formula-1-2026"), JSON.stringify(f1Teams));
      window.localStorage.setItem(teamStorageKey("formula-2-2026"), JSON.stringify(f2Teams));
      window.localStorage.setItem("geoprix-initial-attributes-v2", "true");
      window.localStorage.setItem("geoprix-f2-initial-attributes-v2", "true");
      ensureFreeAgentPool(10);

      window.location.assign("/geoprix-motorsport/");
    } catch (error) {
      setResetting(false);
      window.alert("Não foi possível reiniciar os dados do GEOPRIX. Verifique se o armazenamento do site está permitido e tente novamente.");
    }
  }

  return (
    <button className="quiet-button" type="button" onClick={resetUniverse} disabled={resetting}>
      <RotateCcw size={14} /> {resetting ? "Reiniciando..." : "APAGAR DADOS E REINICIAR 2026"}
    </button>
  );
}
