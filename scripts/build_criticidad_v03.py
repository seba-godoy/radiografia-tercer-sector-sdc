"""Apply an explicitly evaluative rubric to the existing, frozen 31-problem bank."""
import csv, hashlib, json, math
from pathlib import Path

APP=Path(__file__).resolve().parent.parent
BANK=APP/'analisis/mf1-banco-26-fuentes-v1.json'
bank=json.loads(BANK.read_text())
titles={p['id']:p['titulo'] for p in json.loads((APP/'analisis/h-2-1-criticidad-por-universo-v1.json').read_text())['problemas']}
findings={x['id']:x for x in bank['findings']}
weights=dict(I=35,F=25,A=25,U=15)

method={
 'version':'0.3','date':'2026-11-23','name':'Priorización documental provisional de los 31 problemas',
 'status':'aplicada_31_de_31_sin_validacion_de_campo',
 'decision':'Se permite juicio analítico trazable sobre evidencia ya recolectada. Sustituye el bloqueo de v0.2 por mediciones completas; conserva esa aplicación como antecedente histórico.',
 'scope':'Una referencia documental común para los 31 problemas. Incluye muestras mixtas, diagnósticos, casos y programas especializados. No estima prevalencia nacional ni puntajes exclusivos de fundaciones; el selector de universo no crea una segunda muestra.',
 'weights':weights,
 'formula':'C = redondear(1 + 99 × ((0,35 I + 0,25 F + 0,25 A + 0,15 U) − 1) / 4), con I,F,A,U entre 1 y 5.',
 'meaning':'El resultado ordena juicios documentales bajo esta convención. 75/100 no significa 75% de organizaciones afectadas, probabilidad de cierre ni carga económica medida. El redondeo no convierte la escala ordinal en una medición precisa.',
 'missing':'No se imputa ND=0 ni ND=3. Toda dimensión recibe un juicio razonado específico con citas; los datos empíricos ausentes siguen ausentes. Si faltara incluso un mecanismo documentado, no se podría puntuar. Los 31 tienen mecanismo documentado.',
 'confidence':'Media: combinación de observación agregada directa y mecanismos, con inferencias todavía importantes. Baja: mecanismo principalmente cualitativo, proxy o evidencia sectorial/caso para componentes relevantes. No se asigna Alta: no hay cuatro componentes medidos de forma comparable. La confianza no multiplica ni descuenta puntos.',
 'sources':'Cada afirmación mantiene su localizador y origen atribuido. Informe y presentación IFO cuentan como un origen; F09 que reproduce F04 y F07 que reproduce F01 conservan el origen original. Olas UC2025/2026 son mediciones distintas con posible solapamiento, no réplicas independientes. Los libros y guías explican mecanismos; no acreditan incidencia chilena. Los conteos de publicaciones no dan puntos.',
 'overlap':'Los 31 problemas se solapan causalmente: no sumar sus puntajes ni sus muestras. P13 (estabilidad), P14 (autonomía), P16 (atrasos), P17 (costos no cubiertos) y P28 (retención) pueden compartir efectos; la suma no representa un impacto total.',
 'sensitivity':'Se comparan pesos iguales y ocho cambios de ±5 puntos porcentuales por criterio, compensados proporcionalmente en los otros tres. Además se cambia ±1 nivel, de a una, en cada dimensión inferida. Los rangos son escenarios de decisión, no intervalos estadísticos. Se conservan empates con ranking de competición.',
 'exclusions':'No incorpora factibilidad de IA, facilidad de resolver, disposición a pagar ni número de fuentes. Esas decisiones vienen después.',
 'criteria':[
  {'key':'I','name':'Impacto','weight':35,'definition':'Gravedad de la consecuencia operativa documentada cuando ocurre; juicio sobre el mecanismo, no pérdida media poblacional.', 'anchors':['1 · fricción menor y reversible','2 · retrabajo administrativo acotado','3 · costo o deterioro material de capacidad/decisión','4 · deterioro de servicios, personal o capacidad de cumplir la misión','5 · interrupción de atención esencial o del vínculo protector; riesgo directo de continuidad']},
  {'key':'F','name':'Persistencia o recurrencia','weight':25,'definition':'Carácter episódico, cíclico o persistente del mecanismo para una organización expuesta. Dos encuestas anuales no son dos episodios por organización.', 'anchors':['1 · episodio excepcional delimitado','2 · hito ocasional: arranque, cierre o cambio de operador','3 · ciclo anual/bianual o convocatoria','4 · ciclos operativos repetidos o vulnerabilidad que se mantiene entre ciclos','5 · carga en la operación cotidiana mientras existe la condición']},
  {'key':'A','name':'Alcance','weight':25,'definition':'Extensión del problema en la población y modalidad explícitamente descritas. Juicio estructural que combina medidas disponibles y delimitación del mecanismo. No equivale a estimar cuántas OSC de Chile lo padecen.', 'anchors':['1 · caso singular sin extensión del mecanismo a otro grupo identificado','2 · subgrupo de una modalidad/territorio o reporte menor a 20% en la base elegible','3 · modelo operativo o grupo elegible identificable; reporte de 20–39% cuando el ítem mide el problema','4 · varios perfiles de organizaciones o reporte de 40–59% en la base elegible','5 · requisito transversal documentado o reporte de al menos 60% en la base elegible'], 'caution':'Los umbrales son anclas, no conversiones automáticas de porcentajes. Prioridades, percepciones y porcentajes de menciones se identifican como proxies. En evidencia cualitativa la extensión se justifica por el diseño del proceso o la modalidad, nunca por el número de documentos.'},
  {'key':'U','name':'Urgencia','weight':15,'definition':'Margen operativo para actuar antes de agravar la consecuencia, inferido del proceso o de un escenario explícito. No se inventan días de espera.', 'anchors':['1 · no se identifica un hito operativo próximo que obligue a intervenir','2 · mejora planificable en la revisión anual','3 · decisión antes de la próxima convocatoria, reunión o entrega periódica','4 · compromisos de caja/equipo/servicio del ciclo actual, en horizonte de meses','5 · atención o protección en curso, inicio obligatorio o pagos inmediatos comprometidos']}
 ]}

