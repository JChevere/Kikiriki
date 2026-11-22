import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML
import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]);ctx=await b.new_context();pg=await ctx.new_page()
        await pg.goto("file://"+HTML);await pg.wait_for_timeout(600)
        await pg.evaluate("localStorage.setItem('kikiriki_v1','{\"flock\":[{\"name\":\"Rosie\"' )")  # broken JSON
        await pg.reload();await pg.wait_for_timeout(1200)
        kept=await pg.evaluate("localStorage.getItem('kikiriki_v1_unreadable')")
        log=await pg.evaluate("KK_LOG.map(x=>x.where)")
        print("kept copy:",bool(kept and 'Rosie' in kept),"log:",log)
        print("errors []" if kept and 'load' in log else "errors ['corrupt data not preserved']")
        await b.close()
asyncio.run(main())
