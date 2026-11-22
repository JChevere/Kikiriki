# One-time: split the monolithic index.html into src/ files. Kept for reference.
import re,os,sys
src=sys.argv[1];out=sys.argv[2]
s=open(src,encoding='utf-8').read()
a=s.index('<style>')+len('<style>');b=s.index('</style>')
c=s.index('<script>')+len('<script>');d=s.rindex('</script>')
css=s[a:b];js=s[c:d]
os.makedirs(f'{out}/src/css',exist_ok=True);os.makedirs(f'{out}/src/js',exist_ok=True)
open(f'{out}/src/index.template.html','w',encoding='utf-8').write(s[:a]+'{{CSS}}'+s[b:c]+'{{JS}}'+s[d:])
# CSS by line ranges, snapped to brace depth 0
lines=css.split('\n')
cuts=[(0,'base'),(200,'layout'),(400,'features'),(650,'desktop-nav'),(800,'redesign-rd'),(875,'farm-theme'),(925,'farmhouse'),(1150,'game-safety')]
starts=[]
depth=0;depth_at=[]
for l in lines:
    depth_at.append(depth);depth+=l.count('{')-l.count('}')
for ln,name in cuts:
    while depth_at[ln]!=0: ln+=1
    starts.append((ln,name))
# a11y marker and additions marker
txt='\n'.join(lines)
def line_of(marker): return txt[:txt.index(marker)].count('\n')
starts.append((line_of('/* ===== accessibility pass ===== */'),'a11y'))
starts.append((line_of('/* flock tabs: all five fit on a phone */'),'additions'))
starts.sort()
for i,(ln,name) in enumerate(starts):
    end=starts[i+1][0] if i+1<len(starts) else len(lines)
    chunk='\n'.join(lines[ln:end])+('\n' if i+1<len(starts) else '')
    open(f'{out}/src/css/{i*10:02d}-{name}.css','w',encoding='utf-8').write(chunk)
# JS by section markers
CONTENT=['CONTENT','CARE KITS','CARE KIT EXTRAS','CHICKEN ACADEMY: content','GLOSSARY','ENCYCLOPEDIA: new','ENCYCLOPEDIA: What','ENCYCLOPEDIA: more','Editorial layer','KIKIRIKÍ ORIGINAL ART','KIKIRIKÍ ART','Kikirikí original icon set','UI TEXT']
ms=[(m.start(),m.group(1).strip()) for m in re.finditer(r'\n?/\*\s*=+\s*([^*=]+?)\s*=+\s*\*/',js)]
if ms[0][0]!=0: ms.insert(0,(0,'preface'))
def slug(n):
    n=n.split(':')[0] if n.startswith('Link') else n
    return re.sub(r'[^a-z0-9]+','-',n.lower().replace('í','i').replace('é','e'))[:40].strip('-')
for i,(p,n) in enumerate(ms):
    end=ms[i+1][0] if i+1<len(ms) else len(js)
    kind='content' if any(n.startswith(k) for k in CONTENT) else 'app'
    os.makedirs(f'{out}/src/js/{kind}',exist_ok=True)
    open(f'{out}/src/js/{kind}/{i:02d}-{slug(n)}.js','w',encoding='utf-8').write(js[p:end])
print(len(starts),'css files,',len(ms),'js files')
