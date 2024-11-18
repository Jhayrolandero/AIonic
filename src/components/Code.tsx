import React from 'react'
import { IoCopyOutline } from 'react-icons/io5';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps {
    children: React.ReactNode;
    className?: string;
}
  
const Code: React.FC<CodeProps>  = ({children, className}) => {
    const language = className ? className.replace('lang-', '') : '';
    return (
      <div className="relative w-full ">
        <button className="absolute top-0 right-0 flex items-center"><IoCopyOutline /> Copy</button>
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

export default Code