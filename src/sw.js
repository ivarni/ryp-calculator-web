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
    '/fonts/roboto-v15-latin-regular.woff2',
    '/fonts/roboto-v15-latin-500.woff2',
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
    event.respondWith(new Promise(async function(resolve) {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
            LOG(`Returning ${event.request.url} from cache`);
            resolve(cachedResponse);
        }
        const liveResponse = await fetch(event.request);
        resolve(liveResponse);
    }));
});
