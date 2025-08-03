self.addEventListener('install', event => {
  // Perform install steps
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim control immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Default: just passthrough (you can add cache logic here)
});
