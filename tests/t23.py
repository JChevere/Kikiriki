import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,sys
from playwright.async_api import async_playwright
W=int(sys.argv[1]) if len(sys.argv)>1 else 1440
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        pg=await b.new_page(viewport={"width":W,"height":900})
        errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.goto("file://"+HTML);await pg.evaluate("localStorage.clear()");await pg.reload();await pg.wait_for_timeout(200)
        await pg.screenshot(path=OUT+f"/w0_{W}.png")
        await pg.evaluate("""S.onb=1;S.name='Jorge';S.prof={has:'hens'};S.flock=[{id:'h0',name:'Rosie',breed:'Rhode Island Red',hatch:'2025-04-01',color:'red',status:'laying'},{id:'h1',name:'Daisy',breed:'Swedish Flower Hen',hatch:'2025-04-01',color:'millefleur',status:'laying'},{id:'h2',name:'Olive',breed:'Olive Egger',hatch:'2025-04-01',color:'blackcopper',status:'laying'}];
          S.pet={name:'Nugget',color:'buff',born:Date.now()-2*864e5,last:Date.now(),food:90,water:90,clean:90,happy:90,heat:85,sick:null,eggs:0};save();go('home')""")
        await pg.wait_for_timeout(200)
        for i,(t,s) in enumerate([("home",""),("flock",""),("health",""),("food",""),("learn",""),("learn","breeds"),("settings","")]):
            await pg.evaluate(f"go('{t}','{s}');window.scrollTo(0,0)");await pg.wait_for_timeout(150)
            await pg.screenshot(path=OUT+f"/w{i+1}_{W}.png",full_page=True)
            if W>1000 and i<5: print(t,s,await pg.evaluate("[...document.getElementById('app').children].map(e=>e.tagName+'.'+e.className).join(' | ')"))
        print(errs);await b.close()
asyncio.run(main())
