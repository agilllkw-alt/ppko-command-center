self.addEventListener('install', (e) => {
  console.log('SW terpasang');
});

self.addEventListener('fetch', (e) => {
  // Handler fetch kosong agar syarat PWA Chrome terpenuhi
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
