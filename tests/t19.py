import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        pg=await b.new_page(viewport={"width":390,"height":844},device_scale_factor=2)
        errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.add_init_script("window.__icMiss={}")
        await pg.goto("file://"+HTML);await pg.evaluate("localStorage.clear()");await pg.reload();await pg.wait_for_timeout(300)
        await pg.screenshot(path=OUT+"/b0.png")
        # icon sheet
        await pg.evaluate("""document.body.innerHTML='<div id=sh style="display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:#F1F4EA;font:10px sans-serif"></div>';
          document.getElementById('sh').innerHTML=IC.names().map(n=>'<div style="width:58px;text-align:center"><div style="width:40px;height:40px;margin:auto">'+IC.svg(n)+'</div>'+n+'</div>').join('');""")
        await pg.screenshot(path=OUT+"/b_sheet.png",full_page=True)
        await pg.reload();await pg.wait_for_timeout(200)
        await pg.evaluate("""S.onb=1;S.name='Jorge';S.prof={has:'hens'};S.flock=[{id:'h0',name:'Rosie',breed:'Rhode Island Red',hatch:'2025-04-01',color:'red',egg:'brown',status:'laying'},{id:'h1',name:'Daisy',breed:'Leghorn',hatch:'2025-04-01',color:'white',egg:'white',status:'laying'}];
          S.pet={name:'Nugget',color:'buff',born:Date.now()-2*864e5,last:Date.now(),food:90,water:90,clean:90,happy:90,heat:85,sick:null,eggs:0};save();go('home')""")
        await pg.wait_for_timeout(200);await pg.screenshot(path=OUT+"/b1.png")
        await pg.evaluate("window.scrollTo(0,900)");await pg.wait_for_timeout(100);await pg.screenshot(path=OUT+"/b2.png")
        shots=[("health",None),("food",None),("learn",None),("settings",None),("flock",None)]
        for i,(t,s) in enumerate(shots):
            await pg.evaluate(f"go('{t}');window.scrollTo(0,0)");await pg.wait_for_timeout(150);await pg.screenshot(path=OUT+f"/b{3+i}.png")
        # visit lots of views to collect misses
        await pg.evaluate("""(async()=>{for(const c of CONDS){go('health','c:'+c.id);} for(const a of ALL_LESSONS.slice(0,80)){try{go('learn','l:'+a.id)}catch(e){}} })()""")
        await pg.evaluate("S.lang='es';save();go('home')");await pg.wait_for_timeout(100)
        for t in ["health","food","learn","settings","flock"]: await pg.evaluate(f"go('{t}')")
        await pg.evaluate("S.theme='dusk';save();go('home')");await pg.wait_for_timeout(150);await pg.screenshot(path=OUT+"/b9.png")
        left=await pg.evaluate("(()=>{const r=/\\p{Extended_Pictographic}/u;const w=document.createTreeWalker(document.body,4);let n,o=[];while(n=w.nextNode()){if(r.test(n.nodeValue)&&!n.parentNode.closest('script'))o.push(n.nodeValue.slice(0,30))}return o})()")
        print("left",left[:10]); print("miss",await pg.evaluate("Object.keys(window.__icMiss)"))
        print("errors",errs); await b.close()
asyncio.run(main())
