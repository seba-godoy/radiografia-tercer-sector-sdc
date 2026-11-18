# PX-V0.1 · Vista previa de la presentación DIMI

**Objetivo:** primera vista previa, en rama aislada, de portada 00 + mapa 01 + panel de evidencia contextual. No reemplaza el \`index.html\` raíz ni la v0.6 publicada.

**Público:** Juanra (principal) y equipo DIMI (secundario). No es un producto ni un panel destinado a organizaciones externas.

## Abrir
En un despliegue **preview protegido por Vercel Authentication**: ruta \`/preview/px-v01/\`. El proyecto \`radiografia-tercer-sector-web\` tiene autenticación de Vercel activada **solo para previews** (production sigue sin cambio). El usuario debe contar con acceso Vercel autorizado. No compartir a terceros como página pública.

Alternativa local: desde raíz \`python3 -m http.server 8765\`, luego abrir \`http://localhost:8765/preview/px-v01/\`. No abrir \`file://\` porque la app obtiene el JSON con fetch local.

## Estructura

- \`index.html\`: shell HTML semántico, CSP sin recursos externos.
- \`styles.css\`: UI ejecutiva responsiva 16:9, móvil y teclado, sin fuente externa.
- \`app.js\`: filtrado y panel con foco/retorno, sin escribir en el catálogo, sin APIs externas.
- \`catalogue.json\`: snapshot A+B de solo lectura generado a partir de commit \`09ed13fa7d9fd24897d94948863c106d96bca1c3\`. Contiene 26 F, 31 P, 121 S, 87 cross y cinco afirmaciones CLM tomadas del fixture PX-1.2.

Los cuatro grupos temáticos son una **agrupación editorial provisional** para lectura:
- Financiamiento y caja: 11 problemas.
- Rendición y cumplimiento: 8.
- Continuidad y personas: 6.
- Gestión y sostenibilidad: 6.

Esos valores son **número de fichas** por tema, no prevalencia/frecuencia ni índice de importancia. No reemplazan la categoría original de los problemas. F11/F12 siguen siendo dos fichas del mismo estudio; no contar 26 fuentes como 26 estudios independientes.

## Guía de interpretación
- P20: 62% N=125 en la pregunta concreta F03, y 42% de otra pregunta con base exacta no acreditada en este contrato. No sumarlos ni extrapolarlos.
- P25: 57% N=255 declara percepción de dispersión de reglas de donaciones; no mide episodios de trámite.
- P48: F26 p.143/p.158 evidencia cualitativa de programas de protección; N nacional ND.
- \`banda B\` de las fichas es **editorial**; 31/31 puntajes ponderados ND. El mapa no ordena por ranking B.
- Relaciones P×S: \`base\` y \`candidate\` son distintas; P30 y P54 no tienen cruces. Ningún filtro modifica denominadores de afirmaciones.

## QA
- \`python3 scripts/validate_preview_v01.py\` valida inventario, agrupación, claves y normas.
- \`node --check preview/px-v01/app.js\` valida sintaxis JS.
- \`node tests/preview-v01.e2e.cjs\` usa Playwright Chromium mediante servidor local, captura desktop/móvil y recorre P20/P48 y filtros.
- Workflow \`preview-ui.yml\` ejecuta tests sin secretos; no sustituye la revisión humana de contenidos. El PR de prototipo no debe fusionarse a main (merge añadiría el archivo a producción pública) hasta decisión separada y revisión de privacidad.

## Estado
Prototipo interactivo, **no validado con Juanra**. No incluye capítulo 02 criticidad, 03 abordabilidad, 04 impacto ni 05 síntesis final. Tampoco rankings nuevos, chatbot, datos personales, backend o ingesta automatizada.

**Siguiente paso:** revisión visual y de navegación, correcciones UI con evidencia, decisión sobre publicación limitada; eventualmente continuar PX-1.3 sobre deduplicación y las pantallas restantes.