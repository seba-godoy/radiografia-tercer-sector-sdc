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
  return '<span class="tag h1-topic-mini">'+esc(t?.short??p.theme)+'</span><span class="tag h1-source-mini">'+pretty(p.sourceCount)+(p.sourceCount===1?' fuente documental':' fuentes documentales')+'</span>';
}
export function h1Overview(catalog,scope,active,esc,methodsUrl){
  if(!catalog)return '<div class="callout">El mapa documental no está disponible.</div>';
  const c=catalog.counts;
  const max=Math.max(...catalog.topics.map(t=>t.problemCount));
  const selected=catalog.topics.find(t=>t.id===active);
  const topCards=catalog.topics.map(t=>{
    const on=active===t.id;
    const denom=t.publicationLinks===1?"vínculo":"vínculos";
    return '<button class="h1-topic-card'+(on?' is-active':'')+'" data-topic="'+esc(t.id)+'" type="button" aria-pressed="'+on+'" aria-label="'+(on?'Quitar filtro de ':'Filtrar por ')+esc(t.name)+'">'+
      '<div class="h1-topic-id"><span>'+pretty(t.problemCount)+' de 31 problemas</span></div>'+
      '<strong>'+esc(t.name)+'</strong><div class="h1-meter" aria-hidden="true"><span style="width:'+Math.round(t.problemCount/max*100)+'%"></span></div>'+
      '<small>'+pretty(t.publicationLinks)+' '+denom+' con fuentes · '+pretty(t.findings)+' hallazgos</small></button>';
  }).join("");
  const indicators=catalog.indicators.filter(x=>x.verified);
  const selectedDetails=selected?'<div class="h1-selected" aria-live="polite"><div><h3>'+esc(selected.name)+'</h3><p>'+esc(selected.description)+'</p></div>'+
    '<div class="h1-selected-numbers"><div><b>'+pretty(selected.publicationDistinct)+'</b><small>Fuentes documentales distintas</small></div><div><b>'+pretty(selected.rootCandidates)+'</b><small>Posibles fuentes de origen tras agrupar publicaciones relacionadas</small></div></div>'+
    (selected.singleSourceProblems.length?'<p class="h1-nd">Atención: '+esc(selected.singleSourceProblems.map(id=>catalog.problems.find(p=>p.id===id)?.title).join(' · '))+' <span>(una sola fuente documental por ficha)</span></p>':'')+'</div>':"";
  const values={
    I03:["125 de 255","Organizaciones encuestadas con convenios","Identifica el grupo al que se hicieron las preguntas sobre convenios estatales."],
    I04:["28%","Término de proyectos por falta de renovación","De las 125 encuestadas con convenios. Muestra una consecuencia reportada para proyectos de atención permanente."],
    I05:["62% y 42%","Demoras en la revisión de rendiciones","Entre las 125 encuestadas con convenios, 62% reportó rendiciones sin respuesta en plazo y 42% revisiones superiores a siete meses. Las respuestas pueden coincidir."],
    I06:["38%","Menos de tres meses de autonomía estimada","Entre las 219 respuestas a esa pregunta, en un escenario hipotético sin nuevos ingresos. Mide una estimación declarada."]
  };
  const indicatorCards=indicators.map(i=>{
    const [value,title,detail]=values[i.id];
    return '<article class="h1-indicator" data-indicator="'+esc(i.id)+'"><div class="h1-indicator-value">'+esc(value)+'</div><h4>'+esc(title)+'</h4><p>'+esc(detail)+'</p>'+safeLink(i.sourceUrl,"Ver lámina de la encuesta UC",esc)+'</article>';
  }).join("");
  const metrics=[
    [c.problems,"Problemas","Dificultades distintas que tienen una ficha en el catálogo."],
    [c.problem_source_links,"Vínculos con fuentes","Cada vínculo conecta un problema con un documento. Un documento puede respaldar varios problemas."],
    [c.findings,"Hallazgos","Observaciones, cifras o testimonios extraídos de documentos. Un vínculo puede reunir varios hallazgos."],
    [c.segments,"Segmentos","Grupos descritos en las fuentes, por ejemplo organizaciones con convenios o fundaciones sostenedoras."]
  ];
  return '<section class="h1-analysis" aria-labelledby="h1-title"><div class="h1-section-title"><div><h2 id="h1-title">Mapa documental de los problemas</h2><p>Recorre los temas y conoce qué evidencia reúne el catálogo.</p></div><span class="h1-snapshot">Corte al 18 nov 2026</span></div>'+
    '<div class="h1-summary-grid">'+metrics.map(([n,title,desc])=>'<div><b>'+pretty(n)+'</b><span>'+title+'</span><p>'+desc+'</p></div>').join("")+'</div>'+
    '<div class="h1-method-warning">Estos conteos describen cuánto se ha documentado. La incidencia y la gravedad se evalúan por separado.'+(scope==="fundaciones"?" El mapa abarca todo el catálogo. Las fichas distinguen qué hallazgos provienen de muestras mixtas o de grupos de fundaciones.":"")+'</div>'+
    '<div class="h1-topic-head"><div><h3>Siete temas para orientar la exploración</h3><p>Selecciona un tema para filtrar las fichas. Vuelve a pulsarlo para quitar el filtro. Las barras comparan la cantidad de problemas por tema.</p></div>'+
    '<button data-topic="todas" aria-pressed="'+(active==="todas")+'" class="h1-all '+(active==="todas"?"is-active":"")+'" type="button">Ver los siete temas</button></div>'+
    '<div class="h1-topic-grid" aria-label="Distribución temática, siete filtros">'+topCards+'</div>'+selectedDetails+
    '<div class="h1-coverage"><div><h3>Segmentación y límites</h3><p>De los <strong>'+pretty(c.segments)+' segmentos</strong> del catálogo, <strong>'+pretty(c.linked_segments)+'</strong> están vinculados a uno o más problemas. Los otros <strong>'+pretty(c.segments-c.linked_segments)+'</strong> están descritos en las fuentes y aún no tienen un problema asociado aquí.</p><p>Los '+pretty(c.linked_segments)+' segmentos vinculados reúnen <strong>'+pretty(c.crosses)+' relaciones con problemas</strong>. Un mismo segmento puede aparecer en varias relaciones.</p></div><div class="h1-relations">'+
    '<div><b>'+pretty(c.base)+'</b><small><strong>Vínculos documentados</strong><br>Una fuente relaciona al grupo con el problema o con una condición relevante para entenderlo.</small></div>'+
    '<div><b>'+pretty(c.candidate)+'</b><small><strong>Candidatos de investigación</strong><br>Hay una razón para estudiar el problema en ese grupo. La relación queda por comprobar.</small></div></div></div>'+
    '<details class="h1-indicator-details"><summary>Cómo verificamos las cifras · Ejemplo de la encuesta UC 2026</summary><div class="h1-indicator-head"><p>Este ejemplo muestra cómo verificamos cada cifra antes de usarla: buscamos la pregunta y la página originales, comprobamos cuántas organizaciones respondieron y a qué grupo pertenecían. Por ejemplo, las preguntas sobre convenios se hicieron a 125 de las 255 organizaciones encuestadas.</p><p>Partimos por la encuesta UC 2026 porque reúne varias preguntas sobre sostenibilidad financiera, continuidad de proyectos y rendición de convenios. Fue la primera fuente cotejada cifra por cifra. De las '+pretty(c.indicators)+' cifras seleccionadas de distintas fuentes, '+pretty(c.indicators_rechecked)+' se cotejaron en este documento y '+pretty(c.indicators-c.indicators_rechecked)+' siguen pendientes de esa revisión puntual.</p><p>El estudio usa una muestra intencional y publica resultados conjuntos de fundaciones y corporaciones. Las fichas reúnen evidencia de otras publicaciones que ayudan a entender cada problema.</p></div>'+
    '<div class="h1-indicator-grid">'+indicatorCards+'</div></details>'+
    '<p class="h1-method-link"><a href="'+esc(methodsUrl)+'" data-go="metodos">Consultar métodos y fuentes ↗</a></p></section>';
}

