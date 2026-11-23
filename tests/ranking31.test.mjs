import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderRanking31} from '../preview/h0/ranking31-view.mjs';
import {validateWeights,rankingWithWeights,scenarioExport} from '../preview/h0/ranking31-weights.mjs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const data=read('analisis/criticidad-31-v03.json');
const bank=read('analisis/mf1-banco-26-fuentes-v1.json');
const keys=['I','F','A','U'];
// Independent weighted affine calculation, not the Python generator's implementation.
const calculate=(v,w)=>Math.round(v.reduce((s,x,i)=>s+(1+99*(x-1)/4)*w[keys[i]]/100,0));
test('scale endpoints and equal levels retain their meaning',()=>{
 assert.equal(calculate([1,1,1,1],data.method.weights),1);
 assert.equal(calculate([5,5,5,5],data.method.weights),100);
 assert.equal(calculate([4,4,4,4],data.method.weights),75);
});
test('all and only the frozen 31 problems; bank bytes and legacy copies unchanged',()=>{
 const ids=read('analisis/h-2-1-criticidad-por-universo-v1.json').problemas.map(x=>x.id).sort();
 assert.deepEqual(data.rows.map(x=>x.id).sort(),ids);
 assert.equal(new Set(data.rows.map(x=>x.id)).size,31);
 assert.equal(createHash('sha256').update(readFileSync(data.bank.path)).digest('hex'),data.bank.sha256);
 assert.equal(bank.findings.length,245);assert.equal(bank.sources.length,26);
 assert.equal(readFileSync('index.html','utf8'),readFileSync('versiones/v0.6/index.html','utf8'));
 assert.deepEqual(read('preview/h0/h2-evidence.json').ranking31,data);
});
test('124 complete reasoned judgments, references resolve to the same problem',()=>{
 const index=new Map(bank.findings.map(x=>[x.id,x]));
 for(const r of data.rows){
  assert.deepEqual(r.components.map(c=>c.key),keys);
  assert.ok(['Media','Baja'].includes(r.confidence));
  for(const c of r.components){
   assert.ok(Number.isInteger(c.level)&&c.level>=1&&c.level<=5);
   assert.ok(c.reason.length>20&&c.refs.length>0);
   for(const ref of c.refs) assert.equal(index.get(ref)?.P,r.id,ref);
  }
  assert.deepEqual(r.allClaimIds,bank.findings.filter(x=>x.P===r.id).map(x=>x.id));
  assert.equal(r.score,calculate(r.components.map(c=>c.level),data.method.weights));
  assert.equal(r.rank,1+data.rows.filter(x=>x.score>r.score).length);
 }
});
test('ten weight scenarios conserve 100%, scores, ties, and rank ranges',()=>{
 assert.equal(data.weightScenarios.length,10);
 for(const s of data.weightScenarios){
  assert.ok(Math.abs(Object.values(s.weights).reduce((a,b)=>a+b,0)-100)<1e-9);
  for(const r of data.rows){
   assert.equal(s.scores[r.id],calculate(r.components.map(c=>c.level),s.weights));
   assert.equal(s.ranks[r.id],1+Object.values(s.scores).filter(x=>x>s.scores[r.id]).length);
  }
 }
 for(const r of data.rows){
  assert.deepEqual(r.weightRankRange,[Math.min(...data.weightScenarios.map(s=>s.ranks[r.id])),Math.max(...data.weightScenarios.map(s=>s.ranks[r.id]))]);
  for(const v of r.judgmentScenarios){
   const cs=r.components.map(c=>c.level);const i=keys.indexOf(v.key);
   assert.ok(r.components[i].inferred);cs[i]+=v.delta;
   assert.equal(v.score,calculate(cs,data.method.weights));
   assert.equal(v.rank,1+data.rows.filter(x=>x.id!==r.id&&x.score>v.score).length);
  }
 }
});
test('source dependence does not become extra samples or severity points',()=>{
 assert.equal(bank.findings.find(x=>x.id==='P13__F11__01').root_credited,bank.findings.find(x=>x.id==='P13__F12__01').root_credited);
 assert.equal(bank.findings.find(x=>x.id==='P20__F09__01').root_credited,bank.findings.find(x=>x.id==='P20__F04__01').root_credited);
 for(const r of data.rows){
  assert.equal(new Set(r.attributedOrigins).size,r.attributedOrigins.length);
  for(const o of r.originRemoval){
   const expected=r.components.filter(c=>c.refs.every(id=>bank.findings.find(x=>x.id===id).root_credited===o.origin)).map(c=>c.key);
   assert.deepEqual(o.componentsLosingAllCitedSupport,expected);
  }
 }
});
test('main render exposes 31 scores, 124 reasons, caveats, and an escape boundary',()=>{
 const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const links={problem:id=>'/problemas?p='+id};
 const html=renderRanking31(data,bank,links,esc);
 assert.equal((html.match(/data-rank31-row=/g)||[]).length,31);
 assert.equal((html.match(/class="rank31-criterion"/g)||[]).length,124);
 for(const term of ['escenario hipotético','no intervalos estadísticos','No estima prevalencia nacional','Confianza']) assert.ok(html.includes(term)||html.toLowerCase().includes(term.toLowerCase()),term);
 const evil=structuredClone(data);evil.rows[0].title='<img src=x onerror=alert(1)>';
 assert.ok(!renderRanking31(evil,bank,links,esc).includes('<img src=x'));
});

