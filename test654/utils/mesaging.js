// useFirebaseMessaging.js
import { useEffect, useState } from "react";
import { firebaseCloudMessaging } from "./firebase"; // Import the firebaseCloudMessaging function
import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

function useFirebaseMessaging() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    // Obtain the FCM token and set it in the state
    const getFcmToken = async () => {
      const token = await firebaseCloudMessaging();
      setFcmToken(token);
    };
    getFcmToken();

    // Set up event listener for incoming messages (foreground messages)
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
      console.log("Foreground message received:", payload);
      // You can handle the incoming message payload here, e.g., show a notification
      // or update the UI with the received data.
    });

    // Set up event listener for clicking on the notification
    self.addEventListener("notificationclick", (event) => {
      event.notification.close();
      // You can add custom logic for handling the notification click here
    });
  }, []);

  return fcmToken;
}

export default useFirebaseMessaging;
