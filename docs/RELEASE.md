# Política de ramas, releases y recuperación

**El repositorio es público y el branch main está conectado con Vercel; cada push puede activar despliegue automáticamente.** El 16-11-2026 se verificó el ruleset activo #27395583 «DIMI - Protección de main», dirigido a la rama predeterminada. Exige PR, check baseline-integrity de GitHub Actions con rama al día, resolución de conversaciones y bloquea eliminación y force-push, sin bypass.

## Flujo propuesto y gate manual actual
1. Recuperar SHA actual de main y crear rama por tarea (`governance/`, `feat/`, `fix/` o `research/`); no trabajar en main como hábito.
2. Definir scope/no-scope, baseline y tests en PR o ExecPlan. Cambios públicos deben quedar en PR revisable con diff mínimo.
3. Ejecutar `python3 scripts/validate_baseline.py`, tests del cambio y pruebas negativas; si toca UI añadir navegador real, accesibilidad y responsive.
4. Revisar privacidad, seguridad, referencias y metadatos; no subir fuentes internas ni URLs privadas Notion/Drive a este repo público.
5. Obtener aprobación humana para cambios de alcance, criticidad, datos y publicación; un merge de documentación no autoriza crear pilotos.
6. Integrar solo si QA P0/P1 en PASS y HEAD esperado no cambió. Registrar commit exacto, changelog y `versiones.json` si cambió el HTML.
7. Comprobar Vercel deployment READY contra commit, URL HTTP 200 y contenido/versiones históricas; dejar acta. Si falla release, volver a commit anterior (preferentemente revert PR) y confirmar estado.

## Protecciones de GitHub activadas y comprobación
- **ACTIVO, verificado por API:** ruleset #27395583, PR obligatorio con 0 aprobaciones, resolución de conversaciones, check estricto y prohibición de force-push/borrado.
- **ACTIVO:** `baseline-integrity` seleccionado como check obligatorio con origen GitHub Actions (integration_id 15368).
- Activar revisión CODEOWNERS si hay capacidad real para revisar; en cuenta de una sola persona, definir una política viable que no inmovilice el proyecto.
- Limitar permisos de acciones a contents:read; configurar secret scanning y Dependabot/code scanning según producto y plan.
- **PRUEBA DE ENFORCEMENT (16/11):** PR #3, primer commit sin `AGENTS.md` en rama temporal, check de GitHub Actions FAIL y PR en estado `blocked` aun al marcarlo listo para revisión. Tras restauración y CI verde, comprobar integración segura; no tocar main en estado rojo.
- Antes de cualquier release de diseño/producto, confirmar con el propietario si despliegue automático desde main cumple la política prevista.

## Rollback
- Para documentos: revertir el PR/commit que introdujo el error, no borrar historial.
- Para aplicación: comparar `index.html`, versiones, manifiesto y commit del release anterior; restaurar commit probado y validar Vercel nuevamente.
- Para datos futuros: snapshot del dataset y migraciones reversibles antes de modificarlo; no restaurar solo HTML si el modelo cambió.
- En incidentes de privacidad: detener exposición, escalar al propietario y rotar credenciales comprometidas; un revert de Git no elimina copias de un secreto ya publicado.

## Evidencia obligatoria del release
ID de tarea, aprobador real, commit SHA base y final, PR, resultados CI/QA, URL y deployment, checks manuales, hash/snapshot de rollback, excepciones justificadas y una siguiente acción. Si el sitio no cambió, no inventar una versión de producto nueva.

## Corte nuevo v0.7 (decisión 18-11-2026)
El propietario autorizó fusionar una **entrega de integración** de PR #8–#19 y desplegar producción de forma controlada antes de R3.1. Para reducir builds parciales se usa un PR único de release, basado en el HEAD H-M ya probado, con todos los cambios acumulados de la cadena. La publicación exige CI de baseline y Chromium PASS, comparación con main al día, revisión de fuente de datos, Vercel READY y smoke de la URL canónica. No fusionar la demo independiente #6 o arquitectura #7 por accidente.

La ruta `/` redirige al HTML de cuatro tarjetas `/preview/h0/index.html`. `/problemas`, `/metodos` y páginas pendientes conservan enlaces directos. El `index.html` de raíz y la copia **byte a byte** `versiones/v0.6/index.html` preservan la versión histórica; `/archivo` ofrece un acceso explícito.

**Gate de reversión:** PR de revert para regresar al commit anterior de main o utilizar el último deployment de producción de Vercel; comprobar ruta pública y commit después de la intervención. No borrar historial ni modificar datos sin migración. Los PR #8–#19 se cierran como incluidos/sustituidos en el release una vez la producción esté READY y auditada.

**Límites:** No confundir cuatro secciones visibles con cuatro investigaciones terminadas. Solo H-1 Problemas y H-M Métodos y fuentes están desarrolladas; criticidad/abordabilidad/IA/negocio quedan como futuras fases. Revisión editorial de Juanra/DIMI aún pendiente.

