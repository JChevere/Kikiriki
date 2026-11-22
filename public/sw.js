/* Kikirikí offline worker.
   The whole app is one HTML file, so caching it (plus icons) makes it work with no signal.
   Bump VERSION whenever index.html changes so phones pick up the new copy. */
const VERSION = "kikiriki-2026-11-22a";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  // The page itself: try the network first (to get updates), fall back to the cached copy offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }
  // Icons and manifest: cache first.
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
  })));
});

self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });
