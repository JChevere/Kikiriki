
/* ===== patterns adapt to the chosen base color ===== */
function _hx(h){h=h.replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");return[0,2,4].map(i=>parseInt(h.substr(i,2),16));}
function _mx(a,b,t){const A=_hx(a),B=_hx(b);return"#"+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,"0")).join("");}
function _lum(h){const[r,g,b]=_hx(h);return(.299*r+.587*g+.114*b)/255;}
const PATGEN={splash:1,barred:1,cuckoo:1,crele:1,silverlaced:1,goldlaced:1,bluelaced:1,partridge:1,columbian:1,buffcol:1,blackcopper:1,birchen:1,wheaten:1,salmon:1,spangled:1,goldspangled:1,millefleur:1,mottled:1,speckled:1};
function adaptKey(baseKey,pat){const key="~"+baseKey+"|"+pat;if(PAT[key])return key;const B=PAT[baseKey]||PAT.buff;const b=B.b;const dark=_lum(b)<.42;
 const dk=_mx(b,"#1E1A16",dark?.45:.62),lt=_mx(b,"#FFF8EC",dark?.72:.82),m=dark?lt:dk;const o={b,n:{get en(){return L_n(B,"en")+" "+PAT[pat].n.en.toLowerCase()},get es(){return PAT[pat].n.es+" "+L_n(B,"es").toLowerCase()}}};if(dark)o.dark=1;
 switch(pat){case"splash":o.ov=()=>_dots(m,2.8);break;case"barred":o.ov=()=>_bars(m);break;case"cuckoo":o.ov=()=>_bars(m,3.2);break;case"crele":o.ov=()=>_bars(m,2.6);o.hk=_mx(b,"#E9A93A",.6);break;
 case"silverlaced":case"goldlaced":case"bluelaced":o.ov=()=>_lace(m);o.t=m;break;case"partridge":o.ov=()=>_lace(dk);o.hk=_mx(b,"#E9C27A",.45);o.t=dk;break;
 case"columbian":case"buffcol":o.hk=m;o.t=m;break;case"blackcopper":o.hk=_mx(b,"#C9702E",.7);break;case"birchen":o.hk=lt;break;
 case"wheaten":o.hk=_mx(b,"#1E1A16",.22);o.t=dk;break;case"salmon":o.br=lt;o.hk=lt;break;
 case"spangled":case"goldspangled":o.ov=()=>_spang(m);o.crest=b;break;case"millefleur":o.ov=()=>_dots(lt,1.9,dk);break;case"mottled":o.ov=()=>_dots(lt,2);break;case"speckled":o.ov=()=>_dots(lt,1.8,dk);break;}
 PAT[key]=o;HFILL[key]=b;return key;}
