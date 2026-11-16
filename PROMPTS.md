# Prompts reutilizables para trabajar con agentes

Estos prompts no autorizan por sí mismos cambios a producción, datos privados ni aprobación de metodología.

## 1. Continuar una microtarea
> Lee AGENTS.md, GOALS.md, PLANS.md, docs/PROTOCOL.md y el runbook exacto de la fase en Notion. Recupera INICIO AQUÍ y último commit. Comprueba que el objetivo esté aprobado y desbloqueado. Haz auditoría de entrada. Ejecuta únicamente la primera microtarea pendiente de alcance autorizado, o un lote pequeño de riesgo bajo previamente autorizado, registrando QA por unidad. Usa datos verificables, documenta ND y limita el diff. Ejecuta controles positivos y negativos, crítica adversarial y lectura posterior. Actualiza acta Notion y artefactos GitHub/Drive si procede. Entrega estado real, test ejecutado/no ejecutado, bloqueos y siguiente ID.

## 2. Auditoría independiente
> No implementes mejoras todavía. Reconstruye objetivo, fuentes, commit base y pruebas desde cero. Busca falsos positivos, duplicados, N incompatibles, ND=0, contenido privado, links rotos, regresiones y desviación del alcance. Verifica artefactos con fuentes primarias. Clasifica hallazgos P0/P1/P2/P3, adjunta evidencia y recomienda acciones con gates, no afirmes PASS sin correr la prueba.

## 3. Diseño de visualización para DIMI
> Comienza por las preguntas de lectura y los recorridos P20/P48. Diseña una vista que responda una pregunta con pocos elementos visibles y detalle sofisticado a demanda. No uses la cantidad de fuentes como frecuencia ni relaciones causales hipotéticas como hechos. Propón estados de incertidumbre, comparadores y prueba con alguien que no hizo la investigación; no edites HTML hasta PX-0 aprobado.

## 4. Desarrollo y liberación
> Revisa la versión real, crea rama/revisión y baseline, define criterios de aceptación y casos negativos ANTES de editar. No modifiques catálogo A, versiones históricas ni permisos fuera de scope. Ejecuta los tests del repo, pruebas visuales en navegador cuando cambie UX, revisión de enlaces y seguridad; si algún P0/P1 falla no publiques. Si hay autorización de liberar, verifica commit, Vercel READY/HTTP y rollback. Registra el release en docs/RELEASE.md y Notion.

## 5. Investigación internacional o chatbot
> Para INT: busca casos reales operativos, separa uso de efectividad y prueba transferibilidad a Chile. Para BOT: define usuario y tarea antes de escoger interfaz, compara buscador/FAQ/workflow y revisa permisos. No uses casos externos como prevalencia chilena; no construyas chatbot sin puerta de decisión.
