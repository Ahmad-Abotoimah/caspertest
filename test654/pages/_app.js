import { useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import the dynamic function from Next.js
import 'firebase/messaging'; // Import the Firebase Messaging module
import firebaseConfig from '../public/firebaseConfig'; // Import your Firebase configuration
import {firebaseCloudMessaging} from '../utils/firebase'; // Import the module you created above
import useFirebaseMessaging from '../utils/mesaging'; // Import the module you created above
import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Check if we are on the client-side
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/firebase-messaging-sw.js").then((registration) => {
          console.log("ServiceWorker registration successful with scope: ", registration.scope);

          // Request notification permission
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              console.log("Notification permission granted.");

              // Get FCM token and log it
              firebaseCloudMessaging().then((token) => {
                console.log("FCM token:", token);
              }).catch((error) => {
                console.error("Error obtaining FCM token:", error);
              });
            } else {
              console.log("Notification permission denied.");
            }
          });
        }).catch((error) => {
          console.log("ServiceWorker registration failed: ", error);
        });

        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener("message", (event) => {
          const { type, notification } = event.data;
         
            // Log the received notification data
            console.log("New notification:", notification);
          
        });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
