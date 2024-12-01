import { useContext, useEffect, useRef, useState } from "react";
import { IoLogoIonic, IoSend } from "react-icons/io5";
import { Message } from "../../interface/iMessage";
import { fetchMessage, sendMessage } from "../../services/MessageService";
import LoadThinking from "../LoadThinking";
import MessageBox from "../message/MessageBox";
import { UserChatState, UserContext } from "../Layout";
import { MessagesContext } from "./ChatScreen";
import { isChatExists } from "../../services/ChatService";
import { useNavigate } from "react-router-dom";


// TODO: fetch the chat history by user
// const Chat = ({userID} : {userID: string}) => {
const Chat = ({ chatid }:{ chatid?: string}) => {
  const {userState, setUserState} = useContext(UserContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, setMessages } = useContext(MessagesContext);

  const [suspendBtn, setSuspendBtn] = useState(false)

  const [isChatExist, setIsChatExist] = useState(false)

  const [chatLoading, setChatLoading] = useState(false)

  const navigate = useNavigate()

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

    setMessages((prevMessages:Message[]) => [...prevMessages, currInput]);

    const [inputReturn, messageReturn] = await sendMessage(currInput, userState.userState!.uid, userState.chatID ? userState.chatID : chatid!)
    
    setMessages((prevMessages:Message[]) => [...prevMessages, messageReturn]);
    
    setSuspendBtn(false)
  }

  const fetchData = async () => {
    setChatLoading(true)
    const exist = await isChatExists(userState.userState.uid, userState.chatID ? userState.chatID : chatid ) 

    if(!exist) {
      setChatLoading(false)
      setUserState((prevState: UserChatState) => ({
        ...prevState, 
        newChat: true, 
      }));
      navigate('/')
    } else {
      const messages = await fetchMessage(userState.userState.uid, userState.chatID)
      setMessages(messages)
      setChatLoading(false)
    }
  }

  useEffect(() => {
    if(!userState.newChat) {
      fetchData()
    }
  }, [])

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
      <div className=" px-20 grid grid-rows-[1fr_auto] h-full w-full overflow-hidden overflow-y-auto max-h-screen  relative">
        <div className=" py-2 space-y-4">
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
            <div className="border-[1px] border-gray-400 bg-[#2A2E30] flex justify-between items-center px-4 rounded-lg">
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
            </div>
        </div>
      </div>
    )
  }

  
}

export default Chat