# H-2.2 · Vista previa de Criticidad y próximos pasos

**Corte del 20 de noviembre de 2026, Santiago.** Dificultad de ejecución 5/10. Base PX-R3.7c (`ef1460661acaaccd7e65362a3488551ef75c4866`, PR #30). El propietario autorizó implementar la vista previa y documentar tres grupos de investigación dentro de la sección. El orden de prioridad depende de evidencia comparable.

## Entrega

| Universo | Qué se muestra | Próximos pasos dentro de la sección |
| --- | --- | --- |
| Fundaciones | Comparación de ocho casos con 32 celdas expandibles. Cada celda presenta hallazgo, población, vacío y fuentes de PX-R3.7b. Incluye contrastes de continuidad, operación y alcance declarado. | Cuatro preguntas de investigación por cada uno de los ocho casos y por cada uno de los 23 restantes. La primera tanda propuesta destaca P43, P21, P25 y P54. |
| Tercer sector | Los 31 problemas del contrato H-2.1, con observaciones descriptivas y los 245 hallazgos catalogados agrupados por población. | Cuatro preguntas por cada uno de los 31 casos. Buscar datos por tipo de organización y comparar poblaciones, períodos y unidades compatibles. |

Las fichas enlazan al mapa bajo el mismo selector. Métodos y fuentes conserva el retorno a Criticidad. La sección abre en `/criticidad?scope=fundaciones` o `/criticidad?scope=tercer_sector`. Los 62%, 57% y 28% se conservan como proporciones reportadas en una muestra mixta de 125 organizaciones con convenios estatales y referencia 2025. Las posiciones de criticidad siguen indeterminadas. Los planes de ambos universos pueden referirse al mismo P y tienen tareas distintas por población.

## Datos y verificación

- La vista consume los 31 problemas y sus vacíos por universo del [contrato H-2.1](h-2-1-criticidad-por-universo-v1.json) y los hallazgos del [banco MF-1](mf1-banco-26-fuentes-v1.json).
- [h2-evidence.json](../preview/h0/h2-evidence.json) proyecta la [matriz PX-R3.7b](px-r3-7b-matriz-evidencia-v1.csv) para mostrar el piloto con los mismos textos y 35 localizadores. La recurrencia R en el CSV corresponde a F en H-2.1. Las notas de los 23 vienen del [acta PX-R3.7a](PX_R3_7a_SELECCION_Y_COMPARACIONES_2026-11-20.md).
- Verificación local de datos aprobada: cobertura 8/23/31, igualdad de las 32 celdas con el CSV, 245 hallazgos, 35 localizadores, baseline (54/54), selector (31/31), H-1 (49/49), H-M (46/46) y H-2.1 (6/6).
- El recorrido de Chromium `node tests/h2.e2e.cjs` se ejecuta en el workflow de la rama, junto con las regresiones de portada, Problemas y Métodos. Verifica cobertura por vista, página del PDF, ficha del mapa, retorno y disposición móvil.
- Reversión: retirar la rama de la vista previa. La investigación de criticidad y el estado de las otras etapas conservan su trazabilidad.

## Próximo trabajo

Abrir una tanda acotada de investigación de Fundaciones con P43, P21, P25 y P54, **5/10 provisional**. Contrastará continuidad en convenios y barreras a las donaciones para decidir si aparece evidencia capaz de cambiar la comparación. Seguir los vacíos de los ocho casos y la investigación por tipo de organización de Tercer sector según las tareas incluidas en la vista. La agenda por universo no asigna puestos de criticidad.
