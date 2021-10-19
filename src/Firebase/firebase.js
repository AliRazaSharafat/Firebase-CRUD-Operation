// For Firestore Database
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore/lite";
// const firebaseConfig = {
// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: "fir-hooks-a3009.firebaseapp.com",
//   projectId: "fir-hooks-a3009",
//   storageBucket: "fir-hooks-a3009.appspot.com",
//   messagingSenderId: "422735402214",
//   appId: "1:422735402214:web:385736e923e5b023005727",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export default db;

//For Realtime Database

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fir-hooks-a3009.firebaseapp.com",
  projectId: "fir-hooks-a3009",
  storageBucket: "fir-hooks-a3009.appspot.com",
  messagingSenderId: "422735402214",
  appId: "1:422735402214:web:385736e923e5b023005727",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