const segmentScope={
  fundaciones_especificas:{order:0,reading:"La fuente identifica fundaciones o sus programas en este grupo. El respaldo corresponde al grupo descrito."},
  fundaciones_subgrupo_identificado:{order:0,reading:"La fuente identifica un subgrupo de fundaciones. El vínculo se refiere a ese subgrupo."},
  mixto_fundaciones_otras:{order:1,reading:"El grupo reúne fundaciones y otras organizaciones. Hace falta un desglose para atribuirles un resultado propio."}
};
const otherSegment={order:2,reading:"Sirve para localizar grupos o procesos similares que convendría estudiar en fundaciones."};
export function h1ProblemIntroduction(catalog,problemId,profile,esc){
  const p=catalog.problems.find(x=>x.id===problemId);
  const secondary=catalog.topics.find(x=>x.id===p.secondaryTopicId);
  const rows=[
    ["Tema",p.theme+(secondary?" · También relacionado con "+secondary.name:"")],
    ["Ámbito · A quién o a qué proceso se refiere",profile.audience],
    ["Qué trabajo dificulta",profile.impact],
    ["Qué muestra la evidencia",profile.evidence],
    ["Alcance · Hasta dónde aplica la evidencia",profile.limit]
  ];
  return '<section class="h1-problem-introduction" aria-labelledby="problem-explanation"><h3 id="problem-explanation">¿En qué consiste el problema?</h3>'+
    '<p>'+esc(profile.summary)+'</p><dl>'+rows.map(([label,value])=>'<div><dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd></div>').join("")+'</dl></section>';
}
export function h1ProblemProfile(catalog,problemId,scope,esc){
  const p=catalog?.problems.find(x=>x.id===problemId);
  if(!p)return "";
  const focus=scope==="fundaciones";
  const intersections=catalog.crosses.filter(x=>x.problemId===problemId);
  const segments=new Map(catalog.segments.map(s=>[s.id,s]));
  const segmentReading=x=>segmentScope[x.scope]??otherSegment;
  const groups=[
    {kind:"base",title:"Vínculos documentados",description:"Una fuente relaciona este grupo con el problema o con una condición relevante para entenderlo."},
    {kind:"candidate",title:"Candidatos de investigación",description:"Grupos en los que la evidencia da una pista para investigar. El vínculo con el problema aún se debe comprobar."}
  ];
  const crossMarkup=intersections.length?groups.map(({kind,title,description})=>{
    const rows=intersections.filter(x=>x.kind===kind);
    if(!rows.length)return "";
    if(focus)rows.sort((a,b)=>segmentReading(a).order-segmentReading(b).order);
    return '<details class="h1-cross-details"'+(kind==="base"?' open':'')+'><summary>'+title+' <b>'+rows.length+'</b></summary><div class="h1-cross-list"><p class="hint">'+description+'</p>'+rows.map(x=>{
      const s=segments.get(x.segmentId);
      return '<div class="h1-cross-item"><div><b>'+esc(s?.title??"Segmento")+'</b><small>'+esc(scopeLabel[x.scope]??"Población por aclarar")+'</small></div><p>'+esc(x.reason??"Relación sin descripción")+'</p>'+
        (focus?'<p class="h1-segment-reading">'+esc(segmentReading(x).reading)+'</p>':'')+safeLink(x.referenceUrl,"Referencia original",esc)+'</div>';
    }).join("")+'</div></details>';
  }).join(""):'<div class="h1-nd"><strong>Sin cruce segmental registrado (ND).</strong> Aún no se ha registrado qué grupos específicos se relacionan con este problema.</div>';
  return '<section class="h1-drawer-profile" aria-label="Segmentos vinculados">'+
    '<div class="h1-drawer-counters"><span><b>'+p.sourceCount+'</b> fuentes documentales</span><span><b>'+p.findings+'</b> hallazgos</span><span><b>'+intersections.length+'</b> relaciones con segmentos</span></div>'+
    '<p class="h1-drawer-caveat">Conteos de la ficha completa. Describen su respaldo documental.</p>'+
    '<h3>'+(focus?"¿Qué grupos ayudan a entender el problema en fundaciones?":"¿A qué segmentos se ha vinculado?")+'</h3>'+
    (focus?'<p class="hint">En cada lista aparecen primero los grupos que se refieren explícitamente a fundaciones, luego los grupos mixtos y al final las referencias de contexto.</p>':'')+crossMarkup+'</section>';
}
