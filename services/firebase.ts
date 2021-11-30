// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBoFevcIZiNGblK_Vf7Q3SFz5oy90noPs0',
	authDomain: 'nextanime-2af5c.firebaseapp.com',
	projectId: 'nextanime-2af5c',
	storageBucket: 'nextanime-2af5c.appspot.com',
	messagingSenderId: '913967835374',
	appId: '1:913967835374:web:7d7b303b50f5d29dc7abff',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
