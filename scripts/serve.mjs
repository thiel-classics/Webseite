import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let pathname=decodeURIComponent(url.pathname);
  // Local-only QA receivers: no data is persisted and these routes are never published.
  const qa=pathname.match(/^\/__qa\/(success|error)\//);
  if(qa){
    if(pathname.endsWith('/config.js')){
      res.writeHead(200,{'Content-Type':'text/javascript','Cache-Control':'no-store'});
      res.end(`window.THIEL_CONFIG={formEndpoint:'/__qa/${qa[1]}/offer',legalReady:true};`);return;
    }
    if(pathname.endsWith('/offer')&&req.method==='POST'){
      req.resume();
      req.on('end',()=>setTimeout(()=>{res.writeHead(qa[1]==='success'?200:503,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:qa[1]==='success'}));},1800));return;
    }
    pathname=pathname.slice(qa[0].length-1);
  }
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root)){res.writeHead(403).end();return;}
  await stat(file);
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});
  res.end(await readFile(file));
 }catch{res.writeHead(404).end('Nicht gefunden');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
