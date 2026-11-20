import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {renderP13Application} from '../preview/h0/p13-application.mjs';
const read = p => JSON.parse(fs.readFileSync(new URL(p, import.meta.url),'utf8'));
const a = read('../analisis/p13-aplicacion-v02.json');
const evidence = read('../preview/h0/h2-evidence.json');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const round = n => Math.round(n * 100) / 100;

test('límites de unión, sin suponer independencia ni reconstruir conteos',()=>{
  const c=a.calculations;
  assert.deepEqual(c.reachNominal,[Math.max(c.donations,c.ownIncome),Math.min(100,c.donations+c.ownIncome)]);
  assert.deepEqual(c.reachRoundingEnvelope,[Math.max(c.donations-.5,c.ownIncome-.5),Math.min(100,c.donations+.5+c.ownIncome+.5)]);
  assert.equal(c.denominator,255);
  assert.equal(c.total,null);
});
test('la tabla SII conserva categorías y no se confunde con una encuesta',()=>{
  assert.equal(round(50.7+11.5+24.2+13.6),100);
  assert.equal(round(100-a.calculations.siiContinuity),a.calculations.siiDiscontinuity);
  assert.match(a.calculations.siiCohort,/2018/);
  assert.match(a.calculations.siiCohort,/no explicitado/);
});
test('la falta de identificación y la sensibilidad se calculan con pesos completos',()=>{
  assert.deepEqual(a.calculations.logicalBoundsNominal,[Math.round(.25*37+.75*1),Math.round(.25*68+.75*100)]);
  assert.equal(Math.round(.20*37+.80*1),8);
  assert.equal(Math.round(.20*68+.80*100),94);
  assert.equal(evidence.criticalityIndex.scores.P13.ready,false);
});
test('16 publicaciones y 28 hallazgos conservados; mismo IFO no duplica origen',()=>{
  assert.equal(a.bankPublications.length,16);
  const ids=a.bankPublications.flatMap(s=>s.claims.map(c=>c.id));
  assert.equal(ids.length,28);assert.equal(new Set(ids).size,28);
  const get=id=>a.bankPublications.find(x=>x.id===id);
  assert.equal(get('F11').originKey,get('F12').originKey);
  assert.equal(get('F12').empiricalReuseOnly,true);
  assert.equal(get('F09').empiricalReuseOnly,true);
  assert.equal(get('F14').empiricalReuseOnly,true);
  assert.ok(a.bankPublications.every(s=>s.independentSampleClaimed===false));
});
test('aplicación idéntica al archivo canónico y referencias resueltas',()=>{
  assert.deepEqual(evidence.applications.P13,a);
  const refs=new Set(a.studies.map(x=>x.id));
  assert.equal(a.studies.length,9);
  assert.ok(a.components.every(c=>c.refs.every(r=>refs.has(r))));
  assert.ok(a.studies.every(s=>s.url.startsWith('https://')));
});
test('ambas vistas contienen todos los estudios y hallazgos, con texto escapado',()=>{
  for(const scope of ['fundaciones','tercer_sector']){
    const html=renderP13Application(a,scope,esc);
    assert.equal((html.match(/data-p13-study=/g)||[]).length,9);
    assert.equal((html.match(/data-p13-publication=/g)||[]).length,16);
    assert.equal((html.match(/data-p13-claim=/g)||[]).length,28);
    assert.match(html,/37–68%/);
  }
  const malicious=structuredClone(a);malicious.studies[0].title='<script>x</script>';
  assert.doesNotMatch(renderP13Application(malicious,'fundaciones',esc),/<script>/);
  assert.equal(renderP13Application(null,'fundaciones',esc),'');
});
