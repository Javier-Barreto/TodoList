const CACHE_TODOLIST = 'my-cache'

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_TODOLIST).then(async cache => {
      await cache.addAll([
        '/index.html'
      ])
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  if (navigator.onLine) {
    let fetchRequest = e.request.clone()

    return fetch(fetchRequest).then(
      (response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        var responseToCache = response.clone()

        caches.open(CACHE_TODOLIST)
          .then((cache) => {
            cache.put(e.request, responseToCache)
          })

        return response;
      }
    )
  } else {
    e.respondWith(
      caches.match(e.request)
        .then((response) => {
          if (response) {
            return response
          }
        })
    )
  }
})