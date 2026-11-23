"""Reproducible documentary judgments and sensitivity, using the frozen problem bank."""
import csv, hashlib, json, math
from pathlib import Path
P=Path(__file__).resolve().parent.parent
def read(f):return json.loads((P/f).read_text())
inputs=read('analisis/ab-1-intervenciones.json');method=read('analisis/ab-2-metodo.json')
bank=read('analisis/mf1-banco-26-fuentes-v1.json');critical=read('analisis/criticidad-31-v03.json')
claims={x['id']:x for x in bank['findings']};problems={x['id']:x for x in critical['rows']}
keys=['C','K','D','E','A'];weights=method['weights']
# Each five-level vector is an analyst judgment; none is extracted as a measured score.
vectors={
 'P02':[2,3,2,3,2], 'P11':[3,3,2,3,2], 'P13':[3,4,3,3,3], 'P14':[2,4,2,3,3],
 'P15':[1,4,4,4,4], 'P16':[1,4,2,3,3], 'P17':[2,4,2,3,3], 'P18':[1,2,2,3,2],
 'P19':[2,3,3,3,3], 'P20':[1,3,2,3,3], 'P21':[2,3,2,3,3], 'P22':[4,3,2,3,3],
 'P23':[2,2,1,2,2], 'P25':[3,4,4,3,3], 'P26':[2,4,3,3,3], 'P28':[3,4,2,3,2],
 'P30':[1,3,4,4,3], 'P32':[4,4,3,3,3], 'P38':[2,4,4,4,3], 'P40':[2,2,2,3,3],
 'P41':[4,3,4,4,4], 'P43':[2,4,3,3,3], 'P46':[4,4,4,4,3], 'P47':[5,4,3,4,3],
 'P48':[1,2,2,2,2], 'P49':[2,4,2,3,3], 'P50':[1,3,2,3,3], 'P51':[4,3,2,3,2],
 'P52':[2,2,2,2,2], 'P53':[2,2,2,3,2], 'P54':[3,4,3,4,3]
}
control={
 'P02':'La decisión de renovar es externa. Un plan de continuidad sólo mitiga parte de sus efectos.',
 'P11':'Un sistema mínimo reduce la carencia metodológica; no financia equipo, registros ni una evaluación causal.',
 'P13':'La cartera mejora gestión y diversificación, pero aportantes y condiciones de ingresos permanecen fuera.',
 'P14':'Planificar reservas y ajustes mitiga exposición; no crea caja ni capacidad de resistir el shock publicado.',
 'P15':'La convocatoria ausente sigue siendo decisión externa, aunque preparar alternativas sea sencillo.',
 'P16':'Ni la agenda de cobros ni el flujo de caja controlan el desembolso estatal.',
 'P17':'Reconocer la brecha mejora decisiones de cobertura, pero las reglas de admisibilidad siguen fuera.',
 'P18':'El expediente sólo permite seguir el trámite; la toma de razón corresponde a la autoridad.',
 'P19':'Preparar requisitos mitiga errores y costos de gestión, pero no genera respaldo financiero o garantías.',
 'P20':'Registrar y documentar seguimientos no obliga al otorgante a responder o aprobar la rendición.',
 'P21':'Conservar versiones reduce reconstrucción de antecedentes; la orden de reapertura permanece externa.',
 'P22':'Roles y revisión previa modifican una causa interna de dificultades de rendir, sin alterar el sistema o al otorgante.',
 'P23':'El protocolo ayuda a mitigar el cambio de operador; no evita la no renovación ni controla la nueva atención.',
 'P25':'Interpretar y ordenar requisitos reduce una causa de dificultad de gestión; no reforma ni unifica normas.',
 'P26':'El expediente común mitiga retrabajo; los donantes siguen definiendo sus solicitudes y evaluaciones.',
 'P28':'La inducción modifica pérdida de conocimiento, una causa interna relevante; salarios y estabilidad financiera quedan fuera.',
 'P30':'Registrar convocatorias y propuestas no crea espacios abiertos ni asegura incidencia.',
 'P32':'La consolidación aborda una causa principal de carga del reporte; no crea registros, equipo ni certificación financiera.',
 'P38':'La carpeta reduce preparación repetida, pero las solicitudes y verificaciones entre organismos siguen existiendo.',
 'P40':'Ordenar la regularización ayuda a responder pendientes; el acceso se decide fuera y el flujo puede haber cambiado.',
 'P41':'La revisión previa reduce causas internas de correcciones: documentos, integridad y trazabilidad.',
 'P43':'Coordinar calendario mitiga la carga simultánea; no elimina concursos ni garantiza adjudicación.',
 'P46':'Definir públicos, mensajes y canales actúa sobre la gestión interna de comunicación; la respuesta del público no está controlada.',
 'P47':'Registro, responsables y revisión de acuerdos son el núcleo interno de la intervención; compromiso y resultados estratégicos no están demostrados.',
 'P48':'Medir y justificar carga no aumenta plazas financiadas, dotación o fondos para contratar.',
 'P49':'Presupuestar reduce sorpresas y permite decidir antes de instalar; no aporta el capital de arranque.',
 'P50':'Seguir el cierre no autoriza liberar un saldo ni sustituye la resolución del otorgante.',
 'P51':'La clasificación y conciliación actúan sobre la trazabilidad interna, bajo revisión contable.',
 'P52':'La organización del proceso ayuda parcialmente; apoyos, idoneidad, cuidado y permanencia exigen capacidades sectoriales y otros recursos.',
 'P53':'Agrupar visitas mitiga planificación; no cambia dispersión, conectividad o presupuesto de traslado.',
 'P54':'La cartera y materiales reducen preparación repetida, pero la disponibilidad de equipo y la respuesta de donantes siguen condicionando.'
}
def calc(v,w=weights):
 mean=sum(v[k]*w[k] for k in weights)/100
 return math.floor(1+99*(v['C']/5)*(mean-1)/4+0.5)
