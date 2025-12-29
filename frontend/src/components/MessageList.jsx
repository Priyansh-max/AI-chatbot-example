import React from 'react'
import Message from './Message'

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 chat-messages">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-3 sm:mb-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mb-1">How can we help?</p>
          <p className="text-[10px] sm:text-xs text-zinc-600">Ask about shipping, returns, or anything else</p>
        </div>
      ) : (
        <>
          {messages.map(msg => (
            <Message key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tl-md bg-white/5 border border-white/5">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}

export default MessageList
