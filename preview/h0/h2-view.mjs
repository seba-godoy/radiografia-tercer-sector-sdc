const criteria = [
  ["I", "Impacto", "Qué daño produce cuando ocurre."],
  ["F", "Recurrencia", "Cuántas veces se repite por organización."],
  ["A", "Alcance", "Qué proporción del grupo elegible lo reporta."],
  ["U", "Urgencia", "Cuánto tiempo queda para evitar el daño."]
];

const evidenceLabels = {
  alcance_muestral: "Alcance muestral",
  resultado_reportado_sin_magnitud: "Resultado reportado",
  mecanismo_con_efecto_reportado: "Efecto descrito",
  mecanismo_sin_tasa: "Indicio cualitativo",
  indicio_operativo: "Indicio operativo",
  duracion_pasada: "Duración observada",
  medicion_anual_otra_poblacion: "Medición en otra población",
  caso_cuantificado_no_comparable: "Caso documentado",
  escenario_hipotetico: "Escenario hipotético",
  percepcion_muestral: "Percepción encuestada",
  contexto_y_medida_de_otra_conducta: "Contexto de reporte",
  caso_fundacion_y_contexto_sectorial: "Caso y evidencia sectorial",
  capacidad_autodiagnosticada: "Autodiagnóstico",
  indicio_sin_atribucion: "Indicio sin atribución",
  plazo_sin_dano_atribuido: "Plazo documentado",
  sin_medida: "Datos insuficientes"
};

const populationLabels = {
  especifica: "Mención específica de fundaciones",
  mixta: "Muestra mixta",
  general: "Organizaciones sociales en general",
  sectorial: "Evidencia de programas",
  contextual: "Contexto complementario",
  pendiente: "Población por aclarar",
  solo_otras_formas: "Otras formas jurídicas"
};

const contrasts = [
  ["Continuidad de la atención", "P02 documenta cierre de proyectos por no renovación. Para compararlo con P16, falta saber cuántas atenciones se perdieron por transferencias tardías o si hubo reemplazo oportuno."],
  ["Alcance declarado en convenios", "P20 (62%), P16 (57%) y P02 (28%). Muestra mixta de 125 fundaciones y corporaciones con convenios estatales, referencia 2025. Son proporciones de reporte; los datos de daño siguen incompletos."],
  ["Operación y protección especializada", "P16 documenta dificultades de caja. P13 reúne casos de consecuencias operativas y P28 recoge dificultades de retención declaradas. P48 se estudia dentro de programas de protección especializada."]
];

