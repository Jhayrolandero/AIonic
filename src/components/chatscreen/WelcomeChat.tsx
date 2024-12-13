import { useContext, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { SiIonic } from "react-icons/si";
import { Message } from "../../interface/iMessage";
import { sendNewMesage } from "../../services/MessageService";
import { ChatSideContext, UserContext } from "../Layout";
import Typewriter from "../Typewriter";
import Chat from "./Chat";
import { ChatMemory, MessagesContext } from "./ChatScreen";

const WelcomeChat = () => {
  const [isSuspendBtn, setSuspendBtn] = useState(false)

  const [chatTouched, setChatTouched] = useState(false)

  const inputChatRef = useRef<HTMLInputElement>(null)

  const [currInput, setCurrInput] = useState<Message>()

  const { userState, setUser } = useContext(UserContext)

  const {newTitleChat, setNewTitleChat} = useContext(ChatSideContext)

  const { messages, setMessages, memory, setMemory } = useContext(MessagesContext);

  const [ chatId, setChatId ] = useState('')

  const handleInput = async () => {
    // debugger
    setSuspendBtn(true)
    
    if(inputChatRef.current?.value == null) {
      setSuspendBtn(false)
      return
    }
    
    const inputChat = inputChatRef.current.value
    
    // setCurrInput({
    //   entity: 'user',
    //   message: inputChat,
    //   newMessage: false,
    //   created_date: new Date()
    // })

    const currInput: Message = {
      entity: 'user',
      message: inputChat,
      newMessage: false,
      created_date: new Date()
    }

    const currMemory : ChatMemory = {
      role: 'user',
      content: inputChat
    }

    const updatedMessage = [...messages, currInput]
    const updatedMemory = [...memory, currMemory]

    setMessages(updatedMessage);
    setMemory(updatedMemory)

    const [newChatId, inputReturn, messageReturn, newTitle] = await sendNewMesage(currInput, userState.userState!.uid, handleTitle(currInput.message), updatedMemory)
    
    setNewTitleChat(newTitle)

    window.history.replaceState(null, "New Page Title", `/c/${newChatId}`)
    
    setMessages((prevMessages:Message[]) => [...prevMessages, messageReturn]);
    
    const botReply = messageReturn as Message
    setMemory((prevMemory: ChatMemory[]) => [...prevMemory, {role: 'assistant', content: botReply.message}])

    setChatId(newChatId as string)

    setChatTouched(true)

    setSuspendBtn(false)
  }

  const handleTitle = (title: string) => {
    return title.substring(0, 100)
  }
  // useEffect(() => {
  //   const [newChatId, inputReturn, messageReturn] = await sendNewMesage(currInput, userState.userState!.uid, "Test Title", memory)

  // }, [memory])


  return (
    <>
    <div className={`${chatTouched ? 'hidden' : 'block'} max-w-[480px] gap-4`}>
      <p className="text-center text-[1.8rem] font-semibold">
        {
        Typewriter({
          text: "Hello, how can i assist you today?",
          delay: 50
          })
        }
      </p>
      <form className="bg-[#141618] flex justify-between items-center px-4 rounded-full">
      <input
      type="text" 
      ref={inputChatRef}
      className="w-[480px] h-[40px] bg-transparent focus:outline-none border-0"/>
      <button
      onClick={handleInput}
      disabled={isSuspendBtn}
      >
        {
          !isSuspendBtn 
          ?
          <IoSend />
          :
          <SiIonic className='animate-spin'/>
        }
      </button>
      </form>
    </div>
    {chatTouched && <Chat chatid={chatId} />}
    </>
  )
}

export default WelcomeChat