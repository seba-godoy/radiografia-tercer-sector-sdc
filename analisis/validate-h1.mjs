#!/usr/bin/env node
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {findingNotes,foundationQuestions,foundationFindingNotes} from "../preview/h0/problem-reading.mjs";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const x=read("preview/h0/h1-data.json");
const t=read("analisis/px-r2-2a-taxonomia-31p-7temas-v1.json");
const s=read("analisis/px-r2-2b-segmentos-121-cruces-87-v1.json");
const a=read("analisis/px-r1-2b-attribution-31p-147links-v1.json");
let pass=0;
function test(name,fn){fn();pass++;console.log("PASS "+String(pass).padStart(2,"0")+" "+name);}
test("H1 contrato versionado",()=>assert.equal(x.schema,"h1-sdc-2026-v1"));
for(const [key,n] of Object.entries({problems:31,problem_source_links:147,findings:245,segments:121,crosses:87,base:41,candidate:46,linked_segments:38,indicators:18,indicators_rechecked:4})){
test("Count "+key,()=>assert.equal(x.counts[key],n));
}
for(const [name,arr,n] of [["themes",x.topics,7],["problems",x.problems,31],["linked segments",x.segments,38],["cross",x.crosses,87],["indicators",x.indicators,18]]){
test(name+" exacto",()=>assert.equal(arr.length,n));
}
test("31 temas únicos por problema",()=>assert.equal(new Set(x.problems.map(p=>p.id)).size,31));
test("todos los problemas tienen tema canónico",()=>assert.ok(x.problems.every(p=>x.topics.some(t=>t.id===p.themeId&&t.problemIds.includes(p.id)))));
test("siete temas sin duplicados",()=>assert.equal(new Set(x.topics.map(t=>t.id)).size,7));
test("sumatoria tema =31",()=>assert.equal(x.topics.reduce((v,t)=>v+t.problemCount,0),31));
test("sumatoria vínculos primarios =147",()=>assert.equal(x.topics.reduce((v,t)=>v+t.publicationLinks,0),147));
test("sumatoria hallazgos por tema =245",()=>assert.equal(x.topics.reduce((v,t)=>v+t.findings,0),245));
test("categorías raíz sin independencia asumida",()=>assert.ok(x.topics.every(t=>t.independentStudies===null)));
test("causas gravedad e incidencia no inventadas",()=>assert.ok(x.problems.every(p=>p.independentStudies===null)));
test("no hay 209 segmentos contaminando",()=>assert.equal(x.counts.segments,121));
test("sin duplicados de cruces",()=>assert.equal(new Set(x.crosses.map(c=>c.id)).size,87));
test("cruces referencian segmentos existentes",()=>assert.ok(x.crosses.every(c=>x.segments.some(g=>g.id===c.segmentId))));
test("cruces referencian problemas existentes",()=>assert.ok(x.crosses.every(c=>x.problems.some(p=>p.id===c.problemId))));
test("base no se confunde con candidato",()=>assert.ok(x.crosses.every(c=>["base","candidate"].includes(c.kind))));
test("exactamente 41 vínculos base",()=>assert.equal(x.crosses.filter(c=>c.kind==="base").length,41));
test("exactamente 46 candidatos",()=>assert.equal(x.crosses.filter(c=>c.kind==="candidate").length,46));
test("P30 sin cruce ND",()=>assert.equal(x.crosses.filter(c=>c.problemId==="P30").length,0));
test("P54 sin cruce ND",()=>assert.equal(x.crosses.filter(c=>c.problemId==="P54").length,0));
test("Indicadores verificados cuatro",()=>assert.equal(x.indicators.filter(i=>i.verified).length,4));
test("Los otros catorce quedan pendientes",()=>assert.equal(x.indicators.filter(i=>!i.verified).length,14));
test("I04 enlaza página 21",()=>assert.ok(x.indicators.find(i=>i.id==="I04").sourceUrl.endsWith("#page=21")));
test("I05 enlaza página 22",()=>assert.ok(x.indicators.find(i=>i.id==="I05").sourceUrl.endsWith("#page=22")));
test("I06 conserva la página 35",()=>assert.ok(x.indicators.find(i=>i.id==="I06").sourceUrl.endsWith("#page=35")));
test("sin tasas de fundaciones exclusivas",()=>assert.ok(x.indicators.every(i=>i.eligibleForFoundationRate===false)));
test("no mezclar universos matriz fuente",()=>assert.deepEqual(new Set(a.problems.map(p=>p.problem_id)),new Set(x.problems.map(p=>p.id))));
test("comparación exacta de cruces R2.2b",()=>assert.deepEqual(new Set(s.crosses.map(c=>c.cross_id)),new Set(x.crosses.map(c=>c.id))));
test("cobertura temática coincide R2.2a",()=>assert.deepEqual(new Set(t.themes.map(z=>z.topic_id)),new Set(x.topics.map(z=>z.id))));
test("conteos fuente y origen del segmento",()=>assert.ok(x.segments.every(z=>z.sourceId&&z.scope)));
test("sólo PDF y links públicos en los cruces",()=>assert.ok(x.crosses.every(z=>!z.referenceUrl||/^https?:\/\//.test(z.referenceUrl))));
test("marca y selector se mantienen",()=>{const h=readFileSync("preview/h0/index.html","utf8");assert.ok(h.includes("brand-sdc.css")&&h.includes("scope-top")&&h.includes("h1.css"))});
test("módulo de datos H1 cargado",()=>assert.ok(readFileSync("preview/h0/app.mjs","utf8").includes("h1-data.json")));
test("lecturas editoriales para los 245 hallazgos y los 31 problemas",()=>{
  assert.deepEqual(new Set(Object.keys(findingNotes)),new Set(a.findings.map(f=>f.finding_id)));
  assert.deepEqual(new Set(Object.keys(foundationQuestions)),new Set(a.problems.map(p=>p.problem_id)));
  assert.ok(Object.values(findingNotes).every(note=>typeof note==="string"&&note.trim().length>0));
  assert.ok(Object.keys(foundationFindingNotes).every(id=>Object.hasOwn(findingNotes,id)));
  assert.ok(a.findings.filter(f=>f.population_evidence_class==="F_EXCLUSIVA_EXPLICITA")
    .every(f=>Object.hasOwn(foundationFindingNotes,f.finding_id)));
});
console.log("H-1 DATA PASS "+pass+" / "+pass+" invariantes");
