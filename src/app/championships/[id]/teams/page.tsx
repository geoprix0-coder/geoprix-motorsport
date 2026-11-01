"use client";
import TeamsManager from "@/app/teams/teams-manager";
import { initialChampionships } from "@/lib/seed";

export function generateStaticParams() {
  return initialChampionships.map(championship => ({ id: championship.id }));
}

export default function ChampionshipTeamsPage() {
  return <TeamsManager />;
}
