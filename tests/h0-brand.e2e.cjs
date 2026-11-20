"use strict";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const { mkdirSync } = require("node:fs");
const path = require("node:path");
const BASE="http://127.0.0.1:8766/preview/h0/";
const OUT="preview/h0/test-results";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const server=spawn("python3",["-m","http.server","8766","--bind","127.0.0.1"],{cwd:process.cwd(),stdio:"ignore"});
 let browser;
 try {
  for(let i=0;i<55;i++){try{const r=await fetch(BASE);if(r.ok)break;}catch{}await sleep(200);}
  browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto(BASE,{waitUntil:"networkidle"});
  await page.locator(".stage-card").first().waitFor();
  assert.equal(await page.locator(".stage-card").count(),4);
  const headerLogo=page.getByRole("img",{name:/Simón de Cirene.*30 años/});
  assert.equal(await headerLogo.count(),1);
  assert.equal((await page.locator(".brand").textContent()).trim(),"");
  const brand=await page.evaluate(()=>{
   const root=getComputedStyle(document.documentElement);
   const logo=document.querySelector(".brand-logo");
   return {
    font:getComputedStyle(document.querySelector("h1")).fontFamily,
    background:getComputedStyle(document.body).backgroundColor,
    colorBlue:root.getPropertyValue("--sdc-blue").trim(),
    colorOrange:root.getPropertyValue("--sdc-orange").trim(),
    colorCream:root.getPropertyValue("--sdc-cream").trim(),
    iconLoaded:logo.complete&&logo.naturalWidth===2048&&logo.naturalHeight===605,
    logoSrc:logo.getAttribute("src"),
    footerBar:getComputedStyle(document.querySelector(".site-footer")).backgroundImage,
   };
  });
  assert.match(brand.font,/Montserrat/);
  assert.equal(brand.background,"rgb(255, 242, 225)");
  assert.equal(brand.colorBlue.toUpperCase(),"#418FDE");
  assert.equal(brand.colorOrange.toUpperCase(),"#FF9E19");
  assert.equal(brand.colorCream.toUpperCase(),"#FFF2E1");
  assert.equal(brand.iconLoaded,true,"El PNG original del PPT debe cargarse");
  assert.match(brand.logoSrc,/sdc-logo-30-anos-2026\.png/);
  assert.match(brand.footerBar,/linear-gradient/);
  mkdirSync(OUT,{recursive:true});
  await page.screenshot({path:path.join(OUT,"H0-marca-SdC-portada-desktop.png"),fullPage:true});
  await page.selectOption("#scope-top","fundaciones");
  await page.locator(".stage-card[data-go=problemas]").click();
  assert.equal(await page.locator(".pain-row").count(),31);
  assert.equal(await page.locator(".band-card").count(),3);
  await page.screenshot({path:path.join(OUT,"H0-marca-SdC-problemas-desktop.png"),fullPage:true});
  await page.locator(".pain-row[data-problem=P48]").click();
  assert.equal(await page.locator(".drawer").count(),1);
  await page.screenshot({path:path.join(OUT,"H0-marca-SdC-panel-evidencia.png"),fullPage:true});
  await page.keyboard.press("Escape");
  for(const width of [390,320]){
   await page.setViewportSize({width,height:850});
   const dims=await page.evaluate(()=>({
    innerWidth,scrollWidth:document.documentElement.scrollWidth,
    brandWidth:document.querySelector(".brand").getBoundingClientRect().width,
    selectRight:document.querySelector("#scope-top").getBoundingClientRect().right,
    logoVisible:document.querySelector(".brand-logo").getBoundingClientRect().width>0,
   }));
   assert.ok(dims.scrollWidth<=dims.innerWidth+1,"Overflow a "+width+"px: "+JSON.stringify(dims));
   assert.ok(dims.logoVisible,"Logo debe verse en móvil "+width);
   assert.ok(dims.selectRight<=width+1,"Selector no debe salir de pantalla "+width);
   if(width===390)await page.screenshot({path:path.join(OUT,"H0-marca-SdC-movil-390.png"),fullPage:true});
  }
  await page.locator(".subnav a[data-go=inicio]").click();
  assert.equal(await page.locator(".stage-card").count(),4);
  assert.deepEqual(errors,[],"Errores JS en navegador");
  console.log("H-0 BRAND PASS: paleta hex original, Montserrat, logo y sello originales de la plantilla, 4 secciones, 31 problemas, panel y móvil 390/320, consola limpia");
 } finally {if(browser)await browser.close();server.kill("SIGTERM");}
})().catch(e=>{console.error("H-0 BRAND FAIL",e);process.exitCode=1;});
