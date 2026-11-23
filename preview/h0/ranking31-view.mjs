const keys = ['I','F','A','U'];
const link = (url,label,e) => /^https:\/\//.test(url||'') ? `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)}</a>` : e(label);
const range = (a,e) => a.map(e).join('–');

export function renderRanking31(data,bank,links,e) {
 if (!data?.rows || data.rows.length!==31) return '';
 const {method:m,rows}=data;
 const findings=new Map(bank.findings.map(x=>[x.id,x]));
 const sources=new Map(bank.sources.map(x=>[x.id,x]));
 const cited=(id)=>{
  const x=findings.get(id);
  return `<li><strong>${e(id)}</strong> · ${e(x.claim_text)}<br><small>${e(sources.get(x.F)?.title||x.F)} · Origen atribuido: ${e(x.root_credited)}</small><br>${x.locators.map(l=>link(l.url,l.label,e)).join(' · ')}</li>`;
 };
 const supplemental = id => {
  const s=data.existingP13Studies?.find(x=>x.id===id);
  return s ? `<li><strong>${e(id)} · estudio previamente recopilado</strong> · ${e(s.finding)}<br><small>${e(s.population)} ${e(s.role)} ${e(s.verification)}</small><br>${link(s.url,s.locator,e)}</li>` : '';
 };
 const table=rows.map(r=>`<tr data-rank31-row="${e(r.id)}"><td data-rank31-rank>${r.rank}</td><th scope="row"><a href="#criterios-${e(r.id)}">${e(r.id)} · ${e(r.title)}</a><small>${e(r.scope)}</small></th><td><strong data-rank31-score>${r.score}/100</strong></td>${r.components.map(c=>`<td>${c.level}</td>`).join('')}<td>${e(r.confidence)}</td><td>${r.rank}</td></tr>`).join('');
 const details=rows.map(r=>`<details class="h2-record rank31-detail" id="criterios-${e(r.id)}" data-rank31-detail="${e(r.id)}"><summary><span><b data-rank31-detail-score>${e(r.id)} · ${r.score}/100</b> · ${e(r.title)}</span><span>Confianza ${e(r.confidence)}</span></summary><div class="h2-record-body"><p><strong>Población y contexto:</strong> ${e(r.scope)}</p>
  ${r.components.map(c=>`<article class="rank31-criterion"><h3 data-rank31-criterion-title="${e(c.key)}">${e(m.criteria.find(x=>x.key===c.key).name)} · ${c.level}/5 · ${m.weights[c.key]}%</h3><p><strong>${e(c.basis)}</strong>. ${e(c.reason)}</p><ul class="h2-evidence-list">${c.refs.map(cited).join('')}${(c.supplementalRefs||[]).map(supplemental).join('')}</ul></article>`).join('')}
  <p class="rank31-limit"><strong>Límites y contraevidencia:</strong> ${e(r.limit)}</p>
  <p><strong>Sensibilidad del ranking original:</strong> ${range(r.weightScoreRange,e)} puntos; puestos ${range(r.weightRankRange,e)}. <strong>Un nivel inferido a la vez:</strong> ${range(r.judgmentScoreRange,e)} puntos; puestos ${range(r.judgmentRankRange,e)}. Estos rangos corresponden a los pesos originales I35/F25/A25/U15. Son escenarios, no intervalos estadísticos; no se modifican todos los problemas a la vez.</p>
  <details><summary>Dependencia de los orígenes citados</summary><p>${e(r.originNote)} Si se retira un origen, las dimensiones indicadas perderían todo su apoyo citado y requerirían revisión; no se sustituyen por cero.</p><ul>${r.originRemoval.map(o=>`<li>${e(o.origin)}: ${o.componentsLosingAllCitedSupport.length ? 'revisar '+e(o.componentsLosingAllCitedSupport.join(', ')) : 'conserva al menos otra cita por criterio; no prueba independencia'}</li>`).join('')}</ul></details>
  <details class="rank31-bank"><summary>Banco completo de ${e(r.id)} · ${r.allClaimIds.length} hallazgos · ${r.publicationIds.length} publicaciones</summary><p>Las citas de los criterios sustentan el puntaje; este banco conserva también contexto, recomendaciones y contraevidencia. No todas las publicaciones miden el problema y no añaden puntos por su cantidad.</p><ul class="h2-evidence-list">${r.allClaimIds.map(cited).join('')}</ul></details>
  <p><a href="${e(links.problem(r.id))}" data-h2-problem="${e(r.id)}">Ficha de ${e(r.id)} en el mapa</a></p></div></details>`).join('');
 return `<section id="ranking-31" class="rank31" aria-labelledby="ranking31-title"><p class="h2-closure-status">23 de noviembre de 2026 · Método v0.3 · 31 de 31 puntuados</p><h2 id="ranking31-title">Ranking documental provisional</h2>
 <form class="rank31-weights" data-rank31-weights aria-labelledby="rank31-weights-title" novalidate>
 <fieldset><legend id="rank31-weights-title">Ajustar pesos del ranking</legend><p id="rank31-weights-help">Introduce porcentajes que sumen 100%. Al completar una combinación válida se actualizan los 31 puntajes y su orden; los empates conservan el mismo puesto.</p>
 <div class="rank31-weight-grid">${keys.map(k=>`<label for="rank31-weight-${k}"><span>${e(k)} · ${e(m.criteria.find(c=>c.key===k).name)}</span><span class="rank31-weight-input"><input id="rank31-weight-${k}" data-rank31-weight="${k}" name="${k}" type="number" inputmode="decimal" min="0" max="100" step="any" required value="${m.weights[k]}" aria-describedby="rank31-weights-help rank31-weight-status"><span aria-hidden="true">%</span></span></label>`).join('')}</div>
 <p id="rank31-weight-status" data-rank31-weight-status role="status" aria-live="polite" aria-atomic="true">Total: 100% · Pesos originales.</p>
 <div class="rank31-weight-actions"><button type="button" data-rank31-reset>Restaurar 35 / 25 / 25 / 15</button><button type="button" data-rank31-export="csv">Descargar este ranking (CSV)</button><button type="button" data-rank31-export="json">Guardar este escenario (JSON)</button></div>
 <p class="rank31-weight-note">Los pesos personalizados son escenarios de exploración. La evidencia, los niveles I/F/A/U y la confianza se mantienen; el ranking original sigue disponible para comparar.</p></fieldset></form>
 <p data-rank31-applied>Pesos originales: I 35% · F 25% · A 25% · U 15%.</p>
 <p>${e(m.scope)}</p><p><strong>${e(m.meaning)}</strong></p><p>Todos los niveles son juicios analíticos. «Anclaje observado» identifica un dato directo que orienta el nivel; «Inferencia documental» identifica el razonamiento del analista. La confianza se informa aparte y no descuenta puntos.</p>
 <div class="h2-actions"><a href="#rubrica-31">Ver rúbrica y fórmula</a><a href="/analisis/criticidad-31-v03.csv" download>CSV del ranking original</a><a href="/analisis/criticidad-31-v03.json" download>Datos y citas del ranking original (JSON)</a></div>
 <div class="rank31-warning"><strong>Comparar exige leer el contexto.</strong> Con los pesos originales, P14=90 valora un escenario hipotético de autonomía, no una crisis observada. P52 y P48 describen modalidades de protección especializada. Sus puntos no indican cuántas fundaciones podrían comprar una solución. Los empates comparten puesto; no se impone un orden entre ellos.</div>
 <div class="h2-table-scroll" role="region" aria-label="Ranking de 31 problemas, tabla desplazable" tabindex="0"><table class="h2-table rank31-table"><thead><tr><th>Puesto</th><th>Problema y grupo</th><th>Criticidad</th>${keys.map(k=>`<th><abbr title="${e(m.criteria.find(x=>x.key===k).name)}">${k}</abbr></th>`).join('')}<th>Confianza</th><th>Puesto original</th></tr></thead><tbody>${table}</tbody></table></div>
 <p>Selecciona el nombre de un problema y abre su ficha para ver los cuatro fundamentos y las fuentes. La última columna conserva el puesto original. Las fichas incluyen los rangos de sensibilidad del ranking original, basados en diez escenarios; no son intervalos de confianza.</p>
 <details class="h2-record" id="rubrica-31"><summary>Rúbrica común, fórmula y límites · v0.3</summary><div class="h2-record-body"><p>${e(m.decision)}</p><p><strong>${e(m.formula)}</strong></p>
 ${m.criteria.map(c=>`<h3>${e(c.name)} · ${c.weight}%</h3><p>${e(c.definition)}</p><ul>${c.anchors.map(a=>`<li>${e(a)}</li>`).join('')}</ul>${c.caution?`<p>${e(c.caution)}</p>`:''}`).join('')}
 ${['missing','confidence','sources','overlap','sensitivity','exclusions'].map(k=>`<p>${e(m[k])}</p>`).join('')}
 <p>Los pesos mantienen I35/F25/A25/U15 del método previo; no se ajustaron para producir un número objetivo de P13. Los umbrales y niveles son convenciones revisables. Banco congelado: 26 publicaciones, 31 problemas, 147 vínculos, 245 hallazgos; no se realizó nueva investigación.</p></div></details>
 <h2>Fundamento de cada problema</h2><div data-rank31-details>${details}</div></section>`;
}
