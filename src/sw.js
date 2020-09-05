const cacheName = 'v1';
const dynamicCache = 'v2';

const cacheAssets = [
    'index.html',
    'style.css',
    'main.js',
    'icons',
    'images'
]


// call install event


self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(cacheAssets);
        })

        .then(() => self.skipWaiting())
    )
})


self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheName && dynamicCache)
                .map(key => caches.delete(key))
                )
        })
    )
});


self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request).then(cacheRes =>{
            return cacheRes || fetch(e.request).then(fetchRes =>{
                return caches.open(dynamicCache).then(cache =>{
                    cache.put(e.request.url, fetchRes.clone());
                    return fetchRes;
                })
            })
        })
    )
})