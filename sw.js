const staticCacheName = 'Matuto Delivery'

this.addEventListener('install', event => {
    this.skipWaiting();

    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll([
                'https://matuto-delivery-beta.bubbleapps.io/',
                'https://matutodelivery.github.io/app/manifest.json',

            ])
        })
    )
})

this.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName.startsWith('Matuto'))
                .filter(cacheName => cacheName !== staticCacheName)
                .map(cacheName => caches.delete(cacheName))
            )
        })
    )
})

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request)
        })
        .catch(() => {
            return caches.match('https://matuto-delivery-beta.bubbleapps.io/')
        })
    )
})
