# PX-R1.3 · Contrato funcional y QA del selector global · v1.0.0

**Fecha:** 17 de noviembre de 2026 · **Dificultad:** 5/10 · **Estado:** contrato y pruebas completos; aún sin interfaz HTML implementada.  
**Público:** Juanra y DIMI · **Proyecto:** Radiografía del tercer sector, Simón de Cirene.

## 1. Decisión adoptada y alcance

La web tendrá un selector persistente entre **«Tercer sector»** y **«Fundaciones»** que no simula que las fuentes hablan de la misma población. El primer alcance muestra el catálogo de 31 problemas documentados del universo analítico de OSC/OSFL pertinentes. El segundo los organiza en **tres franjas de atribución**, conservando los casos de contexto y sin reescribir porcentajes.

**Fundación** es una naturaleza jurídica específica; no equivale a corporación, asociación, junta de vecinos ni toda OSC. Referencias: [ChileAtiende, Registro de personas jurídicas sin fines de lucro](https://www.chileatiende.gob.cl/fichas/11333-inscripcion-en-el-registro-de-personas-juridicas-sin-fines-de-lucro), [BCN, Decreto 84/2013, art. 2](https://www.bcn.cl/leychile/navegar?idNorma=1052955) y [BCN, Resolución 343, campo 2.4](https://www.bcn.cl/leychile/navegar?idNorma=1110865). Esta definición no acredita por sí sola el tipo jurídico de los operadores de cada fuente.

**No es un censo**, ni ranking de gravedad ni medición de incidencia. Se respetan 26 fichas de fuentes, 31 problemas, 147 pares problema×fuente, 245 hallazgos localizados y cinco afirmaciones normalizadas. Los 245 textos/citas no fueron cotejados individualmente de nuevo contra PDFs; las clasificaciones son preliminares y requieren verificación puntual antes de usar cifras en una conclusión pública.

## 2. Contrato exacto del selector

| Dimensión | Tercer sector (scope=`tercer_sector`) | Fundaciones (scope=`fundaciones`) |
| --- | --- | --- |
| Alcance | Catálogo documental pertinente a OSC/OSFL | Se distingue qué hallazgos involucran explícitamente fundaciones |
| Fichas iniciales | 31 problemas | **31 fichas conservadas**, organizadas por bandas, no 31 problemas medidos en fundaciones |
| Evidencia directa | Etiquetada por fuente | Banda **Directa** si existe al menos un hallazgo `F_EXCLUSIVA_EXPLICITA` |
| Muestra compartida | Etiquetada y con N original | Banda **Compartida** si existe `M_MIXTA_NO_DESAGREGADA` pero no clase directa |
| Resto de evidencia | General, sectorial, contextual o ND | Banda **Contexto**, sin exclusividad fundacional; accesible y no interpretada como ausencia |
| Conteos | Fichas y citas del catálogo | Fichas y citas del catálogo; **no** número de fundaciones afectadas |
| Porcentajes y N | Fuente, pregunta, territorio y corte originales | **Exactamente los mismos**; no se recalculan por seleccionar el universo |
| Caso sin N o sin P×S | Conservado con estado ND | Conservado con estado ND; sin falso cero |
| Ranking | Solo si se valida en PX-R3 y R5 | No se crean rankings alternativos sin metodología ni datos compatibles |

**Franja = propiedad de lectura de la ficha, no una etiqueta jurídica de todo el problema.** Se calcula con precedencia directa → compartida → contexto, pero la ficha guarda todos los hallazgos etiquetados en **siete clases**, cada uno con su propia fuente y referencia. Un problema puede aparecer en la franja Directa y tener simultáneamente evidencia mixta y sectorial.

**Valores comprobables con el dataset actual:** 6 problemas con alguna evidencia directa, 13 con evidencia compartida sin una directa y 12 solo con contexto. Estas cifras describen clasificación de **fichas**, no prevalencia, ni estudios independientes, ni severidad. En «Tercer sector» aparecen las 31 fichas. «Fundaciones» muestra también 31 por defecto, pero con franjas visibles. El filtro opcional «Ocultar casos de contexto» deja 19 fichas en la lista principal, exhibe el contador de **12 casos contextuales conservados** y permite recuperarlos. No borra nada ni invalida un deep link.

### Las siete clases de hallazgos siguen siendo distintas

- `F_EXCLUSIVA_EXPLICITA` → **directa**; no supone representatividad.
- `M_MIXTA_NO_DESAGREGADA` → **compartida**; no puede generar tasa de fundaciones.
- `G_OSFL_GENERAL` → **general**; universo OSC no necesariamente fundaciones.
- `S_SECTORIAL_SIN_FORMA` → **sectorial**; operadores sin forma jurídica acreditada.
- `I_INFERIDA_POR_VALIDAR` → **contextual**; manuales, estudios internacionales, oferta o percepción de terceros.
- `U_INSUFICIENTE` → **pendiente**; falta clasificación suficiente.
- `X_NO_FUNDACION_EXPLICITA` → **no_fundacion**; evidencia no fundacional, disponible como contexto si es pertinente.

**Guardarraíl:** se explicita siempre «No hay evidencia específica de fundaciones en las fuentes analizadas», nunca «el problema no afecta a fundaciones»; «sin cruce de segmentos» nunca significa «sin segmentos afectados».

## 3. Navegación, persistencia y estados

Portada tipo cuatro tarjetas, **sin resumen ejecutivo**: `/`, `/problemas`, `/criticidad`, `/abordabilidad`, `/oportunidades`. El selector es global y conserva `scope` al cambiar de etapa.

Contrato de URL:
- `scope=tercer_sector|fundaciones` (por defecto tercer sector).
- `p=PXX` identifica el problema abierto; si el ID no existe, se muestra lista sin selección y advertencia, no se inventa ficha.
- `layer=todas|directa|compartida|general|sectorial|contextual|pendiente|no_fundacion`.
- `q=` búsqueda recortada a 100 caracteres y codificada de forma segura.
- `context=off` es **acción explícita de ocultar la banda contextual**, reversible; nunca se pierde `p` ni su referencia por cambiar `scope`.
- `section` está representada por la ruta. Enlaces inválidos vuelven a portada y valor por defecto sin filtrar arbitrariamente.

La lista de resultados se puede filtrar por clase/búsqueda; un aviso y contador informan cuántos problemas quedan fuera de la **vista activa** y siempre hay acción para restaurar. El panel de fuente conserva **ID P, source_id, finding_id, URL, localizador, método, población original y limitación**. Cerrar y volver recuperará problema, capa, búsqueda y universo; scroll/foco visual se implementará y probará en H-0/H-1.

**No se ocultan problemas por reglas de criticidad o abordabilidad aún.** Las transiciones 01→02→03→04 tendrán criterios en sus fases PX-R3–R5, y no se dibujará un ranking ficticio en H-0.

## 4. Invariantes y adversariales

1. **P20/F03:** 62% entre N=125 encuestadas con convenios públicos de muestra mixta. `foundationSpecificRate=null`, no decir «62% de fundaciones chilenas».
2. **P20 segunda pregunta:** 42% de revisión mayor a siete meses tiene `denominator=null` en el catálogo; no sumarla ni imputarle N125.
3. **P48/F26:** testimonios de sobrecupos en programas sectoriales, sin N poblacional y sin forma jurídica de todos los operadores. Debe ser visible como Contexto.
4. **F03 encuentro de 100 fundaciones:** cinco textos del mismo encuentro, no cinco encuestas independientes ni índice de prevalencia.
5. **F11/F12:** una raíz documental IFO 2025; **F09/F04:** cuatro afirmaciones reutilizadas, sin duplicar origen empírico.
6. **P30/P54:** carecer de un vínculo de segmento no significa ausencia de problema.
7. **F27:** registro SISREC vivo, fecha de corte e información original obligatoria; «Fundación» en un nombre no sustituye verificación jurídica.
8. **F28/P32:** dato de oferta de cursos de fortalecimiento no acredita costo interno de preparar memorias.
9. Al cambiar de universo o etapa se conservan el P abierto, referencias, porcentajes, N y texto original. `null` no equivale a cero.
10. No se calcula un ranking ni prevalencia exclusiva de fundaciones hasta que exista la evidencia y validación que requieran las fases posteriores.

La distinción entre datos faltantes e interpretación estadística es coherente con [JRC, evaluación de datos para índices](https://knowledge-for-policy.ec.europa.eu/composite-indicators/toolkit_en/navigation-page/10-step-guide_en/step-2-data-selection_en) y [JRC, análisis de incertidumbre/sensibilidad](https://knowledge-for-policy.ec.europa.eu/composite-indicators/toolkit_en/navigation-page/10-step-guide_en/step-8-sensitivity-analysis_en).

## 5. Artefactos reproducibles

- [`px-r1-3-selector.mjs`](./px-r1-3-selector.mjs) · funciones puras: validar datos, normalizar estado, construir/leer URL, cambiar etapa/universo, construir vista por franjas e interpretar claims sin mutación ni recalcular datos.
- [`validate-px-r13.mjs`](./validate-px-r13.mjs) · 31 pruebas con datos reales: 31 P, 147 vínculos, 245 hallazgos, cinco claims, invariantes y adversariales.
- [`px-r1-3-fixtures-v1.json`](./px-r1-3-fixtures-v1.json) · 10 escenarios con condiciones positivas, negativas y valores esperados para H-0.
- [`px-r1-2b-attribution-31p-147links-v1.json`](./px-r1-2b-attribution-31p-147links-v1.json) · matriz de entrada v1.0.0.
- [`.github/workflows/baseline-integrity.yml`](../.github/workflows/baseline-integrity.yml) · gate de CI que añade ejecución `node analisis/validate-px-r13.mjs` al flujo de integridad existente.

**Auditoría de diseño y datos:** cardinalidades, relaciones, URLs y clases comprobadas; 31 tests son la puerta mínima. **QA del navegador, accesibilidad, responsividad y desempeño:** **NO ejecutados** y corresponden al hito H-0 y posteriores. La librería no es un componente UI y no se desplegó.

**Puerta H-0:** ejecutar test en CI contra commit, validar JSON/catálogo, integrar contrato en una rama de frontend **nueva y distinta de la demo PR #6**, dibujar portada con cuatro botones y selector, estados vacío/ND/contexto, pruebas de teclado/móvil y browser, prohibición de información sensible en preview pública. Mantener v0.6 intacta y no fusionar a main sin revisión.

## 6. Reestimación al cierre

PX-R1.3 comenzó como 4/10 y se ajustó a **5/10** en el cierre de R1.2b por la mezcla de clases en los 245 hallazgos. Se mantuvo indivisa, con funciones puras más tests de contrato.

**PX-R2 (Detección y cobertura): estimación inicial 5/10 → revisión 6/10.** La evidencia R1.3 confirma que «más documentados» requiere deduplicar los 147 respaldos y 245 hallazgos por origen real, y que la matriz de 87 cruces P×segmento es parcial. Además 70 hallazgos son contextuales y no deben inflar indicadores de incidencia. Separar estrictamente en:
- **PX-R2.1 (4/10):** medir cobertura documental por P a partir de 26 fichas/raíces y dependencias (IFO F11/F12, F09/F04 y reutilizaciones F01/F02/F05/F10); registrar qué cifras pueden contarse como medición y qué registros son solo contexto. Entregar tabla P×origen y reglas de deduplicación.
- **PX-R2.2 (5/10):** análisis temático, segmentos, 87 cruces parciales, distribución y frecuencia solo para fuentes/denominadores compatibles, visualizaciones y contraevidencias; entregar análisis ejecutivo para sección 01.
A cada cierre reestimar la siguiente según Protocolo DIMI v2.0.

**Siguiente acción operativa única tras R1.3:** **H-0**, primera preview de portada y selector (dificultad inicial 5/10, debe revisarse al empezar); después PX-R2.1 y PX-R2.2, seguidos de H-1. H-0 **no se ejecuta en esta fase**. No confundir habilitación del checkpoint con haber desplegado una nueva página.

## 7. Criterios de cierre PX-R1.3

- Contrato del scope y capa con estados ND explícitos.
- Entradas y salidas de sección enlazables, sin pérdida de P ni fuente.
- **31/31 problemas, 147/147 links y 245/245 hallazgos** conservados y sin mutaciones.
- Dato mixto de N125, dato sectorial cualitativo, linaje F09/F04 e IFO y P30/P54 en tests.
- Node test en CI verde, código/lógica versionados, revisión del PR como Draft.
- Registro en Notion y roadmap con dificultad reestimada de PX-R2 y único siguiente H-0.
- **El QA de diseño/contrato no equivale a QA visual**, ni a revisión individual de 245 PDFs, ni a aprobación de Juanra.
