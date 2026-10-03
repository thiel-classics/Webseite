import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const dist=fileURLToPath(new URL('../dist/',import.meta.url));
const names=(await readdir(dist)).filter(file=>file.endsWith('.html'));
const required=['index.html','ueber-uns.html','zweiraeder.html','automobile.html','ankauf.html','bestand.html','impressum.html','datenschutz.html'];
const failures=[];
const documents=new Map();
for(const name of names)documents.set(name,await readFile(path.join(dist,name),'utf8'));
for(const name of required)if(!documents.has(name))failures.push(`Fehlende Seite: ${name}`);
const idsByPage=new Map([...documents].map(([name,html])=>[name,new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]))]));
let referenceNav='';
async function localLink(from,link){
  if(/^(?:https?:|mailto:|tel:|data:)/.test(link))return;
  const url=new URL(link,`https://local.test/${from}`);
  const file=decodeURIComponent(url.pathname.slice(1));
  const resolved=path.resolve(dist,file);
  if(!resolved.startsWith(path.resolve(dist)+path.sep)){failures.push(`${from}: Pfad verlässt dist: ${link}`);return;}
  try{await access(resolved);}catch{failures.push(`${from}: Fehlendes Linkziel ${link}`);return;}
  if(url.hash&&idsByPage.has(file)&&!idsByPage.get(file).has(decodeURIComponent(url.hash.slice(1))))failures.push(`${from}: Unbekannter Anker ${link}`);
}
for(const [name,html]of documents){
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  if(ids.length!==new Set(ids).size)failures.push(`${name}: Doppelte IDs`);
  if(!html.includes('lang="de"')||!html.includes('name="description"'))failures.push(`${name}: Sprache/Metadaten fehlen`);
  if([...html.matchAll(/<h1[\s>]/g)].length!==1)failures.push(`${name}: Genau eine Hauptüberschrift erforderlich`);
  for(const[,link]of html.matchAll(/\b(?:src|href)="([^"]+)"/g))await localLink(name,link);
  for(const[,set]of html.matchAll(/\bsrcset="([^"]+)"/g))for(const entry of set.split(','))await localLink(name,entry.trim().split(/\s+/)[0]);
  for(const[img]of html.matchAll(/<img\b[^>]*>/g))if(!/\balt="[^"]*"/.test(img)||!/\bwidth="\d+"/.test(img)||!/\bheight="\d+"/.test(img))failures.push(`${name}: Bild ohne Alttext oder Abmessungen`);
  const nav=html.match(/<nav class="desktop-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1]||'';
  const mobile=html.match(/<nav class="mobile-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1]||'';
  const normalized=nav.replace(/ class="active" aria-current="page"/g,'');
  if(!referenceNav)referenceNav=normalized;
  if(normalized!==referenceNav||nav!==mobile)failures.push(`${name}: Navigation inkonsistent`);
  if(/href="#/.test(nav))failures.push(`${name}: Navigation verwendet Abschnittsanker`);
  if(required.slice(0,6).includes(name)&&!nav.includes(`href="./${name}" class="active" aria-current="page"`))failures.push(`${name}: Aktive Seite fehlt`);
}
for(const file of ['app.js','config.js','bestand.js','bestand-daten.js'])try{new vm.Script(await readFile(path.join(dist,file),'utf8'),{filename:file});}catch(error){failures.push(error.message);}
const css=await readFile(path.join(dist,'styles.css'),'utf8');
const fonts=await readFile(path.join(dist,'assets/fonts.css'),'utf8');
for(const[,font]of fonts.matchAll(/url\(\.\/([^)]+)\)/g))try{await access(path.join(dist,'assets',font));}catch{failures.push(`Fehlende Schrift ${font}`);}
const app=await readFile(path.join(dist,'app.js'),'utf8');
for(const[,name]of app.matchAll(/\['((?:porsche|puch|lifestyle)[a-z-]*)','/g))try{await access(path.join(dist,'assets',`${name}-1440.webp`));}catch{failures.push(`Fehlendes Galeriebild ${name}`);}
if(!css.includes('prefers-reduced-motion')||!app.includes('prefers-reduced-motion'))failures.push('Reduzierte Bewegung fehlt');
if(/transition\s*:\s*all\b/.test(css))failures.push('transition:all vermeiden');
if(/\b(?:localStorage|sessionStorage)\s*[.(]/.test(app))failures.push('Formulardaten dürfen nicht dauerhaft im Browser gespeichert werden');
const form=documents.get('ankauf.html')||'';
if(!form.includes('action="https://formsubmit.co/thieltrading@web.de"')||!form.includes('method="POST"')||!form.includes('enctype="multipart/form-data"'))failures.push('Formularversand falsch konfiguriert');
for(const id of ['firstName','lastName','email','phone','manufacturer','model','year','condition','location','price','description','photos','consent'])if(!form.includes(`id="${id}"`))failures.push(`Formularfeld fehlt: ${id}`);
if(!form.includes('name="Fahrzeugart"'))failures.push('Fahrzeugart fehlt');
if(form.includes('name="_captcha" value="false"'))failures.push('Spamschutz nicht deaktivieren');
if(!form.includes('target="_blank" rel="noopener"'))failures.push('Datenschutzhinweise sollen Formulareingaben erhalten');
const context={window:{}};vm.runInNewContext(await readFile(path.join(dist,'config.js'),'utf8'),context);
if(context.window.THIEL_CONFIG.formEndpoint!=='https://formsubmit.co/thieltrading@web.de')failures.push('Formular-Action und Konfiguration müssen zusammenpassen');
// Validate maintainable vehicle data and local gallery paths, not just script syntax.
const inventoryContext={window:{}};
try{
  vm.runInNewContext(await readFile(path.join(dist,'bestand-daten.js'),'utf8'),inventoryContext);
  const inventory=inventoryContext.window.THIEL_INVENTORY;
  if(!inventory||!Array.isArray(inventory.vehicles))throw new Error('Bestandsdaten fehlen');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inventory.contact?.email)||!/^\+\d{7,15}$/.test(inventory.contact?.tel)||!inventory.contact?.phone)throw new Error('Bestandskontakt ungültig');
  const vehicleIds=new Set();
  for(const vehicle of inventory.vehicles){
    if(!/^[a-z0-9-]+$/.test(vehicle.id)||vehicleIds.has(vehicle.id))failures.push(`Bestand: ungültige/doppelte ID ${vehicle.id}`);
    vehicleIds.add(vehicle.id);
    if(!['automobile','zweiraeder'].includes(vehicle.category))failures.push(`Bestand: unbekannte Kategorie ${vehicle.id}`);
    if(!vehicle.name||!vehicle.teaser||typeof vehicle.example!=='boolean'||(!vehicle.example&&!vehicle.availability))failures.push(`Bestand: Pflichtangaben fehlen bei ${vehicle.id}`);
    if(!Array.isArray(vehicle.facts)||!vehicle.facts.length||vehicle.facts.some(f=>!f.label||!f.value))failures.push(`Bestand: Eckdaten fehlen bei ${vehicle.id}`);
    if(!Array.isArray(vehicle.description)||!vehicle.description.length||vehicle.description.some(p=>typeof p!=='string'||!p.trim()))failures.push(`Bestand: Beschreibung fehlt bei ${vehicle.id}`);
    if(!Array.isArray(vehicle.images)||!vehicle.images.length)failures.push(`Bestand: Bild fehlt bei ${vehicle.id}`);
    for(const image of vehicle.images||[]){
      if(!image.alt||!Number.isInteger(image.width)||!Number.isInteger(image.height)||image.width<1||image.height<1)failures.push(`Bestand: Bildbeschreibung/Abmessungen fehlen bei ${vehicle.id}`);
      for(const source of [image.src,image.thumb]){
        if(typeof source!=='string'||!source.startsWith('./assets/'))failures.push(`Bestand: lokaler Bildpfad erwartet bei ${vehicle.id}`);
        else await localLink('bestand.html',source);
      }
    }
  }
}catch(error){failures.push(`Bestand: ${error.message}`);}
const stock=documents.get('bestand.html')||'';
if(!stock.includes('<dialog')||!stock.includes('aria-labelledby="stock-dialog-title"'))failures.push('Bestand: beschrifteter Dialog fehlt');
for(const filter of ['alle','automobile','zweiraeder'])if(!stock.includes(`data-stock-filter="${filter}"`))failures.push(`Bestand: Filter fehlt: ${filter}`);
const stockCss=await readFile(path.join(dist,'bestand.css'),'utf8');
if(!stockCss.includes('prefers-reduced-motion'))failures.push('Bestand: reduzierte Bewegung fehlt');
for(const[,url]of stockCss.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g))await localLink('bestand.html',url);

if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({result:'passed',pages:names.length,navigation:'consistent',links:'valid',localAssets:'present',javascript:'valid',form:'multipart POST configured; recipient activation and live delivery still require manual verification'},null,2));
