import Chat from "./Chat";

const ChatScreen = () => {
  return (
    <div className="grid grid-cols-[1fr] bg-[#2A2E30] rounded-tl-2xl rounded-bl-2xl place-items-center">
        {/* <WelcomeChat /> */}
        {/* <HistoryBar /> */}
        <Chat />
    </div>
  )
}

export default ChatScreen