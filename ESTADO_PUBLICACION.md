# Estado de publicación · contrato de release v0.7, 18 de noviembre de 2026

**Autorización:** el propietario solicitó integrar la cadena PR #8–#19 y desplegar antes de PX-R3.1. Este archivo describe el contrato del release; el resultado de CI, commit, deployment READY y HTTP se registran en el acta al concluir.

- Dominio: https://radiografia-tercer-sector-web.vercel.app/ conectado a main.
- `/` → `/preview/h0/index.html` mediante Vercel, cuatro tarjetas y selector global.
- `/problemas`: H-1 con 31 problemas, siete temas, 147 relaciones, 245 hallazgos y segmentos (no prevalencia nacional).
- `/metodos`: H-M con 26 fuentes, 25 raíces candidatas, banco, filtros y CSV, explicaciones del método.
- `/criticidad`, `/abordabilidad`, `/oportunidades`: visibles pero pendientes de investigación; sin rankings oficiales ni soluciones probadas.
- `/archivo`: v0.6 íntegra preservada en `versiones/v0.6/index.html` y `index.html` raíz (mismo blob SHA). Las versiones v0.2–v0.5 y base-a continúan.
- QA: baseline, Chromium escritorio/móvil, filtros, selector, P20/P48, F03, acceso histórico y verificación SHA del deployment real.
- Sin datos privados/credenciales en repositorio público. Revisión editorial Juanra/DIMI pendiente.
- Rollback: revert del PR o despliegue de producción anterior, seguido de smoke del dominio y de SHA.
- Siguiente tarea: PX-R3.1 (4/10), documentación vs episodios, prevalencia, alcance/urgencia y ND.

## Historial v0.6 (16 de noviembre)

# Estado de publicación · 16 de noviembre de 2026

- **Última versión HTML en main:** v0.6, demo documental pre-reunión, no ranking B/C final.
- **Sitio canónico:** https://radiografia-tercer-sector-web.vercel.app/
- **Alias histórico:** https://radiografia-tercer-sector-sdc.vercel.app/
- **Repositorio GitHub:** https://github.com/seba-godoy/radiografia-tercer-sector-sdc, rama `main`.
- **Versiones archivadas:** `versiones/v0.5/index.html` y `versiones/v0.4/index.html`, además de v0.2/v0.3/base-a.
- **Contenido:** 26 fuentes A intactas, 31 problemas B (11 alta, 12 media, 8 por validar) y 4 hipótesis IA + 2 opciones convencionales.
- **Vista Suficiencia B:** 31 filas con 15 indicadores contextuales de F03 y 16 respaldos cualitativos/sectoriales, filtros y decisiones para Juanra.
- **Metodología:** cero puntuaciones ponderadas B por ausencia de medidas de frecuencia de episodios, impacto y urgencia comparables; no extrapolar porcentajes ni interpretar ND como cero.
- **Microtareas:** M17a, M17b.1, M17b.2a, M17b.2b, M17c y M17d documentadas en `analisis/`.
- **Auditoría estática previa:** HTML 26 fuentes, JSON fuente A sin cambios, 31 filas B, 4 IA+2 convencionales, 31 filas de suficiencia y filtros (15/16); sin duplicación de IDs HTML ni paneles de tab estáticos huérfanos; sin URLs privadas Notion/Drive nuevas.
- **QA de producción:** comprobar `READY`, URL 200 y archivo histórico v0.5 después de commit. Las pruebas de interacción en navegador y la auditoría exhaustiva de enlaces externos permanecen ND salvo verificación adicional documentada.
- **Reunión:** martes 17/11/2026 10:00 Chile con Juanra, feedback no obtenido aún.
- **Siguiente paso:** M16 feedback humano cuando ocurra la reunión; como trabajo autónomo independiente, preparación documental C con datos públicos, riesgos y comparadores, sin aprobar pilotos. El cierre general está previsto viernes 20/11.

Este es un prototipo de investigación no institucional, no debe publicarse información privada, y la operación permanente requiere validación de titularidad/plan Vercel.
