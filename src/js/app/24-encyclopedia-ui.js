
/* ================= ENCYCLOPEDIA: builder + UI ================= */
const LX=(o,lg)=>o==null?"":(typeof o==="string"?o:(o[lg]!=null?o[lg]:o.en));
const bi=fn=>({en:fn("en"),es:fn("es")});
function artFromLesson(l){return{id:"a-"+l.id,e:l.e,t:l.t,quiz:l.id,secs:[{lead:l.i},{ul:l.b},{tip:l.f}]};}
function chFromCourse(cid,extra,name,desc){const c=COURSES.find(x=>x.id===cid);return{id:"ch-"+cid,e:c.e,n:name||c.n,d:desc||c.d,arts:c.ls.map(artFromLesson).concat(extra||[])};}
const uLab=(u,lg)=>u==="red"?(lg==="es"?"🔴 Llama al vet ya":"🔴 Call vet now"):u==="yellow"?(lg==="es"?"🟡 Actúa hoy":"🟡 Act today"):(lg==="es"?"🟢 Observa":"🟢 Monitor");
function buildEncy(){
 const symName=k=>{const s=SYM.find(x=>x[0]===k);return s?s[1]:{en:k,es:k};};
 const feedArt={id:"g-feedtbl",e:"🏷️",t:{en:"Feed types chart",es:"Tabla de tipos de alimento"},secs:[{tbl:{h:{en:["Feed","What it's for"],es:["Alimento","Para qué es"]},r:bi(lg=>FEED.map(f=>[f.e+" "+LX(f.n,lg),LX(f.t,lg)]))}}]};
 const foodArt={id:"g-foods",e:"🍉",t:{en:"Complete food list: safe, limit, never",es:"Lista completa: seguro, poco, nunca"},secs:[{lead:{en:"Every food in Kikirikí's database, sorted by safety. Remember the 90/10 rule.",es:"Todos los alimentos de Kikirikí, ordenados por seguridad. Recuerda la regla 90/10."}}].concat([["y",{en:"✅ Safe treats",es:"✅ Premios seguros"}],["l",{en:"🟡 Only a little",es:"🟡 Solo poquito"}],["n",{en:"⛔ Never feed",es:"⛔ Nunca dar"}]].map(([s,h])=>({h,tbl:{h:{en:["Food","Why"],es:["Alimento","Por qué"]},r:bi(lg=>FOODS.filter(f=>f.s===s).map(f=>[LX(f.n,lg),LX(f.t,lg)]))}})))};
 const weekArt={id:"g-weeks",e:"📅",t:{en:"Brooder chart: week by week",es:"Tabla de criadora semana a semana"},secs:[{tbl:{h:{en:["Week","Heat at chick level","Key care"],es:["Semana","Calor al nivel del pollito","Cuidados clave"]},r:bi(lg=>WEEKS.map(w=>[w.w,w.f?`${w.f}°F / ${w.c}°C`:"—",LX(w.i,lg).join(" • ")]))}},{tip:{en:"Watch the chicks, not just the thermometer: huddled = cold, spread out and panting = hot.",es:"Mira a los pollitos, no solo el termómetro: amontonados = frío; alejados y jadeando = calor."}}]};
 const behArt={id:"g-beh",e:"📖",t:{en:"Behavior dictionary",es:"Diccionario de conducta"},secs:[{tbl:{h:{en:["Behavior","Normal?","What it means"],es:["Conducta","¿Normal?","Qué significa"]},r:bi(lg=>BEH.map(b=>[b.e+" "+LX(b.n,lg),b.ok?(lg==="es"?"✅ Sí":"✅ Yes"):(lg==="es"?"👀 Vigilar":"👀 Watch"),LX(b.t,lg)]))}}]};
 const coopArt={id:"g-coop",e:"📏",t:{en:"Coop quick specs",es:"Medidas rápidas del gallinero"},secs:[{tbl:{h:{en:["Topic","Guideline"],es:["Tema","Guía"]},r:bi(lg=>COOP.map(c=>[c.e+" "+LX(c.n,lg),LX(c.t,lg)]))}},{p:{en:"Use the Coop & run calculator in Tools to size yours.",es:"Usa la calculadora de gallinero en Herramientas para calcular el tuyo."}}]};
 const checkArt={id:"g-check",e:"✅",t:{en:"The 30-second daily health check",es:"La revisión diaria de 30 segundos"},secs:[{tbl:{h:{en:["Check","What healthy looks like"],es:["Revisa","Cómo se ve sano"]},r:bi(lg=>CHECK.map(c=>[LX(c.q,lg),LX(c.h,lg)]))}},{p:{en:"Do it every day from Home → Daily health check. A 'Problem' answer takes you straight to the symptom checker.",es:"Hazla cada día desde Inicio → Revisión diaria. Una respuesta 'Problema' te lleva directo a revisar síntomas."}}]};
 const dosArt={id:"g-dos",e:"👍",t:{en:"Do's and don'ts",es:"Sí y no"},secs:[{h:{en:"Do",es:"Sí"},ul:bi(lg=>DOS.filter(d=>d.d).map(d=>LX(d.n,lg)+": "+LX(d.t,lg)))},{h:{en:"Don't",es:"No"},ul:bi(lg=>DOS.filter(d=>!d.d).map(d=>LX(d.n,lg)+": "+LX(d.t,lg)))}]};
 const aidArt={id:"g-aid",e:"🧰",t:{en:"The chicken first-aid kit",es:"El botiquín de gallinas"},secs:[{tbl:{h:{en:["Item","Used for"],es:["Artículo","Para qué"]},r:bi(lg=>FIRSTAID.map(f=>[f.e+" "+LX(f.n,lg),LX(f.t,lg)]))}}]};
 const monthArt={id:"g-months",e:"🗓️",t:{en:"Month-by-month care calendar",es:"Calendario de cuidados mes a mes"},secs:[{tbl:{h:{en:["Month","Focus"],es:["Mes","Enfoque"]},r:bi(lg=>TIPS.map(x=>{const s=LX(x,lg);const i=s.indexOf(":");return[s.slice(0,i),s.slice(i+1).trim()];}))}},{p:{en:"Northern Hemisphere. In the Southern Hemisphere, shift by six months.",es:"Hemisferio norte. En el hemisferio sur, recórrelo seis meses."}}]};
 const breedArt={id:"g-breeds",e:"🐓",t:{en:"Breed profiles",es:"Perfiles de razas"},secs:[{tbl:{h:{en:["Breed","Eggs/yr","Egg color","Cold","Heat","Personality"],es:["Raza","Huevos/año","Color","Frío","Calor","Carácter"]},r:bi(lg=>BREEDS.map(b=>[b.n,b.e,LX(b.ec,lg),"●".repeat(b.c),"●".repeat(b.h),LX(b.d,lg)]))}},{p:{en:"Egg numbers are typical ranges and vary with the line, light, feed and age. Try the Breed matcher in Tools.",es:"Las cantidades son rangos típicos y varían según la línea, la luz, el alimento y la edad. Prueba Elige tu raza en Herramientas."}}]};
 const diagArts=SGROUPS.map(([g,e,lab,ks])=>({id:"dx-"+g,e,t:lab,secs:[{tbl:{h:{en:["If you see…","Possible causes (most urgent first)"],es:["Si ves…","Posibles causas (lo más urgente primero)"]},r:bi(lg=>ks.map(k=>{const ord={red:0,yellow:1,green:2};const cs=CONDS.filter(c=>c.s.includes(k)).sort((a,b)=>ord[a.u]-ord[b.u]);return[LX(symName(k),lg),cs.map(c=>(c.u==="red"?"🔴 ":c.u==="yellow"?"🟡 ":"🟢 ")+LX(c.n,lg)).join(" · ")||"—"];}))}},{tip:{en:"Open Health → What are you seeing? to combine several signs, or Diseases A–Z for full details.",es:"Abre Salud → ¿Qué estás viendo? para combinar varias señales, o Enfermedades A–Z para todos los detalles."}}]}));
 const azArts=CONDS.slice().sort((a,b)=>a.n.en.localeCompare(b.n.en)).map(c=>{const k=KIT[c.id]||{},k2=KIT2[c.id]||{};const secs=[{badge:bi(lg=>uLab(c.u,lg))},{h:{en:"What it is",es:"Qué es"},p:c.w},{h:{en:"Signs",es:"Señales"},p:c.g},{h:{en:"What to do now",es:"Qué hacer ahora"},p:c.d}];
  if(k.vet)secs.push({warn:k.vet});
  [["med",{en:"💊 Medicines",es:"💊 Medicinas"}],["alt",{en:"🔄 Other options",es:"🔄 Otras opciones"}],["sup",{en:"🧪 Vitamins & supplements",es:"🧪 Vitaminas y suplementos"}],["water",{en:"💧 Water & electrolytes",es:"💧 Agua y electrolitos"}],["food",{en:"🥣 Food",es:"🥣 Comida"}],["ferm",{en:"🫙 Fermented food & probiotics",es:"🫙 Fermentados y probióticos"}],["rt",{en:"📋 Daily care routine",es:"📋 Rutina diaria"}],["up",{en:"📈 Signs of improvement",es:"📈 Señales de mejoría"}],["dn",{en:"📉 Signs of getting worse",es:"📉 Señales de empeoramiento"}],["tl",{en:"⏳ Typical recovery",es:"⏳ Recuperación típica"}]].forEach(([f,h])=>{const v=k[f]||k2[f];if(v)secs.push({h,p:v});});
  if(c.h)secs.push({h:{en:"🏡 Home care",es:"🏡 Cuidados en casa"},p:c.h});if(c.v)secs.push({h:{en:"🩺 What a vet may recommend",es:"🩺 Lo que puede recomendar el veterinario"},p:c.v});
  if(c.pd)secs.push({h:{en:"🩺 The Poultry Doc protocol",es:"🩺 Protocolo de The Poultry Doc"},ul:bi(lg=>LX(c.pd,lg).split("•").map(x=>x.trim()).filter(Boolean))});
  if(c.m)secs.push({h:{en:"💊 Medicine label info",es:"💊 Información de etiquetas"},ul:bi(lg=>LX(c.m,lg).split("•").map(x=>x.trim()).filter(Boolean))});
  secs.push({h:{en:"Prevention",es:"Prevención"},p:c.p},{note:bi(lg=>LX(UI.notDoc,lg))});
  return{id:"dz-"+c.id,e:c.u==="red"?"🔴":c.u==="yellow"?"🟡":"🟢",t:c.n,cond:c.id,secs};});
 const glossArt={id:"g-gloss",e:"📖",t:{en:"Glossary A–Z",es:"Glosario A–Z"},secs:[{tbl:{h:{en:["Term","Meaning"],es:["Término","Significado"]},r:bi(lg=>GLOSS.map(g=>[g[0],LX(g[1],lg)]))}}]};
 const srcArt={id:"g-src",e:"📜",t:{en:"Sources & references",es:"Fuentes y referencias"},secs:[{p:{en:"Kikirikí is written in our own words and checked against these sources. Health topics are organized following The Chicken Health Handbook (Gail Damerow, Storey).",es:"Kikirikí está escrito con nuestras palabras y verificado con estas fuentes. Los temas de salud siguen la organización de The Chicken Health Handbook (Gail Damerow, Storey)."}},{links:SOURCES.concat([["CDC, Backyard Poultry","https://www.cdc.gov/healthy-pets/about/backyard-poultry.html"]])}]};
 return[
  EN_NEW.news,
  chFromCourse("start",[]),
  chFromCourse("coop",[coopArt]),
  chFromCourse("feed",[feedArt,foodArt]),
  {id:"ch-incub",e:"🐣",n:{en:"Incubation & Brooding",es:"Incubación y crianza"},d:{en:"From fertile egg to feathered pullet.",es:"Del huevo fértil a la polla emplumada."},arts:COURSES.find(c=>c.id==="hatch").ls.map(artFromLesson).concat(COURSES.find(c=>c.id==="chicks").ls.map(artFromLesson),[weekArt])},
  chFromCourse("eggs",[]),
  chFromCourse("anat",[]),
  chFromCourse("beh",[behArt]),
  chFromCourse("hb",[checkArt,dosArt],{en:"Health Fundamentals",es:"Fundamentos de salud"},{en:"Checks, biosecurity, vaccines and finding help.",es:"Revisiones, bioseguridad, vacunas y dónde pedir ayuda."}),
  EN_NEW.parasites,EN_NEW.infect,EN_NEW.disorders,
  {id:"ch-diag",e:"🧭",n:{en:"Diagnostic Guide",es:"Guía de diagnóstico"},d:{en:"Start from what you see and find possible causes.",es:"Empieza por lo que ves y encuentra posibles causas."},arts:diagArts},
  {id:EN_NEW.therapy.id,e:EN_NEW.therapy.e,n:EN_NEW.therapy.n,d:EN_NEW.therapy.d,arts:EN_NEW.therapy.arts.concat([aidArt])},
  EN_NEW.human,EN_NEW.rules,EN_NEW.myths,EN_NEW.poultry,EN_NEW.kitchen,EN_NEW.family,
  chFromCourse("seasons",[monthArt]),
  chFromCourse("gen",[breedArt]),
  chFromCourse("fam",[]),chFromCourse("garden",[]),chFromCourse("hand",[]),
  {id:"ch-az",e:"🩺",n:{en:"Diseases & Disorders A–Z",es:"Enfermedades y trastornos A–Z"},d:{en:"Full reference for every condition in Kikirikí.",es:"Referencia completa de cada condición en Kikirikí."},arts:azArts},
  {id:"ch-gloss",e:"📖",n:{en:"Glossary",es:"Glosario"},d:{en:"Chicken words, explained.",es:"Palabras de gallinas, explicadas."},arts:[glossArt]},
  {id:EN_NEW.resources.id,e:EN_NEW.resources.e,n:EN_NEW.resources.n,d:EN_NEW.resources.d,arts:EN_NEW.resources.arts.concat([srcArt])}];}
