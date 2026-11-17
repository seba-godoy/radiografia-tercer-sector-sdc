#!/usr/bin/env node
/**
 * PX-R2.2a · QA de taxonomía temática y cobertura del catálogo.
 * Node >= 20; solo lectura. Coteja el snapshot contra las bases R2.1/R1.2b.
 * No prueba semántica de un tema ni veracidad de los 245 PDF originales.
 */
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
const load=n=>JSON.parse(readFileSync("analisis/"+n,"utf8"));
const x=load("px-r2-2a-taxonomia-31p-7temas-v1.json");
const prior=load("px-r2-1-linaje-31p-147v-245h-v1.json");
const base=load("px-r1-2b-attribution-31p-147links-v1.json");
const byId=new Map(prior.problems.map(p=>[p.problem_id,p]));
const fids=new Set(prior.findings.map(f=>f.finding_id));
const tby=new Map(x.themes.map(t=>[t.topic_id,t]));
const unique=a=>[...new Set(a)];
let pass=0;
function T(label,fn){try{fn();pass++;console.log("PASS",String(pass).padStart(2,"0"),label);}catch(e){console.error("FAIL",label,e.message);process.exitCode=1;}}
T("01 · 31 problemas clasificados",()=>assert.equal(x.problems.length,31));
T("02 · 7 categorías temáticas",()=>assert.equal(x.themes.length,7));
T("03 · 31 IDs sin duplicación",()=>assert.equal(unique(x.problems.map(p=>p.problem_id)).length,31));
T("04 · mismo universo de IDs que R2.1",()=>assert.deepEqual(x.problems.map(p=>p.problem_id).sort(),prior.problems.map(p=>p.problem_id).sort()));
T("05 · claves temáticas únicas",()=>assert.equal(unique(x.themes.map(t=>t.topic_id)).length,7));
T("06 · cada P tiene tema válido",()=>assert.ok(x.problems.every(p=>tby.has(p.primary_topic_id))));
T("07 · tema principal aparece exactamente una vez",()=>assert.ok(x.problems.every(p=>x.themes.filter(t=>t.problem_ids.includes(p.problem_id)).length===1)));
T("08 · lista de problemas por tema sin cruces primarios",()=>assert.equal(unique(x.themes.flatMap(t=>t.problem_ids)).length,31));
T("09 · grupos de tamaño calculado correctamente",()=>assert.deepEqual(x.themes.map(t=>t.problem_count),[6,7,5,4,3,4,2]));
T("10 · suma de problemas por temas es 31",()=>assert.equal(x.themes.reduce((a,t)=>a+t.problem_count,0),31));
T("11 · porcentajes internos de catálogo = P/31",()=>assert.ok(x.themes.every(t=>Math.abs(t.problem_catalog_pct-(100*t.problem_count/31))<0.006)));
T("12 · texto original del P se conserva",()=>assert.ok(x.problems.every(p=>p.problem_title===byId.get(p.problem_id).title)));
T("13 · no hay categorías sin límites escritos",()=>assert.ok(x.themes.every(t=>t.description&&t.include&&t.exclude)));
T("14 · clasificación principal documentada como editorial",()=>assert.match(x.manifest.method,/editorial/));
T("15 · 14 etiquetas secundarias",()=>assert.equal(x.totals.secondaryCodedProblems,14));
T("16 · secundarias válidas y distintas de primaria",()=>assert.ok(x.problems.every(p=>p.secondary_topic_id===null||tby.has(p.secondary_topic_id)&&p.secondary_topic_id!==p.primary_topic_id&&p.secondary_reason)));
T("17 · secundarias no inflan distribución",()=>assert.equal(x.themes.flatMap(t=>t.problem_ids).length,31));
T("18 · P02 convenio primario y servicio secundario",()=>{const p=x.problems.find(p=>p.problem_id==="P02");assert.equal(p.primary_topic_id,"T02");assert.equal(p.secondary_topic_id,"T06")});
T("19 · P32 documentación y capacidad",()=>{const p=x.problems.find(p=>p.problem_id==="P32");assert.equal(p.primary_topic_id,"T04");assert.equal(p.secondary_topic_id,"T05")});
T("20 · P46 incidencia/visibilidad y captación",()=>{const p=x.problems.find(p=>p.problem_id==="P46");assert.equal(p.primary_topic_id,"T07");assert.equal(p.secondary_topic_id,"T01")});
T("21 · P48 sigue en operación/cobertura con una sola fuente",()=>{const p=x.problems.find(p=>p.problem_id==="P48");assert.equal(p.primary_topic_id,"T06");assert.equal(p.raw_publications,1)});
T("22 · P30 y P54 sobreviven sin cruce de segmentos",()=>assert.ok(["P30","P54"].every(id=>x.problems.find(p=>p.problem_id===id).segment_cross_status==="ND_sin_cruce")));
T("23 · 147 vínculos P×F sin pérdida",()=>assert.equal(x.themes.reduce((a,t)=>a+t.publication_links_sum,0),147));
T("24 · 245 hallazgos sin pérdida",()=>assert.equal(x.themes.reduce((a,t)=>a+t.finding_count,0),245));
T("25 · ficha de publicación conservada por P",()=>assert.ok(x.problems.every(p=>p.raw_publications===byId.get(p.problem_id).raw_publication_count)));
T("26 · raíz de documento conservada por P",()=>assert.ok(x.problems.every(p=>p.document_roots_candidate===byId.get(p.problem_id).distinct_document_root_candidates)));
T("27 · orígenes candidatos conservados por P",()=>assert.ok(x.problems.every(p=>p.credited_origin_candidates===byId.get(p.problem_id).credited_origin_candidates)));
T("28 · hallazgos por P conservados",()=>assert.ok(x.problems.every(p=>p.findings===byId.get(p.problem_id).raw_finding_count)));
T("29 · integridad de source IDs por P",()=>assert.ok(x.problems.every(p=>JSON.stringify(p.source_ids)===JSON.stringify(byId.get(p.problem_id).source_ids))));
T("30 · conteo por T recalculado de links originales",()=>{
 for(const t of x.themes){const ps=new Set(t.problem_ids);assert.equal(t.publication_links_sum,prior.links.filter(l=>ps.has(l.problem_id)).length);}
});
T("31 · conteo por T recalculado de hallazgos",()=>{
 for(const t of x.themes){const ps=new Set(t.problem_ids);assert.equal(t.finding_count,prior.findings.filter(f=>ps.has(f.problem_id)).length);}
});
T("32 · 26 publicaciones globales y 25 raíces candidatas",()=>{assert.equal(x.totals.sourceFGlobal,26);assert.equal(x.totals.globallyCandidateRoots,25);});
T("33 · F únicas por T deduplicadas dentro del tema",()=>{
 for(const t of x.themes){const ps=new Set(t.problem_ids),src=unique(prior.links.filter(l=>ps.has(l.problem_id)).map(l=>l.publication_source_id));assert.deepEqual([...src].sort(),t.distinct_publication_ids);}
});
T("34 · raíces documentales originales por tema consistentes",()=>{
 for(const t of x.themes){const ps=new Set(t.problem_ids);const roots=unique(prior.links.filter(l=>ps.has(l.problem_id)).map(l=>l.original_root_candidate)).sort();assert.deepEqual(t.distinct_original_root_candidates,roots);}
});
T("35 · orígenes acreditados por hallazgo por tema consistentes",()=>{
 for(const t of x.themes){const ps=new Set(t.problem_ids);const roots=unique(prior.findings.filter(l=>ps.has(l.problem_id)).map(l=>l.credited_root_candidate)).sort();assert.deepEqual(t.credited_origin_candidates,roots);}
});
T("36 · no sumar F únicas de distintos temas como 26",()=>{const sum=x.themes.reduce((a,t)=>a+t.distinct_publication_count,0);assert.ok(sum>26);assert.equal(x.totals.sourceAppearingMultipleTopics,22);});
T("37 · 8 problemas de una sola publicación",()=>assert.equal(x.totals.singlySourcedProblems,8));
T("38 · cuatro P de T06 con una sola fuente",()=>{const t=tby.get("T06");assert.equal(t.single_publication_problem_count,4);assert.deepEqual(t.single_publication_problem_ids,["P23","P48","P52","P53"]);});
T("39 · F únicas T06 son solo F03/F26",()=>assert.deepEqual(tby.get("T06").distinct_publication_ids,["F03","F26"]));
T("40 · doble conteo temático detectado F11/F12 dentro de T01",()=>{assert.equal(tby.get("T01").distinct_publication_count,19);assert.equal(tby.get("T01").distinct_original_root_candidate_count,18)});
T("41 · dos raíces menos por F11/F12 no crea estudios certificados",()=>assert.ok(x.themes.every(t=>t.independent_study_count===null)));
T("42 · tasas de incidencia y severidad siguen ND",()=>assert.ok(x.problems.every(p=>p.population_incidence===null&&p.severity_rank===null)&&x.themes.every(t=>t.incidence_rate===null&&t.severity_score===null)));
T("43 · cinco reutilizaciones explícitas conservadas",()=>assert.equal(x.totals.reusedFindingAttributions,5));
T("44 · no hay pérdida de ID de hallazgo en base de referencia",()=>assert.equal(fids.size,245));
T("45 · grupos incluyen 4 problemáticas reportabilidad",()=>assert.deepEqual(tby.get("T04").problem_ids,["P32","P38","P40","P41"]));
T("46 · cuatro casos de T06 no implican incidencia baja",()=>assert.match(x.manifest.anti_claims.join(" "),/no tasa de incidencia/));
T("47 · método de Mapa OSC externo no sustituye codificación",()=>assert.match(x.manifest.external_framework_note,/NO reutilizan sus porcentajes/));
T("48 · no extrapolación de fundaciones; siguiente R2.2b",()=>assert.match(x.manifest.segment_specific_analysis,/R2.2b pendiente/));
T("49 · filas CSV 31 P + cabecera",()=>assert.equal(readFileSync("analisis/px-r2-2a-matriz-31p-v1.csv","utf8").trim().split(/\r?\n/).length,32));
T("50 · filas CSV 7 T + cabecera",()=>assert.equal(readFileSync("analisis/px-r2-2a-resumen-7temas-v1.csv","utf8").trim().split(/\r?\n/).length,8));
T("51 · filas CSV 147 links + cabecera",()=>assert.equal(readFileSync("analisis/px-r2-2a-trazabilidad-147links-v1.csv","utf8").trim().split(/\r?\n/).length,148));
T("52 · P→F refiere documentos existentes",()=>assert.ok(x.problems.every(p=>p.source_ids.every(id=>prior.sources.some(s=>s.source_id===id)))));
T("53 · no se reemplazó la clasificación R1.2b del selector",()=>assert.deepEqual(base.problems.map(p=>p.problem_id).sort(),x.problems.map(p=>p.problem_id).sort()));
T("54 · informe de estudio usa solo dominio organizacional; sin confundir misión",()=>assert.match(x.manifest.external_framework_note,/áreas de actividad\/organización/));
if(process.exitCode)process.exit(1);
console.log("PX-R2.2a QA COMPLETADO",pass,"/54. Taxonomía editorial verificable, sin ranking ni prevalencia.");
