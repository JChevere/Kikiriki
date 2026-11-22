
/* ================= HEALTH TRACKER ================= */
if(!Array.isArray(S.cases))S.cases=[];
const MOODS=[[1,"😵",{en:"Very sick",es:"Muy mal"}],[2,"😟",{en:"Poorly",es:"Mal"}],[3,"😐",{en:"So-so",es:"Regular"}],[4,"🙂",{en:"Better",es:"Mejor"}],[5,"😄",{en:"Bright & normal",es:"Alegre y normal"}]];
const ETYPES=[["med","💊",{en:"Medicine",es:"Medicina"}],["sup","🧪",{en:"Vitamin / supplement",es:"Vitamina / suplemento"}],["water","💧",{en:"Water / electrolytes",es:"Agua / electrolitos"}],["food","🥣",{en:"Food",es:"Comida"}],["ferm","🫙",{en:"Fermented / probiotic",es:"Fermentado / probiótico"}],["wound","🩹",{en:"Wound / eye care",es:"Heridas / ojos"}],["obs","🌡️",{en:"Check-up",es:"Revisión"}],["note","📝",{en:"Note",es:"Nota"}]];
const TRENDS=[["better","📈",{en:"Better",es:"Mejor"}],["same","➡️",{en:"Same",es:"Igual"}],["worse","📉",{en:"Worse",es:"Peor"}]];
const APP=[["none",{en:"Not eating",es:"No come"}],["low",{en:"Eating a little",es:"Come poco"}],["ok",{en:"Eating well",es:"Come bien"}]];
const DROP=[["ok",{en:"Normal",es:"Normales"}],["odd",{en:"Abnormal",es:"Anormales"}],["blood",{en:"Bloody",es:"Con sangre"}]];
const STAT=[["open","🩺",{en:"Ongoing",es:"En curso"}],["rec","🎉",{en:"Recovered",es:"Recuperada"}],["lost","🕊️",{en:"Passed away",es:"Falleció"}]];
const TT={
tracker:{en:"Health tracker",es:"Seguimiento de salud"},
trackerSub:{en:"Track every treatment: what you give, how much, and how she feels each day. Spot improvement or decline fast, and share the log with your vet.",es:"Sigue cada tratamiento: qué das, cuánto y cómo se siente cada día. Detecta mejoría o empeoramiento rápido y comparte el registro con tu veterinario."},
startTrack:{en:"Start tracking a problem",es:"Empezar seguimiento"},trackThis:{en:"Track this for a bird",es:"Dar seguimiento a un ave"},
noCases:{en:"No active cases. Healthy flock!",es:"Sin casos activos. ¡Parvada sana!"},
closed:{en:"Past cases",es:"Casos anteriores"},who:{en:"Who is sick?",es:"¿Quién está enferma?"},cond:{en:"Problem",es:"Problema"},other:{en:"Other / not sure",es:"Otro / no sé"},
customName:{en:"Describe it (optional)",es:"Descríbelo (opcional)"},planned:{en:"Planned treatment days (optional)",es:"Días de tratamiento planeados (opcional)"},
startDate:{en:"Start date",es:"Fecha de inicio"},create:{en:"Start tracking",es:"Empezar seguimiento"},
day:{en:"Day",es:"Día"},of:{en:"of",es:"de"},logToday:{en:"Add to the log",es:"Agregar al registro"},
type:{en:"What did you do?",es:"¿Qué hiciste?"},what:{en:"What exactly (product, food, care)",es:"Qué exactamente (producto, comida, cuidado)"},
whatPH:{en:"e.g. Corid 9.6% / scrambled egg / cleaned left eye with saline",es:"ej. Corid 9.6% / huevo revuelto / limpié ojo izquierdo con salina"},
dose:{en:"Amount / dose",es:"Cantidad / dosis"},dosePH:{en:"e.g. 2 tsp per gallon / 1 tbsp / 3 drops",es:"ej. 2 cdtas por galón / 1 cda / 3 gotas"},
feel:{en:"How does she feel?",es:"¿Cómo se siente?"},appetite:{en:"Appetite",es:"Apetito"},droppings:{en:"Droppings",es:"Heces"},trend:{en:"Compared to yesterday",es:"Comparado con ayer"},
notes:{en:"Notes",es:"Notas"},notesPH:{en:"Eyes, scabs, breathing, energy, anything you notice…",es:"Ojos, costras, respiración, energía, lo que notes…"},
saveEntry:{en:"Save to log · +2 🌽",es:"Guardar en el registro · +2 🌽"},log:{en:"Treatment & care log",es:"Registro de tratamiento y cuidados"},
noEntries:{en:"Nothing logged yet. Log each dose, meal and check-up.",es:"Aún no hay registros. Anota cada dosis, comida y revisión."},
moodChart:{en:"How she's been feeling",es:"Cómo se ha sentido"},copyVet:{en:"Copy summary for vet",es:"Copiar resumen para el veterinario"},
copied:{en:"Copied! Paste it in a text or email to your vet.",es:"¡Copiado! Pégalo en un mensaje o correo a tu veterinario."},
copyFail:{en:"Couldn't copy here. Select the text below and copy it.",es:"No se pudo copiar aquí. Selecciona el texto de abajo y cópialo."},
status:{en:"Status",es:"Estado"},openCare:{en:"Open care guide",es:"Abrir guía de cuidados"},
henPage:{en:"Health & journal",es:"Salud y diario"},herCases:{en:"Health cases",es:"Casos de salud"},herNotes:{en:"Her journal",es:"Su diario"},
habits:{en:"Good tracking habits",es:"Buenos hábitos de registro"},
habitsT:{en:"Log at the same times each day (morning and evening). Write down every product with its amount. Rate her mood honestly. Note her crop at night and her droppings in the morning. Photos on your phone with the date help too. If you see two 'worse' days in a row, call your vet.",es:"Anota a las mismas horas cada día (mañana y noche). Escribe cada producto con su cantidad. Califica su ánimo con honestidad. Revisa el buche en la noche y las heces en la mañana. Fotos con fecha en tu teléfono también ayudan. Si ves dos días seguidos 'peor', llama al veterinario."},
twoWorse:{en:"Two 'worse' entries in a row. Time to call your vet.",es:"Dos registros seguidos 'peor'. Es momento de llamar al veterinario."},
flockWide:{en:"Whole flock",es:"Toda la parvada"},tapHen:{en:"Tap a bird to see her health page and journal.",es:"Toca un ave para ver su página de salud y diario."}};
const tt=k=>L(TT[k])||k;
const condName=c=>{const x=CONDS.find(z=>z.id===c.cond);return x?L(x.n):(c.custom||tt("other"));};
const caseWho=c=>{if(!c.henId)return tt("flockWide");const h=S.flock.find(z=>z.id===c.henId);return h?h.name:"—";};
const caseDay=c=>Math.max(1,Math.floor((new Date(today()+"T00:00:00")-new Date(c.start+"T00:00:00"))/864e5)+1);
function caseAvatar(c,s=40){const h=c.henId&&S.flock.find(z=>z.id===c.henId);return h?henArt(h,s):`<span style="font-size:${s*0.7}px">🐔</span>`;}
function lastMood(c){for(let i=c.entries.length-1;i>=0;i--)if(c.entries[i].mood)return c.entries[i].mood;return null;}
function caseCard(c){const m=lastMood(c),st=STAT.find(x=>x[0]===c.status);const lt=c.entries.length?c.entries[c.entries.length-1].trend:null;const tr=TRENDS.find(x=>x[0]===lt);
 return `<button class="hen" style="width:100%;text-align:left" onclick="go('flock','case:${c.id}')">${caseAvatar(c,44)}<div class="info"><b>${esc(caseWho(c))}</b> <span class="stage" style="background:#FCEBE5;color:var(--red2)">${st[1]} ${L(st[2])}</span><div class="muted">${esc(condName(c))}</div><div style="font-size:13px;margin-top:2px">${tt("day")} ${caseDay(c)}${c.planned?` ${tt("of")} ${c.planned}`:""} · ${c.entries.length} 📝 ${m?MOODS[m-1][1]:""} ${tr?tr[1]:""}</div></div><span>›</span></button>`;}
