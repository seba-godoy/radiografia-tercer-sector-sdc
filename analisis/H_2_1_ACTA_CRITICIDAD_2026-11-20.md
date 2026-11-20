# H-2.1 · Contrato de datos de criticidad por universo

**Corte del 20 de noviembre de 2026.** Dificultad de ejecución 4/10 → 4/10. Trabajo documental autorizado. Base PX-R3.5, commit `b5f2edbf0aeae4c29965b3f329df893c31f8c8c1` (PR #26). La aprobación de pesos y la autorización de implementación o publicación de H-2 se gestionan en el roadmap.

## Entregable

El [contrato JSON](./h-2-1-criticidad-por-universo-v1.json) organiza los 31 problemas del catálogo por las dos vistas globales. Reutiliza la atribución de hallazgos del banco MF-1 y los registros de PX-R3.1 y PX-R3.3. Cada vista ofrece 124 estados de criterio, con el motivo de insuficiencia, la unidad que se requiere y las observaciones muestrales cuando corresponden. Las observaciones de fuente conservan población, base, período, unidad, localizador y límites. Los identificadores permiten recuperar los hallazgos del banco. El orden JSON sigue el catálogo.

| Vista | Evidencia documental | Mediciones comparables por criterio | Problemas elegibles para ranking |
| --- | --- | --- | --- |
| Tercer sector | 31 documentados en el catálogo de OSC | 0 impacto, 0 recurrencia, 0 alcance, 0 urgencia | 0 |
| Fundaciones | 6 con algún hallazgo específico, 13 con evidencia mixta como mejor respaldo y 12 con aplicabilidad por confirmar | 0 impacto, 0 recurrencia, 0 alcance, 0 urgencia | 0 |

Los seis problemas con mención específica se cuentan por clase del hallazgo catalogado. La clase describe la población a la que se refiere el pasaje. Para el alcance en el tercer sector se examinó la unidad, población y ventana de los indicadores principales de PX-R3.1, junto con las limitaciones del catálogo y la matriz PX-R3.3. Los resultados corresponden al corte documental disponible. El trabajo no reabre los 245 pasajes ni abarca una nueva búsqueda exhaustiva.

## Qué puede presentarse y qué datos faltan

- Se conservan siete porcentajes autorreportados de alcance en el bloque de convenios de F03. Comparten una muestra mixta de 125 encuestadas, un período y la fuente. Describen ítems específicos, algunos con exposición distinta, como la dificultad con SISREC. Se pueden presentar como resultados de ese bloque. Falta impacto, recurrencia y urgencia comparables incluso dentro de la muestra. [Encuesta UC 2026, pp. 19–22](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=19)
- En P20, el 62% se conserva con N=125. El 42% de duración de la revisión conserva base no acreditada para ese ítem en el registro. P48 mantiene los testimonios de protección especializada y P54 mantiene la unidad de 82 menciones de 51 OSC.
- Para un ranking parcial futuro hay que definir una población elegible y un período comunes para un conjunto de problemas. Se requiere recuento de organizaciones afectadas sobre la base elegible, episodios por organización afectada, magnitud del daño operativo y tiempo disponible antes de un daño adicional. Los pesos deben validarse y el orden debe someterse a sensibilidad. Si los datos se levantan primero para fundaciones o un segmento acotado, el resultado se circunscribe a ese grupo.

## Auditoría y relevo

- PASS · seis comprobaciones H-2.1, reproduciendo el JSON, 31 problemas, 245 referencias, dos vistas, 248 estados, aplicabilidad, límites de base y trazabilidad.
- PASS · seis familias adversariales de PX-R3.5, 54 controles de integridad y 31 controles del selector.
- ND · revisión humana de los pesos, reauditoría individual de los 245 pasajes y QA de navegador para la sección 02.
- Reproducción: `python3 analisis/build_h_2_1.py --check` y `python3 analisis/validate_h_2_1.py`. Reversión: retirar esta rama documental.
- **Siguiente prevista H-2.2 · 5/10 → 5/10.** La matriz ya es reproducible. Queda integrarla con el selector global, preparar la preview de Criticidad y su trazabilidad hacia Métodos y fuentes, y validarla en escritorio y móvil. La autorización pedida en esta ejecución corresponde a H-2.1.
