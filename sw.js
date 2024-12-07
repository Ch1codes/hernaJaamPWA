const CACHE_NAME = 'herna-jaam-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/styles1.js',
  '/help.html',
  '/help.css',
  '/details.html',
  '/details.css',
  '/ar.html',
  '/banner.png',
  '/operator.png',
  'https://cdn.emailjs.com/dist/email.min.js',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  'https://aframe.io/releases/0.9.2/aframe.min.js',
  'https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
