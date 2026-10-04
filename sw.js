const V='album-v1';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='album-rt').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin===location.origin){e.respondWith(caches.open(V).then(async c=>{const h=await c.match(r,{ignoreSearch:true});const n=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>h);return h||n}));return}
if(/fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net/.test(u.host)){e.respondWith(caches.open('album-rt').then(async c=>{const h=await c.match(r);const n=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>h);return h||n}))}});
