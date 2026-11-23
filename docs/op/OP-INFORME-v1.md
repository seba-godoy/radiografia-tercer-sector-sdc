# OP-1 a OP-6 · Herramienta gratuita primero · Informe v1.0

Corte 23/11/2026. OP-1 a OP-6 revisadas; sección informativa implementada y primer código validado en Chromium de escritorio/móvil. Primera propuesta: kit de acuerdos, segunda exploración caja. La herramienta operativa no está construida. No se contrataron servicios ni se contactaron organizaciones.

## Decisión y límites
Se elige el primer experimento por tarea controlable, núcleo ya cubierto por herramientas simples y menor esfuerzo estimado de QA. IPH empatado no decide por ID. Criticidad/ASdC son entradas separadas; la factibilidad concreta y la gratuidad modifican la elección. No se suman los tres índices.

OP01 y OP03 empatan en IPH55. OP01 entra primero: P47 ASdC64, tarea interna, datos mínimos y kit adaptable. Desarrollo supuesto24–48h frente40–80h de OP03; esto es una comparación de alcance planificado, no cotización ni productividad observada.

OP03 es segunda exploración: mayor criticidad de entrada (P13=75), pero ASdC35 y calidad financiera requieren más QA; la herramienta sólo anticipa brechas, no estabiliza ingresos.

OP04 queda en reserva: requiere elegir ruta y curador normativo. OP07 tiene IPH49, superior a OP04=41, pero demanda contactos/permisos y la brecha frente a CRM/planilla no está probada. No se oculta ese intercambio.

OP05 se aborda como kit de contenidos sobre herramientas existentes. OP06 requiere corpus/actualización antes de software; OP02 se reduce a acompañamiento FECU hasta demostrar brecha.

OP01 y OP03 mantienen empate bajo pesos porque tienen los mismos niveles; una variación de un juicio cambia la posición. La prioridad es un experimento reversible, no superioridad robusta medida. Si una plantilla ya basta, se cierra la opción de aplicación propia.

## Siete oportunidades comparadas

| Oportunidad | IPH | Puesto | Problema principal | Criticidad entrada | ASdC entrada | Confianza IPH | Propuesta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| OP01 · Acuerdos al día | 55 | 1 | P47 | 57 | 64 | Baja | Primer experimento |
| OP03 · Caja visible | 55 | 1 | P13 | 75 | 35 | Baja | Segunda exploración |
| OP07 · Agenda de vínculos locales | 49 | 3 | P54 | 57 | 39 | Baja | Adaptar o postergar |
| OP05 · Comunicación con respaldo | 42 | 4 | P46 | 53 | 56 | Baja | Adaptar o postergar |
| OP04 · Carpeta de antecedentes | 41 | 5 | P25 | 63 | 39 | Baja | Reserva condicionada |
| OP06 · Traspaso de funciones | 34 | 6 | P28 | 75 | 28 | Baja | Adaptar o postergar |
| OP02 · Evidencias listas para FECU | 27 | 7 | P32 | 51 | 47 | Baja | Adaptar o postergar |

Los índices son distintos y no se suman/multiplican. ASdC corresponde a la intervención de entrada; factibilidad del producto se vuelve a revisar por datos, arquitectura, operación y mantenimiento.

## OP-1 · Las 31 decisiones

| Problema | Criticidad / confianza | ASdC / confianza | Ruta | Motivo |
| --- | --- | --- | --- | --- |
| P02 · Interrumpimos servicios cuando no se renueva un convenio | 75 / Media | 16 / Baja | Fuera del primer MVP | No renovación de servicios requiere decisiones de terceros; la planificación de caja sólo ayuda a anticipar escenarios. |
| P11 · Nos faltan recursos para medir qué cambió con nuestros programas | 53 / Baja | 24 / Baja | Fuera del primer MVP | Definir resultados e instrumentos es previo al software; automatizar indicadores no prueba impacto de programas. |
| P13 · Nos cuesta asegurar ingresos estables para planificar | 75 / Media | 35 / Media | OP03 | Entrada a OP03; la herramienta sólo aborda la tarea interna, no el problema completo. La decisión de donar, el monto y continuidad de los aportes. |
| P14 · Podríamos sostener pocos meses de operación sin aportes externos | 90 / Media | 21 / Baja | OP03 | Entrada a OP03; la herramienta sólo aborda la tarea interna, no el problema completo. Crear reservas, compensar ingresos perdidos o garantizar continuidad frente al shock hipotético. |
| P15 · Perdemos una vía habitual de financiamiento cuando desaparece una convocatoria | 65 / Media | 16 / Baja | Fuera del primer MVP | Cancelación de fondos no se resuelve con software; evitar prometer financiación alternativa. |
| P16 · Las transferencias comprometidas llegan tarde | 79 / Media | 11 / Baja | OP03 | Entrada a OP03; la herramienta sólo aborda la tarea interna, no el problema completo. La fecha efectiva del pago estatal y el coste financiero de esperar. |
| P17 · Tenemos que cubrir costos que el convenio no permite rendir | 81 / Media | 21 / Baja | OP03 | Entrada a OP03; la herramienta sólo aborda la tarea interna, no el problema completo. Cambiar la admisibilidad de gastos o obtener aportes adicionales. |
| P18 · La demora en la toma de razón impide iniciar actividades | 73 / Media | 7 / Baja | Fuera del primer MVP | Toma de razón es un proceso externo; no se prometen menores plazos. |
| P19 · Las garantías dificultan que organizaciones pequeñas contraten con el Estado | 51 / Baja | 21 / Baja | Fuera del primer MVP | Una herramienta puede ordenar condiciones, pero no emitir garantías ni financiar su costo. |
| P20 · Nuestras rendiciones quedan abiertas por falta de respuesta | 69 / Media | 10 / Baja | Fuera del primer MVP | No respuesta de organismos es externa; seguimiento no asegura respuesta. |
| P21 · Nos piden rehacer rendiciones que ya habían aprobado | 63 / Media | 18 / Baja | Fuera del primer MVP | Reapertura de rendiciones depende del organismo revisor y de reglas; fuera del primer alcance documental. |
| P22 · Nos cuesta rendir gastos en SISREC | 63 / Media | 36 / Media | Fuera del primer MVP | Preparación de rendiciones exige reglas vigentes y prueba con SISREC; no construir integración ni duplicar el sistema oficial en el primer MVP. |
| P23 · Debemos traspasar la atención y los datos si no renuevan el convenio | 63 / Baja | 8 / Baja | Fuera del primer MVP | Traspaso de ejecutor depende del servicio y convenios; no basta un repositorio. |
| P25 · Los requisitos dispersos nos dificultan recibir donaciones | 63 / Media | 39 / Media | OP04 | Entrada a OP04; la herramienta sólo aborda la tarea interna, no el problema completo. Simplificar leyes o garantizar autorización y acceso al beneficio. |
| P26 · Los trámites de algunos donantes complican obtener o rendir fondos | 51 / Media | 24 / Media | OP04 | Entrada a OP04; la herramienta sólo aborda la tarea interna, no el problema completo. Cambiar requerimientos, evaluaciones o decisiones de los donantes. |
| P28 · Nos cuesta mantener los contratos y retener especialistas | 75 / Media | 28 / Media | OP06 | Entrada a OP06; la herramienta sólo aborda la tarea interna, no el problema completo. Garantizar salarios, renovar convenios o demostrar retención de profesionales. |
| P30 · Nos cuesta aportar a políticas públicas en espacios dispersos e intermitentes | 47 / Baja | 13 / Baja | Fuera del primer MVP | Participación/incidencia requiere acceso y representación institucional, no sólo una herramienta. |
| P32 · Nos falta capacidad de equipo para preparar la memoria y el balance | 51 / Baja | 47 / Media | OP02 | Entrada a OP02; la herramienta sólo aborda la tarea interna, no el problema completo. Crear datos inexistentes, financiar más equipo o firmar/certificar estados financieros. |
| P38 · Tenemos que volver a entregar los mismos antecedentes | 54 / Baja | 29 / Media | OP04 | Entrada a OP04; la herramienta sólo aborda la tarea interna, no el problema completo. Eliminar la solicitud externa o integrar registros públicos. |
| P40 · Nuestro acceso para enviar la memoria y el balance puede quedar bloqueado | 38 / Baja | 15 / Baja | Fuera del primer MVP | Bloqueos de acceso/carga son del portal externo; sin API o control acreditado no se ofrece corrección. |
| P41 · Tenemos que completar o corregir envíos de memorias y balances | 42 / Baja | 54 / Media | OP02 | Entrada a OP02; la herramienta sólo aborda la tarea interna, no el problema completo. Reformar el portal o su revisión; no garantiza que el organismo acepte cada documento. |
| P43 · Tenemos que volver a postular mientras sostenemos un servicio | 63 / Baja | 24 / Baja | Fuera del primer MVP | La renovación de convenios depende de decisiones externas; un calendario no cambia las bases ni asegura continuidad. |
| P46 · Nos cuesta dar a conocer nuestro trabajo para acceder a nuevas oportunidades | 53 / Baja | 56 / Media | OP05 | Entrada a OP05; la herramienta sólo aborda la tarea interna, no el problema completo. Garantizar alcance, aportes o nuevas oportunidades; un buscador de fondos por sí solo no resuelve visibilidad. |
| P47 · Nos cuesta mantener al directorio al día sobre los planes que aprobó | 57 / Baja | 64 / Media | OP01 | Entrada a OP01; la herramienta sólo aborda la tarea interna, no el problema completo. Asegurar compromiso del directorio, resultados estratégicos o eficacia de la gobernanza. |
| P48 · Atendemos más casos que plazas financiadas con el mismo equipo | 73 / Baja | 6 / Baja | Fuera del primer MVP | Sobrecarga estructural requiere recursos o rediseño; agregar una aplicación puede aumentar trabajo. |
| P49 · Tenemos que financiar la instalación antes de recibir el primer aporte | 60 / Baja | 21 / Baja | OP03 | Entrada a OP03; la herramienta sólo aborda la tarea interna, no el problema completo. Aportar capital de trabajo, adelantar fondos públicos o garantizar crédito. |
| P50 · El cierre financiero deja saldos sin resolver tras terminar un convenio | 44 / Baja | 10 / Baja | Fuera del primer MVP | Cierre administrativo/financiero de programas exige intervención especializada; sin automatización oficial acreditada. |
| P51 · Nos cuesta separar gastos de varios proyectos en una misma cuenta | 57 / Baja | 32 / Baja | Fuera del primer MVP | Separar imputaciones de proyectos demanda reglas contables y validación especializada; una planilla genérica no acredita exactitud. |
| P52 · Nos cuesta captar y mantener familias de acogida | 75 / Baja | 11 / Baja | Fuera del primer MVP | Captación de familias de acogida exige salvaguardas y especialistas del programa; fuera del piloto generalista. |
| P53 · Llegar a familias en zonas dispersas nos consume más tiempo y recursos | 60 / Baja | 13 / Baja | Fuera del primer MVP | Costos rurales y visitas exigen recursos y diseño de servicios; beneficio digital no acreditado. |
| P54 · Nos falta equipo y tiempo para buscar donantes locales | 57 / Baja | 39 / Media | OP07 | Entrada a OP07; la herramienta sólo aborda la tarea interna, no el problema completo. Añadir capacidad laboral o asegurar respuesta y aportes de donantes. |

