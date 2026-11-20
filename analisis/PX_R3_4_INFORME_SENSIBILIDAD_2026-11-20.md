# PX-R3.4 · Sensibilidad y escenarios del ranking de criticidad

**Corte:** 20 de noviembre de 2026, Santiago. **Dificultad:** 5/10 → 5/10. **Estado:** análisis de sensibilidad documental y computacional verificado. **Entrada:** rúbrica 0.1.0 y matriz PX-R3.3 de 124 celdas, commit `9d477da1598596317e37ea3ae3b58c0440d3f04c` (PR #24). Se prueba qué resultados cambiarían si se adoptaran distintos pesos o cortes. PX-R3.6 mantiene la validación humana y los pesos siguen siendo propuestas.

## Escenarios y qué sostiene la evidencia

Se fijaron los cuatro perfiles de pesos antes de calcular. La elección de perfiles refleja tres preguntas distintas. Las cifras de convenios y sostenibilidad conservan sus poblaciones originales. Cambiar un peso no amplía la población ni provee un dato faltante.

| Perfil | Pesos I / F / A / U | Pregunta de decisión | Evidencia elegible y límite |
| --- | --- | --- | --- |
| Base propuesta | 35 / 25 / 25 / 15 | Sensibilidad respecto de los pesos heredados. | 124 celdas ND en el escenario de fundaciones en Chile. |
| Continuidad | 50 / 15 / 15 / 20 | ¿Qué pérdidas de servicio y ventanas de intervención importan más? | P02 tiene una señal de alcance en F03 N=125. P48 documenta presión por sobrecupo y dotación en prestadores de protección especializada. Falta impacto y urgencia comparables. |
| Convenios | 25 / 20 / 45 / 10 | ¿Qué cambia si pesa más cuántas organizaciones declaran el problema? | Siete niveles de alcance de las 125 fundaciones y corporaciones encuestadas con contratos o convenios estatales durante 2025. Impacto, frecuencia y urgencia siguen sin mediciones comparables para esos siete problemas. |
| Sostenibilidad | 45 / 25 / 15 / 15 | ¿Qué cambia si importan más la pérdida operativa y su recurrencia? | P14 registra que 38% de N=219 estima poder operar menos de tres meses si cesan los aportes. Es autonomía hipotética. P50 documenta saldos retenidos en un caso sectorial. Ninguna señal entrega magnitud comparable de pérdida ni episodios recurrentes. |

**Resultado de los cuatro perfiles:** cero puntuaciones globales calculables y cero pares con orden global robusto entre los siete problemas muestrales (21 pares). Esto significa que los datos faltantes permiten ambos órdenes en la prueba condicional. En las 31 fichas del escenario nacional siguen los 124 ND; el alcance observado se mantiene en su población original.

## Qué se mantuvo y qué cambió al probar umbrales

Se cruzaron **27 combinaciones moderadas** de los tres cortes internos de alcance. Los cortes fueron 3/5/7%, 15/20/25% y 45/50/55%, respectivamente. Para cada porcentaje publicado se evaluó un margen conservador de ±0,5 puntos porcentuales por redondeo. Ese margen no representa incertidumbre muestral.

| Nivel A estable en las 27 pruebas | Problemas en la submuestra F03 N=125 |
| --- | --- |
| **A4** | P20 rendición sin respuesta (62%) y P16 transferencias tardías (57%). |
| **A3** | P21 rendiciones reabiertas (43%), P18 demora de toma de razón (42%), P22 dificultad con SISREC (40%) y P02 interrupción por no renovación (28%). |
| **A2** | P23 traspaso de intervención por no renovación (10%). |

**Estrés de siete cortes superiores:** con los dos cortes inferiores fijos en 5% y 20%, se probó el umbral de A4 entre 35% y 65%, en pasos de 5 puntos. Al llevarlo a 60%, P20 conserva A4 y P16 baja a A3. A 65%, ambos quedan empatados en A3. Al fijarlo en 40%, P22 cruza el corte por efecto del redondeo y su nivel puntual queda indeterminado entre A3 y A4. Como la escala es monótona, variar el corte puede abrir o cerrar empates, pero no invertir el orden de los porcentajes publicados.

## Empates e inversiones bajo supuestos explícitos

Para comprobar si el alcance obligaría a mantener un orden, se hizo una prueba **hipotética** en la escala 0–4. Para cada dimensión ND se examinó el conjunto de diferencias posibles entre dos problemas, respetando únicamente los límites matemáticos de la escala. Se mantuvo fijo el alcance observado donde existía. El supuesto de prueba es que las cuatro dimensiones fueran comparables y la suma de niveles ordinales estuviera autorizada. Los extremos son límites matemáticos condicionales y no intervalos de confianza, estimaciones ni imputaciones. La matriz permanece ND.

| Perfil | Diferencia posible P02 − P20, muestra N=125 | Si P02 tuviera un nivel más de impacto e igual F y U |
| --- | --- | --- |
| Base propuesta | −3,25 a +2,75 | +0,10 |
| Continuidad | −3,55 a +3,25 | +0,35 |
| Convenios | −2,65 a +1,75 | −0,20 |
| Sostenibilidad | −3,55 a +3,25 | +0,30 |

- **P02 / P20.** P20 tiene un nivel de alcance más en la escala muestral original. El ejemplo mantiene la misma hipótesis de impacto y cambia solo los pesos. P02 queda arriba con continuidad y P20 con convenios. Bajo la base, si P02 en cambio tuviera un nivel más de frecuencia e igual impacto y urgencia, ambos empatarían: el peso de F iguala al de A. Todas esas configuraciones son ilustrativas.
- **P48 / P50.** Sobrecupo y demora de cierre tienen mecanismos documentados en F26. Con los cuatro criterios ND en el escenario principal, la diferencia condicional va de −4 a +4 en cada perfil, con empate y ambos órdenes posibles. El dato disponible conserva dos alertas sectoriales y no distingue su prioridad relativa.
- **Datos que permitirían avanzar:** para P02 y P20, pérdida de servicio, episodios por organización y plazo restante para evitar daño. Para P48, brecha de dotación y pérdida de atenciones por episodio; para P50, saldos y servicios comprometidos, plazos de cierre y posibilidad de recuperación. En ambos casos sectoriales se requiere una base desagregada de entidades para trasladar resultados a un universo de fundaciones.

## Reproducción, fuentes y auditoría

- Ejecutar `python3 analisis/px_r3_4_sensibilidad.py` y contrastar la salida con [resultados JSON](./px-r3-4-resultados-sensibilidad-v1.json). El script verifica malla 31×4 y ND, elegibilidad N=125, sumas de pesos, bloqueo de totales, ambigüedad de los 21 pares, estabilidad moderada, estrés de P16/P20/P22 y ejemplos de empate e inversión.
- QA local: resultados reproducidos byte a byte; baseline 54/54; cotejo puntual de F03 pp. 13, 21–22 y 35 y F26 pp. 140 y 158. El catálogo y la matriz de entrada se conservaron. Las pruebas no incluyen validación humana ni levantamiento nuevo.
- Fuentes: [F03, ficha técnica y convenios, pp. 13 y 21–22](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=13) · [F03, autonomía hipotética, p. 35](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=35) · [F26, saldos de cierres, p. 140](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=140) · [F26, sobredemanda y dotación, p. 158](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=158) · [HM Treasury, guía MCDA, §4.5](https://www.gov.uk/government/publications/green-book-supplementary-guidance-multi-criteria-decision-analysis/use-of-multi-criteria-decision-analysis-in-options-appraisal-of-economic-cases#step-5-conduct-sensitivity-analysis-on-initial-results).
- Reversión: informe, script y resultados aditivos en la rama de PX-R3.4. El sitio, la matriz de PX-R3.3 y las bandas editoriales quedan fuera del cambio.

**Siguiente microfase · PX-R3.5 (4/10).** Convertir en pruebas adversariales reproducibles los seis fallos del runbook: sumar los ítems P28, tratar menciones F22 como organizaciones, duplicar el IFO F11/F12, extrapolar F26, mezclar N=125 y N=255 e imputar ND como cero. El entregable será una suite con evidencia de ejecución que detecte esos errores antes de la validación del método en PX-R3.6.
