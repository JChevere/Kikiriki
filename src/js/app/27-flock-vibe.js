
/* ================= FLOCK VIBE CHECK + RECOMMENDATIONS ================= */
const VIBES=[
{k:"thriving",e:"🌟",n:{en:"Thriving",es:"Radiante"},b:{en:"Bright combs, busy beaks, full nests. Your flock is at its best.",es:"Crestas rojas, picos ocupados, nidos llenos. Tu parvada está en su mejor momento."},fx:"bounce",tip:"✨",recs:["a-beh5","g-months","a-egg2","a-ga4"]},
{k:"happy",e:"😊",n:{en:"Happy",es:"Contenta"},b:{en:"Eating, scratching and chatting. A good, normal day in the coop.",es:"Comen, escarban y platican. Un buen día normal en el gallinero."},fx:"bob",tip:"🎵",recs:["a-feed6","a-beh2","a-coop4","g-months"]},
{k:"calm",e:"😌",n:{en:"Calm",es:"Tranquila"},b:{en:"Quiet and settled. Maybe a little slow today. Perfect time for a quick check.",es:"Quietas y en calma. Quizá algo lentas hoy. Buen momento para una revisión rápida."},fx:"",tip:"🍃",recs:["g-check","a-hb1","a-an1","a-beh1"]},
{k:"off",e:"😕",n:{en:"Off",es:"Rara"},b:{en:"Fewer eggs, fluffed up, or just not themselves. Let's find out why.",es:"Menos huevos, esponjadas o no son las de siempre. Averigüemos por qué."},fx:"",tip:"❓",recs:["a-egg5","a-an3","dx-eyes","a-hb4"],sym:1},
{k:"sick",e:"🤒",n:{en:"Sick",es:"Enferma"},b:{en:"Someone looks unwell. Start the symptom checker and set up a hospital crate.",es:"Alguien se ve enferma. Abre la revisión de síntomas y prepara una jaula hospital."},fx:"sad",tip:"🩺",recs:["th-nurse","a-ha4","a-hb5","inf-viral"],sym:1}];
function vibeIdx(){const v=(S.vibe&&S.vibe.d===today())?S.vibe.k:(TMP.vibe||"happy");const i=VIBES.findIndex(x=>x.k===v);return i<0?1:i;}
function setVibe(k){TMP.vibe=k;S.vibe={d:today(),k};save();const el=document.getElementById("vibeCard");if(el){el.outerHTML=vibeCard();centerVibe();}const r=document.getElementById("recRow");if(r)r.outerHTML=recRow();}
function centerVibe(){setTimeout(()=>{const s=document.querySelector(".vword.on");if(s)s.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"});},30);}
function vibeHen(v){const h=S.flock[0];const m={thriving:"excited",happy:"happy",calm:"calm",off:"sad",sick:"sick"}[v.k]||"neutral";return h?drawHen(h.color,{size:130,mood:m,kind:birdKind(h),look:h.look,cls:"vhen "+v.fx}):drawHen("buff",{size:130,mood:m,cls:"vhen "+v.fx});}
const OVAL=`<svg class="oval" viewBox="0 0 120 44" preserveAspectRatio="none"><path d="M10 26 C 8 10, 40 3, 64 4 C 96 5, 116 14, 112 27 C 108 39, 76 42, 52 41 C 26 40, 6 35, 9 22 C 11 14, 28 8, 44 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`;
function vibeCard(){const i=vibeIdx(),v=VIBES[i];const es=S.lang==="es";const done=S.vibe&&S.vibe.d===today();
 return `<div class="vibe" id="vibeCard"><h2 class="vq">${es?`¿Cómo se <em>siente</em> tu parvada hoy?`:`How's your flock <em>feeling</em> today?`}</h2>
 <div class="vstage">${vibeHen(v)}<span class="vtip">${v.tip}</span></div>
 <div class="vwords">${VIBES.map(x=>`<button class="vword ${x.k===v.k?"on":""}" onclick="setVibe('${x.k}')">${x.k===v.k?OVAL:""}<span>${L(x.n)}</span></button>`).join("")}</div>
 <p class="vblurb">${L(v.b)}</p>
 ${v.sym?`<button class="btn" style="width:100%;margin-top:4px" onclick="TMP.symOpen=true;go('health');setTimeout(()=>{const el=document.getElementById('symPanel');if(el)el.scrollIntoView({behavior:'smooth'})},80)">🔍 ${es?"Revisar síntomas":"Check symptoms"}</button>`:done?"":`<button class="btn" style="width:100%;margin-top:4px" onclick="setVibe('${v.k}');toast('${es?"¡Anotado!":"Noted!"} ${v.e}')">${es?"Guardar el ánimo de hoy":"Save today's vibe"}</button>`}</div>`;}
function recRow(){ency();const v=VIBES[vibeIdx()];const es=S.lang==="es";
 const items=v.recs.map(id=>ENCY_ARTS.find(x=>x.a.id===id)).filter(Boolean);
 return `<div id="recRow"><div class="row" style="justify-content:space-between;margin:2px 0 8px"><h2 class="sec" style="margin:0">${es?"Para tu parvada hoy":"Fits your flock today"}</h2><button class="muted" style="font-weight:800" onclick="go('learn')">${es?"Ver todo":"See all"} ›</button></div>
 <div class="recs">${items.map(x=>{const words=artText(x.a).split(/\s+/).length/2;const mins=Math.max(1,Math.round(words/200));return `<button class="rec" onclick="go('learn','art:${x.a.id}')"><div class="rimg"><span>${x.a.e}</span>${S.bm&&S.bm[x.a.id]?'<i class="rbm">⭐</i>':""}</div><div class="rbody"><b>${esc(L(x.a.t))}</b><small>📖 ${mins} min · ${esc(L(x.ch.n))}</small><div class="rtags"><span>${L(v.n)}</span><span>${x.ch.e}</span></div></div></button>`;}).join("")}</div></div>`;}

function greet(){const h=new Date().getHours();const g=h<12?ux("gm"):h<18?ux("ga"):ux("ge");const es=S.lang==="es";
 return `<div class="greet2"><span class="gav">${S.flock[0]?henArt(S.flock[0],40):henSVG("buff",40)}</span><div style="flex:1;min-width:0"><small>${g}</small><h1>${S.name?esc(S.name):(es?"Criador":"Keeper")}</h1></div></div>`;}