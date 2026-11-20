import {h2Render} from "/preview/h0/h2-view.mjs";
import {problemProfiles,sectorRelationOverrides} from "/preview/h0/problem-profiles.mjs";
import {findingNotes,foundationFindingNotes} from "/preview/h0/problem-reading.mjs";
import {mfDefaults,mfParse,mfUrl,mfVisible,mfCsv,mfRender,mfSourceShortcut} from "/preview/h0/methods-view.mjs";
import {h1Overview,h1RowTag,h1ProblemProfile,h1ProblemIntroduction,h1TopicOf} from "/preview/h0/h1-view.mjs";
import {
  construirVista,leerEnlace,construirEnlace,cambiarSeccion,cambiarUniverso,
  normalizarEstado,SECTIONS,EVIDENCE_LAYER
} from "/analisis/px-r1-3-selector.mjs";

const sections=[
{id:"problemas",n:"01",name:"Problemas detectados",sub:"Qué dolores encontramos",desc:"Explora las fichas y sus respaldos sin confundir cobertura documental con frecuencia.",status:"Explorar evidencia",symbol:"↗"},
{id:"criticidad",n:"02",name:"Criticidad",sub:"Qué sabemos sobre la gravedad",desc:"Compara evidencias de impacto, recurrencia, alcance y urgencia.",status:"Comparar evidencia",symbol:"↗"},
{id:"abordabilidad",n:"03",name:"Abordabilidad",sub:"Qué podemos resolver",desc:"Conectar los problemas con causas, tareas y capacidad real de intervención.",status:"Análisis en desarrollo",symbol:"↗"},
{id:"oportunidades",n:"04",name:"Oportunidades con IA",sub:"Qué soluciones vale la pena probar",desc:"Explorar alternativas tecnológicas, impacto potencial y viabilidad comercial.",status:"Análisis en desarrollo",symbol:"↗"}];
const classes=[
{id:"todas",title:"Toda la evidencia",desc:"Incluye hallazgos de todas las poblaciones y tipos de fuente."},
{id:"directa",title:"Fundaciones explícitas",desc:"La afirmación se refiere a fundaciones de forma explícita. Puede describir un grupo, un testimonio o el modo en que se hizo un estudio."},
{id:"compartida",title:"Muestra mixta",desc:"La fuente publica un resultado conjunto de fundaciones y otras organizaciones, sin un dato separado para fundaciones."},
{id:"general",title:"Organizaciones sociales en general",desc:"Evidencia sobre organizaciones de la sociedad civil o sin fines de lucro, sin un resultado específico para fundaciones."},
{id:"sectorial",title:"Casos de programas",desc:"Episodios de programas o entidades ejecutoras cuya forma jurídica no queda establecida para ese resultado."},
{id:"contextual",title:"Contexto o referencias externas",desc:"Guías, estudios externos, opinión pública u otras referencias que ayudan a interpretar o investigar el problema."},
{id:"pendiente",title:"Población por aclarar",desc:"El registro disponible no permite precisar a qué población se refiere la afirmación."},
{id:"no_fundacion",title:"Otras formas jurídicas",desc:"El hallazgo se atribuye de manera explícita a otro tipo de organización."}];
const classById=new Map(classes.map(x=>[x.id,x]));
const foundationReading={
 directa:"Describe a las fundaciones incluidas en la fuente. El alcance depende del grupo y del tipo de evidencia.",
 compartida:"El resultado incluye fundaciones junto a otras organizaciones. Falta el desglose para saber qué ocurre específicamente en fundaciones.",
 general:"Sirve de referencia para revisar el mismo mecanismo en fundaciones. La fuente no ofrece un resultado separado para ellas.",
 sectorial:"Es una pista para fundaciones que ejecutan programas similares. Hay que confirmar la forma jurídica y las condiciones de cada caso.",
 contextual:"Ayuda a formular una pregunta para fundaciones. Su aplicación requiere evidencia propia sobre sus equipos o programas.",
 pendiente:"Hace falta aclarar quiénes están incluidos antes de usar el hallazgo para describir a las fundaciones.",
 no_fundacion:"Describe a otra forma jurídica. Sirve para comparar procesos antes de investigar si ocurre algo parecido en fundaciones."
};
const bandInfo={
 directa:{label:"Fundaciones explícitas",desc:"La ficha contiene al menos un hallazgo que habla específicamente de fundaciones. Puede describir un grupo o un caso, con el alcance que indica su fuente."},
 compartida:{label:"Muestra mixta",desc:"La ficha contiene resultados que reúnen fundaciones y otras organizaciones, sin un resultado propio de fundaciones."},
 contexto:{label:"Contexto complementario",desc:"La ficha orienta qué investigar a partir de estudios generales, casos de programas o guías. Falta respaldo que identifique a fundaciones."}
};
const foundationOrder=["directa","compartida","contexto"];
const relationLevels=[
 {value:1,label:"Respaldo directo"},
 {value:0.5,label:"Indicio indirecto"},
 {value:0,label:"Contexto"}
];
const isFoundation=()=>state.scope==="fundaciones";
let data=null,state=null,drawerOrigin=null,loading=false,h1Data=null,topicFilter="todas",drawerLayer=null;
let methodsData=null,methodsContract=null,methodsFilters=mfDefaults(),linksById;
let h2Contract=null,h2Evidence=null;
const isMethods=()=>location.pathname==="/metodos";
const root=document.getElementById("content"),scopeSelect=document.getElementById("scope-top");
const esc=v=>String(v??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
const setBusy=v=>root.setAttribute("aria-busy",v?"true":"false");
const fnum=n=>Number(n).toLocaleString("es-CL");

function methodsHref(){
 if(isMethods())return mfUrl(methodsFilters,state?.scope);
 const from=state&&data?construirEnlace(state,data):"";
 return mfUrl({...mfDefaults(),volver:from},state?.scope);
}
function linkTo(section){
  return construirEnlace({...state,section,problemId:null},data);
}
function primaryNav(){
  return '<nav class="subnav" aria-label="Etapas de la radiografía"><div class="wrap subnav-inner"><a href="/" data-go="inicio">⌂ Inicio</a>'+
    sections.map(s=>'<a href="'+esc(linkTo(s.id))+'" data-go="'+s.id+'"'+(!isMethods()&&state.section===s.id?' aria-current="page"':'')+'>'+s.n+' · '+esc(s.name)+'</a>').join("")+'<a class="subnav-methods" href="'+esc(methodsHref())+'" data-go="metodos"'+(isMethods()?' aria-current="page"':'')+'>◈ Métodos y fuentes</a></div></nav>';
}
function hero(){
  return '<div class="home-hero"><div class="wrap hero-head"><div class="eyebrow">Investigación · Tercer sector de Chile</div><h1 class="hero-title">De los problemas a <span>las oportunidades con IA.</span></h1>'+
    '<p class="hero-lead">Una ruta para comprender los desafíos de las organizaciones sociales, comparar prioridades y descubrir dónde tendría sentido intervenir.</p>'+
    '<div class="hero-footer"><span class="pill">◉ '+(state.scope==="fundaciones"?"Enfoque: fundaciones":"Enfoque: tercer sector")+'</span><span class="hero-step">Explora libremente las cuatro etapas</span></div></div></div>';
}
function cards(){
  return '<section class="home-sections wrap" aria-labelledby="choose"><div class="section-head"><div><div class="eyebrow">Ruta de exploración</div><h2 id="choose">¿Qué quieres investigar?</h2></div><p>Cuatro perspectivas que se conectan entre sí. Puedes recorrerlas en orden o abrir la que necesites.</p></div>'+
  '<div class="four-grid">'+sections.map(s=>'<a class="stage-card" href="'+esc(linkTo(s.id))+'" data-go="'+s.id+'"><div class="stage-top"><span class="stage-number">'+s.n+' / 04</span><span class="stage-status">'+esc(s.status)+'</span></div><div><h3>'+esc(s.name)+'</h3><p class="stage-copy">'+esc(s.desc)+'</p></div><span class="stage-link">Entrar a la sección <span class="arrow" aria-hidden="true">↗</span></span></a>').join("")+'</div>'+
    '<div class="method-strip"><div class="method-icon">i</div><div><strong>Una lectura transparente de la evidencia</strong><p>'+fnum(31)+' problemas documentados, '+fnum(26)+' fichas de fuentes y '+fnum(245)+' hallazgos vinculados. Son registros de investigación, no prevalencia nacional. La vista Fundaciones distingue evidencia directa, mixta y contextual.</p></div><a href="'+esc(methodsHref())+'" data-go="metodos">Ver métodos y fuentes</a></div></section>';
}
function evidenceBands(view){
  if(state.scope!=="fundaciones")return "";
  const vals=[["directa",view.summary.direct],["compartida",view.summary.shared_without_direct],["contexto",view.summary.only_context]];
  return '<div class="scope-bands" aria-label="Alcance de evidencia sobre fundaciones">'+vals.map(([k,n])=>'<div class="band-card '+k+'"><b>'+fnum(n)+'</b><strong>'+bandInfo[k].label+'</strong><small>'+bandInfo[k].desc+'</small></div>').join("")+'</div>';
}
function evidenceGuide(){
 return '<details class="h1-filter-guide"><summary>Qué significa cada clase de evidencia</summary><dl>'+
  classes.slice(1).map(x=>'<div><dt>'+esc(x.title)+'</dt><dd>'+esc(x.desc)+'</dd></div>').join("")+'</dl></details>';
}
function tools(){
 return '<p class="h1-filter-hint" id="list-filter-instruction">Busca por nombre o elige una clase de evidencia para filtrar las fichas de abajo.</p><div class="tools-panel"><label class="search-wrap"><span class="sr-only">Buscar por nombre del problema</span><input id="problem-search" type="search" placeholder="Buscar por nombre del problema…" value="'+esc(state.query)+'" autocomplete="off"></label>'+
  '<label class="layer-label" for="layer-select">Evidencia</label><select id="layer-select" aria-label="Filtrar por clase de evidencia" aria-describedby="list-layer-description">'+classes.map(x=>'<option value="'+x.id+'"'+(state.layer===x.id?' selected':'')+'>'+esc(x.title)+'</option>').join("")+'</select>'+
  (isFoundation()?'<label class="switch"><input id="show-context" type="checkbox" '+(state.showContext?'checked':'')+'><span>Incluir fichas con solo contexto</span></label>':"")+'</div>'+
  '<p class="h1-filter-hint" id="list-layer-description">El filtro muestra fichas con al menos un hallazgo de la clase seleccionada. '+esc(classById.get(state.layer).desc)+'</p>'+evidenceGuide();
}
function problemCard(p){
 const focus=isFoundation();
 const band=focus?'<span class="tag '+p.band+'">'+esc(bandInfo[p.band].label)+'</span>':"";
 const n=state.layer!=="todas"?p.activeFindingCount:focus&&p.band!=="contexto"?p.evidenceCounts[p.band]:p.allFindingCount;
 const detail=state.layer!=="todas"?" con el filtro":focus?(p.band==="directa"?" sobre fundaciones":p.band==="compartida"?" de muestra mixta":" de contexto"):"";
 return '<button class="pain-row" type="button" data-problem="'+esc(p.problemId)+'" aria-label="Abrir '+esc(p.title)+'" aria-describedby="summary-'+esc(p.problemId)+'"><span class="row-content"><h3>'+esc(p.title)+'</h3><span class="h1-card-description" id="summary-'+esc(p.problemId)+'">'+esc(problemProfiles[p.problemId].summary)+'</span><span class="row-meta">'+band+'<span class="tag">'+n+(n===1?" hallazgo":" hallazgos")+esc(detail)+'</span>'+h1RowTag(h1Data,p.problemId,esc)+'</span></span><span class="row-more" aria-hidden="true">↗</span></button>';
}
function problems(view){
 const focus=isFoundation();
 const activeTopic=h1Data.topics.find(t=>t.id===topicFilter);
 const visible=view.visibleCases.filter(p=>!activeTopic||h1TopicOf(h1Data,p.problemId)===activeTopic.id);
 visible.sort((a,b)=>(focus?foundationOrder.indexOf(a.band)-foundationOrder.indexOf(b.band):0)||a.title.localeCompare(b.title,"es-CL"));
 const resultCount=visible.length;
 const problemList=items=>'<div class="pain-list">'+items.map(problemCard).join("")+'</div>';
 const results=focus?foundationOrder.map(band=>{
  const items=visible.filter(p=>p.band===band);
  return items.length?'<section class="h1-problem-group"><h3>'+esc(bandInfo[band].label)+' <span>· '+items.length+'</span></h3>'+problemList(items)+'</section>':"";
 }).join(""):problemList(visible);
 const intro=focus?"El mapa resume el catálogo completo de 31 problemas. Al explorar las fichas, esta vista pone primero la evidencia sobre fundaciones, luego los resultados de muestras mixtas y al final las pistas de contexto. Dentro de cada ficha se explica qué aporta cada fuente y qué se puede decir sobre fundaciones a partir de sus hallazgos.":"Esta vista recorre los 31 problemas del catálogo. Cada hallazgo conserva la población de la fuente que lo documenta.";
 return primaryNav()+'<div class="interior wrap"><div class="page-top"><div><div class="stage-label">01 / Problemas detectados</div><h1>Explora los problemas documentados.</h1><p class="page-intro">Las fichas de los problemas están más abajo, en <a class="h1-results-link" href="#fichas-problemas">Explorar fichas de problemas</a>. Selecciona un tema en el mapa o usa los filtros de búsqueda y evidencia para cambiar qué fichas aparecen en el listado.</p></div><a href="/" data-go="inicio" class="outline-btn">← Volver a portada</a></div>'+
  '<div class="callout"><div><strong>'+ (focus?"Qué cambia en Fundaciones":"Cómo leer la vista Tercer sector")+'</strong><p>'+esc(intro)+'</p></div></div>'+evidenceBands(view)+h1Overview(h1Data,state.scope,topicFilter,esc,methodsHref())+
  '<div class="h1-results-title"><h2 id="fichas-problemas">Explorar fichas de problemas</h2><p>'+(focus?"Las fichas se agrupan por el respaldo más específico disponible sobre fundaciones y se ordenan alfabéticamente dentro de cada grupo.":"Las fichas se ordenan alfabéticamente por título.")+' El orden facilita la búsqueda. Consulta la evidencia de criticidad en la siguiente sección.</p></div>'+tools()+
  '<div class="result-meta"><span id="result-count" aria-live="polite">'+fnum(resultCount)+' de '+h1Data.counts.problems+' problemas visibles'+(activeTopic?' · '+esc(activeTopic.name):"")+'</span></div>'+
  (resultCount?results:'<div class="empty"><h3>No hay coincidencias con estos filtros.</h3><button type="button" class="small-btn" data-reset>Restablecer filtros</button></div>')+
  '<div class="forward"><div><small>Próxima etapa de análisis</small><strong>02 · Criticidad</strong></div><a href="'+esc(linkTo("criticidad"))+'" data-go="criticidad">Continuar →</a></div></div>';
}
const pendingCopy={
 abordabilidad:{number:"03",title:"¿Qué problemas podemos abordar?",lead:"La intervención se analizará a nivel de tareas concretas, distinguiendo las causas estructurales y las condiciones de factibilidad.",points:["Problema → causa → tarea concreta","Capacidad de intervención, riesgos y datos","Alternativas con IA y sin IA"],next:"oportunidades",nextLabel:"04 · Oportunidades con IA"},
 oportunidades:{number:"04",title:"¿Qué oportunidades con IA valen la pena?",lead:"Partiremos de tareas abordables para comparar beneficios potenciales, alternativas convencionales y posteriormente la viabilidad comercial.",points:["Hipótesis de solución vinculadas a problemas","Impacto potencial y baseline sin IA","Potencial de herramienta pagada: investigación pendiente"],next:"problemas",nextLabel:"01 · Problemas detectados"}
};
function pending(){
 const s=pendingCopy[state.section];
 return primaryNav()+'<div class="interior wrap"><div class="page-top"><div><div class="stage-label">'+s.number+' / '+esc(sections.find(x=>x.id===state.section)?.name)+'</div><h1>'+esc(s.title)+'</h1><p class="page-intro">'+esc(s.lead)+'</p></div><a class="outline-btn" href="/" data-go="inicio">← Volver a portada</a></div>'+
 '<div class="waiting-panel"><div><div class="icon-big" aria-hidden="true">◇</div><div class="eyebrow">Siguiente capa de análisis</div><h2>Análisis pendiente de validación.</h2><p>La navegación y el selector de universo ya están preparados. Esta sección incorporará resultados cuando terminemos su investigación y comprobación metodológica.</p><div class="callout">No mostramos rankings, puntajes, ahorros ni oportunidades como resultados definitivos mientras falte evidencia suficiente.</div></div>'+
 '<div class="waiting-list"><h3>Qué encontrarás en esta sección</h3><ul>'+s.points.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><p class="stage-copy">Universo seleccionado: <strong>'+(state.scope==="fundaciones"?"Fundaciones":"Tercer sector")+'</strong>. Se conservará al navegar entre las cuatro etapas.</p></div></div>'+
 '<div class="forward"><div><small>Seguir explorando</small><strong>'+esc(s.nextLabel)+'</strong></div><a href="'+esc(linkTo(s.next))+'" data-go="'+s.next+'">Ir a la sección →</a></div></div>';
}
function drawer(view){
 const p=view.selectedProblem;
 if(!p||state.section!=="problemas")return "";
 const focus=isFoundation();
 const selectedLayer=drawerLayer??state.layer;
 const all=selectedLayer==="todas"?Object.values(p.evidenceLayers).flat():p.evidenceLayers[selectedLayer];
 const findingsBySource=new Map();
 for(const finding of all){
  if(!findingsBySource.has(finding.source_id))findingsBySource.set(finding.source_id,[]);
  findingsBySource.get(finding.source_id).push(finding);
 }
 const sourceGroups=[...findingsBySource].sort(([a],[b])=>a.localeCompare(b)).map(([id,findings])=>{
  const link=linksById.get(findings[0].link_id);
  const baseRelation=link.original_relation_marker;
  return {id,title:link.source_title,findings,relation:focus?baseRelation:(sectorRelationOverrides[link.link_id]??baseRelation)};
 });
 const renderItem=f=>{
  const layer=EVIDENCE_LAYER[f.population_evidence_class];
  const links=(f.reference_locations??[]).filter(x=>/^https?:\/\//.test(x.url)).slice(0,2);
  return '<article class="evidence-item" data-finding="'+esc(f.finding_id)+'"><strong>'+esc(classById.get(layer).title)+'</strong><p>'+esc(f.finding_text)+'</p>'+
   '<p class="h1-finding-reading"><b>Qué aporta al problema</b> '+esc(findingNotes[f.finding_id])+'</p>'+
   (focus?'<p class="h1-finding-scope"><b>Lectura para fundaciones</b> '+esc(foundationFindingNotes[f.finding_id]??foundationReading[layer])+'</p>':"")+
   '<div>'+links.map(r=>'<a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">Ver fuente: '+esc(r.label)+' ↗</a>').join("")+'</div></article>';
 };
 const results=relationLevels.map(({value,label})=>{
  const sources=sourceGroups.filter(source=>source.relation===value);
  if(!sources.length)return "";
  return '<section class="h1-findings-group" data-relation="'+value+'"><h4>'+esc(label)+'</h4>'+sources.map(source=>
   '<section class="h1-source-group" data-source="'+esc(source.id)+'"><div class="h1-source-heading"><h5>'+esc(source.title)+'</h5><span class="h1-relation-tag" data-relation="'+value+'">'+esc(label)+'</span></div>'+
   source.findings.map(renderItem).join("")+mfSourceShortcut(source.id,state.scope,esc,construirEnlace(state,data))+'</section>'
  ).join("")+'</section>';
 }).join("");
 const focusIntro=focus?'<div class="drawer-summary h1-foundation-reading"><strong>'+esc(bandInfo[p.band].label)+'</strong><p>'+esc(bandInfo[p.band].desc)+' En esta ficha hay '+p.evidenceCounts.directa+' hallazgos específicos de fundaciones y '+p.evidenceCounts.compartida+' de muestras mixtas.</p></div>':"";
 return '<dialog class="drawer" aria-labelledby="drawer-title"><button class="drawer-close" type="button" data-close aria-label="Cerrar ficha" autofocus>×</button><div class="stage-label">'+(focus?"Perspectiva de fundaciones":"Ficha documental")+'</div><h2 id="drawer-title">'+esc(p.title)+'</h2>'+h1ProblemIntroduction(h1Data,p.problemId,problemProfiles[p.problemId],esc)+focusIntro+
  h1ProblemProfile(h1Data,p.problemId,state.scope,esc)+'<h3 id="finding-heading">Hallazgos por fuente</h3><p class="hint"><b>Respaldo directo</b> documenta el problema en la población estudiada. <b>Indicio indirecto</b> aporta una pista, por ejemplo desde un grupo más amplio. <b>Contexto</b> ayuda a interpretar la situación. El filtro permite elegir qué tipo de hallazgo ver.</p>'+
  '<div class="drawer-tabs" aria-label="Filtrar hallazgos por clase">'+classes.map(x=>'<button type="button" data-dlayer="'+x.id+'" aria-pressed="'+(selectedLayer===x.id)+'" aria-controls="finding-results">'+esc(x.title)+' ('+(x.id==="todas"?p.allFindingCount:p.evidenceCounts[x.id])+')</button>').join("")+'</div>'+
  '<p class="h1-filter-hint" aria-live="polite">'+esc(classById.get(selectedLayer).desc)+'</p>'+evidenceGuide()+
  '<div class="evidence-list" id="finding-results">'+(results||'<p class="hint">Esta ficha no tiene hallazgos de la clase seleccionada. Puedes volver a «Toda la evidencia».</p>')+'</div></dialog>';
}
function restoreDrawerFocus(){
 if(drawerOrigin)document.querySelector('[data-problem="'+drawerOrigin+'"]')?.focus({preventScroll:true});
 drawerOrigin=null;
}
function render({scroll=false}={}){
 if(!data||!state)return;
 const view=construirVista(data,state);
 scopeSelect.value=state.scope;
 const problemHref=id=>construirEnlace({...state,section:"problemas",problemId:id},data);
 let html;
 if(isMethods())html=primaryNav()+mfRender(methodsData,methodsContract,methodsFilters,state.scope,esc,problemHref);
 else if(state.section==="criticidad")html=primaryNav()+h2Render(h2Contract,h2Evidence,methodsData,state.scope,{
  problem:problemHref,map:linkTo("problemas"),methods:methodsHref()+"#metodo-criticidad"
 },esc);
 else if(state.section==="inicio")html=hero()+cards();
 else if(state.section==="problemas")html=problems(view);
 else html=pending();
 root.innerHTML=html+(isMethods()?"":drawer(view));
 setBusy(false);
 const isDrawer=!isMethods()&&!!view.selectedProblem&&state.section==="problemas";
 document.body.style.overflow=isDrawer?"hidden":"";
 if(isDrawer)document.querySelector(".drawer").showModal();
 if(scroll)window.scrollTo({top:0,behavior:"instant"});
 document.title=(isMethods()?"Métodos y fuentes":state.section==="inicio"?"Radiografía del tercer sector":sections.find(x=>x.id===state.section)?.name+" · Radiografía")+" · Simón de Cirene";
}
function navigate(next,{replace=false,scroll=true}={}){
 if(next.problemId!==state.problemId)drawerLayer=null;
 state=normalizarEstado(next,data);
 const url=construirEnlace(state,data);
 history[replace?"replaceState":"pushState"]({},"",url);
 render({scroll});
}
function navigateMethods(filters,{replace=false,scroll=false,focusDetail=false}={}){
 methodsFilters=mfParse(mfUrl(filters,state.scope));
 history[replace?"replaceState":"pushState"]({},"",mfUrl(methodsFilters,state.scope));
 render({scroll});
 if(focusDetail){document.getElementById("mf-detalle")?.scrollIntoView({block:"start",behavior:"instant"});document.getElementById("mf-detalle")?.focus({preventScroll:true});}
}
function goMethods({fuente="",volver="",target=""}={}){
 if(!methodsData||!methodsContract)return;
 const filters=mfDefaults();
 if(fuente)filters.fuente=fuente;
 if(volver)filters.volver=volver;
 if(!volver&&state&&data&&!isMethods())filters.volver=construirEnlace(state,data);
 navigateMethods(filters,{scroll:true,focusDetail:!!fuente});
 if(target)document.getElementById("metodo-"+target)?.scrollIntoView({block:"start",behavior:"instant"});
}
function methodsExport(){
 const rows=mfVisible(methodsData,methodsFilters);
 const blob=new Blob([mfCsv(rows)],{type:"text/csv;charset=utf-8"});
 const url=URL.createObjectURL(blob),anchor=document.createElement("a");
 anchor.href=url;anchor.download="MF1_fuentes_visibles_"+rows.length+"_2026-11-18.csv";
 document.body.appendChild(anchor);anchor.click();anchor.remove();
 setTimeout(()=>URL.revokeObjectURL(url),500);
}

async function optionalJson(url){
 try{
  const response=await fetch(url,{cache:"no-store"});
  return response.ok?await response.json():null;
 }catch{return null;}
}
async function init(){
 try{
  const [response,h1Response,mfResponse,mcResponse,criticidad,evidence]=await Promise.all([fetch("/analisis/px-r1-2b-attribution-31p-147links-v1.json",{cache:"no-store"}),fetch("/preview/h0/h1-data.json",{cache:"no-store"}),fetch("/analisis/mf1-banco-26-fuentes-v1.json",{cache:"no-store"}),fetch("/analisis/mf1-metodos-contrato-HM-v1.json",{cache:"no-store"}),
   optionalJson("/analisis/h-2-1-criticidad-por-universo-v1.json"),optionalJson("/preview/h0/h2-evidence.json")]);
  if(criticidad?.problemas?.length===31&&Object.keys(evidence?.pilot??{}).length===8&&Object.keys(evidence?.deferred??{}).length===23){
   h2Contract=criticidad;
   h2Evidence=evidence;
  }
  if(!response.ok||!h1Response.ok)throw new Error("Error HTTP: catálogo "+response.status+"; H-1 "+h1Response.status);
  [data,h1Data]=await Promise.all([response.json(),h1Response.json()]);
  linksById=new Map(data.links.map(link=>[link.link_id,link]));
  if(h1Data.schema!=="h1-sdc-2026-v1"||h1Data.counts.problems!==31||h1Data.counts.crosses!==87)throw new Error("Contrato analítico H-1 incompatible");
  if(mfResponse.ok&&mcResponse.ok){
   [methodsData,methodsContract]=await Promise.all([mfResponse.json(),mcResponse.json()]);
   if(methodsData.sources?.length!==26||methodsData.problem_source_links?.length!==147||methodsData.findings?.length!==245||methodsContract.layer_methods?.length!==5)throw new Error("Contrato H-M incompatible");
  }
  state=leerEnlace(location.href,data);
  methodsFilters=mfParse(location.href);
  render();
 }catch(error){
  setBusy(false);
  root.innerHTML='<div class="wrap interior"><h1>No pudimos cargar los datos.</h1><p>La página conserva la estructura, pero la matriz documental no está disponible en esta visita.</p><button class="outline-btn" type="button" onclick="location.reload()">Reintentar</button><p class="stage-copy">'+esc(error.message)+'</p></div>';
 }
}
document.addEventListener("click",event=>{
 if(!data||!state)return;
 const toMethod=event.target.closest("[data-mf-go-source]");
 if(toMethod){event.preventDefault();goMethods({fuente:toMethod.dataset.mfGoSource,volver:isMethods()?methodsFilters.volver:construirEnlace(state,data)});return;}
 if(isMethods()){
  if(event.target.closest("[data-mf-export]")){event.preventDefault();methodsExport();return;}
  const source=event.target.closest("[data-mf-source]");
  if(source){event.preventDefault();navigateMethods({...methodsFilters,fuente:source.dataset.mfSource},{focusDetail:true});return;}
  if(event.target.closest("[data-mf-close]")){navigateMethods({...methodsFilters,fuente:""},{replace:true});document.getElementById("mf-banco")?.scrollIntoView({block:"start"});return;}
  if(event.target.closest("[data-mf-reset]")){navigateMethods({...mfDefaults(),volver:methodsFilters.volver},{replace:true});return;}
  const p=event.target.closest("[data-mf-problem]");
  if(p){event.preventDefault();navigate({...state,section:"problemas",problemId:p.dataset.mfProblem},{scroll:true});return;}
  const ret=event.target.closest("[data-mf-return]");
  if(ret){event.preventDefault();const dest=methodsFilters.volver;if(dest){history.pushState({},"",dest);state=leerEnlace(location.href,data);render({scroll:true});}return;}
 }
 const h2Problem=event.target.closest("[data-h2-problem]");
 if(h2Problem&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey){
  event.preventDefault();
  navigate({...state,section:"problemas",problemId:h2Problem.dataset.h2Problem},{scroll:true});
  return;
 }
 const go=event.target.closest("[data-go]");
 if(go){
  event.preventDefault();
  const section=go.dataset.go;
  if(section==="metodos"){goMethods({target:go.dataset.methodTarget||""});return;}
  if(SECTIONS.includes(section)){navigate({...cambiarSeccion(state,section,data),problemId:null});}
  return;
 }
 const topic=event.target.closest("[data-topic]");
 if(topic){
  const selected=topic.dataset.topic;
  topicFilter=selected===topicFilter?"todas":selected;
  render({scroll:false});
  document.querySelector('[data-topic="'+selected+'"]')?.focus({preventScroll:true});
  return;
 }
 const row=event.target.closest("[data-problem]");
 if(row){drawerOrigin=row.dataset.problem;navigate({...state,problemId:row.dataset.problem},{scroll:false});return;}
 const dialog=event.target.closest("dialog.drawer");
 const bounds=dialog===event.target?dialog.getBoundingClientRect():null;
 const isBackdropClick=bounds&&(event.clientX<bounds.left||event.clientX>=bounds.right||event.clientY<bounds.top||event.clientY>=bounds.bottom);
 if(event.target.closest("[data-close]")||isBackdropClick){
  navigate({...state,problemId:null},{scroll:false});
  restoreDrawerFocus();
  return;
 }
 const layer=event.target.closest("[data-dlayer]");
 if(layer){
  const scrollTop=document.querySelector(".drawer").scrollTop;
  const selected=layer.dataset.dlayer;
  drawerLayer=selected;
  render();
  document.querySelector(".drawer").scrollTop=scrollTop;
  document.querySelector('[data-dlayer="'+selected+'"]')?.focus({preventScroll:true});
  return;
 }
 const reset=event.target.closest("[data-reset]");
 if(reset){topicFilter="todas";navigate({...state,query:"",layer:"todas",showContext:true},{replace:true,scroll:false});return;}
});
document.addEventListener("change",event=>{
 if(!data||!state)return;
 if(isMethods()&&event.target.hasAttribute("data-mf-filter")){navigateMethods({...methodsFilters,[event.target.dataset.mfFilter]:event.target.value,fuente:""},{replace:true});return;}
 if(event.target.id==="scope-top"){
  if(isMethods()){state=cambiarUniverso(state,event.target.value,data);navigateMethods(methodsFilters,{replace:true});}
  else navigate(cambiarUniverso(state,event.target.value,data),{scroll:state.section==="criticidad"});
  return;
 }
 if(event.target.id==="layer-select"){navigate({...state,layer:event.target.value},{replace:true,scroll:false});return;}
 if(event.target.id==="show-context"){navigate({...state,showContext:event.target.checked},{replace:true,scroll:false});}
});
let searchTimer;
document.addEventListener("input",event=>{
 if(event.target.id==="mf-search"&&isMethods()){
  const next=event.target.value;clearTimeout(searchTimer);
  searchTimer=setTimeout(()=>{
   const selection=event.target.selectionStart;
   navigateMethods({...methodsFilters,q:next,fuente:""},{replace:true});
   const box=document.getElementById("mf-search");
   if(box){box.focus({preventScroll:true});if(selection!==null)box.setSelectionRange(selection,selection);}
  },175);return;
 }
 if(event.target.id!=="problem-search")return;
 const next=event.target.value;
 clearTimeout(searchTimer);
 searchTimer=setTimeout(()=>{
  const at=document.activeElement?.id==="problem-search";
  const selection=at?event.target.selectionStart:null;
  navigate({...state,query:next},{replace:true,scroll:false});
  const input=document.querySelector("#problem-search");
  if(at&&input){input.focus({preventScroll:true});if(selection!==null)input.setSelectionRange(selection,selection);}
 },180);
});
window.addEventListener("popstate",()=>{if(!data)return;drawerLayer=null;state=leerEnlace(location.href,data);methodsFilters=mfParse(location.href);render({scroll:false});});
window.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&isMethods()&&methodsFilters.fuente){navigateMethods({...methodsFilters,fuente:""},{replace:true});return;}
});
document.addEventListener("cancel",event=>{
 if(!event.target.matches("dialog.drawer"))return;
 event.preventDefault();
 navigate({...state,problemId:null},{scroll:false});
 restoreDrawerFocus();
},{capture:true});
init();