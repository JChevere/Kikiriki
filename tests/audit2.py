import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,sys
from playwright.async_api import async_playwright
W=int(sys.argv[1]) if len(sys.argv)>1 else 390
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    pg=await b.new_page(viewport={"width":W,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file://"+HTML);await pg.wait_for_timeout(600)
    await pg.screenshot(path=OUT+f"/au_onb_{W}.png")
    await pg.evaluate("S.pp=[{id:'x1',type:'weight',henId:'a',d:'2026-10-01',v:'5.1',u:'lb'},{id:'x2',type:'weight',henId:'a',d:'2026-11-10',v:'4.8',u:'lb'},{id:'x3',type:'vax',henId:'all',d:'2026-04-02',t:\"Marek's\"},{id:'x4',type:'med',henId:'a',d:'2026-11-12',t:'Fenbendazole',end:'2026-11-26'}];for(let i=0;i<40;i++){const x=new Date();x.setDate(x.getDate()-i);const k=dstr(x);S.eggLog[k]={a:i%3?1:0,b:1,c:i%2}}")
    await pg.evaluate("""S.onb=1;S.name='Jorge';S.flock=[{id:'a',name:'Rosie',breed:'Rhode Island Red',status:'laying'},{id:'b',name:'Pepper',breed:'Leghorn',status:'laying'},{id:'c',name:'Blue',breed:'Ameraucana',status:'laying'},{id:'d',name:'Nugget',breed:'Silkie',status:'growing'}];save();go('home')""")
    for k,js in [("home","go('home')"),("birds","TMP.ft='birds';go('flock')"),("eggs","TMP.ft='eggs';go('flock')"),("health","go('health')"),("food","go('food')"),("learn","go('learn')"),("hen","go('flock','hen:a')"),("settings","go('settings')"),("records","go('more','records:eggs')"),("more","go('more')"),("pass","TMP.htab='hl';go('flock','hen:a')"),("course","go('learn','course:start')"),("vax","go('health','pp:vax')")]:
      await pg.evaluate(js);await pg.wait_for_timeout(700);await pg.evaluate("window.scrollTo(0,0)")
      await pg.screenshot(path=OUT+f"/au_{k}_{W}.png",full_page=True)
    print(errs)
    await b.close()
asyncio.run(m())
