# PX-R2.2a · Taxonomía de problemas y distribución de cobertura documental

**Corte:** 17/11/2026 · **Audiencia:** Juanra y equipo DIMI de Simón de Cirene · **Dificultad:** 4/10.  
**Etapa:** R2.2a, posterior a R2.1, previa a R2.2b y H-1.  
**Objeto:** interpretar un **catálogo de 31 problemas documentados**, no estimar prevalencia de problemas entre las OSC chilenas.  
**Estado:** taxonomía editorial y matrices versionadas, QA estructural automatizado; revisión del equipo DIMI pendiente. HTML no modificado.

## 1. Resumen ejecutivo para lectura analítica (no portada de la web)

El catálogo de **31 problemas** puede explicarse con **siete temas operacionales de dolor**. Cada problema recibe **exactamente una categoría principal**, de modo que el recuento suma 31. Catorce problemas tienen además una segunda etiqueta de relación causal/operativa, pero estas no se incluyen en los totales primarios, para evitar inflar frecuencias.

La cobertura de los siete temas suma **147 relaciones problema×publicación y 245 hallazgos**, con los IDs originales conservados. No equivale a 147 estudios ni a 245 incidentes. De las 26 fichas de fuente existentes, 25 representan **raíces documentales candidatas**, no estudios o muestras independientes acreditadas, según PX-R2.1.

**Hallazgos que se pueden defender en este corte:**

- **T01 + T02** (sostenibilidad y convenios) concentran **13 de 31 problemas** (6 + 7, 41,94% del catálogo) y **119 de 245 hallazgos catalogados** (48,57%). Eso solo describe nuestra selección documental y no mide cuántas organizaciones tienen estos dolores.
- **T06 · Operación y cobertura de servicios** reúne cuatro problemas (P23, P48, P52 y P53) y **cada uno tiene una sola publicación**. Los cuatro totalizan apenas **dos fichas F diferentes** (F03 y F26) y siete hallazgos. <b>Laguna de documentación, no irrelevancia del problema</b>; requiere investigación antes de evaluar criticidad.
- **T04 · Trámites, datos y reportabilidad** tiene cuatro problemas, pero P40 y P41 dependen únicamente de F08 (fuente normativa): esto respalda requisitos/procedimientos, no demuestra que cada incidente haya ocurrido ni su magnitud.
- **T05 · Gestión interna, talento y evaluación** agrupa tres problemas y 40 hallazgos, procedentes también de manuales y fuentes conceptuales. Multiplicidad de pasajes no equivale a número de mediciones.
- **22 de las 26 publicaciones aparecen en más de un tema.** Por eso la suma de fuentes únicas dentro de las filas temáticas da **82 apariciones de F-por-tema**, pero el catálogo contiene **26 fichas F**, no 82 fuentes independientes. Esta es una regla de presentación obligatoria para H-1.
- **Ocho problemas de 31** dependen de una única ficha F en el catálogo (P23, P40, P41, P48, P51, P52, P53 y P54). Los otros cuentan con más referencias documentales, no necesariamente con mayor corroboración empírica.

**Nota:** la categoría con más fichas de problema no es una prioridad de criticidad ni una estimación de cuántas fundaciones están afectadas. El paso de ranking se trabajará en PX-R3 y la comparación de segmentos/indicadores en PX-R2.2b.

## 2. Comparación temática documentada

