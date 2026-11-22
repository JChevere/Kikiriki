# One-time codemod: fold runtime patch layers (fn reassignments) into single declarations.
import re,os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src','js','app'))
def rd(f): return open(f,encoding='utf-8').read()
def wr(f,s): open(f,'w',encoding='utf-8').write(s)
def sub1(s,old,new,f):
    n=s.count(old); assert n==1,(f,n,old[:90]); return s.replace(old,new)
def func_range(s,name):
    i=s.index(f'function {name}(');j=s.index('{',s.index(')',i));depth=0;k=j;st=[]
    while True:
        c=s[k]
        if st and st[-1] in '"\'':
            if c=='\\':k+=2;continue
            if c==st[-1]:st.pop()
        elif st and st[-1]=='`':
            if c=='\\':k+=2;continue
            if c=='`':st.pop()
            elif c=='$' and s[k+1]=='{':st.append('${');k+=2;depth+=1;continue
        else:
            if c in '"\'`':st.append(c)
            elif c=='/' and s[k+1]=='/':k=s.index('\n',k);continue
            elif c=='/' and s[k+1]=='*':k=s.index('*/',k)+2;continue
            elif c=='{':depth+=1
            elif c=='}':
                depth-=1
                if st and st[-1]=='${':st.pop()
                elif depth==0:return i,k+1
        k+=1
f='26-eggs-jobs-money.js';s=rd(f);s=sub1(s,'function logEgg(','function logEggBase(',f);wr(f,s)
f='33-ux-level-up.js';s=rd(f)
s=sub1(s,'(function(){const _le=logEgg;logEgg=function(who,n,d){','/* logEgg = logEggBase + milestone celebrations */\nfunction logEgg(who,n,d){',f)
s=sub1(s,'const r=_le.apply(this,arguments);','const r=logEggBase.apply(this,arguments);',f)
s=sub1(s,'"🏆"),250);}return r;};})();','"🏆"),250);}return r;}',f);wr(f,s)
f='40-inner-headers.js';s=rd(f)
s=sub1(s,'function render(){','function renderBase(){',f)
s=sub1(s,' const lang=()=>{document.documentElement.lang=S.lang==="es"?"es":"en";};lang();const _r=render;render=function(){_r.apply(this,arguments);lang();};})();',' syncLang();})();\n/* render = draw the current screen, then keep <html lang> in step with the app language */\nfunction syncLang(){document.documentElement.lang=S.lang==="es"?"es":"en";}\nfunction render(){renderBase.apply(this,arguments);syncLang();}',f)
wr(f,s)
f37='37-flock-game.js';g=rd(f37)
pairs=[('petWeek','_pw','12-virtual-chick.js'),('petTick','_ptk','12-virtual-chick.js'),('petSprite','_psp','12-virtual-chick.js'),('petBoost','_pb','14-logging-feeds-chick.js'),('hatchPet','_hp','12-virtual-chick.js'),('petHTML','_phtml','12-virtual-chick.js'),('resetPet','_rp','12-virtual-chick.js')]
for name,cap,base in pairs:
    b=rd(base);b=sub1(b,f'function {name}(',f'function {name}Base(',base);wr(base,b)
    m=re.search(rf'const {cap}={name};{name}=function\(',g);assert m,name
    g=g[:m.start()]+f'function {name}('+g[m.end():]
    a,e=func_range(g,name);rest=g[e:];assert rest.startswith(';'),(name,rest[:20]);g=g[:e]+rest[1:]
    g=re.sub(rf'(?<![\w$]){re.escape(cap)}(?![\w$])',f'{name}Base',g)
wr(f37,g)
f='36-farmhouse-redesign.js';s=rd(f)
s=sub1(s,'const lh=learnHero;learnHero=()=>"";let rest="";try{rest=vLearn();}finally{learnHero=lh;}','TMP.noLearnHero=1;let rest="";try{rest=vLearn();}finally{TMP.noLearnHero=0;}',f);wr(f,s)
f='33-ux-level-up.js';s=rd(f);s=sub1(s,'function learnHero(){const es=ES();','function learnHero(){if(TMP.noLearnHero)return"";const es=ES();',f);wr(f,s)
for old_file,new_file,name in [('01-state.js','38-data-protection.js','save'),('36-farmhouse-redesign.js','38-data-protection.js','henPhotoPick'),('32-contents-drawer.js','39-structure.js','tocToggle'),('32-contents-drawer.js','39-structure.js','tocInit')]:
    s=rd(old_file);a,e=func_range(s,name)
    if s[e:e+1]=='\n':e+=1
    s=s[:a]+s[e:];wr(old_file,s)
    t=rd(new_file);t=sub1(t,f'\n{name}=function(',f'\nfunction {name}(',new_file)
    a,e=func_range(t,name);assert t[e]==';',(name,t[e:e+10]);t=t[:e]+t[e+1:];wr(new_file,t)
f='38-data-protection.js';s=rd(f);m=re.search(r'const SAFE=\{cap:5\*1024\*1024,db:null,fail:false\};?',s);decl=m.group(0);s=s.replace(decl,'',1);wr(f,s)
f='01-state.js';s=rd(f);i=s.index('\n')+1;s=s[:i]+'const SAFE={cap:5*1024*1024,db:null,fail:false};\n'+s[i:];wr(f,s)
print('folded')
