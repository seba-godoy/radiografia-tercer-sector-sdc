# PX-R1.1 · Taxonomía de universos y contrato de atribución v1.0.0

**Estado:** Cerrada documentalmente tras QA de diseño; **no** es auditoría de los 31 problemas ni selector implementado.
**Fecha:** 2026-11-17 · **Dificultad ejecutada:** 4/10.
**Contrato estructurado:** [JSON con diccionario, árbol y 7 casos de prueba](px-r1-1-contrato-universos-v1.json).
**Usuarios:** Juanra y DIMI · Simón de Cirene.

## 0. Auditoría de entrada, baseline y riesgos

- Runbook inicial PX-R1: tres microfases 4/5/4; PX-R0 cerrado como diseño y sin aprobación de Juanra.
- Snapshot fuente de solo lectura: preview/px-v01/catalogue.json de la rama feat/px-v01-executive-preview, SHA blob c2df6b08f049c8b8a85b63fda4ebec14d03174a9, derivado del catálogo A/B v0.6.
- Inventario confirmado en ese snapshot: 26 fichas F, 31 problemas P, 121 registros de segmentos, 87 vínculos P×segmento, **147 pares distintos P×F** de respaldo y solamente cinco claims normalizados adicionales. No deducir que cinco claims representan todas las afirmaciones: también están dentro de los respaldos de cada problema.
- Ocho F carecen de origin: F01, F02, F05, F06, F07, F08, F09, F10. F11/F12 comparten origen IFO según auditorías anteriores, lo que debe verificarse y deduplicarse en R1.2a.
- P30 y P54 no tienen vínculos en el cruce de segmentos del snapshot. No convertir esto en «no afecta a segmentos».
- Riesgo metodológico P1: tratar como fundaciones exclusivas tasas de muestras mixtas; riesgo P2: metadata incompleta; ninguna publicación ni modificación del catálogo está autorizada en esta fase.

## 1. Marco jurídico y límites analíticos

**Fundaciones**: una naturaleza jurídica específica, no sinónimo de corporación/asociación, programa social, ONG, beneficiario o institución cuyo nombre incluya «Fundación». Para una entidad concreta, procurar naturaleza jurídica acreditada mediante registro/certificado o estatuto/decreto; para una muestra agregada, su metodología explícita y desagregación pueden sostener la clasificación de población, pero no prueban la naturaleza de cada entidad individual.

**Tercer sector**, en esta radiografía, es el **alcance analítico-operacional** de OSC/OSFL pertinentes al estudio chileno, no una única clase legal ni un censo exhaustivo. Abarca fundaciones, asociaciones/corporaciones, organizaciones comunitarias y entidades de leyes especiales cuando su pertinencia OSC/OSFL esté documentada. Un ente público o empresa privada no ingresa automáticamente por ser contraparte de una organización social.

