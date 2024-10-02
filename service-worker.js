
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-app-cache')
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll([
            '/',
            '/index.html',
            '/styles.css',
            '/index.js',
            '/manifest.json',
            '/assets/arrow-clockwise.svg',
            '/assets/arrow-down.svg',
            '/assets/arrow-up.svg',
            '/assets/check-lg.svg',
            '/assets/floppy-fill.svg',
            '/assets/pencil-square.svg',
            '/assets/trash3.svg',
            '/bootstrap.min.css'
          ]);
      })
      .catch((error) => {
        console.error('Error caching URLs:', error);
      })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.error('Error fetching:', error);
        return new Response('Network error', { status: 500 });
      })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-app-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