## OP-3 · Método IPH

**unit:** Oportunidad y variante simple especificada → usuario → tarea → resultado. El índice no puntúa un problema genérico ni una plataforma de siete módulos.

**horizon:** Doce meses desde un eventual despliegue; sin fecha comprometida.

**formula:** IPH = redondear(1 + 99 × ((40M + 25A + 20F + 15D)/100 − 1)/4), niveles 1–5.

**meaning:** Juicio documental provisional de beneficio operativo potencial. No es porcentaje resuelto, horas ahorradas, probabilidad de éxito, adopción ni impacto social medido. Las diferencias pequeñas no constituyen evidencia de superioridad.

**comparators:** Se puntúa la variante simple frente al proceso actual hipotético. Se contrasta además con la mejor alternativa gratuita/simple y se declara brecha. No se presenta ventaja de producto nuevo frente a una alternativa existente como demostrada.

**ai:** Incremento de IA frente a variante simple: no medido en las siete. Se mantiene separado y sin IPH adicional inventado; ninguna función de IA es necesaria para el primer núcleo.

**confidence:** Baja en las siete: hay mecanismos y documentos, sin resultados, adopción ni costos laborales del producto medidos. Confianza separada, no multiplicador ni descuento oculto.

**missing:** Las métricas naturales ausentes se conservan null/por medir. Cada nivel ordinal tiene razón específica; no se imputa falta de datos como 0 o 3. A evalúa transferibilidad condicionada, no un número de organizaciones.

**deduplication:** Un problema tiene una ruta principal en OP-1; problemas secundarios no suman puntajes, muestras o beneficios. F11/F12 comparten origen, igual que reproducciones. Las dos referencias FECU son una oferta/proveedor, no dos estudios de eficacia. Las dos referencias Impact Frontiers comparten marco.

**sensitivity:** Base, pesos iguales y ocho variaciones ±5 puntos compensadas proporcionalmente; un criterio ±1 a la vez; escenarios conjunto conservador/favorable M y A ±1 dentro de 1–5. Son escenarios ordinales, no intervalos estadísticos ni tasas de adopción. Rangos se refieren al escenario original y se etiquetan al editar pesos.

**sourceRule:** Las once referencias complementarias apoyan método, funciones o tarifas; no amplían el banco histórico ni acreditan ahorro o eficacia. No se cotizó ni se crearon cuentas.

### M · Magnitud de mejora neta por uso · 40%

Cambio en la tarea frente al proceso actual hipotético, incluyendo preparación, revisión, corrección y carga nueva. La alternativa simple limita qué mejora se atribuye a producto nuevo.

- 1 · mejora marginal; puede no compensar la carga nueva
- 2 · simplifica un paso limitado sin cambiar el flujo central
- 3 · reduce coordinación/retrabajo de una tarea delimitada
- 4 · reemplaza varios pasos costosos conservando la calidad relevante
- 5 · transforma el resultado operativo de la tarea con ganancia neta muy grande; exige evidencia sólida para sostener el juicio

### A · Alcance aplicable relativo · 25%

Transferibilidad de la tarea y condiciones mínimas de uso entre perfiles. Sin organizaciones activas observadas, es aplicabilidad ordinal condicionada; no volumen ni adopción estimada.