# Each entry: levels, scope, confidence, four criterion-specific rationales with claim IDs,
# followed by a counterweight/limitation. These are analyst judgments, not extracted measurements.
D={
'P02':([5,3,3,5],'Ejecutoras con convenios estatales; atención permanente','Media',[
 ('Terminar un proyecto de atención permanente interrumpe la continuidad del servicio; no se conoce la cantidad de personas ni la duración.','F03__01'),
 ('La renovación constituye un ciclo contractual; se valora como cíclico, sin inferir cuántas veces le ocurrió a cada entidad.','F09__01'),
 ('28% de 125 encuestadas con convenios declara el término por no renovación; el alcance se limita a esa base mixta.','F03__01'),
 ('Cuando se decide no renovar, la atención permanente requiere una transición inmediata para evitar una interrupción. Es una inferencia del servicio descrito.','F03__01')],
 'El 54,9% de inactividad registral de F01 no mide cierres de servicios. No se usa para puntuar. F26 tampoco acredita específicamente la no renovación.'),
'P11':([3,4,3,2],'OSC que evalúan resultados; evidencia chilena y contexto filantrópico','Baja',[
 ('La falta de recursos para evaluar deteriora decisiones y aprendizaje; no está demostrado que provoque por sí sola cierres o interrupciones.','F09__01'),
 ('Medir, sistematizar y comunicar son funciones continuadas del programa: se infiere persistencia de la brecha mientras no se asignen capacidades.','F09__01'),
 ('El diagnóstico abarca capacidades de OSC; el 39% prioriza evaluar, pero no mide incapacidad. Se juzga alcance de un modelo de gestión, sin asignar ese 39% como prevalencia.','F09__01 F03__01'),
 ('La mejora puede incorporarse al presupuesto y planificación de evaluación; el banco no acredita un vencimiento inmediato.','F18__02')],
 'F19 indica 80% que mide y reporta y F23 políticas de evaluación en 64% de la muestra chilena: medir, tener una política y medir cambios causalmente son cosas distintas. No se afirma incapacidad generalizada.'),
'P13':([4,4,4,4],'Estabilidad de ingresos privados/propios; muestras mixtas y contraste agregado','Media',[
 ('Las consecuencias operativas de reducciones de ingresos justifican riesgo para servicios y equipo. La atribución exclusiva a ingresos privados/propios es parcial; no se toma el cierre como consecuencia típica.','F03__02 F09__01'),
 ('La cartera de aportes y su renovación se gestionan entre ciclos; se juzga persistencia de la incertidumbre. Las olas UC no cuentan como episodios ni el registro SII como pérdidas operativas.','F03__04 F18__01'),
 ('Se triangulan 37% con caída de donaciones y 31% en ingresos propios, autodiagnóstico financiero IFO y dependencia de donaciones locales. Se juzga extensión entre perfiles; no se suman porcentajes ni se usa 44% de prioridad como incidencia.','F03__02 F11__01 F22__01'),
 ('La incertidumbre afecta decisiones de presupuesto y de continuidad del ciclo en curso. El horizonte de meses es un juicio operativo, no un plazo medido para la muestra de P13.','F20__01 F20__02')],
 'Una caída de donaciones puede compensarse con otros ingresos: el caso Cultiva del expediente previo lo ilustra. Composición financiera, interés en formación e índices IFO no miden variación de caja. P13 no recibe 37 puntos por el 37%.'),
'P14':([5,4,5,4],'219 encuestadas ante el escenario hipotético de cesar aportes externos','Media',[
 ('Agotar la capacidad de sostener operación compromete la continuidad de la misión. Es severidad condicional al escenario, no cierre observado.','F03__01'),
 ('La exposición de caja se mantiene mientras hay compromisos y reservas limitadas; se infiere persistencia de la vulnerabilidad, no repetición de interrupciones de aportes.','F18__01 F18__02'),
 ('38% menos de tres meses más 30% entre tres y seis: 68% de N219 hasta seis meses bajo el escenario publicado. No se extrapola a Chile ni a un shock efectivamente ocurrido.','F03__01'),
 ('El escenario sitúa el margen en meses para buena parte de las respuestas. No permite asignar una crisis inmediata a las 219 entidades.','F03__01')],
 'Es resistencia declarada a un escenario, no incidencia de falta de caja. P14 es especialmente sensible a cómo se valore ese escenario; no debe presentarse como daño ya ocurrido.'),
'P15':([4,3,4,3],'Ejecutoras que concurren a convocatorias estatales habituales','Media',[
 ('Perder una convocatoria habitual elimina una vía de recursos para sostener programas. El daño sobre servicios se infiere; no toda convocatoria ausente implica cierre.','F03__01'),
 ('El mecanismo se activa en cada calendario de convocatoria; las respuestas de dos olas no demuestran repetición individual.','F03__01 F04__01'),
 ('54% reporta ausencia de convocatorias habituales; el 39% que no postuló es otra pregunta y no se suma.','F03__01'),
 ('La búsqueda de alternativa debe anticiparse al próximo calendario de financiamiento; no hay plazo de caja documentado para este ítem.','F03__01')],
 'Las olas 2025 y 2026 pueden compartir participantes. No equivalen a dos fuentes estadísticamente independientes ni permiten sumar 51% y 54%.'),
'P16':([4,4,4,5],'Ejecutoras con compromisos estatales; ejemplos de Protección Especializada','Media',[
 ('Los testimonios describen crédito y postergación de sueldos/cotizaciones; el daño de caja afecta capacidad operativa, aunque no se cuantifica la pérdida típica.','F26__01 F26__02'),
 ('Los desembolsos y pagos laborales se repiten en la ejecución; se infiere exposición entre ciclos, no una tasa de episodios por fundación.','F03__01 F26__01'),
 ('57% de 125 declara transferencias fuera de plazo; el 47% de la ola anterior corrobora la señal sin ser una réplica independiente.','F03__01 F04__01'),
 ('El personal debe pagarse mientras no llega el aporte: obligación del ciclo inmediato, respaldada por casos de uno y medio a tres meses.','F26__01 F26__02')],
 'El giro posterior al inicio de F27 no demuestra atraso contractual: faltan fecha pactada y abono bancario. No se usa como un atraso verificado.'),
'P17':([4,5,4,4],'Ejecutoras con convenios cuyos costos necesarios no son financiables','Media',[
 ('Cubrir gastos indispensables con recursos propios reduce capacidad de sostener el programa; hay ejemplos de soporte y apoyo a familias.','F26__01 F26__02'),
 ('La incompatibilidad entre costo necesario y gasto rendible opera cada vez que se incurre en ese costo durante el convenio; juicio de carga persistente.','F09__01 F26__01'),
 ('52% declara gastos financieros no admisibles y 40% gastos operativos/administrativos. Son ítems distintos, no 92% ni total único.','F03__01 F03__02'),
 ('Los gastos deben cubrirse durante el ciclo actual aunque no sean admisibles; se infiere presión en meses, sin plazo promedio medido.','F26__01 F26__02')],
 'La recomendación de reservar 10%–20% no es una medición de la brecha. El 26% de costeo residencial no se extrapola a otros programas.'),
'P18':([4,3,4,5],'Convenios sometidos al trámite; muestra mixta con contratos estatales','Media',[
 ('El ítem declara que no pudieron iniciar actividades: afecta la ejecución del servicio, sin medir atenciones perdidas.','F03__01'),
 ('La toma de razón corresponde al inicio de un acto/convenio, no a una carga diaria. Se valora como ciclo contractual.','F03__01'),
 ('42% de N125 reportó el impedimento; no se conoce la base exacta de contratos sujetos al trámite. Ese límite reduce confianza en la interpretación del alcance.','F03__01'),
 ('La actividad prevista queda impedida al inicio comprometido; se valora urgencia del hito, sin inventar días de demora.','F03__01')],
 'No todos los contratos están sujetos a toma de razón. 34% en 2024 y 42% en 2025 no acreditan que empeoró una misma cohorte.'),
'P19':([3,3,3,3],'Organizaciones pequeñas/medianas o nuevas al contratar con el Estado','Baja',[
 ('Las garantías pueden exigir endeudamiento o bloquear el acceso. No está medida la exclusión por tamaño: se valora costo/barrera material, no cierre probado.','F26__01 F03__02'),
 ('La constitución y renovación de garantías reaparece en los ciclos contractuales.','F06__02'),
 ('26% informa garantías sobre 5%, pero no mide exclusión. La extensión se juzga sobre el modelo de contratación de entidades con poco respaldo, no como 26% de pequeñas excluidas.','F03__01 F26__01'),
 ('La garantía debe resolverse antes de adjudicar/iniciar el convenio; se trata como próximo hito contractual.','F26__01')],
 'El 16% anterior usa umbral de 20% del contrato; no es comparable con el 26% sobre 5%. La regulación contempla instrumentos y tratamiento de costos.'),
'P20':([3,4,5,3],'Ejecutoras con rendiciones sujetas a respuesta del otorgante','Media',[
 ('La incertidumbre y seguimiento de expedientes abiertos consumen capacidad; no toda rendición abierta demuestra dinero retenido o servicio interrumpido.','F03__01 F06__01'),
 ('La rendición ocurre en ciclos de ejecución y una revisión prolongada mantiene expedientes entre ciclos. Es persistencia inferida, no número de reaperturas.','F03__02'),
 ('62% de N125 declara falta de respuesta en plazo. El 42% sobre siete meses tiene otra pregunta/base y no se agrega.','F03__01 F03__02'),
 ('Hay plazos contractuales y de revisión para gestionar; los siete meses transcurridos no revelan tiempo restante para evitar daño. Se asigna urgencia de gestión periódica.','F06__01')],
 'F09 reproduce F04: una sola observación original. F27 permite distinguir estados, pero no prueba incumplimiento del plazo de los casos revisados.'),
'P21':([3,4,4,3],'Ejecutoras a las que reabren rendiciones aprobadas','Media',[
 ('Rehacer antecedentes ya aprobados implica retrabajo y reasignación material de gestión; horas y daño financiero no están cuantificados.','F03__01 F03__02'),
 ('Se infiere repetición en ciclos de rendición a partir del mecanismo de reapertura; no se interpreta 43% como cantidad de eventos.','F03__01 F27__01'),
 ('43% de N125 reporta volver a rendir cuentas aprobadas; 40% de la ola previa es un contraste, no otra muestra independiente que se suma.','F03__01 F04__01'),
 ('La corrección debe coordinarse con otorgante y mesa de ayuda en el ciclo de respuesta; no hay vencimiento inmediato acreditado.','F27__01')],
 'Una transacción aprobada dentro de una rendición aún observada no es necesariamente una reapertura. Los registros públicos revisados no permiten contar los episodios.'),
'P22':([3,4,4,3],'Ejecutoras usuarias de SISREC','Media',[
 ('La corrección, revisión, firma y reenvío movilizan al equipo y pueden impedir cerrar el trámite; no se acreditan pérdidas de servicios por sí mismas.','F27__01 F27__02'),
 ('Las rendiciones y correcciones se repiten por períodos de ejecución: carga recurrente inferida del flujo.','F27__01'),
 ('40% de la submuestra con convenios reportó dificultades en SISREC; no es 40% de todas las fundaciones ni de todos los usuarios del sistema.','F03__01'),
 ('Las firmas y subsanaciones exigen respuesta antes del siguiente hito de rendición; el banco no fija días comparables.','F27__01 F27__02')],
 'La FAQ confirma pasos y mecanismos, no incidencia ni horas. La automatización es una propuesta, no una mejora ya evaluada.'),
'P23':([5,2,2,5],'Cambio de ejecutor de un convenio con atención en curso','Baja',[
 ('Traspasar intervención y datos exige preservar continuidad y protección de usuarios. La severidad alta es riesgo del traspaso, no daño efectivo demostrado.','F03__01'),
 ('Es un hito ocasional al cambiar de operador; no se presume repetición anual en la misma organización.','F03__01'),
 ('10% de las encuestadas con convenios declara el traspaso; se limita a ese subgrupo expuesto.','F03__01'),
 ('La atención está en curso y la transición debe coordinarse en el cambio de operador; se infiere urgencia para evitar pérdida del vínculo.','F03__01')],
 'Un solo origen empírico y ausencia de datos sobre fallas, tiempos o personas afectadas. No confundir un traspaso efectuado con interrupción inevitable.'),
'P25':([3,4,4,3],'OSC que buscan recibir donaciones bajo distintos regímenes','Media',[
 ('La dispersión de requisitos consume gestión y puede impedir aprovechar aportes; no se mide la pérdida económica ni su efecto final en servicios.','F03__02 F09__01'),
 ('Las acreditaciones y condiciones vuelven a importar al cambiar régimen, oportunidad o donante; se infiere recurrencia entre ciclos de captación.','F07__01 F09__01'),
 ('57% de N255 percibe dificultad por multiplicidad normativa; es percepción agregada. El 28% de N200 mide restricciones concretas en otra pregunta.','F03__01 F03__02'),
 ('La elegibilidad debe resolverse antes de la oportunidad de aporte; no se documenta una fecha crítica común.','F09__01')],
 'El 82% que recibe donaciones en FECU no mide trabas. No se convierte el porcentaje de menciones de F22 en porcentaje de OSC.'),
'P26':([3,3,3,3],'Organizaciones receptoras de donaciones privadas','Media',[
 ('Los trámites de postulación y rendición ocupan recursos de gestión, pero no se acredita pérdida típica de financiamiento por este mecanismo.','F03__01 F04__01'),
 ('La carga se organiza por postulación/rendición a cada donante; se considera ciclo de financiamiento, no carga diaria universal.','F04__01 F18__02'),
 ('30% de las receptoras percibe burocracia excesiva; 84% considera condiciones compatibles y 78% rendición proporcional. El alcance se ancla en la dificultad actual, no en el mayor porcentaje de otra ola/pregunta.','F03__01'),
 ('Los requerimientos deben atenderse en la convocatoria o entrega acordada; no hay evidencia de urgencia inmediata.','F18__01 F18__02')],
 '63% y 54% de 2025 preguntan por mayor burocracia; 30% en 2026 por exceso. No son una tendencia homogénea. Se conserva la evidencia favorable sobre proporcionalidad.'),
'P28':([4,4,4,4],'Fundaciones/corporaciones empleadoras; contraste en programas especializados','Media',[
 ('La salida de equipos perjudica experiencia y continuidad del vínculo con familias. Se valora capacidad de servicio, sin asumir que toda rotación lo interrumpe.','F03__01 F26__01'),
 ('La incertidumbre de contratos y reconstrucción de equipos se mantiene entre ciclos; la recurrencia se infiere, no se observa una tasa de rotación.','F09__01 F26__02'),
 ('52% reporta estabilidad contractual problemática y 52% retención; no se suman ni se consideran eventos independientes.','F03__01'),
 ('Vacantes, remuneraciones y vínculos de atención afectan el ciclo actual; el horizonte de meses es juicio, sin tiempo promedio de reemplazo.','F26__01 F26__02')],
 '88% declara tener especialistas: no se afirma ausencia generalizada de profesionales. Interés en capacitación F28 no es evidencia adicional de rotación.'),
'P30':([3,3,3,2],'OSC que buscan participar en el ciclo de políticas públicas','Baja',[
 ('La discontinuidad de espacios reduce capacidad de aportar a decisiones públicas; no se atribuye un daño operativo directo o cierre de programas.','F09__01 F09__03'),
 ('La participación depende de convocatorias y ciclos de política; no es frecuencia de invitaciones medida por organización.','F09__03'),
 ('Sólo 28% percibe espacios efectivos y 31% prioriza una política de participación; son percepciones/prioridades, no 72% de exclusión probada. El diagnóstico describe un modelo de relación.','F04__02 F04__03 F09__01'),
 ('El banco sustenta una mejora institucional planificable; no identifica una ventana actual de política que cierre de inmediato.','F09__04')],
 'La colaboración con Gobierno o entre organizaciones no demuestra éxito de incidencia. La fuente histórica de derechos humanos aporta tipologías, no prevalencia chilena actual.'),
'P32':([3,3,3,3],'OSC que preparan memoria y balance; equipos de capacidad acotada','Baja',[
 ('Preparar el reporte compite con trabajo misional: costo material de capacidad. No se mide suspensión de atención ni sanción causada por falta de equipo.','F10__01'),
 ('Memoria y balance son entregas del ciclo anual; no se asume carga continua de la misma intensidad.','F18__01'),
 ('COS identifica equipos de capacidad acotada. La brecha se ubica en ese modelo de equipo; ni el 93% que elabora ni la publicación web miden incapacidad.','F10__01 F16__01'),
 ('La preparación debe resolverse antes de la entrega anual; no hay una fecha de atraso vigente común.','F18__01')],
 'Elaborar, publicar y tener capacidad suficiente son variables diferentes. Porcentajes de publicación y costos de cursos no se usan como tasa del problema.'),
'P38':([2,4,4,3],'Solicitantes que interactúan con varios registros y organismos públicos','Baja',[
 ('Volver a entregar certificados y antecedentes implica retrabajo administrativo; el banco no mide pérdida de financiamiento o daño al servicio por esta causa.','F07__03 F07__04'),
 ('La validación se repite en trámites ante distintos organismos; se infiere carga recurrente entre gestiones.','F07__02 F07__04'),
 ('El diseño documentado en entrevistas a responsables de ocho registros muestra el mecanismo en varios procesos, no una tasa de OSC afectadas.','F07__01 F07__04'),
 ('Los antecedentes son requisitos del siguiente trámite; sin plazo crítico acreditado, se valora urgencia del ciclo de entrega.','F07__03')],
 'Ocho registros no equivalen a ocho estudios ni a ocho fundaciones. La propuesta de reutilizar datos no demuestra una solución implementada.'),
'P40':([3,2,2,3],'Entidades con atrasos que solicitan acceso al envío de memoria/balance','Baja',[
 ('El rechazo de acceso impide completar el envío hasta regularizar: obstáculo material de cumplimiento, sin sanción o pérdida de servicio cuantificada.','F08__02'),
 ('Se activa ante una solicitud con antecedentes atrasados; es hito ocasional, no recurrencia anual demostrada.','F08__01 F08__02'),
 ('El mecanismo descrito afecta el subgrupo en atraso dentro de un flujo administrativo; no se conoce cuántas entidades lo experimentan.','F08__02'),
 ('La regularización debe anteceder al nuevo envío. Se valora próximo hito de cumplimiento, no un bloqueo actualmente confirmado.','F08__02')],
 'Es un flujo publicado en 2025. Su vigencia operativa y frecuencia actual no fueron comprobadas de nuevo, por instrucción de reutilizar el banco.'),
'P41':([2,3,3,3],'Entidades que envían memoria y balance mediante el flujo descrito','Baja',[
 ('Completar firmas, legibilidad o documentos faltantes es retrabajo administrativo; no hay evidencia de un daño mayor atribuido.','F08__01'),
 ('La exposición aparece en la preparación y revisión del ciclo de memoria/balance; no se presume que todas deban corregir.','F08__01'),
 ('La carga separada y revisión manual caracteriza ese modelo de envío. Es alcance del mecanismo, no tasa de envíos defectuosos.','F08__01 F08__02'),
 ('La corrección se gestiona antes de completar la entrega; no se acreditan días límite comparables.','F08__02')],
 'Un solo diagnóstico de flujo y sin tasa de errores. La falta de trazabilidad no acredita por sí misma incumplimientos de todas las solicitantes.'),
'P43':([4,3,3,4],'Ejecutoras de servicios permanentes bajo concursos anuales/bianuales','Baja',[
 ('Preparar una nueva postulación mientras se atiende sin certeza de continuidad tensiona equipo y servicio. El daño final no se deduce de licitaciones no adjudicadas.','F09__01'),
 ('La fuente identifica explícitamente concursos anuales o bianuales.','F09__01'),
 ('El mecanismo se extiende al modelo de servicios permanentes concursables; 24 de 74 son adjudicaciones de procesos, no fracción de entidades que sufren el problema.','F09__01 F09__02'),
 ('El servicio sigue en curso durante la postulación, con decisiones de personal y continuidad en el ciclo actual.','F09__01 F26__01')],
 'La referencia a ciclos DCE apoya incertidumbre laboral, pero no observa directamente cada repostulación del mismo ejecutor. Convenios plurianuales son una propuesta.'),
'P46':([3,4,3,2],'OSC con brechas de comunicaciones y captación de oportunidades','Baja',[
 ('La brecha de comunicación limita posicionamiento y acceso a oportunidades; no se miden donaciones o usuarios perdidos por ella.','F11__01'),
 ('Comunicar y conectar con públicos son funciones mantenidas de gestión; se infiere persistencia, no incidentes por organización.','F18__01 F18__02'),
 ('IFO y el diagnóstico de donación local describen la brecha en sus grupos; índices y menciones no son incidencia. Se juzga extensión a un modelo de organización con comunicación débil.','F11__01 F22__01'),
 ('La mejora es planificable por canales y públicos; no se identifica una oportunidad concreta próxima a vencer.','F18__02')],
 'F11/F12 son un mismo estudio. El 47,2% de ENVS describe ciudadanía que no sabe dónde participar, no OSC que perdieron oportunidades. Interés en redes no mide pérdida.'),
'P47':([3,4,3,3],'Directorios que deben seguir planes y acuerdos; caso chileno y guías','Baja',[
 ('No seguir planes aprobados deteriora control y decisiones; el caso no acredita pérdidas operativas o incumplimientos específicos.','F16__01 F17__01'),
 ('Actualizar indicadores y acuerdos se requiere entre reuniones: se infiere función recurrente, no fallas repetidas observadas.','F16__01 F20__02'),
 ('El mecanismo de seguimiento pertenece al modelo de gobierno con directorio y planes. La extensión es estructural inferida: el banco sólo ejemplifica el desafío en un caso.','F16__01 F18__01'),
 ('La información debe estar disponible para la próxima revisión/reunión; no hay una decisión crítica inminente identificada.','F16__01 F18__02')],
 '7,2 miembros y 5,7 reuniones regionales caracterizan directorios; no miden acuerdos incumplidos. Las guías no son encuestas de fallas.'),
'P48':([4,5,2,5],'Proyectos AFT con sobrecupos sin recursos adicionales','Baja',[
 ('Más casos con igual equipo deteriora seguimiento y genera desgaste: capacidad de atención, sin afirmar interrupción efectiva.','F26__01 F26__02'),
 ('Mientras dura el sobrecupo, la carga se añade al trabajo cotidiano; es persistencia del mecanismo relatado.','F26__01 F26__02'),
 ('Se limita a proyectos con esa condición dentro de AFT. El taller no permite extenderla a todas las modalidades ni calcular una tasa.','F26__01'),
 ('Los casos ya están siendo atendidos y el refuerzo puede llegar demasiado tarde; la carga incide en la atención actual.','F26__02')],
 'Un solo estudio sectorial, sin N ni tasa de sobrecupos. Una criticidad alta dentro del mecanismo no indica tamaño nacional del problema.'),
'P49':([4,2,3,5],'Colaboradores que deben instalar un programa antes del primer aporte','Baja',[
 ('Habilitar inmuebles, contratar y capacitar sin aporte de arranque compromete capacidad de iniciar y cubrir gastos. No se acredita cuánto quedó sin pagar.','F26__01 F26__02'),
 ('Es un hito de instalación de proyecto, no un gasto diario de prefínanciamiento repetido en cada mes.','F26__01'),
 ('El mecanismo corresponde al modelo de puesta en marcha descrito en Protección Especializada; se juzga alcance del modelo, no prevalencia nacional.','F26__01 F26__02'),
 ('Se exige funcionamiento completo desde el inicio y los gastos preceden a los primeros abonos: hito operativo inmediato.','F26__02')],
 'CLP5 millones es un testimonio, no promedio. F27 muestra un giro posterior al inicio, pero no prueba que la entidad haya prefinanciado instalación.'),
'P50':([3,2,3,3],'Ejecutoras que cierran convenios y deben resolver saldos','Baja',[
 ('Saldos sin resolver limitan disposición y gestión de recursos; el testimonio de traspaso de saldo no cuantifica pérdida del servicio.','F26__02'),
 ('El cierre es un hito ocasional por proyecto; la espera puede ser larga sin que eso implique muchos episodios.','F26__01'),
 ('El mecanismo corresponde al modelo de cierre de convenio. Hay casos con cierre pendiente y otro cerrado: no se estima proporción.','F26__01 F27__01 F27__02'),
 ('Corresponde gestionar el próximo hito de cierre; meses o años de espera pasada no determinan urgencia futura ni riesgo inmediato.','F26__01')],
 'En Cierre 39 días después de fecha máxima para rendir no demuestra atraso legal del cierre. El caso cerrado con reintegro distingue procedimientos y no se omite.'),
'P51':([3,5,2,3],'Colaboradores con varios proyectos en una cuenta institucional','Baja',[
 ('La confusión de gastos produce lentitud, errores y observaciones de rendición: deterioro material de control, no sanción probada.','F26__01 F26__02'),
 ('Cada transacción y rendición de proyectos compartidos exige asignación y trazabilidad: carga persistente mientras se usa esa estructura.','F26__01'),
 ('Aplica al subgrupo con múltiples proyectos en una cuenta dentro del sistema descrito. No se conoce su tamaño ni se extiende a toda fundación.','F26__01'),
 ('Los errores deben resolverse antes de las próximas rendiciones/fiscalizaciones; no hay fecha crítica o daño inmediato acreditado.','F26__02')],
 'Se han permitido varias cuentas en algunos casos. La cuenta única no es una condición universal e invariable de todos los convenios.'),
'P52':([5,4,2,5],'Programas FAE que captan y mantienen familias acogedoras','Baja',[
 ('La desvinculación de familias afecta continuidad del vínculo protector; se valora consecuencia esencial, sin inventar número de niños afectados.','F26__02'),
 ('Captar, apoyar y conservar familias es función sostenida del modelo FAE. No se conoce tasa ni repetición individual de deserción.','F26__01'),
 ('Es un subgrupo/modalidad especializada: familias acogedoras no equivalen a fundaciones ni representan al conjunto del tercer sector.','F26__01'),
 ('La continuidad del cuidado protector puede verse afectada con una desvinculación; se infiere urgencia de la atención en curso.','F26__02')],
 'Un estudio sectorial cualitativo. El puntaje alto refleja el vínculo protector, no cantidad nacional afectada. Validar antes de elegirlo como oportunidad para todo el sector.'),
'P53':([3,5,2,4],'Programas en territorios rurales, extremos o aislados','Baja',[
 ('El traslado consume tiempo y costos, limitando capacidad de visitas; no se observa interrupción de protección atribuible a cada visita.','F26__01 F26__02'),
 ('La dispersión geográfica persiste en el territorio y afecta cada desplazamiento necesario; no se inventa frecuencia de visitas.','F26__02'),
 ('El mecanismo se restringe a territorios y programas con dispersión. No hay participación geográfica para extrapolarlo.','F26__02'),
 ('El equipo debe cubrir visitas del servicio en curso; se valora presión en el ciclo actual, sin fijar un plazo por hogar.','F26__01')],
 'Una visita de un día es un caso AFT, no el promedio de costo/tiempo del programa. La falta de señal se conserva como condición de ese contexto.'),
'P54':([3,4,3,3],'OSC que buscan donaciones locales con equipo/tiempo insuficiente','Baja',[
 ('Falta de equipo, tiempo y capacidades restringe captación: costo material de capacidad. No se miden aportes perdidos ni interrupciones causadas.','F22__01 F22__02'),
 ('Buscar donantes requiere trabajo continuado mientras se mantenga esa carencia; persistencia inferida, no horas ni episodios medidos.','F22__01'),
 ('51 OSC aportan 82 menciones de barreras internas. Se juzga alcance del modelo de captación con equipo acotado; 43,9% y 29,3% son menciones y no prevalencia de OSC.','F22__01'),
 ('Captar aportes requiere preparar el siguiente ciclo de oportunidades; no hay plazo actual de caja acreditado.','F22__01')],
 'Un único origen empírico sobre donación local. No sumar menciones ni extrapolar a las 209 respuestas del estudio.'),
}

