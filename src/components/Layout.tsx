import { createContext, useEffect, useState } from "react"
import ChatScreen from "./chatscreen/ChatScreen"
import Sidebar from "./sidebar/Sidebar"
import { User } from "../interface/iUser"
import { auth } from "../config/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { IoLogoIonic } from "react-icons/io5"

export interface UserChatState {
  userState: User | null
  chatID?: string
  newChat: boolean | null
  isLoading: boolean
}

export const UserContext = createContext<any>()

const Layout = ({ chatid } : { chatid?: string }) => {
  // const [userState, setUserState] = useState<User>()
  const [userState, setUserState] = useState<UserChatState>({
    userState: null,
    newChat: null,
    isLoading: true  
  })
  
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const user = auth.currentUser
        if(user) {
        const userInput: User = {
            display_name: user.displayName ? user.displayName : 'User',
            email: user.email ? user.email : 'email',
            profile_url: user.photoURL ? user.photoURL : '',
            uid: user.uid,
            created_at: new Date()
        }

        let userChatState: UserChatState

        if(chatid) {
          userChatState = {
            userState: userInput,
            chatID: chatid,
            newChat: false,
            isLoading: false
          }
        } else {
          userChatState = {
            userState: userInput,
            newChat: true,
            isLoading: false
          }
        }

        setUserState(userChatState)
        // setUserState(userInput)
        }
      } else {
        navigate("/login")
      }
    });
  },[])
  
  return (
    <UserContext.Provider value={{userState, setUserState}}>
      <div className="grid grid-cols-[auto_1fr] bg-[#141618] min-h-screen gap-4">
        {
          userState.isLoading 
          ?
          <div className=" col-span-full flex w-full h-full gap-2 items-center justify-center">
            <p className=" text-[3rem] font-bold">Authenticating</p>
            <IoLogoIonic 
            className=" animate-spin size-10"/>
          </div>
          :
          <>
          <Sidebar 
          // userState={userState}
          />
          <ChatScreen 
          // userState={userState}
          />        
          </>
        }
      </div>
    </UserContext.Provider>
  )
}

export default Layout