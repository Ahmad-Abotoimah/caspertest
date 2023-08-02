import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

export async function firebaseCloudMessaging() {
  // Check if Firebase app is already initialized
  if (!firebase.apps.length) {
    // Initialize the Firebase app with the credentials
    firebase.initializeApp({
      apiKey: "AIzaSyD1Chc8s9bxf20wmBU3xZw_BHd-iWRlsXE",
      authDomain: "casper-73924.firebaseapp.com",
      projectId: "casper-73924",
      storageBucket: "casper-73924.appspot.com",
      messagingSenderId: "495034039158",
      appId: "1:495034039158:web:6a36b6c5cab10f79f0d857",
      measurementId: "G-JMXJ8Y8GM8",
    });
  }

  try {
    const messaging = firebase.messaging();

  
    // Register the service worker
    await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/firebase-cloud-messaging-push-scope",
    });

    // Request the push notification permission from the browser
    const status = await Notification.requestPermission();
    if (status === "granted") {
      // Get new token from Firebase
      const fcm_token = await messaging.getToken();

      // Set token in our local storage
      // if (fcm_token) {
      //   await localforage.setItem("fcm_token", fcm_token);
      //   console.log(fcm_token);
      //   return fcm_token;
      // }
      return fcm_token;
    }
  } catch (error) {
    console.error("Error obtaining FCM token:", error);
    return null;
  }
}
