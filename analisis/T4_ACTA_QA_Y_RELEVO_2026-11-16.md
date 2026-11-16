# T4 · Acta técnica de integración ejecutiva v0.5

**Fecha Chile:** 16-11-2026. **Microtarea:** T4, dificultad 3/10. **Base:** GitHub main `ff7166d752538407fb377eff9e8f9f2cd6dac504`, HTML v0.4 blob `dff6330455b690acd734d45f0c54181f032304cf`. **Alcance:** integrar T1–T3 a una demo del lunes, no cerrar Plan B/C del viernes.

## Cambios efectivamente preparados
- Nuevo panel «Certezas y límites» con 7 señales del PDF F03 (P02, P16, P20, P13, P28, P17, P15), denominador N=125/255, fecha, página y lo que no se puede afirmar.
- Cruce documental F07, F08, F10 y F26, sin extrapolar prevalencias entre universos.
- Escenarios de Ranking B para criterios de continuidad, proporciones del subgrupo estatal y sostenibilidad; se preservan 31 posiciones editoriales, bandas 11/12/8 y ND.
- Comparación de dos candidatas IA con alternativas convencionales; 16 pruebas hipotéticas por candidata y umbrales propuestos, sin resultados.
- Corrección de roadmap (v0.5 para el lunes y 11 problemas altos), pestaña de historial, archivo de la v0.4 y manifiesto/versiones reales.

## Auditoría previa (estática)
1. JSON íntegro de las 26 fuentes, sin modificar: PASS.
2. Fichas B: 31: PASS.
3. C IA: 4: PASS.
4. C sin IA: 2: PASS.
5. Señales con fuente y cautela: 7: PASS.
6. No faltan paneles de pestañas estáticos: PASS (el id generado por JS con índice dinámico no cuenta como roto).
7. Sin mención residual al v0.3 como entregable del lunes: PASS.
8. Sin «nueve» problemas de banda alta en la ruta: PASS.
9. Sin URLs de Notion/Drive privadas incorporadas al HTML: PASS.
10. Documentos T2/T3 sin enlaces privados de Notion/Drive ni patrones de claves: PASS.
11. Copia v0.4 referenciada por blob SHA preexistente: PASS al crear el árbol.
12. Integración Git y despliegue Vercel: **verificar después del commit**.

## Fuentes y reservas
- F03 encuesta UC 2026 (páginas físicas 21, 22, 32 y 36); muestra intencional mixta 255, subgrupo estatal 125.
- F07 registro único (entrevistas a responsables de registros), F08 memorias/balances de 2025, F10 FECU Social, F26 protección especializada.
- Matrices T2 y T3 en el repositorio; las dos candidatas no cuentan con pilotos, costos o ahorros medidos.
- Catálogo A y versiones base-a, v0.2 y v0.3 no se modifican.

## Continuidad
Una vez se compruebe acceso público y deploy READY, T4 queda cerrada como **4/4 del plan ejecutivo**. No equivale al cierre de las 38 subfases del plan documental (último valor verificado 5/38). Siguiente único **Sprint M16 (3/10): registrar feedback de Juanra y acordar criterios, prioridades y alcance de cierre del viernes**; requiere la reunión real. Si no ha ocurrido, conservar Pendiente sin inventar observaciones.
