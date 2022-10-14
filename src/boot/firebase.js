import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "AIzaSyDIX-byAmnck_33X7-YiuEuanU7MHZ3sjc",
  authDomain: "analisisfinanciero-2022.firebaseapp.com",
  projectId: "analisisfinanciero-2022",
  storageBucket: "analisisfinanciero-2022.appspot.com",
  messagingSenderId: "583070097600",
  appId: "1:583070097600:web:9c1c796d88c03fb2868d25"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };