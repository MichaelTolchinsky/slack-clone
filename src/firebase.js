import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAHFMemrcCzkTE_GOKx4a7g5aYT-LWxSWA",
  authDomain: "slack-clone-b0dc3.firebaseapp.com",
  projectId: "slack-clone-b0dc3",
  storageBucket: "slack-clone-b0dc3.appspot.com",
  messagingSenderId: "879240846129",
  appId: "1:879240846129:web:afb865de7f57e5b09eae10",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;
