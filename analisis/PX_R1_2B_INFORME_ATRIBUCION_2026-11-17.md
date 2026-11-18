# PX-R1.2b · Auditoría de atribución de 31 problemas, 147 respaldos y 245 hallazgos

**Fecha:** 17/11/2026 · **Estado:** CERRADA DOCUMENTALMENTE, sujeta a revisión experta/primaria cuando se use un dato para decisiones o publicación · **Dificultad de ejecución:** 5/10.  
**Público:** Juanra/DIMI · **Scope:** información de la investigación para selector Tercer sector/Fundaciones; no construcción HTML.

## 1. Resumen ejecutivo del resultado (sin extrapolación)

- Se tomaron las **31 fichas P**, **147 vínculos P×F**, **245 hallazgos** con referencias y **5 claims normalizados** del snapshot canónico A/B, sin perder ningún código. Fuentes revisadas por identidad en PX-R1.2a: 26.
- La auditoría asignó una **clase jurídico-metodológica preliminar a cada uno de los 245 hallazgos**, conservando texto, fuente, localizador, dependencia y tipo de unidad. <b>Esto no implica cotejo página a página de todas las 245 citas</b>: las clases comunes son reglas conservadoras apoyadas en la metodología documentada de la fuente y se deberá revisar cada hallazgo decisivo antes de publicarlo o convertirlo en ranking.
- Los metadatos clasificatorios <b>no son conteos de organizaciones, prevalencias, estudios independientes ni rankings de criticidad</b>. Ningún problema recibió una tasa «de fundaciones» ni puntuación inventada.
- Se detectaron cuatro reutilizaciones de F04 por el documento F09 y el origen común del IFO 2025 (F11/F12). F28 contiene cifras de <b>oferta de formación</b> que no deben interpretarse como evidencia de un dolor operativo de las fundaciones.
- P30 y P54 carecen de cruces P×segmento en el snapshot, pero conservan sus fichas y hallazgos. Ninguno debe desaparecer por vacío de segmentación.

## 2. Matriz analítica que quedó en GitHub

- [JSON canónico de atribución PX-R1.2b (31 P / 147 relaciones / 245 hallazgos)](./px-r1-2b-attribution-31p-147links-v1.json)
- [CSV · 31 problemas, estados y clases](./px-r1-2b-problemas-31-v1.csv)
- [CSV · 147 relaciones, fuentes, método y referencia](./px-r1-2b-relaciones-147-v1.csv)
- [Validador reproducible (Node.js 20+)](./validate-px-r12b.mjs)
- Insumo documental [PX-R1.2a · 26 fuentes y linaje](./px-r1-2a-fuentes-linaje-v1.json) y [PX-R1.1 · contrato jurídico](./px-r1-1-contrato-universos-v1.json).

### Clasificación de los 245 hallazgos (no de organizaciones)

| Clase y significado | Hallazgos con esa etiqueta |
| --- | ---: |
| `F_EXCLUSIVA_EXPLICITA` · Referencias directas a fundaciones en casos/muestras | **6** |
| `M_MIXTA_NO_DESAGREGADA` · Fundaciones y otras formas jurídicas, sin porcentaje exclusivo | **53** |
| `G_OSFL_GENERAL` · OSC/OSFL y análisis generales, sin muestra fundacional acreditada | **77** |
| `S_SECTORIAL_SIN_FORMA` · Programas sectoriales sin naturaleza jurídica de ejecutores verificada | **39** |
| `I_INFERIDA_POR_VALIDAR` · Contexto extranjero, manual, opinión ciudadana u oferta, sin atribución empírica directa | **70** |
| `U_INSUFICIENTE` · Ausencia total de información clasificable por regla | **0** |
| `X_NO_FUNDACION_EXPLICITA` · Entidad jurídicamente no fundación acreditada al nivel de registro | **0** |
| **TOTAL** | **245** |

**Interpretación importante:** las seis etiquetas F incluyen cinco antecedentes cualitativos del **mismo encuentro de 100 fundaciones**, citado en F03, y un dato documental de F02. **No representan seis estudios independientes, seis problemas exclusivos de fundaciones ni una base para porcentaje nacional.** La ausencia de etiqueta U/X no quiere decir que conozcamos la forma legal de todas las entidades: parte de esa incertidumbre está explícita en G/S/I.

