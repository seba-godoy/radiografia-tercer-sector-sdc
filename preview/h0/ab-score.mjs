export const abKeys=['K','D','E','A'];
export function validateAbWeights(raw){
 const weights={};const invalid=abKeys.filter(k=>{
  const v=raw?.[k];if(!['string','number'].includes(typeof v)||String(v).trim()==='')return true;
  const n=Number(v);if(!Number.isFinite(n)||n<0||n>100)return true;weights[k]=n;return false;
 });
 const total=invalid.length?null:abKeys.reduce((sum,k)=>sum+weights[k],0);
 return {weights,invalid,total,valid:!invalid.length&&Math.abs(total-100)<1e-8};
}
export function abScore(levels,raw){
 const {valid,weights}=validateAbWeights(raw);
 if(!valid)throw new RangeError('Los pesos K/D/E/A deben estar entre 0 y 100 y sumar 100%.');
 if(!['C',...abKeys].every(k=>Number.isInteger(levels[k])&&levels[k]>=1&&levels[k]<=5))throw new RangeError('Faltan niveles válidos C/K/D/E/A.');
 const mean=abKeys.reduce((sum,k)=>sum+levels[k]*weights[k]/100,0);
 return Math.round(1+99*(levels.C/5)*(mean-1)/4+1e-10);
}
export function abRanking(rows,weights){
 const next=rows.map(r=>({...r,score:abScore(r.levels,weights)})).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 for(const r of next)r.rank=1+next.filter(x=>x.score>r.score).length;
 return next;
}
