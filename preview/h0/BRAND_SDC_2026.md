# Sistema visual Simón de Cirene 2026 · 30 años
**Versión:** BR-1 v1.0 · **Fecha:** 17/11/2026 · **Ámbito:** radiografía PX/H-0 y siguientes hitos H-1…H-5.

## Referencia primaria
Presentación aportada por el equipo: `Copia de PPT PLANTILLA SdC 2026 (30 años)(2).pptx`, 14 diapositivas de archivo (incluyendo portada/recursos). Inspección de estilos y assets reales desde `ppt/slides`, `ppt/slideLayouts` y diapositivas renderizadas. Los colores corporativos del diseño no deben deducirse del tema Office genérico del PPT, que contiene colores heredados no utilizados por las láminas.

## Tokens de identidad

| Token | Color HEX | Uso |
| --- | --- | --- |
| `--sdc-cream` | **#FFF2E1** | Fondo base, presente en portada y layouts |
| `--sdc-blue` | **#418FDE** | Titulares corporativos y resaltes |
| `--sdc-orange` | **#FF9E19** | Acentos, indicadores, franja y detalles del sello |
| `--sdc-peach` | **#FFC266** | Color secundario cálido |
| `--sdc-gray` | **#595959** | Texto principal |
| `--sdc-white` | **#FFFFFF** | Superficies de contenidos |
| `--sdc-blue-deep` | #145F9F | Derivación de accesibilidad para textos pequeños interactivos |
| `--sdc-blue-light` | #80C8F9 | Azul complementario, aproximación visual de bloques |

**Tipografía:** Montserrat, con pesos 400/500/600/700/800/900 y énfasis en ExtraBold. El PPT usa la familia `Montserrat`, `Montserrat SemiBold` y `Montserrat ExtraBold`. En web se carga mediante Google Fonts, sin empaquetar ni distribuir archivos tipográficos. Fallback `Arial, sans-serif`.

## Logo y sello
- `preview/h0/assets/sdc-symbol-2026.svg`: contorno vectorizado de las formas naranja y azul del símbolo original presente en la primera diapositiva, conservando colores. **No es un archivo oficial de vectores de marca**; es una adaptación derivada de la imagen original suministrada.
- Texto del nombre de la organización y lema `Sin afecto no hay efectos` en el encabezado, en gris institucional y Montserrat.
- Sello `30 AÑOS · DESDE 1996` reconstruido como HTML/CSS usando naranjo, azul y gradiente. Mantiene la referencia conmemorativa, aunque **no sustituye un original editable del logo aniversario**.
- Para materiales institucionales oficiales, usar el PNG completo que viene incluido dentro del archivo de plantilla. Para este dashboard se usó la adaptación optimizada para web.

## Aplicación realizada
- Se sustituyó el tema anterior verde/teal por la identidad crema, azul y naranjo; sin cambios al modelo de datos.
- Header con símbolo y sello aniversario; fuente y pesos para titulares, buscador, tarjetas, botones, fichas y panel de evidencia.
- Portada tipo lámina: jerarquía de título azul, acento naranjo, fondo crema, blanco y gradientes discretos. Sin portada de resumen ejecutivo, conforme al roadmap.
- Cuatro tarjetas con azul, crema, durazno y celeste, sin crear rankings ni nuevas cifras.
- Barras de encabezado y pie con detalles similares a las bandas inferiores de las diapositivas 1–13.
- Tokens centralizados en `brand-sdc.css` y `brand-sdc.json` para que H-1…H-5 reutilicen exactamente el mismo diseño.

## Reglas de uso para próximos cambios
1. No introducir colores ajenos a estos tokens sin justificar necesidad informativa o accesibilidad.
2. El naranjo es decorativo/énfasis; texto pequeño requiere versión oscura por contraste. Azul original para títulos grandes y elementos gráficos, azul oscuro para enlaces y controles.
3. Montserrat + espacio en blanco + mensajes claros, tal como piden las cinco reglas del PPT. Los bloques densos de evidencia pueden usar el gris oscuro por legibilidad.
4. Los logos y sello no se estiran ni se deforman. Header compacto en móvil, con icono y sello visibles.
5. No modificar porcentajes, N, segmentos ni estados de clasificación al aplicar el tema.
6. Mantener los tests funcionales de PX-R1.3 y H-0, agregar pruebas de identidad y regresión visual en Chromium.
7. No fusionar a producción sin QA y aprobación de la preview. En la versión institucional futura solicitar, si procede, los archivos originales SVG oficiales del imagotipo completo y de los 30 años.

## Verificación
- Archivo JSON de tokens: [brand-sdc.json](./brand-sdc.json).
- Estilos institucionales: [brand-sdc.css](./brand-sdc.css).
- Símbolo vectorial: [assets/sdc-symbol-2026.svg](./assets/sdc-symbol-2026.svg).
- Pruebas reales: `tests/h0-brand.e2e.cjs`, agregadas a `.github/workflows/h0-preview-ui.yml`.
- El nuevo tema vive en rama de desarrollo de H-0, encadenada a PR #12. **Producción v0.6 sin cambios.**

## Fuente externa de corroboración
La página [Quiénes Somos](https://simondecirene.cl/quienes-somos/) y el sitio [Simón de Cirene](https://simondecirene.cl/) confirman nombre, lema e identidad 30 años en 2026. Los colores HEX y la familia tipográfica se extrajeron directamente del PPT compartido, **no** de fuentes web.
