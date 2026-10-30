export type Team = { id: string; name: string; country: string; base: string; drivers: Driver[] };
export type Driver = { id: string; name: string; number: number; nationality: string };
export type Circuit = { id: string; name: string; country: string; city: string; lengthKm?: number; width?: "Single" | "2 wide" | "3 wide" | "4 wide" | "5 wide" | "6 wide" };
export type Championship = { id: string; name: string; category: string; season: number; teamLimit: number; status: "planning" | "active" | "completed" };
export type RaceSession = "qualifying" | "race" | "post-race";
export type RaceResult = { id: string; championshipId: string; circuitId: string; date: string; session: RaceSession; driverId: string; teamId: string; position: number; points: number };
export const INITIAL_TEAM_LIMIT = 11;
export const DRIVERS_PER_TEAM = 2;
