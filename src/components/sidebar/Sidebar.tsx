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
const Sidebar = () => {
    const {userState, setUserState} = useContext(UserContext);

    const navigate = useNavigate()

    const [ chatHistory, setChatHistory ] = useState<ChatHistory[]>([])

    const [ historyLoading, setHistoryLoading ] = useState(true)

    const init = async () => {
        const historyRes = await fetchChats(userState.userState.uid)

        setChatHistory(historyRes)

        setHistoryLoading(false)
    }

    const navigateChat = (chatid:string) => {
        navigate(`/c/${chatid}`)
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <nav className="w-[280px] text-white py-2 pl-3 space-y-5 grid grid-rows-[auto_1fr_auto]">
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
                <div className="flex gap-2 border-b-2 border-white py-1">
                    <span>
                        <MdOutlineChat className="size-6 text-white"/>
                    </span>
                    <p className="text-[0.9rem]">Chats</p>
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
                            className="text-[1rem] text-start"
                            key={idx}
                            onClick={() => navigateChat(x.chat_id)}
                            >{x.chat_title}</button>
                        ))}
                    </div>
                }
                {/* <div className="space-y-2">
                    <p className="text-[0.7rem]">Yesterday</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                </div>    
                <div className="space-y-2">
                    <p className="text-[0.7rem]">Last 30 days</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                </div>     */}
            </div>
            {/* // onClick={() => {signUserOut(); navigate("/login")}} */}
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