Como herramienta de lectura de los 31 problemas, el estado agregado con precedencia F→M→G→S resultó: **6 fichas con al menos una afirmación explícita sobre fundaciones**, **13 con alguna evidencia mixta sin tal afirmación explícita**, **6 con evidencia general OSC** y **6 cuya mejor evidencia clasificada es sectorial sin forma legal**. Es una descripción de disponibilidad de evidencia, **no un filtro definitivo ni una clasificación estadística del sector**.

## 3. Matriz de los 31 problemas (vista de consulta)

| ID | Problema | Fichas de fuentes | Hallazgos | Lectura de alcance por regla |
| --- | --- | ---: | ---: | --- |
| P02 | Interrumpimos servicios cuando no se renueva un convenio | 9 | 14 | Incluye caso explícito de fundaciones (no tasa nacional) |
| P11 | Nos faltan recursos para medir qué cambió con nuestros programas | 12 | 21 | Contiene muestra mixta sin desglose |
| P13 | Nos cuesta asegurar ingresos estables para planificar | 16 | 28 | Contiene muestra mixta sin desglose |
| P14 | Podríamos sostener pocos meses de operación sin aportes externos | 7 | 11 | Contiene muestra mixta sin desglose |
| P15 | Perdemos una vía habitual de financiamiento cuando desaparece una convocatoria | 2 | 3 | Incluye caso explícito de fundaciones (no tasa nacional) |
| P16 | Las transferencias comprometidas llegan tarde | 8 | 13 | Incluye caso explícito de fundaciones (no tasa nacional) |
| P17 | Tenemos que cubrir costos que el convenio no permite rendir | 8 | 15 | Contiene muestra mixta sin desglose |
| P18 | La demora en la toma de razón impide iniciar actividades | 2 | 2 | Contiene muestra mixta sin desglose |
| P19 | Las garantías dificultan que organizaciones pequeñas contraten con el Estado | 4 | 6 | Incluye caso explícito de fundaciones (no tasa nacional) |
| P20 | Nuestras rendiciones quedan abiertas por falta de respuesta | 7 | 9 | Contiene muestra mixta sin desglose |
| P21 | Nos piden rehacer rendiciones que ya habían aprobado | 4 | 6 | Incluye caso explícito de fundaciones (no tasa nacional) |
| P22 | Nos cuesta rendir gastos en SISREC | 4 | 6 | Contiene muestra mixta sin desglose |
| P23 | Debemos traspasar la atención y los datos si no renuevan el convenio | 1 | 1 | Contiene muestra mixta sin desglose |
| P25 | Los requisitos dispersos nos dificultan recibir donaciones | 6 | 9 | Incluye caso explícito de fundaciones (no tasa nacional) |
| P26 | Los trámites de algunos donantes complican obtener o rendir fondos | 4 | 6 | Contiene muestra mixta sin desglose |
| P28 | Nos cuesta mantener los contratos y retener especialistas | 7 | 11 | Contiene muestra mixta sin desglose |
| P30 | Nos cuesta aportar a políticas públicas en espacios dispersos e intermitentes | 8 | 17 | Contiene muestra mixta sin desglose |
| P32 | Nos falta capacidad de equipo para preparar la memoria y el balance | 9 | 14 | Contiene muestra mixta sin desglose |
| P38 | Tenemos que volver a entregar los mismos antecedentes | 2 | 5 | Contexto OSC sin exclusividad de fundaciones |
| P40 | Nuestro acceso para enviar la memoria y el balance puede quedar bloqueado | 1 | 2 | Contexto OSC sin exclusividad de fundaciones |
| P41 | Tenemos que completar o corregir envíos de memorias y balances | 1 | 2 | Contexto OSC sin exclusividad de fundaciones |
| P43 | Tenemos que volver a postular mientras sostenemos un servicio | 3 | 6 | Contexto OSC sin exclusividad de fundaciones |
| P46 | Nos cuesta dar a conocer nuestro trabajo para acceder a nuevas oportunidades | 8 | 12 | Contiene muestra mixta sin desglose |
| P47 | Nos cuesta mantener al directorio al día sobre los planes que aprobó | 5 | 8 | Contexto OSC sin exclusividad de fundaciones |
| P48 | Atendemos más casos que plazas financiadas con el mismo equipo | 1 | 2 | Caso sectorial sin forma jurídica |
| P49 | Tenemos que financiar la instalación antes de recibir el primer aporte | 2 | 4 | Caso sectorial sin forma jurídica |
| P50 | El cierre financiero deja saldos sin resolver tras terminar un convenio | 2 | 4 | Caso sectorial sin forma jurídica |
| P51 | Nos cuesta separar gastos de varios proyectos en una misma cuenta | 1 | 2 | Caso sectorial sin forma jurídica |
| P52 | Nos cuesta captar y mantener familias de acogida | 1 | 2 | Caso sectorial sin forma jurídica |
| P53 | Llegar a familias en zonas dispersas nos consume más tiempo y recursos | 1 | 2 | Caso sectorial sin forma jurídica |
| P54 | Nos falta equipo y tiempo para buscar donantes locales | 1 | 2 | Contexto OSC sin exclusividad de fundaciones |

