# PX-R1.2a · Auditoría de 26 fuentes y linaje documental v1.0.0

**Fecha:** 17-11-2026 · **Fase:** PX-R1.2a, dificultad inicial 4/10 · **Estado:** cierre documental sujeto a QA final de esta rama.  
**Autoridad de los datos:** `preview/px-v01/catalogue.json` de `feat/px-v01-executive-preview`, blob SHA `c2df6b08f049c8b8a85b63fda4ebec14d03174a9`, **solo lectura**.  
**Inventario machine-readable:** [`px-r1-2a-fuentes-linaje-v1.json`](px-r1-2a-fuentes-linaje-v1.json).  
**Contrato jurídico-metodológico previo:** [PX-R1.1](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/blob/docs/px-r11-taxonomia-20261117/analisis/PX_R1_1_CONTRATO_UNIVERSOS_2026-11-17.md).

## 1. Resultado y alcance

- **26/26 fichas revisadas y catalogadas por población, unidad de observación, tipo de estudio, territorio y linaje**. Se verificó identidad documental o editorial de todas; no se verificó integralmente la metodología empírica de cada capítulo o afirmación.
- Inventario sin cambios: **31 problemas, 121 registros de segmentos, 87 vínculos P×segmento y 147 respaldos P×fuente**. No se modificaron fuentes, porcentajes ni denominadores.
- **8 campos `origin` vacíos**: F01, F02, F05, F06, F07, F08, F09, F10. Se registraron identificadores **propuestos de documento raíz** basados en autor, año y título; **no** son IDs oficiales, no sobrescriben `origin` original ni demuestran independencia estadística.
- F11/F12 comparten el origen **IFO-2025-TRASCENDER**, 110 participantes. **25 claves propuestas de raíz documental** después de ese agrupamiento, pero **NO 25 estudios independientes**: F05 reutiliza datos F01/F02/F03; F02 usa registros y FECU Social de bases que pueden solaparse con F01/F10.
- Distintos tipos de fuente requieren distintas reglas: encuestas a directores; informes administrativos; encuesta a ciudadanos; documentos jurídicos; diagnóstico sectorial; portales de datos vivos; manuales conceptuales internacionales.
- **Grado de verificación**: primario consultado 5, auditoría previa/editor 1, ficha del editor 16, bibliografía cotejada sin método completo 3, portal vivo 1. Estas categorías describen alcance de la auditoría, **no calidad estadística**.

## 2. Matriz completa de fuentes y linaje (26/26)

