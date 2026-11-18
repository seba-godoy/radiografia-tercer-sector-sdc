/**
 * H-1 · Análisis documental para Juanra / DIMI, sin inferencia de prevalencia.
 * Los conteos de temas representan fichas, vínculos, hallazgos y raíces candidatas,
 * nunca tasas de incidencia ni estudios estadísticamente independientes.
 */
const safeLink=(url,label,esc)=>{
  if(!/^https:\/\/|^http:\/\//i.test(url||""))return "";
  return '<a target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">'+esc(label)+' ↗</a>';
};
const pretty=n=>new Intl.NumberFormat("es-CL").format(n);
const scopeLabel={
  fundaciones_especificas:"Fundaciones descritas",
  fundaciones_subgrupo_identificado:"Subgrupo de fundaciones",
  mixto_fundaciones_otras:"Fundaciones y otras OSC (mixto)",
  osc_generales:"OSC generales / reportes",
  contexto_cualitativo:"Contexto cualitativo o normativo",
  percepcion_ciudadana:"Percepción ciudadana",
  oferta_formativa:"Oferta formativa"
};
export function h1TopicOf(catalog,problemId){
  return catalog?.problems.find(p=>p.id===problemId)?.themeId??null;
}
export function h1RowTag(catalog,problemId,esc){
  const p=catalog?.problems.find(x=>x.id===problemId);
  if(!p)return "";
  const t=catalog.topics.find(x=>x.id===p.themeId);
  return '<span class="tag h1-topic-mini">'+esc(p.themeId)+' · '+esc(t?.short??p.theme)+'</span><span class="tag h1-source-mini">'+pretty(p.sourceCount)+' fichas fuente</span>';
}
export function h1Overview(catalog,scope,active,esc){
  if(!catalog)return '<div class="callout">Los análisis de H-1 no están disponibles.</div>';
  const c=catalog.counts;
  const max=Math.max(...catalog.topics.map(t=>t.problemCount));
  const selected=catalog.topics.find(t=>t.id===active);
  const topCards=catalog.topics.map(t=>{
    const on=active===t.id;
    const denom=t.publicationLinks===1?"vínculo":"vínculos";
    return '<button class="h1-topic-card'+(on?' is-active':'')+'" data-topic="'+esc(t.id)+'" type="button" aria-pressed="'+on+'" aria-label="Filtrar por '+esc(t.name)+'">'+
      '<div class="h1-topic-id"><b>'+esc(t.id)+'</b><span>'+pretty(t.problemCount)+' de 31 problemas</span></div>'+
      '<strong>'+esc(t.name)+'</strong><div class="h1-meter" aria-hidden="true"><span style="width:'+Math.round(t.problemCount/max*100)+'%"></span></div>'+
      '<small>'+pretty(t.publicationLinks)+' '+denom+' P×F · '+pretty(t.findings)+' hallazgos</small></button>';
  }).join("");
  const indicators=catalog.indicators.filter(x=>x.verified);
  const selectedDetails=selected?'<div class="h1-selected" aria-live="polite"><div><span class="h1-eyebrow">Explorando '+esc(selected.id)+'</span><h3>'+esc(selected.name)+'</h3><p>'+esc(selected.description)+'</p></div>'+
    '<div class="h1-selected-numbers"><div><b>'+pretty(selected.publicationDistinct)+'</b><small>Fichas F distintas en el tema</small></div><div><b>'+pretty(selected.rootCandidates)+'</b><small>Raíces documentales candidatas, no estudios independientes</small></div></div>'+
    (selected.singleSourceProblems.length?'<p class="h1-nd">Atención: '+esc(selected.singleSourceProblems.join(", "))+' solo tiene una ficha documental en este catálogo.</p>':'')+'</div>':"";
  const indicatorCards=indicators.map(i=>{
    const n=i.id==="I03"?"125 de 255":i.id==="I04"?"28%":i.id==="I05"?"62% / 42%":i.id==="I06"?"38%":"";
    const title=i.id==="I03"?"Organizaciones con convenios":i.id==="I04"?"Término de proyectos por no renovación":i.id==="I05"?"Rendiciones sin respuesta / revisión >7 meses":"Autonomía financiera hipotética <3 meses";
    const detail=i.id==="I06"?"N=219 respuestas; escenario hipotético sin nuevos ingresos.":"N=125 organizaciones con convenios; fundaciones y corporaciones encuestadas.";
    return '<article class="h1-indicator"><span class="h1-indicator-status">Cotejo de fuente puntual · '+esc(i.id)+'</span><div class="h1-indicator-value">'+esc(n)+'</div><h4>'+esc(title)+'</h4><p>'+esc(detail)+'</p><p class="h1-indicator-limit">'+esc(i.limitation)+'</p>'+safeLink(i.sourceUrl,"Ver lámina del PDF UC",esc)+'</article>';
  }).join("");
  return '<section class="h1-analysis" aria-labelledby="h1-title"><div class="h1-section-title"><div><span class="h1-eyebrow">Investigación · PX-R2 cerrada</span><h2 id="h1-title">Mapa documental de los problemas</h2><p>Un panorama para explorar <strong>dónde se concentran los registros</strong>, sin convertirlos en frecuencia real de dificultades.</p></div><span class="h1-snapshot">Corte: 18 nov 2026</span></div>'+
    '<div class="h1-summary-grid">'+
      '<div><b>'+pretty(c.problems)+'</b><span>Problemas clasificados</span></div><div><b>'+pretty(c.problem_source_links)+'</b><span>Relaciones problema × fuente</span></div><div><b>'+pretty(c.findings)+'</b><span>Hallazgos catalogados</span></div><div><b>'+pretty(c.segments)+'</b><span>Segmentos caracterizados</span></div>'+
    '</div>'+
    '<div class="h1-method-warning"><strong>Cómo leer los números.</strong> Más vínculos o hallazgos significa más documentación en este catálogo, no más incidencia, gravedad ni independencia de investigaciones. '+(scope==="fundaciones"?"En Fundaciones se mantienen las 31 fichas con sus clases de evidencia. Las cifras de poblaciones mixtas nunca pasan a ser tasas exclusivas.":"La vista Tercer sector conserva el universo original de cada fuente.")+'</div>'+
    '<div class="h1-topic-head"><div><h3>Siete temas para orientar la exploración</h3><p>Selecciona un tema para filtrar las fichas. La barra representa <strong>cantidad de problemas</strong>, no porcentaje de organizaciones afectadas.</p></div>'+
    '<button data-topic="todas" aria-pressed="'+(active==="todas")+'" class="h1-all '+(active==="todas"?"is-active":"")+'" type="button">Ver los siete temas</button></div>'+
    '<div class="h1-topic-grid" aria-label="Distribución temática, siete filtros">'+topCards+'</div>'+selectedDetails+
    '<div class="h1-coverage"><div><h3>Segmentación y límites</h3><p>De '+pretty(c.segments)+' segmentos, solo <strong>'+pretty(c.linked_segments)+'</strong> tienen algún cruce catalogado. Los '+pretty(c.segments-c.linked_segments)+' restantes no se consideran sin problemas; simplemente no tienen vínculo asignado.</p></div><div class="h1-relations"><div><b>'+pretty(c.base)+'</b><small>Vínculos base documentales</small></div><div><b>'+pretty(c.candidate)+'</b><small>Segmentos candidatos para investigar</small></div></div></div>'+
    '<div class="h1-indicator-head"><h3>Indicadores de fuente cotejada</h3><p>Cuatro fichas de la UC 2026 verificadas por ítem de un total de 18 indicadores seleccionados. <strong>14 continúan pendientes.</strong> Las cifras de la encuesta corresponden a fundaciones y corporaciones juntas; el muestreo fue intencional y no probabilístico. Los indicadores se seleccionaron como ejemplos pertinentes, no como ranking.</p></div>'+
    '<div class="h1-indicator-grid">'+indicatorCards+'</div>'+
    '<div class="h1-method-warning h1-gate">Próxima capa metodológica: MF-1/H-M construirá el banco completo de 26 fuentes y explicará las reglas de análisis. La criticidad R3 aún no se ha evaluado: <strong>no hay puntajes ni prioridades de gravedad válidos en esta sección.</strong></div></section>';
}
export function h1ProblemProfile(catalog,problemId,esc){
  if(!catalog)return "";
  const p=catalog.problems.find(x=>x.id===problemId);
  if(!p)return "";
  const t=catalog.topics.find(x=>x.id===p.themeId);
  const intersections=catalog.crosses.filter(x=>x.problemId===problemId);
  const segs=new Map(catalog.segments.map(s=>[s.id,s]));
  const grouped={base:intersections.filter(x=>x.kind==="base"),candidate:intersections.filter(x=>x.kind==="candidate")};
  const crossMarkup=intersections.length?['base','candidate'].map(kind=>{
    const arr=grouped[kind];
    if(!arr.length)return "";
    const label=kind==="base"?"Vínculos documentados (no incidencia)":"Candidatos de investigación";
    return '<details class="h1-cross-details"'+(kind==="base"?' open':'')+'><summary>'+esc(label)+' <b>'+arr.length+'</b></summary><div class="h1-cross-list">'+arr.map(x=>{
      const s=segs.get(x.segmentId);
      return '<div class="h1-cross-item"><div><b>'+esc(x.segmentId)+' · '+esc(s?.title??"Segmento")+'</b><small>'+esc(scopeLabel[s?.scope]??x.scope??"Unidad no determinada")+' · Origen '+esc(s?.sourceId??"ND")+' · Cruce '+esc(x.sourceId)+'</small></div><p>'+esc(x.reason??"Relación sin descripción")+'</p>'+safeLink(x.referenceUrl,"Referencia original",esc)+'</div>';
    }).join("")+'</div></details>';
  }).join(""):'<div class="h1-nd"><strong>Sin cruce segmental registrado (ND).</strong> La ausencia de asignación no significa ausencia del problema en ninguna población.</div>';
  const checked=catalog.indicators.filter(i=>i.problemId===problemId&&i.verified);
  const pending=catalog.indicators.filter(i=>i.problemId===problemId&&!i.verified);
  const verifiedHtml=checked.length?'<div class="h1-checked-mini"><strong>Indicadores con cotejo puntual</strong>'+checked.map(i=>'<p>'+esc(i.title)+' · '+safeLink(i.sourceUrl,"PDF original",esc)+'</p>').join("")+'</div>':"";
  return '<section class="h1-drawer-profile" aria-label="Contexto temático y segmental"><div class="h1-drawer-topic"><span>'+esc(p.themeId)+' · '+esc(t?.name??p.theme)+'</span>'+(p.secondaryTopicId?' <small>También relacionado con '+esc(p.secondaryTopicId)+'</small>':'')+'</div>'+
    '<div class="h1-drawer-counters"><span><b>'+p.sourceCount+'</b> fichas fuente</span><span><b>'+p.findings+'</b> hallazgos</span><span><b>'+intersections.length+'</b> cruces segmentales</span></div>'+
    '<p class="h1-drawer-caveat">Es cobertura documental, no una medición de cuántas organizaciones tienen este problema. Los cruces candidatos son hipótesis para investigar.</p>'+verifiedHtml+
    (pending.length?'<p class="h1-nd">'+pending.length+' indicador(es) relacionado(s) aún pendiente(s) de cotejo individual de PDF.</p>':'')+
    '<h3>¿A qué segmentos se ha vinculado?</h3>'+crossMarkup+'</section>';
}
