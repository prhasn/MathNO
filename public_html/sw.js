/** Cache name */
const cacheName = `mathno_calculator`;

// Save app resources (on install)
self.oninstall = e => e.waitUntil(
	caches.open(cacheName).then(files =>
		files.addAll([
			`./index.html?25031203`,
			`./manifest.json?25031203`,
			`./sw.js`
		]).then(() => self.skipWaiting()))
);

// Delete old cached files
self.onactivate = e => e.waitUntil(
	caches.keys().then(files => Promise.all(
		files.map(f =>
			f !== cacheName && caches.delete(f)
		)
	))
);

// Get cached files (if available)
self.addEventListener(`fetch`, e => e.respondWith(
	fetch(e.request)
		.then(res => {
			const c = res.clone();
			caches.open(cacheName)
				.then(f => f.put(e.request, c));
			return res;
		}).catch(
			err => caches.match(e.request)
				.then(res => res)
		)
));