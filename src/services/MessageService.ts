import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Message } from "../interface/iMessage";
import { HfInference } from "@huggingface/inference";

const client = new HfInference("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")

export const fetchMessage = async (userID: string, chatID: string) => {
    let messages: any = []
    const messageRef = collection(db, `users/${userID}/chats/${chatID}/messages`) 

    const queryRef = query(messageRef, orderBy('created_date', 'asc'))
    
    const querySnapshot = await getDocs(queryRef);

    querySnapshot.forEach((doc) => {

        const chatData = doc.data()

        const currPost = {
        entity: chatData.entity,
        message: chatData.message.replace(/\\n/g, '\n'),
        newMessage: false,
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
  
    const postMessage = {
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
  
    return [messageInput , postMessage]
}