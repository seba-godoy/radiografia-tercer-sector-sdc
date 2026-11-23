import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {opScore,opRanking,opCost,validateOpWeights,validateOpCost,opCsv} from '../preview/h0/op-score.mjs';
import {opRender} from '../preview/h0/op-view.mjs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const data=read('analisis/oportunidades-7-v1.json'),bank=read('analisis/mf1-banco-26-fuentes-v1.json'),crit=read('analisis/criticidad-31-v03.json'),ab=read('analisis/abordabilidad-31-v1.json');
const w=data.method.weights,ref=(v,weights=w)=>Math.floor(1+99*(Object.entries(weights).reduce((s,[k,n])=>s+v[k]*n,0)/100-1)/4+.50000000001);
const original=JSON.stringify(data);
test('OP-1 covers every problem exactly once and does not inflate groups or independence',()=>{
 assert.equal(data.triage.length,31);assert.equal(new Set(data.triage.map(r=>r.id)).size,31);
 assert.deepEqual(data.triage.map(r=>r.id).sort(),crit.rows.map(r=>r.id).sort());
 assert.equal(data.triage.filter(r=>r.opportunity).length,14);assert.equal(data.triage.filter(r=>!r.opportunity).length,17);
 for(const p of data.triage){assert.ok(p.reason.length>35);assert.equal(p.criticality,crit.rows.find(r=>r.id===p.id).score);assert.equal(p.addressability,ab.rows.find(r=>r.id===p.id).score);}
 const ids=data.rows.flatMap(r=>r.problems);assert.equal(ids.length,14);assert.equal(new Set(ids).size,14);
 assert.equal(data.sources.filter(s=>s.origin==='COS · FECU Social').length,2);
 assert.match(data.method.deduplication,/no dos estudios de eficacia/);
});
test('OP-2 seven concrete tasks have source-backed boundaries, comparison and natural metrics left unknown',()=>{
 const findings=new Map(bank.findings.map(f=>[f.id,f]));
 const sourceIds=new Set(data.sources.map(s=>s.id));
 for(const r of data.rows){
  for(const k of ['user','task','result','outside','current','alternative','gap','ai','delta','feasibility'])assert.ok(r[k].length>25,r.id+' '+k);
  assert.ok(r.features.length>=3);assert.equal(r.confidence,'Baja');assert.equal(r.components.length,4);
  for(const id of r.claimIds)assert.ok(r.problems.includes(findings.get(id)?.P),id);
  for(const id of r.benchmark)assert.ok(sourceIds.has(id));
  for(const [k,v] of Object.entries(r.observed))if(k!=='status')assert.equal(v,null);
 }
});
test('OP-3 calibration prevents recurrence alone from winning and removes duplicated FECU value',()=>{
 const [annual,fecu,duration]=data.method.calibration;
 assert.equal(ref(annual.annual),annual.annualScore);assert.ok(annual.annualScore>annual.frequentScore);
 assert.equal(fecu.beforeScore,51);assert.equal(fecu.afterScore,27);
 assert.equal(data.rows.find(r=>r.id==='OP02').score,fecu.afterScore);
 assert.equal(duration.before.F,duration.after.F);assert.ok(duration.after.D<duration.before.D);
 assert.equal(opScore({M:1,A:1,F:1,D:1},w),1);assert.equal(opScore({M:5,A:5,F:5,D:5},w),100);
});
test('OP-4 independent arithmetic, competition ties and all ten weight scenarios',()=>{
 assert.equal(data.weightScenarios.length,10);
 for(const r of data.rows){assert.equal(r.score,ref(r.levels));assert.equal(r.rank,1+data.rows.filter(x=>x.score>r.score).length);for(const c of r.components){assert.equal(c.level,r.levels[c.key]);assert.ok(c.reason.length>70);}}
 for(const s of data.weightScenarios){assert.ok(Math.abs(Object.values(s.weights).reduce((a,b)=>a+b)-100)<1e-8);for(const r of data.rows){assert.equal(s.scores[r.id],ref(r.levels,s.weights));assert.equal(s.ranks[r.id],1+Object.values(s.scores).filter(v=>v>s.scores[r.id]).length);}}
 assert.equal(data.rows.find(x=>x.id==='OP01').rank,1);assert.equal(data.rows.find(x=>x.id==='OP03').rank,1);
 for(const r of data.rows)for(const s of r.judgmentScenarios){assert.equal(s.score,ref({...r.levels,[s.key]:r.levels[s.key]+s.delta}));assert.equal(s.rank,1+data.rows.filter(x=>x.id!==r.id&&x.score>s.score).length);}
 for(const scenario of ['conservador','central','favorable'])for(const r of opRanking(data.rows,w,scenario))assert.equal(r.score,data.rows.find(x=>x.id===r.id).pairedScenarios[scenario].score);
 assert.equal(JSON.stringify(data),original);
});
test('weights and levels reject empty/null/nonfinite/out of range rather than impute unknown',()=>{
 for(const raw of [{},{M:'',A:25,F:20,D:15},{M:null,A:25,F:20,D:15},{M:101,A:0,F:0,D:0},{M:40,A:25,F:20,D:14},{M:NaN,A:25,F:20,D:15},{M:-1,A:51,F:25,D:25}]){assert.equal(validateOpWeights(raw).valid,false);assert.throws(()=>opScore(data.rows[0].levels,raw),RangeError);}
 assert.equal(validateOpWeights({M:'33.3',A:'33.3',F:'33.4',D:'0'}).valid,true);
 assert.throws(()=>opScore({M:3,A:3,F:2},w),RangeError);assert.throws(()=>opRanking(data.rows,w,'unknown'),RangeError);
 for(const r of data.rows)for(const k of ['M','A','F','D'])if(r.levels[k]<5)assert.ok(opScore({...r.levels,[k]:r.levels[k]+1},w)>=r.score);
});
test('OP-5 annual tasks, token units and labor are separated from a still unknown full TCO',()=>{
 for(const r of data.rows)for(const s of r.costScenarios){
  const out=opCost(r,data.costModel,{activeOrgs:s.activeOrgs,tasksPerOrgYear:r.costAssumptions.tasksPerOrgYear,requestsPerTask:2,inputTokens:4000,outputTokens:1000});
  assert.ok(Math.abs(out.optionalAiApiOnlyUsdMonth-s.optionalAiApiOnlyUsdMonth)<.000001);
  assert.equal(out.fullTcoUsdMonth,null);assert.ok(out.laborHoursMonthRange[0]>0);assert.equal(out.apiOnlyUsdPerTask,.005);
 }
 const op1=data.rows.find(r=>r.id==='OP01');const out=opCost(op1,data.costModel,{activeOrgs:100,tasksPerOrgYear:12,requestsPerTask:2,inputTokens:4000,outputTokens:1000});
 assert.equal(out.optionalAiApiOnlyUsdMonth,.5);assert.equal(out.optionalAiApiOnlyUsdYear,6);assert.ok(Math.abs(out.laborHoursMonthRange[0]-18.6666666667)<1e-8);
 const annual=data.rows.find(r=>r.id==='OP02');assert.equal(annual.costScenarios[0].tasksMonthlyEquivalent,25/12);
 const raw={activeOrgs:1,tasksPerOrgYear:1,requestsPerTask:0,inputTokens:0,outputTokens:0};assert.equal(opCost(op1,data.costModel,raw).optionalAiApiOnlyUsdMonth,0);
 for(const change of [{activeOrgs:0},{activeOrgs:1.5},{tasksPerOrgYear:''},{requestsPerTask:-1},{inputTokens:Infinity},{outputTokens:1.5}])assert.equal(validateOpCost({...raw,...change}).valid,false);
});
test('OP-6 honest recommendation and source escaping survive rendering in both scopes',()=>{
 const e=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const links={problem:id=>'/problemas?p='+id,methods:'/metodos'};
 for(const scope of ['fundaciones','tercer_sector']){const html=opRender(data,bank,crit,ab,scope,links,e);assert.equal((html.match(/data-op-row=/g)||[]).length,7);assert.equal((html.match(/data-op-triage=/g)||[]).length,31);assert.equal((html.match(/data-op-criterion=/g)||[]).length,28);assert.ok(html.includes('por medir'));assert.ok(html.includes('TCO monetario completo'));}
 const bad=structuredClone(data);bad.rows[0].result='<img src=x onerror=alert(1)>';bad.sources[0].url='javascript:alert(1)';assert.ok(!opRender(bad,bank,crit,ab,'fundaciones',links,e).includes('<img src=x'));assert.ok(!opRender(bad,bank,crit,ab,'fundaciones',links,e).includes('href="javascript:'));
 assert.match(opRender(null,bank,crit,ab,'fundaciones',links,e),/no está disponible/);
 assert.equal(data.selection.first,'OP01');assert.ok(data.rows.find(r=>r.id==='OP07').score>data.rows.find(r=>r.id==='OP04').score);assert.match(data.mvp.status,/no construida/);
});
test('baseline source bytes and all previous indices stay unchanged; CSV carries comparison weights',()=>{
 for(const [p,hash] of Object.entries(data.inputHashes))assert.equal(createHash('sha256').update(readFileSync(p)).digest('hex'),hash);
 assert.equal(readFileSync('index.html','utf8'),readFileSync('versiones/v0.6/index.html','utf8'));assert.equal(bank.sources.length,26);assert.equal(bank.findings.length,245);
 const compare={criticality:new Map(crit.rows.map(r=>[r.id,r])),addressability:new Map(ab.rows.map(r=>[r.id,r])),criticalityWeights:crit.method.weights,addressabilityWeights:ab.method.weights};
 const csv=opCsv(opRanking(data.rows,w),w,'central',compare);assert.ok(csv.startsWith('\uFEFF'));assert.equal(csv.split('\r\n').filter(Boolean).length,8);assert.match(csv,/I_peso_criticidad/);assert.match(csv,/K_peso_ASdC/);
 const rows=opRanking(data.rows,w);rows[0].title='=1+1';assert.ok(opCsv(rows,w,'central',compare).includes('"\'=1+1"'));
});
