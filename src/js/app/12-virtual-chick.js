
/* ================= VIRTUAL CHICK (original virtual-pet game) ================= */
const PULLET=["............","....r.......","..wwww......",".wwkww......","owwwww...ww.","..wwwww.www.","..wwwwwwwww.","..wbbbbwwww.","..wwbbbwww..","...wwwwww...","....o..o....","...oo.oo...."];
const PT={
title:{en:"My Chick",es:"Mi Pollito"},sub:{en:"Raise your virtual chick into a happy hen. Every action teaches real chicken care.",es:"Cría a tu pollito virtual hasta que sea una gallina feliz. Cada acción enseña cuidados reales."},
nameIt:{en:"Name your chick",es:"Ponle nombre a tu pollito"},hatch:{en:"Hatch! 🐣",es:"¡Que nazca! 🐣"},henColor:{en:"Feather color when grown",es:"Color de plumas al crecer"},
food:{en:"Food",es:"Comida"},water:{en:"Water",es:"Agua"},warm:{en:"Warmth",es:"Calor"},clean:{en:"Clean",es:"Limpieza"},happy:{en:"Happy",es:"Feliz"},
aFeed:{en:"Feed",es:"Comida"},aWater:{en:"Water",es:"Agua"},aClean:{en:"Clean",es:"Limpiar"},aPlay:{en:"Cuddle",es:"Mimos"},aHeatUp:{en:"Heat +5°",es:"Calor +5°"},aHeatDn:{en:"Heat −5°",es:"Calor −5°"},
aVent:{en:"Clean vent",es:"Limpiar cloaca"},aElec:{en:"Electrolytes",es:"Electrolitos"},aEgg:{en:"Collect egg",es:"Recoger huevo"},
pick:{en:"What will you feed?",es:"¿Qué le darás?"},close:{en:"Close",es:"Cerrar"},
week:{en:"Week",es:"Semana"},stChick:{en:"Chick",es:"Pollito"},stPullet:{en:"Pullet",es:"Polla"},stHen:{en:"Hen",es:"Gallina"},
ideal:{en:"ideal",es:"ideal"},heatOff:{en:"Fully feathered. No heat lamp needed!",es:"Ya emplumada. ¡No necesita lámpara!"},
sleeping:{en:"Shh… sleeping 💤 (night time). Needs slow down while she sleeps.",es:"Shh… durmiendo 💤 (es de noche). Sus necesidades bajan mientras duerme."},
eggsLaid:{en:"eggs laid",es:"huevos puestos"},daysOld:{en:"days of care",es:"días de cuidado"},
restart:{en:"Raise a new chick",es:"Criar un pollito nuevo"},sure:{en:"Tap again to confirm",es:"Toca otra vez para confirmar"},
lesson:{en:"Chicken lesson",es:"Lección de gallinas"},growTip:{en:"1 real day = 1 chick week. Check in a few times a day!",es:"1 día real = 1 semana de pollito. ¡Visítala varias veces al día!"}};
const pt=k=>L(PT[k])||k;
const PFOODS=[
{id:"starter",e:"🌾",n:{en:"Chick starter",es:"Iniciador"},ok:"chick",f:40,h:3,t:{en:"Starter feed (about 18–20% protein) is exactly what growing chicks need.",es:"El iniciador (18–20% de proteína) es justo lo que necesita un pollito."}},
{id:"layer",e:"🥣",n:{en:"Layer feed",es:"Alimento de postura"},ok:"hen",f:40,h:3,t:{en:"Layer feed has extra calcium for eggshells. Perfect for hens, but too much calcium for chicks' growing kidneys.",es:"El de postura tiene calcio extra para las cáscaras. Perfecto para gallinas, pero demasiado calcio para los riñones de un pollito."}},
{id:"grower",e:"🌽",n:{en:"Grower feed",es:"Alimento de crecimiento"},ok:"pullet",f:40,h:3,t:{en:"Grower feed (16–18% protein, low calcium) is ideal for pullets before they lay.",es:"El de crecimiento (16–18%, poco calcio) es ideal para pollas antes de poner."}},
{id:"worm",e:"🪱",n:{en:"Mealworms (treat)",es:"Gusanos (premio)"},treat:1,f:10,h:20,t:{en:"Yum! Treats are great in small amounts. Keep them to about 10% of the diet.",es:"¡Rico! Los premios están bien en poca cantidad. Mantenlos cerca del 10% de la dieta."}},
{id:"egg",e:"🍳",n:{en:"Scrambled egg (treat)",es:"Huevo revuelto (premio)"},treat:1,f:15,h:15,t:{en:"Cooked egg is a protein boost, a classic treat for chicks and molting hens.",es:"El huevo cocido es un extra de proteína, premio clásico para pollitos y gallinas en muda."}},
{id:"melon",e:"🍉",n:{en:"Watermelon (treat)",es:"Sandía (premio)"},treat:1,f:8,h:15,w:15,t:{en:"Watermelon is a juicy, cooling treat, great on hot days.",es:"La sandía es un premio jugoso y refrescante, ideal en días de calor."}},
{id:"choc",e:"🍫",n:{en:"Chocolate",es:"Chocolate"},bad:1,t:{en:"NO! Chocolate has theobromine and caffeine, which are toxic to chickens. Your chick refuses it.",es:"¡NO! El chocolate tiene teobromina y cafeína, tóxicas para las gallinas. Tu pollito lo rechaza."}},
{id:"avo",e:"🥑",n:{en:"Avocado",es:"Aguacate"},bad:1,t:{en:"NO! Avocado skin and pit contain persin, which is toxic to birds.",es:"¡NO! La cáscara y el hueso del aguacate tienen persina, tóxica para aves."}},
{id:"bread",e:"🍞",n:{en:"Bread",es:"Pan"},meh:1,f:10,h:5,t:{en:"Bread fills her up without nutrition. A tiny bit is OK, but it's not real food.",es:"El pan llena sin nutrir. Un poquito está bien, pero no es comida de verdad."}}];
function petStage(p){const wk=petWeek(p);return wk<=6?"chick":wk<=17?"pullet":"hen";}
function petWeekBase(p){return Math.floor((Date.now()-p.born)/864e5)+1;}
function petTarget(p){const wk=petWeek(p);return wk>6?null:Math.max(70,95-5*(wk-1));}
function isNight(){const h=new Date().getHours();return h>=21||h<6;}
function petTickBase(){const p=S.pet;if(!p)return;const now=Date.now();let hrs=(now-(p.last||now))/36e5;if(hrs<=0)return;
 const night=isNight();const k=night?0.4:1;
 p.food=Math.max(0,p.food-5*hrs*k);p.water=Math.max(0,p.water-7*hrs*k);p.clean=Math.max(0,p.clean-3*hrs*k);p.happy=Math.max(0,p.happy-4*hrs*k);
 if(petStage(p)==="chick"&&p.clean<20&&!p.sick&&Math.random()<Math.min(0.9,hrs*0.15))p.sick="pasty";
 if(p.water<8&&!p.sick)p.sick="dry";
 if(petStage(p)==="hen"&&!p.egg&&p.food>40&&p.happy>40&&(now-(p.lastEgg||p.born))>20*36e5){p.egg=true;}
 if(petTarget(p)==null)p.heat=null;
 p.last=now;save();}
