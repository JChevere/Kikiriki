
/* ===== Link: real flock health -> virtual chick ===== */
function flockLink(){const open=(S.cases||[]).filter(c=>c.status==="open").map(c=>({c,m:lastMood(c)||3,tr:(c.entries.filter(e=>e.trend).slice(-1)[0]||{}).trend||null}));
 const rec=(S.cases||[]).filter(c=>c.status==="rec"&&c.recAt&&Date.now()-c.recAt<3*864e5);
 open.sort((a,b)=>a.m-b.m);const worst=open[0]||null;
 let cap=100,pen=0;if(worst){cap=worst.m<=1?25:worst.m===2?40:worst.m===3?70:100;pen=worst.m<=2?20:worst.m===3?8:0;if(worst.tr==="worse")pen+=8;}
 if(rec.length&&!worst)pen=-10;return{open,worst,rec,cap,pen};}
function linkPanel(){const fl=flockLink();if(!fl.open.length&&!fl.rec.length)return `<div class="linkbox ok">🔗 ${S.lang==="es"?"Conectado a tu parvada real: todas sanas, ¡tu pollito está tranquilo!":"Linked to your real flock: everyone's healthy, so your chick is relaxed!"}</div>`;
 const rows=fl.open.slice(0,3).map(o=>`<button class="linkrow" onclick="go('flock','case:${o.c.id}')">${caseAvatar(o.c,26)}<span style="flex:1;text-align:left"><b>${esc(caseWho(o.c))}</b> · ${esc(condName(o.c))}<br><small>${tt("day")} ${caseDay(o.c)} · ${MOODS[o.m-1][1]} ${L(MOODS[o.m-1][2])}${o.tr?" · "+TRENDS.find(x=>x[0]===o.tr)[1]:""}</small></span><span>›</span></button>`).join("");
 const w=fl.worst;const msg=w?(w.m<=2?(S.lang==="es"?`${esc(S.pet.name)} está preocupado por ${esc(caseWho(w.c))}. Anota sus cuidados para animarlos a los dos.`:`${esc(S.pet.name)} is worried about ${esc(caseWho(w.c))}. Log her care to cheer them both up.`):w.m===3?(S.lang==="es"?`${esc(S.pet.name)} está pendiente de ${esc(caseWho(w.c))}.`:`${esc(S.pet.name)} is keeping an eye on ${esc(caseWho(w.c))}.`):(S.lang==="es"?`¡${esc(caseWho(w.c))} va mejorando y ${esc(S.pet.name)} está feliz!`:`${esc(caseWho(w.c))} is getting better, and ${esc(S.pet.name)} is happy!`)):(S.lang==="es"?"🎉 ¡Una gallina se recuperó! Tu pollito está celebrando.":"🎉 A hen recovered! Your chick is celebrating.");
 return `<div class="linkbox ${w&&w.m<=2?"bad":w&&w.m===3?"mid":"ok"}"><b>🔗 ${S.lang==="es"?"Conectado a tu parvada real":"Linked to your real flock"}</b><p style="margin:3px 0 6px">${msg}</p>${rows}</div>`;}
