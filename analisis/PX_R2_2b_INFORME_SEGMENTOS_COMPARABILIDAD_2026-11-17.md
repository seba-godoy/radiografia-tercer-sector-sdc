# PX-R2.2b · Segmentos, cruces e indicadores comparables

**Fecha de corte:** 17 de noviembre de 2026 · **Destinatarios:** Juanra / DIMI · **Dificultad ejecutada:** 5/10.  
**Objeto:** completar el análisis de los problemas antes de H-1, sin fabricar tasas de fundaciones.  
**Estado:** matrices versionadas y revisión puntual de fuente primaria; QA determinístico en GitHub Actions.  
**Fuentes canónicas:** JSON embebido en `index.html` congelado (blob SHA `c9e36797aedd89c625755e4c5518244519806325`) y [taxonomía R2.2a](./px-r2-2a-taxonomia-31p-7temas-v1.json). Las 26 F, 31 P, 147 relaciones P×F y 245 hallazgos originales no se modificaron.  
**Importante:** esta fase NO cambia el HTML, la preview institucional, el selector R1.3 ni producción v0.6.

## 1. Resultado principal

Se extrajo la **vista canónica base `data.segments` (121 registros) y `data.cross` (87 relaciones P×S)** del HTML original, se cruzó cada problema con su tema principal de R2.2a (7 temas) y se construyó una taxonomía de población/unidad por segmento. 

**Hallazgo técnico crucial:** el mismo HTML contiene otra vista `data.sector.segments` de **209 fichas** y `data.sector.cross` de **102 cruces**; los ID no son intercambiables entre vistas. Por ejemplo, `S121` identifica un núcleo de fundaciones filantrópicas F23 en la vista canónica y **Superación de la pobreza** F02 en la vista sector. Nunca unir por S sin un identificador de universo/vista. Esta fase usa exclusivamente la versión **121 / 87** prevista en el roadmap. No se sumaron 209/102 ni se sustituyeron silenciosamente.

De 87 cruces originales, **41 son `base` y 46 `candidate`**. `base` significa vínculo de una fuente con ese grupo, pero no siempre porcentaje de problemas medidos entre los miembros del segmento; `candidate` significa un público al que investigar. Solo **38 de 121 segmentos** aparecen al menos una vez en los cruces, y **29 de 31 problemas** poseen algún cruce. **P30 y P54 siguen sin cruce segmental (ND), no cero incidencia**. En **nueve cruces**, la fuente que sugiere el vínculo difiere de la fuente que define el segmento: los nueve son candidatos y NO se pueden combinar como una muestra común.

**Conclusión sustantiva:** no hay en este corte una sola tasa de incidencia de un problema **exclusiva de fundaciones**, confirmada con su N, pregunta, año y figura jurídica. No quiere decir que no haya mediciones sobre fundaciones en las fuentes. Hay datos descriptivos de fundaciones, pero no debemos transformarlos en tasas de dolores.

## 2. Clasificación del alcance de los 121 segmentos

| Clase metodológica (NO nivel de afectación) | Segmentos S | Cruces P×S |
| --- | ---: | ---: |
| Fundaciones identificadas (descriptivo, no tasa de dolor) | 21 | 9 |
| Subgrupo fundaciones detectado sin cruce de dolor | 1 | 0 |
| Población mixta de OSC/fundaciones/corporaciones | 62 | 52 |
| Otras OSC/reportes sin desglose fundaciones | 20 | 2 |
| Tipologías, registros, procedimientos y contexto sin N | 14 | 24 |
| Ciudadanía opinando sobre fundaciones | 1 | 0 |
| Ofertas de formación, no organizaciones beneficiarias | 2 | 0 |
| **Total** | **121** | **87** |

**Cómo se interpreta cada clase:**
- **21 fundaciones específicas**: submuestras o registros F02, F23 y F27 que identifican fundaciones o sus iniciativas; pueden describir programas, personas usuarias o casos de dos fundaciones, pero NO se convierten en tasas de problemas para todas las fundaciones.
- **1 subgrupo jurídico identificable**: F22 tiene información sobre qué parte de la muestra son fundaciones, pero no desglosa las respuestas sobre barreras por figura jurídica.
- **62 muestras mixtas**: F01 incluye fundaciones **y asociaciones**, F03/F04 incluyen fundaciones **y corporaciones**, F08 procesos para ambas, F11 incluye OSC de distintas formas y F28 demanda formativa de fundaciones/corporaciones. N mixtos no son N de fundaciones.
- **20 OSC/reportes sin desglose**: F10 FECU Social; incluye fichas de reportes y organizaciones, unidades diferentes.
- **14 registros conceptuales/cualitativos**: normativa, gobernanza, tipologías, entrevistas y casos F06/F07/F09/F16/F26; no estiman tasas.
- **1 percepción ciudadana**: F05 encuesta personas sobre confianza en tipos de fundaciones; la unidad observada es el ciudadano, no la organización.
- **2 ofertas formativas**: F28 provee fichas de oferta, no un recuento de organizaciones demandantes ni disposición de pago.

