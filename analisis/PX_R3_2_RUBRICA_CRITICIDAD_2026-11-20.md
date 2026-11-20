# PX-R3.2 · Rúbrica de criticidad propuesta

**Corte:** 20 de noviembre de 2026, Santiago. **Versión:** 0.1.0, propuesta. **Dificultad:** 5/10 → 5/10. **Audiencia:** Juanra y DIMI. **Entrada auditada:** [matriz PX-R3.1](./px-r3-1-matriz-indicadores-31-v1.json), commit `ca304d50bbc2e324ec67382ded103dcbd5902b1b`, y antecedentes M17c. El runbook PX-2.2 corresponde a PX-R3.2 en el roadmap vigente. Las reglas y los umbrales de este documento se proponen para calibración. La ejecución de esta microfase autoriza el diseño, mientras la validación de niveles y pesos corresponde a PX-R3.6.

## Contrato de observación

Antes de revisar problemas, declarar escenario, universo jurídico, territorio, ventana, definición de episodio, unidad afectada y resultado operativo. Usar una ventana de 12 meses para frecuencia y alcance. Para cada celda guardar estado, valor crudo o intervalo, unidad, N y unidad de N, población, período, método, fuente y página, identificador de medición, versión de escala y justificación. Si no es puntuable, registrar el dato disponible como contexto y la razón del ND. Para impacto definir el resultado y denominador de referencia antes de ver los niveles. Comparar únicamente celdas de escenarios y unidades equivalentes.

| Criterio | Pregunta y medición | Evidencia mínima |
| --- | --- | --- |
| **Impacto (I)** | ¿Cuánto cae el resultado operativo en una organización afectada por episodio? Mediana del % de pérdida de un resultado operativo comparable respecto de su referencia. Calcular por episodio, resumir primero dentro de cada organización y luego tomar la mediana entre organizaciones. | Resultado o capacidad efectivamente perdido, base de referencia positiva, vínculo sustentado con el episodio y recuperación o ventana de seguimiento común. Horas, CLP, testimonios y consecuencias graves se registran por separado cuando carecen de equivalencia justificada con ese resultado. |
| **Frecuencia (F)** | ¿Cuántas veces vuelve a ocurrir dentro de una organización? Mediana del número de episodios en 12 meses entre organizaciones que tuvieron al menos uno. Los episodios se identifican y deduplican antes de calcular. | Seguimiento de 12 meses por organización y recuentos de episodios. Si un seguimiento elegible del universo pertinente registra cero episodios, nivel 0. Una proporción de organizaciones o duración de una espera no estima episodios. |
| **Alcance (A)** | ¿Qué parte de la población del escenario tuvo al menos un episodio en 12 meses? % de organizaciones elegibles afectadas, con una observación por organización. | Pregunta alineada con la ocurrencia, numerador o proporción reportada, denominador de organizaciones elegibles y población transferible al escenario. Una muestra intencional se puede usar exclusivamente para un escenario explícitamente restringido a su muestra. Territorio y desagregaciones se registran aparte. |
| **Urgencia (U)** | ¿Cuánto tiempo queda desde que puede iniciarse una intervención hasta el último momento en que evitaría un daño adicional documentado? Mediana de días naturales disponibles por organización, con una definición de daño adicional común. | Fecha de referencia, umbral operativo con consecuencia sustentada y plazo restante. Una espera ya transcurrida o un plazo contractual por sí solo no establece el tiempo restante para una intervención eficaz. Si el plazo ya venció, solo usar 0 días cuando exista evidencia de que una respuesta inmediata todavía puede reducir daño adicional. |

**Unidad de análisis.** Para impacto y urgencia, usar medianas por organización como regla de resumen cuando hay varios episodios por entidad. Mantener mismo resultado operativo, período y criterio de selección. Registrar consecuencias críticas que la mediana podría ocultar como señales independientes para revisión humana. Si solo se conoce un caso y el escenario está definido como una población mayor, su magnitud no pasa a nivel poblacional. Para frecuencia, enrutar el caso de seguimiento verificable sin episodios como cero documentado; sin seguimiento o con denominador faltante, registrar ND. Contrastar que I, F, A y U representen dimensiones distintas. Una sola encuesta puede aportar más de una si usa mediciones diferentes y trazables; copiar la misma cifra en varios criterios queda fuera del método.

## Escalas provisionales 0–4

Los cortes son decisiones de diseño para calibrar en las próximas microfases. Las escalas son ordinales. Los intervalos declaran qué ocurre exactamente al cruzar cada borde. Punto y límites del intervalo deben estar dentro del dominio del criterio.

| Nivel | I · pérdida por episodio (%) | F · episodios por organización afectada / 12 meses | A · organizaciones de la población afectadas (%) | U · días restantes |
| --- | --- | --- | --- | --- |
| **0** | 0% documentado | 0 episodios, con seguimiento elegible | 0% documentado | Más de 90 |
| **1** | Mayor a 0% y menor a 5% | Desde 1 y menos de 2 | Mayor a 0% y menor a 5% | Más de 30 y hasta 90 |
| **2** | Desde 5% y menos de 15% | Desde 2 y menos de 4 | Desde 5% y menos de 20% | Más de 7 y hasta 30 |
| **3** | Desde 15% y menos de 30% | Desde 4 y menos de 12 | Desde 20% y menos de 50% | Más de 2 y hasta 7 |
| **4** | Desde 30% hasta 100% | 12 o más | Desde 50% hasta 100% | Desde 0 hasta 2 |

