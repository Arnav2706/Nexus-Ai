import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to Nexus</h1>
          <p className="text-gray-400">Your personal AI copilot for the conference.</p>
        </div>
        <button className="glass-card px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Summary
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder cards to show layout */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="glass-panel rounded-2xl p-6 h-48"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 mb-4" />
            <div className="h-4 w-1/2 bg-white/10 rounded mb-2" />
            <div className="h-4 w-3/4 bg-white/5 rounded" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