Estas clases describen **procedencia, tipo de población y unidad**; no constituyen un ranking de evidencia ni un indicador social.

## 3. Cruces de los siete temas con poblaciones

| Tema | P | P×S | Tipo base | Candidato | S vinculados distintos | P sin S |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| T01 · Captación y sostenibilidad financiera | 6 | 24 | 20 | 4 | 19 | P54 |
| T02 · Caja y ciclo de convenios | 7 | 27 | 9 | 18 | 11 | — |
| T03 · Rendición y cierre financiero | 5 | 12 | 5 | 7 | 6 | — |
| T04 · Trámites, datos y reportabilidad | 4 | 6 | 3 | 3 | 5 | — |
| T05 · Gestión interna, talento y evaluación | 3 | 13 | 3 | 10 | 13 | — |
| T06 · Operación y cobertura de servicios | 4 | 4 | 1 | 3 | 2 | — |
| T07 · Redes, visibilidad e incidencia | 2 | 1 | 0 | 1 | 1 | P30 |
| **TOTAL** | **31** | **87** | **41** | **46** | **38 únicos globales, no sumar por tema** | **P30, P54** |

**Patrones:**
- **T01 Captación y sostenibilidad financiera** cuenta con **24 cruces**, 20 etiquetados `base`, pero 23/24 se apoyan en segmentos de **muestras mixtas** y uno en contexto. Son relaciones de población, no 24 incidencias comparables.
- **T02 Caja y ciclo de convenios** reúne 27 cruces y 18 son hipótesis `candidate`: es imprescindible diferenciar el problema observado del segmento propuesto para entrevistas.
- **T03 Rendición y cierre** tiene 12 cruces, cinco `base` y siete candidatos; cuatro se relacionan con casos de fundaciones específicos, pero el cruce con una fundación específica **no certifica una tasa**.
- **T06 Operación y cobertura** tiene cuatro cruces, tres candidatos; además su cobertura documental era de una fuente por P en R2.2a, por lo que no es defendible usar falta de cruces como falta de gravedad.
- **T07 Redes e incidencia** tiene un solo cruce, candidato. P30 permanece ND. No ordenar por facilidad de cruzar segmentos.

## 4. Dieciocho indicadores con compuertas de comparabilidad

Estos 18 casos se seleccionaron por su capacidad de cambiar las conclusiones de H-1 o mostrar errores metodológicos comunes. **Cuatro de ellos** fueron revisados de nuevo directamente en la fuente PDF UC 2026 durante esta ejecución (tres mediante imágenes de página y uno con texto paginado). **Catorce** conservan su localizador original y advertencias del catálogo, sin nueva comprobación individual del documento en esta fase.

| Indicador | Ficha | Qué describe el catálogo | Regla de uso | Cotejo original |
| --- | --- | --- | --- | --- |
| I01 | F01 · S01 | F01 registro OSC: fundaciones y asociaciones 37.518 de 403.159 OSC (2023) | descriptivo_del_registro_no_exclusivo | Pendiente cotejo de ítem/PDF |
| I02 | F02 · S13 | F02 970 fundaciones de múltiples áreas y 6.644 iniciativas (estudio, no censo) | fundacion_solo_descriptivo | Pendiente cotejo de ítem/PDF |
| I03 | F03 · S27 / P20 | F03 125 organizaciones con convenios entre 255 respuestas, encuesta 2026 | mixto_submuestra | Cotejado PDF |
| I04 | F03 · S27 / P02 | P02 28% de 125 reportó término de proyectos por no renovación (F03) | solo_dentro_de_muestra_mixta | Cotejado PDF |
| I05 | F03 · S27 / P20 | P20 62% reportó falta de respuesta y 42% revisión superior a siete meses (F03) | solo_dentro_de_muestra_mixta | Cotejado PDF |
| I06 | F03 · S52 / P14 | F03 38% de 219 respuestas estima autonomía menor a 3 meses | solo_dentro_de_muestra_mixta | Cotejado PDF |
| I07 | F04 · S67 / P20 | F04 encuesta 2025: 268 directivos y submuestra colaboración estatal N=150 | muestra_mixta_otro_año | Pendiente cotejo de ítem/PDF |
| I08 | F08 · S77 | F08 85% de documentación por canal presencial (estimación de proceso) | no_tasa_de_entidades | Pendiente cotejo de ítem/PDF |
| I09 | F10 · S84 | F10 64,2% de 344 reportes FECU vía web | reportes_no_entidades | Pendiente cotejo de ítem/PDF |
| I10 | F10 · S90 | F10 71,4% de 245 organizaciones FECU tienen ingresos hasta CLP 1.000 millones | muestra_oscs_autoreportantes | Pendiente cotejo de ítem/PDF |
| I11 | F11 · S102 | F11 79% de 110 OSC autodiagnosticadas son fundaciones, corporaciones u ONG (IFO 2025) | mixto_sin_separacion | Pendiente cotejo de ítem/PDF |
| I12 | F27 · S107 / P20 | F27 dos fundaciones con tres expedientes InfoSISREC | caso_dirigido_sin_prevalencia | Pendiente cotejo de ítem/PDF |
| I13 | F28 · S108 | F28 demanda formativa: 154 entidades únicas, 162 respuestas iniciales | mixta_no_probabilistica | Pendiente cotejo de ítem/PDF |
| I14 | F28 · S115 | F28 oferta: 49 fichas de cursos de 27 entidades fortalecedoras | oferta_formativa | Pendiente cotejo de ítem/PDF |
| I15 | F22 · S119 / P54 | F22 82 menciones de barreras internas de 51 OSC | menciones_no_tasa_OSC | Pendiente cotejo de ítem/PDF |
| I16 | F23 · S121 | F23 84 fundaciones filantrópicas chilenas respondieron de 108 identificadas (2015–2016) | fundacion_subconjunto_no_representativo | Pendiente cotejo de ítem/PDF |
| I17 | F02 · S23 / P11 | F02 2.269.718 personas usuarias estimadas en programas abiertos | personas_no_fundaciones | Pendiente cotejo de ítem/PDF |
| I18 | F26 · S106 / P48 | F26 testimonios operacionales niñez; figura jurídica no desagregada | sin_denominador | Pendiente cotejo de ítem/PDF |

