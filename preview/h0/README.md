# H-0 · Primera preview de la nueva radiografía · 17-11-2026

**Estado:** implementada en rama de pruebas, desplegada READY por Vercel; CI de contrato + navegador **PASS**.  
**Dificultad:** 5/10. **Destino:** investigación para Juanra y equipo DIMI de Simón de Cirene, no producto institucional.  
**PR:** [#12 Draft](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/pull/12), base PR #11; no fusionado.  
**Preview Vercel registrado READY:** https://radiografia-tercer-sector-git-5bcef0-sebastian-godoy-s-projects.vercel.app/  
**Despliegue inmutable del commit QA:** https://radiografia-tercer-sector-is2l75sd6-sebastian-godoy-s-projects.vercel.app/ (commit `66c319241801105171a55af15c61c213309b6701`).  
**Producción histórica:** https://radiografia-tercer-sector-web.vercel.app/ ; **sin cambios**.

## 1. Implementación efectiva

- Portada **sin resumen ejecutivo**, inspirada en la navegación por bloques de la plataforma de cursos asincrónicos: cuatro tarjetas grandes **01 Problemas detectados, 02 Ranking de criticidad, 03 Abordabilidad, 04 Oportunidades con IA**.
- Selector persistente Tercer sector / Fundaciones en cabecera; reaprovecha el **contrato ejecutable PX-R1.3** (`analisis/px-r1-3-selector.mjs`), no inventa una lógica de clasificación alternativa en frontend.
- Entrada directa a las cuatro secciones, cabecera por etapas y estados de navegación en URL (`scope`, `p`, `layer`, `q`, `context`) y retorno con historial del navegador.
- Sección 01 básica: busca 31 problemas, lee fichas y referencias a 245 hallazgos, enlaza PDFs, filtra clases de evidencia, permite ocultar/restaurar contexto (sin descartar fichas ni manipular N).
- En Fundaciones: **6 fichas con alguna referencia directa**, **13 con evidencia compartida sin directa** y **12 solo contextuales**. Son categorías editoriales de un catálogo, **no 6+13+12 fundaciones** ni incidencia. La vista por defecto conserva las 31.
- Secciones 02–04 navegables, con explicaciones y aviso **«Análisis pendiente de validación»**; todavía no hay rankings de gravedad, abordabilidad o impacto simulados.
- Adaptación responsive 390px; orden visual, foco visible, links de PDF en pestaña nueva, skip link y preferencia de movimiento reducido.

## 2. Archivos y aislamiento

`preview/h0/index.html` · `preview/h0/style.css` · `preview/h0/app.mjs` · `preview/h0/data.json` (snapshot auxiliar versionado, interfaz usa matriz R1.2b directamente).  
`vercel.json` contiene **solo en esta rama** rewrites de `/`, `/problemas`, `/criticidad`, `/abordabilidad` y `/oportunidades` a `preview/h0/index.html`.  
`tests/h0.e2e.cjs` + `.github/workflows/h0-preview-ui.yml` hacen QA Playwright real.

El contrato subyacente se importa desde `/analisis/px-r1-3-selector.mjs` y la matriz pública desde `/analisis/px-r1-2b-attribution-31p-147links-v1.json`. No se modificaron esos insumos ni el `index.html` de producción en este PR. No se fusionó la demo anterior PR #6. Los hallazgos PDF aún requieren verificación individual cuando sustenten una conclusión de ranking.

## 3. QA realizado (no simulado)

| Control | Resultado | Evidencia |
| --- | --- | --- |
| GitHub `baseline-integrity` | **PASS** | [Run #24](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/actions/runs/44154829617) |
| Contrato PX-R1.3 · 31 pruebas de datos/selector | **PASS** | Ejecutado en workflow baseline |
| Navegador Chromium escritorio y móvil | **PASS** | [Run #1 de H-0](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/actions/runs/44154829470), job `H0-Chromium-desktop-mobile` |
| Casos de navegador | **9 bloques PASS** | Cuatro tarjetas, selector fundaciones 6/13/12, 31 fichas, P20, P48, fuentes PDF, filtros, contexto reversible, búsqueda, estado vacío, navegación, scroll móvil y consola sin errores |
| Capturas | **5 PNG en ZIP de artifacts del workflow** | [Artif. px-h0-browser-evidence](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/actions/runs/44154829470) |
| Vercel deployment del SHA QA | **READY** | [Inspector de Vercel](https://vercel.com/sebastian-godoy-s-projects/radiografia-tercer-sector-web/83zf22taC5FJvrNEd1CN9W3PTywm), target Preview |
| Revisión externa de URL | **PASS externo** | URL raíz del deployment de commit `3bcd4261e6f6bb32cad353e86f8099e8af96ba6a` redirige a `/preview/h0/index.html`; H1 y cuatro tarjetas de secciones comprobadas. |
| Datos de producción y main | **SIN CAMBIOS POR H-0** | PR #12 aislado sobre rama de contrato; sin merge |

## 4. Riesgos, límites y decisiones

- **No es la versión definitiva** ni fue aprobada por Juanra. La fase H-0 solo construye navegación y visualización inicial.
- Las seis fichas «Directa» no significan seis estudios independientes. Cinco hallazgos de esa clase provienen de un encuentro de 100 fundaciones recogido en la encuesta UC 2026.
- P20 conserva 62% con N125 de muestra de fundaciones y corporaciones, no de fundaciones solas. P48 conserva testimonios cualitativos sin tasa. P30 y P54 no desaparecen por ausencia de cruce de segmentación.
- 245 hallazgos están clasificados por contexto según R1.2b, pero no fueron cotejados uno a uno con PDFs. No publicar porcentajes nuevos ni rankings hasta contrastar las fuentes centrales.
- El diseño H-0 y browser QA locales no prueban desempeño en todos los navegadores, ni acceso de terceros a una URL protegida. Comprobar link para usuario final y documentar barrera si la hubiera antes de compartir.

## 5. Próximo paso y reestimación

**Siguiente tarea única: PX-R2.1 (4/10 inicial)**, auditoría de cobertura documental y deduplicación: distinguir raíz documental de estudio empírico independiente para 31 problemas / 147 vínculos / 245 hallazgos; documentar F11/F12, F09/F04, solapamientos administrativos F01/F02/F10 y fuentes de contexto. Entregar tabla verificable de cobertura por problema sin confundir «más documentado» con «más frecuente». Al cierre **reestimar PX-R2.2**, hoy 5/10, y solo subdividir si pasa a 6+. Después PX-R2.2 y H-1 activarán la sección 01 con análisis temático.

**Dificultad de H-0:** 5/10 estimada → **5/10 al cierre**: la integración con selector validado permitió mantener alcance sin subdivisión adicional. Se conservan los hitos posteriores H-1..H-5 y PX-R7 publicación definitiva.

## 6. Verificación adicional posterior al corregir enrutamiento (17/11)

**PASS:** una navegación externa al deployment de commit `3bcd4261e6f6bb32cad353e86f8099e8af96ba6a` confirmó que `https://radiografia-tercer-sector-k1ct8av65-sebastian-godoy-s-projects.vercel.app/` redirige a `/preview/h0/index.html` y muestra el H1 «De los problemas a las oportunidades con IA» más los cuatro botones 01–04 correctos. La comprobación ocurrió después de reemplazar la regla `rewrites` para `/` por `redirects`, porque antes la raíz servía la portada anterior mientras que la ruta HTML directa sí funcionaba. También reejecutaron **PASS** los controles [baseline #26](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/actions/runs/44156095713) y [Playwright H-0 #3](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/actions/runs/44156095968). La preview pública comparte únicamente información documental de fuentes públicas; producción v0.6 intacta.