function petWarmth(p){const tg=petTarget(p);if(tg==null)return{v:100,st:"ok"};const d=(p.heat||tg)-tg;const v=Math.max(0,100-Math.abs(d)*6);return{v,st:d<=-8?"cold":d>=8?"hot":"ok",d};}
function petHappy(p){const fl=(typeof flockLink==="function")?flockLink():{cap:100};return Math.min(p.happy,fl.cap);}
function petMood(p){const w=petWarmth(p).v;const fl=(typeof flockLink==="function")?flockLink():{pen:0};const m=(p.food+p.water+p.clean+petHappy(p)+w)/5-(p.sick?25:0)-fl.pen;return Math.max(0,Math.min(100,m));}
function petXP(n){const td=today();if(!S.petX||S.petX.d!==td)S.petX={d:td,n:0};if(S.petX.n>=25)return;const g=Math.min(n,25-S.petX.n);S.petX.n+=g;S.xp+=g;}
function petSay(msg,icon){TMP.petMsg={m:msg,i:icon||"💡"};}
function petAct(a,arg){const p=S.pet;if(!p)return;petTick();if(isNight()&&!["heatUp","heatDn"].includes(a)){toast("💤");return;}
 const st=petStage(p);
 if(a==="feed"){TMP.petFeed=true;}
 else if(a==="food"){const f=PFOODS.find(x=>x.id===arg);TMP.petFeed=false;
  if(f.bad){p.happy=Math.max(0,p.happy-5);petSay(L(f.t),"⛔");}
  else{ if(f.ok&&f.ok!==st){ if(f.id==="layer"&&st!=="hen"){petSay(L(f.t),"⚠️");p.food=Math.min(100,p.food+15);} else {p.food=Math.min(100,p.food+30);petSay(L(f.t),"💡");petXP(1);} }
   else if(f.treat){const td=today();if(p.treatD!==td){p.treatD=td;p.treats=0;}p.treats++;
     if(p.treats>3){p.happy=Math.max(0,p.happy-5);petSay(S.lang==="es"?"Demasiados premios hoy. Le duele la pancita. Recuerda la regla 90/10: casi todo debe ser alimento completo.":"Too many treats today, and her tummy hurts. Remember the 90/10 rule: most of what she eats should be complete feed.","🤢");}
     else{p.food=Math.min(100,p.food+f.f);p.happy=Math.min(100,p.happy+f.h);if(f.w)p.water=Math.min(100,p.water+f.w);petSay(L(f.t),"😋");petXP(1);}}
   else if(f.meh){p.food=Math.min(100,p.food+f.f);petSay(L(f.t),"🤷");}
   else{p.food=Math.min(100,p.food+f.f);p.happy=Math.min(100,p.happy+f.h);petSay(L(f.t),"✅");petXP(2);}}}
 else if(a==="water"){p.water=Math.min(100,p.water+45);petSay(S.lang==="es"?"Agua fresca y limpia. Los pollitos necesitan un bebedero bajo; unas canicas evitan que se ahoguen.":"Fresh, clean water. Chicks need a shallow waterer, and a few marbles keep them from drowning.","💧");petXP(2);}
 else if(a==="clean"){p.clean=100;petSay(S.lang==="es"?"¡Cama limpia y seca! La cama húmeda es donde crece la coccidiosis.":"Clean, dry bedding! Wet bedding is where coccidiosis grows.","🧽");petXP(2);}
 else if(a==="play"){p.happy=Math.min(100,p.happy+20);const r=Math.random()<0.5;petSay(r?(S.lang==="es"?"¡Pío pío! Cargarla con calma la vuelve mansa. 🧼 Lávate las manos después (consejo del CDC).":"Peep peep! Gentle handling makes friendly chickens. 🧼 Wash your hands afterward (CDC tip)."):(S.lang==="es"?"Le encanta tu compañía. Las gallinas son sociales y sufren solas; en la vida real, cría al menos 3.":"She loves your company. Chickens are social and do poorly alone; in real life, keep at least 3."),"💛");petXP(1);}
 else if(a==="heatUp"||a==="heatDn"){const tg=petTarget(p);if(tg==null)return;p.heat=Math.max(60,Math.min(105,(p.heat||tg)+(a==="heatUp"?5:-5)));const w=petWarmth(p);
  petSay(w.st==="cold"?(S.lang==="es"?"Muy frío: los pollitos se amontonan bajo el calor. Súbelo.":"Too cold: chicks huddle under the heat. Turn it up."):w.st==="hot"?(S.lang==="es"?"Muy caliente: los pollitos se alejan y jadean. Bájalo.":"Too hot: chicks move away and pant. Turn it down."):(S.lang==="es"?`¡Perfecto! En la semana ${petWeek(p)} lo ideal es ${tg}°F (${Math.round((tg-32)*5/9)}°C). Baja 5°F cada semana.`:`Perfect! In week ${petWeek(p)} the ideal is ${tg}°F (${Math.round((tg-32)*5/9)}°C). Lower it 5°F each week.`),"🌡️");if(w.st==="ok")petXP(1);}
 else if(a==="vent"){p.sick=null;p.clean=Math.max(p.clean,70);petSay(S.lang==="es"?"Cloaca tapada resuelta: ablándala con un paño tibio y húmedo, nunca la jales. Luego revisa la temperatura.":"Pasty butt fixed: soften it with a warm, damp cloth, never pull. Then check the brooder temperature.","🩹");petXP(3);}
 else if(a==="elec"){p.sick=null;p.water=80;petSay(S.lang==="es"?"Los electrolitos ayudan a un ave deshidratada a recuperarse rápido. (Nunca los mezcles con yodo.)":"Electrolytes help a dehydrated bird recover fast. (Never mix them with iodine.)","⚡");petXP(3);}
 else if(a==="egg"){p.egg=false;p.lastEgg=Date.now();p.eggs=(p.eggs||0)+1;feathers();petSay(S.lang==="es"?"¡Un huevo! Recoge los huevos a diario para que estén limpios y no se rompan.":"An egg! Collect eggs daily so they stay clean and don't get broken.","🥚");petXP(5);}
 save();renderPet();header();}