def score(levels,w):
 return math.floor(1+99*(sum(w[k]*v for k,v in zip(weights,levels))/100-1)/4+0.5)
def ranks(scores):
 return {p:1+sum(v>s for v in scores.values()) for p,s in scores.items()}

assert set(D)==set(titles)
rows=[]
for p,(levels,scope,confidence,justifications,limit) in D.items():
 cs=[]
 for key,level,(reason,ids) in zip(weights,levels,justifications):
  refs=[p+'__'+s for s in ids.split()]
  assert all(x in findings for x in refs),(p,refs)
  # All levels are ordinal judgments. A small set use a directly observed item as their anchor.
  direct=(key=='A' and p in {'P02','P14','P15','P16','P17','P18','P20','P21','P22','P23','P26','P28'}) or (key=='F' and p=='P43')
  cs.append(dict(key=key,level=level,basis='Anclaje observado; nivel asignado' if direct else 'Inferencia documental justificada',inferred=not direct,reason=reason,refs=refs))
 claims=[x for x in bank['findings'] if x['P']==p]
 used=sorted({ref for c in cs for ref in c['refs']})
 roots=sorted({findings[x]['root_credited'] for x in used})
 rows.append(dict(id=p,title=titles[p],scope=scope,score=score(levels,weights),confidence=confidence,components=cs,limit=limit,
   scoredClaimIds=used,allClaimIds=[x['id'] for x in claims],publicationIds=sorted({x['F'] for x in claims}),
   attributedOrigins=roots,originNote='Orígenes atribuidos; independencia estadística no certificada. El número no aumenta el puntaje.'))
