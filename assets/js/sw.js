var CACHE = "bns-assets-v3";
var PRE = [
  "../css/core.css",
  "../fonts/inter-400.woff2",
  "./app.js",
  "./base.js"
];
self.addEventListener("install", function (e) {
 e.waitUntil(
  caches.open(CACHE).then(function (c) {
   return Promise.all(PRE.map(function (u) {
    return c.add(new URL(u, self.location.href).href).catch(function () {});
   }));
  }).then(function () { return self.skipWaiting(); })
 );
});
self.addEventListener("activate", function (e) {
 e.waitUntil(
  caches.keys().then(function (keys) {
   return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); })
 );
});
self.addEventListener("fetch", function (e) {
 if (e.request.method !== "GET") return;
 var url = e.request.url;
 if (url.indexOf("/captcha") !== -1 || url.indexOf("/api/") !== -1) return;
 if (url.indexOf("/assets/") === -1 && url.indexOf("robotassets") === -1) return;
 e.respondWith(
  caches.match(e.request).then(function (hit) {
   if (hit) return hit;
   return fetch(e.request).then(function (res) {
    if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
     var copy = res.clone();
     caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    }
    return res;
   }).catch(function () { return hit || Response.error(); });
  })
 );
});