function hatchPetBase(){const n=(val("petName")||"").trim()||(S.lang==="es"?"Pío":"Peep");const sa=TMP.petStart||"chick";const back=sa==="hen"?19:sa==="pullet"?7:0;S.pet={name:n.slice(0,20),color:(TMP.cl&&TMP.cl.color)||TMP.petColor||"buff",look:Object.assign({},(TMP.cl||{}).look||{}),born:Date.now()-back*864e5,lastEgg:Date.now()-21*36e5,last:Date.now(),food:80,water:80,clean:100,happy:80,heat:95,sick:null,eggs:0};
 petSay(sa==="chick"?(S.lang==="es"?`¡Nació ${n}! Primera semana: criadora a 95°F (35°C), iniciador y agua fresca.`:`${n} hatched! Week one: brooder at 95°F (35°C), starter feed and fresh water.`):sa==="pullet"?(S.lang==="es"?`¡${n} llegó como polla! Dale alimento de crecimiento (16–18%), aún no de postura.`:`${n} arrived as a pullet! Give her grower feed (16–18%), not layer feed yet.`):(S.lang==="es"?`¡${n} llegó como gallina adulta! Alimento de postura, concha de ostión y recoge sus huevos a diario.`:`${n} arrived as a grown hen! Layer feed, oyster shell, and collect her eggs daily.`),sa==="chick"?"🐣":"🐔");save();feathers();renderPet();}
