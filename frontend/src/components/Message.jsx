import React from 'react'

const Message = ({ message }) => {
  const isUser = message.sender === 'user'
  
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex items-start gap-2 sm:gap-3 animate-fadeIn ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-zinc-700' 
          : 'bg-gradient-to-br from-indigo-500/20 to-violet-500/20'
      }`}>
        {isUser ? (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </div>

      {/* Message */}
      <div className={`max-w-[80%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-tr-md' 
            : 'bg-white/5 border border-white/5 text-zinc-200 rounded-tl-md'
        }`}>
          <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <span className="text-[9px] sm:text-[10px] text-zinc-600 mt-1 px-1 block">{time}</span>
      </div>
    </div>
  )
}

export default Message
