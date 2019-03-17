importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0d97e1357eaffacc0f91.js",
    "revision": "08545910366f72869087bbdcb7c977a5"
  },
  {
    "url": "/_nuxt/24cbf6d29391db128681.js",
    "revision": "456b1b580d9342f4bc6a4670b52611a6"
  },
  {
    "url": "/_nuxt/410e3f3bb59c18c2671d.js",
    "revision": "99a9512c81cd76e6d98bfbbe2ef9c89f"
  },
  {
    "url": "/_nuxt/57a1e3b3603dc3483934.js",
    "revision": "294ef815b42e2b529a0864eb354d98a8"
  },
  {
    "url": "/_nuxt/8dbc6a9f376f037ef323.js",
    "revision": "26a232b1f438ed64a430ecba802f776c"
  },
  {
    "url": "/_nuxt/9373e3c574b1bdfb0e04.js",
    "revision": "df55eab8be9abc5afe584d1197c27c3d"
  },
  {
    "url": "/_nuxt/999d15cef90a655a2476.js",
    "revision": "b077033485afdfeb8a771bb2f8ee3fdc"
  },
  {
    "url": "/_nuxt/a3d967a483d227661b2e.js",
    "revision": "027bddb99edd5b2eb5dfb7b43520bf72"
  },
  {
    "url": "/_nuxt/d36f0ef574aada0d0781.js",
    "revision": "b7f4d66fb991ed3aab74f665b9d421b2"
  },
  {
    "url": "/_nuxt/ee821f5fc66f09d3b465.js",
    "revision": "5f288a90d3a59f7d83cc2e251f8495f0"
  },
  {
    "url": "/_nuxt/f55ee9caa5ccb9762b8f.js",
    "revision": "1df73dce88cde2c4dbd2ee855a9a0051"
  }
], {
  "cacheId": "JulianBeck",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
