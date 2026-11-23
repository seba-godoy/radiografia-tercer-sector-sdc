#!/usr/bin/env node
// MF-1 · Integridad verificable contra los insumos originales de GitHub.
// NO verifica externamente el contenido de cada PDF ni convierte enlaces en evidencia científica.
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
const read=p=>JSON.parse(readFileSync(p,"utf8"));
const d=read("analisis/mf1-banco-26-fuentes-v1.json");
const m=read("analisis/mf1-metodos-contrato-HM-v1.json");
const schema=read("schemas/mf1-banco.schema.json");
const l=read("analisis/px-r2-1-linaje-31p-147v-245h-v1.json");
const a=read("analisis/px-r1-2b-attribution-31p-147links-v1.json");
const t=read("analisis/px-r2-2a-taxonomia-31p-7temas-v1.json");
const h=read("preview/h0/h1-data.json");
let pass=0;
const T=(label,fn)=>{fn();pass++;console.log("PASS",String(pass).padStart(3,"0"),label)};
const uniq=arr=>new Set(arr);
const ids=(arr,field)=>arr.map(x=>x[field]);
const eqSet=(a,b)=>assert.deepEqual([...new Set(a)].sort(),[...new Set(b)].sort());
const sameRoot=id=>d.sources.find(s=>s.id===id).root_candidate;
const src=id=>d.sources.find(s=>s.id===id);
const counts=d.manifest.summary;
T("dataset MF1 versionado",()=>assert.equal(d.manifest.id,"MF-1-20261118-v1"));
T("26 fichas",()=>assert.equal(d.sources.length,26));
T("25 raíces documentales candidatas",()=>assert.equal(d.roots.length,25));
T("147 relaciones",()=>assert.equal(d.problem_source_links.length,147));
T("245 hallazgos",()=>assert.equal(d.findings.length,245));
T("31 problemas vinculados",()=>assert.equal(uniq(ids(d.problem_source_links,"P")).size,31));
T("5 reutilizaciones trazadas",()=>assert.equal(d.problem_source_links.reduce((n,r)=>n+r.explicit_reuses.length,0),5));
T("5 riesgos de dependencia conservados",()=>assert.equal(d.dependency_risks.length,5));
T("IDs de fuentes únicos",()=>assert.equal(uniq(ids(d.sources,"id")).size,26));
T("IDs de raíces únicos",()=>assert.equal(uniq(ids(d.roots,"id")).size,25));
T("IDs de relaciones únicos",()=>assert.equal(uniq(ids(d.problem_source_links,"id")).size,147));
T("IDs de hallazgos únicos",()=>assert.equal(uniq(ids(d.findings,"id")).size,245));
T("fuentes iguales al linaje R2.1",()=>eqSet(ids(d.sources,"id"),l.sources.map(s=>s.source_id)));
T("relaciones idénticas a R1.2b",()=>eqSet(ids(d.problem_source_links,"id"),a.links.map(x=>x.link_id)));
T("hallazgos idénticos a R1.2b",()=>eqSet(ids(d.findings,"id"),a.findings.map(x=>x.finding_id)));
T("31 problemas idénticos al contrato H1",()=>eqSet(ids(d.problem_source_links,"P"),h.problems.map(p=>p.id)));
T("7 temas idénticos al catálogo",()=>eqSet(ids(d.problem_source_links,"T"),t.themes.map(x=>x.topic_id)));
T("raíces idénticas a R2.1",()=>eqSet(ids(d.roots,"id"),l.sources.map(s=>s.root_candidate)));
T("sólo F11/F12 comparten raíz explícita",()=>assert.deepEqual(d.roots.filter(x=>x.source_ids.length>1).map(x=>x.source_ids.slice().sort()),[["F11","F12"]]));
T("F11 F12 misma raíz",()=>assert.equal(sameRoot("F11"),sameRoot("F12")));
T("F03 F04 distintas olas de encuesta",()=>assert.notEqual(sameRoot("F03"),sameRoot("F04")));
T("ninguna raíz certificada como estudio independiente",()=>assert.ok(d.roots.every(x=>x.certified_independent===false)));
T("ninguna fuente marca estudio estadístico independiente",()=>assert.ok(d.sources.every(x=>x.origin_is_independent_study===false)));
T("ninguna fuente declara tasa verificada exclusiva fundaciones",()=>assert.ok(d.sources.every(x=>x.statistical_rate_fundaciones_verified===null)));
T("todos los hallazgos conservan estado no recotejado en MF1",()=>assert.ok(d.findings.every(x=>x.reverified_pdf_in_mf1===false)));
T("todos los hallazgos tienen localizador",()=>assert.ok(d.findings.every(x=>x.locators.length>0&&x.locators.every(q=>q.url?.startsWith("http")))));
T("todos los enlaces fuente http(s)",()=>assert.ok(d.sources.every(x=>/^https?:\/\//.test(x.original_url)&&/^https?:\/\//.test(x.document_url))));
T("todos los vínculos enlazan F y P existentes",()=>assert.ok(d.problem_source_links.every(x=>src(x.F)&&a.problems.some(p=>p.problem_id===x.P))));
T("todos los hallazgos enlazan un vínculo real",()=>assert.ok(d.findings.every(x=>d.problem_source_links.some(r=>r.id===x.link&&r.P===x.P&&r.F===x.F))));
T("todos los vínculos conservan tema principal",()=>assert.ok(d.problem_source_links.every(x=>x.T===t.problems.find(p=>p.problem_id===x.P)?.primary_topic_id)));
T("todos los vínculos niegan equivalencia a incidencia",()=>assert.ok(d.problem_source_links.every(x=>x.status==="vinculo_documental_no_incidente")));
T("ninguna fuente tiene N general imputado",()=>assert.ok(d.sources.every(x=>x.n_universal===null)));
T("Ns documentales tienen unidad",()=>assert.ok(d.sources.every(x=>x.bases_n.every(n=>Number.isInteger(n.n)&&n.n>0&&typeof n.unit==="string"&&n.unit.length>5))));
T("F03 conserva 255 y submuestra 125",()=>assert.ok(src("F03").bases_n.some(x=>x.n===255)&&src("F03").bases_n.some(x=>x.n===125)));
T("F04 conserva N 268 separado",()=>assert.ok(src("F04").bases_n.some(x=>x.n===268)));
T("F10 conserva 245 organizaciones y 344 reportes",()=>assert.ok(src("F10").bases_n.some(x=>x.n===245)&&src("F10").bases_n.some(x=>x.n===344)));
T("F11 F12 conservan un solo IFO y N110 no sumable",()=>assert.ok(src("F11").bases_n.some(x=>x.n===110)&&src("F12").bases_n.some(x=>x.unit.includes("NO sumar"))));
T("F22 82 menciones y 51 OSC diferenciadas",()=>assert.ok(src("F22").bases_n.some(x=>x.n===82&&x.unit.includes("MENCIONES"))&&src("F22").bases_n.some(x=>x.n===51)));
T("F27 conserva caso 2 fundaciones / 3 expedientes",()=>assert.ok(src("F27").bases_n.some(x=>x.n===2)&&src("F27").bases_n.some(x=>x.n===3)));
T("F28 conserva oferta distinta de demanda",()=>assert.ok(src("F28").bases_n.some(x=>x.n===154)&&src("F28").bases_n.some(x=>x.n===49)));
T("F27 fecha dinámica requiere nuevo corte",()=>assert.ok(src("F27").explicit_lineage_note.includes("snapshot")));
T("F12 y F14 presentaciones no localizadas",()=>assert.ok(src("F12").link_audit.landing_status.includes("no_localizada")&&src("F14").link_audit.landing_status.includes("no_localizadas")));
T("F16 timeout se mantiene inconcluso",()=>assert.equal(src("F16").link_audit.landing_status,"no_concluyente_timeout"));
T("F17 403 se mantiene inconcluso",()=>assert.equal(src("F17").link_audit.landing_status,"no_concluyente_403"));
T("F19 F21 cache miss sin inventar enlace roto",()=>assert.ok(["F19","F21"].every(i=>src(i).link_audit.landing_status==="no_concluyente_cache_miss")));
T("estado PDF distinto del estado editorial",()=>assert.ok(d.sources.every(x=>x.link_audit.document_status==="no_verificado_individualmente_mf1")));
T("no marcar F27 como fuente estática verificada",()=>assert.equal(src("F27").link_audit.landing_status,"portal_visible_contenido_dinamico_no_comprobado"));
T("sumas de fuentes y vínculos conservadas",()=>assert.equal(d.sources.reduce((n,x)=>n+x.link_ids.length,0),147));
T("sumas de hallazgos por fuente conservadas",()=>assert.equal(d.sources.reduce((n,x)=>n+x.finding_ids.length,0),245));
for(const s of d.sources){
 T("F "+s.id+" links & findings",()=>{
  eqSet(s.link_ids,d.problem_source_links.filter(r=>r.F===s.id).map(r=>r.id));
  eqSet(s.finding_ids,d.findings.filter(f=>f.F===s.id).map(f=>f.id));
  assert.equal(s.method_role,l.sources.find(x=>x.source_id===s.id).method_role);
 });
}
T("contrato de métodos tiene 5 capas",()=>assert.equal(m.layer_methods.length,5));
T("cobertura aplicada limitada",()=>assert.equal(m.layer_methods[0].status,"aplicada_con_limitaciones"));
T("criticidad y abordabilidad aplicadas; dos futuros rankings pendientes",()=>{assert.equal(m.layer_methods[1].status,"aplicada_documental_provisional");assert.ok(m.layer_methods.slice(3).every(x=>x.status==="pendiente_de_validacion"))});
T("dos índices tienen pesos documentados",()=>{assert.deepEqual(m.layer_methods[1].weights,{I:35,F:25,A:25,U:15});assert.deepEqual(m.layer_methods[2].weights,{K:30,D:25,E:25,A:20});assert.ok(m.layer_methods.filter(x=>!["criticidad","abordabilidad"].includes(x.id)).every(x=>x.weights===null))});
T("dos índices enlazan 31 evaluaciones",()=>{assert.equal(m.layer_methods[1].scores,"analisis/criticidad-31-v03.json");assert.equal(JSON.parse(readFileSync(m.layer_methods[1].scores,"utf8")).rows.length,31);assert.equal(m.layer_methods[2].scores,"analisis/abordabilidad-31-v1.json");assert.equal(JSON.parse(readFileSync(m.layer_methods[2].scores,"utf8")).rows.length,31);assert.ok(m.layer_methods.filter(x=>!["criticidad","abordabilidad"].includes(x.id)).every(x=>x.scores===null))});
T("H-M mantiene cuatro tarjetas",()=>assert.equal(m.navigation_contract.primary_cards,4));
T("H-M ruta /metodos sin cambiar HTML",()=>assert.equal(m.navigation_contract.secondary_page,"/metodos"));
T("MF-1 no declara HTML modificado",()=>assert.ok(!m.navigation_contract.stages.includes("metodos")));
T("esquema contiene seis claves principales",()=>eqSet(schema.required,Object.keys(d)));
function csvParse(text){
 const rows=[];let row=[],field="",quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){if(c==='"'&&text[i+1]==='"'){field+='"';i++;}else if(c==='"')quoted=false;else field+=c;}
  else if(c==='"')quoted=true;
  else if(c===','){row.push(field);field="";}
  else if(c==='\n'){row.push(field.replace(/\r$/,""));rows.push(row);row=[];field="";}
  else field+=c;
 }
 if(field||row.length){row.push(field);rows.push(row)}
 assert.equal(quoted,false,"comillas CSV sin cerrar");
 return rows;
}
for(const [name,n] of [["mf1-fuentes-26-v1.csv",26],["mf1-relaciones-147-v1.csv",147],["mf1-hallazgos-245-v1.csv",245]]){
 T("CSV "+name+" filas RFC4180",()=>{
  const rows=csvParse(readFileSync("analisis/"+name,"utf8"));
  assert.equal(rows.length,n+1);const k=rows[0].length;
  assert.ok(rows.every(r=>r.length===k),"CSV ancho desigual");
 });
}
T("catálogo H1 previo intacto",()=>assert.equal(h.counts.problems,31));
console.log("MF-1 PASS "+pass+"/"+pass+" verificaciones estructurales y adversariales; PDF individual/HTTP externo siguen ND");
