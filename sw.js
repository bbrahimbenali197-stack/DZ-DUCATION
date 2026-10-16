const CACHE='taalim-dz-plus-v3';
const SHELL=[
 './','./index.html','./access.html','./levels.html','./library.html','./practice.html','./exam.html',
 './flashcards.html','./planner.html','./parents.html','./sources.html','./help.html',
 './gamification.html','./games.html','./pathway.html','./ai-tutor.html','./worksheet-maker.html','./offline.html',
 './app.js','./features.js','./auth.js','./resources.js','./resources.json','./icon.svg','./manifest.webmanifest'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('taalim-dz-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET') return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin) return;
 event.respondWith(caches.match(event.request).then(cached=>{
  if(cached) return cached;
  return fetch(event.request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});}
   return response;
  }).catch(()=>caches.match('./offline.html').then(fallback=>fallback||caches.match('./index.html')));
 }));
});