- 1 · un caso o contexto altamente singular
- 2 · una ruta, corpus o perfil especializado con condiciones importantes
- 3 · varios perfiles con campos comunes, sujetos a datos y responsable
- 4 · tarea transversal con pocas restricciones de acceso y uso
- 5 · cobertura amplia con condiciones y uso documentados; no se asigna por tamaño de encuesta

### F · Recurrencia del beneficio · 20%

Cadencia de ejecuciones completas de la tarea por organización en doce meses. No cuenta campos, clics ni correcciones del mismo entregable. Todos los usos aquí son supuestos de diseño.

- 1 · una entrega anual o excepcional
- 2 · unas pocas entregas/ciclos al año
- 3 · varios usos al año, cadencia irregular o por campaña
- 4 · actualización mensual o varias veces por mes
- 5 · uso semanal o diario sostenido, que necesita corroboración para dejar de ser supuesto

### D · Persistencia del cambio · 15%

Permanencia de una mejora en el proceso entre usos, con responsable y actualización. No vuelve a premiar repetir la tarea ni conservar un archivo. Horizonte común de doce meses.

- 1 · resultado de una ejecución sin cambio de proceso
- 2 · reutilización limitada a una entrega o campaña
- 3 · rutina que podría mantenerse durante el horizonte con responsable
- 4 · capacidad reutilizable entre ciclos y cambios de personal, condicionada a mantenimiento
- 5 · mejora durable del proceso respaldada por seguimiento; no se asigna por permanencia del software

### Calibración y correcciones

- Anual intensa frente a frecuente pequeña: La tarea anual obtiene más puntos: frecuencia alta no basta para desplazar una mejora neta grande. 60 frente a 37
- Corrección FECU frente a oferta existente: Se retiran ventajas de revisión e histórico ya provistas por FECU. Queda un inventario previo de brecha no acreditada; se reduce magnitud y persistencia. 51→27
- Duración no se deduce de frecuencia: Una actualización frecuente no acredita capacidad que sobreviva a cambios de equipo. Las rutinas OP01/OP03/OP07 conservan D3 condicionado. 59→55

## OP-2 / OP-4 / OP-5 · Fichas completas

### OP01 · Acuerdos al día

**Usuario:** Secretaría o coordinación que prepara reuniones de directorio.

**Tarea:** Pasar acuerdos y avances a una carpeta de reunión con responsables, plazos y evidencia.

**Resultado controlable:** Carpeta trazable de acuerdos pendientes y avances para revisión humana.

**Fuera de alcance:** No asegura compromiso, cumplimiento de acuerdos ni resultados estratégicos del directorio.

**Insumos:** Acuerdos aprobados y avances agregados, sin datos de beneficiarios. Responsable de actualización por confirmar.

**Proceso actual hipotético:** Actas, correos o archivos dispersos, únicamente como escenario de diseño: no se observó el flujo real de un equipo.

**Alternativa simple:** Plantilla de Sheets o tablero Trello Free con responsables y fechas; adaptar antes de crear otro gestor.

**Brecha por demostrar:** Brecha hipotética de puesta en marcha y carpeta orientada a directorio; funciones generales ya están cubiertas.

**Variante IA:** Extraer borradores de acuerdos desde actas anonimizadas, con cita de pasaje y aprobación humana; no interpretar decisiones como definitivas.

**Incremento IA:** Valor adicional de IA desconocido. Un tablero no la necesita; mantenerla fuera del núcleo inicial.

**Factibilidad específica:** Acotada, condicionada a responsable y datos. No requiere backend; colaboración en el archivo de cada organización.

**Sostenibilidad:** Asignar responsable del kit y soporte de arranque; derivar al archivo/espacio del usuario. Evitar administrar tableros de todas las organizaciones.

**Funcionalidades:**

- Registro de acuerdos con responsable, plazo, estado y evidencia enlazada
- Vista de pendientes y carpeta imprimible de reunión
- Exportación CSV y guía para actualizar sin rehacer el registro

**Métrica principal:** Minutos netos por carpeta de reunión con el mismo conjunto de acuerdos y calidad.

**Calidad:** Proporción de acuerdos con responsable/plazo correctos; omisiones y estados atribuidos sin respaldo.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 3/5:** Un registro único podría reducir conciliación y retrabajo frente a dispersión; ganancia moderada, sin minutos observados y con alternativa gratuita ya disponible.

**A 3/5:** Campos de acuerdo, responsable y fecha son transferibles entre varios perfiles con directorio; alcance relativo condicionado a disponer de registro y responsable, no N de una encuesta.

**F 4/5:** Se supone revisión mensual o por reunión en el horizonte de doce meses; guía de gobernanza apoya seguimiento periódico, no doce usos observados.

**D 3/5:** La rutina puede persistir si se asigna actualización y revisión; conservar archivos no demuestra por sí solo capacidad duradera.

**Sensibilidad original:** pesos [54, 57] / puestos [1, 1]; juicios un nivel [46, 65] / puestos [1, 3]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [24, 48]h; mantenimiento [2, 4]h/mes; soporte 10min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 25.0 | [6.17, 8.17] | 0.125 | ND |
| medio | 100 | 100.0 | [18.67, 20.67] | 0.5 | ND |
| alto | 300 | 300.0 | [52.0, 54.0] | 1.5 | ND |