### Fuentes oficiales
- [Ley 20.500, BCN](https://www.bcn.cl/leychile/navegar?idNorma=1023143).
- [Decreto 84/2013, art. 2, Reglamento del Registro](https://www.bcn.cl/leychile/navegar?idNorma=1052955).
- [Resolución 343/2017, naturaleza jurídica campo 2.4](https://www.bcn.cl/leychile/navegar?idNorma=1110865).
- [ChileAtiende, Registro Nacional de Personas Jurídicas sin Fines de Lucro](https://www.chileatiende.gob.cl/fichas/11333-ley-n-20.500).

La Resolución 343 separa explícitamente Fundación, Corporación/Asociación, Comunitaria Territorial, Comunitaria Funcional, Leyes Especiales, Ley Especial Educación, Culto e Indígena. «ONG» o «sector social» no prueba naturaleza jurídica Fundación.

## 2. Taxonomía de evidencia y población

La forma jurídica de una entidad y el tipo de población de una afirmación son ejes distintos. La clasificación se hace al nivel de **cada afirmación o indicador** de un estudio, no al nivel exclusivo de título de fuente o de problema. El mismo F puede contener una muestra mixta y una reunión exclusiva de fundaciones; el mismo P puede tener respaldos heterogéneos.

| Código de evidencia | Definición | Uso válido | Uso prohibido |
| --- | --- | --- | --- |
| F_EXCLUSIVA_EXPLICITA | Fundación acreditada o población exclusivamente de fundaciones para una afirmación | Describir esa organización/submuestra, N y método | Generalizar automáticamente a todas las fundaciones |
| M_MIXTA_NO_DESAGREGADA | Fundaciones y otros tipos jurídicos; resultados agregados | «Organizaciones encuestadas de muestra mixta» | Reinterpretar su tasa como específica de fundaciones |
| G_OSFL_GENERAL | OSC/OSFL sin composición jurídica desagregada | Caracterización general con su universo original | Inventar prevalencia de fundaciones |
| S_SECTORIAL_SIN_FORMA | Programas o colaboradores sectoriales sin desglose legal | Caso sectorial, no extrapolado | Afirmar incidencia nacional o forma legal por tipo de programa |
| I_INFERIDA_POR_VALIDAR | Traslado conceptual plausible, no demostrado | Hipótesis de pertinencia para fundaciones | Tratar inferencia como medición |
| U_INSUFICIENTE | No se puede acreditar población o localizador | ND y pendiente de verificación | Sustituir ND por 0 o excluir el problema |
| X_NO_FUNDACION_EXPLICITA | Tipo jurídicamente no fundación acreditado | Contexto del tercer sector pertinente | Clasificarlo fundación por actividad social |

La aplicabilidad conceptual a fundaciones **no equivale** a haber medido el problema específicamente en fundaciones. Los denominadores y porcentajes se mantienen atados a su pregunta y subgrupo de origen.

## 3. Diccionario de datos

El contrato machine-readable preserva campos requeridos, enumeraciones legales, árbol de decisión y fixtures.

| Grupo | Campos obligatorios principales | Regla |
| --- | --- | --- |
| Linaje | record_id, problem_ids, source_id, source_origin_id, source_version, source_url, source_locator, review_state, reviewed_at | Sin inventar origen ni página; ND expresa null |
| Método | study_population, respondent_unit, study_method, unit_of_observation, territory, period, stratum_conditions | Población y unidad de observación explícitas |
| Forma legal | legal_natures_observed, legal_form_proof, foundation_disaggregation_available | Distinguir certificado, metodología muestral y simple nombre |
| Indicador | measure_kind, numerator, denominator, percent, denominator_question | No derivar N a partir de un porcentaje ni dividir grupos sin microdatos |
| Atribución | population_evidence_class, foundation_relevance, basis_for_classification, limitations | Separar evidencia directa, contexto mixto, sectorial y aplicabilidad |

El código legal en el JSON distingue fundacion, corporacion_asociacion, comunitaria_territorial, comunitaria_funcional, leyes especiales de educación/culto/indígena/otras, otras OSFL y no acreditada. El estado de una afirmación no se propaga a todas las afirmaciones de la fuente ni a todas las evidencias de un problema.

## 4. Árbol de decisión operativo

1. Identificar afirmación, unidad, población, fuente y página; sin población acreditable: U_INSUFICIENTE.
2. ¿Ese indicador corresponde exclusivamente a fundaciones o existe desglose fundación verificado? Si sí: F_EXCLUSIVA_EXPLICITA, sin extrapolación.
3. ¿Combina fundaciones y corporaciones/otros sin desglose? M_MIXTA_NO_DESAGREGADA.
4. ¿Describe OSC/OSFL sin detalle legal? G_OSFL_GENERAL.
5. ¿Se refiere a programa/colaborador sectorial sin forma jurídica? S_SECTORIAL_SIN_FORMA.
6. ¿La relación con fundaciones surge solo del nombre o semejanza de actividad? I_INFERIDA_POR_VALIDAR.
7. ¿Hay acreditación explícita de un tipo no fundación? X_NO_FUNDACION_EXPLICITA.
8. Si nada aplica, U_INSUFICIENTE. Si se contradicen evidencias, mantener clases separadas y marcar revisión.

**Política de calidad:** una fuente original no se convierte en dos estudios al duplicarla; las afirmaciones en distintos indicadores no se suman; ND ≠ cero. El selector futuro nunca altera N, pregunta, territorio ni período de un resultado.

## 5. Casos límite y tests de falsación (7)

| Caso | Fuente original | Etiqueta correcta | Error que debe bloquearse |
| --- | --- | --- | --- |
| F03/P25 | [Encuesta UC 2026, diap. 13 y 33](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=33), N=255 mixto | M_MIXTA_NO_DESAGREGADA | Decir «57% de todas las fundaciones» |
| F03/P20 | [Encuesta UC 2026, diap. 22](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=22), 62%, N=125 con convenios del Estado | M_MIXTA_NO_DESAGREGADA | Reetiquetar 62% como fundaciones del país o episodios anuales |
| F03/encuentro | [Antecedentes de la UC, diap. 7](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=7), encuentro de representantes de 100 fundaciones | F_EXCLUSIVA_EXPLICITA para el encuentro | Mezclar ese encuentro con muestra en línea N=255 o fingir representatividad |
| F26/P48 | [U. de Chile / Protección Especializada, p. 158](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=158), sobrecupo, equipos y financiamiento | S_SECTORIAL_SIN_FORMA | Afirmar que todos los programas son fundaciones o reportar incidencia nacional |
| Nombre Fundación X | Caso sintético negativo, sin estatutos/certificado | I_INFERIDA_POR_VALIDAR | Inferir legalidad por nombre |
| Entidad con certificado Fundación | Caso sintético positivo, certificado hipotético | F_EXCLUSIVA_EXPLICITA para entidad única | Extrapolar resultado a todas |
| Entidad con certificado Corporación | Caso sintético negativo, certificado hipotético | X_NO_FUNDACION_EXPLICITA | Reclasificar corporación en fundación |

Los casos «sintéticos» son fixtures de prueba, **no datos de la investigación**.

Ficha técnica de F03: encuesta online intencional/no probabilística, 255 encuestas válidas, levantamiento 3 julio–6 agosto 2026, dirigida a directivos de fundaciones y corporaciones. La diapositiva 22 corresponde a un subgrupo de 125 organizaciones con convenios estatales; el 62% no mide la cantidad anual de episodios. El estudio F26 describe experiencias sectoriales sin segregación jurídica ni tasa extrapolable.

## 6. Auditoría de salida y límites

- PASS (diseño): 7 casos cubren muestras mixtas, fundaciones explícitas, sector especializado y negativos jurídicos; no producen tasas exclusivas ficticias.
- PASS (contrato): enumeraciones, campos y casos sin duplicados; 62% N125 conserva población; P48 se conserva cualitativo.
- PASS (fuentes): contraste con normativa BCN/Registro Civil, ficha técnica UC 2026 y pasajes de estudio de Protección Especializada.
- ADVERTENCIA: 8/26 fuentes sin identificador de origen; 147 relaciones P×F; solo cinco claims normalizados en el preview; no es matriz definitiva.
- ND: clasificación de todos los 31 problemas y 26 fuentes, revisión de certificados individuales, funcionalidad de selector, ranking y aprobación de Juanra.
- No se modificaron HTML, datos canónicos ni despliegues. Se crean documentación y contrato versionados en rama de GitHub.

### Reestimación obligatoria de la siguiente tarea

La **PX-R1.2**, estimada inicialmente 5/10, pasa a **6/10** por evidencia observada en el snapshot: 26 fuentes, 147 vínculos P×F, ocho orígenes faltantes y mezclas de poblaciones. Para mantener tareas de máximo 5/10, separar solamente:
- **PX-R1.2a · Fuentes y linaje (4/10):** auditar 26 F, orígenes ausentes y duplicidades, extraer tipo de muestra/naturaleza jurídica, documentar conflicto y fuente/página. Salida: matriz F→universo y linaje.
- **PX-R1.2b · Atribución de problemas y afirmaciones (5/10):** auditar 31 P y 147 relaciones P×F usando inventario F, aplicar contrato y N/pregunta/fuente; salida: matriz 31/31 P y QA adversarial.
- **PX-R1.3** se conserva estimada 4/10; recalcularla después de R1.2b.

**Siguiente microfase única: PX-R1.2a, dificultad 4/10.** No ejecutar R1.2b sin su insumo auditado. Al cerrar 1.2a, recalcular la dificultad de 1.2b y explicar su trabajo.

## 7. Enlaces internos de continuidad

- [PX-R1 · runbook](https://app.notion.com/p/41b091be0327818c8a12d5099f6e2dcf).
- [PX-R0 · cierre](https://app.notion.com/p/41b091be032781879a91f3c82e40def1).
- [PX-R v2 · roadmap](https://app.notion.com/p/41b091be032781fdb334e3bc60cff256).
