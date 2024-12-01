import { useContext, useEffect } from "react";
import { FiSidebar } from "react-icons/fi";
import { IoLogoIonic } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { UserContext } from "../Layout";
import AccountMenu from "../ui/AccountMenu";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// TODO: fix the account logic
// const Sidebar = ({userState} : {userState:User}) => {
const Sidebar = () => {
    const user = useContext(UserContext);

    const fetchChats = async () => {
        const q = collection(db, `users/${user.userState!.uid}/chats`)

        const chatSnapshot = await getDocs(q)

        console.log(chatSnapshot.docs)
        chatSnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
          
    }
    useEffect(() => {
        // fetchChats()
    }, [])
    return (
        <nav className="max-w-[200px] text-white py-2 pl-3 space-y-5 grid grid-rows-[auto_1fr_auto]">
            <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2 items-center">
                    <IoLogoIonic 
                    className="text-[#0080ff] size-8"
                    />
                <h4 className="font-bold">AIonic</h4>
            </div>
                <button><FiSidebar className="text-white size-5"/></button>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 border-b-2 border-white py-1">
                    <span>
                        <MdOutlineChat className="size-6 text-white"/>
                    </span>
                    <p className="text-[0.8rem]">Chats</p>
                </div>
                <div className="space-y-2">
                    <p className="text-[0.7rem]">Yesterday</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                </div>    
                <div className="space-y-2">
                    <p className="text-[0.7rem]">Last 30 days</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                    <p className="max-w-fit overflow-hidden text-[0.8rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                </div>    
            </div>
            {/* // onClick={() => {signUserOut(); navigate("/login")}} */}
                {
                    user.isLoading 
                    ?              
                    <p>Loading...</p>
                    :
                    <div className="flex gap-1 items-center">
                        <AccountMenu 
                        display_name={user.userState!.display_name} 
                        email={user.userState!.email} 
                        profile_url={user.userState!.profile_url} 
                        uid={user.userState!.uid} 
                        created_at={user.userState!.created_at}/>
                        <p className="text-[12px]">{user.userState!.display_name}</p>
                    </div>


                }
                {/* <CiLogout /> */}
            {/* <IconContext.Provider value={{ color: "red", className: "size-7" }}>
            </IconContext.Provider>                 */}
                {/* Logout */}
        </nav>
  )
}

export default Sidebar