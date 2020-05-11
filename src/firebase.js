import firebase from 'firebase/'
import 'firebase/firestore'


var config = {
    apiKey: "AIzaSyAaKvOhrNp3Y3sCXPFXpTvAnjK4LQw2nHE",
    authDomain: "quangdevdemologin.firebaseapp.com",
    databaseURL: "https://quangdevdemologin.firebaseio.com",
    projectId: "quangdevdemologin",
    storageBucket: "quangdevdemologin.appspot.com",
    messagingSenderId: "496872222037",
    appId: "1:496872222037:web:a5c11b7de8faa0231953dc",
    measurementId: "G-0RER3H0PPY"
};

export const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
// firestore.settings({ timestampsInSnapshots: true })

export default firestore
