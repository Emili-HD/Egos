// static/custom-sw.js

self.__precacheManifest = (self.__precacheManifest || []).concat([
  { url: '/', revision: '1' },
  // puedes agregar más archivos que quieras precargar aquí
]);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// Add custom handling of fallback
workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/'));
