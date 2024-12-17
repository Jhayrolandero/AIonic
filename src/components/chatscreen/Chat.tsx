import { useContext, useEffect, useRef, useState } from "react";
import { IoLogoIonic, IoSend } from "react-icons/io5";
import { Message } from "../../interface/iMessage";
import { fetchMemory, fetchMessage, sendMessage } from "../../services/MessageService";
import LoadThinking from "../LoadThinking";
import MessageBox from "../message/MessageBox";
import { UserChatState, UserContext } from "../Layout";
import { ChatMemory, MessagesContext } from "./ChatScreen";
import { isChatExists } from "../../services/ChatService";
import { useNavigate } from "react-router-dom";

interface CacheMessageState {
  [key: string]: {
    messages: any[];
    memory: any[];
  };
}

const Chat = ({ chatid }:{ chatid?: string}) => {
  const {userState, setUserState} = useContext(UserContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, setMessages, memory, setMemory } = useContext(MessagesContext);

  const [cacheMessage, setCacheMessage] = useState<CacheMessageState>({
    '123': { messages: [], memory: [] },
  });
  
  const [suspendBtn, setSuspendBtn] = useState(false)

  const [chatLoading, setChatLoading] = useState(false)

  const navigate = useNavigate()

  const fetchCache = (chatID:string) => {

    if(cacheMessage.hasOwnProperty(chatID)) {

      const cacheRes = cacheMessage[chatID] 
      setMessages(cacheRes.messages)
      setMemory(cacheRes.memory)

    } else {
      fetchData()
    }
  }

  const handleInput = async () => {

    setSuspendBtn(true)

    if(textAreaRef.current?.value == null) {
      return
    }

    const textArea = textAreaRef.current.value

    const currInput: Message = {
      entity: 'user',
      message: textArea,
      newMessage: false,
      created_date: new Date()
    }

    const currMemory : ChatMemory = {
      role: 'user',
      content: textArea
    }

    const updatedMessage = [...messages, currInput]
    const updatedMemory = [...memory, currMemory]

    setMessages(updatedMessage);
    setMemory(updatedMemory)

    const [inputReturn, messageReturn] = await sendMessage(currInput, userState.userState!.uid, userState.chatID ? userState.chatID : chatid!, updatedMemory)
    
    setMessages((prevMessages:Message[]) => [...prevMessages, messageReturn]);
    
    const botReply = messageReturn as Message

    setMemory((prevMemory: ChatMemory[]) => [...prevMemory, {role: 'assistant', content: botReply.message}])

    setSuspendBtn(false)
  }

  // Fetch message based on chat ID
  const fetchData = async () => {
    setChatLoading(true)
    const exist = await isChatExists(userState.userState.uid, userState.chatID ? userState.chatID : chatid ) 

    // Redirect to home if doesn't exists
    if(!exist) {
      setChatLoading(false)
      setUserState((prevState: UserChatState) => ({
        ...prevState, 
        newChat: true, 
      }));
      navigate('/')
    } else {
      const messages = await fetchMessage(userState.userState.uid, userState.chatID)
      const memory = await fetchMemory(userState.userState.uid, userState.chatID)

      // Set new Messages
      setMessages(messages)
      setMemory(memory)
      setChatLoading(false)

      // Set cache
      const cache: CacheMessageState = {
        [userState.chatID] : {
          messages: messages,
          memory: memory
        },
        ...cacheMessage
      }
      setCacheMessage(cache)

    }
  }

  useEffect(() => {
    if(!userState.newChat) {
      // fetchData()
      fetchCache(userState.chatID)
    }
  }, [userState.chatID])

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
      <div className=" px-28 grid grid-rows-[1fr_auto] h-full w-full overflow-hidden overflow-y-auto max-h-screen  relative">
        {/* {userState.chatID} */}
        <div className=" py-2 space-y-6">
          {
            messages.map((x:any, i:any) => (
              <MessageBox 
              message={x.message}
              entity={x.entity}
              newMessage={x.newMessage}
              created_date={x.created_date}
              key={i}
              />
            ))
          }
          { suspendBtn && <LoadThinking /> }
        </div>
        <div className="py-2 sticky bottom-0">
            <form className="border-[1px] border-gray-400 bg-[#2A2E30] flex justify-between items-center px-4 rounded-lg">
              <textarea  
              placeholder="Enter something"
              className="text-area w-full mr-4 p-3 max-h-[64px] h-auto overflow-y-auto resize-none scroll-m-1 bg-transparent focus:outline-none border-0 text-[0.8rem]"
              ref={textAreaRef}
              >
              </textarea>
              <button             
              disabled={suspendBtn}
              onClick={handleInput}
              >
                  <IoSend />
              </button>
            </form>
        </div>
      </div>
    )
  }

  
}

export default Chat