| Tema de dolor (editorial) | Problemas P | % de 31 P | Vínculos P×F | F distintas dentro del tema | Raíces documentales candidatas dentro del tema | Hallazgos | P de una sola F |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| T01 · Captación y sostenibilidad financiera | **6** | 19,35% | 36 | 19 | 18 | 59 | **1** |
| T02 · Caja y ciclo de convenios | **7** | 22,58% | 36 | 14 | 14 | 60 | **0** |
| T03 · Rendición y cierre financiero | **5** | 16,13% | 18 | 7 | 7 | 27 | **1** |
| T04 · Trámites, datos y reportabilidad | **4** | 12,9% | 13 | 12 | 12 | 23 | **2** |
| T05 · Gestión interna, talento y evaluación | **3** | 9,68% | 24 | 14 | 14 | 40 | **0** |
| T06 · Operación y cobertura de servicios | **4** | 12,9% | 4 | 2 | 2 | 7 | **4** |
| T07 · Redes, visibilidad e incidencia | **2** | 6,45% | 16 | 14 | 13 | 29 | **0** |
| **TOTAL DE REFERENCIAS DEL CATÁLOGO** | **31** | **100%** | **147** | **26 F globales (no sumar columna)** | **25 raíces globales (no sumar columna)** | **245** | **8** |

**Lectura correcta de los gráficos posteriores:** denominador **31 problemas codificados** para distribución temática, **147 vínculos** para volumen de relaciones, **245 hallazgos** para fichas localizadas. Para fuentes únicas por tema y raíces candidatas, la unidad cambia: una publicación puede respaldar múltiples P de distintos temas y los números **no son aditivos**. Pueden usarse barras independientes con leyenda, nunca una torta sobre 82 fuentes tratadas como únicas.

Cada tema tiene alcance, inclusiones y exclusiones guardados en el JSON. Es una **taxonomía de dificultades organizacionales**, no las 12 categorías por actividad que el Mapa OSC 2023 utiliza para **clasificar organizaciones**. El Mapa OSC de Sociedad en Acción ayuda a entender el contexto del sector, pero no aporta denominadores para estos siete grupos. Referencia editorial: https://politicaspublicas.uc.cl/publicacion/mapa-de-las-organizaciones-de-la-sociedad-civil-2023/ (21 de agosto de 2024).

## 3. Reglas de codificación y decisiones interpretativas

1. **Unidad:** una ficha P representa un dolor o necesidad operacional formulada en el catálogo, no una OSC afectada. Un tema principal por ficha P; no se clasifican PDF completos sin pasar por los problemas.
2. **Principal:** seleccionar el resultado organizacional o parte del flujo de trabajo principalmente afectada, según el título del problema y su linaje en R2.1. No usar el campo heredado `domain` como criterio porque etiqueta 24+ problemas demasiado ampliamente «Gestión de la organización».
3. **Secundarios:** solo cuando existe cruce operativo concreto según el texto. No representan un segundo problema; se usan para búsqueda, contextualización o itinerarios (como convenio→servicio, rendición→registros).
4. **Límites y N:** cada T define qué abarca y qué queda fuera, reduciendo el riesgo de mover un P por intuición o de sumar una misma fuente repetida.
5. **Cobertura:** las fichas F y raíces documentales son claves del catálogo. R2.1 ya identificó F11/F12 como dos publicaciones de IFO 2025, cuatro atribuciones F09→F04 y una F07→F01, con fuentes quizá solapadas por verificar; se heredan sin borrar evidencia de contextos distintos.
6. **Datos faltantes:** `independent_study_count=null`, `incidence_rate=null`, `severity_score=null` para todos los temas. No poner cero ni «sin problema».
7. **Fundaciones:** no segmentar o recalcular porcentajes en R2.2a. El selector válido R1.3 conserva etiquetas directa/compartida/contextual. PX-R2.2b revisará los 121 S y 87 cruces y los denominadores antes de proponer cortes comparables.
8. **Control de cambios:** cualquier discusión de una categoría debe registrar P, etiqueta anterior/nueva, justificación, efecto sobre las sumas y versión. La propuesta todavía espera observaciones de Juanra/DIMI.

### Casos que cruzan temas (14)