function trackerSection(){const open=S.cases.filter(c=>c.status==="open"),done=S.cases.filter(c=>c.status!=="open");
 return `<div class="card"><h2>🩺 ${tt("tracker")}</h2><p class="muted" style="margin-top:0">${tt("trackerSub")}</p>${open.map(caseCard).join("")||`<p class="empty">${tt("noCases")}</p>`}
 <button class="btn" style="width:100%" onclick="startCase('')">＋ ${tt("startTrack")}</button>
 ${done.length?`<details class="sg" style="margin-top:10px"><summary><span>📁 ${tt("closed")} (${done.length})</span><span class="car">▾</span></summary><div style="padding:0 8px 8px">${done.slice().reverse().map(caseCard).join("")}</div></details>`:""}
 <details class="sg" style="margin-top:10px"><summary><span>💡 ${tt("habits")}</span><span class="car">▾</span></summary><p style="padding:0 12px 10px;margin:0;font-size:14px">${tt("habitsT")}</p></details></div>`;}
function startCase(cond,henId){TMP.nc={cond:cond||"",henId:henId||""};go("flock","newcase");}
function vNewCase(){const nc=TMP.nc||{cond:"",henId:""};
 const opts=CONDS.slice().sort((a,b)=>L(a.n).localeCompare(L(b.n),S.lang)).map(c=>`<option value="${c.id}" ${nc.cond===c.id?"selected":""}>${esc(L(c.n))}</option>`).join("");
 return `${backBtn("flock")}<div class="card"><h2>🩺 ${tt("startTrack")}</h2>
 <label class="muted">${tt("who")}</label><select class="in" id="ncWho" style="margin-bottom:8px"><option value="">${tt("flockWide")}</option>${S.flock.map(h=>`<option value="${h.id}" ${nc.henId===h.id?"selected":""}>${esc(h.name)}</option>`).join("")}</select>
 <label class="muted">${tt("cond")}</label><select class="in" id="ncCond" style="margin-bottom:8px"><option value="">${tt("other")}</option>${opts}</select>
 <label class="muted">${tt("customName")}</label><input class="in" id="ncCustom" maxlength="60" style="margin-bottom:8px">
 <div class="grid2"><div><label class="muted">${tt("startDate")}</label><input class="in" type="date" id="ncStart" value="${today()}" max="${today()}"></div><div><label class="muted">${tt("planned")}</label><input class="in" type="number" id="ncPlan" min="1" max="120" placeholder="5"></div></div>
 ${S.flock.length?"":`<p class="muted" style="font-size:13px">💡 ${S.lang==="es"?"Agrega tus aves en Mi Parvada para seguir a cada una por nombre.":"Add your birds in My Flock to track each one by name."}</p>`}
 <button class="btn" style="width:100%;margin-top:12px" onclick="createCase()">${tt("create")}</button></div>`;}
