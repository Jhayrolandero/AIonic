import { addDoc, collection, doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebaseConfig"

export const createNewChat = async (userID: string, title: string) => {

    const chatRef = collection(db, `users/${userID}/chats`)

    const chatDoc = await addDoc(chatRef, {
        chat_title: title,
        created_at: new Date(),
        updated_at: new Date()
    })

    return chatDoc.id
}

export const isChatExists = async(userID: string, chatID: string) => {
    const docRef = doc(db, `users/${userID}/chats`, chatID);

    const docSnap = await getDoc(docRef);

    return docSnap.exists() 
}