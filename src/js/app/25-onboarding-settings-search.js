
/* ================= UX LAYER: onboarding, Today, settings, search ================= */
const UX={
gm:{en:"Good morning",es:"Buenos días"},ga:{en:"Good afternoon",es:"Buenas tardes"},ge:{en:"Good evening",es:"Buenas noches"},
today:{en:"Today",es:"Hoy"},tasksDone:{en:"done",es:"hechas"},allDone:{en:"All done today! Your flock thanks you. +10 🌽",es:"¡Todo listo hoy! Tu parvada te lo agradece. +10 🌽"},
tEggs:{en:"Log today's eggs",es:"Registrar los huevos de hoy"},tCheck:{en:"30-second health check",es:"Revisión de salud de 30 segundos"},tWater:{en:"Fresh water & full feeder",es:"Agua fresca y comedero lleno"},
tLock:{en:"Lock the coop at dusk",es:"Cerrar el gallinero al anochecer"},tBrood:{en:"Brooder check",es:"Revisar la criadora"},tAdd:{en:"Add your birds",es:"Agrega tus aves"},
tRead:{en:"Read: Getting Started",es:"Lee: Primeros pasos"},tRules:{en:"Check your local chicken rules",es:"Revisa las reglas locales sobre gallinas"},tSize:{en:"Size your coop with the calculator",es:"Calcula tu gallinero con la calculadora"},
tCare:{en:"Log care for",es:"Registrar cuidados de"},sick:{en:"needs attention",es:"necesita atención"},go:{en:"Go",es:"Ir"},
settings:{en:"Settings",es:"Ajustes"},search:{en:"Search",es:"Buscar"},profile:{en:"Profile",es:"Perfil"},yourName:{en:"Your name (optional)",es:"Tu nombre (opcional)"},
journey:{en:"Your chicken journey",es:"Tu etapa con las gallinas"},jNone:{en:"Planning, no birds yet",es:"Planeando, aún sin aves"},jChicks:{en:"I have chicks",es:"Tengo pollitos"},jHens:{en:"I have grown hens",es:"Tengo gallinas adultas"},jBoth:{en:"Chicks and hens",es:"Pollitos y gallinas"},
language:{en:"Language",es:"Idioma"},display:{en:"Display",es:"Pantalla"},textSize:{en:"Text size",es:"Tamaño de texto"},tsN:{en:"Normal",es:"Normal"},tsL:{en:"Large",es:"Grande"},tsX:{en:"Extra large",es:"Muy grande"},
region:{en:"Region",es:"Región"},hemi:{en:"Hemisphere (for seasonal tips)",es:"Hemisferio (para consejos de temporada)"},north:{en:"Northern",es:"Norte"},south:{en:"Southern",es:"Sur"},
game:{en:"Virtual chick game",es:"Juego del pollito virtual"},on:{en:"On",es:"Encendido"},off:{en:"Off",es:"Apagado"},
backup:{en:"Backup & restore",es:"Respaldo y restauración"},backupSub:{en:"Your data lives only in this browser. Copy a backup code and keep it somewhere safe (notes app, email to yourself). Paste it here on any device to restore.",es:"Tus datos viven solo en este navegador. Copia un código de respaldo y guárdalo en un lugar seguro (notas, correo a ti mismo). Pégalo aquí en cualquier dispositivo para restaurar."},
copyCode:{en:"Copy backup code",es:"Copiar código de respaldo"},restore:{en:"Restore from code",es:"Restaurar desde código"},pastePH:{en:"Paste your backup code here…",es:"Pega aquí tu código de respaldo…"},
restored:{en:"Restored! Welcome back.",es:"¡Restaurado! Bienvenido de nuevo."},badCode:{en:"That code didn't work. Check that you pasted all of it.",es:"Ese código no funcionó. Revisa que lo pegaste completo."},copiedB:{en:"Backup code copied!",es:"¡Código copiado!"},
about:{en:"About",es:"Acerca de"},danger:{en:"Erase everything",es:"Borrar todo"},
obWelcome:{en:"Welcome to Kikirikí",es:"Bienvenido a Kikirikí"},obSub:{en:"Your happy-flock guide: health help, daily care, an encyclopedia and a little pixel chick, all in your pocket.",es:"Tu guía para un gallinero feliz: ayuda de salud, cuidados diarios, una enciclopedia y un pollito pixelado, todo en tu bolsillo."},
obName:{en:"What should we call you?",es:"¿Cómo te llamamos?"},obJourney:{en:"Where are you in your chicken journey?",es:"¿En qué etapa estás con las gallinas?"},obGame:{en:"Want a virtual chick?",es:"¿Quieres un pollito virtual?"},
obGameSub:{en:"It grows as you care for your real flock: logging eggs, health checks and journal notes feed it. You can turn it off anytime.",es:"Crece mientras cuidas tu parvada real: registrar huevos, revisiones y notas lo alimentan. Puedes apagarlo cuando quieras."},
yes:{en:"Yes, please!",es:"¡Sí, por favor!"},no:{en:"No thanks",es:"No, gracias"},next:{en:"Next",es:"Siguiente"},skip:{en:"Skip",es:"Omitir"},letsGo:{en:"Let's go! 🐔",es:"¡Vamos! 🐔"},
newHere:{en:"New to chickens? Start here",es:"¿Nuevo con gallinas? Empieza aquí"},newHereSub:{en:"The Getting Started chapter covers laws, costs, choosing birds and your first week.",es:"El capítulo Primeros pasos cubre leyes, costos, cómo elegir aves y tu primera semana."},
seasonSouth:{en:"Southern Hemisphere seasons.",es:"Estaciones del hemisferio sur."},rankCard:{en:"Your keeper rank",es:"Tu rango de criador"}};
const ux=k=>L(UX[k])||k;
function applyDisplay(){try{document.body.style.zoom=S.ts||1;document.documentElement.dataset.theme=S.theme||"farm";const m=document.querySelector('meta[name=theme-color]');if(m)m.content=getComputedStyle(document.documentElement).getPropertyValue("--card").trim()||"#FFFDF9";}catch(e){}}
/* ---------- Onboarding ---------- */
function vOnboard(){const st=TMP.ob||0;if(st===0)return fmWelcome();const dots=`<div class="obdots">${[0,1,2,3,4].map(i=>`<i class="${i===st?"on":""}"></i>`).join("")}</div>`;
 const henBig=`<div style="display:flex;justify-content:center">${drawHen("buff",{size:130,mood:"excited"})}</div>`;
 let body="";
 if(st===0)body=`${henBig}<h1 class="obh">${ux("obWelcome")}</h1><p class="obp">${ux("obSub")}</p><p class="muted" style="margin:14px 0 6px;font-weight:800">${ux("language")}</p><div class="chips" style="justify-content:center"><button class="chip ${S.lang==="en"?"on":""}" onclick="setLang('en')">🇺🇸 English</button><button class="chip ${S.lang==="es"?"on":""}" onclick="setLang('es')">🇲🇽 Español</button></div>`;
 if(st===1)body=`<div style="font-size:60px">👋</div><h1 class="obh">${ux("obName")}</h1><input class="in" id="obName" maxlength="24" value="${esc(S.name||"")}" placeholder="${S.lang==="es"?"Tu nombre":"Your name"}" style="text-align:center;font-size:18px">`;
 if(st===2)body=`<div style="font-size:60px">🧭</div><h1 class="obh">${ux("obJourney")}</h1><div class="obopts">${[["none","🤔","jNone"],["chicks","🐣","jChicks"],["hens","🐔","jHens"],["both","🐣🐔","jBoth"]].map(o=>`<button class="obopt ${(S.prof&&S.prof.has)===o[0]?"on":""}" onclick="S.prof={has:'${o[0]}'};save();render()"><span>${o[1]}</span>${ux(o[2])}</button>`).join("")}</div>`;
 if(st===3)body=obFlockStep();
 if(st===4)body=`<div style="font-size:60px">🐣</div><h1 class="obh">${ux("obGame")}</h1><p class="obp">${ux("obGameSub")}</p><div class="obopts"><button class="obopt ${S.petOff===false?"on":""}" onclick="S.petOff=false;save();render()"><span>💛</span>${ux("yes")}</button><button class="obopt ${S.petOff===true?"on":""}" onclick="S.petOff=true;save();render()"><span>🙈</span>${ux("no")}</button></div>`;
 const canNext=st!==2||(S.prof&&S.prof.has);
 return `<div class="onboard">${dots}<div class="obbody">${body}</div><div class="obnav">${st>0?`<button class="btn alt" onclick="obStep(-1)">←</button>`:"<span></span>"}<button class="btn" style="flex:1;${canNext?"":"opacity:.5"}" onclick="${canNext?"obStep(1)":""}">${st===4?ux("letsGo"):st===3&&!(TMP.obHens||[]).length?(S.lang==="es"?"Omitir por ahora":"Skip for now"):ux("next")}</button></div>${st===1?`<button class="muted obskip" onclick="obStep(1)">${ux("skip")}</button>`:""}</div>`;}
