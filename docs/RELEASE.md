# Política de ramas, releases y recuperación

**El repositorio es público y el branch main está conectado con Vercel; cada push puede activar despliegue automáticamente.** Al 16-11-2026 no se observaron rulesets activos y la conexión GitHub usada en la auditoría recibió HTTP 403 al leer protección de rama. Por eso una regla escrita aquí NO constituye protección técnica real.

## Flujo propuesto y gate manual actual
1. Recuperar SHA actual de main y crear rama por tarea (`governance/`, `feat/`, `fix/` o `research/`); no trabajar en main como hábito.
2. Definir scope/no-scope, baseline y tests en PR o ExecPlan. Cambios públicos deben quedar en PR revisable con diff mínimo.
3. Ejecutar `python3 scripts/validate_baseline.py`, tests del cambio y pruebas negativas; si toca UI añadir navegador real, accesibilidad y responsive.
4. Revisar privacidad, seguridad, referencias y metadatos; no subir fuentes internas ni URLs privadas Notion/Drive a este repo público.
5. Obtener aprobación humana para cambios de alcance, criticidad, datos y publicación; un merge de documentación no autoriza crear pilotos.
6. Integrar solo si QA P0/P1 en PASS y HEAD esperado no cambió. Registrar commit exacto, changelog y `versiones.json` si cambió el HTML.
7. Comprobar Vercel deployment READY contra commit, URL HTTP 200 y contenido/versiones históricas; dejar acta. Si falla release, volver a commit anterior (preferentemente revert PR) y confirmar estado.

## Protecciones de GitHub por habilitar por propietario
- Ruleset para main: requerir PR, resolución de conversaciones, revisiones según miembros disponibles, checks obligatorios, impedir force-push y borrado.
- Requerir el check `baseline-integrity` solo **después** de que el workflow se haya ejecutado y su nombre esté disponible; de lo contrario puede bloquear el repo.
- Activar revisión CODEOWNERS si hay capacidad real para revisar; en cuenta de una sola persona, definir una política viable que no inmovilice el proyecto.
- Limitar permisos de acciones a contents:read; configurar secret scanning y Dependabot/code scanning según producto y plan.
- La cuenta/integración disponible puede no permitir activar reglas en API. Un ruleset no activado se documenta como **PENDIENTE**, nunca como PASS.
- Antes de cualquier release de diseño/producto, confirmar con el propietario si despliegue automático desde main cumple la política prevista.

## Rollback
- Para documentos: revertir el PR/commit que introdujo el error, no borrar historial.
- Para aplicación: comparar `index.html`, versiones, manifiesto y commit del release anterior; restaurar commit probado y validar Vercel nuevamente.
- Para datos futuros: snapshot del dataset y migraciones reversibles antes de modificarlo; no restaurar solo HTML si el modelo cambió.
- En incidentes de privacidad: detener exposición, escalar al propietario y rotar credenciales comprometidas; un revert de Git no elimina copias de un secreto ya publicado.

## Evidencia obligatoria del release
ID de tarea, aprobador real, commit SHA base y final, PR, resultados CI/QA, URL y deployment, checks manuales, hash/snapshot de rollback, excepciones justificadas y una siguiente acción. Si el sitio no cambió, no inventar una versión de producto nueva.

## Corte actual
Vercel v0.6 (prototipo), datos A 26/31/121, B 11/12/8 y C 4+2. Los archivos de gobernanza pueden mergearse sin alterar `index.html`, pero main igualmente podría disparar build de Vercel; esa ejecución no debe presentarse como nueva versión funcional.
