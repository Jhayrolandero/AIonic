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
  const { userState, setUserState } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);

  // TODO: allow the creation of chat

    return (
      <MessagesContext.Provider value={{messages, setMessages}}>
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