function createCase(){const c={id:Date.now().toString(36),henId:val("ncWho"),cond:val("ncCond"),custom:val("ncCustom").trim(),start:val("ncStart")||today(),planned:parseInt(val("ncPlan"))||null,status:"open",entries:[]};
 S.cases.push(c);petBoost("case");save();addXP(5,"🩺");TMP.ce={};go("flock","case:"+c.id);}
function setCe(k,v){TMP.ce=TMP.ce||{};TMP.ce[k]=TMP.ce[k]===v?null:v;const keep={w:val("ceWhat"),d:val("ceDose"),n:val("ceNote")};render();setVal("ceWhat",keep.w);setVal("ceDose",keep.d);setVal("ceNote",keep.n);}
function addEntry(id){const c=S.cases.find(x=>x.id===id);if(!c)return;const ce=TMP.ce||{};
 const e={t:new Date().toISOString(),type:ce.type||"note",what:val("ceWhat").trim(),dose:val("ceDose").trim(),mood:ce.mood||null,app:ce.app||null,drop:ce.drop||null,trend:ce.trend||null,note:val("ceNote").trim()};
 if(!e.what&&!e.note&&!e.mood&&!e.trend){toast("✍️");return;}
 c.entries.push(e);if(S.pet){S.pet.happy=Math.min(100,S.pet.happy+(e.mood>=4||e.trend==="better"?15:10));petSay(S.lang==="es"?`Cuidaste a ${caseWho(c)} y ${S.pet.name} lo sintió. ${e.mood>=4||e.trend==="better"?"¡Está más contento!":"Se siente un poco mejor."}`:`You cared for ${caseWho(c)}, and ${S.pet.name} felt it. ${e.mood>=4||e.trend==="better"?"Much happier!":"Feeling a little better."}`,"💞");}save();TMP.ce={};addXP(2,"📝");render();}
