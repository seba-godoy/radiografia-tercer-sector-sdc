# Matriz de calidad y auditoría

## Definiciones
PASS = prueba realmente ejecutada con resultado válido; FAIL = resultado adverso; ND = no ejecutada o sin evidencia suficiente. Jamás transformar «no observé fallos» en una cobertura que no se midió.

## Preflight general
Leer AGENTS, PLANS y el runbook; anotar la base de Git/Notion, objetivo, archivos que se pueden tocar y qué NO cambia. Definir prueba positiva, negativa y criterio de salida ANTES de implementar. En caso de hallazgo P0/P1, detener la publicación.

## Reglas por tipo de artefacto
| Tipo de cambio | Prueba mínima exigida | Caso adversarial |
|---|---|---|
| Investigación | Fuente primaria o explicación de por qué no existe; página, país, población, fecha, N, unidad, límites | Duplicado del mismo estudio, encuesta no probabilística o cifra contradicha |
| Índice B/C | Tabla de entrada, pesos/versiones, fórmula reproducible, ND y análisis de sensibilidad | ND=0, sumas de porcentajes diferentes, falta de denominador, atribución causal |
| Dataset o migración | IDs, relaciones, fuente y localizador, conteos/diffs, idempotencia y snapshot | F11/F12 duplicados; cita sin fuente; nueva edición con valores distintos |
| Software | Tests existentes, script de base, revisión de diff, comportamiento observable | Datos faltantes, fallo de parseo, error de permisos, excepción real |
| Interfaz | Navegador real: móvil, escritorio, pestañas, filtros, links, recorridos completos P20 y P48 | Filtro sin resultados, enlace sin página, estado ND, error JavaScript |
| Publicación | PR, checks, revisión, deployment READY, HTTP 200, commit/versión y rollback | Error P0/P1, versión vieja, archivo histórico perdido |
| IA operativa | Casos y respuestas de referencia, manejo «no sé», costo, citas y humano responsable | Prompt injection, documento malicioso, fuga de dato, cita falsa |
| Ingesta | ID de fuente/versión/hash, validaciones de N/unidad/país, aprobación y recálculo trazable | Archivo duplicado, corrupto, privado, conflictivo, rollback |

## Script automático de referencia
Ejecutar `python3 scripts/validate_baseline.py` desde la raíz. Sin dependencias externas: verifica integridad del **corte v0.6**, metadatos y archivos esenciales. No valida veracidad de fuentes externas, accesibilidad UI real ni seguridad completa. Antes de alterar esquema/contadores por decisión autorizada, actualizar de forma revisada el propio test y la política de datos, dejando diff que demuestre por qué cambió el baseline.

## Métricas y gates
- P0: secreto/dato privado, filtración, inyección o afirmación falsa pública con daño → STOP.
- P1: rotura principal, datos alterados sin consentimiento, falla de integridad o ranking sin sustento → NO MERGE.
- P2: usabilidad, contraste o rendimiento relevante → plan de remediación antes de entrega definitiva según alcance.
- P3: detalles cosméticos, sin detener indebidamente.
- Una prueba positiva aprobada no sustituye prueba negativa ni evidencia científica.

## Lista de salida
Guardar acta: nombre de test, resultado, herramienta, commit analizado y fecha; capturas o reportes cuando existan; fuente original enlazada; pruebas no ejecutadas; P0/P1/P2 abiertos; confirmación de persistencia (lectura posterior). Para interfaz verificar con navegador real antes de afirmar que funciona; CI solo prueba propiedades que el script conoce.
