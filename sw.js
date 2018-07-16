let cacheWhitelist = ['cache-and-update-v1'];
let CACHE = cacheWhitelist[0];

/* Cache static assets on install */
self.addEventListener('install', function(evt) {
	console.log('The service worker is being installed.');
	
	evt.waitUntil(precache());
});

/* On activation, delete any deprecated caches */
self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


/** If requested asset is cached, serve it; 
 * if not, fetch from network and then cache */
/* self.addEventListener('fetch', function(evt) {
	console.log('The service worker is serving the asset.');
	
	evt.respondWith(fromCache(evt.request).catch((error) => {
    console.log(error);
  }));

	evt.waitUntil(update(evt.request));
}); */



self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request);
	})
	.catch(err => console.log(err, event.request))
  );
});

/* Cache static assets on install */
function precache() {
  return caches.open(CACHE).then(cache => {
    return cache.addAll([
			'/',
			'/index.html',
			'/restaurant.html',
			'/data/restaurants.json',
			'/css/styles.css',
			'/sw/js.js',
			'/sw.js',
			'/js/main.js',
			'/js/restaurant_info.js',
			'/js/dbhelper.js',
			'/img/1.jpg',
			'/img/2.jpg',
			'/img/3.jpg',
			'/img/4.jpg',
			'/img/5.jpg',
			'/img/6.jpg',
			'/img/7.jpg',
			'/img/8.jpg',
			'/img/9.jpg',
			'/img/10.jpg'
    ]).then(() => self.skipWaiting());
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request, { ignoreSearch: true }).then(function (matching) {
      return matching || fetch(request); //Promise.reject('no-match'); 
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}