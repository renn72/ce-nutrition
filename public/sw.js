// public/sw.js

// Define a cache name for your application assets
const CACHE_NAME = 'my-pwa-cache-v1';

// List of URLs to cache when the service worker is installed
// Add your static assets, common routes, etc., here.
// Make sure to include your manifest.json as well!
const urlsToCache = [
  '/', // Cache the homepage
  // '/index.html', // If you have an index.html, although Next.js typically doesn't use it directly
  '/manifest.json', // Your Web App Manifest
  // Add paths to your static assets (CSS, JS bundles, images) that you want to cache
  // You might need to adjust these paths based on your Next.js build output
  // For example, if you have a common CSS file:
  // '/_next/static/css/main.css', // This path might change with Next.js versions
  // It's generally better to rely on dynamic caching for Next.js generated assets
];

// ----------------------------------------------------------------------
// Installation Event: Caches static assets
// This event is fired when the service worker is installed for the first time
// or when a new version of the service worker is detected.
// ----------------------------------------------------------------------
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    // Open the cache and add all specified URLs to it
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.error('[Service Worker] Failed to cache during install:', err);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// ----------------------------------------------------------------------
// Activation Event: Cleans up old caches
// This event is fired when the service worker is activated.
// It's a good place to delete old caches.
// ----------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Keep the current cache
        }).filter(Boolean) // Remove null entries
      );
    })
  );
  // Ensure the service worker takes control of clients immediately
  self.clients.claim();
  console.log('[Service Worker] Activated and claimed clients.');
});

// ----------------------------------------------------------------------
// Fetch Event: Intercepts network requests and serves from cache or network
// This event is fired every time the browser requests a resource.
// ----------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  // We only want to handle http(s) requests, not chrome-extension:// or other protocols
  if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('[Service Worker] Serving from cache:', event.request.url);
          return response;
        }

        // No cache hit - fetch from network
        console.log('[Service Worker] Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = networkResponse.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
            console.log('[Service Worker] Cached new resource:', event.request.url);
          }).catch(err => {
            console.warn('[Service Worker] Failed to cache fetched resource:', err);
          });

          return networkResponse;
        }).catch(() => {
          // Network request failed, try to serve an offline page if available
          // For a simple setup, you might just return an empty response or an error page
          console.error('[Service Worker] Network request failed for:', event.request.url);
          // Example: return caches.match('/offline.html'); if you have an offline page
          return new Response('You are offline.', { status: 503, statusText: 'Service Unavailable' });
        });
      })
    );
  }
});

// Optional: Handle push notifications or background sync if needed
// self.addEventListener('push', (event) => { /* ... */ });
// self.addEventListener('sync', (event) => { /* ... */ });
