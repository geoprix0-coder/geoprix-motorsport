import type { Championship, Driver, Team } from "./types";
import { initialTeamsForChampionship, mergeInitialTeams, teamStorageKey } from "./championship-data";
import { readUniverseChampionships } from "./universe";
import { getCareerStatus, registerF1Debuts, registerF2Debuts, registerF3Debuts } from "./career-hierarchy";
import { getRetiredDrivers } from "./retirement";
import { initializeDriverContracts, type MarketContract, type MarketEvent } from "./market";
import { ensureFreeAgentPool } from "./free-agents";

export type ExtraordinaryVacancy = { championshipId: string; teamId: string; teamName: string };
export type ExtraordinaryWindow = {
  id: string;
  championshipId: string;
  championshipName: string;
  teamId: string;
  teamName: string;
  season: number;
  openedAt: string;
  signedDriverIds: string[];
  sourceVacancies: ExtraordinaryVacancy[];
};
export type ExtraordinaryCandidate = {
  driver: Driver;
  sourceChampionshipId: string;
  sourceChampionshipName: string;
  sourceTeamId: string;
  sourceTeamName: string;
  sourceKind: "team" | "free-agent";
  sourcePoolKey?: string;
  sourceTier: number;
  score: number;
};
export type ExtraordinaryCloseResult = {
  filled: number;
  unfilled: ExtraordinaryVacancy[];
  events: MarketEvent[];
};

const WINDOW_KEY = "geoprix-extraordinary-market-window-v1";
const F1 = "formula-1-2026";
const F2 = "formula-2-2026";
const F3 = "formula-3-2026";

