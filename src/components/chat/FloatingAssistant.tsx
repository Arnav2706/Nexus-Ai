import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { Chat } from '@progress/kendo-react-conversational-ui';

const user = { id: 1, avatarUrl: "https://i.pravatar.cc/150?img=11" };
const bot = { id: 0, name: "Nexus AI", avatarUrl: "https://i.pravatar.cc/150?img=3" };

const initialMessages = [
  {
    author: bot,
    text: "Hi Alex! I see you're about to meet David Miller. Need some icebreakers?",
    timestamp: new Date()
  }
];

export const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>(initialMessages);

  const addNewMessage = (event: any) => {
    setMessages([...messages, event.message]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          author: bot,
          text: "I suggest asking him about his latest work on WASM. It aligns perfectly with your current startup focus.",
          timestamp: new Date()
        }
      ]);
    }, 1000);
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
            
            <div className="flex-1 [&_.k-chat]:!border-none [&_.k-chat]:!bg-transparent [&_.k-message]:!bg-primary/20 [&_.k-message]:!text-white [&_.k-message]:!rounded-2xl [&_.k-message-box]:!bg-transparent [&_.k-author]:!text-gray-400 [&_.k-message-input]:!bg-surface [&_.k-message-input]:!border-white/10 [&_.k-message-input]:!text-white">
              <Chat 
                user={user} 
                messages={messages} 
                onMessageSend={addNewMessage} 
                placeholder="Ask for suggestions..." 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