function resetPetBase(b){if(b.dataset.c){S.pet=null;save();renderPet();}else{b.dataset.c=1;b.textContent=pt("sure");}}
function petSpriteBase(p,night){const st=petStage(p);const mood=petMood(p);const w=petWarmth(p);const fl=flockLink();
 const m=night?"sleep":p.sick?"sick":(fl.worst&&fl.worst.m<=2)?"sad":w.st!=="ok"?"sad":mood>80?"excited":mood>55?"happy":mood>30?"neutral":"sad";
 const cls=night?"":(w.st==="cold"?"shiver":(fl.worst&&fl.worst.m<=2)?"sad":mood>60?"bob":"");
 return drawHen(p.color,{kind:st,mood:m,look:Object.assign({},p.look||{},{kind:st}),cls:"petsvg "+cls});}
function petBubble(p){if(isNight())return"💤";const fl=flockLink();if(fl.worst&&fl.worst.m<=2)return"🩺";if(fl.rec.length&&!fl.worst)return"🎉";if(p.egg)return"🥚";if(p.sick==="pasty")return"🩹";if(p.sick==="dry")return"🥵";const w=petWarmth(p);if(w.st==="cold")return"🥶";if(w.st==="hot")return"🥵";
 const lows=[["food","🍽️"],["water","💧"],["clean","🧽"],["happy","💛"]].filter(x=>p[x[0]]<35).sort((a,b)=>p[a[0]]-p[b[0]]);if(lows.length)return lows[0][1];return petMood(p)>75?"❤️":"🎵";}
