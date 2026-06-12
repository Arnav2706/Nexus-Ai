import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle2, Flame, Users, AlertCircle } from 'lucide-react';

type NotifType = 'match' | 'session' | 'alert' | 'trending';

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, type: 'match', title: '🎯 New Match Found!', body: 'Sarah Chen (92% match) just checked in to the venue.', time: '2m ago', read: false },
  { id: 2, type: 'session', title: '📅 Session Starting Soon', body: 'Generative AI in Production starts in 10 minutes — Room B3.', time: '8m ago', read: false },
  { id: 3, type: 'trending', title: '🔥 Trending Now', body: 'WASM + AI is trending with 240 mentions in the last hour.', time: '15m ago', read: true },
  { id: 4, type: 'alert', title: '⚡ Capacity Alert', body: 'Workshop Room A is now 90% full. Grab your spot!', time: '22m ago', read: true },
];

const iconMap: Record<NotifType, React.ReactNode> = {
  match: <Users className="w-5 h-5 text-black" />,
  session: <CheckCircle2 className="w-5 h-5 text-black" />,
  alert: <AlertCircle className="w-5 h-5 text-black" />,
  trending: <Flame className="w-5 h-5 text-black" />,
};

const bgMap: Record<NotifType, string> = {
  match: 'bg-[#a020f0]',
  session: 'bg-[#a9f131]',
  alert: 'bg-[#ff00ff]',
  trending: 'bg-[#00ffff]',
};

import { useToast } from '../../contexts/ToastContext';

export const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const { addToast } = useToast();

  const unread = items.filter(n => !n.read).length;

  const markRead = (id: number, type: NotifType) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    if (type === 'match') {
      addToast('Opened match profile for Sarah Chen', 'success');
    } else if (type === 'session') {
      addToast('Navigating to session details...', 'info');
    }
  };

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const dismiss = (id: number) => {
    setItems(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-white border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-black hover:text-white transition-colors group"
      >
        <Bell className="w-5 h-5 text-black group-hover:text-white" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-none border-2 border-black bg-primary text-black text-xs font-bold font-headline-md flex items-center justify-center"
          >
            {unread}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-80 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none z-50 overflow-hidden text-black"
            >
              <div className="p-4 border-b-3 border-black flex items-center justify-between bg-gray-100">
                <h3 className="font-bold font-headline-md uppercase text-black tracking-wider">Notifications</h3>
                <button
                  onClick={markAllRead}
                  className="text-xs font-bold font-label-md uppercase text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black px-2 py-1 transition-colors"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y-2 divide-black">
                {items.length === 0 ? (
                  <div className="p-8 text-center font-bold font-headline-md uppercase text-black text-sm">All caught up! 🎉</div>
                ) : (
                  items.map(notif => (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => markRead(notif.id, notif.type)}
                      className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-black hover:text-white group transition-colors ${!notif.read ? 'bg-primary/10' : 'bg-white'}`}
                    >
                      <div className={`p-2 border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 mt-0.5 ${bgMap[notif.type]}`}>
                        {iconMap[notif.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold font-headline-md uppercase tracking-wider text-sm leading-snug group-hover:text-white text-black">{notif.title}</p>
                          {!notif.read && <span className="w-2 h-2 border-2 border-black rounded-none bg-primary shrink-0" />}
                        </div>
                        <p className="text-xs font-bold font-body-md text-gray-700 group-hover:text-gray-300 mt-1 leading-relaxed">{notif.body}</p>
                        <p className="text-xs font-bold font-label-sm uppercase text-black group-hover:text-white mt-1">{notif.time}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                        className="text-black group-hover:text-white border-2 border-transparent hover:border-white p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
