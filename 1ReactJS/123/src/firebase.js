import  * as firebase from "firebase/app";
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDHCSUgiuXPXef9K-hyf1SRT1B18GtuZNg",
  authDomain: "myreactapp-9a811.firebaseapp.com",
  projectId: "myreactapp-9a811",
  storageBucket: "myreactapp-9a811.appspot.com",
  messagingSenderId: "598575900869",
  appId: "1:598575900869:web:6cca48e1c9e77171afe8ac",
  databaseURL: "https://myreactapp-9a811-default-rtdb.europe-west1.firebasedatabase.app/"
});


export default app;