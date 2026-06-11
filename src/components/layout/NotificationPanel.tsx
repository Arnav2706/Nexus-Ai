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
  match: <Users className="w-5 h-5 text-indigo-400" />,
  session: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  alert: <AlertCircle className="w-5 h-5 text-amber-400" />,
  trending: <Flame className="w-5 h-5 text-orange-400" />,
};

const bgMap: Record<NotifType, string> = {
  match: 'bg-indigo-500/10 border-indigo-500/20',
  session: 'bg-emerald-500/10 border-emerald-500/20',
  alert: 'bg-amber-500/10 border-amber-500/20',
  trending: 'bg-orange-500/10 border-orange-500/20',
};

export const NotificationPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);

  const unread = items.filter(n => !n.read).length;

  const markRead = (id: number) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
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
        className="relative p-2 glass-card rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-300" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
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
              className="absolute right-0 top-12 w-80 glass-panel rounded-2xl border border-white/10 z-50 overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white">Notifications</h3>
                <button
                  onClick={() => setItems(prev => prev.map(n => ({ ...n, read: true })))}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-white/5">
                {items.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">All caught up! 🎉</div>
                ) : (
                  items.map(notif => (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => markRead(notif.id)}
                      className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-white/5 transition-colors ${!notif.read ? 'bg-white/[0.03]' : ''}`}
                    >
                      <div className={`p-2 rounded-xl border ${bgMap[notif.type]} shrink-0 mt-0.5`}>
                        {iconMap[notif.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-white leading-snug">{notif.title}</p>
                          {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{notif.body}</p>
                        <p className="text-xs text-gray-600 mt-1">{notif.time}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                        className="text-gray-600 hover:text-white transition-colors"
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
