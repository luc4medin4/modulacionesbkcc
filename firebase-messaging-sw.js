// firebase-messaging-sw.js
// Debe estar en la RAIZ del sitio (mismo nivel que index.html) para que funcione en GitHub Pages.
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDLKPX8X_G4DqqUx4PGWU3Y1iR6xUg4jA8",
  authDomain: "beccacece-reclamos.firebaseapp.com",
  databaseURL: "https://beccacece-reclamos-default-rtdb.firebaseio.com",
  projectId: "beccacece-reclamos",
  storageBucket: "beccacece-reclamos.firebasestorage.app",
  messagingSenderId: "983747807417",
  appId: "1:983747807417:web:36f13e6635da943667b368"
});

const messaging = firebase.messaging();

// Maneja notificaciones cuando la pestaña está cerrada o en background
messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  const title = notification.title || 'Beccacece — Reclamos';
  const options = {
    body: notification.body || '',
    icon: 'logo-beccacece.png',
    badge: 'logo-beccacece.png',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
