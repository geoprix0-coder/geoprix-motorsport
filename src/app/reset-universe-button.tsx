"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { clearSportingUniverseData } from "@/lib/universe";

export default function ResetUniverseButton() {
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    clearSportingUniverseData();
    setCleared(true);
  }, []);

  return (
    <span className="quiet-button" aria-live="polite">
      <CheckCircle2 size={14} /> {cleared ? "CADASTROS ESPORTIVOS LIMPOS" : "LIMPANDO CADASTROS..."}
    </span>
  );
}
