// Dépendance de test facultative : jsdom (aucune dépendance pour utiliser le site).
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..'), saved = {};
function open(file, query = '') {
    const dom = new JSDOM(fs.readFileSync(path.join(root,file),'utf8'), { url:'https://eduflow.test/'+file+query, runScripts:'outside-only' });
    const w = dom.window;
    for (const [key,value] of Object.entries(saved)) w.localStorage.setItem(key,value);
    const errors = []; w.addEventListener('error',event => errors.push(event.error));
    for (const script of w.document.querySelectorAll('script[src]')) w.eval(fs.readFileSync(path.join(root,script.getAttribute('src')),'utf8'));
    assert.deepEqual(errors,[]);
    return { w, d:w.document, close() { for(let i=0;i<w.localStorage.length;i++) { const key=w.localStorage.key(i); saved[key]=w.localStorage.getItem(key); } w.close(); } };
}
let app = open('index.html');
assert.equal(app.d.querySelectorAll('.course-card').length,4);
app.d.querySelector('.notification-button').click(); assert.equal(app.d.querySelector('.notifications-panel').hidden,false);
app.d.querySelector('.favorite-button').click(); app.close();
app = open('courses.html','?q=javascript'); assert.equal(app.d.querySelectorAll('.course-card').length,1);
const query = app.d.querySelector('#query');
query.value='introuvableXYZ'; query.dispatchEvent(new app.w.Event('input',{bubbles:true})); assert.equal(app.d.querySelectorAll('.course-card').length,0);
query.value=''; query.dispatchEvent(new app.w.Event('input',{bubbles:true})); assert.equal(app.d.querySelectorAll('.course-card').length,8);
app.d.querySelector('#favorites-only').checked=true;
app.d.querySelector('#favorites-only').dispatchEvent(new app.w.Event('input',{bubbles:true})); assert.equal(app.d.querySelectorAll('.course-card').length,1);
app.close();
app=open('courses.html','?category=web'); assert.equal(app.d.querySelectorAll('.course-card').length,2); app.close();
for(const id of ['html-css','javascript','ui-ux','sql','python','react','flutter','ai']) {
    app=open('course-details.html','?id='+id); assert.ok(!app.d.querySelector('.course-details-layout').hidden);
    assert.ok(app.d.querySelector('.course-progress a').href.includes('course='+id)); app.close();
}
for(let i=0;i<12;i++) {
    app=open('learning.html','?course=html-css&lesson='+i);
    assert.ok(app.d.querySelector('#lesson-body').textContent.length>150);
    app.d.querySelector('#complete').click(); assert.ok(app.d.querySelector('#progress-label').textContent.startsWith(`${i+1} / 12`)); app.close();
}
app=open('course-details.html','?id=html-css'); assert.equal(app.d.querySelector('#course-progress').value,12); assert.equal(app.d.querySelector('.progress-line strong').textContent,'100%'); app.close();
app=open('dashboard.html'); assert.equal(app.d.querySelector('#global-percent').textContent,'100%');
assert.equal(app.d.querySelectorAll('#my-courses .course-card').length,1);
assert.ok(!app.d.querySelector('#activities').textContent.includes('Invalid Date'));
app.d.querySelector('#goal').value='3'; app.d.querySelector('#goal-form').dispatchEvent(new app.w.Event('submit',{cancelable:true}));
assert.equal(app.w.localStorage.getItem('eduflow.goal'),'3'); app.close();
app=open('learning.html','?course=html-css&lesson=11'); app.d.querySelector('#complete').click(); assert.ok(app.d.querySelector('#progress-label').textContent.includes('92%')); app.close();
app=open('learning.html','?course=sql&lesson=0'); app.close();
app=open('dashboard.html'); assert.equal(app.d.querySelector('#global-percent').textContent,'55%'); app.close();
for(const [file,query] of [['learning.html','?course=missing'],['learning.html','?lesson=999'],['course-details.html','?id=missing']]) {
    app=open(file,query); assert.ok(app.d.querySelector('[role=status]').textContent.includes('introuvable')); app.close();
}
app=open('learning.html','?course=javascript&lesson=0');
const setItem=app.w.Storage.prototype.setItem; app.w.Storage.prototype.setItem=()=>{throw Error('denied');};
app.d.querySelector('#complete').click(); assert.ok(app.d.querySelector('#feedback').textContent.includes('Impossible'));
app.w.Storage.prototype.setItem=setItem; app.close();
console.log('OK : cinq pages, filtres, favoris, huit cours, validation, reprise, statistiques, objectif et erreurs.');
