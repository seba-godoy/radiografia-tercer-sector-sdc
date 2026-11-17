#!/usr/bin/env node
// QA PX-R1.2b · Node.js 20+ · ejecutar desde raíz del repo:
// node analisis/validate-px-r12b.mjs
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const path='analisis/';
const a=JSON.parse(readFileSync(path+'px-r1-2b-attribution-31p-147links-v1.json','utf8'));
const source=JSON.parse(readFileSync(path+'px-r1-2a-fuentes-linaje-v1.json','utf8'));
const contract=JSON.parse(readFileSync(path+'px-r1-1-contrato-universos-v1.json','utf8'));
const P=new Map(a.problems.map(p=>[p.problem_id,p])), L=new Map(a.links.map(l=>[l.link_id,l])),F=new Map(a.findings.map(f=>[f.finding_id,f])),S=new Map(source.records.map(s=>[s.id,s]));
let pass=0;
function test(name,run){run();pass++;console.log('PASS',name)}
test('31 IDs P únicos',()=>{assert.equal(a.problems.length,31);assert.equal(P.size,31)});
test('147 vínculos únicos',()=>{assert.equal(a.links.length,147);assert.equal(L.size,147)});
test('245 hallazgos únicos',()=>{assert.equal(a.findings.length,245);assert.equal(F.size,245)});
test('5 claims históricos',()=>assert.equal(a.canonical_claims.length,5));
test('26 fuentes pertenecen a la matriz R1.2a',()=>assert.equal(S.size,26));
test('número de respaldos por P',()=>assert.ok(a.problems.every(p=>p.link_ids.length===p.source_count&&p.finding_ids.length===p.finding_count)));
test('todos los vínculos apuntan a P y fuente reales',()=>assert.ok(a.links.every(l=>P.has(l.problem_id)&&S.has(l.source_id)&&L.has(l.link_id))));
test('relaciones con hallazgos completos y parent correcto',()=>assert.ok(a.links.every(l=>l.finding_ids.length===l.num_findings&&l.finding_ids.every(f=>F.has(f)&&F.get(f).link_id===l.link_id))));
test('los 245 hallazgos conservan texto y URL',()=>assert.ok(a.findings.every(f=>f.finding_text&&f.reference_locations.length>0&&f.reference_locations.every(r=>r.label&&/^https?:/.test(r.url)))));
test('etiquetas corresponden a contrato R1.1',()=>assert.ok(a.findings.every(f=>contract.population_evidence_class_enum.includes(f.population_evidence_class))));
test('no se inventan porcentajes ni rangos exclusivos de fundaciones',()=>assert.ok(a.problems.every(p=>p.statistical_prevalence_fundaciones===null&&p.statistical_severity_rank===null)&&a.canonical_claims.every(c=>c.scope_foundations_specific_rate===null)));
test('P20 conserva 62% y N=125 de muestra mixta',()=>{const c=a.canonical_claims.find(x=>x.id==='CLM-F03-D22-RENDICION-62');assert.equal(c.percent,62);assert.equal(c.denominator,125);assert.equal(c.foundation_population_class,'M_MIXTA_NO_DESAGREGADA');assert.ok(a.findings.some(f=>f.problem_id==='P20'&&f.source_id==='F03'&&f.population_evidence_class==='M_MIXTA_NO_DESAGREGADA'))});
test('P48 conserva evidencia sectorial cualitativa sin N',()=>{const cs=a.canonical_claims.filter(c=>c.problem_ids.includes('P48'));assert.equal(cs.length,2);assert.ok(cs.every(c=>c.denominator===null&&c.percent===null&&c.foundation_population_class==='S_SECTORIAL_SIN_FORMA'));assert.equal(P.get('P48').finding_count,2)});
test('F03 antecedentes de encuentro no se confunden con encuesta',()=>assert.ok(a.findings.filter(x=>x.classification_override==='encuentro_F03_100_fundaciones').every(x=>x.population_evidence_class==='F_EXCLUSIVA_EXPLICITA')));
test('F11/F12 comparten IFO 2025',()=>{assert.equal(S.get('F11').independence_group,S.get('F12').independence_group);assert.ok(a.links.filter(l=>['F11','F12'].includes(l.source_id)).every(l=>l.source_root_candidate==='IFO-2025-TRASCENDER'))});
test('F09 reutiliza F04 y no crea muestra nueva',()=>assert.ok(a.findings.filter(f=>f.classification_override==='reutilizacion_de_F04').every(f=>f.measurement_source_id==='F04'&&f.independence_group_for_claim==='SEA-DIRECCIONES-2025')));
test('F28 oferta y demanda distinguidas',()=>assert.equal(F.get('P32__F28__01').population_evidence_class,'I_INFERIDA_POR_VALIDAR'));
test('P30/P54 persisten aunque falten cruces por segmento',()=>assert.ok(['P30','P54'].every(p=>P.has(p)&&a.manifest.counts.missing_segment_cross_problems.includes(p))));
test('F27 registro vivo no se interpreta como tasa de fundaciones',()=>assert.ok(a.findings.filter(f=>f.source_id==='F27').every(f=>f.population_evidence_class==='S_SECTORIAL_SIN_FORMA')));
test('orígenes originales ND no se sobrescriben',()=>assert.equal(S.get('F01').catalog_origin,null));
test('CSV P/relaciones tienen encabezado y filas esperadas',()=>{const lines=f=>readFileSync(path+f,'utf8').trim().split(/\r?\n/);assert.equal(lines('px-r1-2b-problemas-31-v1.csv').length,32);assert.equal(lines('px-r1-2b-relaciones-147-v1.csv').length,148)});
console.log('QA PX-R1.2b',pass,'/21 PASS; no sustituye verificación primaria de las 245 citas individuales.');
