"use client";
import {useEffect,useState} from "react";
export default function SeasonLabel({championshipId,initialSeason}:{championshipId:string;initialSeason:number}){
 const [season,setSeason]=useState(initialSeason);
 useEffect(()=>{
  const update=()=>{const stored=localStorage.getItem("geoprix-season-"+championshipId);setSeason(stored?Math.max(initialSeason,Number(stored)||initialSeason):initialSeason)};
  update();
  window.addEventListener("geoprix-season-updated",update);
  window.addEventListener("storage",update);
  return ()=>{window.removeEventListener("geoprix-season-updated",update);window.removeEventListener("storage",update)};
 },[championshipId,initialSeason]);
 return <span className="live">● TEMPORADA {season}</span>;
}
