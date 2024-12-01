import { addDoc, collection } from "firebase/firestore"
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