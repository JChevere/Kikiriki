import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML=os.path.join(ROOT,'build','index.html')
DIST=os.path.join(ROOT,'dist')
OUT=os.path.join(ROOT,'tests','output');os.makedirs(OUT,exist_ok=True)