def ranks(scores):return {p:1+sum(v>x for v in scores.values()) for p,x in scores.items()}
rows=[]
public_design={'P15','P25','P30','P38','P41','P46'}
medium={'P13','P22','P25','P26','P28','P32','P38','P41','P46','P47','P54'}
for item in inputs['rows']:
 r=dict(item);p=r['id'];v=dict(zip(keys,vectors[p]));pr=problems[p]
 r.update(title=pr['title'],scope=pr['scope'],levels=v,score=calc(v),criticality=pr['score'],criticalityRank=pr['rank'],confidence='Media' if p in medium else 'Baja')
 r['operationalStatus']='Diseño con documentos públicos' if p in public_design else 'Datos o actores por confirmar'
 r['dependencyClass']='Seguimiento externo' if v['C']==1 else 'Mitigación limitada' if v['C']==2 else 'Intervención parcial' if v['C']==3 else 'Proceso interno'
 refs=[p+'__'+s for s in r.pop('refs')];assert all(s in claims for s in refs)
 reasons={
  'C':control[p],
  'K':f"{method['criteria'][1]['anchors'][v['K']-1]}. Para «{r['intervention']}» se infiere encaje desde las áreas publicadas de gestión/consultoría; la especialidad que exceda esa oferta deberá complementarse. No hay equipo asignado acreditado.",
  'D':f"{method['criteria'][2]['anchors'][v['D']-1]}. Insumos requeridos: {r['inputs']} Condición: {r['condition']} La disponibilidad del registro concreto no se deduce de la encuesta del problema.",
  'E':f"{method['criteria'][3]['anchors'][v['E']-1]}. El escenario usa «{r['conventional']}»; incluye preparación, revisión y mantenimiento. Es esfuerzo relativo inferido, sin costes ni horas observadas.",
  'A':f"{method['criteria'][4]['anchors'][v['A']-1]}. Para sostener «{r['result']}» se supone un responsable de la organización y revisión de SdC. No se ha probado adopción ni disponibilidad real de tiempo."
 }
 r['components']=[dict(key=k,level=v[k],basis='Encaje publicado + inferencia de aplicación' if k=='K' else 'Juicio documental y escenario explícito',reason=reasons[k],refs=['SDC-CONS','SDC-OS'] if k=='K' else refs) for k in keys]
 r['scoredClaimIds']=refs;r['allClaimIds']=[x['id'] for x in bank['findings'] if x['P']==p]
 r['origins']=sorted({claims[x]['root_credited'] for x in refs})
 r['assumptions']=['Un responsable y revisión humana forman parte del escenario; no están asignados.',r['condition'],'Datos sintéticos o publicados permiten diseño, no acreditan el flujo operativo de una organización.']
 r['reviewTrigger']='Recalcular si cambian acceso a datos, actor especializado, alcance de la intervención, carga recurrente o capacidad de modificar la causa.'
 rows.append(r)
assert set(vectors)==set(problems)=={r['id'] for r in rows}
base={r['id']:r['score'] for r in rows};rank=ranks(base)
for r in rows:r['rank']=rank[r['id']]
scenarios=[dict(id='base',weights=weights),dict(id='iguales',weights=dict.fromkeys(weights,25))]
for k in weights:
 for d in [-5,5]:scenarios.append(dict(id=f'{k}{d:+}',weights={j:(w+d if j==k else w*(100-weights[k]-d)/(100-weights[k])) for j,w in weights.items()}))
for s in scenarios:
 s['scores']={r['id']:calc(r['levels'],s['weights']) for r in rows};s['ranks']=ranks(s['scores'])
stress=[]
for name,changes in [('datos-adopcion-conservadores',{'D':-1,'A':-1}),('control-menos-un-nivel',{'C':-1}),('encaje-institucional-conservador',{'K':-1})]:
 scores={r['id']:calc({k:max(1,n+changes.get(k,0)) for k,n in r['levels'].items()}) for r in rows}
 stress.append(dict(id=name,changes=changes,scores=scores,ranks=ranks(scores)))
