import { useContext, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { SiIonic } from "react-icons/si";
import { Message } from "../../interface/iMessage";
import { sendNewMesage } from "../../services/MessageService";
import { UserContext } from "../Layout";
import Typewriter from "../Typewriter";
import Chat from "./Chat";
import { MessagesContext } from "./ChatScreen";

const WelcomeChat = () => {
  const [isSuspendBtn, setSuspendBtn] = useState(false)
  const [chatTouched, setChatTouched] = useState(false)
  const inputChatRef = useRef<HTMLInputElement>(null)
  const user = useContext(UserContext)
  const { messages, setMessages } = useContext(MessagesContext);

  const handleInput = async () => {
    debugger
    setSuspendBtn(true)
    
    if(inputChatRef.current?.value == null) {
      setSuspendBtn(false)
      return
    }
    
    const inputChat = inputChatRef.current.value
    
    const currInput: Message = {
      entity: 'user',
      message: inputChat,
      newMessage: false,
      created_date: new Date()
    }

    setMessages((prevMessages:Message[]) => [...prevMessages, currInput]);
    
    const [newChatId, inputReturn, messageReturn] = await sendNewMesage(currInput, user.userState!.uid, "Test Title")
    
    window.history.replaceState(null, "New Page Title", `/c/${newChatId}`)
    
    setMessages((prevMessages:Message[]) => [...prevMessages, messageReturn]);
    // setPosts(prevPosts => [...prevPosts, currInput]);
    
    // const [inputReturn, messageReturn] = await sendMessage(currInput, user.userState!.uid, user.chatID!)
    
    // setPosts(prevPosts => [...prevPosts, messageReturn]);
    
    setChatTouched(true)
    setSuspendBtn(false)
  }


  return (
    <>
    <div className={`${chatTouched ? 'hidden' : 'block'} max-w-[480px] gap-4`}>
      <p className="text-center text-[1.5rem] font-semibold">
        {
        Typewriter({
          text: "Hello, how can i assist you toasdsadasdday?",
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
    {chatTouched && <Chat />}
    </>
  )
}

export default WelcomeChat