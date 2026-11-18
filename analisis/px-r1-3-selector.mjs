/**
 * PX-R1.3 · Contrato funcional puro para selector de universo, v1.0.0.
 * Diseñado para Node.js y frontend sin efectos laterales ni acceso a red.
 * No define un ranking ni atribuye estadísticas a fundaciones.
 * Fuente: PX-R1.2b (31 P / 147 links / 245 hallazgos).
 */
export const SCOPE = Object.freeze({ SECTOR: "tercer_sector", FOUNDATIONS: "fundaciones" });
export const SECTIONS = Object.freeze(["inicio", "problemas", "criticidad", "abordabilidad", "oportunidades"]);
export const EVIDENCE_LAYER = Object.freeze({
  F_EXCLUSIVA_EXPLICITA: "directa",
  M_MIXTA_NO_DESAGREGADA: "compartida",
  G_OSFL_GENERAL: "general",
  S_SECTORIAL_SIN_FORMA: "sectorial",
  I_INFERIDA_POR_VALIDAR: "contextual",
  U_INSUFICIENTE: "pendiente",
  X_NO_FUNDACION_EXPLICITA: "no_fundacion"
});
export const LAYERS = Object.freeze(["todas", "directa", "compartida", "general", "sectorial", "contextual", "pendiente", "no_fundacion"]);
export const ROUTES = Object.freeze({
  inicio: "/",
  problemas: "/problemas",
  criticidad: "/criticidad",
  abordabilidad: "/abordabilidad",
  oportunidades: "/oportunidades"
});
export const EXPLANATIONS = Object.freeze({
  directa: "Evidencia que menciona explícitamente a fundaciones. Puede ser cualitativa y no representativa.",
  compartida: "Fundaciones y otros tipos jurídicos en una muestra conjunta; sus porcentajes NO son exclusivos de fundaciones.",
  general: "Información general sobre OSC/OSFL; no demuestra el indicador exclusivamente en fundaciones.",
  sectorial: "Caso de programas o colaboradores sectoriales sin forma jurídica acreditada.",
  contextual: "Literatura, opinión ciudadana, oferta de formación u otra transferencia conceptual por validar.",
  pendiente: "No existe suficiente información para clasificar esta afirmación.",
  no_fundacion: "Caso expresamente atribuido a un tipo jurídico distinto de fundación."
});
const problemIdPattern=/^P[0-9]{2}$/;
const acceptedRouteMap=Object.fromEntries(Object.entries(ROUTES).map(([k,v])=>[v,k]));
export const VERSION="PX-R1.3-SELECTOR-v1.0.0";

function requirement(ok,message){if(!ok)throw new Error("PX-R1.3: "+message);}
function own(obj,key){return Object.prototype.hasOwnProperty.call(obj,key);}

