import {abKeys,abRanking,validateAbWeights} from './ab-score.mjs';
import {appliedCriticalityWeights,rankingWithWeights} from './ranking31-weights.mjs';
const sessions=new WeakMap();
const external=(url,label,e)=>/^https:\/\//.test(url||'')?`<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)}</a>`:e(label);
const fmt=n=>new Intl.NumberFormat('es-CL',{maximumFractionDigits:8}).format(n);
const span=(x)=>x.map(fmt).join('–');
const weightText=w=>Object.entries(w).map(([k,v])=>`${k} ${fmt(v)}%`).join(' · ');
function comparison(critical){const weights=appliedCriticalityWeights(critical);return {weights,rows:new Map(rankingWithWeights(critical.rows,weights).map(r=>[r.id,r]))};}

export function abRender(data,bank,critical,scope,links,e){
 if(!data?.rows||data.rows.length!==31||!bank||!critical)return '<div class="wrap interior"><h1>Abordabilidad</h1><p>La evaluación no está disponible en esta visita. Puedes volver a cargar esta sección.</p></div>';
 const m=data.method,crit=comparison(critical);
 const claims=new Map(bank.findings.map(x=>[x.id,x]));
 const institutions=new Map(m.institutionalSources.map(x=>[x.id,x]));
 const source=id=>{
  const inst=institutions.get(id);if(inst)return `<li>${external(inst.url,`${inst.id} · ${inst.title}`,e)}<p>${e(inst.finding)} ${e(inst.limit)}</p></li>`;
  const f=claims.get(id);return `<li><strong>${e(id)}</strong> · ${e(f.claim_text)}<br><small>Origen atribuido: ${e(f.root_credited)}</small><br>${f.locators.map(l=>external(l.url,l.label,e)).join(' · ')}</li>`;
 };
 const rows=data.rows.map(r=>`<tr data-ab-row="${e(r.id)}"><td data-ab-rank>${r.rank}</td><th scope="row"><a href="#ab-${e(r.id)}">${e(r.id)} · ${e(r.title)}</a><small>${e(r.intervention)}</small><small>${e(r.operationalStatus)}</small></th><td><strong data-ab-score>${r.score}/100</strong><span class="ab-bar" aria-hidden="true"><i data-ab-bar style="width:${r.score}%"></i></span></td><td><strong data-ab-criticality>${crit.rows.get(r.id).score}/100</strong><span class="ab-bar ab-critical-bar" aria-hidden="true"><i style="width:${crit.rows.get(r.id).score}%"></i></span></td>${['C',...abKeys].map(k=>`<td>${r.levels[k]}</td>`).join('')}<td>${e(r.confidence)}</td></tr>`).join('');
 const cards=data.rows.map(r=>`<details class="h2-record ab-card" id="ab-${e(r.id)}" data-ab-card="${e(r.id)}"><summary><span><b data-ab-card-score>${e(r.id)} · ${r.score}/100</b> · ${e(r.intervention)}</span><span>C${r.levels.C} · ${e(r.confidence)}</span></summary><div class="h2-record-body"><p><strong>Problema:</strong> ${e(r.title)}</p><p><strong>Población y alcance:</strong> ${e(r.scope)}</p><p><strong>Mecanismo:</strong> ${e(r.mechanism)}</p><p><strong>Resultado controlable:</strong> ${e(r.result)}</p><p class="rank31-limit"><strong>Fuera de alcance:</strong> ${e(r.outside)}</p><p><strong>Alternativa convencional:</strong> ${e(r.conventional)}</p><p><strong>Insumos:</strong> ${e(r.inputs)}</p><p><strong>Condición operativa:</strong> ${e(r.condition)}</p><p><strong>Familia reutilizable:</strong> ${e(r.family)}. No sumar beneficios de intervenciones compartidas.</p>
 ${r.components.map(c=>`<article class="rank31-criterion"><h3 data-ab-title="${c.key}">${e(m.criteria.find(x=>x.key===c.key).name)} · ${c.level}/5 · ${c.key==='C'?'factor '+c.level+'/5':m.weights[c.key]+'%'}</h3><p><strong>${e(c.basis)}</strong>. ${e(c.reason)}</p><ul class="h2-evidence-list">${c.refs.map(source).join('')}</ul></article>`).join('')}
 <p><strong>Confianza ${e(r.confidence)}:</strong> ${e(r.publicationLimit)}</p><ul>${r.assumptions.map(x=>`<li>${e(x)}</li>`).join('')}</ul>
 <p><strong>Sensibilidad del escenario original:</strong> otros pesos ${span(r.weightScoreRange)} puntos y puestos ${span(r.weightRankRange)}; un nivel a la vez ${span(r.judgmentScoreRange)} puntos y puestos ${span(r.judgmentRankRange)}. Con D y A reducidos un nivel conjuntamente: ${r.conservativeScore}. Estos rangos no se recalculan al editar pesos y no son intervalos estadísticos.</p><p>${e(r.reviewTrigger)}</p>
 <details><summary>Origen y banco completo · ${r.allClaimIds.length} hallazgos</summary><p>La selección de citas sustenta el juicio; el banco conserva contexto y contraevidencia. Los estudios que se repiten no son muestras adicionales. Los 245 hallazgos mantienen su estado heredado de verificación.</p><ul class="h2-evidence-list">${r.allClaimIds.map(source).join('')}</ul></details>
 <p><a href="${e(links.problem(r.id))}" data-h2-problem="${e(r.id)}">Ficha de ${e(r.id)} en Problemas detectados</a></p></div></details>`).join('');
 return `<div class="interior wrap h2-page ab-page"><div class="stage-label">03 / Abordabilidad</div><h1>Qué puede abordar Simón de Cirene</h1><p class="page-intro"><strong>${scope==='fundaciones'?'Fundaciones':'Tercer sector'}</strong> · 31 intervenciones evaluadas · 155 juicios documentales · ASdC v1.0.</p>
 <p>El puntaje corresponde a una intervención delimitada y su escenario. Muestras mixtas y programas especializados conservan su alcance; el selector no crea una estimación exclusiva por forma jurídica.</p>
 <form class="rank31-weights" data-ab-weights novalidate><fieldset><legend>Ajustar pesos de preparación</legend><p id="ab-weight-help">K/D/E/A deben sumar 100%. C es un factor propio de cada intervención y limita su puntaje: la facilidad de una tarea no compensa la falta de control sobre la causa.</p><div class="rank31-weight-grid">${abKeys.map(k=>`<label for="ab-weight-${k}"><span>${k} · ${e(m.criteria.find(c=>c.key===k).name)}</span><span class="rank31-weight-input"><input type="number" id="ab-weight-${k}" data-ab-weight="${k}" min="0" max="100" step="any" inputmode="decimal" required value="${m.weights[k]}" aria-describedby="ab-weight-help ab-weight-status"><span aria-hidden="true">%</span></span></label>`).join('')}</div><p id="ab-weight-status" data-ab-status role="status" aria-live="polite" aria-atomic="true">Total: 100% · Pesos originales.</p><div class="rank31-weight-actions"><button type="button" data-ab-reset>Restaurar 30 / 25 / 25 / 20</button><button type="button" data-ab-export="csv">Descargar este ranking (CSV)</button><button type="button" data-ab-export="json">Guardar este escenario (JSON)</button></div></fieldset></form>
 <p data-ab-applied>Pesos originales: ${weightText(m.weights)}.</p><p>El control sobre la causa limita el resultado: con C=1, el máximo es 21/100. Cada puntaje evalúa una intervención condicionada; sus fichas muestran insumos, dependencias y confianza. La eficacia todavía no está medida.</p>
 <div class="h2-actions"><a href="#ab-method">Método, calibración y fuentes</a><a href="${e(links.criticality)}" data-go="criticidad">Ver criticidad</a><a href="${e(links.methods)}" data-go="metodos" data-method-target="abordabilidad">Métodos y fuentes</a><a href="/analisis/abordabilidad-31-v1.csv" download>CSV original</a><a href="/analisis/abordabilidad-31-v1.json" download>Datos y escenarios originales</a></div>
 <h2 id="ab-ranking-title">Ranking y cruce con criticidad</h2><p data-ab-criticality-note>Criticidad con ${weightText(crit.weights)}. Se conserva tu escenario de Criticidad durante la visita. Los índices se muestran por separado.</p><p>Los empates comparten puesto. Abre una ficha para ver el resultado controlable, sus fuentes y lo que queda fuera de alcance.</p>
 <div class="h2-table-scroll" role="region" aria-label="31 intervenciones, abordabilidad y criticidad" tabindex="0"><table class="h2-table ab-table"><thead><tr><th>Puesto</th><th>Problema e intervención</th><th>ASdC</th><th>Criticidad</th>${['C',...abKeys].map(k=>`<th><abbr title="${e(m.criteria.find(c=>c.key===k).name)}">${k}</abbr></th>`).join('')}<th>Confianza</th></tr></thead><tbody>${rows}</tbody></table></div>
 <h2>Intervenciones, fundamentos y condiciones</h2><div data-ab-cards>${cards}</div>
 <details class="h2-record" id="ab-method"><summary>Rúbrica, cálculo, calibración y fuentes de SdC</summary><div class="h2-record-body"><p>${e(m.formula)}</p><p>${e(m.controlRule)}</p><p>${e(m.meaning)}</p><p>${e(m.unit)}</p><p>${e(m.scenario)}</p>${m.criteria.map(c=>`<h3>${e(c.name)} · ${c.key==='C'?'factor limitante':c.weight+'% original'}</h3><ul>${c.anchors.map(x=>`<li>${e(x)}</li>`).join('')}</ul>`).join('')}
 <h3>Calibración antes de los 31</h3><ul>${data.calibration.cases.map(c=>`<li>${c.id}: ${e(c.correction)} Resultado ${c.scoreBefore}→${c.scoreAfter}.</li>`).join('')}</ul><p>El contraste de suma simple permite que P15 llegue a53 frente a16 con factor de control. Se mantiene el factor para que una tarea sencilla no parezca resolver decisiones externas.</p><p>${e(m.sensitivity)}</p><p>${e(m.confidence)}</p><p>${e(m.missing)}</p><p>${e(m.sources)}</p><p>${e(m.overlap)}</p><h3>Fuentes institucionales de encaje</h3><ul>${m.institutionalSources.map(s=>source(s.id)).join('')}</ul></div></details>
 <section class="ab-next"><h2>Siguiente etapa: oportunidades</h2><p>Comparar intervenciones concretas con alternativas convencionales, beneficio incremental de IA y condiciones de una posible herramienta pagada. Los puntajes de esta etapa no prueban que IA sea necesaria o que exista disposición a pagar.</p></section></div>`;
}

