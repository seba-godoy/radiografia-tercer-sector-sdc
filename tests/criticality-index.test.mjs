import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {h2Render} from '../preview/h0/h2-view.mjs';

const read = p => JSON.parse(fs.readFileSync(new URL(p, import.meta.url), 'utf8'));
const contract = read('../analisis/h-2-1-criticidad-por-universo-v1.json');
const original = read('../preview/h0/h2-evidence.json');
const bank = read('../analisis/mf1-banco-26-fuentes-v1.json');
const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const render = (e, scope='fundaciones') => h2Render(contract, e, bank, scope, {map:'/problemas', methods:'/metodos', problem:id=>'/problemas?p='+id}, esc);

test('P13 conserva observación de alcance sin convertirla en total en ambas vistas', () => {
  for (const scope of ['fundaciones','tercer_sector']) {
    const html = render(original, scope);
    assert.match(html, /Puntaje de criticidad pendiente/);
    assert.doesNotMatch(html, /37\/100/);
    assert.match(html, /37%/);
    assert.match(html, /0,35 I/);
    assert.match(html, /Una base empírica por resultado/);
  }
});

test('completar celdas sin justificar la aplicación no habilita el total', () => {
  const e = structuredClone(original);
  e.criticalityIndex.scores.P13.components = {I:80,F:70,A:37,U:90};
  assert.doesNotMatch(render(e), /68\/100/);
  assert.match(render(e), /Puntaje de criticidad pendiente/);
});

test('cuatro criterios habilitados usan los pesos completos, sin reescalar', () => {
  const e = structuredClone(original);
  e.criticalityIndex.scores.P13.components = {I:80,F:70,A:37,U:90};
  e.criticalityIndex.scores.P13.ready = true;
  assert.match(render(e), /68\/100/);
});

test('un faltante o un valor inválido impide publicar un total', () => {
  for (const value of [null,undefined,NaN,Infinity,-1,101,'70']) {
    const e = structuredClone(original);
    e.criticalityIndex.scores.P13.components = {I:80,F:value,A:37,U:90};
    e.criticalityIndex.scores.P13.ready = true;
    assert.match(render(e), /Puntaje de criticidad pendiente/);
    assert.doesNotMatch(render(e), /class="h2-index-value">\d+\/100/);
  }
});

test('texto de evidencia se escapa y el estado siguiente identifica P13', () => {
  const e = structuredClone(original);
  e.criticalityIndex.scores.P13.finding = '<script>alert(1)</script>';
  const html = render(e);
  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /paso activo es completar la puntuación de P13/);
});