function tier(championshipId: string): number {
  if (championshipId === F1) return 3;
  if (championshipId === F2) return 2;
  if (championshipId === F3) return 1;
  return 0;
}
function maxDrivers(championshipId: string): number {
  if (championshipId === F3 || championshipId === "formula-regional-europe-2026") return 3;
  return 2;
}
function contractKey(championshipId: string): string {
  return championshipId === F1 ? "geoprix-driver-contracts-v1" : "geoprix-driver-contracts-" + championshipId + "-v1";
}
function eventKey(championshipId: string): string {
  return championshipId === F1 ? "geoprix-market-history-v1" : "geoprix-market-history-" + championshipId + "-v1";
}
function readArray<T>(key: string): T[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
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
function writeTeams(championshipId: string, teams: Team[]) {
  localStorage.setItem(teamStorageKey(championshipId), JSON.stringify(teams));
}
function readWindow(): ExtraordinaryWindow | null {
  try {
    const value = JSON.parse(localStorage.getItem(WINDOW_KEY) || "null") as ExtraordinaryWindow | null;
    return value && value.id && value.championshipId && value.teamId ? value : null;
  } catch {
    return null;
  }
}
function occupied(team: Team): number {
  return (team.drivers || []).filter(driver => driver.name.trim().length > 0).length;
}
function hasVacancy(team: Team, championshipId: string): boolean {
  return occupied(team) < maxDrivers(championshipId);
}
function categoryName(championshipId: string): string {
  return readUniverseChampionships().find(item => item.id === championshipId)?.name || championshipId;
}
function eligibleSourceIds(targetId: string): string[] {
  if (targetId === F1) return [F1, F2];
  if (targetId === F2) return [F2, F3];
  if (targetId === F3) return [F3];
  return [targetId];
}
function eligibleCareer(driver: Driver, targetId: string, sourceId: string): boolean {
  const career = getCareerStatus().find(item => item.driverId === driver.id);
  if (getRetiredDrivers().some(item => item.driverId === driver.id)) return false;
  if (targetId === F1) return sourceId === F1 || sourceId === F2;
  if (targetId === F2) return sourceId === F2 || (sourceId === F3 && !career?.firstF2Season && !career?.firstF1Season);
  if (targetId === F3) return sourceId === F3 && !career?.firstF2Season && !career?.firstF1Season;
  return sourceId === targetId;
}
function poolFor(championshipId: string): string | null {
  if (championshipId === F1) return "geoprix-f1-free-agents-v1";
  if (championshipId === F2) return "geoprix-f2-free-agents-v1";
  if (championshipId === F3) return "geoprix-free-agents-v1";
  return null;
}
function ageFit(driver: Driver, targetId: string): number {
  const age = Number(driver.age) || (targetId === F1 ? 28 : targetId === F2 ? 22 : 18);
  if (targetId === F1) return age <= 22 ? 55 : age <= 27 ? 90 : age <= 33 ? 100 : age <= 37 ? 65 : 25;
  if (targetId === F2) return age <= 18 ? 70 : age <= 22 ? 100 : age <= 25 ? 85 : age <= 28 ? 50 : 15;
  return age <= 17 ? 100 : age <= 19 ? 90 : age <= 21 ? 55 : 15;
}
function scoreDriver(driver: Driver, targetId: string): number {
  const attributes = Object.values(driver.attributes || { racePace: 60, qualifying: 60, overtaking: 60, defending: 60, consistency: 60 });
  const average = attributes.reduce((sum, value) => sum + (Number(value) || 60), 0) / Math.max(1, attributes.length);
  return average * 0.72 + ageFit(driver, targetId) * 0.28;
}
function appendEvent(championshipId: string, event: MarketEvent) {
  const events = readArray<MarketEvent>(eventKey(championshipId));
  events.push(event);
  localStorage.setItem(eventKey(championshipId), JSON.stringify(events));
}
function updateContracts(championshipId: string, teams: Team[], driverId: string, teamId: string, season: number, status: MarketContract["status"] = "active") {
  const contracts = initializeDriverContracts(teams, season, championshipId);
  let contract = contracts.find(item => item.driverId === driverId);
  if (!contract) {
    contract = { driverId, teamId, startSeason: season, endSeason: season + 1, status };
    contracts.push(contract);
  }
  contract.teamId = teamId;
  contract.startSeason = season;
  contract.endSeason = season + 1;
  contract.endLabel = String(season + 1);
  contract.status = status;
  localStorage.setItem(contractKey(championshipId), JSON.stringify(contracts));
}
function expireContract(championshipId: string, driverId: string, season: number) {
  const contracts = readArray<MarketContract>(contractKey(championshipId));
  const contract = contracts.find(item => item.driverId === driverId);
  if (contract) {
    contract.status = "expired";
    contract.endSeason = season;
    contract.endLabel = String(season);
    localStorage.setItem(contractKey(championshipId), JSON.stringify(contracts));
  }
}
function registerCategoryDebut(championshipId: string, driver: Driver, season: number) {
  if (championshipId === F1) registerF1Debuts([driver], season);
  else if (championshipId === F2) registerF2Debuts([driver], season);
  else if (championshipId === F3) registerF3Debuts([driver], season);
}

export function getExtraordinaryWindow(): ExtraordinaryWindow | null {
  return readWindow();
}

export function openExtraordinaryWindow(championshipId: string, teamId: string): ExtraordinaryWindow {
  if (readWindow()) throw new Error("Já existe uma janela extraordinária aberta. Feche-a antes de iniciar outra.");
  const championship = readUniverseChampionships().find(item => item.id === championshipId);
  if (!championship) throw new Error("Campeonato não encontrado no universo.");
  const calendar = readArray<{ status?: string }>("geoprix-calendar-" + championshipId);
  if (calendar.some(round => round.status === "completed")) {
    throw new Error("A janela extraordinária só pode ser aberta antes do início das corridas da temporada.");
  }
  const teams = readTeams(championshipId);
  const team = teams.find(item => item.id === teamId);
  if (!team) throw new Error("Equipe não encontrada. Cadastre e salve a equipe antes de abrir a janela.");
  if (!hasVacancy(team, championshipId)) throw new Error("A equipe selecionada já está com todas as vagas preenchidas.");
  const season = Number(localStorage.getItem("geoprix-season-" + championshipId)) || championship.season || 2026;
  const next: ExtraordinaryWindow = {
    id: crypto.randomUUID(),
    championshipId,
    championshipName: championship.name,
    teamId,
    teamName: team.name,
    season,
    openedAt: new Date().toISOString(),
    signedDriverIds: [],
    sourceVacancies: []
  };
  localStorage.setItem(WINDOW_KEY, JSON.stringify(next));
  return next;
}

export function getExtraordinaryCandidates(championshipId: string): ExtraordinaryCandidate[] {
  const window = readWindow();
  if (!window || window.championshipId !== championshipId) return [];
  const targetTeams = readTeams(championshipId);
  const target = targetTeams.find(team => team.id === window.teamId);
  if (!target || !hasVacancy(target, championshipId)) return [];
  const ids = eligibleSourceIds(championshipId);
  const championships = readUniverseChampionships();
  const names = new Map(championships.map(item => [item.id, item.name]));
  const candidates: ExtraordinaryCandidate[] = [];
  const seen = new Set<string>([...window.signedDriverIds, ...targetTeams.flatMap(team => team.drivers.map(driver => driver.id))]);
  for (const sourceId of ids) {
    const sourceTier = tier(sourceId);
    for (const team of readTeams(sourceId)) {
      if (sourceId === championshipId && team.id === window.teamId) continue;
      for (const driver of team.drivers || []) {
        if (!driver.name.trim() || seen.has(driver.id) || !eligibleCareer(driver, championshipId, sourceId)) continue;
        seen.add(driver.id);
        candidates.push({
          driver,
          sourceChampionshipId: sourceId,
          sourceChampionshipName: names.get(sourceId) || sourceId,
          sourceTeamId: team.id,
          sourceTeamName: team.name,
          sourceKind: "team",
          sourceTier,
          score: scoreDriver(driver, championshipId)
        });
      }
    }
    const poolKey = poolFor(sourceId);
    if (!poolKey) continue;
    for (const driver of readArray<Driver>(poolKey)) {
      if (!driver.name.trim() || seen.has(driver.id) || !eligibleCareer(driver, championshipId, sourceId)) continue;
      seen.add(driver.id);
      candidates.push({
        driver,
        sourceChampionshipId: sourceId,
        sourceChampionshipName: names.get(sourceId) || (sourceId === F1 ? "FORMULA 1" : sourceId === F2 ? "FORMULA 2" : "FORMULA 3"),
        sourceTeamId: poolKey,
        sourceTeamName: sourceId === F1 ? "Agente livre da F1" : sourceId === F2 ? "Agente livre da F2" : "Agente livre da F3",
        sourceKind: "free-agent",
        sourcePoolKey: poolKey,
        sourceTier,
        score: scoreDriver(driver, championshipId)
      });
    }
  }
  return candidates.sort((a, b) => b.sourceTier - a.sourceTier || b.score - a.score || a.driver.name.localeCompare(b.driver.name));
}

export function signExtraordinaryDriver(driverId: string): ExtraordinaryWindow {
  const window = readWindow();
  if (!window) throw new Error("Não existe uma janela extraordinária aberta.");
  const candidate = getExtraordinaryCandidates(window.championshipId).find(item => item.driver.id === driverId);
  if (!candidate) throw new Error("Este piloto não está mais disponível ou não é elegível para esta categoria.");
  const targetId = window.championshipId;
  const targetTeams = readTeams(targetId).map(team => ({ ...team, drivers: [...team.drivers] }));
  const targetTeam = targetTeams.find(team => team.id === window.teamId);
  if (!targetTeam || !hasVacancy(targetTeam, targetId)) throw new Error("A equipe de destino não possui mais vagas.");
  if (targetId === F2) {
    const duplicateNumber = readTeams(F2).some(team => team.drivers.some(driver => driver.id !== driverId && driver.number === candidate.driver.number));
    if (duplicateNumber) throw new Error("O número deste piloto já está em uso na Formula 2. Escolha outro piloto disponível.");
  }

  if (candidate.sourceKind === "team") {
    const sourceTeams = candidate.sourceChampionshipId === targetId
      ? targetTeams
      : readTeams(candidate.sourceChampionshipId).map(team => ({ ...team, drivers: [...team.drivers] }));
    const sourceTeam = sourceTeams.find(team => team.id === candidate.sourceTeamId);
    if (!sourceTeam || !sourceTeam.drivers.some(driver => driver.id === driverId)) throw new Error("O vínculo original do piloto mudou. Atualize a página e tente novamente.");
    sourceTeam.drivers = sourceTeam.drivers.filter(driver => driver.id !== driverId);
    if (candidate.sourceChampionshipId !== targetId) writeTeams(candidate.sourceChampionshipId, sourceTeams);
    const vacancy = { championshipId: candidate.sourceChampionshipId, teamId: sourceTeam.id, teamName: sourceTeam.name };
    if (!window.sourceVacancies.some(item => item.championshipId === vacancy.championshipId && item.teamId === vacancy.teamId)) window.sourceVacancies.push(vacancy);
    if (candidate.sourceChampionshipId !== targetId) expireContract(candidate.sourceChampionshipId, driverId, window.season);
  } else {
    const poolKey = candidate.sourcePoolKey;
    if (poolKey) {
      const remaining = readArray<Driver>(poolKey).filter(driver => driver.id !== driverId);
      localStorage.setItem(poolKey, JSON.stringify(remaining));
    }
    expireContract(candidate.sourceChampionshipId, driverId, window.season);
  }

  const blankIndex = targetTeam.drivers.findIndex(driver => !driver.name.trim());
  if (blankIndex >= 0) targetTeam.drivers[blankIndex] = candidate.driver;
  else targetTeam.drivers.push(candidate.driver);
  writeTeams(targetId, targetTeams);
  if (candidate.sourceKind === "team" && candidate.sourceChampionshipId === targetId) {
    const sourceContractKey = contractKey(targetId);
    const contracts = readArray<MarketContract>(sourceContractKey);
    const existing = contracts.find(item => item.driverId === driverId);
    if (existing) {
      existing.teamId = targetTeam.id;
      existing.status = "active";
      existing.startSeason = window.season;
      existing.endSeason = window.season + 1;
      existing.endLabel = String(window.season + 1);
      localStorage.setItem(sourceContractKey, JSON.stringify(contracts));
    }
  }
  updateContracts(targetId, targetTeams, driverId, targetTeam.id, window.season);
  registerCategoryDebut(targetId, candidate.driver, window.season);
  const event: MarketEvent = {
    id: crypto.randomUUID(),
    season: window.season,
    type: candidate.sourceKind === "free-agent" ? "signing" : candidate.sourceChampionshipId === targetId ? "transfer" : "promotion",
    driverId,
    driverName: candidate.driver.name,
    fromTeamId: candidate.sourceTeamId,
    fromTeamName: candidate.sourceTeamName,
    toTeamId: targetTeam.id,
    toTeamName: targetTeam.name,
    contractEnd: window.season + 1,
    reason: "Movimentação realizada pela janela extraordinária antes do início da temporada. " + (candidate.sourceChampionshipId === targetId ? "Transferência entre equipes da mesma categoria." : candidate.sourceKind === "free-agent" ? "Contratação de piloto sem equipe." : "Promoção para uma categoria superior."),
    createdAt: new Date().toISOString(),
    windowType: "extraordinary"
  };
  appendEvent(targetId, event);
  window.signedDriverIds.push(driverId);
  localStorage.setItem(WINDOW_KEY, JSON.stringify(window));
  window.dispatchEvent(new Event("geoprix-rosters-updated"));
  window.dispatchEvent(new Event("geoprix-market-updated"));
  return window;
}

function freeAgentCandidatesFor(targetId: string, occupiedIds: Set<string>): ExtraordinaryCandidate[] {
  const ids = eligibleSourceIds(targetId);
  const names = new Map(readUniverseChampionships().map(item => [item.id, item.name]));
  const candidates: ExtraordinaryCandidate[] = [];
  for (const sourceId of ids) {
    const poolKey = poolFor(sourceId);
    if (!poolKey) continue;
    for (const driver of readArray<Driver>(poolKey)) {
      if (!driver.name.trim() || occupiedIds.has(driver.id) || !eligibleCareer(driver, targetId, sourceId)) continue;
      candidates.push({
        driver,
        sourceChampionshipId: sourceId,
        sourceChampionshipName: names.get(sourceId) || sourceId,
        sourceTeamId: poolKey,
        sourceTeamName: sourceId === F1 ? "Agente livre da F1" : sourceId === F2 ? "Agente livre da F2" : "Agente livre da F3",
        sourceKind: "free-agent",
        sourcePoolKey: poolKey,
        sourceTier: tier(sourceId),
        score: scoreDriver(driver, targetId)
      });
    }
  }
  return candidates.sort((a, b) => b.sourceTier - a.sourceTier || b.score - a.score || a.driver.name.localeCompare(b.driver.name));
}

export function closeExtraordinaryWindow(): ExtraordinaryCloseResult {
  const window = readWindow();
  if (!window) throw new Error("Não existe uma janela extraordinária aberta.");
  if (window.championshipId === F3) ensureFreeAgentPool(10);
  const vacancies = [...window.sourceVacancies].sort((a, b) => tier(a.championshipId) - tier(b.championshipId));
  const teamsByCategory = new Map<string, Team[]>();
  for (const vacancy of vacancies) {
    if (!teamsByCategory.has(vacancy.championshipId)) teamsByCategory.set(vacancy.championshipId, readTeams(vacancy.championshipId).map(team => ({ ...team, drivers: [...team.drivers] })));
  }
  const occupiedIds = new Set(readUniverseChampionships().flatMap(championship => readTeams(championship.id).flatMap(team => team.drivers.map(driver => driver.id))));
  const usedPoolIds = new Set<string>();
  const events: MarketEvent[] = [];
  const unfilled: ExtraordinaryVacancy[] = [];
  let filled = 0;

  for (const vacancy of vacancies) {
    const teams = teamsByCategory.get(vacancy.championshipId) || [];
    const team = teams.find(item => item.id === vacancy.teamId);
    if (!team) continue;
    const season = Number(localStorage.getItem("geoprix-season-" + vacancy.championshipId)) || window.season;
    while (occupied(team) < maxDrivers(vacancy.championshipId)) {
      const candidates = freeAgentCandidatesFor(vacancy.championshipId, occupiedIds).filter(item => !usedPoolIds.has(item.driver.id));
      const candidate = candidates.find(item => vacancy.championshipId !== F2 || !teams.some(other => other.drivers.some(driver => driver.number === item.driver.number)));
      if (!candidate) break;
      const blankIndex = team.drivers.findIndex(driver => !driver.name.trim());
      if (blankIndex >= 0) team.drivers[blankIndex] = candidate.driver;
      else team.drivers.push(candidate.driver);
      usedPoolIds.add(candidate.driver.id);
      occupiedIds.add(candidate.driver.id);
      if (candidate.sourcePoolKey) {
        const remaining = readArray<Driver>(candidate.sourcePoolKey).filter(driver => driver.id !== candidate.driver.id);
        localStorage.setItem(candidate.sourcePoolKey, JSON.stringify(remaining));
      }
      expireContract(candidate.sourceChampionshipId, candidate.driver.id, season);
      updateContracts(vacancy.championshipId, teams, candidate.driver.id, team.id, season);
      registerCategoryDebut(vacancy.championshipId, candidate.driver, season);
      const event: MarketEvent = {
        id: crypto.randomUUID(),
        season,
        type: candidate.sourceChampionshipId === vacancy.championshipId ? "signing" : "promotion",
        driverId: candidate.driver.id,
        driverName: candidate.driver.name,
        fromTeamId: candidate.sourceTeamId,
        fromTeamName: candidate.sourceTeamName,
        toTeamId: team.id,
        toTeamName: team.name,
        contractEnd: season + 1,
        reason: "Reposição automática após a janela extraordinária. A equipe recebeu um piloto elegível do mercado disponível sem intervenção do usuário.",
        createdAt: new Date().toISOString(),
        windowType: "extraordinary"
      };
      appendEvent(vacancy.championshipId, event);
      events.push(event);
      filled += 1;
    }
    if (occupied(team) < maxDrivers(vacancy.championshipId)) unfilled.push(vacancy);
  }
  for (const [championshipId, teams] of teamsByCategory) writeTeams(championshipId, teams);
  const history = readArray<{ id: string; closedAt: string; window: ExtraordinaryWindow; filled: number; unfilled: ExtraordinaryVacancy[] }>("geoprix-extraordinary-market-history-v1");
  history.push({ id: window.id, closedAt: new Date().toISOString(), window, filled, unfilled });
  localStorage.setItem("geoprix-extraordinary-market-history-v1", JSON.stringify(history));
  localStorage.removeItem(WINDOW_KEY);
  if (usedPoolIds.size && usedPoolIds.has("free-agent-placeholder")) localStorage.removeItem("free-agent-placeholder");
  if (readArray<Driver>("geoprix-free-agents-v1").length < 10) ensureFreeAgentPool(10);
  window.dispatchEvent(new Event("geoprix-rosters-updated"));
  window.dispatchEvent(new Event("geoprix-market-updated"));
  return { filled, unfilled, events };
}
