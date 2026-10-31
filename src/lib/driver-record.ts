import type { Driver } from "./types";

type RaceResult = {
  driverId?: string;
  driverName?: string;
  status?: string;
  position?: number | null;
  points?: number;
  teamName?: string;
};
type RaceRound = { id?: string; round?: number; status?: string; results?: RaceResult[] };
type DriverStanding = {
  id?: string; name?: string; teamName?: string; position?: number;
  points?: number; wins?: number; podiums?: number; races?: number;
  bestPosition?: number | null;
};
type SeasonSummary = {
  season: number; completedAt?: string;
  driverStandings?: DriverStanding[];
};
type Archive = { season: number; rounds?: RaceRound[] };
export type DriverSeasonRecord = {
  championshipId: string; season: number; position: number | null;
  teamName: string; points: number; wins: number; podiums: number;
  races: number; bestPosition: number | null;
};
export type DriverCareerRecord = {
  races: number; wins: number; podiums: number; points: number;
  bestPosition: number | null; seasons: DriverSeasonRecord[];
};

const normalize = (value: unknown) => String(value ?? "")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().replace(/[^a-z0-9]/g, "");

function belongsToDriver(item: { id?: string; name?: string }, driver: Driver) {
  if (item.id && String(item.id) === String(driver.id)) return true;
  return Boolean(item.name && normalize(item.name) === normalize(driver.name));
}

function isFinisher(result: RaceResult) {
  return String(result.status ?? "").toLowerCase() === "finished"
    && typeof result.position === "number"
    && Number.isFinite(result.position)
    && result.position > 0;
}

function calculateFromRounds(rounds: RaceRound[], driver: Driver) {
  const totals = { races: 0, wins: 0, podiums: 0, points: 0, bestPosition: null as number | null, teamName: "" };
  for (const round of rounds) {
    if (String(round.status).toLowerCase() !== "completed") continue;
    const result = (round.results ?? []).find(item => belongsToDriver({ id: item.driverId, name: item.driverName }, driver));
    if (!result) continue;
    totals.teamName = result.teamName || totals.teamName;
    totals.points += Number(result.points) || 0;
    if (isFinisher(result)) {
      totals.races += 1;
      totals.bestPosition = totals.bestPosition === null ? result.position! : Math.min(totals.bestPosition, result.position!);
      if (result.position === 1) totals.wins += 1;
      if (result.position <= 3) totals.podiums += 1;
    }
  }
  return totals;
}

function readArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    const value = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value as T[] : [];
  } catch {
    return [];
  }
}

export function getDriverCareerRecord(driver: Driver): DriverCareerRecord {
  const keys = Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
    .filter((key): key is string => Boolean(key));
  const championshipIds = new Set<string>();
  for (const key of keys) {
    if (key.startsWith("geoprix-season-history-")) championshipIds.add(key.slice("geoprix-season-history-".length));
    if (key.startsWith("geoprix-calendar-history-")) championshipIds.add(key.slice("geoprix-calendar-history-".length));
    if (key.startsWith("geoprix-calendar-") && !key.startsWith("geoprix-calendar-history-")) championshipIds.add(key.slice("geoprix-calendar-".length));
  }

  const seasons: DriverSeasonRecord[] = [];
  for (const championshipId of championshipIds) {
    const summaries = readArray<SeasonSummary>("geoprix-season-history-" + championshipId);
    const archives = readArray<Archive>("geoprix-calendar-history-" + championshipId);
    const currentRounds = readArray<RaceRound>("geoprix-calendar-" + championshipId);
    const handled = new Set<number>();

    for (const summary of summaries) {
      if (!Number.isFinite(Number(summary.season))) continue;
      const standing = (summary.driverStandings ?? []).find(item => belongsToDriver(item, driver));
      if (!standing) continue;
      const archive = archives.find(item => Number(item.season) === Number(summary.season));
      const calculated = calculateFromRounds(archive?.rounds ?? [], driver);
      const races = typeof standing.races === "number" ? standing.races : calculated.races;
      const bestPosition = typeof standing.bestPosition === "number"
        ? standing.bestPosition : calculated.bestPosition;
      seasons.push({
        championshipId, season: Number(summary.season),
        position: typeof standing.position === "number" ? standing.position : null,
        teamName: standing.teamName || calculated.teamName || "",
        points: typeof standing.points === "number" ? standing.points : calculated.points,
        wins: typeof standing.wins === "number" ? standing.wins : calculated.wins,
        podiums: typeof standing.podiums === "number" ? standing.podiums : calculated.podiums,
        races, bestPosition
      });
      handled.add(Number(summary.season));
    }

    for (const archive of archives) {
      const season = Number(archive.season);
      if (!Number.isFinite(season) || handled.has(season)) continue;
      const calculated = calculateFromRounds(archive.rounds ?? [], driver);
      if (calculated.races || calculated.points || calculated.wins || calculated.podiums) {
        seasons.push({ championshipId, season, position: null, teamName: calculated.teamName,
          points: calculated.points, wins: calculated.wins, podiums: calculated.podiums,
          races: calculated.races, bestPosition: calculated.bestPosition });
        handled.add(season);
      }
    }

    const activeSeasonRaw = localStorage.getItem("geoprix-season-" + championshipId);
    const activeSeason = Number(activeSeasonRaw) || 2026;
    if (!handled.has(activeSeason)) {
      const calculated = calculateFromRounds(currentRounds, driver);
      if (calculated.races || calculated.points || calculated.wins || calculated.podiums) {
        seasons.push({ championshipId, season: activeSeason, position: null, teamName: calculated.teamName,
          points: calculated.points, wins: calculated.wins, podiums: calculated.podiums,
          races: calculated.races, bestPosition: calculated.bestPosition });
      }
    }
  }

  seasons.sort((a, b) => b.season - a.season || a.championshipId.localeCompare(b.championshipId));
  return seasons.reduce<DriverCareerRecord>((total, season) => ({
    races: total.races + season.races,
    wins: total.wins + season.wins,
    podiums: total.podiums + season.podiums,
    points: total.points + season.points,
    bestPosition: season.bestPosition === null ? total.bestPosition
      : total.bestPosition === null ? season.bestPosition
      : Math.min(total.bestPosition, season.bestPosition),
    seasons: [...total.seasons, season]
  }), { races: 0, wins: 0, podiums: 0, points: 0, bestPosition: null, seasons: [] });
}
