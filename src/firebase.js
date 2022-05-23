import firebase from 'firebase/app'
import 'firebase/firebase-messaging'

export default function firebaseInitialize () {
    const firebaseConfig = {
        apiKey: "AIzaSyArBKfhlQ7dFRRyMZT9OwvYE5bkbpMjGo4",
        authDomain: "spring-fcm-4786e.firebaseapp.com",
        projectId: "spring-fcm-4786e",
        storageBucket: "spring-fcm-4786e.appspot.com",
        messagingSenderId: "378007119961",
        appId: "1:378007119961:web:9826535ab3c5eb8a27e948"
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.requestPermission()
        .then(function () {
            console.log("Permission granted");
            return messaging.getToken();

        })

        .then(function (token) {
            console.log(token)
            localStorage.setItem("device_token", token)
        })

        .catch(function (error) {
            console.log("Unable to get permission", error);
        });



    messaging.onMessage((payload) => {
        console.log(payload)
        var event = new CustomEvent("noti", {
            detail: {
                message: payload.data.content,
                title: payload.data.title}});
        document.dispatchEvent(event)
    })
}