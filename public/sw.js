// Define a cache name for your assets. This helps in versioning your cache.
const CACHE_NAME = 'my-nextjs-pwa-cache-v1';

// List the files that should be cached during the 'install' event.
// These are typically your essential app shell files.
const urlsToCache = [
  '/', // The root path of your application
];

// -------------------------------------------------------------------------
// Install Event: Caching the App Shell
// -------------------------------------------------------------------------
// The 'install' event is fired when the service worker is first registered.
// It's a good place to precache your app's static assets (app shell).
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // waitUntil ensures the service worker doesn't install until the promise resolves.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        // Add all specified URLs to the cache.
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache during install:', error);
      })
  );
  // Forces the waiting service worker to become the active service worker.
  // This allows the updated service worker to control existing clients immediately.
  self.skipWaiting();
});

// -------------------------------------------------------------------------
// Activate Event: Cleaning up Old Caches
// -------------------------------------------------------------------------
// The 'activate' event is fired when the service worker starts controlling
// the page. It's used to clean up old caches.
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // waitUntil ensures the activation doesn't complete until the promise resolves.
  event.waitUntil(
    // Get all cache keys (cache names).
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // If a cache name doesn't match the current CACHE_NAME, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Old caches cleaned up.');
      // After activation, claim clients to immediately control open pages.
      return self.clients.claim();
    }).catch((error) => {
      console.error('Service Worker: Failed to activate or clean caches:', error);
    })
  );
});

// -------------------------------------------------------------------------
// Fetch Event: Serving Assets from Cache or Network
// -------------------------------------------------------------------------
// The 'fetch' event intercepts network requests.
// This is where you implement caching strategies.
self.addEventListener('fetch', (event) => {
  // Check if the request is for a network-only asset (e.g., API calls, non-GET requests).
  // For these, we don't want to serve from cache directly.
  if (event.request.method !== 'GET') {
    return; // Do not cache non-GET requests
  }

  // Respond with a cached asset if available, otherwise fetch from the network.
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // If a cached response is found, return it.
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // If no cached response, fetch from the network.
        console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response.
            // Do not cache opaque responses (e.g., cross-origin requests without CORS enabled).
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream and can only be consumed once.
            const responseToCache = response.clone();

            // Open the cache and add the new response.
            caches.open(CACHE_NAME)
              .then((cache) => {
                console.log('Service Worker: Caching new resource:', event.request.url);
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.error('Service Worker: Failed to cache new resource:', error);
              });

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed for:', event.request.url, error);
            // You can provide a fallback response here for offline situations,
            // e.g., serving an offline page.
            // Example: return caches.match('/offline.html');
            // For now, we'll just let the browser handle the network error.
            throw error;
          });
      })
  );
});


