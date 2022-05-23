// Scripts for firebase and firebase messaging

// importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyArBKfhlQ7dFRRyMZT9OwvYE5bkbpMjGo4",
    authDomain: "spring-fcm-4786e.firebaseapp.com",
    projectId: "spring-fcm-4786e",
    storageBucket: "spring-fcm-4786e.appspot.com",
    messagingSenderId: "378007119961",
    appId: "1:378007119961:web:9826535ab3c5eb8a27e948"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://res.cloudinary.com/dz0vbjbye/image/upload/v1638807022/logo/logo-removebg-preview_fvw3oj.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
    self.clients.matchAll({includeUncontrolled: true}).then(function (clients) {
        console.log(clients);
        //you can see your main window client in this list.
        clients.forEach(function(client) {
            client.postMessage('YOUR_MESSAGE_HERE');
        })
    })

});