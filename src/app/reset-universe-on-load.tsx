"use client";

import { useEffect } from "react";
import { clearSportingUniverseData } from "@/lib/universe";

export default function ResetUniverseOnLoad() {
  useEffect(() => {
    clearSportingUniverseData();
  }, []);
  return null;
}
