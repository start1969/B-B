/**
 * Service worker — offline support without stale pages.
 *
 * The rule that matters: HTML and configuration come from the network first,
 * so an edit reaches guests on the next load. Everything else (CSS, JS, images,
 * icons) is served from the cache first, because those files only change when
 * you bump CACHE below — and bumping it wipes the old one on activation.
 *
 * Bump CACHE whenever you change a file in SHELL. Content edits inside
 * config/ never need it.
 */

const CACHE = "lacrema-v5";

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

/* Install: fetch every shell file bypassing the browser's own HTTP cache,
   otherwise a stale copy can be promoted straight into the new cache. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll(SHELL.map((url) => new Request(url, { cache: "reload" })))
      )
      .then(() => self.skipWaiting())
  );
});

/* Activate: drop every older cache, then take over open pages immediately. */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* A message channel so a page can force the new worker to take over. */
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(request, copy));
      return response;
    })
    .catch(() =>
      caches.match(request).then((hit) => hit || caches.match("index.html"))
    );
}

function cacheFirst(request) {
  return caches.match(request).then(
    (hit) =>
      hit ||
      fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
        return response;
      })
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // fonts and other origins

  const isPage = request.mode === "navigate" || url.pathname.endsWith(".html");
  const isConfig = url.pathname.includes("/config/");

  event.respondWith(isPage || isConfig ? networkFirst(request) : cacheFirst(request));
});
