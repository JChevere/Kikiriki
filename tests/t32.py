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
    await pg.click(".fm-go");await pg.wait_for_timeout(200)
    await pg.fill("#obName","Jorge");await pg.click(".obnav .btn:last-child");await pg.wait_for_timeout(200)
    await pg.click(".obopt >> nth=2");await pg.click(".obnav .btn:last-child");await pg.wait_for_timeout(300)
    await pg.click(".obbr button >> nth=0");await pg.click(".obbr button >> nth=0");await pg.click(".obbr button >> nth=5");await pg.wait_for_timeout(200)
    await pg.fill(".obhen input >> nth=0","Ruby")
    await pg.screenshot(path=OUT+f"/ob3_{W}.png")
    await pg.click(".obnav .btn:last-child");await pg.wait_for_timeout(200)
    await pg.click(".obnav .btn:last-child");await pg.wait_for_timeout(800)
    print("flock",await pg.evaluate("S.flock.map(h=>h.name+'/'+h.breed).join(', ')"),await pg.evaluate("S.onb"))
    await pg.click(".rd-carton .cup >> nth=0");await pg.click(".epgrid button >> nth=0");await pg.wait_for_timeout(700)
    print("celeb",await pg.evaluate("(document.querySelector('#celeb b')||{}).textContent"))
    await pg.screenshot(path=OUT+f"/celeb_{W}.png")
    await pg.wait_for_timeout(3400)
    await pg.click(".epgrid button >> nth=1");await pg.wait_for_timeout(600)
    print("celeb2",await pg.evaluate("(document.querySelector('#celeb b')||{}).textContent"))
    await pg.evaluate("go('learn')");await pg.wait_for_timeout(700);await pg.screenshot(path=OUT+f"/learn_{W}.png",full_page=True)
    print(errs);await b.close()
asyncio.run(m())
