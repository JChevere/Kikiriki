
/* ===== Real-life logging feeds the chick ===== */
const BOOST={
egg:{fx:{food:12,happy:4},en:"🥚 You logged eggs, so {n} got a good meal!",es:"🥚 Registraste huevos, ¡así que {n} comió bien!"},
check:{fx:{clean:35,water:30,happy:8},en:"✅ Daily health check done. {n}'s coop is fresh and watered!",es:"✅ Revisión diaria hecha. ¡El corral de {n} está limpio y con agua!"},
note:{fx:{happy:10},en:"📓 Journal entry saved. {n} loves hearing flock stories.",es:"📓 Nota guardada. A {n} le encantan las historias de la parvada."},
care:{fx:{happy:10,water:10},en:"💞 Care logged. {n} felt it.",es:"💞 Cuidado registrado. {n} lo sintió."},
case:{fx:{happy:6},en:"🩺 You started tracking a sick bird. {n} is glad you're watching over the flock.",es:"🩺 Empezaste a seguir a un ave enferma. {n} se alegra de que cuides a la parvada."},
hen:{fx:{happy:12},en:"🐔 A new flockmate! {n} has a new friend.",es:"🐔 ¡Una compañera nueva! {n} tiene una nueva amiga."},
learn:{fx:{happy:6},en:"📚 You learned something. Smart keepers raise happy chicks!",es:"📚 Aprendiste algo. ¡Los criadores listos crían pollitos felices!"},
quiz:{fx:{happy:12},en:"🏆 Quiz finished! {n} is cheering for you.",es:"🏆 ¡Quiz terminado! {n} te está aplaudiendo."},
sym:{fx:{happy:3},en:"🔍 Checking symptoms early keeps everyone safer.",es:"🔍 Revisar síntomas a tiempo protege a todas."}};
function petBoostBase(kind){const p=S.pet;if(!p||S.petOff)return;const b=BOOST[kind];if(!b)return;const td=today();if(!S.pb||S.pb.d!==td)S.pb={d:td,c:{}};S.pb.c[kind]=(S.pb.c[kind]||0)+1;if(S.pb.c[kind]>5)return;
 petTick();Object.entries(b.fx).forEach(([k,v])=>{p[k]=Math.min(100,(p[k]||0)+v);});if(kind==="check"&&p.sick==="pasty")p.sick=null;if(kind==="check"&&p.sick==="dry")p.sick=null;
 petSay(L(b).replace("{n}",p.name),"🔗");save();}

function petMini(){if(S.petOff)return "";
 if(!S.pet)return `<button class="card petmini" onclick="go('home','pet')"><div class="pmsky"><span style="font-size:30px">🥚</span></div><div style="flex:1;text-align:left"><b>🐣 ${pt("title")}</b><div class="muted" style="font-size:13px">${S.lang==="es"?"Cría un pollito o adopta una gallina virtual. Tus registros reales la alimentan.":"Raise a chick or adopt a virtual hen. Your real-life logs feed it."}</div></div><span class="pmgo">${S.lang==="es"?"Empezar":"Start"} ›</span></button>`;
 petTick();const p=S.pet,m=petMood(p),st=petStage(p),fl=flockLink();
 const stName=pt(st==="chick"?"stChick":st==="pullet"?"stPullet":"stHen");
 const line=fl.worst&&fl.worst.m<=2?(S.lang==="es"?`Preocupado por ${caseWho(fl.worst.c)}`:`Worried about ${caseWho(fl.worst.c)}`):(TMP.petMsg?TMP.petMsg.m:(S.lang==="es"?"Toca para jugar":"Tap to play"));
 return `<button class="card petmini" onclick="go('home','pet')"><div class="pmsky ${isNight()?"night":""}">${petSprite(p,isNight())}<span class="pmb">${petBubble(p)}</span></div><div style="flex:1;min-width:0;text-align:left"><b>${esc(p.name)}</b> <span class="stage">${stName}</span><div class="bar" style="height:9px;margin:5px 0"><i style="width:${Math.round(m)}%;background:${m<35?"#D2402F":m<60?"#E3A21A":"linear-gradient(90deg,#8DBB45,#3E9B4F)"}"></i></div><div class="muted pmline">${esc(line)}</div></div><span class="pmgo">${S.lang==="es"?"Jugar":"Play"} ›</span></button>`;}
function vPet(){return `${backBtn("home")}<div class="card" id="petCard">${petHTML()}</div>
 <div class="card"><h3>🔗 ${S.lang==="es"?"Cómo se alimenta solo":"How it feeds itself"}</h3><p class="muted" style="margin:0;font-size:14px">${S.lang==="es"?"No tienes que jugar para que esté bien. Cada registro real lo cuida: 🥚 huevos = comida · ✅ revisión diaria = limpieza y agua · 📓 diario y 💞 cuidados = felicidad · 📚 lecciones y 🏆 quizzes = ánimo. Y si una gallina real está enferma, lo sentirá.":"You don't have to play for it to thrive. Every real-life log cares for it: 🥚 eggs = food · ✅ daily health check = clean & water · 📓 journal and 💞 care logs = happiness · 📚 lessons and 🏆 quizzes = cheer. And if a real hen is sick, it feels it."}</p></div>`;}
function renderPet(){const el=document.getElementById("petCard");if(el)el.innerHTML=petHTML();}
setInterval(()=>{if(S.tab==="home"&&S.sub==="pet"&&S.pet&&!TMP.petFeed){renderPet();}},60000);