for r in rows:
 r['weightScoreRange']=[min(s['scores'][r['id']] for s in scenarios),max(s['scores'][r['id']] for s in scenarios)]
 r['weightRankRange']=[min(s['ranks'][r['id']] for s in scenarios),max(s['ranks'][r['id']] for s in scenarios)]
 js=[]
 for k in keys:
  for d in [-1,1]:
   if 1<=r['levels'][k]+d<=5:
    score=calc(r['levels']|{k:r['levels'][k]+d});rr=ranks(base|{r['id']:score})[r['id']]
    js.append(dict(key=k,delta=d,score=score,rank=rr))
 r['judgmentScenarios']=js;r['judgmentScoreRange']=[min([r['score']]+[s['score'] for s in js]),max([r['score']]+[s['score'] for s in js])]
 r['judgmentRankRange']=[min([r['rank']]+[s['rank'] for s in js]),max([r['rank']]+[s['rank'] for s in js])]
 r['conservativeScore']=stress[0]['scores'][r['id']]
 prep=sum(weights[k]*r['levels'][k] for k in weights)/100
 r['additiveComparator']=math.floor(1+99*((.3*r['levels']['C']+.7*prep)-1)/4+.5)
 r['publicationLimit']='Fuentes apoyan mecanismo o diseño, no eficacia del producto ni adopción. Orígenes atribuidos, sin certificar independencia estadística.'
rows.sort(key=lambda r:(-r['score'],r['id']))
hashes={f:hashlib.sha256((P/f).read_bytes()).hexdigest() for f in ['analisis/mf1-banco-26-fuentes-v1.json','analisis/criticidad-31-v03.json']}
out=dict(version='1.0',date='2026-11-23',method=method,rows=rows,weightScenarios=scenarios,stressScenarios=stress,inputHashes=hashes,counts=dict(problems=31,judgments=155,publications=26,claims=245),calibration=read('analisis/ab-3-calibracion.json'))
(P/'analisis/abordabilidad-31-v1.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
with (P/'analisis/abordabilidad-31-v1.csv').open('w',encoding='utf-8-sig',newline='') as f:
 wr=csv.writer(f);wr.writerow(['puesto','problema','titulo','intervencion','resultado_controlable','fuera_de_alcance','ASdC','C','K','D','E','A','criticidad_original','confianza','condicion','familia_compartida'])
 for r in rows:wr.writerow([r['rank'],r['id'],r['title'],r['intervention'],r['result'],r['outside'],r['score'],*[r['levels'][k] for k in keys],r['criticality'],r['confidence'],r['condition'],r['family']])
md=['# Abordabilidad SdC · 31 problemas · v1.0','',method['question'],method['formula'],method['meaning'],method['scenario'],'','## Ranking documental','| Puesto | Problema | ASdC | C/K/D/E/A | Criticidad | Confianza |','|---|---|---:|---|---:|---|']
for r in rows:md.append(f"|{r['rank']}|{r['id']} · {r['title']}|{r['score']}|{'/'.join(str(r['levels'][k]) for k in keys)}|{r['criticality']}|{r['confidence']}|")
for r in rows:
 md+=['','## '+r['id']+' · '+r['intervention'],f"ASdC {r['score']}/100; C={r['levels']['C']}; confianza {r['confidence']}. {r['scope']}",f"**Mecanismo:** {r['mechanism']}",f"**Resultado controlable:** {r['result']}",f"**Fuera de alcance:** {r['outside']}",f"**Alternativa convencional:** {r['conventional']}",f"**Condición:** {r['condition']}"]
 for c in r['components']:
  md += [f"- **{c['key']}={c['level']}/5.** {c['reason']}"]
  for ref in c['refs']:
   if ref.startswith('SDC-'):
    s=next(s for s in method['institutionalSources'] if s['id']==ref);md += [f"  - [{s['title']}]({s['url']}) · {s['limit']}"]
   else:
    x=claims[ref];l=x['locators'][0];md += [f"  - {ref}: {x['claim_text']} [{l['label']}]({l['url']}) · origen {x['root_credited']}."]
 md += [f"Sensibilidad a pesos: puntos {r['weightScoreRange']}, puestos {r['weightRankRange']}. Un nivel a la vez: puntos {r['judgmentScoreRange']}, puestos {r['judgmentRankRange']}. Datos/adopción conservadores: {r['conservativeScore']}. Rangos de escenarios, no intervalos estadísticos."]
(P/'analisis/ABORDABILIDAD_31_v1.md').write_text('\n'.join(md)+'\n')
print('\n'.join(f"{r['rank']:2} {r['id']} ASdC={r['score']:2} C={r['levels']['C']} crit={r['criticality']} {r['confidence']}" for r in rows))