### Cifras especialmente defendibles con su universo correcto

- **F03 encuesta UC 2026:** ficha técnica, muestra **255 respuestas válidas**, diseño intencional no probabilístico, levantamiento 3 julio–6 agosto 2026. El **49%** reportó contratos o convenios con el Estado en 2025, base del subgrupo **N=125**. PDF original [ficha técnica, p.13](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=13) y [contratos, p.20](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=20).
- **P02:** **28% de 125** reportó término de proyectos por no renovación de convenios; observación de fundaciones **y corporaciones con convenio**, no incidencia exclusiva de fundaciones. [F03 p.21](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=21).
- **P20:** **62% de 125** señaló rendiciones que no recibieron respuesta en plazo, y **42%** periodos de revisión superiores a siete meses. Son ítems relacionados, posiblemente superpuestos; no se suman ni se convierten en duración promedio de organizaciones. [F03 p.22](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=22).
- **P14/F03:** el **38% de 219 respuestas** estimó autonomía inferior a tres meses si desaparecieran donaciones y financiamiento externo; es una **situación hipotética autorreportada**, no saldo de caja ni probabilidad de cierre. [F03 p.35](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=35) (cotejo de texto paginado, no nueva captura del gráfico).
- **F04 encuesta UC 2025:** su página editorial confirma **268 directivos** de fundaciones y corporaciones. El N=150 de organizaciones colaboradoras y la variable colaboración 2024 provienen del catálogo; el PDF de 2025 (12,6 MB) no estuvo disponible para comprobación de cada página en esta ejecución. No comparar sus porcentajes automáticamente con F03 2026: distintas muestras y preguntas.
- **F02:** 970 fundaciones en diversas áreas y 6.644 iniciativas, además de otras poblaciones educativas y programáticas. Los programas, personas usuarias y reportes **no son 970 observaciones de problemas**.
- **F10:** 344 reportes FECU versus 245 organizaciones reportantes; porcentajes por **reporte** y por **organización** usan denominadores distintos. No se atribuyen a todas las fundaciones.
- **F22/P54:** 82 menciones de barreras internas entre 51 OSC; 43,9% por falta de personal y 29,3% por falta de tiempo corresponden a **menciones**, no a proporción de las organizaciones ni a cifras de fundaciones.
- **F27:** dos fundaciones con tres expedientes son **casos ilustrativos**, no prevalencia.
- **F23:** 84 de 108 fundaciones filantrópicas identificadas en 2015/2016, recorte histórico y no universal.
- **F28:** 154 entidades únicas de la encuesta de demanda 2023 (frente a 162 respuestas antes de deduplicar) y 49 fichas de oferta de 27 fortalecedoras son **distintas unidades**; no se usan como medición de demanda pagadora.

## 5. Gate de publicación para H-1

