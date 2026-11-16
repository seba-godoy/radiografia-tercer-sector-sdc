# M17d · Publicación de vista Suficiencia B en HTML v0.6

**16-11-2026 Chile · Dificultad 4/10 · Alcance:** integrar la matriz M17c a una pestaña de discusión B sin alterar los rankings existentes ni el catálogo A.

## Cambios
- Tab «Suficiencia B» con resumen 31 fichas, 15 F03 con base, 16 cualitativas, 0 puntajes B oficiales completos.
- Tabla de 31 filas: código, banda, indicador y alcance, datos ausentes, cautela y fuente PDF; filtros interactivos por origen y búsqueda textual.
- Tres preguntas para reunión: objetivo de prioridad, universo de fundaciones y definición del entregable del viernes.
- Historial v0.6 en HTML y archivos CHANGELOG/versiones; archivo previo v0.5 respaldado usando su blob GitHub `718d9bca0893835ef951287f678b52aa4f079c3e`.

## QA previa realizada
1. Datos JSON originales A byte/lógicamente conservados (sin alteraciones de entidad): PASS.
2. 26 fuentes A, 31 filas Ranking B, 4 IA+2 alternativas sin IA: PASS.
3. 31 filas de suficiencia (15 con indicador F03, 16 otras fuentes): PASS.
4. IDs estáticos únicos y sin panel de tab sin `aria-controls` válido: PASS.
5. Sin referencias nuevas privadas a Notion/Drive: PASS.
6. Manifiesto e historial no inventan pilotos, puntajes ni reuniones realizadas: PASS.
7. Filtrado JS incluido; **prueba manual real de interacción en navegador pendiente/ND** a menos que exista acta posterior que la certifique.
8. Verificación Vercel en producción y lectura posterior de HTML v0.6 y v0.5: **se debe completar tras subir commit**.

## Estado científico y próximos pasos
- Matriz documental B 31/31 terminada para discutir, pero el ranking ponderado oficial no lo está. No se puede obtener magnitud de frecuencia/impacto/urgencia inexistentes de los documentos.
- En C aún hay 4 hipótesis IA más dos comparadores, con solo pruebas propuestas, sin ejecutarse.
- La reunión con Juanra del martes 17 a las 10:00 Chile aún no ha ocurrido; no se han recibido sus decisiones.
- Próximo bloque autónomo sugerido **M17e (4/10): dossier comparativo de las dos candidatas C y sus pruebas frente a flujos convencionales, con supuestos, costos sólo cotizados/verificados y límites**. El feedback **M16** es la dependencia humana posterior a la reunión. No cambiar las puntuaciones o prometer pilotos.

## QA posterior de publicación y navegador (confirmada 16-11-2026)

- Vercel producción: **READY**, despliegue `dpl_28qegCFKLYNXZDs4yzWsne6paUzq` enlazado al commit `dcc63dfebda6b42a5128d0aa4946ea31d8f0814a`.
- HTTP 200: [portada v0.6](https://radiografia-tercer-sector-web.vercel.app/) con título y contenido «Suficiencia B»; HTTP 200: [archivo v0.5](https://radiografia-tercer-sector-web.vercel.app/versiones/v0.5/) con contenido histórico idéntico de v0.5.
- QA en navegador público, solo lectura, [ejecución](https://agent.tinyfish.ai/runs/d9f19ac4-8373-48cd-91b1-15121f8e36ea): versión 0.6 visible PASS; pestaña «Suficiencia B» y tarjetas 31/31,15,16,0/31 PASS; tabla 31/31 PASS; filtro F03 15/31 PASS; filtro otros 16/31 PASS; búsqueda P48 muestra 1/31 PASS; limpieza de filtros PASS.
- «Oportunidades C» identificada en navegación con conteo 4+2; prueba de clic y validación interna de sus seis tarjetas no consta como completada. «Importancia B» identificada, pero el agente **no pudo abrirla explícitamente para repetir las 31 filas**, por límite de duración del ensayo; por lo tanto interacción en esas dos pestañas **ND/PENDIENTE**, aunque los conteos HTML estáticos fueron verificados.
- Sin errores de interfaz observados en los pasos sí ejecutados; no se modificó contenido en la prueba.
- El cierre de M17d acredita publicación y pruebas parciales reales, **no** una auditoría funcional universal ni la validación sustantiva del Ranking B.
