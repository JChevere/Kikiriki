import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,sys,json
from playwright.async_api import async_playwright
P=[("home","go('home')"),("flock","TMP.ft='birds';go('flock')"),("eggs","TMP.ft='eggs';go('flock')"),("hen","TMP.htab='ov';go('flock','hen:a')"),("pass","TMP.htab='hl';go('flock','hen:a')"),("health","go('health')"),("learn","go('learn')"),("more","go('more')"),("settings","go('settings')"),("food","go('food')"),("art","go('learn','art:'+ENCY_ARTS[5].a.id)"),("pet","go('home','pet')"),("index","go('more','index')")]
JS='''()=>{const out={noname:[],small:[],lowc:[],noinlabel:[]};
const name=e=>(e.getAttribute('aria-label')||e.getAttribute('title')||e.innerText||'').trim()||(e.querySelector('img[alt]:not([alt=""])')?1:0);
document.querySelectorAll('button,a[href],[onclick]').forEach(e=>{if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')return;if(e.closest('details:not([open])')&&!e.closest('summary'))return;const r=e.getBoundingClientRect();if(!r.width)return;
 if(!name(e))out.noname.push(e.outerHTML.slice(0,90));
 if((e.tagName==='BUTTON')&&(r.width<32||r.height<32))out.small.push(Math.round(r.width)+'x'+Math.round(r.height)+' '+(e.className||'')+' '+(e.innerText||e.getAttribute('aria-label')||'').slice(0,20));});
document.querySelectorAll('input:not([type=hidden]),select,textarea').forEach(e=>{if(!e.offsetParent)return;const id=e.id;const lab=e.getAttribute('aria-label')||e.getAttribute('placeholder')||e.closest('label')||(id&&document.querySelector('label[for="'+id+'"]'));if(!lab)out.noinlabel.push(e.outerHTML.slice(0,80));});
const lum=c=>{const m=c.match(/[\\d.]+/g);if(!m)return null;const [r,g,b]=m.slice(0,3).map(v=>{v=v/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b};
const bg=e=>{while(e){const c=getComputedStyle(e).backgroundColor;const a=c.match(/[\\d.]+/g);if(a&&(a.length<4||+a[3]>.9)&&getComputedStyle(e).backgroundImage==='none')return c;if(getComputedStyle(e).backgroundImage!=='none')return null;e=e.parentElement}return 'rgb(255,255,255)'};
const seen=new Set();document.querySelectorAll('small,p,span,b,label,em,h1,h2,h3,div').forEach(e=>{if(!e.offsetParent)return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1))return;const cs=getComputedStyle(e);const b=bg(e);if(!b)return;const L1=lum(cs.color),L2=lum(b);if(L1==null||L2==null)return;const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);const fs=parseFloat(cs.fontSize),bold=+cs.fontWeight>=700;const need=(fs>=24||(fs>=18.66&&bold))?3:4.5;if(cr<need){const k=cs.color+'|'+b+'|'+Math.round(fs);if(seen.has(k))return;seen.add(k);out.lowc.push(cr.toFixed(2)+' '+cs.color+' on '+b+' '+fs+'px "'+e.innerText.slice(0,24)+'"')}});
return out}'''
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    pg=await b.new_page(viewport={"width":390,"height":844})
    await pg.goto("file://"+HTML);await pg.wait_for_timeout(400)
    await pg.evaluate("S.onb=1;S.name='Jorge';S.flock=[{id:'a',name:'Rosie',breed:'Rhode Island Red'},{id:'b',name:'Pepper',breed:'Leghorn'}];S.eggLog[today()]={a:1};ency();save()")
    agg={'noname':{},'small':{},'lowc':{},'noinlabel':{}}
    for k,js in P:
      await pg.evaluate(js);await pg.wait_for_timeout(350)
      r=await pg.evaluate(JS)
      for kk in r:
        for x in r[kk]: agg[kk].setdefault(x,[]).append(k)
    for kk in agg:
      print('==',kk,len(agg[kk]))
      for x,v in list(agg[kk].items())[:int(sys.argv[1]) if len(sys.argv)>1 else 25]: print('  ',x,'@',','.join(v[:3]))
    await b.close()
asyncio.run(m())
