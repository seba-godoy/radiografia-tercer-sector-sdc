# PX-R2.1 · Cobertura documental y linaje, sin doble conteo

**Fecha:** 17/11/2026 · **Estado:** matriz y QA preparados; cierre definitivo tras CI y acta de Notion · **Dificultad:** 4/10.  
**Destinatarios:** Juanra y equipo DIMI · **Base:** investigación de oportunidades de IA de Simón de Cirene.  
**Repositorio:** rama `docs/px-r21-cobertura-linaje-20261117`, exclusivamente documentos/datos/pruebas, **sin HTML ni cambios a producción**.

## 1. Resumen de los hallazgos

- **31 problemas**, **147 relaciones problema×fuente**, **245 hallazgos** y **26 fichas de publicación** conservados con sus ID y referencias.
- Hay **25 claves candidatas de raíz documental entre las 26 fichas originales**, porque F11 y F12 difunden **el mismo IFO 2025 de 110 OSC**. **No equivale a 25 estudios independientes**, ni a un límite validado de estudios independientes.
- A nivel de **hallazgo concreto**, identificamos **cinco reutilizaciones explícitas** que no deben añadirse como una nueva observación: **4 hallazgos F09→F04** (P16, P20, P21 y P30), y **1 hallazgo F07→F01** (P02). No es correcto eliminar el documento F09 ni F07 entero: ambos también aportan análisis cualitativos o propuestas propios.
- Un sexto caso particular, **P17/F09**, cita una investigación residencial de **Focus** no incorporada a las 26 fichas: debe registrarse como **origen externo pendiente**, no como novena fuente independiente ya verificada.
- **Cuatro problemas** presentan al menos un par de fuentes con **posible** solapamiento de datos o participantes, que no autoriza a fusionar muestras todavía. La auditoría separa **duplicado confirmado**, **reutilización explícita**, **posible solapamiento** y **origen no auditado**.
- **Ocho de los 31 problemas** tienen solamente una publicación de respaldo en el catálogo. Esto señala **cobertura documental limitada**, nunca baja prevalencia del problema ni ausencia en el sector.
- Los registros P30 y P54 siguen presentes con segmento ND. No hay ranking de criticidad, incidencia, tamaño de afectados ni orden de relevancia inventado.

## 2. Qué medimos y qué NO medimos

**Cuatro unidades diferentes** deben mantenerse separadas:

1. **Ficha de fuente F**: el documento/publicación en el catálogo. 26 a nivel general, 1–16 vinculadas por problema. No equivale a estudio empírico.
2. **Raíz documental candidata**: identidad de fuente subyacente, con deduplicación F11/F12 y reasignaciones F09/F04 y F07/F01 por hallazgo. Puede incluir fuentes adicionales aún no inventariadas, como Focus. No prueba independencia de participantes ni bases de datos.
3. **Hallazgo del catálogo**: un fragmento o indicador enlazado con referencia, 245 unidades. Una misma investigación puede originar varios fragmentos sobre el mismo o diferentes problemas.
4. **Indicador de prevalencia/incidencia**: proporción de entidades afectadas según pregunta, muestra, periodo y territorio compatibles. **No está calculado** en PX-R2.1; tampoco es derivable de 1–3 por simple suma.

La variable `count_of_independent_studies_verified` queda **null**, no cero. El campo `raw_finding_count` tampoco se interpreta como gravedad. Los 25 orígenes identificados son **documentos/raíces candidatas**, no 25 encuestas ni 25 muestras independientes.

## 3. Casos de linaje resueltos y decisiones conservadoras

