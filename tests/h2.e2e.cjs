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
    const data=require('../analisis/criticidad-31-v03.json');
    for(const scope of ['fundaciones','tercer_sector']) {
      await page.goto(origin + '/criticidad?scope='+scope);
      await page.locator('#ranking31-title').waitFor();
      assert.equal(await page.locator('[data-rank31-row]').count(),31);
      assert.equal(await page.locator('[data-rank31-detail]').count(),31);
      assert.equal(await page.locator('.rank31-criterion').count(),124);
      assert.match(await page.locator('#ranking-31 > p').allTextContents().then(x=>x.join(' ')),/no estima prevalencia nacional/i);
      for(const r of data.rows) {
        const row=page.locator('[data-rank31-row="'+r.id+'"]');
        assert.equal((await row.locator('td').first().innerText()).trim(),String(r.rank));
        assert.match(await row.innerText(),new RegExp(r.score+'/100'));
      }
      const p13=page.locator('[data-rank31-detail=P13]');
      await page.locator('[data-rank31-row=P13] a').click();
      await p13.locator(':scope > summary').click();
      assert.equal(await p13.locator('.rank31-criterion').count(),4);
      assert.match(await p13.innerText(),/75\/100/);
      assert.match(await p13.innerText(),/Inferencia documental/);
      assert.match(await p13.innerText(),/37%/);
      assert.match(await p13.innerText(),/IFO/);
      await p13.locator('.rank31-bank > summary').click();
      assert.equal(await p13.locator('.rank31-bank li').count(),28);
      assert.ok(await p13.locator('a[href$="#page=34"]:visible').count());
      const p14=page.locator('[data-rank31-detail=P14]');
      await p14.locator(':scope > summary').click();
      assert.match(await p14.innerText(),/escenario|hipotético/);
      const p52=page.locator('[data-rank31-detail=P52]');
      await p52.locator(':scope > summary').click();
      assert.match(await p52.innerText(),/Confianza Baja/);
      assert.match(await p52.innerText(),/familias acogedoras no equivalen a fundaciones/i);
      const rubric=page.locator('#rubrica-31');
      await rubric.locator(':scope > summary').click();
      assert.match(await rubric.innerText(),/I35\/F25\/A25\/U15/);
      assert.match(await rubric.innerText(),/no intervalos estadísticos/i);
      const csv=await page.request.get(origin+'/analisis/criticidad-31-v03.csv');
      assert.equal(csv.status(),200);assert.equal((await csv.text()).trim().split('\n').length,32);
      await page.locator('.rank31-history > summary').click();
      const application=page.locator('#p13-aplicacion');
      assert.equal(await application.locator('[data-p13-study]').count(),9);
      assert.equal(await application.locator('[data-p13-publication]').count(),16);
      assert.equal(await application.locator('[data-p13-claim]').count(),28);
      assert.match(await page.locator('.rank31-history').innerText(),/sustituidas por el ranking documental v0.3/);
      if(scope==='fundaciones') {
        assert.equal(await page.locator('[data-h2-pilot]').count(),8);
        assert.equal(await page.locator('.h2-cell').count(),32);
        const p20=page.locator('[data-h2-pilot=P20]');
        await p20.locator('summary').filter({hasText:'Alcance muestral'}).click();
        assert.match(await p20.innerText(),/62%/);
      } else {
        assert.equal(await page.locator('[data-h2-sector]').count(),31);
        assert.equal(await page.locator('.h2-source-group li').count(),245);
      }
      // The history is an explicit archive, while current next steps proceed to addressability.
      assert.match(await page.locator('#h2-research').innerText(),/31 problemas ya tienen criticidad/);
      await p13.locator('[data-h2-problem=P13]').click();
      await page.getByRole('dialog').waitFor();
      assert.match(page.url(),new RegExp('scope='+scope));
      await page.goBack();await page.locator('#ranking31-title').waitFor();
      await page.locator('.h2-actions a[data-go=metodos]').click();
      await page.locator('#metodo-criticidad').waitFor();
      assert.match(await page.locator('#metodo-criticidad').innerText(),/provisional v0.3/);
      await page.locator('[data-mf-return]').click();
      await page.locator('#ranking31-title').waitFor();
      assert.equal(await page.locator('#scope-top').inputValue(),scope);
    }
    await page.setViewportSize({width:390,height:844});
    await page.selectOption('#scope-top','fundaciones');
    await page.locator('#ranking31-title').waitFor();
    const sizes=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth,table:document.querySelector('.rank31-table').scrollWidth,container:document.querySelector('#ranking-31 .h2-table-scroll').clientWidth}));
    assert.ok(sizes.page<=sizes.viewport+1,JSON.stringify(sizes));
    assert.ok(sizes.table>sizes.container,'ranking contains its horizontal scroll');
    await page.locator('[data-rank31-detail=P13] > summary').click();
    assert.match(await page.locator('[data-rank31-detail=P13]').innerText(),/75\/100/);
    // Inputs update all 31 rows without losing focus or changing the documented evidence.
    assert.equal(await page.locator('[data-rank31-weight]').count(),4);
    const weights=page.locator('[data-rank31-weights]');
    const score17=()=>page.locator('[data-rank31-row=P17] [data-rank31-score]').innerText();
    assert.equal(await score17(),'81/100');
    await page.locator('[data-rank31-weight=I]').fill('');
    assert.match(await weights.innerText(),/Cambios sin aplicar/);
    assert.equal(await score17(),'81/100');
    assert.ok(await page.locator('[data-rank31-export=csv]').isDisabled());
    await page.locator('[data-rank31-weight=I]').fill('101');
    assert.equal(await page.locator('[data-rank31-weight=I]').getAttribute('aria-invalid'),'true');
    assert.equal(await score17(),'81/100');
    await page.locator('[data-rank31-weight=I]').fill('0');
    await page.locator('[data-rank31-weight=A]').fill('0');
    await page.locator('[data-rank31-weight=U]').fill('0');
    await page.locator('[data-rank31-weight=F]').fill('100');
    assert.equal(await score17(),'100/100');
    assert.equal(await page.locator('[data-rank31-row]').first().getAttribute('data-rank31-row'),'P17');
    assert.equal(await page.locator('[data-rank31-row=P48] [data-rank31-rank]').innerText(),'1');
    assert.equal(await page.locator('[data-rank31-row=P51] [data-rank31-rank]').innerText(),'1');
    assert.match(await page.locator('[data-rank31-detail=P17] > summary').innerText(),/100\/100/);
    assert.match(await page.locator('[data-rank31-detail=P17] [data-rank31-criterion-title=F]').textContent(),/100%/);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'rank31-weight-F');
    await page.selectOption('#scope-top','tercer_sector');
    assert.equal(await page.locator('[data-rank31-weight=F]').inputValue(),'100');
    assert.equal(await score17(),'100/100');
    const downloadEvent=page.waitForEvent('download');
    await page.locator('[data-rank31-export=json]').click();
    const download=await downloadEvent;
    const exported=JSON.parse(await readFile(await download.path(),'utf8'));
    assert.deepEqual(exported.scenario.weights,{I:0,F:100,A:0,U:0});
    assert.equal(exported.rows.length,31);
    assert.equal(exported.rows.find(x=>x.id==='P17').score,100);
    const csvEvent=page.waitForEvent('download');
    await page.locator('[data-rank31-export=csv]').click();
    const csvDownload=await csvEvent;
    const scenarioCsv=await readFile(await csvDownload.path(),'utf8');
    assert.equal(scenarioCsv.trim().split('\n').length,32);
    assert.match(scenarioCsv,/I_peso/);
    // Preserve the last applied ranking and explain a partial edit after navigation.
    await page.locator('[data-rank31-weight=F]').fill('99');
    assert.equal(await score17(),'100/100');
    await page.selectOption('#scope-top','fundaciones');
    assert.equal(await page.locator('[data-rank31-weight=F]').inputValue(),'99');
    assert.match(await weights.innerText(),/Total: 99%/);
    assert.equal(await score17(),'100/100');
    await page.locator('[data-rank31-reset]').click();
    assert.equal(await score17(),'81/100');
    for(const [k,v] of Object.entries({I:'33.3',F:'33.3',A:'33.4',U:'0'}))
      await page.locator('[data-rank31-weight='+k+']').fill(v);
    assert.match(await weights.innerText(),/Total: 100%/);
    assert.ok(await page.locator('[data-rank31-export=csv]').isEnabled());
    assert.equal(await page.locator('[data-rank31-row]').count(),31);
    await page.locator('[data-rank31-reset]').click();
    const finalWidths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
    assert.ok(finalWidths.scroll<=finalWidths.width+1,JSON.stringify(finalWidths));
    await weights.screenshot({path:'preview/h0/test-results/criticidad-pesos-mobile.png'});
    await page.screenshot({path:'preview/h0/test-results/criticidad31-mobile.png',fullPage:true});
    await page.setViewportSize({width:1440,height:900});
    await page.screenshot({path:'preview/h0/test-results/criticidad31-desktop.png',fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('Criticidad v0.3 PASS: 31 puntajes, 124 criterios, fuentes, escenarios, archivo, rutas y móvil en ambos universos.');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}
run().catch(error => {console.error(error);process.exitCode = 1;});