En el JSON se conserva para cada problema el **conjunto completo de clases de sus diferentes hallazgos** y todas las 147 relaciones. La lectura resumida de la última columna nunca reemplaza revisar los datos específicos ni autoriza eliminar una ficha en el filtro «Fundaciones».

## 4. Revisión adversarial de casos críticos

### F03 / P20 · 62% y N=125 es una muestra mixta, no porcentaje de fundaciones chilenas

La [Encuesta UC 2026, diap. 22](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=22) indica que el **62% de las 125 organizaciones con contratos/convenios públicos en 2025** declaró rendiciones sin respuesta en plazo. La metodología general de F03 especifica **fundaciones y corporaciones**, encuesta online intencional no probabilística con 255 respuestas válidas (diap. 13). La figura menciona además **42%** de revisiones superiores a siete meses; no sumar ambos indicadores ni atribuirlos a las mismas organizaciones sin microdatos. El claim original `CLM-F03-D22-RENDICION-62` conserva N125 y el claim de 42% conserva N como ND en el contrato de datos, por cautela respecto de la base exacta de esa afirmación. Las cinco afirmaciones normalizadas conservan su texto y denominador original.

F03 también recoge un **encuentro anterior con 100 fundaciones** (diap. 7–9) que sí es explícito sobre fundaciones, pero es evidencia cualitativa de ese encuentro, **no** una encuesta de fundaciones extrapolable ni parte indistinguible de la encuesta general. Por eso las cinco afirmaciones de «antecedente cualitativo» se separaron de los porcentajes de F03.

### F26 / P48 · evidencia sectorial valiosa, no prevalencia de fundaciones

El [estudio del Centro de Sistemas Públicos/U. de Chile para Protección Especializada, p. 158, §4.8.2.1](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=158) describe sobrecupos, meses de desfase y desgaste de equipos. Es información cualitativa de programas/colaboradores especializados; **no identifica el tipo jurídico de todos los ejecutores ni una frecuencia nacional de episodios en fundaciones**. Dos hallazgos P48 quedan `S_SECTORIAL_SIN_FORMA`, N=null, porcentaje=null. Deben mantenerse disponibles como **contexto específico**, no descartarse por carecer de N.

### F11/F12 y F09/F04 · independencia no automática

- El IFO 2025 de Fundación Trascender usa **110 OSC participantes**. F11 y F12 documentan el mismo origen, y por lo tanto un número compartido no suma dos investigaciones independientes. [Página oficial IFO](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/).
- En **P16, P20, P21 y P30**, F09 cita o reproduce resultados de la Encuesta F04. El JSON establece `measurement_source_id=F04` y raíz de estudio `SEA-DIRECCIONES-2025` en esos cuatro hallazgos, aunque su ficha bibliográfica sea F09. Esto evita contar una publicación de propuestas como muestra adicional.
- La clasificación de los restantes solapamientos F01/F02/F05/F10 sigue advertida por fuente; un código raíz diferente por informe **no garantiza independencia de bases administrativas**.

### P30 / P54, F27 y F28 · casos que rompen filtros ingenuos

- **P30** y **P54** no tienen vínculo P×segmento, pero sí evidencia documental. Se mantienen como problemas existentes con segmentación ND.
- **F27 InfoSISREC** registra proyectos/rendiciones en un portal de actualización dinámica; el nombre de un ejecutor con la palabra «Fundación» no sustituye evidencia de naturaleza jurídica y los registros aislados no demuestran atraso contractual sin cronología completa. Cada caso conserva su referencia y debe versionar fecha de corte.
- **F28/P32** cita un indicador sobre costos de ofertas de formación, que corresponde a **proveedores/ofertas** y no mide horas de trabajo o complejidad de preparar memorias. Se etiqueta como contexto (`I_INFERIDA_POR_VALIDAR`) en ese hallazgo, distinto de las preguntas de demanda F28 mixtas.

