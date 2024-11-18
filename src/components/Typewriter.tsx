import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    delay: number;
}

  
// FIXME: The delay shouldn't be hard coded as it depends on the latency of the response
const Typewriter = ({ text, delay } : {text : string, delay:number}) : string => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setTyping] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    } else {
        setTyping(false)
    }
  }, [currentIndex, delay, text]);

  return isTyping ? `${currentText} |` : currentText
};

export default Typewriter;