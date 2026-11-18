# MF-1 · Banco documental y contrato metodológico · Radiografía Simón de Cirene

**Fecha de corte:** 18 de noviembre de 2026. **Audiencia:** Juanra y equipo DIMI. **Fase:** MF-1 (4/10 estimada; dificultad ejecutada tras QA).  
**Dependencias:** H-1 [PR #17](https://github.com/seba-godoy/radiografia-tercer-sector-sdc/pull/17) · [acta H-1](https://app.notion.com/p/41c091be032781048168fc40993a1def) · [plan MF-0](https://app.notion.com/p/41b091be03278153ae20e98aec4e96dd).  
**Alcance:** banco de fuentes y reglas de interpretación; **sin HTML, sin nueva preview, sin merge ni publicación a producción**.

## 1. Resumen de auditoría

- **26 fichas documentales F**, asociadas a **31 problemas P, 147 relaciones P×F y 245 hallazgos con referencias**. Se conservan los ID sin crear fuentes nuevas ni eliminar evidencias.
- **25 raíces documentales candidatas**. Única raíz original compartida en este inventario: **F11 y F12**, que describen el mismo IFO 2025 de Fundación Trascender. **No son 25 estudios independientes**.
- **5 reutilizaciones explícitas de hallazgos:** cuatro identificadas desde F04 hacia F09 y una desde F01 hacia F07. Existen además riesgos de solapamiento posibles F01/F02, F02/F10, F11/F14 y F12/F14 que no autorizan deduplicación automática.
- Los enlaces de publicación fueron revisados en la web según disponibilidad: **18 páginas editoriales accesibles**, **2 páginas accesibles sin presentación/láminas completas**, **1 PDF accesible**, **1 portal dinámico visible sin comprobación de sus contenidos**, y **4 consultas inconclusas** (F16 timeout, F17 HTTP 403, F19/F21 caché). **No hay cuatro enlaces demostrados rotos**.
- **20 fichas contienen direcciones que aparentan ser PDF directo**. Que una dirección termine en `.pdf` no demuestra que el documento abra, que el archivo sea el correcto ni que se haya cotejado un gráfico. La revisión PDF individual de las **245 afirmaciones sigue pendiente**; esta fase no aumenta los cuatro indicadores UC contrastados en PX-R2.2b.

## 2. Registro de las 26 fuentes y acceso comprobado

El enlace de cada título lleva al origen editorial si existe, **no necesariamente al PDF específico**. El JSON/CSV conserva ambos campos y los localizadores de hallazgos.

| ID | Fuente de publicación / portal | Año pub. | Población o uso | Estado de acceso en MF-1 |
| --- | --- | --- | --- | --- |
| F01 | [Mapa de las Organizaciones de la Sociedad Civil 2023 ](https://politicaspublicas.uc.cl/publicacion/mapa-de-las-organizaciones-de-la-sociedad-civil-2023/) | 2024 | registro OSC fundaciones y asociaciones | Landing accesible |
| F02 | [Impacto con rostro humano: radiografía del aporte de la sociedad civil a las personas ](https://politicaspublicas.uc.cl/publicacion/impacto-con-rostro-humano-radiografia-de-aporte-de-la-sociedad-civil-a-las-personas/) | 2026 | fundaciones descriptivas | Landing accesible |
| F03 | [Encuesta a directoras y directores ejecutivos de fundaciones y corporaciones 2026 ](https://politicaspublicas.uc.cl/publicacion/resultados-encuesta-a-directoras-y-directores-ejecutivos-de-fundaciones-y-corporaciones-2026/) | 2026 | mixta fundaciones corporaciones | Landing accesible |
| F04 | [Resultados encuesta a fundaciones y corporaciones 2025 ](https://politicaspublicas.uc.cl/publicacion/resultados-encuesta-a-fundaciones-y-corporaciones-2025/) | 2025 | mixta fundaciones corporaciones | Landing accesible |
| F05 | [Confianza a prueba: ¿qué piensan los chilenos de las fundaciones? ](https://politicaspublicas.uc.cl/publicacion/resultados-estudio-valoracion-y-confianza-en-fundaciones/) | 2026 | personas percepcion | Landing accesible |
| F06 | [Nuevas regulaciones para la constitución y el registro de fundaciones y corporaciones: ¿hacia dónde vamos? ](https://politicaspublicas.uc.cl/publicacion/nuevas-regulaciones-para-la-constitucion-y-el-registro-de-fundaciones-y-corporaciones-hacia-donde-vamos/) | 2026 | normativa fundaciones corporaciones | Landing accesible |
| F07 | [Registro integrado de las organizaciones de la sociedad civil: ¿dónde estamos y cómo avanzamos? ](https://politicaspublicas.uc.cl/publicacion/registro-integrado-de-las-organizaciones-de-la-sociedad-civil-donde-estamos-y-como-avanzamos/) | 2025 | registros y entrevistas OSC | Landing accesible |
| F08 | [Lineamientos para el fortalecimiento del proceso de fiscalización del Departamento de Personas Jurídicas ](https://politicaspublicas.uc.cl/publicacion/lineamientos-para-el-proceso-de-fiscalizacion-que-realiza-el-ministerio-de-justicia-a-fundaciones-y-corporaciones/) | 2025 | normativa personas juridicas | Landing accesible |
| F09 | [Propuestas presidenciales en sociedad civil: una mirada basada en evidencia para el ciclo político 2026–2030 en Chile ](https://politicaspublicas.uc.cl/publicacion/propuestas-presidenciales-en-sociedad-civil/) | 2025 | participacion OSC | Landing accesible |
| F10 | [Informe FECU Social 2024 · Comunidad de Organizaciones Solidarias ](https://comunidad-org.cl/informe-fecu-social-2024/) | 2026 | OSFL autorreportantes | Landing accesible |
| F11 | [Del hacer al sostener · Informe IFO 2025 ](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/) | 2026 | OSC autodiagnostico | Landing accesible |
| F12 | [Del hacer al sostener · Presentación IFO 2025 y FortalecidOS 2026 ](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/) | 2026 | OSC mismo IFO | Landing sí; presentación faltante |
| F13 | [Encuesta Nacional de Voluntariado y Solidaridad 2025 ](https://fundaciontrascender.cl/encuestavoluntariado/) | 2025 | personas voluntariado | Landing accesible |
| F14 | [Programa FortalecidOS · presentación gLOCAL 2025 ](https://fundaciontrascender.cl/fundacion-trascender-cierra-exitosa-participacion-en-la-semana-de-la-evaluacion-glocal-2025-presentando-fortalecidos/) | 2025 | difusion programa | Landing sí; láminas faltantes |
| F15 | [Fuentes de financiación de las organizaciones no lucrativas ](https://dialnet.unirioja.es/servlet/articulo?codigo=3675079) | 2011 | contexto conceptual espana | Landing accesible |
| F16 | [Guía para la gobernanza efectiva de fundaciones y corporaciones en Chile ](https://filantropialatam.uai.cl/guia-para-la-gobernanza-efectiva-de-fundaciones-y-corporaciones-en-chile/) | 2019 | fundaciones corporaciones guia | Inconcluso: timeout |
| F17 | [The Jossey-Bass Handbook of Nonprofit Leadership and Management · 4.ª edición ](https://www.wiley.com/en-fr/the-jossey-bass-handbook-of-nonprofit-leadership-and-management-4th-edition-p-9781119176558) | 2016 | guia internacional | Inconcluso: HTTP 403 |
| F18 | [Principles & Practices for Nonprofit Excellence ](https://minnesotanonprofits.org/resources-tools/principles-practices-for-nonprofit-excellence) | 2014 | buenas practicas minnesota | Landing accesible |
| F19 | [Reporte Latinoamericano Filantropía y Comunidades Sostenibles · Localizando los ODS ](https://www.uai.cl/cefis/objetivos-de-desarrollo-sostenible) | 2023 | organizaciones filatropicas latam | Inconcluso: caché |
| F20 | [Strategic Planning for Nonprofit Organizations · 2.ª edición ](https://library.au.int/node/251523) | 2005 | manual internacional | Landing accesible |
| F21 | [El rol de la sociedad civil organizada para el fortalecimiento de la protección de los derechos humanos en el siglo XXI: un enfoque especial sobre los DESC ](https://repositorio.iidh.ed.cr/handle/123456789/1283) | 2010 | teorico internacional | Inconcluso: caché |
| F22 | [Filantropía local: desafíos y buenas prácticas en Chile ](https://www.uai.cl/cefis/publicaciones) | 2022 | OSC filantropia local | Landing accesible |
| F23 | [Hacia el fortalecimiento de la filantropía institucional en América Latina ](https://filantropialatam.uai.cl/libro-hacia-el-fortalecimiento-de-la-filantropia-institucional-en-america-latina/) | 2019 | fundaciones filatropicas latam y chile | Landing accesible |
| F26 | [Estudio del esquema de financiamiento de Protección Especializada ](https://www.servicioproteccion.gob.cl/portal/Estudios/Publicaciones/) | 2025 | colaboradores servicios proteccion | Landing accesible |
| F27 | [InfoSISREC · buscador público de proyectos y rendiciones ](https://www.rendicioncuentas.cl/info-sisrec/) | Vivo | portal registro vivo | Portal dinámico; datos ND |
| F28 | [Diagnóstico de necesidades y oferta de fortalecimiento de fundaciones y corporaciones sin fines de lucro ](https://accionsolidaria.cl/wp-content/uploads/2023/11/1694698216517.pdf) | 2023 | mixta fundaciones corporaciones y oferta | PDF accesible, contenido no recotejado |

**Interpretación de estados:** «accesible» significa que la URL pública resolvió durante esta consulta. «Inconcluso» significa que el navegador no pudo validar la disponibilidad en este intento (timeout, 403 o caché), no que la fuente haya desaparecido. «PDF pendiente» indica que este hito no verificó ítem por ítem el archivo original.

## 3. Unidades, población y comparabilidad

- **F03 UC 2026:** 255 respuestas válidas de fundaciones y corporaciones; 125 con convenios y 219 respuestas a autonomía en preguntas distintas. El 28%, 62% y 42% no son proporciones de todas las fundaciones chilenas. I04 y I05 mantienen enlaces corregidos a PDF p.21 y p.22 desde H-1.
- **F04 UC 2025:** 268 directivos en otra ola. Su comparación con F03 requiere verificar redacción de pregunta, muestra, subgrupos y período; no construimos tendencias directas.
- **F10 FECU:** 245 organizaciones que reportaron datos para el ejercicio 2024; **344 reportes no son 344 organizaciones**.
- **F11/F12:** mismo IFO 2025 de **110 OSC**, aunque aparecen dos fichas con productos editoriales distintos. F12 no dispone de la presentación completa en el vínculo institucional consultado.
- **F13:** muestra de **personas**, no organizaciones. **F05** también observa percepción externa de personas, no dificultades operativas de fundaciones.
- **F22:** 82 menciones de obstáculos generadas por 51 OSC. Las respuestas múltiples no sirven como conteo de organizaciones afectadas.
- **F23:** recorte de 84 fundaciones filantrópicas en datos históricos; no extrapolar a fundaciones nacionales en general.
- **F26:** estudio sectorial de protección especializada; 27 son **participaciones en talleres**, no entidades únicas ni prevalencia.
- **F27:** visor público SISREC cambiante. Dos fundaciones y tres expedientes son **casos dirigidos**, nunca muestra representativa. Toda cifra necesita snapshot con fecha.
- **F28:** 154 organizaciones mixtas que respondieron sobre necesidades de capacitación, por una parte; 49 ofertas de 27 fortalecedoras, por otra. Son unidades incompatibles con incidencia de problemas o disposición a pagar.

Los demás manuales, guías, normas y estudios internacionales aportan contexto teórico o procedimientos transferibles; no constituyen por sí mismos tasas observadas del tercer sector chileno.

## 4. Contrato de la sección H-M

**Entrada de datos:** `analisis/mf1-banco-26-fuentes-v1.json` y `analisis/mf1-metodos-contrato-HM-v1.json`. Existen copias CSV planas para fuentes, relaciones y hallazgos. El esquema validable está en `schemas/mf1-banco.schema.json`.

La futura interfaz `/metodos` contará con búsqueda por F, autor, título, P y tema; filtros de población, tipo documental, año, tema y estado de comprobación; exportación de los registros **actualmente visibles** a CSV y navegación en ambos sentidos entre F, P, pasaje y PDF/página. Tendrá estados visibles para enlaces inconclusos o documentos inaccesibles y control de autoría/año/N. La página será secundaria y **no añadirá una quinta tarjeta** a la portada. El selector Tercer sector/Fundaciones deberá conservar su significado y los filtros activos al volver a una ficha.

**Tratamiento del banco:** F es publicación, no estudio independiente; P×F es relación del catálogo, no medición de frecuencia; hallazgo es pasaje con localizador; una raíz candidata no certifica independencia; ND es no determinado, jamás cero. IDs únicos e inmutables, origen y unidad explícitos, exportación que escape comillas y celdas interpretables como fórmulas.

## 5. Estado de las cinco capas metodológicas

| Capa | Estado | Qué puede explicar | Qué NO se puede presentar como hecho |
| --- | --- | --- | --- |
| Cobertura R1/R2/H-1 | Aplicada con limitaciones | Conteos documentales, temas, vínculos, evidencia, raíces y solapamientos | Prevalencia de problemas, 25 estudios independientes o ranking de gravedad |
| Criticidad R3/H-2 | Pendiente de validación | Propósito y futuro protocolo de gravedad/alcance/urgencia | Pesos aprobados, puntuaciones y ordenaciones |
| Abordabilidad R4/H-3 | Pendiente de validación | Hipótesis de causa, tarea, controlabilidad y datos | Factibilidad demostrada o beneficio conseguido |
| Impacto IA R5/H-4 | Pendiente de validación | Comparación frente a solución no IA y línea base | Ahorros y efectos observados sin prueba |
| Negocio R6/H-5 | Pendiente de validación | Pagador, usuario, competidores, costos y financiación | Disposición a pagar inferida de cursos o tamaño del sector |

La documentación de método debe crecer a medida que cada fase R3–R6 termine y pase QA. No crear métodos ficticios por completar la página.

## 6. Auditoría de seguridad, reproducibilidad y enlaces

- Archivos de datos versionados sin material interno sensible ni conexión con bases de datos privadas.
- Se conservan enlaces http(s), etiquetas de verificación, raíz/origen y limitaciones. H-M escapará contenido para evitar inyección HTML y utilizará `rel="noopener noreferrer"` en externos.
- Los inventarios mantienen 26/147/245, con 25 raíces candidatas. **No se fusionan** registros ni se cambian contratos del selector y del HTML.
- Las pruebas `analisis/validate-mf1.mjs` comprueban contra R1.2b, R2.1 y R2.2a, verifican unicidad, enlaces cruzados, N de casos adversariales, estados de acceso, CSV y contrato futuro. La CI `baseline-integrity.yml` ejecuta esas verificaciones y el esquema JSON.
- Una validación estructural aprobada **no** comprueba veracidad de 245 afirmaciones originales. Las cifras que sustenten decisiones futuras exigirán cotejo específico de pregunta, N, universo, fecha y página.

## 7. Cierre y continuidad prevista

**Siguiente hito único: H-M · Implementar «Métodos y fuentes» en la preview (5/10 inicial).** Usará el banco para mostrar trazabilidad y reglas metodológicas consultables, búsqueda/filtros/exportación CSV y enlaces de ida y vuelta. Importa porque permite a Juanra/DIMI auditar de dónde proviene cada decisión antes de confiar en rankings y oportunidades de IA.

Al ejecutar H-M, reestimar dificultad; subdividir solo si supera 5/10, trabajar en PR reversible y probar en navegador real escritorio/móvil antes de declarar la preview lista. Mantener producción v0.6 intacta y cualquier revisión editorial de DIMI como pendiente hasta respuesta humana.
