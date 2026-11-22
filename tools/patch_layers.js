// Lists functions that are re-assigned/wrapped after being declared ("patch layers").
const fs=require('fs'),path=require('path');const acorn=require('/opt/npm-tools/node_modules/acorn');const walk=require('/opt/npm-tools/node_modules/acorn-walk');
const ROOT=path.dirname(__dirname);
const files=fs.readdirSync(ROOT+'/src/js/app').map(f=>'app/'+f).concat(fs.readdirSync(ROOT+'/src/js/content').map(f=>'content/'+f)).sort((a,b)=>parseInt(path.basename(a))-parseInt(path.basename(b)));
let js='',offs=[];for(const f of files){offs.push([js.length,f]);js+=fs.readFileSync(ROOT+'/src/js/'+f,'utf8');}
const fileOf=p=>{let r=offs[0];for(const o of offs)if(o[0]<=p)r=o;return r[1];};
const ast=acorn.parse(js,{ecmaVersion:'latest',sourceType:'script'});
const decl=new Map();for(const n of ast.body)if(n.type==='FunctionDeclaration')decl.set(n.id.name,fileOf(n.start));
const hits={};
walk.full(ast,n=>{if(n.type==='AssignmentExpression'&&n.left.type==='Identifier'&&decl.has(n.left.name)&&/Function/.test(n.right.type)){(hits[n.left.name]=hits[n.left.name]||[]).push(fileOf(n.start));}});
// captures like const _x=x;
const caps={};walk.full(ast,n=>{if(n.type==='VariableDeclarator'&&n.init&&n.init.type==='Identifier'&&decl.has(n.init.name)){(caps[n.init.name]=caps[n.init.name]||[]).push(n.id.name+'@'+fileOf(n.start));}});
for(const[k,v]of Object.entries(hits))console.log(k.padEnd(18),'declared',decl.get(k).padEnd(34),'reassigned in',v.join(', '),caps[k]?' captured: '+caps[k].join(','):'');
console.log('total patched functions:',Object.keys(hits).length,'| captures:',Object.values(caps).flat().length);
