importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAadKzER2L6BEy5V4s0nNP5SPfpCRfrPdE",
    authDomain: "otp-generator-app.firebaseapp.com",
    projectId: "otp-generator-app",
    storageBucket: "otp-generator-app.appspot.com",
    messagingSenderId: "818241245795",
    appId: "1:818241245795:web:0c4b922b64897702a35e56",
    measurementId: "G-NNYFC6V48X"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});