function external(url, label, esc) {
  if (!/^https:\/\//i.test(url || "")) return esc(label);
  return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

function mapLink(row, links, esc) {
  return `<a href="${esc(links.problem(row.id))}" data-h2-problem="${esc(row.id)}">Ficha de ${esc(row.id)} en el mapa</a>`;
}

function observation(obs, esc) {
  const base = obs.n == null ? "Base no desglosada" : `Base: ${obs.n} · ${obs.unidad_n || "unidad según fuente"}`;
  return `<li><p>${esc(obs.texto)}</p><small>${esc(obs.poblacion)} · ${esc(obs.periodo)} · ${esc(base)}</small><small>${esc(obs.limitacion)}</small><small>${external(obs.url, `${obs.fuente} · ${obs.localizador}`, esc)}</small></li>`;
}

function sourceList(references, evidence, esc) {
  return references.map(ref => {
    const source = evidence.references[ref];
    return `<li>${external(source.url, `${source.title} · ${source.locator}`, esc)}</li>`;
  }).join("");
}

function researchClosures(evidence, scope, esc) {
  return Object.entries(evidence.closures || {}).map(([id, closure]) => {
    const date = new Intl.DateTimeFormat("es-CL", {dateStyle: "long", timeZone: "UTC"})
      .format(new Date(closure.date));
    return `<section class="h2-closure" id="h2-closure-${esc(id)}" aria-labelledby="h2-closure-title-${esc(id)}">
      <p class="h2-closure-status">Investigación cerrada · <time datetime="${esc(closure.date)}">${esc(date)}</time></p>
      <h2 id="h2-closure-title-${esc(id)}">${esc(id)} · ${esc(closure.title)}</h2>
      <div class="h2-closure-findings">${closure[scope].findings.map(item => `<article>
        <h3>${esc(item.title)}</h3><p>${esc(item.finding)}</p>
        <ul class="h2-sources">${sourceList(item.references, evidence, esc)}</ul>
      </article>`).join("")}</div>
      <p class="h2-closure-limits">${esc(closure.limits)}</p>
    </section>`;
  }).join("");
}

function pilotTable(rows, evidence, links, esc) {
  const body = rows.map(row => {
    const closed = Object.hasOwn(evidence.closures || {}, row.id);
    const cells = criteria.map(([id, title]) => {
      const cell = evidence.pilot[row.id][id];
      const sources = sourceList(cell.references, evidence, esc);
      return `<td><details class="h2-cell"><summary aria-label="${esc(row.id)} · ${esc(title)} · ${esc(evidenceLabels[cell.status])}">
        <span>${esc(evidenceLabels[cell.status])}</span><span aria-hidden="true" class="h2-expand">+</span>
        </summary><div class="h2-cell-body"><p>${esc(cell.finding)}</p><p class="h2-scope">${esc(cell.scope)}</p>
        <p><strong>${closed ? "Límite" : "Falta medir"}</strong> ${esc(cell.gap)}</p><ul class="h2-sources">${sources}</ul></div></details></td>`;
    }).join("");
    return `<tr data-h2-pilot="${esc(row.id)}"><th scope="row"><span class="h2-code">${esc(row.id)}</span>
      ${esc(row.titulo)}<small>${mapLink(row, links, esc)}</small></th>${cells}</tr>`;
  }).join("");
  return `<section aria-labelledby="h2-pilot-title"><div class="h2-section-head"><div><h2 id="h2-pilot-title">Comparación de criticidad · ${rows.length} de 31</h2>
    <p>Abre una celda para ver el hallazgo, su población, los datos faltantes y las fuentes.</p></div></div>
    <div class="h2-table-scroll" role="region" aria-label="Comparación de criticidad, tabla desplazable" tabindex="0">
      <table class="h2-table"><thead><tr><th scope="col">Problema</th>${criteria.map(([, title, definition]) =>
        `<th scope="col">${title}<small>${definition}</small></th>`).join("")}</tr></thead><tbody>${body}</tbody></table>
    </div><p class="h2-table-hint">Desliza horizontalmente para ver todos los criterios.</p>
    <div class="h2-contrasts">${contrasts.map(([title, copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></section>`;
}

function sectorItem(row, context, links, esc) {
  const view = row.vistas.tercer_sector;
  const groups = Object.entries(view.hallazgos_por_poblacion).map(([population, ids]) => {
    const findings = ids.map(id => context.findings.get(id)).filter(Boolean).map(finding => {
      const source = context.sources.get(finding.F);
      const refs = finding.locators.map(ref => external(ref.url, `${source?.title || finding.F} · ${ref.label}`, esc)).join(" · ");
      return `<li><p>${esc(finding.claim_text)}</p><small>${refs}</small></li>`;
    }).join("");
    return `<details class="h2-source-group"><summary>${esc(populationLabels[population] || population)} · ${ids.length}</summary>
      <ul class="h2-evidence-list">${findings}</ul></details>`;
  }).join("");
  const count = Object.values(view.hallazgos_por_poblacion).reduce((sum, ids) => sum + ids.length, 0);
  return `<details class="h2-record" data-h2-sector="${esc(row.id)}"><summary><span><b class="h2-code">${esc(row.id)}</b> ${esc(row.titulo)}</span>
    <span class="h2-record-meta">${count} hallazgos</span></summary><div class="h2-record-body">
    <h3>Observaciones de referencia</h3><ul class="h2-evidence-list">${row.observaciones_de_fuente.map(obs => observation(obs, esc)).join("")}</ul>
    <h3>Hallazgos por población</h3>${groups}<p>${mapLink(row, links, esc)}</p></div></details>`;
}

function gapList(row, scope, pilot, esc) {
  return `<ul class="h2-gaps">${criteria.map(([key, label]) =>
    `<li><b>${label}</b> ${esc(pilot ? pilot[key].gap : row.vistas[scope].criterios[key].dato_faltante)}</li>`).join("")}</ul>`;
}

function task(row, {scope, pilot, note, first, closed}, links, esc) {
  const status = closed ? "Investigación cerrada" : first ? "Primer bloque" : "";
  const detail = closed
    ? `<p><a href="#h2-closure-${esc(row.id)}">Ver el cierre y sus fuentes</a></p>`
    : gapList(row, scope, pilot, esc);
  return `<details class="h2-record" data-h2-task="${esc(row.id)}"><summary><span><b class="h2-code">${esc(row.id)}</b> ${esc(row.titulo)}</span>
    ${status ? `<span class="h2-record-meta">${status}</span>` : ""}</summary>
    <div class="h2-record-body">${note ? `<p>${esc(note)}</p>` : ""}${detail}
    <p>${mapLink(row, links, esc)}</p></div></details>`;
}

function researchPlan(rows, pilotRows, deferredRows, evidence, scope, links, esc) {
  const foundations = scope === "fundaciones";
  const note = "La investigación actual avanza problema por problema. Primero se estudian ingresos, reservas, equipo y otras capacidades internas. Los convenios y trámites estatales quedan para el bloque final. P14, meses de operación sin nuevos aportes, es el siguiente problema.";
  const closed = row => Object.hasOwn(evidence.closures || {}, row.id);
  const groups = foundations
    ? `<div data-h2-research="pilot"><h3>8 casos del piloto</h3>${pilotRows.map(row =>
      task(row, {scope, pilot: evidence.pilot[row.id], closed: closed(row)}, links, esc)).join("")}</div>
      <div data-h2-research="deferred"><h3>23 problemas por profundizar</h3>${deferredRows.map(row =>
        task(row, {scope, note: evidence.deferred[row.id], first: evidence.proposedBatch.includes(row.id)}, links, esc)).join("")}</div>`
    : `<div data-h2-research="sector"><h3>31 problemas y su estado de investigación</h3>${rows.map(row =>
      task(row, {scope, closed: closed(row), first: evidence.proposedBatch.includes(row.id)}, links, esc)).join("")}</div>`;
  return `<section class="h2-research" aria-labelledby="h2-research"><h2 id="h2-research">Próximos pasos de investigación</h2><p>${note}</p>${groups}</section>`;
}

export function h2Render(contract, evidence, bank, scope, links, esc) {
  if (!contract || !evidence || !bank) {
    return '<div class="interior wrap"><h1>Criticidad</h1><p>La comparación no está disponible en esta visita.</p><a href="/criticidad?scope=' +
      esc(scope) + '">Volver a cargar Criticidad</a></div>';
  }
  const foundations = scope === "fundaciones";
  const rows = [...contract.problemas].sort((a, b) => a.titulo.localeCompare(b.titulo, "es-CL"));
  const pilot = rows.filter(row => Object.hasOwn(evidence.pilot, row.id));
  const batchOrder = new Map(evidence.proposedBatch.map((id, index) => [id, index]));
  const afterBatch = batchOrder.size;
  const deferred = rows.filter(row => !Object.hasOwn(evidence.pilot, row.id))
    .sort((a, b) => (batchOrder.get(a.id) ?? afterBatch) - (batchOrder.get(b.id) ?? afterBatch));
  const context = {
    findings: new Map(bank.findings.map(finding => [finding.id, finding])),
    sources: new Map(bank.sources.map(source => [source.id, source]))
  };
  const intro = foundations
    ? "Compara los ocho casos investigados en profundidad. La prioridad sigue indeterminada donde faltan mediciones comparables."
    : "Consulta la evidencia descriptiva de los 31 problemas y qué población cubre cada hallazgo. La comparación de criticidad por tipo de organización queda pendiente.";
  return `<div class="interior wrap h2-page">
    <div class="page-top"><div><div class="stage-label">02 / Criticidad</div><h1>Criticidad de los problemas</h1>
    <p class="page-intro"><strong>${foundations ? "Fundaciones" : "Tercer sector"}</strong> · ${intro}</p></div>
    <a href="#h2-research" class="outline-btn">Ir a próximos pasos ↓</a></div>
    <div class="h2-actions"><a href="${esc(links.map)}" data-go="problemas">Ver mapa de 31 problemas</a>
      <a href="${esc(links.methods)}" data-go="metodos" data-method-target="criticidad">Métodos y fuentes</a></div>
    ${researchClosures(evidence, scope, esc)}
    ${foundations ? pilotTable(pilot, evidence, links, esc)
      : `<section aria-labelledby="h2-sector-title"><h2 id="h2-sector-title">31 problemas documentados</h2>
        <p>Abre un problema para ver las observaciones de referencia y los hallazgos agrupados por población.</p>
        ${rows.map(row => sectorItem(row, context, links, esc)).join("")}</section>`}
    ${researchPlan(rows, pilot, deferred, evidence, scope, links, esc)}
  </div>`;
}
