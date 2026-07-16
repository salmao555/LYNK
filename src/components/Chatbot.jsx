import { useState } from 'react'
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Bonjour ! Je suis votre assistant Lynk. Comment puis-je vous aider aujourd\'hui ?',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: 'Merci pour votre message. Je suis en train d\'analyser votre demande...',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        aria-label="Ouvrir le chatbot"
      >
        <MessageSquare className="h-6 w-6" aria-hidden="true" />
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-cream-white rounded-2xl shadow-2xl border border-cream-white z-50 transition-all ${
      isMinimized ? 'w-80' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cream-white bg-brand-primary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-brand-orange" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Assistant Lynk</h3>
            <p className="text-xs text-white/70">En ligne</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-8 h-8 rounded-full hover:bg-cream-white/10 flex items-center justify-center text-white transition-colors"
            aria-label={isMinimized ? 'Agrandir' : 'Réduire'}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Minimize2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-cream-white/10 flex items-center justify-center text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-brand-orange text-white'
                      : 'bg-cream-white text-slate-900'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-brand-orange/80' : 'text-cream-white'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-cream-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 rounded-xl border border-cream-white focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange text-sm transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl transition-colors flex items-center justify-center"
                aria-label="Envoyer"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Chatbot
