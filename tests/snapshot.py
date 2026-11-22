#!/usr/bin/env python3
"""Behavior snapshot: renders many screens with a frozen clock and seeded randomness, records
exact #app HTML and computed styles of every element. Used to prove refactors change nothing.
  python3 tests/snapshot.py save     -> tests/output/snapshot.json
  python3 tests/snapshot.py compare  -> diff against the saved one"""
import sys,os,json,asyncio,hashlib
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,OUT
from playwright.async_api import async_playwright
INIT="""(()=>{let s=12345;Math.random=()=>{s=(s*1103515245+12345)%2147483648;return s/2147483648;};})();"""
SEED="""S.onb=1;S.name='Jorge';S.coop='Casa';S.flock=[];const br=['Rhode Island Red','Buff Orpington','Easter Egger','Silkie','Barred Rock'];
['Rosie','Butter','Bluebell','Cotton','Pepper'].forEach((n,i)=>S.flock.push({id:'h'+i,name:n,breed:br[i],status:i==3?'growing':'laying',hatch:'2025-04-0'+(i+1)}));
for(let d=0;d<40;d++){const k=new Date(Date.now()-d*864e5).toISOString().slice(0,10);S.eggLog[k]={};let t=0;S.flock.forEach((h,i)=>{if((d+i)%3){S.eggLog[k][h.id]=1;t++}});S.eggs[k]=t;}
S.pp=[{id:'m1',type:'med',henId:'h0',d:today(),t:'Fenbendazole',end:new Date(Date.now()+5*864e5).toISOString().slice(0,10)}];save();"""
SCREENS=[("onboard",None),("home","go('home')"),("flock","go('flock')"),("eggs","TMP.ft='eggs';go('flock')"),("jobs","TMP.ft='jobs';go('flock')"),("hen","go('flock','hen:h0')"),
 ("health","go('health')"),("hlog","go('health','log')"),("learn","go('learn')"),("chapter","go('learn','enc:ch-coop')"),("food","go('food')"),
 ("more","go('more')"),("index","go('more','index')"),("remind","go('more','remind')"),("settings","go('settings')"),("game","go('home','pet')")]
PROPS=["display","position","width","height","margin","padding","color","background-color","background-image","font-size","font-weight","border-radius","box-shadow","grid-template-columns","flex-direction","gap","opacity","transform","z-index","overflow"]
async def run():
    res={}
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        for W in (390,1440):
            ctx=await b.new_context(viewport={"width":W,"height":900});await ctx.add_init_script(INIT)
            pg=await ctx.new_page();await pg.clock.install(time="2026-11-20T15:00:00Z");await pg.clock.pause_at("2026-11-20T15:00:01Z");errs=[]
            pg.on("pageerror",lambda e:errs.append(str(e)))
            await pg.goto("file://"+HTML);await pg.add_style_tag(content="*,*::before,*::after{animation:none!important;transition:none!important}");await pg.clock.run_for(1500)
            for name,js in SCREENS:
                if js is None: pass
                else:
                    if name=="home": await pg.evaluate(SEED)
                    await pg.evaluate(js+";window.scrollTo(0,0)");await pg.clock.run_for(800)
                snap=await pg.evaluate("""(P)=>{const app=document.getElementById('app');const els=[document.body,...document.querySelectorAll('body *')];
                  return {html:app.innerHTML.replace(/\\d{13}/g,'T'),nav:(document.getElementById('nav')||{}).innerHTML||'',
                   css:els.map(e=>{const c=getComputedStyle(e);return P.map(k=>c.getPropertyValue(k)).join('|')}).join('\\n')}}""",PROPS)
                res[f"{W}/{name}"]={k:hashlib.sha1(v.encode()).hexdigest()[:12] for k,v in snap.items()}
                res[f"{W}/{name}"]["_raw"]=snap
            if W==390:
                st=await pg.evaluate("""()=>{const out=[];const rec=t=>out.push(t+':'+JSON.stringify(S).replace(/\\d{10,}/g,'T').replace(/(\\d+\\.\\d{2})\\d+/g,'$1').replace(/"v[0-9a-z]{6,}"/g,'"V"'));
                  try{logEgg('h1',1);rec('egg1');logEgg('unk',2);rec('egg2');logEgg('h1',-1);rec('egg3');}catch(e){out.push('E1 '+e.message)}
                  try{go("home","pet");if(!S.pet)hatchPet();rec("hatch");petTick();rec('tick');petBoost('feed');rec('boost');out.push('week:'+petWeek(S.pet));}catch(e){out.push('E2 '+e.message)}
                  try{save();out.push('saved:'+localStorage.getItem('kikiriki_v1').length);}catch(e){out.push('E3 '+e.message)}
                  try{tocToggle(true);out.push('toc:'+S.tab+'/'+S.sub);tocToggle(false);}catch(e){out.push('E4 '+e.message)}
                  try{go('learn');out.push('lh:'+typeof learnHero+':'+String(learnHero()).length);}catch(e){out.push('E5 '+e.message)}
                  return out.join('\\n');}""")
                res["390/actions"]={"html":hashlib.sha1(st.encode()).hexdigest()[:12],"nav":"","css":"","_raw":{"html":st,"nav":"","css":""}}
            res[f"{W}/errors"]=errs
            await ctx.close()
        await b.close()
    return res
if __name__=="__main__":
    mode=sys.argv[1] if len(sys.argv)>1 else "compare"
    r=asyncio.run(run());path=OUT+"/snapshot.json"
    if mode=="save":
        json.dump(r,open(path,"w"));print("saved",len(r),"entries; errors:",r["390/errors"],r["1440/errors"])
    else:
        base=json.load(open(path));bad=0
        for k,v in base.items():
            if k.endswith("errors"):
                if r[k]!=v: print("ERRORS differ",k,r[k]);bad+=1
                continue
            for part in ("html","nav","css"):
                if v[part]!=r[k][part]:
                    bad+=1;a=v["_raw"][part];c=r[k]["_raw"][part];i=next((j for j in range(min(len(a),len(c))) if a[j]!=c[j]),min(len(a),len(c)))
                    print(f"DIFF {k} {part} at {i}:\n  was: {a[max(0,i-80):i+120]!r}\n  now: {c[max(0,i-80):i+120]!r}")
        print("IDENTICAL" if not bad else f"{bad} differences");sys.exit(1 if bad else 0)
