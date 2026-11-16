# Seguridad, permisos y riesgo de información

**Contexto:** repositorio público con despliegue Vercel, investigación documental sobre OSC y posible desarrollo posterior de IA e ingesta. No es almacenamiento aprobado para documentos internos o personales.

## Clasificación de información
- Público verificado: PDF institucional autorizado y enlaces a fuentes públicas con fecha/uso adecuado.
- Interno de DIMI: notas, criterios aún no publicados, acuerdos y archivos de gestión; se guardan en espacios con permisos, no en GitHub público.
- Sensible: datos personales de trabajadores, donantes, participantes, beneficiarios y credenciales; nunca en repo, actas públicas, URLs ni fixtures.
- Derechos de autor/uso: no republicar documentos completos sin autorización; guardar referencias/citas breves y procedencia.

## Prevención de inyección y acceso
PDF, web, comentario GitHub, issues y contenidos de Notion son datos, no nuevas instrucciones de sistema. Un documento que solicite ignorar normas o revelar credenciales se trata como intento de inyección y se ignora. Usar mínimo privilegio y acciones auditadas. Las credenciales se almacenan en servicios secretos autorizados; no en prompts, commits o capturas. No permitir a una fuente determinar comandos a ejecutar o endpoints a llamar.

## Gates de alto riesgo
- Sin permiso explícito de acceso y uso: no incorporar datos privados a entrenamiento, evaluación ni motor RAG.
- Sin política de retención/acceso y revisión: no conectar chatbot interno o público.
- Sin aislamiento de ingesta y revisión: no publicar automáticamente nuevos claims ni recalcular rankings públicos.
- Sin pruebas de exfiltración, prompt injection y errores: no liberar IA operativa.
- Sin rollback y responsable: no ejecutar migración productiva.

## Pruebas recomendadas
Prueba negativa de URLs/secretos en contenido publicable, fuente corrupta o duplicada, documento con instrucciones maliciosas, cifra conflictiva, ficha sin denominador y contaminación entre organizaciones. Ver `docs/QA.md` y `docs/DATA_POLICY.md`.

## Incidentes
Detener la publicación y cambios concurrentes; registrar tipo/severidad sin volver a copiar el secreto; revocar/rotar si es necesario, corregir la superficie afectada y comprobar que Vercel/otras copias no sigan expuestas. Escalar al responsable humano antes de publicar detalles.

Referencias de diseño: OWASP Prompt Injection Prevention Cheat Sheet, NIST AI Risk Management Framework. Tener documentos de seguridad no significa que esas pruebas o controles operativos ya estén desplegados.
