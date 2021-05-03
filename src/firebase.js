import firebase from 'firebase/app';
import 'firebase/database';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZ-tqGYyRT-cP9hVwOD1_pIqUkNLnLxJU",
    authDomain: "juno-project-4.firebaseapp.com",
    projectId: "juno-project-4",
    storageBucket: "juno-project-4.appspot.com",
    messagingSenderId: "31852158616",
    appId: "1:31852158616:web:251bcf456fc70ebbf57aed"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
export default firebase;