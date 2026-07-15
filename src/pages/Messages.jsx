import { useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'

function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null)

  const conversations = [
    {
      id: 1,
      name: 'TechCorp',
      avatar: 'TC',
      lastMessage: 'Merci pour votre candidature. Nous aimerions vous inviter à un entretien.',
      time: '14:30',
      unread: 2,
    },
    {
      id: 2,
      name: 'Innovation Labs',
      avatar: 'IL',
      lastMessage: 'Votre profil correspond parfaitement à nos attentes.',
      time: 'Hier',
      unread: 0,
    },
    {
      id: 3,
      name: 'StartUp Vision',
      avatar: 'SV',
      lastMessage: 'Pouvez-vous me dire plus sur vos projets ?',
      time: '2 jours',
      unread: 1,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: 'company',
      text: 'Bonjour, nous avons bien reçu votre candidature pour le stage de développement web.',
      time: '14:00',
    },
    {
      id: 2,
      sender: 'user',
      text: 'Merci ! Je suis très intéressé par cette opportunité.',
      time: '14:15',
    },
    {
      id: 3,
      sender: 'company',
      text: 'Merci pour votre candidature. Nous aimerions vous inviter à un entretien.',
      time: '14:30',
    },
  ]

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-slate-200 bg-white">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500 text-sm mt-1">Vos conversations avec les entreprises</p>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-all duration-200 ${
                selectedConversation === conv.id
                  ? 'bg-brand-orange/10 border-l-4 border-l-brand-orange'
                  : 'hover:bg-slate-50 border-l-4 border-l-transparent'
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-slate-900 truncate">{conv.name}</h3>
                    <span className="text-xs text-slate-400">{conv.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{conv.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold">
                  {conversations.find(c => c.id === selectedConversation)?.avatar}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {conversations.find(c => c.id === selectedConversation)?.name}
                  </h2>
                  <p className="text-sm text-emerald-600">En ligne</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-brand-orange text-white'
                        : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-brand-orange/80' : 'text-slate-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-slate-200 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Écrivez votre message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
                <button className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
                  <span>Envoyer</span>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-brand-orange" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Sélectionnez une conversation</h3>
              <p className="text-slate-500">Choisissez une conversation pour commencer à discuter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
