import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,subprocess,time
from playwright.async_api import async_playwright
srv=subprocess.Popen(["python3","-m","http.server","8767","-d",DIST],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]);ctx=await b.new_context(accept_downloads=True,viewport={"width":390,"height":844});pg=await ctx.new_page()
        await pg.goto("http://localhost:8767/");await pg.wait_for_timeout(1000)
        await pg.evaluate("S.onb=1;S.flock=[{id:'h0',name:'Rosie',breed:'',status:'laying'}];save();go('more','remind')");await pg.wait_for_timeout(300)
        async with pg.expect_download() as d: await pg.click(".rm-cta")
        dl=await d.value;print("download",dl.suggested_filename);txt=open(await dl.path(),encoding="utf-8").read();print(txt.count("BEGIN:VEVENT"),"events")
        print(await pg.evaluate("(document.querySelector('.rm-note')||{}).innerText"))
        await b.close()
asyncio.run(main());srv.terminate()
