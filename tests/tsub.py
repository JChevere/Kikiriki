import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,sys
from playwright.async_api import async_playwright
W=int(sys.argv[1]) if len(sys.argv)>1 else 390
P=[("food","go('food')"),("settings","go('settings')"),("search","go('search')"),("art","go('learn','art:'+ENCY_ARTS[5].a.id)"),("lesson","go('learn','lesson:'+ALL_LESSONS[0].l.id)"),("quiz","go('learn','quiz')"),("breeds","go('learn','breeds')"),("tools","go('learn','tools')"),("aid","go('learn','aid')"),("sym","TMP.symOpen=true;go('health')"),("chap","go('learn','enc:ch-eggs')"),("gloss","go('learn','gloss')"),("odd","go('flock','odd')"),("pet","go('home','pet')"),("case","go('flock','case:'+S.cases[0].id)")]
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    pg=await b.new_page(viewport={"width":W,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file://"+HTML);await pg.wait_for_timeout(400)
    await pg.evaluate("S.onb=1;S.name='Jorge';S.flock=[{id:'a',name:'Rosie',breed:'Rhode Island Red'}];S.cases=[{id:'c1',henId:'a',cond:'',name:'Limping',start:today(),status:'open',entries:[]}];ency();save()")
    only=sys.argv[2].split(',') if len(sys.argv)>2 else None
    for k,js in P:
      if only and k not in only:continue
      try:
        await pg.evaluate(js);await pg.wait_for_timeout(450);await pg.evaluate("scrollTo(0,0)");await pg.screenshot(path=OUT+f"/sub_{k}_{W}.png",full_page=True)
      except Exception as e: print(k,'ERR',str(e)[:120])
    print(errs);await b.close()
asyncio.run(m())