function petHTMLBase(){
 const ri=rankIdx(S.xp);
 if(!S.pet){return `<div class="petbox"><div class="scene" style="position:relative">${scene(ri,true)}<div class="petegg">🥚</div></div>
  <h2 style="margin:12px 0 2px">🐣 ${pt("title")}</h2><p class="muted" style="margin:0 0 10px">${pt("sub")}</p>
  <label class="muted">${S.lang==="es"?"¿Cómo empiezas?":"How do you want to start?"}</label><div class="chips" style="margin:6px 0 10px">${[["chick","🐣",{en:"Baby chick",es:"Pollito bebé"}],["pullet","🐥",{en:"Young pullet",es:"Polla joven"}],["hen","🐔",{en:"Grown hen",es:"Gallina adulta"}]].map(o=>`<button class="chip ${(TMP.petStart||"chick")===o[0]?"on":""}" onclick="TMP.petStart='${o[0]}';const v=val('petName');renderPet();setVal('petName',v)">${o[1]} ${L(o[2])}</button>`).join("")}</div>
  <label class="muted">${(TMP.petStart||"chick")==="chick"?pt("nameIt"):(S.lang==="es"?"Ponle nombre a tu gallina":"Name your hen")}</label><input class="in" id="petName" maxlength="20" placeholder="${S.lang==="es"?"Pío":"Peep"}" style="margin-bottom:8px">
  <label class="muted">${pt("henColor")}</label>${(TMP.cl||cedInit(TMP.petColor||"buff"),TMP.cedR="petKeep",charEditor({noType:true,kind:TMP.petStart||"chick"}))}
  <button class="btn" style="width:100%" onclick="hatchPet()">${(TMP.petStart||"chick")==="chick"?pt("hatch"):(S.lang==="es"?"¡Bienvenida a casa! 🐔":"Welcome home! 🐔")}</button><p class="muted" style="font-size:12.5px;text-align:center;margin:8px 0 0">${pt("growTip")}</p></div>`;}
 petTick();const p=S.pet,night=isNight(),st=petStage(p),wk=petWeek(p),tg=petTarget(p),w=petWarmth(p);
 const stName=pt(st==="chick"?"stChick":st==="pullet"?"stPullet":"stHen");
 const bar=(k,ic,v,extra)=>`<div class="pbar"><span>${ic}</span><div class="bar"><i style="width:${Math.round(v)}%;background:${v<25?"#D2402F":v<50?"#E3A21A":"linear-gradient(90deg,#8DBB45,#3E9B4F)"}"></i></div><small>${extra||Math.round(v)}</small></div>`;
 const acts=[];
 if(p.sick==="pasty")acts.push(["vent","🩹",pt("aVent"),"hot"]);
 if(p.sick==="dry")acts.push(["elec","⚡",pt("aElec"),"hot"]);
 if(p.egg)acts.push(["egg","🥚",pt("aEgg"),"hot"]);
 acts.push(["feed","🍽️",pt("aFeed")],["water","💧",pt("aWater")],["clean","🧽",pt("aClean")],["play","💛",pt("aPlay")]);
 const msg=TMP.petMsg;
 return `<div class="petbox"><div class="row" style="justify-content:space-between;margin-bottom:8px"><div><b style="font-size:18px">${esc(p.name)}</b> <span class="stage">${stName}</span></div><span class="muted" style="font-size:13px">${pt("week")} ${wk}${p.eggs?` · 🥚 ${p.eggs}`:""}</span></div>
 <div class="scene petscene ${night?"night":""}" style="position:relative">${scene(ri,true)}${night?`<div class="nightsky"><span>🌙</span></div>`:""}
  ${tg!=null&&!night?`<div class="lamp" style="opacity:${Math.min(1,Math.max(0.25,((p.heat||tg)-60)/45))}"></div>`:""}
  <div class="petwrap ps-${st}">${petSprite(p,night)}<div class="bubble">${petBubble(p)}</div>${p.clean<30?`<div class="stink">〰️</div>`:""}</div></div>
 ${night?`<p class="muted" style="text-align:center;margin:8px 0">${pt("sleeping")}</p>`:""}
 <div class="pbars">${bar("food","🍽️",p.food)}${bar("water","💧",p.water)}${bar("warm","🌡️",w.v,tg!=null?`${p.heat||tg}°/${tg}°`:"✓")}${bar("clean","🧽",p.clean)}${bar("happy","💛",petHappy(p),petHappy(p)<p.happy?"🔗 "+Math.round(petHappy(p)):"")}</div>
 ${linkPanel()}
 ${tg!=null?`<div class="row heatrow"><button class="btn alt sm" onclick="petAct('heatDn')">❄️ ${pt("aHeatDn")}</button><span class="muted" style="flex:1;text-align:center;font-size:13px">🌡️ ${p.heat||tg}°F · ${pt("ideal")} ${tg}°F (${Math.round((tg-32)*5/9)}°C)</span><button class="btn alt sm" onclick="petAct('heatUp')">🔥 ${pt("aHeatUp")}</button></div>`:`<p class="muted" style="text-align:center;font-size:13px;margin:6px 0">🪶 ${pt("heatOff")}</p>`}
 <div class="pacts">${acts.map(a=>`<button class="pact ${a[3]||""}" onclick="petAct('${a[0]}')"><span>${a[1]}</span>${a[2]}</button>`).join("")}</div>
 ${TMP.petFeed?`<div class="feedmenu"><b>${pt("pick")}</b><div class="pacts" style="margin-top:8px">${PFOODS.map(f=>`<button class="pact" onclick="petAct('food','${f.id}')"><span>${f.e}</span>${L(f.n)}</button>`).join("")}</div><button class="btn alt sm" style="margin-top:8px" onclick="TMP.petFeed=false;renderPet()">${pt("close")}</button></div>`:""}
 ${msg?`<div class="tip petmsg"><b>${msg.i} ${pt("lesson")}</b><p style="margin:4px 0 0">${esc(msg.m)}</p></div>`:""}
 <details class="sg" style="margin-top:10px"><summary><span>⚙️ ${S.lang==="es"?"Opciones":"Options"}</span><span class="car">▾</span></summary><div style="padding:0 12px 12px"><p class="muted" style="margin-top:0;font-size:13px">${pt("growTip")}</p><button class="btn alt sm" onclick="resetPet(this)">${pt("restart")}</button> <button class="btn alt sm" onclick="S.petOff=true;save();go('home')">🙈 ${S.lang==="es"?"Ocultar juego":"Hide game"}</button></div></details></div>`;}
