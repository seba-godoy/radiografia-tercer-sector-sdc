#!/usr/bin/env node
/* PX-R1.3 · QA ejecutable sobre 31 P / 147 links / 245 hallazgos; Node 20+ */
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
 SCOPE, VERSION, normalizarEstado, construirVista, interpretarClaim, construirEnlace,
 leerEnlace, cambiarSeccion, cambiarUniverso, validateDataset
} from "./px-r1-3-selector.mjs";
const dataset=JSON.parse(readFileSync(new URL("./px-r1-2b-attribution-31p-147links-v1.json",import.meta.url),"utf8"));
const source=JSON.parse(readFileSync(new URL("./px-r1-2a-fuentes-linaje-v1.json",import.meta.url),"utf8"));
const original=JSON.stringify(dataset);
let passed=0;
const T=(name,fn)=>{try{fn();passed++;console.log("PASS",name)}catch(e){console.error("FAIL",name,e.message);process.exitCode=1}};
const sector=construirVista(dataset,{scope:SCOPE.SECTOR,section:"problemas"});
const funds=construirVista(dataset,{scope:SCOPE.FOUNDATIONS,section:"problemas",problemId:"P48"});
T("T01 integridad baseline 31/147/245/5",()=>assert.deepEqual(validateDataset(dataset),{problems:31,links:147,findings:245,claims:5}));
T("T02 sector muestra 31/31 y 245 hallazgos",()=>{assert.equal(sector.visibleCases.length,31);assert.equal(sector.summary.referenceCount,245)});
T("T03 fundaciones preserva 31 casos (con franjas)",()=>assert.equal(funds.visibleCases.length,31));
T("T04 prioridad 6 directos, 13 compartidos sin directo, 12 contexto",()=>assert.deepEqual([funds.summary.direct,funds.summary.shared_without_direct,funds.summary.only_context],[6,13,12]));
T("T05 franja Directa/Compartida/Contexto suma 31",()=>assert.deepEqual(funds.bands.map(x=>x.items.length),[6,13,12]));
T("T06 evidencia de P puede mezclar clases sin colapso",()=>{const p=funds.allCases.find(x=>x.problemId==="P02");assert.ok(p.evidenceCounts.directa>0&&p.evidenceCounts.compartida>0&&p.evidenceCounts.contextual>0);assert.equal(p.allFindingCount,14)});
T("T07 seleccionar P48 y cambiar alcance conserva selección",()=>{const next=cambiarUniverso(funds.state,SCOPE.SECTOR,dataset);assert.equal(next.problemId,"P48");assert.equal(construirVista(dataset,next).selectedProblem.problemId,"P48")});
T("T08 P48 solo sectorial N=null permanece",()=>{const p=funds.selectedProblem;assert.equal(p.band,"contexto");assert.equal(p.allFindingCount,2);assert.equal(p.evidenceCounts.sectorial,2);assert.equal(p.foundationPrevalence,null)});
T("T09 ocultar contexto es reversible y registra casos omitidos",()=>{const x=construirVista(dataset,{scope:SCOPE.FOUNDATIONS,showContext:false,problemId:"P48"});assert.equal(x.visibleCases.length,19);assert.equal(x.summary.hiddenByExplicitFilter,12);assert.equal(x.additionalContext.length,12);assert.equal(x.selectedProblem.problemId,"P48");assert.equal(construirVista(dataset,{scope:SCOPE.FOUNDATIONS,showContext:true}).visibleCases.length,31)});
T("T10 solo evidencia directa: no implica 6 fuentes independientes",()=>{const x=construirVista(dataset,{scope:SCOPE.FOUNDATIONS,layer:"directa"});assert.equal(x.visibleCases.length,6);assert.ok(x.visibleCases.every(p=>p.activeFindingCount>0));assert.ok(x.visibleCases.every(p=>p.sourceRootsAreIndependentStudies===false))});
T("T11 filtro por clases no reescribe denominadores",()=>{const x=construirVista(dataset,{scope:SCOPE.FOUNDATIONS,layer:"compartida"});const claim=x.claims.find(y=>y.id==="CLM-F03-D22-RENDICION-62");assert.equal(claim.percent,62);assert.equal(claim.denominator,125);assert.equal(claim.foundationSpecificRate,null)});
T("T12 claim P20 de encuesta mixta tiene advertencia explícita",()=>{const c=funds.claims.find(y=>y.id==="CLM-F03-D22-RENDICION-62");assert.equal(c.class,"M_MIXTA_NO_DESAGREGADA");assert.match(c.warning,/Muestra mixta/);assert.match(c.label,/Dato original, no prevalencia de fundaciones/);assert.equal(c.population,"Encuestadas con contratos o convenios estatales en 2025; fundaciones y corporaciones")});
T("T13 cifra 42% de P20 tiene N original ND",()=>{const c=funds.claims.find(y=>y.id==="CLM-F03-D22-REVISION-42");assert.equal(c.percent,42);assert.equal(c.denominator,null)});
T("T14 P48 cualitativo no crea indicador",()=>{assert.ok(funds.claims.filter(c=>c.problemIds.includes("P48")).every(c=>c.percent===null&&c.denominator===null&&c.foundationSpecificRate===null))});
T("T15 F03 encuentro explícito no representa encuesta F03",()=>{const f=dataset.findings.filter(x=>x.classification_override==="encuentro_F03_100_fundaciones");assert.equal(f.length,5);assert.ok(f.every(x=>x.population_evidence_class==="F_EXCLUSIVA_EXPLICITA"));assert.equal(dataset.findings.filter(x=>x.population_evidence_class==="F_EXCLUSIVA_EXPLICITA").length,6)});
T("T16 linaje F11/F12 IFO compartido",()=>{const f11=source.records.find(x=>x.id==="F11"),f12=source.records.find(x=>x.id==="F12");assert.equal(f11.independence_group,f12.independence_group);assert.equal(f11.independence_group,"IFO-2025-TRASCENDER")});
T("T17 referencias F09 copiadas de F04 no suman un estudio",()=>{const links=dataset.findings.filter(f=>f.classification_override==="reutilizacion_de_F04");assert.equal(links.length,4);assert.ok(links.every(f=>f.measurement_source_id==="F04"))});
T("T18 oferta F28 no se interpreta como encuesta de necesidad",()=>{const f=dataset.findings.find(f=>f.finding_id==="P32__F28__01");assert.equal(f.population_evidence_class,"I_INFERIDA_POR_VALIDAR")});
T("T19 no hay cruce P30/P54: ND no significa ausencia",()=>{const p30=funds.allCases.find(p=>p.problemId==="P30"),p54=funds.allCases.find(p=>p.problemId==="P54");assert.equal(p30.segmentCrossStatus,"ND_sin_cruce_no_significa_ausencia");assert.equal(p54.segmentCrossStatus,"ND_sin_cruce_no_significa_ausencia");assert.ok(p30.allFindingCount>0&&p54.allFindingCount>0)});
T("T20 registro F27 sin prevalencia ni tipo legal",()=>assert.ok(dataset.findings.filter(f=>f.source_id==="F27").every(f=>f.population_evidence_class==="S_SECTORIAL_SIN_FORMA")));
T("T21 código no reclama ranking calculado",()=>assert.ok(sector.summary.rankingNotCalculated&&funds.summary.statsNotNational&&funds.allCases.every(p=>p.foundationRank===null)));
T("T22 conservar 5 claims en ambos universos",()=>assert.equal(funds.claims.length,sector.claims.length));
T("T23 cambio de sección conserva alcance, P y capa",()=>{const state=cambiarSeccion({...funds.state,layer:"sectorial"},"criticidad",dataset);assert.equal(state.scope,"fundaciones");assert.equal(state.problemId,"P48");assert.equal(state.layer,"sectorial")});
T("T24 enlace y lectura recuperan selección",()=>{const input={scope:"fundaciones",section:"abordabilidad",layer:"sectorial",problemId:"P48",query:"  equipos  ",showContext:false};const url=construirEnlace(input,dataset);const o=leerEnlace(url,dataset);assert.equal(o.scope,input.scope);assert.equal(o.section,input.section);assert.equal(o.problemId,input.problemId);assert.equal(o.query,"equipos");assert.equal(o.showContext,false)});
T("T25 P desconocido no se inventa",()=>{const state=normalizarEstado({scope:"fundaciones",problemId:"P99"},dataset);assert.equal(state.problemId,null);assert.equal(state.invalidProblemId,true)});
T("T26 parámetros de ruta inválidos regresan a defaults",()=>{const state=leerEnlace("/nada?scope=xx&layer=nula&p=P99",dataset);assert.equal(state.scope,"tercer_sector");assert.equal(state.section,"inicio");assert.equal(state.layer,"todas");assert.equal(state.problemId,null)});
T("T27 búsqueda filtrada conserva P aun en selectedProblem",()=>{const v=construirVista(dataset,{scope:"fundaciones",problemId:"P48",query:"nunca-existe"});assert.equal(v.visibleCases.length,0);assert.equal(v.selectedProblem.problemId,"P48");assert.equal(v.summary.hiddenByExplicitFilter,31)});
T("T28 URLs codifican texto y no interpolan HTML",()=>{const u=construirEnlace({section:"problemas",scope:"fundaciones",query:"<script>alert(1)</script>"},dataset);assert.ok(u.includes("%3Cscript%3E"));assert.ok(!u.includes("<script>"))});
T("T29 ningún número ni texto original fue mutado por el selector",()=>assert.equal(JSON.stringify(dataset),original));
T("T30 claves de contexto preservan source y link",()=>{const p=funds.selectedProblem;assert.ok(p.links.length===1&&p.links[0].sourceId==="F26");assert.equal(p.evidenceLayers.sectorial[0].reference_locations[0].url.includes(".pdf"),true)});
T("T31 convenio F03 y forma jurídica no se extrapolan",()=>{const a=interpretarClaim(dataset.canonical_claims[0],dataset,SCOPE.FOUNDATIONS);assert.equal(a.foundationSpecificRate,null);assert.match(a.warning,/Prohibido/)});
if(process.exitCode)process.exit(process.exitCode);
console.log("PX-R1.3 QA COMPLETADO",passed,"/31. Solo valida contrato, sin QA de navegador ni cotejo individual de 245 PDFs. Versión:",VERSION);
