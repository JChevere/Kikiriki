import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,sys
from playwright.async_api import async_playwright
W=int(sys.argv[1]) if len(sys.argv)>1 else 390
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    pg=await b.new_page(viewport={"width":W,"height":844});errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file://"+HTML);await pg.wait_for_timeout(400)
    await pg.evaluate("S.onb=1;S.flock=[{id:'a',name:'Rosie',breed:'Rhode Island Red'},{id:'b',name:'Pepper',breed:'Leghorn'}];for(let i=0;i<40;i++){const x=new Date();x.setDate(x.getDate()-i);S.eggLog[dstr(x)]={a:i%3?1:0,b:1}};startCase&&0;save()")
    for k,js in [("eggs","TMP.ft='eggs';go('flock')"),("hlog","go('health','log')"),("index","go('more','index')"),("rec","go('more','records:eggs')"),("more","go('more')"),("health","go('health')")]:
      await pg.evaluate(js);await pg.wait_for_timeout(500);await pg.evaluate("scrollTo(0,0)");await pg.screenshot(path=OUT+f"/st_{k}_{W}.png",full_page=True)
      print(k,await pg.evaluate("S.tab+'|'+S.sub+'|'+(TMP.ft||'')"))
    print("toc tab",await pg.evaluate("!!document.getElementById('tocTab')"),"fseg",await pg.evaluate("[...document.querySelectorAll('.fseg button')].map(b=>b.textContent.trim()).join('/')"))
    await pg.evaluate("go('flock')");await pg.wait_for_timeout(200);print("fseg",await pg.evaluate("[...document.querySelectorAll('.fseg button')].map(b=>b.textContent.trim()).join('/')"))
    await pg.evaluate("go('more','index')");await pg.fill("#idxQ","odd");await pg.wait_for_timeout(300);print("idx search",await pg.evaluate("document.querySelectorAll('.fm-page .fm-row').length"))
    print(errs);await b.close()
asyncio.run(m())
