
/* ===== simplified structure ===== */
function tocToggle(v){if(v===false){document.body.classList.remove("tocon");return;}go("more","index");}
function tocInit(){if(TMP.scrollHook)return;TMP.scrollHook=1;let ly=0;window.addEventListener("scroll",()=>{const y=window.scrollY;const b=document.body;if(y>140&&y>ly+6)b.classList.add("navhide");else if(y<ly-6||y<140)b.classList.remove("navhide");b.classList.toggle("scrolled",y>60);ly=y;},{passive:true});}
function vIndex(){const es=ES();const q=(TMP.tocQ||"").toLowerCase();
 return`<div class="fm-page">${fmHero({title:es?"Todas las páginas":"All pages",sub:es?"Todo Kikirikí en un solo lugar":"Everything in Kikirikí, in one place",ph:PH.more,back:"go('more')",cls:"short"})}
 <div class="fm-search"><span aria-hidden="true">🔍</span><input id="idxQ" placeholder="${es?"Buscar una página…":"Find a page…"}" value="${esc(TMP.tocQ||"")}" oninput="TMP.tocQ=this.value;const p=this.selectionStart;render();const i=document.getElementById('idxQ');i.focus();i.setSelectionRange(p,p)" aria-label="${es?"Buscar una página":"Find a page"}"></div>
 ${TOC().map(([num,t1,ic,items])=>{const its=items.filter(x=>!q||x[0].toLowerCase().includes(q)||t1.toLowerCase().includes(q));if(!its.length)return"";return`<h2 class="fm-h2">${t1}</h2><div class="fm-group">${its.map(([n,i,on])=>fmRow({i,bg:"#F6EFE2",t:n,js:on})).join("")}</div>`;}).join("")}</div>`;}
function vHealthLog(){const es=ES();return`<div class="fm-page">${fmHero({title:es?"Registro de salud":"Health Log",sub:es?"Enfermedades, síntomas y tratamientos":"Illness, symptoms, and treatments",ph:PH.kit,back:"go('health')",cls:"kit short"})}<div style="height:14px"></div>${trackerSection()}</div>`;}

function V_flockEggs(){return `<div class="fm-flockp">${fmHero({title:ES()?"Mi parvada":"My Flock",sub:"📍 "+esc(S.coop||(ES()?"Gallinero":"Backyard Coop")),ph:PH.flock})}${vFlock()}</div>`;}
