export type NationalCategory = "Nacional A" | "Nacional B" | "Nacional C";
export type Circuit = { id: string; name: string; country: string; lengthKm: number };
export type NationalStage = { id: string; category: NationalCategory; stage: number; circuitId: string; laps: number; distanceKm: number };
export const NATIONAL_RULES: Record<NationalCategory, { reference: number; min: number; max: number }> = {
  "Nacional A": { reference: 100, min: 80, max: 120 },
  "Nacional B": { reference: 80, min: 64, max: 96 },
  "Nacional C": { reference: 60, min: 48, max: 72 },
};
export function calculateRaceDistance(category: NationalCategory, lengthKm: number) {
  if (!Number.isFinite(lengthKm) || lengthKm <= 0) return null;
  const rule = NATIONAL_RULES[category];
  const first = Math.ceil(rule.min / lengthKm);
  const last = Math.floor(rule.max / lengthKm);
  if (first > last) return null;
  let bestLaps = first;
  let bestDistance = first * lengthKm;
  for (let laps = first + 1; laps <= last; laps++) {
    const distance = laps * lengthKm;
    if (Math.abs(distance - rule.reference) < Math.abs(bestDistance - rule.reference)) {
      bestLaps = laps;
      bestDistance = distance;
    }
  }
  return { laps: bestLaps, distanceKm: Number(bestDistance.toFixed(3)) };
}
export const CIRCUITS_STORAGE_KEY = "geoprix:national-circuits:v1";
export const STAGES_STORAGE_KEY = "geoprix:national-stages:v1";
