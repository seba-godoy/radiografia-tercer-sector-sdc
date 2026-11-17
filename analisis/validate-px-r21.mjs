#!/usr/bin/env node
/**
 * PX-R2.1 · Auditoría reproducible de cobertura y linaje.
 * Ejecutar desde la raíz del repo: node analisis/validate-px-r21.mjs
 * Solo lectura; no redes ni modificaciones.
 */
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
const read=name=>JSON.parse(readFileSync("analisis/"+name,"utf8"));
const d=read("px-r2-1-linaje-31p-147v-245h-v1.json");
const s=read("px-r1-2a-fuentes-linaje-v1.json");
const b=read("px-r1-2b-attribution-31p-147links-v1.json");
const keys=a=>new Set(a),byId=Object.fromEntries(s.records.map(x=>[x.id,x]));
let pass=0;
const t=(label,fn)=>{fn();pass++;console.log("PASS",label)};
t("01 31 fichas P",()=>assert.equal(d.problems.length,31));
t("02 147 pares P×F",()=>assert.equal(d.links.length,147));
t("03 245 hallazgos",()=>assert.equal(d.findings.length,245));
t("04 26 fuentes y 25 raíces originales",()=>{assert.equal(d.sources.length,26);assert.equal(d.summary.distinct_original_root_candidates,25);});
t("05 IDs de problema únicos",()=>assert.equal(keys(d.problems.map(x=>x.problem_id)).size,31));
t("06 IDs de relación únicos",()=>assert.equal(keys(d.links.map(x=>x.link_id)).size,147));
t("07 IDs de hallazgo únicos",()=>assert.equal(keys(d.findings.map(x=>x.finding_id)).size,245));
t("08 31 problemas originales conservados",()=>assert.deepEqual([...keys(d.problems.map(x=>x.problem_id))].sort(),[...keys(b.problems.map(x=>x.problem_id))].sort()));
t("09 147 relaciones originales conservadas",()=>assert.deepEqual(d.links.map(x=>x.link_id).sort(),b.links.map(x=>x.link_id).sort()));
t("10 245 hallazgos originales conservados",()=>assert.deepEqual(d.findings.map(x=>x.finding_id).sort(),b.findings.map(x=>x.finding_id).sort()));
t("11 todos hallazgos mantienen localizador y URL",()=>assert.ok(d.findings.every(x=>x.locator.length>0&&x.locator.every(r=>r.label&&/^https?:\/\//.test(r.url)))));
t("12 fuente original de 245 hallazgos existe",()=>assert.ok(d.findings.every(x=>!!byId[x.publication_source_id])));
t("13 fuentes reatribuidas existentes o FOCUS pendiente",()=>assert.ok(d.findings.every(x=>x.credited_source_id===null?x.credited_root_candidate==="FOCUS-RESIDENCIAL-ND":!!byId[x.credited_source_id])));
t("14 todos los pares P×F reconstruidos con hallazgos",()=>assert.ok(d.links.every(l=>d.findings.filter(f=>f.link_id===l.link_id).length===l.finding_count)));
t("15 4 reutilizaciones F09→F04",()=>{const x=d.findings.filter(f=>f.provenance_code==="reutilizacion_explicita_F04_via_F09");assert.equal(x.length,4);assert.ok(x.every(y=>y.publication_source_id==="F09"&&y.credited_source_id==="F04"&&y.credited_root_candidate===byId.F04.independence_group));});
t("16 1 reutilización F07→F01 solo P02",()=>{const x=d.findings.filter(f=>f.provenance_code==="reutilizacion_explicita_mapa_F01_via_F07");assert.equal(x.length,1);assert.equal(x[0].finding_id,"P02__F07__01");assert.equal(x[0].credited_source_id,"F01");});
t("17 5 reutilizaciones totales y sin copia doble",()=>assert.equal(d.summary.finding_level_explicit_reuses,5));
t("18 IFO: F11/F12 un origen, dos fichas",()=>{assert.equal(byId.F11.independence_group,byId.F12.independence_group);assert.ok(d.findings.filter(f=>["F11","F12"].includes(f.publication_source_id)).every(f=>f.credited_root_candidate==="IFO-2025-TRASCENDER"));});
t("19 F14 no se fusiona automáticamente con IFO",()=>assert.ok(d.findings.filter(f=>f.publication_source_id==="F14").every(f=>f.credited_root_candidate==="FORTALECIDOS-GLOCAL-2025"&&f.independence_assertion==="independencia_no_verificada")));
t("20 F09 no se deduplica como documento entero",()=>assert.ok(d.findings.some(f=>f.publication_source_id==="F09"&&f.credited_source_id==="F09")&&d.findings.some(f=>f.publication_source_id==="F09"&&f.credited_source_id==="F04")));
t("21 F07 análisis propio sigue visible",()=>assert.ok(d.findings.some(f=>f.publication_source_id==="F07"&&f.credited_source_id==="F07")));
t("22 Estudio Focus externo separado y sin acreditación",()=>{const a=d.findings.filter(f=>f.provenance_code==="referencia_tercero_fuera_catalogo");assert.equal(a.length,1);assert.equal(a[0].finding_id,"P17__F09__02");assert.equal(a[0].credited_source_id,null);});
t("23 raíces por problema son de documentos, NO estudios",()=>assert.ok(d.problems.every(x=>x.count_of_independent_studies_verified===null)));
t("24 ningún problema recibe incidencia o gravedad",()=>assert.ok(d.problems.every(x=>x.no_incidence_or_impact_score===true&&x.count_of_independent_studies_verified===null)));
t("25 P30 y P54 preservados sin relación P×S",()=>assert.deepEqual(d.summary.problems_without_segment_links.sort(),["P30","P54"]));
t("26 4 problemas con solapamientos potenciales",()=>assert.equal(d.problems.filter(p=>p.possible_overlap_pairs.length).length,4));
t("27 los solapamientos posibles no se colapsan",()=>assert.ok(d.dependency_risks.every(r=>r.status==="solapamiento_posible_no_deduplicar_automaticamente")));
t("28 conteo de hallazgos por P coincide con input",()=>assert.ok(d.problems.every(p=>p.raw_finding_count===b.problems.find(x=>x.problem_id===p.problem_id).finding_count)));
t("29 conteo de documentos por P coincide con input",()=>assert.ok(d.problems.every(p=>p.raw_publication_count===b.problems.find(x=>x.problem_id===p.problem_id).source_count)));
t("30 no se derivaron nuevas tasas fundacionales",()=>assert.equal(d.summary.population_incidence_counts,null));
t("31 tabla CSV de problemas contiene 31 registros",()=>assert.equal(readFileSync("analisis/px-r2-1-matriz-31-problemas-v1.csv","utf8").trim().split(/\r?\n/).length,32));
t("32 tabla CSV de relaciones contiene 147 registros",()=>assert.equal(readFileSync("analisis/px-r2-1-matriz-147-relaciones-v1.csv","utf8").trim().split(/\r?\n/).length,148));
t("33 tabla CSV de hallazgos contiene 245 registros",()=>assert.equal(readFileSync("analisis/px-r2-1-linaje-245-hallazgos-v1.csv","utf8").trim().split(/\r?\n/).length,246));
t("34 integridad de todas las referencias raíz por P",()=>assert.ok(d.problems.every(p=>Object.values(p.roots).reduce((n,v)=>n+v.finding_ids.length,0)===p.raw_finding_count)));
t("35 proveniencia heredada es preliminar, no cotejo 245 PDF",()=>assert.match(d.metadata.statuses.source_rechecks,/not_all_245_claims/));
console.log("PX-R2.1 DATA QA",pass,"/35 PASS: cobertura sin multiplicación de estudios ni prevalencia ficticia.");