function obStep(d){if((TMP.ob||0)===1){const v=val("obName").trim();S.name=v.slice(0,24);}let n=(TMP.ob||0)+d;if(n===3&&(S.prof&&S.prof.has)==="none")n+=d;if(n>4){obCommit();S.onb=1;if(S.petOff==null)S.petOff=false;save();TMP.ob=0;go("home");feathers();return;}TMP.ob=Math.max(0,n);save();render();}
/* ---------- Today ---------- */
function todayTasks(){const td=today();const has=(S.prof&&S.prof.has)||"hens";const T=[];const tk=(S.tk&&S.tk.d===td)?S.tk.v:{};
 const man=(id,e,n,extra)=>T.push({id,e,n,done:!!tk[id],manual:1,extra});
 if(has==="none"){const rd=ENCY_ARTS?ENCY_ARTS.some(x=>x.ch.id==="ch-start"&&isRead(x.a.id)):false;ency();
  T.push({id:"read",e:"📖",n:ux("tRead"),done:ENCY_ARTS.some(x=>x.ch.id==="ch-start"&&isRead(x.a.id)),act:"go('learn','enc:ch-start')"});man("rules","⚖️",ux("tRules"));T.push({id:"size",e:"📐",n:ux("tSize"),done:!!tk.size,act:"S.tk={d:today(),v:Object.assign({},(S.tk&&S.tk.d===today())?S.tk.v:{},{size:1})};save();go('learn','tools')"});return T;}
 if(!S.flock.length)T.push({id:"add",e:"🐔",n:ux("tAdd"),done:false,act:"TMP.addOpen=true;TMP.ft='birds';go('flock')"});
 if(has!=="chicks")T.push({id:"eggs",e:"🥚",n:ux("tEggs"),done:(S.eggs[td]||0)>0,act:"egg(1)",btn:"+1 🥚"});
 T.push({id:"check",e:"✅",n:ux("tCheck"),done:!!S.checks[td],act:"go('home','check')"});
 man("water","💧",ux("tWater"));
 const wk=ageWeeks(S.hatch);if(has==="chicks"||has==="both"||(wk!=null&&wk<8)){const w=(wk==null?0:wk)+1;const f=w>6?null:Math.max(70,95-5*(w-1));man("brood","🌡️",ux("tBrood"),wk==null?(S.lang==="es"?"Pon la fecha de nacimiento en Aprende → Pollitos para ver la temperatura correcta":"Set the hatch date in Learn → Chick care to see the right temperature"):f?`${f}°F / ${Math.round((f-32)*5/9)}°C · ${S.lang==="es"?"cama seca, cloacas limpias":"dry bedding, clean vents"}`:(S.lang==="es"?"cama seca, agua limpia":"dry bedding, clean water"));}
 (S.cases||[]).filter(c=>c.status==="open").forEach(c=>{const did=c.entries.some(e=>e.t.slice(0,10)===td||dstr(new Date(e.t))===td);T.push({id:"case-"+c.id,e:"🩺",n:`${ux("tCare")} ${caseWho(c)}`,extra:condName(c)+` · ${tt("day")} ${caseDay(c)}${c.planned?" "+tt("of")+" "+c.planned:""}`,done:did,act:`go('flock','case:${c.id}')`});});
 man("lock","🌙",ux("tLock"));return T;}
