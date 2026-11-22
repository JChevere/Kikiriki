
/* ===== Reminders: exported to the phone's own Calendar (works with the app closed, fully offline) ===== */
function remCfg(){if(!S.rem)S.rem={coop:true,coopT:"19:00",jobs:true,treat:true,lastExport:""};return S.rem;}
function remTreatments(){const td=today();return (S.pp||[]).filter(e=>e.end&&e.end>=td&&(e.type==="med"||e.type==="quar"));}
function remHenName(id){if(id==="all")return ES()?"toda la parvada":"the whole flock";const h=S.flock.find(x=>x.id===id);return h?h.name:"";}
function icsEsc(t){return String(t).replace(/\\/g,"\\\\").replace(/;/g,"\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n");}
function icsFold(line){const enc=new TextEncoder();const out=[];let cur="",n=0;for(const ch of line){const b=enc.encode(ch).length;if(n+b>74){out.push(cur);cur=" ";n=1;}cur+=ch;n+=b;}out.push(cur);return out.join("\r\n");}
function icsDT(dateStr,hhmm){return dateStr.replace(/-/g,"")+"T"+hhmm.replace(":","")+"00";}
function addDays(dateStr,n){const d=new Date(dateStr+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10);}
function remBuildICS(){const c=remCfg(),es=ES(),td=today(),stamp=new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d+/,"");const ev=[];
 const add=(uid,start,title,desc,rrule)=>{ev.push(["BEGIN:VEVENT","UID:"+uid+"@kikiriki.app","DTSTAMP:"+stamp,"DTSTART:"+start,"DURATION:PT15M","SUMMARY:"+icsEsc(title),"DESCRIPTION:"+icsEsc(desc)].concat(rrule?["RRULE:"+rrule]:[],["BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:"+icsEsc(title),"TRIGGER:PT0M","END:VALARM","END:VEVENT"]));};
 const t=c.coopT||"19:00";
 if(c.coop)add("coop-check",icsDT(td,t),es?"🐔 Revisar el gallinero":"🐔 Coop check",es?"Agua, alimento, recoger huevos y cerrar la puerta.":"Water, feed, collect eggs and lock the door.","FREQ=DAILY");
 if(c.jobs)jobs().forEach(j=>{const due=jobDue(j);const start=due>0?addDays(td,due):td;const name=typeof j.n==="object"?L(j.n):j.n;
  add("job-"+j.id,icsDT(start,t),"🧹 "+name,(es?"Tarea de Kikirikí, cada ":"Kikirikí chore, every ")+j.every+(es?" días.":" days."),"FREQ=DAILY;INTERVAL="+Math.max(1,j.every));});
 if(c.treat)remTreatments().forEach(e=>{const who=remHenName(e.henId);const med=e.type==="med";
  add("pp-"+e.id,icsDT(e.end,"08:00"),med?(es?`💊 Termina el retiro: ${who}`:`💊 Withdrawal ends: ${who}`):(es?`⛔ Termina la cuarentena: ${who}`:`⛔ Quarantine ends: ${who}`),
   med?(es?`${e.t||"Medicamento"}. Confirma con la etiqueta antes de comer sus huevos.`:`${e.t||"Medication"}. Check the label before eating the eggs.`):(es?"Revisa que esté sana antes de juntarla con la parvada.":"Check she's healthy before she rejoins the flock."));});
 const lines=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Kikiriki//Flock reminders//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:Kikirikí"];
 ev.forEach(e=>lines.push(...e));lines.push("END:VCALENDAR");return{ics:lines.map(icsFold).join("\r\n")+"\r\n",count:ev.length};}