Un porcentaje de cero redondeado o un conteo sin cobertura acreditada queda ND para el nivel 0. Una mediana fraccionaria entre 0 y 1 es incompatible con el denominador condicionado de F. Comparar sin redondear antes del corte. Cuando una estimación incluya un intervalo que cae en más de un nivel, guardar el intervalo y los niveles posibles, con nivel puntual ND. Si solo se publica un valor redondeado y su precisión podría cambiar el nivel en el borde, registrar esa ambigüedad o recuperar el original.

## Estados, juicio experto y pesos

| Estado | Cuándo corresponde | Cómo se usa |
| --- | --- | --- |
| **Observado** | Medición directa documentada o respuesta directa sobre lo que se preguntó, con unidad, población y período adecuados. | Puede determinar un nivel provisional del escenario compatible. Marcar explícitamente encuesta autorreportada, caso o registro. |
| **Estimado** | Aproximación con método, supuestos, fuente y límites reproducibles. | Conservar el intervalo. Un nivel provisional procede solo si todo el intervalo cae en un nivel. |
| **Juicio experto** | Un evaluador identificado emite una valoración dentro de un ejercicio autorizado, con fecha, criterio, evidencia, justificación, desacuerdos y conflictos de interés. | Guardar como opinión en capa separada. La celda empírica sigue ND si falta medición. Una opinión sin respaldo ni autoría queda como hipótesis abierta. |
| **ND** | Variable ausente, proxy incompatible, escenario fuera de alcance, calidad insuficiente, discrepancia no resuelta o intervalo que cruza umbrales. | Es un estado, sin valor numérico. Conservar razón: dato ausente, unidad, población, período, definición, incertidumbre o conflicto. |

**Propuesta heredada:** impacto **35%**, frecuencia **25%**, alcance **25%**, urgencia **15%**. Conservar pesos y anclajes para validación y análisis de sensibilidad. Una suma ponderada requeriría cuatro celdas válidas y comparables para el mismo escenario, más aprobación explícita de pesos y de la transformación de niveles ordinales en valores cardinales. Con una celda ND el total queda ND. Quedan fuera la imputación, la redistribución automática de pesos y el uso de juicio experto como sustituto de medición. Aprobar la escala y revisar la doble contabilización antes de considerar un ranking.

## Calibración y ejemplos de frontera

- **P20 · respuesta a rendiciones.** F03 p. 22 reporta 62% de 125 organizaciones encuestadas con convenios y un 42% para revisiones superiores a siete meses. Se conserva el 62% como alcance declarado dentro de esa muestra, identificada como mixta e intencional, y se separa del dato de duración. Si se definiera un escenario limitado a esas 125 organizaciones y se calibrara el corte de A, el 62% encajaría en A4 como **ejemplo de la regla**. En un escenario nacional o exclusivo de fundaciones, A es ND. F, I y U siguen ND para este pasaje. [F03, PDF p. 22](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=22)
- **P48 · sobrecupos y dotación.** F26 p. 158 describe dificultades de dotación y atraso de recursos para atender sobrecupos. Se registra la consecuencia sectorial. Sin una pérdida operativa comparable, episodios por entidad, fracción afectada o ventana de intervención medidos, las cuatro celdas son ND para el pasaje. [F26, PDF p. 158](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=158)
- **Fronteras sintéticas.** I=5% da I2; A=20% da A3; F=4 episodios da F3; U=2 días da U4 y U=7 da U3. Una estimación de A entre 18% y 22% da nivel puntual ND y niveles posibles 2–3. Sin observación, cero y ND siguen siendo estados distintos. Los ejemplos no son calificaciones de la matriz.

**Protocolo de revisión.** Dos revisores reciben el mismo escenario y evidencia, clasifican cada celda en forma independiente y registran métrica, estado, nivel o motivo de ND. Comparar primero elegibilidad y luego nivel; ante desacuerdo conservar ambas razones, devolver la celda a ND si no hay resolución y ajustar el diccionario cuando la regla sea ambigua. Los casos de frontera permiten calibración previa. No se ha realizado una prueba interevaluador con personas.

## Auditoría y continuidad

- Base de entrada: 31 problemas en PX-R3.1, CSV y JSON equivalentes, sin puntajes aprobados; rama de investigación sobre PR #22. Las bandas editoriales, datos fuente, portal y producción quedan fuera de la microfase.
- PASS · 42 casos de frontera y dominio y seis controles de contrato e intervalos con el [contrato JSON](./px-r3-2-rubrica-criticidad-v0.1.json). Dos implementaciones independientes de las comparaciones numéricas coinciden en los casos de prueba. Este control es documental y computacional.
- PASS · Baseline 54/54 y preservación de 31 filas de entrada.
- Referencia de método: el [manual británico de análisis multicriterio](https://www.gov.uk/government/publications/multi-criteria-analysis-manual-for-making-government-policy), cap. 5 §§5.1 y 5.4.4.5, y cap. 6 sobre ponderación. Orienta la matriz, la revisión de doble conteo y la calibración de pesos. Los cortes concretos son propuestas de este proyecto.
- Reversión: dos archivos aditivos en rama de investigación; descartar su diferencia respecto de PX-R3.1.

**Siguiente microfase · PX-R3.3 (5/10).** Completar las 124 celdas de 31 problemas × 4 criterios en el escenario explícito que se declare. Guardar dato bruto, fuente, decisión y versión por celda. Esto identifica qué comparaciones pueden sostenerse con la evidencia y qué supuestos deberán ponerse a prueba en PX-R3.4.
