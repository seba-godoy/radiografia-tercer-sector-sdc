"use strict";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const { mkdirSync } = require("node:fs");
const path = require("node:path");
const BASE="http://127.0.0.1:8765/preview/px-v01/";
const OUT="preview/px-v01/test-results";
const sleep = ms => new Promise(r=>setTimeout(r,ms));
(async()=>{
 const server=spawn("python3",["-m","http.server","8765","--bind","127.0.0.1"],{cwd:process.cwd(),stdio:"ignore"});
 let browser;
 try {
   for(let i=0;i<40;i++){try{const x=await fetch(BASE);if(x.ok)break;}catch(_){}await sleep(250)}
   browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
   const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   await page.goto(BASE,{waitUntil:"networkidle"});
   await page.locator(".problem-card").first().waitFor({timeout:15000});
   assert.equal(await page.locator(".problem-card").count(),31,"must show all P");
   assert.match(await page.locator("#results-count").innerText(),/31 de 31/);
   assert.equal(await page.locator(".theme-button").count(),5);
   assert.equal(await page.locator("#fact-sources").innerText(),"26");
   assert.equal(await page.locator("#fact-segments").innerText(),"121");
   mkdirSync(OUT,{recursive:true});
   await page.screenshot({path:path.join(OUT,"desktop.png"),fullPage:true});
   // Modal P20: 62 N125, explicit question and source; focus returns.
   await page.locator('.problem-card[data-id="P20"]').click();
   await page.locator("#evidence-drawer").waitFor({state:"visible"});
   assert.match(await page.locator("#drawer-body").innerText(),/62%/);
   assert.match(await page.locator("#drawer-body").innerText(),/N=125/);
   assert.match(await page.locator("#drawer-body").innerText(),/42%/);
   assert.ok((await page.locator('#drawer-body a[href*="#page=22"]').count())>=1);
   await page.screenshot({path:path.join(OUT,"evidencia-P20.png")});
   await page.keyboard.press("Escape");
   assert.equal(await page.locator("#evidence-drawer").isVisible(),false);
   assert.equal(await page.evaluate(()=>document.activeElement?.dataset?.id),"P20","focus returns to clicked problem");
   // Repeat with different population.
   await page.locator('.problem-card[data-id="P25"]').click();
   assert.match(await page.locator("#drawer-body").innerText(),/57%/);
   assert.match(await page.locator("#drawer-body").innerText(),/N=255/);
   await page.locator("#drawer-close").click();
   // Direct-link P48, qualitative and ND.
   await page.goto(BASE+"#P48",{waitUntil:"networkidle"});
   await page.locator("#evidence-drawer").waitFor({state:"visible"});
   const p48=await page.locator("#drawer-body").innerText();
   assert.match(p48,/P48|Atendemos más casos/);
   assert.match(p48,/EVIDENCIA CUALITATIVA/);
   assert.match(p48,/Sin porcentaje ni base representativa acreditada/);
   assert.ok((await page.locator('#drawer-body a[href*="#page=158"]').count())>=1);
   await page.screenshot({path:path.join(OUT,"evidencia-P48.png")});
   await page.locator("#drawer-return").click();
   // Theme & evidence filters use catalogue counts, not estimates.
   await page.locator('.theme-button[data-theme="T2"]').click();
   assert.equal(await page.locator(".problem-card").count(),8);
   await page.locator('.theme-button[data-theme="all"]').click();
   await page.selectOption("#evidence-filter","numeric");
   assert.equal(await page.locator(".problem-card").count(),15);
   await page.selectOption("#evidence-filter","non-numeric");
   assert.equal(await page.locator(".problem-card").count(),16);
   await page.selectOption("#evidence-filter","all");
   await page.locator("#problem-search").fill("P48");
   assert.equal(await page.locator(".problem-card").count(),1);
   await page.locator("#problem-search").fill("xxxxxxxx___123");
   assert.equal(await page.locator(".problem-card").count(),0);
   assert.equal(await page.locator("#empty-state").isVisible(),true);
   await page.locator("#empty-reset").click();
   assert.equal(await page.locator(".problem-card").count(),31);
   // Reading guide.
   await page.locator("#how-to-button").click();
   await page.locator("#evidence-drawer").waitFor({state:"visible"});
   assert.match(await page.locator("#drawer-title").innerText(),/Cómo leer/);
   await page.keyboard.press("Escape");
   // Mobile overflow and interaction.
   await page.setViewportSize({width:390,height:844});
   await page.reload({waitUntil:"networkidle"});
   await page.locator(".problem-card").first().waitFor();
   const sizes=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(sizes.scroll <= sizes.inner+1,"mobile horizontal scroll "+JSON.stringify(sizes));
   await page.screenshot({path:path.join(OUT,"mobile.png"),fullPage:true});
   await page.locator('.problem-card[data-id="P20"]').click();
   assert.equal(await page.locator("#evidence-drawer").isVisible(),true);
   await page.keyboard.press("Escape");
   assert.deepEqual(errors,[],"uncaught browser errors");
   console.log("BROWSER PASS: 31 records, P20/P25/P48, sources, focus, themes, 15/16 indicator filters, empty state, direct links, 390px mobile, console clean");
 } finally {if(browser)await browser.close();server.kill("SIGTERM");}
})().catch(e=>{console.error(e);process.exitCode=1});