function toggleTask(id){const td=today();if(!S.tk||S.tk.d!==td)S.tk={d:td,v:{}};S.tk.v[id]=!S.tk.v[id];save();checkAllDone();render();}
function checkAllDone(){const T=todayTasks();if(T.length&&T.every(x=>x.done)&&S.tkB!==today()){S.tkB=today();S.xp+=10;save();feathers();toast("🎉 "+ux("allDone"));}}
function todayCard(){const T=todayTasks();const d=T.filter(x=>x.done).length;const pct=T.length?d/T.length:0;const C=2*Math.PI*22;
 return `<div class="card today"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2 style="margin:0">📋 ${ux("today")}</h2><div class="ring"><svg viewBox="0 0 52 52" width="52" height="52"><circle cx="26" cy="26" r="22" fill="none" stroke="#F2E6D3" stroke-width="6"/><circle cx="26" cy="26" r="22" fill="none" stroke="${pct===1?"#3E9B4F":"#F4B731"}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-pct)}" transform="rotate(-90 26 26)"/></svg><b>${d}/${T.length}</b></div></div>
 ${T.map(x=>`<div class="task ${x.done?"done":""}"><button class="tcheck" aria-label="toggle" onclick="${x.manual?`toggleTask('${x.id}')`:(x.done?"":x.act)}">${x.done?"✓":""}</button><div class="tinfo" ${x.act&&!x.manual?`onclick="${x.act}" style="cursor:pointer"`:x.manual?`onclick="toggleTask('${x.id}')" style="cursor:pointer"`:""}><b>${x.e} ${esc(x.n)}</b>${x.extra?`<small>${esc(x.extra)}</small>`:""}</div>${x.btn&&!x.manual?`<button class="btn sm" onclick="${x.act}">${x.btn}</button>`:x.act&&!x.done&&!x.manual?`<button class="btn alt sm" onclick="${x.act}">${ux("go")} ›</button>`:""}</div>`).join("")}
 ${pct===1?`<p class="done" style="text-align:center;margin:8px 0 0">🎉 ${ux("allDone").replace(" +10 🌽","")}</p>`:""}</div>`;}
