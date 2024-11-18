import { FiSidebar } from "react-icons/fi";
import { IconContext } from "react-icons";
import { IoLogoIonic } from "react-icons/io5";
import { MdOutlineChat } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
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