**Fuentes de alternativas:** OP-B1, OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P47__F16__01 · origen CEFIS-SAN-CARLOS-GOBERNANZA-2019 · [p. 55 del PDF · caso Fundación CMPC](https://ceps.unibas.ch/fileadmin/user_upload/ceps/1_Home/News_Events_Bilder_Doks/20190515_Leitfaden_Governance_Chile_Steffen.pdf#page=55)
- P47__F16__02 · origen CEFIS-SAN-CARLOS-GOBERNANZA-2019 · [p. 56 del PDF · seguimiento de decisiones](https://ceps.unibas.ch/fileadmin/user_upload/ceps/1_Home/News_Events_Bilder_Doks/20190515_Leitfaden_Governance_Chile_Steffen.pdf#page=56)
- P47__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 13 impresa · gobernanza 12–15](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=15)
- P47__F20__02 · origen ALLISON-KAYE-PLANEACION-2005-ED2 · [p. 303 impresa · hoja 325 del PDF · revisión de avances](https://fundaciontrascender.cl/download/strategic-planning-for-nonprofit-organizations/)


### OP03 · Caja visible

**Usuario:** Coordinación financiera de una organización que registra aportes y compromisos.

**Tarea:** Construir un flujo mensual diferenciando fondos comprometidos, probables y restringidos, y explorar atrasos.

**Resultado controlable:** Brechas de caja visibles bajo supuestos declarados; decisiones siguen a cargo de la organización.

**Fuera de alcance:** No consigue aportes, aumenta reservas ni acelera transferencias. P14 es resistencia declarada a un escenario hipotético, no crisis observada.

**Insumos:** Saldos, calendario de compromisos y aportes agregados, calidad y disponibilidad por confirmar. Ejemplos sintéticos permiten probar cálculos.

**Proceso actual hipotético:** Saldos y compromisos en registros separados como hipótesis. Si ya existe una planilla fiable la ganancia puede ser marginal.

**Alternativa simple:** Planilla de flujo de caja en Sheets/Excel con fórmulas revisadas; esa será la comparación mínima.

**Brecha por demostrar:** Posible simplificación de carga y visualización de fondos restringidos. Diferenciación frente a planilla aún por medir.

**Variante IA:** Explicar un escenario ya calculado por reglas deterministas; sin inventar cifras o clasificar restricciones sin revisión.

**Incremento IA:** Los cálculos no necesitan IA. Sólo añadir explicación si una prueba muestra mejor comprensión sin nuevos errores.

**Factibilidad específica:** Condicionada a datos y revisión financiera. Más esfuerzo de QA que un tablero; sin conexiones bancarias ni backend inicial.

**Sostenibilidad:** Responsable financiero revisa fórmulas y escenarios; sin esa revisión, sólo plantilla ilustrativa.

**Funcionalidades:**

- Importación o carga de ingresos y egresos agregados con restricciones
- Escenarios base/atraso y saldo mensual calculado con reglas explícitas
- Alertas de brecha y exportación para revisión; sin recomendación de inversión

**Métrica principal:** Minutos netos para preparar un escenario y días de anticipación de brechas correctamente identificadas.

**Calidad:** Saldos correctos, tratamiento de fondos restringidos y ausencia de alertas equivocadas en casos conocidos.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 3/5:** Hacer explícitos compromisos y escenarios podría mejorar una decisión operativa, con ganancia moderada de preparación; no se puntúan ingresos nuevos ni probabilidad de supervivencia.

**A 3/5:** Aplica a equipos con registro mínimo de caja y compromisos; transferibilidad a varios perfiles es inferencia, no mercado ni porcentaje de fundaciones.

**F 4/5:** Se supone actualización mensual y ante cambios de aportes. No se toma el 68% hipotético de P14 como frecuencia de uso.

**D 3/5:** Un hábito de actualización puede sostener el proceso durante el horizonte, condicionado a calidad de datos y responsable; no soluciona dependencia financiera permanente.

**Sensibilidad original:** pesos [54, 57] / puestos [1, 1]; juicios un nivel [46, 65] / puestos [1, 3]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [40, 80]h; mantenimiento [4, 8]h/mes; soporte 15min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 25.0 | [10.25, 14.25] | 0.125 | ND |
| medio | 100 | 100.0 | [29.0, 33.0] | 0.5 | ND |
| alto | 300 | 300.0 | [79.0, 83.0] | 1.5 | ND |

**Fuentes de alternativas:** OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P13__F03__02 · origen SEA-DIRECCIONES-2026 · [diap. 34 · cambios en ingresos](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=34)
- P13__F16__01 · origen CEFIS-SAN-CARLOS-GOBERNANZA-2019 · [p. 58 del PDF · responsabilidades de recaudación](https://ceps.unibas.ch/fileadmin/user_upload/ceps/1_Home/News_Events_Bilder_Doks/20190515_Leitfaden_Governance_Chile_Steffen.pdf#page=58)
- P13__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 19 impresa · finanzas 16 y 18](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=21)
- P13__F20__02 · origen ALLISON-KAYE-PLANEACION-2005-ED2 · [p. 244 impresa · hoja 266 del PDF · proyección y captación](https://fundaciontrascender.cl/download/strategic-planning-for-nonprofit-organizations/)
- P14__F03__01 · origen SEA-DIRECCIONES-2026 · [diap. 35 · autonomía operativa](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=35)
- P14__F15__01 · origen ACEDO-RAMIREZ-2011 · [p. 120 impresa · descalce de vencimientos](https://dialnet.unirioja.es/descarga/articulo/3675079.pdf#page=4)
- P14__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 18 impresa · finanzas 9–10](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=20)
- P14__F18__02 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 19 impresa · finanzas 17–18](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=21)
- P16__F03__01 · origen SEA-DIRECCIONES-2026 · [diap. 21 · transferencias](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=21)
- P16__F17__02 · origen JOSSEY-BASS-HANDBOOK-NONPROFIT-2016 · [p. 565 impresa · hoja 597 del PDF · calendario de efectivo](https://onlinelibrary.wiley.com/doi/book/10.1002/9781119176558)
- P16__F26__01 · origen CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 · [p. 126 · §4.5.2.3 · desfase 80 bis](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=126)
- P16__F27__02 · origen CGR-INFOSISREC-REGISTRO-2026 · [InfoSISREC · ejecutor Fund Ciudad Del Nino Ricardo Espinosa → 22783-2026](https://www.rendicioncuentas.cl/info-sisrec/busqueda) · [InfoSISREC · ejecutor Fundación de Beneficencia Hogar de Cristo → 11656-2023](https://www.rendicioncuentas.cl/info-sisrec/busqueda)
- P17__F03__01 · origen SEA-DIRECCIONES-2026 · [diap. 21 · gastos financieros](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=21)
- P17__F03__02 · origen SEA-DIRECCIONES-2026 · [diap. 22 · gastos operativos](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=22)
- P17__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 18 impresa · finanzas 5 y 9](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=20)
- P17__F26__01 · origen CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 · [p. 138 · §4.6.1.8 · gastos objetados](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=138) · [p. 139 · continuación del testimonio FAE](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=139)
- P49__F26__01 · origen CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 · [p. 117 · §4.4.2.4 · etapa de instalación](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=117)
- P49__F26__02 · origen CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 · [p. 126 · §4.5.2.4 · primer abono](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=126)
- P49__F26__03 · origen CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 · [p. 167 · §4.9.3 · testimonio DCE](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=167)
- P49__F27__01 · origen CGR-INFOSISREC-REGISTRO-2026 · [InfoSISREC · ejecutor Fund Ciudad Del Nino Ricardo Espinosa → 22783-2026](https://www.rendicioncuentas.cl/info-sisrec/busqueda)


### OP07 · Agenda de vínculos locales

**Usuario:** Equipo pequeño que organiza contactos institucionales de posibles aliados.

**Tarea:** Registrar relaciones y próximos pasos para un conjunto de contactos ya autorizado.

**Resultado controlable:** Seguimiento ordenado de próximas acciones con aliados.

**Fuera de alcance:** No identifica donantes con certeza, promete conversión ni acredita aumento de aportes.

**Insumos:** Contactos institucionales autorizados; sin scraping, enriquecimiento de personas o envíos automáticos.

**Proceso actual hipotético:** Contactos y pendientes dispersos como hipótesis. La fuente F22 no mide un pipeline ni demanda de CRM.

**Alternativa simple:** Planilla de seguimiento o CiviCRM si se justifica su instalación/operación; licencia gratuita no elimina mantenimiento.

**Brecha por demostrar:** Posible simplificación para equipo pequeño, pero ya existe CRM especializado y la brecha no está validada.

**Variante IA:** Borrador de mensaje a partir de relación y evidencia autorizadas; sin clasificación sensible ni envío autónomo.

**Incremento IA:** IA no resuelve falta de tiempo para relacionarse. Beneficio adicional de borradores todavía desconocido.

**Factibilidad específica:** Datos de contacto y permisos elevan carga de operación. Mantener archivo local sin servicio central en una prueba inicial.

**Sostenibilidad:** Responsable de contactos autorizados y de borrado/exportación; sin datos centrales inicialmente.

**Funcionalidades:**

- Registro mínimo de institución, responsable, etapa y próximo paso
- Vista de tareas pendientes y notas de interacción
- Importación/exportación y eliminación de registros bajo control de la organización

**Métrica principal:** Minutos netos para preparar la lista de próximos pasos, con registro completo.

**Calidad:** Próximos pasos correctos, contactos no autorizados y registros desactualizados.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 3/5:** Centralizar próximos pasos podría reducir trabajo de coordinación frente a dispersión. No se puntúan ingresos o conversión de donantes.

**A 2/5:** Acotada a equipos con contactos institucionales y autorización de uso; las menciones F22 no acreditan organizaciones alcanzables.

**F 4/5:** Se supone seguimiento mensual o mayor durante campañas; cadencia es un supuesto de diseño y no una observación de la encuesta.

**D 3/5:** La rutina puede persistir con un responsable y registros actualizados; no se deduce una red de apoyo permanente por conservar contactos.

**Sensibilidad original:** pesos [48, 51] / puestos [3, 3]; juicios un nivel [39, 59] / puestos [1, 5]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [32, 64]h; mantenimiento [4, 8]h/mes; soporte 15min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 50.0 | [10.25, 14.25] | 0.25 | ND |
| medio | 100 | 200.0 | [29.0, 33.0] | 1.0 | ND |
| alto | 300 | 600.0 | [79.0, 83.0] | 3.0 | ND |

**Fuentes de alternativas:** OP-B6, OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P54__F22__01 · origen CEFIS-UAI-FILANTROPIA-LOCAL-2022 · [p. 47 · gráfico 25 · desafíos internos](https://uai.cdn7pm.net/documentos/filantropia-local-desafios-y-buenas-practicas-en-chile.pdf#page=47)
- P54__F22__02 · origen CEFIS-UAI-FILANTROPIA-LOCAL-2022 · [p. 47 · gráfico 25](https://uai.cdn7pm.net/documentos/filantropia-local-desafios-y-buenas-practicas-en-chile.pdf#page=47)


### OP05 · Comunicación con respaldo

**Usuario:** Responsable de difusión sin equipo dedicado de diseño.

**Tarea:** Preparar una pieza y calendario de comunicación usando resultados autorizados y verificables.

**Resultado controlable:** Pieza coherente con fuentes y calendario de difusión.

**Fuera de alcance:** No aumenta automáticamente alcance, confianza, donaciones ni oportunidades de financiación.

**Insumos:** Resultados públicos/agregados y mensajes aprobados. No historias identificables de beneficiarios sin autorización.

**Proceso actual hipotético:** Preparación manual como hipótesis de trabajo; no se midió el proceso actual.

**Alternativa simple:** Plantillas existentes, documentos y Canva; Nonprofits es una opción sujeta a elegibilidad, no un beneficio universal.

**Brecha por demostrar:** Curaduría de mensajes y fuentes podría ayudar; un nuevo editor de diseño duplicaría oferta.

**Variante IA:** Borradores de versiones de mensajes con evidencia suministrada; cifras y publicación siempre revisadas.

**Incremento IA:** Potencial en redacción por comprobar frente a plantillas; velocidad aislada no basta si aparecen cifras falsas.

**Factibilidad específica:** Acotada para kit; acceso a beneficios Nonprofits se verifica por organización. No desarrollar editor propio.

**Sostenibilidad:** Responsable de contenidos, permisos y fechas; usar recursos existentes y verificar elegibilidad por organización.

**Funcionalidades:**

- Ficha de mensaje con público, objetivo y evidencia
- Plantillas y calendario reutilizable
- Checklist de permisos, cifras y coherencia antes de publicar manualmente

**Métrica principal:** Minutos netos por pieza aceptada con igual calidad y respaldo.

**Calidad:** Cifras sin fuente, mensajes engañosos, correcciones y uso indebido de datos personales.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 2/5:** Las plantillas y editores existentes ya cubren gran parte de la creación. Mejora adicional de preparación sería pequeña y condicionada a contenidos disponibles.

**A 3/5:** La tarea es transferible a distintos equipos de OSC con resultados aprobados; no presupone elegibilidad universal a Canva Nonprofits.

**F 4/5:** Se supone una cadencia mensual o más frecuente de piezas; F22 cuenta menciones, no equipos usuarios ni publicaciones mensuales observadas.

**D 2/5:** El kit puede reutilizarse por campaña; el contenido requiere renovación y no demuestra capacidad permanente.

**Sensibilidad original:** pesos [40, 44] / puestos [4, 5]; juicios un nivel [32, 52] / puestos [3, 6]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [16, 32]h; mantenimiento [4, 8]h/mes; soporte 10min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 100.0 | [8.17, 12.17] | 0.5 | ND |
| medio | 100 | 400.0 | [20.67, 24.67] | 2.0 | ND |
| alto | 300 | 1200.0 | [54.0, 58.0] | 6.0 | ND |

**Fuentes de alternativas:** OP-B5, OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P46__F11__01 · origen IFO-2025-TRASCENDER · [p. 8 del PDF · gráfico y lectura de comunicaciones](https://fundaciontrascender.cl/estudio-revela-desafios-clave-para-la-sostenibilidad-de-las-organizaciones-sociales-en-chile/)
- P46__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 16 impresa · transparencia 9 y 12](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=18)
- P46__F18__02 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 22 impresa · captación 14–16](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=24)
- P46__F22__01 · origen CEFIS-UAI-FILANTROPIA-LOCAL-2022 · [p. 46 · gráfico 24 · entorno](https://uai.cdn7pm.net/documentos/filantropia-local-desafios-y-buenas-practicas-en-chile.pdf#page=46)


### OP04 · Carpeta de antecedentes

**Usuario:** Administración que reúne requisitos de un trámite o donante determinado.

**Tarea:** Mantener un inventario reutilizable y un checklist revisado para una ruta específica de aportes.

**Resultado controlable:** Lista trazable de pendientes y antecedentes reutilizables para el trámite seleccionado.

**Fuera de alcance:** No interpreta automáticamente toda la normativa, autoriza donaciones ni garantiza admisibilidad. La ruta legal no se ha elegido.

**Insumos:** Fuentes oficiales vigentes de la ruta elegida y antecedentes organizacionales. No se cargan identificaciones personales al sitio de investigación.

**Proceso actual hipotético:** Recolección repetida descrita en los problemas; la modalidad operativa de cada equipo sigue sin observar.

**Alternativa simple:** Inventario y checklist en Sheets con carpeta de documentos; enlaces a la autoridad del trámite elegido.

**Brecha por demostrar:** La brecha puede ser de guía y actualización, no de software. No publicar reglas de vigencia como asesoría sin especialista.

**Variante IA:** Sugerir documentos mencionados en una guía pública seleccionada, con cita y lista cerrada; revisión especialista obligatoria.

**Incremento IA:** Beneficio adicional sin demostrar y riesgo de reglas desactualizadas. Preferir checklist curado sin IA.

**Factibilidad específica:** Bloqueada para contenido normativo productivo hasta elegir ruta y responsable de vigencia; diseño sintético sí es posible.

**Sostenibilidad:** Elegir una ruta y un curador de vigencia. Sin ello, no publicar checklist normativo como vigente.

**Funcionalidades:**

- Inventario de documentos con fecha, responsable y enlace
- Checklist de una ruta con fuente oficial y fecha de revisión
- Exportación de pendientes; revisión humana de vigencia y aplicabilidad

**Métrica principal:** Minutos netos para reunir un expediente y omisiones por checklist revisado.

**Calidad:** Fuentes vigentes, requisitos mal aplicados, documentos omitidos y duplicados.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 3/5:** Reutilizar antecedentes puede reducir repeticiones y omisiones; la validez del trámite no queda resuelta por el checklist. Ganancia moderada condicionada.

**A 2/5:** Alcance acotado a una ruta elegida, con requisitos comunes; no se generaliza a todos los regímenes ni donantes.

**F 3/5:** Se supone uso en varios trámites/convocatorias del año; no se multiplica por cada documento aportado.

**D 2/5:** El beneficio depende de actualizar requisitos y vigencias. Reutilizar un archivo no basta para acreditar cambio duradero.

**Sensibilidad original:** pesos [38, 42] / puestos [4, 5]; juicios un nivel [31, 51] / puestos [3, 6]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [32, 64]h; mantenimiento [6, 12]h/mes; soporte 15min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 12.5 | [12.25, 18.25] | 0.0625 | ND |
| medio | 100 | 50.0 | [31.0, 37.0] | 0.25 | ND |
| alto | 300 | 150.0 | [81.0, 87.0] | 0.75 | ND |

**Fuentes de alternativas:** OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P25__F03__01 · origen SEA-DIRECCIONES-2026 · [diap. 33 · marco de financiamiento](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=33)
- P25__F03__02 · origen SEA-DIRECCIONES-2026 · [diap. 28 · barreras de donación](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=28)
- P25__F07__01 · origen SEA-REGISTROS-OSC-2025 · [p. 19 · registros de donatarias](https://politicaspublicas.uc.cl/content/uploads/2025/11/Informe_Registro-Unico_161025-VF.pdf#page=19)
- P25__F09__01 · origen SEA-MESA-SOCIEDAD-CIVIL-2025 · [p. 22 · trámites de donaciones](https://politicaspublicas.uc.cl/content/uploads/2025/10/MESA-soc_civil_DOCUMENTO-COMPLETO_PRESIDeNCIALES-UC_1imp-1.pdf#page=22)
- P38__F07__02 · origen SEA-REGISTROS-OSC-2025 · [p. 25 · validación manual](https://politicaspublicas.uc.cl/content/uploads/2025/11/Informe_Registro-Unico_161025-VF.pdf#page=25)
- P38__F07__03 · origen SEA-REGISTROS-OSC-2025 · [p. 27 · certificados y verificaciones](https://politicaspublicas.uc.cl/content/uploads/2025/11/Informe_Registro-Unico_161025-VF.pdf#page=27)
- P38__F07__04 · origen SEA-REGISTROS-OSC-2025 · [p. 28 · repetición de documentos](https://politicaspublicas.uc.cl/content/uploads/2025/11/Informe_Registro-Unico_161025-VF.pdf#page=28)
- P38__F09__01 · origen SEA-MESA-SOCIEDAD-CIVIL-2025 · [p. 9 · registro único y reutilización](https://politicaspublicas.uc.cl/content/uploads/2025/10/MESA-soc_civil_DOCUMENTO-COMPLETO_PRESIDeNCIALES-UC_1imp-1.pdf#page=9)
- P26__F03__01 · origen SEA-DIRECCIONES-2026 · [diap. 28 · barreras y facilitadores](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=28)
- P26__F04__01 · origen SEA-DIRECCIONES-2025 · [diap. 17 · fondos privados](https://politicaspublicas.uc.cl/content/uploads/2025/08/sociedad-en-accion_presentacion-1.pdf#page=17)
- P26__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 20 impresa · captación 1–2](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=22)
- P26__F18__02 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 21 impresa · captación 7–11](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=23)


### OP06 · Traspaso de funciones

**Usuario:** Coordinación que documenta procesos antes de una rotación o incorporación.

**Tarea:** Ordenar instrucciones, responsables y evidencia de un proceso para entregar el rol.

**Resultado controlable:** Paquete de traspaso recuperable y actualizado.

**Fuera de alcance:** No retiene especialistas, mejora contratos ni sustituye la experiencia profesional perdida.

**Insumos:** Procedimientos internos previamente autorizados y responsable. Los contratos/salarios no son necesarios para el prototipo.

**Proceso actual hipotético:** Traspaso informal como hipótesis; no se dispone de tiempos ni casos operativos comparables.

**Alternativa simple:** Documentos y carpeta compartida con plantillas; repositorio convencional basta para el núcleo.

**Brecha por demostrar:** La dificultad puede ser tiempo para documentar y mantener, no acceso a otra aplicación.

**Variante IA:** Responder preguntas sólo desde procedimientos aprobados con cita; borrador no vinculante.

**Incremento IA:** Búsqueda semántica podría ayudar; sin corpus y prueba no supera a índice y búsqueda convencional.

**Factibilidad específica:** Requiere corpus y dueño de actualización no acreditados. Mayor riesgo de instrucciones obsoletas que una plantilla simple.

**Sostenibilidad:** Dueño de cada procedimiento y revisión programada; no añadir buscador IA a un corpus obsoleto.

**Funcionalidades:**

- Plantilla de procedimiento y mapa de archivos
- Checklist de entrega y tareas de incorporación
- Historial de actualización y prueba de recuperación de una instrucción

**Métrica principal:** Minutos para localizar una instrucción correcta en una tarea de traspaso.

**Calidad:** Instrucciones vigentes, respuestas sin respaldo y pasos omitidos.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 2/5:** Documentar ayuda al traspaso, pero es una porción pequeña de la retención de especialistas; no se puntúa permanencia laboral como beneficio del repositorio.

**A 2/5:** Se limita a equipos con procedimientos documentables y dueño de actualización. Corpus disponible y uso son condiciones pendientes.

**F 3/5:** Se supone consulta de procedimientos varias veces por año; los eventos de rotación no se convierten en una tasa observada.

**D 3/5:** Procedimientos actualizados podrían sostener conocimiento entre entregas, condicionado a mantenimiento; no se premia sólo el número de consultas.

**Sensibilidad original:** pesos [33, 38] / puestos [5, 6]; juicios un nivel [25, 44] / puestos [4, 7]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [24, 48]h; mantenimiento [4, 8]h/mes; soporte 15min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 25.0 | [10.25, 14.25] | 0.125 | ND |
| medio | 100 | 100.0 | [29.0, 33.0] | 0.5 | ND |
| alto | 300 | 300.0 | [79.0, 83.0] | 1.5 | ND |

**Fuentes de alternativas:** OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P28__F03__01 · origen SEA-DIRECCIONES-2026 · [diap. 36 · ciclos de financiamiento](https://politicaspublicas.uc.cl/content/uploads/2026/10/20261027_Evento-Encuesta-directores-2026.pdf#page=36)
- P28__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 33 impresa · RR. HH. 12–17 en el PDF](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=35)
- P28__F18__02 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 34 impresa · RR. HH. 21–23 en el PDF](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=36)
- P28__F26__01 · origen CSP-SERVICIO-PROTECCION-FINANCIAMIENTO-2025 · [p. 140 · §4.6.2.1 · rotación](https://servicioproteccion.gob.cl/601/articles-3776_archivo_01.pdf#page=140)


### OP02 · Evidencias listas para FECU

**Usuario:** Equipo administrativo que prepara memoria y balance.

**Tarea:** Inventariar antecedentes y pendientes antes de trabajar en FECU Social Web.

**Resultado controlable:** Inventario de antecedentes y pendientes para alimentar la plataforma existente.

**Fuera de alcance:** No emite estados financieros, no certifica cumplimiento ni reemplaza a contador/FECU.

**Insumos:** Documentos públicos o agregados de gestión y respaldo contable revisado por profesional. Sin acceso automático a FECU.

**Proceso actual hipotético:** Preparación fragmentada como hipótesis; no observada. La plataforma existente ya puede resolver parte importante del proceso.

**Alternativa simple:** Usar FECU Social Web gratuita y su material de apoyo; planilla sólo para antecedentes previos.

**Brecha por demostrar:** No se ha comprobado que falte un organizador previo respecto de la plataforma; validar brecha antes de desarrollar.

**Variante IA:** Borrador de texto de gestión con citas a evidencia pública; sin cálculo contable ni envío oficial.

**Incremento IA:** Incremento de IA sin medir; podría añadir revisión y duplicar funciones. No se recomienda como primer producto.

**Factibilidad específica:** Requiere contraparte contable y comprobar la brecha con FECU. No se acredita necesidad de software nuevo.

**Sostenibilidad:** Acordar curaduría contable y comprobar brecha con FECU; si no existe, recomendar la plataforma y acompañar su uso.

**Funcionalidades:**

- Lista de antecedentes, responsable y enlace al documento de respaldo
- Identificación manual de campos sin evidencia
- Guía de traspaso a FECU Social, sin duplicar su llenado ni sus validaciones

**Métrica principal:** Minutos netos para reunir antecedentes de una memoria con igual integridad.

**Calidad:** Campos sustentados, errores críticos y correcciones después de revisión profesional.

Tiempo ahorrado, adopción, ejecuciones, mejora de calidad e incremento IA: **por medir**. Confianza IPH Baja.

**M 2/5:** Se reduce a mejora pequeña adicional por inventario previo: FECU ya tiene revisión, histórico y alertas. No atribuir de nuevo esas funciones al producto propuesto.

**A 3/5:** La memoria/balance es aplicable a diversos equipos, pero datos y revisión contable son condiciones; se desconoce cuántos usarían el complemento.

**F 1/5:** Unidad: ciclo anual de preparación de memoria/balance. No se cuentan cada campo o corrección como entregas nuevas.

**D 2/5:** El inventario apoya el ciclo y puede reutilizarse; su permanencia no demuestra una mejora sostenida de gestión entre ciclos.

**Sensibilidad original:** pesos [25, 29] / puestos [7, 7]; juicios un nivel [17, 37] / puestos [6, 7]. No son intervalos estadísticos.

**Trabajo supuesto:** desarrollo [24, 56]h; mantenimiento [4, 8]h/mes; soporte 15min por organización activa/mes. Supuestos de planificación propios, no cotización, benchmark de productividad ni presupuesto aprobado. No incluyen integraciones, autenticación o base de datos central.

| Escenario | Organizaciones supuestas | Tareas/mes equivalente | Trabajo SdC h/mes | API opcional USD/mes | TCO completo |
| --- | --- | --- | --- | --- | --- |
| bajo | 25 | 2.08 | [10.25, 14.25] | 0.0104 | ND |
| medio | 100 | 8.33 | [29.0, 33.0] | 0.0417 | ND |
| alto | 300 | 25.0 | [79.0, 83.0] | 0.125 | ND |

**Fuentes de alternativas:** OP-B2, OP-B3, OP-B4. Las funciones fueron contrastadas documentalmente, sin ensayo de productividad.

**Evidencia del mecanismo:** los localizadores conservan el estado heredado del banco; no equivalen a una nueva verificación de todos los PDF.

- P32__F10__01 · origen COS-FECU-SOCIAL-2024 · [p. 3 · capacidad y reporte anual](https://comunidad-org.cl/wp-content/uploads/2026/06/Informe-FECU-Social-2024.pdf#page=3)
- P32__F18__01 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 15 impresa · transparencia 7](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=17) · [p. 16 impresa · continuación de transparencia 7](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=18)
- P32__F18__02 · origen MINNESOTA-COUNCIL-NONPROFITS-PRACTICES-2014 · [p. 17 impresa · finanzas 1–4](https://minnesotanonprofits.org/wp-content/uploads/2024/05/principles-and-practice-full.pdf#page=19)
- P32__F20__02 · origen ALLISON-KAYE-PLANEACION-2005-ED2 · [p. 289 impresa · hoja 311 del PDF · sistemas de información](https://fundaciontrascender.cl/download/strategic-planning-for-nonprofit-organizations/) · [p. 288 impresa · hoja 310 del PDF · inicio del ejemplo](https://fundaciontrascender.cl/download/strategic-planning-for-nonprofit-organizations/)
- P41__F08__01 · origen SEA-FISCALIZACION-PJ-2025 · [p. 17 · carga y observaciones](https://politicaspublicas.uc.cl/content/uploads/2025/08/Informe_Lineamienro-fortalecimineto-fiscaliza_231025.pdf#page=17)
- P41__F08__02 · origen SEA-FISCALIZACION-PJ-2025 · [p. 18 · carga parcial y propuesta](https://politicaspublicas.uc.cl/content/uploads/2025/08/Informe_Lineamienro-fortalecimineto-fiscaliza_231025.pdf#page=18)


## Costos: alcance del simulador

Referencia mínima de kit/archivo por organización y publicación estática sin backend, cuentas centrales, integración o datos de beneficiarios. Cloudflare sólo es referencia, no proveedor contratado ni migración de la web actual.

Sólo peticiones a archivos estáticos bajo las condiciones publicadas; dominio, funciones, almacenamiento central, autenticación, correo e integraciones no incluidos.

Desarrollo, mantenimiento y soporte son supuestos propios. Tarifa laboral, disponibilidad y presupuesto no acreditados: TCO monetario completo no determinado. No se infiere personal gratuito.

Posible SdC, alianza o patrocinador; financiación no acordada. No se cobra al usuario en el alcance inicial.

Sin responsable editorial/técnico y capacidad de soporte no se publica servicio permanente; queda kit descargable con fecha y alcance. API desactivada por defecto; si se evalúa después, fijar tope aprobado y fallback sin IA. No hay gasto autorizado.

Precio, disposición a pagar y modelo comercial pendientes. No son filtro de esta primera evaluación gratuita.

Tarifa de referencia Gemini 3.1 Flash-Lite estándar texto de pago consultada 23/11/2026: USD 0,25/M entrada y USD 1,50/M salida. Dos llamadas de 4.000 entrada/1.000 salida por tarea son supuesto: USD 0,005 sólo API por tarea. No es TCO; backend, revisión, soporte, modelo de seguridad y desarrollo IA adicional quedan sin cotizar. Sin consumo, proveedor elegido o presupuesto aprobado.

## OP-6 · MVP propuesto

**opportunity:** OP01

**title:** Primer experimento gratuito propuesto · Acuerdos al día

**status:** Especificación lista; herramienta operativa no construida, presupuesto/equipo no asignados

**user:** Una coordinación/secretaría con acuerdos y responsable de actualización; segmento por tarea, sin demanda o cantidad de usuarios acreditadas.

**deliverables:**

- Plantilla gratuita de acuerdos en archivo propio de la organización, con ejemplo sintético y diccionario de campos
- Guía breve y carpeta imprimible de pendientes para reunión
- Importación/exportación CSV y estado local si luego se justifica una interfaz sencilla

**dataFields:**

- identificador
- acuerdo
- fecha de reunión
- responsable (rol)
- fecha objetivo
- estado
- avance
- enlace de evidencia
- última revisión

**excluded:**

- Integración de correo/calendario/Trello
- Grabación/transcripción de reuniones
- Firma oficial, aprobaciones automáticas o envío de mensajes
- Datos de beneficiarios y cuentas centrales de organizaciones
- IA, multiusuario propio o servidor en la primera versión

**architecture:** Probar primero plantilla Sheets/archivo CSV y guía SdC. Si la preparación de carpeta resulta claramente mejorable, una interfaz estática local con exportación puede compararse con la plantilla. La aplicación propia queda condicionada al resultado.

**testDesign:** Primero probar con tres actas sintéticas: acuerdos completos, campos faltantes y acuerdos contradictorios. Cotejar pendientes, responsables y plazos contra una tabla esperada. Esto verifica lógica, no ahorro humano. Después proponer una comparación con participantes y casos equivalentes, orden contrabalanceado, sin iniciarla en esta etapa.

**comparator:** Mejor plantilla simple en Sheets/Trello Free con la misma información. Mantener un proceso disperso sintético sólo como referencia secundaria. No ganar por comparar con un proceso artificialmente malo.

**measurement:** Registrar tiempo total (preparación, carga, revisión y corrección), integridad de campos y errores, carga de formación aparte. ΔIA se mediría en otra comparación si se incorpora más adelante.

**proposedSuccessGate:** Regla de diseño para prueba posterior, no resultado: ningún error crítico de responsable/plazo; campos exigidos sustentados; mediana de tiempo total al menos 20% menor frente a plantilla simple y sin mayor carga recurrente de mantenimiento. Ese20% es umbral de decisión propuesto, no eficacia esperada. Muestra y protocolo se definirán antes de una prueba con personas; con pocos casos no se extrapola a la población.

**simplifyOrStop:** Si la plantilla produce calidad y tiempo similares o la interfaz añade doble ingreso, entregar el kit y evitar aplicación nueva. Si no hay responsable de mantener/soportar, limitarse a material fechado.

**nextPhase:** Desarrollar y verificar el kit/plantilla y los casos sintéticos. No exigir nuevas entrevistas o datos privados para ese siguiente paso; el ensayo con personas requiere alcance acordado después.

## Fuentes complementarias · separadas de las 26 históricas

- **OP-M1 · Método** · [Impact Frontiers · How Much](https://impactfrontiers.org/norms/five-dimensions-of-impact/how-much/). Distingue escala, profundidad y duración del efecto. No valida nuestra fórmula ni sus pesos. Origen: Impact Frontiers · Norms. Consulta 23/11/2026.
- **OP-M2 · Método** · [Impact Frontiers · Contribution](https://impactfrontiers.org/norms/five-dimensions-of-impact/enterprise-contribution/). La contribución exige comparar con lo que habría ocurrido de todas formas. Origen: Impact Frontiers · Norms. Consulta 23/11/2026.
- **OP-M3 · Método** · [HM Treasury · Evaluación de intervenciones IA](https://www.gov.uk/government/publications/the-magenta-book/guidance-on-the-impact-evaluation-of-ai-interventions-html). Orienta línea base y evaluación de resultados; eficiencia, calidad y precisión requieren comprobación. Origen: HM Treasury · 15/05/2026. Consulta 23/11/2026.
- **OP-B1 · Alternativa** · [Trello · Free](https://trello.com/pricing). Free: hasta 10 colaboradores y 10 tableros por espacio; responsables, fechas y 250 ejecuciones de automatización al mes. IA figura en planes superiores. Origen: Atlassian · oferta del proveedor. Consulta 23/11/2026.
- **OP-B2 · Alternativa** · [FECU Social Web · funciones](https://fecusocial.comunidad-org.cl/). Ya ofrece perfiles de llenado/revisión, histórico y alertas de descuadre. Son funciones declaradas por COS, no exactitud probada por este proyecto. Origen: COS · FECU Social. Consulta 23/11/2026.
- **OP-B3 · Acceso** · [COS · acceso gratuito a FECU Social](https://comunidad-org.cl/blog/por-que-es-crucial-la-transparencia-en-las-organizaciones-sociales-en-chile/). COS informa registro gratuito para fundaciones y corporaciones chilenas, socias o no. No se presume soporte especializado gratuito para todas. Origen: COS · FECU Social. Consulta 23/11/2026.
- **OP-B4 · Alternativa** · [Google Sheets · funciones y acceso](https://workspace.google.com/products/sheets/). Permite crear con cuenta Google, coeditar, controlar permisos y recuperar versiones. Algunas funciones Gemini requieren planes de Workspace. Origen: Google · Sheets. Consulta 23/11/2026.
- **OP-B5 · Alternativa** · [Canva Nonprofits · elegibilidad](https://www.canva.com/nonprofits/). El programa ofrece prestaciones sin cargo a organizaciones elegibles y exige acreditar requisitos; no toda fundación califica, incluidas exclusiones para grant-making foundations. Origen: Canva · programa Nonprofits. Consulta 23/11/2026.
- **OP-B6 · Alternativa** · [CiviCRM · documentación oficial](https://docs.civicrm.org/user/en/latest/introduction/what-is-civicrm/). CRM de código abierto sin tarifa de licencia/usuario; incluye contactos, contribuciones y actividades. Instalarlo y sostenerlo exige operación propia o un servicio. Origen: CiviCRM · guía oficial. Consulta 23/11/2026.
- **OP-C1 · Costo** · [Cloudflare Pages · tarifas de funciones y estáticos](https://developers.cloudflare.com/pages/functions/pricing/). Peticiones a archivos estáticos gratuitas e ilimitadas; funciones consumen cuotas distintas. Se usa sólo como referencia de publicación estática, sin dominio ni backend. Origen: Cloudflare · documentación. Consulta 23/11/2026.
- **OP-C2 · Costo** · [Gemini Developer API · precios estándar](https://aistudio.google.com/docs/pricing#gemini-3.1-flash-lite). Referencia Gemini 3.1 Flash-Lite estándar texto: USD 0,25 por millón de tokens de entrada y USD 1,50 de salida. No incluye búsquedas, caché ni backend; tarifa sujeta a cambio. Origen: Google · Gemini Developer API. Consulta 23/11/2026.

Dos páginas del mismo proveedor no son dos estudios de eficacia. El número de fuentes no aumenta el índice. Los marcos orientan criterios, no validan nuestra fórmula o pesos.

## Verificación y continuidad

Local: 36 pruebas de índices, MF-1 88/88, H-M 46/46 y baseline 54/54 aprobadas. CI Chromium45213367658 PASS y baseline45213367808 PASS para b56975f1fe3277d380d288fef8da7adddd4f336b. Capturas escritorio1440 y móvil390 de los dos universos inspeccionadas; navegación, controles, escenarios, exportaciones y regresión completa aprobadas. Preview READY contra el mismo SHA, rutas HTTP200 y datos7/31 comprobados. La entrega final añade aclaraciones editoriales y repite CI/smoke; el cierre de Notion/PR identifica el SHA final. No se fusiona producción en este corte.

Siguiente trabajo concreto: desarrollar y comprobar el kit/plantilla OP01 con ejemplos sintéticos y comparación contra la mejor plantilla convencional. Prueba con usuarios y eventual IA son posteriores; no esperar entrevistas para crear el kit.

