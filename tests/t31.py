import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,sys
from playwright.async_api import async_playwright
W=int(sys.argv[1]) if len(sys.argv)>1 else 1440
L=sys.argv[2] if len(sys.argv)>2 else "en"
TH=sys.argv[3] if len(sys.argv)>3 else "meadow"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        pg=await b.new_page(viewport={"width":W,"height":1000},device_scale_factor=1)
        errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.add_init_script("window.__icMiss={}")
        await pg.goto("file://"+HTML);await pg.evaluate("localStorage.clear()");await pg.reload()
        await pg.evaluate(f"""S.onb=1;S.name='Jorge';S.lang='{L}';S.theme='{TH}';S.prof={{has:'hens'}};S.xp=210;
        S.flock=[{{id:'h0',name:'Rosie',breed:'Rhode Island Red',hatch:'2025-04-01',color:'red',status:'laying',look:{{legs:'yellow'}}}},{{id:'h1',name:'Daisy',breed:'Swedish Flower Hen',hatch:'2025-04-01',color:'millefleur',status:'laying'}},{{id:'h2',name:'Pepper',breed:'Silver Spangled Appenzeller Spitzhauben',hatch:'2025-04-01',color:'spangled',status:'laying',look:breedLook('Silver Spangled Appenzeller Spitzhauben','spangled')}},{{id:'h3',name:'Olive',breed:'Olive Egger',hatch:'2025-04-01',color:'blackcopper',status:'laying'}},{{id:'h4',name:'Blue',breed:'Sapphire Gem',hatch:'2025-04-01',color:'sapphire',status:'laying'}}];
        for(let i=1;i<7;i++){{const d=new Date();d.setDate(d.getDate()-i);const k=dstr(d);S.eggLog[k]={{h0:1,h1:i%2,h2:1,h3:i%3?1:0}};syncDay(k);S.checks[k]=1;}}
        logEgg('h0',1);logEgg('h2',1);
        S.money.costs.push({{id:'c1',date:today(),cat:'feed',amt:22,lasts:21,n:'Layer feed 50lb'}});
        jobs();S.jobs[0].last=today();
        save();go('home')""")
        await pg.wait_for_timeout(300);await pg.screenshot(path=OUT+f"/dk_{W}_{L}_{TH}.png",full_page=True)
        await pg.evaluate("go('flock')");await pg.wait_for_timeout(700);await pg.screenshot(path=OUT+f"/dk_flock_{W}.png")
        await pg.evaluate("go('learn')");await pg.wait_for_timeout(700);await pg.screenshot(path=OUT+f"/dk_learn_{W}.png")
        await pg.evaluate("go('home')");await pg.wait_for_timeout(500)
        # carton interactions
        await pg.click(".rd-carton .cup:not(.full) >> nth=3");await pg.wait_for_timeout(200)
        await pg.click(".epgrid button >> nth=1");await pg.wait_for_timeout(300)
        await pg.click(".epgrid button >> nth=3");await pg.wait_for_timeout(600)
        n1=await pg.evaluate("dayTotal(today())")
        await pg.screenshot(path=OUT+f"/ct_pick_{W}.png",full_page=True)
        await pg.click(".rd-carton .cup.full >> nth=0");await pg.wait_for_timeout(200)
        await pg.click(".epanel.esel .btn.alt");await pg.wait_for_timeout(300)
        n2=await pg.evaluate("dayTotal(today())")
        for i in range(10): await pg.evaluate("pickEgg('unk')")
        n3=await pg.evaluate("dayTotal(today())")
        await pg.evaluate("TMP.cupPick=false;render()");await pg.wait_for_timeout(300)
        await pg.screenshot(path=OUT+f"/ct_full_{W}.png",full_page=True)
        await pg.evaluate("cdShift(-1)");n4=await pg.evaluate("cdDay()!==today()")
        await pg.evaluate("cdShift(1)")
        await pg.evaluate("tocToggle(true)");await pg.wait_for_timeout(500);await pg.screenshot(path=OUT+f"/toc_{W}.png")
        await pg.click(".fm-group >> nth=1 >> .fm-row >> nth=2");await pg.wait_for_timeout(800)
        v=await pg.evaluate("S.tab+'|'+S.sub")
        await pg.screenshot(path=OUT+f"/odd_{W}.png",full_page=True)
        f=f2=None
        print("carton",n1,n2,n3,n4,"toc->",v,"fold",f,f2)
        print("miss",await pg.evaluate("Object.keys(__icMiss)"),errs);await b.close()
asyncio.run(main())
