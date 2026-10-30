"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

export default function ResetUniverseButton() {
  const [resetting, setResetting] = useState(false);

  function resetUniverse() {
    const confirmed = window.confirm(
      "ATENÇÃO: todos os dados salvos neste site serão apagados: equipes e pilotos personalizados, circuitos, contratos, calendários, resultados, regulamentos, relatórios e temporadas avançadas. O GEOPRIX será reiniciado com a base original da FORMULA 1 2026. Deseja continuar?"
    );
    if (!confirmed) return;

    setResetting(true);
    try {
      // O GEOPRIX usa o armazenamento local deste domínio como banco de dados.
      // Limpar a origem inteira evita deixar para trás chaves com prefixos antigos.
      window.localStorage.clear();
      window.sessionStorage.clear();
      window.location.assign("/geoprix-motorsport/");
    } catch (error) {
      setResetting(false);
      window.alert("Não foi possível limpar os dados do navegador. Verifique se o armazenamento do site está permitido e tente novamente.");
    }
  }

  return (
    <button className="quiet-button" type="button" onClick={resetUniverse} disabled={resetting}>
      <RotateCcw size={14} /> {resetting ? "Reiniciando..." : "APAGAR DADOS E REINICIAR 2026"}
    </button>
  );
}
