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
    await page.goto(origin + "/criticidad?scope=fundaciones");
    await page.locator("#h2-pilot-title").waitFor();
    const foundations = page.locator("[data-h2-research=pilot] [data-h2-task]");
    const deferred = page.locator("[data-h2-research=deferred] [data-h2-task]");
    const sector = page.locator("[data-h2-research=sector] [data-h2-task]");
    assert.equal(await foundations.count(), 8);
    assert.equal(await deferred.count(), 23);
    assert.equal(await page.locator(".h2-cell").count(), 32);
    assert.deepEqual(await page.locator(".h2-table thead th").allTextContents().then(x => x.map(t => t.split(/Qué|Cuántas|Cuánto/)[0].trim())),
      ["Problema","Impacto","Recurrencia","Alcance","Urgencia"]);
    assert.equal(await page.locator(".h2-cell .h2-sources").count(), 32);
    assert.equal(await page.locator("main a[href^=\"http:\"]").count(), 0);
    for (const id of ["P14","P11","P47","P26","P54"]) {
      assert.match(await page.locator(`[data-h2-research=deferred] [data-h2-task="${id}"]`).innerText(), /Primer bloque/);
    }
    assert.equal(await deferred.first().getAttribute("data-h2-task"), "P14");
    assert.doesNotMatch(await page.locator('[data-h2-task="P43"]').innerText(), /Primer bloque/);
    const closure = page.locator("#h2-closure-P13");
    const index = page.locator("[data-h2-index=P13]");
    assert.match(await closure.innerText(), /Evidencia documentada[\s\S]*37%[\s\S]*255[\s\S]*puesto de criticidad sigue por determinar/);
    assert.match(await index.innerText(), /Puntaje de criticidad pendiente[\s\S]*25% del peso con indicador[\s\S]*muestra mixta/i);
    assert.doesNotMatch(await index.innerText(), /37\/100/);
    await index.locator("summary").click();
    assert.equal(await index.getByText("Sin dato comparable", {exact:false}).count(), 3);
    assert.match(await index.innerText(), /Alcance · 25%\s*· 37 · indicador parcial/);
    assert.doesNotMatch(await closure.innerText(), /Corporación Cultiva/);
    assert.equal(await closure.locator('a[href*="fundacionsentido.cl"]').count(), 1);
    const closedTask = page.locator('[data-h2-task="P13"]');
    await closedTask.locator("summary").click();
    assert.equal(await closedTask.getByRole("link",{name:"Ver la evidencia y sus brechas"}).getAttribute("href"), "#h2-closure-P13");
    const p20 = page.locator("[data-h2-pilot=P20]");
    const reach = p20.locator("summary").filter({hasText:"Alcance muestral"});
    await reach.click();
    assert.match(await p20.innerText(), /62%[\s\S]*125/);
    assert.ok(await p20.locator('a[href$="#page=22"]:visible').count());
    assert.match(await p20.innerText(), /Desglose|desglose/);
    const p16Task = page.locator('[data-h2-research=pilot] [data-h2-task="P16"]');
    await p16Task.locator("summary").click();
    assert.match(await p16Task.innerText(), /Monto|monto/);
    assert.equal(await p16Task.locator(".h2-gaps li:visible").count(), 4);
    await page.locator(".h2-actions a[data-go=metodos]").click();
    await page.locator("#metodo-criticidad").waitFor();
    assert.match(page.url(), /volver=.*criticidad/);
    await page.locator("[data-mf-return]").click();
    await page.locator("#h2-pilot-title").waitFor();
    assert.equal(await page.locator("#scope-top").inputValue(), "fundaciones");
    await p20.locator("[data-h2-problem=P20]").click();
    await page.getByRole("dialog").waitFor();
    assert.match(page.url(), /problemas.*scope=fundaciones.*p=P20/);
    await page.goBack();
    await page.locator("#h2-pilot-title").waitFor();
    await page.selectOption("#scope-top", "tercer_sector");
    await page.locator("#h2-sector-title").waitFor();
    assert.equal(await page.locator("[data-h2-sector]").count(), 31);
    assert.equal(await sector.count(), 31);
    assert.equal(await sector.locator(".h2-gaps li").count(), 120);
    assert.equal(await page.locator("[data-h2-pilot]").count(), 0);
    assert.equal(await page.locator(".h2-source-group li").count(), 245);
    assert.match(await closure.innerText(), /47%[\s\S]*Corporación Cultiva[\s\S]*38,6%[\s\S]*9,6%/);
    assert.match(await index.innerText(), /Puntaje de criticidad pendiente[\s\S]*Fundaciones y Tercer sector aún carecen de puntaje propio/);
    assert.doesNotMatch(await closure.innerText(), /base incluye 255/);
    assert.equal(await closure.locator('a[href*="cultiva.cl"]').count(), 1);
    const sectorP20 = page.locator("[data-h2-sector=P20]");
    await sectorP20.locator(":scope > summary").click();
    assert.match(await sectorP20.innerText(), /62%[\s\S]*125/);
    assert.ok(await sectorP20.getByText(/Base no desglosada/).isVisible());
    await page.reload();
    await page.locator("#h2-sector-title").waitFor();
    assert.equal(await page.locator("#scope-top").inputValue(), "tercer_sector");
    await page.setViewportSize({width:390,height:844});
    await page.selectOption("#scope-top", "fundaciones");
    await page.locator("#h2-pilot-title").waitFor();
    const widths = await page.evaluate(() => ({
      page:document.documentElement.scrollWidth, viewport:innerWidth,
      table:document.querySelector(".h2-table-scroll").clientWidth,
      scroll:document.querySelector(".h2-table-scroll").scrollWidth
    }));
    assert.ok(widths.page <= widths.viewport + 1, JSON.stringify(widths));
    assert.ok(widths.scroll > widths.table, "la tabla contiene su desplazamiento");
    await page.getByRole("link",{name:"Ir a próximos pasos"}).click();
    assert.equal(await deferred.count(), 23);
    assert.equal(await foundations.locator(".h2-gaps li").count(), 28);
    assert.deepEqual(errors, []);
    console.log("H-2.2 PASS · 8 × 4, 23, 31, 245 hallazgos, fuentes, rutas, selector y móvil.");
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}
run().catch(error => {console.error(error);process.exitCode = 1;});

