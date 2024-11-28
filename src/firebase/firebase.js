// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCbdZTIL3AM4jlqIZ__dIy4rPWhAhywhrM",
  authDomain: "myapp-e3849.firebaseapp.com",
  projectId: "myapp-e3849",
  storageBucket: "myapp-e3849.firebasestorage.app",
  messagingSenderId: "906526799612",
  appId: "1:906526799612:web:1d72216623942a33ae8979",
  measurementId: "G-E2QZ3NBG5L"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Set up Google Authentication provider
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { auth, signInWithGoogle, analytics };