function alertsHTML(){const sick=[];let o="";
 sick.forEach(x=>{o+=`<button class="alert" onclick="go('flock','case:${x.c.id}')">${caseAvatar(x.c,34)}<span style="flex:1;text-align:left"><b>${esc(caseWho(x.c))} ${ux("sick")}</b><br><small>${esc(condName(x.c))} · ${MOODS[x.m-1][1]} ${L(MOODS[x.m-1][2])}</small></span><span>›</span></button>`;});
 if((S.prof&&S.prof.has)==="none")o+=`<button class="alert info" onclick="go('learn','enc:ch-start')"><span style="font-size:28px">🚀</span><span style="flex:1;text-align:left"><b>${ux("newHere")}</b><br><small>${ux("newHereSub")}</small></span><span>›</span></button>`;
 return o;}
/* ---------- Search page ---------- */
function vSearch(){return `<h2 class="sec">🔍 ${ux("search")}</h2><input class="search big" id="gSearch" placeholder="🔎 ${esc(at("searchAll"))}" value="${esc(TMP.acQ||"")}" oninput="TMP.acQ=this.value;document.getElementById('gRes').innerHTML=searchHTML()" autofocus>
 <div id="gRes" style="margin-top:10px">${searchHTML()}</div>
 ${(TMP.acQ||"").trim()?"":`<div class="card"><p class="muted" style="margin:0 0 8px">${S.lang==="es"?"Búsquedas populares":"Popular searches"}</p><div class="chips">${(S.lang==="es"?["ácaros","viruela","huevo retenido","aguacate","calor","muda","coccidiosis","pollitos","cloquera","gallinero"]:["mites","fowlpox","egg binding","avocado","heat","molt","coccidiosis","chicks","broody","coop"]).map(q=>`<button class="chip" onclick="TMP.acQ='${q}';render()">${q}</button>`).join("")}</div></div>`}`;}
