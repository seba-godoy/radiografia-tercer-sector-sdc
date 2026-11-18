# Objetivo y límites de la presentación para DIMI

> **Decisión vigente de publicación (18-11-2026):** el propietario autorizó integrar las ramas PX-R1/R2, H-0/H-1/MF-1/H-M en `main` y hacer despliegue controlado v0.7. La portada ahora usa **cuatro tarjetas** (01 Problemas detectados, 02 Criticidad, 03 Abordabilidad, 04 Oportunidades IA), más la sección secundaria «Métodos y fuentes». Solo 01 y la sección transversal están desarrolladas; 02–04 no son rankings ni análisis terminados. Se conserva v0.6 en `/archivo` y `versiones/v0.6/index.html`. La audiencia sigue Juanra/DIMI y no se inventan aprobaciones de criterio.

> Los apartados que siguen son el **alcance histórico v0.6 previo al rediseño**. No aplicar seis capítulos 00–05 al sitio v0.7.

**Estado verificado 16-11-2026:** v0.6 es una radiografía documental preliminar actualmente accesible por web pública. PX-0.1 a PX-0.4 terminaron **como trabajo documental y revisión heurística interna**, no como pruebas con usuarios ni aprobación de Juanra. La versión inicial que se quiere construir es una **presentación interactiva de investigación**, no un producto SaaS ni un servicio para fundaciones. El sprint 16–20/11/2026 conserva sus compromisos históricos hasta decisión humana.

## Problema
El lector principal es **Juanra**, jefe directo y solicitante del encargo, integrante de DIMI. El resto de **DIMI** es público secundario. La presentación debe permitirles **comprender y priorizar** dolores y oportunidades con una narrativa clara y evidencia verificable, aunque no hayan participado en la investigación. La audiencia interna no significa que la URL de Vercel esté protegida: la restricción técnica de acceso sigue pendiente.

## Resultado buscado
Relato ejecutivo de **seis capítulos 00–05**, más evidencia transversal no numerada:
0. Portada: alcance, hallazgos con límites y decisiones abiertas.
1. Mapa de problemas por temas/etapas, distinguiendo **documentación** de frecuencia y prevalencia.
2. Criticidad **editorial y condicionada**: no imputar ND ni crear puntuaciones sin evidencia.
3. Abordabilidad: problema → tarea concreta → controlabilidad y alternativa convencional/tecnología.
4. Oportunidades: hipótesis de **impacto incremental**, datos faltantes y próximos contrastes; no posiciones en matriz sin medición.
5. Síntesis de decisiones para Juanra/DIMI; no atribuir aprobaciones.
La evidencia detallada se abre como **panel transversal**, no capítulo numerado.
El lector debe poder seguir P20/P48 sin perder el ID al saltar de capítulo, volver al indicador tras abrir evidencia y comprender por qué **P20 62% de N=125** no equivale a frecuencia de episodios ni a tasa nacional, mientras **P48** solo cuenta con evidencia sectorial cualitativa.

## Éxito observable (criterios de aceptación propuestos, pruebas con lectores pendientes)
- Juanra y un integrante DIMI pueden, en una prueba real pendiente, seguir P20 y P48 y distinguir dato observado, hipótesis, inferencia y decisión. **No se ha ejecutado todavía una prueba de usuarios**.
- Un número relevante muestra país, población, N, unidad, período, fuente y límite. Cada recomendación tiene criterio, evidencia y alternativa rival.
- Para el MVP no existe ranking B numérico defendible: conservar bandas editoriales como tales y ND explícitos. Ranking ponderado solo si existe método aprobado, datos comparables y análisis de sensibilidad.
- Historial de versiones, pruebas de regresión, interfaces accesibles, navegación móvil y rollback.
- El pipeline vivo, chatbot y plataforma externa son **líneas futuras**, no requisitos de esta presentación. Requieren revalidación de alcance y permisos.

## No-objetivos del MVP de presentación
- No crear por defecto un chatbot, ni presentar IA conversacional como única solución. BOT es discovery.
- No prometer que DIMI controlará transferencias o aprobaciones estatales.
- No mezclar prevalencias LATAM/EE. UU. con cifras chilenas; INT es benchmark de soluciones, no ampliación mecánica de denominadores.
- No afirmar ahorro, precisión, adopción, aprobación de pesos o piloto sin medición real.
- No automatizar publicación de inferencias de nuevas fuentes sin QA, revisión y autorización.
- No colocar candidatas en cuadrantes de impacto/viabilidad como si tuviesen puntuaciones reales; sin línea base y beneficio medido, usar tabla de hipótesis con ND.
- No hacer cambios de producción por el mero hecho de escribir un nuevo plan.

## Marco de autoridad
Notion: visión, preguntas y decisiones aprobadas; GitHub: código, datasets y pruebas; Drive: originales autorizados y entregables; Vercel: estado desplegado. Esta división y la gestión de conflictos se explican en `docs/PROTOCOL.md`.
