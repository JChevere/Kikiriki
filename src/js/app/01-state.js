
const SAFE={cap:5*1024*1024,db:null,fail:false};
/* Small in-memory error log (newest last). Shown nowhere by default; open the console to read it. */
const KK_LOG=[];
function kkWarn(where,e){try{KK_LOG.push({t:new Date().toISOString(),where,msg:String(e&&e.message||e)});if(KK_LOG.length>30)KK_LOG.shift();console.warn("[Kikirikí]",where,e);}catch(_){}}
window.addEventListener("error",ev=>kkWarn("uncaught",ev.error||ev.message));
window.addEventListener("unhandledrejection",ev=>kkWarn("promise",ev.reason));
/* If saved data can't be read, keep a copy before anything can overwrite it. */
function kkKeepUnreadable(e){kkWarn("load",e);try{const raw=localStorage.getItem(KEY);if(raw&&!localStorage.getItem(KEY+"_unreadable"))localStorage.setItem(KEY+"_unreadable",raw);}catch(_){}}
/* ================= STATE ================= */
const KEY="kikiriki_v1";
let S={lang:((navigator.language||"en").toLowerCase().startsWith("es")?"es":"en"),flock:[],eggs:{},checks:{},xp:0,learned:{},quiz:{},notes:[],hatch:"",tab:"home",sub:null};
try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==="object")S=Object.assign(S,s);}catch(e){kkKeepUnreadable(e);}
if(!S.thV){S.theme="meadow";S.thV=1;}if(S.thV<2){S.theme="leather";S.thV=2;}if(S.thV<3){S.theme="fresh";S.thV=3;}if(S.theme==="leather")S.theme="fresh";if(S.thV<4){S.theme="farm";S.thV=4;}S.theme="farm";
const L=o=>o==null?"":(typeof o==="string"?o:(o[S.lang]!=null?o[S.lang]:o.en));
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function dstr(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
const today=()=>dstr(new Date());
let TMP={sym:[],ck:{},foodQ:"",foodF:"all",libQ:"",bf:null,bm:{},quiz:null,addOpen:false,color:"buff",delId:null};
