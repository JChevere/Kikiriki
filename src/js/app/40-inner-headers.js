
/* ===== unified Farmhouse header for every inner screen ===== */
const WRAP_ART={food:"l_nutrition",settings:"more",search:"learn",quiz:"learn",breeds:"l_breeds",tools:"records",aid:"l_health",gloss:"books",chick:"p_start",coop:"l_housing",feed:"l_nutrition",beh:"l_behavior",dos:"l_bio",src:"books",academy:"course",pet:"flock",odd:"l_eggs",case:"l_health",newcase:"l_health",search2:"learn"};
const CH_ART={news:"learn",parasites:"l_health",infect:"l_health",disorders:"l_nutrition",therapy:"l_health",human:"l_bio",rules:"books",myths:"books",poultry:"l_breeds",kitchen:"l_nutrition",family:"p_start",resources:"books","ch-gen":"l_breeds","ch-start":"p_start","ch-coop":"l_housing","ch-feed":"l_nutrition","ch-incub":"l_hatch","ch-eggs":"l_eggs","ch-anat":"l_breeds","ch-beh":"l_behavior","ch-hb":"l_bio","ch-par":"l_health","ch-inf":"l_health","ch-nut":"l_nutrition","ch-diag":"l_health","ch-treat":"l_health","ch-human":"l_bio","ch-rules":"books","ch-myths":"books","ch-beyond":"l_breeds","ch-kitchen":"l_nutrition","ch-kids":"p_start","ch-seasons":"l_molt","ch-breeds":"l_breeds","ch-fam":"l_bio","ch-garden":"l_housing","ch-hand":"l_behavior","ch-az":"l_health","ch-gloss":"books","ch-help":"l_health"};
function wrapArt(){const t=S.tab,sb=S.sub||"";if(t==="food"||t==="settings"||t==="search")return WRAP_ART[t];if(t==="home"&&sb)return WRAP_ART[sb]||"flock";if(t==="flock"){if(sb==="odd")return"l_eggs";if(sb.startsWith("case:")||sb.startsWith("new"))return"l_health";return"flock";}
 if(t==="learn"){if(sb.startsWith("enc:"))return CH_ART[sb.slice(4)]||"learn";if(sb.startsWith("art:")){ency();const x=ENCY_ARTS.find(z=>z.a.id===sb.slice(4));return x?(CH_ART[x.ch.id]||"learn"):"learn";}if(sb.startsWith("lesson:"))return"course";return WRAP_ART[sb]||"learn";}return"flock";}
function wrapApplies(){const t=S.tab,sb=S.sub||"";if(["food","settings","search"].includes(t))return true;if(t==="home")return!!sb;if(t==="flock")return sb==="odd"||sb.startsWith("case:")||sb.startsWith("new");if(t==="learn")return!!sb&&sb!=="academy"&&!sb.startsWith("course:");return false;}
function wrapTxt(h){const d=document.createElement("textarea");d.innerHTML=h.replace(/<[^>]+>/g,"");return d.value.replace(/^[^\p{L}\p{N}]+/u,"").trim();}
function fmWrap(html){if(!wrapApplies())return html;const es=ES();let back=null,title="",sub="";
 html=html.replace(/^\s*<button class="back" onclick="([^"]*)">(?:←\s*)?([\s\S]*?)<\/button>/,(m,on,lab)=>{back=on;const l=wrapTxt(lab);if(l&&l!==t("back"))sub=l;return"";});
 html=html.replace(/<h2 class="sec"[^>]*>([\s\S]*?)<\/h2>/,(m,inner)=>{title=wrapTxt(inner);return"";});
 if(!title){const t2=S.tab,sb=S.sub||"";if(sb.startsWith("art:")||sb.startsWith("lesson:")){title=sub||(es?"Lectura":"Reading");sub="";}else if(sb.startsWith("case:")){title=es?"Seguimiento de salud":"Health tracking";}else if(sb==="pet"){title=es?"Juego de la parvada":"Flock game";sub=es?"Tus aves reales, en el juego":"Your real birds, in the game";}else if(sb.startsWith("enc:")){const ch=ency().find(c=>c.id===sb.slice(4));title=ch?wrapTxt(L(ch.t||ch.n||{en:"",es:""})):(es?"Capítulo":"Chapter");}else title="Kikirikí";}
 if(!back)back=S.tab==="learn"?"go('learn')":S.tab==="home"?"go('home')":"go('more')";
 return`<div class="fm-page fm-inner">${fmHero({title:esc(title),sub:sub?esc(sub):"",ph:PH[wrapArt()]||PH.flock,back,cls:"short art"})}<div class="fm-body">${html}</div></div>`;}

function renderBase(){try{remBadge();}catch(e){}S.pp=S.pp||[];
 header();applyDisplay();
 const nav=document.getElementById("nav");
 if(!S.onb){if(!S.prof&&S.flock.length)S.prof={has:"hens"};nav.style.display="none";const a0=document.getElementById("app");a0.dataset.view="onboard";a0.innerHTML=vOnboard();return;}
 nav.style.display="";
 const V={home:vHome,flock:()=>S.sub?vFlock():`<div class="fm-flockp">${fmHero({title:ES()?"Mi parvada":"My Flock",sub:"📍 "+esc(S.coop||(ES()?"Gallinero":"Backyard Coop")),ph:PH.flock,right:`<button class="fm-hb r" onclick="rdAddOpen()" aria-label="add">＋</button>`})}${vFlock()}</div>`,health:()=>S.sub==="log"?vHealthLog():S.sub&&S.sub.startsWith("pp:")?vPP(S.sub.slice(3)):vHealth(),food:vFood,learn:()=>!S.sub?fmLearn():S.sub==="academy"?vAcademy():S.sub.startsWith("course:")?fmCourse(S.sub.slice(7)):vLearn(),more:vMore,search:vSearch,settings:vSettings}[S.tab]||vHome;
 const app=document.getElementById("app");app.dataset.view=S.tab+(S.sub?"-sub":"");app.innerHTML=fmWrap(V());document.body.classList.toggle("pdview",S.tab==="flock"&&String(S.sub||"").startsWith("hen:")&&!(TMP.cedEdit&&TMP.cl));deskLayout();tocInit();foldify();if(document.body.classList.contains("tocon"))tocPaint();const pk=S.tab+"|"+(S.sub||"");if(TMP.lastPg!==pk){TMP.lastPg=pk;app.classList.remove("turn");void app.offsetWidth;app.classList.add("turn");}
 if(S.tab==="search"){const e=document.getElementById("gSearch");if(e&&!(TMP.acQ||"")){try{e.focus();}catch(x){}}}
}
document.documentElement.lang=S.lang;
render();
IC.start();

try{safeBoot();}catch(e){}

/* a11y: keyboard + roles for clickable non-button elements */
(function(){const fix=root=>{(root.querySelectorAll?root:document).querySelectorAll('[onclick]:not(button):not(a):not(input):not(select):not(textarea):not(label):not([role])').forEach(e=>{e.setAttribute("role","button");if(!e.hasAttribute("tabindex"))e.tabIndex=0;});};
 new MutationObserver(ms=>{ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)fix(n.parentNode||n);}));}).observe(document.body,{childList:true,subtree:true});fix(document);
 document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.getAttribute&&e.target.getAttribute("role")==="button"&&e.target.tagName!=="BUTTON"){e.preventDefault();e.target.click();}});
 syncLang();})();
/* render = draw the current screen, then keep <html lang> in step with the app language */
function syncLang(){document.documentElement.lang=S.lang==="es"?"es":"en";}
function render(){renderBase.apply(this,arguments);syncLang();}