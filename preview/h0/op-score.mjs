export const opKeys=['M','A','F','D'];
export function validateOpWeights(raw){
 const weights={},invalid=[];
 for(const k of opKeys){const v=raw?.[k];weights[k]=v===''||v===null||v===undefined?NaN:Number(v);if(!Number.isFinite(weights[k])||weights[k]<0||weights[k]>100)invalid.push(k);}
 const total=invalid.length?null:opKeys.reduce((s,k)=>s+weights[k],0);
 return {weights,invalid,total,valid:!invalid.length&&Math.abs(total-100)<1e-8};
}
export function opScore(levels,raw){
 const {valid,weights}=validateOpWeights(raw);
 if(!valid)throw new RangeError('Los pesos M/A/F/D deben sumar 100%.');
 if(!opKeys.every(k=>Number.isInteger(levels?.[k])&&levels[k]>=1&&levels[k]<=5))throw new RangeError('Niveles IPH incompletos o fuera de 1–5.');
 return Math.round(1+99*(opKeys.reduce((s,k)=>s+levels[k]*weights[k]/100,0)-1)/4+1e-10);
}
export function opRanking(rows,weights,scenario='central'){
 if(!['conservador','central','favorable'].includes(scenario))throw new RangeError('Escenario IPH no reconocido.');
 const delta={conservador:-1,central:0,favorable:1}[scenario];
 const result=rows.map(r=>{const scenarioLevels={...r.levels};for(const k of ['M','A'])scenarioLevels[k]=Math.max(1,Math.min(5,scenarioLevels[k]+delta));return {...r,scenarioLevels,score:opScore(scenarioLevels,weights)};}).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 return result.map(r=>({...r,rank:1+result.filter(x=>x.score>r.score).length}));
}
export function validateOpCost(raw){
 const limits={activeOrgs:[1,100000],tasksPerOrgYear:[.01,3660],requestsPerTask:[0,100],inputTokens:[0,1000000],outputTokens:[0,1000000]},values={},invalid=[];
 for(const [k,[min,max]] of Object.entries(limits)){const v=raw?.[k];values[k]=v===''||v===null||v===undefined?NaN:Number(v);if(!Number.isFinite(values[k])||values[k]<min||values[k]>max||(['activeOrgs','inputTokens','outputTokens'].includes(k)&&!Number.isInteger(values[k])))invalid.push(k);}
 return {values,invalid,valid:invalid.length===0};
}
export function opCost(row,model,raw){
 const {valid,values:v}=validateOpCost(raw);if(!valid)throw new RangeError('Completa supuestos de costo válidos.');
 const tasks=v.activeOrgs*v.tasksPerOrgYear/12,requests=tasks*v.requestsPerTask;
 const api=requests*(v.inputTokens*model.aiReference.inputUsdPerMillion+v.outputTokens*model.aiReference.outputUsdPerMillion)/1e6;
 const support=v.activeOrgs*row.costAssumptions.supportMinutesPerActiveOrgMonth/60;
 return {assumptions:v,tasksMonthlyEquivalent:tasks,requestsMonthly:requests,staticHostingUsdMonth:model.staticHostingUsdMonth,optionalAiApiOnlyUsdMonth:api,optionalAiApiOnlyUsdYear:api*12,apiOnlyUsdPerTask:api/tasks,apiOnlyUsdPerActiveOrgMonth:api/v.activeOrgs,laborHoursMonthRange:row.costAssumptions.maintenanceHoursMonthlyRange.map(x=>x+support),developmentHoursRange:row.costAssumptions.developmentHoursRange,fullTcoUsdMonth:null};
}
export function opCsv(rows,weights,scenario,comparisons){
 const encode=v=>'"'+(/^[\u0000-\u0020]*[=+\-@]/.test(String(v))?"'":'')+String(v??'').replaceAll('"','""')+'"';
 const header=['puesto_IPH','oportunidad','nombre','problema_principal','IPH','escenario','M_nivel','A_nivel','F_nivel','D_nivel','M_peso','A_peso','F_peso','D_peso','criticidad_entrada','ASdC_entrada','I_peso_criticidad','F_peso_criticidad','A_peso_criticidad','U_peso_criticidad','K_peso_ASdC','D_peso_ASdC','E_peso_ASdC','A_peso_ASdC','confianza_IPH','prioridad_original','ahorro_natural','incremento_IA'];
 return '\uFEFF'+[header,...rows.map(r=>[r.rank,r.id,r.title,r.primary,r.score,scenario,...opKeys.map(k=>r.scenarioLevels[k]),...opKeys.map(k=>weights[k]),comparisons.criticality.get(r.primary).score,comparisons.addressability.get(r.primary).score,...['I','F','A','U'].map(k=>comparisons.criticalityWeights[k]),...['K','D','E','A'].map(k=>comparisons.addressabilityWeights[k]),r.confidence,r.priority,'Por medir','No medido'])].map(r=>r.map(encode).join(',')).join('\r\n')+'\r\n';
}
