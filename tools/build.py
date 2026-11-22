#!/usr/bin/env python3
"""Build Kikirikí: src/ -> dist/index.html (one self-contained offline file).

  python3 tools/build.py            build dist/ (hosted PWA) and build/index.html (Claude artifact copy)
  python3 tools/build.py --check    also run the test suite

Order: CSS files sort by name; JS files sort by their numeric prefix across
src/js/content and src/js/app (content and code interleave where the app needs it).
"""
import os,re,sys,glob,shutil,subprocess
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def read(p): return open(p,encoding='utf-8').read()
def build():
    tpl=read(f'{ROOT}/src/index.template.html')
    css=''.join(read(p) for p in sorted(glob.glob(f'{ROOT}/src/css/*.css')))
    jsf=sorted(glob.glob(f'{ROOT}/src/js/*/*.js'),key=lambda p:int(os.path.basename(p).split('-')[0]))
    js=''.join(read(p) for p in jsf)
    html=tpl.replace('{{CSS}}',css,1).replace('{{JS}}',js,1)
    os.makedirs(f'{ROOT}/build',exist_ok=True)
    open(f'{ROOT}/build/index.html','w',encoding='utf-8').write(html)          # artifact copy (inline icon)
    os.makedirs(f'{ROOT}/dist',exist_ok=True)
    for f in glob.glob(f'{ROOT}/public/*'): shutil.copy(f,f'{ROOT}/dist/')
    hosted=re.sub(r'<link rel="apple-touch-icon" href="data:[^"]*">','<link rel="apple-touch-icon" href="apple-touch-icon.png">',html,count=1)
    open(f'{ROOT}/dist/index.html','w',encoding='utf-8').write(hosted)
    print(f'built {len(html):,} bytes from {len(jsf)} JS + {len(glob.glob(ROOT+"/src/css/*.css"))} CSS files')
if __name__=='__main__':
    build()
    if '--check' in sys.argv: sys.exit(subprocess.call([sys.executable,f'{ROOT}/tests/run_all.py']))