| Relación | Diagnóstico | Qué se decidió | Certeza |
| --- | --- | --- | --- |
| **F11/F12** | Ambos remiten al IFO 2025 de Trascender, 110 OSC participantes | Una raíz `IFO-2025-TRASCENDER`; mantener las dos publicaciones para trazabilidad | **Mismo estudio confirmado** por editor |
| **F09/F04** | F09 es una mesa de propuestas que **cita cuatro cifras** de la encuesta de directores F04 | Reatribuir solo esos cuatro hallazgos al origen `SEA-DIRECCIONES-2025` | Reutilización declarada en el catálogo, contrastada con tipo de publicación |
| **F07/F01** | Informe de registros cita la estimación registral del Mapa F01 | Reatribuir `P02__F07__01` a F01 y conservar el resto de F07 por sus análisis/entrevistas | Reutilización explícita en texto de referencia |
| **F02/F10** | F02 emplea también documentación FECU Social y F10 agrega reportes 2024 | Conservar ambas y marcar **posible base común**, solo cuando coexisten en P; verificar indicador y universo | Solapamiento **no confirmado** por claim |
| **F01/F02** | Hay dependencia potencial de registros administrativos en la base de F02 | Marcar **posible** y mantener ambas raíces hasta cotejo | Solapamiento **no confirmado** |
| **F11/F12 frente a F14** | F14 presenta FortalecidOS/gLOCAL en 2025; F11/F12 difunden el IFO 2025 publicado en 2026 | No declarar **dos estudios independientes**, pero tampoco fusionarlos automáticamente. Podrían compartir cohorte o referirse a etapas distintas | **No resuelto** |
| **F09/P17 y Focus** | Documento de mesa cita un estudio residencial con un 26% relativo a gastos complementarios | Raíz `FOCUS-RESIDENCIAL-ND` únicamente como referencia externa a verificar; sin población/N acreditados | **No auditada** |
| **F05** | El estudio de confianza contiene encuesta propia de personas y también cita otras estadísticas sectoriales | El hallazgo P11/F05 se conserva como percepción ciudadana, **no** como nueva medición de dolor operativo | Evidencia ciudadana, no organizacional |
| **F27** | InfoSISREC es un portal dinámico de proyectos/rendiciones | Requiere fecha de corte por indicador y no acredita la figura jurídica por nombre | Registro vivo |

