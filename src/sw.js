const CACHE_NAME = 'ryp-cache-v1';
const urlsToCache = serviceWorkerOption.assets;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
