class Reprezentacija
{
    constructor(naziv,rang){
        this.naziv=naziv;
        this.rang=rang;
    }
    //ovo je za grupu
     brojPoena = 0;       //broj poena koje osvajaju u grupnoj fazi
     brojGolovaDatih = 0;  
     brojGolovaPrimljenih = 0;
     golRazlika = 0;    //dati golovi - primljeni golovi
     brojPobeda = 0;
     brojNeresenih = 0;
     brojPoraza = 0;
     rez = 0;   //za rezultate od eliminacione faze do finala    
}

let reprezentacija =[  new Reprezentacija("Katar",51),
                       new Reprezentacija("Ekvador",46),
                       new Reprezentacija("Senegal",20),
                       new Reprezentacija("Holandija",10),
                       new Reprezentacija("Engleska",5),
                       new Reprezentacija("Iran",21,),
                       new Reprezentacija("SAD",15),
                       new Reprezentacija("Ukrajina",27),
                       new Reprezentacija("Argentina",4),
                       new Reprezentacija("Saudijska Arabija",49),
                       new Reprezentacija("Meksiko",9),
                       new Reprezentacija("Poljska",26),
                       new Reprezentacija("Francuska",3),
                       new Reprezentacija("Peru",22),
                       new Reprezentacija("Danska",11),
                       new Reprezentacija("Tunis",103),
                       new Reprezentacija("Spanija",7),
                       new Reprezentacija("Novi Zeland",101),
                       new Reprezentacija("Nemacka",12),
                       new Reprezentacija("Japan",23),
                       new Reprezentacija("Belgija",2),
                       new Reprezentacija("Kanada",38),
                       new Reprezentacija("Maroko",24),
                       new Reprezentacija("Hrvatska",16),
                       new Reprezentacija("Brazil",1),
                       new Reprezentacija("Srbija",25),
                       new Reprezentacija("Svajcarska",14),
                       new Reprezentacija("Kamerun",37),
                       new Reprezentacija("Portugal",8),
                       new Reprezentacija("Gana",60),
                       new Reprezentacija("Urugvaj",13),
                       new Reprezentacija("Juzna Koreja",29)
]

function pocetak()   //za ispis grupa na samom pocetku
{
    for(i=0;i<32;i+=4)
    {
        document.getElementById("grupa" + i).innerHTML = reprezentacija[i].naziv + "," 
        + reprezentacija[i+1].naziv + "," + reprezentacija[i+2].naziv + "," + reprezentacija[i+3].naziv;
    }
}
//////////////////////////////////GRUPA///////////////////////////////
function runda(a,b)   //fja za grupu,pobednike grupe,odredjuje poene i golove na utakmici
{
    rez1 = Math.floor(Math.random()*5);
    rez2 = Math.floor(Math.random()*5);
    reprezentacija[a].brojGolovaDatih+=rez1;
    reprezentacija[a].brojGolovaPrimljenih+=rez2;
    reprezentacija[b].brojGolovaDatih+=rez2;
    reprezentacija[b].brojGolovaPrimljenih+=rez1;
    if(rez1 > rez2)
    {
        reprezentacija[a].brojPoena+=3;
        reprezentacija[a].brojPobeda++;
        reprezentacija[b].brojPoena+=0;
        reprezentacija[b].brojPoraza++;
    }
    else if(rez1 == rez2)
    {
        reprezentacija[a].brojPoena+=1;
        reprezentacija[a].brojNeresenih++;
        reprezentacija[b].brojPoena+=1;
        reprezentacija[b].brojNeresenih++;
    }
    else{
        reprezentacija[a].brojPoena+=0;
        reprezentacija[a].brojPoraza++;
        reprezentacija[b].brojPoena+=3;
        reprezentacija[b].brojPobeda++;
    }
    return rez1 +" : "+ rez2;
}

function rundaJedan()  //I kolo grupe: 0 i 1,2 i 3...    
{
    document.getElementById("prvo0").innerHTML = reprezentacija[0].naziv + " " + runda(0,1) + " " + reprezentacija[1].naziv;
    for(i=2;i<32;i+=2) 
    {
        document.getElementById("prvo" + i).innerHTML = reprezentacija[i].naziv + " " + runda(i,i+1) + " " + reprezentacija[i+1].naziv;
    }
}

