# PX-R3.3 · Aplicación controlada de la rúbrica de criticidad

**Fecha:** 20 de noviembre de 2026, Santiago. **Dificultad:** 5/10 → 5/10. **Estado:** aplicación documental verificada de una rúbrica provisional. **Entrada:** PX-R3.1 y rúbrica 0.1.0 del commit `46af9862ec13202e344d4579e55310af93458415` (PR #23). La solicitud del propietario autoriza la aplicación de prueba. La validación de niveles, pesos y método corresponde a PX-R3.6.

## Escenarios y decisión de inclusión

- **Principal:** fundaciones en Chile, con 2025 como ventana analítica de referencia. Se eligió por el objetivo de la investigación y porque coincide con la batería de convenios en F03. Se exige desglose jurídico y evidencia transferible para generalizar al universo. Períodos distintos aparecen con su etiqueta original. Para impacto, se fijó un resultado operativo por problema y la referencia sería el volumen planificado para un episodio comparable. Para urgencia, el plazo se mide desde la intervención viable hasta el umbral documentado de daño adicional.
- **Lectura muestral de alcance:** 125 fundaciones y corporaciones encuestadas con contratos o convenios estatales en 2025. F03 es una encuesta intencional levantada en 2026. En este recorte se usa un ítem por problema solo si describe un episodio alineado, con denominador y referencia de 12 meses. Los porcentajes redondeados se verificaron contra sus cortes con ±0,5 puntos porcentuales. Los siete niveles permanecen estables en ese intervalo. Esta comprobación trata el redondeo y no equivale a un intervalo estadístico de confianza. [Ficha técnica, PDF p. 13](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=13)
- Los motivos ND se evalúan por criterio. Las celdas incluyen dato contextual, fuente, período, denominador, versión y criterio específico de exclusión. Los valores elegibles y el nivel se almacenan como nulos en JSON. La matriz de este paso no aplica pesos ni genera puntajes globales. No se realizó una evaluación experta autorizada ni una revisión humana interevaluador.

## Resultado

| Universo | Impacto | Frecuencia | Alcance | Urgencia |
| --- | --- | --- | --- | --- |
| Fundaciones en Chile, escenario principal | 31 ND | 31 ND | 31 ND | 31 ND |
| Submuestra F03 N=125 | Fuera de la lectura descriptiva | Fuera de la lectura descriptiva | 7 niveles de alcance observados y autorreportados; 24 problemas sin nivel muestral aplicable | Fuera de la lectura descriptiva |

Se integraron en la misma fila los campos muestrales cuando correspondía, conservando **124 celdas** principales. [Matriz CSV](./px-r3-3-matriz-aplicacion-124-v1.csv) · [Matriz JSON](./px-r3-3-matriz-aplicacion-124-v1.json).

| Problema | Ítem de alcance en la muestra, N=125 | Nivel A provisional | Fuente |
| --- | ---: | ---: | --- |
| P02 · interrupción por no renovación | 28% | 3 | F03 p. 21 |
| P16 · transferencias fuera de plazo | 57% | 4 | F03 p. 21 |
| P18 · inicio impedido por toma de razón | 42% | 3 | F03 p. 21 |
| P20 · rendición sin respuesta en plazo | 62% | 4 | F03 p. 22 |
| P21 · volver a rendir cuentas aprobadas | 43% | 3 | F03 p. 22 |
| P22 · dificultad con SISREC | 40% | 3 | F03 p. 22 |
| P23 · traspaso por no renovación | 10% | 2 | F03 p. 21 |

- **P15.** El 54% sobre convocatorias no realizadas y el 39% sobre dejar de postular son ítems distintos. El problema se definió como pérdida de una vía de financiamiento por cancelación. Falta el cruce que sostenga esa relación por organización.
- **P17.** El 52% de gastos financieros y el 40% de gastos operativos corresponden a dos ítems. Falta la unión para un alcance global y el dato de costo efectivamente cubierto.
- **P20.** El 42% describe revisiones que duraron más de siete meses. La ventana restante para prevenir daño sigue ND. La coincidencia entre ambos ítems sigue ND.
- **P22.** El 40% usa las 125 encuestadas con convenios como denominador de publicación; la tasa entre usuarias efectivas de SISREC sigue ND.
- **P48/P54.** P48 conserva el daño operativo descrito en protección especializada. P54 conserva la distribución de 82 menciones entre 51 OSC. Ninguna de estas dos observaciones suministra una tasa comparable de fundaciones afectadas.

## Auditoría

- PASS · 12 controles de malla 31 × 4, estados, población, integridad de fuentes, pesos no aplicados, casos adversariales y equivalencia de CSV/JSON.
- PASS · Cotejo de las siete observaciones con pp. 21–22 de F03 y de la base/método con p. 13. Se conservan el porcentaje publicado y el denominador, sin inferir numeradores enteros.
- PASS · Baseline local 54/54. Se usaron las evidencias principales de PX-R3.1 y se cribaron pasajes del catálogo para buscar medidas compatibles. No se reabrieron ni revalidaron individualmente los 245 pasajes. Los ND representan la evidencia revisada en este corte.
- Reversión · Archivos aditivos de investigación en rama separada sobre PX-R3.2. Los catálogos, las bandas editoriales y la web quedan fuera de esta microfase.

## Siguiente microfase

**PX-R3.4 · Sensibilidad y escenarios (5/10).** Comparar continuidad, convenios y sostenibilidad. Con 124 ND en el escenario principal, la sensibilidad debe identificar qué depende de hipótesis o umbrales y qué puede concluirse dentro de la muestra. El entregable es un reporte de escenarios, vacíos y robustez de resultados condicionales. Permite identificar qué decisiones cambiarían al ajustar supuestos y qué evidencia faltaría para sostener una priorización.
