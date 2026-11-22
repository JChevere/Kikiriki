import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio,json
from playwright.async_api import async_playwright
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
    ctx=await b.new_context(viewport={"width":390,"height":844},accept_downloads=True)
    pg=await ctx.new_page();errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
    await pg.goto("file://"+HTML);await pg.wait_for_timeout(400)
    await pg.evaluate("S.onb=1;S.name='J';S.flock=[{id:'a',name:'Rosie',breed:'Rhode Island Red'}];S.eggLog[today()]={a:2};save();go('home')")
    await pg.wait_for_timeout(1500)
    print("nudge",await pg.evaluate("!!document.querySelector('.sf-nudge')"))
    # wipe localStorage -> reload -> recovered from IDB
    await pg.evaluate("localStorage.clear()");await pg.reload();await pg.wait_for_timeout(1500)
    print("recovered",await pg.evaluate("S.flock.length+' '+dayTotal(today())"))
    # quota failure
    await pg.evaluate("window.__o=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('q','QuotaExceededError')};save()")
    print("bar",await pg.evaluate("!!document.getElementById('safeBar')"))
    await pg.evaluate("Storage.prototype.setItem=window.__o;save()")
    print("bar gone",await pg.evaluate("!document.getElementById('safeBar')"))
    # download
    await pg.evaluate("go('settings')");await pg.wait_for_timeout(500)
    async with pg.expect_download() as d: await pg.click(".sf-btns .btn >> nth=0")
    dl=await d.value;path=await dl.path();data=json.load(open(path));print("file",dl.suggested_filename,data['app'],len(data['data']['flock']))
    print("lastBk",await pg.evaluate("S.lastBk===today()"))
    await pg.screenshot(path=OUT+"/safe.png",full_page=True)
    # import: modify file then restore
    data['data']['flock'].append({'id':'z','name':'Zelda'});json.dump(data,open('/tmp/bk.json','w'))
    async with pg.expect_file_chooser() as fc: await pg.click(".sf-btns .btn >> nth=1")
    ch=await fc.value;await ch.set_files('/tmp/bk.json');await pg.wait_for_timeout(500)
    await pg.click(".sf-confirm .btn >> nth=0");await pg.wait_for_timeout(400)
    print("imported",await pg.evaluate("S.flock.map(h=>h.name).join(',')"))
    print(errs);await b.close()
asyncio.run(m())
