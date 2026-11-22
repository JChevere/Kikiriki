
/* ===== FLOCK GAME — real birds live in the game ===== */
HSTAT.push(["passed","🕊️",{en:"Passed away",es:"Falleció"}]);
const isPassed=h=>h&&((h.status||"")==="passed"||(S.cases||[]).some(c=>c.henId===h.id&&c.status==="lost"));
function gameInit(){if(!S.game){S.game={b:{},act:null};if(S.pet&&!S.pet.henId){const id="v"+Date.now().toString(36);S.pet.vid=id;S.game.b[id]=S.pet;S.game.act=id;}}
 const keys=Object.keys(S.game.b).filter(k=>k[0]==="v"||S.flock.some(h=>h.id===k));const nb={};keys.forEach(k=>nb[k]=S.game.b[k]);S.game.b=nb;
 if(!S.game.b[S.game.act])S.game.act=keys[0]||null;S.pet=S.game.act?S.game.b[S.game.act]:null;if(S.pet)gameSync(S.game.act);}
function gameHen(id){return S.flock.find(h=>h.id===id);}
function gameSync(id){const p=S.game.b[id];const h=gameHen(id);if(!p||!h)return p;const b=henBreedDef(h);p.henId=id;p.name=h.name;p.color=h.color||(b&&b.col)||"buff";p.look=Object.assign({},h.look||(b?breedLook(b.n,b.col):{}));p.roo=(h.status||"")==="rooster";p.real=1;
 const dead=isPassed(h);if(dead&&!p.dead){p.dead=h.passedOn||today();}else if(!dead&&p.dead){delete p.dead;}return p;}