function remExport(){const es=ES();const r=remBuildICS();if(!r.count)return toast(es?"Elige al menos un recordatorio":"Pick at least one reminder");
 const name="kikiriki-reminders.ics";const blob=new Blob([r.ics],{type:"text/calendar;charset=utf-8"});
 try{const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.rel="noopener";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},4000);}
 catch(e){location.href="data:text/calendar;charset=utf-8,"+encodeURIComponent(r.ics);}
 remCfg().lastExport=today();save();render();toast(es?`📅 ${r.count} recordatorios listos: ábrelo y toca “Agregar”`:`📅 ${r.count} reminders ready. Open it and tap “Add”`);}
function remToggle(k){const c=remCfg();c[k]=!c[k];save();render();}
function vRemind(){const es=ES(),c=remCfg(),js=jobs(),tr=remTreatments(),ok=pwaHosted();
 const chk=(k,title,sub)=>`<div class="rm-row"><label><input type="checkbox" ${c[k]?"checked":""} onchange="remToggle('${k}')"><span>${title}<small>${sub}</small></span></label></div>`;
 return`<div class="fm-page">${fmHero({title:es?"Recordatorios":"Reminders",sub:es?"Para que nada se te pase":"So nothing slips",ph:PH.more,cls:"short",back:"go('more')"})}
 <div class="rm-card"><h3>⏰ ${es?"¿Qué quieres recordar?":"What should we remind you about?"}</h3>
 ${chk("coop",es?"Revisión diaria del gallinero":"Daily coop check",es?"Agua, alimento, huevos y cerrar la puerta":"Water, feed, eggs and lock the door")}
 <div class="rm-row"><label for="rmT"><span>${es?"Hora":"Time"}<small>${es?"También se usa para las tareas":"Also used for chores"}</small></span></label><input type="time" id="rmT" value="${c.coopT||"19:00"}" onchange="remCfg().coopT=this.value||'19:00';save()"></div>
 ${chk("jobs",es?"Tareas del gallinero":"Coop chores",js.length?js.slice(0,3).map(j=>(typeof j.n==="object"?L(j.n):j.n)).join(", ")+(js.length>3?` +${js.length-3}`:""):(es?"Aún no tienes tareas":"No chores yet"))}
 ${chk("treat",es?"Fin de tratamientos":"Treatment end dates",tr.length?tr.map(e=>`${remHenName(e.henId)} (${es?"hasta":"until"} ${new Date(e.end+"T12:00:00").toLocaleDateString(es?"es":"en",{month:"short",day:"numeric"})})`).join(", "):(es?"Nada activo ahora. Se agregan desde el Pasaporte de salud.":"Nothing active now. They come from the Health Passport."))}
 </div>
 ${ok?`<button class="btn rm-cta" onclick="remExport()">📅 ${es?"Agregar a mi calendario":"Add to my calendar"}</button>
 <p class="rm-note">${es?"Tu teléfono te avisará aunque Kikirikí esté cerrado y sin internet. Si cambias tus tareas o empiezas un tratamiento, vuelve a tocar el botón.":"Your phone's Calendar will alert you even when Kikirikí is closed and offline. If you change chores or start a treatment, tap the button again."}${c.lastExport?`<br>${es?"Último envío":"Last added"}: ${c.lastExport}`:""}</p>
 <p class="rm-note">${es?"En iPhone: toca “Agregar todos” en la pantalla que se abre.":"On iPhone: tap “Add All” on the screen that opens."}</p>`
 :`<div class="rm-card"><p class="rm-empty" style="margin:0">${es?"Esto funciona en la app instalada. Abre tu enlace de Kikirikí en Safari o Chrome, agrégala a tu pantalla de inicio y vuelve aquí.":"This works in the installed app. Open your Kikirikí link in Safari or Chrome, add it to your Home Screen, then come back here."}</p></div>`}
 </div>`;}
/* App icon badge = chores due today or overdue (installed app only). */
function remBadge(){try{if(!navigator.setAppBadge||!PWA.standalone)return;const n=jobs().filter(j=>jobDue(j)<=0).length;n?navigator.setAppBadge(n):navigator.clearAppBadge();}catch(e){}}
