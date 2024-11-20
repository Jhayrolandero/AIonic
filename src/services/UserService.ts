import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { User } from "../interface/iUser";

export const addUser = async (userData: User, isNew: boolean) => {
    if(!isNew) return
    
    try {
        // const usersRef = collection(db, "users");
        await setDoc(doc(db, "users", userData.uid), userData);

    } catch(e) {
        return e;
    }

}