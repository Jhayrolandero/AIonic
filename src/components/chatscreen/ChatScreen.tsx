import React, { useContext, useEffect, useState } from "react";
import { Message } from "../../interface/iMessage";
import { UserContext } from "../Layout";
import Chat from "./Chat";
import WelcomeChat from "./WelcomeChat";

export interface ChatMemory {
  role: "user" | "assistant";
  content: string
}


// const ChatScreen = ({userState} : {userState: User}) => {
export const MessagesContext = React.createContext<any>();

const ChatScreen = () => {
  const { userState, setUserState } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [memory, setMemory] = useState<ChatMemory[]>([]);

  // TODO: allow the creation of chat

    return (
      <MessagesContext.Provider value={{messages, setMessages, memory, setMemory}}>
      <div className="grid grid-cols-[1fr] bg-[#2A2E30] rounded-tl-2xl rounded-bl-2xl place-items-center">
        {  
          userState.newChat
        ?
          <WelcomeChat />
          :
          <Chat/>
        }
      </div>
      </MessagesContext.Provider>

    )
}

export default ChatScreen