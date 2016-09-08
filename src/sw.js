const CACHE_NAME = 'ryp-cache-v1';
let cacheName = new Date().getTime();

const jsFileName = serviceWorkerOption.assets.find(a => a.endsWith('.js'));
const match = jsFileName.match(/^.+\.(\w+)\.js$/);
if (match && match[1]) {
    cacheName = match[1];
}

const urlsToCache = [
    ...serviceWorkerOption.assets,
    '/calculator',
    '/diary',
];

self.addEventListener('install', event => {
console.log('install')
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.indexOf('localhost') !== -1) {
        //return;
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
                        caches.open(cacheName)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [cacheName];
console.log('activate')

    event.waitUntil(
        caches.keys()
            .then(cacheNames =>
                Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            console.log(`Deleting cache ${cacheName}`);
                            return caches.delete(cacheName);
                        }
                    })
                )
            )
    );
});