/* ---------- Settings ---------- */
function vSettings(){const seg=(cur,opts,fn)=>`<div class="seg">${opts.map(o=>`<button class="${cur===o[0]?"on":""}" onclick="${fn}('${o[0]}')">${o[1]}</button>`).join("")}</div>`;
 return `<h2 class="sec">⚙️ ${ux("settings")}</h2>
 <div class="card"><h3>👤 ${ux("profile")}</h3><label class="muted">${ux("yourName")}</label><input class="in" aria-label="${S.lang==="es"?"Tu nombre":"Your name"}" id="stName" maxlength="24" value="${esc(S.name||"")}" onchange="S.name=this.value.slice(0,24);save()" style="margin-bottom:10px">
 <label class="muted" for="stCoop">${S.lang==="es"?"Nombre del gallinero":"Coop name"}</label><input class="in" id="stCoop" maxlength="30" value="${esc(S.coop||"")}" placeholder="${S.lang==="es"?"Gallinero":"Backyard Coop"}" onchange="S.coop=this.value.trim();save()" style="margin-bottom:10px">
 <label class="muted">${ux("journey")}</label><select class="in" aria-label="${S.lang==="es"?"Tu experiencia":"Your chicken journey"}" onchange="S.prof={has:this.value};save();render()">${[["none","jNone"],["chicks","jChicks"],["hens","jHens"],["both","jBoth"]].map(o=>`<option value="${o[0]}" ${((S.prof&&S.prof.has)||"hens")===o[0]?"selected":""}>${ux(o[1])}</option>`).join("")}</select></div>
 <div class="card"><h3>🌐 ${ux("language")}</h3>${seg(S.lang,[["en","🇺🇸 English"],["es","🇲🇽 Español"]],"setLang")}</div>
 
 <div class="card"><h3>🔠 ${ux("display")}</h3><p class="muted" style="margin:0 0 6px">${ux("textSize")}</p>${seg(String(S.ts||1),[["1",ux("tsN")],["1.12",ux("tsL")],["1.25",ux("tsX")]],"setTS")}</div>
 <div class="card"><h3>🌎 ${ux("region")}</h3><p class="muted" style="margin:0 0 6px">${ux("hemi")}</p>${seg(S.hemi||"N",[["N",ux("north")],["S",ux("south")]],"setHemi")}</div>
 <div class="card"><h3>🐣 ${ux("game")}</h3>${seg(S.petOff?"off":"on",[["on",ux("on")],["off",ux("off")]],"setGame")}</div>
 ${installCard()}${safeCard()}<details class="card sg"><summary><span>📋 ${S.lang==="es"?"Copia como texto (avanzado)":"Backup as text code (advanced)"}</span><span class="car">▾</span></summary><div style="padding:0 4px 8px"><p class="muted" style="margin-top:0;font-size:14px">${ux("backupSub")}</p>
 <button class="btn sm" onclick="copyBackup()">📋 ${ux("copyCode")}</button><textarea class="in" id="bkOut" rows="3" readonly style="display:none;margin-top:8px;font-size:11px"></textarea>
 <textarea class="in" id="bkIn" rows="3" placeholder="${esc(ux("pastePH"))}" style="margin-top:10px;font-size:12px"></textarea><button class="btn alt sm" style="margin-top:6px" onclick="restoreBackup()">♻️ ${ux("restore")}</button></div></details>
 <div class="card"><h3>ℹ️ ${ux("about")}</h3><p style="margin-top:0;font-size:14px">Kikirikí v2 · ${t("notVet")}</p><p style="font-size:14px">🔒 ${t("dataNote")}</p><button class="btn alt sm" onclick="go('learn','src')">📜 ${t("mSrc")}</button>
 <p style="margin-top:14px"><button class="btn alt sm" onclick="resetAll(this)">🗑️ ${ux("danger")}</button></p></div>`;}
function setTS(v){S.ts=parseFloat(v)||1;save();applyDisplay();render();}
function setHemi(v){S.hemi=v;save();render();}
function setGame(v){S.petOff=v==="off";save();render();}
function backupCode(){return btoa(unescape(encodeURIComponent(JSON.stringify(Object.assign({},S,{tab:"home",sub:null})))));}
function copyBackup(){const c=backupCode();const box=document.getElementById("bkOut");box.style.display="block";box.value=c;try{navigator.clipboard.writeText(c).then(()=>toast("📋 "+ux("copiedB")),()=>{box.select();});}catch(e){box.select();}}
function restoreBackup(){const v=(val("bkIn")||"").trim();try{const o=JSON.parse(decodeURIComponent(escape(atob(v))));if(!o||typeof o!=="object"||!("xp" in o))throw 0;S=Object.assign(S,o);S.tab="home";S.sub=null;save();applyDisplay();toast("✅ "+ux("restored"));render();}catch(e){toast("⚠️ "+ux("badCode"));}}


