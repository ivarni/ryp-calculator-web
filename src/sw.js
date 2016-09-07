const CACHE_NAME = 'ryp-cache-v1';
const urlsToCache = serviceWorkerOption.assets;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.indexOf('localhost') !== -1) {
        return;
    }
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest)
                    .then(response => {
                        if (!response ||
                                response.status !== 200 ||
                                response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [];

    event.waitUntil(
        caches.keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            )
    );
});
