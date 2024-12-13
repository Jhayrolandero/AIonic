import { useContext, useEffect } from "react";
import { FiSidebar } from "react-icons/fi";
import { IoLogoIonic } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { UserContext } from "../Layout";
import AccountMenu from "../ui/AccountMenu";
import { fetchChats } from "../../services/ChatService";
import { ChatHistory } from "../../interface/iChat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiChatNewLine } from "react-icons/ri";
import {ChatSideContext} from "../Layout";

const Sidebar = () => {
    const {userState, setUserState} = useContext(UserContext);

    const {newTitleChat, setNewTitleChat} = useContext(ChatSideContext)

    const navigate = useNavigate()

    const [ chatHistory, setChatHistory ] = useState<ChatHistory[]>([])

    const [ historyLoading, setHistoryLoading ] = useState(true)

    const init = async () => {
        const historyRes = await fetchChats(userState.userState.uid)

        setChatHistory(historyRes)

        setHistoryLoading(false)
    }

    const navigateChat = (chatID:string) => {
        const prevState = {
            ...userState,
            chatID,
            newChat: false
        }
        
        setUserState(prevState)

        navigate(`/c/${chatID}`)
    }

    const initNewChat = () => {
        const prevState = {
            ...userState,
            chatID: '',
            newChat: true
        }

        setUserState(prevState)

        navigate('/')
    }

    const addNewChatTitle = () => {
        let prevState = [...chatHistory, newTitleChat]

        setChatHistory(prevState)
    }

    useEffect(() => {
        init()

        if(newTitleChat) {
            addNewChatTitle()
        }
    }, [newTitleChat])
    return (
        <nav className="w-[180px] lg:w-[240px] text-white py-2 pl-3 space-y-5 grid grid-rows-[auto_1fr_auto]">
            <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2 items-center">
                    <IoLogoIonic 
                    className="text-[#0080ff] size-8"
                    />
                <h4 className="font-bold text-[1.05rem]">AIonic</h4>
            </div>
                    <button><FiSidebar className="text-white size-5"/></button>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex  justify-between gap-2 border-b-2 border-white py-1">
                    <div className="flex gap-2">
                        <span>
                            <MdOutlineChat className="size-6 text-white"/>
                        </span>
                        <p className="text-[0.9rem]">Chats</p>
                    </div>
                    <button onClick={initNewChat}>
                        <RiChatNewLine className="text-white size-5"/>
                    </button>
                </div>
                
                {/* TODO: Make it so that it will navigate to the chat id */}
                {
                    historyLoading
                    ?
                    <p>Fetching History</p>
                    :
                    <div className="flex flex-col gap-2">
                        {chatHistory.map((x ,idx) => (
                            <button
                            className="text-[1rem] text-start px-3 py-1 rounded-md transition-all hover:scale-105"
                            key={idx}
                            onClick={() => navigateChat(x.chat_id)}
                            >{x.chat_title}</button>
                        ))}
                    </div>
                }
            </div>
                {
                    userState.isLoading 
                    ?              
                    <p>Loading...</p>
                    :
                    <div className="flex gap-1 items-center">
                        <AccountMenu 
                        display_name={userState.userState!.display_name} 
                        email={userState.userState!.email} 
                        profile_url={userState.userState!.profile_url} 
                        uid={userState.userState!.uid} 
                        created_at={userState.userState!.created_at}/>
                        <p className="text-[12px]">{userState.userState!.display_name}</p>
                    </div>


                }
        </nav>
  )
}

export default Sidebar