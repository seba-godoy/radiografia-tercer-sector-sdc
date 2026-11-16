# Objetivos y límites del producto

**Estado del trabajo:** v0.6 pública es una radiografía documental preliminar. El rediseño PX-0...PX-6 es una **propuesta** hasta validación de alcance con el equipo DIMI. Los plazos históricos del sprint 16–20/11/2026 no son aprobación automática del producto completo.

## Problema
Hoy el observatorio funciona principalmente como biblioteca de fuentes y fichas. Una persona de la Dirección de Metodologías e Innovación (DIMI) que no participó en la investigación necesita entender dolores, criticidad y oportunidades sin reconstruir por su cuenta toda la evidencia.

## Resultado buscado
Experiencia en cinco pasos, con biblioteca transversal:
0. Orientar con mapa temático y ciclo de operación de organizaciones.
1. Mostrar qué problemas están documentados y distinguir **documentación** de frecuencia/prevalencia.
2. Mostrar criticidad y límites con método, criterios, ND y sensibilidad verificables.
3. Conectar problema → tarea operativa → abordabilidad → tecnología y comparadores convencionales.
4. Explicar el **impacto incremental potencial**, esfuerzo, adopción, riesgos y condición de prueba.
La persona debe poder recorrer un mismo ID P de principio a fin y abrir su fuente/página/metodología sin perder contexto.

## Éxito observable
- Persona que no participó en investigación sigue dos recorridos, P20 y P48, y distingue dato observado, hipótesis, inferencia y decisión.
- Un número relevante muestra país, población, N, unidad, período, fuente y límite. Cada recomendación tiene criterio, evidencia y alternativa rival.
- Rankings reproducibles donde existan datos comparables; ND explícitos en los demás. Una diferencia de ponderación produce un análisis de sensibilidad, no certeza falsa.
- Historial de versiones, pruebas de regresión, interfaces accesibles, navegación móvil y rollback.
- En etapa posterior, el pipeline de fuentes deduplica, detecta contradicciones, exige revisión humana de conclusiones públicas y recalcula solo dependencias.

## No-objetivos actuales
- No crear por defecto un chatbot, ni presentar IA conversacional como única solución. BOT es discovery.
- No prometer que DIMI controlará transferencias o aprobaciones estatales.
- No mezclar prevalencias LATAM/EE. UU. con cifras chilenas; INT es benchmark de soluciones, no ampliación mecánica de denominadores.
- No afirmar ahorro, precisión, adopción, aprobación de pesos o piloto sin medición real.
- No automatizar publicación de inferencias de nuevas fuentes sin QA, revisión y autorización.
- No hacer cambios de producción por el mero hecho de escribir un nuevo plan.

## Marco de autoridad
Notion: visión, preguntas y decisiones aprobadas; GitHub: código, datasets y pruebas; Drive: originales autorizados y entregables; Vercel: estado desplegado. Esta división y la gestión de conflictos se explican en `docs/PROTOCOL.md`.