base_scores={r['id']:r['score'] for r in rows};base_ranks=ranks(base_scores)
scenarios=[dict(id='base',label='Pesos base',weights=weights),dict(id='iguales',label='Pesos iguales',weights=dict.fromkeys(weights,25))]
for key in weights:
 for delta in [-5,5]:
  w={k:(v+delta if k==key else v*(100-weights[key]-delta)/(100-weights[key])) for k,v in weights.items()}
  scenarios.append(dict(id=f'{key}{delta:+}',label=f'{key} {delta:+} pp',weights=w))
for sc in scenarios:
 sc['scores']={r['id']:score([c['level'] for c in r['components']],sc['weights']) for r in rows}
 sc['ranks']=ranks(sc['scores'])
for r in rows:
 r['rank']=base_ranks[r['id']]
 r['weightScoreRange']=[min(s['scores'][r['id']] for s in scenarios),max(s['scores'][r['id']] for s in scenarios)]
 r['weightRankRange']=[min(s['ranks'][r['id']] for s in scenarios),max(s['ranks'][r['id']] for s in scenarios)]
 variations=[]
 for idx,c in enumerate(r['components']):
  if not c['inferred']:continue
  for d in [-1,1]:
   if not 1<=c['level']+d<=5:continue
   ls=[x['level'] for x in r['components']];ls[idx]+=d
   result=score(ls,weights);scores=base_scores|{r['id']:result}
   variations.append(dict(key=c['key'],delta=d,score=result,rank=ranks(scores)[r['id']]))
 r['judgmentScenarios']=variations
 r['judgmentScoreRange']=[min([r['score']]+[v['score'] for v in variations]),max([r['score']]+[v['score'] for v in variations])]
 r['judgmentRankRange']=[min([r['rank']]+[v['rank'] for v in variations]),max([r['rank']]+[v['rank'] for v in variations])]
 # A deletion review changes evidential support, not measured severity; no ND=0 or invented replacement.
 r['originRemoval']=[dict(origin=o,componentsLosingAllCitedSupport=[c['key'] for c in r['components'] if all(findings[x]['root_credited']==o for x in c['refs'])]) for o in r['attributedOrigins']]
