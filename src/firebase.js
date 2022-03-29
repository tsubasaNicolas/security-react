// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCosvzLU18SfksnS97y8nT1RZ0mQgsR_sg",
  authDomain: "cameraapp-5964c.firebaseapp.com",
  projectId: "cameraapp-5964c",
  storageBucket: "cameraapp-5964c.appspot.com",
  messagingSenderId: "730483826640",
  appId: "1:730483826640:web:b53ecd2770e1bcaed2e3d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