function rundaDva()  // II kolo grupe: 0 i 2,1 i 3
{
    i= 0;
    j= 1;
    while(i<32 && j<32)
    {
        document.getElementById("drugo"+ i).innerHTML = reprezentacija[i].naziv + " " + runda(i,i+2) + " " + reprezentacija[i+2].naziv;
        document.getElementById("drugo"+ j).innerHTML = reprezentacija[j].naziv + " " + runda(j,j+2) + " " + reprezentacija[j+2].naziv;
        i+=4;
        j+=4;
    }
}

function rundaTri()  // III kolo grupe:0 i 3,1 i 2...
{
    i= 0;
    j= 1;
    while(i<32 && j<32)
    {
        document.getElementById("trece"+ i).innerHTML = reprezentacija[i].naziv + " " + runda(i,i+3) + " " + reprezentacija[i+3].naziv;
        document.getElementById("trece"+ j).innerHTML = reprezentacija[j].naziv + " " + runda(j,j+1) + " " + reprezentacija[j+1].naziv;
        i+=4;
        j+=4;
    }
}
 
function tabeleGrupne()  //ispis tabela posle odigrane grupe od 3 meca
{
    for(i=0;i<32;i++)
    {
        reprezentacija[i].golRazlika = reprezentacija[i].brojGolovaDatih - reprezentacija[i].brojGolovaPrimljenih;

        document.getElementById("jok" + i).innerHTML =  reprezentacija[i].naziv + " (" + reprezentacija[i].rang + "): " + 
         reprezentacija[i].brojPobeda + "  " + reprezentacija[i].brojNeresenih + " " + reprezentacija[i].brojPoraza + " " + reprezentacija[i].brojGolovaDatih + ":" + 
         reprezentacija[i].brojGolovaPrimljenih + "  "+ reprezentacija[i].brojPoena;
    } 
}

let proslaReprezentacija = [];    //reprezentacije koje su prosle grupu 
let osmina = [];
let cetvrtina = [];
let polovina = [];

//odredjuje first i second max iz grupe,tj najbolju i drugu po redu reprezentaciju
function veci(start)
{
    start1 = start + 1;  //prvi sledeci element u reprezentaciji
    start2 = start + 2;  // ovo nam treba kod petlje jer krecemo od treceg a prva dva su u max i secondmax;
    start3 = start + 4;  // treba nam za kraj petlje jer je 4 reprezentacije u grupi
    //postavljanje max i secondmax na pocetne vrednosti
    max = reprezentacija[start];
    secondMax = reprezentacija[start1];
    if(max.brojPoena < secondMax.brojPoena)
    {
        pom = max;
        max = secondMax;
        secondMax = pom;
    }
    for(i=start2;i<start3;i++)
    {
        if(max.brojPoena < reprezentacija[i].brojPoena) 
        { 
            secondMax = max;
            max = reprezentacija[i];
        }
        else if(max.brojPoena == reprezentacija[i].brojPoena && max.golRazlika < reprezentacija[i].golRazlika)
        {
            secondMax = max;
            max = reprezentacija[i];
        }
        else if(max.brojPoena == reprezentacija[i].brojPoena && max.golRazlika == reprezentacija[i].golRazlika &&
                max.brojGolovaDatih < reprezentacija[i].brojGolovaDatih)
        {
            secondMax = max;
            max = reprezentacija[i];
        }
        else if(secondMax.brojPoena < reprezentacija[i].brojPoena && reprezentacija[i].brojPoena!= max.brojPoena)
        {
            secondMax = reprezentacija[i];
        }
        else if(secondMax.brojPoena == reprezentacija[i].brojPoena && secondMax.golRazlika < reprezentacija[i].golRazlika
             && reprezentacija[i].brojPoena!= max.brojPoena)
        {
            secondMax = reprezentacija[i];
        }
        else if(secondMax.brojPoena == reprezentacija[i].brojPoena && secondMax.golRazlika == reprezentacija[i].golRazlika
            && reprezentacija[i].brojPoena!= max.brojPoena
            && secondMax.brojGolovaDatih < reprezentacija[i].brojGolovaPrimljenih)
        {
            secondMax = reprezentacija[i];
        }
    }
    
    proslaReprezentacija.push(max);   //prvo smestamo pobednika
    proslaReprezentacija.push(secondMax);  //pa zatim drugoplasirano
    // i tako u krug za sve grupe
}

function reprezentacijeKojeProlazeGrupu()
{
    //preko ovog izvlacimo 2 najbolja u svakoj grupi
    for(z=0;z<32;z+=4) //petlja koja pocinje od prvog clana svake grupe,a ima ih 4 po grupi,zato 0,4,8...
    {
        veci(z);
    }
    //nakon sto izvucemo 2 clana iz svake grupe,ostaju nam 16 reprezentacija koje su prosle dalje
    //i njih ispisujemo,a +2 jer su iz grupe 2 reprezentacije
    for(i=0;i<16;i+=2) 
    {
        document.getElementById("prodjiGrupu" + i).innerHTML = "(1)"+  proslaReprezentacija[i].naziv +  " (2)" + proslaReprezentacija[i + 1].naziv;
    }
}
///////////////////////////////////ELIMINACIJE////////////////////////////////
function pobedaUEliminacijama(a,b)   //fja za pobedu u eliminacijonom takmicenju
{
    rez1 = Math.floor(Math.random()*5);
    rez2 = Math.floor(Math.random()*5);
    if(rez1 != rez2)  //u ovoj fazi nema neresenog rezultata
    {
        proslaReprezentacija[a].rez = rez1;
        proslaReprezentacija[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
    else{
        //rez2 = Math.floor(Math.random()*5);
        rez2++; //cisto da ne bi bilo nereseno,a posto radim sa random ovde sam dodao 1 za rez2 moglo je i za res1 nije bitno
        proslaReprezentacija[a].rez = rez1;
        proslaReprezentacija[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
}
function eliminacionaFaza()  //0 i 3,1 i 2...
{
    i= 0;
    j= 1;
    while(i<16 && j<16)
    {
        document.getElementById("prvaEliminacija"+ i).innerHTML = "(1)" + proslaReprezentacija[i].naziv + " " + pobedaUEliminacijama(i,i+3) + " " + proslaReprezentacija[i+3].naziv + "(2)";
        document.getElementById("prvaEliminacija"+ j).innerHTML = "(2)" + proslaReprezentacija[j].naziv + " " + pobedaUEliminacijama(j,j+1) + " " + proslaReprezentacija[j+1].naziv + "(1)";
        i+=4;
        j+=4;
    }
}
function prosliUCetvrtinu(k)
{
    z = k+2;
    j = k+3;   //jer nam treba uporedjivanje 0 i 3,1 i 2
    for(i=k;i<z;i++)    //0;2;++
    {
       if(proslaReprezentacija[i].rez > proslaReprezentacija[j].rez)
       {
           osmina.push(proslaReprezentacija[i]);
       }
       else{
           osmina.push(proslaReprezentacija[j]);
       }
       j--;   //jer nam treba uporedjivanje 1 i 2,5 i 6
    }
}
function stampajProlaznikeCetvrtine()
{
    for(p=0;p<16;p = p+4)
    {
        prosliUCetvrtinu(p);
    }
    for(z=0;z<8;z++)
    {
        document.getElementById("osmina" + z).innerHTML = osmina[z].naziv;
    }
}
///////////////////////////////////CETVRTFINALE///////////////////////////////
function pobedaUCetvrtfinalu(a,b)   //fja za pobedu u cetvrtfinalu
{
    rez1 = Math.floor(Math.random()*5);
    rez2 = Math.floor(Math.random()*5);
    if(rez1 != rez2)  //u ovoj fazi nema neresenog rezultata
    {
        osmina[a].rez = rez1;
        osmina[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
    else{
        //rez2 = Math.floor(Math.random()*5);
        rez2++; //cisto da ne bi bilo nereseno,a posto radim sa random ovde sam dodao 1 za rez2 moglo je i za res1 nije bitno
        osmina[a].rez = rez1;
        osmina[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
}
//odigrane utakmice cetvrtinefinala 
function cetvrtFinale()
 {
     for(i=0;i<8;i+=2)
     {
        j=i+1;
        document.getElementById("cetvrtfinale"+ i).innerHTML = osmina[i].naziv + " " + pobedaUCetvrtfinalu(i,j) + " " + osmina[j].naziv;
     }
 }
function prosliUpolufinalu()
 {
     for(i=0;i<8;i+=2)
     {
         if(osmina[i].rez > osmina[i+1].rez)
         {
            cetvrtina.push(osmina[i]);
         }
         else  //posto smo namestili samo pobede nema neresenih
         {
            cetvrtina.push(osmina[i+1]);
         }
     }

     for(i=0;i<4;i++)
     {
        document.getElementById("polufinale"+ i).innerHTML = cetvrtina[i].naziv;
     }
 }
///////////////////////////////////POLUFINALE/////////////////////////////////
 function pobedaUPolufinalu(a,b)   //fja za pobedu u polufinalu
{
    rez1 = Math.floor(Math.random()*5);
    rez2 = Math.floor(Math.random()*5);
    if(rez1 != rez2)  //u ovoj fazi nema neresenog rezultata
    {
        cetvrtina[a].rez = rez1;
        cetvrtina[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
    else{
        //rez2 = Math.floor(Math.random()*5);
        rez2++; //cisto da ne bi bilo nereseno,a posto radim sa random ovde sam dodao 1 za rez2 moglo je i za res1 nije bitno
        cetvrtina[a].rez = rez1;
        cetvrtina[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
}
//odigrane utakmice polufinala 
function poluFinale()
 {
     for(i=0;i<4;i+=2)
     {
        j=i+1;
        document.getElementById("finale"+ i).innerHTML = cetvrtina[i].naziv + " " + pobedaUPolufinalu(i,j) + " " + cetvrtina[j].naziv;
     }
 }

 function prosliUfinale()
 {
     for(i=0;i<4;i+=2)
     {
         if(cetvrtina[i].rez > cetvrtina[i+1].rez)
         {
            polovina.push(cetvrtina[i]);
         }
         else  //posto smo namestili samo pobede nema neresenih
         {
            polovina.push(cetvrtina[i+1]);
         }
     }

     for(i=0;i<2;i++)
     {
        document.getElementById("predkraj"+ i).innerHTML = polovina[i].naziv;
     }
 }
/////////////////////////////////////FINALE////////////////////////////////
function pobedaUFinalu(a,b)   //fja za pobedu u finalu
{
    rez1 = Math.floor(Math.random()*5);
    rez2 = Math.floor(Math.random()*5);
    if(rez1 != rez2)  //u ovoj fazi nema neresenog rezultata
    {
        polovina[a].rez = rez1;
        polovina[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
    else{
        rez2++; //cisto da ne bi bilo nereseno,a posto radim sa random ovde sam dodao 1 za rez2 moglo je i za res1 nije bitno
        polovina[a].rez = rez1;
        polovina[b].rez = rez2;
        return rez1 + " : " + rez2;
    }
}
function kraj()
{
    document.getElementById("kraj").innerHTML = polovina[0].naziv + " " + pobedaUFinalu(0,1) + " " + polovina[1].naziv;
    if(polovina[0].rez > polovina[1].rez)
    {
        document.getElementById("pobednik").innerHTML = polovina[0].naziv;
    }
    else{
        document.getElementById("pobednik").innerHTML = polovina[1].naziv;
    }
}

const main = () => {
    pocetak();
    rundaJedan();   //stampaj za rundu1;
    rundaDva();   //stampaj za rundu2;
    rundaTri();   //stampaj za rundu3
    tabeleGrupne(); //za ispis tabela
    reprezentacijeKojeProlazeGrupu();
    eliminacionaFaza();
    stampajProlaznikeCetvrtine();
    cetvrtFinale();
    prosliUpolufinalu();
    poluFinale();
    prosliUfinale();
    kraj()
};
main();