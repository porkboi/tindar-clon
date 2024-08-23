import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB2DsLF7M-SvmbAXlUDgGSNGRjkXAlTo9E",
    authDomain: "tindar-b4fa7.firebaseapp.com",
    projectId: "tindar-b4fa7",
    storageBucket: "tindar-b4fa7.appspot.com",
    messagingSenderId: "1054744847213",
    appId: "1:1054744847213:web:e6cafe084afeeac41a3064",
    measurementId: "G-XBTGNEGPJY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);