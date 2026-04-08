var CACHE = "tax-checker-v1";
var ASSETS = ["./", "./index.html", "./style.css", "./script.js", "./data/questions.js", "./data/results.js", "./favicon.svg", "./manifest.json"];

self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
});

self.addEventListener("fetch", function(e) {
  e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); }));
});