| ID | Clase de fuente | Población real o alcance | Verificación | Origen documental |
|---|---|---|---|---|
| F01 | Registro/síntesis | OSC inscritas y activas; subconjunto fundaciones/asociaciones | Documento primario consultado | Propuesta: SEA-MAPA-OSC-2023-2024 |
| F02 | Administrativo y documental | Fundaciones seleccionadas; algunas corporaciones en casos particulares | Documento primario consultado | Propuesta: SEA-IMPACTO-ROSTRO-HUMANO-2025 |
| F03 | Encuesta OSC | Fundaciones y corporaciones; submuestras de preguntas específicas | Auditoría previa y editor | SEA-DIRECCIONES-2026 |
| F04 | Encuesta OSC | Fundaciones y corporaciones | Ficha del editor contrastada | SEA-DIRECCIONES-2025 |
| F05 | Opinión pública | Ciudadanía chilena (opinión sobre fundaciones) y conversación digital; figuras contextuales de OSC | Documento primario consultado | Propuesta: SEA-CONFIANZA-CIUDADANA-2026 |
| F06 | Análisis normativo | Fundaciones y corporaciones como sujetos normativos, no muestra estadística | Ficha del editor contrastada | Propuesta: SEA-REGULACIONES-OSC-2025 |
| F07 | Análisis de registros | Registros públicos de OSC, distintas naturalezas jurídicas | Ficha del editor contrastada | Propuesta: SEA-REGISTROS-OSC-2025 |
| F08 | Análisis normativo | Fundaciones y corporaciones sometidas a fiscalización del Ministerio de Justicia | Ficha del editor contrastada | Propuesta: SEA-FISCALIZACION-PJ-2025 |
| F09 | Propuestas participativas | Directivos de fundaciones/corporaciones, especialistas y actores del ecosistema | Ficha del editor contrastada | Propuesta: SEA-MESA-SOCIEDAD-CIVIL-2025 |
| F10 | Reportes FECU | Organizaciones sin fines de lucro que reportan FECU Social 2024 | Ficha del editor contrastada | Propuesta: COS-FECU-SOCIAL-2024 |
| F11 | Autodiagnóstico | Organizaciones sociales de distintas formas jurídicas, autoseleccionadas | Ficha del editor contrastada | IFO-2025-TRASCENDER |
| F12 | Presentación IFO | Mismas OSC participantes de IFO 2025; además difusión FortalecidOS 2026 | Ficha del editor contrastada | IFO-2025-TRASCENDER |
| F13 | Encuesta ciudadana | Personas de Chile encuestadas por participación y solidaridad | Ficha del editor contrastada | ENVS-2025-TRASCENDER-DATAVOZ |
| F14 | Presentación programa | OSC y programa FortalecidOS presentado en gLOCAL 2025 | Ficha del editor contrastada | FORTALECIDOS-GLOCAL-2025 |
| F15 | Artículo académico | Entidades no lucrativas del marco español; unidad empírica específica ND | Ficha bibliográfica; método ND | ACEDO-RAMIREZ-2011 |
| F16 | Guía/estudio | Fundaciones y corporaciones chilenas / subgrupos filantrópicos | Ficha del editor contrastada | CEFIS-SAN-CARLOS-GOBERNANZA-2019 |
| F17 | Manual académico | Organizaciones sin fines de lucro, casos de múltiples jurisdicciones | Ficha del editor contrastada | JOSSEY-BASS-HANDBOOK-NONPROFIT-2016 |
| F18 | Buenas prácticas | Nonprofits de Minnesota/EE.UU., recomendaciones generales | Ficha del editor contrastada | MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 |
| F19 | Estudio regional | Actores de filantropía y comunidades en América Latina, segmentos de estudio | Ficha del editor contrastada | CEFIS-UAI-FILANTROPIA-ODS-2023 |
| F20 | Manual práctico | Organizaciones nonprofit; ejemplos de planificación | Ficha bibliográfica; método ND | ALLISON-KAYE-PLANEACION-2005-ED2 |
| F21 | Artículo DD.HH. | Sociedad civil organizada en protección de DESC, enfoque teórico | Ficha bibliográfica; método ND | IIDH-REVISTA51-2010-ZERBINI |
| F22 | Estudio filantropía | Actores e iniciativas de filantropía local en Chile, no necesariamente fundaciones | Ficha del editor contrastada | CEFIS-UAI-FILANTROPIA-LOCAL-2022 |
| F23 | Libro comparado | Entidades de filantropía institucional en América Latina; subgrupos por país | Ficha del editor contrastada | UP-CEFIS-GPR-LATAM-2019 |
| F26 | Estudio sectorial | Programas, servicios y colaboradores de Protección Especializada NNA | Documento primario consultado | CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 |
| F27 | Registro vivo | Proyectos, rendiciones, entidades otorgantes/ejecutoras registradas en SISREC | Portal público dinámico | CGR-INFOSISREC-REGISTRO-2026 |
| F28 | Dos encuestas | 154 fundaciones y corporaciones (demanda), 27 entidades fortalecedoras con 49 ofertas (oferta) | Documento primario consultado | FSCM-ENCUESTA-FORTALECIMIENTO-2023 |

**Nota de lectura:** "muestra" se refiere a la población del indicador, no a la organización que publicó el informe. Una ficha con contenido legal o buenas prácticas **no** genera una observación numérica sobre fundaciones. La clase definitiva de cada afirmación (`F_EXCLUSIVA_EXPLICITA`, `M_MIXTA_NO_DESAGREGADA`, etc.) se asigna en PX-R1.2b, no a la fuente completa. Los detalles de página, URL, dependencias y cautelas se encuentran por ID en el JSON.

## 3. Hallazgos que cambian cómo se leen los datos

### F01 y F02 tienen poblaciones diferentes, pero pueden compartir insumos

