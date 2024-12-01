import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Message } from "../interface/iMessage";
import { HfInference } from "@huggingface/inference";
import { createNewChat } from "./ChatService";

const client = new HfInference("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")

/**
 * 
 * @param userID Current logged in User ID
 * @param chatID Chat ID
 * @returns 
 */
export const fetchMessage = async (userID: string, chatID: string) => {
    let messages: Message[] = []
    const messageRef = collection(db, `users/${userID}/chats/${chatID}/messages`) 

    const queryRef = query(messageRef, orderBy('created_date', 'asc'))
    
    const querySnapshot = await getDocs(queryRef);

    querySnapshot.forEach((doc) => {

        const chatData = doc.data()

        console.log(chatData)
        const currPost: Message = {
        entity: chatData.entity,
        message: chatData.message.replace(/\\n/g, '\n'),
        newMessage: false,
        created_date: chatData.created_date
        };

        messages = [...messages, currPost]
    });

    return messages
}


export const sendMessage = async ( messageInput: Message, userID: string, chatID: string ) => {
    const messageRef = collection(db, `users/${userID}/chats/${chatID}/messages`)

    try {
        const docRef = await addDoc(messageRef, messageInput);
        console.log(docRef)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  
    const stream = client.chatCompletionStream({
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        messages: [
          {
            role: "user",
            content: messageInput.message
          }
        ],
        max_tokens: 500
    });

    let dbPost = ""
  
    for await (const chunk of stream) {
        // console.log(`Chunks: ${chunk}`)
        if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            // out += newContent
            dbPost += newContent?.replace(/\n/g, '\\n')
        }  
    }
  
    let postMessage = {
        entity: 'bot',
        message: dbPost,
        newMessage: true,
        created_date: new Date() // TODO: Must be server time & not frontend time 
    };
  
    try {
        const docRef = await addDoc(messageRef, postMessage);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  
    postMessage = {
        ...postMessage, 
        message: postMessage.message.replace(/\\n/g, '\n\n')
    }
    return [messageInput , postMessage]
}

export const sendNewMesage = async (messageInput: Message, userID: string, title: string) => {
    // const chatRef = collection(db, `users/${userID}/chats`)
    const chatDocID = await createNewChat(userID, title)

    const [messageIn, postMessage] = await sendMessage(messageInput, userID, chatDocID)
    // const messageRef = collection(db, `users/${userID}/chats/${chatDocID}/messages`)

    return [chatDocID, messageIn, postMessage]
}

