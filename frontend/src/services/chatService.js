const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const sendMessage = async (message, sessionId = null) => {
  try {
    const res = await fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, ...(sessionId && { sessionId }) }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || err.error || 'Request failed')
    }

    return await res.json()
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server')
    }
    throw error
  }
}

export const getConversations = async () => {
  try {
    const res = await fetch(`${API_URL}/chat/conversations`)
    
    if (!res.ok) {
      throw new Error('Failed to load conversations')
    }

    return await res.json()
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server')
    }
    throw error
  }
}

export const getChatHistory = async (sessionId) => {
  try {
    const res = await fetch(`${API_URL}/chat/history/${sessionId}`)
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Conversation not found')
      }
      throw new Error('Failed to load history')
    }

    return await res.json()
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to server')
    }
    throw error
  }
}
