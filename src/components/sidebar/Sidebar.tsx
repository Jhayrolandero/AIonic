import { FiSidebar } from "react-icons/fi";
import { IconContext } from "react-icons";
import { IoLogoIonic } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  return (
    <nav className="max-w-[240px] text-white py-2 space-y-5 grid grid-rows-[auto_1fr_auto]">
        <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2 items-center">
            <IconContext.Provider value={{ color: "#0080ff", className: "size-8" }}>
                <IoLogoIonic />
            </IconContext.Provider>
            <h4 className="text-[1.5rem] font-bold">AIonic</h4>
        </div>
        <IconContext.Provider value={{ color: "white", className: "size-7" }}>
            <button><FiSidebar  /></button>
        </IconContext.Provider>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 border-b-2 border-white">
                <span>
                <IconContext.Provider value={{ color: "white", className: "size-7" }}>
                    <MdOutlineChat />
                </IconContext.Provider>                
                </span>
                <p >Chats</p>
            </div>
            <div className="space-y-2">
                <p className="text-[14px]">Yesterday</p>
                <p className="max-w-fit overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                <p className="max-w-fit overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
            </div>    
            <div className="space-y-2">
                <p className="text-[14px]">Yesterday</p>
                <p className="max-w-fit overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
                <p className="max-w-fit overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est?</p>
            </div>    
        </div>
        <button className="flex">
        <IconContext.Provider value={{ color: "red", className: "size-7" }}>
            <CiLogout />
        </IconContext.Provider>                
            Logout
        </button>
    </nav>
  )
}

export default Sidebar