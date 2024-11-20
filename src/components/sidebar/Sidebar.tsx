import { useEffect, useState } from "react";
import { FiSidebar } from "react-icons/fi";
import { IoLogoIonic } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { auth } from "../../config/firebaseConfig";
import { User } from "../../interface/iUser";
import AccountMenu from "../ui/AccountMenu";

// TODO: fix the account logic
const Sidebar = ({userState} : {userState:User}) => {
    // const [userState, setUserState] = useState<User>()

    // useEffect(() => {

    //     const user = auth.currentUser

    //     if(user) {

    //     const userInput: User = {
    //         display_name: user.displayName ? user.displayName : 'User',
    //         email: user.email ? user.email : 'email',
    //         profile_url: user.photoURL ? user.photoURL : '',
    //         uid: user.uid,
    //         created_at: new Date()
    //     }

    //     setUserState(userInput)
    //     }
    // }, [])
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
                userState 
                ?              
                <div className="flex gap-1 items-center">
                    <AccountMenu 
                    display_name={userState.display_name} 
                    email={userState.email} 
                    profile_url={userState.profile_url} 
                    uid={userState.uid} 
                    created_at={userState.created_at}/>
                    <p className="text-[12px]">{userState.display_name}</p>
                </div>
                :
                <p>Loading...</p>


            }
            {/* <CiLogout /> */}
        {/* <IconContext.Provider value={{ color: "red", className: "size-7" }}>
        </IconContext.Provider>                 */}
            {/* Logout */}
    </nav>
  )
}

export default Sidebar