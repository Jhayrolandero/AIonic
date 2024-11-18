import { HfInference } from "@huggingface/inference";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { db } from "../../config/firebaseConfig";
import { doc, getDoc, orderBy } from "firebase/firestore";
import MessageBox from "../message/MessageBox";

interface PostType {
  entity: 'user' | 'bot'
  message: string
  newMessage: boolean
}

const Chat = () => {

  const client = new HfInference("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")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [posts, setPosts] = useState<PostType[]>([]);

  let out = "";
  let dbPost = ""
  const handleInput = async () => {

    if(textAreaRef.current?.value == null) {
      return
    }

    const textArea = textAreaRef.current.value

    const currInput: PostType = {
      entity: 'user',
      message: textArea,
      newMessage: false
    }
    
    const storeInput = {
      entity: 'user',
      message: textArea,
      newMessage: false,
      created_date: new Date() // TODO: Must be server time & not frontend time
    }
    
    setPosts(prevPosts => [...prevPosts, currInput]);

    try {
      const docRef = await addDoc(collection(db, "users/4b2zuXthmMk2ZtoZ1M8V/chats/QL8hYHDh93DblUKz2034/messages"), storeInput);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    const stream = client.chatCompletionStream({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: [
        {
          role: "user",
          content: textArea
        }
      ],
      max_tokens: 500
    });
    
    for await (const chunk of stream) {
      // console.log(`Chunks: ${chunk}`)
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent
        dbPost += newContent?.replace(/\n/g, '\\n')
      }  
    }

    const currMessage: PostType = {
      entity: 'bot',
      message: out,
      newMessage: true
    };

    const postMessage = {
      entity: 'bot',
      message: dbPost,
      newMessage: true,
      created_date: new Date() // TODO: Must be server time & not frontend time 
    };

    setPosts(prevPosts => [...prevPosts, currMessage]);

    try {
      const docRef = await addDoc(collection(db, "users/4b2zuXthmMk2ZtoZ1M8V/chats/QL8hYHDh93DblUKz2034/messages"), postMessage);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  const textArr = [
  {
    entity: 'bot',
    message: '/markdown/test.txt',
    newMessage: false
  },
  {
    entity: 'user',
    message: '/markdown/test2.txt',
    newMessage: false
  },

]

  // useEffect(() => {
  //   textArr.forEach(x => {
  //     fetch(x.message)
  //       .then(r => r.text())
  //       .then((text: string) => {
  //         const currPost: PostType = {
  //           entity: x.entity as 'bot' | 'user',
  //           message: text,
  //           newMessage: false
  //         };
  //         setPosts(prevPosts => [...prevPosts, currPost]);
  //       });
  //   });
  // }, []);


  const fetchData = async() => {
    const docRef = collection(db, "users/4b2zuXthmMk2ZtoZ1M8V/chats/QL8hYHDh93DblUKz2034/messages")
    const queryRef = query(docRef, orderBy('created_date', 'asc'))
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.forEach((doc) => {

      const chatData = doc.data()

      const currPost: PostType = {
        entity: chatData.entity,
        message: chatData.message.replace(/\\n/g, '\n'),
        newMessage: false,
      };
      setPosts(prevPosts => [...prevPosts, currPost]);
    });
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="grid grid-rows-[1fr_auto] h-full w-full overflow-hidden overflow-y-auto max-h-screen  relative">
      <div className="px-4 py-2 space-y-4">
        {
          posts.map((x, i) => (
            <MessageBox 
            message={x.message}
            entity={x.entity}
            newMessage={x.newMessage}
            key={i}
            />
          ))
        }
      </div>
      <div className="px-4 py-2 sticky bottom-0">
          <div className="border-[1px] border-gray-400 bg-[#2A2E30] flex justify-between items-center px-4 rounded-lg">
            <textarea  
            placeholder="Enter something"
            className="text-area w-full mr-4 p-3 max-h-[64px] h-auto overflow-y-auto resize-none scroll-m-1 bg-transparent focus:outline-none border-0 text-[0.8rem]"
            ref={textAreaRef}
            >
            </textarea>
            <button             
            onClick={handleInput}
            >
                <IoSend />
            </button>
          </div>
      </div>
    </div>
)
}

export default Chat