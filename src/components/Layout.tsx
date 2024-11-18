import ChatScreen from "./chatscreen/ChatScreen"
import Sidebar from "./sidebar/Sidebar"

const Layout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] bg-[#141618] min-h-screen gap-4">
        <Sidebar />
        <ChatScreen />
    </div>
  )
}

export default Layout