function delEntry(id,i){const c=S.cases.find(x=>x.id===id);const k=id+"_"+i;if(TMP.delE===k){c.entries.splice(i,1);TMP.delE=null;save();}else TMP.delE=k;render();}
function setStatus(id,s){const c=S.cases.find(x=>x.id===id);c.status=s;if(s==="rec"){c.recAt=Date.now();if(S.pet){S.pet.happy=100;petSay(S.lang==="es"?`¡${caseWho(c)} se recuperó! ${S.pet.name} está celebrando. 🎉`:`${caseWho(c)} recovered! ${S.pet.name} is celebrating. 🎉`,"🎉");}}else if(s==="lost"&&S.pet){petSay(S.lang==="es"?`Lo siento mucho por ${caseWho(c)}. ${S.pet.name} se queda cerca para acompañarte. 💛`:`So sorry about ${caseWho(c)}. ${S.pet.name} is staying close to keep you company. 💛`,"🕊️");}save();if(s==="rec"){feathers();addXP(10,"🎉");}render();}
function caseText(c){const L2=x=>L(x);let o=`Kikirikí health log\n${caseWho(c)}: ${condName(c)}\n${tt("startDate")}: ${c.start} · ${tt("day")} ${caseDay(c)}${c.planned?" "+tt("of")+" "+c.planned:""} · ${L2(STAT.find(x=>x[0]===c.status)[2])}\n\n`;
 c.entries.forEach(e=>{const d=new Date(e.t);const ty=ETYPES.find(x=>x[0]===e.type);o+=`• ${d.toLocaleString(S.lang,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})} ${ty?L2(ty[2]):""}${e.what?": "+e.what:""}${e.dose?" ("+e.dose+")":""}${e.mood?" | "+L2(MOODS[e.mood-1][2]):""}${e.app?" | "+tt("appetite")+": "+L2(APP.find(x=>x[0]===e.app)[1]):""}${e.drop?" | "+tt("droppings")+": "+L2(DROP.find(x=>x[0]===e.drop)[1]):""}${e.trend?" | "+L2(TRENDS.find(x=>x[0]===e.trend)[2]):""}${e.note?" | "+e.note:""}\n`;});
 return o;}
function copyVet(id,btn){const c=S.cases.find(x=>x.id===id);const tx=caseText(c);const box=document.getElementById("vetTxt");
 try{navigator.clipboard.writeText(tx).then(()=>toast("📋 "+tt("copied")),()=>{box.style.display="block";box.value=tx;toast(tt("copyFail"));});}catch(e){box.style.display="block";box.value=tx;toast(tt("copyFail"));}}
