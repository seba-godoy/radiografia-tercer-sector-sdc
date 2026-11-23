export const weightKeys = ['I','F','A','U'];
const sessions = new WeakMap();

export function validateWeights(draft) {
 const weights = {};
 const invalid = weightKeys.filter(key => {
  const raw = draft?.[key];
  if (!['number','string'].includes(typeof raw) || String(raw).trim()==='') return true;
  const value = Number(raw);
  if (!Number.isFinite(value) || value<0 || value>100) return true;
  weights[key] = value;
  return false;
 });
 const total = invalid.length ? null : weightKeys.reduce((sum,key)=>sum+weights[key],0);
 return {valid:!invalid.length && Math.abs(total-100)<1e-8,weights,total,invalid};
}

export function rankingWithWeights(rows,draft) {
 const result = validateWeights(draft);
 if (!result.valid) throw new RangeError('Los cuatro pesos deben estar entre 0 y 100 y sumar 100%.');
 const next = rows.map(row => {
  let mean = 0;
  for (const key of weightKeys) {
   const level = row.components.find(c=>c.key===key)?.level;
   if (!Number.isInteger(level) || level<1 || level>5) throw new RangeError('Nivel de criterio inválido.');
   mean += level*result.weights[key]/100;
  }
  return {...row,score:Math.round((1+99*(mean-1)/4)+1e-10)};
 }).sort((a,b)=>b.score-a.score || a.id.localeCompare(b.id));
 for (const row of next) row.rank = 1+next.filter(other=>other.score>row.score).length;
 return next;
}

export function scenarioExport(data,weights) {
 return {
  methodVersion:data.method.version,
  scenario:{kind:'Exploración personal de pesos',weights:{...validateWeights(weights).weights},
   formula:'C = redondear(1 + 99 × (suma de nivel × peso / 100 − 1) / 4).'},
  baselineMethod:data.method,bank:data.bank,
  rows:rankingWithWeights(data.rows,weights).map(row=>{
   const {weightScoreRange,weightRankRange,judgmentScoreRange,judgmentRankRange,judgmentScenarios,...current}=row;
   const original=data.rows.find(base=>base.id===row.id);
   return {...current,baseScore:original.score,baseRank:original.rank,
    baselineSensitivity:{weightScoreRange,weightRankRange,judgmentScoreRange,judgmentRankRange,judgmentScenarios}};
  })
 };
}

function download(text,type,name) {
 const url = URL.createObjectURL(new Blob([text],{type}));
 const anchor = document.createElement('a');
 anchor.href=url;anchor.download=name;document.body.append(anchor);anchor.click();anchor.remove();
 setTimeout(()=>URL.revokeObjectURL(url),500);
}

export function mountRankingWeights(root,data) {
 const form=root.querySelector('[data-rank31-weights]');
 if (!form || !data?.rows) return;
 let session=sessions.get(data);
 if (!session) {
  session={draft:{...data.method.weights},applied:{...data.method.weights}};
  sessions.set(data,session);
 }
 const inputs=Object.fromEntries(weightKeys.map(key=>[key,form.querySelector(`[data-rank31-weight="${key}"]`)]));
 const fmt=n=>new Intl.NumberFormat('es-CL',{maximumFractionDigits:8}).format(n);
 const weightLabel=w=>weightKeys.map(k=>`${k} ${fmt(w[k])}%`).join(' · ');
 const baseRows=new Map(data.rows.map(r=>[r.id,r]));
 const status=form.querySelector('[data-rank31-weight-status]');
 const applied=root.querySelector('[data-rank31-applied]');
 const body=root.querySelector('.rank31-table tbody');
 const cards=root.querySelector('[data-rank31-details]');
 const rowNodes=new Map([...body.querySelectorAll('[data-rank31-row]')].map(n=>[n.dataset.rank31Row,n]));
 const cardNodes=new Map([...cards.querySelectorAll('[data-rank31-detail]')].map(n=>[n.dataset.rank31Detail,n]));
 const base=()=>weightKeys.every(key=>session.applied[key]===data.method.weights[key]);
 const paint=()=>{
  const rows=rankingWithWeights(data.rows,session.applied);
  for (const row of rows) {
   const node=rowNodes.get(row.id),card=cardNodes.get(row.id);
   node.querySelector('[data-rank31-rank]').textContent=row.rank;
   node.querySelector('[data-rank31-score]').textContent=`${row.score}/100`;
   card.querySelector('[data-rank31-detail-score]').textContent=`${row.id} · ${row.score}/100`;
   for (const c of row.components) card.querySelector(`[data-rank31-criterion-title="${c.key}"]`).textContent=
    `${data.method.criteria.find(x=>x.key===c.key).name} · ${c.level}/5 · ${fmt(session.applied[c.key])}%`;
  }
  body.append(...rows.map(r=>rowNodes.get(r.id)));
  cards.append(...rows.map(r=>cardNodes.get(r.id)));
  applied.textContent=`${base()?'Pesos originales':'Escenario personalizado'}: ${weightLabel(session.applied)}. Los 31 puntajes y puestos corresponden a estos pesos.`;
 };
 const validate=()=>{
  session.draft=Object.fromEntries(weightKeys.map(k=>[k,inputs[k].value]));
  const result=validateWeights(session.draft);
  for (const key of weightKeys) inputs[key].setAttribute('aria-invalid',String(result.invalid.includes(key)));
  form.dataset.valid=String(result.valid);
  for (const button of form.querySelectorAll('[data-rank31-export]')) button.disabled=!result.valid;
  if (result.valid) {
   session.applied={...result.weights};paint();
   status.textContent='Total: 100% · Ranking actualizado.';
  } else {
   status.textContent=(result.total===null?'Completa los cuatro porcentajes con valores entre 0 y 100.':
    `Total: ${fmt(result.total)}%. Los pesos deben sumar 100%.`)+
    ` Cambios sin aplicar; el ranking conserva ${weightLabel(session.applied)}.`;
  }
 };
 for (const key of weightKeys) inputs[key].value=session.draft[key];
 // Restore the last valid scenario before validating an unfinished draft after navigation.
 paint();validate();
 form.addEventListener('input',event=>{if(event.target.matches('[data-rank31-weight]')) validate();});
 form.addEventListener('submit',event=>event.preventDefault());
 form.querySelector('[data-rank31-reset]').addEventListener('click',()=>{
  for (const key of weightKeys) inputs[key].value=data.method.weights[key];
  validate();
 });
 form.addEventListener('click',event=>{
  const button=event.target.closest('[data-rank31-export]');
  if (!button || button.disabled || !validateWeights(session.draft).valid) return;
  const out=scenarioExport(data,session.applied);
  if (button.dataset.rank31Export==='json') {
   download(JSON.stringify(out,null,2)+'\n','application/json','criticidad_31_escenario.json');
  } else {
   const encode=value=>'"'+String(value).replaceAll('"','""')+'"';
   const header=['puesto','problema','titulo','criticidad','puesto_original','criticidad_original','I_peso','F_peso','A_peso','U_peso','confianza'];
   const lines=out.rows.map(r=>[r.rank,r.id,r.title,r.score,baseRows.get(r.id).rank,baseRows.get(r.id).score,...weightKeys.map(k=>session.applied[k]),r.confidence]);
   download('\uFEFF'+[header,...lines].map(row=>row.map(encode).join(',')).join('\r\n')+'\r\n','text/csv;charset=utf-8','criticidad_31_escenario.csv');
  }
 });
}
