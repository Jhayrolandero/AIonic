import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import { IoLogoIonic, IoSend } from "react-icons/io5";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import raw from '../markdown/test.txt';

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}


const Chat = () => {
  const str = "###Hello\n```python\nprint('Hello, world!')```"
  const [post, setPost] = useState('');

  // const str = "#print('Hello, world!')"
  
  const Div = ({children} : {children : string}) => (
    <div>{children}</div>
  )

  useEffect(() => {

    fetch(raw)
    .then(r => r.text())
    .then(text => {
      setPost(text)
      // console.log('text decoded:', text);
    });
  },[])

  const Pre = ({children} : {children:string}) => (
    <pre className="bg-[#2F2F2F]">
      {children}
    </pre>
  )

  const Code: React.FC<CodeProps>  = ({children, className}) => {
    // const ref = React.useRef

    // console.log(children.)

    const language = className ? className.replace('lang-', '') : '';
    return (
      <div className="relative">
        <button className="absolute top-0 right-0">Copy</button>
        <span className="border-b-[1px] border-white w-full">
          {language}
        </span>
        <SyntaxHighlighter
        language={language}
        style={materialDark}
        >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
      </div>
    )
  }
  return (
    <div className="grid grid-rows-[1fr_auto] h-full w-full overflow-hidden overflow-y-auto max-h-screen  relative">
      <div className="px-4 py-2">
        <div className="grid grid-cols-[auto_1fr] max-w-max gap-1">
        <span className=" bg-[#0080FF] p-[0.1em] rounded-lg max-h-max">
          <IoLogoIonic  className="size-6"/>
        </span>
        <Markdown
        className="px-4 pt-2 py-8 rounded-md bg-[#141718] prose text-white text-[12px]"
        options={{
          overrides: {
            code: {
              component: Code
            },
            pre : {
              component: Pre
            }
          }
        }}>
          {post}
        </Markdown>
        </div>
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