import React, { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { sendMessage, getConversations, getChatHistory } from '../services/chatService'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState('chat') // 'chat' or 'history'
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadConversations = async () => {
    try {
      const data = await getConversations()
      setConversations(data.conversations || [])
    } catch (err) {
      console.error('Failed to load conversations:', err)
    }
  }

  const loadHistory = async (id) => {
    setIsLoading(true)
    try {
      const data = await getChatHistory(id)
      setSessionId(id)
      setMessages(data.messages || [])
      setView('chat')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const startNewChat = () => {
    setSessionId(null)
    setMessages([])
    setView('chat')
    setError(null)
  }

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendMessage(text.trim(), sessionId)
      
      if (response.sessionId) {
        setSessionId(response.sessionId)
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.reply,
        timestamp: new Date().toISOString(),
      }])
    } catch (err) {
      setError(err.message || 'Failed to send message')
      setMessages(prev => prev.filter(m => m.id !== userMsg.id))
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full h-full sm:w-[380px] sm:h-[580px] sm:rounded-2xl bg-[#111113] border-0 sm:border sm:border-white/10 shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-slideIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-white/5 bg-[#0a0a0b]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-['Syne'] font-semibold text-white text-xs sm:text-sm">Spur Support</h3>
                <p className="text-[10px] sm:text-[11px] text-zinc-500">We typically reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5 bg-[#0a0a0b]">
            <button
              onClick={startNewChat}
              className={`flex-1 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium transition-colors ${
                view === 'chat' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => { setView('history'); loadConversations(); }}
              className={`flex-1 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium transition-colors ${
                view === 'history' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Past Conversations
            </button>
          </div>

          {/* Content */}
          {view === 'chat' ? (
            <>
              <MessageList 
                messages={messages} 
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
              />
              {error && (
                <div className="px-3 sm:px-4 py-2 bg-rose-500/10 border-t border-rose-500/20">
                  <p className="text-[10px] sm:text-xs text-rose-400">{error}</p>
                </div>
              )}
              <ChatInput onSend={handleSend} disabled={isLoading} />
            </>
          ) : (
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {conversations.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400">No past conversations</p>
                  <p className="text-[10px] sm:text-xs text-zinc-600 mt-1">Start a chat to see history here</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => loadHistory(conv.id)}
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-left group"
                  >
                    <p className="text-xs sm:text-sm text-zinc-200 truncate group-hover:text-white">
                      {conv.preview}...
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-zinc-600 mt-1">
                      {formatDate(conv.updatedAt)}
                    </p>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ChatWidget
