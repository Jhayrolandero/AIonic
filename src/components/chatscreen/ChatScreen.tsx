import { useContext, useEffect, useState } from "react";
import { IoLogoIonic } from "react-icons/io5";
import { UserContext } from "../Layout";
import Chat from "./Chat";
import WelcomeChat from "./WelcomeChat";
import React from "react";
import { Message } from "../../interface/iMessage";

// const ChatScreen = ({userState} : {userState: User}) => {
export const MessagesContext = React.createContext<any>();

const ChatScreen = () => {
  const user = useContext(UserContext);
  const [chatLoading, setChatLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([]);

  // TODO: allow the creation of chat

  if(chatLoading) {
    return (
      <div className="grid grid-cols-[1fr] bg-[#2A2E30] rounded-tl-2xl rounded-bl-2xl place-items-center">
        <div className="flex gap-1 items-center">
          <p className=" font-semibold">Fetching Chat</p>
          <IoLogoIonic 
          className=" animate-spin size-5"/>
        </div>
      </div>
    )
  } else {
    return (
      <MessagesContext.Provider value={{messages, setMessages}}>
      <div className="grid grid-cols-[1fr] bg-[#2A2E30] rounded-tl-2xl rounded-bl-2xl place-items-center">
        {  
          user.newChat
          ?
          <WelcomeChat />
          :
          <Chat/>
        }
      </div>
      </MessagesContext.Provider>

    )
  }
}

export default ChatScreen