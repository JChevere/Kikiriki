// Finds top-level function declarations that are declared more than once.
// In one script, the LAST declaration wins (hoisting), so earlier copies never run.
// Usage: node tools/dead_functions.js [--remove]
const fs=require('fs'),path=require('path');
const acorn=require('/opt/npm-tools/node_modules/acorn');
const ROOT=path.dirname(__dirname);
const files=fs.readdirSync(ROOT+'/src/js/app').map(f=>'app/'+f).concat(fs.readdirSync(ROOT+'/src/js/content').map(f=>'content/'+f))
  .sort((a,b)=>parseInt(path.basename(a))-parseInt(path.basename(b)));
let js='',offs=[];for(const f of files){offs.push([js.length,f]);js+=fs.readFileSync(ROOT+'/src/js/'+f,'utf8');}
const ast=acorn.parse(js,{ecmaVersion:'latest',sourceType:'script'});
const decl={};for(const n of ast.body)if(n.type==='FunctionDeclaration'){(decl[n.id.name]=decl[n.id.name]||[]).push(n);}
// names that are reassigned at top level (wrapper chains) — leave those alone
const reassigned=new Set();for(const n of ast.body){const e=n.type==='ExpressionStatement'&&n.expression;if(e&&e.type==='AssignmentExpression'&&e.left.type==='Identifier')reassigned.add(e.left.name);}
const dead=[];for(const[k,v]of Object.entries(decl))if(v.length>1&&!reassigned.has(k))dead.push(...v.slice(0,-1).map(n=>({name:k,start:n.start,end:n.end})));
const fileOf=p=>{let r=offs[0];for(const o of offs)if(o[0]<=p)r=o;return r;};
let bytes=0;dead.forEach(d=>bytes+=d.end-d.start);
console.log(`duplicate names: ${Object.values(decl).filter(v=>v.length>1).length}, dead copies: ${dead.length}, bytes: ${bytes}, skipped (reassigned): ${[...reassigned].filter(k=>decl[k]&&decl[k].length>1).join(',')||'none'}`);
if(process.argv.includes('--remove')){
  const byFile={};for(const d of dead){const[o,f]=fileOf(d.start);(byFile[f]=byFile[f]||[]).push([d.start-o,d.end-o,d.name]);}
  for(const[f,rs]of Object.entries(byFile)){let s=fs.readFileSync(ROOT+'/src/js/'+f,'utf8');
    rs.sort((a,b)=>b[0]-a[0]).forEach(([a,b])=>{let e=b;if(s[e]==='\n')e++;else if(s[e]===';')e++;s=s.slice(0,a)+s.slice(e);});
    fs.writeFileSync(ROOT+'/src/js/'+f,s);console.log(f,rs.length,'removed:',rs.map(r=>r[2]).join(' '));}
}
