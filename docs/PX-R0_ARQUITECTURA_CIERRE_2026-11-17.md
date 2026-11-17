# PX-R0 · Arquitectura de cuatro secciones y embudo de decisiones

**Corte:** 2026-11-17 · **Estado:** CERRADA DOCUMENTALMENTE, sin aprobación de Juanra y sin implementación web.

Documento canónico detallado, cinco wireframes, contratos de transición y QA:
[Notion · PX-R0](https://app.notion.com/p/41b091be032781879a91f3c82e40def1).
[Plan principal PX-R v2](https://app.notion.com/p/41b091be032781fdb334e3bc60cff256).

## Por qué sí hay datos para una buena investigación (y no para un ranking numérico definitivo)

- Inventario canónico actual: 26 fichas de fuentes, 31 problemas y 121 registros de segmentación. Existen 87 relaciones problema × segmento parciales, no censo.
- 15 problemas con indicadores cuantitativos principales de distintos tipos, 16 con soporte cualitativo, sectorial u otros diagnósticos.
- Bandas B: 11 alta, 12 media, 8 por validar. Son editoriales, **no** posiciones de un índice compuesto. Cero de 31 problemas tiene hoy todas las medidas comparables requeridas para un puntaje ponderado defendible.
- C preliminar: cuatro hipótesis IA (requisitos, memorias/balances, rendiciones, convocatorias) y dos alternativas convencionales (tablero de caja, alertas de continuidad). Ahorro, adopción, costo e impacto real ND.
- Es suficiente para narrativa, exploración, hipótesis, control de evidencia y una priorización preliminar **explicada**; faltan mediciones y validaciones para ranking cuantitativo global, segmentación exclusiva de fundaciones y negocio pagado.

Referencias: [M17c](https://app.notion.com/p/41a091be0327810cbee7dc66133bd50f), [T3](https://app.notion.com/p/41a091be03278147a106e6f3cb6ccfb6) y [OECD/JRC](https://www.oecd.org/en/publications/handbook-on-constructing-composite-indicators-methodology-and-user-guide_9789264043466-en.html).

## Sitemap final de diseño

```text
/ (Portada: cuatro tarjetas, sin resumen ejecutivo)
├─ /problemas        01 Detectados: catálogo, respaldo y fuentes
├─ /criticidad       02 Evaluación de gravedad + criterios/ND
├─ /abordabilidad    03 Problema → causa → tarea → controlabilidad
└─ /oportunidades    04 Alternativas IA/no IA + impacto potencial
   └─ pestaña comercial (futura; sin puntajes/precios)
Transversal: selector Sector/Fundaciones, evidencia, metodología,
             navegación de retorno, filtros y estados de selección.
```

Rutas y estados son diseño, **no URLs implementadas**.

## Wireframes estructurales: 5/5

### WF-R00 Portada
```text
+--------------------------------------------------------------+
| SIMÓN DE CIRENE / DIMI        [TERCER SECTOR | FUNDACIONES]   |
|          RADIOGRAFÍA DEL TERCER SECTOR                        |
| [01 Problemas detectados] [02 Ranking de criticidad]         |
| [03 Abordabilidad]       [04 Oportunidades de IA]             |
| [Cómo funciona el embudo] [Fuentes y metodología]            |
+--------------------------------------------------------------+
```

### WF-R01 Detección
```text
+--------------------------------------------------------------+
| [01 ACTIVA] → 02 → 03 → 04                         [SCOPE]    |
| [Temas/ciclo/segmentos]  [Buscar / ordenar por cobertura]     |
| P20 Rendición [fuentes]  P48 Sobrecupo [fuentes] ...          |
| [Panel: dato, página, muestra, límites, evidencia]           |
| [Seleccionados | Requieren datos | Otros] [Avanzar → 02]     |
+--------------------------------------------------------------+
```

### WF-R02 Criticidad
```text
+--------------------------------------------------------------+
| 01 → [02 ACTIVA] → 03 → 04                         [SCOPE]    |
| [Bandas editoriales y estado NO PUNTUABLE]                   |
| [P20 | P48] [Impacto | Episodios | Alcance | Urgencia | ND]   |
| [Criterios y escenarios, sin scores artificiales]            |
| [Estudiar abordabilidad | Pendiente] [Avanzar → 03]           |
+--------------------------------------------------------------+
```

### WF-R03 Abordabilidad
```text
+--------------------------------------------------------------+
| 01 → 02 → [03 ACTIVA] → 04                         [SCOPE]    |
| [P20] -> [causa estatal] -> [tarea expediente]                |
| [control parcial] [datos] [riesgos] [costo/adopción]           |
| [comparador no IA] [alternativa con IA]                       |
| [Abordable | Condicionado | No | ND] [Avanzar → 04]            |
+--------------------------------------------------------------+
```

### WF-R04 Oportunidades IA
```text
+--------------------------------------------------------------+
| 01 → 02 → 03 → [04 ACTIVA]                         [SCOPE]    |
| [Oportunidades con vínculo P / tarea / alternativas]          |
| [Ficha: IA vs baseline no IA, supuesto impacto, prueba]      |
| [Orden impacto potencial] [Negocio: investigación pendiente] |
| [Cliente/pagador/precio/costos aún sin investigación]         |
| [Evaluar en prueba | Volver al problema / evidencia]          |
+--------------------------------------------------------------+
```

## Reglas del embudo

1. **01 → 02:** no confundir mayor documentación con prevalencia ni gravedad.
2. **02 → 03:** presentar bandas y criterios cuando no hay datos comparables; selección humana propuesta, con motivo y versión. No definir un «top-N» fijo.
3. **03 → 04:** pasar **tareas** con controlabilidad definida (o condicionadas), no problemas estructurales automáticamente. Guardar alternativas sin IA.
4. **04:** ordenar por impacto potencial *solo con base defendible*, distinto de ranking comercial que requiere estudio de pagadores, capacidad de pago, competencia, costos y sostenibilidad.
5. En cada puerta, el estado de un caso = evaluado / seleccionado / condicionado / excluido / falta evidencia; conservar fuente, decisión, responsables, explicación y filtros.
6. Permitir entrada directa a cualquier vista sin simular que el embudo ya aprobó casos. Datos mixtos no equivalen a datos exclusivos de fundaciones; cambiar el alcance no transforma N ni porcentaje de fuente.
7. Retorno a misma sección/código/filtro y fuente/página de PDF; se conserva deep link lógico.

## QA de cierre de diseño

- 5/5 wireframes, 4/4 rutas, 3 transiciones explícitas y subvista comercial futura: PASS documental.
- Selector sector/fundaciones persistente y advertencias de muestras mixtas: PASS documental.
- P20 62% N=125 no equivale a porcentaje de fundaciones chilenas ni a frecuencia anual; P48 cualitativo no debe desaparecer. F11/F12 no son dos estudios independientes.
- 31/31 puntajes B faltantes **no** pasan a cero; ninguna oportunidad se presenta como ROI o impacto probado.
- Playwright, móvil, funcionamiento del selector, precisión de rankings y validación humana: **NO EJECUTADOS**, pertenecen a PX-R7 o microfases posteriores.
- Producción v0.6, código de la landing demo PR #6 y datasets originales: **sin modificación en este PR**.

## Siguiente fase

**PX-R1: auditoría de aplicabilidad del selector sector/fundaciones**, taxonomía de universos, 31 P con alcance justificable y tests para indicadores mixtos. Recién después activar filtro real y continuar PX-R2/R3. Las decisiones metodológicas finales y los pesos requieren validación humana; la arquitectura quedó cerrada como diseño interno.
