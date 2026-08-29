const CACHE_NAME = 'carade-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo-unhas.png',
  './logo-bem.png',
  './logo-gowa.png'
];

// Tahap Instalasi: Menyimpan file ke dalam cache HP
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Tahap Aktivasi: Membersihkan cache lama jika ada update
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Strategi Fetch: Ambil dari internet dulu, jika offline ambil dari cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