export function validateDataset(data) {
  requirement(data&&Array.isArray(data.problems)&&Array.isArray(data.links)&&Array.isArray(data.findings)&&Array.isArray(data.canonical_claims),"estructura de datos incompleta");
  const p=new Set(data.problems.map(x=>x.problem_id)), l=new Set(data.links.map(x=>x.link_id)), f=new Set(data.findings.map(x=>x.finding_id));
  requirement(p.size===data.problems.length && l.size===data.links.length && f.size===data.findings.length,"IDs duplicados");
  requirement(data.problems.every(x=>problemIdPattern.test(x.problem_id)),"ID de problema inválido");
  requirement(data.links.every(x=>p.has(x.problem_id)&&x.source_id&&Array.isArray(x.finding_ids)&&x.finding_ids.every(id=>f.has(id))),"relaciones huérfanas");
  requirement(data.findings.every(x=>p.has(x.problem_id)&&l.has(x.link_id)&&own(EVIDENCE_LAYER,x.population_evidence_class) && Array.isArray(x.reference_locations)&&x.reference_locations.length>0),"hallazgos inválidos");
  requirement(data.problems.every(x=>x.statistical_prevalence_fundaciones===null && x.statistical_severity_rank===null),"se detectaron métricas agregadas no autorizadas");
  return {problems:data.problems.length,links:data.links.length,findings:data.findings.length,claims:data.canonical_claims.length};
}
export function normalizarEstado(input={},data=null) {
  const scope=Object.values(SCOPE).includes(input.scope)?input.scope:SCOPE.SECTOR;
  const section=SECTIONS.includes(input.section)?input.section:"inicio";
  const layer=LAYERS.includes(input.layer)?input.layer:"todas";
  const validProblemId=typeof input.problemId==="string"&&problemIdPattern.test(input.problemId) && (!data||data.problems.some(p=>p.problem_id===input.problemId));
  const problemId=validProblemId?input.problemId:null;
  const query=typeof input.query==="string"?input.query.slice(0,100).trim():"";
  const showContext=input.showContext!==false;
  return {scope,section,layer,problemId,query,showContext,invalidProblemId:!!input.problemId&&!validProblemId};
}
export function construirEnlace(state={},data=null) {
  const s=normalizarEstado(state,data);
  const q=new URLSearchParams();
  q.set("scope",s.scope);
  if(s.layer!=="todas")q.set("layer",s.layer);
  if(s.problemId)q.set("p",s.problemId);
  if(s.query)q.set("q",s.query);
  if(!s.showContext)q.set("context","off");
  const str=q.toString();
  return ROUTES[s.section]+(str?"?"+str:"");
}
export function leerEnlace(href,data=null) {
  let url;
  try{url=new URL(href,"https://sdc.local");}catch{return normalizarEstado({},data);}
  const section=acceptedRouteMap[url.pathname]??"inicio";
  const x=url.searchParams;
  return normalizarEstado({section,scope:x.get("scope"),layer:x.get("layer"),problemId:x.get("p"),query:x.get("q"),showContext:x.get("context")!=="off"},data);
}
export function cambiarSeccion(state,section,data=null) {
  return normalizarEstado({...state,section},data);
}
export function cambiarUniverso(state,scope,data=null) {
  // Nunca descarta el P seleccionado, incluso si pasa a la franja contextual.
  return normalizarEstado({...state,scope},data);
}
function bucket(f){
  return EVIDENCE_LAYER[f.population_evidence_class];
}
function tramoFundaciones(buckets){
  if(buckets.directa.length)return "directa";
  if(buckets.compartida.length)return "compartida";
  return "contexto";
}
function comentarioScope(layer,scope){
  if(scope===SCOPE.SECTOR)return "Dato referido a la población original de la fuente, no al total estadístico del tercer sector.";
  return EXPLANATIONS[layer];
}
export function interpretarClaim(claim,data,scope=SCOPE.SECTOR) {
  requirement(data&&Array.isArray(data.findings),"dataset requerido");
  const matching=data.findings.filter(f=>f.finding_id&&Array.isArray(claim.problem_ids)&&claim.problem_ids.includes(f.problem_id)&&f.source_id===claim.source_id);
  const classes=[...new Set(matching.map(f=>bucket(f)))];
  // El array de claims procede del catálogo original; no se reescribe el valor.
  const publishedFoundationRate=(scope===SCOPE.FOUNDATIONS&&claim.scope_foundations_specific_rate===null)?null:claim.scope_foundations_specific_rate??null;
  return {
    id:claim.id,originalText:claim.text,
    sourceId:claim.source_id,problemIds:[...(claim.problem_ids??[])],
    percent:claim.percent??null,denominator:claim.denominator??null,
    population:claim.population??null,period:claim.period??null,
    locator:claim.locator??null,url:claim.url??null,limitations:claim.limitations??null,
    foundationSpecificRate:publishedFoundationRate,
    class:claim.foundation_population_class??null,
    dataClasses:classes,
    label:scope===SCOPE.FOUNDATIONS
      ? "Dato original, no prevalencia de fundaciones; población: "+(claim.population||"sin detalle")
      : "Dato de la población estudiada: "+(claim.population||"sin detalle"),
    warning:claim.foundation_population_class==="M_MIXTA_NO_DESAGREGADA"
      ? "Muestra mixta sin desagregación. Prohibido presentarla como tasa exclusiva de fundaciones."
      : claim.foundation_population_class==="S_SECTORIAL_SIN_FORMA"
        ? "Evidencia sectorial sin naturaleza jurídica acreditada."
        : "Los resultados no se extrapolan a la población nacional."
  };
}
export function construirVista(data,state={}) {
  const count=validateDataset(data);
  const s=normalizarEstado(state,data);
  const indexByProblem=new Map(data.problems.map(p=>[p.problem_id,{problem:p,findings:[],links:[]}]));
  for(const f of data.findings){indexByProblem.get(f.problem_id).findings.push(f);}
  for(const l of data.links){indexByProblem.get(l.problem_id).links.push(l);}
  const allCases=[];
  for(const [id,row] of indexByProblem){
    const layers=Object.fromEntries(LAYERS.slice(1).map(layer=>[layer,[]]));
    for(const finding of row.findings){layers[bucket(finding)].push(finding);}
    const band=s.scope===SCOPE.FOUNDATIONS?tramoFundaciones(layers):"sector";
    const activeFindings=s.layer==="todas"?row.findings:layers[s.layer];
    const originTypes=[...new Set(row.links.map(l=>l.source_root_candidate))];
    const hasSegmentLink=!(data.manifest?.counts?.missing_segment_cross_problems??[]).includes(id);
    const item={
      problemId:id,title:row.problem.title,band,
      allFindingCount:row.findings.length,activeFindingCount:activeFindings.length,
      allSourceLinkCount:row.links.length,sourceRootsCandidateCount:originTypes.length,
      sourceRootsAreIndependentStudies:false,
      evidenceLayers:layers,
      displayedFindings:activeFindings,
      evidenceCounts:Object.fromEntries(Object.entries(layers).map(([name,entries])=>[name,entries.length])),
      segmentCrossStatus:hasSegmentLink?"cruce_parcial_no_censo":"ND_sin_cruce_no_significa_ausencia",
      foundationPrevalence:null,foundationRank:null,
      warning:s.scope===SCOPE.FOUNDATIONS
       ? band==="directa"?"Caso o afirmación explícita sobre fundaciones; no inferir prevalencia."
         : band==="compartida"?"Muestra mixta: no hay resultado exclusivo de fundaciones."
         : "Caso de contexto sin medición exclusiva de fundaciones. Conservar para investigación."
       : "Universo analítico OSC: evidencia documental no es frecuencia del problema.",
      links:row.links.map(l=>({linkId:l.link_id,sourceId:l.source_id,rootCandidate:l.source_root_candidate,sourceUrl:l.source_url}))
    };
    allCases.push(item);
  }
  const selected=allCases.find(p=>p.problemId===s.problemId)??null;
  const search=s.query.toLocaleLowerCase("es-CL");
  const matches=allCases.filter(p=>{
    const passQuery=!search||p.problemId.toLocaleLowerCase().includes(search)||p.title.toLocaleLowerCase("es-CL").includes(search);
    const passLayer=s.layer==="todas"||p.activeFindingCount>0;
    return passQuery&&passLayer;
  });
  const visible=s.scope===SCOPE.FOUNDATIONS&&!s.showContext?matches.filter(p=>p.band!=="contexto"):matches;
  const additionalContext=s.scope===SCOPE.FOUNDATIONS?matches.filter(p=>p.band==="contexto"):[];
  const sizes={sector:allCases.length,direct:allCases.filter(p=>p.evidenceCounts.directa>0).length,
    shared_without_direct:allCases.filter(p=>p.evidenceCounts.directa===0&&p.evidenceCounts.compartida>0).length,
    only_context:allCases.filter(p=>p.evidenceCounts.directa===0&&p.evidenceCounts.compartida===0).length};
  const bands=s.scope===SCOPE.FOUNDATIONS?
    ["directa","compartida","contexto"].map(b=>({name:b,items:visible.filter(p=>p.band===b)})):
    [{name:"sector",items:visible}];
  return {
    state:s,contractVersion:VERSION,sourceCounts:count,
    summary:{...sizes,visible:visible.length,hiddenByExplicitFilter:allCases.length-visible.length,
      contextualButNotDiscarded:additionalContext.length,referenceCount:data.findings.length,
      statsNotNational:true,rankingNotCalculated:true},
    bands,visibleCases:visible,allCases,additionalContext,selectedProblem:selected,
    claims:data.canonical_claims.map(c=>interpretarClaim(c,data,s.scope)),
    sourceDataUnchanged:true,
    uiNotice:s.scope===SCOPE.FOUNDATIONS
      ? "Fundaciones: se distinguen evidencias directas, muestras mixtas y contexto. No hay tasas representativas exclusivas; las fichas contextuales permanecen accesibles."
      : "Tercer sector: catálogo de problemas documentados, no censo ni prevalencia nacional."
  };
}
