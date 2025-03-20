import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBimMJty8PlTs_OguaFy9SuWJTFhajGQ8Q",
  authDomain: "emsy-ea251.firebaseapp.com",
  projectId: "emsy-ea251",
  storageBucket: "emsy-ea251.appspot.com", // ⚠️ Fix typo in storageBucket
  messagingSenderId: "35877507292",
  appId: "1:35877507292:web:414e6241a54f74e4086419",
  measurementId: "G-PSJ4PJNGP4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export app as default
export default app;
