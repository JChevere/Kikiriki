
/* ================= RANKS & SPRITES ================= */
const RANKS=[
{xp:0,n:{en:"Chick Keeper",es:"Cuidador Pollito"}},
{xp:60,n:{en:"Pullet Pal",es:"Amigo de Pollas"}},
{xp:160,n:{en:"Hen Hero",es:"Héroe Gallinero"}},
{xp:320,n:{en:"Flock Master",es:"Maestro de Parvada"}},
{xp:600,n:{en:"Coop Legend",es:"Leyenda del Corral"}}];
const rankIdx=x=>{let i=0;RANKS.forEach((r,j)=>{if(x>=r.xp)i=j});return i;};
const HEN=["....rr......","...rrr......","..wwww......",".wwkww......","owwwww...ww.",".rwwwww.www.","..wwwwwwwww.","..wbbbbwwww.","..wwbbbwww..","...wwwwww...","....o..o....","...oo.oo...."];
const CHICK=[".yyy...","oykyy..",".yyyyy.",".yyyyyy","..yyyy.","..o.o.."];
const PAT_N=k=>({get en(){return PAT[k].n.en},get es(){return PAT[k].n.es}});
const COLORS={white:{b:"#FBFAF5",w:"#D9D3C2",n:{en:"White",es:"Blanca"}},buff:{b:"#E8B562",w:"#C48A36",n:{en:"Buff",es:"Dorada"}},red:{b:"#A3441F",w:"#6E2810",n:{en:"Red",es:"Roja"}},black:{b:"#2F3240",w:"#56607E",n:{en:"Black",es:"Negra"}},barred:{b:"#9A9DA3",w:"#55585E",n:{en:"Barred / gray",es:"Barrada / gris"}},blue:{b:"#7F93A8",w:"#566A80",n:{en:"Blue",es:"Azul"}},spangled:{b:"#F4EFE6",w:"#2B2A30",n:{en:"Spangled",es:"Moteada"}},lavender:{b:"#C9C1D6",w:"#C9C1D6",n:PAT_N("lavender")},chocolate:{b:"#7A5038",w:"#7A5038",n:PAT_N("chocolate")},splash:{b:"#EEF1F4",w:"#EEF1F4",n:PAT_N("splash")},cuckoo:{b:"#C4C1BC",w:"#C4C1BC",n:PAT_N("cuckoo")},crele:{b:"#C7BFB4",w:"#C7BFB4",n:PAT_N("crele")},silverlaced:{b:"#F4EFE6",w:"#F4EFE6",n:PAT_N("silverlaced")},goldlaced:{b:"#E9A93A",w:"#E9A93A",n:PAT_N("goldlaced")},bluelaced:{b:"#9DB4CF",w:"#9DB4CF",n:PAT_N("bluelaced")},partridge:{b:"#A8643A",w:"#A8643A",n:PAT_N("partridge")},columbian:{b:"#F4EFE6",w:"#F4EFE6",n:PAT_N("columbian")},buffcol:{b:"#F2B33D",w:"#F2B33D",n:PAT_N("buffcol")},blackcopper:{b:"#34363F",w:"#34363F",n:PAT_N("blackcopper")},birchen:{b:"#34363F",w:"#34363F",n:PAT_N("birchen")},wheaten:{b:"#EBCF98",w:"#EBCF98",n:PAT_N("wheaten")},salmon:{b:"#E5B08C",w:"#E5B08C",n:PAT_N("salmon")},goldspangled:{b:"#E9A93A",w:"#E9A93A",n:PAT_N("goldspangled")},millefleur:{b:"#C8692E",w:"#C8692E",n:PAT_N("millefleur")},mottled:{b:"#34363F",w:"#34363F",n:PAT_N("mottled")},speckled:{b:"#8E3B1E",w:"#8E3B1E",n:PAT_N("speckled")}};