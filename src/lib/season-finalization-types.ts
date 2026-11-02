export type ResultStatus="finished"|"retired"|"disqualified"|"dns";
export type DriverResult={id:string;driverId:string;driverName:string;teamId:string;teamName:string;status:ResultStatus;qualifyingStatus?:ResultStatus;qualifyingPosition:number|null;position:number|null;points:number};
export type Round={id:string;round:number;circuitId:string;circuitName:string;layout:string;status:"scheduled"|"completed";results:DriverResult[]};
