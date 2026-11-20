function link(url, label, esc) {
  return /^https:\/\//i.test(url || '') ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>` : esc(label);
}

export function renderP13Application(data, scope, esc) {
  if (!data) return '';
  const refs = ids => ids.map(id => `<a href="#p13-study-${esc(id)}">${esc(id)}</a>`).join(' · ');
  const rows = data.components.map(c => `<tr><th scope="row">${esc(c.name)} · ${esc(c.weight)}%</th><td><strong>${esc(c.result)}</strong><p>${esc(c.interpretation)}</p></td><td>${esc(c.confidence)}<p>${refs(c.refs)}</p></td><td>${esc(c.next)}</td></tr>`).join('');
  const studies = data.studies.map(s => `<details class="h2-record" id="p13-study-${esc(s.id)}" data-p13-study="${esc(s.id)}"><summary><span>${esc(s.title)}</span></summary><div class="h2-record-body"><p><strong>${esc(s.finding)}</strong></p><p>${esc(s.population)} ${esc(s.period)}</p><p><strong>Qué aporta:</strong> ${esc(s.role)}</p><p><strong>Verificación:</strong> ${esc(s.verification)}</p><p>${link(s.url, s.locator, esc)}</p></div></details>`).join('');
  const publications = data.bankPublications.map(s => `<details class="h2-record" data-p13-publication="${esc(s.id)}"><summary><span><b>${esc(s.id)}</b> · ${esc(s.title)} · ${s.claims.length} hallazgos</span></summary><div class="h2-record-body"><p>${esc(s.role)}</p><p>${link(s.url, 'Abrir publicación', esc)}</p><ul class="p13-bank-claims">${s.claims.map(c => `<li data-p13-claim="${esc(c.id)}"><p><strong>${esc(c.id)}</strong> · ${esc(c.text)}</p><p>${c.locators.map(l => link(l.url, l.label, esc)).join(' · ')}</p><small>${esc(c.verification)}</small></li>`).join('')}</ul></div></details>`).join('');
  return `<section class="h2-closure p13-application" id="p13-aplicacion" data-p13-scope="${esc(scope)}" aria-labelledby="p13-application-title">
    <h2 id="p13-application-title">${esc(data.title)}</h2>
    <p>${esc(data.summary)}</p><p><strong>${esc(data.scope)}</strong></p>
    <div class="h2-index"><h3>${esc(data.headline)}</h3><p>${esc(data.decision)}</p><p><a href="#p13-studies">Ver estudios y sus aportes</a> · <a href="#p13-bank">Ver los 28 hallazgos del banco</a></p></div>
    <div class="p13-application-scroll" role="region" aria-label="Resultados de criticidad de P13, tabla desplazable" tabindex="0"><table class="p13-application-table"><thead><tr><th>Criterio</th><th>Resultado de aplicación</th><th>Confianza y fuentes</th><th>Dato pendiente</th></tr></thead><tbody>${rows}</tbody></table></div>
    <details class="h2-record"><summary>Cálculos y sensibilidad · qué significa 37–68%</summary><div class="h2-record-body"><p>${esc(data.calculations.formula)}</p><p>${esc(data.calculations.roundingNote)}</p><p>${esc(data.calculations.logicalBoundsNote)}</p><p>${esc(data.calculations.sensitivity)}</p></div></details>
    <h3 id="p13-studies">Estudios, resultados y límites</h3>${studies}
    <h3 id="p13-bank">16 publicaciones · 28 hallazgos del banco de P13</h3><p>Estas publicaciones cumplen funciones distintas. Informe y presentación del mismo estudio no son dos muestras. Los estudios adicionales quedan vinculados sin cambiar el catálogo histórico.</p>${publications}
    <h3>Contraevidencia y límites</h3><ul>${data.counterEvidence.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <p><strong>${esc(data.limitations)}</strong></p><p>${esc(data.nextStep)}</p>
  </section>`;
}