**Se puede mostrar inmediatamente después de implementar H-1:**
1. Los **31 problemas** agrupados en siete temas y sus recuentos documentales (R2.2a); la cobertura de 26 F, 147 P×F, 245 hallazgos con advertencias de raíz candidata, no N de incidencia.
2. Para los **121 segmentos**, mostrar etiquetas, origen F, clase de población y unidad, textos del catálogo, límite, vínculo fuente e indicación de si tiene cruce `base`/`candidate`/sin cruce.
3. Para los **87 cruces**, presentar que son relaciones documentales/investigativas (41 base y 46 candidatos), con precaución especial en nueve de fuente cruzada distinta y P30/P54 ND.
4. Solo las cifras que hayan pasado **gate de comparación de documento/página, pregunta, período, N, muestra, unidad y figura jurídica** (por ahora cuatro indicadores UC 2026 contrastados), rotuladas **muestra mixta**, no «fundaciones».
5. Selector Tercer sector/Fundaciones conservar 6 problemas con evidencia directa, 13 compartida y 12 contextual según el contrato R1.3, sin recalcular automáticamente esos estatus a partir de nuevos cruces S.

**No publicar como resultado validado:** prevalencia de un problema en todas las fundaciones; ranking de gravedad/impacto; porcentajes de un subgrupo no publicado; una comparación 2025→2026 entre muestras no equivalentes; tasas de organizaciones sacadas de reportes o menciones; 41/87 como incidencia. Mostrar **ND / no comparable / candidato** antes que gráficos engañosos.

**Criterios H-1:** siete filtros temáticos con suma 31; vista segmentos y fuentes con clase/limitación; PDF/URL y retorno; casos P20 y P48 preservan sus guardarraíles; filtros y búsqueda compatibles con vista Tercer sector/Fundaciones y estado ND; QA Playwright escritorio/móvil, trazabilidad y prueba de regresión; nuevos resultados solo en rama/preview sin fusionar `main`.

## 6. Control de calidad y límites

- **Apertura de insumos:** los datos vinieron del `index.html` original más R2.2a; ambos tienen trazabilidad en GitHub. El JSON derivado guarda `source_html_blob_sha` y rutas.
- **Reglas de linaje:** 121 S / 87 cruces / 31 P / siete T / 26 F, ID S únicos solo dentro de la vista canónica, claves de origen de S, 9 diferencias de fuente, bases/limitaciones y enlaces conservados.
- **QA automático:** suite `analisis/validate-px-r22b.mjs`, casos adversariales sobre mezcla de muestras, dos universos con S121, reportes vs organizaciones, menciones, F26/F27, P30/P54 y datos sin tasa.
- **Verificación editorial real de páginas:** UC 2026 y 2025 y Mapa OSC 2023; PDF 2026 abierto, con gráficos p.20–22 comprobados y p.35 por texto. El HTML fuente y la taxonomía se auditaron estructuralmente.
- **Limitación:** 14/18 indicadores no se recotejaron individualmente contra el PDF original en esta fase. Las 87 relaciones no fueron investigadas mediante entrevistas; 46 son candidatos. La selección de fuentes es documental/no representativa y la codificación jurídica se hizo conservadoramente por población y unidad de los registros. Se requiere validación de Juanra/DIMI antes de consolidar una taxonomía institucional.

## 7. Dificultad reestimada y próxima tarea

**PX-R2.2b dificultad prevista 5/10 → ejecutada 5/10.** La complejidad principal fue evitar sumar 121 segmentos y 87 vínculos como tasas de problemas y separar submuestras mixtas, reportes, programas, menciones y casos. La estructura de R2.2a y la normalización permitieron completar el contrato en un solo hito.

**Siguiente hito único: H-1 · Actualizar sección «Problemas detectados» de la web (estimación 5/10).**
- **Qué hará:** incorporar siete filtros/categorías, vistas de distribución documental y vacíos, segmentación con etiquetas de población/ND, indicadores que superaron el gate de evidencia, y navegación hacia fuentes, preservando la identidad institucional SdC 2026 y el selector existente.
- **Por qué importa:** Juanra y DIMI necesitan ver el embudo desde **31 dolores en una pantalla comprensible** antes de pasar a criticidad; sin visualizaciones transparentes los datos permanecen repartidos en informes y el riesgo es equiparar popularidad documental, submuestras mixtas y prioridad de IA.
- **Dificultad 5/10** al depender del frontend H-0 ya probado y de matrices analíticas versionadas. Sin expandir a 14 cifras sin PDF, ranking R3 ni método comercial, no requiere subdivisión adicional por ahora. Recalcular en el primer checkpoint si el desarrollo/QA eleva el esfuerzo a 6+.
- **Después:** MF-1 (4/10) contrato banco de fuentes → H-M (5/10) implementación sección «Métodos y fuentes» → R3/H-2 criticidad.

**Ramas separadas:** H-1 puede basarse en H-0/BR-1 más los PR analíticos #14→#15→#16; conservar PRs Draft hasta revisión, sin publicar producción.

