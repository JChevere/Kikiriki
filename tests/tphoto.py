import sys,os;sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from _paths import HTML,OUT
import asyncio,json
from playwright.async_api import async_playwright
PIC=os.path.join(os.path.dirname(os.path.abspath(__file__)),"hen_photo.jpg")
TINY="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AKp//2Q=="
async def main():
    fails=[]
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]);ctx=await b.new_context(viewport={"width":390,"height":844},accept_downloads=True);pg=await ctx.new_page()
        errs=[];pg.on("pageerror",lambda e:errs.append(str(e)))
        await pg.goto("file://"+HTML);await pg.wait_for_timeout(700)
        # 1) old-style save with an inline photo -> migrates to IndexedDB on reload
        await pg.evaluate(f"""S.onb=1;S.flock=[{{id:'h0',name:'Rosie',breed:'',status:'laying',photo:'{TINY}'}},{{id:'h1',name:'Butter',breed:'',status:'laying'}}];localStorage.setItem('kikiriki_v1',JSON.stringify(S));""")
        await pg.reload();await pg.wait_for_timeout(1800)
        r=await pg.evaluate("[!!PHOTOS.h0, 'photo' in S.flock[0], localStorage.getItem('kikiriki_v1').includes('data:image'), idbGet('photos').then(m=>!!(m&&m.h0))]")
        r[3]=await pg.evaluate("idbGet('photos').then(m=>!!(m&&m.h0))")
        print("migrate [inMem, stillInS, inLocalStorage, inIDB]:",r)
        if r!=[True,False,False,True]: fails.append("migrate")
        await pg.evaluate("go('flock','hen:h0')");await pg.wait_for_timeout(400)
        shown=await pg.evaluate("!!document.querySelector('.fm-phero img')");print("hero shows photo:",shown)
        if not shown: fails.append("hero")
        # 2) add a big photo through the picker
        await pg.evaluate("go('flock','hen:h1')");await pg.wait_for_timeout(300)
        async with pg.expect_file_chooser() as fc: await pg.evaluate("henPhotoPick('h1')")
        ch=await fc.value;await ch.set_files(PIC);await pg.wait_for_timeout(1500)
        r=await pg.evaluate("[PHOTOS.h1?PHOTOS.h1.length:0,'photo' in S.flock[1],localStorage.getItem('kikiriki_v1').length]")
        print("picked [bytes, inS, localStorage size]:",r)
        if not(r[0]>20000 and r[0]<=260000*1.4 and not r[1] and r[2]<20000): fails.append("pick")
        # 3) photos survive a reload
        await pg.reload();await pg.wait_for_timeout(1500)
        r=await pg.evaluate("[!!PHOTOS.h0,!!PHOTOS.h1]");print("after reload:",r)
        if r!=[True,True]: fails.append("reload")
        # 4) backup includes photos; restore into an empty app brings them back
        txt=await pg.evaluate("backupBlob().text()");o=json.loads(txt);print("backup v",o["v"],"photos:",sorted(o.get("photos",{}).keys()))
        if sorted(o.get("photos",{}).keys())!=["h0","h1"]: fails.append("backup")
        path=OUT+"/bk_photos.json";open(path,"w").write(txt)
        await pg.evaluate("indexedDB.deleteDatabase('kikiriki_safe');localStorage.clear()");await pg.wait_for_timeout(300)
        ctx2=await b.new_context(viewport={"width":390,"height":844});pg2=await ctx2.new_page();await pg2.goto("file://"+HTML);await pg2.wait_for_timeout(800)
        await pg2.evaluate("S.onb=1;save();go('settings')")
        async with pg2.expect_file_chooser() as fc: await pg2.evaluate("backupImport()")
        ch=await fc.value;await ch.set_files(path);await pg2.wait_for_timeout(800)
        await pg2.evaluate("backupApply()");await pg2.wait_for_timeout(1200)
        r=await pg2.evaluate("[S.flock.length,!!PHOTOS.h0,!!PHOTOS.h1]");r.append(await pg2.evaluate("idbGet('photos').then(m=>Object.keys(m||{}).length)"))
        print("restored [birds, h0, h1, inIDB]:",r)
        if r!=[2,True,True,2]: fails.append("restore")
        # 5) remove a photo
        await pg2.evaluate("photoRemove('h1')");await pg2.wait_for_timeout(500)
        r=await pg2.evaluate("idbGet('photos').then(m=>Object.keys(m||{}))");print("after remove:",r)
        if r!=["h0"]: fails.append("remove")
        await ctx2.close()
        # 6) no IndexedDB -> falls back to inline small photo
        ctx3=await b.new_context(viewport={"width":390,"height":844});await ctx3.add_init_script("Object.defineProperty(window,'indexedDB',{value:undefined})")
        pg3=await ctx3.new_page();pg3.on("pageerror",lambda e:errs.append(str(e)));await pg3.goto("file://"+HTML);await pg3.wait_for_timeout(800)
        await pg3.evaluate("S.onb=1;S.flock=[{id:'h9',name:'Pep',breed:'',status:'laying'}];save();go('flock','hen:h9')")
        async with pg3.expect_file_chooser() as fc: await pg3.evaluate("henPhotoPick('h9')")
        ch=await fc.value;await ch.set_files(PIC);await pg3.wait_for_timeout(1500)
        r=await pg3.evaluate("[S.flock[0].photo?S.flock[0].photo.length:0,!!document.querySelector('.fm-phero img')]");print("no-IDB fallback [inline bytes, shown]:",r)
        if not(0<r[0]<=60000 and r[1]): fails.append("fallback")
        await b.close()
    print("errors",errs+fails)
asyncio.run(main())
