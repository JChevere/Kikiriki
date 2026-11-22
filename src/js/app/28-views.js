
/* ================= VIEWS ================= */
function vHome(){
 if(S.sub==="check")return vCheck();if(S.sub==="pet")return S.petOff?(S.petOff=false,save(),vPet()):vPet();
 if(!S.sub)return vHome3();
 const ri=rankIdx(S.xp),nr=RANKS[ri+1];
 const pct=nr?Math.round((S.xp-RANKS[ri].xp)/(nr.xp-RANKS[ri].xp)*100):100;
 const td=today(),n=S.eggs[td]||0;
 let wk=0;for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);wk+=S.eggs[dstr(d)]||0;}
 const m=new Date().getMonth(),fact=FACTS[Math.floor(Date.now()/864e5)%FACTS.length];
 const st=streak(),done=!!S.checks[td];
 const mi=(m+(S.hemi==="S"?6:0))%12;
 ency();return `${greet()}${alertsHTML()}
 ${heroCard()}
 ${(S.prof&&S.prof.has)==="none"?"":henGrid()}
 ${attentionCard()}
 ${(S.prof&&S.prof.has)==="none"?"":vibeCard()}
 ${(S.prof&&S.prof.has)==="none"?"":recRow()}
 ${todayCard()}
 ${petMini()}
 <h2 class="sec">${t("quick")}</h2>
 <div class="tiles" style="margin-bottom:14px">
  <button class="tile" onclick="TMP.symOpen=true;go('health');setTimeout(()=>{const el=document.getElementById('symPanel');if(el)el.scrollIntoView({behavior:'smooth'});},80)"><span class="e">🩺</span><b>${t("qSym")}</b><span>${t("qSymS")}</span></button>
  <button class="tile" onclick="go('food')"><span class="e">🍉</span><b>${t("qFood")}</b><span>${t("qFoodS")}</span></button>
  <button class="tile" onclick="go('learn','chick')"><span class="e">🐣</span><b>${t("qChick")}</b><span>${t("qChickS")}</span></button>
  <button class="tile" onclick="go('learn','tools')"><span class="e">🧮</span><b>${at("calc")}</b><span>${S.lang==="es"?"Gallinero, alimento, huevos, incubación":"Coop, feed, eggs, hatching"}</span></button>
 </div>
 <div class="tip" style="margin-bottom:14px"><b>📅 ${t("seasonTip")}</b><p style="margin:4px 0 2px">${L(TIPS[mi]).replace(/^[^:]+:\s*/,"")}</p><span class="muted" style="font-size:12px">${S.hemi==="S"?ux("seasonSouth"):t("seasonNote")} · <a href="#" onclick="go('settings');return false">${ux("settings")}</a></span></div>
 <div class="card"><div class="fact"><span class="e">${fact.e}</span><div><b>${t("funFact")}</b><p style="margin:2px 0 0">${L(fact)}</p></div></div></div>
 <div class="card"><p class="muted" style="margin:0 0 6px;font-weight:800">🏅 ${ux("rankCard")}</p>${S.petOff?`<div class="scene" style="margin-bottom:10px">${scene(ri)}</div>`:""}
  <div class="row" style="justify-content:space-between">
   <span class="rank">${L(RANKS[ri].n)}</span><span class="muted"><b>${S.xp}</b> 🌽</span></div>
  <div class="bar" style="margin-top:8px"><i style="width:${pct}%"></i></div>
  <p class="muted" style="margin:6px 0 0">${nr?`${nr.xp-S.xp} 🌽 ${t("nextRank")}: <b>${L(nr.n)}</b>`:t("maxRank")}</p>
  <p class="muted" style="margin:6px 0 0;font-size:12.5px">${t("howXP")}</p>
 </div>
 <p class="disc">${t("notVet")}</p>`;
}

function vCheck(){
 const all=CHECK.every(c=>TMP.ck[c.k]);
 let h=`${backBtn("home")}<div class="card"><h2>✅ ${t("dailyCheck")}</h2><p class="muted" style="margin:0">${t("ckIntro")}</p></div>`;
 h+=CHECK.map(c=>`<div class="ck"><div class="q">${L(c.q)}</div><div class="h">${L(c.h)}</div><div class="ans">
  <button class="${TMP.ck[c.k]==="ok"?"ok":""}" onclick="ck('${c.k}','ok')">👍 ${t("ok")}</button>
  <button class="${TMP.ck[c.k]==="bad"?"bad":""}" onclick="ck('${c.k}','bad')">⚠️ ${t("problem")}</button></div></div>`).join("");
 h+=all?`<button class="btn" style="width:100%" onclick="finishCheck()">${t("finish")} · +10 🌽</button>`:`<p class="muted" style="text-align:center">${t("ckAll")}</p>`;
 return h;
}
function ck(k,v){TMP.ck[k]=v;render();}
function finishCheck(){
 const bad=CHECK.filter(c=>TMP.ck[c.k]==="bad");
 const first=!S.checks[today()];S.checks[today()]=1;if(first)petBoost("check");save();
 if(first)addXP(10,"✅");
 if(bad.length){TMP.sym=[...new Set(bad.flatMap(c=>c.m))];TMP.symOpen=true;TMP.openG={};TMP.ck={};toast(t("ckBad"));go("health");setTimeout(()=>{const el=document.getElementById("symPanel");if(el)el.scrollIntoView({behavior:"smooth"});},80);}
 else{TMP.ck={};toast("🎉 "+t("ckGood"));go("home");}
}

