
/* ================= HELPERS ================= */
function toast(m){const el=document.getElementById("toast");el.textContent=m;el.classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove("show"),2200);}
function feathers(){for(let i=0;i<18;i++){const f=document.createElement("div");f.className="feather";f.textContent=["🪶","🌽","🥚","🐣"][i%4];f.style.left=Math.random()*100+"vw";f.style.animationDelay=(Math.random()*0.8)+"s";document.body.appendChild(f);setTimeout(()=>f.remove(),3800);}}
function addXP(n,why){const before=rankIdx(S.xp);S.xp+=n;save();const after=rankIdx(S.xp);if(after>before){feathers();toast("🎉 "+t("rankUp")+" "+L(RANKS[after].n));}else toast(`+${n} 🌽 ${why||""}`);header();}
function streak(){let n=0;const d=new Date();if(!S.checks[dstr(d)])d.setDate(d.getDate()-1);while(S.checks[dstr(d)]){n++;d.setDate(d.getDate()-1);}return n;}
function ageWeeks(h){if(!h)return null;const ms=new Date()-new Date(h+"T00:00:00");return Math.max(0,Math.floor(ms/6048e5));}
function stageOf(w){
 if(w==null)return null;
 if(w<6)return{n:{en:"Chick",es:"Pollito"},t:{en:"Keep the brooder warm and check vents daily. See Chick care.",es:"Mantén tibia la criadora y revisa la cloaca a diario. Ve Pollitos."}};
 if(w<16)return{n:{en:"Grower",es:"En crecimiento"},t:{en:"Grower or starter feed, no layer feed yet. Start 'see but don't touch' introductions.",es:"Alimento de crecimiento o iniciador, aún no de postura. Empieza la integración 'ver sin tocar'."}};
 if(w<24)return{n:{en:"Point of lay",es:"Cerca de poner"},t:{en:"A reddening comb means eggs are coming! Switch to layer feed at the first egg and get the nests ready.",es:"¡Cresta roja = huevos pronto! Cambia a postura con el primer huevo y prepara los nidos."}};
 if(w<156)return{n:{en:"Layer",es:"Ponedora"},t:{en:"Peak laying years. Layer feed, oyster shell, and a quick monthly mite check.",es:"Años de máxima postura. Alimento de postura, concha y revisión mensual de ácaros."}};
 return{n:{en:"Golden girl",es:"Veterana"},t:{en:"Laying slows with age, but she still eats bugs, makes compost and keeps you company. Watch her weight and keep her warm and dry.",es:"La postura baja con la edad, pero sigue comiendo bichos, haciendo composta y acompañándote. Vigila su peso y mantenla tibia y seca."}};}
function ageText(w){if(w==null)return"";return w<104?`${w} ${t("weeks")}`:`${(w/52).toFixed(1)} ${t("years")}`;}
function go(tab,sub){S.tab=tab;S.sub=sub||null;save();render();window.scrollTo(0,0);}
function setLang(l){S.lang=l;save();document.documentElement.lang=l;render();}
function learnBtn(id){return S.learned[id]?`<p class="done learnbtn">${t("learned")}</p>`:`<button class="btn green learnbtn" onclick="learn('${id}')">${t("markLearned")}</button>`;}
function learn(id){if(S.learned[id])return;S.learned[id]=1;petBoost("learn");addXP(5);render();}
const backBtn=(tab,sub)=>`<button class="back" onclick="go('${tab}'${sub?`,'${sub}'`:""})">← ${t("back")}</button>`;
const uBadge=u=>`<span class="u ${u}">${u==="red"?"🔴 "+t("uRed"):u==="yellow"?"🟡 "+t("uYellow"):"🟢 "+t("uGreen")}</span>`;
