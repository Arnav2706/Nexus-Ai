import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Send } from 'lucide-react';

const MY_ID = 1;
const BOT_ID = 0;

const initialMessages = [
  {
    authorId: BOT_ID,
    author: { id: BOT_ID, name: 'Nexus AI' },
    text: "Hi Alex! I see you're about to meet David Miller. Need some icebreakers?",
    timestamp: new Date(),
    id: 0,
  }
];

export const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>(initialMessages);

  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg = {
      authorId: MY_ID,
      author: { id: MY_ID, name: 'You' },
      text: inputText,
      timestamp: new Date(),
      id: messages.length,
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          authorId: BOT_ID,
          author: { id: BOT_ID, name: 'Nexus AI' },
          text: "I suggest asking him about his latest WASM work — it aligns perfectly with your startup focus!",
          timestamp: new Date(),
          id: prev.length,
        }
      ]);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)] z-50 cursor-pointer border border-white/20"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-96 h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden z-50 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-surface/50 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-white">Live Copilot</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.authorId === MY_ID ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${msg.authorId === MY_ID ? 'bg-primary text-black' : 'bg-white/10 text-white'}`}>
                    <p className="text-xs font-bold mb-1 opacity-75">{msg.author.name}</p>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-white/10 bg-surface/50 backdrop-blur-xl flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-4 py-2 text-white focus:outline-none focus:border-primary text-sm"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5 text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
