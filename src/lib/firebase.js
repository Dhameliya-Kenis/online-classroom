import firebase from "firebase";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDe9-hDPqINJTuQSzqiZNrYWEa5iMH6UGM",
  authDomain: "online-classroom-6af0d.firebaseapp.com",
  projectId: "online-classroom-6af0d",
  storageBucket: "online-classroom-6af0d.appspot.com",
  messagingSenderId: "9387266487",
  appId: "1:9387266487:web:0e71a3a1b38cb53c605832"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;

