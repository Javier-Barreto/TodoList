const CACHE_TODOLIST = 'my-cache'

self.addEventListener('install', e => {
  console.log('installing service worker!!')

  e.waitUntil(
    caches.open(CACHE_TODOLIST).then(async cache => {
      await cache.addAll([
        '/index',
      ])
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', event => {
  console.log('activating service worker')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  console.log(`fetching ${e.request.url}`)

  if (navigator.onLine) {
    let fetchRequest = event.request.clone()

    return fetch(fetchRequest).then(
      (response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        var responseToCache = response.clone()

        caches.open(CACHE_TODOLIST)
          .then((cache) => {
            cache.put(event.request, responseToCache)
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