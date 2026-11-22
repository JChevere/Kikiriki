import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,DIST,OUT
import asyncio
from playwright.async_api import async_playwright
SEED="""S.onb=1;S.name='Jorge';S.coop='Casa Coop';S.flock=[{id:'h0',name:'Rosie',breed:'Rhode Island Red',status:'laying'},{id:'h1',name:'Butter',breed:'Buff Orpington',status:'laying'}];
const td=today();const e=new Date(Date.now()+5*864e5).toISOString().slice(0,10);S.pp=[{id:'m1',type:'med',henId:'h0',d:td,t:'Fenbendazole',end:e},{id:'q1',type:'quar',henId:'all',d:td,end:e}];jobs()[0].last=td;save();"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"])
        for W in [390,320]:
            pg=await b.new_page(viewport={"width":W,"height":844});errs=[]
            pg.on("pageerror",lambda e:errs.append(str(e)))
            await pg.goto("file://"+HTML);await pg.wait_for_timeout(800)
            await pg.evaluate(SEED+"go('flock')");await pg.wait_for_timeout(400)
            print(W,"tabs",await pg.evaluate("[...document.querySelectorAll('.fseg button')].map(b=>{const r=b.getBoundingClientRect();return b.textContent.trim()+':'+Math.round(r.left)+'-'+Math.round(r.right)+(b.scrollWidth>b.clientWidth+1?'(clip)':'')})"))
            await pg.screenshot(path=OUT+f"/n_{W}_flock.png",clip={"x":0,"y":0,"width":W,"height":420})
            if W==320: await pg.close();continue
            await pg.evaluate("go('more')");await pg.wait_for_timeout(300)
            print("more rows",await pg.evaluate("[...document.querySelectorAll('.fm-row b')].map(x=>x.textContent)"),"coop orphan",await pg.evaluate("!!document.querySelector('.fm-coop')"))
            await pg.evaluate("go('settings')");await pg.wait_for_timeout(300)
            print("coop in settings",await pg.evaluate("document.getElementById('stCoop').value"))
            await pg.evaluate("go('health')");await pg.wait_for_timeout(300)
            print("vet open",await pg.evaluate("document.getElementById('emg').open"))
            await pg.evaluate("go('learn')");await pg.wait_for_timeout(300)
            print("paths",await pg.evaluate("[document.querySelectorAll('.fm-row.path').length,(document.querySelector('.fm-showall')||{}).textContent,document.querySelectorAll('.fm-go').length,document.querySelector('details.fm-more').open,document.documentElement.scrollHeight]"))
            await pg.evaluate("document.querySelector('.fm-showall').click()");await pg.wait_for_timeout(300)
            print("all paths",await pg.evaluate("document.querySelectorAll('.fm-row.path').length"))
            await pg.screenshot(path=OUT+"/n_learn.png",full_page=True)
            await pg.evaluate("go('more','remind')");await pg.wait_for_timeout(300)
            print("remind",await pg.evaluate("document.querySelector('#app').innerText.slice(0,400).replace(/\\n+/g,' | ')"))
            await pg.screenshot(path=OUT+"/n_remind.png",full_page=True)
            ics=await pg.evaluate("remBuildICS()")
            open(OUT+"/test.ics","w").write(ics["ics"]);print("ics events",ics["count"])
            print("errors",errs);await pg.close()
        await b.close()
asyncio.run(main());print("done []")
