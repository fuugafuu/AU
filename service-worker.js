const CACHE_NAME = "undertale10th-offline-v3";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./runner.js",
  "./runner.wasm",
  "./runner.data",
  "./game.unx",
  "./audio-worklet.js",
  "./icon-48.png",
  "./icon-192.png",
  "./icon-512.png"
];

async function cacheOnWifi() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const isWifi = connection && (connection.type === "wifi" || connection.effectiveType === "wifi");
  if (isWifi) {
    const cache = await caches.open(CACHE_NAME);
    console.log("Wi-Fi 接続を検出 → ファイルをダウンロードしてキャッシュします");
    await cache.addAll(FILES_TO_CACHE);
  } else {
    console.log("Wi-Fi ではないため、新規ダウンロードを行いません");
  }
}

self.addEventListener("install", event => {
  event.waitUntil(cacheOnWifi());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.action === "updateCache") {
    cacheOnWifi();
  }
});
