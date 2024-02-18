import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCriehHROOg_rl22hL0aFOAnhqDOqZoK1s",
    authDomain: "chat-9e773.firebaseapp.com",
    projectId: "chat-9e773",
    storageBucket: "chat-9e773.appspot.com",
    messagingSenderId: "1094887127460",
    appId: "1:1094887127460:web:823c14903e796a1959e931",
    measurementId: "G-2NMX98HQ0T"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app, firestore, auth};