// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRf67E1Fz0sDHHNQcC2mfDB5lM1X2oYQs",
  authDomain: "terrasense-2946c.firebaseapp.com",
  databaseURL: "https://terrasense-2946c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "terrasense-2946c",
  storageBucket: "terrasense-2946c.firebasestorage.app",
  messagingSenderId: "298622390709",
  appId: "1:298622390709:web:f30eff28aca7192bd649fc",
  measurementId: "G-EHWGTX7PM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const node1Ref = ref(database, "TerraSense/NODE1");

onValue(node1Ref, (snapshot) => {

    const data = snapshot.val();

    console.log("================================");
    console.log("TERRASENSE LIVE DATA");
    console.log("================================");

    if (!data) {
        console.log("NO DATA FROM FIREBASE");
        return;
    }
    // Send Firebase data to sensors.js
    window.dispatchEvent(
        new CustomEvent("terrasenseData", {
            detail: data
        })
    );

    console.log("Status:", data.status);
    console.log("Soil Raw:", data.soilRaw);
    console.log("Soil:", data.soilWet);
    console.log("Rain Raw:", data.rainRaw);
    console.log("Rain:", data.rainDetected);
    console.log("HX711:", data.hx711Raw);
    console.log("Tilt:", data.maxTilt);
    console.log("Temperature:", data.temperature);
    console.log("RSSI:", data.rssi);
    console.log("SNR:", data.snr);

});