| P | Principal | Relacionado | Por qué existe la segunda etiqueta |
| --- | --- | --- | --- |
| P02 | T02 | T06 | El corte del convenio interrumpe el servicio, además de ser un problema contractual. |
| P11 | T05 | T06 | Medir resultados se vincula con mejorar los programas, sin medir aquí su cobertura. |
| P17 | T02 | T03 | Los costos no rendibles se relacionan con las reglas de comprobación de gastos. |
| P19 | T02 | T01 | Las garantías constituyen también una barrera de acceso al financiamiento público. |
| P23 | T06 | T02 | El traspaso de datos/atención ocurre al terminar o no renovarse el convenio. |
| P25 | T01 | T04 | La dispersión de requisitos es también un problema de información y trámites. |
| P26 | T01 | T03 | Los procesos de algunos donantes afectan tanto la obtención como la rendición. |
| P32 | T04 | T05 | La dificultad de elaborar memoria/balance deriva de capacidad del equipo. |
| P38 | T04 | T02 | La duplicación de antecedentes puede afectar postulaciones y convenios. |
| P43 | T02 | T06 | Repostular exige tiempo de equipos que siguen prestando servicios. |
| P46 | T07 | T01 | La visibilidad busca abrir oportunidades de captación y colaboración. |
| P49 | T02 | T01 | El aporte inicial faltante impacta la disponibilidad de liquidez. |
| P50 | T03 | T02 | El saldo pendiente ocurre tras la terminación de un convenio. |
| P54 | T01 | T05 | El tiempo y la dotación del equipo limitan la captación local. |

**Prueba de falsación:** si incorporamos los temas secundarios al contador principal, la suma dejaría de ser 31. El QA impide ese error. Esto también mantiene comparables las siete tarjetas temáticas futuras.

## 4. Matriz de trazabilidad de los 31 problemas

| ID | Problema formulado | Principal | Tema secundario | Fichas F | Hallazgos |
| --- | --- | --- | --- | ---: | ---: |
| P02 | Interrumpimos servicios cuando no se renueva un convenio | T02 | T06 | 9 | 14 |
| P11 | Nos faltan recursos para medir qué cambió con nuestros programas | T05 | T06 | 12 | 21 |
| P13 | Nos cuesta asegurar ingresos estables para planificar | T01 | — | 16 | 28 |
| P14 | Podríamos sostener pocos meses de operación sin aportes externos | T01 | — | 7 | 11 |
| P15 | Perdemos una vía habitual de financiamiento cuando desaparece una convocatoria | T01 | — | 2 | 3 |
| P16 | Las transferencias comprometidas llegan tarde | T02 | — | 8 | 13 |
| P17 | Tenemos que cubrir costos que el convenio no permite rendir | T02 | T03 | 8 | 15 |
| P18 | La demora en la toma de razón impide iniciar actividades | T02 | — | 2 | 2 |
| P19 | Las garantías dificultan que organizaciones pequeñas contraten con el Estado | T02 | T01 | 4 | 6 |
| P20 | Nuestras rendiciones quedan abiertas por falta de respuesta | T03 | — | 7 | 9 |
| P21 | Nos piden rehacer rendiciones que ya habían aprobado | T03 | — | 4 | 6 |
| P22 | Nos cuesta rendir gastos en SISREC | T03 | — | 4 | 6 |
| P23 | Debemos traspasar la atención y los datos si no renuevan el convenio | T06 | T02 | 1 | 1 |
| P25 | Los requisitos dispersos nos dificultan recibir donaciones | T01 | T04 | 6 | 9 |
| P26 | Los trámites de algunos donantes complican obtener o rendir fondos | T01 | T03 | 4 | 6 |
| P28 | Nos cuesta mantener los contratos y retener especialistas | T05 | — | 7 | 11 |
| P30 | Nos cuesta aportar a políticas públicas en espacios dispersos e intermitentes | T07 | — | 8 | 17 |
| P32 | Nos falta capacidad de equipo para preparar la memoria y el balance | T04 | T05 | 9 | 14 |
| P38 | Tenemos que volver a entregar los mismos antecedentes | T04 | T02 | 2 | 5 |
| P40 | Nuestro acceso para enviar la memoria y el balance puede quedar bloqueado | T04 | — | 1 | 2 |
| P41 | Tenemos que completar o corregir envíos de memorias y balances | T04 | — | 1 | 2 |
| P43 | Tenemos que volver a postular mientras sostenemos un servicio | T02 | T06 | 3 | 6 |
| P46 | Nos cuesta dar a conocer nuestro trabajo para acceder a nuevas oportunidades | T07 | T01 | 8 | 12 |
| P47 | Nos cuesta mantener al directorio al día sobre los planes que aprobó | T05 | — | 5 | 8 |
| P48 | Atendemos más casos que plazas financiadas con el mismo equipo | T06 | — | 1 | 2 |
| P49 | Tenemos que financiar la instalación antes de recibir el primer aporte | T02 | T01 | 2 | 4 |
| P50 | El cierre financiero deja saldos sin resolver tras terminar un convenio | T03 | T02 | 2 | 4 |
| P51 | Nos cuesta separar gastos de varios proyectos en una misma cuenta | T03 | — | 1 | 2 |
| P52 | Nos cuesta captar y mantener familias de acogida | T06 | — | 1 | 2 |
| P53 | Llegar a familias en zonas dispersas nos consume más tiempo y recursos | T06 | — | 1 | 2 |
| P54 | Nos falta equipo y tiempo para buscar donantes locales | T01 | T05 | 1 | 2 |

