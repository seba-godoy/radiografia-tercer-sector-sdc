# PX-1.2 · Contrato mínimo de datos para vista previa

**Estado:** propuesta de contrato v0.1.0, documentada y testeada; **NO es una migración de todo el catálogo** ni implica que Juanra haya aprobado el esquema. Audiencia: Juanra principal, DIMI secundaria; soporte de la presentación, no nuevo producto para fundaciones.

## Qué se agregó
- `schemas/px12-preview-contract.schema.json`: JSON Schema Draft 2020-12, tipos cerrados y claves requeridas.
- `fixtures/px12-preview-examples.json`: ejemplo **derivado del catálogo real** con P20, P25 y P48, claims F03/F26, vínculos P×S existentes, tareas y comparadores hipotéticos del dossier T3.
- `scripts/validate_preview_contract.py`: validación de esquema, referencias cruzadas, reconciliación con A/B/S, deduplicación y pruebas negativas.
- La CI existente ejecuta tanto `validate_baseline.py` como esta validación.

## Granularidad y entidades
| Entidad | Granularidad y clave | Riesgo que previene |
|---|---|---|
| Source | Fxx = ficha documental, **no necesariamente estudio independiente** | F11/F12 comparten `study_id`; faltantes sin `origin` siguen `null` |
| SourceVersion | id de foto del catálogo, no inventa edición original ni hash de PDF | No llamar «original verificado» a un snapshot |
| Claim | una afirmación por pregunta/localizador, independiente de P | No mezclar 62% P20 y 42% de otra pregunta |
| Problem | Pxx del catálogo A, banda B editorial, `weighted_score:null` | ND no es cero ni cifra nacional |
| Segment | Sxx, corte descriptivo no necesariamente exclusivo | Evita sumar públicos heterogéneos |
| EvidenceLink | claim ↔ problema, con fuente y relación 0/0.5/1 | No contar relación 0 como estudio confirmatorio |
| ProblemSegment | P×S×F + `kind` base/candidate, nunca filtra bases de claim automáticamente | 87 cruces parciales no equivalen a todas las combinaciones |
| Task | una hipótesis de tarea concreta vinculada a P y límites de control | Una herramienta no resuelve causa externa |
| Alternative | opción IA hipotética o comparador convencional, con tareas P | Construir con Codex no equivale a IA operativa |
| Opportunity | comparación de alternativa contra comparador; métrica/costo/adopción **null** | Prohibición de inventar beneficios o cuadrantes |
| Review | estado humano pendiente y sin firma ni fecha falsas | CI PASS no equivale a aprobación de Juanra |

## Relaciones y reglas duras
1. Ficha `Source` → `SourceVersion` → `Claim` → `EvidenceLink` → `Problem` (M:N). `ProblemSegment` conecta P/S a través de una F que **no cambia** el denominador del claim.
2. `Task.problem_ids` y `Alternative.problem_ids/task_ids` son relaciones M:N; `Opportunity` exige una tarea y una pareja de alternativas diferentes con tarea común.
3. **Conteos A preservados 26/31/121**, B 11/12/8 editorial y C 4 IA/2 convencional. **Fixture es una muestra parcial 3P,2F,3S** y **sus alternativas de comparación NO son seis filas C nuevas**.
4. `statistic.denominator:null` y `weighted_score:null` representan desconocimiento, jamás cero. No derivar numeradores a partir de porcentajes redondeados.
5. Cada claim tiene `question_key`, población, período (o null), localizador, URL exacta y estado de revisión. P20 62% N125, otro claim P20 42% con base exacta NO acreditada; P25 57% N255 es **actitud declarada**; P48 cualitativo F26 sin tasa nacional.
6. `study_id` = origen de investigación cuando está documentado. F11/F12 comparten IFO, NO dos estudios independientes. Si falta `origin`, usar `null` y bloquear conteos de independencia, no usar Fxx como sustituto.
7. `status="candidate"` en un cruce significa recorte para investigar, NO observación concluida. P48/S106 está candidate.
8. Prohibido reescribir el JSON embebido, rankings o las páginas históricas por esta especificación. No publicar nuevas pantallas todavía.

## Adaptador sugerido sin backend (PX-V0.1)
Leer A desde copia inmutable del JSON embebido y B/S desde sus JSON del repositorio. Aplicar el contrato en capa **read-only**, con fixtures para P20/P48/P25 y pruebas. La futura página puede mostrar portada + mapa 31 P + panel de evidencia, no necesita la migración completa ni base de datos. Los dominios P02/P11 faltan; dejar «sin clasificar» hasta curación. P30/P54 sin cross → **«sin relación documentada»**, no «no afecta». La interfaz no filtra una tasa nacional al cambiar de segmento.

## Umbral de aceptación y límites
- CI: JSON Schema válido, fixture validado; IDs únicos, FK íntegros, tipo/sentido de uniones y comparadores; negativos deliberados rechazados.
- Revisiones externas, validez de páginas PDF, experiencia real de usuario, costos y protección de acceso: **ND**. La URL actual pública no se vuelve privada por cambiar el contrato.
- Próximo paso recomendado: **PX-V0.1 · primera vista previa no publicada**, limitada a portada + mapa + evidencia y casos P20/P48, en rama/preview aislada; la microtarea PX-1.3 (dedupe completo) sigue pendiente.

**Referencias del método:** https://json-schema.org/draft/2020-12 y https://www.w3.org/TR/prov-dm/ . Son estándares de modelado, no sustituyen auditoría de fuente.

**Corte exacto de lectura:** main `a86c3f61570fd4399b366a2b6cf520067634a777`, blob A `c9e36797aedd89c625755e4c5518244519806325`. La raíz del repositorio es pública; no incorporar IDs de Notion/Drive internos aquí.
