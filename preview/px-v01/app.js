"use strict";
/* PX-V0.1: solo lectura. Nunca recalcular denominadores ni puntajes. */
(function () {
  const qs = (selector, root=document) => root.querySelector(selector);
  const qsa = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const state = { data:null, theme:"all", evidence:"all", query:"", selected:null, previousHash:"", previousFocus:null };
  const label = (value, fallback="ND") => value===null || value===undefined || String(value).trim()==="" ? fallback : String(value);
  const esc = (v) => String(v===null || v===undefined ? "" : v).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const cleanText = (s) => String(s || "").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const safeUrl = (u) => { try { const a=new URL(u); return a.protocol==="https:" || a.protocol==="http:" ? a.href : ""; } catch(_){ return ""; } };
  const sMap = () => new Map(state.data.sources.map(x => [x.id,x]));
  const pMap = () => new Map(state.data.problems.map(x => [x.id,x]));
  const bMap = () => new Map(state.data.editorial.map(x => [x.id,x]));
  const themeFor = (id) => state.data.themes.find(x => x.id===id);
  const relationLabel = (relation) => relation===1 ? "Respaldo directo en su alcance" : relation===0.5 ? "Indicio / respaldo parcial" : "Contexto, no prueba directa";
  function setAnnounce(text) { qs("#announcer").textContent=text; }
  function showFatal(text) {
    qs("#results-count").textContent="Error al cargar datos";
    qs("#problem-grid").textContent="";
    const p=document.createElement("p"); p.className="caution"; p.textContent=text; qs("#problem-grid").appendChild(p);
    setAnnounce(text);
  }
  function renderThemes() {
    const list=qs("#themes-list"); list.textContent="";
    const options=[{id:"all",title:"Todos los temas",n:state.data.problems.length}].concat(
      state.data.themes.map(t => ({id:t.id,title:t.title,n:t.problem_ids.length}))
    );
    options.forEach(t => {
      const button=document.createElement("button");
      button.type="button";button.className="theme-button"+(state.theme===t.id?" selected":"");
      button.dataset.theme=t.id;button.setAttribute("aria-pressed",state.theme===t.id?"true":"false");
      button.innerHTML="<span>"+esc(t.title)+"</span><strong>"+t.n+"</strong>";
      button.addEventListener("click",() => {state.theme=t.id;renderThemes();renderCards();});
      list.appendChild(button);
    });
  }
  function resetFilters() {
    state.theme="all";state.evidence="all";state.query="";
    qs("#problem-search").value="";qs("#evidence-filter").value="all";
    renderThemes();renderCards();
  }
  function matches(p) {
    const b=state.data.editorial.find(v => v.id===p.id);
    if(state.theme!=="all" && p.theme_id!==state.theme) return false;
    if(state.evidence==="numeric" && !(typeof b.metric==="number" && typeof b.denominator==="number")) return false;
    if(state.evidence==="non-numeric" && typeof b.metric==="number") return false;
    const haystack=cleanText([p.id,p.title,p.domain||"",p.kind||"",state.data.sources.find(x=>x.id===p.origin)?.name||""].join(" "));
    return !state.query || haystack.includes(cleanText(state.query));
  }
  function makeCard(p) {
    const b=state.data.editorial.find(v=>v.id===p.id);
    const theme=themeFor(p.theme_id);
    const hasNumeric=typeof b.metric==="number" && typeof b.denominator==="number";
    const node=document.createElement("button");
    node.type="button";node.className="problem-card";node.dataset.id=p.id;
    node.setAttribute("aria-haspopup","dialog");node.setAttribute("aria-label",p.id+" "+p.title+". Abrir fuentes y evidencia.");
    node.innerHTML='<div class="card-top"><span class="card-id">'+esc(p.id)+'</span><span class="card-source">FUENTE '+esc(p.origin)+'</span></div>'+
      '<h3>'+esc(p.title)+'</h3>'+
      '<div class="card-bottom"><span class="card-kind">'+esc(theme?.title||"Tema sin asignar")+'</span><span class="card-arrow" aria-hidden="true">↗</span></div>'+
      '<div class="card-evidence"><span>'+esc(p.kind)+'</span><span class="pill">'+(hasNumeric?"Indicador contextual":"Sin indicador numérico")+'</span></div>';
    node.addEventListener("click",() => openProblem(p.id));
    return node;
  }
  function renderCards() {
    const grid=qs("#problem-grid");grid.textContent="";
    const items=state.data.problems.filter(matches);
    const fragment=document.createDocumentFragment();
    items.forEach(p=>fragment.appendChild(makeCard(p)));
    grid.appendChild(fragment);
    qs("#results-count").textContent=items.length+" de "+state.data.problems.length+" problemas";
    qs("#empty-state").hidden=items.length!==0;
    qs("#reset-filters").hidden=state.theme==="all"&&state.evidence==="all"&&!state.query;
  }
  function sourceLink(url, title) {
    const clean=safeUrl(url);
    if(!clean) return '<span class="drawer-negative">Enlace sin URL verificable</span>';
    return '<a class="source-link" href="'+esc(clean)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+' <span aria-hidden="true">↗</span></a>';
  }
  function listClaims(problem) {
    const relevant=state.data.claims.filter(x=>x.problem_ids.includes(problem.id));
    const b=state.data.editorial.find(x=>x.id===problem.id);
    if(!relevant.length) {
      if(typeof b.metric==="number"&&typeof b.denominator==="number") {
        return '<div class="metric-card"><div class="metric-big">'+esc(b.metric)+'% <small>N='+esc(b.denominator)+'</small></div>'+
          '<div class="metric-caption">'+esc(b.measure)+'</div><div class="metric-detail">'+esc(label(b.population,"Población no acreditada"))+' · Indicador descriptivo, NO tasa nacional</div></div>'+
          '<p>'+sourceLink(b.sourceUrl,"Ver fuente de "+problem.id+" · "+label(b.page,"página ND"))+'</p>';
      }
      return '<div class="claim-card"><strong>Evidencia documental o cualitativa</strong><p>'+esc(label(b.measure,"No hay indicador numérico comparable."))+'</p>'+
         '<p class="drawer-negative">La ausencia de N no significa cero casos ni falta de importancia.</p></div>';
    }
    return relevant.map(c=>{
      const num=typeof c.percent==="number";
      const main=c.id==="CLM-F03-D22-RENDICION-62"||c.id==="CLM-F03-D33-DONACIONES-57";
      const display=num&&main?'<div class="metric-card"><div class="metric-big">'+esc(c.percent)+'% <small>N='+esc(c.denominator,"ND")+'</small></div><div class="metric-caption">'+esc(c.text)+'</div><div class="metric-detail">Resultado de pregunta específica · No mide frecuencia de episodios</div></div>':
      '<div class="claim-card"><div class="claim-header"><span>'+esc(c.claim_type==="qualitative_testimony"?"EVIDENCIA CUALITATIVA":num?"OTRA PREGUNTA / PERCEPCIÓN":"PASAJES DEL ESTUDIO")+'</span><span>'+esc(c.locator)+'</span></div><p>'+esc(c.text)+'</p>'+
      (num?'<p class="claim-source"><strong>'+esc(c.percent)+'%</strong> · Denominador de esta pregunta: '+esc(label(c.denominator,"ND"))+'. No sumable con otras preguntas.</p>':'<p class="claim-source">Sin porcentaje ni base representativa acreditada.</p>')+'</div>';
      return display+
      '<p class="claim-source">'+esc(label(c.population,"Población: ND"))+' · '+esc(label(c.period,"Período: ND"))+'</p>'+
      '<p>'+sourceLink(c.url,"Abrir documento original · "+c.locator)+'</p>'+
      '<p class="drawer-negative">'+esc(c.limitations)+'</p>';
    }).join("");
  }
  function listBackings(problem) {
    const sourceById=sMap();
    return problem.backing.map(backing=>{
      const source=sourceById.get(backing.source);
      const entries=(backing.findings||[]).map(f=>'<li>'+esc(f.text)+
        '<div>'+f.refs.map(ref=>sourceLink(ref.url,ref.label)).join(" · ")+'</div></li>').join("");
      return '<details class="evidence-details"><summary><b>'+esc(backing.source)+'</b> · '+esc(source?.name||"Fuente sin título")+
        ' <span>('+esc(relationLabel(backing.relation))+')</span></summary>'+
        '<p>'+esc(backing.reason)+'</p><ul>'+entries+'</ul></details>';
    }).join("");
  }
  function listSegments(problem) {
    const linked=state.data.cross.filter(c=>c.problem===problem.id);
    if(!linked.length) return '<p class="drawer-negative">No hay cruces problema × segmento registrados. Esto NO demuestra ausencia de afectación.</p>';
    const ids=new Map(state.data.segments.map(s=>[s.id,s]));
    return '<div>'+linked.map(c=>
      '<span class="segment-chip '+(c.kind==="candidate"?"candidate":"")+'" title="'+esc(c.reason)+'">'+esc(c.segment)+' · '+esc(c.kind==="candidate"?"Por investigar":"Base documentada")+'</span>'
    ).join("")+'</div>'+
    '<p class="drawer-negative">Vínculos de segmentos: '+linked.length+'. «Por investigar» no equivale a prevalencia comprobada; los N de los indicadores no cambian al elegir un segmento.</p>';
  }
  function problemMarkup(id) {
    const p=pMap().get(id);const b=bMap().get(id);
    if(!p||!b)return null;
    const theme=themeFor(p.theme_id);
    return '<div class="drawer-summary">'+esc(p.id)+' · '+esc(theme?.title||"Sin tema")+'</div>'+
      '<h2 class="drawer-title" id="drawer-title">'+esc(p.title)+'</h2>'+
      '<p class="drawer-lead" id="drawer-intro">'+esc(label(p.evidence,"Dolor registrado en el catálogo documental."))+'</p>'+
      '<div class="drawer-row"><span class="label-pill">Origen '+esc(p.origin)+'</span><span class="label-pill">'+esc(p.kind)+'</span><span class="label-pill muted">Banda B: '+esc(b.band)+' (editorial)</span></div>'+
      '<div class="caution"><b>Cómo interpretar:</b> la banda B es editorial, NO una medición comparable de criticidad. No existe puntuación ponderada calculable. La evidencia no permite inferir incidencia nacional.</div>'+
      '<section class="drawer-section" aria-label="Dato y evidencia principal"><h3>Qué sabemos de este problema</h3>'+listClaims(p)+'</section>'+
      '<section class="drawer-section"><h3>Límites metodológicos</h3><p>'+esc(label(p.limit,b.caution||"Sin detalle adicional registrado"))+'</p>'+
      (b.caution?'<p class="drawer-negative">'+esc(b.caution)+'</p>':"")+'</section>'+
      '<section class="drawer-section"><h3>Fuentes y respaldo, con páginas</h3><p class="drawer-negative">Se muestran los registros originales. Una ficha no equivale necesariamente a un estudio independiente; los vínculos de contexto no se cuentan como pruebas directas.</p>'+
      listBackings(p)+'</section>'+
      '<section class="drawer-section"><h3>Segmentos vinculados en el catálogo</h3>'+listSegments(p)+'</section>'+
      '<section class="drawer-section"><h3>Qué falta comprobar</h3><p>'+esc(label(p.test,"Validación empírica pendiente"))+'</p></section>';
  }
  function showDrawer() {
    qs("#drawer-backdrop").hidden=false;qs("#evidence-drawer").hidden=false;
    document.body.classList.add("no-scroll");
    qs("#drawer-close").focus();
  }
  function openProblem(id,fromHash=false) {
    if(!state.data||!pMap().has(id))return;
    if(!qs("#evidence-drawer").hidden)closeDrawer(false);
    state.selected=id;state.previousFocus=document.activeElement;
    state.previousHash=fromHash?"#mapa":location.hash;
    qs("#drawer-problem-id").textContent=id;
    qs("#drawer-body").innerHTML=problemMarkup(id);
    showDrawer();
    if(!fromHash)history.replaceState(null,"",location.pathname+location.search+"#"+id);
    setAnnounce("Ficha "+id+" abierta. Presione Escape para volver.");
  }
  function openMethod() {
    state.selected="method";state.previousFocus=document.activeElement;state.previousHash=location.hash;
    qs("#drawer-problem-id").textContent="MÉTODO";
    qs("#drawer-body").innerHTML='<div class="drawer-summary">GUÍA PARA LA PRESENTACIÓN</div><h2 class="drawer-title" id="drawer-title">Cómo leer estos hallazgos</h2>'+
      '<p id="drawer-intro" class="drawer-lead">Esta vista previa es una biblioteca guiada de evidencia para el equipo DIMI, no un ranking nacional de fundaciones.</p>'+
      '<section class="drawer-section"><h3>Tres precauciones esenciales</h3><ol class="readme-list"><li><b>Documentación</b>: 26 fichas fuente y 31 problemas son registros del catálogo, no recuentos de organizaciones afectadas.</li>'+
      '<li><b>Frecuencia</b>: solo algunas preguntas presentan N y porcentaje; la mayoría de problemas no tiene una medida de episodios comparable.</li>'+
      '<li><b>Criticidad</b>: las bandas «Alta» y «Media» son editoriales. No existe un puntaje ponderado científico disponible para ordenar los problemas.</li></ol></section>'+
      '<section class="drawer-section"><h3>Recorridos de comprobación</h3><p><b>P20:</b> 62% N=125 de una pregunta específica sobre respuesta a rendiciones. No es prevalencia nacional ni la misma pregunta que el 42%.</p>'+
      '<p><b>P48:</b> evidencia sectorial cualitativa de sobrecupo y carga, sin porcentaje generalizable.</p></section>'+
      '<section class="drawer-section"><h3>La siguiente fase</h3><p>Criticidad, abordabilidad e impacto se construirán cuando cada criterio pueda sostenerse y compararse con una alternativa convencional.</p></section>';
    showDrawer();setAnnounce("Guía metodológica abierta.");
  }
  function closeDrawer(restore=true) {
    if(qs("#evidence-drawer").hidden)return;
    const old=state.selected,focus=state.previousFocus;
    qs("#evidence-drawer").hidden=true;qs("#drawer-backdrop").hidden=true;
    document.body.classList.remove("no-scroll");
    state.selected=null;
    if(old!=="method")history.replaceState(null,"",location.pathname+location.search+(state.previousHash||"#mapa"));
    if(restore) {
      if(focus&&focus.isConnected&&typeof focus.focus==="function")focus.focus();
      else (qs('.problem-card[data-id="'+old+'"]')||qs("#problem-search")).focus();
    }
    setAnnounce("Ficha cerrada. Retorno al mapa.");
  }
  function drawerKeys(e) {
    if(qs("#evidence-drawer").hidden)return;
    if(e.key==="Escape"){e.preventDefault();closeDrawer();return}
    if(e.key!=="Tab")return;
    const items=qsa('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),summary,[tabindex="0"]',qs("#evidence-drawer"))
      .filter(el=>el.getClientRects().length>0);
    if(!items.length){e.preventDefault();qs("#evidence-drawer").focus();return}
    const first=items[0],last=items[items.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
  function bind() {
    qs("#problem-search").addEventListener("input",e=>{state.query=e.target.value.trim();renderCards()});
    qs("#evidence-filter").addEventListener("change",e=>{state.evidence=e.target.value;renderCards()});
    qs("#reset-filters").addEventListener("click",resetFilters);
    qs("#empty-reset").addEventListener("click",resetFilters);
    qs("#drawer-close").addEventListener("click",()=>closeDrawer());
    qs("#drawer-return").addEventListener("click",()=>closeDrawer());
    qs("#drawer-backdrop").addEventListener("click",()=>closeDrawer());
    qs("#how-to-button").addEventListener("click",openMethod);
    document.addEventListener("keydown",drawerKeys);
    window.addEventListener("hashchange",()=>{
      const id=decodeURIComponent(location.hash.slice(1));
      if(state.data&&/^P\d{2,3}$/.test(id)&&pMap().has(id)&&state.selected!==id)openProblem(id,true);
    });
  }
  async function init() {
    bind();
    try{
      const response=await fetch("./catalogue.json",{cache:"no-store"});
      if(!response.ok)throw Error("HTTP "+response.status);
      const data=await response.json();
      if(!data.meta||data.problems.length!==31||data.sources.length!==26||data.segments.length!==121||data.cross.length!==87)throw Error("El corte documental no coincide con el inventario v0.6");
      if(new Set(data.problems.map(x=>x.id)).size!==31||new Set(data.problems.map(x=>x.theme_id)).size!==4)throw Error("IDs o agrupaciones de navegación inconsistentes");
      state.data=data;
      qs("#fact-sources").textContent=data.meta.source_count;qs("#fact-problems").textContent=data.meta.problem_count;qs("#fact-segments").textContent=data.meta.segment_record_count;
      qs("#total-count").textContent=data.problems.length;
      renderThemes();renderCards();
      const hash=decodeURIComponent(location.hash.slice(1));
      if(/^P\d{2,3}$/.test(hash)&&pMap().has(hash))openProblem(hash,true);
    }catch(error){showFatal("No fue posible cargar el catálogo de la vista previa. "+error.message);}
  }
  init();
})();