/* =====================================================================
   SmartGrow website — service worker

   STRATEGY: NETWORK FIRST.
   Every request goes to the network first, so whatever you push to
   GitHub is what visitors see. The cache is only a fallback for when
   someone is offline. This is deliberate: a cache-first worker is the
   usual reason people keep seeing an old version of a site for days.

   If you ever change this file, bump CACHE below (v1 -> v2). That
   forces every visitor's browser to throw away the old cache.
   ===================================================================== */

const CACHE = 'smartgrow-site-v2';

// Files worth having available offline.
const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})          // never block install on a failed fetch
  );
  self.skipWaiting();           // new version takes over immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle our own GET requests (pages, styles.css, images/).
  // Google Fonts go straight to the network — caching cross-origin
  // responses here would fail and could break the page.
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE)
          .then((cache) => cache.put(req, copy))
          .catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
