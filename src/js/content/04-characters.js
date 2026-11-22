
/* ================= KIKIRIKÍ ART: flat hand-drawn characters (original) ================= */
const PK="#2B2A30";
const _lace=(c)=>`<path d="${[[40,56],[50,52],[60,56],[36,64],[46,62],[56,62],[66,62],[42,71],[52,72],[62,70],[54,44],[64,47],[74,50],[81,42]].map(([x,y])=>`M${x-4} ${y}q4 4.5 8 0`).join("")}" fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round" opacity=".85"/>`;
const _bars=(c,w)=>`<path d="M40 54Q52 50 66 54M34 62Q52 57 74 62M36 70Q52 66 70 70M50 46Q62 42 76 47M78 40Q84 37 90 39" fill="none" stroke="${c}" stroke-width="${w||2}" stroke-linecap="round" opacity=".7"/>`;
const _dots=(c,r,tip)=>`<g>${[[40,56],[52,52],[64,56],[46,64],[58,63],[70,62],[40,70],[52,72],[64,70],[58,44],[72,48],[84,36],[34,46]].map(([x,y])=>(tip?`<circle cx="${x}" cy="${y+1.2}" r="${r+0.9}" fill="${tip}"/>`:"")+`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join("")}</g>`;
const _spang=(c)=>`<g fill="${c}">${[[43,60],[55,66],[67,60],[49,72],[63,73],[61,50],[73,52],[86,38],[38,48],[50,47]].map(([x,y])=>`<path d="M${x-3.2} ${y-1.4}C${x-2.4} ${y+2.4} ${x+2.4} ${y+2.4} ${x+3.2} ${y-1.4}C${x+1.6} ${y} ${x-1.6} ${y} ${x-3.2} ${y-1.4}Z"/>`).join("")}</g>`;
const PAT={
 buff:{b:"#F2B33D",n:{en:"Buff",es:"Dorada"}},
 red:{b:"#E46A4B",n:{en:"Red",es:"Roja"}},
 white:{b:"#F4EFE6",n:{en:"White",es:"Blanca"}},
 black:{b:"#34363F",dark:1,n:{en:"Black",es:"Negra"}},
 blue:{b:"#86A8CF",n:{en:"Blue",es:"Azul"}},
 lavender:{b:"#C9C1D6",n:{en:"Lavender",es:"Lavanda"}},
 chocolate:{b:"#7A5038",dark:1,n:{en:"Chocolate",es:"Chocolate"}},
 splash:{b:"#EEF1F4",ov:()=>_dots("#8FA3BC",2.8),n:{en:"Splash",es:"Salpicada"}},
 barred:{b:"#A9ADB4",ov:()=>_bars("#5E6168"),n:{en:"Barred",es:"Barrada"}},
 cuckoo:{b:"#C4C1BC",ov:()=>_bars("#77736E",3.2),n:{en:"Cuckoo",es:"Cucú"}},
 crele:{b:"#C7BFB4",ov:()=>_bars("#8A817A",2.6),hk:"#E9A93A",n:{en:"Crele",es:"Crele"}},
 silverlaced:{b:"#F4EFE6",ov:()=>_lace(PK),t:PK,n:{en:"Silver laced",es:"Plata ribeteada"}},
 goldlaced:{b:"#E9A93A",ov:()=>_lace(PK),t:PK,n:{en:"Gold laced",es:"Oro ribeteada"}},
 bluelaced:{b:"#9DB4CF",ov:()=>_lace("#3D4A5C"),t:"#3D4A5C",n:{en:"Blue laced",es:"Azul ribeteada"}},
 partridge:{b:"#A8643A",ov:()=>_lace("#4A2A18"),hk:"#E2A43A",t:PK,n:{en:"Partridge",es:"Perdiz"}},
 columbian:{b:"#F4EFE6",hk:PK,t:PK,n:{en:"Columbian",es:"Colombiana"}},
 buffcol:{b:"#F2B33D",hk:PK,t:PK,n:{en:"Buff Columbian",es:"Dorada colombiana"}},
 blackcopper:{b:"#34363F",hk:"#C9702E",dark:1,n:{en:"Black copper",es:"Negra cobriza"}},
 birchen:{b:"#34363F",hk:"#E6E2D8",dark:1,n:{en:"Birchen",es:"Abedul"}},
 wheaten:{b:"#EBCF98",hk:"#C98A3E",t:"#8A5A2A",n:{en:"Wheaten",es:"Trigueña"}},
 salmon:{b:"#E5B08C",br:"#F6E7D6",hk:"#F6E7D6",n:{en:"Salmon",es:"Salmón"}},
 spangled:{b:"#F4EFE6",ov:()=>_spang(PK),crest:"#F4EFE6",n:{en:"Silver spangled",es:"Plata moteada"}},
 goldspangled:{b:"#E9A93A",ov:()=>_spang(PK),n:{en:"Gold spangled",es:"Oro moteada"}},
 millefleur:{b:"#C8692E",ov:()=>_dots("#FFF6E8",1.9,PK),n:{en:"Mille fleur",es:"Mil flores"}},
 mottled:{b:"#34363F",ov:()=>_dots("#F4EFE6",2),dark:1,n:{en:"Mottled",es:"Jaspeada"}},
 speckled:{b:"#8E3B1E",ov:()=>_dots("#FFF6E8",1.8,PK),dark:1,n:{en:"Speckled",es:"Moteada"}}
};
const HFILL=Object.fromEntries(Object.entries(PAT).map(([k,v])=>[k,v.b]));
const INK="#1C1B1F";