function vCase(id){const c=S.cases.find(x=>x.id===id);if(!c)return backBtn("flock");const ce=TMP.ce||{};
 const ch=(k,arr,lab)=>`<div class="chips" style="margin:4px 0 10px">${arr.map(a=>`<button class="chip ${ce[k]===a[0]?"on":""}" onclick="setCe('${k}','${a[0]}')">${a.length>2?a[1]+" "+L(a[2]):L(a[1])}</button>`).join("")}</div>`;
 const moods=c.entries.filter(e=>e.mood).slice(-14);
 const chart=moods.length?`<div class="chart" style="height:80px">${moods.map(e=>`<div style="height:${e.mood/5*100}%;background:${["#D2402F","#EB7A3C","#E3A21A","#8DBB45","#3E9B4F"][e.mood-1]}"><span>${MOODS[e.mood-1][1]}</span></div>`).join("")}</div><div class="cl"><span>${new Date(moods[0].t).toLocaleDateString(S.lang,{month:"short",day:"numeric"})}</span><span>${new Date(moods[moods.length-1].t).toLocaleDateString(S.lang,{month:"short",day:"numeric"})}</span></div>`:`<p class="muted">${S.lang==="es"?"Califica su ánimo en cada registro para ver la gráfica.":"Rate her mood in each entry to see the chart."}</p>`;
 const tr=c.entries.filter(e=>e.trend).slice(-2);const warn=tr.length===2&&tr.every(e=>e.trend==="worse");
 const ents=c.entries.map((e,i)=>({e,i})).reverse().map(({e,i})=>{const ty=ETYPES.find(x=>x[0]===e.type)||ETYPES[7];const d=new Date(e.t);
  return `<div class="note"><div class="row" style="justify-content:space-between"><small>${d.toLocaleString(S.lang,{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}</small><button class="muted" onclick="delEntry('${c.id}',${i})">${TMP.delE===c.id+"_"+i?t("sure"):"✕"}</button></div>
  <div><b>${ty[1]} ${L(ty[2])}</b>${e.what?`: ${esc(e.what)}`:""}${e.dose?` <span class="pill">${esc(e.dose)}</span>`:""}</div>
  <div style="font-size:13.5px">${e.mood?MOODS[e.mood-1][1]+" "+L(MOODS[e.mood-1][2]):""}${e.app?" · 🍽️ "+L(APP.find(x=>x[0]===e.app)[1]):""}${e.drop?" · 💩 "+L(DROP.find(x=>x[0]===e.drop)[1]):""}${e.trend?" · "+TRENDS.find(x=>x[0]===e.trend)[1]+" "+L(TRENDS.find(x=>x[0]===e.trend)[2]):""}</div>${e.note?`<div>${esc(e.note)}</div>`:""}</div>`;}).join("")||`<p class="empty">${tt("noEntries")}</p>`;
 return `${backBtn("flock")}<div class="card"><div class="row">${caseAvatar(c,56)}<div style="flex:1"><h2 style="margin:0">${esc(caseWho(c))}</h2><div class="muted">${esc(condName(c))}${c.custom&&c.cond?" · "+esc(c.custom):""}</div><div style="font-weight:900">${tt("day")} ${caseDay(c)}${c.planned?` ${tt("of")} ${c.planned}`:""}</div></div></div>
 ${c.planned?`<div class="bar" style="margin-top:8px"><i style="width:${Math.min(100,caseDay(c)/c.planned*100)}%"></i></div>`:""}
 <p class="muted" style="margin:10px 0 4px">${tt("status")}</p><div class="chips">${STAT.map(s=>`<button class="chip ${c.status===s[0]?"on":""}" onclick="setStatus('${c.id}','${s[0]}')">${s[1]} ${L(s[2])}</button>`).join("")}</div>
 ${c.cond?`<button class="btn alt sm" style="margin-top:10px" onclick="TMP.libQ='';TMP.libCat='all';TMP.libOpen=true;TMP.focusCond='${c.cond}';go('health')">📖 ${tt("openCare")}</button>`:""}</div>
 ${warn?`<div class="vetwhen" style="margin-bottom:14px"><b>🚩 ${tt("twoWorse")}</b></div>`:""}
 <div class="card"><h3>🚫 ${S.lang==="es"?"Retiro de huevos":"Egg withdrawal"}</h3><p class="muted" style="margin-top:0;font-size:13.5px">${S.lang==="es"?"Si un medicamento indica no comer los huevos, pon la fecha. Aparecerá en 'Necesita atención' hasta entonces.":"If a medicine says not to eat the eggs, set the date. It shows in 'Needs attention' until then."}</p><div class="row"><input class="in" type="date" id="wdDate" value="${esc(c.wdUntil||"")}" style="flex:1"><button class="btn sm" onclick="setWd('${c.id}')">${t("saveBtn")}</button></div>${c.wdUntil?`<p style="margin:8px 0 0;font-weight:800">${daysAgo(c.wdUntil)<=0?"🚫 ":"✅ "}${S.lang==="es"?"Huevos seguros desde":"Eggs safe from"} ${fmtD(c.wdUntil)}</p>`:""}</div>
 <div class="card"><h3>📊 ${tt("moodChart")}</h3>${chart}</div>
 <div class="card"><h2>✍️ ${tt("logToday")}</h2>
  <p style="font-weight:900;margin:0">${tt("type")}</p>${ch("type",ETYPES)}
  <label class="muted">${tt("what")}</label><input class="in" id="ceWhat" maxlength="120" placeholder="${esc(tt("whatPH"))}" style="margin-bottom:8px">
  <label class="muted">${tt("dose")}</label><input class="in" id="ceDose" maxlength="60" placeholder="${esc(tt("dosePH"))}" style="margin-bottom:10px">
  <p style="font-weight:900;margin:0">${tt("feel")}</p><div class="chips" style="margin:4px 0 10px">${MOODS.map(m=>`<button class="chip ${ce.mood===m[0]?"on":""}" onclick="setCe('mood',${m[0]})" title="${esc(L(m[2]))}" style="font-size:20px;padding:4px 10px">${m[1]}</button>`).join("")}</div>
  <p style="font-weight:900;margin:0">${tt("appetite")}</p>${ch("app",APP)}
  <p style="font-weight:900;margin:0">${tt("droppings")}</p>${ch("drop",DROP)}
  <p style="font-weight:900;margin:0">${tt("trend")}</p>${ch("trend",TRENDS)}
  <label class="muted">${tt("notes")}</label><textarea class="in" id="ceNote" rows="2" maxlength="400" placeholder="${esc(tt("notesPH"))}"></textarea>
  <button class="btn" style="width:100%;margin-top:10px" onclick="addEntry('${c.id}')">${tt("saveEntry")}</button></div>
 <div class="card"><div class="row" style="justify-content:space-between"><h2 style="margin:0">📒 ${tt("log")}</h2></div>
  <button class="btn alt sm" style="margin:10px 0" onclick="copyVet('${c.id}',this)">📤 ${tt("copyVet")}</button><textarea id="vetTxt" class="in" rows="6" style="display:none;margin-bottom:10px" readonly></textarea>${ents}</div>
 <p class="disc">${t("notDoc")}</p>`;}
