
/* ================= HEADER & NAV ================= */
function header(){
 document.getElementById("logoHen").innerHTML=APPICON;
 document.getElementById("tagline").textContent=t("tagline");
 document.getElementById("xpBadge").textContent=`🌽 ${S.xp}`;
 const hp=document.getElementById("hProf");if(hp){const h0=S.flock&&S.flock[0];hp.innerHTML=`<span class="av">${h0?henArt(h0,36,"happy"):drawHen("buff",{size:36,mood:"happy"})}</span><div><b>${esc(S.name||(S.lang==="es"?"Cuidador":"Keeper"))}</b><small>${esc(L(RANKS[rankIdx(S.xp)].n))}</small></div>`;}
 const tabs=fmNavTabs();const tl=k=>k==="more"?(S.lang==="es"?"Más":"More"):k==="health"?(S.lang==="es"?"Salud":"Health"):k==="flock"?(S.lang==="es"?"Parvada":"Flock"):t(k);
 document.getElementById("nav").innerHTML=tabs.map(([k,i])=>k==="fab"?`<button class="fab" aria-label="Quick log" onclick="openQuick()"><span>＋</span><span class="nl">${S.lang==="es"?"Registro rápido":"Quick log"}</span></button>`:`<button data-k="${k}" class="${S.tab===k?"on":""}" aria-label="${esc(tl(k))}" title="${esc(tl(k))}" onclick="go('${k}')"><span class="ic">${i}</span><span class="nl">${tl(k)}</span></button>`).join("");
}
