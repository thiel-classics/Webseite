import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.join(root,'dist');
const html=await readFile(path.join(dist,'index.html'),'utf8');
const css=await readFile(path.join(dist,'styles.css'),'utf8');
const fonts=await readFile(path.join(dist,'assets/fonts.css'),'utf8');
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
const routes=new Set([...ids,'impressum','datenschutz','fahrzeug-anbieten']);
const failures=[];
for(const [,link]of html.matchAll(/\bhref="(#[^"]+)"/g))if(!routes.has(link.slice(1)))failures.push(`Unbekanntes Linkziel: ${link}`);
for(const [,file]of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)){
  try{await access(path.resolve(dist,file));}catch{failures.push(`Fehlende Datei: ${file}`);}
}
for(const [,file]of fonts.matchAll(/url\(\.\/([^)]+)\)/g)){
  try{await access(path.join(dist,'assets',file));}catch{failures.push(`Fehlende Schrift: ${file}`);}
}
for(const file of ['app.js','config.js']){
  try{new vm.Script(await readFile(path.join(dist,file),'utf8'),{filename:file});}
  catch(error){failures.push(error.message);}
}
if(!html.includes('lang="de"'))failures.push('Sprache fehlt');
if(!html.includes('name="description"'))failures.push('Beschreibung fehlt');
if(!css.includes('prefers-reduced-motion'))failures.push('Reduzierte Bewegung fehlt');
if(!/formEndpoint:\s*null/.test(await readFile(path.join(dist,'config.js'),'utf8')))failures.push('Der reale Versand darf ohne Empfänger nicht freigegeben sein.');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({result:'passed',links:'valid',localAssets:'present',javascript:'valid',assets:(await readdir(path.join(dist,'assets'))).length}));