function vHen(id){const h=S.flock.find(x=>x.id===id);if(!h)return backBtn("flock");const w=ageWeeks(h.hatch),st=stageOf(w);
 const cs=S.cases.filter(c=>c.henId===id);const ns=S.notes.filter(n=>n.who===h.name).slice().reverse();
 if(TMP.cedEdit===id&&TMP.cl){const w2=ageWeeks(h.hatch);return `${backBtn("flock")}<div class="card"><h2 style="margin-top:0">🎨 ${esc(h.name)}</h2>${(TMP.cedR="render",charEditor({ageKind:w2!=null&&w2<6?"chick":w2!=null&&w2<16?"pullet":"hen"}))}<div class="row" style="gap:8px;margin-top:12px"><button class="btn" style="flex:1" onclick="henEditSave('${id}')">${t("saveBtn")}</button><button class="btn alt" style="flex:1" onclick="henEditCancel()">${t("cancel")}</button></div></div>`;}
 return `${backBtn("flock")}<div class="card" style="text-align:center">${henArt(h,90,"happy").replace('class="kart ','style="margin:0 auto;display:block" class="kart ')}<h2 style="margin:6px 0 0">${esc(h.name)}</h2><button class="btn alt sm" style="margin:8px auto 0" onclick="henEditOpen('${id}')">🎨 ${S.lang==="es"?"Personalizar look":"Customize look"}</button><div class="muted">${esc(h.breed||"")}${w!=null?" · "+ageText(w):""}</div>${st?`<p style="margin:8px 0 0"><span class="stage">${L(st.n)}</span></p><p style="font-size:14px;margin:6px 0 0">💡 ${L(st.t)}</p>`:""}</div>
 ${(()=>{const es=S.lang==="es";const ld=lastEggDays(id);return `<div class="card"><div class="hstat3"><div><small>${es?"Últimos 30 días":"Last 30 days"}</small><b>${rangeEggs(30,id)}</b></div><div><small>${es?"Tasa":"Laying rate"}</small><b>${Math.round(henDays(30,id)/30*100)}%</b></div><div><small>${es?"Total":"All time"}</small><b>${Object.keys(S.eggLog).reduce((a,k)=>a+(dayLog(k)[id]||0),0)}</b></div></div><p class="muted" style="margin:6px 0 10px">${es?"Último huevo":"Last egg"}: ${ld==null?"—":ld===0?(es?"hoy":"today"):ld+(es?" días":" days ago")}</p>
 <p class="muted" style="margin:0 0 4px">${es?"Estado":"Status"}</p><div class="chips" style="margin-bottom:10px">${HSTAT.map(x=>`<button class="chip ${(h.status||"laying")===x[0]?"on":""}" onclick="S.flock.find(z=>z.id==='${id}').status='${x[0]}';save();render()">${x[1]} ${L(x[2])}</button>`).join("")}</div>
 <p class="muted" style="margin:0 0 4px">${es?"Color del huevo":"Egg color"}</p><div class="chips">${Object.entries(EGGC).map(([k,v])=>`<button class="chip ${(h.egg||guessEggColor(h.breed))===k?"on":""}" onclick="S.flock.find(z=>z.id==='${id}').egg='${k}';save();render()"><i class="hegg" style="background:${v[0]};width:11px;height:14px;display:inline-block;vertical-align:-2px"></i> ${L(v[1])}</button>`).join("")}</div>
 <button class="btn sm" style="margin-top:12px" onclick="logEgg('${id}',1)">＋1 🥚 ${es?"de":"from"} ${esc(h.name)}</button></div>`;})()}
 <div class="card"><h2>🩺 ${tt("herCases")}</h2>${cs.slice().reverse().map(caseCard).join("")||`<p class="empty">${tt("noCases")}</p>`}<button class="btn" style="width:100%" onclick="startCase('','${id}')">＋ ${tt("startTrack")}</button></div>
 <div class="card"><h2>📓 ${tt("herNotes")}</h2><textarea class="in" id="hnText" rows="2" maxlength="400" placeholder="${esc(t("notePH"))}"></textarea>
 <button class="btn sm" style="margin:8px 0 12px" onclick="addHenNote('${id}')">${t("addNote")} · +3 🌽</button>${ns.map(n=>`<div class="note"><small>${esc(n.d)}</small><div>${esc(n.t)}</div></div>`).join("")||`<p class="empty">${t("noNotes")}</p>`}</div>`;}
function addHenNote(id){const h=S.flock.find(x=>x.id===id);const tx=val("hnText").trim();if(!tx)return;S.notes.push({d:today(),who:h.name,t:tx});petBoost("note");save();addXP(3,"📓");render();}