## 5. Qué mide exactamente esta auditoría

El paso completado es la <b>aplicación trazable del contrato de atribución de universos</b> a todas las relaciones del catálogo: cobertura, linaje, advertencias y clasificación conservadora por contexto de la fuente y, cuando fue posible, por localizador concreto.

<b>No se ha hecho:</b> revisar individualmente los 245 pasajes contra cada PDF actualizado, verificar certificados jurídicos de cada entidad nombrada, recalcular los denominadores de todas las preguntas, probar filtros reales en navegador, decidir la prevalencia de cada problema en fundaciones, ni determinar orden de criticidad/abordabilidad. Un análisis posterior que utilice una cifra para una decisión debe cotejar <b>esa afirmación exacta y su muestra</b> con el PDF original y registrar el estado. Las 21 pruebas de integridad no sustituyen esa verificación humana o de fuente primaria.

## 6. QA ejecutado y estado de riesgos

**21/21 comprobaciones estructurales PASS** sobre los archivos recuperados desde GitHub: 31 IDs P únicos, 147 links únicos, 245 hallazgos únicos, 26 F, cinco claims originales; relaciones y URLs presentes, clasificación en enum R1.1, no tasas de fundaciones ni ranking inventados, P20 62/N125, P48 sectorial, F03 encuentro, IFO compartido, F09 reutilización de F04, F28 oferta, P30/P54, F27 y conservación de ocho origin vacíos. Se compararon también los CSV 31/147 con el JSON guardado.

**Revisión independiente orientada a falsación:** ¿el filtro podría afirmar «62% de fundaciones»? No, la clase sigue mixta y `scope_foundations_specific_rate=null`. ¿P48 desaparece sin N? No, tiene dos hallazgos. ¿F09 genera una segunda encuesta? No para los cuatro casos detectados. ¿Las seis F son seis estudios? No; cinco pertenecen al mismo encuentro.

**Riesgo P1 metodológico residual:** al mostrar automáticamente resultados exclusivos de fundaciones o rankings, aún sería posible interpretar etiquetas de contexto como prevalencia si la UI ignora las restricciones. Debe bloquearse esa semántica en R1.3 con tests negativos. **Riesgo P2:** localizadores y porcentajes no re-verificados para la totalidad de 245 pasajes; todos los hallazgos tienen `reference_locations` y un estado global explícito de revisión pendiente. Las referencias originales no se alteraron.

## 7. Reestimación obligatoria y siguiente microfase

**PX-R1.3 · Contrato funcional del selector y QA. Dificultad inicial 4/10 → revisada 5/10.** La cobertura aumentó respecto a las cinco afirmaciones estructuradas inicialmente visibles: **245 hallazgos con cinco clases observadas** y problemas que mezclan evidencia explícita, mixta y contextual. El selector debe preservar conjuntos heterogéneos por P, sin generar una tasa fundaciones-only ni ocultar contextos útiles. Es abordable en una microfase de 5/10 porque los datos ya están etiquetados y se dejó un validador; no se crean subdivisiones adicionales.

**Qué hará R1.3:**
1. Definir comportamiento del selector global «Tercer sector / Fundaciones» y subcapas de evidencia específica, mixta, general OSC, sectorial y contexto. Cada dato conservará población original y fuente.
2. Establecer reglas reproducibles por hallazgo y problema, usando la matriz de 31 P/147 enlaces; mantener la evidencia incierta/sectorial visible con advertencia y distinguir «no se midió» de «no existe».
3. Confeccionar pruebas automáticas de dos ámbitos (sector/fundaciones) y casos adversariales P20, P48, F11/F12, P30/P54, F27, F28 y nombres no certificados.
4. Definir contrato de navegación/retorno, estado sin datos, orden y leyendas. Entregar especificación lista para hito H-0, **sin tocar todavía el HTML**.

**Criterio de salida:** toda transición conserva IDs/refs originales, ningún porcentaje cambia al alternar scope, ningún P se elimina silenciosamente, y los estados de evidencia exclusiva, mixta y contexto son auditables. Al cerrar R1.3, reestimar PX-R2 y habilitar la planificación del primer preview H-0.

**Estado de aplicación del HTML:** no modificado; sigue en fase de diseño/normalización. Producción v0.6, demo PR #6 y main permanecen sin cambios en este trabajo.
