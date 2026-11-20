# PX-R3.5 · Auditoría adversarial del método de criticidad

**Corte:** 20 de noviembre de 2026, Santiago. **Dificultad de ejecución:** 4/10 → 4/10. **Estado:** QA documental y computacional verificado en rama. **Base:** `f8d31ab6c81a38137648168189a6371b8a76fe47` (PR #25), con matriz PX-R3.3 y escenarios PX-R3.4. La solicitud del propietario autoriza la suite. La calibración y la validación humana corresponden a PX-R3.6.

## Pruebas y resultados

La [suite](./validate_px_r3_5_adversarial.py) carga el banco MF-1, los hallazgos catalogados, las afirmaciones canónicas, la matriz PX-R3.3 y la regla de elegibilidad del total en PX-R3.4. En cada familia se verifica el comportamiento legítimo y se inyecta el error. Las comprobaciones de proyección usan una referencia de fuente explícita; cubren los casos enumerados y no constituyen un extractor o verificador general de afirmaciones.

| Familia | Caso válido aceptado | Manipulación rechazada | Resultado |
| --- | --- | --- | --- |
| P28 · estabilidad y retención | Dos ítems de 52%, por separado | Sumarlos como 104% o presentar un total de 100% o 52% sin información de intersección | PASS |
| F22 · unidad y denominador | El gráfico 25 usa 82 menciones provenientes de 51 OSC | Presentar 82 organizaciones como base o recalcular el porcentaje publicado sobre 51 OSC | PASS |
| F11/F12 · linaje | Dos publicaciones y una raíz IFO | Contar la presentación y el informe como dos estudios independientes | PASS |
| F26 · extrapolación | El diagnóstico de colaboradores de protección especializada se usa dentro de su alcance sectorial | Convertirlo en tasa nacional de fundaciones o inventar un porcentaje sectorial | PASS |
| F03 · base por pregunta | P20 conserva 62% y N=125; el registro del 42% conserva su base como ND | Cambiar N=125 a N=255 y copiar N=125 al otro ítem sin acreditar su base específica | PASS |
| ND · imputación y agregado | Conservar nulos y permitir cero documentado cuando ya es observado | Rellenar una celda ND con cero. El total sigue no calculable en los cuatro perfiles con datos faltantes | PASS |

**Resultado de ejecución:** seis pruebas, once variantes incorrectas rechazadas y control de aceptación en las seis familias. Se preservan las 124 celdas y la falta de autorización para agregar niveles. Se verificó que el resultado de sensibilidad se reproduce byte a byte y el baseline local aprobó 54/54. La suite queda incorporada al flujo baseline-integrity de la rama.

La revisión documental cotejó F03 pp. 13, 21–22 y 36, F22 p. 47 y F26 p. 158. El alcance del IFO y sus publicaciones se contrastaron con el banco de fuentes y la publicación institucional. El contrato trata explícitamente la base de la pregunta secundaria de P20 como no acreditada para este corte. No se reauditaron los 245 hallazgos ni se volvió a evaluar la concordancia entre revisores humanos.

Fuentes de contraste: [F03](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf) · [F22, gráfico 25](https://uai.cdn7pm.net/documentos/filantropia-local-desafios-y-buenas-practicas-en-chile.pdf#page=47) · [IFO Trascender](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/) · [F26, sobredemanda y dotación](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=158).

**Reproducción:** `python3 analisis/validate_px_r3_5_adversarial.py`. **Reversión:** descartar el diff de esta rama respecto de PX-R3.4. El portal y las matrices canónicas quedan fuera de este cambio.

## Siguiente microfase

**PX-R3.6 · Validación metodológica. Dificultad para el asistente: 3/10 → 3/10.** Los escenarios, la rúbrica, la matriz y sus pruebas están disponibles. El trabajo es preparar una ficha de decisión sobre universo, criterios, pesos y qué mostrar en H-2, y consignar la decisión real del usuario o Juanra cuando exista. La estimación excluye la espera por revisión humana. El acta debe conservar el estado pendiente si no hay decisión. Esta fase define qué puede presentarse y en qué términos.
