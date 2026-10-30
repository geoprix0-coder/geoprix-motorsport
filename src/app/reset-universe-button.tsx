"use client";

import { RotateCcw } from "lucide-react";

export default function ResetUniverseButton() {
  function resetUniverse() {
    const confirmed = window.confirm(
      "Isso apagará os dados GEOPRIX salvos neste navegador: campeonatos personalizados, equipes e pilotos editados, circuitos, contratos, calendários, resultados, regulamentos e históricos. A base inicial da temporada 2026 será restaurada. Deseja continuar?"
    );
    if (!confirmed) return;

    const keysToRemove: string[] = [];
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key && key.startsWith("geoprix-")) keysToRemove.push(key);
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    window.location.reload();
  }

  return (
    <button className="quiet-button" type="button" onClick={resetUniverse}>
      <RotateCcw size={14} /> Reiniciar universo 2026
    </button>
  );
}
