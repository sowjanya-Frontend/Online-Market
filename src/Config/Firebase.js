import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, getAuth } from 'firebase/auth';
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

/**
 * @description: To config the fire base to our local app
 * @return:total object of APP 
 * @param void
 * @author: Sowjanya Kandra
 * @required: FireBase.js
*/
const firebaseConfig = {
    apiKey: "AIzaSyB6vKJn3iy3xbQ0aefABJRPYf98_5xCvRY",
    authDomain: "e-commerce-sowji.firebaseapp.com",
    projectId: "e-commerce-sowji",
    storageBucket: "e-commerce-sowji.appspot.com",
    messagingSenderId: "544415413603",
    appId: "1:544415413603:web:0ca95e4fc6882e4b59cf56",
    measurementId: "G-B5EJ18335P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

//Authentication handling here
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "===", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

//Logout handling
export const logout = () => {
    signOut(auth);
    alert("Logout Process Completed Successfully!");
    window.location.reload();
};

export default firebase;