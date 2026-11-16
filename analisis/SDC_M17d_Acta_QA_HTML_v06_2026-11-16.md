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