test('previously collected P13 studies resolve without enlarging the frozen bank',()=>{
 const prior=read('analisis/p13-aplicacion-v02.json').studies;
 assert.deepEqual(data.existingP13Studies,prior);
 for(const c of data.rows.find(x=>x.id==='P13').components)
  for(const id of c.supplementalRefs||[]) assert.ok(prior.some(s=>s.id===id));
 assert.equal(bank.findings.length,245);
});

test('editable weights reject missing, invalid and non-100 totals without imputing zeros',()=>{
 for(const weights of [{},{I:'',F:25,A:25,U:50},{I:-1,F:26,A:25,U:50},
  {I:101,F:0,A:0,U:0},{I:NaN,F:25,A:25,U:25},{I:Infinity,F:0,A:0,U:0},
  {I:true,F:25,A:25,U:49},{I:0,F:0,A:0,U:0},{I:35,F:25,A:25,U:14}]) {
  assert.equal(validateWeights(weights).valid,false);
  assert.throws(()=>rankingWithWeights(data.rows,weights),RangeError);
 }
 assert.equal(validateWeights({I:'33.3',F:'33.3',A:'33.4',U:'0'}).valid,true);
 assert.equal(validateWeights({I:0,F:0,A:0,U:100}).valid,true);
});

test('reweighting agrees with the original, obeys extreme weights, and preserves evidence',()=>{
 const before=JSON.stringify(data);
 assert.deepEqual(rankingWithWeights(data.rows,data.method.weights),data.rows);
 const impact=rankingWithWeights(data.rows,{I:100,F:0,A:0,U:0});
 for(const r of impact){
  const level=r.components.find(c=>c.key==='I').level;
  assert.equal(r.score,Math.round(1+99*(level-1)/4));
  assert.equal(r.rank,1+impact.filter(x=>x.score>r.score).length);
 }
 assert.equal(impact.find(x=>x.id==='P02').score,100);
 assert.equal(impact.find(x=>x.id==='P52').rank,1);
 assert.equal(rankingWithWeights(data.rows,{I:50,F:20,A:20,U:10}).find(x=>x.id==='P20').score,65);
 assert.equal(JSON.stringify(data),before);
});

test('scenario export states the applied weights and keeps original results separate',()=>{
 const weights={I:0,F:100,A:0,U:0};
 const out=scenarioExport(data,weights);
 assert.deepEqual(out.scenario.weights,weights);
 assert.equal(out.rows.length,31);
 const p17=out.rows.find(x=>x.id==='P17');
 assert.equal(p17.score,100);assert.equal(p17.baseScore,81);
 assert.equal(p17.rank,1);assert.equal(p17.baseRank,2);
 assert.deepEqual(out.baselineMethod.weights,data.method.weights);
 assert.deepEqual(p17.components,data.rows.find(x=>x.id==='P17').components);
});
