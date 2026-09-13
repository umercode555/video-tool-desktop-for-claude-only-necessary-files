const CACHE = "hook-showcase-v1";
const SHELL = ["./index.html", "./app.js", "./styles.min.css", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// App-shell files: cache-first (so it opens instantly + offline).
// Everything else (CDN libs, fonts): network-first, no caching of failures.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  const isShell = url.origin === location.origin && SHELL.some((s) => url.pathname.endsWith(s.replace("./", "")));
  if (isShell) {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
  }
});