Los documentos y páginas originales de cada P siguen en [PX-R2.1, matriz de 147 relaciones](./px-r2-1-matriz-147-relaciones-v1.csv) y [245 hallazgos](./px-r2-1-linaje-245-hallazgos-v1.csv). La matriz temática añade el tema, **no modifica el contenido original** ni recalcula porcentajes.

## 5. Evaluación de vacíos y contraevidencia

- **Vacío de cobertura vs ausencia real:** el tema de atención territorial T06 tiene cuatro P con una sola F cada uno; no es un estudio de prevalencia de operadores ni prueba de que estos problemas afecten a pocas organizaciones. Un estudio sectorial cualitativo (F26) está sobrerrepresentado en el catálogo por su especificidad.
- **Sesgo de selección y composición:** las publicaciones incluyen encuestas, guías, normativas, opiniones y registros. Temas más documentados pueden simplemente contar con más literatura pública que otros.
- **Doble uso de una fuente en varios temas:** 22 de las 26 F aparecen en más de un T. Una sola fuente que habla de diversos dolores no representa varias muestras independientes.
- **F08 P40/P41:** la norma describe requisitos de plataformas y memorias; no permite inferir prevalencia de bloqueos y correcciones. Publicarlo sin etiqueta de naturaleza sería engañoso.
- **F11/F12 y F09/F04:** conservar el linaje y advertencias de PX-R2.1. La presencia de 59 hallazgos en T01 o 60 en T02 no prueba gravedad.
- **P30/P54:** continúan como problemas con cruce de segmentos ND, no como problemas irrelevantes. El paso R2.2b debe resolver o explicar esa incertidumbre.
- **Etiquetas editoriales:** la unidad P, la selección de siete temas y las fronteras entre ellos pueden revisarse con nuevos hallazgos. En ausencia de validación por Juanra, no presentarlos como categorías oficiales de SdC.

**Contraste de fuente pública:** el Centro de Políticas Públicas UC identifica que el Mapa de OSC 2023 mide un universo de organizaciones y sus ámbitos de actividad, mientras su informe sobre registro integrado distingue tipos de registros jurídicos y habilitantes. Son marcos útiles para contextos/registro, **no una medida directa de frecuencia de nuestros 31 problemas**. Ver https://politicaspublicas.uc.cl/publicacion/mapa-de-las-organizaciones-de-la-sociedad-civil-2023/ y https://politicaspublicas.uc.cl/publicacion/registro-integrado-de-las-organizaciones-de-la-sociedad-civil-donde-estamos-y-como-avanzamos/.

## 6. Entregables reproducibles de PX-R2.2a

- [JSON canónico de 31 P y 7 temas](./px-r2-2a-taxonomia-31p-7temas-v1.json): reglas, etiquetas, método, sumatorias, presencia de fuentes entre temas, etiquetas secundarias, flags ND y enlaces al linaje.
- [CSV de 31 problemas](./px-r2-2a-matriz-31p-v1.csv): tema principal/secundario, cobertura, vacío y metadatos.
- [CSV de siete temas](./px-r2-2a-resumen-7temas-v1.csv): 7 filas con métricas y warnings de no aditividad.
- [CSV de 147 relaciones con tema](./px-r2-2a-trazabilidad-147links-v1.csv): asociación tema↔P↔F↔origen.
- [Pruebas automatizadas](./validate-px-r22a.mjs): 54 invariantes, conectadas a `.github/workflows/baseline-integrity.yml`.

**Auditoría de entrada:** 31/147/245, 26 fuentes, 25 raíces documentales candidatas, 5 reutilizaciones, P30/P54 ND.  
**QA estructural de salida:** 31 P únicos, siete etiquetas principales, 14 secundarias sin doble conteo, 147 vínculos, 245 hallazgos, 8 casos con una F, fuente 22/26 multitema, T06 y P48, datos no recalculados, porcentajes no convertidos a frecuencia y CSV comparados con JSON.  
**Límites:** las 245 citas no han sido contrastadas manualmente una a una con PDF. El QA prueba coherencia aritmética y trazabilidad **no** validez de una categoría como verdad empírica, ni profundidad de un estudio. Antes de cualquier publicación definitiva los números seleccionados para paneles deben cotejarse con fuente y población.

La auditoría se cerrará como PASS solo si GitHub Actions verifica 54/54 y controles heredados en la rama; PR permanece Draft y producción HTML v0.6 intacta.

## 7. Reestimación y relevo obligatorio

**PX-R2.2b · Públicos, cruces e indicadores** estaba estimada en **5/10**. La organización temática revela un riesgo mayor de interpretación sectorial que de procesamiento: **T06 concentra cuatro problemas con una sola F**, **22 fuentes atraviesan temas** y 14 P tienen segunda etiqueta. Sin embargo, los datos ya normalizados y la taxonomía con QA permiten mantener **5→5/10**, sin una división adicional innecesaria, siempre que se restrinja a revisar **121 registros S y 87 cruces P×S** y solo los indicadores compatibles que sean materialmente necesarios para H-1.

**La próxima única tarea es PX-R2.2b (5/10).** 
- **Qué hará:** auditar pertenencia de segmentos y población en 121 registros S y 87 cruces P×S; distinguir fundaciones específicas, encuestas mixtas, OSC generales y contexto; conservar P30/P54 con ND; revisar pregunta, muestra, N, periodo y localizador PDF de indicadores relevantes para la sección Problemas detectados; documentar contraevidencia.
- **Entregables:** matriz P×segmento y tema de siete grupos, catálogo de indicadores compatibles/no compatibles, reglas de comparación y propuesta visual para H-1, QA y acta.
- **Por qué importa:** un tema con varias fuentes no dice qué tipo de organización está sufriendo el problema. Sin esa capa no se puede filtrar correctamente «Tercer sector/Fundaciones» ni sugerir dónde investigar IA sin extrapolar hallazgos. Después H-1 incorporará temas, respaldo y segmentos a la web con marca SdC 2026.

**Después de R2.2b:** H-1 (sección 01 HTML), MF-1 y H-M («Métodos y fuentes»), y luego R3/H-2. Todas las nuevas categorías y sus reglas quedarán disponibles para esa sección metodológica.

