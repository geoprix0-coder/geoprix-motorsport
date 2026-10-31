import type { Driver } from "./types";

export type DriverRaceRecord = {
  round: number;
  circuitName: string;
  status: string;
  position: number | null;
  points: number;
  teamName: string;
};
export type DriverSeasonRecord = {
  championshipId: string;
  season: number;
  position: number | null;
  teamName: string;
  points: number;
  wins: number;
  podiums: number;
  races: number;
  bestPosition: number | null;
  raceResults: DriverRaceRecord[];
};
export type DriverCareerRecord = {
  races: number;
  wins: number;
  podiums: number;
  points: number;
  bestPosition: number | null;
  seasons: DriverSeasonRecord[];
  currentSeasons: DriverSeasonRecord[];
};

type StoredResult = {
  driverId?: string; driverName?: string; status?: string;
  position?: number | null; points?: number; teamName?: string;
};
type StoredRound = {
  round?: number; circuitName?: string; status?: string; results?: StoredResult[];
};
type StoredArchive = { season: number; rounds?: StoredRound[] };
type StoredStanding = {
  id?: string; name?: string; teamName?: string; position?: number;
  points?: number; wins?: number; podiums?: number; races?: number;
  bestPosition?: number | null;
};
type StoredSeason = { season: number; driverStandings?: StoredStanding[] };

const normalize = (value: unknown) => String(value ?? "")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]/g, "");

function isSameDriver(result: { driverId?: string; driverName?: string }, driver: Driver) {
  if (result.driverId && String(result.driverId) === String(driver.id)) return true;
  return Boolean(result.driverName && normalize(result.driverName) === normalize(driver.name));
}
function isFinished(status: unknown) {
  return ["finished", "finalizou"].includes(String(status ?? "").toLowerCase());
}
function readArray<T>(key: string): T[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch { return []; }
}
function calculate(rounds: StoredRound[], driver: Driver) {
  const raceResults: DriverRaceRecord[] = [];
  for (const round of rounds) {
    if (String(round.status ?? "").toLowerCase() !== "completed") continue;
    const result = (round.results ?? []).find(item => isSameDriver(item, driver));
    if (!result) continue;
    raceResults.push({
      round: Number(round.round) || raceResults.length + 1,
      circuitName: round.circuitName || "Circuito não identificado",
      status: String(result.status || "unknown"),
      position: isFinished(result.status) && typeof result.position === "number" ? result.position : null,
      points: Number(result.points) || 0,
      teamName: result.teamName || ""
    });
  }
  const classified = raceResults.filter(item => item.position !== null && item.position > 0);
  return {
    raceResults,
    races: classified.length,
    wins: classified.filter(item => item.position === 1).length,
    podiums: classified.filter(item => item.position !== null && item.position <= 3).length,
    points: raceResults.reduce((sum, item) => sum + item.points, 0),
    bestPosition: classified.length ? Math.min(...classified.map(item => item.position!)) : null,
    teamName: [...raceResults].reverse().find(item => item.teamName)?.teamName || ""
  };
}

export function getDriverCareerRecord(driver: Driver): DriverCareerRecord {
  const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
    .filter((key): key is string => Boolean(key));
  const championshipIds = new Set<string>();
  for (const key of keys) {
    if (key.startsWith("geoprix-season-history-")) championshipIds.add(key.slice("geoprix-season-history-".length));
    else if (key.startsWith("geoprix-calendar-history-")) championshipIds.add(key.slice("geoprix-calendar-history-".length));
    else if (key.startsWith("geoprix-calendar-")) championshipIds.add(key.slice("geoprix-calendar-".length));
  }

  const seasons: DriverSeasonRecord[] = [];
  const currentSeasons: DriverSeasonRecord[] = [];
  for (const championshipId of championshipIds) {
    const summaries = readArray<StoredSeason>("geoprix-season-history-" + championshipId);
    const archives = readArray<StoredArchive>("geoprix-calendar-history-" + championshipId);
    const currentRounds = readArray<StoredRound>("geoprix-calendar-" + championshipId);
    const completedYears = new Set<number>();

    for (const archive of archives) {
      const year = Number(archive.season);
      if (!Number.isFinite(year)) continue;
      const calculated = calculate(archive.rounds ?? [], driver);
      const summary = summaries.find(item => Number(item.season) === year);
      const standing = summary?.driverStandings?.find(item =>
        (item.id && String(item.id) === String(driver.id)) ||
        (item.name && normalize(item.name) === normalize(driver.name))
      );
      if (!standing && calculated.raceResults.length === 0) continue;
      seasons.push({
        championshipId, season: year,
        position: typeof standing?.position === "number" ? standing.position : null,
        teamName: standing?.teamName || calculated.teamName || "",
        points: calculated.raceResults.length ? calculated.points : Number(standing?.points) || 0,
        wins: calculated.raceResults.length ? calculated.wins : Number(standing?.wins) || 0,
        podiums: calculated.raceResults.length ? calculated.podiums : Number(standing?.podiums) || 0,
        races: calculated.raceResults.length ? calculated.races : Number(standing?.races) || 0,
        bestPosition: calculated.raceResults.length ? calculated.bestPosition :
          (typeof standing?.bestPosition === "number" ? standing.bestPosition : (Number(standing?.wins) > 0 ? 1 : null)),
        raceResults: calculated.raceResults
      });
      completedYears.add(year);
    }

    for (const summary of summaries) {
      const year = Number(summary.season);
      if (!Number.isFinite(year) || completedYears.has(year)) continue;
      const standing = summary.driverStandings?.find(item =>
        (item.id && String(item.id) === String(driver.id)) ||
        (item.name && normalize(item.name) === normalize(driver.name))
      );
      if (!standing) continue;
      seasons.push({
        championshipId, season: year,
        position: typeof standing.position === "number" ? standing.position : null,
        teamName: standing.teamName || "",
        points: Number(standing.points) || 0, wins: Number(standing.wins) || 0,
        podiums: Number(standing.podiums) || 0, races: Number(standing.races) || 0,
        bestPosition: typeof standing.bestPosition === "number" ? standing.bestPosition : (Number(standing.wins) > 0 ? 1 : null),
        raceResults: []
      });
      completedYears.add(year);
    }

    const activeYear = Number(localStorage.getItem("geoprix-season-" + championshipId)) || 2026;
    const active = calculate(currentRounds, driver);
    if (active.raceResults.length) currentSeasons.push({
      championshipId, season: activeYear, position: null,
      teamName: active.teamName, points: active.points, wins: active.wins,
      podiums: active.podiums, races: active.races,
      bestPosition: active.bestPosition, raceResults: active.raceResults
    });
  }

  const total = [...seasons, ...currentSeasons].reduce((sum, item) => ({
    races: sum.races + item.races, wins: sum.wins + item.wins,
    podiums: sum.podiums + item.podiums, points: sum.points + item.points,
    bestPosition: item.bestPosition === null ? sum.bestPosition :
      sum.bestPosition === null ? item.bestPosition : Math.min(sum.bestPosition, item.bestPosition)
  }), { races: 0, wins: 0, podiums: 0, points: 0, bestPosition: null as number | null });

  seasons.sort((a, b) => b.season - a.season || a.championshipId.localeCompare(b.championshipId));
  currentSeasons.sort((a, b) => b.season - a.season || a.championshipId.localeCompare(b.championshipId));
  return { ...total, seasons, currentSeasons };
}
