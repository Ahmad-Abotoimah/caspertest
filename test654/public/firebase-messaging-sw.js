importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD1Chc8s9bxf20wmBU3xZw_BHd-iWRlsXE",
  authDomain: "casper-73924.firebaseapp.com",
  projectId: "casper-73924",
  storageBucket: "casper-73924.appspot.com",
  messagingSenderId: "495034039158",
  appId: "1:495034039158:web:6a36b6c5cab10f79f0d857",
  measurementId: "G-JMXJ8Y8GM8"
});

const messaging = firebase.messaging();

// Background message handler (deprecated but required for compatibility)
messaging.onBackgroundMessage((payload) => {
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon || "/favicon.ico",
      data: payload.notification,
    };
  
    // Post a message to the client
    self.clients.matchAll().then((clients) => {
      if (clients && clients.length) {
        clients.forEach((client) => {
          client.postMessage({
            type: "new-notification",
            notification: payload.notification,
          });
        });
      }
    });
  
    return self.registration.showNotification(payload.notification.title, notificationOptions);
  });