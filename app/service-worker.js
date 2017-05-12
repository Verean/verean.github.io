var cacheName = 'PWA-v1';
var filesToCache = [
	//'./index.html'
	// './js/app.js',
	// './icons/pwa-256x256.png'
];

self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Install event fired.');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell...');
			return cache.addAll(filesToCache).then(function() {
				self.skipWaiting();
			});
		})
	);
});

self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activate event fired.');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache...', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch event fired.', e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response) {
			if (response) {
				console.log('[ServiceWorker] Retrieving from cache...');
				return response;
			}
			console.log('[ServiceWorker] Retrieving from URL...');
			return fetch(e.request).catch(function(e){
				console.log('[ServiceWorker] Fetch request failed!');
			});
		})
	);
});
