
/* ===== Installable offline web app (PWA) ===== */
const PWA={prompt:null,standalone:false,framed:false,ios:false};
try{PWA.framed=window.top!==window.self;}catch(e){PWA.framed=true;}
PWA.standalone=(window.matchMedia&&matchMedia("(display-mode: standalone)").matches)||navigator.standalone===true;
PWA.ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
function pwaHosted(){return /^https?:$/.test(location.protocol)&&!PWA.framed;}
function pwaBoot(){
 if(!pwaHosted())return;
 if("serviceWorker" in navigator){
  const hadCtl=!!navigator.serviceWorker.controller;
  navigator.serviceWorker.register("sw.js").catch(()=>{});
  navigator.serviceWorker.addEventListener("controllerchange",()=>{if(hadCtl)pwaUpdateBar();});
 }
 /* Ask the browser not to clear this app's storage when space runs low. */
 try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persisted().then(p=>{if(!p)navigator.storage.persist();});}catch(e){}
 window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();PWA.prompt=e;if(S.tab==="settings")render();});
 window.addEventListener("appinstalled",()=>{PWA.prompt=null;toast(ES()?"✅ Kikirikí instalado":"✅ Kikirikí installed");});
}
function pwaUpdateBar(){const es=ES();if(document.getElementById("updBar"))return;const b=document.createElement("div");b.id="updBar";b.setAttribute("role","status");
 b.innerHTML=`<b>✨ ${es?"Nueva versión lista":"New version ready"}</b><button onclick="location.reload()">${es?"Actualizar":"Update"}</button>`;document.body.appendChild(b);}
function pwaInstall(){if(!PWA.prompt)return;PWA.prompt.prompt();PWA.prompt.userChoice.finally(()=>{PWA.prompt=null;render();});}
function installCard(){const es=ES();
 if(!pwaHosted())return"";
 if(PWA.standalone)return`<div class="card inst"><h3>📲 ${es?"App instalada":"App installed"}</h3><p class="muted" style="margin:0">${es?"Kikirikí funciona sin internet. Tus datos viven en este teléfono: guarda una copia de vez en cuando.":"Kikirikí works with no internet. Your data lives on this phone, so save a backup now and then."}</p></div>`;
 const warn=`<p class="muted" style="margin:10px 0 0;font-size:14px">⚠️ ${es?"La app instalada tiene su propio espacio. Si ya tienes datos aquí, guarda una copia antes, y luego ábrela en la app con “Restaurar”.":"The installed app has its own storage. If you already have data here, save a backup first, then open it in the app with “Restore”."}</p><button class="btn alt" style="margin-top:10px" onclick="backupDownload()">💾 ${es?"Guardar copia primero":"Save a backup first"}</button>`;
 if(PWA.prompt)return`<div class="card inst"><h3>📲 ${es?"Instala Kikirikí":"Install Kikirikí"}</h3><p class="muted" style="margin:0 0 10px">${es?"Ábrela desde tu pantalla de inicio, a pantalla completa y sin internet.":"Open it from your home screen, full screen, with no internet needed."}</p><button class="btn" onclick="pwaInstall()">${es?"Instalar app":"Install app"}</button>${warn}</div>`;
 if(PWA.ios)return`<div class="card inst"><h3>📲 ${es?"Ponla en tu pantalla de inicio":"Add to your Home Screen"}</h3><ol class="inst-steps"><li>${es?"En Safari, toca <b>Compartir</b> (el cuadro con la flecha ⬆️).":"In Safari, tap <b>Share</b> (the square with the arrow ⬆️)."}</li><li>${es?"Toca <b>Agregar a pantalla de inicio</b>.":"Tap <b>Add to Home Screen</b>."}</li><li>${es?"Toca <b>Agregar</b>. ¡Listo! Funciona sin internet.":"Tap <b>Add</b>. Done: it works offline."}</li></ol>${warn}</div>`;
 return`<div class="card inst"><h3>📲 ${es?"Instala Kikirikí":"Install Kikirikí"}</h3><p class="muted" style="margin:0">${es?"En el menú del navegador, elige <b>Instalar app</b> o <b>Agregar a pantalla de inicio</b>.":"In your browser menu, choose <b>Install app</b> or <b>Add to Home Screen</b>."}</p>${warn}</div>`;}
try{pwaBoot();}catch(e){}