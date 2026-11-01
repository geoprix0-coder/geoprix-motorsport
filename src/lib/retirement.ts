import type { Team, Championship } from "./types";
import { readUniverseChampionships } from "./universe";
import { teamStorageKey, initialTeamsForChampionship } from "./championship-data";

export type RetiredDriver = {
  driverId: string;
  driverName: string;
  age: number;
  retirementSeason: number;
  retiredAt: string;
  lastTeam: string;
  championshipName: string;
  reason: string;
};

export const RETIRED_DRIVERS_KEY = "geoprix-retired-drivers-v1";
export const RETIREMENT_NOTICES_KEY = "geoprix-retirement-notices-v1";

function readArray<T>(key: string): T[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function hash(value: string) {
  let result = 0;
  for (let i = 0; i < value.length; i++) result = (result * 31 + value.charCodeAt(i)) >>> 0;
  return result;
}

function contractKey(championshipId: string) {
  return championshipId === "formula-1-2026"
    ? "geoprix-driver-contracts-v1"
    : `geoprix-driver-contracts-${championshipId}-v1`;
}

// Called once at the end of a championship season. Age is advanced from the
// championship's registered starting season; results and season archives remain untouched.
export function processAutomaticRetirements(season: number): RetiredDriver[] {
  const processedKey = `geoprix-retirement-processed-${season}`;
  if (localStorage.getItem(processedKey)) return [];

  const championships: Championship[] = readUniverseChampionships();
  const retired = readArray<RetiredDriver>(RETIRED_DRIVERS_KEY);
  const retiredIds = new Set(retired.map(item => item.driverId));
  const candidates = new Map<string, { driverId: string; driverName: string; age: number; lastTeam: string; championshipName: string }>();

  for (const championship of championships) {
    const raw = localStorage.getItem(teamStorageKey(championship.id));
    let teams: Team[];
    try {
      if (raw) {
        const parsed = JSON.parse(raw);
        teams = Array.isArray(parsed) ? parsed : initialTeamsForChampionship(championship.id);
      } else {
        teams = initialTeamsForChampionship(championship.id);
      }
    } catch {
      teams = initialTeamsForChampionship(championship.id);
    }
    const currentSeason = Number(localStorage.getItem(`geoprix-season-${championship.id}`)) || season;
    for (const team of teams) {
      for (const driver of team.drivers || []) {
        if (retiredIds.has(driver.id) || typeof driver.age !== "number" || !Number.isFinite(driver.age)) continue;
        const age = driver.age + Math.max(0, currentSeason - championship.season);
        const existing = candidates.get(driver.id);
        if (!existing || age > existing.age) {
          candidates.set(driver.id, { driverId: driver.id, driverName: driver.name, age, lastTeam: team.name, championshipName: championship.name });
        }
      }
    }
  }

  const newlyRetired: RetiredDriver[] = [];
  for (const candidate of candidates.values()) {
    // A realistic retirement window: increasingly likely from 38, certain at 41.
    const chance = candidate.age >= 41 ? 100 : candidate.age === 40 ? 75 : candidate.age === 39 ? 45 : candidate.age === 38 ? 20 : candidate.age === 37 ? 8 : 0;
    if (chance === 0 || hash(candidate.driverId + "-" + season) % 100 >= chance) continue;
    newlyRetired.push({
      ...candidate,
      retirementSeason: season,
      retiredAt: new Date().toISOString(),
      reason: candidate.age >= 41
        ? "Atingiu a idade-limite definida para aposentadoria automática."
        : "A decisão automática considerou a faixa etária natural de encerramento de carreira."
    });
  }

  if (newlyRetired.length) {
    const newIds = new Set(newlyRetired.map(item => item.driverId));
    for (const championship of championships) {
      const key = teamStorageKey(championship.id);
      const raw = localStorage.getItem(key);
      try {
        const teams = raw ? JSON.parse(raw) as Team[] : initialTeamsForChampionship(championship.id);
        if (Array.isArray(teams)) {
          const updated = teams.map(team => ({ ...team, drivers: (team.drivers || []).filter(driver => !newIds.has(driver.id)) }));
          localStorage.setItem(key, JSON.stringify(updated));
        }
      } catch {}

      const keyContracts = contractKey(championship.id);
      const contracts = readArray<{ driverId: string; status: string }>(keyContracts);
      if (contracts.length) {
        localStorage.setItem(keyContracts, JSON.stringify(contracts.map(contract =>
          newIds.has(contract.driverId) ? { ...contract, status: "retired" } : contract
        )));
      }
    }

    // The archive is global and permanent; race and championship histories are not deleted.
    localStorage.setItem(RETIRED_DRIVERS_KEY, JSON.stringify([...retired, ...newlyRetired]));
    const notices = readArray<RetiredDriver>(RETIREMENT_NOTICES_KEY);
    localStorage.setItem(RETIREMENT_NOTICES_KEY, JSON.stringify([...notices, ...newlyRetired]));
  }

  localStorage.setItem(processedKey, "true");
  window.dispatchEvent(new Event("geoprix-rosters-updated"));
  return newlyRetired;
}

export function getRetiredDrivers(): RetiredDriver[] {
  // Merge the permanent archive with legacy notifications so retirements saved by
  // earlier versions remain visible after the archive section was introduced.
  const archived = readArray<RetiredDriver>(RETIRED_DRIVERS_KEY);
  const notices = readArray<RetiredDriver>(RETIREMENT_NOTICES_KEY);
  const byDriverAndSeason = new Map<string, RetiredDriver>();
  for (const item of [...notices, ...archived]) {
    if (item && typeof item.driverId === "string") {
      byDriverAndSeason.set(`${item.driverId}-${item.retirementSeason}`, item);
    }
  }
  return [...byDriverAndSeason.values()].sort((a, b) => a.retirementSeason - b.retirementSeason);
}

export function getRetirementNotices(): RetiredDriver[] {
  return readArray<RetiredDriver>(RETIREMENT_NOTICES_KEY);
}
