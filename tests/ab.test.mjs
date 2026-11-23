import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {abScore,abRanking,validateAbWeights} from '../preview/h0/ab-score.mjs';
import {abRender} from '../preview/h0/ab-view.mjs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const data=read('analisis/abordabilidad-31-v1.json'),bank=read('analisis/mf1-banco-26-fuentes-v1.json'),crit=read('analisis/criticidad-31-v03.json');
const keys=['C','K','D','E','A'],w=data.method.weights;
const reference=(v,weights=w)=>Math.floor((4+99*(v.C/5)*(Object.entries(weights).reduce((s,[k,n])=>s+v[k]*n,0)/100-1))/4+.5);
test('AB-1 through AB-4 cover the same 31 problems and 155 explicit judgments',()=>{
 assert.deepEqual(data.rows.map(r=>r.id).sort(),crit.rows.map(r=>r.id).sort());
 assert.equal(new Set(data.rows.map(r=>r.id)).size,31);
 const findings=new Map(bank.findings.map(x=>[x.id,x]));
 for(const r of data.rows){
  assert.deepEqual(r.components.map(x=>x.key),keys);
  assert.ok(['Media','Baja'].includes(r.confidence));
  for(const k of ['intervention','mechanism','result','outside','inputs','condition','conventional'])assert.ok(r[k].length>15);
  for(const c of r.components){assert.equal(c.level,r.levels[c.key]);assert.ok(c.reason.length>30&&c.refs.length>0);for(const id of c.refs)if(!id.startsWith('SDC-'))assert.equal(findings.get(id)?.P,r.id);}
  assert.equal(r.score,reference(r.levels));
 }
});
test('scale, causal ceilings and monotonicity cannot be overridden by easy tasks',()=>{
 const ready={K:5,D:5,E:5,A:5};
 assert.equal(abScore({C:5,...ready},w),100);
 for(let C=1;C<=5;C++)assert.equal(abScore({C,...ready},w),Math.round(1+99*C/5));
 assert.equal(abScore({C:5,K:1,D:1,E:1,A:1},w),1);
 for(const r of data.rows){
  assert.ok(r.score<=Math.round(1+99*r.levels.C/5));
  for(const k of keys)if(r.levels[k]<5)assert.ok(abScore({...r.levels,[k]:r.levels[k]+1},w)>=r.score);
 }
});
test('weights and levels reject missing, NaN, range and partial totals',()=>{
 for(const weights of [{},{K:'',D:25,E:25,A:50},{K:101,D:0,E:0,A:0},{K:-1,D:26,E:25,A:50},{K:25,D:25,E:25,A:24},{K:NaN,D:25,E:25,A:25}]){
  assert.equal(validateAbWeights(weights).valid,false);assert.throws(()=>abRanking(data.rows,weights),RangeError);
 }
 assert.equal(validateAbWeights({K:'33.3',D:'33.3',E:'33.4',A:'0'}).valid,true);
 assert.throws(()=>abScore({C:3,K:3,D:null,E:3,A:3},w),RangeError);
 assert.throws(()=>abScore({C:0,K:3,D:3,E:3,A:3},w),RangeError);
});
test('calibration corrections survive the full application and simple sums expose compensation',()=>{
 for(const c of data.calibration.cases){const row=data.rows.find(r=>r.id===c.id);assert.deepEqual(row.levels,c.after);assert.equal(row.score,c.scoreAfter);}
 assert.equal(data.rows.find(r=>r.id==='P16').levels.C,1);
 assert.equal(data.rows.find(r=>r.id==='P48').levels.C,1);
 assert.equal(data.rows.find(r=>r.id==='P32').levels.C,4);
 const p15=data.rows.find(r=>r.id==='P15');assert.equal(p15.additiveComparator,53);assert.equal(p15.score,16);
});
test('weights, sensitivity, ranks and conservative scenarios are recomputed independently',()=>{
 assert.equal(data.weightScenarios.length,10);
 for(const s of data.weightScenarios){
  assert.ok(Math.abs(Object.values(s.weights).reduce((a,b)=>a+b,0)-100)<1e-8);
  for(const r of data.rows){assert.equal(s.scores[r.id],abScore(r.levels,s.weights));assert.equal(s.ranks[r.id],1+Object.values(s.scores).filter(x=>x>s.scores[r.id]).length);}
 }
 for(const s of data.stressScenarios)for(const r of data.rows){const v=Object.fromEntries(keys.map(k=>[k,Math.max(1,r.levels[k]+(s.changes[k]||0))]));assert.equal(s.scores[r.id],reference(v));}
 for(const r of data.rows)for(const s of r.judgmentScenarios){assert.equal(s.score,reference({...r.levels,[s.key]:r.levels[s.key]+s.delta}));assert.equal(s.rank,1+data.rows.filter(x=>x.id!==r.id&&x.score>s.score).length);}
});
test('baseline data and criticality are immutable and reweighting does not mutate inputs',()=>{
 for(const [p,hash] of Object.entries(data.inputHashes))assert.equal(createHash('sha256').update(readFileSync(p)).digest('hex'),hash);
 assert.equal(bank.sources.length,26);assert.equal(bank.findings.length,245);
 const before=JSON.stringify(data);const rows=abRanking(data.rows,{K:100,D:0,E:0,A:0});assert.equal(rows.length,31);assert.equal(JSON.stringify(data),before);
 assert.equal(rows.find(x=>x.id==='P47').score,75);
 assert.equal(readFileSync('index.html','utf8'),readFileSync('versiones/v0.6/index.html','utf8'));
});
test('full render exposes 31 interventions, five reasons each and preserves source escaping',()=>{
 const esc=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const links={problem:id=>'/problemas?p='+id,criticality:'/criticidad',methods:'/metodos'};
 const html=abRender(data,bank,crit,'fundaciones',links,esc);
 assert.equal((html.match(/data-ab-row=/g)||[]).length,31);
 assert.equal((html.match(/data-ab-title=/g)||[]).length,155);
 for(const term of ['Fuera de alcance','Condición operativa','Alternativa convencional','factor limitante','intervalos estadísticos'])assert.ok(html.includes(term));
 const bad=structuredClone(data);bad.rows[0].result='<img src=x onerror=alert(1)>';
 assert.ok(!abRender(bad,bank,crit,'tercer_sector',links,esc).includes('<img src=x'));
 assert.match(abRender(null,bank,crit,'fundaciones',links,esc),/no está disponible/);
});
