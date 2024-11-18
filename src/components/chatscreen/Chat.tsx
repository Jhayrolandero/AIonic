import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import raw from '/markdown/test.txt';
import MessageBox from "../message/MessageBox";


interface PostType {
  entity: 'user' | 'bot'
  message: string
}
const Chat = () => {
  const [post, setPost] = useState('');

  const [posts, setPosts] = useState<PostType[]>([]);

  const textArr = [
  {
    entity: 'bot',
    message: '/markdown/test.txt'
  },
  {
    entity: 'user',
    message: '/markdown/test2.txt'
  },

]

useEffect(() => {
  textArr.forEach(x => {
    fetch(x.message)
      .then(r => r.text())
      .then((text: string) => {
        const currPost: PostType = {
          entity: x.entity as 'bot' | 'user',
          message: text
        };
        // Use the functional form of setPosts to ensure state is correctly updated
        setPosts(prevPosts => [...prevPosts, currPost]);
      });
  });
}, []);


  return (
    <div className="grid grid-rows-[1fr_auto] h-full w-full overflow-hidden overflow-y-auto max-h-screen  relative">
      <div className="px-4 py-2">
        {
          posts.map((x, i) => (
            <MessageBox 
            message={x.message}
            entity={x.entity}
            key={i}
            />
          ))
        }
      </div>
      <div className="px-4 py-2 sticky bottom-0">
          <div className="bg-[#141618] flex justify-between items-center px-4 rounded-lg">
            <input type="text" className="w-full h-[64px] bg-transparent focus:outline-none border-0"/>
            <button>
                <IoSend />
            </button>
          </div>
      </div>
    </div>
)
}

export default Chat