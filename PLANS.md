# Hoja de ruta de ejecución (referencia de agentes)

**Versión:** gobernanza propuesta v2.0, 16-11-2026. **No confundir planes con trabajo completado.**
**Fuentes de detalle:** Notion, página maestra «PROPUESTA · Radiografía DIMI como sistema de decisiones» y runbooks de cada fase por ID. Este repositorio público no contiene enlaces a páginas internas de Notion.

## Puerta vigente
Discutir y validar **PX-0** antes de modificar la arquitectura o publicar nuevas pantallas. La próxima microtarea propuesta es PX-0.1, solo si el alcance de diseño está autorizado. M17e (dossier C previo) queda **EN PAUSA**, no se descarta. La reunión con Juanra está prevista para 17-11-2026 10:00, Chile; no atribuir acuerdos antes de recibirlos.

## Fases y microtareas
| Fase | Dificultad | IDs | Resultado y gate |
|---|---:|---|---|
| PX-0 Narrativa / UX | 4/10 | PX-0.1...0.4 (4) | Audiencias, journeys P20/P48, wireframes, MVP; aprobar diseño/alcance antes de código |
| PX-1 Ontología / datos | 8/10 | PX-1.1...1.6 (6) | Esquema claim/fuente/P/tarea/segmento/alternativa, deduplicación, migración reversible |
| PX-2 Método B | 8/10 | PX-2.1...2.6 (6) | Documentación ≠ frecuencia ≠ criticidad, rúbrica y sensibilidad; gate de aprobación de criterios |
| PX-3 Abordabilidad | 7/10 | PX-3.1...3.5 (5) | P→tarea→controlabilidad→alternativa no IA/IA; gate de permisos y realismo |
| PX-4 Impacto | 8/10 | PX-4.1...4.5 (5) | Baseline, TCO/ND, evaluación y oportunidad incremental; pilotos solo autorizados |
| PX-5 UX HTML | 9/10 | PX-5.1...5.6 (6) | Vistas 0–4, evidencia transversal, QA y publicación versionada |
| PX-6 Plataforma viva | 10/10 | PX-6.1...6.7 (7) | Ingesta, revisión, recálculo, deduplicación, seguridad, rollback y operación |
| INT Benchmark externo | 7/10 | INT-1...INT-5 (5) | LATAM/EE. UU.: casos reales, evaluación, transferibilidad, cruce con C |
| BOT Discovery chatbot | 5/10 | BOT-1...BOT-5 (5) | Comparar 5 públicos/usos, corpus, alternativas simples y decisión de no/construir |

**Total: 49 microtareas propuestas** (39 PX y 10 INT/BOT). La dificultad estima complejidad/riesgo, **no** horas de trabajo ni certeza de éxito.

## Orden y paralelismo
- PX-0 antes de PX-5. PX-1 es el contrato para PX-2/3/5/6. PX-4 requiere alternativas PX-3 y benchmark pertinente.
- INT-1/INT-2 y BOT-1 pueden avanzar en modo documental, sin publicar ni usar datos privados, si su alcance se autoriza. No esperar una conclusión internacional exhaustiva para diseñar UX, pero no cerrar C ignorando alternativas reales.
- PX-6 se diseña con PX-1, pero se IMPLEMENTA después de estabilizar método y permisos.
- Trabajo del sprint documental histórico y producto PX tienen entregables diferentes. No cambiar fecha/alcance de 20-11-2026 sin decisión explícita.

## Estados permitidos
PROPUESTA → PENDIENTE AUTORIZADA → EN CURSO → IMPLEMENTADA → VERIFICADA → PUBLICADA (si aplica) → CERRADA; también BLOQUEADA o DESCARTADA con motivo. «Escrito» no equivale a «aprobado». El estado real de microtarea y las actas están en Notion, no se infieren del número de esta tabla.

## Plan de ejecución grande
Para una fase que necesita varias sesiones, abrir un ExecPlan autocontenido siguiendo `docs/PROTOCOL.md`: objetivo observable, contexto, hitos, progreso, sorpresas, decisiones, pruebas, recuperación. Anotar el enlace/commit en el acta de fase. No sustituir el plan de Notion por un documento paralelo contradictorio.
