export type Team = { id: string; name: string; country: string; base: string; drivers: Driver[]; development?: { developmentCapacity:number; investment:number; technicalEfficiency:number; technicalStability:number }; carAttributes?: { power:number; downforce:number }; geoprixProfile?: { founded:number; colors:string[]; ownership:string; owner:string; staff:string; finance:string; reputation:string } };
export type Driver = { id: string; name: string; number: number; nationality: string; age?:number; attributes?: { racePace:number; qualifying:number; overtaking:number; defending:number; consistency:number } };
export type Circuit = {
  id: string;
  name: string;
  country: string;
  lengthKm: number | null;
  width: "single" | "2 wide" | "3 wide" | "4 wide" | "5 wide" | "6 wide";
  grade: 1 | 2 | 3 | 4 | 5 | 6;
  layouts: string[];
  status: "active" | "inactive" | "under-construction" | "planned";
};
export type Championship = { id: string; name: string; category: string; season: number; status: "planning" | "active" | "completed" };
export type RaceSession = "qualifying" | "race" | "post-race";
export type RaceResult = { id: string; championshipId: string; circuitId: string; date: string; session: RaceSession; driverId: string; teamId: string; position: number; points: number };
