import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,subprocess,time
from playwright.async_api import async_playwright
srv=subprocess.Popen(["python3","-m","http.server","8765","-d",DIST],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        ctx=await b.new_context(viewport={"width":390,"height":844});pg=await ctx.new_page();errs=[]
        pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.goto("http://localhost:8765/");await pg.wait_for_timeout(1500)
        await pg.evaluate("navigator.serviceWorker.ready");await pg.wait_for_timeout(800)
        print("sw",await pg.evaluate("!!navigator.serviceWorker.controller||'pending'"))
        await pg.reload();await pg.wait_for_timeout(1000)
        print("ctl",await pg.evaluate("!!navigator.serviceWorker.controller"))
        print("manifest",await pg.evaluate("fetch('manifest.webmanifest').then(r=>r.json()).then(j=>j.icons.length)"))
        # add data, go offline, reload
        await pg.evaluate("S.flock.push({id:'x1',name:'Offline Olive',breed:'',status:'laying',egg:'brown'});save()")
        await ctx.set_offline(True)
        await pg.reload();await pg.wait_for_timeout(1500)
        print("offline title",await pg.title(),"| olive",await pg.evaluate("S.flock.some(h=>h.name==='Offline Olive')"))
        await pg.evaluate("S.onb=1;save();go('settings')");await pg.wait_for_timeout(500)
        print("installcard",await pg.evaluate("(document.querySelector('.card.inst h3')||{}).textContent"))
        await pg.screenshot(path=OUT+"/pwa_settings.png",full_page=False);await pg.evaluate("document.querySelector('.card.inst').scrollIntoView()");await pg.screenshot(path=OUT+"/pwa_card.png")
        await ctx.set_offline(False)
        print("errors",errs);await b.close()
asyncio.run(main());srv.terminate()