let ENCY=null,ENCY_ARTS=null;
function ency(){if(!ENCY){ENCY=applyEdits(buildEncy());ENCY_ARTS=[];ENCY.forEach((ch,ci)=>ch.arts.forEach((a,ai)=>ENCY_ARTS.push({ch,a,ci,ai})));}return ENCY;}
const ET={title:{en:"Kikirikí Encyclopedia",es:"Enciclopedia Kikirikí"},sub:{en:"The complete backyard chicken reference: read by chapter, search anything, bookmark what you need.",es:"La referencia completa de gallinas de traspatio: lee por capítulo, busca lo que sea y guarda lo que necesites."},
chapters:{en:"Chapters",es:"Capítulos"},articles:{en:"articles",es:"artículos"},read:{en:"read",es:"leídos"},bm:{en:"Bookmarks",es:"Guardados"},
academy:{en:"Courses & quizzes",es:"Cursos y quizzes"},prev:{en:"Previous",es:"Anterior"},next:{en:"Next",es:"Siguiente"},quiz:{en:"Take the quick quiz",es:"Haz la prueba rápida"},
save:{en:"Save",es:"Guardar"},saved:{en:"Saved",es:"Guardado"},toc:{en:"Table of contents",es:"Índice"},inThis:{en:"In this chapter",es:"En este capítulo"},openHealth:{en:"Open in Health (symptom checker & tracker)",es:"Abrir en Salud (síntomas y seguimiento)"},
tArticle:{en:"Article",es:"Artículo"}};
const et=k=>L(ET[k])||k;
const isRead=id=>!!(S.read&&S.read[id]);
function secHTML(s){let o="";
 if(s.badge)o+=`<p><span class="u ${L(s.badge).includes("🔴")?"red":L(s.badge).includes("🟡")?"yellow":"green"}">${esc(L(s.badge))}</span></p>`;
 if(s.lead)o+=`<p class="elead">${esc(L(s.lead))}</p>`;
 if(s.h)o+=`<h3 class="eh">${esc(L(s.h))}</h3>`;
 if(s.ps)o+=L(s.ps).map(x=>`<p class="ep">${esc(x)}</p>`).join("");
 if(s.p)o+=`<p class="ep">${esc(L(s.p))}</p>`;
 if(s.ul)o+=`<ul class="eul">${L(s.ul).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
 if(s.ol)o+=`<ol class="eol">${L(s.ol).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`;
 if(s.tbl)o+=`<div class="etw"><table class="et"><thead><tr>${L(s.tbl.h).map(x=>`<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${L(s.tbl.r).map(r=>`<tr>${r.map((c,ci)=>`<td data-l="${esc(L(s.tbl.h)[ci]||"")}">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
 if(s.tip)o+=`<div class="dyk"><b>💡 ${at("dyk")}</b><p>${esc(L(s.tip))}</p></div>`;
 if(s.warn)o+=`<div class="vetwhen"><b>🚩 ${t("hVetWhen")}</b><p>${esc(L(s.warn))}</p></div>`;
 if(s.note)o+=`<p class="medw">${esc(L(s.note))}</p>`;
 if(s.links)o+=`<ul class="eul">${s.links.map(x=>`<li><a href="${x[1]}" target="_blank" rel="noopener">${esc(x[0])}</a></li>`).join("")}</ul>`;
 return o;}
function artText(a){return a.secs.map(s=>[s.lead,s.h,s.p,s.tip,s.warn].map(x=>x?(x.en||"")+" "+(x.es||""):"").join(" ")+(s.ps?s.ps.en.join(" ")+" "+s.ps.es.join(" "):"")+(s.ul?s.ul.en.join(" ")+s.ul.es.join(" "):"")+(s.ol?s.ol.en.join(" ")+s.ol.es.join(" "):"")+(s.tbl?s.tbl.r.en.flat().join(" ")+s.tbl.r.es.flat().join(" "):"")).join(" ")+" "+a.t.en+" "+a.t.es;}
function vEnc(chId){ency();const ch=ENCY.find(c=>c.id===chId);if(!ch)return vAcademy();const n=ch.arts.filter(a=>isRead(a.id)).length;const ci=ENCY.indexOf(ch);
 return `${backBtn("learn")}<div class="card"><div class="row"><span style="font-size:40px">${ch.e}</span><div style="flex:1"><small class="muted">${et("chapters").slice(0,-1)} ${ci+1}</small><h2 style="margin:0">${L(ch.n)}</h2><p class="muted" style="margin:2px 0 0">${L(ch.d)}</p></div></div><div class="bar" style="margin-top:10px"><i style="width:${Math.round(n/ch.arts.length*100)}%"></i></div><small class="muted">${n}/${ch.arts.length} ${et("read")}</small></div>
 <h3 style="margin:4px 0 8px">📑 ${et("inThis")}</h3>${ch.arts.map((a,i)=>`<button class="lrow ${isRead(a.id)?"ok":""}" onclick="go('learn','art:${a.id}')"><span class="ln">${isRead(a.id)?"✓":i+1}</span><span class="le">${a.e}</span><span style="flex:1;text-align:left"><b>${esc(L(a.t))}</b></span>${S.bm&&S.bm[a.id]?"⭐":""}<span>›</span></button>`).join("")}`;}
function vArt(id){ency();const i=ENCY_ARTS.findIndex(x=>x.a.id===id);if(i<0)return vAcademy();const {ch,a}=ENCY_ARTS[i];const pv=ENCY_ARTS[i-1],nx=ENCY_ARTS[i+1];
 if(!isRead(id)){S.read=S.read||{};S.read[id]=1;S.xp+=1;petBoost("learn");save();setTimeout(header,0);}
 const words=artText(a).split(/\s+/).length/2;const mins=Math.max(1,Math.round(words/200));const bm=S.bm&&S.bm[id];
 return `<button class="back" onclick="go('learn','enc:${ch.id}')">← ${ch.e} ${esc(L(ch.n))}</button>
 <article class="card earticle"><div class="row" style="justify-content:space-between"><small class="muted">⏱️ ${mins} ${at("readTime")}</small><button class="chip ${bm?"on":""}" onclick="S.bm=S.bm||{};S.bm['${id}']=!S.bm['${id}'];save();render()">${bm?"⭐ "+et("saved"):"☆ "+et("save")}</button></div>
 <h2 class="etitle">${a.e} ${esc(L(a.t))}</h2>${a.secs.map(secHTML).join("")}
 ${a.quiz?`<button class="btn alt sm" style="margin-top:10px" onclick="go('learn','lesson:${a.quiz}')">🧠 ${et("quiz")}</button>`:""}
 ${a.cond?`<button class="btn alt sm" style="margin-top:10px" onclick="TMP.focusCond='${a.cond}';go('health')">🩺 ${et("openHealth")}</button>`:""}</article>
 <div class="row" style="gap:8px">${pv?`<button class="btn alt" style="flex:1;font-size:13px" onclick="go('learn','art:${pv.a.id}')">← ${esc(L(pv.a.t)).slice(0,28)}</button>`:""}${nx?`<button class="btn" style="flex:1;font-size:13px" onclick="go('learn','art:${nx.a.id}')">${esc(L(nx.a.t)).slice(0,28)} →</button>`:""}</div>`;}
function encyHome(){ency();const tot=ENCY_ARTS.length,rd=ENCY_ARTS.filter(x=>isRead(x.a.id)).length;const bms=ENCY_ARTS.filter(x=>S.bm&&S.bm[x.a.id]);const nx=ENCY_ARTS.find(x=>!isRead(x.a.id));
 return `<div class="card acad"><h2 style="margin:0">📖 ${et("title")}</h2><p class="muted" style="margin:4px 0 10px">${et("sub")}</p>
 <input class="search big" placeholder="🔎 ${esc(at("searchAll"))}" value="${esc(TMP.acQ||"")}" oninput="TMP.acQ=this.value;document.getElementById('acRes').innerHTML=searchHTML()">
 <div class="row" style="margin-top:12px;gap:12px"><div style="flex:1"><div class="bar"><i style="width:${Math.round(rd/tot*100)}%"></i></div><small class="muted">${rd}/${tot} ${et("articles")} ${et("read")}</small></div>${nx?`<button class="btn sm" onclick="go('learn','art:${nx.a.id}')">▶ ${rd?at("cont"):at("start")}</button>`:"🎓"}</div></div>
 <div id="acRes">${searchHTML()}</div>
 ${bms.length?`<div class="card"><h3>⭐ ${et("bm")}</h3>${bms.map(x=>`<button class="sres" onclick="go('learn','art:${x.a.id}')"><span class="se">${x.a.e}</span><span style="flex:1;text-align:left"><b>${esc(L(x.a.t))}</b><br><small>${esc(L(x.ch.n))}</small></span><span>›</span></button>`).join("")}</div>`:""}
 <h2 class="sec">📑 ${et("chapters")}</h2>
 <div class="card" style="padding:6px 10px">${ENCY.map((ch,i)=>{const n=ch.arts.filter(a=>isRead(a.id)).length;return `<button class="chrow" onclick="go('learn','enc:${ch.id}')"><span class="chn">${i+1}</span><span class="che">${ch.e}</span><span style="flex:1;text-align:left"><b>${esc(L(ch.n))}</b><br><small class="muted">${ch.arts.length} ${et("articles")}${n?` · ${n} ${et("read")}`:""}</small></span>${n===ch.arts.length?`<span class="done">✓</span>`:"<span>›</span>"}</button>`;}).join("")}</div>`;}