export function mountAb(root,data,critical){
 const form=root.querySelector('[data-ab-weights]');if(!form)return;
 let session=sessions.get(data);if(!session){session={draft:{...data.method.weights},applied:{...data.method.weights}};sessions.set(data,session);}
 const inputs=Object.fromEntries(abKeys.map(k=>[k,form.querySelector(`[data-ab-weight="${k}"]`)]));
 const nodes=new Map([...root.querySelectorAll('[data-ab-row]')].map(n=>[n.dataset.abRow,n]));
 const cards=new Map([...root.querySelectorAll('[data-ab-card]')].map(n=>[n.dataset.abCard,n]));
 const paint=()=>{
  const rows=abRanking(data.rows,session.applied);
  for(const r of rows){const n=nodes.get(r.id),c=cards.get(r.id);n.querySelector('[data-ab-rank]').textContent=r.rank;n.querySelector('[data-ab-score]').textContent=`${r.score}/100`;n.querySelector('[data-ab-bar]').style.width=r.score+'%';c.querySelector('[data-ab-card-score]').textContent=`${r.id} · ${r.score}/100`;
   for(const k of abKeys)c.querySelector(`[data-ab-title="${k}"]`).textContent=`${data.method.criteria.find(x=>x.key===k).name} · ${r.levels[k]}/5 · ${fmt(session.applied[k])}%`;
  }
  root.querySelector('.ab-table tbody').append(...rows.map(r=>nodes.get(r.id)));root.querySelector('[data-ab-cards]').append(...rows.map(r=>cards.get(r.id)));
  root.querySelector('[data-ab-applied]').textContent=`Escenario aplicado: ${weightText(session.applied)}. C se conserva en cada intervención.`;
 };
 const update=()=>{
  session.draft=Object.fromEntries(abKeys.map(k=>[k,inputs[k].value]));const v=validateAbWeights(session.draft);form.dataset.valid=String(v.valid);
  for(const k of abKeys)inputs[k].setAttribute('aria-invalid',String(v.invalid.includes(k)));
  for(const b of form.querySelectorAll('[data-ab-export]'))b.disabled=!v.valid;
  const status=form.querySelector('[data-ab-status]');
  if(v.valid){session.applied=v.weights;paint();status.textContent='Total: 100% · Ranking actualizado.';}
  else status.textContent=(v.total===null?'Completa porcentajes entre 0 y 100.':`Total: ${fmt(v.total)}%. Los pesos deben sumar 100%.`)+` Cambios sin aplicar; se conserva ${weightText(session.applied)}.`;
 };
 for(const k of abKeys)inputs[k].value=session.draft[k];paint();update();
 form.addEventListener('input',ev=>{if(ev.target.matches('[data-ab-weight]'))update();});form.addEventListener('submit',ev=>ev.preventDefault());
 form.querySelector('[data-ab-reset]').addEventListener('click',()=>{for(const k of abKeys)inputs[k].value=data.method.weights[k];update();});
 form.addEventListener('click',ev=>{
  const b=ev.target.closest('[data-ab-export]');if(!b||b.disabled||!validateAbWeights(session.draft).valid)return;
  const crit=comparison(critical),rows=abRanking(data.rows,session.applied);
  let text,type,name;
  if(b.dataset.abExport==='json'){
   text=JSON.stringify({methodVersion:data.version,scenario:{preparationWeights:session.applied,criticalityWeights:crit.weights,control:'C original por intervención'},baselineMethod:data.method,inputHashes:data.inputHashes,rows:rows.map(r=>{
    const {weightScoreRange,weightRankRange,judgmentScoreRange,judgmentRankRange,judgmentScenarios,conservativeScore,additiveComparator,...current}=r;
    return {...current,criticality:crit.rows.get(r.id).score,baselineSensitivity:{weightScoreRange,weightRankRange,judgmentScoreRange,judgmentRankRange,judgmentScenarios,conservativeScore,additiveComparator}};
   })},null,2);type='application/json';name='abordabilidad_31_escenario.json';
  }else{
   const encode=v=>'"'+String(v).replaceAll('"','""')+'"';
   const header=['puesto','problema','intervencion','ASdC','criticidad','C','K_peso','D_peso','E_peso','A_peso','I_peso_criticidad','F_peso_criticidad','A_peso_criticidad','U_peso_criticidad','confianza','condicion'];
   text='\uFEFF'+[header,...rows.map(r=>[r.rank,r.id,r.intervention,r.score,crit.rows.get(r.id).score,r.levels.C,...abKeys.map(k=>session.applied[k]),...['I','F','A','U'].map(k=>crit.weights[k]),r.confidence,r.condition])].map(r=>r.map(encode).join(',')).join('\r\n')+'\r\n';type='text/csv;charset=utf-8';name='abordabilidad_31_escenario.csv';
  }
  const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
 });
}
