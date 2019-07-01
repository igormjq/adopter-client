import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAVrAzmKvaqpOi8gyfshqLsm-rNZx_dUJc",
  authDomain: "adopter-82e21.firebaseapp.com",
  databaseURL: "https://adopter-82e21.firebaseio.com",
  projectId: "adopter-82e21",
  storageBucket: "adopter-82e21.appspot.com",
  messagingSenderId: "388430362912",
  appId: "1:388430362912:web:a52342512972f1f2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;