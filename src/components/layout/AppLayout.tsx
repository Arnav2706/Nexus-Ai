import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { GlowingBackground } from './GlowingBackground';
import { motion, AnimatePresence } from 'framer-motion';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background text-white overflow-hidden font-sans">
      <GlowingBackground />
      <Sidebar />
      <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden p-8">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
