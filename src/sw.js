/* global serviceWorkerOption */
import 'babel-polyfill';

/* eslint-disable no-console */
const log = console.log || (f => f);
/* eslint-enable no-console */

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

self.addEventListener('install', async () => {
    log('Installing serviceworker');

    const cache = await caches.open(cacheName);
    log(`Opened cache named ${cacheName}`);

    await cache.addAll(urlsToCache);
    log(`Cached urls: ${urlsToCache.join(' - ')}`);

    if (self.skipWaiting) {
        log('Skip waiting and activate immediately');
        self.skipWaiting();
    }
    log('Finished installing serviceworker');
});

self.addEventListener('activate', async () => {
    log('Activating serviceworker');

    const cacheNames = await caches.keys();
    log(`Found caches named: ${cacheNames.join(',')}`);

    await Promise.all(cacheNames.map((name) => {
        if (name !== cacheName) {
            log(`Deleting cache named ${name}`);
            return caches.delete(cacheName);
        }
        return Promise.resolve();
    }));

    if (self.clients && self.clients.claim) {
        log('Claiming this worker as the active worker');
        self.clients.claim();
    }

    log('Finished activating serviceworker');
});


self.addEventListener('fetch', async (event) => {
    event.respondWith(new Promise(async (resolve) => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
            log(`Returning ${event.request.url} from cache`);
            resolve(cachedResponse);
        }
        const liveResponse = await fetch(event.request);
        resolve(liveResponse);
    }));
});