**F01** es un mapa nacional de OSC construido con 15 fuentes de registros administrativos, con secciones específicas de fundaciones y asociaciones. **F02** estudia principalmente **fundaciones**, caracterizando programas de 5.459 entidades, con registros administrativos, memorias y FECU Social 2024, e incorpora algunas corporaciones en análisis específicos. Son documentos distintos, pero parte de las cifras de base puede depender de registros compartidos. Ver [Mapa OSC 2023](https://politicaspublicas.uc.cl/publicacion/mapa-de-las-organizaciones-de-la-sociedad-civil-2023/) y [Radiografía de aporte](https://politicaspublicas.uc.cl/publicacion/impacto-con-rostro-humano-radiografia-de-aporte-de-la-sociedad-civil-a-las-personas/).

### F05 mide percepción ciudadana, no frecuencia de dolores administrativos

Presentación de confianza de 2026 con **1.511 entrevistas telefónicas a personas** y análisis digital enero 2022–junio 2026. Las láminas iniciales citan cifras previas del Mapa, Radiografía y encuesta directiva. No sumar F05 como un segundo estudio de esos mismos indicadores. [Documento original](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261001_Presentacion-seminario-Estudio-Confianza-en-Fundaciones_VF.pdf#page=8).

### F11 y F12 comparten IFO 2025: no hay dos muestras

Ambas fichas remiten al IFO de Trascender con autodiagnóstico de **110 OSC participantes**; la nota de Trascender también promociona el programa FortalecidOS 2026. F14 es una ponencia de programa en gLOCAL de 2025; su posible solapamiento de participantes con IFO no está acreditado y no se tratará como estudio independiente de problemas sin hallazgo primario. [Trascender, IFO 2025](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/).

### F10 y F13 estudian entidades y personas, respectivamente

**F10** agrega **245 OSFL que reportaron FECU Social 2024**; la cantidad no equivale a fundaciones representativas. **F13** contiene una encuesta ciudadana sobre voluntariado con **2.001 personas**, por lo que sus porcentajes no pueden atribuirse directamente a gestores de fundaciones. [COS FECU](https://comunidad-org.cl/informe-fecu-social-2024/) y [Trascender ENVS](https://fundaciontrascender.cl/encuesta-nacional-de-voluntariado-2025-revela-chile-quiere-ayudar-pero-no-sabe-como/).

### F27 es un registro vivo

Info-SISREC registra proyectos, transferencias/rendiciones y ejecutores; **el catálogo tenía corte 08-11-2026**, mientras que el portal público indicaba actualización **14-11-2026** cuando se consultó el 17-11-2026. La diferencia es evolución del sistema, no un error que autorice reemplazar retrospectivamente indicadores anteriores. Cada futura cifra debe fijar consulta, cobertura y fecha de corte. [Info-SISREC](https://www.rendicioncuentas.cl/info-sisrec/busqueda).

### F28 incluye dos poblaciones separadas y una conexión con Simón de Cirene

El diagnóstico de Fundación San Carlos de Maipo y colaboradores incluyó a **154 fundaciones y corporaciones** en la encuesta de demanda (162 respuestas antes de deduplicar) y a **27 entidades fortalecedoras** que reportaron **49 ofertas** en otra encuesta. Simón de Cirene figura entre los impulsores del estudio; ninguno de esos números es tasa exclusiva de fundaciones. [Informe original, pp. 6–7](https://accionsolidaria.cl/wp-content/uploads/2023/11/1694698216517.pdf#page=7).

### Fuentes internacionales

F15 (España), F17 (manual Wiley), F18 (Minnesota), F20 (libro de planificación), F21 (artículo DD.HH. IIDH), F19/F23 (Latinoamérica) pueden explicar procesos o buenas prácticas, pero **no autorizan trasladar automáticamente frecuencias, precios ni características jurídicas a las fundaciones chilenas**.

## 4. Cautelas sobre orígenes e independencia

La entidad que publica, el documento, la base de datos que ese documento analiza y el indicador concreto son **cuatro niveles distintos**. La variable `normalized_origin_candidate` es una clave interna provisional de documento/estudio, no una certificación de independencia. Se conserva el campo original `catalog_origin` intacto; las dependencias entre fichas se guardan en `nonindependent_or_overlap_refs`.

- **Confirmado mismo origen IFO:** F11 y F12.
- **Dependencias confirmadas o razonablemente documentadas de cifras reutilizadas:** F05 reusa antecedentes F01/F02/F03; F02 incluye fuentes FECU Social y otros registros de base con riesgo de solapamiento F01/F10.
- **Solapamiento sin demostrar:** F14 vs F11/F12 por pertenencia a FortalecidOS; no atribuir igualdad ni independencia automáticamente.
- **No comparables por naturaleza:** F05/F13 opinión de personas; F06–F09 política/registro; F17/F18/F20 manuales; F27 portal vivo.
- **Grado pendiente de confirmación metodológica por capítulo/claim:** las fuentes verificadas vía ficha de editor o bibliografía siguen sujetas a cotejo de la página/tabla exacta cuando se utilicen para P.

## 5. Auditoría de salida y pruebas negativas

**Validaciones estructurales para esta matriz:**
- Cobertura de **26 IDs únicos** y URLs de origen conservadas; los 8 candidatos de `origin` no alteran el valor `null` del snapshot.
- **147 vínculos P×F** en catálogo; ninguna referencia no resuelta.
- Una sola clave raíz compartida por F11/F12; grupos restantes no se declaran independientes sin revisar indicador.
- F05 y F13 corresponden a personas, no a muestras de organizaciones; F28 conserva dos grupos y F27 registra un corte móvil.
- Cada fuente tiene tipo, población, unidad, fecha/periodo, nivel de comprobación, evidencia accesible o límite explícito y cautela.
- No se asignó clasificación F/M/G/S definitiva a las 147 relaciones: **corresponde a PX-R1.2b**.
- **Prueba adversarial:** seleccionar "Fundaciones" no debe cambiar "62% de N=125 en muestra mixta" por "62% de fundaciones", ni borrar evidencia sectorial de P48. Esto se ejecutará en R1.3; la presente matriz prepara sus entradas.

**Limitaciones abiertas:** no se descargaron ni verificaron todos los PDF de principio a fin; fichas `publisher_metadata` y `bibliographic_metadata` no bastan para acreditar un indicador particular. Algunos enlaces directos de PDF pueden fallar al abrirse, aunque exista ficha oficial. No deben inferirse pesos, prevalencias ni independencia por conteo de documentos.

**Cambios permitidos:** únicamente documentos, JSON de auditoría y pruebas sobre rama reversible. **No** se modificaron el catálogo A/B, los porcentajes, main, el HTML ni producción v0.6.

## 6. Dificultad reestimada y relevo

**Siguiente microfase única: PX-R1.2b · Atribución de problemas y afirmaciones.** Dificultad inicial **5/10 → revisada 5/10**. La auditoría R1.2a identificó dos asuntos importantes, pero resolvió/documentó los ocho orígenes y separó la población y linaje de las 26 fichas; por ello el desafío restante cabe en la microfase prevista, sin subdivisión adicional injustificada.

**Qué hará:** aplicar el contrato PX-R1.1 y esta matriz de fuentes a **31 problemas y sus 147 relaciones P×F**, descendiendo a cada hallazgo verificable y su localizador. Registrar población, método, pregunta, subgrupo, N, clase de evidencia para fundaciones, aplicabilidad y justificación. Clasificar P20/F03 como muestra mixta N=125, P48/F26 como caso sectorial, evitar falso doble conteo F11/F12 y conservar P30/P54 pese a falta de cruce P×S. Entrega matriz 31/31 y audit trail reproducible. Los 3 casos bibliográficos siguen disponibles como contexto, no como afirmaciones empíricas sin método.

**Pruebas de aceptación:** 31/31 IDs, 147/147 vínculos identificados, cero fuentes huérfanas, ningún N reescrito, trazabilidad a URL/página, ND visibles, tests adversariales F03/F26/IFO y revisión de casos ambiguos. Si aparecen afirmaciones sin localizador, dejarlas pendientes y no bloquear artificialmente todo el avance.

Después de cerrar R1.2b se reestimará PX-R1.3, que actualmente tiene dificultad inicial 4/10. La primera actualización del HTML continúa programada **después de PX-R1.3**, nunca antes.
