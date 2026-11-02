import type { Team } from "./types";

const driver=(id:string,name:string,number:number,nationality:string,age:number)=>({id,name,number,nationality,age,attributes:{racePace:50,qualifying:50,overtaking:50,defending:50,consistency:50}});
const team=(id:string,name:string,country:string,base:string,drivers:ReturnType<typeof driver>[]):Team=>({id,name,country,base,drivers,carAttributes:{power:40,downforce:40}});
export const initialFormula3Teams:Team[]=[
 team("f3-campos","Campos Racing","Espanha","Alzira, Espanha",[driver("f3-campos-nael","Théophile Naël",1,"França",19),driver("f3-campos-ugochukwu","Ugo Ugochukwu",2,"Estados Unidos",19),driver("f3-campos-rivera","Ernesto Rivera",3,"México",17)]),
 team("f3-trident","TRIDENT","Itália","Ossona, Itália",[driver("f3-trident-stromsted","Noah Strømsted",4,"Dinamarca",19),driver("f3-trident-slater","Freddie Slater",5,"Reino Unido",18),driver("f3-trident-depalo","Matteo De Palo",6,"Itália",18)]),
 team("f3-mp","MP Motorsport","Países Baixos","Westmaas, Países Baixos",[driver("f3-mp-colnaghi","Mattia Colnaghi",7,"Argentina",17),driver("f3-mp-taponen","Tuukka Taponen",8,"Finlândia",20),driver("f3-mp-giusti","Alessandro Giusti",9,"França",20)]),
 team("f3-art","ART Grand Prix","França","Villeneuve-la-Guyard, França",[driver("f3-art-kato","Taito Kato",10,"Japão",18),driver("f3-art-gladysz","Maciej Gładysz",11,"Polônia",18),driver("f3-art-le","Kanato Le",12,"Japão",19)]),
 team("f3-var","Van Amersfoort Racing","Países Baixos","Zeewolde, Países Baixos",[driver("f3-var-yamakoshi-replacement","Agente Livre F3 #14",14,"Japão",18),driver("f3-var-deligny","Enzo Deligny",15,"França",18),driver("f3-var-del-pino","Bruno Del Pino",16,"Espanha",20)]),
 team("f3-rodin","Rodin Motorsport","Nova Zelândia","Christchurch, Nova Zelândia",[driver("f3-rodin-clerot","Pedro Clerot",17,"Brasil",19),driver("f3-rodin-badoer","Brando Badoer",18,"Itália",20),driver("f3-rodin-maccagnani","Niccolò Maccagnani",19,"Itália",18)]),
 team("f3-prema","PREMA Racing","Itália","Grisignano di Zocco, Itália",[driver("f3-prema-powell","Alex Powell",20,"Jamaica / Estados Unidos",18),driver("f3-prema-wharton","James Wharton",21,"Austrália",18),driver("f3-prema-garfias","José Garfias",22,"México",22)]),
 team("f3-hitech","Hitech","Reino Unido","Silverstone, Reino Unido",[driver("f3-hitech-shin","Woohyun Shin",23,"Coreia do Sul",18),driver("f3-hitech-mclaughlin","Fionn McLaughlin",24,"Irlanda",18),driver("f3-hitech-nakamura","Jin Nakamura",25,"Japão",18)]),
 team("f3-aix","AIX Racing","Alemanha","Aachen, Alemanha",[driver("f3-aix-escotto","Ricardo Escotto",26,"México",18),driver("f3-aix-david","Yevan David",27,"Sri Lanka",19),driver("f3-aix-barrichello","Fernando Barrichello",28,"Brasil",21)]),
 team("f3-dams","DAMS Lucas Oil","França","Le Mans, França",[driver("f3-dams-lacorte","Nicola Lacorte",29,"Itália",18),driver("f3-dams-bhirombhakdi","Nandhavud Bhirombhakdi",30,"Tailândia",20),driver("f3-dams-xie","Gerrard Xie",31,"China",18)])
];
