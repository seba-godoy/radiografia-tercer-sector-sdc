# Hoja de ruta de ejecución (referencia de agentes)

**Versión:** gobernanza v2.0 y corte interno PX-0.4, 16-11-2026. **No confundir trabajo de diseño con UX validada.**
**Fuentes de detalle:** Notion, página maestra «PROPUESTA · Radiografía DIMI como sistema de decisiones» y runbooks de cada fase por ID. Este repositorio público no contiene enlaces a páginas internas de Notion.

## Puerta vigente
**PX-0.1...PX-0.4 completadas documentalmente**: públicos, sitemap, seis wireframes y revisión heurística interna. **No hay feedback ni aprobación de Juanra, y UX real no está validada.** El usuario autorizó avanzar por cuenta propia en investigación y preparación reversible. **Siguiente microtarea propuesta: PX-1.1, solo auditoría de estructura/datos y contrato mínimo para la presentación.** No migrar fuentes ni publicar HTML por este avance. M17e (dossier C previo) sigue en pausa; la reunión prevista con Juanra para 17-11-2026 no se presupone realizada.

## Fases y microtareas
| Fase | Dificultad | IDs | Resultado y gate |
|---|---:|---|---|
| PX-0 Presentación / UX | 4/10 | PX-0.1...0.4 (4) | **Documentación cerrada**: audiencias Juanra/DIMI, journeys P20/P48, seis wireframes y corte MVP; **aprobación humana y pruebas funcionales ND** |
| PX-1 Ontología / datos | 8/10 | PX-1.1...1.6 (6) | **PX-1.1 siguiente**: inventario y contrato mínimo sin escribir datos; normalización/migración completas futuras y sujetas al alcance |
| PX-2 Método B | 8/10 | PX-2.1...2.6 (6) | Documentación ≠ frecuencia ≠ criticidad, rúbrica y sensibilidad; gate de aprobación de criterios |
| PX-3 Abordabilidad | 7/10 | PX-3.1...3.5 (5) | P→tarea→controlabilidad→alternativa no IA/IA; gate de permisos y realismo |
| PX-4 Impacto | 8/10 | PX-4.1...4.5 (5) | Baseline, TCO/ND, evaluación y oportunidad incremental; pilotos solo autorizados |
| PX-5 UX HTML | 9/10 | PX-5.1...5.6 (6) | Vistas 0–4, evidencia transversal, QA y publicación versionada |
| PX-6 Plataforma viva | 10/10 | PX-6.1...6.7 (7) | Ingesta, revisión, recálculo, deduplicación, seguridad, rollback y operación |
| INT Benchmark externo | 7/10 | INT-1...INT-5 (5) | LATAM/EE. UU.: casos reales, evaluación, transferibilidad, cruce con C |
| BOT Discovery chatbot | 5/10 | BOT-1...BOT-5 (5) | Comparar 5 públicos/usos, corpus, alternativas simples y decisión de no/construir |

**Total: 49 microtareas propuestas** (39 PX y 10 INT/BOT). La dificultad estima complejidad/riesgo, **no** horas de trabajo ni certeza de éxito.

## Corte de alcance V1 para la presentación (propuesto, revisable)
**Imprescindible:** capítulos 00–05, evidencia desde cada afirmación y retorno exacto, mapa sin conteos temáticos inventados, P20/P48 como casos de explicación, criticidad editorial/ND, tareas mitigables con alternativas convencionales, fichas C sin puntajes, síntesis para Juanra y revisión de privacidad/release.
**Dejar fuera por ahora:** ranking B ponderado definitivo, gráficos de impacto×viabilidad con puntos sin datos, ahorro/costo/adopción medidos inexistentes, chatbot funcional, ingesta automática, backend externo o plataforma multiusuario. PX-6 es una ambición futura separada de la presentación.
**M0 del diseño pendientes antes de nuevos wireframes funcionales:** no mostrar 62% de N125 como frecuencia de episodios; no equiparar banda editorial «Alta» con impacto medido; no situar candidatos en matrices sin puntuaciones verificables; explicar que P20/P48 son casos ilustrativos mientras T3 evalúa P38/P25 y P32/P41.

## Orden y paralelismo
- PX-0 se cerró como diseño interno, **no validación de usuario**. Ejecutar PX-1.1 de solo lectura antes de tocar HTML; no exigir PX-1 completo si basta contrato mínimo de datos verificables para la presentación. PX-2/3/4 quedan como investigación complementaria y no se presuponen completadas. No utilizar PX-5 para publicar conclusiones no aprobadas.
- INT-1/INT-2 y BOT-1 pueden avanzar en modo documental, sin publicar ni usar datos privados, si su alcance se autoriza. No esperar una conclusión internacional exhaustiva para diseñar UX, pero no cerrar C ignorando alternativas reales.
- PX-6 se diseña con PX-1, pero se IMPLEMENTA después de estabilizar método y permisos.
- Trabajo del sprint documental histórico y producto PX tienen entregables diferentes. No cambiar fecha/alcance de 20-11-2026 sin decisión explícita.

## Estados permitidos
PROPUESTA → PENDIENTE AUTORIZADA → EN CURSO → IMPLEMENTADA → VERIFICADA → PUBLICADA (si aplica) → CERRADA; también BLOQUEADA o DESCARTADA con motivo. «Escrito» no equivale a «aprobado». El estado real de microtarea y las actas están en Notion, no se infieren del número de esta tabla.

## Plan de ejecución grande
Para una fase que necesita varias sesiones, abrir un ExecPlan autocontenido siguiendo `docs/PROTOCOL.md`: objetivo observable, contexto, hitos, progreso, sorpresas, decisiones, pruebas, recuperación. Anotar el enlace/commit en el acta de fase. No sustituir el plan de Notion por un documento paralelo contradictorio.
