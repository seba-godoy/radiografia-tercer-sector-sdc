"use strict";

const {chromium} = require("playwright");
const assert = require("node:assert/strict");
const {createServer} = require("node:http");
const {readFile} = require("node:fs/promises");
const path = require("node:path");
const routes = require("../vercel.json").rewrites;
const types = {".html":"text/html", ".css":"text/css", ".mjs":"text/javascript", ".json":"application/json", ".png":"image/png"};

async function run() {
  const server = createServer(async (req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const destination = routes.find(item => item.source === pathname)?.destination || pathname;
    const local = path.resolve(process.cwd(), "." + destination);
    if (!local.startsWith(process.cwd() + path.sep)) {
      res.writeHead(404).end();
      return;
    }
    try {
      const data = await readFile(local);
      res.writeHead(200, {"Content-Type": types[path.extname(local)] || "application/octet-stream"}).end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const origin = "http://127.0.0.1:" + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({headless:true, args:["--no-sandbox"],
      executablePath:process.env.H2_CHROMIUM || undefined});
    const page = await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const data=require('../analisis/oportunidades-7-v1.json');
    const fs=require('node:fs');fs.mkdirSync('preview/h0/test-results',{recursive:true});
    const score=id=>page.locator('[data-op-row="'+id+'"] [data-op-score]').innerText();
    for(const scope of ['fundaciones','tercer_sector']){
      await page.goto(origin+'/oportunidades?scope='+scope);await page.locator('#op-ranking-title').waitFor();
      assert.equal(await page.locator('[data-op-row]').count(),7);assert.equal(await page.locator('[data-op-triage]').count(),31);assert.equal(await page.locator('[data-op-criterion]').count(),28);
      for(const r of data.rows)assert.equal(await score(r.id),r.score+'/100');
      assert.equal(await page.locator('[data-op-row=OP01] [data-op-rank]').innerText(),'1');
      assert.equal(await page.locator('[data-op-row=OP03] [data-op-rank]').innerText(),'1');
      const widths=await page.locator('.op-table thead th').evaluateAll(ns=>ns.map(n=>n.getBoundingClientRect().width));assert.ok(widths[1]>=300&&widths[0]<=100,JSON.stringify(widths));
      await page.screenshot({path:'preview/h0/test-results/OP-desktop-'+scope+'.png',fullPage:true});
      const f=page.locator('[data-op-weights]');await page.locator('[data-op-weight=M]').fill('');assert.equal(await score('OP01'),'55/100');assert.match(await f.innerText(),/Cambios sin aplicar/);assert.ok(await page.locator('[data-op-export=json]').isDisabled());
      await page.locator('[data-op-weight=M]').fill('101');assert.equal(await page.locator('[data-op-weight=M]').getAttribute('aria-invalid'),'true');
      for(const k of ['A','F','D'])await page.locator('[data-op-weight='+k+']').fill('0');await page.locator('[data-op-weight=M]').fill('100');
      assert.equal(await score('OP01'),'51/100');assert.equal(await page.evaluate(()=>document.activeElement.id),'op-weight-M');
      await page.locator('[data-op-scenario]').selectOption('favorable');assert.equal(await score('OP01'),'75/100');
      const card=page.locator('[data-op-card=OP01]');await card.locator(':scope > summary').click();assert.match(await card.locator('[data-op-criterion=M]').innerText(),/4\/5 · 100%/);assert.match(await card.innerText(),/por medir/);assert.ok(await card.locator('a[href^="https://trello.com/"]').count());
      await page.locator('#op-cost-candidate').selectOption('OP01');await page.locator('[data-op-usage="300"]').click();assert.match(await page.locator('[data-op-cost-results]').innerText(),/52–54h\/mes/);assert.match(await page.locator('[data-op-cost-results]').innerText(),/USD 1,50\/mes/);
      await page.locator('[data-op-cost=activeOrgs]').fill('0');assert.ok(await page.locator('[data-op-export=json]').isDisabled());assert.match(await page.locator('[data-op-cost-status]').innerText(),/Cambios sin aplicar/);assert.match(await page.locator('[data-op-cost-results]').innerText(),/52–54h/);
      await page.locator('.op-page [data-go=metodos]').click();await page.locator('#metodo-impacto_ia').waitFor();assert.match(await page.locator('#metodo-impacto_ia').innerText(),/M40 \/ A25 \/ F20 \/ D15/);await page.locator('[data-mf-return]').click();await page.locator('#op-ranking-title').waitFor();
      assert.equal(await score('OP01'),'75/100');assert.equal(await page.locator('[data-op-scenario]').inputValue(),'favorable');assert.match(await page.locator('[data-op-cost-results]').innerText(),/52–54h/);assert.ok(await page.locator('[data-op-export=json]').isDisabled());
      await page.locator('[data-op-cost=activeOrgs]').fill('300');
      // Cambios de los índices anteriores se reflejan en el cruce y su exportación.
      await page.locator('.subnav [data-go=criticidad]').click();await page.locator('#ranking31-title').waitFor();
      for(const [k,v] of Object.entries({I:'0',F:'100',A:'0',U:'0'}))await page.locator('[data-rank31-weight='+k+']').fill(v);
      await page.locator('.subnav [data-go=abordabilidad]').click();await page.locator('#ab-ranking-title').waitFor();
      for(const [k,v] of Object.entries({K:'100',D:'0',E:'0',A:'0'}))await page.locator('[data-ab-weight='+k+']').fill(v);
      await page.locator('.subnav [data-go=oportunidades]').click();await page.locator('#op-ranking-title').waitFor();
      assert.equal(await page.locator('[data-op-row=OP01] [data-op-ab]').innerText(),'75/100');assert.match(await page.locator('[data-op-comparison]').innerText(),/F 100%/);assert.equal(await score('OP01'),'75/100');
      const event=page.waitForEvent('download');await page.locator('[data-op-export=json]').click();const download=await event;const out=JSON.parse(await readFile(await download.path(),'utf8'));
      assert.deepEqual(out.scenario.impactWeights,{M:100,A:0,F:0,D:0});assert.equal(out.scenario.impactScenario,'favorable');assert.equal(out.scenario.cost.assumptions.activeOrgs,300);assert.equal(out.scenario.cost.fullTcoUsdMonth,null);
      assert.deepEqual(out.scenario.criticalityWeights,{I:0,F:100,A:0,U:0});assert.deepEqual(out.scenario.addressabilityWeights,{K:100,D:0,E:0,A:0});assert.equal(out.rows.find(r=>r.id==='OP01').score,75);assert.equal(out.rows.find(r=>r.id==='OP01').addressability,75);assert.ok(out.rows.every(r=>r.baselineSensitivity&&r.observed.netMinutesSaved===null));
      const ev=page.waitForEvent('download');await page.locator('[data-op-export=csv]').click();const csvDownload=await ev;const csv=await readFile(await csvDownload.path(),'utf8');assert.equal(csv.split('\r\n').filter(Boolean).length,8);assert.match(csv,/K_peso_ASdC/);
      // Cita del mecanismo y navegación con contexto.
      const opened=page.locator('[data-op-card=OP01]');if(await opened.getAttribute('open')===null)await opened.locator(':scope > summary').click();await opened.locator('[data-h2-problem=P47]').click();await page.getByRole('dialog').waitFor();assert.match(page.url(),new RegExp('scope='+scope));await page.goBack();await page.locator('#op-ranking-title').waitFor();
      await page.locator('[data-op-reset]').click();assert.equal(await score('OP01'),'55/100');
      await page.setViewportSize({width:390,height:844});await page.screenshot({path:'preview/h0/test-results/OP-mobile-'+scope+'.png',fullPage:true});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.ok(await page.locator('.op-table').evaluate(n=>n.scrollWidth>390));
      await page.locator('#op-cost-candidate').selectOption('OP02');assert.equal(await page.locator('[data-op-cost=tasksPerOrgYear]').inputValue(),'1');assert.match(await page.locator('[data-op-cost-results]').innerText(),/8,33 tareas/);
      await page.setViewportSize({width:1440,height:1000});
    }
    assert.deepEqual(errors,[]);console.log('OP-6 Chromium PASS: 7 oportunidades, 31 decisiones, 28 criterios; pesos, escenarios, costos, citas, cruces/exportaciones, retorno y móvil en ambos universos.');
  } finally {if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
}
run().catch(e=>{console.error(e);process.exitCode=1;});
