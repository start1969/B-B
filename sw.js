/* Offline-first shell. Bump CACHE when you change any listed file. */
const CACHE = "lacrema-v3";

const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/css/app.css",
  "assets/js/app.js",
  "assets/js/i18n.js",
  "assets/js/icons.js",
  "assets/img/logo.png",
  "assets/img/logo-light.png",
  "assets/img/entrance.jpg",
  "config/lacrema.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network-first for the config so edits reach guests; cache-first otherwise. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const isConfig = e.request.url.includes("/config/");

  if (isConfig) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request))
  );
});
