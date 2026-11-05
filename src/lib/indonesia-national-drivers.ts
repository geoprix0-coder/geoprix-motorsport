import type { Driver } from "./types";

// Seed fixo dos grids nacionais da Indonésia — temporada inaugural 2026.
// Tupla: [id, nome, número, nacionalidade, idade, racePace, qualifying, overtaking, defending, consistency]
type Seed = [string,string,number,string,number,number,number,number,number,number];
const A: Record<string, Seed[]> = {
"idn-gar":[
["idn-a-gar-07","Arka Pratama",7,"Indonésia",19,15,15,13,14,14],
["idn-a-gar-21","Dimas Wirawan",21,"Indonésia",20,14,13,15,15,13],
["idn-a-gar-44","Rafi Mahendra",44,"Indonésia",16,12,14,14,12,13]],
"idn-mer":[
["idn-a-mer-11","Bima Santoso",11,"Indonésia",19,14,13,12,15,15],
["idn-a-mer-28","Fajar Nugraha",28,"Indonésia",18,14,15,13,12,13],
["idn-a-mer-63","Reza Kurniawan",63,"Indonésia",16,13,13,15,14,12]],
"idn-sur":[
["idn-a-sur-05","Aditya Saputra",5,"Indonésia",20,15,14,14,13,15],
["idn-a-sur-17","Galang Putra",17,"Indonésia",17,14,15,12,12,13],
["idn-a-sur-39","Ilham Ramadhan",39,"Indonésia",19,13,12,15,14,14]],
"idn-raj":[
["idn-a-raj-09","Bagas Firmansyah",9,"Indonésia",18,14,15,15,12,13],
["idn-a-raj-32","Yoga Prakoso",32,"Indonésia",20,13,13,12,15,15],
["idn-a-raj-56","Rizky Hidayat",56,"Indonésia",15,11,12,14,11,12]],
"idn-bat":[
["idn-a-bat-01","Erlangga Wijaya",1,"Indonésia",20,15,15,14,15,15],
["idn-a-bat-16","Kevin Setiawan",16,"Indonésia",19,14,15,14,12,13],
["idn-a-bat-77","Naufal Akbar",77,"Indonésia",16,13,13,15,11,12]],
"idn-sum":[
["idn-a-sum-12","Andika Permana",12,"Indonésia",19,14,12,14,15,15],
["idn-a-sum-34","Farhan Maulana",34,"Indonésia",17,13,15,14,12,13],
["idn-a-sum-58","Aldi Firmansyah",58,"Indonésia",15,11,12,14,12,12]],
"idn-sri":[
["idn-a-sri-14","Hafiz Ramadhan",14,"Indonésia",19,14,14,12,15,15],
["idn-a-sri-26","Rendra Saputro",26,"Indonésia",18,13,15,15,12,12],
["idn-a-sri-71","Tegar Pranata",71,"Indonésia",15,11,12,13,12,13]],
"idn-cel":[
["idn-a-cel-08","Muhammad Iqbal",8,"Indonésia",20,15,14,13,15,14],
["idn-a-cel-31","Zaki Alamsyah",31,"Indonésia",18,14,15,14,12,13],
["idn-a-cel-66","Fikriansyah Putra",66,"Indonésia",16,12,13,15,12,12]],
"idn-bmm":[
["idn-a-bmm-10","Made Arya Wibawa",10,"Indonésia",19,14,15,12,14,15],
["idn-a-bmm-25","Komang Aditya",25,"Indonésia",17,13,14,15,11,12],
["idn-a-bmm-47","Kadek Surya",47,"Indonésia",15,11,13,12,12,14]],
"idn-bor":[
["idn-a-bor-03","Daniel Pratama",3,"Indonésia",20,15,14,15,15,14],
["idn-a-bor-19","Yudha Kurnia",19,"Indonésia",18,14,12,15,13,12],
["idn-a-bor-52","Rian Setyawan",52,"Indonésia",16,12,14,12,13,12]],
"idn-mat":[
["idn-a-mat-15","Arya Kusuma",15,"Indonésia",20,15,14,12,15,15],
["idn-a-mat-37","Satria Wicaksono",37,"Indonésia",18,14,15,14,12,12],
["idn-a-mat-69","Daffa Purnama",69,"Indonésia",15,12,13,14,12,13]],
"idn-kra":[
["idn-a-kra-06","Bintang Maulana",6,"Indonésia",19,14,15,15,13,14],
["idn-a-kra-23","Rangga Prasetyo",23,"Indonésia",17,13,13,15,14,12],
["idn-a-kra-88","Aldi Kurnia",88,"Indonésia",15,11,12,13,12,12]]
};
const B: Record<string, Seed[]> = {
"idn-npr":[
["idn-b-npr-04","Raka Adinata",4,"Indonésia",13,10,10,8,9,9],
["idn-b-npr-18","Bayu Prakoso",18,"Indonésia",14,9,8,10,10,9],
["idn-b-npr-42","Deni Kurnia",42,"Indonésia",11,7,8,9,7,8]],
"idn-cak":[
["idn-b-cak-13","Rio Saputra",13,"Indonésia",14,10,10,9,8,9],
["idn-b-cak-29","Agung Setiawan",29,"Indonésia",13,9,8,8,10,10],
["idn-b-cak-61","Fadli Ramadhan",61,"Indonésia",11,7,9,10,7,8]],
"idn-kha":[
["idn-b-kha-02","Nanda Wijaya",2,"Indonésia",14,10,10,9,9,10],
["idn-b-kha-35","Eko Pratama",35,"Indonésia",13,9,8,10,10,9],
["idn-b-kha-73","Jovan Mahendra",73,"Indonésia",10,6,8,8,7,7]],
"idn-bsc":[
["idn-b-bsc-20","Arif Nugroho",20,"Indonésia",14,10,9,10,9,9],
["idn-b-bsc-41","Dwiki Firmansyah",41,"Indonésia",12,9,10,8,7,8],
["idn-b-bsc-86","Ilham Fauzi",86,"Malásia",11,7,8,9,8,7]],
"idn-mah":[
["idn-b-mah-24","Rafi Haryanto",24,"Indonésia",14,10,9,9,9,10],
["idn-b-mah-38","Doni Kurniawan",38,"Indonésia",13,9,8,7,10,10],
["idn-b-mah-57","Fikri Ramadhan",57,"Indonésia",11,7,9,10,7,8]],
"idn-lax":[
["idn-b-lax-27","Gede Pranata",27,"Indonésia",13,10,10,8,9,9],
["idn-b-lax-46","Putu Mahardika",46,"Indonésia",14,9,8,9,10,10],
["idn-b-lax-82","Nyoman Arya",82,"Indonésia",10,6,8,8,7,7]],
"idn-bar":[
["idn-b-bar-30","Surya Adiputra",30,"Indonésia",14,10,9,10,10,9],
["idn-b-bar-53","Wahyu Setiawan",53,"Indonésia",12,9,10,8,8,9],
["idn-b-bar-91","Rizal Maulana",91,"Indonésia",11,7,7,8,8,8]],
"idn-pus":[
["idn-b-pus-16","Gilang Prakoso",16,"Indonésia",13,10,9,10,9,9],
["idn-b-pus-45","Taufik Hidayat",45,"Indonésia",14,9,8,7,10,10],
["idn-b-pus-68","Akmal Wijaya",68,"Indonésia",11,7,9,9,7,8]],
"idn-sat":[
["idn-b-sat-22","Fathan Nugraha",22,"Indonésia",14,10,10,9,8,9],
["idn-b-sat-49","Rendy Saputra",49,"Indonésia",13,9,8,10,10,9],
["idn-b-sat-95","Aldi Pratama",95,"Indonésia",10,6,8,8,7,7]],
"idn-and":[
["idn-b-and-33","Revan Kurnia",33,"Indonésia",14,10,10,10,8,9],
["idn-b-and-62","Irfan Maulana",62,"Indonésia",13,9,8,8,10,10],
["idn-b-and-89","Zidan Prasetyo",89,"Singapura",11,7,9,9,8,8]]
};
const C: Record<string, Seed[]> = {
"idn-tan":[
["idn-c-tan-05","Alif Ramadhan",5,"Indonésia",12,5,5,4,4,5],
["idn-c-tan-12","Farel Saputra",12,"Indonésia",11,4,4,5,4,4],
["idn-c-tan-28","Rasyid Pratama",28,"Indonésia",10,3,4,4,3,4],
["idn-c-tan-47","Hafiz Nugraha",47,"Indonésia",12,4,3,3,5,5],
["idn-c-tan-81","Zayyan Wijaya",81,"Indonésia",10,2,3,3,2,3]],
"idn-srm":[
["idn-c-srm-08","Daffa Setiawan",8,"Indonésia",12,5,5,4,4,5],
["idn-c-srm-17","Rafi Prakoso",17,"Indonésia",11,4,5,5,3,4],
["idn-c-srm-31","Alvaro Kurniawan",31,"Indonésia",12,4,3,4,5,5],
["idn-c-srm-54","Fathan Hidayat",54,"Indonésia",10,3,4,4,3,3],
["idn-c-srm-92","Nabil Firmansyah",92,"Indonésia",10,2,3,3,2,3]],
"idn-tjr":[
["idn-c-tjr-03","Mateus Leki",3,"Timor-Leste",12,5,5,5,4,4],
["idn-c-tjr-14","João Soares",14,"Timor-Leste",11,4,5,4,4,5],
["idn-c-tjr-26","Domingos Guterres",26,"Timor-Leste",10,3,4,4,3,4],
["idn-c-tjr-42","Manuel Amaral",42,"Timor-Leste",12,4,3,3,5,5],
["idn-c-tjr-75","Lucas da Costa",75,"Timor-Leste",10,2,3,3,2,3]],
"idn-amc":[
["idn-c-amc-06","Syahrul Maulana",6,"Indonésia",12,5,4,5,4,4],
["idn-c-amc-21","M. Fadlan Putra",21,"Indonésia",11,4,5,4,3,4],
["idn-c-amc-37","Zulfikar Rahman",37,"Indonésia",12,4,3,4,5,5],
["idn-c-amc-59","Azzam Hidayat",59,"Indonésia",10,3,4,5,3,3],
["idn-c-amc-90","Faris Akbar",90,"Indonésia",10,2,3,3,2,3]],
"idn-jrp":[
["idn-c-jrp-09","Miko Pratama",9,"Indonésia",11,5,5,4,3,4],
["idn-c-jrp-23","Rivan Saputra",23,"Indonésia",12,4,4,5,4,4],
["idn-c-jrp-35","Akbar Nugroho",35,"Indonésia",10,3,4,3,3,4],
["idn-c-jrp-64","Rasyad Firmansyah",64,"Indonésia",12,4,3,3,5,5],
["idn-c-jrp-87","Fikran Wijaya",87,"Indonésia",10,2,3,3,2,3]],
"idn-rmm":[
["idn-c-rmm-04","Alif Maulana",4,"Indonésia",12,5,5,5,4,5],
["idn-c-rmm-18","Reza Pratama",18,"Indonésia",11,4,5,4,3,4],
["idn-c-rmm-32","Fikri Setiawan",32,"Indonésia",10,3,4,3,4,4],
["idn-c-rmm-56","Naufal Hidayat",56,"Indonésia",12,4,3,4,5,5],
["idn-c-rmm-99","Arkan Saputra",99,"Indonésia",10,2,3,2,2,3]]
};
const allSeeds = { ...A, ...B, ...C };
export const indonesianNationalDrivers: Record<string, Driver[]> = Object.fromEntries(
  Object.entries(allSeeds).map(([teamId, rows]) => [teamId, rows.map(([id,name,number,nationality,age,racePace,qualifying,overtaking,defending,consistency]) => ({
    id, name, number, nationality, age,
    attributes: { racePace, qualifying, overtaking, defending, consistency },
  }))])
);
