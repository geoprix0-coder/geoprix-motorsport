export type Team = { id: string; name: string; country: string; base: string; drivers: Driver[] };
export type Driver = { id: string; name: string; number: number; nationality: string };
export type Circuit = {
  id: string; name: string; code: string; origin: "real" | "fictional";
  country: string; city: string;
  type: "permanent" | "street" | "semi-permanent" | "temporary" | "mixed";
  lengthKm: number | null;
  width: "single" | "2 wide" | "3 wide" | "4 wide" | "5 wide" | "6 wide";
  direction: "clockwise" | "counterclockwise"; layouts: string[];
  openingYear: number | null;
  status: "active" | "inactive" | "under-construction" | "planned";
  categories: string[];
};
export type Championship = { id: string; name: string; category: string; season: number; status: "planning" | "active" | "completed" };
export type RaceSession = "qualifying" | "race" | "post-race";
export type RaceResult = { id: string; championshipId: string; circuitId: string; date: string; session: RaceSession; driverId: string; teamId: string; position: number; points: number };
