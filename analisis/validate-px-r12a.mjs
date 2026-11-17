#!/usr/bin/env node
// PX-R1.2a · QA autocontenido para la matriz de fuentes.
// Ejecutar desde la raíz del repositorio:
// node analisis/validate-px-r12a.mjs
// No modifica datos ni consulta la red.
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(readFileSync('analisis/px-r1-2a-fuentes-linaje-v1.json','utf8'));
const r=data.records, byId=Object.fromEntries(r.map(x=>[x.id,x]));
const expected=['F01','F02','F03','F04','F05','F06','F07','F08','F09','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','F20','F21','F22','F23','F26','F27','F28'];
let pass=0;const test=(label,fn)=>{fn();pass++;console.log('PASS',label)};
test('26 IDs exactos y únicos',()=>assert.deepEqual(r.map(x=>x.id),expected));
test('8 orígenes originales vacíos',()=>assert.equal(r.filter(x=>x.catalog_origin===null).length,8));
test('8 IDs candidatos sin sobreescritura',()=>assert.ok(r.filter(x=>x.catalog_origin===null).every(x=>x.origin_resolution==='reconstructed_publication_identity_not_inplace'&&x.normalized_origin_candidate)));
test('F11 y F12 mismo estudio',()=>assert.equal(byId.F11.independence_group,byId.F12.independence_group));
test('25 grupos documentales no son estudios independientes',()=>assert.equal(new Set(r.map(x=>x.independence_group)).size,25));
test('dependencias citadas existen',()=>assert.ok(r.every(x=>x.nonindependent_or_overlap_refs.every(v=>!!byId[v]))));
test('F05 y F13 tienen personas como unidad',()=>assert.ok(byId.F05.unit_of_observation.includes('persona')&&byId.F13.unit_of_observation.includes('persona')));
test('F02 tiene indicadores específicos solo por claim',()=>assert.equal(byId.F02.foundation_specific_data_at_source_level,'parcial_por_claim'));
test('F27 portal vivo con cambios de corte',()=>assert.ok(byId.F27.source_kind==='live_administrative_portal'&&byId.F27.caution.includes('14-11-2026')));
test('F28 dos encuestas / participantes separados',()=>assert.ok(byId.F28.caution.includes('154')&&byId.F28.caution.includes('27')&&byId.F28.caution.includes('49')));
test('F10 no atribuye 245 solo a fundaciones',()=>assert.ok(byId.F10.caution.includes('245 organizaciones')&&!byId.F10.caution.includes('245 fundaciones')));
test('vínculos originales observados',()=>assert.equal(data.context.backing_pairs,147));
test('todos los registros obligan atribución por afirmación',()=>assert.ok(r.every(x=>x.claims_require_separate_attribution===true)));
test('cada ficha contiene origen, población, método y cautela',()=>assert.ok(r.every(x=>x.source_url&&x.independence_group&&x.primary_population&&x.method_summary&&x.caution&&x.verification_level)));
console.log('QA PX-R1.2a:',pass,'pruebas PASS. No sustituye cotejo de PDF/indicadores ni QA PX-R1.2b.');
