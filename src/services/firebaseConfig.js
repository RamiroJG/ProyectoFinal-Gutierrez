import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA69aZM0BuLvKb-e7K1vvLv952ofFPMXK8",
    authDomain: "akatsukiecommerce.firebaseapp.com",
    projectId: "akatsukiecommerce",
    storageBucket: "akatsukiecommerce.firebasestorage.app",
    messagingSenderId: "359224630172",
    appId: "1:359224630172:web:0ce5505888c9c6c2494659"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