function gameNew(id){return{henId:id,born:Date.now(),lastEgg:Date.now()-21*36e5,last:Date.now(),food:85,water:85,clean:100,happy:85,heat:null,sick:null,eggs:0};}
function gameAdd(id){S.game.b[id]=gameNew(id);gameSync(id);S.game.act=id;S.pet=S.game.b[id];TMP.gPick=false;const h=gameHen(id);petSay(ES()?`¡${h.name} ya vive en tu juego! Cuídala aquí y en la vida real.`:`${h.name} now lives in your game! Care for her here and in real life.`,"🐔");save();feathers();go("home","pet");}
function gameSel(id){S.game.act=id;S.pet=S.game.b[id];gameSync(id);TMP.petMsg=null;TMP.petFeed=false;save();render();}
function gameRemove(id,b){if(!b.dataset.c){b.dataset.c=1;b.textContent=ES()?"Toca otra vez para quitar del juego":"Tap again to remove from game";return;}delete S.game.b[id];S.game.act=Object.keys(S.game.b)[0]||null;S.pet=S.game.act?S.game.b[S.game.act]:null;save();render();}
/* real age drives stage for real birds */
function petWeek(p){if(p&&p.real){const h=gameHen(p.henId);const w=h&&ageWeeks(h.hatch);if(w!=null)return Math.max(1,w);return (h&&h.status==="growing")?3:30;}return petWeekBase(p);}
function petTick(){const p=S.pet;if(p&&p.dead)return;if(p&&p.real){const h=gameHen(p.henId);if(h&&!["laying"].includes(h.status||"laying"))p.egg=false;}petTickBase();if(p&&p.real){const h=gameHen(p.henId);if(h&&((h.status||"laying")!=="laying"))p.egg=false;}}
function petSprite(p,night){if(p.dead)return drawHen(p.color,{kind:p.roo?"rooster":"hen",mood:"sleep",look:Object.assign({},p.look||{}),cls:"petsvg"});if(p.roo&&petStage(p)==="hen"){return drawHen(p.color,{kind:"rooster",mood:night?"sleep":petMood(p)>55?"happy":"neutral",look:Object.assign({},p.look||{},{kind:"rooster"}),cls:"petsvg "+(petMood(p)>60&&!night?"bob":"")});}return petSpriteBase(p,night);}
/* boosts reach every living bird in the game */
function petBoost(kind){if(!S.game||S.petOff)return petBoostBase(kind);const act=S.pet;const ids=Object.keys(S.game.b).filter(id=>!S.game.b[id].dead);const pb0=JSON.stringify(S.pb||null);ids.forEach((id,i)=>{S.pet=S.game.b[id];if(i)S.pb=JSON.parse(pb0);petBoostBase(kind);});S.pet=act;}
function gameRoster(){const es=ES();const ids=Object.keys(S.game.b);
 return`<div class="g-roster">${ids.map(id=>{const p=S.game.b[id];if(p.real)gameSync(id);const m=p.dead?0:petMood(Object.assign({},p));return`<button class="g-chip ${id===S.game.act?"on":""} ${p.dead?"dead":""}" onclick="gameSel('${id}')"><span class="g-av">${drawHen(p.color,{kind:p.roo?"rooster":petStage(p),mood:p.dead?"sleep":m>55?"happy":"neutral",look:p.look||{}})}</span><b>${esc(p.name)}</b><i style="width:${p.dead?100:Math.round(m)}%;background:${p.dead?"#B9AF9E":m<35?"#D2402F":m<60?"#E3A21A":"#3B8A3A"}"></i>${p.dead?`<em>🕊️</em>`:""}</button>`;}).join("")}<button class="g-chip add" onclick="TMP.gPick=!TMP.gPick;render()"><span class="g-av">＋</span><b>${es?"Agregar":"Add"}</b></button></div>`;}
function gamePicker(first){const es=ES();const avail=S.flock.filter(h=>!S.game.b[h.id]&&!isPassed(h));
 return`<div class="g-pick">${first?`<h2>${es?"¿Quién vive en tu juego?":"Who lives in your game?"}</h2><p class="muted">${es?"Elige aves de tu parvada real. Tendrán su nombre, raza, edad y estado reales. Puedes cuidar a varias a la vez.":"Pick birds from your real flock. They keep their real name, breed, age and status. You can care for several at once."}</p>`:`<b class="g-pt">${es?"Agregar de tu parvada":"Add from your flock"}</b>`}
 <div class="g-pgrid">${avail.map((h,i)=>`<button onclick="gameAdd('${h.id}')">${henThumb(h,64,i)}<b>${esc(h.name)}</b><small>${esc((h.breed||(es?"Mestiza":"Mixed")).replace(/ \(.*\)/,""))}</small></button>`).join("")||`<p class="muted" style="grid-column:1/-1;margin:4px 0">${S.flock.length?(es?"Todas tus aves ya están en el juego.":"All your birds are already in the game."):(es?"Primero agrega aves a tu parvada.":"Add birds to your flock first.")}</p>`}
 <button class="add" onclick="rdAddOpen()"><span>＋</span><b>${es?"Ave nueva":"New bird"}</b><small>${es?"a la parvada":"to your flock"}</small></button></div>
 ${first?`<details class="g-virt"><summary>${es?"¿Sin parvada aún? Cría un pollito virtual":"No flock yet? Raise a virtual chick"}</summary><div id="gVirt">${TMP.gVirt?gVirtForm():`<button class="btn alt" onclick="TMP.gVirt=1;render()">🐣 ${es?"Empezar":"Start"}</button>`}</div></details>`:""}
 <p class="g-note">🕊️ ${es?"Tus aves nunca mueren por descuido en el juego. Solo fallecen aquí si registras en su ficha que fallecieron en la vida real.":"Birds in your game never die from neglect. They only pass away here if you record in their profile that they passed away in real life."}</p></div>`;}
function gVirtForm(){const sp=S.pet;S.pet=null;const h=petHTMLBase();S.pet=sp;return h;}
function hatchPet(){const prev=S.pet;S.pet=null;hatchPetBase();const p=S.pet;if(p){const id="v"+Date.now().toString(36);p.vid=id;S.game.b[id]=p;S.game.act=id;TMP.gVirt=0;save();}render();}
function memorial(p){const es=ES();const h=gameHen(p.henId);return`<div class="petbox g-mem"><div class="g-memart">${drawHen(p.color,{size:150,kind:p.roo?"rooster":"hen",mood:"sleep",look:Object.assign({},p.look||{})})}<span class="g-dove">🕊️</span></div><h2>${es?"En memoria de":"In loving memory of"} ${esc(p.name)}</h2><p class="muted">${h&&h.breed?esc(h.breed)+" · ":""}${h&&h.hatch?(es?"Nació ":"Hatched ")+fmDate(h.hatch)+" · ":""}${es?"Falleció ":"Passed "}${fmDate(typeof p.dead==="string"?p.dead:today())}</p>
 ${p.eggs||h?`<div class="fm-3" style="margin:12px 0"><div><b>${h?Object.keys(S.eggLog).reduce((a,d)=>a+(dayLog(d)[h.id]||0),0):0}</b><small>${es?"huevos reales":"real eggs"}</small></div><div><b>${p.eggs||0}</b><small>${es?"huevos en el juego":"game eggs"}</small></div><div><b>${Math.max(1,Math.round((Date.now()-p.born)/864e5))}</b><small>${es?"días en el juego":"days in game"}</small></div></div>`:""}
 <p class="g-note">${es?"Gracias por cuidarla. Sigue en tu historial y en su pasaporte de salud.":"Thank you for caring for her. She stays in your records and her Health Passport."}</p>
 <div class="row" style="gap:8px;justify-content:center;flex-wrap:wrap">${h?`<button class="btn alt sm" onclick="go('flock','hen:${h.id}')">📋 ${es?"Ver su ficha":"View her profile"}</button>`:""}<button class="btn alt sm" onclick="gameRemove('${S.game.act}',this)">${es?"Quitar del juego":"Remove from game"}</button></div></div>`;}
function petHTML(){if(!S.game)gameInit();const es=ES();const ids=Object.keys(S.game.b);
 if(!ids.length)return gamePicker(true);
 if(S.pet&&S.pet.real)gameSync(S.game.act);
 const top=gameRoster()+(TMP.gPick?gamePicker(false):"");
 if(S.pet&&S.pet.dead)return top+memorial(S.pet);
 let body=petHTMLBase();
 if(S.pet&&S.pet.real){const h=gameHen(S.pet.henId);body=body.replace(/<button class="btn alt sm" onclick="resetPet\(this\)">[^<]*<\/button>/,`<button class="btn alt sm" onclick="go('flock','hen:${S.pet.henId}')">📋 ${es?"Su ficha real":"Her real profile"}</button> <button class="btn alt sm" onclick="gameRemove('${S.game.act}',this)">${es?"Quitar del juego":"Remove from game"}</button>`);
  body=body.replace(`<span class="stage">`,`<span class="g-real">${es?"Ave real":"Real bird"}</span> <span class="stage">`);}
 return top+body;}
/* hen death is recorded manually in her profile */
function henPass(id){const h=gameHen(id);if(TMP.passC!==id){TMP.passC=id;TMP.hdOpen="st";toast(ES()?"Toca 🕊️ otra vez para confirmar":"Tap 🕊️ again to confirm");render();return;}TMP.passC=null;h.prevStatus=h.status||"laying";h.status="passed";h.passedOn=today();if(S.game&&S.game.b[id])gameSync(id);save();render();toast(ES()?`🕊️ En memoria de ${h.name}`:`🕊️ In memory of ${h.name}`);}
gameInit();

function resetPet(b){if(b.dataset.c&&S.game&&S.game.act){delete S.game.b[S.game.act];S.game.act=Object.keys(S.game.b)[0]||null;S.pet=S.game.act?S.game.b[S.game.act]:null;save();render();return;}resetPetBase(b);}
