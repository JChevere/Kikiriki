#!/usr/bin/env python3
"""Run every browser test against build/index.html. Needs Python + Playwright + Chrome.
A test fails if it raises or prints a non-empty error list on its last line."""
import subprocess,sys,os,glob,time
HERE=os.path.dirname(os.path.abspath(__file__))
tests=sorted(glob.glob(f'{HERE}/t*.py'))+[f'{HERE}/audit2.py',f'{HERE}/a11y.py']
fails=0
for t in tests:
    a=time.time();r=subprocess.run([sys.executable,t],capture_output=True,text=True,timeout=400)
    last=(r.stdout.strip().splitlines() or [''])[-1]
    bad=r.returncode!=0 or (last.rstrip().endswith("']") and "[]" not in last) or (t.endswith('a11y.py') and ('lowc 0' not in r.stdout or 'noinlabel 0' not in r.stdout))
    fails+=bad
    print(f"{'FAIL' if bad else 'ok  '} {os.path.basename(t):14} {time.time()-a:5.1f}s  {last[:90]}")
    if bad: print(r.stderr[-800:])
print(f"\n{len(tests)-fails}/{len(tests)} passed");sys.exit(1 if fails else 0)
