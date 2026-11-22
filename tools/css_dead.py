#!/usr/bin/env python3
"""Remove CSS declarations that can never apply: an identical selector in the same @media context
sets the same property again later with equal-or-higher priority (!important). Conservative:
keeps intentional fallbacks (vendor prefixes, dvh/svh, env(), @supports), never touches @keyframes/@font-face.
  python3 tools/css_dead.py          report
  python3 tools/css_dead.py --apply  rewrite src/css/*.css"""
import glob,os,re,sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
files=sorted(glob.glob(ROOT+'/src/css/*.css'))
FALLBACK=re.compile(r'dvh|svh|lvh|-webkit-|-moz-|env\(|color-mix|:has|cqw|cqi',re.I)
def parse(css,fi):
    """yield rules: (ctx, selector, [(prop,value,important,start,end)])"""
    out=[];stack=[];i=0;n=len(css);buf_start=0
    while i<n:
        c=css[i]
        if css.startswith('/*',i): i=css.index('*/',i)+2;continue
        if c=='{':
            head=css[buf_start:i].strip()
            if head.startswith('@'):
                stack.append(head);i+=1;buf_start=i;continue
            # rule body
            j=i+1;depth=1;q=None
            while depth:
                ch=css[j]
                if q:
                    if ch=='\\':j+=2;continue
                    if ch==q:q=None
                elif ch in '"\'':q=ch
                elif css.startswith('/*',j):j=css.index('*/',j)+1
                elif ch=='{':depth+=1
                elif ch=='}':depth-=1
                j+=1
            body_s,body_e=i+1,j-1
            decls=[];k=body_s;q=None;ds=k;par=0
            while k<=body_e:
                ch=css[k] if k<body_e else ';'
                if q:
                    if ch=='\\':k+=2;continue
                    if ch==q:q=None
                elif ch in '"\'':q=ch
                elif ch=='(':par+=1
                elif ch==')':par-=1
                elif ch==';' and par==0:
                    raw=css[ds:k] if k<body_e else css[ds:body_e]
                    if ':' in raw and raw.strip():
                        p,v=raw.split(':',1);imp='!important' in v.replace(' ','').lower()
                        lead=len(raw)-len(raw.lstrip())
                        decls.append((p.strip().lower(),v.strip(),imp,ds+lead,(k+1) if k<body_e else body_e))
                    ds=k+1
                k+=1
            ctx=' > '.join(stack)
            if not any(x.startswith(('@keyframes','@-webkit-keyframes','@font-face','@supports')) for x in stack):
                out.append((ctx,re.sub(r'\s+',' ',head),decls,fi))
            i=j;buf_start=i;continue
        if c=='}':
            if stack:stack.pop()
            i+=1;buf_start=i;continue
        i+=1
    return out
csss=[open(f,encoding='utf-8').read() for f in files]
rules=[r for fi,c in enumerate(csss) for r in parse(c,fi)]
last={}  # (ctx,sel,prop) -> important of the latest occurrence seen scanning backwards
dead=[]
MODERN_SEL=re.compile(r':is\(|:where\(|:has\(|:focus-visible|::backdrop',re.I)
for ctx,sel,decls,fi in reversed(rules):
    if MODERN_SEL.search(sel): continue   # an older browser may drop this whole rule, so it can't prove anything dead
    for p,v,imp,s,e in reversed(decls):
        if p.startswith('-') and not p.startswith('--'): continue
        if FALLBACK.search(v): 
            last.setdefault((ctx,sel,p),imp); continue
        key=(ctx,sel,p)
        if key in last and (last[key] or not imp):
            dead.append((fi,s,e,sel,p))
        else:
            last[key]=imp if key not in last else (last[key] or imp)
print(f"{len(rules)} rules, {sum(len(r[2]) for r in rules)} declarations, dead: {len(dead)}")
if '--apply' in sys.argv:
    by={}
    for fi,s,e,sel,p in dead: by.setdefault(fi,[]).append((s,e))
    for fi,rs in by.items():
        c=csss[fi]
        for s,e in sorted(rs,reverse=True): c=c[:s]+c[e:]
        # drop rules left empty
        c=re.sub(r'(^|[}\n;])\s*[^{}@/;]+\{\s*\}','\\1',c)
        open(files[fi],'w',encoding='utf-8').write(c)
    print('applied')
else:
    for d in dead[:15]: print(' ',os.path.basename(files[d[0]]),d[3][:50],d[4])
