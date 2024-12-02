import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../config/firebaseConfig"
import { ChatHistory } from "../interface/iChat"

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

export const fetchChats = async(userID: string) => {
    const chatRef = collection(db, `users/${userID}/chats`)

    const q = query(chatRef, orderBy('created_at', 'asc'), limit(5))

    const res = await getDocs(q)

    let chatHistory: ChatHistory[] = []

    res.forEach(doc => {
        const currChatId = doc.id
        const currData = doc.data()

        const currHistory: ChatHistory = {
            chat_id: currChatId,
            chat_title: currData.chat_title,
            created_date: currData.created_at,
            updated_date: currData.updated_at
        }

        chatHistory = [...chatHistory, currHistory]
    })
    
    return chatHistory
}