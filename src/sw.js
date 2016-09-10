import 'babel-polyfill';

const LOG = console.log || (f => f);
const BLACKLISTED_URLS = [
    'http://localhost:3000/__webpack_hmr',
    'http://localhost:3000/app.js.map',
];

let cacheName = String(new Date().getTime());
const jsFileName = serviceWorkerOption.assets.find(a => a.endsWith('.js'));
const match = jsFileName.match(/^.+\.(\w+)\.js$/);
if (match && match[1]) {
    cacheName = match[1];
}

const urlsToCache = [
    ...serviceWorkerOption.assets,
    '/calculator',
    '/diary',
    '/',
];

self.addEventListener('install', async function installSW(event) {
    LOG('Installing serviceworker');

    const cache = await caches.open(cacheName);
    LOG(`Opened cache named ${cacheName}`);

    await cache.addAll(urlsToCache);
    LOG(`Cached urls: ${urlsToCache.join(' - ')}`);

    if (self.skipWaiting) {
        LOG('Skip waiting and activate immediately');
        self.skipWaiting();
    }
    LOG('Finished installing serviceworker');
});

self.addEventListener('activate', async function activateSW(event) {
    LOG('Activating serviceworker');

    const cacheNames = await caches.keys();
    LOG(`Found caches named: ${cacheNames.join(',')}`);

    await Promise.all(cacheNames.map(name => {
        if (name !== cacheName) {
            LOG(`Deleting cache named ${name}`)
            return caches.delete(cacheName);
        }
        return Promise.resolve();
    }));

    if (self.clients && self.clients.claim) {
        LOG('Claiming this worker as the active worker');
        self.clients.claim();
    }

    LOG('Finished activating serviceworker');
});


self.addEventListener('fetch', async function fetchResource(event) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
        LOG(`Returning ${event.request.url} from cache`);
        return cachedResponse;
    }

    const clonedRequest = event.request.clone();
    const liveResponse = await fetch(clonedRequest);
    if (!liveResponse ||
            liveResponse.status !== 200 ||
            liveResponse.type !== 'basic' ||
            BLACKLISTED_URLS.includes(event.request.url)) {
        return liveResponse;
    }

    const clonedResponse = liveResponse.clone();
    const cache = await caches.open(cacheName);
    LOG(`Adding ${event.request.url} to cache ${cacheName}`);
    cache.put(event.request, clonedResponse);
    LOG(`Added ${event.request.url} to cache ${cacheName}`);

    return liveResponse;
});
