# Radiografía del tercer sector | Simón de Cirene

**Prototipo público de investigación y priorización, no sitio institucional oficial.**

**🌐 [Abrir el observatorio en vivo](https://radiografia-tercer-sector-sdc.vercel.app/)** · [URL técnica del proyecto conectado a GitHub](https://radiografia-tercer-sector-web.vercel.app/) · [Historial de cambios](CHANGELOG.md)

La primera dirección redirige a la segunda. Las actualizaciones en la rama `main` se despliegan automáticamente en Vercel (probado con dos commits).

Sitio estático con diagnóstico documental, ranking B preliminar (importancia de 31 problemas), ranking C exploratorio (oportunidades de IA) e historial verificable de versiones.

## Gobierno de desarrollo (protocolo DIMI v2.0)

**Antes de desarrollar:** leer [AGENTS.md](AGENTS.md), [GOALS.md](GOALS.md), [PLANS.md](PLANS.md), [PROMPTS.md](PROMPTS.md) y [Protocolo](docs/PROTOCOL.md). Las reglas de datos, QA, seguridad, release y relevo están en `docs/`. Existe una matriz de 49 microtareas en Notion (PX-0...PX-6, INT, BOT); para no divulgar enlaces internos este repositorio público identifica las páginas por nombre.

**Estado:** el rediseño está propuesto, no aprobado ni iniciado. M17e en pausa; prioridad de conversación PX-0. El sitio continúa en v0.6 sin cambio de funcionalidades por esta gobernanza.

**Control estático:** `python3 scripts/validate_baseline.py` valida la estructura del corte actual (26 fuentes, 31 problemas, 121 segmentos, 4 IA + 2 convencionales, vistas B), además de la existencia de documentos. El workflow `baseline-integrity` está preparado para pull requests y main; no sustituye pruebas reales de navegador ni auditoría metodológica. Las reglas de protección efectiva de main se deben activar con acceso administrativo válido: ver [RELEASE](docs/RELEASE.md). **Ningún texto de procedimiento equivale a branch protection configurada.**

## Consulta
- `index.html`: versión pública más reciente.
- `versiones/`: cortes anteriores.
- `versiones.json`: manifiesto de versiones.
- `CHANGELOG.md`: registro legible de cambios.

## Estado a 16 de noviembre de 2026 · v0.6 preliminar

Nueva pestaña **Suficiencia B**: 31 fichas con filtros y distinción explícita de 15 indicadores F03 (bases N=125/200/219/255) y 16 respaldos de otras fuentes. No existen puntajes B completos calibrados: impacto, frecuencia y urgencia comparables tienen ND. La versión v0.5 se preservó como historia bajo `versiones/v0.5/`. [Matriz de suficiencia M17c](analisis/SDC_M17c_Suficiencia_y_Decisiones_B31_2026-11-16.md). Feedback de Juanra previsto para 17/11 10:00, todavía no registrado.

## Estado a 16 de noviembre de 2026 · v0.5 preliminar (histórico)

Vista «Certezas y límites» (7 señales citadas), tres escenarios B y comparación explícita de dos candidatas IA contra soluciones convencionales. Historial v0.4 preservado en `versiones/v0.4/`. Documentos de sustento: [T2, defensa Ranking B](analisis/SDC_T2_Defensa_Ranking_B_2026-11-15.md) y [T3, convergencia C](analisis/SDC_T3_Convergencia_Ranking_C_2026-11-15.md).

## Estado a 15 de noviembre de 2026 (histórico)
Las posiciones B son **editoriales y preliminares**, no el resultado de una fórmula validada. La clasificación C representa hipótesis exploratorias. Ambos rankings documentales están programados para cierre el viernes 20 de noviembre. No se han realizado pilotos en organizaciones reales.

## Fuentes y límites
El sitio incluye enlaces a publicaciones externas accesibles públicamente y describe limitaciones de muestra. No se deben extrapolar resultados de encuestas intencionales a todas las fundaciones chilenas.

Algunas referencias internas de Notion/Drive que aparecían en la copia de trabajo fueron sustituidas por marcadores no públicos. No hay claves API ni datos personales de beneficiarios.

## Publicación
- Repositorio GitHub público: visibilidad `Public`, lectura libre, escritura reservada a colaboradores.
- Vercel: conectado a GitHub, despliegue automático desde `main`, producción pública sin autenticación.
- Dominio histórico: redirección 307 a la nueva web para mantener los enlaces que ya se compartieron.
- Cada versión debe registrar su fecha, cambios verificables y vínculo al commit, sin fabricar entregables.

Este proyecto se difunde como prototipo de estudio, no en representación de la fundación.