Fuentes primarias/editoriales de contraste: [Trascender IFO 2025](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/); [Mesa F09 UC](https://politicaspublicas.uc.cl/publicacion/propuestas-presidenciales-en-sociedad-civil/); [Encuesta F04 UC](https://politicaspublicas.uc.cl/publicacion/resultados-encuesta-a-fundaciones-y-corporaciones-2025/); [Registro integrado F07 UC](https://politicaspublicas.uc.cl/web/content/uploads/2025/11/Informe_Registro-Unico_161025-VF.pdf); [presentación gLOCAL F14](https://fundaciontrascender.cl/fundacion-trascender-cierra-exitosa-participacion-en-la-semana-de-la-evaluacion-glocal-2025-presentando-fortalecidos/); [reporte FortalecidOS 2025](https://fundaciontrascender.cl/abrimos-nuevo-proceso-2025-invitamos-a-organizaciones-sociales-a-medir-su-nivel-de-fortalecimiento-y-crecer-sosteniblemente-con-el-programa-fortalecidos/).

**Contraste adicional:** la página de Trascender de 2025 informa un avance de **64 organizaciones** en el autodiagnóstico en el primer semestre; su difusión del IFO 2025 de junio de 2026 resume **110 OSC**. Estos son cortes o materiales potencialmente conectados, no evidencia suficiente para dos muestras independientes. No se suman ni se sustraen sin participantes/periodos homologados.

## 4. Matriz completa de 31 problemas (cobertura, no ranking)

| ID | Problema | Fichas F | Raíces documento | Raíces atribuidas a hallazgos | Hallazgos | Reutilizados | Riesgos o pendientes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| P02 | Interrumpimos servicios cuando no se renueva un convenio | 9 | 9 | 8 | 14 | 1 | F01/F02, F01/F07 |
| P11 | Nos faltan recursos para medir qué cambió con nuestros programas | 12 | 12 | 12 | 21 | 0 | F02/F10 |
| P13 | Nos cuesta asegurar ingresos estables para planificar | 16 | 15 | 15 | 28 | 0 | F11/F14, F12/F14 |
| P14 | Podríamos sostener pocos meses de operación sin aportes externos | 7 | 7 | 7 | 11 | 0 | — |
| P15 | Perdemos una vía habitual de financiamiento cuando desaparece una convocatoria | 2 | 2 | 2 | 3 | 0 | — |
| P16 | Las transferencias comprometidas llegan tarde | 8 | 8 | 7 | 13 | 1 | — |
| P17 | Tenemos que cubrir costos que el convenio no permite rendir | 8 | 8 | 9 | 15 | 0 | Origen extra: P17__F09__02 |
| P18 | La demora en la toma de razón impide iniciar actividades | 2 | 2 | 2 | 2 | 0 | — |
| P19 | Las garantías dificultan que organizaciones pequeñas contraten con el Estado | 4 | 4 | 4 | 6 | 0 | — |
| P20 | Nuestras rendiciones quedan abiertas por falta de respuesta | 7 | 7 | 6 | 9 | 1 | — |
| P21 | Nos piden rehacer rendiciones que ya habían aprobado | 4 | 4 | 3 | 6 | 1 | — |
| P22 | Nos cuesta rendir gastos en SISREC | 4 | 4 | 4 | 6 | 0 | — |
| P23 | Debemos traspasar la atención y los datos si no renuevan el convenio | 1 | 1 | 1 | 1 | 0 | — |
| P25 | Los requisitos dispersos nos dificultan recibir donaciones | 6 | 6 | 6 | 9 | 0 | — |
| P26 | Los trámites de algunos donantes complican obtener o rendir fondos | 4 | 4 | 4 | 6 | 0 | — |
| P28 | Nos cuesta mantener los contratos y retener especialistas | 7 | 7 | 7 | 11 | 0 | — |
| P30 | Nos cuesta aportar a políticas públicas en espacios dispersos e intermitentes | 8 | 8 | 8 | 17 | 1 | — |
| P32 | Nos falta capacidad de equipo para preparar la memoria y el balance | 9 | 9 | 9 | 14 | 0 | — |
| P38 | Tenemos que volver a entregar los mismos antecedentes | 2 | 2 | 2 | 5 | 0 | — |
| P40 | Nuestro acceso para enviar la memoria y el balance puede quedar bloqueado | 1 | 1 | 1 | 2 | 0 | — |
| P41 | Tenemos que completar o corregir envíos de memorias y balances | 1 | 1 | 1 | 2 | 0 | — |
| P43 | Tenemos que volver a postular mientras sostenemos un servicio | 3 | 3 | 3 | 6 | 0 | — |
| P46 | Nos cuesta dar a conocer nuestro trabajo para acceder a nuevas oportunidades | 8 | 7 | 7 | 12 | 0 | F11/F14, F12/F14 |
| P47 | Nos cuesta mantener al directorio al día sobre los planes que aprobó | 5 | 5 | 5 | 8 | 0 | — |
| P48 | Atendemos más casos que plazas financiadas con el mismo equipo | 1 | 1 | 1 | 2 | 0 | — |
| P49 | Tenemos que financiar la instalación antes de recibir el primer aporte | 2 | 2 | 2 | 4 | 0 | — |
| P50 | El cierre financiero deja saldos sin resolver tras terminar un convenio | 2 | 2 | 2 | 4 | 0 | — |
| P51 | Nos cuesta separar gastos de varios proyectos en una misma cuenta | 1 | 1 | 1 | 2 | 0 | — |
| P52 | Nos cuesta captar y mantener familias de acogida | 1 | 1 | 1 | 2 | 0 | — |
| P53 | Llegar a familias en zonas dispersas nos consume más tiempo y recursos | 1 | 1 | 1 | 2 | 0 | — |
| P54 | Nos falta equipo y tiempo para buscar donantes locales | 1 | 1 | 1 | 2 | 0 | — |

**Cómo leer columnas:** un P con 8 fichas puede tener 7 raíces atribuidas si una cifra solo reproduce otra; también puede mostrar 9 raíces cuando una mesa cita un estudio externo no inventariado (P17). Ninguno de esos valores puede compararse como «independencia estadística» ni interpretarse como incidencia.

La tabla de 31 registros incluye todas las fichas sin eliminar P48 (casos sectoriales) ni P30/P54 (segmentos ND), y no impone ranking por cantidad.

## 5. Entregables reproducibles y auditoría

- [Matriz completa JSON de 31 P, 147 vínculos y 245 hallazgos](./px-r2-1-linaje-31p-147v-245h-v1.json) con categorías de método, origen, referencias, posibles solapamientos y trazabilidad.
- [CSV 31 problemas](./px-r2-1-matriz-31-problemas-v1.csv) para revisar cobertura por P.
- [CSV 147 relaciones](./px-r2-1-matriz-147-relaciones-v1.csv) para inspeccionar duplicados por documento.
- [CSV 245 hallazgos](./px-r2-1-linaje-245-hallazgos-v1.csv) con origen atribuido y referencia original.
- [Validador Node.js de 35 pruebas](./validate-px-r21.mjs) integrado al workflow `baseline-integrity` en `.github/workflows/baseline-integrity.yml`.

**QA de entrada:** 26 F, 31 P, 147 relaciones, 245 hallazgos, cinco claims normalizados. El linaje de PX-R1.2a y la atribución PX-R1.2b se conservaron como archivos solo lectura.  
**QA estructural de salida:** cobertura 31/147/245, IDs únicos, URL/localizador, F09/F04, F07/F01, IFO único, Focus externo, F14 no fusionado, 4 problemas con solapamientos, fuente y problema sin huérfanos, P30/P54, ausencia de rankings y tasas, integridad de CSV.  
**Límite de auditoría:** los 245 pasajes no se reabrieron manualmente uno a uno contra las 26 publicaciones. La reatribución de cuatro hallazgos F09 viene identificada en la matriz R1.2b; cualquier cifra central que entre en el dashboard H-1 requiere comprobación de página/pregunta/N y fecha. QA estructural no equivale a validación estadística ni a independencia empírica certificada.

**No se modificó** el HTML H-0, colores, selector, producción v0.6, las 26 fuentes originales ni el catálogo de hallazgos.

## 6. Hallazgo sobre la siguiente fase: dificultad y división mínima

**PX-R2.2** estaba estimada **5/10**. La auditoría R2.1 obliga a manejar simultáneamente 31 problemas con términos amplios de clasificación temática, **121 registros de segmento y 87 cruces P×S parciales**, y distinguir hallazgos documentales de indicadores numéricos comparables según muestra, pregunta, N y periodo. Además, hay una fuente externa no auditada y varios pares que podrían reutilizar bases.

**Reestimación propuesta para cierre: PX-R2.2 5 → 6/10.** Dividirla en **dos** unidades, no más:

| Microfase | Dificultad | Trabajo y entregable | Por qué es importante |
| --- | --- | --- | --- |
| **PX-R2.2a · Taxonomía temática y distribución de evidencia** | **4/10** | Ordenar los 31 P en categorías comprensibles, calcular distribución de cobertura documental con este linaje y mostrar qué temas tienen menos información; acta y QA | Evita que una categoría genérica o un montón de documentos se confundan con problemas más frecuentes o graves |
| **PX-R2.2b · Públicos, cruces e indicadores comparables** | **5/10** | Auditar 121 S, 87 P×S parciales, separar universos/periodos/N; identificar qué números permiten comparaciones e interpretar incertidumbre, producir análisis base H-1 | Permite decidir qué oportunidades investigar para fundaciones versus el tercer sector sin extrapolar encuestas mixtas ni convertir ND en cero |

Después de **R2.2a** se reestima R2.2b. **H-1** solo comienza después de cerrar y auditar ambas. El siguiente paso no cambia el selector ya implementado.

## 7. Única próxima fase: PX-R2.2a (4/10)

**Qué hará:** construir una taxonomía de problemas clara para Juanra y DIMI, revisar su distribución y la cobertura de evidencias por tema, identificar áreas muy documentadas o con pocos respaldos y señalar solapamientos/lagunas. Entregables: matriz P×tema con una categoría principal por P, fichas excepcionales de temas cruzados, métricas documentales etiquetadas, pruebas y acta.

**Por qué importa:** la sección 01 necesita responder «de qué problemas tenemos más antecedentes y dónde hay oportunidades de investigar», antes de priorizar criticidad. Sin una taxonomía de temas y procedencia no podemos sintetizar visualmente 31 problemas con rigor. Eso desbloqueará R2.2b (comparación por segmentos) y posteriormente el checkpoint **H-1**, que convertirá esta investigación en visualizaciones de la página.

**Dificultad reestimada:** 4/10 para R2.2a, con QA al principio/final. Si su entrada cambia el riesgo, ajustar como exige el protocolo. No abrir H-1 antes.

