import Markdown from 'markdown-to-jsx'
import React from 'react'
import { IoLogoIonic } from 'react-icons/io5'
import Typewriter from '../Typewriter'
import Code from '../Code'

interface MessageProps {
    message: string
    entity: 'user' | 'bot'
}

const MessageBox: React.FC<MessageProps> = ({message, entity}) => {

    const Pre = ({children} : {children:string}) => (
        <pre className="bg-[#2F2F2F]">
            {children}
        </pre>
    )
    
  return (
    <div className={`grid w-full ${entity === 'user' ? 'place-items-end grid-cols-[1fr_auto]' : 'grid-cols-[auto_1fr]'} gap-1`}>
    <span className={`bg-[#0080FF] p-[0.1em] rounded-lg max-h-max ${entity === 'user' ? 'order-2' : 'order-1'}`}>
      <IoLogoIonic  className="size-6"/>
    </span>
    <Markdown
    className={`${entity === 'user' ? 'order-1' : 'order-2'} px-4 py-2 rounded-md bg-[#141718] prose text-white text-[12px]`}
    options={{
      overrides: {
        code: {
          component: Code
        },
        pre : {
          component: Pre
        }
      }
    }}
    >
      {message}
      {/* {Typewriter({text: message, delay: 5})} */}
    </Markdown>
    </div>

    )
}

export default MessageBox