rows.sort(key=lambda r:(-r['score'],r['id']))
out=dict(method=method,bank=dict(path='analisis/mf1-banco-26-fuentes-v1.json',sha256=hashlib.sha256(BANK.read_bytes()).hexdigest(),publications=26,problems=31,links=147,claims=245),rows=rows,weightScenarios=scenarios)
(APP/'analisis/criticidad-31-v03.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
evidence_path=APP/'preview/h0/h2-evidence.json'
evidence=json.loads(evidence_path.read_text());evidence['ranking31']=out
evidence_path.write_text(json.dumps(evidence,ensure_ascii=False,indent=2)+'\n')
with (APP/'analisis/criticidad-31-v03.csv').open('w') as f:
 writer=csv.writer(f);writer.writerow(['puesto','problema','titulo','criticidad','I','F','A','U','confianza','poblacion','rango_puntos_pesos','rango_puestos_pesos','rango_puntos_juicio','rango_puestos_juicio','hallazgos_utilizados'])
 for r in rows:writer.writerow([r['rank'],r['id'],r['title'],r['score'],*[c['level'] for c in r['components']],r['confidence'],r['scope'],str(r['weightScoreRange']),str(r['weightRankRange']),str(r['judgmentScoreRange']),str(r['judgmentRankRange']),';'.join(r['scoredClaimIds'])])
md=['# Criticidad documental v0.3 · 31/31','Fecha: 23 de noviembre de 2026. Sin nueva búsqueda; banco congelado.','',method['decision'],'']
for key in ['scope','formula','meaning','missing','confidence','sources','overlap','sensitivity','exclusions']:
 md+=['## '+key,method[key],'']
for c in method['criteria']:md+=['## '+c['name']+' · '+str(c['weight'])+'%',c['definition'],*c['anchors'],'']
md+=['## Ranking completo','| Puesto | Problema | Puntos | I/F/A/U | Confianza |','|---|---|---:|---|---|']
for r in rows:md+=[f"| {r['rank']} | {r['id']} · {r['title']} | {r['score']} | {'/'.join(str(c['level']) for c in r['components'])} | {r['confidence']} |"]
md+=['','Los empates comparten puesto; el ID sólo ordena su presentación. Los rangos siguientes no son intervalos de confianza.','']
for r in rows:
 md+=['## '+r['id']+' · '+str(r['score'])+'/100',r['scope']+' · Confianza '+r['confidence']]
 for c in r['components']:
  md+=[f"- **{c['key']}={c['level']}/5 · {c['basis']}**. {c['reason']}"]
  for ref in c['refs']:
   x=findings[ref];loc=x['locators'][0]
   md+=[f"  - {ref}: {x['claim_text']} [{loc['label']}]({loc['url']}) · origen: {x['root_credited']}."]
 md+=['',r['limit'],f"Sensibilidad a pesos: puntos {r['weightScoreRange']}, puestos {r['weightRankRange']}. Cambio de un nivel inferido a la vez: puntos {r['judgmentScoreRange']}, puestos {r['judgmentRankRange']}.",'']
md+=['## Reproducibilidad',f"Banco SHA-256: {out['bank']['sha256']}. Los 245 hallazgos de las 26 publicaciones permanecen accesibles por problema y en Métodos y fuentes. Sólo los hallazgos citados sustentan cada juicio; los demás se conservan como contexto/contraevidencia, sin bono de puntuación."]
(APP/'analisis/CRITICIDAD_31_v0.3.md').write_text('\n'.join(md)+'\n')
print('\n'.join(f"{r['rank']:2} {r['id']} {r['score']:2} {[c['level'] for c in r['components']]} {r['confidence']}" for r in rows))