function L_n(B,lang){return(B.n&&B.n[lang])||"";}
function nearestSolid(k){const b=(PAT[k]||PAT.buff).b;let best="buff",bd=1e9;Object.keys(PAT).filter(x=>x[0]!=="~"&&isSolid(x)).forEach(x=>{const A=_hx(PAT[x].b),C=_hx(b);const d=A.reduce((a,v,i)=>a+(v-C[i])**2,0);if(d<bd){bd=d;best=x;}});return best;}
function drawHen(c,o){o=o||{};const sz=o.size||44,mood=o.mood||"neutral",lk=o.look||{};if(lk.pat&&PATGEN[lk.pat]&&c&&c[0]!=="~")c=adaptKey(PAT[c]?c:"buff",lk.pat);let kind=o.kind||"hen";if(kind==="auto")kind="hen";
 const P_=PAT[c]||PAT.buff;const isCh=kind==="chick";
 const fill=isCh?(CDOWN[lk.down]||CDOWN.yellow)[0]:(HFILL[c]||HFILL.buff);
 const face=(isCh?(lk.down==="black"||lk.down==="brown"):P_.dark)?"#F4EFE6":INK;
 const legs=lk.legs&&lk.legs!=="ink"?LEGC[lk.legs]:null;
 const legPath=(d,w)=>legs?`<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w+1.8}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${legs}" stroke-width="${w}" stroke-linecap="round"/>`:`<path d="${d}" fill="none" style="stroke:var(--hleg,${INK})" stroke-width="${w}" stroke-linecap="round"/>`;
 const eye=(x,y)=>{switch(mood){case"happy":return`<path d="M${x-3} ${y+1} Q${x} ${y-3} ${x+3} ${y+1}" fill="none" stroke="${face}" stroke-width="2" stroke-linecap="round"/>`;
  case"calm":case"sleep":return`<path d="M${x-3} ${y-1} Q${x} ${y+2.5} ${x+3} ${y-1}" fill="none" stroke="${face}" stroke-width="2" stroke-linecap="round"/>`;
  case"sad":return`<circle cx="${x}" cy="${y+1}" r="2" fill="${face}"/><path d="M${x-4} ${y-5} L${x+3} ${y-3}" stroke="${face}" stroke-width="1.8" stroke-linecap="round"/>`;
  case"sick":return`<path d="M${x-2.5} ${y-2.5} L${x+2.5} ${y+2.5} M${x+2.5} ${y-2.5} L${x-2.5} ${y+2.5}" stroke="${face}" stroke-width="1.8" stroke-linecap="round"/>`;
  case"excited":return`<circle cx="${x}" cy="${y}" r="3" fill="${face}"/><circle cx="${x+1}" cy="${y-1}" r="1" fill="#fff"/>`;
  default:return`<circle cx="${x}" cy="${y}" r="2.3" fill="${face}"/>`;}};
 const blush=(x,y)=>(mood==="happy"||mood==="excited")?`<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.2" fill="#F49AA6" opacity=".8"/>`:"";
 const fluff=(pts,r,col)=>`<g opacity=".28">${pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${r+1.1}" fill="${INK}"/>`).join("")}</g>`+pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/>`).join("");
 let s="";
 if(isCh){
  s+=legPath("M42 82 L40 93 M40 93 L35 94 M40 93 L44 95 M58 82 L60 93 M60 93 L55 94 M60 93 L65 95",2.2);
  if(lk.feet==="feathered")s+=`<path d="M38 84 C33 88 33 93 37 95 L43 92Z M55 84 C51 88 51 93 55 95 L61 92Z" fill="${fill}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/>`;
  if(lk.feather==="silkie"||lk.feather==="frizzle")s+=fluff([[30,46],[36,36],[46,30],[58,31],[68,37],[75,47],[78,58],[75,70],[66,79],[54,83],[42,82],[33,75],[28,64]],lk.feather==="silkie"?6:4.2,fill);
  s+=`<path d="M28 56 C26 38 40 28 54 29 C70 30 80 44 78 60 C76 76 64 84 50 84 C36 84 29 72 28 56Z" fill="${fill}"/>`;
  const mk=lk.mark;
  if(mk==="chipmunk")s+=`<path d="M42 33 C54 28 67 35 74 47M45 40 C55 35 64 41 70 51" fill="none" stroke="#6B4226" stroke-width="3.4" stroke-linecap="round" opacity=".8"/><path d="M41 44 L50 43" stroke="#6B4226" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  if(mk==="headspot")s+=`<ellipse cx="53" cy="35" rx="6.5" ry="4.2" fill="#FBF3D0"/>`;
  if(mk==="belly")s+=`<path d="M31 63 C35 80 56 87 71 74 C60 77 44 75 31 63Z" fill="#FBF3D0" opacity=".95"/>`;
  if(mk==="speckle")s+=`<g fill="${face===INK?"#6B4226":"#F4EFE6"}" opacity=".75">${[[48,40],[58,38],[66,46],[54,52],[64,58],[46,62],[58,68],[70,64],[40,72]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6"/>`).join("")}</g>`;
  if(mk==="muffs"||lk.beard==="beard")s+=fluff([[30,57],[34,62],[39,60]],4,mk==="muffs"?"#FBF3D0":fill);
  if(lk.crest==="tuft"||lk.crest==="pompom")s+=lk.crest==="pompom"?fluff([[44,27],[51,24],[58,28],[48,31],[55,31]],5,fill)+`<path d="M41 25 C44 18 58 18 61 26" fill="none" stroke="${INK}" stroke-width="1" opacity=".35"/>`:`<path d="M44 30 C42 21 50 19 50 26 C52 19 59 23 55 30Z" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  else s+=`<path d="M48 26 C47 21 51 19 52 23 C53 19 57 21 55 27" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>`;
  s+=`<path d="M29 49 L19 52 L29 56Z" fill="#F08A24" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  s+=eye(38,45)+blush(44,54);
  s+=mood==="excited"?`<path d="M56 56 C62 46 72 44 76 48" fill="none" stroke="${face}" stroke-width="2" stroke-linecap="round"/>`:`<path d="M52 60 C58 54 68 56 70 62 C66 68 58 68 54 64" fill="none" stroke="${face}" stroke-width="2" stroke-linecap="round"/>`;
  s+=accSVG(lk.acc,"chick");
 }else{
  const roo=kind==="rooster",pul=kind==="pullet";
  s+=legPath(roo?"M45 76 L43 93 M43 93 L37 94 M43 93 L48 96 M58 76 L60 93 M60 93 L54 94 M60 93 L66 95 M44 84 L40 86":"M45 76 L43 92 M43 92 L37 93 M43 92 L48 95 M58 76 L60 92 M60 92 L54 93 M60 92 L66 94",roo?2.8:2.4);
  if(lk.feet==="feathered")s+=`<path d="M41 80 C35 85 33 92 37 95 L46 92Z M56 80 C51 85 51 92 55 95 L63 92Z" fill="${P_.t&&P_.hk?fill:fill}" stroke="${INK}" stroke-width=".8" stroke-linejoin="round"/><path d="M37 95l-3 1.6M55 95l-3 1.6" stroke="${INK}" stroke-width=".8"/>`;
  const tail=lk.tail||(roo?"sickle":"normal"),tc=P_.t||fill;
  if(tail==="normal")s+=`<path d="M74 40 C80 26 92 22 95 30 C96 36 90 44 82 50Z" fill="${tc}"/><path d="M80 34 C84 30 89 29 90 32" fill="none" stroke="${face}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>`;
  else if(tail==="short")s+=`<path d="M75 42 C79 34 87 32 89 37 C90 41 86 46 80 50Z" fill="${tc}"/>`;
  else if(tail==="sickle"){const sc=P_.t||(P_.dark?"#1E2A3A":roo&&!P_.t?"#24262E":tc);s+=`<path d="M73 44 C76 22 96 10 101 26 C96 21 86 25 81 46Z" fill="${sc}"/><path d="M76 48 C86 30 101 32 99 47 C95 41 87 42 81 52Z" fill="${sc}"/><path d="M78 30 C84 22 93 19 97 22" fill="none" stroke="#5DA0A8" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`;}
  if(lk.feather==="silkie"||lk.feather==="frizzle"){const pts=[[28,30],[36,21],[46,18],[56,20],[64,27],[72,36],[80,42],[85,51],[85,61],[80,70],[72,77],[61,81],[49,81],[37,79],[29,72],[24,63],[24,52],[26,42]];s+=fluff(pts,lk.feather==="silkie"?7:4.6,fill);}
  s+=`<path d="M28 40 C27 24 40 16 52 18 C60 19 66 26 70 34 C78 38 86 46 84 58 C82 72 68 80 52 80 C36 80 24 70 25 56 C25 50 27 45 28 40Z" fill="${fill}"/>`;
  if(P_.br)s+=`<path d="M27 50 C26 62 32 74 44 78 C40 70 40 58 44 50Z" fill="${P_.br}"/>`;
  if(P_.ov)s+=P_.ov();
  if(P_.wg)s+=`<path d="M48 54 C54 46 68 47 71 56 C67 63 56 64 50 59Z" fill="${P_.wg}"/>`;
  if(P_.hk||roo)s+=`<path d="M27.5 43 C36 47 50 46 64 38 L66 43 L62 49 L59 45.5 L56 53 L52.5 47.5 L49 55 L45.5 48.5 L42 55.5 L38.5 48.5 L35 54.5 L32 48 L29 52 C27.6 49 27.2 46 27.5 43Z" fill="${P_.hk||(P_.dark?"#C9702E":P_.b==="#F4EFE6"?"#F4EFE6":"#E9A93A")}" ${!P_.hk?'opacity=".9"':""}/><path d="M38.5 48.5v-3M45.5 48.5v-3M52.5 47.5v-3M59 45.5v-3" stroke="${P_.b}" stroke-width="1.2" stroke-linecap="round" opacity=".55"/>`;
  if(lk.feather==="frizzle")s+=`<path d="M40 60q-3-5 1-8M52 64q-3-5 1-8M64 60q-3-5 1-8M46 72q-3-5 1-8M60 72q-3-5 1-8M74 52q-3-5 1-8" fill="none" stroke="${face}" stroke-width="1.5" stroke-linecap="round" opacity=".45"/>`;
  const hatOn=lk.acc==="hat"||lk.acc==="crown",pom=lk.crest==="pompom"||lk.feather==="silkie";
  const cb=lk.comb||"single";const CR="#E0473A";
  let comb="";
  if(!hatOn&&!(lk.crest==="pompom")){
   if(cb==="single")comb=roo?`<path d="M27 25 C23 14 31 9 34 17 C34 6 44 5 44 15 C47 5 57 8 53 18 C58 17 59 23 52 24 C44 25 33 27 27 25Z" fill="${CR}"/>`:pul?`<path d="M33 22 C32 17 37 16 38 20 C39 16 44 17 42 22Z" fill="${CR}"/>`:`<path d="M30 24 C27 16 34 13 36 19 C36 11 44 10 44 17 C47 11 54 14 50 22 C46 22 36 25 30 24Z" fill="${CR}"/>`;
   else if(cb==="rose")comb=`<path d="M30 23 C29 17 36 15 40 18 C44 15 49 16 50 20 L58 17 L53 23 C46 25 36 25 30 23Z" fill="${CR}"/><g fill="#B8352A" opacity=".5"><circle cx="35" cy="20" r="1"/><circle cx="40" cy="21" r="1"/><circle cx="45" cy="20" r="1"/></g>`;
   else if(cb==="pea")comb=`<path d="M33 22 C33 16 37 15 39 19 C40 14 44 14 45 19 C46 15 50 16 49 21 C47 24 36 25 33 22Z" fill="${CR}"/>`;
   else if(cb==="walnut")comb=`<ellipse cx="40" cy="20" rx="7.5" ry="5" fill="${CR}"/><path d="M35 19q2-2 4 0M41 19q2-2 4 0M38 22q2-1.5 4 0" fill="none" stroke="#B8352A" stroke-width="1" opacity=".6"/>`;
   else if(cb==="v")comb=(lk.crest==="tuft"||P_.crest)?`<path d="M28.6 27 L26.4 20 L32 24 L36 19.6 L37 27Z" fill="${CR}" stroke="#B8352A" stroke-width=".6"/>`:`<path d="M34 23 L31 12 L39.5 19.5 L47 12 L45 23Z" fill="${CR}"/>`;
   else if(cb==="strawberry")comb=`<path d="M33 22 C32 15 46 14 47 21 C44 24 36 25 33 22Z" fill="${CR}"/><g fill="#F7C3BC"><circle cx="37" cy="19" r=".8"/><circle cx="41" cy="18" r=".8"/><circle cx="44" cy="20" r=".8"/></g>`;
   else if(cb==="buttercup")comb=`<path d="M30 23 L31 15 L34 19 L36 13 L39 18 L42 12 L44 18 L47 13 L48 19 L51 15 L51 23 C44 25 36 25 30 23Z" fill="${CR}"/>`;
  }
  if((lk.crest==="tuft"||P_.crest)&&!pom){const spg=c==="spangled"||c==="goldspangled";s+=crestSVG(spg||lk.comb==="v"?"fwd":"back",lk.crest==="tuft"?(P_.crest||fill):P_.crest,spg?PK:(P_.dark?null:null));}
  s+=comb;
  if(pom){const cc=P_.crest||(lk.feather==="silkie"?fill:(P_.dark?"#F4EFE6":fill));s+=fluff([[34,14],[42,9],[50,11],[56,17],[38,20],[47,17],[54,23]],lk.feather==="silkie"&&lk.crest!=="pompom"?5:6.5,cc)+`<path d="M30 16 C34 5 52 3 60 15" fill="none" stroke="${INK}" stroke-width="1" opacity=".3"/>`;}
  s+=`<path d="M27 34 L16 37.5 L27 41Z" fill="#F08A24" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  if(lk.beard==="beard")s+=fluff([[22,45],[25,51],[31,53],[36,50],[29,46]],4.8,P_.hk&&!P_.dark?fill:fill)+`<path d="M19 44 C18 52 26 58 34 55" fill="none" stroke="${face}" stroke-width="1" opacity=".3"/>`;
  else if(!pul)s+=roo?`<path d="M26 42 C20 48 22 59 28.5 58 C33.5 56 32.5 47 30 42Z" fill="${CR}"/>`:`<path d="M27 42 C23 46 25 52 29 51 C32 49 31 45 29.5 42Z" fill="${CR}"/>`;
  s+=eye(38,31)+blush(44,40);
  s+=mood==="excited"?`<path d="M50 52 C54 38 66 32 74 36" fill="none" stroke="${face}" stroke-width="2.2" stroke-linecap="round"/>`:`<path d="M48 54 C54 46 68 47 71 56 C67 63 56 64 50 59" fill="none" stroke="${face}" stroke-width="2.2" stroke-linecap="round"/>`;
  if(mood==="sick")s+=`<g transform="translate(14 46) rotate(-25)"><rect x="0" y="0" width="4" height="14" rx="2" fill="#fff" stroke="${INK}" stroke-width="1.2"/><circle cx="2" cy="14" r="2.6" fill="#E0473A" stroke="${INK}" stroke-width="1.2"/></g>`;
  s+=accSVG(lk.acc,"hen");
  if(mood==="sleep")s+=`<text x="12" y="20" font-family="Georgia,serif" font-size="12" fill="${INK}" font-style="italic">z</text>`;
 }
 if(lk.size==="bantam")s=`<g transform="translate(10 17) scale(.82)">${s}</g>`;
 return `<svg class="kart ${o.cls||""}" viewBox="0 0 100 100" width="${sz}" height="${sz}" ${o.attrs||""} aria-hidden="true">${o.flip?`<g transform="translate(100 0) scale(-1 1)">${s}</g>`:s}</svg>`;}
function crestSVG(style,col,tip){
 if(style==="fwd"){
  const P=[[25.5,3.5],[28.5,10.6],[30.6,16.7],[34.6,21.6],[40.2,23.6]],R=[3.97,3.33,3.26,3.07];
  let lob="";for(let k=0;k<4;k++)lob+=` A${R[k]} ${R[k]} 0 0 0 ${P[k+1][0]} ${P[k+1][1]}`;
  const edge=`M60.5 25.5 C63 12 50.5 1.8 36.5 1.6 C31.5 1.5 27.3 1.9 ${P[0][0]} ${P[0][1]}${lob}`;
  let o=`<path d="${edge} C47 24 54 24.6 60.5 25.5Z" fill="${col}"/>`;
  o+=`<path d="M30 7.5 C39.5 8.3 49.5 13.5 57 21.8M32 13.6 C40 14.4 47 17.6 52.5 22.6M35.6 19 C40.5 19.6 45 21.2 48 23.4" fill="none" stroke="${INK}" stroke-width=".9" stroke-linecap="round" opacity=".22"/>`;
  if(tip)for(let k=0;k<4;k++)o+=`<path d="M${P[k][0]} ${P[k][1]} A${R[k]} ${R[k]} 0 0 0 ${P[k+1][0]} ${P[k+1][1]}" fill="none" stroke="${tip}" stroke-width="${(3.4-k*.35).toFixed(2)}" stroke-linecap="round"/>`;
  if(tip)o+=`<g fill="${tip}"><path d="M43.5 6.5 q2.6 1.4 1.5 3.6 q-2.1-1-1.5-3.6z"/><path d="M50.8 11.4 q2.3 1.6 1.1 3.4 q-1.9-1.2-1.1-3.4z"/></g>`;
  o+=`<path d="${edge}" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>`;
  return o;}
 return `<path d="M41 21 C45 14 53 8.5 64.5 7.5 C63 13 60.5 18.5 56.5 22.5 C51 23 45.5 22.5 41 21Z" fill="${col}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/><path d="M45 20 C50 15 55 12 61 10M49 21 C53 17 57 15 62 13.5" fill="none" stroke="${INK}" stroke-width=".9" stroke-linecap="round" opacity=".35"/>${tip?`<g fill="${tip}"><path d="M60 9l2.4 1.2-1.6 2z"/><path d="M57 15l2.4 1.2-1.6 2z"/></g>`:""}`;}
function chickLook(col){const D={black:["black","belly"],blackcopper:["black","belly"],mottled:["black","belly"],exchequer:["black","belly"],birchen:["black","belly"],mahogany:["brown","none"],barred:["black","headspot"],cuckoo:["black","headspot"],crele:["brown","chipmunk"],partridge:["brown","chipmunk"],bluepartridge:["gray","chipmunk"],millefleur:["brown","chipmunk"],goldlaced:["brown","chipmunk"],goldpencil:["brown","chipmunk"],silverpencil:["cream","chipmunk"],wheaten:["cream","none"],blue:["gray","none"],bluelaced:["gray","none"],sapphire:["gray","none"],splash:["gray","speckle"],lavender:["lavender","none"],lavlaced:["lavender","none"],red:["ginger","none"],cinnamon:["ginger","none"],goldencomet:["ginger","none"],salmon:["cream","muffs"],spangled:["cream","speckle"],goldspangled:["yellow","speckle"],speckled:["brown","speckle"],chocolate:["brown","none"],white:["yellow","none"],silverlaced:["cream","none"]};const d=D[col]||["yellow","none"];return{down:d[0],mark:d[1]};}
function breedLook(name,col,kind){return Object.assign({kind:kind||"auto",breed:name},BLOOK[name]||{},chickLook(col));}
function cedBreed(i){const b=BREEDS[i];const k=TMP.cl.look.kind,a=TMP.cl.look.acc,sz=TMP.cl.look.size;TMP.cl.color=b.col;TMP.cl.look=breedLook(b.n,b.col,k);if(a)TMP.cl.look.acc=a;if(sz&&!BLOOK[b.n]?.size)TMP.cl.look.size=sz;cedRe();}
const CDOWN={yellow:["#F7D648",{en:"Yellow",es:"Amarillo"}],cream:["#F6E7B8",{en:"Cream",es:"Crema"}],white:["#FBF7EE",{en:"White",es:"Blanco"}],ginger:["#E2934A",{en:"Ginger",es:"Jengibre"}],brown:["#8A5A36",{en:"Brown",es:"Café"}],gray:["#A9B3C2",{en:"Gray-blue",es:"Gris azulado"}],lavender:["#CFC6DA",{en:"Lavender",es:"Lavanda"}],black:["#3A3B42",{en:"Black",es:"Negro"}]};
const LEGC={yellow:"#F2C14E",slate:"#6F7C8E",green:"#7E9A5A",white:"#EDE6D8",black:"#2E2F36",pink:"#E8A3A0",willow:"#A7B36A"};
function accSVG(a,k){if(!a||a==="none")return"";const I=INK;const ch=k==="chick";
 const head=ch?'transform="translate(7 12)"':"",eyeT=ch?'transform="translate(0 14)"':"",neck=ch?'transform="translate(3 14)"':"";
 switch(a){
 case"bow":return`<g ${head}><path d="M54 16 l-8-5.5v11z M54 16 l8-5.5v11z" fill="#F27BA0" stroke="${I}" stroke-width="1" stroke-linejoin="round"/><circle cx="54" cy="16" r="2.4" fill="#E0567F" stroke="${I}" stroke-width="1"/></g>`;
 case"flower":return`<g ${head}><g fill="#FFF6E8" stroke="${I}" stroke-width=".8">${[[0,-4],[3.8,-1.2],[2.4,3.2],[-2.4,3.2],[-3.8,-1.2]].map(([x,y])=>`<circle cx="${52+x}" cy="${15+y}" r="2.8"/>`).join("")}</g><circle cx="52" cy="15" r="2.2" fill="#F5B83D"/></g>`;
 case"hat":return`<g ${head}><path d="M30 17 C30 6 50 6 50 17Z" fill="#E8C77A" stroke="${I}" stroke-width="1.2"/><path d="M30.5 14.5 h19" stroke="#D9483B" stroke-width="2.4"/><ellipse cx="40" cy="17.5" rx="15" ry="3.6" fill="#E8C77A" stroke="${I}" stroke-width="1.2"/></g>`;
 case"crown":return`<g ${head}><path d="M31 18 L32.5 7 L37.5 13 L41 4.5 L44.5 13 L49.5 7 L51 18Z" fill="#F5B83D" stroke="${I}" stroke-width="1.2" stroke-linejoin="round"/><circle cx="41" cy="14" r="1.6" fill="#D9483B"/></g>`;
 case"glasses":return`<g ${eyeT}><circle cx="38" cy="31" r="5.6" fill="rgba(255,255,255,.28)" stroke="${I}" stroke-width="1.8"/><path d="M43.4 29.6 L53 27.5" stroke="${I}" stroke-width="1.6" stroke-linecap="round"/></g>`;
 case"bandana":return`<g ${neck}><path d="M29 45 C40 49 52 47 63 40 L49 60Z" fill="#D9483B" stroke="${I}" stroke-width="1" stroke-linejoin="round"/><g fill="#fff"><circle cx="40" cy="49" r="1"/><circle cx="50" cy="47" r="1"/><circle cx="48" cy="54" r="1"/></g></g>`;
 case"bowtie":return`<g ${neck}><path d="M29 52 l-7-4.5v9z M29 52 l7-4.5v9z" fill="#3C4A6B" stroke="${I}" stroke-width="1" stroke-linejoin="round"/><circle cx="29" cy="52" r="2" fill="#5A6C96" stroke="${I}" stroke-width=".9"/></g>`;
 case"scarf":return`<g ${neck}><path d="M28 44 C38 50 54 48 64 40 L66 46 C54 55 38 56 28 50Z" fill="#7FA7D6" stroke="${I}" stroke-width="1"/><path d="M57 49 L60 64 L66 62 L63 47Z" fill="#7FA7D6" stroke="${I}" stroke-width="1"/><path d="M60 58h5M59.5 61h5" stroke="#fff" stroke-width="1"/></g>`;
 case"necklace":return`<g ${neck}>${[[31,48],[36,50],[41,51],[46,51],[51,50],[56,48],[60,45]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.9" fill="#FFF6E8" stroke="${I}" stroke-width=".7"/>`).join("")}</g>`;
 case"headphones":return`<g ${head}><path d="M32 22 C32 8 50 8 50 22" fill="none" stroke="${I}" stroke-width="2.6"/><rect x="47" y="20" width="6" height="8" rx="2" fill="#A98BD6" stroke="${I}" stroke-width="1"/></g>`;
 }return"";}
/* extra plumage */
Object.assign(PAT,{
 lemon:{b:"#F4DE8C",n:{en:"Lemon",es:"Limón"}},
 mahogany:{b:"#7A2E1E",dark:1,n:{en:"Mahogany",es:"Caoba"}},
 silver:{b:"#C9CDD3",n:{en:"Silver",es:"Plata"}},
 khaki:{b:"#C9B48A",n:{en:"Khaki",es:"Caqui"}},
 pearl:{b:"#BDB6AD",n:{en:"Smoky pearl",es:"Perla ahumada"}},
 cinnamon:{b:"#B5723F",n:{en:"Cinnamon",es:"Canela"}},
 porcelain:{b:"#EAD3A6",ov:()=>_dots("#FFFFFF",1.9,"#8FA3BC"),n:{en:"Porcelain",es:"Porcelana"}},
 exchequer:{b:"#34363F",ov:()=>_blobs("#F4EFE6"),dark:1,n:{en:"Exchequer",es:"Ajedrezada"}},
 paint:{b:"#F4EFE6",ov:()=>_blobs(PK),n:{en:"Paint",es:"Pinta"}},
 silverpencil:{b:"#F4EFE6",ov:()=>_pencil("#5E6168"),t:PK,n:{en:"Silver penciled",es:"Plata lapizada"}},
 goldpencil:{b:"#E9A93A",ov:()=>_pencil("#7A4A1E"),t:PK,n:{en:"Gold penciled",es:"Oro lapizada"}},
 pyle:{b:"#F4EFE6",hk:"#E58A3A",wg:"#E58A3A",n:{en:"Pyle",es:"Pyle"}},
 duckwing:{b:"#8E939C",hk:"#ECE8DE",wg:"#E6E2D8",br:"#3A3B42",n:{en:"Silver duckwing",es:"Ala de pato plata"}},
 redshoulder:{b:"#F4EFE6",wg:"#C9502E",t:"#C9502E",n:{en:"Red shouldered",es:"Hombro rojo"}},
 bluepartridge:{b:"#8FA3BC",ov:()=>_lace("#3D4A5C"),hk:"#E2A43A",t:"#3D4A5C",n:{en:"Blue partridge",es:"Perdiz azul"}},
 lavlaced:{b:"#E9DFC8",ov:()=>_lace("#A99CC0"),t:"#A99CC0",n:{en:"Lavender laced",es:"Ribete lavanda"}},
 sapphire:{b:"#8E9FC4",hk:"#B7C2DC",t:"#6F7FA6",n:{en:"Sapphire",es:"Zafiro"}},
 goldencomet:{b:"#D9893C",hk:"#EBA752",t:"#F4EAD6",wg:"#C9732F",n:{en:"Golden comet",es:"Cometa dorada"}},
 redstar:{b:"#B5602F",t:"#F4EAD6",hk:"#C9773C",n:{en:"Red star",es:"Estrella roja"}}
});
function _blobs(c){return`<g fill="${c}">${[[40,58,4.2],[56,54,3.4],[66,63,4.4],[46,70,3.6],[60,72,3],[74,50,3.2],[36,46,3],[52,44,2.8]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.8}" transform="rotate(20 ${x} ${y})"/>`).join("")}</g>`;}
function _pencil(c){return`<path d="${[[40,56],[50,52],[60,56],[36,64],[46,62],[56,62],[66,62],[42,71],[52,72],[62,70],[54,44],[64,47],[74,50],[81,42]].map(([x,y])=>`M${x-4} ${y}q4 3 8 0M${x-3.4} ${y+2.4}q3.4 2.6 6.8 0`).join("")}" fill="none" stroke="${c}" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>`;}
Object.keys(PAT).forEach(k=>{HFILL[k]=PAT[k].b;});
/* option catalog */
const LOOKOPT={
 kind:{n:{en:"Bird type",es:"Tipo de ave"},o:[["auto",{en:"Auto (by age)",es:"Auto (por edad)"}],["hen",{en:"Hen",es:"Gallina"}],["rooster",{en:"Rooster",es:"Gallo"}],["pullet",{en:"Pullet",es:"Polla"}],["chick",{en:"Chick",es:"Pollito"}]]},
 size:{n:{en:"Size",es:"Tamaño"},o:[["standard",{en:"Standard",es:"Estándar"}],["bantam",{en:"Bantam",es:"Bantam"}]]},
 comb:{n:{en:"Comb",es:"Cresta"},o:[["single",{en:"Single",es:"Sencilla"}],["rose",{en:"Rose",es:"Rosa"}],["pea",{en:"Pea",es:"Guisante"}],["walnut",{en:"Walnut",es:"Nuez"}],["v",{en:"V-comb",es:"En V"}],["strawberry",{en:"Strawberry",es:"Fresa"}],["buttercup",{en:"Buttercup",es:"Copa"}]]},
 crest:{n:{en:"Crest",es:"Copete"},o:[["none",{en:"None",es:"Ninguno"}],["tuft",{en:"Tuft",es:"Mechón"}],["pompom",{en:"Pom-pom",es:"Pompón"}]]},
 beard:{n:{en:"Beard & muffs",es:"Barba"},o:[["none",{en:"None",es:"Sin barba"}],["beard",{en:"Bearded",es:"Con barba"}]]},
 feather:{n:{en:"Feathers",es:"Plumaje"},o:[["smooth",{en:"Smooth",es:"Liso"}],["frizzle",{en:"Frizzle",es:"Rizado"}],["silkie",{en:"Silkie fluff",es:"Sedoso"}]]},
 tail:{n:{en:"Tail",es:"Cola"},o:[["normal",{en:"Classic",es:"Clásica"}],["sickle",{en:"Long sickles",es:"Hoces largas"}],["short",{en:"Short",es:"Corta"}],["rumpless",{en:"Rumpless",es:"Sin cola"}]]},
 legs:{n:{en:"Leg color",es:"Color de patas"},o:[["ink",{en:"Classic",es:"Clásico"}],["yellow",{en:"Yellow",es:"Amarillo"}],["slate",{en:"Slate",es:"Pizarra"}],["willow",{en:"Willow",es:"Sauce"}],["green",{en:"Green",es:"Verde"}],["white",{en:"White",es:"Blanco"}],["pink",{en:"Pink",es:"Rosa"}],["black",{en:"Black",es:"Negro"}]]},
 feet:{n:{en:"Feet",es:"Patas"},o:[["clean",{en:"Clean",es:"Lisas"}],["feathered",{en:"Feathered",es:"Emplumadas"}]]},
 acc:{n:{en:"Accessory",es:"Accesorio"},o:[["none",{en:"None",es:"Nada"}],["bow",{en:"Bow",es:"Moño"}],["flower",{en:"Flower",es:"Flor"}],["hat",{en:"Sun hat",es:"Sombrero"}],["crown",{en:"Crown",es:"Corona"}],["bandana",{en:"Bandana",es:"Pañuelo"}],["scarf",{en:"Scarf",es:"Bufanda"}],["bowtie",{en:"Bow tie",es:"Corbatín"}],["necklace",{en:"Pearls",es:"Perlas"}],["glasses",{en:"Glasses",es:"Lentes"}],["headphones",{en:"Headphones",es:"Audífonos"}]]},
 down:{n:{en:"Down color",es:"Color del plumón"},o:Object.entries(CDOWN).map(([k,v])=>[k,v[1]])},
 mark:{n:{en:"Markings",es:"Marcas"},o:[["none",{en:"Plain",es:"Liso"}],["chipmunk",{en:"Chipmunk stripes",es:"Rayas de ardilla"}],["headspot",{en:"Head spot",es:"Mancha en cabeza"}],["belly",{en:"Light belly",es:"Panza clara"}],["speckle",{en:"Speckles",es:"Pecas"}],["muffs",{en:"Cheek muffs",es:"Mejillas"}]]}
};
const isSolid=k=>{const p=PAT[k];if(!p||k[0]==="~")return false;return !p.ov&&!p.hk&&!p.br&&!p.wg&&!p.t&&!p.crest;};
const CEDTABS=[["type","🐔",{en:"Type",es:"Tipo"}],["breed","🏷️",{en:"Breeds",es:"Razas"}],["color","🎨",{en:"Colors",es:"Colores"}],["pattern","✨",{en:"Patterns",es:"Patrones"}],["head","👑",{en:"Head",es:"Cabeza"}],["body","🪶",{en:"Body",es:"Cuerpo"}],["legs","🦶",{en:"Legs & feet",es:"Patas"}],["extras","🎀",{en:"Extras",es:"Extras"}]];
const BLOOK={"Buckeye":{comb:"pea",legs:"yellow"},"Ancona":{legs:"yellow"},"New Hampshire Red":{legs:"yellow"},"Sebright":{size:"bantam",comb:"rose",legs:"slate"},"Sapphire Gem":{legs:"slate"},"Golden Comet":{legs:"yellow"},"Black Sex Link":{legs:"yellow"},"Rhode Island Red":{legs:"yellow"},"Barred Plymouth Rock":{legs:"yellow"},"Buff Orpington":{legs:"white"},"Lavender Orpington":{legs:"white"},"Delaware":{legs:"yellow"},"Bielefelder":{legs:"yellow"},"Speckled Sussex":{legs:"white"},"Brahma":{comb:"pea",feet:"feathered"},"Cochin":{feet:"feathered"},"Silkie":{feather:"silkie",feet:"feathered",comb:"walnut",legs:"slate"},"Polish":{crest:"pompom",comb:"v",legs:"slate"},"Salmon Faverolles":{beard:"beard",feet:"feathered",legs:"white"},"Easter Egger":{beard:"beard",comb:"pea",legs:"willow"},"Ameraucana":{beard:"beard",comb:"pea",legs:"slate"},"Araucana":{tail:"rumpless",comb:"pea",legs:"willow"},"Cream Legbar":{crest:"tuft",legs:"yellow"},"Silver Spangled Appenzeller Spitzhauben":{crest:"tuft",comb:"v",legs:"slate"},"Wyandotte":{comb:"rose",legs:"yellow"},"Dominique":{comb:"rose",legs:"yellow"},"Silver Spangled Hamburg":{comb:"rose",legs:"slate"},"Leghorn":{legs:"yellow"},"Welsummer":{legs:"yellow"},"Black Copper Marans":{feet:"feathered",legs:"slate"},"Jersey Giant":{legs:"black"},"Australorp":{legs:"black"},"Polish Green-legged Partridge":{legs:"green"},"Isbar (Silverudd's Blue)":{legs:"slate"},"Penedesenca":{comb:"buttercup",legs:"slate"},"Barnevelder":{legs:"yellow"},"Swedish Flower Hen":{legs:"willow"},"Olive Egger":{beard:"beard",comb:"pea"}};
function birdKind(h){const k=h.look&&h.look.kind;if(k&&k!=="auto")return k;if(h.status==="rooster")return"rooster";const w=ageWeeks(h.hatch);if(w!=null&&w<6)return"chick";if(w!=null&&w<16)return"pullet";return"hen";}
function henBreedDef(h){const n=String(h.breed||"").toLowerCase();if(!n)return null;return BREEDS.find(x=>x.n.toLowerCase()===n)||BREEDS.find(x=>x.n.toLowerCase().includes(n)||n.includes(x.n.toLowerCase()));}
function henArt(h,size,mood){let c=h.color,l=h.look;if(!c||!l){const b=henBreedDef(h);if(b){c=c||b.col;l=l||breedLook(b.n,b.col);}}
 if(!h.look&&l)l=twinTell(h,l);return drawHen(c,{size,mood,kind:birdKind(h),look:l});}
/* Birds left on their breed's default look would be identical twins. The first one stays plain; each
   later same-breed bird gets its own default accessory (until the keeper customizes her). */
function twinTell(h,l){const kd=birdKind(h);const fl=(S.flock||[]).filter(x=>!x.look&&(x.breed||"")===(h.breed||"")&&(x.color||"")===(h.color||"")&&birdKind(x)===kd);const r=fl.findIndex(x=>x.id===h.id);if(r<1)return l;
 const k=birdKind(h);const set=k==="rooster"?["bowtie","bandana","hat","glasses"]:k==="chick"?["bow","flower","bandana","scarf"]:["bow","flower","necklace","scarf","bandana","hat"];
 return Object.assign({},l,{acc:set[(r-1)%set.length]});}
/* character editor */
function cedInit(color,look){TMP.cl={color:color||"buff",look:Object.assign({kind:"auto"},look||{})};}
function cedSet(k,v){if(!TMP.cl)cedInit();const cl=TMP.cl;if(k==="color"){if(!isSolid(cl.color)&&PATGEN[cl.color]&&!cl.look.pat)cl.look.pat=cl.color;cl.color=v;}else if(k==="pat"){if(!isSolid(cl.color))cl.color=nearestSolid(cl.color);if(v)cl.look.pat=v;else delete cl.look.pat;}else cl.look[k]=v;cedRe();}
function cedTab(t){TMP.cedTab=t;cedRe();}
function cedRe(){const f=window[TMP.cedR||"render"];const y=window.scrollY;if(typeof f==="function")f();window.scrollTo(0,y);}
function cedRandom(){const pick=a=>a[Math.floor(Math.random()*a.length)];const L_=TMP.cl.look;const keys=Object.keys(PAT).filter(k=>k[0]!=="~");TMP.cl.color=pick(keys);
 ["comb","crest","beard","feather","tail","legs","feet","acc","down","mark"].forEach(k=>{const o=LOOKOPT[k].o;L_[k]=Math.random()<.55?o[0][0]:pick(o)[0];});cedRe();}
function charEditor(opt){opt=opt||{};if(!TMP.cl)cedInit();const cl=TMP.cl,lk=cl.look;
 const pk=opt.kind||(lk.kind&&lk.kind!=="auto"?lk.kind:(opt.ageKind||"hen"));const chick=pk==="chick";
 const tabs=CEDTABS.filter(t=>!(opt.noType&&t[0]==="type"));let tab=TMP.cedTab||tabs[0][0];if(!tabs.find(t=>t[0]===tab))tab=tabs[0][0];
 const mini=(color,lkk,label,on,js)=>`<button type="button" class="pat ${on?"on":""}" onclick="${js}">${drawHen(color,{size:42,kind:pk,look:lkk,mood:"happy"})}<span>${esc(L(label))}</span></button>`;
 const grp=(k)=>`<div class="cedg"><b>${esc(L(LOOKOPT[k].n))}</b><div class="patgrid">${LOOKOPT[k].o.map(([v,lab])=>{const nl=Object.assign({},lk,{[k]:v});const cur=lk[k]||LOOKOPT[k].o[0][0];return mini(cl.color,nl,lab,cur===v,`cedSet('${k}','${v}')`);}).join("")}</div></div>`;
 const kgrp=()=>`<div class="cedg"><b>${esc(L(LOOKOPT.kind.n))}</b><div class="patgrid">${LOOKOPT.kind.o.map(([v,lab])=>{const kk=v==="auto"?(opt.ageKind||"hen"):v;return `<button type="button" class="pat ${(lk.kind||"auto")===v?"on":""}" onclick="cedSet('kind','${v}')">${drawHen(cl.color,{size:42,kind:kk,look:lk,mood:"happy"})}<span>${esc(L(lab))}</span></button>`;}).join("")}</div></div>`;
 const pgrp=()=>{const base=isSolid(cl.color)?cl.color:nearestSolid(cl.color);const cur=lk.pat||(!isSolid(cl.color)&&PATGEN[cl.color]?cl.color:"");return `<div class="cedg"><b>${S.lang==="es"?"Patrón sobre tu color":"Pattern on your color"} <small class="muted">${Object.keys(PATGEN).length+1}</small></b><p class="muted" style="font-size:12.5px;margin:0 0 8px">${S.lang==="es"?"El patrón se adapta al color base que elegiste.":"Patterns adapt to the base color you picked."}</p><div class="patgrid">${mini(base,Object.assign({},lk,{pat:undefined}),{en:"Solid",es:"Sólido"},!cur,`cedSet('pat','')`)}${Object.keys(PATGEN).map(pk2=>mini(base,Object.assign({},lk,{pat:pk2}),PAT[pk2].n,cur===pk2,`cedSet('pat','${pk2}')`)).join("")}</div></div>`;};
 const cgrp=(solid)=>`<div class="cedg"><b>${solid?(S.lang==="es"?"Colores sólidos":"Solid colors"):(S.lang==="es"?"Patrones y combinaciones":"Patterns & combinations")} <small class="muted">${Object.keys(PAT).filter(k=>k[0]!=="~"&&isSolid(k)===solid).length}</small></b><div class="patgrid">${Object.keys(PAT).filter(k=>k[0]!=="~"&&isSolid(k)===solid).map(c=>mini(c,lk,PAT[c].n,cl.color===c,`cedSet('color','${c}')`)).join("")}</div></div>`;
 let body="";
 if(tab==="type")body=kgrp()+grp("size");
 else if(tab==="breed")body=`<div class="cedg"><b>${S.lang==="es"?"Elige una raza: color y rasgos listos":"Pick a breed: color and features in one tap"} <small class="muted">${BREEDS.length}</small></b><div class="patgrid">${BREEDS.map((b,i)=>[b,i]).sort((x,y)=>x[0].n.localeCompare(y[0].n)).map(([b,i])=>`<button type="button" class="pat ${lk.breed===b.n?"on":""}" onclick="cedBreed(${i})">${drawHen(b.col,{size:42,kind:pk,look:Object.assign({},breedLook(b.n,b.col),{acc:lk.acc}),mood:"happy"})}<span>${esc(b.n.replace(/ \(.*\)/,"").replace("Silver Spangled ","S.S. "))}</span></button>`).join("")}</div></div>`;
 else if(tab==="color")body=chick?grp("down"):cgrp(true);
 else if(tab==="pattern")body=chick?grp("mark")+`<p class="muted" style="font-size:12.5px">${S.lang==="es"?"Su plumaje adulto (para cuando crezca):":"Grown-up plumage (for when she grows):"}</p>`+pgrp():pgrp();
 else if(tab==="head")body=chick?grp("crest")+grp("beard"):grp("comb")+grp("crest")+grp("beard");
 else if(tab==="body")body=chick?grp("feather")+grp("size"):grp("feather")+grp("tail")+grp("size");
 else if(tab==="legs")body=grp("legs")+grp("feet");
 else if(tab==="extras")body=grp("acc");
 return `<div class="ced"><div class="cedtop"><div class="cedprev">${drawHen(cl.color,{size:132,kind:pk,look:lk,mood:"happy",cls:"bob"})}</div><div class="cedinfo"><b>${esc(L((PAT[lk.pat&&PATGEN[lk.pat]?adaptKey(isSolid(cl.color)?cl.color:nearestSolid(cl.color),lk.pat):cl.color]||PAT.buff).n))}${chick?" · "+esc(L((CDOWN[lk.down]||CDOWN.yellow)[1])):""}</b><small class="muted">${[lk.comb&&!chick?L(LOOKOPT.comb.o.find(x=>x[0]===lk.comb)[1]):"",lk.feather&&lk.feather!=="smooth"?L(LOOKOPT.feather.o.find(x=>x[0]===lk.feather)[1]):"",lk.size==="bantam"?"Bantam":"",lk.acc&&lk.acc!=="none"?L(LOOKOPT.acc.o.find(x=>x[0]===lk.acc)[1]):""].filter(Boolean).join(" · ")}</small><button type="button" class="btn alt sm" style="margin-top:8px" onclick="cedRandom()">🎲 ${S.lang==="es"?"Sorpréndeme":"Surprise me"}</button></div></div>
 <div class="cedtabs">${tabs.map(t=>`<button type="button" class="${t[0]===tab?"on":""}" onclick="cedTab('${t[0]}')">${t[1]} ${esc(L(t[2]))}</button>`).join("")}</div><div class="cedbody">${body}</div></div>`;}
function petKeep(){const v=val("petName");renderPet();setVal("petName",v);}
function henEditOpen(id){const h=S.flock.find(x=>x.id===id);cedInit(h.color,h.look);TMP.cedEdit=id;TMP.cedR="render";TMP.cedTab="color";if(S.sub!=="hen:"+id)go("flock","hen:"+id);else render();window.scrollTo(0,0);}
function henEditSave(id){const h=S.flock.find(x=>x.id===id);h.color=TMP.cl.color;h.look=Object.assign({},TMP.cl.look);TMP.cedEdit=null;TMP.cl=null;save();addXP(2,"🎨");render();}
function henEditCancel(){TMP.cedEdit=null;TMP.cl=null;render();}

const henSVG=(c,s=44)=>drawHen(c,{size:s});
function scene(lv,noChick){
 let s=`<svg viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" class="kscene" aria-hidden="true">`;
 s+=`<rect width="320" height="170" fill="#CFE6EE"/>`;
 s+=`<g><circle cx="270" cy="36" r="17" fill="#F2B33D"/><path d="M263 37 Q270 43 277 37" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><circle cx="264" cy="31" r="1.6" fill="${INK}"/><circle cx="276" cy="31" r="1.6" fill="${INK}"/></g>`;
 s+=`<path d="M30 30 h34 a9 9 0 0 1 0 18 h-34 a9 9 0 0 1 0 -18Z" fill="#fff" opacity=".9"/><path d="M150 22 h28 a8 8 0 0 1 0 16 h-28 a8 8 0 0 1 0 -16Z" fill="#fff" opacity=".85"/>`;
 s+=`<path d="M0 118 C60 104 120 112 170 108 C230 103 280 112 320 106 V170 H0Z" fill="#8CC063"/><path d="M0 132 C80 124 160 132 320 124 V170 H0Z" fill="#7AB350"/>`;
 if(lv>=3){s+=`<rect x="276" y="70" width="8" height="44" rx="3" fill="#7B5230"/><path d="M252 76 C246 54 262 40 280 44 C300 42 312 58 304 76 C298 88 262 90 252 76Z" fill="#4F8F2F"/><circle cx="268" cy="64" r="3" fill="#E46A4B"/><circle cx="290" cy="72" r="3" fill="#E46A4B"/>`;
  [[150,126,"#F2B33D"],[164,130,"#F49AA6"],[230,128,"#F2B33D"],[300,132,"#F49AA6"]].forEach(f=>s+=`<path d="M${f[0]} ${f[1]} v-10" stroke="#3F7A25" stroke-width="2"/><circle cx="${f[0]}" cy="${f[1]-11}" r="4" fill="${f[2]}"/><circle cx="${f[0]}" cy="${f[1]-11}" r="1.5" fill="#7B5230"/>`);}
 if(lv>=1){s+=`<path d="M14 82 L64 46 L114 82Z" fill="#6E2B1F"/><rect x="22" y="80" width="84" height="46" rx="4" fill="#C8513A"/><rect x="54" y="96" width="20" height="30" rx="9" fill="#4E1D14"/><rect x="32" y="88" width="14" height="12" rx="3" fill="#F6E7B0"/><rect x="82" y="88" width="14" height="12" rx="3" fill="#F6E7B0"/><path d="M74 126 L96 140" stroke="#C9A57A" stroke-width="5" stroke-linecap="round"/>`;
  if(lv>=4)s+=`<path d="M64 46 V22" stroke="#4E1D14" stroke-width="2.4"/><path d="M64 22 L82 27 L64 32Z" fill="#F2B33D"/>`;}
 if(lv>=2){for(let x=126;x<320;x+=14)s+=`<rect x="${x}" y="104" width="6" height="26" rx="3" fill="#F4EFE6"/>`;s+=`<rect x="120" y="110" width="200" height="4" rx="2" fill="#F4EFE6"/><rect x="120" y="121" width="200" height="4" rx="2" fill="#F4EFE6"/>`;}
 if(lv>=4)s+=`<ellipse cx="128" cy="150" rx="18" ry="7" fill="#C9A06A"/><ellipse cx="122" cy="145" rx="4" ry="5" fill="#F4EFE6"/><ellipse cx="131" cy="144" rx="4" ry="5" fill="#A9D3D6"/><ellipse cx="136" cy="147" rx="4" ry="5" fill="#B9733F"/>`;
 const pos=[[146,92,"buff","happy"],[196,100,"red","neutral"],[238,94,"white","excited"],[110,108,"black","calm"]];
 const n=lv===0?0:Math.min(lv,4);
 for(let i=0;i<n;i++){const p=pos[i];s+=`<g class="${i%2?"bob2":"bob"}">${drawHen(p[2],{size:54,mood:p[3],flip:i%2===1,attrs:`x="${p[0]}" y="${p[1]}"`})}</g>`;}
 if(!noChick)s+=`<g class="bob2">${drawHen("",{kind:"chick",size:30,mood:"happy",attrs:`x="${lv===0?150:178}" y="128"`})}</g>`;
 if(lv>=2&&!noChick)s+=`<g class="bob">${drawHen("",{kind:"chick",size:26,mood:"neutral",flip:true,attrs:`x="210" y="134"`})}</g>`;
 return s+`</svg>`;}

