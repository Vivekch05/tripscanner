import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Phone, Video, MoreVertical, Smile, Paperclip, Clock } from 'lucide-react';

const LiveChat = ({ provider, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate initial messages
    setMessages([
      {
        id: 1,
        text: "Hi! I'm interested in your Goa trip. Can you tell me more about the itinerary?",
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        status: 'read'
      },
      {
        id: 2,
        text: "Hello! I'd be happy to help you with details about our Goa Beach Paradise trip. It's a 4-day adventure covering North Goa beaches, water sports, and local cuisine. Would you like me to send you the detailed itinerary?",
        sender: 'provider',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        status: 'read'
      },
      {
        id: 3,
        text: "Yes, please! Also, what's included in the package?",
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        status: 'read'
      },
      {
        id: 4,
        text: "The package includes accommodation, meals, transport, water sports activities, and a local guide. We also provide travel insurance. The only exclusions are flights and personal expenses.",
        sender: 'provider',
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        status: 'read'
      }
    ]);

    // Simulate typing indicator
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 10000);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate provider response
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me get back to you with more details.",
          "I'll check the availability for those dates and get back to you shortly.",
          "Perfect! I can help you with that. Let me provide you with the information.",
          "Thanks for your interest! I'll send you the complete details via email."
        ];
        const response = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'provider',
          timestamp: new Date(),
          status: 'read'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-semibold">{provider?.name || 'Travel Provider'}</h3>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
              <Phone size={16} />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
              <Video size={16} />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200">
              <MoreVertical size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs ${
                  message.sender === 'user' ? 'text-white/70' : 'text-slate-500'
                }`}>
                  {formatTime(message.timestamp)}
                </span>
                {message.sender === 'user' && (
                  <span className="text-xs text-white/70">
                    {message.status === 'sent' ? '✓' : message.status === 'read' ? '✓✓' : '⏱️'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-slate-500 ml-2">Typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
            <Paperclip size={16} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-full bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-200">
              <Smile size={16} />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-full hover:from-sky-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;

