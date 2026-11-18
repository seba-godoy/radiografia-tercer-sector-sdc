import {mfDefaults,mfParse,mfUrl,mfVisible,mfCsv,mfRender,mfSourceShortcut} from "/preview/h0/methods-view.mjs";
import {h1Overview,h1RowTag,h1ProblemProfile,h1TopicOf} from "/preview/h0/h1-view.mjs";
import {
  construirVista,leerEnlace,construirEnlace,cambiarSeccion,cambiarUniverso,
  normalizarEstado,SECTIONS,SCOPE,LAYERS
} from "/analisis/px-r1-3-selector.mjs";

const sections=[
{id:"problemas",n:"01",name:"Problemas detectados",sub:"Qué dolores encontramos",desc:"Explora las fichas y sus respaldos sin confundir cobertura documental con frecuencia.",status:"Explorar evidencia",symbol:"↗"},
{id:"criticidad",n:"02",name:"Ranking de criticidad",sub:"Cuáles importan más",desc:"Contrastar gravedad, alcance y urgencia con criterios verificables y vacíos visibles.",status:"Análisis en desarrollo",symbol:"↗"},
{id:"abordabilidad",n:"03",name:"Abordabilidad",sub:"Qué podemos resolver",desc:"Conectar los problemas con causas, tareas y capacidad real de intervención.",status:"Análisis en desarrollo",symbol:"↗"},
{id:"oportunidades",n:"04",name:"Oportunidades con IA",sub:"Qué soluciones vale la pena probar",desc:"Explorar alternativas tecnológicas, impacto potencial y viabilidad comercial.",status:"Análisis en desarrollo",symbol:"↗"}];
const classes=[
{id:"todas",title:"Toda la evidencia"},
{id:"directa",title:"Fundaciones explícitas"},
{id:"compartida",title:"Muestra mixta"},
{id:"general",title:"OSC general"},
{id:"sectorial",title:"Sectorial"},
{id:"contextual",title:"Contexto / transferencia"},
{id:"pendiente",title:"Sin información suficiente"},
{id:"no_fundacion",title:"Otra forma jurídica"}];
const bandInfo={
directa:{label:"Evidencia directa",short:"Fundaciones explícitas",desc:"Al menos una referencia específica a fundaciones. No presupone representatividad."},
compartida:{label:"Evidencia compartida",short:"Muestras mixtas",desc:"Fundaciones y otras organizaciones sin resultados desagregados para fundaciones."},
contexto:{label:"Contexto por investigar",short:"Contexto complementario",desc:"Evidencia general, sectorial o inferida, útil para explorar pero no exclusiva de fundaciones."},
sector:{label:"Evidencia del tercer sector",short:"Catálogo documental",desc:"Datos de las poblaciones originales de los estudios."}};
let data=null,state=null,drawerOrigin=null,loading=false,h1Data=null,topicFilter="todas";
let methodsData=null,methodsContract=null,methodsFilters=mfDefaults();
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
function stats(view){
  return '<div class="data-stats"><div class="stat-chip"><b>'+fnum(view.sourceCounts.problems)+'</b><small>Problemas documentados</small></div><div class="stat-chip"><b>'+fnum(view.sourceCounts.links)+'</b><small>Vínculos problema-fuente</small></div><div class="stat-chip"><b>'+fnum(view.sourceCounts.findings)+'</b><small>Hallazgos con localizador</small></div></div>';
}
function evidenceBands(view){
  if(state.scope!=="fundaciones")return "";
  const vals=[["directa",view.summary.direct],["compartida",view.summary.shared_without_direct],["contexto",view.summary.only_context]];
  return '<div class="scope-bands" aria-label="Alcance de evidencia sobre fundaciones">'+vals.map(([k,n])=>'<div class="band-card '+k+'"><b>'+fnum(n)+'</b><strong>'+bandInfo[k].label+'</strong><small>'+bandInfo[k].desc+'</small></div>').join("")+'</div>';
}
function tools(view){
 return '<div class="tools-panel"><label class="search-wrap"><span class="sr-only">Buscar por nombre o código del problema</span><input id="problem-search" type="search" placeholder="Buscar problema o código P…" value="'+esc(state.query)+'" autocomplete="off"></label>'+
  '<label class="layer-label" for="layer-select">Evidencia</label><select id="layer-select" aria-label="Filtrar por clase de evidencia">'+classes.map(x=>'<option value="'+x.id+'"'+(state.layer===x.id?' selected':'')+'>'+esc(x.title)+'</option>').join("")+'</select>'+
  (state.scope==="fundaciones"?'<label class="switch"><input id="show-context" type="checkbox" '+(state.showContext?'checked':'')+'><span>Mostrar casos de contexto</span></label>':"")+'</div>';
}
function problemCard(p){
 const band=state.scope==="fundaciones"?p.band:"sector";
 const evidence=p.allFindingCount+" "+(p.allFindingCount===1?"hallazgo":"hallazgos");
 return '<button class="pain-row" type="button" data-problem="'+esc(p.problemId)+'" aria-label="Abrir '+esc(p.problemId)+': '+esc(p.title)+'"><span class="pain-code">'+esc(p.problemId)+'</span><span class="row-content"><h3>'+esc(p.title)+'</h3><span class="row-meta"><span class="tag '+band+'">'+esc(bandInfo[band].short)+'</span><span class="tag">'+evidence+'</span>'+h1RowTag(h1Data,p.problemId,esc)+'</span></span><span class="row-more" aria-hidden="true">↗</span></button>';
}
function problems(view){
 const notice=view.uiNotice;
 const visible=view.visibleCases.filter(p=>topicFilter==="todas"||h1TopicOf(h1Data,p.problemId)===topicFilter);
 const resultCount=visible.length;
 const byTopic=topicFilter==="todas"?"":" · Tema "+esc(topicFilter)+" aplicado";
 return primaryNav()+'<div class="interior wrap"><div class="page-top"><div><div class="stage-label">01 / Problemas detectados · H-1</div><h1>Explora los problemas documentados.</h1><p class="page-intro">Siete temas, cobertura documental, segmentos vinculados e indicadores con alcance declarado. Identifica evidencias y vacíos antes de evaluar criticidad.</p></div><a href="/" data-go="inicio" class="outline-btn">← Volver a portada</a></div>'+
  stats(view)+'<div class="callout">'+esc(notice)+'</div>'+evidenceBands(view)+h1Overview(h1Data,state.scope,topicFilter,esc)+
  '<div class="h1-results-title"><h2>Explorar fichas de problemas</h2><p>Combina el tema seleccionado con los filtros de evidencia, la búsqueda y el selector de universo. Haz clic en una ficha para revisar fuentes y segmentos.</p></div>'+tools(view)+
  '<div class="result-meta"><span id="result-count" aria-live="polite">'+fnum(resultCount)+' de 31 problemas visibles'+byTopic+(state.layer!=="todas"?' · Clase de evidencia aplicada':'')+'</span><span>Los problemas ocultos por filtros no se eliminan del catálogo</span></div>'+
  (resultCount?'<div class="pain-list">'+visible.map(problemCard).join("")+'</div>':'<div class="empty"><h3>No hay coincidencias con estos filtros.</h3><p>Los problemas siguen en el catálogo. Restablece el tema, la búsqueda y los filtros para recuperarlos.</p><button type="button" class="small-btn" data-reset>Restablecer filtros</button></div>')+
  '<div class="forward"><div><small>Próxima etapa analítica tras Métodos y fuentes</small><strong>02 · Ranking de criticidad</strong></div><a href="'+esc(linkTo("criticidad"))+'" data-go="criticidad">Continuar →</a></div></div>';
}
const pendingCopy={
 criticidad:{number:"02",title:"¿Cuáles son los problemas más críticos?",lead:"Separaremos los problemas mejor documentados de los potencialmente más graves, sin convertir cantidad de fuentes en gravedad.",points:["Criterios de impacto, urgencia y alcance","Evidencia comparable y contraevidencia","Incertidumbre y razón de cada selección"],next:"abordabilidad",nextLabel:"03 · Abordabilidad"},
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
 const sources=new Set(p.links.map(l=>l.sourceId));
 const selectedLayer=state.layer==="todas"?"todas":state.layer;
 const evidence=selectedLayer==="todas"?p.evidenceLayers:Object.fromEntries(Object.entries(p.evidenceLayers).filter(([k])=>k===selectedLayer));
 const all=selectedLayer==="todas"?Object.values(evidence).flat():evidence[selectedLayer]??[];
 all.sort((a,b)=>a.source_id.localeCompare(b.source_id));
 const renderItem=f=>{
  const link=p.links.find(l=>l.sourceId===f.source_id);
  const links=(f.reference_locations??[]).filter(x=>/^https?:\/\//.test(x.url)).slice(0,2);
  return '<article class="evidence-item"><strong>'+esc(f.source_id)+' · '+esc(classes.find(x=>x.id===({F_EXCLUSIVA_EXPLICITA:"directa",M_MIXTA_NO_DESAGREGADA:"compartida",G_OSFL_GENERAL:"general",S_SECTORIAL_SIN_FORMA:"sectorial",I_INFERIDA_POR_VALIDAR:"contextual",U_INSUFICIENTE:"pendiente",X_NO_FUNDACION_EXPLICITA:"no_fundacion"}[f.population_evidence_class]))?.title??"Evidencia")+'</strong><p>'+esc(f.finding_text)+'</p><div>'+links.map(r=>'<a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">Ver fuente: '+esc(r.label)+' ↗</a>').join("")+'</div>'+mfSourceShortcut(f.source_id,state.scope,esc,construirEnlace({...state,section:"problemas"},data))+'</article>';
 };
 return '<div class="drawer-backdrop" role="presentation" id="drawer-backdrop"><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title"><button class="drawer-close" type="button" data-close aria-label="Cerrar ficha">×</button><div class="stage-label">Ficha documental · '+esc(p.problemId)+'</div><h2 id="drawer-title">'+esc(p.title)+'</h2><p class="hint">'+esc(p.warning)+'</p><div class="drawer-summary">'+p.allFindingCount+' hallazgos en '+p.allSourceLinkCount+' fichas de fuentes. Los documentos pueden compartir bases u orígenes; esta cifra no mide frecuencia ni independencia estadística.</div>'+
  h1ProblemProfile(h1Data,p.problemId,esc)+'<div class="drawer-tabs" aria-label="Clases de evidencia">'+[...classes.slice(0,6)].map(x=>'<button type="button" data-dlayer="'+x.id+'" aria-pressed="'+(selectedLayer===x.id)+'">'+esc(x.title)+'</button>').join("")+'</div>'+
  '<div class="evidence-list">'+(all.length?all.map(renderItem).join(""):'<p class="hint">No hay hallazgos de esta clase para el problema. Selecciona «Toda la evidencia».</p>')+'</div>'+
  '<div class="callout">Cada dato conserva su población de origen. «Fundaciones» no transforma las muestras mixtas en tasas propias de fundaciones. Los indicadores utilizados en conclusiones deben cotejarse con la fuente primaria. <a href="'+esc(methodsHref())+'" data-go="metodos">Ver método general ↗</a></div></aside></div>';
}
function render({scroll=false}={}){
 if(!data||!state)return;
 const view=construirVista(data,state);
 scopeSelect.value=state.scope;
 const html=isMethods()?primaryNav()+mfRender(methodsData,methodsContract,methodsFilters,state.scope,esc,id=>construirEnlace({...state,section:"problemas",problemId:id},data)):state.section==="inicio"?hero()+cards():state.section==="problemas"?problems(view):pending();
 root.innerHTML=html+(isMethods()?"":drawer(view));
 setBusy(false);
 const isDrawer=!isMethods()&&!!view.selectedProblem&&state.section==="problemas";
 document.body.style.overflow=isDrawer?"hidden":"";
 if(isDrawer){document.querySelector("[data-close]")?.focus({preventScroll:true});}
 if(scroll)window.scrollTo({top:0,behavior:"instant"});
 document.title=(isMethods()?"Métodos y fuentes":state.section==="inicio"?"Radiografía del tercer sector":sections.find(x=>x.id===state.section)?.name+" · Radiografía")+" · Simón de Cirene";
}
function navigate(next,{replace=false,scroll=true}={}){
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

async function init(){
 try{
  const [response,h1Response,mfResponse,mcResponse]=await Promise.all([fetch("/analisis/px-r1-2b-attribution-31p-147links-v1.json",{cache:"no-store"}),fetch("/preview/h0/h1-data.json",{cache:"no-store"}),fetch("/analisis/mf1-banco-26-fuentes-v1.json",{cache:"no-store"}),fetch("/analisis/mf1-metodos-contrato-HM-v1.json",{cache:"no-store"})]);
  if(!response.ok||!h1Response.ok)throw new Error("Error HTTP: catálogo "+response.status+"; H-1 "+h1Response.status);
  [data,h1Data]=await Promise.all([response.json(),h1Response.json()]);
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
 const go=event.target.closest("[data-go]");
 if(go){
  event.preventDefault();
  const section=go.dataset.go;
  if(section==="metodos"){goMethods({target:go.dataset.methodTarget||""});return;}
  if(SECTIONS.includes(section)){navigate({...cambiarSeccion(state,section,data),problemId:null});}
  return;
 }
 const topic=event.target.closest("[data-topic]");
 if(topic){topicFilter=topic.dataset.topic;render({scroll:false});return;}
 const row=event.target.closest("[data-problem]");
 if(row){drawerOrigin=row;navigate({...state,problemId:row.dataset.problem},{scroll:false});return;}
 if(event.target.closest("[data-close]")||event.target.id==="drawer-backdrop"){
  navigate({...state,problemId:null},{scroll:false});
  if(drawerOrigin?.isConnected)drawerOrigin.focus({preventScroll:true});
  return;
 }
 const layer=event.target.closest("[data-dlayer]");
 if(layer){navigate({...state,layer:layer.dataset.dlayer},{replace:true,scroll:false});return;}
 const reset=event.target.closest("[data-reset]");
 if(reset){topicFilter="todas";navigate({...state,query:"",layer:"todas",showContext:true},{replace:true,scroll:false});return;}
});
document.addEventListener("change",event=>{
 if(!data||!state)return;
 if(isMethods()&&event.target.hasAttribute("data-mf-filter")){navigateMethods({...methodsFilters,[event.target.dataset.mfFilter]:event.target.value,fuente:""},{replace:true});return;}
 if(event.target.id==="scope-top"){
  if(isMethods()){state=cambiarUniverso(state,event.target.value,data);navigateMethods(methodsFilters,{replace:true});}
  else navigate(cambiarUniverso(state,event.target.value,data),{scroll:false});
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
window.addEventListener("popstate",()=>{if(!data)return;state=leerEnlace(location.href,data);methodsFilters=mfParse(location.href);render({scroll:false});});
window.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&isMethods()&&methodsFilters.fuente){navigateMethods({...methodsFilters,fuente:""},{replace:true});return;}
 if(event.key==="Escape"&&state?.problemId&&!isMethods()){navigate({...state,problemId:null},{scroll:false});drawerOrigin?.focus?.({preventScroll:true});}
});
init();