import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { IoLogoIonic } from "react-icons/io5";
import { db } from "../../config/firebaseConfig";
import { UserContext } from "../Layout";
import Chat from "./Chat";
import WelcomeChat from "./WelcomeChat";

// const ChatScreen = ({userState} : {userState: User}) => {
const ChatScreen = () => {
  const user = useContext(UserContext);
  const [chatLoading, setChatLoading] = useState(false)

  const fetchChat = async () => {
    try {

      setChatLoading(true)
      // Get the snapshot of the subcollection
      const querySnapshot = await getDocs(collection(db, "users", user.userState!.uid, "chats"));
      
      // Check if the subcollection contains documents
      if (querySnapshot.empty) {
        setChatLoading(false)
        // setNewChat(true)
        console.log("The 'chats' subcollection does not exist or is empty.");
      } else {
        console.log("The 'chats' subcollection exists and has documents.");
        // Iterate over the documents if needed
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      }
    } catch (error) {
      setChatLoading(false)
      console.error("Error checking subcollection: ", error);
    }    
  }

  useEffect(() => {
    fetchChat()
  }, [])

  // TODO: allow the creation of chat
  return (
    <div className="grid grid-cols-[1fr] bg-[#2A2E30] rounded-tl-2xl rounded-bl-2xl place-items-center">
      {
        chatLoading 
        ?
        <div className="flex gap-1 items-center">
          <p className=" font-semibold">Fetching Chat</p>
          <IoLogoIonic 
          className=" animate-spin size-5"/>
        </div>
        :
        user.newChat
        ?
        <WelcomeChat />
        :
        <Chat 
        // userID={user.userState!.uid}
        />
      }
        {/* <HistoryBar /> */}
    </div>
  )
}

export default ChatScreen