function vFlock(){
 const sb=S.sub||"";if(sb==="odd")return vOddEggs();if(sb.startsWith("hen:"))return (TMP.cedEdit===sb.slice(4)&&TMP.cl)?vHen(sb.slice(4)):vHen4(sb.slice(4));if(sb.startsWith("case:"))return vCase(sb.slice(5));if(sb==="newcase")return vNewCase();
 const hens=S.flock.map(h=>{const w=ageWeeks(h.hatch),st=stageOf(w);const del=TMP.delId===h.id;
  return `<div class="hen">${henArt(h,52)}<div class="info" style="cursor:pointer" onclick="go('flock','hen:${h.id}')"><b>${esc(h.name)}</b> ${st?`<span class="stage">${L(st.n)}</span>`:""}
  <div class="muted">${esc(h.breed||"")}${w!=null?" · "+ageText(w):""}</div>
  <div style="margin-top:4px">${(h.status||"laying")==="laying"?`<span class="pill">🥚 ${rangeEggs(30,h.id)} · 30 d</span>`:`<span class="pill">${L2s(h.status)}</span>`}</div></div>
  <button class="btn ${del?"":"alt"} sm" onclick="delHen('${h.id}')">${del?t("sure"):"✕"}</button></div>`;}).join("");
 const form=TMP.addOpen?`<div class="card"><h3>${t("addHen")}</h3>
  <label class="muted">${t("name")}</label><input class="in" id="hName" maxlength="30" style="margin-bottom:8px">
  <label class="muted">${t("breed")}</label><select class="in" id="hBreed" style="margin-bottom:8px" onchange="const b=BREEDS.find(z=>z.n===this.value);if(b){if(!TMP.cl)cedInit();const k=TMP.cl.look.kind;TMP.cl.color=b.col;TMP.cl.look=breedLook(b.n,b.col,k);keepForm()}">${BREEDS.map(b=>`<option>${esc(b.n)}</option>`).join("")}<option>${S.lang==="es"?"Mestiza / otra":"Mixed / other"}</option></select>
  <label class="muted">${t("hatchDate")}</label><input class="in" type="date" id="hHatch" max="${today()}" style="margin-bottom:8px">
  <label class="muted">${S.lang==="es"?"Personaliza su look":"Customize the look"}</label>${(TMP.cedR="keepForm",charEditor({ageKind:"hen"}))}
  <label class="muted">${S.lang==="es"?"Color del huevo":"Egg color"}</label><div class="chips" style="margin:6px 0 10px">${Object.entries(EGGC).map(([k,v])=>`<button class="chip ${(TMP.eggc||"")===k?"on":""}" onclick="TMP.eggc='${k}';keepForm()"><i class="hegg" style="background:${v[0]};width:11px;height:14px;display:inline-block;vertical-align:-2px"></i> ${L(v[1])}</button>`).join("")}</div>
  <label class="muted">${S.lang==="es"?"Es":"She is"}</label><div class="chips" style="margin:6px 0 12px">${HSTAT.map(x=>`<button class="chip ${(TMP.hst||((TMP.cl&&TMP.cl.look.kind==="chick")?"growing":(TMP.cl&&TMP.cl.look.kind==="rooster")?"rooster":"laying"))===x[0]?"on":""}" onclick="TMP.hst='${x[0]}';keepForm()">${x[1]} ${L(x[2])}</button>`).join("")}</div>
  <div class="row"><button class="btn" onclick="saveHen()">${t("saveBtn")}</button><button class="btn alt" onclick="TMP.addOpen=false;TMP.cl=null;render()">${t("cancel")}</button></div></div>`
  :`<div class="row" style="gap:8px;margin-bottom:14px"><button class="btn" style="flex:1" onclick="cedInit();TMP.cedTab='type';TMP.addOpen=true;render()">＋ ${t("addHen")}</button><button class="btn alt" style="flex:1" onclick="cedInit('buff',{kind:'chick',down:'yellow'});TMP.cedTab='color';TMP.addOpen=true;TMP.addChick=true;render();setTimeout(()=>{const e=document.getElementById('hHatch');if(e&&!e.value)e.value=today()},30)">🐣 ${S.lang==="es"?"Agregar pollito":"Add a chick"}</button></div>`;
 // egg chart
 const days=[];for(let i=13;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push([dstr(d),S.eggs[dstr(d)]||0,d]);}
 const mx=Math.max(1,...days.map(d=>d[1]));
 const ym=today().slice(0,7);let mon=0,tot=0,best=0;Object.entries(S.eggs).forEach(([k,v])=>{tot+=v;if(k.startsWith(ym))mon+=v;if(v>best)best=v;});
 const chart=`<div class="chart">${days.map((d,i)=>`<div class="${i===13?"t":""}" style="height:${d[1]/mx*100}%">${d[1]?`<span>${d[1]}</span>`:""}</div>`).join("")}</div>
  <div class="cl"><span>${days[0][2].toLocaleDateString(S.lang,{month:"short",day:"numeric"})}</span><span>${S.lang==="es"?"hoy":"today"}</span></div>`;
 const notes=S.notes.slice().reverse().map(n=>`<div class="note"><small>${esc(n.d)} · ${esc(n.who||t("whole"))}</small><div>${esc(n.t)}</div></div>`).join("")||`<p class="empty">${t("noNotes")}</p>`;
 const birdsP=`${(S.flock.length?fmFlockList():"")||`<div class="card empty">${henSVG("buff",64).replace('class="kart ','style="margin:0 auto 8px;display:block" class="kart ')}${t("noHens")}</div>`}${TMP.addOpen||!S.flock.length?form:""}`;
 const eggsP=`<div class="card"><h2>🥚 ${t("eggStats")}</h2>${chart}
  <div class="grid2" style="grid-template-columns:repeat(3,1fr);margin-top:12px;text-align:center">
   <div><div class="big" style="font-size:26px">${mon}</div><span class="muted">${t("monthTotal")}</span></div>
   <div><div class="big" style="font-size:26px">${tot}</div><span class="muted">${t("allTime")}</span></div>
   <div><div class="big" style="font-size:26px">${best}</div><span class="muted">${t("bestDay")}</span></div></div>
  <div class="row" style="justify-content:center;margin-top:10px"><button class="btn sm" onclick="egg(1)">＋1 🥚</button><button class="btn alt sm" onclick="egg(-1)">−1</button></div></div>`;
 const jP=`<div class="card"><h2>📓 ${t("journal")}</h2><p class="muted" style="margin-top:0">${t("journalSub")}</p>
  <select class="in" id="nWho" style="margin-bottom:8px"><option value="">${t("whole")}</option>${S.flock.map(h=>`<option>${esc(h.name)}</option>`).join("")}</select>
  <textarea class="in" id="nText" rows="2" maxlength="400" placeholder="${esc(t("notePH"))}"></textarea>
  <button class="btn sm" style="margin:8px 0 12px" onclick="addNote()">${t("addNote")} · +3 🌽</button>${notes}</div>`;
 const ft=TMP.ft||"birds";const openN=(S.cases||[]).filter(c=>c.status==="open").length;
 const overJ=jobs().filter(j=>j.last&&jobDue(j)<=0).length;const owedN=S.money.sales.filter(x=>!x.paid).length;
 const segs=[["birds","🐔",S.lang==="es"?"Aves":"Birds",S.flock.length],["eggs","🥚",S.lang==="es"?"Huevos":"Eggs",0],["jobs","🧹",S.lang==="es"?"Tareas":"Jobs",overJ],["money","💰",S.lang==="es"?"Dinero":"Money",owedN],["journal","📓",S.lang==="es"?"Diario":"Journal",0]];
 return `<h2 class="sec">🐔 ${t("flock")}</h2><div class="fseg">${segs.map(x=>`<button class="${ft===x[0]?"on":""}" onclick="TMP.ft='${x[0]}';render()"><span>${x[1]}</span>${x[2]}${x[3]?`<i>${x[3]}</i>`:""}</button>`).join("")}</div>
 ${ft==="birds"?birdsP:ft==="health"?trackerSection():ft==="eggs"?eggsTab():ft==="jobs"?jobsTab():ft==="money"?moneyTab():jP}`;
}
function keepForm(){const v={n:val("hName"),b:val("hBreed"),h:val("hHatch")};render();setVal("hName",v.n);setVal("hBreed",v.b);setVal("hHatch",v.h);const p=document.querySelector(".patgrid .pat.on");if(p)p.parentNode.scrollTop=p.offsetTop-p.parentNode.offsetTop-40;}
const val=id=>{const e=document.getElementById(id);return e?e.value:"";};
const setVal=(id,v)=>{const e=document.getElementById(id);if(e&&v)e.value=v;};
function saveHen(){const n=val("hName").trim();if(!n){document.getElementById("hName").focus();return;}
 S.flock.push({id:Date.now().toString(36),name:n,breed:val("hBreed"),hatch:val("hHatch"),color:(TMP.cl||{}).color||"buff",look:Object.assign({},(TMP.cl||{}).look||{}),egg:TMP.eggc||guessEggColor(val("hBreed")),status:TMP.hst||((TMP.cl&&TMP.cl.look.kind==="chick")?"growing":(TMP.cl&&TMP.cl.look.kind==="rooster")?"rooster":"laying")});TMP.eggc=null;TMP.cl=null;TMP.addChick=false;TMP.hst=null;TMP.addOpen=false;save();petBoost("hen");addXP(5,"🐔");render();}
