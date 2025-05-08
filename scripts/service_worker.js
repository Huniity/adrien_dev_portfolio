const CACHE_NAME = "nah-later-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles/portfolio.css",
    "/styles/portfolio_form.css",
    "/scripts/portfolio.js",
    "/scripts/portfolio_error.js",
    "/images/favicon.png",
    "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
];


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {

            return response || fetch(event.request);
        })
    );
});


self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});