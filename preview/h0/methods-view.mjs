/**
 * H-M · Banco de fuentes y metodología documental
 * Datos MF-1 canónicos; no confundir fuentes, menciones o vínculos con prevalencia.
 * Sin acceso a datos privados. Carga y navegación gestionadas por preview/h0/app.mjs.
 */
const statusMap={
 landing_visible:{label:"Ficha editorial accesible",group:"accesible"},
 pdf_visible:{label:"PDF visible; pasajes sin recotejo MF-1",group:"accesible"},
 landing_visible_presentacion_separada_no_localizada:{label:"Presentación íntegra no localizada",group:"parcial"},
 landing_visible_laminas_separadas_no_localizadas:{label:"Láminas íntegras no localizadas",group:"parcial"},
 no_concluyente_timeout:{label:"Comprobación inconclusa: tiempo de espera",group:"inconcluso"},
 no_concluyente_403:{label:"Comprobación inconclusa: acceso 403",group:"inconcluso"},
 no_concluyente_cache_miss:{label:"Comprobación inconclusa: caché",group:"inconcluso"},
 portal_visible_contenido_dinamico_no_comprobado:{label:"Portal vivo; datos no recotejados",group:"dinamico"}
};
const populations={
 fundaciones:{label:"Fundaciones (origen descrito)",ids:["F02","F16","F23"]},
 mixta:{label:"Fundaciones y corporaciones (mixto)",ids:["F03","F04","F28"]},
 osc:{label:"OSC y OSFL generales",ids:["F01","F07","F09","F10","F11","F12","F22"]},
 personas:{label:"Personas / percepción ciudadana",ids:["F05","F13"]},
 sectorial:{label:"Servicio, programa o portal",ids:["F14","F26","F27"]},
 contexto:{label:"Guías, normas y contexto",ids:["F06","F08","F15","F17","F18","F19","F20","F21"]}
};
const families={
 encuesta:{label:"Encuestas y autodiagnósticos",patterns:/survey|diagnostic|self_report/},
 registros:{label:"Registros y reportabilidad",patterns:/administrative|registry|reporting_aggregate|portal/},
 estudios:{label:"Informes y estudios",patterns:/study|academic|research|analysis|finance/},
 guias:{label:"Guías y manuales",patterns:/guide|handbook|practices|normative|policy/},
 presentaciones:{label:"Presentaciones y divulgación",patterns:/presentation|program|public_opinion/}
};
const pKeys=["q","anio","familia","poblacion","estado","tema","fuente","volver"];
export const mfStatusMap=statusMap;
export function mfPopulation(source){
 for(const [id,group] of Object.entries(populations))if(group.ids.includes(source.id))return id;
 return "contexto";
}
export function mfFamily(source){
 const val=(source.method_type||"")+" "+(source.method_role||"");
 for(const [id,group] of Object.entries(families))if(group.patterns.test(val))return id;
 return "estudios";
}
export function mfStatus(source){return statusMap[source?.link_audit?.landing_status]??{label:"Estado no determinado",group:"inconcluso"};}
function validReturn(raw){
 if(typeof raw!=="string"||raw.length>900||!raw.startsWith("/")||raw.startsWith("//"))return "";
 try{
  const parsed=new URL(raw,"https://sdc.local");
  if(parsed.origin!=="https://sdc.local")return "";
  if(!["/","/problemas","/criticidad","/abordabilidad","/oportunidades","/metodos"].includes(parsed.pathname))return "";
  return parsed.pathname+parsed.search;
 }catch{return "";}
}
export function mfDefaults(){
 return {q:"",anio:"",familia:"",poblacion:"",estado:"",tema:"",fuente:"",volver:""};
}
export function mfParse(urlString){
 let url;try{url=new URL(urlString,"https://sdc.local");}catch{return mfDefaults();}
 const z=mfDefaults(),p=url.searchParams;
 z.q=(p.get("s")||"").slice(0,110);
 z.anio=/^(19|20)\d{2}$/.test(p.get("anio")||"")?p.get("anio"):"";
 z.familia=families[p.get("tipo")]?p.get("tipo"):"";
 z.poblacion=populations[p.get("poblacion")]?p.get("poblacion"):"";
 z.estado=["accesible","parcial","inconcluso","dinamico"].includes(p.get("estado"))?p.get("estado"):"";
 z.tema=/^T0[1-7]$/.test(p.get("tema")||"")?p.get("tema"):"";
 z.fuente=/^F\d{2}$/.test(p.get("fuente")||"")?p.get("fuente"):"";
 z.volver=validReturn(p.get("volver")||"");
 return z;
}
export function mfUrl(filters=mfDefaults(),scope="tercer_sector"){
 const q=new URLSearchParams();
 q.set("scope",scope==="fundaciones"?"fundaciones":"tercer_sector");
 if(filters.q)q.set("s",filters.q.slice(0,110));
 if(filters.anio)q.set("anio",filters.anio);
 if(filters.familia)q.set("tipo",filters.familia);
 if(filters.poblacion)q.set("poblacion",filters.poblacion);
 if(filters.estado)q.set("estado",filters.estado);
 if(filters.tema)q.set("tema",filters.tema);
 if(filters.fuente)q.set("fuente",filters.fuente);
 const ret=validReturn(filters.volver);
 if(ret)q.set("volver",ret);
 return "/metodos?"+q.toString();
}
function textSearch(s){return String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();}
export function mfVisible(catalog,filters={}){
 if(!catalog?.sources)return [];
 const q=textSearch(filters.q);
 return catalog.sources.filter(s=>{
  if(filters.anio&&String(s.publication_year)!==filters.anio)return false;
  if(filters.familia&&mfFamily(s)!==filters.familia)return false;
  if(filters.poblacion&&mfPopulation(s)!==filters.poblacion)return false;
  if(filters.estado&&mfStatus(s).group!==filters.estado)return false;
  if(filters.tema&&!s.topic_ids.includes(filters.tema))return false;
  if(q&&!textSearch([s.id,s.title,s.authors,s.method_role,s.population_scope,...s.problem_ids,...s.topic_ids].join(" ")).includes(q))return false;
  return true;
 }).slice().sort((a,b)=>a.id.localeCompare(b.id,"es",{numeric:true}));
}
const csvFields=[
 ["id","ID F"],["title","Fuente"],["authors","Autoria e institucion"],["publication_year","Anio publicado"],["territory","Territorio"],
 ["population_scope","Poblacion original"],["method_role","Metodo"],["root_candidate","Raiz candidata"],["original_url","URL ficha"],
 ["document_url","URL documento"],["link_status","Estado de enlace"],["problems","Problemas P"],["topics","Temas T"],["findings_count","Hallazgos"],
 ["limitation","Limitacion"]
];
export function mfCsv(rows){
 const enc=v=>{
  let str=String(v??"");
  // Evita ejecución de fórmulas si CSV se abre en Excel/Sheets.
  if(/^[\u0000-\u0020]*[=+\-@]/.test(str)||/^[\t\r]/.test(str))str="'"+str;
  return '"'+str.replace(/"/g,'""')+'"';
 };
 const header=csvFields.map(x=>enc(x[1])).join(",");
 const lines=rows.map(x=>{
  const fields={...x,link_status:mfStatus(x).label,problems:x.problem_ids.join(" | "),topics:x.topic_ids.join(" | "),findings_count:x.finding_ids.length};
  return csvFields.map(([key])=>enc(fields[key])).join(",");
 });
 return "\uFEFF"+[header,...lines].join("\r\n")+"\r\n";
}
const urlSafe=u=>typeof u==="string"&&/^https?:\/\/[^/\s?#]+/i.test(u);
const extLink=(url,label,esc)=>{
 if(!urlSafe(url))return '<span class="mf-nd">Enlace no disponible (ND)</span>';
 return '<a href="'+esc(url)+'" rel="noopener noreferrer" target="_blank">'+esc(label)+' ↗</a>';
};
const option=(id,label,value,esc)=>'<option value="'+esc(id)+'"'+(id===value?' selected':'')+'>'+esc(label)+'</option>';
const select=(key,title,items,value,esc)=>
 '<label class="mf-filter"><span>'+esc(title)+'</span><select data-mf-filter="'+esc(key)+'" aria-label="'+esc(title)+'">'+option("","Todos",value,esc)+items.map(([id,name])=>option(id,name,value,esc)).join("")+'</select></label>';
const fmtN=x=>new Intl.NumberFormat("es-CL").format(x);
const statLabels={
 fundaciones:"Fundaciones en la fuente",mixta:"Muestra mixta",osc:"OSC / OSFL",personas:"Personas",sectorial:"Sector/portal",contexto:"Contexto o guía"
};
function methodsSummary(model,esc){
 return '<section class="mf-method-section" id="mf-metodos" aria-labelledby="mf-method-heading"><div class="mf-section-intro"><div><span class="mf-overline">Transparencia metodológica</span><h2 id="mf-method-heading">Cómo se construye esta radiografía</h2><p>El análisis conecta problemas, fuentes, hallazgos y segmentos. <strong>No transforma cantidad de documentos en frecuencia ni gravedad.</strong> Los métodos futuros aparecen como pendientes hasta que existan decisiones y evidencia auditada.</p></div></div>'+
 '<div class="mf-method-grid">'+model.layer_methods.map((z,i)=>{
  const ranked=z.status==="aplicada_documental_provisional";
  const active=z.status==="aplicada_con_limitaciones" || ranked;
  const state=ranked?(z.id==="abordabilidad"?"Aplicada · provisional v1.0":"Aplicada · provisional v0.3"):active?"Aplicada, con límites":"Pendiente de validación";
  return '<article class="mf-method-card" id="metodo-'+esc(z.id)+'"><div class="mf-method-top"><span>'+String(i+1).padStart(2,"0")+'</span><span class="mf-method-status'+(active?' active':'')+'">'+esc(state)+'</span></div><h3>'+esc(z.title)+'</h3><p>'+esc(z.purpose)+'</p>'+
   '<dl><div><dt>Unidad</dt><dd>'+esc(z.unit??"Por definir")+'</dd></div><div><dt>Etapas</dt><dd>'+esc((z.phases||[]).join(" · "))+'</dd></div><div><dt>Pesos / ranking</dt><dd>'+esc(ranked?(z.id==="abordabilidad"?"K30 / D25 / E25 / A20 · factor C/5":"I35 / F25 / A25 / U15 · niveles 1–5"):active?"No existen puntajes de gravedad":"Sin fórmula ni pesos aprobados")+'</dd></div></dl>'+
   (ranked?'<p class="mf-small">'+esc(z.formula)+'. <a href="'+(z.id==="abordabilidad"?"/abordabilidad":"/criticidad#ranking-31")+'">Ver los 31 puntajes, rúbrica, citas y sensibilidad</a></p>':active?'<p class="mf-small">'+esc(z.count_rule||"")+" "+esc(z.overlap_rule||"")+'</p>':'<p class="mf-small">Este bloque se completará al auditar su fase. No se publican cálculos simulados como reales.</p>')+
   '</article>';
 }).join("")+'</div>'+
 '<div class="mf-caution"><strong>Criterios de lectura.</strong> Una fuente F es una publicación/portal, una raíz es un origen documental candidato, P×F es un vínculo de catálogo y un hallazgo es un pasaje con referencia. ND significa no determinado, no cero. N solo vale para su pregunta y subgrupo; la opción Fundaciones no convierte encuestas mixtas en tasas exclusivas.</div>'+
 '</section>';
}
function sourceDetail(catalog,source,esc,problemHref){
 const links=catalog.problem_source_links.filter(l=>l.F===source.id);
 const findings=catalog.findings.filter(f=>f.F===source.id);
 const status=mfStatus(source);
 const pop=populations[mfPopulation(source)]?.label||"Contexto";
 const N=source.bases_n.length?source.bases_n.map(x=>'<li>'+fmtN(x.n)+' '+esc(x.unit)+'</li>').join(""):'<li>ND · Sin N general aplicable o verificado</li>';
 const note=source.root_shared_with.length?'<p class="mf-strong-note">Misma raíz documental que '+esc(source.root_shared_with.join(", "))+'. No son estudios independientes adicionales.</p>':"";
 const sourceNote=source.explicit_lineage_note?'<p class="mf-strong-note">'+esc(source.explicit_lineage_note)+'</p>':"";
 return '<section class="mf-source-detail" id="mf-detalle" aria-labelledby="mf-detail-title" tabindex="-1">'+
  '<div class="mf-source-detail-head"><div><span class="mf-overline">Ficha documental · '+esc(source.id)+'</span><h3 id="mf-detail-title">'+esc(source.title)+'</h3><p>'+esc(source.authors||"Autoría no identificada")+'</p></div><button type="button" data-mf-close aria-label="Cerrar detalle de fuente" class="mf-small-btn">Cerrar ficha ×</button></div>'+
  '<div class="mf-detail-tags"><span>'+esc(pop)+'</span><span>'+esc(source.publication_year??"Portal vivo")+'</span><span>'+esc(status.label)+'</span></div>'+
  '<div class="mf-detail-grid"><div><h4>Población y unidades</h4><p>'+esc(source.population_scope.replace(/_/g," "))+'</p><ul>'+N+'</ul><p class="mf-small">Las bases N no se suman; algunas son menciones, expedientes o participantes. No equivalen a prevalencia nacional.</p></div>'+
  '<div><h4>Tipo, método y origen</h4><p>'+esc(source.method_type.replace(/_/g," "))+'</p><p>'+esc(source.method_role.replace(/_/g," "))+'</p><p>Raíz candidata: <code>'+esc(source.root_candidate)+'</code></p>'+note+'</div>'+
  '<div><h4>Documentos</h4><p>'+extLink(source.original_url,"Abrir publicación original",esc)+'</p><p>'+extLink(source.document_url,source.document_link_kind==="direct_pdf"?"Abrir PDF/enlace documental":"Abrir recurso o portal",esc)+'</p><p class="mf-small">Estado: '+esc(source.link_audit.document_status.replace(/_/g," "))+' · Comprobación de landing: 18/11/2026. El enlace visible no certifica el cotejo de cada página.</p></div></div>'+
  sourceNote+
  '<div class="mf-detail-limitation"><strong>Limitación de la fuente:</strong> '+esc(source.limitation||"Requiere revisión metodológica")+'</div>'+
  '<div class="mf-evidence-head"><h4>Problemas relacionados <span>('+links.length+')</span></h4><p>Cada vínculo indica soporte documental, no gravedad ni incidencia.</p></div>'+
  '<div class="mf-problem-pills">'+[...new Set(links.map(l=>l.P))].sort().map(id=>'<a class="mf-problem-link" href="'+esc(problemHref(id))+'" data-mf-problem="'+esc(id)+'">'+esc(id)+' · Ver problema ↗</a>').join("")+'</div>'+
  '<details class="mf-findings-block"><summary>Hallazgos y localizadores de '+esc(source.id)+' <b>'+findings.length+'</b></summary><div class="mf-findings">'+findings.map(f=>{
    const href=problemHref(f.P);
    return '<article class="mf-finding"><div class="mf-finding-meta"><span>'+esc(f.id)+'</span><a href="'+esc(href)+'" data-mf-problem="'+esc(f.P)+'">'+esc(f.P)+' · Problema</a></div><p>'+esc(f.claim_text)+'</p><small>Clase de población: '+esc(f.population_evidence_class)+' · Cotejo PDF individual de MF-1: pendiente</small><div class="mf-finding-links">'+(f.locators.length?f.locators.map(loc=>extLink(loc.url,loc.label||"Ver localizador",esc)).join(""):'<span>Localizador ND</span>')+'</div></article>';
   }).join("")+'</div></details>'+
 '</section>';
}
export function mfSourceShortcut(sourceId,scope,esc,returnPath=""){
 const q=mfDefaults();q.fuente=sourceId;q.volver=returnPath;
 return '<a href="'+esc(mfUrl(q,scope))+'" data-mf-go-source="'+esc(sourceId)+'" class="mf-shortcut">Ficha de fuente '+esc(sourceId)+' y método ↗</a>';
}
export function mfRender(catalog,model,filters,scope,esc,problemHref){
 if(!catalog||!model)return '<div class="interior wrap"><h1>El banco no está disponible</h1><p>Los métodos requieren que carguen los datos canónicos MF-1.</p></div>';
 const visible=mfVisible(catalog,filters);
 const selected=catalog.sources.find(x=>x.id===filters.fuente);
 const years=[...new Set(catalog.sources.map(x=>x.publication_year).filter(Number.isInteger))].sort((a,b)=>b-a).map(x=>[String(x),String(x)]);
 const topics=[...new Set(catalog.problem_source_links.map(x=>x.T))].sort().map(x=>[x,x]);
 const namedSource=selected?sourceDetail(catalog,selected,esc,problemHref):"";
 const topReturn=filters.volver?'<a href="'+esc(filters.volver)+'" data-mf-return class="mf-return">← Volver a la ficha anterior</a>':"";
 const groupNotice=scope==="fundaciones"?'<strong>Enfoque Fundaciones:</strong> se muestra el catálogo completo, sin ocultar fuentes de OSC o contexto. La pertenencia jurídica y el universo original permanecen visibles.':'<strong>Enfoque Tercer sector:</strong> se respetan los universos originales y no se extrapolan porcentajes a la población nacional.';
 return '<nav class="mf-secondary-nav" aria-label="Métodos y fuentes"><div class="wrap"><a href="#mf-metodos">Cómo se investigó</a><a href="#mf-banco">Banco de fuentes</a><a href="#mf-glosario">Glosario</a></div></nav>'+
 '<div class="interior wrap mf-page"><div class="mf-page-top"><div><span class="mf-overline">Investigación DIMI · Trazabilidad</span><h1>Métodos y fuentes</h1><p>La procedencia, los criterios y las limitaciones detrás de cada cifra. Explora el banco documental y comprueba qué análisis están validados y cuáles siguen en investigación.</p></div><div class="mf-side-meta"><strong>MF-1 · 18 NOV 2026</strong><span>Versión del banco 1.0.0</span>'+topReturn+'</div></div>'+
 '<div class="mf-kpi-grid"><div><strong>26</strong><span>Fichas documentales</span></div><div><strong>25</strong><span>Raíces candidatas</span></div><div><strong>147</strong><span>Vínculos P×F</span></div><div><strong>245</strong><span>Hallazgos localizados</span></div></div>'+
 '<div class="mf-scope-note">'+groupNotice+' <span>26 publicaciones no son 26 estudios independientes. F11 y F12 comparten el estudio IFO 2025.</span></div>'+
 methodsSummary(model,esc)+
 '<section id="mf-banco" class="mf-bank" aria-labelledby="mf-bank-title"><div class="mf-section-intro"><div><span class="mf-overline">Repositorio de evidencias</span><h2 id="mf-bank-title">Banco de fuentes</h2><p>Busca entre las 26 fichas F. Filtra por método, año, población de origen, tema o estado del enlace. Los filtros no inventan muestras ni descartan fuentes contextuales en Fundaciones.</p></div><button class="mf-export" type="button" data-mf-export aria-label="Descargar CSV de las fuentes visibles">Exportar CSV <span>↓</span></button></div>'+
 '<div class="mf-toolbar"><label class="mf-search"><span>Buscar ID, fuente, autor o problema</span><input id="mf-search" type="search" placeholder="Ej.: F03, financiamiento, P20…" value="'+esc(filters.q)+'" autocomplete="off"></label>'+
 select("anio","Año",years,filters.anio,esc)+
 select("familia","Familia documental",Object.entries(families).map(([id,x])=>[id,x.label]),filters.familia,esc)+
 select("poblacion","Población original",Object.entries(populations).map(([id,x])=>[id,x.label]),filters.poblacion,esc)+
 select("estado","Estado del enlace",[["accesible","Landing / PDF visible"],["parcial","Documento no localizado"],["inconcluso","Comprobación inconclusa"],["dinamico","Portal dinámico"]],filters.estado,esc)+
 select("tema","Tema",topics,filters.tema,esc)+'</div>'+
 '<div class="mf-result-row"><span id="mf-results" aria-live="polite">'+visible.length+' de '+catalog.sources.length+' fuentes visibles</span><button class="mf-reset" type="button" data-mf-reset>Limpiar filtros</button></div>'+
 (visible.length?'<div class="mf-sources">'+visible.map(s=>{
   const p=mfPopulation(s),st=mfStatus(s),on=filters.fuente===s.id;
   return '<article class="mf-source-row'+(on?' selected':'')+'"><div class="mf-source-identity"><span class="mf-source-id">'+esc(s.id)+'</span><div><h3>'+esc(s.title)+'</h3><p>'+esc(s.authors||"Autoría ND")+'</p><div class="mf-row-badges"><span>'+esc(s.publication_year??"Vivo")+'</span><span>'+esc(statLabels[p])+'</span><span>'+esc(st.label)+'</span></div></div></div><div class="mf-source-end"><span>'+s.problem_ids.length+' problemas · '+s.finding_ids.length+' hallazgos</span><a href="'+esc(mfUrl({...filters,fuente:s.id},scope))+'" data-mf-source="'+esc(s.id)+'"'+(on?' aria-current="true"':'')+' class="mf-open">Ver ficha ↗</a></div></article>';
 }).join("")+'</div>':'<div class="mf-no-results"><h3>Sin coincidencias</h3><p>No hay fuentes que cumplan los filtros. No significa que el tema carezca de evidencia; restablece la búsqueda para ver el banco completo.</p></div>')+
 namedSource+'</section>'+
 '<section id="mf-glosario" class="mf-glossary"><div class="mf-section-intro"><div><span class="mf-overline">Convenciones y advertencias</span><h2>Glosario de interpretación</h2><p>La unidad de análisis es parte del resultado. ND no es cero y las menciones no son organizaciones.</p></div></div><div class="mf-glossary-grid">'+model.glossary.map(g=>'<div><strong>'+esc(g.term)+'</strong><p>'+esc(g.meaning)+'</p></div>').join("")+'</div>'+
 '<details class="mf-warnings"><summary>Solapamientos y casos adversariales <b>'+model.warnings.length+'</b></summary><ul>'+model.warnings.map(w=>'<li><strong>'+esc(w.id)+':</strong> '+esc(w.text)+'</li>').join("")+'</ul></details>'+
 '<div class="mf-bottom-note"><strong>Fuente de datos y reproducibilidad.</strong> Catálogo MF-1 versión 1.0.0, documentado y probado en GitHub. Las 245 afirmaciones mantienen localizadores históricos, pero no fueron recotejadas una por una en MF-1. La criticidad v0.3 ya aplica una rúbrica documental provisional a los 31 problemas. La abordabilidad v1.0 evalúa 31 intervenciones con condiciones explícitas. Impacto IA y negocio siguen pendientes; ningún puntaje representa una medición nacional validada. <a href="https://github.com/seba-godoy/radiografia-tercer-sector-sdc/pull/18" rel="noopener noreferrer" target="_blank">Ver trazabilidad del banco ↗</a></div></section></div>';
}
