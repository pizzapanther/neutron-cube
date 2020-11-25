const RELEASE = '{release}';
const CACHE_NAME = `release-${RELEASE}`;
const CORE_FILES = ["{core-files}"];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('CACHING', CACHE_NAME);
        return cache.addAll(CORE_FILES);
      })
  );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
    );
});

function clear_all_cache (event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(cname) {
          console.log('Clearing Cache: ', cname);
          return caches.delete(cname);
        })
      );
    })
  );
}

self.addEventListener('message', function (event) {
  console.log("SW Received Message: ", event);

  if (event.data.task == 'clear') {
    clear_all_cache(event);
    event.ports[0].postMessage('cleared');
  }
});
