// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

// const firebaseConfig = {
// 	apiKey: process.env.API_KEY,
// 	authDomain: process.env.AUTH_DOMAIN,
// 	projectId: process.env.PROJECT_ID,
// 	storageBucket: process.env.STORAGE_BUCKET,
// 	messagingSenderId: process.env.MESSAGING_SENDERID,
// 	appId: process.env.APP_ID,
// };

// const firebaseConfig = {
// 	apiKey: 'AIzaSyBoFevcIZiNGblK_Vf7Q3SFz5oy90noPs0',
// 	authDomain: 'nextanime-2af5c.firebaseapp.com',
// 	projectId: 'nextanime-2af5c',
// 	storageBucket: 'nextanime-2af5c.appspot.com',
// 	messagingSenderId: '913967835374',
// 	appId: '1:913967835374:web:7d7b303b50f5d29dc7abff',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
