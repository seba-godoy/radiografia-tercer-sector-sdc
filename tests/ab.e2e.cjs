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
    const page = await browser.newPage({viewport:{width:1440,height:900}});
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    const data=require('../analisis/abordabilidad-31-v1.json');
    const score=id=>page.locator('[data-ab-row="'+id+'"] [data-ab-score]').innerText();
    for(const scope of ['fundaciones','tercer_sector']) {
      await page.goto(origin+'/abordabilidad?scope='+scope);
      await page.locator('#ab-ranking-title').waitFor();
      assert.equal(await page.locator('[data-ab-row]').count(),31);
      assert.equal(await page.locator('[data-ab-title]').count(),155);
      for(const r of data.rows)assert.equal(await score(r.id),r.score+'/100');
      assert.equal(await page.locator('[data-ab-weight]').count(),4);
      const columnWidths=await page.locator('.ab-table thead th').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().width));
      assert.ok(columnWidths[1]>=300&&columnWidths[0]<=100,JSON.stringify(columnWidths));
      const p13=page.locator('[data-ab-card=P13]');
      await p13.locator(':scope > summary').click();
      assert.match(await p13.innerText(),/35\/100/);
      assert.match(await p13.innerText(),/Fuera de alcance/);
      assert.match(await p13.innerText(),/Condición operativa/);
      assert.ok(await p13.locator('a[href$="#page=34"]:visible').count());
      const p48=page.locator('[data-ab-card=P48]');
      await p48.locator(':scope > summary').click();
      assert.match(await p48.innerText(),/6\/100/);
      assert.match(await p48.innerText(),/No hay conjunto público suficiente/);
      await p13.locator('[data-h2-problem=P13]').click();
      await page.getByRole('dialog').waitFor();
      assert.match(page.url(),new RegExp('scope='+scope));
      await page.goBack();await page.locator('#ab-ranking-title').waitFor();
      const form=page.locator('[data-ab-weights]');
      await page.locator('[data-ab-weight=K]').fill('');
      assert.equal(await score('P47'),'64/100');
      assert.match(await form.innerText(),/Cambios sin aplicar/);
      assert.ok(await page.locator('[data-ab-export=json]').isDisabled());
      await page.locator('[data-ab-weight=K]').fill('101');
      assert.equal(await page.locator('[data-ab-weight=K]').getAttribute('aria-invalid'),'true');
      for(const k of ['D','E','A'])await page.locator('[data-ab-weight='+k+']').fill('0');
      await page.locator('[data-ab-weight=K]').fill('100');
      assert.equal(await score('P47'),'75/100');
      assert.equal(await page.evaluate(()=>document.activeElement.id),'ab-weight-K');
      assert.equal(await page.locator('[data-ab-row=P47] [data-ab-rank]').innerText(),'1');
      await page.locator('.ab-page [data-go=metodos]').click();
      await page.locator('#metodo-abordabilidad').waitFor();
      assert.match(await page.locator('#metodo-abordabilidad').innerText(),/factor C\/5/);
      await page.locator('[data-mf-return]').click();
      await page.locator('#ab-ranking-title').waitFor();
      assert.equal(await score('P47'),'75/100');
      // The comparison uses the live criticality scenario, not a stale fixed copy.
      await page.locator('.ab-page [data-go=criticidad]').click();
      await page.locator('#ranking31-title').waitFor();
      for(const [k,v] of Object.entries({I:'0',F:'100',A:'0',U:'0'}))await page.locator('[data-rank31-weight='+k+']').fill(v);
      await page.locator('.subnav [data-go=abordabilidad]').click();
      await page.locator('#ab-ranking-title').waitFor();
      assert.equal(await page.locator('[data-ab-row=P17] [data-ab-criticality]').innerText(),'100/100');
      assert.equal(await score('P47'),'75/100');
      assert.match(await page.locator('[data-ab-criticality-note]').innerText(),/F 100%/);
      const jsonEvent=page.waitForEvent('download');await page.locator('[data-ab-export=json]').click();
      const jsonFile=await jsonEvent;const out=JSON.parse(await readFile(await jsonFile.path(),'utf8'));
      assert.deepEqual(out.scenario.preparationWeights,{K:100,D:0,E:0,A:0});
      assert.deepEqual(out.scenario.criticalityWeights,{I:0,F:100,A:0,U:0});
      assert.equal(out.rows.length,31);assert.equal(out.rows.find(r=>r.id==='P47').score,75);
      assert.equal(out.rows.find(r=>r.id==='P17').criticalityRank,1);
      const csvEvent=page.waitForEvent('download');await page.locator('[data-ab-export=csv]').click();
      const csvFile=await csvEvent;const csv=await readFile(await csvFile.path(),'utf8');
      assert.equal(csv.trim().split('\n').length,32);assert.match(csv,/F_peso_criticidad/);
      for(const [k,v] of Object.entries({K:'33.3',D:'33.3',E:'33.4',A:'0'}))await page.locator('[data-ab-weight='+k+']').fill(v);
      assert.match(await form.innerText(),/Total: 100%/);
      await page.locator('[data-ab-reset]').click();assert.equal(await score('P47'),'64/100');
    }
    await page.setViewportSize({width:390,height:844});
    await page.selectOption('#scope-top','fundaciones');await page.locator('#ab-ranking-title').waitFor();
    const widths=await page.evaluate(()=>({page:document.documentElement.scrollWidth,width:innerWidth,table:document.querySelector('.ab-table').scrollWidth,container:document.querySelector('.ab-page .h2-table-scroll').clientWidth}));
    assert.ok(widths.page<=widths.width+1,JSON.stringify(widths));assert.ok(widths.table>widths.container);
    await page.locator('[data-ab-card=P32] > summary').click();
    assert.match(await page.locator('[data-ab-card=P32]').innerText(),/certificar estados financieros/);
    await page.screenshot({path:'preview/h0/test-results/AB6-mobile.png',fullPage:true});
    await page.setViewportSize({width:1440,height:900});
    await page.screenshot({path:'preview/h0/test-results/AB6-desktop.png',fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('AB-6 PASS: 31 intervenciones, 155 criterios, pesos, fuentes, condiciones, rutas, cruce vivo, exportaciones y móvil.');
  } finally {
    if(browser)await browser.close();server.close();
  }
}
run().catch(error=>{console.error(error);process.exitCode=1;});
