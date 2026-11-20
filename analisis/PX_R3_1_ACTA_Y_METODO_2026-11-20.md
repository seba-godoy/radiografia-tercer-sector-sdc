# PX-R3.1 · Separación de indicadores de criticidad

**Estado:** verificada como microfase documental. **Fecha:** 20 de noviembre de 2026, Santiago. **Dificultad:** 4/10 → 4/10. **Audiencia:** Juanra y DIMI. **Base:** publicación v0.7 del PR #21, commit `325274a1bd9c5b327e2118782981ea4cdcf9f16e`. Se ejecutó PX-R3.1 por solicitud del propietario. La activación de esta fase no implica validación de la rúbrica por Juanra.

## Resultado y método

La matriz v1 en [CSV](./px-r3-1-matriz-indicadores-31-v1.csv) y [JSON](./px-r3-1-matriz-indicadores-31-v1.json) registra 31 problemas, un indicador principal por problema, unidad, población, base, ventana temporal, página y una lectura del posible daño o del límite de inferencia. Se parte de M17a/M17c, del linaje PX-R2.1 y del mapa H-1, con el runbook de criticidad y el roadmap vigente como contrato. Los recuentos de cobertura son 31 problemas, 147 vínculos con 26 publicaciones y 245 hallazgos. Las raíces acreditadas son candidatas y no un conteo de estudios independientes.

| Dimensión | Qué permite usar este corte |
| --- | --- |
| Documentación | Conteos y linaje por problema. Las cifras de cobertura no entran en un puntaje de criticidad. |
| Frecuencia | Episodios de un problema por organización y unidad de tiempo. Los 31 quedan ND en esta matriz. |
| Proporción dentro de la muestra | Nueve problemas tienen al menos un ítem principal sobre ocurrencia declarada. Se limita a la pregunta y población observadas. |
| Prevalencia nacional o exclusiva de fundaciones y extensión territorial | ND en las 31 filas del corte. Se conserva el alcance de cada fuente; citar Chile o un sector no mide distribución geográfica. |
| Daño y urgencia | Se conservan consecuencias descritas y umbrales declarados, cuando existen. La magnitud del daño y la ventana de intervención comparables quedan ND en las 31 filas. |

**F03, 15 fichas.** El PDF de la encuesta UC 2026 fue cotejado en las pp. 13, 20–22, 28, 32–33 y 35–36. Las bases son 125 con contratos/convenios estatales en 2025 (10 fichas), 200 receptoras de donaciones privadas en 2025 (1), 219 respuestas al escenario hipotético (1) y 255 encuestas válidas (3). Es una muestra mixta e intencional. Las 15 fichas comprenden nueve sobre situaciones reportadas, una condición reportada (P19), tres percepciones (P25, P26, P28), una prioridad (P13) y un escenario hipotético (P14). Esta tipificación aplica al indicador seleccionado y no a todos los pasajes de la ficha.

**Otras fuentes, 16 fichas.** Se cotejaron pasajes o notas primarias de F07, F08, F09, F10, F11, F16, F22 y F26. Hay 14 diagnósticos, descripciones de proceso, testimonios o casos, un autodiagnóstico (P46) y una distribución de menciones (P54). Entre las correcciones de localizador para esta matriz, F07 p. 28 sustenta la repetición documental en P38; F08 p. 17 muestra la verificación que habilita la carga en P40; F26 p. 158 sustenta el vínculo entre sobrecupos, recursos y dotación en P48; F26 p. 140 recoge el testimonio sobre P50. Estas correcciones se registran en la matriz nueva.

**Ejemplos auditados.** P20 conserva 62% de N=125 sobre falta de respuesta en el plazo contractual y 42% sobre revisiones superiores a siete meses, sin inferir solapamiento ni frecuencia de episodios. P48 describe una presión operativa en protección especializada. P54 usa 82 menciones de 51 OSC en el gráfico 25, una base distinta de una proporción por organización. P46 usa el autodiagnóstico IFO y F11/F12 comparten origen. P28 mantiene sus dos ítems de 52% por separado.

## Auditoría de salida

- PASS · 16 comprobaciones específicas sobre identidad, sumas, fuentes, bases, tipos, ND y contraejemplos. Incluyen los dos ítems P17/P28, los N de F03, P48, P54 y el origen F11/F12.
- PASS · Equivalencia de los 31 registros y campos entre CSV y JSON.
- PASS · Baseline 54 verificaciones; comparabilidad PX-R2.2b 82 comprobaciones ejecutadas; MF-1 88 verificaciones. El validador heredado R2.2b imprime un denominador fijo desactualizado de 80.
- Alcance del cotejo · Se revisó el pasaje principal de cada fila en nueve documentos o páginas primarias. Para P46 se cotejó la nota institucional de F11, no la tabla del informe IFO. No se realizó una reauditoría individual de los 245 hallazgos ni una búsqueda exhaustiva de evidencia nueva. ND expresa insuficiencia en el corte.
- Reversión · Archivos aditivos de investigación, reversibles al descartar la rama. Los datasets canónicos, HTML, bandas editoriales, puntajes y producción permanecen intactos.

## Próxima microfase

**PX-R3.2 (5/10), diseñar la rúbrica.** Traducir impacto, frecuencia, alcance y urgencia a reglas observables, con niveles cuando existe respaldo, ND donde falte y juicio experto identificado. Es el paso que permite aplicar un mismo criterio por problema y replicar las decisiones en PX-R3.3. Los pesos permanecen como propuesta hasta aprobación.
