import { IoSend } from "react-icons/io5";
import { TypewriterEffect } from "../ui/Typewriter";
import Typewriter from "../Typewriter";

const WelcomeChat = () => {
  return (
    <div className="max-w-[480px] gap-4">
        <p className="text-center text-[1.5rem] font-semibold">
          {
          Typewriter({
            text: "Hello, how can i assist you today?",
            delay: 50
            })
          }
        </p>
    <div className="bg-[#141618] flex justify-between items-center px-4 rounded-full">
    <input type="text" className="w-[480px] h-[40px] bg-transparent focus:outline-none border-0"/>
    <button>
        <IoSend />
    </button>
    </div>
    </div>
  )
}

export default WelcomeChat