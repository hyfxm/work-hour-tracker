const CACHE = 'wht-pwa-v10';
const ASSETS = ['index.html', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest', 'jsqr.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // 导航请求（打开页面）优先返回缓存的 index.html，离线也能开
  if (e.request.mode === 'navigate') {
    e.respondWith(caches.match('index.html').then((r) => r || fetch(e.request)));
    return;
  }
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