function delHen(id){if(TMP.delId===id){S.flock=S.flock.filter(h=>h.id!==id);TMP.delId=null;save();}else TMP.delId=id;render();}
function addNote(){const tx=val("nText").trim();if(!tx)return;S.notes.push({d:today(),who:val("nWho"),t:tx});if(S.notes.length>300)S.notes.shift();petBoost("note");save();addXP(3,"📓");render();}

function condCard(c,score){return `<details class="cond"><summary>${uBadge(c.u)}<span class="nm">${L(c.n)}</span>${score?`<span class="match">${score} ✓</span>`:""}<span>▾</span></summary>
 <div class="body">${EDITS["dz-"+c.id]?`<p class="elead" style="margin-top:0">${esc(L(EDITS["dz-"+c.id].lead))}</p>`:""}<h4>${t("hWhat")}</h4><p>${L(c.w)}</p><h4>${t("hSigns")}</h4><p>${L(c.g)}</p><h4>${t("hDo")}</h4><p>${L(c.d)}</p>${kitHTML(c.id)}${c.h?`<h4>🏡 ${t("hHome")}</h4><p>${homeFmt(L(c.h))}</p>`:""}${c.v?`<h4>🩺 ${t("hVet")}</h4><p>${L(c.v)}</p>`:""}${c.pd?`<div class="pd"><b>🩺 ${t("hPD")}</b><p class="medw">${t("pdNote")}</p><ul>${L(c.pd).split("•").filter(x=>x.trim()).map(x=>`<li>${esc(x.trim())}</li>`).join("")}</ul></div>`:""}${c.m?`<div class="med"><b>💊 ${t("hMed")}</b><p class="medw">${t("notDoc")}</p><ul>${L(c.m).split("•").filter(x=>x.trim()).map(x=>`<li>${esc(x.trim())}</li>`).join("")}</ul></div>`:""}<h4>${t("hPrev")}</h4><p>${L(c.p)}</p></div></details>`;}
function kitHTML(id){const k=KIT[id]||{},k2=KIT2[id]||{};const row=(r,src)=>src[r[0]]?`<div class="krow"><span class="ki">${r[1]}</span><div><b>${L(r[2])}</b><p>${esc(L(src[r[0]]))}</p></div></div>`:"";
 const rows=KROWS.map(r=>row(r,k)).join("")+KROWS2.map(r=>row(r,k2)).join("");
 return `${k.vet?`<div class="vetwhen"><b>🚩 ${t("hVetWhen")}</b><p>${esc(L(k.vet))}</p></div>`:""}<details class="kit"><summary><b class="kt" style="flex:1">🧰 ${t("hKit")}</b><span class="tapt">${S.lang==="es"?"medicinas, alternativas, rutina, señales":"medicines, alternatives, routine, signs"}</span><span class="car">▾</span></summary>${rows}<div class="krow"><span class="ki">📝</span><div><b>${S.lang==="es"?"Registra todo":"Track everything"}</b><p>${S.lang==="es"?"Anota cada dosis, comida y cómo se siente para ver si mejora o empeora, y compártelo con tu veterinario.":"Log every dose, meal and how she feels to see if she's improving or declining, and share it with your vet."}</p><button class="btn sm" style="margin-top:6px" onclick="startCase('${id}')">📋 ${tt("trackThis")}</button></div></div><p class="medw">${t("notDoc")}</p></details>`;}
function homeFmt(s){const tags=[["WELL SUPPORTED:","✅","#2E7D3E"],["BIEN RESPALDADO:","✅","#2E7D3E"],["CHECK WITH YOUR VET FIRST:","🟡","#8A5F00"],["CONSULTA AL VET PRIMERO:","🟡","#8A5F00"],["NOT PROVEN:","⚠️","#D2402F"],["VET-RECOMMENDED:","🩺","#2F5BB7"],["RECOMENDADO POR VETERINARIO:","🩺","#2F5BB7"],["NO COMPROBADO:","⚠️","#D2402F"]];
 let o=esc(s);tags.forEach(([k,e,c])=>{o=o.replace(k,`<br><b style="color:${c}">${e} ${k}</b>`);});return o.replace(/^<br>/,"");}
