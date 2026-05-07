'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm an AI assistant trained on Mariam's portfolio. Ask me anything about her projects, experience, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();

      if (data.answer) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered a network error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              width: '350px',
              height: '500px',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9999,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(15, 23, 42, 0.95)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={20} color="#38bdf8" />
                <span style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start'
                }}>
                  {msg.role === 'assistant' && (
                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '6px', borderRadius: '50%', flexShrink: 0 }}>
                      <Bot size={14} color="#38bdf8" />
                    </div>
                  )}
                  <div style={{
                    backgroundColor: msg.role === 'user' ? '#38bdf8' : 'rgba(30, 41, 59, 0.8)',
                    color: msg.role === 'user' ? '#0f172a' : '#f8fafc',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                    borderTopLeftRadius: msg.role === 'assistant' ? '2px' : '12px',
                    fontSize: '0.88rem',
                    lineHeight: '1.4',
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    wordBreak: 'break-word'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '6px', borderRadius: '50%' }}>
                    <Bot size={14} color="#38bdf8" />
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} style={{
              padding: '16px',
              borderTop: '1px solid rgba(56, 189, 248, 0.2)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '24px',
                  padding: '10px 16px',
                  color: 'white',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  backgroundColor: isLoading || !input.trim() ? '#475569' : '#38bdf8',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  color: '#0f172a',
                  transition: 'background-color 0.2s',
                  flexShrink: 0
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#38bdf8',
          border: 'none',
          boxShadow: '0 10px 25px rgba(56, 189, 248, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0f172a',
          zIndex: 9999
        }}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} fill="#0f172a" stroke="none" />}
      </motion.button>
    </>
  );
}
