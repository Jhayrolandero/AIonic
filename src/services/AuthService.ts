import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export const signUserOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });

} 