function symResults(){
 if(!TMP.sym.length)return `<p class="empty">${t("pickSym")}</p>`;
 const ord={red:0,yellow:1,green:2};
 const r=CONDS.map(c=>({c,s:c.s.filter(x=>TMP.sym.includes(x)).length})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s||ord[a.c.u]-ord[b.c.u]);
 return r.map(x=>condCard(x.c,x.s)).join("");
}
const LCATS=[["all","📋",{en:"All",es:"Todo"}],["urgent","🔴",{en:"Urgent",es:"Urgente"}],["breath","🫁",{en:"Breathing",es:"Respiración"}],["skin","🪶",{en:"Skin & feathers",es:"Piel y plumas"}],["gut","💩",{en:"Gut & droppings",es:"Digestión y heces"}],["legs","🦶",{en:"Legs & movement",es:"Patas y movimiento"}],["eggs","🥚",{en:"Eggs & vent",es:"Huevos y cloaca"}],["chicks","🐣",{en:"Chicks",es:"Pollitos"}],["bugs","🐛",{en:"Parasites",es:"Parásitos"}]];
const CCAT={breath:["resp","hpai","wetpox","heat"],skin:["drypox","wetpox","mites","pecking","molt","frost","scaly","bumble"],gut:["cocci","worms","sour","impact","hpai"],legs:["bumble","scaly","mareks","splay","wry"],eggs:["eggbind","prolapse","soft","molt"],chicks:["pasty","splay","cocci","mareks"],bugs:["mites","scaly","worms","cocci"]};
const SGROUPS=[["eyes","👁️",{en:"Eyes, face & comb",es:"Ojos, cara y cresta"},["eyes","scabs","face","pale","dark","mouth"]],["breath","🫁",{en:"Breathing",es:"Respiración"},["sneeze","gasp","pant"]],["skin","🪶",{en:"Skin & feathers",es:"Piel y plumas"},["feathers","bugs","wounds"]],["gut","🍽️",{en:"Eating & droppings",es:"Comida y heces"},["noteat","diarrhea","blood","crop","weight"]],["move","🦶",{en:"Legs & behavior",es:"Patas y conducta"},["lethargy","limp","paralysis","neck","legs","foot"]],["eggs","🥚",{en:"Eggs & vent",es:"Huevos y cloaca"},["noeggs","soft","strain","vent"]],["chicks","🐣",{en:"Chicks",es:"Pollitos"},["pasty","splay"]],["flock","🐔",{en:"Whole flock",es:"Toda la parvada"},["death"]]];
const SYMMAP=Object.fromEntries(SYM);
function libList(){const q=TMP.libQ.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");const cat=TMP.libCat||"all";
 const r=CONDS.filter(c=>(cat==="all"||(cat==="urgent"?c.u==="red":(CCAT[cat]||[]).includes(c.id)))&&(!q||(L(c.n)+" "+L(c.g)+" "+c.n.en+" "+c.n.es).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").includes(q))).sort((a,b)=>L(a.n).localeCompare(L(b.n),S.lang));
 TMP.libN=r.length;
 return (r.map(c=>condCard(c)).join("")||`<p class="empty">${S.lang==="es"?"Nada encontrado. Prueba otra palabra o revisa los síntomas.":"Nothing found. Try another word, or check symptoms."}</p>`);}
function libCountTxt(){const c=LCATS.find(x=>x[0]===(TMP.libCat||"all"));return `${c[1]} ${S.lang==="es"?"Condiciones":"Conditions"}${(TMP.libCat||"all")!=="all"?" · "+L(c[2]):""} (${TMP.libN})`;}
function libRefresh(open){document.getElementById("lib").innerHTML=libList();document.getElementById("libCount").textContent=libCountTxt();if(open){TMP.libOpen=true;document.getElementById("libWrap").open=true;}}
function setCat(k){TMP.libCat=k;document.querySelectorAll("#lcats .chip").forEach(b=>b.classList.toggle("on",b.dataset.k===k));libRefresh(true);}
function vHealth(){
 if(TMP.focusCond){const fc=CONDS.find(x=>x.id===TMP.focusCond);TMP.libQ=fc?L(fc.n):"";TMP.focusCond=null;setTimeout(()=>{const d=document.querySelector("#lib details.cond");if(d){d.open=true;d.scrollIntoView({behavior:"smooth"});}},80);}
 const cat=TMP.libCat||"all",n=TMP.sym.length,og=TMP.openG||{};
 const groups=SGROUPS.map(([g,e,lab,ks])=>{const c=ks.filter(k=>TMP.sym.includes(k)).length;const open=og[g]!=null?og[g]:c>0;
  return `<details class="sg" ${open?"open":""} ontoggle="(TMP.openG=TMP.openG||{})['${g}']=this.open"><summary><span>${e} ${L(lab)}</span>${c?`<span class="cnt">${c}</span>`:""}<span class="car">▾</span></summary><div class="chips">${ks.map(k=>`<button class="chip ${TMP.sym.includes(k)?"on":""}" onclick="tSym('${k}')">${L(SYMMAP[k])}</button>`).join("")}</div></details>`;}).join("");
 return `<div class="fm-page fm-hc">${fmHealthTop()}</div>
 <details class="emerg" id="emg" open><summary>🚨 ${t("emergT")} <span class="car">▾</span></summary><ul><li>${t("emerg1")}</li><li>${t("emerg2")}</li><li>${t("emerg3")}</li><li>${t("emerg4")}</li></ul><p style="margin:6px 0 0;font-size:13.5px;font-weight:800">${t("usda")}</p></details>
 <div class="card libcard">
  <h2 style="text-align:center;margin-bottom:10px">📖 ${t("library")}</h2>
  <input class="search big" placeholder="🔎 ${esc(t("searchCond"))}" value="${esc(TMP.libQ)}" oninput="TMP.libQ=this.value;libRefresh(true)">
  <div class="chips" id="lcats" style="justify-content:center;margin:10px 0 12px">${LCATS.map(([k,e,l])=>`<button class="chip ${cat===k?"on":""}" data-k="${k}" onclick="setCat('${k}')">${e} ${L(l)}</button>`).join("")}</div>
  ${(()=>{const h=libList();return `<details class="sg libwrap" id="libWrap" ${TMP.libOpen?"open":""} ontoggle="TMP.libOpen=this.open"><summary><span id="libCount">${libCountTxt()}</span><span class="tapt">${S.lang==="es"?"toca para abrir/cerrar":"tap to open/close"}</span><span class="car">▾</span></summary><div id="lib" style="padding:0 10px 10px">${h}</div></details>`;})()}
 </div>
 <details class="card symp" id="symPanel" ${TMP.symOpen?"open":""} ontoggle="TMP.symOpen=this.open">
  <summary><span style="flex:1"><b style="font-size:18px">🔍 ${t("symT")}</b><br><span class="muted" style="font-size:13px">${S.lang==="es"?"¿No sabes qué tiene? Elige señales y te mostramos posibles causas.":"Not sure what it is? Pick signs and we'll show possible causes."}</span></span>${n?`<span class="cnt">${n}</span>`:""}<span class="car">▾</span></summary>
  <p class="muted" style="margin:10px 0">${t("symSub")}</p>
  ${groups}
  ${n?`<div class="row" style="justify-content:space-between;margin:12px 0 6px"><h3 style="margin:0">${t("results")}</h3><button class="btn alt sm" onclick="TMP.sym=[];TMP.openG={};render()">${t("clear")}</button></div>`:""}
  <div id="symRes">${symResults()}</div>
 </details>
 <div class="tip" style="margin:14px 0">💊 ${t("vetNote")}</div>
 <p class="disc">${t("notVet")}</p>`;
}
function tSym(k){const i=TMP.sym.indexOf(k);if(i>=0)TMP.sym.splice(i,1);else{TMP.sym.push(k);if(!TMP.symB){TMP.symB=1;petBoost("sym");}}const y=window.scrollY;render();window.scrollTo(0,y);}

const fIcon=s=>s==="y"?"✅":s==="l"?"🟡":"⛔";
function foodList(){const q=TMP.foodQ.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
 const r=FOODS.filter(f=>(TMP.foodF==="all"||f.s===TMP.foodF)&&(!q||(f.k+" "+f.n.en+" "+f.n.es).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").includes(q)));
 return r.map(f=>`<div class="food f-${f.s}"><span class="fbadge">${f.s==="y"?t("fYes"):f.s==="l"?t("fLimit"):t("fNo")}</span><b>${L(f.n)}</b><p>${L(f.t)}</p></div>`).join("")||`<p class="empty">${t("noFood")}</p>`;}
function vFood(){
 const fb=(k,l)=>`<button class="chip ${TMP.foodF===k?"on":""}" onclick="TMP.foodF='${k}';render()">${l}</button>`;
 return `<h2 class="sec">🌽 ${t("foodT")}</h2>
 <input class="search" id="fq" placeholder="${esc(t("foodPH"))}" value="${esc(TMP.foodQ)}" oninput="TMP.foodQ=this.value;document.getElementById('fl').innerHTML=foodList()" style="margin-bottom:10px">
 <div class="chips" style="margin-bottom:10px">${fb("all",t("all"))}${fb("y","✅ "+t("fYes"))}${fb("l","🟡 "+t("fLimit"))}${fb("n","⛔ "+t("fNo"))}</div>
 <div class="card" id="fl">${foodList()}</div>
 <div class="tip"><b>⚖️ ${t("rule9010")}</b><p style="margin:4px 0 0">${t("rule9010t")}</p></div>
 <button class="btn alt" style="width:100%;margin-top:14px" onclick="go('learn','feed')">📚 ${t("mFeed")}</button>`;
}

function vLearn(){
 const s=S.sub||"";
 if(s.startsWith("enc:"))return vEnc(s.slice(4));if(s.startsWith("art:"))return vArt(s.slice(4));if(s.startsWith("course:"))return vCourse(s.slice(7));if(s.startsWith("lesson:"))return vLesson(s.slice(7));if(s==="tools")return vTools();if(s==="gloss")return vGloss();
 if(s==="chick")return vChick();if(s==="breeds")return vBreeds();if(s==="beh")return vCards("beh");if(s==="dos")return vDos();
 if(s==="coop")return vCards("coop");if(s==="feed")return vCards("feed");if(s==="quiz")return vQuiz();if(s==="src")return vSrc();if(s==="aid")return vAid();
 return vAcademy();
}
function vChick(){
 const w=ageWeeks(S.hatch);
 const cur=w==null?-1:(w<1?0:w<2?1:w<3?2:w<4?3:w<5?4:w<8?5:w<16?6:7);
 const tf=wk=>wk.f?`<span class="temp">🌡️ ${S.lang==="es"?wk.c+"°C / "+wk.f+"°F":wk.f+"°F / "+wk.c+"°C"}</span>`:"";
 return `${backBtn("learn")}<h2 class="sec">🐣 ${t("mChick")}</h2>
 <div class="card"><h3>${t("hatchT")}</h3><p class="muted" style="margin-top:0">${t("hatchS")}</p><input class="in" type="date" max="${today()}" value="${esc(S.hatch)}" onchange="S.hatch=this.value;save();render()">${w!=null?`<p style="margin:8px 0 0"><b>${ageText(w)}</b></p>`:""}</div>
 <div class="tip" style="margin-bottom:14px">🌡️ ${S.lang==="es"?"Mide la temperatura a unos 5 cm sobre la cama, bajo la fuente de calor. Pollitos amontonados = frío; alejados y jadeando = calor; repartidos y piando suave = perfecto. Usa una placa térmica o asegura bien la lámpara: es un riesgo de incendio.":"Measure about 2 inches above the bedding, under the heat. Huddled chicks = too cold; spread far away and panting = too hot; scattered and peeping softly = just right. Use a heat plate, or secure any lamp very well; lamps are a fire risk."}</div>
 ${WEEKS.map((wk,i)=>`<div class="week ${i===cur?"now":""}"><div class="wk"><small>${wk.w.length>2?t("weeksW"):t("week")}</small><b>${wk.w}</b></div><div style="flex:1">${i===cur?`<span class="pill">📍 ${t("youAreHere")}</span> `:""}${tf(wk)}<ul>${L(wk.i).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`).join("")}
 ${learnBtn("chick")}`;
}
function vCards(kind){
 const D=kind==="beh"?BEH:kind==="coop"?COOP:FEED;const title=kind==="beh"?t("mBeh"):kind==="coop"?t("mCoop"):t("mFeed");
 const extra=kind==="coop"?`<div class="tip" style="margin-bottom:14px">🧼 ${S.lang==="es"?"Salud familiar (CDC): lava tus manos con jabón después de tocar aves, huevos o equipo; no beses ni apapaches a las aves; no comas cerca de ellas; supervisa a los niños y que los menores de 5 no toquen pollitos; deja los zapatos del gallinero afuera de casa.":"Family safety (CDC): wash hands with soap after touching birds, eggs or gear; don't kiss or snuggle birds; don't eat near them; supervise kids and keep children under 5 from handling chicks; leave coop shoes outside the house."}</div>`:"";
 return `${backBtn("learn")}<h2 class="sec">${title}</h2>${extra}${D.map(c=>`<div class="card"><div class="fact"><span class="e">${c.e}</span><div><h3>${L(c.n)} ${c.ok===0?`<span class="u yellow">👀</span>`:c.ok===1?`<span class="u green">✓</span>`:""}</h3><p style="margin:0">${L(c.t)}</p></div></div></div>`).join("")}${learnBtn(kind)}`;
}
function vDos(){
 return `${backBtn("learn")}<h2 class="sec">👍 ${t("mDo")}</h2><p class="muted">${t("tapFlip")}</p>
 <div class="grid2">${DOS.map((c,i)=>`<div class="flip" id="fl${i}" onclick="this.classList.toggle('on')"><div class="in2"><div class="f"><span class="tag ${c.d?"do":"dont"}">${c.d?(S.lang==="es"?"SÍ":"DO"):(S.lang==="es"?"NO":"DON'T")}</span><span class="e">${c.e}</span><b>${L(c.n)}</b></div><div class="bk ${c.d?"do":"dont"}">${L(c.t)}</div></div></div>`).join("")}</div>${learnBtn("dos")}`;
}
function vBreeds(){
 const F=[["cold","❄️ "+t("cold")],["heat","🔥 "+t("heat")],["eggs","🥚 "+(S.lang==="es"?"Más huevos":"Top layers")],["color","🌈 "+(S.lang==="es"?"Huevos de color":"Colorful eggs")],["kids","👨‍👩‍👧 "+(S.lang==="es"?"Para niños":"Kid-friendly")],["broody","🪺 "+(S.lang==="es"?"Cluecas":"Broody")]];
 const dots=n=>"●".repeat(n)+"○".repeat(3-n);
 const list=BREEDS.filter(b=>!TMP.bf||b.tg.includes(TMP.bf));
 const allAns=MATCHQ.every(q=>TMP.bm[q.k]);
 let res="";
 if(TMP.bmShow&&allAns){const sc=BREEDS.map(b=>{let s=0;const c=TMP.bm.clim;if(c==="cold"&&b.c===3)s+=2;if(c==="heat"){s+=b.h===3?3:b.h===2?1:-3;}if(c==="mix")s+=1;if(b.tg.includes(TMP.bm.goal))s+=3;if(b.tg.includes(TMP.bm.space))s+=1;return{b,s};}).sort((a,b)=>b.s-a.s).slice(0,3);
  res=`<div class="tip" style="margin-top:10px"><b>🏆 ${t("topMatches")}</b>${sc.map((x,i)=>`<div class="row" style="margin-top:8px">${henSVG(x.b.col,36)}<div><b>${["🥇","🥈","🥉"][i]} ${esc(x.b.n)}</b><div class="muted" style="font-size:13px">${L(x.b.d)}</div></div></div>`).join("")}</div>`;}
 return `${backBtn("learn")}<h2 class="sec">🐓 ${t("mBreeds")}</h2>
 <div class="card"><h2>🎯 ${t("matcherT")}</h2>${MATCHQ.map(q=>`<p style="margin:8px 0 5px;font-weight:900">${L(q.q)}</p><div class="chips">${q.o.map(([k,l])=>`<button class="chip ${TMP.bm[q.k]===k?"on":""}" onclick="TMP.bm['${q.k}']='${k}';TMP.bmShow=false;render()">${L(l)}</button>`).join("")}</div>`).join("")}
 <button class="btn" style="margin-top:12px;${allAns?"":"opacity:.5"}" onclick="if(${allAns}){TMP.bmShow=true;render()}">${t("matcherGo")}</button>${res}</div>
 <p style="font-weight:900;margin:0 0 6px">${t("filters")}</p><div class="chips" style="margin-bottom:12px">${F.map(([k,l])=>`<button class="chip ${TMP.bf===k?"on":""}" onclick="TMP.bf=TMP.bf==='${k}'?null:'${k}';render()">${l}</button>`).join("")}</div>
 ${list.map(b=>`<div class="breed">${henSVG(b.col,52)}<div style="flex:1"><b>${esc(b.n)}</b><div class="stats"><span>🥚 ${b.e} ${t("eggsYr")}</span><span><i class="hegg" style="background:${EGGC[eggKey(b.ec.en)][0]};width:10px;height:13px;display:inline-block;vertical-align:-2px;border:1px solid rgba(0,0,0,.15)"></i> ${L(b.ec)}</span><span>❄️ <span class="dots">${dots(b.c)}</span></span><span>🔥 <span class="dots">${dots(b.h)}</span></span></div><div style="font-size:14px">${L(b.d)}</div></div></div>`).join("")}
 <p class="muted" style="font-size:12.5px">${t("eggNote")}</p>${learnBtn("breeds")}`;
}
function vQuiz(){
 const Q=TMP.quiz;
 if(!Q)return `${backBtn("learn")}<h2 class="sec">🏆 ${t("mQuiz")}</h2><p class="muted">${t("quizIntro")}</p>${QUIZZES.map(q=>`<button class="tile" style="width:100%;margin-bottom:10px;min-height:0;flex-direction:row;align-items:center;gap:12px" onclick="startQuiz('${q.id}')"><span class="e">${q.e}</span><div style="flex:1"><b>${L(q.n)}</b><br><span>${S.quiz[q.id]?`🏅 ${t("best")}: ${S.quiz[q.id]}/5`:"5 ?"}</span></div><span>▶</span></button>`).join("")}`;
 const qz=QUIZZES.find(x=>x.id===Q.id);
 if(Q.i>=qz.qs.length)return `${backBtn("learn","quiz")}<div class="card" style="text-align:center"><div style="font-size:54px">${Q.score>=4?"🏆":Q.score>=2?"🐔":"🐣"}</div><h2>${t("score")}: ${Q.score}/5</h2><p class="muted">${Q.score===5?(S.lang==="es"?"¡Perfecto! Eres todo un experto.":"Perfect! You really know your chickens."):(S.lang==="es"?"¡Bien! Repasa y vuelve a intentarlo.":"Nice! Review and try again.")}</p><div class="row" style="justify-content:center"><button class="btn" onclick="startQuiz('${Q.id}')">${t("retry")}</button><button class="btn alt" onclick="TMP.quiz=null;render()">${t("mQuiz")}</button></div></div>`;
 const it=qz.qs[Q.i];
 return `<button class="back" onclick="TMP.quiz=null;render()">← ${t("back")}</button><div class="card"><div class="row" style="justify-content:space-between"><span class="pill">${qz.e} ${L(qz.n)}</span><span class="muted">${Q.i+1}/5</span></div>
 <div class="bar" style="margin:10px 0"><i style="width:${Q.i/5*100}%"></i></div><h2>${L(it.q)}</h2>
 ${it.o.map((o,j)=>{let c="";if(Q.ans!=null){if(j===it.a)c="right";else if(j===Q.ans)c="wrong";}return `<button class="opt ${c}" ${Q.ans!=null?"disabled":""} onclick="answer(${j})">${L(o)}</button>`;}).join("")}
 ${Q.ans!=null?`<div class="tip">${Q.ans===it.a?"✅":"💡"} ${L(it.x)}</div><button class="btn" style="width:100%;margin-top:10px" onclick="nextQ()">${Q.i===4?t("seeScore"):t("next")} →</button>`:""}</div>`;
}
function startQuiz(id){TMP.quiz={id,i:0,score:0,ans:null};render();window.scrollTo(0,0);}
function answer(j){const Q=TMP.quiz,it=QUIZZES.find(x=>x.id===Q.id).qs[Q.i];Q.ans=j;if(j===it.a)Q.score++;render();}
function nextQ(){const Q=TMP.quiz;Q.i++;Q.ans=null;if(Q.i>=5){const prev=S.quiz[Q.id];petBoost("quiz");if(prev==null){S.quiz[Q.id]=Q.score;save();addXP(15,"🏅");}else if(Q.score>prev){S.quiz[Q.id]=Q.score;save();}if(Q.score===5)feathers();}render();window.scrollTo(0,0);}
function vAid(){return `${backBtn("learn")}<h2 class="sec">🧰 ${t("mAid")}</h2><p class="muted">${S.lang==="es"?"Tenlo listo antes de necesitarlo. Cada condición en Salud tiene su propio kit de cuidados.":"Have it ready before you need it. Every condition in Health has its own care kit."}</p>${FIRSTAID.map(c=>`<div class="card"><div class="fact"><span class="e">${c.e}</span><div><h3>${L(c.n)}</h3><p style="margin:0">${L(c.t)}</p></div></div></div>`).join("")}<p class="disc">${t("notDoc")}</p>${learnBtn("aid")}`;}
function vSrc(){
 return `${backBtn("learn")}<h2 class="sec">📜 ${t("mSrc")}</h2>
 <div class="card"><p style="margin-top:0">${t("srcIntro")}</p><ul class="src">${SOURCES.map(s=>`<li><a href="${s[1]}" target="_blank" rel="noopener">${esc(s[0])}</a></li>`).join("")}</ul>
 <p class="muted">${S.lang==="es"?"Lista de temas de salud guiada por The Chicken Health Handbook de Gail Damerow (Storey). Todo el texto es original.":"Health topic list guided by The Chicken Health Handbook by Gail Damerow (Storey). All text is original."}</p></div>
 <div class="card"><p style="margin-top:0">⚕️ ${t("notVet")}</p><p>💊 ${t("vetNote")}</p><p>🔒 ${t("dataNote")}</p><p>🐣 ${S.lang==="es"?"Juego del pollito virtual":"Virtual chick game"}: <button class="btn alt sm" onclick="S.petOff=!S.petOff;save();render()">${S.petOff?(S.lang==="es"?"Apagado · Encender":"Off · Turn on"):(S.lang==="es"?"Encendido · Apagar":"On · Turn off")}</button></p>
 <button class="btn alt sm" onclick="resetAll(this)">${t("resetAll")}</button></div>
 <p class="disc">Kikirikí · v1 · ${S.lang==="es"?"Hecho con cariño para gallineros caseros":"Made with love for backyard flocks"} 🐔</p>`;
}
function resetAll(b){if(b.dataset.c){const l=S.lang;S={lang:l,flock:[],eggs:{},checks:{},xp:0,learned:{},quiz:{},notes:[],cases:[],eggLog:{},jobs:null,money:{costs:[],sales:[],price:5,cur:"$"},hatch:"",tab:"home",sub:null};save();go("home");}else{b.dataset.c=1;b.textContent=t("sure");b.className="btn sm";}}

const isDesk=()=>window.innerWidth>=1024;
function deskLayout(){
 const app=document.getElementById("app");if(!app)return;
 document.body.classList.toggle("desk",isDesk());
 if(!isDesk())return;
 // Home: two-column dashboard
 if(S.tab==="home"&&!S.sub&&!app.querySelector(":scope>.dcols")&&!app.querySelector(".dash")&&!app.querySelector(".rd-home")&&!app.querySelector(".fm-page")){
  const kids=[...app.children];const vibeAt=kids.findIndex(e=>e.classList.contains("vibe"));
  const L=[],R=[],top=[],bot=[];
  kids.forEach((e,i)=>{if(e.classList.contains("greet2"))top.push(e);else if(e.classList.contains("disc"))bot.push(e);
   else if((vibeAt<0||i<vibeAt)||e.classList.contains("today")||e.classList.contains("petmini"))L.push(e);else R.push(e);});
  const w=document.createElement("div");w.className="dcols";const a=document.createElement("div"),b=document.createElement("div");a.className="dcol";b.className="dcol";
  L.forEach(e=>a.appendChild(e));R.forEach(e=>b.appendChild(e));w.append(a,b);app.innerHTML="";top.forEach(e=>app.appendChild(e));app.appendChild(w);bot.forEach(e=>app.appendChild(e));
 }
 // group runs of list items into responsive grids
 const groups=new Map();
 app.querySelectorAll(".hen,.breed").forEach(el=>{const p=el.parentNode;if(p.classList.contains("dlist"))return;(groups.get(p)||groups.set(p,[]).get(p)).push(el);});
 groups.forEach((els)=>{let run=[];const flush=()=>{if(run.length>1){const g=document.createElement("div");g.className="dlist";run[0].before(g);run.forEach(x=>g.appendChild(x));}run=[];};
  els.forEach(el=>{if(run.length&&run[run.length-1].nextElementSibling!==el)flush();run.push(el);});flush();});
}
let _dk=null;window.addEventListener("resize",()=>{const d=isDesk();if(_dk===null)_dk=d;if(d!==_dk){_dk=d;render();}});