import TeamsManager from "@/app/teams/teams-manager";
import { initialChampionships } from "@/lib/seed";

export function generateStaticParams() {
  return initialChampionships.length ? initialChampionships.map(championship => ({ id: championship.id })) : [{ id: "__empty__" }];
}

export default function ChampionshipTeamsPage() {
  return <TeamsManager />;
}
