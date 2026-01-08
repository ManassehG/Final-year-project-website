import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC87YNwv2PRMB21JPO-GW1zVcMA5rFHIQE",
  authDomain: "sendingdata-test.firebaseapp.com",
  databaseURL: "https://sendingdata-test-default-rtdb.firebaseio.com",
  projectId: "sendingdata-test",
  storageBucket: "sendingdata-test.firebasestorage.app",
  messagingSenderId: "35840370231",
  appId: "1:35840370231:web:f2cfc776c3bb31dea6c1b2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
