import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { GlowingBackground } from './GlowingBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingAssistant } from '../chat/FloatingAssistant';
import { NotificationPanel } from './NotificationPanel';
import { Search } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden font-sans">
      <GlowingBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-surface/30 backdrop-blur-xl">
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search sessions, people, topics..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-primary/40 focus:bg-white/8 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationPanel />
            <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-xl border border-white/10">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-primary" />
              <span className="text-sm font-medium text-white">Alex Jensen</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="h-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <FloatingAssistant />
    </div>
  );
};
