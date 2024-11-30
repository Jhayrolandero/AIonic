import { useContext, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Message } from "../../interface/iMessage";
import { fetchMessage, sendMessage } from "../../services/MessageService";
import LoadThinking from "../LoadThinking";
import MessageBox from "../message/MessageBox";
import { UserContext } from "../Layout";


// TODO: fetch the chat history by user
// const Chat = ({userID} : {userID: string}) => {
const Chat = () => {
  const user = useContext(UserContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [posts, setPosts] = useState<Message[]>([]);
  // const [userIDState, setUserID] = useState('')
  // const [chatID, setChatID] = useState('')

  const [suspendBtn, setSuspendBtn] = useState(false)

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

    setPosts(prevPosts => [...prevPosts, currInput]);

    const [inputReturn, messageReturn] = await sendMessage(currInput, user.userState!.uid, user.chatID!)
    
    setPosts(prevPosts => [...prevPosts, messageReturn]);
    
    setSuspendBtn(false)
  }

  const fetchData = async () => {
    const messages = await fetchMessage(user.userState!.uid, user.chatID!)
    setPosts(messages)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className=" px-20 grid grid-rows-[1fr_auto] h-full w-full overflow-hidden overflow-y-auto max-h-screen  relative">
      <div className=" py-2 space-y-4">
        {
          posts.map((x, i) => (
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

export default Chat