/* ---------- Quick log sheet (center ＋) ---------- */
function openQuick(){closeQuick();const es=S.lang==="es";const open=(S.cases||[]).filter(c=>c.status==="open");
 const A=[["🥚",es?"+1 huevo":"+1 egg","closeQuick();egg(1)"],["✅",es?"Revisión diaria":"Health check","closeQuick();go('home','check')"],["📓",es?"Nota en diario":"Journal note","closeQuick();TMP.ft='journal';go('flock')"],
 ["🩺",open.length?(es?"Registrar cuidado":"Log care"):(es?"Ave enferma":"Sick bird"),open.length===1?`closeQuick();go('flock','case:${open[0].id}')`:open.length?"closeQuick();go('health','log')":"closeQuick();startCase('')"],
 ["🔍",es?"Revisar síntomas":"Symptoms","closeQuick();TMP.symOpen=true;go('health');setTimeout(()=>{const el=document.getElementById('symPanel');if(el)el.scrollIntoView({behavior:'smooth'})},80)"],["🐔",es?"Agregar ave":"Add bird","closeQuick();TMP.addOpen=true;TMP.ft='birds';go('flock')"],["🌾",es?"Gasto":"Cost","closeQuick();TMP.ft='money';TMP.mf='cost';go('flock')"],["💵",es?"Venta":"Sale","closeQuick();TMP.ft='money';TMP.mf='sale';go('flock')"],["🧹",es?"Tareas":"Coop jobs","closeQuick();TMP.ft='jobs';go('flock')"]];
 const d=document.createElement("div");d.className="sheetbg";d.id="qsheet";d.onclick=e=>{if(e.target===d)closeQuick();};
 d.innerHTML=`<div class="sheet" role="dialog" aria-label="Quick log"><div class="grab"></div><span class="eyebrow">${es?"Registro rápido":"Quick log"}</span><h2 style="margin:0 0 12px">${es?"¿Qué pasó en el gallinero?":"What happened in the coop?"}</h2><div class="qgrid">${A.map(a=>`<button class="qa" onclick="${a[2]}"><span>${a[0]}</span>${a[1]}</button>`).join("")}</div><button class="btn alt" style="width:100%;margin-top:12px" onclick="closeQuick()">${es?"Cerrar":"Close"}</button></div>`;
 document.body.appendChild(d);}
function closeQuick(){const e=document.getElementById("qsheet");if(e)e.remove();}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeQuick();});
function heroCard(){const td=today(),n=S.eggs[td]||0;let wk=0;for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);wk+=S.eggs[dstr(d)]||0;}
 const es=S.lang==="es";const open=(S.cases||[]).filter(c=>c.status==="open").length;const has=(S.prof&&S.prof.has)||"hens";
 const dt=new Date().toLocaleDateString(S.lang,{weekday:"long",month:"short",day:"numeric"});
 if(has==="none")return `<div class="hero"><div class="egg-deco"></div><span class="eyebrow">${es?"Tu plan":"Your plan"} · ${dt}</span><div><span class="hnum">${ENCY_ARTS?ENCY_ARTS.filter(x=>isRead(x.a.id)).length:0}</span><span class="hlab">${es?"artículos leídos":"articles read"}</span></div><p class="hsub">${es?"Prepárate antes de traer tus primeras aves.":"Get ready before your first birds come home."}</p><div class="hbtns"><button class="btn" onclick="go('learn','enc:ch-start')">📖 ${es?"Primeros pasos":"Getting Started"}</button><button class="btn ghost" onclick="go('learn','tools')">🧮 ${es?"Calculadoras":"Calculators"}</button></div></div>`;
 return `<div class="hero"><div class="egg-deco"></div><span class="eyebrow">${es?"Huevos hoy":"Eggs today"} · ${dt}</span>
 <div><span class="hnum">${n}</span><span class="hlab">${n===1?(es?"huevo":"egg"):(es?"huevos":"eggs")}</span></div>
 ${cartonHTML()}
 <div class="hstats"><div><small>${es?"Últimos 7 días":"Last 7 days"}</small><b>${wk}</b></div><div><small>${es?"Tasa de postura":"Laying rate"}</small><b>${layRate(7)!=null?layRate(7)+"%":"—"}</b></div><div><small>${es?"Costo docena":"Cost a dozen"}</small><b>${costDozen()!=null?fm(costDozen()):"—"}</b></div></div>
 <div class="hbtns"><button class="btn" onclick="egg(1)">＋1 🥚</button>${n>0?`<button class="btn ghost" onclick="egg(-1)">${t("undo")}</button>`:""}<button class="btn ghost" onclick="go('home','check')">${S.checks[td]?"✓ ":""}${es?"Revisión":"Health check"}</button></div></div>`;}
