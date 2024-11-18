import { IoLogoIonic } from 'react-icons/io5'

const LoadThinking = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-1">
        <span className="bg-[#0080FF] p-[0.1em] rounded-lg max-h-max">
          <IoLogoIonic  className="size-6"/>
        </span>
        <p>
        AIonic is thinking...
        </p>
    </div>
  )
}

export default LoadThinking