const { chromium } = require('C:/Users/21624/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async()=>{
fs.mkdirSync('output/pdf/captures',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const page=await context.newPage();
await page.setViewportSize({width:128,height:128});
for(const name of ['html5','css3','javascript','git','nodejs','vscode']){
 await page.goto('http://127.0.0.1:8765/output/pdf/logos/'+name+'.svg');
 await page.screenshot({path:`output/pdf/logos/${name}.png`,omitBackground:true});
}
await page.setViewportSize({width:1440,height:1000});
for(const [name,url] of [['accueil','index.html'],['catalogue','courses.html'],['fiche','course-details.html?id=html-css'],['apprentissage','learning.html?course=html-css&lesson=0']]){
 await page.goto('http://127.0.0.1:8765/'+url); await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`output/pdf/captures/${name}.png`});
}
await page.locator('#complete').click();
await page.goto('http://127.0.0.1:8765/dashboard.html');
await page.screenshot({path:'output/pdf/captures/tableau-de-bord.png'});
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:8765/courses.html');
await page.screenshot({path:'output/pdf/captures/catalogue-mobile.png'});
await browser.close(); console.log('Six captures réelles créées.');
})();
